import { getStdin } from 'https://deno.land/x/get_stdin@v1.1.0/mod.ts';
export default async function json2json(func:Function) {
    const response = await getStdin();
	let input = JSON.parse(response);
	let output = await func(input);  
	if (output) console.log(JSON.stringify(output));
}
