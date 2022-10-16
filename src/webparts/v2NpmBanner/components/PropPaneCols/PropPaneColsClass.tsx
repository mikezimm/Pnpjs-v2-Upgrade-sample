import * as React from 'react';

import { IWeb, Web, IFieldInfo, } from "@pnp/sp/presets/all";

import {  SearchBox, ISearchBoxStyles, } from 'office-ui-fabric-react/lib/SearchBox';
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';
// import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import { ILoadPerformance, startPerformOp, updatePerformanceEnd, ILoadPerformanceOps, createBasePerformanceInit, IPerformanceOp } from "../../fpsReferences";

// import Accordion from '@mikezimm/npmfunctions/dist/zComponents/Accordion/Accordion';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2 } from '../../fpsReferences';
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { DisplayMode } from '@microsoft/sp-core-library';
import ReactJson from "react-json-view";
// import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PropPaneCols.module.scss';
import { createCommandBuilder, updateSelectedCommands } from './components/CommandAccordion';
import { buildMainFieldTable, getMainSelectedItems } from './components/MainFieldTable';
import { buildSelectedFieldTable } from './components/SelectedTable';
import { createViewBuilder } from './components/ViewAccordion';
import { getDirectionClicks, getKeeperClicks } from './OnClickHelpers';

// import { IContentsFieldInfo, IFieldBucketInfo } from './IFieldComponentTypes';

// import { doesObjectExistInArray, } from '../fpsReferences';
// import {  addItemToArrayIfItDoesNotExist } from '../fpsReferences';

// import { getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';  //    webURL = getFullUrlFromSlashSitesUrl( webURL );

// import { getHelpfullErrorV2 } from '../fpsReferences';

// import { isGuid, } from '../fpsReferences';

// import { BaseErrorTrace } from '../fpsReferences';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

export type IValidTemplate = 100 | 101;


export interface IMinFieldCmds {
  // userFilter?: boolean;  // Use this field to filter the button:  true will show button when current user is in this field
  showToUser?: boolean;
  hideFromUser?: boolean;
  setUser?: boolean;  // Set current field equal to this current user
  addUser?: boolean;  // Add current user to this field

  perChoice?: boolean;  // Use this field to create stack of buttons:  one button per choice is created, button hidden if it's selected choice, adds placeholder to show on certain status (same column)
  choiceFilter?: boolean;  // Use this field to filter stack of buttons:  will hide button if this

  clearDate?: boolean;  // Add current date to this field
  setToday?: boolean;  // Add current date to this field
  set1Week?: boolean;  // Add current date to this field
  set1Month?: boolean;  // Add current date to this field

  updateNote?: boolean;  // prompt for Comment note with all options {{ append rich (if it's note type) stamp }}
  updateText?: boolean;  // adds text:  Current user pressed (choice if it's choice button) on [today]
}


export interface IMinField extends IFieldInfo {
  idx: number; //Index number of field in main list of fields
  searchTextLC: string;
  isSelected: boolean; // Is selected in main list ( right list )
  isKeeper: boolean; // Is selected in the keeper list ( left list )

  commands: IMinFieldCmds;

  Choices?: string[];
  DisplayFormat?: 0 | 1; //  DisplayFormat 0 === Date, 1 === Date and Time
  Formula?: string;
  NumberOfLines?: number;
  MaxLength?: number;
}

export interface IMinListProps {
  webURL: string;
  listTitle: string,

}

export interface IFieldPanelProps {
  displayMode: DisplayMode;
  lists: IMinListProps[];
  disableDesign?: boolean; //Default is false
}

