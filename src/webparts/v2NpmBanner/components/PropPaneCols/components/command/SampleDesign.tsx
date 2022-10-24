
import * as React from 'react';
import { useState, useEffect } from 'react';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import ReactJson from 'react-json-view';

import { IButtonSummary, IQuickCommandsDesign } from './IAccordion';
import { IQuickButton } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

export interface IPanelItemProps {
  CommandDesign: IQuickCommandsDesign;
  onClosePanel: any;
}

// export function getSampleDesign( panelItem: IMinField, onClosePanel: any, searchText: string ) : JSX.Element {
const SampleDesignHook: React.FC<IPanelItemProps> = ( props ) => {

  const { CommandDesign } = props;

  //No matter what I do here, I seem to get error 310 whenever trying to do anything with state.
  const [ label, setLabel ] = useState<string>('');

  // const clickSummary = ( idx: number ) : void => {
  //   console.log( 'clicked', idx )
  // }

  // function createButtonRow( button: IButtonSummary, idx: number ): JSX.Element {

  //   if ( button.type !== 'choice' ){
  //     const text:string[] = button.label.split('||');
  //     // return <div className={ button.type } style={{ position: idx === 0 ? 'relative' : 'absolute' }}>
  //     return <div className={ button.type } style={ null } onClick= { () => clickSummary( idx ) }>
  //       <div>{ text[0] }</div>
  //       <div>{ text.length === 1 ? null : text [1] }</div>
  //     </div>;
  //     //ERROR READING TYPE HERE
  //   } else if ( idx === 0 || ( button.type === 'choice' && CommandDesign.summary[ idx-1 ].type !== 'choice' ) ) {
  //     return createChoiceStack( idx );  //
  //   }

  // }

  // function createChoiceStack( idx: number ): JSX.Element {
  //   const ChoiceButtonArray: JSX.Element[] = [];
  //   let i = idx + 0;
  //   let offset = 0;
  //   while( i < CommandDesign.summary.length && CommandDesign.summary[ i ].type === 'choice' ) {
  //     ChoiceButtonArray.push( <div className={ 'choice' } style={{ position: 'absolute', top: `${offset}px`, left: `${offset}px` }}
  //     onClick= { () => clickSummary( i ) }>
  //       <div>{ CommandDesign.summary[ i ].label }</div>
  //     </div> );
  //     i ++;
  //     offset = ( i - idx ) * 20;
  //   }

  //   return <div className={ 'choice-stack' } style={{ marginBottom: `${offset + 10 }px` }}>
  //     { ChoiceButtonArray }
  //   </div>;
  // }

  // function getClickedButtonFromSummary( idx: number ) : IQuickButton {
  //   if ( idx > -1 ) {
  //     let equivilantSummary = -1;
  //     let ActualButton: IQuickButton = null;
  //     CommandDesign.buttons.map( ( buttonRow: IQuickButton[] ) => {
  //       buttonRow.map( ( button: IQuickButton ) => {
  //         equivilantSummary ++;
  //         if ( idx === equivilantSummary ) ActualButton = button ;
  //       });
  //     } );

  //     return ActualButton;
  //   } else return null;


  // }

  // const clickedSummary = 999;
  // const ActionCommand: IQuickButton = getClickedButtonFromSummary( clickedSummary );

  // const AttachPanel: JSX.Element = <Panel
  //         isOpen={ CommandDesign.buttons.length > 0 ? true : false }
  //         type={ PanelType.medium }
  //         // onDismiss={ onClosePanel }
  //         onDismiss={ () => props.onClosePanel() }
  //         headerText={ `Sample Button Sett` }
  //         closeButtonAriaLabel="Close"
  //         isLightDismiss={ true }
  //     >
  //       <div className='sample-panel'>
  //         <div> fu </div>
  //         {/* { CommandDesign.summary.map( ( summary: IButtonSummary, idx: number ) => createButtonRow ( summary, idx ) ) } */}

  //         {/* <div style={{ display: clickedSummary > -1 ? '' : 'none' }}>
  //           <h3>This is button that was clicked last {clickedSummary}</h3>
  //           <ReactJson src={ ActionCommand } name={ 'clickedButton' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } 
  //           enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
  //         </div> */}

  //       </div>



  //   </Panel>;

  // return ( AttachPanel );
  return ( null );

}

export default SampleDesignHook;