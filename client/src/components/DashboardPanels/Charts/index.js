import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format, parseISO, subDays } from "date-fns";
import styles from "./styles.module.css";

function CustomTooltip({active, payload, label}) {
  if(active) {
    return <div id={styles.tooltip}>
      <h4>{format(parseISO(label), "eeee, d MMM")}</h4>
      <p>
        ${payload[0].value.toFixed(2)} USD
      </p>
    </div>

  }
  return null;
}

const data = [];
for (let num = 30; num >= 0; num--) {
  data.push({
    date: subDays(new Date(), num).toISOString().substr(0, 10),
    value: 1 + Math.random(),
  });
}

class Charts extends PureComponent { 
  render() {
    return (
        <AreaChart
          width={650}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#39FF14" stopOpacity={0.8}></stop>
              <stop offset="75%" stopColor="#39FF14" stopOpacity={0.4}></stop>
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke="#39FF14" fill="url(#color)"/>
          <XAxis 
            dataKey="date"
            tickLine={false}
            tickFormatter={(str) => {
              const date = parseISO(str);
              if (date.getDate() % 3 === 0) {
                return format(date, "MMM, d");
              }
              return "";
            }}
          />
          <YAxis 
            dataKey="value" 
            tickLine={false} 
            tickCount={8}
            tickFormatter={number => `$${number.toFixed(2)}`}
          />
          <Tooltip 
            content={<CustomTooltip />}
          />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
    );
  }
}

export default Charts;
