import { IEasyLink } from "./component";
import { EasyPagesDevTab } from "./epTypes";

const SPFXParkLogo: string = `https://ih0.redbubble.net/image.815755990.6275/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg`;
const MSFTLogo: string = `https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31`;
const TheCKLogo: string = `https://0.gravatar.com/avatar/942805b409854696f15a519a39a2cedb?s=256&d=retro&r=PG`;
// import * as devLinks from '@mikezimm/npmFunctions/dist/Links/LinksDevDocs';

export const EasyDevTypescript: IEasyLink = { Title: 'Typescript Playground', Description: `Experiment with interfaces here - ${EasyPagesDevTab}`, 
  File: { ServerRelativeUrl: 'https://www.typescriptlang.org/play' }, BannerImageUrl: { Url: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@02e637e09b55966e802dfe0bc93595594e0214bb/logos/typescript-icon.svg' }, type: 'current', } as any;

export const EasyDevGridDocs: IEasyLink = { Title: 'CSS Grid Docs', Description: `Official Docs - ${EasyPagesDevTab}`, 
  File: { ServerRelativeUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout#guides' }, BannerImageUrl: { Url: 'https://miro.medium.com/max/770/1*RtAMWbxdwW2ujyrurU9plw.png' }, type: 'current', } as any;

export const EasyDevGridGen: IEasyLink = { Title: 'CSS Grid Sandbox', Description: `grid.layoutit.com - ${EasyPagesDevTab}`, 
  File: { ServerRelativeUrl: 'https://grid.layoutit.com/' }, BannerImageUrl: { Url: 'https://miro.medium.com/max/770/1*RtAMWbxdwW2ujyrurU9plw.png' },type: 'current', } as any;

export const EasyDevJSON: IEasyLink = { Title: 'JSON Editor', Description: ` - ${EasyPagesDevTab}`, 
  File: { ServerRelativeUrl: 'https://codebeautify.org/jsonviewer' }, BannerImageUrl: { Url: 'https://codebeautify.org/img/slogo.webp' }, type: 'current', } as any;

export const EasyDevPnpJS: IEasyLink = { Title: 'Pnpjs.io', Description: ` - ${EasyPagesDevTab}`, 
  File: { ServerRelativeUrl: 'https://pnp.github.io/pnpjs/packages/#sp' }, BannerImageUrl: { Url: 'https://pbs.twimg.com/profile_images/1260661706231087112/CvjfDhAm_400x400.jpg' }, type: 'current', } as any;

export const EasyDevRegex: IEasyLink = { Title: 'Regex 101', Description: `Test regex - ${EasyPagesDevTab}`, 
  File: { ServerRelativeUrl: 'https://regex101.com/' }, BannerImageUrl: { Url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Toolbaricon_RegEx.svg/240px-Toolbaricon_RegEx.svg.png' }, type: 'current', } as any;

export const EasyDevSPFxReact: IEasyLink = { Title: `SPFx React Controls - Github - ${EasyPagesDevTab}`, Description: '', 
  File: { ServerRelativeUrl: 'https://github.com/SharePoint/sp-dev-fx-controls-react/tree/master/src/controls/' }, BannerImageUrl: { Url: SPFXParkLogo }, type: 'current', } as any;

export const EasyDevSPFxReactIO: IEasyLink = { Title: `SPFx React Controls - IO - ${EasyPagesDevTab}`, Description: '', 
  File: { ServerRelativeUrl: 'https://github.com/SharePoint/sp-dev-fx-controls-react/' }, BannerImageUrl: { Url: SPFXParkLogo }, type: 'current', } as any;

export const EasyDevFluent: IEasyLink = { Title: `Fluent UI`, Description: `${EasyPagesDevTab}`, 
  File: { ServerRelativeUrl: 'https://developer.microsoft.com/en-us/fluentui#/controls/web' }, BannerImageUrl: { Url: MSFTLogo }, type: 'current', } as any;

export const EasyDevFliconIO: IEasyLink = { Title: `Flicon.io`, Description: `Fluent Icons - ${EasyPagesDevTab}`, 
  File: { ServerRelativeUrl: 'https://flicon.io/' }, BannerImageUrl: { Url: TheCKLogo }, type: 'current', } as any;

export const EasyDevPages: IEasyLink[] = [ EasyDevTypescript, EasyDevGridDocs, EasyDevGridGen,
  EasyDevJSON, EasyDevPnpJS, EasyDevRegex, EasyDevSPFxReact, EasyDevSPFxReactIO, EasyDevFluent, EasyDevFliconIO
];
