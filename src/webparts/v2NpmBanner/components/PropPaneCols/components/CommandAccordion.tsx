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

import { IMinField, IMinFieldCmds } from "../PropPaneColsClass";
import Accordion from '@mikezimm/npmfunctions/dist/zComponents/Accordion/Accordion';

export type IChoiceActionTypes = 'perChoice' | 'choiceFilter' ;
export const ChoiceActions: IChoiceActionTypes[] = [ 'perChoice', 'choiceFilter',  ] ;

export type IUserActionTypes = 'showToUser' | 'hideFromUser' | 'setUser' | 'addUser'  ;
export const UserActions: IUserActionTypes[] = [ 'showToUser', 'hideFromUser', 'setUser', 'addUser', ] ;

export type IDateActionTypes = 'setToday' | 'set1Week' | 'set1Month' | 'clearDate' ;
export const DateActions: IDateActionTypes[] = [ 'setToday', 'set1Week', 'set1Month', 'clearDate',  ] ;

export type ITextActionTypes = 'updateNote' | 'updateText'  ;
export const TextActions: ITextActionTypes[] = [ 'updateNote', 'updateText', ] ;

export type IAllActionTypes = IChoiceActionTypes | IUserActionTypes | IDateActionTypes | ITextActionTypes;
export const AllActions = [ ...ChoiceActions, ...UserActions,  ...DateActions, ...TextActions ];


export function createCommandBuilder(  selected: IMinField[], onCmdFieldClick : any = null ) : JSX.Element { //onCmdFieldClick: any

  // const viewFields: IViewField[] = [];

  const userFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.User );
  const choiceFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.Choice );
  const dateFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.DateTime );
  // const noteFields: IMinField[] = selected.filter( field => field.NumberOfLines > 0 );
  // const textFields: IMinField[] = selected.filter( field => field.MaxLength > 0 );

  const ChoiceTableRows = [ <tr key='choiceTableHeader'>{ [ 'Name', 'Per', 'Title',  ].map( h => { return <th key={h} >{h}</th> } ) } </tr>];

  choiceFields.map( ( field: IMinField ) => {
    ChoiceTableRows.push( <tr key={ field.InternalName } >
      <td title={field.InternalName}>{ field.InternalName }</td>
      <td><Icon iconName={ field.commands.perChoice === true ? 'Stack' : 'StatusCircleBlock2' }
          data-fieldname={ field.InternalName } data-role= 'perChoice' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>
    </tr> );
  });

  const UserTableRows = [ <tr key='userTableHeader'> { [ 'Name', 'Show', 'Hide', 'Set', 'Add', ].map( h => { return <th key={h} >{h}</th> } ) } </tr>];

  userFields.map( ( field: IMinField ) => {
    UserTableRows.push( <tr key={ field.InternalName } >
      <td title={field.InternalName}>{ field.InternalName }</td>
      <td><Icon iconName={ field.commands.showToUser === true ? 'View' : 'StatusCircleBlock2' } title={ 'Show buttons to these users'}
          data-fieldname={ field.InternalName } data-role= 'showToUser' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>

      <td><Icon iconName={ field.commands.hideFromUser === true ? 'Hide3' : 'StatusCircleBlock2' } title={ 'Hide buttons for these users, Show takes precedance'}
          data-fieldname={ field.InternalName } data-role= 'hideFromUser' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>  

      <td><Icon iconName={ field.commands.setUser === true ? 'Contact' : 'StatusCircleBlock2' } title={ 'Set Field as current user'}
          data-fieldname={ field.InternalName } data-role= 'setUser' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>

      <td><Icon iconName={ field.commands.addUser === true ? 'AddFriend' : 'StatusCircleBlock2' } title={ 'Add User to field if Multi-Select'}
          data-fieldname={ field.InternalName } data-role= 'addUser' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>

    </tr> );
  });

  const DateTableRows = [ <tr key='userTableHeader'> { [ 'Name', 'Today', '+1Wk', '+1Mo', 'Clear' ].map( h => { return <th key={h} >{h}</th> } ) } </tr>];

  // clearDate?: boolean;  // Add current date to this field
  // setToday?: boolean;  // Add current date to this field
  // set1Week?: boolean;  // Add current date to this field
  // set1Month?: boolean;  // Add current date to this field

  //export type IDateActionTypes = 'setToday' | 'set1Week' | 'set1Month' | 'clearDate'  ;

  dateFields.map( ( field: IMinField ) => {
    DateTableRows.push( <tr key={ field.InternalName } >
      <td title={field.InternalName}>{ field.InternalName }</td>
      <td><Icon iconName={ field.commands.setToday === true ? 'EventDate' : 'StatusCircleBlock2' } title={ 'Set Field to today'}
          data-fieldname={ field.InternalName } data-role= 'setToday' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>

      <td><Icon iconName={ field.commands.set1Week === true ? 'CalendarWorkWeek' : 'StatusCircleBlock2' } title={ 'Set Field to + 7 days'}
          data-fieldname={ field.InternalName } data-role= 'set1Week' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td> 

      <td><Icon iconName={ field.commands.set1Month === true ? 'Calendar' : 'StatusCircleBlock2' } title={ 'Set Field to + 1 month'}
          data-fieldname={ field.InternalName } data-role= 'set1Month' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>

      <td><Icon iconName={ field.commands.clearDate === true ? 'Delete' : 'StatusCircleBlock2' } title={ 'Clear Date field'}
          data-fieldname={ field.InternalName } data-role= 'clearDate' onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>

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
    { DateTableRows.length === 1 ? null : <div>
      <table>
        { DateTableRows }
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
  const role: IAllActionTypes = target.dataset.role;

  // let thisSelected : IMinField = null;
  const newSelected: IMinField [] = [ ];
  selected.map( ( field: IMinField ) => {  //Find selected item
    if ( field.InternalName === itemName ) { 

      if ( AllActions.indexOf( role ) > -1 ) {

        const commands : IMinFieldCmds = field.commands;
        const newVal = commands[ role ] === true ? false : true;

        if ( DateActions.indexOf( role as IDateActionTypes ) > -1 ) {
          DateActions.map( action => { commands[ action ] = false; });
          commands[ role ] = newVal;

        } else {
          commands[ role ] = newVal;

        }

        field.commands = commands;

      } else {
        alert('Opps!  Field updating field.commands ~ 161')
      }
    }
    newSelected.push( field );
  });

  return newSelected;

}