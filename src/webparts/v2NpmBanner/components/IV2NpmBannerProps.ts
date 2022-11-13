
import { IFPSCorePinMeReactComponentProps, IFPSCorePinMeReactComponentState, ILoadPerformance } from '../fpsReferences';
import { IWebpartHistory } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory/Interface';
import { IMinListProps } from './PropPaneCols/components/IPropPaneColsProps';
import { IEasyPagesSourceProps,  } from './EasyPages/componentPage';
import { IEasyPagesExtraProps } from './EasyPages/componentSources';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IEasyIconProps, IEasyIcons } from './EasyIcons/eiTypes';


export interface IV2NpmBannerProps  extends IFPSCorePinMeReactComponentProps {

  [key: string]: string | boolean | number | IWebpartHistory | any | undefined;

  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  performance: ILoadPerformance;

  lists: IMinListProps[];

  easyPagesCommonProps: IEasyPagesSourceProps;  // General props which apply to all Sources/Pages
  easyPagesExtraProps: IEasyPagesExtraProps;  // General props which are used on the SourcesPage but not component page
  EasyIconsObject: IEasyIcons;

}


/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
 export interface IV2NpmBannerState extends IFPSCorePinMeReactComponentState {

  showEasyPages: boolean;

}