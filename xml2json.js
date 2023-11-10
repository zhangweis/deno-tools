import xmlToJson from 'npm:simple-xml-to-json';
const {convertXML} = xmlToJson;
const stdinContent = await Deno.readAll(Deno.stdin);
const response = new TextDecoder().decode(stdinContent);
const myJson = convertXML(response);
console.log(JSON.stringify(myJson));
