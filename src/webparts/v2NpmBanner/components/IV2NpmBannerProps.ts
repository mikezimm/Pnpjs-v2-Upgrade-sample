
import { IFPSCoreReactComponentProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentProps';
import { IFPSCorePinMeReactComponentState } from '@mikezimm/fps-library-v2/lib/banner/mainReact/ReactComponentState';
import { ILoadPerformance } from '../../v2NpmBanner/fpsReferences';

import { IMinListProps } from '@mikezimm/fps-library-v2/lib/components/molecules/FieldPanel/components/IMinWPFieldPanelProps';

export interface IV2NpmBannerProps  extends IFPSCoreReactComponentProps {

  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  errMessage: string;
  performance: ILoadPerformance;

  // lists: IMinListProps[];

}


/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
 export interface IV2NpmBannerState extends IFPSCorePinMeReactComponentState {

  errMessage: string;
  
}