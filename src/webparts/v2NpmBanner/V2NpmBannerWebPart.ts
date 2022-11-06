/***
 *    db    db  .d88b.       d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b .d8888. 
 *    `8b  d8' .8P  Y8.        `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~' 88'  YP 
 *     `8bd8'  88    88         88    88  88  88 88oodD' 88    88 88oobY'    88    `8bo.   
 *       88    88    88         88    88  88  88 88~~~   88    88 88`8b      88      `Y8b. 
 *       88    `8b  d8'        .88.   88  88  88 88      `8b  d8' 88 `88.    88    db   8D 
 *       YP     `Y88P'       Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP    `8888Y' 
 *                                                                                         
 *                                                                                         
 */

 import * as React from 'react';
 import * as ReactDom from 'react-dom';
 import { Version } from '@microsoft/sp-core-library';
 import { DisplayMode, } from '@microsoft/sp-core-library';
 import {
   IPropertyPaneConfiguration,
   PropertyPaneTextField
 } from '@microsoft/sp-property-pane';
 import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
 import { IReadonlyTheme } from '@microsoft/sp-component-base';
 
 
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
 import * as strings from 'V2NpmBannerWebPartStrings';
 import V2NpmBanner from './components/V2NpmBanner';
 import { IV2NpmBannerWebPartProps,  } from './IV2NpmBannerWebPartProps';
 import { IV2NpmBannerProps } from './components/IV2NpmBannerProps';
 
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
 
 import { applyPresetCollectionDefaults, ISitePreConfigProps,  } from './fpsReferences';
 import { PreConfiguredProps,  } from './CoreFPS/PreConfiguredSettings';
 
 
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
 
 import { webpartInstance, IFPSUser, getFPSUser, repoLink, trickyEmails } from './fpsReferences';
 import { createBasePerformanceInit, startPerformOp, updatePerformanceEnd } from './fpsReferences';
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 import { IPerformanceOp, ILoadPerformance, IHistoryPerformance, ILoadPerformanceOps } from './fpsReferences';
 
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
 
 import { renderCustomStyles, updateBannerThemeStyles, expandoOnInit, refreshBannerStylesOnPropChange } from './fpsReferences';
 import { getReactCSSFromString } from './fpsReferences';
 
 
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
 
 import { getWebPartHistoryOnInit, updateWebpartHistoryV2,  } from './fpsReferences';
 
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
 
 import { IWebpartBannerProps, } from './fpsReferences';
 import { buildExportProps, buildFPSAnalyticsProps , } from './CoreFPS/BuildExportProps';
 
 //  import { mainWebPartRenderBannerSetup } from './fpsReferences';
 //  import { mainWebPartRenderBannerSetup } from './CoreFPS/WebPartRenderBanner';
 
 //For whatever reason, THIS NEEDS TO BE CALLED Directly and NOT through fpsReferences or it gives error.
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 import { mainWebPartRenderBannerSetup, refreshPanelHTML } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/WebPartRenderBannerV2';
 
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
//  import { visitorPanelInfo, } from './fpsReferences';
//  import { createPerformanceTableVisitor } from './fpsReferences';
 
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
 
 import { WebPartInfoGroup, } from './fpsReferences';
 import { FPSOptionsGroupBasic, } from './fpsReferences';
 import { FPSBanner4BasicGroup, FPSBanner3NavGroup, FPSBanner3ThemeGroup } from './fpsReferences';
 import { FPSBanner3VisHelpGroup } from './fpsReferences';
 import { FPSPinMePropsGroup } from './fpsReferences';
 import { FPSOptionsExpando, } from './fpsReferences'; //expandAudienceChoicesAll
 
 
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
 
 import { updateFpsImportProps, FPSImportPropsGroup, validateDocumentationUrl } from './fpsReferences';
 
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
 
 import { importBlockProps,  } from './IV2NpmBannerWebPartProps';
