
import { IFPSCorePinMeReactComponentProps, IFPSCorePinMeReactComponentState, ILoadPerformance } from '../fpsReferences';
import { IWebpartHistory } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory/Interface';

export interface IV2NpmBannerProps  extends IFPSCorePinMeReactComponentProps {

  [key: string]: string | boolean | number | IWebpartHistory | any | undefined;

  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  performance: ILoadPerformance;
  
}


/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
 export interface IV2NpmBannerState extends IFPSCorePinMeReactComponentState {


}