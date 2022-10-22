import * as React from 'react';
import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2, IQuickButton, IQuickCommands } from '../../../../fpsReferences';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';

// import styles from '../PropPaneCols.module.scss';

import { IMinField, IMinFieldCmds } from "../IPropPaneColsProps";
import Accordion from '@mikezimm/npmfunctions/dist/zComponents/Accordion/Accordion';
import SelectedItemPanelHook from "../FieldPanel";

import ReactJson from 'react-json-view';
import { filter } from 'lodash';
import { IActionProps } from '@pnp/spfx-controls-react';

import { ChoiceFieldActionIcons, UserFieldActionIcons, YesNoFieldActionIcons,   } from './IAccordion'
import { DateFieldActionIcons, TextFieldActionIcons, NoteFieldActionIcons,  } from './IAccordion'
import { AllUpdateActions,  } from './IAccordion'

import { IAllActionTypes, IChoiceActionTypes, IYesNoActionTypes, IUserActionTypes,   } from './IAccordion'
import { IDateActionTypes, ITextActionTypes, INoteActionTypes  } from './IAccordion'
import { IIconTableRow  } from './IAccordion'


import { AllActions, ChoiceActions, YesNoActions, UserActions,   } from './IAccordion'
import { DateActions, TextActions, NoteActions  } from './IAccordion'
import { createFieldTableRows } from './tableRows';




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

