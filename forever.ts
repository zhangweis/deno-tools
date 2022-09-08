var status;
do{
const p = Deno.run({cmd:['deno'].concat(Deno.args)});
status = await p.status();
console.log({status});
}while(!status.success)
