import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const STATS_QUERY = gql`
  query HitoStats($compromisoId: uuid!) {
    hitos: hito(
      order_by: { orden: asc }
      where: { compromiso_id: { _eq: $compromisoId } }
    ) {
      ponderacion
      total: actividades_aggregate {
        aggregate {
          count
        }
      }
      ninguno: actividades_aggregate(
        where: {
          _or: [
            { metadatos: { _contains: { estatus: "ninguno" } } }
            { _not: { metadatos: { _has_key: "estatus" } } }
          ]
        }
      ) {
        aggregate {
          count
        }
      }
      iniciado: actividades_aggregate(
        where: { metadatos: { _contains: { estatus: "iniciado" } } }
      ) {
        aggregate {
          count
        }
      }
      completo: actividades_aggregate(
        where: { metadatos: { _contains: { estatus: "completo" } } }
      ) {
        aggregate {
          count
        }
      }
      verificado: actividades_aggregate(
        where: { metadatos: { _contains: { estatus: "verificado" } } }
      ) {
        aggregate {
          count
        }
      }
    }
  }
`;
// const data01 = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];
// const data02 = [
//   { name: 'A1', value: 100 },
//   { name: 'A2', value: 300 },
//   { name: 'B1', value: 100 },
//   { name: 'B2', value: 80 },
//   { name: 'B3', value: 40 },
//   { name: 'B4', value: 30 },
//   { name: 'B5', value: 50 },
//   { name: 'C1', value: 100 },
//   { name: 'C2', value: 200 },
//   { name: 'D1', value: 150 },
//   { name: 'D2', value: 200 },
// ];

const CompromisosPieChart = ({ compromisoId }) => {
  const { data: { hitos } = {}, refetch } = useQuery(STATS_QUERY, {
    variables: {
      compromisoId,
    },
  });

  const outer = hitos?.map((hito, i) => ({
    name: hito.titulo,
    value: hito.ponderacion,
    label: `${i + 1}`,
  }));

  const inner = hitos
    ?.reduce(
      (acc, curr) => [
        ...acc,
        {
          name: curr.titulo,
          value:
            (curr.ninguno.aggregate.count * curr.ponderacion) /
            curr.total.aggregate.count,
          count: curr.ninguno.aggregate.count,
          type: 'Sin iniciar',
          color: '#cccccc',
        },
        {
          name: curr.titulo,
          value:
            (curr.iniciado.aggregate.count * curr.ponderacion) /
            curr.total.aggregate.count,
          count: curr.iniciado.aggregate.count,
          type: 'Iniciado',
          color: '#ffc107',
        },
        {
          name: curr.titulo,
          value:
            (curr.completo.aggregate.count * curr.ponderacion) /
            curr.total.aggregate.count,
          count: curr.completo.aggregate.count,
          type: 'Por verificar',
          color: '#afb42b',
        },
        {
          name: curr.titulo,
          value:
            (curr.verificado.aggregate.count * curr.ponderacion) /
            curr.total.aggregate.count,
          count: curr.verificado.aggregate.count,
          type: 'Verificado',
          color: '#388e3c',
        },
      ],
      []
    )
    .filter((agg) => agg.count > 0);

  const RADIAN = Math.PI / 180;

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={outer}
            dataKey="value"
            outerRadius={60}
            fill="#8884d8"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, label }) => {
              // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                >
                  {label}
                </text>
              );
            }}
          />
          <Pie
            data={inner}
            dataKey="value"
            innerRadius={70}
            outerRadius={90}
            label={({ type, count }) => `${type} (${count})`}
          >
            {inner &&
              inner.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompromisosPieChart;
