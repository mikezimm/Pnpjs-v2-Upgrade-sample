import * as React from 'react';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

import { ILoadPerformance, startPerformOp, updatePerformanceEnd, ILoadPerformanceOps, createBasePerformanceInit, } from "../../fpsReferences";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";

import styles from './PropPaneCols.module.scss';
import { createCommandBuilder, updateSelectedCommands } from './components/CommandAccordion';
import { getMainSelectedItems, } from './components/MainFieldTable';
import SelectedItemPanelHook from './components/FieldPanel';
import { buildSelectedFieldTable } from './components/SelectedTable';
import { createViewBuilder } from './components/ViewAccordion';
import { getDirectionClicks, getKeeperClicks, ISelectedInfo, updateSelectedInfo, } from './components/OnClickHelpers';

import { IFieldPanelFetchState, IFieldPanelProps, IFieldPanelState, IMinField, IMinListProps, } from './components/IPropPaneColsProps';

import { MainPane } from './components/MainPane';
import { fetchErrorPanel, FetchPane } from './components/FetchPane';
import { fetchFields } from './components/FetchFuncion';

import SelectedTableHook from './components/SelectedTableHook';

require('./components/PropPaneCols.css');

export default class FieldPanel extends React.Component< IFieldPanelProps, IFieldPanelState > {

  private _performance: ILoadPerformance = null;

  /**
   * This updates the private _performance.ops object.
   * @param key 
   * @param phase 
   * @param note 
   * @param count 
   * @returns 
   */
    private _updatePerformance( key: ILoadPerformanceOps, phase: 'start' | 'update', note: string = '', count: number ): void {

    if ( phase === 'start' ) {
      this._performance.ops[key] = startPerformOp( `${key} ${ note ? ' - ' + note : '' }`, this.props.displayMode );

    } else if ( phase === 'update' ) {
        this._performance.ops[key] = updatePerformanceEnd( this._performance.ops[key], true , count );

    }
  }

  /***
  *     .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
  *    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
  *    8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
  *    8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
  *    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
  *     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
  *                                                                                                  
  *                                                                                                  
  */

    public constructor( props: IFieldPanelProps ){
    super(props);

    this._performance = createBasePerformanceInit( this.props.displayMode, false );
    this._performance.ops.superOnInit = startPerformOp( 'superOnInit', this.props.displayMode );

    this.state = {
      status: 'Not started',
      fetched: false,
      searchText: '',
      searchProp: '',
      listFields: [],
      filtered: [],
      selected: [],
      listIdx: this.props.lists.length > 0 ? 0 : null,
      errMessage: '',
      designMode: false,
      fullDesign: false,
      panelItem: null,
    };
  
    this._performance.ops.superOnInit = updatePerformanceEnd( this._performance.ops.superOnInit, true,666 );

  }

  public componentDidUpdate(prevProps: IFieldPanelProps) : boolean {

    let refresh: boolean = false;

    if ( JSON.stringify( this.props.lists) !== JSON.stringify( prevProps.lists) ) {
      refresh = true;

      // Eventually add this and auto load?
      // setTimeout(() => {
      //   if (this.LastSearch === NewSearch ) {
      //     this._onSearchChange( NewSearch );
      //   } else {
  
      //   }
      // }, 1000);

      this.setState({
        status: 'Not started',
        fetched: false,
        searchText: '',
        searchProp: '',
        listFields: [],
        filtered: [],
        selected: [],
        listIdx: this.props.lists.length > 0 ? 0 : null,
        errMessage: '', 
      });

    }
    return refresh;

  }

  public render(): React.ReactElement<IFieldPanelProps> {

    const { lists, } = this.props;
    const { status, designMode, errMessage, listIdx, panelItem, searchText } = this.state;

    const fetchPane : JSX.Element = FetchPane( { 
      onClickFetchFields: this._clickFetchFields.bind(this),
      designMode: designMode,
      performance : this._performance,
      status: status,
    } );

    if ( this.state.errMessage ) {
      fetchErrorPanel( fetchPane, errMessage, lists[ listIdx ].webURL, lists[ listIdx ].listTitle );

    } else if ( lists.length === 0 ) {
      return ( <div className={ 'prop-pane-cols' } >
                  <h3>There are no lists to show columns for.</h3>
              </div>);

    } else {

      const DesignCommands: JSX.Element = createCommandBuilder( this.state.selected, this._onCmdFieldClick, this.state.fullDesign, 
          this._showFieldPanel.bind(this), this._toggleFullDesign.bind(this) ) ;

      const DesignViews: JSX.Element = createViewBuilder( this.state.selected, null, this._toggleFullDesign.bind(this) );

      const SelectedTable: JSX.Element = buildSelectedFieldTable( this.state.selected, this._onKeeperClick, 
          this._onDirectionClick, this._showFieldPanel.bind(this) );

      const selectedHook: JSX.Element = <SelectedTableHook 
        onDirectionClick={ this._onDirectionClick }
        onKeeperClick={ this._onKeeperClick }
        selected={ this.state.selected }
        // showFieldPanel={ this._showFieldPanel.bind(this) }
      />;

      const MainPanel: JSX.Element = MainPane( this.props, this.state, 
        {
            selectFiltered: this._selectFiltered,
            onFilterClick2: this._onFilterClick2,
            onTextSearch: this._onTextSearch.bind(this),
            toggleDesign: this._toggleDesign.bind(this),
            onSelectItem: this._onSelectItem,
            onTypeClick: this._onTypeClick.bind(this),
            showFieldPanel: this._showFieldPanel.bind(this),
          } );

      let designPane: JSX.Element = null;
      if ( designMode === true ) {
        designPane = <div className={ 'design-pane' }>
            { DesignCommands }
            { DesignViews }
            <div style={{paddingBottom: '5px', fontSize: 'smaller' }}>CTRL-click <b>Arrows</b> to move to Top or Bottom</div>
            { selectedHook }
            { SelectedTable }
          </div>
      }


      return (

        <div className={ [ 'prop-pane-cols', 'cols-results', this.state.fullDesign === true ? 'full-design' : null ].join( ' ' ) } >
          { fetchPane }
          { designPane }
          { MainPanel }
          {/* { SelectedItemPanelHook( { panelItem: panelItem, searchText: searchText, onClosePanel: this._onClosePanel.bind(this) } ) } */}
          < SelectedItemPanelHook 
              panelItem= { panelItem }
              searchText=''

              onClosePanel= { this._onClosePanel.bind(this) }
            />
        </div>
      );

    }

  }

