// import * as React from 'react';

import { IHelpTable, } from '../../fpsReferences';
import { repoLink, } from '../../fpsReferences';
// import { convertIssuesMarkdownStringToSpan } from '../../fpsReferences';

import { createAboutRow } from '../../fpsReferences';

export const panelVersionNumber = '2022-11-14 -  1.0.0.10'; //Added to show in panel

export function aboutTable( showRepoLinks: boolean ): { table: IHelpTable; } {

    const table : IHelpTable  = {
        heading: 'Version History',
        headers: ['Date','Version','Focus'],
        rows: [],
    };

    table.rows.push( createAboutRow('2022-11-14',"1.0.0.10","#50, #51, #70, #73, #76, #77, #78", showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-11-12',"1.0.0.09","#45, #53, #56, #59, #62, #63, #64, #65, #66, #67", showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-11-09',"1.0.0.08","#58,", showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-11-07',"1.0.0.07","#43, #44, #48, #49", showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-11-01',"1.0.0.06","#38, #39, #40", showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-10-23',"1.0.0.05","#30, #31, #32, #33, #34, #35", showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('',"","#23, #24, #25, #26, #27, #28, #29,", showRepoLinks === true ? repoLink : null ) );

    table.rows.push( createAboutRow('2022-10-19',"1.0.0.04","#12, #13, #14, #15, #17, #18, #19, #20, #22", showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-10-18',"1.0.0.03","#3, #4, #6, #8, #9, #10", showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-10-14',"1.0.0.02","#2,", showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-10-13',"1.0.0.01","Update _performance in main react component", showRepoLinks === true ? repoLink : null ) );
    table.rows.push( createAboutRow('2022-10-13',"1.0.0.00","Initial Build", showRepoLinks === true ? repoLink : null ) );

    return { table: table };

}

