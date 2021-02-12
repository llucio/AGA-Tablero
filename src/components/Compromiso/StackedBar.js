import ReactApexChart from 'react-apexcharts';

const StackedBar = ({
  data,
  horizontal = false,
  title = 'Progreso de acciones y actividades por compromiso',
}) => {
  const sum = (estatus) =>
    data.map(({ acciones }) =>
      acciones.reduce((total, accion) => {
        return (
          total +
          (accion[estatus].aggregate.count * accion.ponderacion) /
            accion.total.aggregate.count
        );
      }, 0)
    );

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
      decimalsInFloat: 1,
      labels: {
        maxWidth: 400,
      },
    },
    dataLabels: {
      formatter: (val) => `${Math.round(val * 100 + Number.EPSILON) / 100} %`,
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
        formatter: (val) => `${Math.round(val * 100 + Number.EPSILON) / 100} %`,
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
