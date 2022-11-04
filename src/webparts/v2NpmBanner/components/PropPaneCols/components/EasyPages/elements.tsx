import * as React from 'react';
import { IEasyLink } from './component';

export function easyLinkElement( link: IEasyLink, target: string = '_blank' ) : JSX.Element {

  return <div className = 'easy-link' onClick={ () => { window.open( link.url , target ) } } >
    <div className='easy-link-title'>{ link.title }</div>
    <div className='easy-link-desc'>{link.description }</div>
  </div>;

}