import { IWeb, Web, } from "@pnp/sp/presets/all";
import { IMinField, IMinListProps, IsEditable, IFieldPanelFetchState } from "../IPropPaneColsProps";
import { getHighlightedText , getHelpfullErrorV2, IQuickButton, IQuickCommands } from '../../../../fpsReferences';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';

// import styles from '../PropPaneCols.module.scss';

import { IMinFieldCmds } from "../IPropPaneColsProps";


/**
 * MEMO TO SELF... THESE TYPES ARE TIED DIRECTLY TO THE keys in the IMinFieldCmds Interface.
 * 
 * If you add one here, you need to also update that interface by hand.
 * 
 */

 export type IChoiceActionTypes = 'perChoice' | 'promoteChoice' | 'demoteChoice' | 'bracketChoice' | 'rejectLast' ;

 export type IYesNoActionTypes = 'showOnTrue' | 'showOnFalse' | 'showOnNull' | 'setTrue' | 'setFalse' | 'setToggle' ;
 
 export type IUserActionTypes = 'showToUser' | 'hideFromUser' | 'setUser' | 'addUser' | 'removeUser' | 'clearUsers' ;
 
 export type IDateActionTypes = 'setToday' | 'set1Week' | 'set1Month' | 'clearDate' | 'showIfPast' | 'showIfFuture';
 
 export type ITextActionTypes = 'replaceText' | 'promptText'  ;
 
 export type INoteActionTypes = 'appendNote' | 'replaceNote'  ;
 
 export type IAllActionTypes = IChoiceActionTypes | IYesNoActionTypes | IUserActionTypes | IDateActionTypes | ITextActionTypes | INoteActionTypes ;
 
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
   disabled?: boolean;  // Disables function, sets to red
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
  export const ChoiceFieldActionIcons: IIconTableRow[] = [ 
   { group: '1', type: 'special', cmd: 'perChoice', icon: 'Stack', head: 'Per', title: 'Create one button to set every choice', oneField: true },
   { group: '2', type: 'filter', cmd: 'promoteChoice', icon: 'Upload', head: 'Promote', title: 'Show button on Previous status - Able to only Promote' },
   { group: '2', type: 'filter', cmd: 'demoteChoice', icon: 'Download', head: 'Demote', title: 'Show button on Higher status - Able to only Demote' },
   { group: '2', type: 'filter', cmd: 'bracketChoice', icon: 'Sort', head: 'Both', title: 'Show button on Previous/Higher status - Able to only Promote/Demote' },
   { group: '3', type: 'filter', cmd: 'rejectLast', icon: 'ReleaseGateError', head: 'Cancel', title: 'Always show last choice - aka Canceled' },
     // { cmd: '', icon: '', head: '', title: '' },
  ];
 
  export const ChoiceActions = ChoiceFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );
 
  export const YesNoFieldActionIcons: IIconTableRow[] = [ 
   { group: '1', type: 'filter', cmd: 'showOnTrue', icon: 'AcceptMedium', head: 'onYes', title: 'Show if Field = Yes', },
   { group: '1', type: 'filter', cmd: 'showOnFalse', icon: 'Cancel', head: 'onNo', title: 'Show if Field = No', },
   { group: '1', type: 'filter', cmd: 'showOnNull', icon: 'Checkbox', head: 'onEmpty', title: 'Show if Field = Empty', },
 
   { group: '2', type: 'update', cmd: 'setTrue', icon: 'CheckboxCompositeReversed', head: 'SetYes', title: 'Set Field to Yes' , ignore: 'field.ReadOnlyField === true', },
   { group: '2', type: 'update', cmd: 'setFalse', icon: 'BoxMultiplySolid', head: 'SetNo', title: 'Set Field to No' , ignore: 'field.ReadOnlyField === true', }, //, disabled: true 
   { group: '2', type: 'update', cmd: 'setToggle', icon: 'ToggleRight', head: 'Toggle', title: 'Toggle value' , ignore: 'field.ReadOnlyField === true', disabled: true }, //, disabled: true 
  ];
 
  export const YesNoActions = YesNoFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );
 
 
  export const UserFieldActionIcons: IIconTableRow[] = [ 
   { group: '1', type: 'filter', cmd: 'showToUser', icon: 'View', head: 'Show', title: 'Show buttons to these users' },
   { group: '1', type: 'filter', cmd: 'hideFromUser', icon: 'Hide3', head: 'Hide', title: 'Hide buttons for these users, Show takes precedance' },
   { group: '2', type: 'update', cmd: 'setUser', icon: 'Contact', head: 'Set', title: 'Set Field as current user', ignore: 'field.ReadOnlyField === true'  },
   { group: '2', type: 'update', cmd: 'addUser', icon: 'AddFriend', head: 'Add', title: 'Add User to field if Multi-Select', ignore: 'field.ReadOnlyField === true'  },
   { group: '2', type: 'update', cmd: 'removeUser', icon: 'UserRemove', head: 'Remove', title: 'Remove current User from field' , ignore: 'field.ReadOnlyField === true'  },
   { group: '2', type: 'update', cmd: 'clearUsers', icon: 'Delete', head: 'Clear', title: 'Clear User field' , ignore: 'field.ReadOnlyField === true'  },
  ];
 
  export const UserActions = UserFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );
 
  export const DateFieldActionIcons: IIconTableRow[] = [ 
   { group: '1', type: 'update', cmd: 'setToday', icon: 'EventDate', head: 'Today', title: 'Set Field to today' , ignore: 'field.ReadOnlyField === true' },
   { group: '1', type: 'update', cmd: 'set1Week', icon: 'CalendarWorkWeek', head: '+1Wk', title: 'Set Field to + 7 days' , ignore: 'field.ReadOnlyField === true'  },
   { group: '1', type: 'update', cmd: 'set1Month', icon: 'Calendar', head: '+1Mo', title: 'Set Field to + 1 month' , ignore: 'field.ReadOnlyField === true'  },
   { group: '1', type: 'update', cmd: 'clearDate', icon: 'Delete', head: 'Clear', title: 'Clear Date field' , ignore: 'field.ReadOnlyField === true'  },
   { group: '2', type: 'filter', cmd: 'showIfPast', icon: 'Filter', head: '<Now', title: 'Show if Date is in past' , ignore: 'field.ReadOnlyField === true', disabled: true  },
   { group: '2', type: 'filter', cmd: 'showIfFuture', icon: 'Filter', head: '>Now', title: 'Show if Date is in future' , ignore: 'field.ReadOnlyField === true', disabled: true  },
  ];
 
  export const DateActions = DateFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );
 
  export const TextFieldActionIcons: IIconTableRow[] = [ 
   { group: '1', type: 'update', cmd: 'replaceText', icon: 'ActionCenter', head: 'Replace', title: 'Replace Text with your own - must update in props yourself', ignore: 'field.ReadOnlyField === true' },
   { group: '1', type: 'update', cmd: 'promptText', icon: 'Comment', head: 'Prompt', title: 'Prompt to update column', ignore: 'field.ReadOnlyField === true' },
  ];
 
  export const TextActions = TextFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );
 
  export const NoteFieldActionIcons: IIconTableRow[] = [ 
   { group: '1', type: 'update', cmd: 'appendNote', icon: 'CommentAdd', head: 'Append', title: 'Prompt to Append comment to column', ignore: 'field.ReadOnlyField === true' },
   { group: '1', type: 'update', cmd: 'replaceNote', icon: 'Comment', head: 'Replace', title: 'Prompt to Replace column text', ignore: 'field.ReadOnlyField === true' },
  ];
 
  export const NoteActions = NoteFieldActionIcons.map( ( action: IIconTableRow ) => { return action.cmd } );
 
 export const AllFieldActions = [ ...ChoiceFieldActionIcons, ...YesNoFieldActionIcons, ...UserFieldActionIcons,  ...DateFieldActionIcons, ...TextFieldActionIcons, ...NoteFieldActionIcons ];
 
 export const AllUpdateActions = AllFieldActions.filter( field => { return field.type === 'update' });
 export const AllUpdateActionCmds = AllUpdateActions.map( field => { return field.cmd });
 
 
 export const AllActions = AllFieldActions.map( ( action: IIconTableRow ) => { return action.cmd } );