export interface IFieldPanelState {
  status: string;
  fetched: boolean,
  searchText: string;
  searchProp: string;
  listFields: IMinField[];
  filtered: IMinField[];
  selected: IMinField[];
  listIdx: number;
  errMessage: string;
  designMode: boolean;
}

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

    };
  
    this._performance.ops.superOnInit = updatePerformanceEnd( this._performance.ops.superOnInit, true,666 );

  }

  
  public componentDidUpdate(prevProps: IFieldPanelProps) : boolean {
    //Just rebuild the component

    // this._maxFirst = this.state.slideCount === 0 ? 0 : Math.floor( this.props.items.length / this.state.slideCount ) * this.state.slideCount;
    // this._maxLast = this._maxFirst + this.state.slideCount;

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

    const { lists, disableDesign } = this.props;
    const { status, filtered, listFields, designMode, searchProp, searchText, } = this.state;
      
    const fetch4: IPerformanceOp = this._performance.ops.fetch4 ;
  
    const fetchPerformance: JSX.Element = !fetch4 ? null : <div>

      {
        ['label', 'startStr', 'ms', 'c', 'a', ].map( ( key: any, idx: number)  => {
          /**
           * Get this error when using this shorthand syntax:
            *   <div>{key}: { fetch4[ key ] }</div>

              Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'IPerformanceOp'.
              No index signature with a parameter of type 'string' was found on type 'IPerformanceOp'.ts(7053)

              Need to turn this one-line of code....
              <div>{key}: { fetch4[ key ] }</div>
              into the 2 lines of code below :()
           */

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fetch4Any: any = fetch4 as any;

          return <div className={ styles.performanceRow } key={idx}><div>{key}</div> <div>{ fetch4Any[ key ] }</div></div>;
        })
      }

    </div>;


    const fetchButton: JSX.Element = <div className={ styles.button } onClick={ () => this._clickFetchFields() } >Fetch</div>;

    const fetchPane : JSX.Element = <div className={ [ styles.fetchPane, this.state.designMode === true ? styles.hideLeft : styles.showLeft ].join(' ') }>
      { fetchButton }
      <div style={{ margin: '20px', fontWeight: 'bolder', color: status.indexOf('Success') > -1 ? 'darkgreen': status.indexOf('Failed') > -1 ? 'red': '' }}>{ status }</div>
      <div style={{ margin: '20px' }}>{ fetchPerformance }</div>
      <ReactJson src={ this._performance } name={ 'performance' } collapsed={ true } displayDataTypes={ false } displayObjectSize={ false } 
          enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
    </div>

    const siteLink: JSX.Element = <div style={{paddingBottom: '15px', fontSize: 'larger', fontWeight: 'bolder' }}>on this site:  
        <span style = {{ color: 'darkblue',cursor: 'pointer', marginLeft: '25px' }} 
          onClick={ () => { window.open(lists[this.state.listIdx].webURL, '_blank' )}}>{  lists[this.state.listIdx]?.webURL }
        </span>
      </div>;


    if ( this.state.errMessage ) {
       const messages: string[] = this.state.errMessage.split('-- FULL ERROR MESSAGE:');

      return ( <div className={ styles.propPaneCols } >
                  <h2>There was an error trying to fetch fields for this list:</h2>
                  <h3 style={{ marginTop: '0px' }}>{ `Fields from '${ lists[this.state.listIdx].listTitle }'` }</h3>
                  { siteLink }
                  <p style={{ fontWeight: 'bold' }}>{messages[0]}</p>
                  <p style={{ fontWeight: 'bold', color: 'red' }}>{ messages[1] }</p>
                  { fetchPane }
                </div>);

    } else if ( lists.length === 0 ) {
      return ( <div className={ styles.propPaneCols } >
                  <h3>There are no lists to show columns for.</h3>
              </div>);

    } else {


      const { listTitle, } = lists[this.state.listIdx] ;

      const MainFieldTable : JSX.Element = buildMainFieldTable( filtered, designMode, listFields, searchProp, searchText, this._onSelectItem, this._onTypeClick.bind(this) );

      const DesignCommands: JSX.Element = createCommandBuilder( this.state.selected, this._onCmdFieldClick ) ;

      const DesignViews: JSX.Element = createViewBuilder( this.state.selected );

      const SelectedTable: JSX.Element = buildSelectedFieldTable( this.state.selected, this._onKeeperClick, this._onDirectionClick );

      let designPane: JSX.Element = null;
      if ( designMode === true ) {
        designPane = <div className={ styles.designPane }>
            { DesignCommands }
            { DesignViews }
            <div style={{paddingBottom: '5px', fontSize: 'smaller' }}>CTRL-click <b>Arrows</b> to move to Top or Bottom</div>
            { SelectedTable }
          </div>
      }


      const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

      const FieldSearchBox = <SearchBox
        className={ '' }
        styles={ searchBoxStyles }
        placeholder="Search"
        value={ this.state.searchText }
        onSearch={ this._onTextSearch.bind(this) }
        // onFocus={ () => console.log('this.state',  this.state) }
        // onBlur={ () => console.log('onBlur called') }
        onChange={ this._onTextSearch.bind(this) }
        onClear={ this._onTextSearch.bind(this) }
      />;

      const DesignToggle: JSX.Element = this.state.fetched !== true ? null : <Toggle 
          label={ 'Design' } 
          inlineLabel={ true } 
          onChange={ () => this._toggleDesign() } 
          checked={ designMode }
          disabled= { disableDesign }
          styles={ { root: { width: 160, float: 'right' } } }
          />;

      return (

        <div className={ [ styles.propPaneCols, styles.colsResults ].join( ' ' ) } >
          { fetchPane }
          { designPane }
          <div className={ styles.rightSide }>
            <h3 style={{ marginTop: '0px' }}>{ `Fields from '${ listTitle }'` }{DesignToggle}</h3>
            { siteLink }
            <div style={{paddingBottom: '15px' }}>{ FieldSearchBox }</div>
            <div style={{paddingBottom: '15px', fontSize: 'smaller' }}>CTRL-click <b>Add</b> to add to Top of list, Click <b>Type</b> to filter on column type</div>
            { MainFieldTable }
          </div>
        </div>
      );

    }

  }


    
  private _onCmdFieldClick = ( ev: React.MouseEvent<HTMLElement>  ): void => {

    const newSelected: IMinField [] = updateSelectedCommands( ev, this.state.selected );
    // const target: any = ev.target;

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'
    // const itemName: string = target.dataset.fieldname;
    // const role: string = target.dataset.role;

    // // let thisSelected : IMinField = null;
    // const newSelected: IMinField [] = [ ];
    // this.state.selected.map( field => {  //Find selected item
    //   if ( field.InternalName === itemName ) { 
    //     if ( role === 'PerChoice' ) {
    //       field.commands.perChoice = field.commands.perChoice === true ? false : true;
    //     } else if ( role === 'FilterUser' ) {
    //       field.commands.userFilter = field.commands.userFilter === true ? false : true;
    //     } else if ( role === 'SetUser' ) {
    //       field.commands.setUser = field.commands.setUser === true ? false : true;
    //     } else if ( role === 'AddUser' ) {
    //       field.commands.addUser = field.commands.addUser === true ? false : true;
    //     // } else if ( role === '' ) {

    //     // } else if ( role === '' ) {

    //     }
    //   }
    //   newSelected.push( field );
    // });

    this.setState({ selected: newSelected });
  };




  private async _clickFetchFields( ) : Promise<void> {

    const { lists, } = this.props;
    const { webURL, listTitle, } = lists[this.state.listIdx] ;

    const { status, listFields, } = this.state;

    const fetch = true;

    this._updatePerformance( 'fetch4', 'start', 'fetchFields', null );

    let fetchLength: number = 0;
    if ( fetch === true ) {
      console.log( 'listFieldsHook: started', webURL, listTitle, fetch );
      try {
        if ( listTitle && webURL ) {
          //setlistFields( await allAvailableFields( webURL, listTitle, ) );
          // const fetchWebURL = getFullUrlFromSlashSitesUrl( webURL );
          const fetchWebURL = webURL ;
          const thisWebInstance : IWeb = Web(fetchWebURL);
          const allFields : IMinField[] = await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true)();
          const FilteredFields : IMinField[] = allFields.filter( field => field.Hidden !== true && field.Sealed !== true );

          const DefaultSelected: string[] = [ 'ID', 'Editor', 'Modified', 'Title', 'FileLeafRef', '_UIVersionString' ];
          const PreSelectedFields: IMinField[] = [];
          const SelectedNames: string[] = [];

          FilteredFields.map( ( field, idx ) => {
            field.idx = idx;
            field.commands = {};
            field.searchTextLC = ['Title', 'InternalName', 'TypeDisplayName', 'Choices', 'Formula', 'DefaultValue' ].map( prop => {
              const anyField : any = field;
              return anyField[ prop ] ? `${prop}:${anyField[ prop ]}` : '';
            }).join(' || ').toLocaleLowerCase();

            if ( DefaultSelected.indexOf(field.InternalName) > -1 ) {
              field.isKeeper = true;
              field.isSelected = true;
              PreSelectedFields.push( field ); 
              SelectedNames.push( field.InternalName ) ; }
            // `Title:${field.Title} || name:${field.InternalName} || Type:${field.TypeDisplayName}
            //     || Choices:${field.Choices} || Formula:${field.Formula} || DefaultValue:${field.DefaultValue}`.toLocaleLowerCase();
          });

          const SortedPreSelectedFields: IMinField[] = [];
          DefaultSelected.map( name => {
            const idx: number = SelectedNames.indexOf( name ) ;
            if ( idx > -1 ) { SortedPreSelectedFields.push( PreSelectedFields[ idx ] ); }
          })
          fetchLength = FilteredFields.length;

          this._updatePerformance( 'fetch4', 'update', '', fetchLength );

          this.setState({
            listFields: FilteredFields,
            filtered: FilteredFields,
            selected: SortedPreSelectedFields,
            status: 'Success - Fetched!',
            fetched: true,
            searchText: '',
            searchProp: '',
            errMessage: '',
          });


        } else { 
          this._updatePerformance( 'fetch4', 'update', 'failed', fetchLength );
          this.setState({
            status: 'Failed to fetch columns!',
            searchText: '',
            searchProp: '',
            errMessage: 'Missing Web URL or List Title',
          });

        }

      } catch (e) {
        this._updatePerformance( 'fetch4', 'update', 'did not', fetchLength );
        this.setState({
          status: 'Did not fetch columns!',
          errMessage: getHelpfullErrorV2( e, false, true, `PropPaneColsClass ~ 292`, ),
        });
      }

      console.log( 'listFieldsHook: finished!', status, listFields  );
    }
  }


  private _toggleDesign ( ): void {
    const designMode : boolean = this.state.designMode === true ? false : true;
    this.setState({ designMode: designMode })
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

  private _onSearchChange ( input: string, property: string = '' ): void{

    const SearchValue = input.toLocaleLowerCase();

    const filtered: IMinField[] = [];

    this.state.listFields.map( ( field: IMinField) => {
      const textFound: number = !SearchValue ? 0 : field.searchTextLC.indexOf( SearchValue ) ;
      const propertyFound: boolean = !property ? true : field.TypeDisplayName === property;
      if ( textFound > -1 && propertyFound === true ) filtered.push( field );
    });

    const searchText: string = `${SearchValue}${ property ? property : ''}`;

    if ( !SearchValue ) {
      this.setState({ filtered: filtered, searchText: searchText, searchProp: property });
    } else {
      this.setState({ filtered: filtered, searchText: searchText, searchProp: property });
    }
  }

  // private _buildMainFieldTable( filtered: IMinField[], designMode: boolean, heading: string, searchProp: string, searchText: string, onSelectItem: any, onTypeClick: any ) : any[] {

  //   const fieldRows: any[] = [];
  //   fieldRows.push( 
  //     <tr>
  //       <th style={{ display: designMode === true ? '' : 'none' }}>Add</th>
  //       <th>Title</th>
  //       <th>InternalName</th>
  //       <th>Type</th>
  //       <th>{heading}</th>
  //     </tr>
  //   );

  //   filtered.map( ( field: IMinField ) => {

  //     let detailValue = field.Description;

  //     if ( searchProp === 'Choice' || ( !detailValue && field.TypeAsString === 'Choice' ) ) {
  //       detailValue = JSON.stringify(field.Choices);

  //     } else if ( searchProp === 'Calculated' || ( !detailValue && field.Formula ) ) {
  //       detailValue = JSON.stringify(field.Formula);
  //       detailValue = detailValue.slice(1, detailValue.length - 1);  //Remove extra quotes around formula

  //     } else { detailValue = field.Description; }

  //     const SelectIcon = <Icon className={ styles.selectIcon } data-fieldname={ field.InternalName } onClick= { onSelectItem } 
  //       iconName={ field.isSelected === true ? 'SkypeCircleCheck' : 'StatusCircleRing' }/>;

  //     const row = <tr>
  //       <td style={{ display: designMode === true ? '' : 'none' }}>{SelectIcon}</td>
  //       <td>{ getHighlightedText (field.Title , searchText ) }</td>
  //       <td title={field.InternalName}>{ getHighlightedText (field.InternalName , searchText ) }</td>
  //       <td onClick={ () => onTypeClick( field, this ) } >{ getHighlightedText (field.TypeDisplayName , searchText ) }</td>
  //       <td title={detailValue}>{ getHighlightedText (detailValue , searchText ) }</td>
  //     </tr>;
  //     fieldRows.push( row );

  //   });
  //   return fieldRows;

  // }


  private _onKeeperClick = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    // const target: any = ev.target;

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'
    // const itemName: string = target.dataset.fieldname;

    // // let thisSelected : IMinField = null;
    // const newSelected: IMinField [] = [ ];
    // this.state.selected.map( field => {  //Find selected item
    //   if ( field.InternalName === itemName ) { 
    //     field.isKeeper = field.isKeeper === true ? false : true;
    //   }
    //   newSelected.push( field );
    // });

    const newSelected: IMinField[] = getKeeperClicks( ev, this.state.selected );
    this.setState({ selected: newSelected });
  };

  private _onDirectionClick = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    // const target: any = ev.target;
    // // const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'
    // const itemName: string = target.dataset.fieldname;
    // const direction: string = target.dataset.direction;
    // const ctrlKey : boolean = ev.ctrlKey;

    // const { selected } = this.state;
    // let idx: number = -1;

    // selected.map( ( field:IMinField, i: number) => {  //Find selected item
    //   if ( field.InternalName === itemName ) {  idx = i; }
    // });
    // const currentPick = selected[idx];

    // if ( idx === - 1 ){
    //   alert('Something went wrong :(');

    // } else {
    //   let newSelected: IMinField [] = [];

    //   if ( ctrlKey === true ) {
    //     if ( direction === 'up' ) newSelected.push( currentPick );

    //     selected.map( ( field:IMinField, i: number) => {  //Find selected item
    //       if ( field.InternalName !== itemName ) {  newSelected.push( field ) ; }
    //     });

    //     if ( direction === 'down' ) newSelected.push( currentPick );

    //   } else if ( direction === 'up' ) {
    //     const part1: IMinField[] = idx === 1 ? [] : selected.slice( 0, idx - 1  );
    //     const part2: IMinField[] = idx === selected.length -1 ? [] :selected.slice( idx + 1 );
    //     newSelected = [ ...part1, ...[ currentPick ], ...[ selected[ idx - 1 ] ]  , ...part2 ];

    //   } else {
    //     const part1: IMinField[] = idx === 0 ? [] : selected.slice( 0, idx );
    //     const part2: IMinField[] = idx === selected.length -2 ? [] : selected.slice( idx + 2 );
    //     newSelected = [ ...part1, ...[ selected[ idx + 1 ] ], ...[ currentPick ]  , ...part2 ];

    //   }

    const newSelected: IMinField[] = getDirectionClicks( ev, this.state.selected );
    this.setState({ selected: newSelected });
    // }
  };


  // private _buildSelectedFieldTable( selected: IMinField[], onKeeperClick: any, onDirectionClick: any ) : any[] {

  //   const fieldRows: any[] = [];
  //   fieldRows.push( 
  //     <tr>
  //       <th style={{ }}>Keep</th>
  //       <th>Title</th>
  //       <th>Type</th>
  //       <th>Up</th>
  //       <th>Down</th>
  //     </tr>
  //   );

  //   selected.map( ( field: IMinField, idx: number ) => {

  //     const disableUp : boolean = idx === 0 ? true : false;
  //     const disableDown : boolean = idx === selected.length -1 ? true : false;

  //     const KeeperIcon = <Icon className={ styles.selectIcon } data-fieldname={ field.InternalName }
  //       onClick= { onKeeperClick } iconName={ field.isKeeper === true ? 'CheckboxComposite' : 'Checkbox' }/>;

  //     const UpIcon = <Icon className={ styles.selectIcon } data-fieldname={ field.InternalName } data-direction={ 'up' } style={{ color: disableUp === true ? 'dimgray' : '' }}
  //       onClick= { disableUp !== true ? onDirectionClick : null } iconName={ disableUp === false ? 'Up' : 'StatusCircleBlock2' }/>;

  //     const DownIcon = <Icon className={ styles.selectIcon } data-fieldname={ field.InternalName } data-direction={ 'down' } style={{ color: disableDown === true ? 'dimgray' : '' }}
  //       onClick= { disableDown !== true ? onDirectionClick : null } iconName={ disableDown === false ? 'Down': 'StatusCircleBlock2'  }/>;

  //     const row = <tr>
  //       <td>{KeeperIcon}</td>
  //       <td>{ field.Title }</td>
  //       <td title={field.TypeAsString}>{ field.TypeAsString }</td>
  //       <td>{ UpIcon }</td>
  //       <td>{ DownIcon }</td>
  //     </tr>;
  //     fieldRows.push( row );

  //   });
  //   return fieldRows;

  // }

}


