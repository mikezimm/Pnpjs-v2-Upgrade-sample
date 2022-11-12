

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
import { IEasyIconsWPProps } from './components/EasyIcons/eiTypes';
import { IEasyPagesWPProps } from './components/EasyPages/epTypes';
 
//Specific for this web part
export const exportIgnorePropsThis: string[] = [];

console.log('exportIgnorePropsFPS', exportIgnorePropsFPS);

export const exportIgnoreProps: string[] = [...exportIgnorePropsFPS, ...exportIgnorePropsThis];

//These props will not be imported even if they are in one of the change arrays above (fail-safe)
//This was done so user could not manually insert specific props to over-right fail-safes built in to the webpart

//Specific for this web part
export const importBlockPropsThis: string[] = ['showSomeProps'];

export const importBlockProps: string[] = [...importBlockPropsFPS, ...importBlockPropsThis];

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
