

/***
 * NOTE:  All imports in here Must be imported directly from npmFunctions, not the fpsPreferences
 * Or else it will get into an endless loop because these values are imported into fpsPreferences
 * 
 */
import { exportIgnorePropsFPS, } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface';
import { importBlockPropsFPS } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface';

import {
  IMinBannerUIProps, IMinPinMeProps, IMinPandoramicProps, IMinBannerThemeProps, IMinCustomHelpProps,
  IMinPageStyleProps, IMinBannerUtilityProps, IMinFPSLegacyProps
} from "@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface";

import { IEveryoneAudience } from '@mikezimm/npmfunctions/dist/Services/PropPane/Audiences';
 
//Specific for this web part
export const exportIgnorePropsThis: string[] = [];

console.log('exportIgnorePropsFPS', exportIgnorePropsFPS);

export const exportIgnoreProps: string[] = [...exportIgnorePropsFPS, ...exportIgnorePropsThis];

//These props will not be imported even if they are in one of the change arrays above (fail-safe)
//This was done so user could not manually insert specific props to over-right fail-safes built in to the webpart

//Specific for this web part
export const importBlockPropsThis: string[] = ['showSomeProps'];

export const importBlockProps: string[] = [...importBlockPropsFPS, ...importBlockPropsThis];

export const changeEasyPages: string[] = ['easyPageEnable', 'easyPagesAudience', 'easyPageTabs', 'easyPageOverflowTab', 
  'easyPageParent', 'easyPageAltUrl', 'easyPageAltNav', 'easyPageSeparateExtras', 'easyPageStyles', 'easyPageContainer'];

export const changeEasyIcons: string[] = ['easyIconEnable', 'easyIconKeys', 'easyIconIgnore', ];

//To be added to npmFunctions
export interface IEasyPagesWPProps {
  easyPageEnable: boolean;
  easyPagesAudience: IEveryoneAudience;
  easyPageTabs: string;
  easyPageOverflowTab?: string;
  easyPageParent?: boolean; //Include parent site pages
  easyPageAltUrl?: string; //Include alternate site's site pages
  easyPageAltNav?: string; //Include navigation elements from other site
  easyPageSeparateExtras?: boolean; //Put Parent/Alt links in separate tab ( default )
  easyPageStyles?: string;  //Optional styles on entire page
  easyPageContainer?: string;  //Optional styles on container element
}

//To be added to npmFunctions
export interface IEasyIconsWPProps {
  easyIconEnable: boolean; // Used 
  easyIconKeys: string;
  easyIconIgnore: string;
}

// export interface IV2NpmBannerWebPartProps extends IMinWPBannerProps {
/**
 * Extend with portions of FPS Props that are needed
 * 
 */
export interface IV2NpmBannerWebPartProps extends IMinBannerUIProps, IMinPinMeProps, IMinPandoramicProps, IMinBannerThemeProps, IMinCustomHelpProps, IMinPageStyleProps, IMinBannerUtilityProps, IMinFPSLegacyProps, IEasyPagesWPProps, IEasyIconsWPProps {
  [key: string]: any;

  description: string;

  webURL: string;
  listTitle: string,

}
