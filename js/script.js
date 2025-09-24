console.log("Site CargoBlue carregado com sucesso!");

function calcular() {
  var origem = document.getElementById("origem").value;
  var destino = document.getElementById("destino").value;

  if (!origem || !destino) {
    document.getElementById("resultado").innerHTML = "⚠️ Informe origem e destino.";
    return;
  }

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origem],
      destinations: [destino],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC
    },
    function (response, status) {
      if (status === 'OK') {
        var resultado = response.rows[0].elements[0];
        if (resultado.status === "OK") {
          document.getElementById("resultado").innerHTML =
            "🚚 Distância: <strong>" + resultado.distance.text + "</strong><br>" +
            "⏱️ Tempo estimado: <strong>" + resultado.duration.text + "</strong>";
        } else {
          document.getElementById("resultado").innerHTML = "Não foi possível calcular a rota.";
        }
      } else {
        document.getElementById("resultado").innerHTML = "Erro: " + status;
      }
    }
  );
}

function initMap() {
  console.log("Google Maps API carregada!");
}

