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
export async function initGalleryArr(gallRoot): Promise<gallInitObj[]> {
    
    const galJSON = await XLSXtoJSON(gallRoot + '/_galleries.xlsx');
    const folders = getFolderList(gallRoot);
    folders.map((obj: any) => obj.xlsx = obj['folder-name'] + '.xlsx');
    return mergeObjsInArrs(galJSON, folders, 'folder-name');
}

export async function getGallJSON(gallRoot) {
    gallRoot = cleanPath(gallRoot);
    const initArr = await initGalleryArr(gallRoot);
    initArr.map((gall: any) => gall.items = getFileList(gall.dir))
    return initArr;
}

// -- test
// XLSXtoJSON('../test-files/galleries/galleries.xlsx')
// .then((x) => console.log(x));