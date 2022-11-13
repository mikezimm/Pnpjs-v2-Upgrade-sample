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

export interface IEasyPagesProps {
  context: WebPartContext;
  pageLayout: ISupportedHost;  //  SharePointFullPage
  showTricks: boolean;  // For special dev links in EasyPages
  pinState: IPinMeState;      // To be used when rebuilding the Banner and FetchBanner components
  expanded: boolean;

  easyPageEnable: boolean;

  toggleExpanded?: any;
  tabsC: string[];  // Tabs for Current site
  tabsP: string[];  // Tabs for Parent site
  tabsA: string[];  // Tabs for Alt site
  overflowTab?: string;
  fetchParent?: boolean; //Include parent site pages
  altSitePagesUrl?: string; //Include alternate site's site pages
  atlSiteTitle?: string;  // Button Text for Alternate Site
  // altSiteNavigation?: string; //Include navigation elements from other site
  styles?: React.CSSProperties;  //Optional styles on entire page
  containerStyles?: React.CSSProperties;  //Optional styles on container element
}

export interface IEasyPagesHookProps {
  easyPagesProps: IEasyPagesProps;
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
  const { context, expanded, tabsC, tabsP, tabsA, overflowTab, fetchParent, altSitePagesUrl, atlSiteTitle, styles, containerStyles, showTricks } = props.easyPagesProps;

  const realAltSite : IEasyPageSource = atlSiteTitle ? atlSiteTitle as IEasyPageSource : altSitePagesUrl as IEasyPageSource;
  const [ source, setSource ] = useState<IEasyPageSource>( 'Current' );
  const [ tab, setTab ] = useState<string>( tabsC.length > 0 ? tabsC[0] : 'Pages' );
  const [ activeTabs, setActiveTabs ] = useState<string[]>( tabsC.length > 0 ? [ ...tabsC, ...[ InfoTab ] ]: ['Pages'] );
  const [ expandedState, setExpandedState ] = useState<boolean>(expanded);
  const [ filtered, setFiltered ] = useState<IEasyLink[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ parentUrl , setParentUrl ] =  useState<string>( context.pageContext.web.absoluteUrl !== context.pageContext.site.absoluteUrl ? context.pageContext.site.absoluteUrl : '' );  // Needed here because it's also used in current site

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ altNav, setAltNav ] = useState<IEasyLink[]>([]);  // Currently not used

  /**
   * CURRENT SITE STATE
   */
  const [ tabC, setTabC ] = useState<string>( tabsC.length > 0 ? tabsC[0] : 'Pages' );
  const [ sourceC, setSourceC ] = useState<ISourceProps>( () => createNewSitePagesSource( 'Current', context.pageContext.web.absoluteUrl, tabsC, overflowTab, showTricks ));
  const [ showTabsC, setShowTabsC ] = useState<string[]>( tabsC.length > 0 ? [ ...tabsC, ...[ InfoTab ] ]: ['Pages'] );
  const [ fetchedC, setFetchedC ] = useState<boolean>(false);
  const [ performanceC, setPerformanceC ] = useState<ILoadPerformance>( () => createBasePerformanceInit( 1, false ));
  const [ pagesC, setPagesC ] = useState<IEasyLink[]>([]);

  /**
   * PARENT SITE STATE
   */
  const [ tabP, setTabP ] = useState<string>( tabsP.length > 0 ? tabsP[0] : 'Pages' );
  const [ showTabsP, setShowTabsP ] = useState<string[]>( tabsP.length > 0 ? [ ...tabsP, ...[ InfoTab ] ]: ['Pages'] );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ sourceP, setSourceP ] = useState<ISourceProps>( () => createNewSitePagesSource( 'Parent',  parentUrl, tabsP, overflowTab, showTricks ));
  const [ fetchedP, setFetchedP ] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ performanceP, setPerformanceP ] = useState<ILoadPerformance>( () => createBasePerformanceInit( 1, false ));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ pagesP, setPagesP ] = useState<IEasyLink[]>([]);


  /**
   * ALTERNATE SITE STATE
   */
  const [ tabA, setTabA ] = useState<string>( tabsA.length > 0 ? tabsA[0] : 'Pages' );
  const [ showTabsA, setShowTabsA ] = useState<string[]>( tabsA.length > 0 ? [ ...tabsA, ...[ InfoTab ] ]: ['Pages'] );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ sourceA, setSourceA ] = useState<ISourceProps>( () => createNewSitePagesSource( realAltSite, altSitePagesUrl, tabsA, overflowTab, showTricks ));
  const [ fetchedA, setFetchedA ] = useState<boolean>(false);
  const [ performanceA, setPerformanceA ] = useState<ILoadPerformance>( () => createBasePerformanceInit( 1, false ));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ pagesA, setPagesA ] = useState<IEasyLink[]>([]);


