import * as React from 'react';
import { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2 } from '../../../fpsReferences';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';

// import styles from '../PropPaneCols.module.scss';

import { IMinField } from "./IPropPaneColsProps";


export interface ISelectedTableHookProps {
  selected: IMinField[];
  onKeeperClick: any;
  onDirectionClick: any;
  showFieldPanel: any;
}

// export const SelectedTableHook( selected: IMinField[], onKeeperClick: any, onDirectionClick: any , showFieldPanel: any) : JSX.Element {
const SelectedTableHook: React.FC<ISelectedTableHookProps> = ( props ) => {

  const tableRows: any[] = [];
  tableRows.push( 
    <tr>
      <th/>
      <th style={{ }}>Keep</th>
      <th>Title</th>
      <th>Type</th>
      <th>Up</th>
      <th>Down</th>
    </tr>
  );

  const { selected, onKeeperClick, onDirectionClick, showFieldPanel } = props;

  let selectedIndex: number = -1;
  selected.map( ( field: IMinField, idx: number ) => {

    const disableUp : boolean = idx === 0 ? true : false;
    const disableDown : boolean = idx === selected.length -1 ? true : false;
    const isKeeper: boolean = field.isKeeper;
    if ( isKeeper === true ) selectedIndex ++;

    const KeeperIcon = <Icon className={ 'select-icon' } data-fieldname={ field.InternalName }  
      onClick= { onKeeperClick } iconName={ isKeeper === true ? 'CheckboxComposite' : 'Checkbox' }/>;

    const UpIcon = <Icon className={ 'command-icon' } data-fieldname={ field.InternalName } data-direction={ 'up' } 
      style={{ color: disableUp === true ? 'dimgray' : '' }}
      onClick= { disableUp !== true ? onDirectionClick : null } iconName={ disableUp === false ? 'Up' : 'StatusCircleBlock2' }/>;

    const DownIcon = <Icon className={ 'command-icon' } data-fieldname={ field.InternalName } data-direction={ 'down' } 
      style={{ color: disableDown === true ? 'dimgray' : '' }}
      onClick= { disableDown !== true ? onDirectionClick : null } iconName={ disableDown === false ? 'Down': 'StatusCircleBlock2'  }/>;

    const row = <tr>
      <td>{ isKeeper === true ? selectedIndex : ''}</td>
      <td>{KeeperIcon}</td>

      <td style={{ fontWeight: isKeeper === true ? 700 : 400 }} title={ field.InternalName }
        data-fieldname={ field.InternalName } data-fieldindex={ field.idx } onClick= { () => showFieldPanel( field, this ) } >{ field.Title }</td>

      <td title={field.TypeAsString}>{ field.TypeAsString }</td>
      <td>{ UpIcon }</td>
      <td>{ DownIcon }</td>
    </tr>;
    tableRows.push( row );

  });

  const SelectedTable: JSX.Element = <table className={ 'selected-table'}>
        { tableRows }
      </table>;

  return ( SelectedTable );

}

export default SelectedTableHook;