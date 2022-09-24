import qrcode from 'https://jspm.dev/qrcode-terminal';
import json2json from './json2json.ts';
export default async function showQr(input:any) {
    const code = await new Promise((resolve,reject)=>{
        qrcode.generate(input.content, {small:!input.small},(code:string)=>{
            resolve(code);
        });
    });
    return Object.assign({code}, input);
}

if (import.meta.main) json2json(showQr);