import { buildEasyPagesGroup } from './PropPaneGroups/EasyPages';
import { getStringArrayFromString } from '@mikezimm/npmfunctions/dist/Services/Strings/stringServices';
import { IEasyIconGroups } from './components/PropPaneCols/components/EasyIcons/eiTypes';
import { setEasyIconsObjectProps } from './components/PropPaneCols/components/EasyIcons/eiFunctions';
 
 /***
  *     .o88b. .d8888. .d8888.      d8888b. d88888b  .d88b.  db    db d888888b d8888b. d88888b .d8888. 
  *    d8P  Y8 88'  YP 88'  YP      88  `8D 88'     .8P  Y8. 88    88   `88'   88  `8D 88'     88'  YP 
  *    8P      `8bo.   `8bo.        88oobY' 88ooooo 88    88 88    88    88    88oobY' 88ooooo `8bo.   
  *    8b        `Y8b.   `Y8b.      88`8b   88~~~~~ 88    88 88    88    88    88`8b   88~~~~~   `Y8b. 
  *    Y8b  d8 db   8D db   8D      88 `88. 88.     `8P  d8' 88b  d88   .88.   88 `88. 88.     db   8D 
  *     `Y88P' `8888Y' `8888Y'      88   YD Y88888P  `Y88'Y8 ~Y8888P' Y888888P 88   YD Y88888P `8888Y' 
  *
  *     USED BY BANNER COMPONENTS
  */
 
 require('@mikezimm/npmfunctions/dist/Services/PropPane/GrayPropPaneAccordions.css');

 
