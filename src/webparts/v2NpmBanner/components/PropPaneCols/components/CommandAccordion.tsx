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

export type IUserActionTypes = 'showToUser' | 'hideFromUser' | 'setUser' | 'addUser'  ;

export type IDateActionTypes = 'setToday' | 'set1Week' | 'set1Month' | 'clearDate' | 'showIfPast' | 'showIfFuture';

export type ITextActionTypes = 'replaceText' | 'promptText'  ;

export type INoteActionTypes = 'appendNote' | 'replaceNote'  ;


export type IAllActionTypes = IChoiceActionTypes | IUserActionTypes | IDateActionTypes | ITextActionTypes | INoteActionTypes;

export interface IIconTableRow {
  cmd: IAllActionTypes,
  icon: string,
  head: string,
  title: string,
  ignore?: string,  // javascript eval to ignore this label on per field basis.
  group?: string, // Used to group commands for ensuring only one of a group is set to true
}

const ChoiceFieldActionIcons: IIconTableRow[] = [ 
  { group: '1', cmd: 'perChoice', icon: 'Stack', head: 'Per', title: 'Create one button to set every choice' },
  { group: '1', cmd: 'choiceFilter', icon: 'Filter', head: '???', title: 'Filter buttons for each choice - TBD' },
    // { cmd: '', icon: '', head: '', title: '' },
 ];

const UserFieldActionIcons: IIconTableRow[] = [ 
  { group: '1', cmd: 'showToUser', icon: 'View', head: 'Show', title: 'Show buttons to these users' },
  { group: '1', cmd: 'hideFromUser', icon: 'Hide3', head: 'Hide', title: 'Hide buttons for these users, Show takes precedance' },
  { group: '2', cmd: 'setUser', icon: 'Contact', head: 'Set', title: 'Set Field as current user', ignore: 'field.ReadOnlyField === true'  },
  { group: '2', cmd: 'addUser', icon: 'AddFriend', head: 'Add', title: 'Add User to field if Multi-Select', ignore: 'field.ReadOnlyField === true'  },
 ];

 export const UserActions = UserFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );

 const DateFieldActionIcons: IIconTableRow[] = [ 
  { group: '1', cmd: 'setToday', icon: 'EventDate', head: 'Today', title: 'Set Field to today' , ignore: 'field.ReadOnlyField === true' },
  { group: '1', cmd: 'set1Week', icon: 'CalendarWorkWeek', head: '+1Wk', title: 'Set Field to + 7 days' , ignore: 'field.ReadOnlyField === true'  },
  { group: '1', cmd: 'set1Month', icon: 'Calendar', head: '+1Mo', title: 'Set Field to + 1 month' , ignore: 'field.ReadOnlyField === true'  },
  { group: '1', cmd: 'clearDate', icon: 'Delete', head: 'Clear', title: 'Clear Date field' , ignore: 'field.ReadOnlyField === true'  },
  { group: '2', cmd: 'showIfPast', icon: 'Filter', head: '<Now', title: 'Show if Date is in past' , ignore: 'field.ReadOnlyField === true'  },
  { group: '2', cmd: 'showIfFuture', icon: 'Filter', head: '>Now', title: 'Show if Date is in future' , ignore: 'field.ReadOnlyField === true'  },
 ];

 export const DateActions = DateFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );

 const TextFieldActionIcons: IIconTableRow[] = [ 
  { group: '1', cmd: 'replaceText', icon: 'ActionCenter', head: 'Replace', title: 'Replace Text with your own - must update in props yourself', ignore: 'field.ReadOnlyField === true' },
  { group: '1', cmd: 'promptText', icon: 'Comment', head: 'Prompt', title: 'Prompt to update column', ignore: 'field.ReadOnlyField === true' },
 ];

 export const TextActions = TextFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );

 const NoteFieldActionIcons: IIconTableRow[] = [ 
  { group: '1', cmd: 'appendNote', icon: 'CommentAdd', head: 'Append', title: 'Prompt to Append comment to column', ignore: 'field.ReadOnlyField === true' },
  { group: '1', cmd: 'replaceNote', icon: 'Comment', head: 'Replace', title: 'Prompt to Replace column text', ignore: 'field.ReadOnlyField === true' },
 ];

 export const NoteActions = NoteFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );

export const AllFieldActions = [ ...ChoiceFieldActionIcons, ...UserFieldActionIcons,  ...DateFieldActionIcons, ...TextFieldActionIcons, ...NoteFieldActionIcons ];

export const AllActions = AllFieldActions.map( ( action: IIconTableRow ) => { return action.cmd } );

