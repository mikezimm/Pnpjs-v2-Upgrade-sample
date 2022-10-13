import * as React from 'react';
import styles from './V2NpmBanner.module.scss';

import { escape } from '@microsoft/sp-lodash-subset';
import { IV2NpmBannerProps, IV2NpmBannerState } from './IV2NpmBannerProps';

import { saveViewAnalytics } from '../CoreFPS/Analytics';

// import FetchBanner from '../CoreFPS/FetchBannerElement';
import FetchBanner from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/onNpm/FetchBannerElement';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ISpecialMessage, specialUpgrade } from '@mikezimm/npmfunctions/dist/HelpPanelOnNPM/special/interface';

import { getHelpfullError } from '../fpsReferences';
import { getWebPartHelpElement } from '../CoreFPS/PropPaneHelp';
import { getBannerPages, } from './HelpPanel/AllContent';
import { IBannerPages } from "../fpsReferences";

import { ILoadPerformance, startPerformOp, updatePerformanceEnd, ILoadPerformanceOps } from "../fpsReferences";

import { ensureUserInfo } from '@mikezimm/npmfunctions/dist/Services/Users/userServices';  //Eventually move to "../fpsReferences"?

import { IPinMeState } from '../fpsReferences';

import { IUser } from '../fpsReferences';

//Use this to add more console.logs for this component
const urlParams : URLSearchParams = new URLSearchParams( window.location.search );
const fpsconsole : boolean = urlParams.get( 'fpsconsole' ) === 'true' ? true : false;
const consolePrefix: string = 'fpsconsole: V2NpmBanner';


export default class V2NpmBanner extends React.Component<IV2NpmBannerProps, IV2NpmBannerState> {


  private _performance: ILoadPerformance = null;

  private _webPartHelpElement = getWebPartHelpElement( this.props.sitePresets );
  private _contentPages : IBannerPages = getBannerPages( this.props.bannerProps );

  private _newRefreshId() :string {

    const startTime = new Date();
    const refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();
    return refreshId;

  }

  private _updatePinState( newValue: IPinMeState ): void {
    this.setState({ pinState: newValue, });
  }

  /***
 *    d8b   db d88888b  .d8b.  d8888b.      d88888b  .d8b.  d8888b.      d88888b db      d88888b 
 *    888o  88 88'     d8' `8b 88  `8D      88'     d8' `8b 88  `8D      88'     88      88'     
 *    88V8o 88 88ooooo 88ooo88 88oobY'      88ooo   88ooo88 88oobY'      88ooooo 88      88ooooo 
 *    88 V8o88 88~~~~~ 88~~~88 88`8b        88~~~   88~~~88 88`8b        88~~~~~ 88      88~~~~~ 
 *    88  V888 88.     88   88 88 `88.      88      88   88 88 `88.      88.     88booo. 88.     
 *    VP   V8P Y88888P YP   YP 88   YD      YP      YP   YP 88   YD      Y88888P Y88888P Y88888P 
 *                                                                                               
 *                                                                                               
 */

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   private _farBannerElements: any[] = [];



   
    /***
     *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      d8888b. d8888b. d888888b db      db           db      d888888b .d8888. d888888b 
     *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88  `8D 88  `8D   `88'   88      88           88        `88'   88'  YP `~~88~~' 
     *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo      88   88 88oobY'    88    88      88           88         88    `8bo.      88    
     *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      88   88 88`8b      88    88      88           88         88      `Y8b.    88    
     *    Y8b  d8 88 `88. 88.     88   88    88    88.          88  .8D 88 `88.   .88.   88booo. 88booo.      88booo.   .88.   db   8D    88    
     *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P      Y8888D' 88   YD Y888888P Y88888P Y88888P      Y88888P Y888888P `8888Y'    YP    
     *                                                                                                                                          
     *                                                                                                                                          
     */

     private _fetchUserId: string = '';  //Caching fetch Id and Web as soon as possible to prevent race
     private _fetchWeb: string = this.props.webURL ? this.props.webURL : '';  //Caching fetch Id and Web as soon as possible to prevent race
     private _sourceUser: IUser = null;

