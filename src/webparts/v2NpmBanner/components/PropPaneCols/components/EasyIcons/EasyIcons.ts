/**
 * HOW TO ADD NEW KEYWORDS
 * 
 * Instructions for adding more folders:
 * 
 * 1. add to type:  IEasyIconFolders
 * 2. add key object to EasyIconObject.Groups
 * 3. add key to EasyIconObject.Keys
 * 4. add key to EasyIconObject.Valid
 * 5. add associated image to /Branding/EasyIcons/NewFolderName
 * 
 * 
 */
export interface IEasyIcons {
  Priority: IEasyIconPriority[];
  Keys: IEasyIconFolders[], // From Web Part Props Used to prioritize order of folders to look in
  Valid: IEasyIconFolders[], // Valid keys the web part should find, to test against Keys typed in by user
  Ignore: string[], // Strings comprised of Folder/Icon to ignore, meant to be used in Props to remove undesired icons
  Groups: {
    Products: IEasyIconGroup;
    Processes: IEasyIconGroup;
    Customers: IEasyIconGroup;
    Functions: IEasyIconGroup;
    WebParts: IEasyIconGroup;
    Keywords: IEasyIconGroup;
    EasyIcons7?: IEasyIconGroup;
    EasyIcons9?: IEasyIconGroup;
    Template?: IEasyIconGroup;
  }
}

export const EasyIconObject : IEasyIcons = {
  Priority: [ 'Title', 'Description', 'FileLeafRef' ],
  Keys: [ 'Products' , 'Processes' , 'Customers' , 'Functions', 'Keywords', 'WebParts'  ],
  Valid: [ 'Products' , 'Processes' , 'Customers' , 'Functions' , 'WebParts' , 'Keywords' ],
  Ignore: [],
  Groups: {
    Products: {
      Rules: '',
      Icons: [ 'Armature', 'Curtain', 'Cushion', 'DAB', 'FAB', 'IC', 'KAB', 'Magnesium', 'Metal', 'PAB', 'Plastic', 'PTSAB', 'Thread', 'Webbing', ],
      Suggestions: [ 'Seatbelt', 'Airbag', 'Wheel', '', '', ],
      Status: 'Active',
      Priority: 1,
      Options: [ 's' ],
    },
    Processes: {
      Rules: '',
      Icons: [ 'Fold', 'Sew', 'Warehouse', 'Weave', 'Weld', ],
      Suggestions: [ '', '', '', ],
      Status: 'Active',
      Priority: 2,
      Options: [ 'ing', 'r', 'er' ],
    } ,
    Customers: {
      Rules: '',
      Icons: [ 'Audi', 'BMW', 'Daimler', 'FCA', 'Fiat', 'Ford', 'GM', 'Honda', 'Hyundai', 'Isuzu', 'Kia', 'Mercedes', 'Mitsubishi', 'Nissan', 'Rivian', 'Stellantis', 'Subaru', 'Tesla', 'Toyota', 'VW', ],
      Suggestions: [ '', '', '', '', '', ],
      Status: 'Active',
      Priority: 3,
    } ,
    Functions: {
      Rules: '',
      Icons: [ '', '', '', '', '', '', ],
      Suggestions: [ 'Engineering', 'Purchasing', 'Finance', 'Manufacturing', 'Logistics', 'Legal', ],
      Status: 'Active',
      Priority: 4,
    } ,
    WebParts: {
      Rules: '',
      Icons: [ 'Extreme', 'Contents', 'Drilldown', 'Time', '', '', '',  ],
      Suggestions: [ '', '' ],
      Status: 'Active',
      Priority: 4,
    } ,
    Keywords: {
      Rules: '',
      Icons: [  'Chart', 'Calendar', 'Contact', 'Process', 'Question', 'Request', 'Task', 'Track', 'Tree' ],
      Suggestions: [ 'Start', 'Work', 'Complete', 'Reject', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's' ],
    } ,
    EasyIcons7: {
      Rules: '',
      Icons: [ ],
      Suggestions: [ ],
      Status: 'Test',
      Priority: 90,
    } ,
    EasyIcons9: {
      Rules: '',
      Icons: [ ],
      Suggestions: [ ],
      Status: 'Test',
      Priority: 70,
    } ,
    Template: {
      Rules: '',
      Icons: [ ],
      Suggestions: [ '', '', '', '', '', '', '',  ],
      Status: 'Test',
      Priority: 99,
    } ,
  }

}

export const EasyIconLocation = `${window.location.origin}/sites/Branding/EasyIcons/`;

export type IEasyIconFolders = 'Products' | 'Processes' | 'Customers' | 'Functions' | 'WebParts' | 'Keywords' | 'EasyIcons7' | 'EasyIcons9' ;
export type IEasyIconPriority = 'Title' | 'Description' | 'FileLeafRef' ;
export type IEasyIconOptions = 's' | 'ing' | 'r' | 'er' ;


export interface IEasyIconGroup {
  Rules: string;
  Icons: string[];  // Icon Names found in the EasyIcons folder.  Must be spelled exactly as shown and must be .png
  Suggestions: string[];  // Potential future Icon ideas
  Status: 'Active' | 'Planned' | 'Test';
  Priority: number;  // Order in which to search for Icon
  Options?: IEasyIconOptions[];  // For possible use looking for similar words
  Exact?: boolean; // Excact === Exact casing.  Default is any case
}

/**
 * Logic order:
 * First checks keywords in the first Prop to test ( Title )
 * Then checks for all the Icons in Title
 * Then repeats for the next Prop - Description
 * @param EasyIcons
 * @param item
 * @returns
 */

export function getEasyIcon( EasyIcons: IEasyIcons, item: any, ) : string {

  const EasyErrors: string[] = [];
  let EasyIconUrl: string = '';
  EasyIcons.Priority.map( prop => {
    if ( item[ prop ] ) {
      EasyIcons.Keys.map( Key => {
        if ( EasyIcons.Valid.indexOf( Key ) < 0 ) {
          if ( EasyErrors.indexOf( Key ) < 0 ) { EasyErrors.push( Key ) ; }
        } else if ( !EasyIconUrl && EasyIcons.Groups[ Key ].Status === 'Active' ) {
          EasyIcons.Groups[ Key ]?.Icons.map( ( Icon: string ) => {
            if ( !EasyIconUrl && Icon ) { //Only continue if EasyIconUrl is not found and Icon is a non-empty string

              //Combine all the options into regex as optional qualifiers
              const Options: string = EasyIcons.Groups[ Key ].Options ? `(${ EasyIcons.Groups[ Key ]?.Options.join(')?(') })?` : '' ;
              // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
              const IconRegex : RegExp = new RegExp( `(\\b)${Icon}${Options}(\\b)`, 'i' );
              if ( item[ prop ].match ( IconRegex ) ) {
                EasyIconUrl = `${EasyIconLocation}${Key}/${Icon}.png` ;
              }
            }
          });
        }
      });
    }
  });

  return EasyIconUrl;

}