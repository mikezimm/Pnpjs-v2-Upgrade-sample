import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2, IQuickButton, IQuickCommands } from '../../../fpsReferences';
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

import ReactJson from 'react-json-view';
import { filter } from 'lodash';


export type IChoiceActionTypes = 'perChoice' | 'promoteChoice' | 'demoteChoice' | 'bracketChoice' | 'rejectLast' ;

export type IUserActionTypes = 'showToUser' | 'hideFromUser' | 'setUser' | 'addUser'  ;

export type IDateActionTypes = 'setToday' | 'set1Week' | 'set1Month' | 'clearDate' | 'showIfPast' | 'showIfFuture';

export type ITextActionTypes = 'replaceText' | 'promptText'  ;

export type INoteActionTypes = 'appendNote' | 'replaceNote'  ;


export type IAllActionTypes = IChoiceActionTypes | IUserActionTypes | IDateActionTypes | ITextActionTypes | INoteActionTypes;

export type IActionExecType = 'filter' | 'update' | 'special';

export interface IIconTableRow {
  cmd: IAllActionTypes;
  icon: string;
  head: string;
  title: string;
  type: IActionExecType;
  ignore?: string;  // javascript eval to ignore this label on per field basis.
  group?: string; // Used to group commands for ensuring only one of a group is set to true
  oneField?: boolean;  // Set to true to only allow this setting to be true on one field at a time

}


/**
 * Other options for choices in group2
 * filter to only show if current status is one status earlier than button... ie it move's up.
 *  So for instance, if the button choices is 2. In Process, only show when status is in 1. Plan
 *  This means that you can not go backwards via a button. 
 * 
 * Alternatively, make button visible if the status is either one above or one below
 * 
 * Maybe options are:  Promote ( up ), Demote ( down ), Promote/Demote ( up/down )
 */
const ChoiceFieldActionIcons: IIconTableRow[] = [ 
  { group: '1', type: 'special', cmd: 'perChoice', icon: 'Stack', head: 'Per', title: 'Create one button to set every choice', oneField: true },
  { group: '2', type: 'filter', cmd: 'promoteChoice', icon: 'Upload', head: 'Promote', title: 'Show button on Previous status - Able to only Promote' },
  { group: '2', type: 'filter', cmd: 'demoteChoice', icon: 'Download', head: 'Demote', title: 'Show button on Higher status - Able to only Demote' },
  { group: '2', type: 'filter', cmd: 'bracketChoice', icon: 'Sort', head: 'Both', title: 'Show button on Previous/Higher status - Able to only Promote/Demote' },
  { group: '3', type: 'filter', cmd: 'rejectLast', icon: 'ReleaseGateError', head: 'Cancel', title: 'Always show last choice - aka Canceled' },
    // { cmd: '', icon: '', head: '', title: '' },
 ];

 export const ChoiceActions = ChoiceFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );

const UserFieldActionIcons: IIconTableRow[] = [ 
  { group: '1', type: 'filter', cmd: 'showToUser', icon: 'View', head: 'Show', title: 'Show buttons to these users' },
  { group: '1', type: 'filter', cmd: 'hideFromUser', icon: 'Hide3', head: 'Hide', title: 'Hide buttons for these users, Show takes precedance' },
  { group: '2', type: 'update', cmd: 'setUser', icon: 'Contact', head: 'Set', title: 'Set Field as current user', ignore: 'field.ReadOnlyField === true'  },
  { group: '2', type: 'update', cmd: 'addUser', icon: 'AddFriend', head: 'Add', title: 'Add User to field if Multi-Select', ignore: 'field.ReadOnlyField === true'  },
 ];

 export const UserActions = UserFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );

 const DateFieldActionIcons: IIconTableRow[] = [ 
  { group: '1', type: 'update', cmd: 'setToday', icon: 'EventDate', head: 'Today', title: 'Set Field to today' , ignore: 'field.ReadOnlyField === true' },
  { group: '1', type: 'update', cmd: 'set1Week', icon: 'CalendarWorkWeek', head: '+1Wk', title: 'Set Field to + 7 days' , ignore: 'field.ReadOnlyField === true'  },
  { group: '1', type: 'update', cmd: 'set1Month', icon: 'Calendar', head: '+1Mo', title: 'Set Field to + 1 month' , ignore: 'field.ReadOnlyField === true'  },
  { group: '1', type: 'update', cmd: 'clearDate', icon: 'Delete', head: 'Clear', title: 'Clear Date field' , ignore: 'field.ReadOnlyField === true'  },
  { group: '2', type: 'filter', cmd: 'showIfPast', icon: 'Filter', head: '<Now', title: 'Show if Date is in past' , ignore: 'field.ReadOnlyField === true'  },
  { group: '2', type: 'filter', cmd: 'showIfFuture', icon: 'Filter', head: '>Now', title: 'Show if Date is in future' , ignore: 'field.ReadOnlyField === true'  },
 ];

 export const DateActions = DateFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );

 const TextFieldActionIcons: IIconTableRow[] = [ 
  { group: '1', type: 'update', cmd: 'replaceText', icon: 'ActionCenter', head: 'Replace', title: 'Replace Text with your own - must update in props yourself', ignore: 'field.ReadOnlyField === true' },
  { group: '1', type: 'update', cmd: 'promptText', icon: 'Comment', head: 'Prompt', title: 'Prompt to update column', ignore: 'field.ReadOnlyField === true' },
 ];

 export const TextActions = TextFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );

 const NoteFieldActionIcons: IIconTableRow[] = [ 
  { group: '1', type: 'update', cmd: 'appendNote', icon: 'CommentAdd', head: 'Append', title: 'Prompt to Append comment to column', ignore: 'field.ReadOnlyField === true' },
  { group: '1', type: 'update', cmd: 'replaceNote', icon: 'Comment', head: 'Replace', title: 'Prompt to Replace column text', ignore: 'field.ReadOnlyField === true' },
 ];

 export const NoteActions = NoteFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );

export const AllFieldActions = [ ...ChoiceFieldActionIcons, ...UserFieldActionIcons,  ...DateFieldActionIcons, ...TextFieldActionIcons, ...NoteFieldActionIcons ];

export const AllActions = AllFieldActions.map( ( action: IIconTableRow ) => { return action.cmd } );

export function createCommandBuilder(  selected: IMinField[], onCmdFieldClick : any = null, expanded: boolean, onExpandRight: any = null ) : JSX.Element { //onCmdFieldClick: any

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

  const expandRightIcon = <Icon iconName={ 'TransitionPop' } title={ 'Expand right to see button object'} style={{ float: 'right' }}
    data-fieldtype= 'Commands' onClick= { onExpandRight } className={ styles.typeFilterIcon } />;


  const QuickCommands: IQuickCommands = buildQuickCommands( selected ) ;

  const RightSide = <div>
    <h2>Command Set Title goes here</h2>
    <ReactJson src={ QuickCommands } name={ 'QuickCommands' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } 
        enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
  </div>;

  const commandElement: JSX.Element = <div className={ styles.commandTables }>
    <div className={ styles.leftCommand}>
      { expandRightIcon }
      { ChoiceTable }
      { UserTable }
      { DateTable }
      { TextTable }
      { NoteTable }
    </div>
    <div className={ expanded === true ? styles.rightCommand : styles.collapseCommand }>
      { RightSide }
    </div>
  </div>;

  const commandTitle = <div style={{display: 'flex' }}>Build Commands </div>;
  
  const DesignCommands: JSX.Element = <Accordion 
    title={ commandTitle }
    showAccordion={ false }
    animation= { 'TopDown' }
    contentStyles={ {height: ''} }
    content = { commandElement }
    componentStyles = {{ marginBottom: '15px', border: '4px solid #d1d1d1', background: '#f5f5f5', padding: '10px' }}
    // toggleCallback = { onToggleAccordion }
  />;

  return DesignCommands ;

}


