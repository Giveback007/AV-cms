// import { XLSXtoJSON } from './av-xlsx-to-json';
// import * as path from 'path';
import * as fs from 'fs';
// -- imports -- //

// -- code -- //
export const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

export function renameKey(obj, oldKey, newKey) {
    let newObj = clone(obj);
    newObj[newKey] = newObj[oldKey];
    delete newObj[oldKey];
    return newObj;
}

export const getFileAndFolderList = (dir: fs.PathLike): { name: string, dir: fs.PathLike }[] => 
    fs.readdirSync(dir).map( (file) => ({ name: file, dir: dir + '/' + file }) );

export function getFolderList(dir: fs.PathLike): { "folder-name": string, dir: fs.PathLike }[] {
    let fileObjs: any = getFileAndFolderList(dir);
    fileObjs = fileObjs.map((obj) => renameKey(obj, 'name', 'folder-name'));

    return fileObjs.filter((obj) => 
        fs.statSync(obj.dir).isDirectory()
    );
}

export function mergeObjsInArrs(objArr1: any[], objArr2: any[], matchKey: string): any[] {
    const arr1 = clone(objArr1); const arr2 = clone(objArr2);
    return arr1.map((obj1) => {
        let obj2 = arr2.find((tryObj) => obj1[matchKey] === tryObj[matchKey]);
        return { ...obj1, ...obj2 };
    });
}
// -- code -- //