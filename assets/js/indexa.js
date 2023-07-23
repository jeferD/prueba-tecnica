function graficas(data) {

    const btcPrices = {};
    const ethPrices = {};

    data.forEach((row) => {
      console.log('row.fecha_hora_registro',row.fecha_hora_registro)
      const fechaHora = formatoFecha(row.fecha_hora_registro);
      if (row.nombre_criptomoneda === 'Bitcoin') {
        btcPrices[fechaHora] = parseFloat(row.precio);
      } else if (row.nombre_criptomoneda === 'Ethereum') {
        ethPrices[fechaHora] = parseFloat(row.precio);
      }
    });

    const labels = Object.keys(btcPrices);
    const btcPricesArr = Object.values(btcPrices);
    const ethPricesArr = Object.values(ethPrices);

    const ctxBtc = document.getElementById('btcChart').getContext('2d');
    const btcChart = new Chart(ctxBtc, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Precio de BTC',
            data: btcPricesArr,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
    });

    const ctxEth = document.getElementById('ethChart').getContext('2d');
    const ethChart = new Chart(ctxEth, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Preci o de ETH',
            data: ethPricesArr,
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }




function formatoFecha(fecha){
  const inputDate = fecha;
  const date = new Date(inputDate);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC'
  };

  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);

  console.log(formattedDate);

  return formattedDate
}

function consultarDatos(){
  fetch('http://127.0.0.1:3000/datos') 
  // const serverDns = 'lb-criptomonedas-560503775.us-east-1.elb.amazonaws.com'; // Reemplaza esto con el DNS de tu servidor
  // fetch(`http://${serverDns}:3000/datos`)
  .then((response) => response.json())
  .then((data) => {
    graficas(data);
  })
  .catch((error) => {
    console.log('Error al obtener los datos', error);
  });
}

consultarDatos()


