
import * as React from 'react';

import { ILoadPerformance, IPerformanceOp } from '../../../fpsReferences';

import styles from '../PropPaneCols.module.scss';

import ReactJson from 'react-json-view';

export interface IFetchPaneProps {

  onClickFetchFields: any;
  designMode: boolean;
  performance : ILoadPerformance;
  status: string;

}

export function FetchPane ( props: IFetchPaneProps ): JSX.Element {

  const { performance, onClickFetchFields, designMode, status } = props;
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

