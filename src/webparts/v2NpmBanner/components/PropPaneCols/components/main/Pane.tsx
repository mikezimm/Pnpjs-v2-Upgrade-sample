
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { IGrouping, IViewField } from "@pnp/spfx-controls-react/lib/ListView";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { IFieldInfo, FieldTypes } from "@pnp/sp/presets/all";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';
import {  SearchBox, ISearchBoxStyles, } from 'office-ui-fabric-react/lib/SearchBox';

import { Icon, } from 'office-ui-fabric-react/lib/Icon';

// import styles from '../PropPaneCols.module.scss';

import { IFieldPanelProps, IFieldPanelState, IsEditable } from '../IPropPaneColsProps';

// import { buildMainFieldTable } from './MainFieldTable';
import MainFieldTableHook  from './FieldTable';

export function mainSiteLink( webURL: string ): JSX.Element {
  return (<div style={{paddingBottom: '15px', fontSize: 'larger', fontWeight: 'bolder' }}>on this site:  
        <span style = {{ color: 'darkblue',cursor: 'pointer', marginLeft: '25px' }} 
          onClick={ () => { window.open( webURL , '_blank' )}}>{ webURL }
        </span>
      </div>);
}


export interface IMainCallbacks {

  selectFiltered: any;
  onFilterClick2: any;
  onTextSearch: any;
  toggleDesign: any;
  onSelectItem: any;
  onTypeClick: any;
  // showFieldPanel: any;

  // MainFieldTable?: JSX.Element;

}

export function MainPane ( props: IFieldPanelProps, state: IFieldPanelState, callbacks: IMainCallbacks ): JSX.Element {

  const { selectFiltered, onFilterClick2, onSelectItem, } = callbacks;
  const { onTextSearch, onTypeClick, } = callbacks;
  // const { onTextSearch,} = callbacks;
  const { toggleDesign } = callbacks;

  // const onTextSearch: any = null;
  // const toggleDesign: any = null;

  const { lists, disableDesign } = props;
  const { status, filtered, listFields, designMode, searchProp, searchText, fetched, listIdx } = state;

  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

  const FieldSearchBox = <SearchBox
    className={ '' }
    styles={ searchBoxStyles }
    placeholder="Search"
    value={ searchText }
    onSearch={ onTextSearch }
    // onFocus={ () => console.log('this.state',  this.state) }
    // onBlur={ () => console.log('onBlur called') }
    onChange={ onTextSearch }
    onClear={ onTextSearch }
  />;

  const DesignToggle: JSX.Element = fetched !== true ? null : <Toggle 
      label={ 'Design' } 
      inlineLabel={ true } 
      // onChange={ () => toggleDesign() } 
      onChange={ toggleDesign } 
      checked={ designMode }
      disabled= { disableDesign }
      styles={ { root: { width: 160, float: 'right' } } }
    />;

  const SelectFiltered = <Icon iconName={ 'SkypeCircleArrow' } title={ 'Select All these columns'} style={{ color: searchText ? '' : 'lightgray' }}
    data-fieldtype= '' onClick= { !fetched ? null : selectFiltered } className={ 'type-filter-icon' } />;

  const DateFilterIcon = <Icon iconName={ 'DateTime' } title={ 'Filter for DateTime columns'} style={{  }}
    data-fieldtype= 'Date and Time' onClick= { !fetched ? null : onFilterClick2 } className={ 'type-filter-icon' } />;

  const UserFilterIcon = <Icon iconName={ 'Contact' } title={ 'Filter for User columns'} style={{  }}
    data-fieldtype= 'Person or Group' onClick= { !fetched ? null : onFilterClick2 } className={ 'type-filter-icon' } />;

  const TextFilterIcon = <Icon iconName={ 'TextField' } title={ 'Filter for Text columns'} style={{  }}
    data-fieldtype= 'Text' onClick= { !fetched ? null : onFilterClick2 } className={ 'type-filter-icon' } />;

  const ChoiceFilterIcon = <Icon iconName={ 'Stack' } title={ 'Filter for Choice columns'} style={{  }}
    data-fieldtype= 'Choice' onClick= { !fetched ? null : onFilterClick2 } className={ 'type-filter-icon' } />;

  const NumberFilterIcon = <Icon iconName={ 'Number' } title={ 'Filter for Number columns'} style={{  }}
    data-fieldtype= 'Number' onClick= { !fetched ? null : onFilterClick2 } className={ 'type-filter-icon' } />;

  const YesNoFilterIcon = <Icon iconName={ 'CheckboxComposite' } title={ 'Filter for Number columns'} style={{  }}
    data-fieldtype= 'Yes/No' onClick= { !fetched ? null : onFilterClick2 } className={ 'type-filter-icon' } />;

  const LookupFilterIcon = <Icon iconName={ 'Relationship' } title={ 'Filter for Lookup columns'} style={{  }}
    data-fieldtype= 'Lookup' onClick= { !fetched ? null : onFilterClick2 } className={ 'type-filter-icon' } />;

  const UrlFilterIcon = <Icon iconName={ 'Link' } title={ 'Filter for Link columns'} style={{  }}
    data-fieldtype= 'Hyperlink or Picture' onClick= { !fetched ? null : onFilterClick2 } className={ 'type-filter-icon' } />;

  const EditableFilterIcon = <Icon iconName={ 'Edit' } title={ 'All Editable'} style={{  }}
    data-fieldtype= { IsEditable } onClick= { !fetched ? null : onFilterClick2 } className={ 'type-filter-icon' } />;

  const CalculatedFilterIcon = <Icon iconName={ 'Variable' } title={ 'Calculated columns'} style={{  }}
    data-fieldtype= 'Calculated' onClick= { !fetched ? null : onFilterClick2 } className={ 'type-filter-icon' } />;

  const FilterButtons = <div style={{display: 'flex', marginLeft: '50px' }}>
      { SelectFiltered } { DateFilterIcon } { UserFilterIcon } { TextFilterIcon }
      { ChoiceFilterIcon } { NumberFilterIcon } { CalculatedFilterIcon }
      { YesNoFilterIcon } { LookupFilterIcon } { UrlFilterIcon } { EditableFilterIcon }
    </div>;

  const MainFieldTable : JSX.Element = <MainFieldTableHook
    filtered={ filtered }
    designMode={ designMode }
    listFields={ listFields }
    searchProp={ searchProp }
    searchText={ searchText }
    onSelectItem={ onSelectItem }
    onTypeClick={ onTypeClick }
    // showFieldPanel={ showFieldPanel }
  />;

  const { listTitle, } = lists[ listIdx ] ;
  return (
    <div className={ 'right-side' }>
      <h3 style={{ marginTop: '0px' }}>{ `Fields from '${ listTitle }'`  } { DesignToggle}</h3>
      { mainSiteLink( lists[ listIdx ].webURL ) }
      <div style={{paddingBottom: '15px', display: 'flex', alignContent: 'space-between' }}>{ FieldSearchBox  } {  FilterButtons }</div>
      <div style={{paddingBottom: '15px', fontSize: 'smaller' }}>CTRL-click <b>Add</b> to add to Top of list, Click <b>Type</b> to filter on column type</div>
      {/* { callbacks.MainFieldTable } */}
      { MainFieldTable }
  </div> )

}

