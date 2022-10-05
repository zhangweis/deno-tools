import handlebars from 'https://esm.sh/handlebars';
import json2json from './json2json.ts';
json2json(async (json:any)=>{
    if (!json.template) {
        const html = await Deno.readTextFile(Deno.args[0]);
        json={data:json, template: html};
    }
    const template = handlebars.compile(json.template);
    console.log(template(json.data));
})
