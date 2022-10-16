import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2 } from '../../../fpsReferences';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import styles from '../PropPaneCols.module.scss';

import { IMinField } from "../PropPaneColsClass";
import { createThisViewField } from './ViewFields';
import ReactJson from 'react-json-view';
import Accordion from '@mikezimm/npmfunctions/dist/zComponents/Accordion/Accordion';

export function createViewBuilder( selected: IMinField[] ) : JSX.Element {

  const viewFields: IViewField[] = [];

  selected.map( field => {
    if ( field.isKeeper === true ) {
      viewFields.push( createThisViewField( field ) );
    }
  });

  const viewElement: JSX.Element = <div>
    <ReactJson src={ viewFields } name={ 'viewFields' } collapsed={ true } displayDataTypes={ false } displayObjectSize={ false } 
        enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
  </div>;

  const DesignViews: JSX.Element = <Accordion 
    title={ `Build Views` }
    showAccordion={ false }
    animation= { 'TopDown' }
    contentStyles={ {height: ''} }
    content = { viewElement }
  />;

    return DesignViews;

  }



