import * as React from 'react';
import { IEasyLink } from './component';

import { EasyPagesDevTab } from './epTypes';

export function easyLinkElement( link: IEasyLink, target: string = '_blank' ) : JSX.Element {

  const imageIsDefault = link.imageUrl && link.imageUrl.indexOf('_layouts/15/images/sitepagethumbnail.png') > -1 ? true : false;
  const newTarget = link.tabs.indexOf(EasyPagesDevTab) < 0 ? target : '_blank';
  const newClass = [ 'easy-link' ];
  if ( link.tabs.indexOf(EasyPagesDevTab) > -1 ) newClass.push( 'easy-link-2col' );
  //	  display: grid;
  //grid-template-columns: 300px 300px;
  return <div className = { newClass.join( ' ' ) } onClick={ () => { window.open( link.url , newTarget ) } } >
    <img className={ 'easy-link-image' } src={ link.imageUrl } style={{ height: imageIsDefault === true ? '20px' : '50px' }} title={ link.imageDesc }/>

    <div className='easy-link-title' style={{ fontSize: link.title ? '' : 'smaller', fontWeight: link.title ? null : 400 }}>
        { link.title ? link.title : `Page does NOT have a title :(` }</div>

    <div className='easy-link-desc'>{link.description }</div>
  </div>;

}

