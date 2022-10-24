import * as React from 'react';
import { useState, useEffect } from 'react';



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
import { buildQuickCommands } from './createLogic';
import { IQuickButton } from '@mikezimm/npmfunctions/dist/QuickCommands/IQuickCommands';


/**
 * This takes an array of buttons and builds a summary object for it
 * @param buttons 
 */

// export function summarizeButtons( buttons: IQuickButton[][] ) : any {




// }