import { sortObjectArrayByStringKeyCollator } from "@mikezimm/npmfunctions/dist/Services/Arrays/sorting";
import { IEasyLink } from "./component";

import { Web, } from '@pnp/sp/presets/all';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

//Interfaces
import { ISourceProps, } from './types'; //SourceInfo, 

import { getExpandColumns, getSelectColumns } from '../../../../fpsReferences';
// import { warnMutuallyExclusive } from 'office-ui-fabric-react';

import { getHelpfullErrorV2 } from '../../../../fpsReferences';


export function compoundArrayFilter( items: IEasyLink[], SearchString: string, ExtraFilter: string ) :  IEasyLink[] {

    const SearchStringLc = SearchString.toLocaleLowerCase();
    const ExtraFilterLc = ExtraFilter.toLocaleLowerCase();

    const links: IEasyLink[] = !ExtraFilter ? items : items.filter( ( link ) => link.searchTextLC.indexOf( ExtraFilterLc ) > -1 );

    let filtered: IEasyLink[] = [];

    links.map( ( item: IEasyLink) => {
      const textFound: number = !SearchStringLc ? 0 : item.searchTextLC.indexOf( SearchStringLc ) ;
      if ( textFound > -1 ) filtered.push( item );
    });

    filtered = sortObjectArrayByStringKeyCollator( filtered, 'asc', 'Title', true, 'en' );

    return filtered;
}


  //Standards are really site pages, supporting docs are files
  export async function getPagesContent( sourceProps: ISourceProps, ): Promise<IEasyLink[]> {

    // debugger;
    const web = Web(`${sourceProps.webUrl.indexOf('https:') < 0 ? window.location.origin : ''}${sourceProps.webUrl}`);

    const expColumns = getExpandColumns( sourceProps.columns );
    const selColumns = getSelectColumns( sourceProps.columns );

    const expandThese = expColumns.join(",");
    //Do not get * columns when using standards so you don't pull WikiFields
    const baseSelectColumns = sourceProps.selectThese ? sourceProps.selectThese : sourceProps.columns;
    const selectThese = [ baseSelectColumns, ...selColumns].join(",");
    const restFilter = sourceProps.restFilter ? sourceProps.restFilter : '';
    const orderBy = sourceProps.orderBy ? sourceProps.orderBy : null;
    let items : IEasyLink[]= [];
    console.log('sourceProps', sourceProps );
    try {
      if ( orderBy ) {
        //This does NOT DO ANYTHING at this moment.  Not sure why.
        items = await web.lists.getByTitle( sourceProps.listTitle ).items
        .select(selectThese).expand(expandThese).filter(restFilter).orderBy(orderBy.prop, orderBy.asc ).getAll();
      } else {
        items = await web.lists.getByTitle( sourceProps.listTitle ).items
        .select(selectThese).expand(expandThese).filter(restFilter).getAll();
      }


    } catch (e) {
      getHelpfullErrorV2( e, true, true, 'getPagesContent ~ 73');
      console.log('sourceProps', sourceProps );
    }


    // debugger;
    items = addSearchMeta( items, sourceProps, );

    console.log( sourceProps.defType, sourceProps.listTitle , items );

    return items;


  }

  export function addSearchMeta ( items: IEasyLink[], sourceProps: ISourceProps,  ): IEasyLink[] {

    items.map( page => {
      page.title = page.Title;
      page.description = page.Description;
      page.url = page.File.ServerRelativeUrl;
      page.imageUrl = page.BannerImageUrl;
      page.searchTextLC = `${page.Title} || ${page.Description}`.toLocaleLowerCase();
    });

    return items;

    // //searchNest will be an array of prop key arrays... so [ 'Author/Title' ] => [ ["Author","Title"] ]
    // const searchNest: string[][] = [];  
    // sourceProps.searchProps.map( prop => {
    //   if ( prop.indexOf('.') > -1 || prop.indexOf('/') > -1) {
    //     searchNest.push( prop.trim().replace(' ','' ).split(/[./]/gm) ) ;
    //   } else {
    //     searchNest.push( [prop.trim().replace(' ','' )] ) ;
    //   }
    // });

    // items.map ( ( item: any ) => {
    //   let searchTitle = '';
    //   let searchDesc = '';
    //   let searchHref = '';

    //   const meta: string[] = [];

    //   //This is for display purposes so user can see what property the search criteria is found in
    //   const searchText : string = searchNest.map( ( propArray: string[], idx: number)  => {
      
    //     if ( propArray.length === 1 ) {
    //       item[ sourceProps.searchProps[ idx ] ] = item[ propArray[0] ]; //Add flattened value - item["Author/Title"]= item.Author.Title
    //       if ( Array.isArray( item[ propArray[0] ] )) {
    //         return `${sourceProps.searchProps[ idx ]}=${item[ propArray[0] ].join(';')}`;
  
    //       } else {
    //         return `${sourceProps.searchProps[ idx ]}=${item[ propArray[0] ]}`;
    //       }

    //     } else if ( propArray.length === 2 ) {

    //       //Add flatened value for people/expanded columns

    //       let hasError: boolean = false;

    //       try {
    //         if ( Array.isArray( item[ propArray[0] ] )) {
    //           item[ sourceProps.searchProps[ idx ] ] = item[ propArray[0] ].map( ( itemX: any ) => { return itemX[ propArray[1] ] ; }); //Add flattened value - item["Author/Title"]= [ item.Author[0].Title, item.Author[1].Title]

    //         } else {
    //           if ( item[ propArray[0] ] ) {
    //             item[ sourceProps.searchProps[ idx ] ] = item[ propArray[0] ][ propArray[1] ]; //Add flattened value - item["Author/Title"]= item.Author.Title
    //           } else {
    //             // Need to add this in if the value was not found.  Like the column had no value and was undefined or null... aka Acronyms Standards lookup
    //             item[ sourceProps.searchProps[ idx ] ] = 'UNK';
    //             hasError = true;
    //           }
    //         }

    //       } catch (e) {
    //         // alert('Error doing search props');
    //         const lastPart = item[propArray[0] ] ? item[propArray[0] ][ propArray[1] ] : 'UNK';
    //         item[ sourceProps.searchProps[ idx ] ] = lastPart;
    //         console.log( 'Search Error: ~ `77', item, sourceProps.searchProps, idx, item[propArray[0] ] , lastPart  );
    //         hasError = true;
    //       }

    //       if ( hasError === true ) {
    //         return `${sourceProps.searchProps[ idx ]}=UNK`;
    //       } else {

    //         //This first loop never gets triggered with multi-select lookups because the array is really item [ propArray[0] ]
    //         if ( Array.isArray( item[ propArray[0] ][ propArray[1] ]  )) {
    //           let result = `${sourceProps.searchProps[ idx ]}=${item[ propArray[0] ][ propArray[1] ] .join(';')}`;
    //           if ( sourceProps.searchProps[ idx ] === 'ReportingSections/Title' ) { 
    //             result += ` || Reporting/Title=${item[ propArray[0] ][ propArray[1] ] .join(';')}`; }
    //           return result;

    //         } else if ( Array.isArray( item[ propArray[0] ] )  ) { //As in Controller2/Title

    //           /**
    //            * NEED TO ADD LOOP HERE TO CHECK FOR MULTI-SELECT Lookups like ReportingSections/Titles.
    //            * They don't get caught in the above one because the logic does not work that way
    //            */

    //           if ( item[ sourceProps.searchProps[ idx ] ] ) {
    //             const result = `${sourceProps.searchProps[ idx ]}=${item[ sourceProps.searchProps[ idx ] ] .join(';')}`;
    //             return result;
    //           }

    //         } else {

    //           let result = `${sourceProps.searchProps[ idx ]}=${item[ propArray[0] ][ propArray[1] ] }`;
    //           if ( sourceProps.searchProps[ idx ] === 'ReportingSections/Title' ) { 
    //             result += ` || Reporting/Title=${item[ propArray[0] ][ propArray[1] ] }`; }

    //           return result;
    //         }
    //       }

    //     }

    //   }).join(' || ');

    //   //Get rid of any empty strings
    //   searchText.split(' || ' ).map( text => {
    //     if ( text ) { meta.push( text ); }
    //   });

    //   //searchTextLC is used for actual search function - removes Column Titles from searchable text
    //   const searchTextLC : string = sourceProps.searchProps.map( prop => {
    //     if ( Array.isArray( item[ prop ] )) {
    //       return `${item[ prop ].join(';')}`;

    //     } else {
    //       return `${item[ prop ]}`;
    //     }
    //   }).join(' || ');

    //   item.searchText = searchText;
    //   item.searchTextLC = searchTextLC.toLocaleLowerCase();

    //   item.searchTitle = `${searchTitle}`;
    //   item.searchDesc = `${searchDesc}`;
    //   item.searchHref = `${searchHref}`;

    // });

    // return items;

  }