  private _toggleFullDesign ( status: boolean): void {
    const fullDesign : boolean = this.state.fullDesign === true ? false : true;
    this.setState({ fullDesign: fullDesign });
  }

  private _onCmdFieldClick = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    const newSelected: IMinField [] = updateSelectedCommands( ev, this.state.selected );
    this.setState({ selected: newSelected });
  };

  private async _clickFetchFields( ) : Promise<void> {

    const { lists, } = this.props;
    const list: IMinListProps = lists[this.state.listIdx] ;
    const fetch = true;

    if ( fetch === true ) {
      this._updatePerformance( 'fetch4', 'start', 'fetchFields', null );
      const fetchState: IFieldPanelFetchState = await fetchFields( list );
      this._updatePerformance( 'fetch4', 'update', '', fetchState.filtered.length );

      this.setState( fetchState );
      console.log( 'fetchState: finished!', fetchState );
    }

  }

  private _toggleDesign ( ): void {
    const designMode : boolean = this.state.designMode === true ? false : true;
    this.setState({ designMode: designMode })
  }


  private _selectFiltered = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    const { listFields, selected, searchText } = this.state;
    const selectedInfo: ISelectedInfo = updateSelectedInfo( ev, listFields, selected, searchText );
    this.setState( selectedInfo );
  }

  private _onFilterClick2 = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    const target: any = ev.target;
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'
    const fieldtype: string = this.state?.searchText.toLocaleLowerCase() === target.dataset?.fieldtype.toLocaleLowerCase() ? '' : target.dataset.fieldtype;
    this._onSearchChange( fieldtype , '' );
  }

  private _onTypeClick ( field: IMinField ): void {
    const filterType : string = this.state.searchProp ? '' : field.TypeDisplayName;
    this._onSearchChange( '' , filterType );
  }

  private _onSelectItem = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    const newSelected: IMinField [] = getMainSelectedItems( ev, this.state.listFields, this.state.selected );
    this.setState({ selected: newSelected });
  };


  private _onTextSearch ( input: any, text: string = '' ): void {
    const SearchValue : string = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';
    this._onSearchChange( SearchValue , '' );
  }

  private _onSearchChange ( SearchValue: string, property: string = '' ): void {

    const SearchValueLc = SearchValue.toLocaleLowerCase();

    const filtered: IMinField[] = [];

    this.state.listFields.map( ( field: IMinField) => {
      const textFound: number = !SearchValueLc ? 0 : field.searchTextLC.indexOf( SearchValueLc ) ;
      const propertyFound: boolean = !property ? true : field.TypeDisplayName === property;
      if ( textFound > -1 && propertyFound === true ) filtered.push( field );
    });

    const searchText: string = `${SearchValue}${ property ? property : ''}`;

    if ( !SearchValueLc ) {
      this.setState({ filtered: filtered, searchText: searchText, searchProp: property });
    } else {
      this.setState({ filtered: filtered, searchText: searchText, searchProp: property });
    }
  }

  private _onKeeperClick = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    const newSelected: IMinField[] = getKeeperClicks( ev, this.state.selected );
    this.setState({ selected: newSelected });
  };

  private _onDirectionClick = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    const newSelected: IMinField[] = getDirectionClicks( ev, this.state.selected );
    this.setState({ selected: newSelected });
  };

  private _onClosePanel = () : void => {
    this.setState({ panelItem: null });
  }

  //field: IMinField
  // private _showFieldPanel = ( ev: React.MouseEvent<HTMLElement>  ): void => {
  private _showFieldPanel = ( item: IMinField  ): void => {
    // const currentTarget: any = ev.currentTarget;
  
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // // const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'
    // const fieldName: string = currentTarget.dataset?.fieldname ? currentTarget.dataset.fieldname : '';
    // const index: number = currentTarget.dataset?.fieldindex ? currentTarget.dataset.fieldindex : -1 ;
    // const panelItem: IMinField = this.state.listFields[ index ];
    // console.log('Selected field: ', fieldName, panelItem );
    this.setState({ panelItem: item });
  }

}
