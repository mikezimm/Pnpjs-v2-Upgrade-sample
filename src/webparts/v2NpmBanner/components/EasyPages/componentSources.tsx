import * as React from 'react';
import { useState, useEffect } from 'react';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2 } from '../../fpsReferences';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

// import { getExpandColumns, getSelectColumns } from '../../fpsReferences';

require('./easypages.css');

// import styles from '../PropPaneCols.module.scss';

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { easyLinkElement } from './elements';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sortObjectArrayByStringKeyCollator } from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';

import { ISupportedHost } from '@mikezimm/npmfunctions/dist/Services/PropPane/FPSInterfaces';
import { IPinMeState } from "@mikezimm/npmfunctions/dist/Services/DOM/PinMe/FPSPinMenu";

import { ILoadPerformance, } from '@mikezimm/npmfunctions/dist/Performance/IPerformance';
import { createBasePerformanceInit, } from '@mikezimm/npmfunctions/dist/Performance/functions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createPerformanceTableVisitor, createPerformanceRows } from '@mikezimm/npmfunctions/dist/Performance/tables';

import { compoundArrayFilter, getPagesContent, getUsedTabs } from './functions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createNewSitePagesSource, DefaultOverflowTab, ISourceProps, SitePagesSource, EasyPagesDevTab } from './epTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IEasyIconProps, IEasyIcons } from '../EasyIcons/eiTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { setEasyIconsObjectProps } from '../EasyIcons/eiFunctions';
import { EasyDevPages } from './devLinks';

import { IEasyPagesPageHookProps, IEasyPagesSourceProps, IEasyPagesPageProps, } from './componentPage';


export interface IEasyPagesExtraProps {

  showTricks: boolean;  // For special dev links in EasyPages
  easyPageEnable: boolean;

  toggleExpanded?: any;
  tabsC: string[];  // Tabs for Current site
  tabsP: string[];  // Tabs for Parent site
  tabsA: string[];  // Tabs for Alt site

  fetchParent?: boolean; //Include parent site pages
  altSitePagesUrl?: string; //Include alternate site's site pages
  atlSiteTitle?: string;  // Button Text for Alternate Site

}

export interface IEasyPagesHookProps {
  easyPagesCommonProps: IEasyPagesSourceProps;  // General props which apply to all Sources/Pages
  easyPagesExtraProps: IEasyPagesExtraProps;  // General props which are used on the SourcesPage but not component page
  EasyIconsObject: IEasyIcons; 
}

export interface IEasyLink extends Partial<any> {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  imageDesc: string;
  searchTextLC: string;
  type: 'current' | 'parent' | 'other' | 'nav';
  tabs: string[];
}

export type IEasyPageSource = 'Current' | 'Parent' | 'Alternate' | typeof EasyPagesDevTab ;
const InfoTab = 'FetchInfoZz79';
const InfoIcon = 'History';


/***
 *    .d8888. d888888b  .d8b.  d8888b. d888888b      db   db  .d88b.   .d88b.  db   dD 
 *    88'  YP `~~88~~' d8' `8b 88  `8D `~~88~~'      88   88 .8P  Y8. .8P  Y8. 88 ,8P' 
 *    `8bo.      88    88ooo88 88oobY'    88         88ooo88 88    88 88    88 88,8P   
 *      `Y8b.    88    88~~~88 88`8b      88         88~~~88 88    88 88    88 88`8b   
 *    db   8D    88    88   88 88 `88.    88         88   88 `8b  d8' `8b  d8' 88 `88. 
 *    `8888Y'    YP    YP   YP 88   YD    YP         YP   YP  `Y88P'   `Y88P'  YP   YD 
 *                                                                                     
 *                                                                                     
 */

