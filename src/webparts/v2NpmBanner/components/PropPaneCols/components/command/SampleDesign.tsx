
import * as React from 'react';
import { useState, useEffect } from 'react';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
// import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import { IButtonSummary, IQuickCommandsDesign } from './IAccordion';
import { IQuickButton } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';

export interface IPanelItemProps {
  CommandDesign: IQuickCommandsDesign;
  onClosePanel: any;
}

// const ConstIcon = <Icon iconName={ 'Stack' } title={ 'Is a choice button' } style={{  }}
//     data-fieldtype= 'Choice' className={ 'type-filter-icon' } />

// export function getSampleDesign( panelItem: IMinField, onClosePanel: any, searchText: string ) : JSX.Element {
const SampleDesignHook: React.FC<IPanelItemProps> = ( props ) => {

  const { CommandDesign } = props;
  
  // Setting state in any way causes react error 310.
  // https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/36
  // const [ label, setLabel ] = useState<string>('');

  // const IconStyles: React.CSSProperties = { cursor: 'pointer', fontSize: 'x-large', marginLeft: '20px', color: 'lightgray' };

  // let firstChoice: null;

  // For https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/36
  const clickSummary = ( idx: number ) : void => {
    console.log( 'clicked', idx );

    if ( idx > -1 ) {
      let equivilantSummary = -1;
      let ActualButton: IQuickButton = null;
      CommandDesign.buttons.map( ( buttonRow: IQuickButton[] ) => {
        buttonRow.map( ( button: IQuickButton ) => {
          equivilantSummary ++;
          if ( idx === equivilantSummary ) ActualButton = button ;
        });
      } );

      console.log( 'ActualButton', ActualButton ) ;
      alert( `Clicked ${ ActualButton.label.replace( `{str1}`, ActualButton.str1) }, Check console for details.`)
    }

  }

  function createButtonRow( button: IButtonSummary, idx: number ): JSX.Element {

    if ( button.type !== 'choice' ){
      const text:string[] = button.label.split('||');
      // return <div className={ button.type } style={{ position: idx === 0 ? 'relative' : 'absolute' }}>
      return <div className={ button.type } style={ null } onClick= { () => clickSummary( idx ) }>
        <div>{ text[0] }</div>
        <div>{ text.length === 1 ? null : text [1] }</div>
      </div>;
      //ERROR READING TYPE HERE
    } else if ( idx === 0 || ( button.type === 'choice' && CommandDesign.summary[ idx-1 ].type !== 'choice' ) ) {
      return createChoiceStack( idx );  //
    }

  }

  function createChoiceStack( idx: number ): JSX.Element {
    const ChoiceButtonArray: JSX.Element[] = [];
    let i = idx + 0;
    let offset = 0;
    while( i < CommandDesign.summary.length && CommandDesign.summary[ i ].type === 'choice' ) {
      const whileIndex = i + 0; // Had to create this or the clickSummary( ) would always just show the last index.
      ChoiceButtonArray.push( <div className={ 'choice' } style={{ position: 'absolute', top: `${offset}px`, left: `${offset}px` }}
        onClick= { () => clickSummary( whileIndex ) }>
        <div>{ CommandDesign.summary[ i ].label }</div>
      </div> );
      i ++;
      offset = ( i - idx ) * 20;
    }

    return <div className={ 'choice-stack' } style={{ marginBottom: `${offset + 10 }px` }}>
      { ChoiceButtonArray }
    </div>;
  }

  const AttachPanel: JSX.Element = <Panel
          isOpen={ CommandDesign.buttons.length > 0 ? true : false }
          type={ PanelType.medium }
          // onDismiss={ onClosePanel }
          onDismiss={ () => props.onClosePanel() }
          headerText={ `Sample Button Set` }
          closeButtonAriaLabel="Close"
          isLightDismiss={ true }
      >
        <div className='sample-panel'>
          { CommandDesign.summary.map( ( summary: IButtonSummary, idx: number ) => createButtonRow ( summary, idx ) ) }
        </div>

    </Panel>;

  return ( AttachPanel );

}

export default SampleDesignHook;