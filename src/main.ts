import * as path from 'path';
import * as fs from 'fs';
import { getGallJSON } from './libs/av-gallery-creator';
// c:\Users\DOVY\Desktop\AV-cms\dist
const rtDir = global.rtDir = path.dirname(require.main.filename);

async function start() {
    const gallObjs = await getGallJSON(rtDir + '/../test-files/input/galleries');
    const jsonStr = JSON.stringify(gallObjs);
    await fs.writeFile(
        rtDir + '/../test-files/output/galleries.json', 
        jsonStr,
        (err) => err ? 
            console.log(err) : console.log('test-files/output/galleries.json --- saved')
    )
    return jsonStr;
}

start();
