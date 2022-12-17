import * as React from 'react';
import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , } from '@mikezimm/fps-library-v2/lib/components/atoms/Elements/HighlightedText';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';

// import styles from '../PropPaneCols.module.scss';

import { IMinField } from "../IPropPaneColsProps";
import { createThisViewField } from './functions';
import ReactJson from 'react-json-view';
import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';

export interface IViewBuilderHookProps {
  selected: IMinField[];
  expanded: boolean;
  // showFieldPanel: any;
  onExpandRight: any;
  tryCallback?: any;  //if function is passed down, parent web part could use this to temporarily replace the saved button commands.
  saveCallback?: any;  // callback function to save current command

}

// export function createViewBuilder( selected: IMinField[], onExpandRight: any = null ) : JSX.Element {

const ViewBuilderHook: React.FC<IViewBuilderHookProps> = ( props ) => {

  const { selected, expanded, onExpandRight, tryCallback, saveCallback } = props;

  const viewFields: IViewField[] = [];

  selected.map( field => {
    if ( field.isKeeper === true ) {
      viewFields.push( createThisViewField( field ) );
    }
  });

  const expandRightIcon = <Icon iconName={ 'TransitionPop' } title={ 'Expand right to see button object'} style={{  }}
    data-fieldtype= 'Commands' onClick= { onExpandRight } className={ 'type-filter-icon' } />;

  const tryIcon = <Icon iconName ="Save" className={ 'type-filter-icon' } onClick={ saveCallback ? () => saveCallback( viewFields ) : null } 
      title={'Save Views Set'} style={{ display: saveCallback ? '' : 'none' }}/>
  const saveIcon = <Icon iconName ="TestImpactSolid" className={ 'type-filter-icon' } onClick={ tryCallback ? () => tryCallback( viewFields ) : null } 
      title={'Try Views Set'} style={{ display: tryCallback ? '' : 'none' }}/>

  const viewElement: JSX.Element = <div>
    <div style={{ display: 'flex' }}>
      { tryIcon }
      { saveIcon }
      { expandRightIcon }
    </div>

    <ReactJson src={ viewFields } name={ 'viewFields' } collapsed={ 1 } displayDataTypes={ false } displayObjectSize={ false } 
        enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
  </div>;

  const viewTitle = `Build Views`;

  const DesignViews: JSX.Element = <Accordion 
    title={ viewTitle }
    showAccordion={ false }
    animation= { 'TopDown' }
    contentStyles={ {height: ''} }
    content = { viewElement }
    componentStyles = {{  marginBottom: '15px', border: '4px solid #d1d1d1', background: '#f5f5f5', padding: '10px'  }}
    // toggleCallback = { onToggleAccordion }
  />;

  return ( DesignViews );

}

export default ViewBuilderHook;