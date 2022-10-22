import * as React from 'react';
import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getHighlightedText , getHelpfullErrorV2, IQuickButton, IQuickCommands } from '../../../../fpsReferences';
import { sortObjectArrayByStringKey } from '../../../../fpsReferences';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';
import { TextField, } from 'office-ui-fabric-react/lib/TextField';

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
import { buildQuickCommands } from './logic';

export interface ICommandBuilderHookProps {
  selected: IMinField[];
  expanded: boolean;
  // showFieldPanel: any;
  onExpandRight: any;
  updateSelected: any;

}


// export function createCommandBuilder(  selected: IMinField[], onCmdFieldClick : any = null, expanded: boolean, showFieldPanel: any, onExpandRight: any = null ) : JSX.Element { //onCmdFieldClick: any

const CommandBuilderHook: React.FC<ICommandBuilderHookProps> = ( props ) => {

  const { selected, expanded, onExpandRight, updateSelected } = props;
  // const { selected, expanded, onExpandRight } = props;

  const [ panelItem, setPanelItem ] = useState<IMinField>(null);
  const [ label, setLabel ] = useState<string>('');
  const [ secondary, setSecondary ] = useState<string>('');
  const [ commandSet, setCommandSet ] = useState<IQuickButton[][]>([]);

  const showFieldPanel = ( item: IMinField ) : void => {
    setPanelItem( item );
  }

  const onClosePanel = (  ) : void => {
    setPanelItem( null );
  }

  const onCmdFieldClick = ( ev: React.MouseEvent<HTMLElement>  ): void => {
    const newSelected: IMinField [] = updateSelectedCommands( ev, selected );
    // setSelected( newSelected );
    updateSelected( newSelected );
  };

  // const onLabelUpdate = ( input: any, text: string = '' ): void => {
  //   const labelText : string = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';
  //   setLabel( labelText );
  // }

  // const sorted: IMinField[] = sortObjectArrayByStringKey( selected, 'asc', 'Title' );

  const choiceFields: IMinField[] = selected.filter( field =>field.FieldTypeKind === FieldTypes.Choice );
  const ChoiceTable = createFieldTableRows( null, 'Choice fields', choiceFields, ChoiceFieldActionIcons, onCmdFieldClick, showFieldPanel );

  const userFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.User );
  const UserTable = createFieldTableRows( null, 'User fields', userFields, UserFieldActionIcons, onCmdFieldClick, showFieldPanel );

  const yesNoFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.Boolean );
  const YesNoTable = createFieldTableRows( null, 'Boolean fields', yesNoFields, YesNoFieldActionIcons, onCmdFieldClick, showFieldPanel );

  // filter out ReadOnlyFields because all functions apply to the field itself which can't be done.
  const dateFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.DateTime );
  const DateTable = createFieldTableRows( null, 'Date fields', dateFields, DateFieldActionIcons, onCmdFieldClick, showFieldPanel );

  // filter out ReadOnlyFields because all functions apply to the field itself which can't be done.
  const textFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.Text );
  const TextTable = createFieldTableRows( null, 'Text fields', textFields, TextFieldActionIcons, onCmdFieldClick, showFieldPanel );

  // filter out ReadOnlyFields because all functions apply to the field itself which can't be done.
  const noteFields: IMinField[] = selected.filter( field => field.FieldTypeKind === FieldTypes.Note );
  const NoteTable = createFieldTableRows( null, 'Note fields', noteFields, NoteFieldActionIcons, onCmdFieldClick, showFieldPanel );

  const expandRightIcon = <Icon iconName={ 'TransitionPop' } title={ 'Expand right to see button object'} style={{ float: 'right' }}
    data-fieldtype= 'Commands' onClick= { onExpandRight } className={ 'type-filter-icon' } />;

  const QuickCommands: IQuickCommands = buildQuickCommands( selected ) ;

  if ( label ) {
    QuickCommands.buttons.unshift( [{
      label: label,
      styleButton: 'Divider',
      secondary: secondary,
      primary: false,
      updateItem: undefined,
    }]);
  }
  // const addCommandSet = ( ev: React.MouseEvent<HTMLElement>  ): void => {

  //  const NewButtons: IQuickButton[][] = [];
  //  NewButtons.push( NewDivider );
  //   // setSelected( newSelected );
  //   NewButtons.push( QuickCommands.buttons[0] ) ;
  //   updateSelected( [ ] );
  // };

  const RightSide = <div className={ 'accordion-design' } style={{  }}>
        <div className='current-title'>
          <h2>Command Set Title goes here</h2>
          <TextField
            value={ label }
            description={ 'Add label to save this as group of buttons' }
            //Modeled after https://github.com/pnp/sp-dev-fx-webparts/blob/b139ba199cb57363a88f070dd9814e5af4fc3cbd/samples/react-teams-personal-app-settings/src/webparts/personalAppSettings/components/settingsPanel/SettingsPanel.tsx#L67
            onChange= { (e, v) => { setLabel(v) } }
          />
          <TextField
            value={ secondary }
            description={ 'Additional text in smaller font' }
            //Modeled after https://github.com/pnp/sp-dev-fx-webparts/blob/b139ba199cb57363a88f070dd9814e5af4fc3cbd/samples/react-teams-personal-app-settings/src/webparts/personalAppSettings/components/settingsPanel/SettingsPanel.tsx#L67
            onChange= { (e, v) => { setSecondary(v) } }
          />
          <div>Design buttons: {QuickCommands.buttons.length}</div>
          <ReactJson src={ QuickCommands } name={ 'Current' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } 
              enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
        </div>
        <div>
          <div>
            <h2>Total Command Set</h2>
            <Icon iconName ="Download" onClick={ () => { setCommandSet( [ ...commandSet, ...QuickCommands.buttons ]) } } title={'Add Command Set here'}/>
          </div>
          <div>Existing buttons: {commandSet.length}</div>
          <ReactJson src={ commandSet } name={ 'commandSet' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } 
            enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
        </div>
      </div>;

  const commandElement: JSX.Element = <div className={ 'command-tables' }>
    < SelectedItemPanelHook 
      panelItem= { panelItem }
      searchText={ '' }
      onClosePanel= { onClosePanel.bind(this) }
    />
    <div className={ 'left-command' }>
      { expandRightIcon }
      { ChoiceTable }
      { YesNoTable }
      { UserTable }
      { DateTable }
      { TextTable }
      { NoteTable }
    </div>
    <div className={ expanded === true ? 'right-command' : 'collapse-command' }>
      { RightSide }
    </div>
  </div>;

  const commandTitle = `Build Commands`;
  
  const DesignCommands: JSX.Element = <Accordion 
    title={ commandTitle }
    showAccordion={ false }
    animation= { 'TopDown' }
    contentStyles={ {height: ''} }
    content = { commandElement }
    componentStyles = {{ marginBottom: '15px', border: '4px solid #d1d1d1', background: '#f5f5f5', padding: '10px' }}
    // toggleCallback = { onToggleAccordion }
  />;

  return ( DesignCommands ) ;

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

        } else if ( YesNoActions.indexOf( role as IYesNoActionTypes ) > -1 ) {
          commands = updateCommandSet( commands, role, newVal, YesNoFieldActionIcons );

        /**
         * Put other types above this one since CHOICE HAS SPECIAL CODING LOOP
         * This allows for the UI to only have one field selected for a given command (like can not have more than one perChoice field selected)
         */

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


export default CommandBuilderHook;