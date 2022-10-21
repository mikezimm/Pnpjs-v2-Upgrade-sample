
import { IWeb, Web, } from "@pnp/sp/presets/all";
import { IMinField, IMinListProps, IsEditable, IFieldPanelFetchState } from "./IPropPaneColsProps";
import { getHelpfullErrorV2 } from '../../../fpsReferences';

  // export async function clickFetchFields(  list: IMinListProps, setState: any, updatePerformance: any ) : Promise<void> {
export async function fetchFields(  list: IMinListProps ) : Promise<IFieldPanelFetchState> {

  const { webURL, listTitle, } = list ;
  try {

    if ( listTitle && webURL ) {
      let FilteredFields : IMinField[] =[];
      //setlistFields( await allAvailableFields( webURL, listTitle, ) );
      // const fetchWebURL = getFullUrlFromSlashSitesUrl( webURL );
      const fetchWebURL = webURL ;
      const thisWebInstance : IWeb = Web(fetchWebURL);
      const allFields : IMinField[] = await thisWebInstance.lists.getByTitle(listTitle).fields.orderBy("Title", true)();
      FilteredFields = allFields.filter( field => field.Hidden !== true && field.Sealed !== true );

      const DefaultSelected: string[] = [ 'ID', 'Editor', 'Modified', 'Title', 'FileLeafRef' ];
      const PreSelectedFields: IMinField[] = [];
      const SelectedNames: string[] = [];

      let versionField = null;
      let fileField = null;

      FilteredFields.map( ( field, idx ) => {
        field.idx = idx;
        field.commands = {};

        // field.searchTextLC:  = ['Title', 'InternalName', 'TypeDisplayName', 'Description', 'Choices', 'Formula', 'DefaultValue' ].map( prop => {
          field.searchTextLC = ['Title', 'InternalName', 'TypeDisplayName', 'Description', 'Choices', 'Formula', 'DefaultValue' ].map( prop => {
          const anyField : any = field;
          return anyField[ prop ] ? `${prop}:${anyField[ prop ]}` : '';
        }).filter( str  => str && str !== '' ).join(' || ').toLocaleLowerCase();

        let ReadOnly = field.ReadOnlyField === true ? 'IsReadOnly' : IsEditable.toLocaleLowerCase();
        if ( field.InternalName === 'ContentType' ) ReadOnly = '';
        field.searchTextLC += ` : ${ReadOnly}`;

        if ( DefaultSelected.indexOf(field.InternalName) > -1 ) {
          field.isKeeper = true;
          field.isSelected = true;
          PreSelectedFields.push( field ); 
          SelectedNames.push( field.InternalName ) ; }

        if ( field.InternalName === '_UIVersionString' ) versionField = field;
        if ( field.FileLeafRef  ) fileField = field;

      });

      //Add version column only if it's a library.
      if ( fileField ) PreSelectedFields.push( versionField );

      const SortedPreSelectedFields: IMinField[] = [];
      DefaultSelected.map( name => {
        const idx: number = SelectedNames.indexOf( name ) ;
        if ( idx > -1 ) { SortedPreSelectedFields.push( PreSelectedFields[ idx ] ); }
      });

      // const fieldPanelState: IFieldPanelState = {
      const FieldPanelState: IFieldPanelFetchState = {
        listFields: FilteredFields,
        filtered: FilteredFields,
        selected: SortedPreSelectedFields,
        status: 'Success - Fetched!',
        fetched: true,
        searchText: '',
        searchProp: '',
        errMessage: '',
      }

      return FieldPanelState;

    } else {
      // Was missing webUrl or list Title
      const FieldPanelState: IFieldPanelFetchState = {
          listFields: [],
          filtered: [],
          selected: [],
          status: 'Failed to fetch columns!',
          fetched: false,
          searchText: '',
          searchProp: '',
          errMessage: 'Missing Web URL or List Title',
      };

      return FieldPanelState;

    }

  } catch (e) {

    const FieldPanelState: IFieldPanelFetchState = {
      listFields: [],
      filtered: [],
      selected: [],
      status: 'Did not fetch columns!',
      fetched: false,
      searchText: '',
      searchProp: '',
      errMessage: getHelpfullErrorV2( e, false, true, `FetchFunction ~ 101`, ),
    };

    return FieldPanelState;
  }

}