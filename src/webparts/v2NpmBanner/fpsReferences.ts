/***
 *    d888888b db   db d888888b .d8888.      db   d8b   db d88888b d8888b.      d8888b.  .d8b.  d8888b. d888888b 
 *    `~~88~~' 88   88   `88'   88'  YP      88   I8I   88 88'     88  `8D      88  `8D d8' `8b 88  `8D `~~88~~' 
 *       88    88ooo88    88    `8bo.        88   I8I   88 88ooooo 88oooY'      88oodD' 88ooo88 88oobY'    88    
 *       88    88~~~88    88      `Y8b.      Y8   I8I   88 88~~~~~ 88~~~b.      88~~~   88~~~88 88`8b      88    
 *       88    88   88   .88.   db   8D      `8b d8'8b d8' 88.     88   8D      88      88   88 88 `88.    88    
 *       YP    YP   YP Y888888P `8888Y'       `8b8' `8d8'  Y88888P Y8888P'      88      YP   YP 88   YD    YP    
 *                                                                                                               
 *                                                                                                               
 */

// STANDARD PROJECT IMPORTS


// import * as strings from 'V2NpmBannerWebPartStrings';
// import V2NpmBanner from './components/V2NpmBanner';

// export { IV2NpmBannerWebPartProps, exportIgnoreProps } from './IV2NpmBannerWebPartProps';
// export { IV2NpmBannerProps, IV2NpmBannerState } from './components/IV2NpmBannerProps';

// export { importBlockProps, } from './IV2NpmBannerWebPartProps';

// export { getWebPartHelpElement } from './CoreFPS/PropPaneHelp';
// export { PreConfiguredProps } from './CoreFPS/PreConfiguredSettings';  // FPS Presets

// export { buildExportProps, buildFPSAnalyticsProps } from './CoreFPS/BuildExportProps'; // Export Props, analytics

// export { saveViewAnalytics } from './CoreFPS/Analytics';

export { IUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';

/***
 *    db    db d888888b d888888b db      d888888b d888888b d888888b d88888b .d8888. 
 *    88    88 `~~88~~'   `88'   88        `88'   `~~88~~'   `88'   88'     88'  YP 
 *    88    88    88       88    88         88       88       88    88ooooo `8bo.   
 *    88    88    88       88    88         88       88       88    88~~~~~   `Y8b. 
 *    88b  d88    88      .88.   88booo.   .88.      88      .88.   88.     db   8D 
 *    ~Y8888P'    YP    Y888888P Y88888P Y888888P    YP    Y888888P Y88888P `8888Y' 
 *                                                                                  
 *                                                                                  
 */

 export { sortStringArray, sortObjectArrayByStringKey, sortNumberArray, sortObjectArrayByNumberKey, sortKeysByOtherKey } from '@mikezimm/npmfunctions/dist/Services/Arrays/sorting';
 export { ISeriesSort, } from '@mikezimm/npmfunctions/dist/CSSCharts/ICSSCharts';
 export { getExpandColumns, getKeysLike, getSelectColumns } from '@mikezimm/npmfunctions/dist/Lists/getV1/getFunctions';
 export { getHighlightedText , } from '@mikezimm/npmfunctions/dist/Elements/HighlightedText';
 
 
 /***
  *    d8888b. d88888b d8888b. d88888b  .d88b.  d8888b. .88b  d88.  .d8b.  d8b   db  .o88b. d88888b 
  *    88  `8D 88'     88  `8D 88'     .8P  Y8. 88  `8D 88'YbdP`88 d8' `8b 888o  88 d8P  Y8 88'     
  *    88oodD' 88ooooo 88oobY' 88ooo   88    88 88oobY' 88  88  88 88ooo88 88V8o 88 8P      88ooooo 
  *    88~~~   88~~~~~ 88`8b   88~~~   88    88 88`8b   88  88  88 88~~~88 88 V8o88 8b      88~~~~~ 
  *    88      88.     88 `88. 88      `8b  d8' 88 `88. 88  88  88 88   88 88  V888 Y8b  d8 88.     
  *    88      Y88888P 88   YD YP       `Y88P'  88   YD YP  YP  YP YP   YP VP   V8P  `Y88P' Y88888P 
  *                                                                                                 
  *                                                                                                 
  */
// instead of createBasePerformanceInit, you can use startPerformanceInit_SS7 for SecureScript or startPerformanceInit_ALVFM for ALVFM
export { createBasePerformanceInit, startPerformOp, updatePerformanceEnd } from '@mikezimm/npmfunctions/dist/Performance/functions';
export { IPerformanceOp, ILoadPerformance, IHistoryPerformance, ILoadPerformanceOps } from '@mikezimm/npmfunctions/dist/Performance/IPerformance';
export { createPerformanceTableVisitor } from '@mikezimm/npmfunctions/dist/Performance/tables';
  
/***
 *    d88888b d8888b. .d8888.      d8888b. d8888b. d88888b .d8888. d88888b d888888b .d8888. 
 *    88'     88  `8D 88'  YP      88  `8D 88  `8D 88'     88'  YP 88'     `~~88~~' 88'  YP 
 *    88ooo   88oodD' `8bo.        88oodD' 88oobY' 88ooooo `8bo.   88ooooo    88    `8bo.   
 *    88~~~   88~~~     `Y8b.      88~~~   88`8b   88~~~~~   `Y8b. 88~~~~~    88      `Y8b. 
 *    88      88      db   8D      88      88 `88. 88.     db   8D 88.        88    db   8D 
 *    YP      88      `8888Y'      88      88   YD Y88888P `8888Y' Y88888P    YP    `8888Y' 
 *
 *    USED IN PRESETTING PROPS
 */

export { applyPresetCollectionDefaults } from '@mikezimm/npmfunctions/dist/PropPaneHelp/ApplyPresets';
export { ISitePreConfigProps, } from '@mikezimm/npmfunctions/dist/PropPaneHelp/PreConfigFunctions';



/***
 *     .d88b.  d8b   db      d888888b d8b   db d888888b d888888b 
 *    .8P  Y8. 888o  88        `88'   888o  88   `88'   `~~88~~' 
 *    88    88 88V8o 88         88    88V8o 88    88       88    
 *    88    88 88 V8o88         88    88 V8o88    88       88    
 *    `8b  d8' 88  V888        .88.   88  V888   .88.      88    
 *     `Y88P'  VP   V8P      Y888888P VP   V8P Y888888P    YP    
 *
 *     USED FIRST IN ONINIT
 */

export { webpartInstance, } from '@mikezimm/npmfunctions/dist/Services/DOM/FPSDocument';
// export { getUrlVars } from '@mikezimm/npmfunctions/dist/Services/Logging/LogFunctions';

export { IFPSUser } from '@mikezimm/npmfunctions/dist/Services/Users/IUserInterfaces';
export { getFPSUser } from '@mikezimm/npmfunctions/dist/Services/Users/FPSUser';

import * as links from '@mikezimm/npmfunctions/dist/Links/LinksRepos';

import { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';
export { IRepoLinks } from '@mikezimm/npmfunctions/dist/Links/CreateLinks';


export const repoLink: IRepoLinks = links.gitRepoCoreFPS115Small;
export const trickyEmails = links.trickyEmails;

/***
 *    .d8888. d888888b db    db db      d88888b .d8888. 
 *    88'  YP `~~88~~' `8b  d8' 88      88'     88'  YP 
 *    `8bo.      88     `8bd8'  88      88ooooo `8bo.   
 *      `Y8b.    88       88    88      88~~~~~   `Y8b. 
 *    db   8D    88       88    88booo. 88.     db   8D 
 *    `8888Y'    YP       YP    Y88888P Y88888P `8888Y' 
 *
 *    USED FOR STYLES
 */

export { expandoOnInit } from '@mikezimm/npmfunctions/dist/Services/DOM/Expando/WebPartOnInit';
export { renderCustomStyles } from '@mikezimm/npmfunctions/dist/WebPartFunctions/MainWebPartStyleFunctions';
export { updateBannerThemeStyles } from '@mikezimm/npmfunctions/dist/WebPartFunctions/BannerThemeFunctions';


/***
 *    db   d8b   db d8888b.      db   db d888888b .d8888. d888888b  .d88b.  d8888b. db    db 
 *    88   I8I   88 88  `8D      88   88   `88'   88'  YP `~~88~~' .8P  Y8. 88  `8D `8b  d8' 
 *    88   I8I   88 88oodD'      88ooo88    88    `8bo.      88    88    88 88oobY'  `8bd8'  
 *    Y8   I8I   88 88~~~        88~~~88    88      `Y8b.    88    88    88 88`8b      88    
 *    `8b d8'8b d8' 88           88   88   .88.   db   8D    88    `8b  d8' 88 `88.    88    
 *     `8b8' `8d8'  88           YP   YP Y888888P `8888Y'    YP     `Y88P'  88   YD    YP    
 *
 *     USED FOR WEB PART HISTORY
 */

export { updateWebpartHistoryV2,  } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory/Functions';
export { getWebPartHistoryOnInit } from '@mikezimm/npmfunctions/dist/Services/PropPane/WebPartHistory/OnInit';


/***
 *    d8888b.  .d8b.  d8b   db d8b   db d88888b d8888b. 
 *    88  `8D d8' `8b 888o  88 888o  88 88'     88  `8D 
 *    88oooY' 88ooo88 88V8o 88 88V8o 88 88ooooo 88oobY' 
 *    88~~~b. 88~~~88 88 V8o88 88 V8o88 88~~~~~ 88`8b   
 *    88   8D 88   88 88  V888 88  V888 88.     88 `88. 
 *    Y8888P' YP   YP VP   V8P VP   V8P Y88888P 88   YD 
 *
 *     USED FOR CREATING BANNER
 */

export { IWebpartBannerProps } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/bannerProps';


/***
 *    d8888b. d8888b.  .d88b.  d8888b.       d888b  d8888b.  .d88b.  db    db d8888b. .d8888. 
 *    88  `8D 88  `8D .8P  Y8. 88  `8D      88' Y8b 88  `8D .8P  Y8. 88    88 88  `8D 88'  YP 
 *    88oodD' 88oobY' 88    88 88oodD'      88      88oobY' 88    88 88    88 88oodD' `8bo.   
 *    88~~~   88`8b   88    88 88~~~        88  ooo 88`8b   88    88 88    88 88~~~     `Y8b. 
 *    88      88 `88. `8b  d8' 88           88. ~8~ 88 `88. `8b  d8' 88b  d88 88      db   8D 
 *    88      88   YD  `Y88P'  88            Y888P  88   YD  `Y88P'  ~Y8888P' 88      `8888Y' 
 *
 *    USED FOR PROPERTY PANE GROUPS
 */

export { WebPartInfoGroup, } from '@mikezimm/npmfunctions/dist/Services/PropPane/zReusablePropPane';
export { FPSOptionsGroupBasic, } from '@mikezimm/npmfunctions/dist/Services/PropPane/FPSOptionsGroup3';
export { FPSBanner4BasicGroup,FPSBanner3NavGroup, FPSBanner3ThemeGroup } from '@mikezimm/npmfunctions/dist/Services/PropPane/FPSOptionsGroup3';
export { FPSBanner3VisHelpGroup } from '@mikezimm/npmfunctions/dist/CoreFPS/FPSOptionsGroupVisHelp';
export { FPSPinMePropsGroup } from '@mikezimm/npmfunctions/dist/Services/DOM/PinMe/FPSOptionsGroupPinMe';
export { FPSOptionsExpando, } from '@mikezimm/npmfunctions/dist/Services/DOM/Expando/FPSOptionsExpando'; //expandAudienceChoicesAll


/***
 *    d8888b. d8888b.  .d88b.  d8888b.      d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b d888888b d8b   db  d888b  
 *    88  `8D 88  `8D .8P  Y8. 88  `8D        `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'   `88'   888o  88 88' Y8b 
 *    88oodD' 88oobY' 88    88 88oodD'         88    88  88  88 88oodD' 88    88 88oobY'    88       88    88V8o 88 88      
 *    88~~~   88`8b   88    88 88~~~           88    88  88  88 88~~~   88    88 88`8b      88       88    88 V8o88 88  ooo 
 *    88      88 `88. `8b  d8' 88             .88.   88  88  88 88      `8b  d8' 88 `88.    88      .88.   88  V888 88. ~8~ 
 *    88      88   YD  `Y88P'  88           Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP    Y888888P VP   V8P  Y888P  
 *
 *    USED for IMPORTING and EXPORTING
 */


export { updateFpsImportProps, FPSImportPropsGroup } from '@mikezimm/npmfunctions/dist/Services/PropPane/ImportFunctions';
export { refreshBannerStylesOnPropChange,  } from '@mikezimm/npmfunctions/dist/WebPartFunctions/BannerThemeFunctions';
export { validateDocumentationUrl,  } from '@mikezimm/npmfunctions/dist/Links/ValidateLinks';


/***
 *     .d8b.  d8b   db  .d8b.  db      db    db d888888b d888888b  .o88b. .d8888. 
 *    d8' `8b 888o  88 d8' `8b 88      `8b  d8' `~~88~~'   `88'   d8P  Y8 88'  YP 
 *    88ooo88 88V8o 88 88ooo88 88       `8bd8'     88       88    8P      `8bo.   
 *    88~~~88 88 V8o88 88~~~88 88         88       88       88    8b        `Y8b. 
 *    88   88 88  V888 88   88 88booo.    88       88      .88.   Y8b  d8 db   8D 
 *    YP   YP VP   V8P YP   YP Y88888P    YP       YP    Y888888P  `Y88P' `8888Y' 
 *
 *    USED FOR ANALYTICS AND LOGGING
 */


 export { saveAnalytics3, getMinPerformanceString } from '@mikezimm/npmfunctions/dist/Services/Analytics/analytics2';
export { IZLoadAnalytics, IZSentAnalytics, } from '@mikezimm/npmfunctions/dist/Services/Analytics/interfaces';

// export { importBlockPropsFPS } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface';
export { IMinWPBannerProps } from "@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface";
// export { IMinBannerUIProps, IMinPinMeProps, IMinPandoramicProps, IMinBannerThemeProps, IMinCustomHelpProps, 
//     IMinPageStyleProps, IMinBannerUtilityProps, IMinFPSLegacyProps } from "@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface";


//Added from WebPartRenderBanner

export { IBuildBannerSettings , } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface';

export { verifyAudienceVsUser } from '@mikezimm/npmfunctions/dist/Services/Users/CheckPermissions';

export { visitorPanelInfo } from '@mikezimm/npmfunctions/dist/CoreFPS/VisitorPanelComponent';



// from src\webparts\V2NpmBanner\CoreFPS\PropPaneHelp.tsx

export { gitRepoALVFinManSmall } from '@mikezimm/npmfunctions/dist/Links/LinksRepos';

export { defaultBannerCommandStyles, } from "@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/defaults";

export { BannerHelp, FPSBasicHelp, FPSExpandHelp, ImportHelp, SinglePageAppHelp, VisitorHelp, PinMeHelp, SitePresetsInfo } from '@mikezimm/npmfunctions/dist/PropPaneHelp/FPSCommonOnNpm';

export { HandleBarReplacements } from '@mikezimm/npmfunctions/dist/Services/Strings/handleBars';


// from src\webparts\V2NpmBanner\CoreFPS\PreConfiguredSettings.ts
export { IPreConfigSettings, IAllPreConfigSettings } from '@mikezimm/npmfunctions/dist/PropPaneHelp/PreConfigFunctions';
export { PresetFPSBanner } from '@mikezimm/npmfunctions/dist/PropPaneHelp/PreConfiguredConstants';
export { encrptMeOriginalTest } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/logTest';
export { createBannerStyleStr } from "@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/defaults";


//Copied from src\webparts\V2NpmBanner\CoreFPS\FetchBannerElement.tsx
export { FPSPinMe, IPinMeState, getDefaultFPSPinState, IPinStatus } from '@mikezimm/npmfunctions/dist/Services/DOM/PinMe/FPSPinMenu';

// export WebpartBanner from "@mikezimm/npmfunctions/dist/HelpPanelOnNPM/banner/onLocal/component";
export { IBannerPages } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/bannerProps';


// from src\webparts\V2NpmBanner\CoreFPS\BuildExportProps.ts

export { createExportObject, } from '@mikezimm/npmfunctions/dist/Services/PropPane/ExportFunctions';

import { exportIgnorePropsFPS, } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface';
console.log( 'exportIgnorePropsFPS', exportIgnorePropsFPS );
export { changeCustomHelp, changeExpando, changeBanner, changePageStyle, changefpsOptions2, exportIgnorePropsFPS, } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface';



export { changeBannerBasics, changeBannerNav, changeBannerTheme, changeBannerUtility,  } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface';
export { changePinMe,  } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/BannerInterface';


// from src\webparts\V2NpmBanner\components\IV2NpmBannerProps.ts
export { IFPSCorePinMeReactComponentProps, IFPSCorePinMeReactComponentState } from '@mikezimm/npmfunctions/dist/CoreFPS/ReactComponentProps';

// from src\webparts\V2NpmBanner\components\HelpPanel\About.tsx

export { IHelpTable, } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/banner/SinglePage/ISinglePageProps';

export { createAboutRow } from '@mikezimm/npmfunctions/dist/CoreFPS/BannerPageMisc';


// from src\webparts\V2NpmBanner\components\HelpPanel\AllContent.ts

export { tricksTable } from '@mikezimm/npmfunctions/dist/CoreFPS/ReusaableTricks';

export { convertIssuesMarkdownStringToSpan } from '@mikezimm/npmfunctions/dist/Elements/Markdown';


export { getHelpfullError } from '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';
export { getHelpfullErrorV2, saveThisLogItem } from  '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';



