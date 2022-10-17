import { IMinField } from "./PropPaneColsClass";


/**
 * Does not work as desired.... not using now.
 * @param ev
 * @param listFields 
 * @param selected 
 * @returns 
 */
export function  selectAllofType ( ev: React.MouseEvent<HTMLElement>, listFields: IMinField[], selected: IMinField[]  ): IMinField []  {
  const target: any = ev.target;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'

  const fieldtype: string = target.dataset.fieldtype;

  listFields.map( field => {  //Find selected item
    if ( field.TypeAsString.toLocaleLowerCase() === fieldtype ) { 
      field.isSelected = ctrlKey === true ? true : altKey === true ? false : field.isSelected;
      field.isKeeper = ctrlKey === true ? true : altKey === true ? false : field.isKeeper;
    }
  });

  const newSelected: IMinField [] = listFields.filter( field => { return field.isSelected === true } );

  console.log('selectAllofType:', fieldtype, target, newSelected );

  return newSelected;
}


// private _onKeeperClick = ( ev: React.MouseEvent<HTMLElement>  ): void => {
  export function getKeeperClicks ( ev: React.MouseEvent<HTMLElement>, selected: IMinField[]  ): IMinField[] {

  const target: any = ev.target;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'
  const itemName: string = target.dataset.fieldname;

  // let thisSelected : IMinField = null;
  const newSelected: IMinField [] = [ ];
  selected.map( field => {  //Find selected item
    if ( field.InternalName === itemName ) { 
      field.isKeeper = field.isKeeper === true ? false : true;
    }
    newSelected.push( field );
  });

  return newSelected;
}

export function getDirectionClicks ( ev: React.MouseEvent<HTMLElement>, selected: IMinField[]  ): IMinField[] {
  const target: any = ev.target;
  // const { altKey, ctrlKey, shiftKey, type } = ev; // type is like 'click'
  const itemName: string = target.dataset.fieldname;
  const direction: string = target.dataset.direction;
  const ctrlKey : boolean = ev.ctrlKey;

  let idx: number = -1;

  selected.map( ( field:IMinField, i: number) => {  //Find selected item
    if ( field.InternalName === itemName ) {  idx = i; }
  });
  const currentPick = selected[idx];

  let newSelected: IMinField [] = [];

  if ( idx === - 1 ){
    alert('Something went wrong :(');

  } else {


    if ( ctrlKey === true ) {
      if ( direction === 'up' ) newSelected.push( currentPick );

      selected.map( ( field:IMinField, i: number) => {  //Find selected item
        if ( field.InternalName !== itemName ) {  newSelected.push( field ) ; }
      });

      if ( direction === 'down' ) newSelected.push( currentPick );

    } else if ( direction === 'up' ) {
      const part1: IMinField[] = idx === 1 ? [] : selected.slice( 0, idx - 1  );
      const part2: IMinField[] = idx === selected.length -1 ? [] :selected.slice( idx + 1 );
      newSelected = [ ...part1, ...[ currentPick ], ...[ selected[ idx - 1 ] ]  , ...part2 ];

    } else {
      const part1: IMinField[] = idx === 0 ? [] : selected.slice( 0, idx );
      const part2: IMinField[] = idx === selected.length -2 ? [] : selected.slice( idx + 2 );
      newSelected = [ ...part1, ...[ selected[ idx + 1 ] ], ...[ currentPick ]  , ...part2 ];

    }

  }

  return newSelected;

}

