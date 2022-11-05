import * as React from 'react';
import { IEasyLink } from './component';

export function easyLinkElement( link: IEasyLink, target: string = '_blank' ) : JSX.Element {

  const imageIsDefault = link.imageUrl && link.imageUrl.indexOf('_layouts/15/images/sitepagethumbnail.png') > -1 ? true : false;
  return <div className = 'easy-link' onClick={ () => { window.open( link.url , target ) } } >
    <img className={ 'easy-link-image' } src={ link.imageUrl } style={{ height: imageIsDefault === true ? '20px' : '50px' }} title={ link.imageDesc }/>
    <div className='easy-link-title'>{ link.title }</div>
    <div className='easy-link-desc'>{link.description }</div>
  </div>;

}