import json2json from './json2json.ts';
export default async function showJson(input:any) {
  console.log(input);
}

if (import.meta.main) json2json(showJson);
