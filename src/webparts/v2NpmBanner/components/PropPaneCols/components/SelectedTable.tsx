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


export function buildSelectedFieldTable( selected: IMinField[], onKeeperClick: any, onDirectionClick: any ) : JSX.Element {

  const tableRows: any[] = [];
  tableRows.push( 
    <tr>
      <th style={{ }}>Keep</th>
      <th>Title</th>
      <th>Type</th>
      <th>Up</th>
      <th>Down</th>
    </tr>
  );

  selected.map( ( field: IMinField, idx: number ) => {

    const disableUp : boolean = idx === 0 ? true : false;
    const disableDown : boolean = idx === selected.length -1 ? true : false;

    const KeeperIcon = <Icon className={ styles.selectIcon } data-fieldname={ field.InternalName }
      onClick= { onKeeperClick } iconName={ field.isKeeper === true ? 'CheckboxComposite' : 'Checkbox' }/>;

    const UpIcon = <Icon className={ styles.selectIcon } data-fieldname={ field.InternalName } data-direction={ 'up' } style={{ color: disableUp === true ? 'dimgray' : '' }}
      onClick= { disableUp !== true ? onDirectionClick : null } iconName={ disableUp === false ? 'Up' : 'StatusCircleBlock2' }/>;

    const DownIcon = <Icon className={ styles.selectIcon } data-fieldname={ field.InternalName } data-direction={ 'down' } style={{ color: disableDown === true ? 'dimgray' : '' }}
      onClick= { disableDown !== true ? onDirectionClick : null } iconName={ disableDown === false ? 'Down': 'StatusCircleBlock2'  }/>;

    const row = <tr>
      <td>{KeeperIcon}</td>
      <td title={ field.InternalName }>{ field.Title }</td>
      <td title={field.TypeAsString}>{ field.TypeAsString }</td>
      <td>{ UpIcon }</td>
      <td>{ DownIcon }</td>
    </tr>;
    tableRows.push( row );

  });

  const SelectedTable: JSX.Element = <table className={ styles.selectedTable}>
        { tableRows }
      </table>;

  return SelectedTable;

}