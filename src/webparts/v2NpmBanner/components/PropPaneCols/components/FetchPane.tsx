
import * as React from 'react';

import { ILoadPerformance, IPerformanceOp } from '../../../fpsReferences';

import styles from '../PropPaneCols.module.scss';

import ReactJson from 'react-json-view';
import { mainSiteLink } from './MainPane';
import { IMinListProps } from './IPropPaneColsProps';
// import { fetchFields } from './FetchFuncion';

export function fetchErrorPanel( fetchPane: JSX.Element, errMessage: string, webURL: string, listTitle: string ) {

  const siteLink = mainSiteLink( webURL );
  const messages: string[] = errMessage.split('-- FULL ERROR MESSAGE:');

  return ( <div className={ styles.propPaneCols } >
              <h2>There was an error trying to fetch fields for this list:</h2>
              <h3 style={{ marginTop: '0px' }}>{ `Fields from '${ listTitle }'` }</h3>
              { siteLink }
              <p style={{ fontWeight: 'bold' }}>{messages[0]}</p>
              <p style={{ fontWeight: 'bold', color: 'red' }}>{ messages[1] }</p>
              { fetchPane }
            </div>);

}


export interface IFetchPaneProps {

  onClickFetchFields: any;
  // list: IMinListProps, 
  // setState: any, 
  // updatePerformance: any
  designMode: boolean;
  performance : ILoadPerformance;
  status: string;

}

export function FetchPane ( props: IFetchPaneProps ): JSX.Element {

  // const { list, setState, updatePerformance } = props;
  const { performance, designMode, status, onClickFetchFields } = props;
  const fetch4: IPerformanceOp = performance.ops.fetch4 ;

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

        return <div className={ styles.performanceRow } key={idx}><div>{key}</div> <div>{ fetch4Any[ key ] }</div></div>;
      })
    }

  </div>;

  //This works when I pass in this._onClick...bind(this)
  // const fetchButton: JSX.Element = <div className={ styles.button } onClick={ () => onClickFetchFields() } >Fetch</div>;
  // This also works when I pass in this._onClick...bind(this)
  const fetchButton: JSX.Element = <div className={ styles.button } onClick={ onClickFetchFields } >Fetch</div>;

  return ( <div className={ [ styles.fetchPane, designMode === true ? styles.hideLeft : styles.showLeft ].join(' ') }>
      { fetchButton }
      <div style={{ margin: '20px', fontWeight: 'bolder', color: status.indexOf('Success') > -1 ? 'darkgreen': status.indexOf('Failed') > -1 ? 'red': '' }}>{ status }</div>
      <div style={{ margin: '20px' }}>{ fetchPerformance }</div>
      <ReactJson src={ performance } name={ 'performance' } collapsed={ true } displayDataTypes={ false } displayObjectSize={ false } 
          enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
    </div>
  );

}

