import * as path from 'path';
import * as fs from 'fs';
// -- imports -- //

// -- code -- //
export const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

export const cleanPath = (p: string) => path.normalize(p).replace(/\\/g, "/");

export function renameKey(obj, oldKey, newKey) {
    let newObj = clone(obj);
    newObj[newKey] = newObj[oldKey];
    delete newObj[oldKey];
    return newObj;
}

export const getFileAndFolderList = (dir: string): { "file-name": string, path: string }[] => 
    fs.readdirSync(dir).map( (file) => ({ "file-name": file, path: dir + '/' + file }) );

export function getFolderList(dir: string) {
    let fileObjs = getFileAndFolderList(dir);
    return fileObjs.filter((obj) => 
        fs.statSync(obj.path).isDirectory()
    );
}

export function getFileList(dir: string) {
    let fileObjs = getFileAndFolderList(dir);
    return fileObjs.filter((obj) => 
        fs.statSync(obj.path).isFile()
    );
}

export function mergeObjsInArrs(objArr1: any[], objArr2: any[], matchKey): any[] {
    const arr1 = clone(objArr1); const arr2 = clone(objArr2);
    return arr1.map((obj1) => {
        let obj2 = arr2.find((tryObj) => obj1[matchKey] === tryObj[matchKey]);
        return { ...obj1, ...obj2 };
    });
}

export function writeJsonToFile(data: any, pathTo: string, fileName): void {
    fs.writeFile(
        cleanPath(pathTo + '/' + fileName + '.json'), 
        JSON.stringify(data),
        (err) => err ? 
            console.log(err) : 
            console.log(`${fileName}.json - saved to: ${cleanPath(pathTo)}`)
    )
}
// -- code -- //