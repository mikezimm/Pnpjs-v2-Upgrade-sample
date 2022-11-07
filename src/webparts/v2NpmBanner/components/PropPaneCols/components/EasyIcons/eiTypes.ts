/**
 * Minimum interface into React Component needed to use this feature
 */
export interface IEasyIconProps {
  enable: boolean; // Used 
  Keys: IEasyIconGroups[];
  Ignore: string[];
}

//Default Library Url for all EasyIcons
export const EasyIconLocation = `${window.location.origin}/sites/Branding/EasyIcons/`;

/**
 * IEasyIconFolders should match the actual folders in EasyIcons library
 * IEasyIconGroups should have at least the same values as IEasyIconFolders... 
 *      BUT IEasyIconGroups can have additional ones like ProductsCaps which could be like Products but have a rule to make these all caps in regex
 */
export type IEasyIconGroups = 'Products' | 'Processes' | 'Customers' | 'Functions' | 'WebParts' | 'Keywords' ;
export type IEasyIconFolders = 'Products' | 'Processes' | 'Customers' | 'Functions' | 'WebParts' | 'Keywords' ;

export type IEasyIconPriority = 'Title' | 'Description' | 'FileLeafRef' ;
export type IEasyIconOptions = 's' | 'ing' | 'r' | 'er' ;


export interface IEasyIconGroup {
  Folder: IEasyIconFolders;  //Separated Folders from the key for potential future use where we could have different keys using the same folder but different rules.  AKA Regex Capitalization
  Rules: string;
  Icons: string[];  // Icon Names found in the EasyIcons folder.  Must be spelled exactly as shown and must be .png
  Suggestions: string[];  // Potential future Icon ideas
  Status: 'Active' | 'Planned' | 'Test';
  Priority: number;  // Order in which to search for Icon
  Options?: IEasyIconOptions[];  // For possible use looking for similar words
  Exact?: boolean; // Excact === Exact casing.  Default is any case
}

/**
 * HOW TO ADD NEW KEYWORDS
 * 
 * Instructions for adding more Groups:
 * 
 * 1. add to type:  IEasyIconGroups
 * 2. add to type:  IEasyIconFolders
 * 3. add key object to EasyIconObject.Groups
 * 4. add key to array: EasyIconDefaultKeys
 * 5. add key to array: EasyIconValidKeys
 * 6. add associated image to /Branding/EasyIcons/NewFolderName
 * 
 *   
 */

export interface IEasyIcons {
  Enabled: boolean;
  Priority: IEasyIconPriority[];
  GroupKeys: IEasyIconGroups[], // From Web Part Props Used to prioritize order of folders to look in
  Valid: IEasyIconGroups[], // Valid keys the web part should find, to test against Keys typed in by user
  Ignore: string[], // Strings comprised of Folder/Icon to ignore, meant to be used in Props to remove undesired icons
  Groups: {
    Products: IEasyIconGroup;
    Processes: IEasyIconGroup;
    Customers: IEasyIconGroup;
    Functions: IEasyIconGroup;
    WebParts: IEasyIconGroup;
    Keywords: IEasyIconGroup;
    // EasyIcons7?: IEasyIconGroup;
    // EasyIcons9?: IEasyIconGroup;
    // Template?: IEasyIconGroup;
  }
}

export const EasyIconDefaultKeys: IEasyIconGroups[] = [ 'Products' , 'Processes' , 'Customers' , 'Functions' , 'Keywords' , 'WebParts'  ];
export const EasyIconValidKeys: IEasyIconGroups[] = [ 'Products' , 'Processes' , 'Customers' , 'Functions' , 'Keywords' , 'WebParts'   ];

export const EasyIconObjectDefault : IEasyIcons = {
  Enabled: true,
  Priority: [ 'Title', 'Description', 'FileLeafRef' ],
  GroupKeys: EasyIconDefaultKeys,
  Valid: EasyIconValidKeys,
  Ignore: [],
  Groups: {
    Products: {
      Folder: 'Products',
      Rules: '',
      Icons: [ 'Armature', 'Curtain', 'Cushion', 'DAB', 'FAB', 'IC', 'KAB', 'Magnesium', 'Metal', 'PAB', 'Plastic', 'PTSAB', 'Thread', 'Webbing', ],
      Suggestions: [ 'Seatbelt', 'Airbag', 'Wheel', '', '', ],
      Status: 'Active',
      Priority: 1,
      Options: [ 's' ],
    },
    Processes: {
      Folder: 'Processes',
      Rules: '',
      Icons: [ 'Fold', 'Sew', 'Warehouse', 'Weave', 'Weld', ],
      Suggestions: [ '', '', '', ],
      Status: 'Active',
      Priority: 2,
      Options: [ 'ing', 'r', 'er' ],
    } ,
    Customers: {
      Folder: 'Customers',
      Rules: '',
      Icons: [ 'Audi', 'BMW', 'Daimler', 'FCA', 'Fiat', 'Ford', 'GM', 'Honda', 'Hyundai', 'Isuzu', 'Kia', 'Mercedes', 'Mitsubishi', 'Nissan', 'Rivian', 'Stellantis', 'Subaru', 'Tesla', 'Toyota', 'VW', ],
      Suggestions: [ '', '', '', '', '', ],
      Status: 'Active',
      Priority: 3,
    } ,
    Functions: {
      Folder: 'Functions',
      Rules: '',
      Icons: [ '', '', '', '', '', '', ],
      Suggestions: [ 'Engineering', 'Purchasing', 'Finance', 'Manufacturing', 'Logistics', 'Legal', ],
      Status: 'Active',
      Priority: 4,
    } ,
    WebParts: {
      Folder: 'WebParts',
      Rules: '',
      Icons: [ 'Extreme', 'Contents', 'Drilldown', 'Time', '', '', '',  ],
      Suggestions: [ '', '' ],
      Status: 'Active',
      Priority: 4,
    } ,
    Keywords: {
      Folder: 'Keywords',
      Rules: '',
      Icons: [  'Chart', 'Calendar', 'Contact', 'Process', 'Question', 'Request', 'Task', 'Track', 'Tree' ],
      Suggestions: [ 'Start', 'Work', 'Complete', 'Reject', ],
      Status: 'Active',
      Priority: 4,
      Options: [ 's' ],
    } ,
    // EasyIcons7: {
    //   Rules: '',
    //   Icons: [ ],
    //   Suggestions: [ ],
    //   Status: 'Test',
    //   Priority: 90,
    // } ,
    // EasyIcons9: {
    //   Rules: '',
    //   Icons: [ ],
    //   Suggestions: [ ],
    //   Status: 'Test',
    //   Priority: 70,
    // } ,
    // Template: {
    //   Rules: '',
    //   Icons: [ ],
    //   Suggestions: [ '', '', '', '', '', '', '',  ],
    //   Status: 'Test',
    //   Priority: 99,
    // } ,
  }

}

