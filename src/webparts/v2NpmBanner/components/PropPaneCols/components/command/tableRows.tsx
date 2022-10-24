import * as React from 'react';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';

import { IMinField, IMinFieldCmds } from "../IPropPaneColsProps";
import { IIconTableRow } from './IAccordion';


export function createFieldTableRows( heading: JSX.Element, firstColumnHeading: string, fields: IMinField[], FieldActionIcons: IIconTableRow[], onCmdFieldClick: any, showFieldPanel: any ): JSX.Element {

  const TableRows: JSX.Element[] = [];
  TableRows.push( <tr key='TableHeader'><th>{firstColumnHeading}</th> { FieldActionIcons.map( h => { return <th key={h.head} >{h.head}</th> } ) } </tr> );

  fields.map( ( field: IMinField | any ) => {
    TableRows.push( <tr key={ field.InternalName } >
      <td title={field.InternalName} onClick= { () => showFieldPanel( field )  } >{ field.Title }</td>
      { FieldActionIcons.map( icon => { 
        // eslint-disable-next-line no-eval
        const ignore = icon.ignore && eval( icon.ignore ) === true ? true : false;
        return ignore === true ? <td> </td> : <td key={ icon.cmd }><Icon iconName={ field.commands[ icon.cmd ] === true ? icon.icon  : 'StatusCircleBlock2' } title={ icon.disabled === true ? `Disabled: ${icon.title}` : icon.title }
        data-fieldname={ field.InternalName } data-role= { icon.cmd } onClick= { icon.disabled === true ? null : onCmdFieldClick } className={ 'command-icon' } style={{ color: icon.disabled === true ? 'red' : '' }}/></td>;
      }) }
    </tr> );
  });

  const table = TableRows.length === 1 ? null : <div>
      { heading }
      <table>
        { TableRows }
      </table>
    </div>

  return table;
}
