import { XLSXtoJSON } from './av-xlsx-to-json';
import * as path from 'path';
import * as fs from 'fs';
import { getFolderList, getFileList, mergeObjsInArrs, cleanPath } from "../utils/util";
// -- imports -- //

// -- interfaces -- //
interface gallInitObj {
    title: string,
    'folder-name': string,
    description: string,
    dir: fs.PathLike,
    xlsx: string,
}
// -- interfaces -- //

// -- run -- //
async function initGalleryArr(gallRoot): Promise<gallInitObj[]> {
    
    const gallJSON = await XLSXtoJSON(gallRoot + '/_galleries.xlsx');
    const folders = getFolderList(gallRoot);
    folders.map((obj: any) => obj.xlsx = `${gallRoot}/${obj['file-name']}.xlsx`);
    return mergeObjsInArrs(gallJSON, folders, 'file-name');
}

async function addItemsToGalleryArr(gallInitArr: any) {
    for (let gall of gallInitArr) {
        let items = getFileList(gall.path);
        let itemsJSON = await XLSXtoJSON(gall.xlsx);
        gall.items = items.map((item) => {
            let ext = path.extname(item['file-name']);
            let found = itemsJSON.find( (match) => item['file-name'] === match['file-name'] + ext );
            return { ...found, ...item };
        });
    }
    return gallInitArr;
    // path.extname(gall.items[0].dir)
}

export async function getGallJSON(gallRoot) {
    gallRoot = cleanPath(gallRoot);
    const initArr = await initGalleryArr(gallRoot);
    let x = addItemsToGalleryArr(initArr)
    
    return x;
}

// -- test
// getGallJSON('../test-files/galleries/galleries.xlsx')
// .then((x) => console.log(x));