/***
 *     .o88b. db    db d8888b. d8888b. d88888b d8b   db d888888b      .d8888. d888888b d888888b d88888b 
 *    d8P  Y8 88    88 88  `8D 88  `8D 88'     888o  88 `~~88~~'      88'  YP   `88'   `~~88~~' 88'     
 *    8P      88    88 88oobY' 88oobY' 88ooooo 88V8o 88    88         `8bo.      88       88    88ooooo 
 *    8b      88    88 88`8b   88`8b   88~~~~~ 88 V8o88    88           `Y8b.    88       88    88~~~~~ 
 *    Y8b  d8 88b  d88 88 `88. 88 `88. 88.     88  V888    88         db   8D   .88.      88    88.     
 *     `Y88P' ~Y8888P' 88   YD 88   YD Y88888P VP   V8P    YP         `8888Y' Y888888P    YP    Y88888P 
 *                                                                                                      
 *                                                                                                      
 */

  useEffect(() => {
    //  https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

    if ( expandedState === true && fetchedC === false && source === 'Current' ) {
      const getPages = async (): Promise<void> => {
        const pagesResults = await getPagesContent( sourceC, props.EasyIconsObject, parentUrl, );
        const actualTabs = getUsedTabs( sourceC, pagesResults.items );
        actualTabs.push( InfoTab );
        const links: IEasyLink[] = compoundArrayFilter( pagesResults.items, actualTabs[0], '' );
        setTab( actualTabs[0] );
        setTabC( actualTabs[0] );
        setFetchedC( true );
        setFiltered( links );
        setPagesC( pagesResults.items );
        setShowTabsC( actualTabs );
        setActiveTabs( actualTabs );
        setPerformanceC( pagesResults.performance );
      };

      // eslint-disable-next-line no-void
      void getPages(); // run it, run it

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, [ source, expandedState ] );

/***
 *    d8888b.  .d8b.  d8888b. d88888b d8b   db d888888b      .d8888. d888888b d888888b d88888b 
 *    88  `8D d8' `8b 88  `8D 88'     888o  88 `~~88~~'      88'  YP   `88'   `~~88~~' 88'     
 *    88oodD' 88ooo88 88oobY' 88ooooo 88V8o 88    88         `8bo.      88       88    88ooooo 
 *    88~~~   88~~~88 88`8b   88~~~~~ 88 V8o88    88           `Y8b.    88       88    88~~~~~ 
 *    88      88   88 88 `88. 88.     88  V888    88         db   8D   .88.      88    88.     
 *    88      YP   YP 88   YD Y88888P VP   V8P    YP         `8888Y' Y888888P    YP    Y88888P 
 *                                                                                             
 *                                                                                             
 */
  
  useEffect(() => {
    //  https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

    if ( expandedState === true && fetchedP === false && source === 'Parent'  ) {
      const getPages = async (): Promise<void> => {
        const pagesResults = await getPagesContent( sourceP, props.EasyIconsObject, '', );
        const actualTabs = getUsedTabs( sourceP, pagesResults.items );
        actualTabs.push( InfoTab );
        const links: IEasyLink[] = compoundArrayFilter( pagesResults.items, actualTabs[0], '' );
        setTab( actualTabs[0] );
        setTabP( actualTabs[0] );
        setFetchedP( true );
        setFiltered( links );
        setPagesP( pagesResults.items );
        setShowTabsP( actualTabs );
        setActiveTabs( actualTabs );
        setPerformanceP( pagesResults.performance );
      };

      // eslint-disable-next-line no-void
      void getPages(); // run it, run it

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, [ source, expandedState ] );

/***
 *     .d8b.  db      d888888b d88888b d8888b. d8b   db  .d8b.  d888888b d88888b      .d8888. d888888b d888888b d88888b 
 *    d8' `8b 88      `~~88~~' 88'     88  `8D 888o  88 d8' `8b `~~88~~' 88'          88'  YP   `88'   `~~88~~' 88'     
 *    88ooo88 88         88    88ooooo 88oobY' 88V8o 88 88ooo88    88    88ooooo      `8bo.      88       88    88ooooo 
 *    88~~~88 88         88    88~~~~~ 88`8b   88 V8o88 88~~~88    88    88~~~~~        `Y8b.    88       88    88~~~~~ 
 *    88   88 88booo.    88    88.     88 `88. 88  V888 88   88    88    88.          db   8D   .88.      88    88.     
 *    YP   YP Y88888P    YP    Y88888P 88   YD VP   V8P YP   YP    YP    Y88888P      `8888Y' Y888888P    YP    Y88888P 
 *                                                                                                                      
 *                                                                                                                      
 */

  useEffect(() => {
    //  https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

    if ( expandedState === true && fetchedA === false && source === realAltSite  ) {
      const getPages = async (): Promise<void> => {
        const pagesResults = await getPagesContent( sourceA, props.EasyIconsObject, '', );
        const actualTabs = getUsedTabs( sourceA, pagesResults.items );
        actualTabs.push( InfoTab );
        const links: IEasyLink[] = compoundArrayFilter( pagesResults.items, actualTabs[0], '' );
        setTab( actualTabs[0] );
        setTabA( actualTabs[0] );
        setFetchedA( true );
        setFiltered( links );
        setPagesA( pagesResults.items );
        setShowTabsA( actualTabs );
        setActiveTabs( actualTabs );
        setPerformanceA( pagesResults.performance );
      };

      // eslint-disable-next-line no-void
      void getPages(); // run it, run it

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, [ source, expandedState ] );


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
    const links: IEasyLink[] = compoundArrayFilter( pagesC, tabC, '' );
    setSource( 'Current' );
    setTab( tabC );
    setActiveTabs( showTabsC );
    setFiltered( links );
  }

  const setSourceParent = ( ): void => {
    const links: IEasyLink[] = compoundArrayFilter( pagesP, tabP, '' );
    setSource( 'Parent' );
    setTab( tabP );
    setActiveTabs( showTabsP );
    setFiltered( links );
  }

  const setSourceAlternate = ( ): void => {
    const links: IEasyLink[] = compoundArrayFilter( pagesA, tabA, '' );
    setSource( realAltSite );
    setTab( tabA );
    setActiveTabs( showTabsA );
    setFiltered( links );
  }

  const setSourceDev = ( ): void => {
    // const links: IEasyLink[] = compoundArrayFilter( altPages, showTabsA[0], '' );
    setSource( EasyPagesDevTab );
    setTab( '' );
    setActiveTabs( [] );
    setFiltered( EasyDevPages );
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

  const onTextSearch = ( item: any, text: string = '' ): void => {
    const SearchValue : string = typeof item === 'string' ? item : item && item.target && item.target.value ? item.target.value : '';
    let allLinks: IEasyLink[] = [];
    if ( source === 'Current' ) allLinks = pagesC ;
    if ( source === 'Parent' ) allLinks = pagesP ;
    if ( source === realAltSite ) allLinks = pagesA ;
    if ( source === EasyPagesDevTab ) allLinks = EasyDevPages ;

    const links: IEasyLink[] = compoundArrayFilter( allLinks, SearchValue, text );
    setFiltered( links );
    setTab( SearchValue );
    if ( source  === 'Current' ) setTabC( SearchValue )
    if ( source  === 'Parent' ) setTabP( SearchValue )
    if ( source  === realAltSite ) setTabA( SearchValue )
  }

  // item SHOULD BE IPivotItemProps but have to cast as any in order to get itemKey and headerText
  const pivotClick = ( item?: PivotItem, ev?: React.MouseEvent<HTMLElement> ): void => {
    //Because of Performance Tab, need to adjust what is returned.   have to use .indexOf because itemKey value is .$FetchInfo
    const itemKey = !item.props.headerText ? InfoTab : item.props.headerText ;
    onTextSearch( itemKey );

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
  if ( props.easyPagesProps.pageLayout === 'SharePointFullPage' || props.easyPagesProps.pageLayout === 'SingleWebPartAppPageLayout' ) classNames.push ( 'easy-pages-spa' );
  if ( ( props.easyPagesProps.pinState === 'pinFull' || props.easyPagesProps.pinState === 'pinMini' ) && classNames.indexOf('easy-pages-spa') < 0 ) classNames.push ( 'easy-pages-spa' );

  // fetchParent?: boolean; //Include parent site pages
  // altSitePagesUrl?: string; //Include alternate site's site pages

  const sourceTabs: IEasyPageSource[] = [ 'Current' ];
  if ( fetchParent === true ) sourceTabs.push( 'Parent' );
  if ( altSitePagesUrl ) sourceTabs.push( realAltSite );
  if ( showTricks === true )  sourceTabs.push( EasyPagesDevTab );

  let showPerformance: ILoadPerformance = performanceC;
  if ( source === 'Parent' )showPerformance = performanceP;
  if ( source === realAltSite )showPerformance = performanceA;
  if ( source === EasyPagesDevTab )showPerformance = null;

  const EasyPagesElement: JSX.Element = <div className = { classNames.join( ' ' ) } style={ styles }>

    <Pivot 
          linkFormat={PivotLinkFormat.tabs}
          linkSize={PivotLinkSize.normal}
      //   style={{ flexGrow: 1, paddingLeft: '10px' }}
      //   styles={ null }
      //   linkSize= { pivotOptionsGroup.getPivSize('normal') }
      //   linkFormat= { pivotOptionsGroup.getPivFormat('links') }
        onLinkClick= { sourceClick.bind(this) }  //{this.specialClick.bind(this)}
        selectedKey={ source }
      >
      { sourceTabs.map( ( tab: string ) => {
        return <PivotItem key={ tab } itemKey={ tab } headerText={ tab !== InfoTab ? tab : '' } itemIcon={ tab === InfoTab ? InfoIcon : null } />
      })}

    </Pivot>

    <Pivot 
          linkFormat={PivotLinkFormat.links}
          linkSize={PivotLinkSize.normal}
      //   style={{ flexGrow: 1, paddingLeft: '10px' }}
      //   styles={ null }
      //   linkSize= { pivotOptionsGroup.getPivSize('normal') }
      //   linkFormat= { pivotOptionsGroup.getPivFormat('links') }
        onLinkClick= { pivotClick.bind(this) }  //{this.specialClick.bind(this)}
        selectedKey={ tab }
      >
      { activeTabs.map( ( tab: string ) => {
        return <PivotItem key={ tab } itemKey={ tab } headerText={ tab !== InfoTab ? tab : '' } itemIcon={ tab === InfoTab ? InfoIcon : null } />
      })}

    </Pivot>

    <Icon iconName={ 'ChromeClose' } title={ 'Close Easy Pages panel'} 
        onClick= { () => props.easyPagesProps.toggleExpanded() } className={ 'easy-pages-close' } />

    { tab === InfoTab ? createPerformanceTableVisitor( showPerformance, ['fetch1', 'analyze1' ] ) : 
      <div className = { [ 'easy-container', source === EasyPagesDevTab ? 'easy-container-2col' : null ].join( ' ' ) } style={ containerStyles }>
        { filtered.map( link => { return easyLinkElement( link, '_blank'  ) } ) }
      </div>
    }
  </div>;

  return ( EasyPagesElement );

}

export default EasyPagesHook;