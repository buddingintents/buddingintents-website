import {cp,mkdir} from 'node:fs/promises';
await mkdir('dist/admin/vendor',{recursive:true});
await cp('node_modules/decap-cms/dist','dist/admin/vendor',{recursive:true,filter:p=>!p.endsWith('.map')&&!p.endsWith('/esm')});
