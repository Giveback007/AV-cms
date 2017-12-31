import * as path from 'path';
import { getGallJSON } from './libs/av-gallery-creator';
// c:\Users\DOVY\Desktop\AV-cms\dist
const rtDir = global.rtDir = path.dirname(require.main.filename)//.replace(/\\/g, "/") + '/' ;
// console.log()
getGallJSON(rtDir + '/../test-files/galleries')
.then((x: any) => console.log(x[0].items));

// console.log(rtDir + '../test-files/galleries');

