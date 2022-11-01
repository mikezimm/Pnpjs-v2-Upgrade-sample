
import * as React from 'react';
import { useState, useEffect } from 'react';

import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import ReactJson from 'react-json-view';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2 } from '../../../fpsReferences';

import { IMinField } from "./IPropPaneColsProps";
import { panelActionToggles } from './common';

const randomColors: string[] = [ 'black', 'red', 'blue', 'purple', 'brown', 'darkgreen', 'orange', ]

export interface IPanelItemProps {
  panelItem: IMinField;
  searchText: string;
  onClosePanel: any;
  // expand?: boolean;
}

const SelectedItemPanelHook: React.FC<IPanelItemProps> = ( props ) => {

  const { panelItem, searchText, onClosePanel } = props; //onClosePanel

  const [ type, setSide ] = useState<PanelType>( PanelType.custom );
  const [ blocking, setBlock ] = useState<boolean>( true );

  const panelItemAny: any = panelItem;

  function fieldRow( prop: string, idx: number ): JSX.Element {
    const color: string = randomColors [ ( idx + randomColors.length  ) % randomColors.length ];
    return panelItemAny [prop] === undefined || panelItemAny [prop] === '' || panelItemAny [prop] === null ? null : 
    <li key={prop} style={{ marginBottom: '3px' }}>{prop} : <span style={{ fontWeight: 500, color: color }}>{ JSON.stringify( panelItemAny [prop] ) }</span></li>;
  }

  // const IconStyles: React.CSSProperties = { cursor: 'pointer', fontSize: 'x-large', marginLeft: '20px' };
  const AttachPanel: JSX.Element = !panelItem ? null : 
      <Panel
          isOpen={ panelItem ? true : false }
          type={ type }
          isBlocking={ blocking }
          // onDismiss={ onClosePanel }
          onDismiss={ () => onClosePanel() }
          headerText={ `${ panelItem.Title } - ${ panelItem.InternalName }` }
          closeButtonAriaLabel="Close"
          isLightDismiss={ true }
          customWidth={ '700px' }
      >
        { panelActionToggles ( type, blocking, setSide, setBlock )}
        <ul style={{ marginBottom: '30px', fontSize: 'larger' }}>
          { ['Description', 'TypeAsString', 'Group', 'FillInChoice', 'Choices', 'Formula', 'DefaultValue' ].map( ( prop: string, idx: number ) => {
            return fieldRow( prop, idx );
          }) }
        </ul>

        <ul style={{ marginBottom: '30px', fontSize: 'larger' }}>
          { [ 'Required', 'EnforceUniqueValues', 'ReadOnlyField', 'Indexed', 'IndexStatus',  ].map( ( prop: string, idx: number ) => {
            return fieldRow( prop, idx );
          }) }
        </ul>

        <ul style={{ fontSize: 'larger' }}>
          { [ 'searchTextLC',  ].map( ( prop: string, idx: number ) => {
            return <li key={prop}>{prop} : <span style={{ color: 'purple' }}>
                { getHighlightedText( JSON.stringify( panelItemAny [prop] ), searchText.toLowerCase() )  }</span></li>
          }) }
        </ul>

        <ReactJson src={ panelItem } name={ 'Field Details' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false }
          enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
    </Panel>;

  return ( AttachPanel );

}

export default SelectedItemPanelHook;