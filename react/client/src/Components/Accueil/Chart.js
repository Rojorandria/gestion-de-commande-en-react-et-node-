import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function exemple({commande}) {
  const data = commande.map((item, index) => ({
    name: `Page ${index + 1}`,
    uv: item.qtecom * 2, //exemple de donnée générée
    pv: item.qtecom,
    amt: item.qtecom,
  }));

  return (
    <div style={{ width: '100%' }}>
      <p>Total de quantité par commande</p>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default exemple;
