import * as React from 'react';
import { useState, useEffect } from 'react';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2 } from '../../../../fpsReferences';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import { getExpandColumns, getSelectColumns } from '../../../../fpsReferences';



require('./easypages.css');

// import styles from '../PropPaneCols.module.scss';

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { easyLinkElement } from './elements';
import { sortObjectArrayByStringKeyCollator } from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';
import { compoundArrayFilter, getPagesContent, getUsedTabs } from './functions';
import { createNewSitePagesSource, DefaultOverflowTab, ISourceProps, SitePagesSource } from './types';
import { IEasyIconProps, IEasyIcons } from '../EasyIcons/eiTypes';
import { setEasyIconsObjectProps } from '../EasyIcons/eiFunctions';

export interface IEasyPagesProps {
  context: WebPartContext;
  expanded: boolean;
  tabs: string[];
  overflowTab?: string;
  fetchParent?: boolean; //Include parent site pages
  altSitePagesUrl?: string; //Include alternate site's site pages
  altSiteNavigation?: string; //Include navigation elements from other site
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

// export function createViewBuilder( selected: IMinField[], onExpandRight: any = null ) : JSX.Element {

const EasyPagesHook: React.FC<IEasyPagesHookProps> = ( props ) => {

  const { context, expanded, tabs, overflowTab, fetchParent, altSitePagesUrl, altSiteNavigation, styles, containerStyles } = props.easyPagesProps;

  const [ tab, setTab ] = useState<string>( tabs.length > 0 ? tabs[0] : 'Pages' );
  const [ showTabs, setShowTabs ] = useState<string[]>( tabs.length > 0 ? tabs : ['Pages'] );

  const [ currentSource, setCurrentSource ] = useState<ISourceProps>( createNewSitePagesSource( context.pageContext.web.absoluteUrl, tabs, overflowTab ));
  const [ fetched, setFetched ] = useState<boolean>(false);
  const [ filtered, setFiltered ] = useState<IEasyLink[]>([]);
  const [ current, setCurrent ] = useState<IEasyLink[]>([]);
  const [ parent, setParent ] = useState<IEasyLink[]>([]);
  const [ altPages, setAltPages ] = useState<IEasyLink[]>([]);
  const [ altNav, setAltNav ] = useState<IEasyLink[]>([]);

  useEffect(() => {
    //  https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

    if ( expanded === true && fetched === false ) {
      const getPages = async (): Promise<void> => {
        const pages = await getPagesContent( currentSource, props.EasyIconsObject );
        const actualTabs = getUsedTabs( currentSource, pages );
        const links: IEasyLink[] = compoundArrayFilter( pages, actualTabs[0], '' );
        setTab( actualTabs[0] );
        setFetched( true );
        setFiltered( links );
        setCurrent( pages );
        setShowTabs( actualTabs );
      };

      // eslint-disable-next-line no-void
      void getPages(); // run it, run it

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, );

  const onTextSearch = ( item: any, text: string = '' ): void => {
    const SearchValue : string = typeof item === 'string' ? item : item && item.target && item.target.value ? item.target.value : '';
    const  allLinks: IEasyLink[] = [ ...current, ...parent, ...altPages, ...altNav ];
    const links: IEasyLink[] = compoundArrayFilter( allLinks, SearchValue, text );
    setFiltered( links );
    setTab( SearchValue );
  }

  const pivotClick = ( item?: PivotItem, ev?: React.MouseEvent<HTMLElement> ): void => {
    const itemKey = item.props.headerText;
    onTextSearch( itemKey );

  }

  const classNames = [ 'easy-pages', expanded === true ? 'expand' : null ].join( ' ' );
  const EasyPagesElement: JSX.Element = <div className = { classNames } style={ styles }>
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
      { showTabs.map( ( tab: string ) => {
        return <PivotItem key={ tab } headerText={ tab } />
      })}

    </Pivot>
    <div className = { 'easy-container' } style={ containerStyles }>
      { filtered.map( link => { return easyLinkElement( link, '_blank'  ) } ) }
    </div>
  </div>;

  return ( EasyPagesElement );

}

export default EasyPagesHook;