const ChoicePerButton : IQuickButton = {
  str1: "",
  label: "Set to {str1}",
  primary: false,
  confirm: "Are you sure you want to Set to {str1}",
  // alert: "We made our updates!",
  console: "Updated item to {str1}",
  panelMessage: "Updated item to {str1}",
  // icon: "User",
  updateItem: {
    // DueDate: "[today+14]",
    // AssignedToId: "[Me]",
    // Status: "{str1}",
    // ReviewDays: 99,
    // Body: "Hi! It's [Today+3] and I'm $MyName$",
    // Comments: "{{append rich stamp}}"
  },
  showWhenEvalTrue: "", //item.AssignedToTitle !== sourceUserInfo.Title
}

//IQuickCommands

export function buildQuickCommands(  selected: IMinField[], ): IQuickCommands {

  const QuickButtons: IQuickButton[] = buildQuickButtons( selected );

  const QuickCommands: IQuickCommands = {
    buttons: [ QuickButtons ],
    fields: [],
  };

  return QuickCommands;

}

export function buildQuickButtons(  selected: IMinField[], ): IQuickButton[] {

  const buttons : IQuickButton[] = [];

  selected.map( ( field: IMinField ) => {
    if ( field.commands.perChoice === true ) {

      const filterButton = field.commands.demoteChoice === true ? 'demote' : field.commands.promoteChoice === true ? 'promote'  : field.commands.bracketChoice === true ? 'bracket' : 'none'; 
      const catchNullEmpty = `!item.${field.InternalName}`;

      field.Choices.map( ( choice: string , idx: number ) => {

        const buttonIndex = idx === 0 ? 'first' : idx  === field.Choices.length -1 ? 'last' : 'middle';
        const thisButton: IQuickButton = JSON.parse(JSON.stringify( ChoicePerButton ));

        if ( buttonIndex === 'last' && field.commands.rejectLast === true ) {
          // Always show this button - EXCEPT if this choice is already set

          thisButton.str1 = choice;
          // Just don't show button when the status is the current one.
          thisButton.showWhenEvalTrue = `item.${field.InternalName} !== '${choice}'`;
          thisButton.updateItem[ field.InternalName ] = `{str1}`;
          buttons.push( thisButton );

        } else if ( buttonIndex === 'first' && filterButton === 'promote' ) {
          //Skip this button since you can not demote the item any further
          thisButton.str1 = choice;
          thisButton.showWhenEvalTrue = catchNullEmpty;
          thisButton.updateItem[ field.InternalName ] = `{str1}`;
          buttons.push( thisButton );

        } else if ( buttonIndex === 'last' && filterButton === 'demote' ) {
          //Skip this button since you can not promote the item any further

        } else {

          const promoteFilter = idx === 0 ? '' : field.Choices[ idx -1 ];
          const demoteFilter = idx === field.Choices.length -1 ? '' : field.Choices[ idx +1 ];

          //This will enable the first button if the choice column is ever null/empty
          thisButton.showWhenEvalTrue = buttonIndex === 'first' ? catchNullEmpty : '';
          thisButton.str1 = choice;


          if ( promoteFilter && ( filterButton === 'promote' || filterButton === 'bracket' ) ){

            thisButton.showWhenEvalTrue = bumpEval( thisButton.showWhenEvalTrue, '||', `item.${field.InternalName} === '${promoteFilter}'` , false );
            // thisButton.showWhenEvalTrue += thisButton.showWhenEvalTrue ? ' || ' : '';
            // thisButton.showWhenEvalTrue += `item.${field.InternalName} === ${promoteFilter}`;
          }

          if ( demoteFilter && ( filterButton === 'demote' || filterButton === 'bracket' ) ){

            thisButton.showWhenEvalTrue = bumpEval( thisButton.showWhenEvalTrue, '||', `item.${field.InternalName} === '${demoteFilter}'` , false );
              // thisButton.showWhenEvalTrue += thisButton.showWhenEvalTrue ? ' || ' : '';
              // thisButton.showWhenEvalTrue += `item.${field.InternalName} === ${demoteFilter}`;
          }


          if ( filterButton === 'none' ) {
            //Just don't show button when the status is the current one.
            thisButton.showWhenEvalTrue = `item.${field.InternalName} !== '{str1}'`;

          } else { // Always exclude from showing when it's the current choice.  No need to set it to itself.

            //Don't think this is needed since the other filters take care of it UNLESS 
            // thisButton.showWhenEvalTrue = `item.${field.InternalName} !== ${choice} ${ !thisButton.showWhenEvalTrue ? '' : ` && ( ${thisButton.showWhenEvalTrue} )` }`;

          }
          thisButton.updateItem[ field.InternalName ] = `{str1}`;
          buttons.push( thisButton );

        }

      });
    }
  });

  //Get filtered fields
  const eqUserFields : string[] = [];
  const neUserFields : string[] = [];

  //Get filtered fields
  const eqTextFields : string[] = [];
  const neTextFields : string[] = [];

  //Get filtered fields
  const gtTodayFields : string[] = [];
  const ltTodayFields : string[] = [];

  selected.map( ( field: IMinField ) => {
   //Find any field that has a filter command

   //If filter command contains show, add to eqFields array else if contains hide, add to neFields array
   Object.keys( field.commands ).map( ( command: IAllActionTypes ) => {

    if ( field.commands[ command ] === true ) {
      // if ( command.indexOf('show') === 0 ) { 
        if ( command === 'showToUser' ) { eqUserFields.push( field.InternalName ) ;  }
        else if ( command === 'hideFromUser' ) { neUserFields.push( field.InternalName ) ;  }
        else if ( command === 'promoteChoice' ) { eqTextFields.push( field.InternalName ) ;  }
        else if ( command === 'demoteChoice' ) { eqTextFields.push( field.InternalName ) ;  }
        else if ( command === 'bracketChoice' ) { eqTextFields.push( field.InternalName ) ;  }
        else if ( command === 'showIfFuture' ) { gtTodayFields.push( field.InternalName ) ;  }
        else if ( command === 'showIfPast' ) { ltTodayFields.push( field.InternalName ) ;  }


      // } if ( command.indexOf('hide') === 0 ) { neUserFields.push( field.InternalName ) ; }
    }
   });

  });

  let filterText = '';

  // //now go through all and add filters
  buttons.map( ( button: IQuickButton ) => {

  });

  //now go through and do updates


      

  return buttons;

}

