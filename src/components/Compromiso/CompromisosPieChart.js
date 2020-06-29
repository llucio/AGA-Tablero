import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const STATS_QUERY = gql`
  query AccionStats($compromisoId: uuid!) {
    acciones: accion(
      order_by: { orden: asc }
      where: { compromiso_id: { _eq: $compromisoId } }
    ) {
      ponderacion
      titulo
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

const CompromisosPieChart = ({ compromisoId }) => {
  const { data: { acciones } = {} } = useQuery(STATS_QUERY, {
    variables: {
      compromisoId,
    },
  });

  const outer = acciones?.map((accion, i) => ({
    name: accion.titulo,
    value: accion.ponderacion,
    label: `${i + 1}`,
  }));

  const inner = acciones
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
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={outer}
            dataKey="value"
            outerRadius={70}
            fill="#3f51b5"
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, label }) => {
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
            innerRadius={90}
            outerRadius={110}
            label={({ type, count }) => `${type} (${count})`}
          >
            {inner &&
              inner.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}%`, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompromisosPieChart;
