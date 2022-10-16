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

export function buildMainFieldTable( filtered: IMinField[], designMode: boolean, listFields: IMinField[], searchProp: string, searchText: string, onSelectItem: any, onTypeClick: any ) : any[] {

  let heading: string = '';

  if ( listFields.length > 0 ) {
    heading = 'Description';
    if ( searchProp === 'Choice' ) {
      heading = 'Choices';

    } else if ( searchProp === 'Calculated' ) {
      heading = 'Formula';

    }
  }

  const fieldRows: any[] = [];
  fieldRows.push( 
    <tr>
      <th style={{ display: designMode === true ? '' : 'none' }}>Add</th>
      <th>Title</th>
      <th>InternalName</th>
      <th>Type</th>
      <th>{heading}</th>
    </tr>
  );

  filtered.map( ( field: IMinField ) => {

    let detailValue = field.Description;

    if ( searchProp === 'Choice' || ( !detailValue && field.TypeAsString === 'Choice' ) ) {
      detailValue = JSON.stringify(field.Choices);

    } else if ( searchProp === 'Calculated' || ( !detailValue && field.Formula ) ) {
      detailValue = JSON.stringify(field.Formula);
      detailValue = detailValue.slice(1, detailValue.length - 1);  //Remove extra quotes around formula

    } else { detailValue = field.Description; }

    const SelectIcon = <Icon className={ styles.selectIcon } data-fieldname={ field.InternalName } onClick= { onSelectItem } 
      iconName={ field.isSelected === true ? 'SkypeCircleCheck' : 'StatusCircleRing' }/>;

    const row = <tr>
      <td style={{ display: designMode === true ? '' : 'none' }}>{SelectIcon}</td>
      <td>{ getHighlightedText (field.Title , searchText ) }</td>
      <td title={field.InternalName}>{ getHighlightedText (field.InternalName , searchText ) }</td>
      <td onClick={ () => onTypeClick( field, this ) } >{ getHighlightedText (field.TypeDisplayName , searchText ) }</td>
      <td title={detailValue}>{ getHighlightedText (detailValue , searchText ) }</td>
    </tr>;
    fieldRows.push( row );

  });
  return fieldRows;
}

export function  getMainSelectedItems ( ev: React.MouseEvent<HTMLElement>, listFields: IMinField[], selected: IMinField[]  ): IMinField []  {
  const target: any = ev.target;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'

  const itemName: string = target.dataset.fieldname;
  let thisSelected : IMinField = null;

  listFields.map( field => {  //Find selected item
    if ( field.InternalName === itemName ) { 
      field.isSelected = field.isSelected === true ? false : true;
      field.isKeeper = true;
      thisSelected = field;
    }
  });

  let selectedIdx : number = -1;
  selected.map( ( pick: IMinField, idx : number ) => {
    if ( pick.InternalName === thisSelected.InternalName ) selectedIdx = idx;
  });

  let newSelected: IMinField [] = [];

  if ( selectedIdx === -1 ) {  //Add to selected list
    
    if ( ctrlKey === true ) {
      newSelected = [ ...[ thisSelected ], ...selected ];
    } else {
      newSelected = [ ...selected, ...[ thisSelected ] ];
    }

  } else { //Remove from selected list
    newSelected = selected.filter( (field) => { return field.InternalName !== thisSelected.InternalName } )
  }

  console.log('_onSelectItem:', itemName, target, newSelected );

  return newSelected;
}