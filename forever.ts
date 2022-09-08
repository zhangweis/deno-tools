var status;
do{
var commands = ['deno'].concat(Deno.args); 
console.log('start `'+commands.join(' ')+'`');
const p = Deno.run({cmd:commands});
status = await p.status();
console.log({status});
}while(!status.success)
