
import { IFPSCorePinMeReactComponentProps, IFPSCorePinMeReactComponentState, ILoadPerformance } from '../fpsReferences';
import { IWebpartHistory } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory/Interface';
import { IMinListProps } from './PropPaneCols/components/IPropPaneColsProps';

export interface IV2NpmBannerProps  extends IFPSCorePinMeReactComponentProps {

  [key: string]: string | boolean | number | IWebpartHistory | any | undefined;

  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  performance: ILoadPerformance;

  lists: IMinListProps[];
  
}


/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
 export interface IV2NpmBannerState extends IFPSCorePinMeReactComponentState {


}