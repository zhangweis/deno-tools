import React from 'https://esm.sh/react';
import { LineChart, Line as Line1, CartesianGrid, XAxis, YAxis } from 'https://esm.sh/recharts';
import {CustomDot} from './customdot.jsx';
export default function Line({text:texts=[], xaxis,yaxis,data, grid, dot,tip={},margin}) {
	return (
    <LineChart width={789} height={789} data={data} margin={margin}>
      <CartesianGrid strokeDasharray="3 3" {...grid}/>
      <XAxis dataKey="key" {...xaxis}/>
      <YAxis {...yaxis}/>
  <Line1 type="linear" dataKey="value" stroke="#8884d8" dot={props=> <CustomDot {...props} r="5" {...dot}><title>{props.payload.key+' '+props.payload.value.toFixed(tip.decimal||2)}</title></CustomDot>}>
        </Line1>
        {texts.map((text,i)=>(
      <text key={`text${i}`} {...text}><tspan>{text.content}</tspan></text>
  ))}
    </LineChart>
  );
  }
