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
import Accordion from '@mikezimm/npmfunctions/dist/zComponents/Accordion/Accordion';


export function createCommandBuilder(  selected: IMinField[], onCmdFieldClick : any = null ) : JSX.Element { //onCmdFieldClick: any

  // const viewFields: IViewField[] = [];

  const userFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.User );
  const choiceFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.Choice );
  // const dateFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.DateTime );
  // const noteFields: IMinField[] = selected.filter( field => field.NumberOfLines > 0 );
  // const textFields: IMinField[] = selected.filter( field => field.MaxLength > 0 );

  const ChoiceTableRows = [ <tr key='choiceTableHeader'><th>Name</th><th>Per</th><th></th><th>Title</th></tr>];

  choiceFields.map( ( field: IMinField ) => {
    ChoiceTableRows.push( <tr key={ field.InternalName } >
      <td title={field.InternalName}>{ field.InternalName }</td>
      <td><Icon iconName={ field.commands.perChoice === true ? 'Stack' : 'StatusCircleBlock2' }
          data-fieldname={ field.InternalName } data-role= 'PerChoice' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>
    </tr> );
  });

  const UserTableRows = [ <tr key='userTableHeader'><th>Name</th><th>Filter</th><th>Set</th><th>Add</th></tr>];

  userFields.map( ( field: IMinField ) => {
    UserTableRows.push( <tr key={ field.InternalName } >
      <td title={field.InternalName}>{ field.InternalName }</td>
      <td><Icon iconName={ field.commands.userFilter === true ? 'Filter' : 'StatusCircleBlock2' }
          data-fieldname={ field.InternalName } data-role= 'FilterUser' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>
      <td><Icon iconName={ field.commands.setUser === true ? 'Contact' : 'StatusCircleBlock2' }
          data-fieldname={ field.InternalName } data-role= 'SetUser' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>
      <td><Icon iconName={ field.commands.addUser === true ? 'AddFriend' : 'StatusCircleBlock2' }
          data-fieldname={ field.InternalName } data-role= 'AddUser' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>
    </tr> );
  });

  // userFilter?: boolean;  // Use this field to filter the button:  true will show button when current user is in this field
  // choiceFilter?: boolean;  // Use this field to filter stack of buttons:  will hide button if this
  // perChoice?: boolean;  // Use this field to create stack of buttons:  one button per choice is created, button hidden if it's selected choice, adds placeholder to show on certain status (same column)
  // updateUser?: boolean;  // Add current user to this field
  // updateDate?: boolean;  // Add current date to this field
  // updateNote?: boolean;  // prompt for Comment note with all options {{ append rich (if it's note type) stamp }}
  // updateText?: boolean;  // adds text:  Current user pressed (choice if it's choice button) on [today]

  const commandElement: JSX.Element = <div className={ styles.commandTable }>
    { ChoiceTableRows.length === 1 ? null : <div>
      <table>
        { ChoiceTableRows }
      </table>

      </div>
    }
    { UserTableRows.length === 1 ? null : <div>
      <table>
        { UserTableRows }
      </table>

      </div>
    }
  </div>;

  const DesignCommands: JSX.Element = <Accordion 
    title={ `Build Commands` }
    showAccordion={ false }
    animation= { 'TopDown' }
    contentStyles={ {height: ''} }
    content = { commandElement }
    componentStyles = {{ marginBottom: '15px' }}
  />;

  return DesignCommands ;

}

export function updateSelectedCommands ( ev: React.MouseEvent<HTMLElement>, selected: IMinField []  ): IMinField [] {
  const target: any = ev.target;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'
  const itemName: string = target.dataset.fieldname;
  const role: string = target.dataset.role;

  // let thisSelected : IMinField = null;
  const newSelected: IMinField [] = [ ];
  selected.map( ( field: IMinField ) => {  //Find selected item
    if ( field.InternalName === itemName ) { 
      if ( role === 'PerChoice' ) {
        field.commands.perChoice = field.commands.perChoice === true ? false : true;
      } else if ( role === 'FilterUser' ) {
        field.commands.userFilter = field.commands.userFilter === true ? false : true;
      } else if ( role === 'SetUser' ) {
        field.commands.setUser = field.commands.setUser === true ? false : true;
      } else if ( role === 'AddUser' ) {
        field.commands.addUser = field.commands.addUser === true ? false : true;
      // } else if ( role === '' ) {

      // } else if ( role === '' ) {

      }
    }
    newSelected.push( field );
  });

  return newSelected;

}