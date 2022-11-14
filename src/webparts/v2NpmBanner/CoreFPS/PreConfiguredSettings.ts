/***
 *    d88888b d8888b. .d8888.      d8888b. d8888b. d88888b .d8888. d88888b d888888b .d8888. 
 *    88'     88  `8D 88'  YP      88  `8D 88  `8D 88'     88'  YP 88'     `~~88~~' 88'  YP 
 *    88ooo   88oodD' `8bo.        88oodD' 88oobY' 88ooooo `8bo.   88ooooo    88    `8bo.   
 *    88~~~   88~~~     `Y8b.      88~~~   88`8b   88~~~~~   `Y8b. 88~~~~~    88      `Y8b. 
 *    88      88      db   8D      88      88 `88. 88.     db   8D 88.        88    db   8D 
 *    YP      88      `8888Y'      88      88   YD Y88888P `8888Y' Y88888P    YP    `8888Y' 
 *                                                                                          
 *                                                                                          
 */

// import { encrptMeOriginalTest } from '../fpsReferences';

import { EasyIconDefaultKeys } from '../components/EasyIcons/eiTypes';
import { DefaultEasyPagesTabs, DefaultOverflowTab } from '../components/EasyPages/epTypes';
import { PresetFPSBanner, IPreConfigSettings, IAllPreConfigSettings } from '../fpsReferences';


/***
 *    db       .d88b.   .o88b.  .d8b.  db      
 *    88      .8P  Y8. d8P  Y8 d8' `8b 88      
 *    88      88    88 8P      88ooo88 88      
 *    88      88    88 8b      88~~~88 88      
 *    88booo. `8b  d8' Y8b  d8 88   88 88booo. 
 *    Y88888P  `Y88P'   `Y88P' YP   YP Y88888P 
 *                                             
 *                                             
 */

//Specific to this web part
export const WPForceEverywhere : IPreConfigSettings = {
    source: 'WPForceEverywhere',
    location: '*',
    props: {

        showRepoLinks : true,
        // showExport : false,
        showBanner : true,
    }
};

//Specific to this web part
export const WPPresetEverywhere : IPreConfigSettings = {
    source: 'WPPresetEverywhere',
    location: '*',
    props: {
        bannerTitle: "FPS Pnpjs V2 Upgrade Sample",
        defPinState: 'disabled',
        webUrl: '',
        listTitle: 'Documents',

      //Move these to npmFunctions when code is moved

        easyPageEnable: true,
        easyPagesAudience: 'Everyone',
        easyPageTabsC:  DefaultEasyPagesTabs.join(';'),
        easyPageTabsP:  DefaultEasyPagesTabs.join(';'),
        easyPageTabsA:  DefaultEasyPagesTabs.join(';'),
        easyPageOverflowTab:  DefaultOverflowTab,
        easyPageParent: true, //Include parent site pages
        easyPageAltUrl: '', //Include alternate site's site pages
        atlSiteTitle:  '', //Include navigation elements from other site
        easyPageSeparateExtras:  true, //Include navigation elements from other site
        easyPageStyles:  '',  //Optional styles on entire page
        easyPageContainer:  '',  //Optional styles on container element

        easyIconEnable: true, // Used 
        easyIconKeys:  EasyIconDefaultKeys.join(';'),
        easyIconIgnore:  '',

    }
};

export const PresetSomeRandomSite : IPreConfigSettings = {
    source: 'PresetSomeRandomSite',
    location: '/sites/FPS/'.toLowerCase(),
    props: {
        // homeParentGearAudience: 'Some Test Value',
        // requireDocumentation: false,
        requireDocumentation: 'redDark',
    }
};

export const ForceSomeRandomSite : IPreConfigSettings = {
    source: 'ForceSomeRandomSite',
    location: '/sites/FPS/'.toLowerCase(),
    props: {
        // homeParentGearAudience: 'Some Test Value',
        // requireDocumentation: false,
        // requireContacts: true,
        // bannerStyleChoice: 'redDark',
        // bannerStyle: createBannerStyleStr( 'redDark', 'banner'),
        // bannerCmdStyle: createBannerStyleStr( 'redDark', 'cmd'),
    }
};


export const PreConfiguredProps : IAllPreConfigSettings = {
    //Forced over-ride presets.
    //Forced and presets are applied in order of this array....
    //  This means the final preset in the array takes precedance.

    //For Forced, generally speaking put because this web part may have specific needs.
    forced: [ WPForceEverywhere, ForceSomeRandomSite,  ],

    //For Presets, Order should be:  PresetFPSBanner, WPPresetEverywhere, CUSTOM Sites,
    preset: [ PresetFPSBanner, WPPresetEverywhere, PresetSomeRandomSite, ],
};
