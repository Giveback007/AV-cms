import * as readXLSX from 'xlsx2json';
import * as fs from 'fs';

// converts the first sheet of an XLSX file in to JSON
// it takes the first row as the map for the keys
// outputs a promise

export async function XLSXtoJSON(
    dir: fs.PathLike, 
    { headless = false } = { }
): Promise<any> {

    const head = ( await readXLSX(dir) )[0][0];
    const entries = Object.entries(head);
    const map = {};
    
    entries.map( (ent) => map[ent[1]] = ent[0] );
    const filtKey = headless ? entries[0][0] : entries[0][1];

    const json = headless ? await readXLSX(dir) : 
        await readXLSX(dir, { dataStartingRow: 2, mapping: map });

    return json[0].filter((obj) => obj[filtKey]);
    
}

// -- test
// XLSXtoJSON('../test-files/evets.xlsx')
// .then((x) => console.log(x));