const EasyPagesHook: React.FC<IEasyPagesHookProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { context, expanded, overflowTab, styles, containerStyles, } = props.easyPagesCommonProps;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tabsC, tabsP, tabsA, fetchParent, altSitePagesUrl, atlSiteTitle, showTricks } = props.easyPagesExtraProps;


  const realAltSite : IEasyPageSource = atlSiteTitle ? atlSiteTitle as IEasyPageSource : altSitePagesUrl as IEasyPageSource;
  const [ source, setSource ] = useState<IEasyPageSource>( 'Current' );
  const [ expandedState, setExpandedState ] = useState<boolean>(expanded);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ parentUrl , setParentUrl ] =  useState<string>( context.pageContext.web.absoluteUrl !== context.pageContext.site.absoluteUrl ? context.pageContext.site.absoluteUrl : '' );  // Needed here because it's also used in current site

  /***
 *     .d88b.  d8b   db       .o88b. db      d888888b  .o88b. db   dD .d8888. 
 *    .8P  Y8. 888o  88      d8P  Y8 88        `88'   d8P  Y8 88 ,8P' 88'  YP 
 *    88    88 88V8o 88      8P      88         88    8P      88,8P   `8bo.   
 *    88    88 88 V8o88      8b      88         88    8b      88`8b     `Y8b. 
 *    `8b  d8' 88  V888      Y8b  d8 88booo.   .88.   Y8b  d8 88 `88. db   8D 
 *     `Y88P'  VP   V8P       `Y88P' Y88888P Y888888P  `Y88P' YP   YD `8888Y' 
 *                                                                            
 *                                                                            
 */

  useEffect(() => {
    setExpandedState( expanded )
  }, [ expanded ] );

  const setSourceCurrent = ( ): void => {
    setSource( 'Current' );
  }

  const setSourceParent = ( ): void => {
    setSource( 'Parent' );
  }

  const setSourceAlternate = ( ): void => {
    setSource( realAltSite );
  }

  const setSourceDev = ( ): void => {
    // const links: IEasyLink[] = compoundArrayFilter( altPages, showTabsA[0], '' );
    setSource( EasyPagesDevTab );
  }

  // item SHOULD BE IPivotItemProps but have to cast as any in order to get itemKey and headerText
  const sourceClick = ( item?: PivotItem, ev?: React.MouseEvent<HTMLElement> ): void => {
    //Because of Performance Tab, need to adjust what is returned.   have to use .indexOf because itemKey value is .$FetchInfo
    const itemKey: IEasyPageSource = !item.props.headerText ? InfoTab as IEasyPageSource : item.props.headerText as IEasyPageSource;
    if ( itemKey === 'Current' ) setSourceCurrent( );
    if ( itemKey === 'Parent' ) setSourceParent( );
    if ( itemKey === realAltSite ) setSourceAlternate( );
    if ( itemKey === EasyPagesDevTab ) setSourceDev( );

  }

  /***
 *    d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
 *    88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
 *    88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
 *    88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
 *    88.     88booo. 88.     88  88  88 88.     88  V888    88    
 *    Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
 *                                                                 
 *                                                                 
 */

  //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/56
  const classNames: string[] = [ 'easy-pages' ];
  if ( expandedState === true ) classNames.push ( 'expand' );
  if ( props.easyPagesCommonProps.pageLayout === 'SharePointFullPage' || props.easyPagesCommonProps.pageLayout === 'SingleWebPartAppPageLayout' ) classNames.push ( 'easy-pages-spa' );
  if ( ( props.easyPagesCommonProps.pinState === 'pinFull' || props.easyPagesCommonProps.pinState === 'pinMini' ) && classNames.indexOf('easy-pages-spa') < 0 ) classNames.push ( 'easy-pages-spa' );

  // fetchParent?: boolean; //Include parent site pages
  // altSitePagesUrl?: string; //Include alternate site's site pages

  const sourceTabs: IEasyPageSource[] = [ 'Current' ];
  if ( fetchParent === true ) sourceTabs.push( 'Parent' );
  if ( altSitePagesUrl ) sourceTabs.push( realAltSite );
  if ( showTricks === true )  sourceTabs.push( EasyPagesDevTab );

  const EasyPagesSourceElement: JSX.Element = <div className = { classNames.join( ' ' ) } style={ styles }>

    <Pivot 
          linkFormat={PivotLinkFormat.tabs}
          linkSize={PivotLinkSize.normal}
        onLinkClick= { sourceClick.bind(this) }  //{this.specialClick.bind(this)}
        selectedKey={ source }
      >
      { sourceTabs.map( ( tab: string ) => {
        return <PivotItem key={ tab } itemKey={ tab } headerText={ tab !== InfoTab ? tab : '' } itemIcon={ tab === InfoTab ? InfoIcon : null } />
      })}

    </Pivot>

  </div>;

  return ( EasyPagesSourceElement );

}

export default EasyPagesHook;