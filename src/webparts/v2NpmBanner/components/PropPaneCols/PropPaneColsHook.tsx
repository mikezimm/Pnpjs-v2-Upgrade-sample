// import * as React from 'react';

// import { useState, useEffect } from 'react';

// import { IWeb, Web, IFieldInfo } from "@pnp/sp/presets/all";

// import "@pnp/sp/webs";
// import "@pnp/sp/clientside-pages/web";

// // import { IContentsFieldInfo, IFieldBucketInfo } from './IFieldComponentTypes';

// // import { doesObjectExistInArray, } from '../fpsReferences';
// // import {  addItemToArrayIfItDoesNotExist } from '../fpsReferences';

// // import { getFullUrlFromSlashSitesUrl } from '@mikezimm/npmfunctions/dist/Services/Strings/urlServices';  //    webURL = getFullUrlFromSlashSitesUrl( webURL );

// // import { getHelpfullErrorV2 } from '../fpsReferences';

// // import { isGuid, } from '../fpsReferences';

// // import { BaseErrorTrace } from '../fpsReferences';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

// export type IValidTemplate = 100 | 101;

// export interface IMinField extends IFieldInfo {

// }

// export interface IFieldPanelProps {
//   webURL: string;
//   listTitle: string,
//   tryCommands?: any;  //if function is passed down, parent web part could use this to temporarily replace the saved button commands.
//   saveCommands?: any;  // callback function to save current command
//   tryViews?: any;  //if function is passed down, parent web part could use this to temporarily replace the saved button commands.
//   saveViews?: any;  // callback function to save current command
// }

// const ListFieldsHook: React.FC<IFieldPanelProps> = ( props ) => {

//   const {
//      listTitle,
//      webURL,
//   } = props;

//   // Got https://reactjs.org/docs/error-decoder.html/?invariant=321 on this line

//   const [ status, setStatus ] = useState<string>('Nothing');
//   const [ fetch, setFetch ] = useState<boolean>(false);
//   const [ listFIelds, setListFields ] = useState<IMinField[]>([]);

//   useEffect(() => {
//     ( async () => {
//       if ( fetch === true ) {
//         console.log( 'ListFieldsHook: started', webURL, listTitle, fetch );
//         try {
//           if ( listTitle && webURL ) {
//             //setListFields( await allAvailableFields( webURL, listTitle, ) );
//             // const fetchWebURL = getFullUrlFromSlashSitesUrl( webURL );
//             const fetchWebURL = webURL ;
//             const thisWebInstance : IWeb = Web(fetchWebURL);
//             const allFields : IMinField[] = await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true)();
//             const FilteredFields : IMinField[] = allFields.filter( field => field.Hidden !== true );
//             setListFields( FilteredFields )
//             setStatus( 'Fetched columns!' );

//           } else { 
//             setStatus('Did NOT fetch anything'); 
//           }

//         } catch (e) {
//           // getHelpfullErrorV2( e , false, true, null );
//           setStatus( 'Failed to fetch' );
//         }

//         console.log( 'ListFieldsHook: finished!', listFIelds  );
//       }
//     });
    
//   }, [ fetch ]);  //Tried  [listTitle, webURL,] but got react #321

//   const fieldRows : any [] = [];

//   if ( listFIelds.length > 0 ) {
//     fieldRows.push( 
//       <tr>
//         <th>Type</th>
//         <th>Title</th>
//         <th>InternalName</th>
//         <th>Description</th>
//       </tr>
//     );

//     listFIelds.map( ( field: IMinField ) => {
//       const row = <tr>
//         <td>{field.TypeDisplayName}</td>
//         <td>{field.Title}</td>
//         <td>{field.InternalName}</td>
//         <td>{field.Description}</td>
//       </tr>;
//       fieldRows.push( row );

//     });
//   }

//   const onFetchClick = (): void => {
//     setFetch ( fetch === true ? false : true );
//   };

//   return (

//     <div style ={{ padding:'15px',background: 'lightblue'}}>
//       <div style={{ display: 'flex' }}>
//         <button onClick={ () => onFetchClick() } >Fetch</button>
//         <div>{ status }</div>
//       </div>

//       <table>
//         { fieldRows }
//       </table>
//     </div>
//   );
// }


// // //export async function provisionTestPage( makeThisPage:  IContentsFieldInfo, readOnly: boolean, setProgress: any, markComplete: any ): Promise<IServiceLog[]>{
// //   export async function allAvailableFields( webURL: string, listTitle: string, ): Promise<IMinField[] | any> { //addTheseFieldsToState: any, 

// //     webURL = getFullUrlFromSlashSitesUrl( webURL );

// //     let allFields : IMinField[] = [];

// //     let thisWebInstance : IWeb = Web(webURL);
// //     allFields= await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true).get();
// //     allFields = allFields.filter( field => field.Hidden !== true );

// //     return allFields;

// //     // try {
// //     //   if ( listTitle != '' ) {
// //     //     thisWebInstance = Web(webURL);
// //     //     allFields= await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true).get();
// //     //     allFields = allFields.filter( field => field.Hidden !== true )

// //     //   }
// //     // } catch (e) {
// //     //     errMessage = getHelpfullErrorV2(e, false, true, [  , 'Failed', 'get allFields ~ 106' ].join('|') );

// //     // }

// //     // return { allFields: allFields, scope: scope, errMessage: errMessage } ;

// // }



// // export async function GetFieldPanel( fieldPanel: IFieldPanelProps ) {
// //   const fields = await allAvailableFields( fieldPanel.webURL, fieldPanel.listTitle, null );
// //   const fieldRows : any [] = [];

// //   fieldRows.push( 
// //     <tr>
// //       <th>Type</th>
// //       <th>Title</th>
// //       <th>InternalName</th>
// //       <th>Description</th>
// //     </tr>

// //   )
// //   fields.map( ( field: IMinField ) => {
// //     const row = <tr>
// //       <td>{field.TypeDisplayName}</td>
// //       <td>{field.Title}</td>
// //       <td>{field.InternalName}</td>
// //       <td>{field.Description}</td>
// //     </tr>;

// //     fieldRows.push( row );

// //   });

// //   return fieldRows;

// // }

// export default ListFieldsHook;