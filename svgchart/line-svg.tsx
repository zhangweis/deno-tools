import React from 'https://esm.sh/react';
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import json2json from 'https://raw.githubusercontent.com/zhangweis/deno-tools/main/json2json.ts';
//import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";
import {renderToString} from 'https://esm.sh/react-dom@18.2.0/server';
import Line from './line.jsx';
json2json(({text:texts=[], xaxis,yaxis,data, grid, dot,svg:svgOptions={}})=>{
  const {width='100%',height='100%',margin={top:30,right:30,left:30,bottom:30}} = svgOptions;
  var line = <Line text={texts} xaxis={xaxis} yaxis={yaxis} data={data} grid={grid} dot={dot} margin={margin}/>;
  var html = renderToString(line);
  const document = new DOMParser().parseFromString(
	html,"text/html");

  var svg = document.getElementsByClassName('recharts-surface')[0];
  
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  console.log(svg.outerHTML)
});
// process.exit();
