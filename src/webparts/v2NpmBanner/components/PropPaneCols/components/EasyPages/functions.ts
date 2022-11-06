import { sortObjectArrayByStringKeyCollator } from "@mikezimm/npmfunctions/dist/Services/Arrays/sorting";
import { IEasyLink } from "./component";

import { Web, } from '@pnp/sp/presets/all';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

//Interfaces
import { DefaultOverflowTab, ISourceProps, } from './types'; //SourceInfo, 

import { getExpandColumns, getSelectColumns } from '../../../../fpsReferences';
// import { warnMutuallyExclusive } from 'office-ui-fabric-react';

import { getHelpfullErrorV2 } from '../../../../fpsReferences';
import { EasyIconLocation, EasyIconObject, getEasyIcon } from "../EasyIcons/EasyIcons";

/**
 * This filters first by a meta string and then by text search string
 * @param items 
 * @param MetaFilter 
 * @param SearchString 
 * @returns 
 */
export function compoundArrayFilter( items: IEasyLink[], MetaFilter: string, SearchString: string ) :  IEasyLink[] {

    const SearchStringLc = SearchString.toLocaleLowerCase();

    const links: IEasyLink[] = !MetaFilter ? items : items.filter( ( link ) => link.tabs.indexOf( MetaFilter ) > -1 );

    let filtered: IEasyLink[] = [];

    if ( !SearchStringLc ) {
      filtered = links;

    } else {

      links.map( ( item: IEasyLink) => {
        const textFound: number = !SearchStringLc ? 0 : item.searchTextLC.indexOf( SearchStringLc ) ;
        if ( textFound > -1 ) filtered.push( item );
      });

    }

    return filtered;
}

/**
 * This returns only tabs that were found and in the original order provided by props.
 * @param sourceProps 
 * @param items 
 * @returns 
 */
export function getUsedTabs( sourceProps: ISourceProps, items: IEasyLink[] ) : string[] {
  const foundTabs: string[] = [];
  let showOverFlow: any = false;

  items.map( item => {
    item.tabs.map( tab => { 
      if ( foundTabs.indexOf( tab ) < 0 ) foundTabs.push( tab );
      if ( tab === sourceProps.overflowTab ) showOverFlow = true;
    } )
  })
  const sortedTabs: string[] = [];
  sourceProps.meta1.map( tab => { if ( foundTabs.indexOf( tab ) > -1 ) sortedTabs.push( tab ) ;} );
  if ( showOverFlow === true ) sortedTabs.push( sourceProps.overflowTab );

  return sortedTabs;

}

/**
 * This gets Site Pages content, based on ALVFinMan7 model
 * @param sourceProps 
 * @returns 
 */
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
  items = sortObjectArrayByStringKeyCollator( items, 'asc', 'title', true, 'en' );

  console.log( sourceProps.defType, sourceProps.listTitle , items );

  return items;


}

const DefaultThumbEasyContents : string = `https://cdn.hubblecontent.osi.office.net/m365content/publish/8833527d-1d55-40be-8d14-0e45b17ce81b/thumbnails/large.jpg`;
const DefaultThumbExtreme : string = `https://cdn.hubblecontent.osi.office.net/m365content/publish/3232a7cd-821f-48bd-bf98-9d84185566a5/thumbnails/large.jpg`;
const DefaultThumbEarth : string = `https://cdn.hubblecontent.osi.office.net/m365content/publish/a505371c-2fca-4d30-ba21-8e4d36e41e65/thumbnails/large.jpg`;
export const DefaultSiteLogo : string = `_layouts/15/images/sitepagethumbnail.png`;

/**
 * This adds Search String and Meta arrays to items
 * @param items 
 * @param sourceProps 
 * @returns 
 */
export function addSearchMeta ( items: IEasyLink[], sourceProps: ISourceProps,  ): IEasyLink[] {

  items.map( page => {
    page.tabs = [];
    page.title = page.Title;
    page.description = page.Description;
    page.url = page.File.ServerRelativeUrl;
    page.imageUrl =  page.BannerImageUrl?.Url;
    page.imageDesc = page.BannerImageUrl?.Description;
    if ( !page.imageUrl || page.imageUrl.indexOf( DefaultSiteLogo ) > - 1 ) {
      if ( page.title?.indexOf( 'Contents' ) > -1 ) { page.imageUrl = DefaultThumbEasyContents; }
      else if ( page.title?.toLocaleLowerCase().indexOf( 'extreme' ) > -1 ) { page.imageUrl = DefaultThumbExtreme; }
      else if ( page.title === 'Home' ) { page.imageUrl = DefaultThumbEarth; }
      else {
        const EasyIconUrl = getEasyIcon( EasyIconObject, page );
        if ( EasyIconUrl ) page.imageUrl = EasyIconUrl ? EasyIconUrl : page.imageUrl; // If one is found, then use it, else use the defaul sitepagelogo
        if ( EasyIconUrl ) page.imageDesc = EasyIconUrl ? `Using EasyIcon:) ${ EasyIconUrl.replace( EasyIconLocation, '' )}` : page.imageDesc; // If one is found, then use it, else use the defaul sitepagelogo
      }

    }
    page.searchTextLC = `${page.Title} || ${page.Description}`.toLocaleLowerCase();
    sourceProps.meta1.map( ( tab : string ) => {
      if ( page.searchTextLC.indexOf( tab.toLocaleLowerCase() ) > -1 ) page.tabs.push( tab );
    } );
  });

  items.map( page => {
    if ( page.tabs.length === 0 ) page.tabs.push( sourceProps.overflowTab );

  });


  return items;


}