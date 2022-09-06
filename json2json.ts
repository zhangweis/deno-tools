export default async function json2json(func:Function) {
    const stdinContent = await Deno.readAll(Deno.stdin);
	const response = new TextDecoder().decode(stdinContent);
	let input = JSON.parse(response);
	let output = await func(input);  
	if (output) console.log(JSON.stringify(output));
}
