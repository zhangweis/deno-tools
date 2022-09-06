import tableify from "https://esm.sh/tableify";
import forceArray from "https://esm.sh/force-array";
import json2json from "https://raw.githubusercontent.com/zhangweis/deno-tools/main/json2json.ts";
json2json((input)=>forceArray(input).map(json=>tableify(json)).join(""));
