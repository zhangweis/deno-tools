import jq from "https://raw.githubusercontent.com/zhangweis/deno-tools/main/jq.asm.bundle.js";
const input=new TextDecoder().decode(await Deno.readAll(Deno.stdin));
var out=await jq.promised.raw(input,Deno.args[Deno.args.length-1],Deno.args.slice(0,Deno.args.length-1));
console.log(out)