     private async _presetDrillListUser( webURL: string, email: string ) {
      const webURLOnCurrentCollection = !webURL || webURL.toLowerCase().indexOf(this.props.context.pageContext.site.serverRelativeUrl.toLowerCase()) > -1 ? true : false;
      console.log('xxxxxxxxxx');
      if ( !webURL || ( !this._sourceUser && webURLOnCurrentCollection === true ) ) {
        //If current web is the sourceListWeb, then just use the context FPSUser
        this._sourceUser = this.props.bannerProps.FPSUser;
        this._fetchUserId = this._sourceUser.Id;
        this._fetchWeb = webURL;

        return this._sourceUser;

      } else if ( webURL === this._fetchWeb && this._sourceUser ) {
        return this._sourceUser;

      } else {

        try {
          this._updatePerformance( 'fetch3', 'start', 'fetch3 getRemoteUserD', null );
          const sourceUser: IUser = await ensureUserInfo( webURL, email );
  
          this._fetchUserId = sourceUser.id;
          this._fetchWeb = webURL;
          this._sourceUser = sourceUser;

          this._updatePerformance( 'fetch3', 'update', '', 1 );

          return this._sourceUser;

        } catch(e){
          const errMessage = getHelpfullError(e, false, true);
          this._updatePerformance( 'fetch3', 'update', '', 1 );
          this.setState({ errMessage: errMessage });
          return null;
        }

      }

    }



    /***
    *     .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
    *    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
    *    8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
    *    8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
    *    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
    *     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
    *                                                                                                  
    *                                                                                                  
    */

    public constructor(props:IV2NpmBannerProps){
      super(props);

      if ( this._performance === null ) { this._performance = this.props.performance;  }

      this.state = {
        pinState: this.props.fpsPinMenu.defPinState ? this.props.fpsPinMenu.defPinState : 'normal',
        showDevHeader: false,
        lastStateChange: '', 
        analyticsWasExecuted: false,
        refreshId: this._newRefreshId(),
        debugMode: false,
        showSpinner: false,

        };
    }

    public componentDidMount() : void {
      if ( fpsconsole === true ) console.log( `${consolePrefix} ~ componentDidMount` );

      //Start tracking performance
      this._updatePerformance( 'fetch1', 'start', 'fetch1 didMount', null );
      //Do async code here

      //End tracking performance
      this._updatePerformance( 'fetch1', 'update', '', 777 );

      const analyticsWasExecuted = saveViewAnalytics( 'V2NpmBanner View', 'didMount' , this.props, this.state.analyticsWasExecuted, this._performance );

      if ( this.state.analyticsWasExecuted !==  analyticsWasExecuted ) {
        this.setState({ analyticsWasExecuted: analyticsWasExecuted });
      }

    }



    //        
    /***
    *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
    *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
    *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
    *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
    *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
    *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
    *                                                                                         
    *                                                                                         
    */

    public componentDidUpdate(prevProps: IV2NpmBannerProps): void {

    if ( fpsconsole === true ) console.log( `${consolePrefix} ~ componentDidUpdate` );

    const refresh = this.props.displayMode !== prevProps.displayMode ? true : false;

    //refresh these privates when the prop changes warrent it
    if ( refresh === true ) {
      this._webPartHelpElement = getWebPartHelpElement( this.props.sitePresets );
      this._contentPages = getBannerPages( this.props.bannerProps );
    }


    /**
     * This section is needed if you want to track performance in the react component.
     *    In the case of ALVFM, I do the following:
     *    this._updatePerformance('fetch3', 'start', `fetch2 didUpdate`, null );
     *    ... Stuff to do
     *    this._updatePerformance('fetch3', 'update', ``, 100 );
     *    this._replacePanelHTML = refreshPanelHTML( <=== This updates the performance panel content
     */

      if ( refresh === true ) {
      //Start tracking performance item
      this._updatePerformance('fetch3', 'start', `fetch2 didUpdate`, null );
      /**
       *       Do async code here
       */

      //End tracking performance
      this._updatePerformance('fetch3', 'update', ``, 100 );

      if ( fpsconsole === true ) console.log('React componentDidUpdate - this._performance:', JSON.parse(JSON.stringify(this._performance)) );

     }

    }


    /**
     * This updates the private _performance.ops object.
     * @param key 
     * @param phase 
     * @param note 
     * @param count 
     * @returns 
     */
    private _updatePerformance( key: ILoadPerformanceOps, phase: 'start' | 'update', note: string = '', count: number ): void {

      if ( phase === 'start' ) {
        this._performance.ops[key] = startPerformOp( `${key} ${ note ? ' - ' + note : '' }`, this.props.displayMode );

      } else if ( phase === 'update' ) {
          this._performance.ops[key] = updatePerformanceEnd( this._performance.ops[key], true , count );

      }
    }


