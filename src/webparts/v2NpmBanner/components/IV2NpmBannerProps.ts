
import { IFPSCorePinMeReactComponentProps, IFPSCorePinMeReactComponentState, ILoadPerformance } from '../fpsReferences';
import { IWebpartHistory } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory/Interface';
import { IMinListProps } from './PropPaneCols/components/IPropPaneColsProps';
import { IEasyPagesProps } from './PropPaneCols/components/EasyPages/component';
import { IEasyIconProps, IEasyIcons } from './PropPaneCols/components/EasyIcons/eiTypes';





export interface IV2NpmBannerProps  extends IFPSCorePinMeReactComponentProps {

  [key: string]: string | boolean | number | IWebpartHistory | any | undefined;

  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  performance: ILoadPerformance;

  lists: IMinListProps[];

  easyPagesProps: IEasyPagesProps;
  EasyIconsObject: IEasyIcons;
  
}


/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
 export interface IV2NpmBannerState extends IFPSCorePinMeReactComponentState {

  showEasyPages: boolean;

}