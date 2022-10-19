// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";

import { IMinField } from "./IPropPaneColsProps";

export function createViewFromFields( fields: IMinField[] ) : IViewField[] {

  const ViewFields: IViewField[] = [];

  return ViewFields;

}

export function createThisViewField( field: IMinField ) : IViewField {

  const returnField: IViewField = { 
    name: field.InternalName,
    displayName: field.Title,
    minWidth: 50,
    maxWidth: 100,
   };

  switch ( field.FieldTypeKind ) {

    case FieldTypes.Text: 
      // If it's single line of text, max length is 10*characters with max of 250
      returnField.maxWidth = field.MaxLength ? Math.min( field.MaxLength * 10, 250 ) : returnField.maxWidth;
      break;

    case FieldTypes.Note: 
      // If it's single line of text, max length is 10*characters with max of 250
      returnField.maxWidth = 250;
      break;

    case FieldTypes.MultiChoice: 
      returnField.maxWidth = 150;
      break;

    case FieldTypes.User: 
      returnField.maxWidth = field.TypeAsString.indexOf('Multi') > -1 ? 150 : 75;
      returnField.name = `${field.InternalName}/Title`
      break;

    case FieldTypes.Number:
    case FieldTypes.Counter: 
      returnField.minWidth = 30;
      returnField.maxWidth = 100;
      break;

    case FieldTypes.File: 
      returnField.displayName = 'File';
      returnField.linkPropertyName = 'FileRef';
      returnField.maxWidth = 200;
      break;

    case FieldTypes.URL:
      // Other options for URL fields .name property ( determines what the link text is, not the url)
      //"Location/ShowCollUrl"   "Location/ShowSitesUrl"   "Location/GetLinkUrl"
      returnField.name = `${field.InternalName}/ShowPageName`;
      returnField.linkPropertyName = 'goToItemLink';
      returnField.maxWidth = 100;
      break;

    case FieldTypes.DateTime:
      //DisplayFormat 0 === Date, 1 === Date and Time
      returnField.name = `${field.InternalName}/YYYY-MM-DD`;
      returnField.maxWidth = field.DisplayFormat === 0 ? 100 : 130;

      break;
    // case FieldTypes.Choice: 

    //   break;

    // default:

  }

  if ( field.InternalName === 'ID' ) {
    returnField.minWidth = 10;
    returnField.maxWidth = 30;
    returnField.linkPropertyName = 'goToPropsLink';

  } else if ( field.InternalName === '_UIVersionString' ) {
    returnField.displayName = 'Vers';
    returnField.minWidth = 6;
    returnField.maxWidth = 35;
  }

  return returnField;

}