export default class V2NpmBannerWebPart extends BaseClientSideWebPart<IV2NpmBannerWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

      //Common FPS variables

      private _sitePresets : ISitePreConfigProps = null;
      private _trickyApp = 'FPS Core115';
      private _wpInstanceID: string = webpartInstance( this._trickyApp );
      private _FPSUser: IFPSUser = null;
    
      //For FPS Banner
      private _forceBanner = true ;
      private _modifyBannerTitle = true ;
      private _modifyBannerStyle = true ;
    
      private _exitPropPaneChanged = false;
      private _importErrorMessage = '';
      
      private _keysToShow : ILoadPerformanceOps[] = [ ];
      private _performance : ILoadPerformance = null;
  
      // private performance : ILoadPerformanceALVFM = null;
      // private bannerProps: IWebpartBannerProps = null;
    
      // private urlParameters: any = {};
    
      //2022-04-07:  Intent of this is a one-time per instance to 'become a reader' level user.  aka, hide banner buttons that reader won't see
      private _beAReader: boolean = false; 
  
      // private _fetchInfo: any = null; // Originally IFetchInfo if it has it


  protected async onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit().then(async _ => {
  
      /***
     *     .d88b.  d8b   db      d888888b d8b   db d888888b d888888b      d8888b. db   db  .d8b.  .d8888. d88888b      .d888b. 
     *    .8P  Y8. 888o  88        `88'   888o  88   `88'   `~~88~~'      88  `8D 88   88 d8' `8b 88'  YP 88'          VP  `8D 
     *    88    88 88V8o 88         88    88V8o 88    88       88         88oodD' 88ooo88 88ooo88 `8bo.   88ooooo         odD' 
     *    88    88 88 V8o88         88    88 V8o88    88       88         88~~~   88~~~88 88~~~88   `Y8b. 88~~~~~       .88'   
     *    `8b  d8' 88  V888        .88.   88  V888   .88.      88         88      88   88 88   88 db   8D 88.          j88.    
     *     `Y88P'  VP   V8P      Y888888P VP   V8P Y888888P    YP         88      YP   YP YP   YP `8888Y' Y88888P      888888D 
     *                                                                                                                         
     *                                                                                                                         
     */

     // DEFAULTS SECTION:  Performance   <<< ================================================================
     this._performance = createBasePerformanceInit( this.displayMode, false );
    this._performance.ops.superOnInit = startPerformOp( 'superOnInit', this.displayMode );

      //NEED TO APPLY THIS HERE as well as follow-up in render for it to not visibly change
      this._sitePresets = applyPresetCollectionDefaults( this._sitePresets, PreConfiguredProps, this.properties, this.context.pageContext.web.serverRelativeUrl ) ;

      //This indicates if its SPA, Teams etc.... always keep.
      this.properties.pageLayout =  this.context['_pageLayoutType']?this.context['_pageLayoutType'] : this.context['_pageLayoutType'];
      // this.urlParameters = getUrlVars();

      this._FPSUser = getFPSUser( this.context as any, trickyEmails, this._trickyApp ) ;
      console.log( 'FPSUser: ', this._FPSUser );

      expandoOnInit( this.properties, this.context.domElement, this.displayMode );

      updateBannerThemeStyles( this.properties, this.properties.bannerStyleChoice ? this.properties.bannerStyleChoice : 'corpDark1', true, this.properties.defPinState, this._sitePresets.forces );
 
      this.properties.webpartHistory = getWebPartHistoryOnInit( this.context.pageContext.user.displayName, this.properties.webpartHistory );

      renderCustomStyles( 
        { wpInstanceID: this._wpInstanceID, domElement: this.domElement, wpProps: this.properties, 
          displayMode: this.displayMode,
          doHeadings: false } );  //doHeadings is currently only used in PageInfo so set to false.

      this._performance.ops.superOnInit = updatePerformanceEnd( this._performance.ops.superOnInit, true,666 );

    });

  }

  /***
   *    d8888b. d88888b d8b   db d8888b. d88888b d8888b.       .o88b.  .d8b.  db      db      .d8888. 
   *    88  `8D 88'     888o  88 88  `8D 88'     88  `8D      d8P  Y8 d8' `8b 88      88      88'  YP 
   *    88oobY' 88ooooo 88V8o 88 88   88 88ooooo 88oobY'      8P      88ooo88 88      88      `8bo.   
   *    88`8b   88~~~~~ 88 V8o88 88   88 88~~~~~ 88`8b        8b      88~~~88 88      88        `Y8b. 
   *    88 `88. 88.     88  V888 88  .8D 88.     88 `88.      Y8b  d8 88   88 88booo. 88booo. db   8D 
   *    88   YD Y88888P VP   V8P Y8888D' Y88888P 88   YD       `Y88P' YP   YP Y88888P Y88888P `8888Y' 
   *                                                                                                  
   *           Source:   PivotTiles 1.5.2.6                                                                                
   */

  public render(): void {

    
  /**
   * PERFORMANCE - START
   * This is how you can start a performance snapshot - make the _performance.KEYHERE = startPerforOp('KEYHERE', this.displayMode)
   */ 
   this._performance.ops.renderWebPartStart = startPerformOp( 'renderWebPartStart', this.displayMode );


   renderCustomStyles( 
     { wpInstanceID: this._wpInstanceID, domElement: this.domElement, wpProps: this.properties, 
       displayMode: this.displayMode,
       doHeadings: false } );  //doHeadings is currently only used in PageInfo so set to false.

  const exportProps = buildExportProps( this.properties , this._wpInstanceID, this.context.pageContext.web.serverRelativeUrl );

  const bannerProps: IWebpartBannerProps = mainWebPartRenderBannerSetup( this.displayMode, this._beAReader, this._FPSUser, //repoLink.desc, 
      this.properties, repoLink, trickyEmails, exportProps, strings , this.domElement.clientWidth, this.context as any, this._modifyBannerTitle, 
      this._forceBanner, false, null, this._keysToShow, true, true );

   if ( bannerProps.showBeAUserIcon === true ) { bannerProps.beAUserFunction = this._beAUserFunction.bind(this); }


 /**
  * PERFORMANCE - UPDATE
  * This is how you can UPDATE a performance snapshot - make the _performance.KEYHERE = startPerforOp('KEYHERE', this.displayMode)
  * NOTE IN THIS CASE to do it before you refreshPanelHTML :)
  */

  this._performance.ops.renderWebPartStart = updatePerformanceEnd( this._performance.ops.renderWebPartStart, true, 555 );

    const element: React.ReactElement<IV2NpmBannerProps> = React.createElement(
      V2NpmBanner,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,

        /**
         * Specific for this web part
         * 
         */
        lists: [{
          webURL: this.properties.webURL ? this.properties.webURL : this.context.pageContext.web.absoluteUrl,
          listTitle: this.properties.listTitle,
        }],

        /**
         * Added FPS Banner settings
         */

        //Environement props
        // pageContext: this.context.pageContext, //This can be found in the bannerProps now
        context: this.context as any,
        displayMode: this.displayMode,

        performance: this._performance, //Alternatively, use this if available (like ALVFM): _fetchInfo.performance,

        // saveLoadAnalytics: this.saveLoadAnalytics.bind(this),
        FPSPropsObj: buildFPSAnalyticsProps( this.properties, this._wpInstanceID, this.context.pageContext.web.serverRelativeUrl ),

        //Banner related props
        errMessage: 'any',
        bannerProps: bannerProps,
        webpartHistory: this.properties.webpartHistory,

        sitePresets: this._sitePresets,

        fpsPinMenu: {
          defPinState: this.properties.defPinState,
          forcePinState: this.properties.forcePinState,
          domElement: this.context.domElement,
          pageLayout: this.properties.pageLayout,
        },

        easyPagesProps: {
          context: this.context,
          expanded: false ,
          tabs: getStringArrayFromString( this.properties.easyPageTabs , ';', true, null, true ) ,
          overflowTab: this.properties.easyPageOverflowTab,
          fetchParent: this.properties.easyPageParent,
          altSitePagesUrl: this.properties.easyPageAltUrl,
          altSiteNavigation: this.properties.easyPageAltNav,
          styles: getReactCSSFromString( 'easyPageStyles', this.properties.easyPageStyles, {} ).parsed,
          containerStyles: getReactCSSFromString( 'easyPageContainer', this.properties.easyPageContainer, {} ).parsed,
        },
        EasyIconsObject: setEasyIconsObjectProps( this.properties ),

      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }



    /***
 *    d8888b. d88888b       .d8b.       db    db .d8888. d88888b d8888b. 
 *    88  `8D 88'          d8' `8b      88    88 88'  YP 88'     88  `8D 
 *    88oooY' 88ooooo      88ooo88      88    88 `8bo.   88ooooo 88oobY' 
 *    88~~~b. 88~~~~~      88~~~88      88    88   `Y8b. 88~~~~~ 88`8b   
 *    88   8D 88.          88   88      88b  d88 db   8D 88.     88 `88. 
 *    Y8888P' Y88888P      YP   YP      ~Y8888P' `8888Y' Y88888P 88   YD 
 *                                                                       
 *                                                                       
 */

     private _beAUserFunction(): void {
      console.log('beAUserFunction:',   );
      if ( this.displayMode === DisplayMode.Edit ) {
        alert("'Be a regular user' mode is only available while viewing the page.  \n\nOnce you are out of Edit mode, please refresh the page (CTRL-F5) to reload the web part.");

      } else {
        this._beAReader = this._beAReader === true ? false : true;
        this.render();
      }

    }


    /***
   *    d8888b. d8888b.  .d88b.  d8888b.      d8888b.  .d8b.  d8b   db d88888b       .o88b. db   db  .d8b.  d8b   db  d888b  d88888b 
   *    88  `8D 88  `8D .8P  Y8. 88  `8D      88  `8D d8' `8b 888o  88 88'          d8P  Y8 88   88 d8' `8b 888o  88 88' Y8b 88'     
   *    88oodD' 88oobY' 88    88 88oodD'      88oodD' 88ooo88 88V8o 88 88ooooo      8P      88ooo88 88ooo88 88V8o 88 88      88ooooo 
   *    88~~~   88`8b   88    88 88~~~        88~~~   88~~~88 88 V8o88 88~~~~~      8b      88~~~88 88~~~88 88 V8o88 88  ooo 88~~~~~ 
   *    88      88 `88. `8b  d8' 88           88      88   88 88  V888 88.          Y8b  d8 88   88 88   88 88  V888 88. ~8~ 88.     
   *    88      88   YD  `Y88P'  88           88      YP   YP VP   V8P Y88888P       `Y88P' YP   YP YP   YP VP   V8P  Y888P  Y88888P 
   *                                                                                                                                 
   *                                                                                                                                 
   */

    //Copied from AdvancedPagePropertiesWebPart.ts
    // protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
      protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): Promise<void> {
        super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

        try {
          await validateDocumentationUrl ( this.properties, propertyPath , newValue );
        } catch(e) {
          alert('unalbe to validateDocumentationUrl' );
        }

        this.properties.webpartHistory = updateWebpartHistoryV2( this.properties.webpartHistory , propertyPath , newValue, this.context.pageContext.user.displayName, [], [] );

        if ( propertyPath === 'fpsImportProps' ) {

          this._importErrorMessage = updateFpsImportProps( this.properties, importBlockProps, propertyPath, newValue,
            this.context.propertyPane.refresh,
            this.onPropertyPaneConfigurationStart,
            this._exitPropPaneChanged,
          );

         } else if ( propertyPath === 'bannerStyle' || propertyPath === 'bannerCmdStyle' )  {

          refreshBannerStylesOnPropChange( this.properties, propertyPath, newValue, this.context.propertyPane.refresh );

        } else if (propertyPath === 'bannerStyleChoice')  {
          // bannerThemes, bannerThemeKeys, makeCSSPropPaneString

          updateBannerThemeStyles( this.properties , newValue, true, this.properties.defPinState, this._sitePresets.forces );

          if ( newValue === 'custom' || newValue === 'lock' ) {
            //Do nothing for these cases.

          } else {
            //Reset main web part styles to defaults

          }

        }

        this.context.propertyPane.refresh();

        this.render();

      }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true, //DONT FORGET THIS IF PROP PANE GROUPS DO NOT EXPAND
          groups: [

            WebPartInfoGroup( repoLink, 'Sample FPS Banner component :)' ),

            {groupName: 'Npm Banner Web Part Sample',
            isCollapsed: false,
            groupFields: [
              PropertyPaneTextField('webURL', {
                label: 'webURL',
                description: 'Leave blank for current site',
              }),
              PropertyPaneTextField('listTitle', {
                label: 'listTitle',
                description: 'Full Title of list or library',
              }),]

           },

           buildEasyPagesGroup( this.properties, this.context.pageContext.site.absoluteUrl !== this.context.pageContext.web.absoluteUrl ),
            FPSPinMePropsGroup, //End this group  

            FPSBanner3VisHelpGroup( this.context, this.onPropertyPaneFieldChanged, this.properties ),
            FPSBanner4BasicGroup( this._forceBanner , this._modifyBannerTitle, this.properties.showBanner, this.properties.infoElementChoice === 'Text' ? true : false, true, true ),
            FPSBanner3NavGroup(),
            FPSBanner3ThemeGroup( this._modifyBannerStyle, this.properties.showBanner, this.properties.lockStyles, false ),
            FPSOptionsGroupBasic( false, true, true, true, this.properties.allSectionMaxWidthEnable, true, this.properties.allSectionMarginEnable, true ), // this group
            FPSOptionsExpando( this.properties.enableExpandoramic, this.properties.enableExpandoramic,null, null ),
  
            FPSImportPropsGroup, // this group
          ]
        }
      ]
    };
  }
}
