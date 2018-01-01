import * as path from 'path';
import * as fs from 'fs';
import { getGallJSON } from './libs/av-gallery-creator';
import { writeJsonToFile } from './utils/util';
import { XLSXtoJSON } from './libs/av-xlsx-to-json';

// c:\Users\DOVY\Desktop\AV-cms\dist
const rtDir = global.rtDir = path.dirname(require.main.filename);

async function start() {
    const events = await XLSXtoJSON(rtDir + '/../test-files/input/evets.xlsx');
    writeJsonToFile(events, rtDir + '/../test-files/output', 'events');

    const gallObjs = await getGallJSON(rtDir + '/../test-files/input/galleries');
    writeJsonToFile(gallObjs, rtDir + '/../test-files/output', 'galleries');
}

start();
