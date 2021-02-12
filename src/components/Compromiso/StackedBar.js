import ReactApexChart from 'react-apexcharts';

const StackedBar = ({
  data,
  horizontal = false,
  title = 'Progreso de acciones y actividades por compromiso',
}) => {
  const sum = (estatus) => {
    return data.map(({ acciones }) =>
      acciones.reduce((acc, curr) => {
        return acc + curr[estatus].aggregate.count * curr.ponderacion;
      }, 0)
    );
  };

  const series = [
    {
      name: 'Verificados',
      color: '#13a758',
      data: sum('verificado'),
    },
    {
      name: 'Completados',
      color: '#1390c8',
      data: sum('completo'),
    },
    {
      name: 'Iniciados',
      color: '#f89d45',
      data: sum('iniciado'),
    },
    {
      name: 'Por iniciar',
      color: '#4f5357',
      data: sum('ninguno'),
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 500,
      stacked: true,
      stackType: '100%',
    },
    plotOptions: {
      bar: {
        horizontal,
      },
    },
    stroke: {
      width: 1,
      colors: ['#ccc'],
    },
    title: {
      text: title,
    },
    yaxis: {
      labels: {
        maxWidth: 400,
      },
    },
    xaxis: {
      categories: data.map(({ slug, titulo }) => titulo),
      labels: {
        trim: false,
        hideOverlappingLabels: false,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} actividades`;
        },
      },
      x: {
        sbow: true,
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    dropShadow: {
      enabled: true,
      top: 0,
      left: 0,
      blur: 3,
      opacity: 0.5,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={500}
      />
    </div>
  );
};

export default StackedBar;