const EmptyButton : IQuickButton = {
  str1: "Add Button Title here",
  label: "{str1}",
  primary: false,
  confirm: "Are you sure you want: {str1}",
  // alert: "We made our updates!",
  console: "Updated item: {str1}",
  panelMessage: "Updated item: {str1}",
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

  //Do all choice column settings first because it can create multiple buttons
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

  if ( buttons.length === 0 ) buttons.push( JSON.parse(JSON.stringify( EmptyButton)) );

  //Get filtered fields
  const eqUserFields : string[] = [];
  const neUserFields : string[] = [];

  //Get filtered fields
  const YesNoFields: string[] = [];

  //Get filtered fields
  const gtTodayFields : string[] = [];  //Currently not supported in Drilldown functions
  const ltTodayFields : string[] = [];  //Currently not supported in Drilldown functions

  selected.map( ( field: IMinField ) => {
   //Find any field that has a filter command

   //If filter command contains show, add to eqFields array else if contains hide, add to neFields array
   Object.keys( field.commands ).map( ( command: IAllActionTypes ) => {


    if ( field.commands[ command ] === true ) {
      // if ( command.indexOf('show') === 0 ) { 
        // if ( command === 'showToUser' ) { eqUserFields.push( field.InternalName ) ;  }
        // else if ( command === 'hideFromUser' ) { neUserFields.push( field.InternalName ) ;  }

        if ( command === 'showToUser' && field.TypeAsString === 'User' ) { eqUserFields.push( `item.${field.InternalName}Id === sourceUserInfo.Id` ) ;  }
        else if ( command === 'showToUser' && field.TypeAsString === 'UserMulti' ) { eqUserFields.push( `item.${field.InternalName}Id.indexOf( sourceUserInfo.Id ) > -1` ) ;  }
        else if ( command === 'hideFromUser' && field.TypeAsString === 'User' ) { neUserFields.push( `item.${field.InternalName}Id !== sourceUserInfo.Id` ) ;  }
        else if ( command === 'hideFromUser'&& field.TypeAsString === 'UserMulti'  ) { neUserFields.push( `item.${field.InternalName}Id.indexOf( sourceUserInfo.Id ) === -1` ) ;  }
        // else if ( command === 'promoteChoice' ) { eqTextFields.push( field.InternalName ) ;  }
        // else if ( command === 'demoteChoice' ) { eqTextFields.push( field.InternalName ) ;  }
        // else if ( command === 'bracketChoice' ) { eqTextFields.push( field.InternalName ) ;  }

        //export type IYesNoActionTypes = 'showOnTrue' | 'showOnFalse' | 'showOnNull' | 'setTrue' | 'setFalse' | 'setToggle' ;
        else if ( command === 'showOnTrue' ) { YesNoFields.push( `item.${field.InternalName} === true` ) ;  }
        else if ( command === 'showOnFalse' ) { YesNoFields.push( `item.${field.InternalName} === false` ) ;  }
        else if ( command === 'showOnNull' ) { YesNoFields.push( `item.${field.InternalName} === null` ) ;  }



        else if ( command === 'showIfFuture' ) { gtTodayFields.push( field.InternalName ) ;  }
        else if ( command === 'showIfPast' ) { ltTodayFields.push( field.InternalName ) ;  }

      // } if ( command.indexOf('hide') === 0 ) { neUserFields.push( field.InternalName ) ; }
    }
   });

  });

  /**
   * This applies user filters defined above
   */
  const AllDetectedFilters : string[] = [ ...eqUserFields, ...neUserFields ];

  const UserEvalFilters: string = AllDetectedFilters.length === 0 ? '' : `( ${AllDetectedFilters.join( ' && ')} )`;

  const YesNoEvalFilters: string = YesNoFields.length === 0 ? '' : `( ${YesNoFields.join( ' && ')} )`;

  if ( UserEvalFilters ) {
    buttons.map( ( button: IQuickButton ) => {
      button.showWhenEvalTrue = bumpEval( button.showWhenEvalTrue, '&&', UserEvalFilters , false ); 
    });
  }

  if ( YesNoEvalFilters ) {
    buttons.map( ( button: IQuickButton ) => {
      button.showWhenEvalTrue = bumpEval( button.showWhenEvalTrue, '&&', YesNoEvalFilters , false ); 
    });
  }

  const updateObject: any = {};

  // const today = new Date();

  selected.map( ( field: IMinField ) => {
    //Find any field that has a filter command
 
    const IntName = field.InternalName;
    const IntNameId = `${IntName}Id`;
    const TypeAsString = field.TypeAsString;
    
    //Go through all possible update actions
    AllUpdateActions.map( ( action: IIconTableRow ) => {
      if ( field.commands[ action.cmd ] === true ) {

        /**
         * NEED TO ADD ANY CHOICE SETTINGS NOT ALREADY DONE.
         */
        if ( action.cmd === 'setToday' ) { updateObject[ IntName ] = '[Today]' ;  }
        else if ( action.cmd === 'set1Week' ) { updateObject[ IntName ] = '[Today+7]' ;  }
        else if ( action.cmd === 'set1Month' ) { updateObject[ IntName ] = '[Today+30]' ;  }
        else if ( action.cmd === 'clearDate' ) { updateObject[ IntName ] = null ;  }
        else if ( action.cmd === 'replaceText' ) { updateObject[ IntName ] = `Hello world! It is [Today] and my name is [MyName] - and I clicked '{str1}'` ;  }
        else if ( action.cmd === 'promptText' ) { updateObject[ IntName ] = '{{stamp}}' ;  }
        else if ( action.cmd === 'appendNote' ) { updateObject[ IntName ] = '{{append rich stamp}}' ;  }
        else if ( action.cmd === 'replaceNote' ) { updateObject[ IntName ] = '{{rich stamp}}' ;  }
        //These are all the user variants
        else if ( action.cmd === 'setUser' && TypeAsString === 'UserMulti' )    { updateObject[ IntNameId ] = '{Me}' ;  }
        else if ( action.cmd === 'setUser' && TypeAsString === 'User' )         { updateObject[ IntNameId ] = '[Me]' ;  }
        else if ( action.cmd === 'addUser' && TypeAsString === 'UserMulti' )    { updateObject[ IntNameId ] = '{+Me}' ;  }
        else if ( action.cmd === 'addUser' && TypeAsString === 'User' )         { updateObject[ IntNameId ] = '[Me]' ;  }
        else if ( action.cmd === 'removeUser' && TypeAsString === 'UserMulti' ) { updateObject[ IntNameId ] = '{-Me}' ;  }
        else if ( action.cmd === 'removeUser' && TypeAsString === 'User' )      { updateObject[ IntNameId ] = '[-Me]' ;  }
        else if ( action.cmd === 'clearUsers' && TypeAsString === 'UserMulti' ) { updateObject[ IntNameId ] = '[]' ;  }
        else if ( action.cmd === 'clearUsers' && TypeAsString === 'User' )      { updateObject[ IntNameId ] = '[]' ;  }

        ///export type IYesNoActionTypes = 'showOnTrue' | 'showOnFalse' | 'showOnNull' | 'setTrue' | 'setFalse' | 'setToggle' ;
        else if ( action.cmd === 'setTrue' )      { updateObject[ IntNameId ] = true ;  }
        else if ( action.cmd === 'setFalse' )     { updateObject[ IntNameId ] = false ;  }
        // else if ( action.cmd === 'setToggle' )    { updateObject[ IntNameId ] = '[]' ;  }

      }
    }); 
   });
 
   console.log( 'updateObject: ', updateObject  );

  // Merge updateObject to all buttons
  buttons.map( ( button: IQuickButton ) => {
    // https://www.javascripttutorial.net/object/javascript-merge-objects/
    button.updateItem = { ...button.updateItem, ...updateObject }
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

  //
  if ( !miniEval ) return showWhenEvalTrue;

  showWhenEvalTrue += showWhenEvalTrue ? ` ${operator} ` : '';
  if ( surround === true ) {
    showWhenEvalTrue += `( ${miniEval} )`;

  } else {
    showWhenEvalTrue += miniEval;
  }

  return showWhenEvalTrue;

}