export function createCommandBuilder(  selected: IMinField[], onCmdFieldClick : any = null, onToggleAccordion: any = null ) : JSX.Element { //onCmdFieldClick: any

  const choiceFields: IMinField[] = selected.filter( field =>field.FieldTypeKind === FieldTypes.Choice );
  const ChoiceTable = createFieldTableRows( null, 'Choice fields', choiceFields, ChoiceFieldActionIcons, onCmdFieldClick );

  const userFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.User );
  const UserTable = createFieldTableRows( null, 'User fields', userFields, UserFieldActionIcons, onCmdFieldClick );

  // filter out ReadOnlyFields because all functions apply to the field itself which can't be done.
  const dateFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.DateTime );
  const DateTable = createFieldTableRows( null, 'Date fields', dateFields, DateFieldActionIcons, onCmdFieldClick );

  // filter out ReadOnlyFields because all functions apply to the field itself which can't be done.
  const textFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.Text );
  const TextTable = createFieldTableRows( null, 'Text fields', textFields, TextFieldActionIcons, onCmdFieldClick );

  // filter out ReadOnlyFields because all functions apply to the field itself which can't be done.
  const noteFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.Note );
  const NoteTable = createFieldTableRows( null, 'Note fields', noteFields, NoteFieldActionIcons, onCmdFieldClick );

  const commandElement: JSX.Element = <div className={ styles.commandTables }>
    { ChoiceTable }
    { UserTable }
    { DateTable }
    { TextTable }
    { NoteTable }
  </div>;

  const DesignCommands: JSX.Element = <Accordion 
    title={ `Build Commands` }
    showAccordion={ false }
    animation= { 'TopDown' }
    contentStyles={ {height: ''} }
    content = { commandElement }
    componentStyles = {{ marginBottom: '15px' }}
    toggleCallback = { onToggleAccordion }
  />;

  return DesignCommands ;

}

export function createFieldTableRows( heading: JSX.Element, firstColumnHeading: string, fields: IMinField[], FieldActionIcons: IIconTableRow[], onCmdFieldClick: any): JSX.Element {

  const TableRows: JSX.Element[] = [];
  TableRows.push( <tr key='TableHeader'><th>{firstColumnHeading}</th> { FieldActionIcons.map( h => { return <th key={h.head} >{h.head}</th> } ) } </tr> );

  fields.map( ( field: IMinField | any ) => {
    TableRows.push( <tr key={ field.InternalName } >
      <td title={field.InternalName}>{ field.InternalName }</td>
      { FieldActionIcons.map( icon => { 
        // eslint-disable-next-line no-eval
        const ignore = icon.ignore && eval( icon.ignore ) === true ? true : false;
        return ignore === true ? <td> </td> : <td key={ icon.cmd }><Icon iconName={ field.commands[ icon.cmd ] === true ? icon.icon  : 'StatusCircleBlock2' } title={ icon.title }
        data-fieldname={ field.InternalName } data-role= { icon.cmd } onClick= { onCmdFieldClick } className={ styles.selectIcon } /></td>;
      }) }
    </tr> );
  });

  const table = TableRows.length === 1 ? null : <div>
      { heading }
      <table>
        { TableRows }
      </table>
    </div>

  return table;
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

        let commands : IMinFieldCmds = field.commands;
        const newVal = commands[ role ] === true ? false : true;


        if ( DateActions.indexOf( role as IDateActionTypes ) > -1 ) {
          commands = updateCommandSet( commands, role, newVal, DateFieldActionIcons );
          // //Should get the action for current button press
          //   const ThisDateAction: IIconTableRow[] = DateFieldActionIcons.filter( icon => { return icon.cmd === role } ); 
          //   DateFieldActionIcons.map( action => {

          //     //Loop through all actions in the same group.
          //     if ( action.group === ThisDateAction[0].group ) {
          //       commands[ action.cmd ] = false;
          //     }
          //     commands[ role ] = newVal;
          //   });

        } else if ( UserActions.indexOf( role as IUserActionTypes ) > -1 ) {
          commands = updateCommandSet( commands, role, newVal, UserFieldActionIcons );
          // //Should get the action for current button press
          //   const ThisUserAction: IIconTableRow[] = UserFieldActionIcons.filter( icon => { return icon.cmd === role } ); 
          //   UserFieldActionIcons.map( action => {

          //     //Loop through all actions in the same group.
          //     if ( action.group === ThisUserAction[0].group ) {
          //       commands[ action.cmd ] = false;
          //     }
          //     commands[ role ] = newVal;
          //   });
  
        } else if ( TextActions.indexOf( role as IUserActionTypes ) > -1 ) {
          commands = updateCommandSet( commands, role, newVal, TextFieldActionIcons );
  
    
        } else if ( NoteActions.indexOf( role as IUserActionTypes ) > -1 ) {
          commands = updateCommandSet( commands, role, newVal, NoteFieldActionIcons );
  
            //   DateActions.map( action => { commands[ action ] = false; });
            //   commands[ role ] = newVal;
  
            // } else { // This applies to all the set date functions
            //   DateActions.map( action => { commands[ action ] = false; });
            //   commands[ role ] = newVal;
            // }


        } else {
          commands[ role ] = newVal;

        }

        field.commands = commands;

      } else {
        alert('Opps!  Field updating field.commands ~ 166')
      }
    }
    newSelected.push( field );
  });

  return newSelected;

}

export function updateCommandSet( commands: IMinFieldCmds, role: IAllActionTypes, newVal: boolean, FieldActionIcons: IIconTableRow[]) : IMinFieldCmds{

    //Should get the action for current button press
    const ThisAction: IIconTableRow[] = FieldActionIcons.filter( icon => { return icon.cmd === role } ); 
    FieldActionIcons.map( action => {

      //Loop through all actions in the same group.
      if ( action.group === ThisAction[0].group ) {
        commands[ action.cmd ] = false;
      }
      commands[ role ] = newVal;
    });
    return commands;

}