    // public async _updatePerformance () {
    private _updatePerformanceOnClick( ): boolean {

      /**
       * This section is needed if you want to track performance in the react component.
       *    In the case of ALVFM, I do the following:
       *    this._performance.ops.fetch1 = this._updatePerformance( <=== Starts tracking perforamnce
       *    ... Stuff to do
       *    this._performance.ops.fetch1 = updatePerformanceEnd( <=== ENDS tracking performance
       */

      const updateThis = !this._performance.ops.fetch4 ? 'fetch4' : !this._performance.ops.fetch5 ? 'fetch5' : !this._performance.ops.fetch6 ? 'fetch6' : 'fetch7';

      //Start tracking performance
      this._updatePerformance(updateThis, 'start', `${updateThis} TitleText`, null );

      /**
        *       Do async code here
        */

      //End tracking performance
      this._updatePerformance(updateThis, 'update', ``, 100 );

      alert(`${[updateThis]} should now be updated`);

      if ( fpsconsole === true ) console.log('React - _updatePerformanceOnClick:', JSON.parse(JSON.stringify(this._performance)) );

      //PERFORMANCE COMMENT:  YOU NEED TO UPDATE STATE HERE FOR IT TO REFLECT IN THE BANNER.
      this.setState({ 
        refreshId: this._newRefreshId(),
      });

      return true;

    }


  public render(): React.ReactElement<IV2NpmBannerProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    const devHeader = this.state.showDevHeader === true ? <div><b>Props: </b> { `this.props.lastPropChange , this.props.lastPropDetailChange` } - <b>State: lastStateChange: </b> { this.state.lastStateChange  } </div> : null ;

    /***
     *    d8888b.  .d8b.  d8b   db d8b   db d88888b d8888b.      d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
     *    88  `8D d8' `8b 888o  88 888o  88 88'     88  `8D      88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
     *    88oooY' 88ooo88 88V8o 88 88V8o 88 88ooooo 88oobY'      88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
     *    88~~~b. 88~~~88 88 V8o88 88 V8o88 88~~~~~ 88`8b        88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
     *    88   8D 88   88 88  V888 88  V888 88.     88 `88.      88.     88booo. 88.     88  88  88 88.     88  V888    88    
     *    Y8888P' YP   YP VP   V8P VP   V8P Y88888P 88   YD      Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
     *                                                                                                                        
     *                                                                                                                        
     */


    // initiate array for adding more buttons here.  If not needed, can be commented out
    const farBannerElementsArray = [...this._farBannerElements,
      //  ...[<div title={'Show Code Details'}><Icon iconName={ 'Code' } onClick={ this.toggleDebugMode.bind(this) } style={ bannerProps.bannerCmdReactCSS }></Icon></div>],
    ];

    //Setting showTricks to false here ( skipping this line does not have any impact on bug #90 )
    if ( this.props.bannerProps.beAUser === false ) {
      farBannerElementsArray.push( 
        // <div title={'Show Debug Info'}><Icon iconName='TestAutoSolid' onClick={ this.toggleDebugMode.bind(this) } style={ this.debugCmdStyles }></Icon></div>
      );
    }

    // const FPSUser : IFPSUser = this.props.bannerProps.FPSUser;
    // const showSpecial = FPSUser.manageWeb === true || FPSUser.managePermissions === true || FPSUser.manageLists === true ? true : false;
    // const Special : ISpecialMessage = showSpecial === true ? specialUpgrade( 'warn', '/sites/TheSharePointHub/SitePages/DrillDown-WebPart-Upgrade---v2.aspx', ) : undefined;
    // Special.style = { color: 'black', background: 'limegreen' };

    if ( fpsconsole === true ) console.log('React Render - this._performance:', JSON.parse(JSON.stringify(this._performance)) );

    const Banner = <FetchBanner 

      // bonusHTML1={ 'BonusHTML1 Text' }
      panelPerformance={ this._performance }
      // bonusHTML2={ <div>BonusHTML2 Div</div> }

      parentProps={ this.props }
      parentState={ this.state }

      nearBannerElementsArray={ [] }
      farBannerElementsArray={ farBannerElementsArray }

      contentPages={ this._contentPages }
      WebPartHelpElement={ this._webPartHelpElement }

      // SpecialMessage = { Special }

      updatePinState = { this._updatePinState.bind(this) }
      pinState = { this.state.pinState }

    />;

    return (
      <section className={`${styles.v2NpmBanner} ${hasTeamsContext ? styles.teams : ''}`}>
        { devHeader }
        { Banner }
        <div className={styles.welcome}>
          <img  onClick={ this._doSomething.bind(this)} alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>
            <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
            <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
          </ul>
        </div>
      </section>
    );
  }

  private _doSomething(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = this._updatePerformanceOnClick();
  }
}