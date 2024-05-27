import csvToJson from 'npm:csv-file-to-json';
const stdinContent = await Deno.readAll(Deno.stdin);
let response = new TextDecoder().decode(stdinContent);
let options={};
if (response[0]=='{') {
  var json = JSON.parse(response);
  response=json.data;
  delete response.data;
  options=response;
}
const myJson = csvToJson({data:response});
console.log(JSON.stringify(myJson));
