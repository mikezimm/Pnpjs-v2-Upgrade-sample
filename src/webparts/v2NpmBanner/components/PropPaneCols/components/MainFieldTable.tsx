import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import ReactJson from 'react-json-view';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2 } from '../../../fpsReferences';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes, Field } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';

// import styles from '../PropPaneCols.module.scss';

import { IMinField } from "./IPropPaneColsProps";

export function buildMainFieldTable( filtered: IMinField[], designMode: boolean, listFields: IMinField[], searchProp: string, searchText: string, onSelectItem: any, onTypeClick: any, showFieldPanel: any ) : JSX.Element {

  let heading: string = '';

  if ( listFields.length > 0 ) {
    heading = 'Description';
    if ( searchProp === 'Choice' ) {
      heading = 'Choices';

    } else if ( searchProp === 'Calculated' ) {
      heading = 'Formula';

    }
  }

  const tableRows: any[] = [];
  tableRows.push( 
    <tr>
      <th style={{ display: designMode === true ? '' : 'none' }}>Add</th>
      <th>Title ( { filtered.length } )</th>
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

    const SelectIcon = <Icon className={ 'select-icon' } data-fieldname={ field.InternalName } onClick= { onSelectItem } 
      iconName={ field.isSelected === true ? 'SkypeCircleCheck' : 'StatusCircleRing' }/>;


      // const fieldName: string = target.dataset?.fieldname ? '' : target.dataset.fieldname;
      // const index: number = target.dataset?.fieldindex ? -1 : target.dataset.fieldindex;
      // const KeeperIcon = <Icon className={ 'selectIcon } data-fieldname={ field.InternalName }  
      //   onClick= { onKeeperClick } iconName={ isKeeper === true ? 'CheckboxComposite' : 'Checkbox' }/>;

    const row = <tr>
      <td style={{ display: designMode === true ? '' : 'none' }}>{SelectIcon}</td>
      <td data-fieldname={ field.InternalName } data-fieldindex={ field.idx } onClick= { () => showFieldPanel( field, this )  } >
        { getHighlightedText (field.Title , searchText ) }</td>

      {/* showFieldPanel */}
      <td title={field.InternalName} >
          { getHighlightedText (field.InternalName , searchText ) }</td>

      <td onClick={ () => onTypeClick( field, this ) } >{ getHighlightedText (field.TypeDisplayName , searchText ) }</td>
      <td title={detailValue}>{ getHighlightedText (detailValue , searchText ) }</td>
    </tr>;
    tableRows.push( row );

  });

  const MainFieldTable: JSX.Element = <table className={ 'field-table' }>
        { tableRows }
      </table>;

  return MainFieldTable;
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

export function getSelectedItemPanel( panelItem: IMinField, onClosePanel: any ) : JSX.Element {
  const panelItemAny: any = panelItem;
  const AttachPanel: JSX.Element = !panelItem ? null : <Panel
          isOpen={ panelItem ? true : false }
          type={ PanelType.medium }
          onDismiss={ onClosePanel }
          headerText={ `${ panelItem.Title } - ${ panelItem.InternalName }` }
          closeButtonAriaLabel="Close"
          isLightDismiss={ true }
      > 
        <ul>
          { ['Description', 'TypeAsString', 'Group', 'Required', 'EnforceUniqueValues', 'FillInChoice', 'Choices', 'Formula', 'ReadOnlyField', 'Indexed', 'IndexStatus',  ].map( prop => {
            return panelItemAny [prop] === undefined || panelItemAny [prop] === '' || panelItemAny [prop] === null ? null : 
              <li key={prop}>{prop} - { JSON.stringify( panelItemAny [prop] ) }</li>;
          }) }
        </ul>
        <ReactJson src={ panelItem } name={ 'Field Details' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } 
          enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
    </Panel>;

  return AttachPanel;

}

