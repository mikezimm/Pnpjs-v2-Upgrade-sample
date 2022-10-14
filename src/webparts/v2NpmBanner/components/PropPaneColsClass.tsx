import * as React from 'react';

import { IWeb, Web, IFieldInfo } from "@pnp/sp/presets/all";

import {  SearchBox, ISearchBoxStyles, } from 'office-ui-fabric-react/lib/SearchBox';

import { ILoadPerformance, startPerformOp, updatePerformanceEnd, ILoadPerformanceOps, createBasePerformanceInit, IPerformanceOp } from "../fpsReferences";

import { getHighlightedText , getHelpfullErrorV2 } from '../fpsReferences';
import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { DisplayMode } from '@microsoft/sp-core-library';
import ReactJson from "react-json-view";
// import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PropPaneCols.module.scss';
import { divProperties } from 'office-ui-fabric-react';

// import { IContentsFieldInfo, IFieldBucketInfo } from './IFieldComponentTypes';

// import { doesObjectExistInArray, } from '../fpsReferences';
// import {  addItemToArrayIfItDoesNotExist } from '../fpsReferences';

// import { getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';  //    webURL = getFullUrlFromSlashSitesUrl( webURL );

// import { getHelpfullErrorV2 } from '../fpsReferences';

// import { isGuid, } from '../fpsReferences';

// import { BaseErrorTrace } from '../fpsReferences';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

export type IValidTemplate = 100 | 101;

export interface IMinField extends IFieldInfo {
  searchTextLC: string;
  Choices?: string[];
  Formula?: string;
}

export interface IMinListProps {
  webURL: string;
  listTitle: string,
}

export interface IFieldPanelProps {
  displayMode: DisplayMode;
  lists: IMinListProps[];
}

export interface IFieldPanelState {
  status: string;
  fetch: boolean,
  searchText: string;
  searchProp: string;
  listFields: IMinField[],
  filtered: IMinField[],
  listIdx: number,
  errMessage: string
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
      fetch: false,
      searchText: '',
      searchProp: '',
      listFields: [],
      filtered: [],
      listIdx: this.props.lists.length > 0 ? 0 : null,
      errMessage: '',
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
      this.setState({
        status: 'Not started',
        fetch: false,
        searchText: '',
        searchProp: '',
        listFields: [],
        filtered: [],
        listIdx: this.props.lists.length > 0 ? 0 : null,
        errMessage: '', 
      });

    }
    return refresh;

  }

  public render(): React.ReactElement<IFieldPanelProps> {

    const { lists, } = this.props;
    const { status, filtered, listFields, } = this.state;
      
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

    const fetchButtonInfo : JSX.Element = <div>
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
                  { fetchButtonInfo }
                </div>);

    } else if ( lists.length === 0 ) {
      return ( <div className={ styles.propPaneCols } >
                  <h3>There are no lists to show columns for.</h3>
              </div>);

    } else {


      const { listTitle, } = lists[this.state.listIdx] ;

      const fieldRows : any [] = [];

      if ( listFields.length > 0 ) {
        let heading: string = 'Description';

        if ( this.state.searchProp === 'Choice' ) {
          heading = 'Choices';

        } else if ( this.state.searchProp === 'Calculated' ) {
          heading = 'Formula';

        }

        fieldRows.push( 
          <tr>
            <th>Title</th>
            <th>InternalName</th>
            <th>Type</th>
            <th>{heading}</th>
          </tr>
        );

        filtered.map( ( field: IMinField ) => {

          let detailValue = field.Description;

          if ( this.state.searchProp === 'Choice' || ( !detailValue && field.TypeAsString === 'Choice' ) ) {
            detailValue = JSON.stringify(field.Choices);

          } else if ( this.state.searchProp === 'Calculated' || ( !detailValue && field.Formula ) ) {
            detailValue = JSON.stringify(field.Formula);
            detailValue = detailValue.slice(1, detailValue.length - 1);  //Remove extra quotes around formula

          } else { detailValue = field.Description; }

          const row = <tr>
            <td>{ getHighlightedText (field.Title , this.state.searchText ) }</td>
            <td title={field.InternalName}>{ getHighlightedText (field.InternalName , this.state.searchText ) }</td>
            <td onClick={ () => this._onTypeClick( field ) } >{ getHighlightedText (field.TypeDisplayName , this.state.searchText ) }</td>
            <td title={detailValue}>{ getHighlightedText (detailValue , this.state.searchText ) }</td>
          </tr>;
          fieldRows.push( row );

        });
      }


      const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

      const FieldSearchBox = <SearchBox
        className={ '' }
        styles={ searchBoxStyles }
        placeholder="Search"
        value={ this.state.searchText }
        onSearch={ this._onTextSearch.bind(this) }
        onFocus={ () => console.log('this.state',  this.state) }
        onBlur={ () => console.log('onBlur called') }
        onChange={ this._onTextSearch.bind(this) }
        onClear={ this._onTextSearch.bind(this) }
      />;
  
      return (
  
        <div className={ [ styles.propPaneCols, styles.colsResults ].join( ' ' ) } >
          <div>
            { fetchButtonInfo }
          </div>
  
          <div>
            <h3 style={{ marginTop: '0px' }}>{ `Fields from '${ listTitle }'` }</h3>
            { siteLink }
            <div style={{paddingBottom: '15px' }}>{ FieldSearchBox }</div>
            <table>
              { fieldRows }
            </table>
          </div>

        </div>
      );

    }

  }

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
          FilteredFields.map( field => {
            field.searchTextLC = ['Title', 'InternalName', 'TypeDisplayName', 'Choices', 'Formula', 'DefaultValue' ].map( prop => {
              const anyField : any = field;
              return anyField[ prop ] ? `${prop}:${anyField[ prop ]}` : '';
            }).join(' || ').toLocaleLowerCase();

            // `Title:${field.Title} || name:${field.InternalName} || Type:${field.TypeDisplayName} 
            //     || Choices:${field.Choices} || Formula:${field.Formula} || DefaultValue:${field.DefaultValue}`.toLocaleLowerCase();
          });
          fetchLength = FilteredFields.length;

          this._updatePerformance( 'fetch4', 'update', '', fetchLength );

          this.setState({
            listFields: FilteredFields,
            filtered: FilteredFields,
            status: 'Success - Fetched!',
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


  private _onTypeClick ( field: IMinField ): void {
    const filterType : string = this.state.searchProp ? '' : field.TypeDisplayName;
    this._onSearchChange( '' , filterType );
  }

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