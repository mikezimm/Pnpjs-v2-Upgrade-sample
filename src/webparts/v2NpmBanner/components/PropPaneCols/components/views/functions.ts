// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";

import { IMinField } from "../IPropPaneColsProps";

/**
 * Best guess column widths based on keywords
 * Applied in the order shown here
 */

const Keywords200W: string[] = [ 'Comments', ];
const Keywords200Wlc: string[] = Keywords200W.map( s => s.toLocaleLowerCase());

const Keywords50W: string[] = [ 'Product', 'Program', 'Customer', 'Cell', 'Line', 'Carline', 'Region', 'Country', 'State', 'Plant', 'Facility' ];
const Keywords50Wlc: string[] = Keywords50W.map( s => s.toLocaleLowerCase());

const Keywords150W: string[] = [ 'Account', 'User', 'UserName', 'Contact', ];
const Keywords150Wlc: string[] = Keywords150W.map( s => s.toLocaleLowerCase());




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


  /**
   * Over-rides based on practical experience
   */

   if ( field.InternalName === 'ID' ) {
    returnField.minWidth = 10;
    returnField.maxWidth = 30;
    returnField.linkPropertyName = 'goToPropsLink';

  } else if ( field.InternalName === '_UIVersionString' ) {
    returnField.displayName = 'Vers';
    returnField.minWidth = 6;
    returnField.maxWidth = 35;

  } else {

  /**
   * This section over-rides specific min and max widths
   * Next section over-rides other key properties
   */

    if ( Keywords200Wlc.indexOf( field.Title.toLocaleLowerCase() ) > -1 ) {
      returnField.minWidth = 150;
      returnField.maxWidth = 200;

    } else if ( Keywords150Wlc.indexOf( field.Title.toLocaleLowerCase() ) > -1 ) {
      returnField.minWidth = 100;
      returnField.maxWidth = 150;

    } else if ( Keywords50Wlc.indexOf( field.Title.toLocaleLowerCase() ) > -1 ) {
      returnField.minWidth = 40;
      returnField.maxWidth = 75;

    } else {

      switch ( field.FieldTypeKind ) {

        case FieldTypes.Text: 
          // If it's single line of text, max length is 10*characters with max of 175
          returnField.maxWidth = field.MaxLength ? Math.min( field.MaxLength * 10, 175 ) : returnField.maxWidth;
          break;

        case FieldTypes.Note: 
          // If it's single line of text, max length is 10*characters with max of 175
          returnField.minWidth = 125;
          returnField.maxWidth = 175;
          break;

        case FieldTypes.MultiChoice: 
          returnField.minWidth = 50;
          returnField.maxWidth = 150;
          break;

        case FieldTypes.User: 
          returnField.minWidth = field.TypeAsString.indexOf('Multi') > -1 ? 100 : 50;
          returnField.maxWidth = field.TypeAsString.indexOf('Multi') > -1 ? 150 : 75;
          break;

        case FieldTypes.Number:
        case FieldTypes.Counter: 
          returnField.minWidth = 30;
          returnField.maxWidth = 100;
          break;

        case FieldTypes.File: 
          returnField.minWidth = 100;
          returnField.maxWidth = 175;
          break;

        case FieldTypes.URL:
          returnField.maxWidth = 100;
          break;

        case FieldTypes.DateTime:
          returnField.maxWidth = field.DisplayFormat === 0 ? 100 : 130;

          break;
        // case FieldTypes.Choice: 

        //   break;

        // default:

      }
    }

    /**
     * Prior section over-rides specific min and max widths ^^^^
     * This section over-rides other key properties  VVVV
     */

    switch ( field.FieldTypeKind ) {

      case FieldTypes.Text: 
        // If it's single line of text, max length is 10*characters with max of 175
        break;

      case FieldTypes.Note: 
        // If it's single line of text, max length is 10*characters with max of 175

        break;

      case FieldTypes.MultiChoice: 
        break;

      case FieldTypes.User: 
        returnField.name = `${field.InternalName}/Title`
        break;

      case FieldTypes.Number:
      case FieldTypes.Counter: 

        break;

      case FieldTypes.File: 
        returnField.displayName = 'File';
        returnField.linkPropertyName = 'FileRef';
        break;

      case FieldTypes.URL:
        // Other options for URL fields .name property ( determines what the link text is, not the url)
        //"Location/ShowCollUrl"   "Location/ShowSitesUrl"   "Location/GetLinkUrl"
        returnField.name = `${field.InternalName}/ShowPageName`;
        returnField.linkPropertyName = 'goToItemLink';
        break;

      case FieldTypes.DateTime:
        //DisplayFormat 0 === Date, 1 === Date and Time
        returnField.name = `${field.InternalName}/YYYY-MM-DD`;

        break;
      // case FieldTypes.Choice:

      //   break;

      // default:

    }

  }

  return returnField;

}



