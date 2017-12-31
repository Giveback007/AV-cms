import * as path from 'path';
import * as fs from 'fs';
import { getGallJSON } from './libs/av-gallery-creator';
import { writeJsonToFile } from './utils/util';
// import { writeJSONtoFile } 
// c:\Users\DOVY\Desktop\AV-cms\dist
const rtDir = global.rtDir = path.dirname(require.main.filename);

async function start() {
    const gallObjs = await getGallJSON(rtDir + '/../test-files/input/galleries');
    // const jsonStr = JSON.stringify(gallObjs);
    // rtDir + '/../test-files/output/galleries.json'
    writeJsonToFile(gallObjs, rtDir + '/../test-files/output', 'galleries')
    // return jsonStr;
}

start();