/**
 * This will take the eval string and add a new eval to it including having the operator and adding surround braces when required.
 * @param showWhenEvalTrue 
 * @param operator 
 * @param miniEval 
 * @param surround 
 * @returns 
 */
export function bumpEval( showWhenEvalTrue: string , operator: '||' | '&&' , miniEval: string , surround: boolean ): string {

  showWhenEvalTrue += showWhenEvalTrue ? ` ${operator} ` : '';
  if ( surround === true ) {
    showWhenEvalTrue += `( ${miniEval} )`;

  } else {
    showWhenEvalTrue += miniEval;
  }

  return showWhenEvalTrue;

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

        } else if ( UserActions.indexOf( role as IUserActionTypes ) > -1 ) {
          commands = updateCommandSet( commands, role, newVal, UserFieldActionIcons );

        } else if ( TextActions.indexOf( role as IUserActionTypes ) > -1 ) {
          commands = updateCommandSet( commands, role, newVal, TextFieldActionIcons );

        } else if ( NoteActions.indexOf( role as IUserActionTypes ) > -1 ) {
          commands = updateCommandSet( commands, role, newVal, NoteFieldActionIcons );

        } else if ( ChoiceActions.indexOf( role as IChoiceActionTypes ) > -1 ) {
          commands = updateCommandSet( commands, role, newVal, ChoiceFieldActionIcons );

          const ThisAction: IIconTableRow[] = ChoiceFieldActionIcons.filter( icon => { return icon.cmd === role } );
          if ( ThisAction[0].oneField === true ) {
            selected.map( ( checkField: IMinField ) => {  // This turns off same setting on all similarly typed columns
              if ( field.TypeAsString === checkField.TypeAsString && field.InternalName !== checkField.InternalName ) {
                checkField.commands[ role ] = false;
            }} );
          }

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