import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2 } from '../../../../fpsReferences';
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
import Accordion from '@mikezimm/npmfunctions/dist/zComponents/Accordion/Accordion';

export function createViewBuilder( selected: IMinField[], onToggleAccordion: any = null, onExpandRight: any = null ) : JSX.Element {

  const viewFields: IViewField[] = [];

  selected.map( field => {
    if ( field.isKeeper === true ) {
      viewFields.push( createThisViewField( field ) );
    }
  });

  const expandRightIcon = <Icon iconName={ 'TransitionPop' } title={ 'Expand right to see button object'} style={{  }}
    data-fieldtype= 'Commands' onClick= { onExpandRight } className={ 'type-filter-icon' } />;

  const viewElement: JSX.Element = <div>
    { expandRightIcon }
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

  return DesignViews;

}


