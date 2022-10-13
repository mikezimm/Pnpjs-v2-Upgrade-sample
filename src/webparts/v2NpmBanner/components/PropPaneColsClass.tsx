import * as React from 'react';

import { IWeb, Web, IFieldInfo } from "@pnp/sp/presets/all";



import { ILoadPerformance, startPerformOp, updatePerformanceEnd, ILoadPerformanceOps, createBasePerformanceInit, IPerformanceOp } from "../fpsReferences";

import "@pnp/sp/webs";
import "@pnp/sp/clientside-pages/web";
import { DisplayMode } from '@microsoft/sp-core-library';
import ReactJson from "react-json-view";

import styles from './PropPaneCols.module.scss';

// import { IContentsFieldInfo, IFieldBucketInfo } from './IFieldComponentTypes';

// import { doesObjectExistInArray, } from '../fpsReferences';
// import {  addItemToArrayIfItDoesNotExist } from '../fpsReferences';

// import { getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';  //    webURL = getFullUrlFromSlashSitesUrl( webURL );

// import { getHelpfullErrorV2 } from '../fpsReferences';

// import { isGuid, } from '../fpsReferences';

// import { BaseErrorTrace } from '../fpsReferences';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

export type IValidTemplate = 100 | 101;

export interface IMinField extends IFieldInfo {

}

export interface IFieldPanelProps {
  displayMode: DisplayMode
  webURL: string;
  listTitle: string,
}

export interface IFieldPanelState {
  status: string;
  fetch: boolean,
  listFIelds: IMinField[],
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
      listFIelds: [],
      };
    
      this._performance.ops.superOnInit = updatePerformanceEnd( this._performance.ops.superOnInit, true,666 );

  }

  public render(): React.ReactElement<IFieldPanelProps> {
    const { webURL, listTitle, } = this.props;

    const { status, fetch, listFIelds, } = this.state;
    

    const fieldRows : any [] = [];

    if ( listFIelds.length > 0 ) {
      fieldRows.push( 
        <tr>
          <th>Title</th>
          <th>InternalName</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      );
  
      listFIelds.map( ( field: IMinField ) => {
        const row = <tr>
          <td>{field.Title}</td>
          <td>{field.InternalName}</td>
          <td>{field.TypeDisplayName}</td>
          <td>{field.Description}</td>
        </tr>;
        fieldRows.push( row );

      });
    }

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

          return <div className={ styles.performanceRow }><div>{key}</div> <div>{ fetch4Any[ key ] }</div></div>;
        })
      }

    </div>

    return (

      <div className={ styles.propPaneCols } style ={{ padding:'20px 50px',background: 'lightblue'}}>
        <div>
          <div className={ styles.button } onClick={ () => this._clickFetchFields() } >Fetch</div>
          <div style={{ margin: '20px' }}>{ status }</div>
          <div style={{ margin: '20px' }}>{ fetchPerformance }</div>
          <ReactJson src={ this._performance } name={ 'performance' } collapsed={ true } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>

        </div>

        <div>
          <h3>Fields from { this.props.listTitle }</h3>
          <div style={{paddingBottom: '15px' }}>found on this site:  {  this.props.webURL }</div>
          <table>
            { fieldRows }
          </table>
        </div>



      </div>
    );
  }

  private async _clickFetchFields() : Promise<void> {

    const { webURL, listTitle, } = this.props;

    const { status, listFIelds, } = this.state;

    const fetch = true;

    this._updatePerformance( 'fetch4', 'start', 'fetchFields', null );

    let fetchLength: number = 0;
    if ( fetch === true ) {
      console.log( 'ListFieldsHook: started', webURL, listTitle, fetch );
      try {
        if ( listTitle && webURL ) {
          //setListFields( await allAvailableFields( webURL, listTitle, ) );
          // const fetchWebURL = getFullUrlFromSlashSitesUrl( webURL );
          const fetchWebURL = webURL ;
          const thisWebInstance : IWeb = Web(fetchWebURL);
          const allFields : IMinField[] = await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true)();
          const FilteredFields : IMinField[] = allFields.filter( field => field.Hidden !== true && field.Sealed !== true );
          fetchLength = FilteredFields.length;

          this._updatePerformance( 'fetch4', 'update', '', fetchLength );

          this.setState({
            listFIelds: FilteredFields,
            status: 'Fetched columns!',
          });


        } else { 
          this._updatePerformance( 'fetch4', 'update', 'failed', fetchLength );
          this.setState({
            status: 'Failed to fetched columns!',
          });

        }

      } catch (e) {
        this._updatePerformance( 'fetch4', 'update', 'did not', fetchLength );
        this.setState({
          status: 'Did not fetch columns!',
        });
      }


      console.log( 'ListFieldsHook: finished!', status, listFIelds  );
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