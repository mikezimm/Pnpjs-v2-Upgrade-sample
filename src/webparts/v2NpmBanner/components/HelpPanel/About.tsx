// import * as React from 'react';

import { IHelpTable, } from '../../fpsReferences';
import { repoLink, } from '../../fpsReferences';
// import { convertIssuesMarkdownStringToSpan } from '../../fpsReferences';

import { createAboutRow } from '../../fpsReferences';

export const panelVersionNumber = '2022-10-18 -  1.0.0.04'; //Added to show in panel

export function aboutTable( showRepoLinks: boolean ): { table: IHelpTable; } {

    const table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus'],
        rows: [],
    };

    table.rows.push( createAboutRow('2022-10-14',"1.0.0.04","#12, #13, #14, #15", showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-10-14',"1.0.0.03","#3, #4, #6, #8, #9, #10", showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-10-14',"1.0.0.02","#2,", showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-10-13',"1.0.0.01","Update _performance in main react component", showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-10-13',"1.0.0.00","Initial Build", showRepoLinks === true ? repoLink : null ) );
    
    return { table: table };

}

