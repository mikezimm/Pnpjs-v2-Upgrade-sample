
import * as React from 'react';
import { PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Icon, } from 'office-ui-fabric-react/lib/Icon';

export function panelActionToggles( type: PanelType, blocking: boolean, shiftSide: any, changeBlocking: any ): JSX.Element {

  const shiftIcon = type === PanelType.custom ? 'OpenPane' : 'OpenPaneMirrored';
  const blockIcon = blocking === true ? 'F12DevTools' : 'DeviceOff';

  const shiftTitle = type === PanelType.custom ? 'Left Panel' : 'Right Panel';
  const blockTitle = blocking === true ? 'Disable Blocking' : 'Enable Blocking';

  const ShiftCallbackParam = type === PanelType.customNear ? PanelType.custom : PanelType.customNear;
  const BlockCallbackParam = blocking === true ? false : true;

  const Toggles = <div className={ 'panel-action-toggles' } style={ null }>
    { !shiftSide ? null : <Icon title={ shiftTitle } iconName={ shiftIcon } className={ null } style={ null } onClick= { () => shiftSide( ShiftCallbackParam ) }/> }
    { !changeBlocking ? null : <Icon title={ blockTitle } iconName={ blockIcon } className={ null } style={ null } onClick= { () => changeBlocking( BlockCallbackParam ) }/> }
  </div>

  return Toggles;

}

