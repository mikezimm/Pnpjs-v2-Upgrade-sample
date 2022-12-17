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
 import { Version, } from '@microsoft/sp-core-library';
 import { DisplayMode, } from '@microsoft/sp-core-library';
 import { SPPermission, } from '@microsoft/sp-page-context';
 import {
   IPropertyPaneConfiguration,
   IPropertyPaneGroup,
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
  *     .o88b. .d8888. .d8888.      d8888b. d88888b  .d88b.  db    db d888888b d8888b. d88888b .d8888. 
  *    d8P  Y8 88'  YP 88'  YP      88  `8D 88'     .8P  Y8. 88    88   `88'   88  `8D 88'     88'  YP 
  *    8P      `8bo.   `8bo.        88oobY' 88ooooo 88    88 88    88    88    88oobY' 88ooooo `8bo.   
  *    8b        `Y8b.   `Y8b.      88`8b   88~~~~~ 88    88 88    88    88    88`8b   88~~~~~   `Y8b. 
  *    Y8b  d8 db   8D db   8D      88 `88. 88.     `8P  d8' 88b  d88   .88.   88 `88. 88.     db   8D 
  *     `Y88P' `8888Y' `8888Y'      88   YD Y88888P  `Y88'Y8 ~Y8888P' Y888888P 88   YD Y88888P `8888Y' 
  *
  *     USED BY BANNER COMPONENTS
  */

 import { initializeIcons } from '@uifabric/icons';
 initializeIcons();
 
 require('@mikezimm/fps-styles/dist/GrayPropPaneAccordions.css');
 require('@mikezimm/fps-styles/dist/FPSPinMe.css');
 require('@mikezimm/fps-styles/dist/FPSHeadings.css');
 require('@mikezimm/fps-styles/dist/PropPanelHelp.css');
 require('@mikezimm/fps-styles/dist/performance.css');
 
 
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
 
 import { PreConfiguredProps,  } from './CoreFPS/PreConfiguredSettings';
 
 import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
 import { getAllDefaultFPSFeatureGroups } from '@mikezimm/fps-library-v2/lib/banner/propPane/AllDefaultFPSGroups';
 
 import { WebPartInfoGroup, } from '@mikezimm/fps-library-v2/lib/banner/propPane/WebPartInfoGroup';
 import { FPSPinMePropsGroupX } from '@mikezimm/fps-library-v2/lib/banner/features/PinMe/PinMePropGroup';
 import { FPSFieldsPanelPropGroup } from '@mikezimm/fps-library-v2/lib/components/molecules/FieldPanel/PPCPropGroup';
 
 import { exportIgnorePropsWP, importBlockPropsWP, WebPartAnalyticsChanges, WebPartPanelChanges,  } from './IV2NpmBannerWebPartProps';
 
 import { gitRepoALVFinManSmall } from '@mikezimm/fps-library-v2/lib/components/atoms/Links/LinksRepos';
 import { runFPSSuperOnInit } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/runSuperOnInit';
 import { runFPSWebPartRender } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/runWebPartRender';
 import { onFPSPropPaneCHanged } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/runOnPropChange';
 import { FPSBaseClass } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/FPSBaseClass';
 import { IThisFPSWebPartClass } from '@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/IThisFPSWebPartClass';



export default class V2NpmBannerWebPart extends FPSBaseClass<IV2NpmBannerWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected async onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    this._repoLink = gitRepoALVFinManSmall; //Set as any but will get created in FPSSuperOnOnit
    this._exportIgnorePropsWP = exportIgnorePropsWP;
    this._importBlockPropsWP = importBlockPropsWP;
    this._trickyApp = 'FPS UPDATE FPSBaseClass';
    this._trickyEmailsWP = []; // These are emails that get tricky functionality for this specific web part
    this._allowPinMe = true;
    this._allowFieldPanel = 'Manual';
    this._FieldPanelDesignMode = 'Drilldown';

    return super.onInit().then(async _ => {

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      runFPSSuperOnInit( this as any, PreConfiguredProps, SPPermission );

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bannerProps = runFPSWebPartRender( this as any, strings, WebPartAnalyticsChanges, WebPartPanelChanges, );

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

        //Banner related props
        errMessage: 'any',
        bannerProps: bannerProps,

        performance: this._performance, //Alternatively, use this if available (like ALVFM): _fetchInfo.performance,

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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await onFPSPropPaneCHanged( this as any, propertyPath, oldValue, newValue );

        this.context.propertyPane.refresh();

        this.render();

      }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-this-alias
    const thisAsAny: IThisFPSWebPartClass = this as any;
    let groups: IPropertyPaneGroup[] = [ WebPartInfoGroup( this._repoLink, 'Sample FPS Banner component :)', PropertyPaneWebPartInformation ) ];
    const FPSGroups: IPropertyPaneGroup[] = getAllDefaultFPSFeatureGroups ( thisAsAny );

    //   {groupName: 'Npm Banner Web Part Sample',
    //   isCollapsed: false,
    //   groupFields: [
    //     PropertyPaneTextField('webURL', {
    //       label: 'webURL',
    //       description: 'Leave blank for current site',
    //     }),
    //     PropertyPaneTextField('listTitle', {
    //       label: 'listTitle',
    //       description: 'Full Title of list or library',
    //     }),]}

    groups = [ ...groups, ...[ FPSFieldsPanelPropGroup( thisAsAny ) ], ...FPSGroups ];


    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true, //DONT FORGET THIS IF PROP PANE GROUPS DO NOT EXPAND
          groups: groups,
        }
      ]
    };
  }
}
