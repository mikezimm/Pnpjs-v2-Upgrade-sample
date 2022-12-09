import * as React from 'react';
import { DisplayMode } from '../Interfaces/displayMode';

import { IPerformanceOp, ILoadPerformance, ILoadPerformanceOps, LoadPerformanceOps, IMinPerformanceSetting } from '../Interfaces/IPerformance';

import styles from './tables.module.scss';

export function createBasePerformanceInit( editMode: DisplayMode, monitor:  boolean ) : ILoadPerformance{

  const loadPerformance: ILoadPerformance = {
      onInit:  new Date(),
      constructor: null as any,

      sets: { },
      ops: {
        fetch:  null as any,
        analyze:  null as any,
      },

      monitor: monitor as any,
      history: [],

      mode: editMode,

  };

  return loadPerformance;

}

export function createPerformanceRows( performance: ILoadPerformance, keysToShow: ILoadPerformanceOps[] ) : JSX.Element[] { //[ 'fetch', 'analyze' ]

    // const { fetch, analyze } = performance;

    const loadRows: any[] = [
      <tr key={"header"}>
        <th>Process</th>
        <th>Mode</th>
        <th>Time</th>
        <th>ms</th>
      </tr>
    ];

    if ( !keysToShow || keysToShow.length === 0 ) { keysToShow = LoadPerformanceOps ; } 
    keysToShow.map( ( part ) => {
      if ( part?.indexOf('setting') >-1 ) {
        /**
         * Element implicitly has an 'any' type because expression of type 'number | unique symbol | "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "slice" | "split" | "substring" | ... 32 more ... | "trimEnd"' can't be used to index type '{ setting0?: IMinPerformanceSetting | undefined; setting1?: IMinPerformanceSetting | undefined; setting2?: IMinPerformanceSetting | undefined; ... 9 more ...; setting12?: IMinPerformanceSetting | undefined; }'.
    No index signature with a parameter of type 'number' was found on type '{ setting0?: IMinPerformanceSetting | undefined; setting1?: IMinPerformanceSetting | undefined; setting2?: IMinPerformanceSetting | undefined; ... 9 more ...; setting12?: IMinPerformanceSetting | undefined; }'.ts(7053)
          */

        // This works :)
        const sets: any = performance.sets;
        const thisPart : IMinPerformanceSetting | undefined = sets[ part ];
        if ( thisPart ) {
          loadRows.push( <tr>
            <td>{ thisPart.label }</td>
            <td>{ `${thisPart.value}` }</td>
          </tr>);
        }
      } else {
        const ops: any = performance.ops;
        const thisPart : IPerformanceOp | undefined = ops[part];

        if ( thisPart ) {
          const time: string = thisPart.startStr;
          loadRows.push( <tr>
            <td>{ thisPart.label }</td>
            <td>{ thisPart.mode === 1 ? 'View' : 'Edit' }</td>
            <td>{ time }</td>
            <td>{ thisPart.ms }</td>
          </tr>);
        }
      }
    });

     return loadRows;

}

/**
 * USED BY:  ALVFM This is used for the visitor panel, not code pane
 * @param performance 
 * @returns 
 */
export function createPerformanceTableVisitor( performance: ILoadPerformance , keysToShow: ILoadPerformanceOps[] ): JSX.Element {

  if ( performance ) {
    // Sample info... this was original straight css
    // const loadSummary = <div className={ 'fps-performance' } style={{ paddingLeft: '15px', paddingTop: '30px'}}>
    //   <div className={ 'fps-header-styles' }>Load Performance:</div>

    const loadSummary = <div className={ styles.fpsPerformance } style={{ paddingLeft: '15px', paddingTop: '30px'}}>
      <div className={ styles.fpsHeaderStyles }>Load Performance:</div>
      {/* Originally:  <div style={{paddingBottom: '8px'}}>forceReloadScripts: { JSON.stringify( performance.forceReloadScripts )}</div> */}
      {/* { !titleAboveTable ? null : <div style={{paddingBottom: '8px'}}>{ titleAboveTable } { JSON.stringify( objAboveTable )}</div> } */}
      <table>
          {/* { buildPerformanceTableRows( fetchInfo.performance ) } */}
          { createPerformanceRows( performance, keysToShow ) }
      </table>
    </div>;

    return ( loadSummary );

  } else {

    return ( <div>No performance available</div> );

  }
}