// //export async function provisionTestPage( makeThisPage:  IContentsFieldInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
//   export async function allAvailableFields( webURL: string, listTitle: string, ): Promise<IMinField[] | any> { //addTheseFieldsToState: any, 

//     webURL = getFullUrlFromSlashSitesUrl( webURL );

//     let allFields : IMinField[] = [];

//     let thisWebInstance : IWeb = Web(webURL);
//     allFields= await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true).get();
//     allFields = allFields.filter( field => field.Hidden !== true );

//     return allFields;

//     // try {
//     //   if ( listTitle != '' ) {
//     //     thisWebInstance = Web(webURL);
//     //     allFields= await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true).get();
//     //     allFields = allFields.filter( field => field.Hidden !== true )

//     //   }
//     // } catch (e) {
//     //     errMessage = getHelpfullErrorV2(e, false, true, [  , 'Failed', 'get allFields ~ 106' ].join('|') );

//     // }

//     // return { allFields: allFields, scope: scope, errMessage: errMessage } ;

// }



// export async function GetFieldPanel( fieldPanel: IFieldPanelProps ) {
//   const fields = await allAvailableFields( fieldPanel.webURL, fieldPanel.listTitle, null );
//   const fieldRows : any [] = [];

//   fieldRows.push( 
//     <tr>
//       <th>Type</th>
//       <th>Title</th>
//       <th>InternalName</th>
//       <th>Description</th>
//     </tr>

//   )
//   fields.map( ( field: IMinField ) => {
//     const row = <tr>
//       <td>{field.TypeDisplayName}</td>
//       <td>{field.Title}</td>
//       <td>{field.InternalName}</td>
//       <td>{field.Description}</td>
//     </tr>;

//     fieldRows.push( row );

//   });

//   return fieldRows;

// }