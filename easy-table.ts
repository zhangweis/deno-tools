import Table from "https://esm.sh/easy-table";
import json2json from "./json2json.ts";
function print({data,decimals={}}) {
var options = Object.fromEntries(Object.entries(decimals).map(([key,value])=>[key,{printer: Table.number(value)}]));
  return Table.print(data,options);
  }
  export default print;
if (import.meta.main) json2json(print);

