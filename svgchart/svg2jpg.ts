import { Canvg } from 'https://esm.sh/canvg@4.0.1';
import PImage from 'https://esm.sh/pureimage';
import JPEG from "https://esm.sh/jpeg-js";
import { encode, decode } from "https://deno.land/std/encoding/base64.ts"
const img = PImage.make(100, 100)
const ctx = img.getContext('2d');
const svgString = new TextDecoder().decode(await Deno.readAll(Deno.stdin));
const v = Canvg.fromString(ctx, svgString);
v.start();
await v.ready();
const data = {
    data: img.data,
    width: img.width,
    height: img.height
}
console.log(encode(JPEG.encode(data, quality).data));
