import { XLSXtoJSON } from './av-xlsx-to-json';
// import * as path from 'path';
import * as fs from 'fs';
import { getFolderList, mergeObjsInArrs } from "@util";
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

// -- libs -- //
// const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

// function renameKey(obj, oldKey, newKey) {
//     let newObj = clone(obj);
//     newObj[newKey] = newObj[oldKey];
//     delete newObj[oldKey];
//     return newObj;
// }

// const getFileAndFolderList = (dir: fs.PathLike): { name: string, dir: fs.PathLike }[] => 
//     fs.readdirSync(dir).map( (file) => ({ name: file, dir: dir + '/' + file }) );

// function getFolderList(dir: fs.PathLike): { "folder-name": string, dir: fs.PathLike }[] {
//     let fileObjs: any = getFileAndFolderList(dir);
//     fileObjs = fileObjs.map((obj) => renameKey(obj, 'name', 'folder-name'));

//     return fileObjs.filter((obj) => 
//         fs.statSync(obj.dir).isDirectory()
//     );
// }

// function mergeObjsInArrs(objArr1: any[], objArr2: any[], matchKey: string): any[] {
//     const arr1 = clone(objArr1); const arr2 = clone(objArr2);
//     return arr1.map((obj1) => {
//         let obj2 = arr2.find((tryObj) => obj1[matchKey] === tryObj[matchKey]);
//         return { ...obj1, ...obj2 };
//     });
// }
// -- libs -- //

// -- run -- //
export async function initGallery(gallRoot): Promise<gallInitObj[]> {
    const galJSON = await XLSXtoJSON(gallRoot + '/galleries.xlsx');
    const folders = getFolderList(gallRoot);
    folders.map((obj: any) => obj.xlsx = obj['folder-name'] + '.xlsx');
    return mergeObjsInArrs(galJSON, folders, 'folder-name');
}

initGallery('../test-files/galleries')
.then((x) => console.log(x));

// XLSXtoJSON('../test-files/galleries/galleries.xlsx')
// .then((x) => console.log(x));