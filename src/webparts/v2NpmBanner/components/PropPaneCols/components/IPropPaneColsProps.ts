import { DisplayMode } from '@microsoft/sp-core-library';
import { IFieldInfo, } from "@pnp/sp/presets/all";

export type IValidTemplate = 100 | 101;

export interface IMinListProps {
  webURL: string;
  listTitle: string,

}

export interface IFieldPanelProps {
  displayMode: DisplayMode;
  lists: IMinListProps[];
  disableDesign?: boolean; //Default is false
  
  tryCommands?: any;  //if function is passed down, parent web part could use this to temporarily replace the saved button commands.
  saveCommands?: any;  // callback function to save current command
  tryViews?: any;  //if function is passed down, parent web part could use this to temporarily replace the saved button commands.
  saveViews?: any;  // callback function to save current command
}


/**
 *  IFieldPanelFetchState was split off to easily return back object from the fetch
 */
export interface IFieldPanelFetchState {

  listFields: IMinField[];
  filtered: IMinField[];
  selected: IMinField[];

  status: string;
  fetched: boolean,
  searchText: string;
  searchProp: string;

  errMessage: string;
}

export interface IFieldPanelState extends IFieldPanelFetchState {

  listIdx: number;

  designMode: boolean;
  fullDesign: boolean;

  panelItem: IMinField;
}

export const IsEditable: string = 'IsEditable';


/**
 * MEMO TO SELF... IMinFieldCmds Interface keys ARE TIED DIRECTLY TO THE IAllActionTypes types in CommandAccordion.tsx .
 * 
 * If you add one here, you need to also update that interface by hand.
 * 
 */

 export interface IMinFieldCmds {
  // userFilter?: boolean;  // Use this field to filter the button:  true will show button when current user is in this field
  showToUser?: boolean;
  hideFromUser?: boolean;
  setUser?: boolean;  // Set current field equal to this current user
  addUser?: boolean;  // Add current user to this field
  removeUser?: boolean;  // Remove current User from field
  clearUsers?: boolean;  // Clear User field

  showOnTrue?: boolean;  // Show command when field is true
  showOnFalse?: boolean;  // Show command when field is false
  showOnNull?: boolean;  //  Show command when field is not set
  setTrue?: boolean;  //  set field as true
  setFalse?: boolean;  //  set field as false
  setToggle?: boolean;  //  toggle field from yes to no or no to yes

  perChoice?: boolean;  // Use this field to create stack of buttons:  one button per choice is created, button hidden if it's selected choice, adds placeholder to show on certain status (same column)
  promoteChoice?: boolean;  // Use this field to filter stack of buttons:  Will show this button when item choice is previous in order - allows to promote only
  demoteChoice?: boolean;  // Use this field to filter stack of buttons:  Will show this button when item choice is next one in order - allows to demote only
  bracketChoice?: boolean;  // Use this field to filter stack of buttons:  Will show this button when item choice is previous or next one in order
  rejectLast?: boolean;  // Use this field to filter stack of buttons:  always show last choice - assuming like cancelled or rejected

  clearDate?: boolean;  // Clear date from this field
  setToday?: boolean;  // Add current date to this field
  set1Week?: boolean;  // Add current date next week to this field
  set1Month?: boolean;  // Add current date next month to this field
  depends?: boolean;  // Ternary eval string to change value based on another value... https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/39
  showIfPast?: boolean;  //Show button if date is Today or in the past
  showIfFuture?: boolean;  //Show button if date is Today or in the future

  replaceText?: boolean;  // prompt for Comment note with all options {{ append rich (if it's note type) stamp }}
  promptText?: boolean;  // adds text:  Current user pressed (choice if it's choice button) on [today]
  captcha?: boolean;  // adds prompt to enter/confirm a value (like user's name, date etc...)

  appendNote?: boolean;  // prompt for Comment note with all options {{ append rich (if it's note type) stamp }}
  replaceNote?: boolean;  // adds text:  Current user pressed (choice if it's choice button) on [today]
}


export interface IMinField extends IFieldInfo {
  idx: number; //Index number of field in main list of fields
  searchTextLC: string;
  isSelected: boolean; // Is selected in main list ( right list )
  isKeeper: boolean; // Is selected in the keeper list ( left list )

  commands: IMinFieldCmds;

  Choices?: string[];
  DisplayFormat?: 0 | 1; //  DisplayFormat 0 === Date, 1 === Date and Time
  Formula?: string;
  NumberOfLines?: number;
  MaxLength?: number;
  FileLeafRef?: string; // Used for Libraries to tell if it's a library
}