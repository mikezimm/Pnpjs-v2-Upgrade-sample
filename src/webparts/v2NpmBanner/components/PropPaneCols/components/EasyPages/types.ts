

// export const ModernSitePagesColumns: string[] = ['ID','Title','Description','Author/Title','Editor/Title','File/ServerRelativeUrl','BannerImageUrl/Url','FileSystemObjectType','FirstPublishedDate','PromotedState','FileSizeDisplay','OData__UIVersion','OData__UIVersionString','DocIcon'];
export const ModernSitePagesColumns: string[] = ['ID','Title','Description','Author/Title','Editor/Title','File/ServerRelativeUrl','BannerImageUrl', 
    'FileSystemObjectType','Modified','Created','FirstPublishedDate','PromotedState','FileSizeDisplay','OData__UIVersion','OData__UIVersionString','DocIcon',
    'OData__OriginalSourceUrl' ]; //Added this for news links

export const ModernSitePagesSearch: string[] = ['Title','Description','Author/Title','Editor/Title','FirstPublishedDate','PromotedState',];

export const ExtraFetchModernPage = ['WikiField','CanvasContent1','LayoutsWebpartsContent'];

export interface ISourceProps {
  // [key: string]: string | string[] | boolean | { prop: string; asc: boolean; } | any |undefined ;
    // defType: IDefSourceType;  //Used in Search Meta function
    defType: string;  //Used in Search Meta function
    webUrl: string;
    listTitle: string;
    webRelativeLink: string;
    viewItemLink?: string;
    columns: string[];
    searchProps: string[];
    selectThese?: string[];
    restFilter?: string;
    searchSource: string;
    searchSourceDesc: string;
    itemFetchCol?: string[]; //higher cost columns to fetch on opening panel
    isModern: boolean;
    orderBy?: {
        prop: string;
        asc: boolean;
    };
    defSearchButtons: string[];  //These are default buttons always on that source page.  Use case for Manual:  Policy, Instruction etc...

}

export const SitePagesSource : ISourceProps = {
  defType: 'pages',
  webUrl: ``,
  listTitle: "Site Pages",
  webRelativeLink: "SitePages",
  searchSource: '', //'Current Site',
  searchSourceDesc: '', // 'Site Pages library in Current Site',
  columns: ModernSitePagesColumns,
  searchProps: ModernSitePagesSearch,
  selectThese: [ ...ModernSitePagesColumns ],

  itemFetchCol: ExtraFetchModernPage,
  isModern: true,
  // restFilter: "Id ne 'X' and ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159' and Title ne 'Home'",
  restFilter: "Id ne 'X' and ContentTypeId ne '0x012000F6C75276DBE501468CA3CC575AD8E159'",
  defSearchButtons: [],  // [ 'Last30Days', 'Last90Days' ],
  orderBy: { //Including even though it does not seem to do anything
    prop: 'Title',
    asc: true,
  }
}

export function createNewSitePagesSource( webUrl: string ): ISourceProps {

  const NewSource: ISourceProps = SitePagesSource;
  NewSource.webUrl = webUrl;

  return NewSource;

}