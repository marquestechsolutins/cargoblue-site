console.log("Site CargoBlue carregado com sucesso!");

// Cole sua chave alfanumérica do OpenRouteService aqui
const API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjE4N2NkMjJiYmY0MzQyMjU4ZDY3N2U3ZjI3YmZlMDYxIiwiaCI6Im11cm11cjY0In0=";

// Inicializa o mapa
const map = L.map('map').setView([-15.7801, -47.9292], 4); // centro aproximado do Brasil
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let rotaLayer; // camada para a rota

async function geocode(endereco) {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(endereco)}&size=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.features && data.features.length > 0) {
    return data.features[0].geometry.coordinates; // [lon, lat]
  } else {
    throw new Error("Endereço não encontrado: " + endereco);
  }
}

async function calcular() {
  const origemText = document.getElementById("origem").value;
  const destinoText = document.getElementById("destino").value;

  if (!origemText || !destinoText) {
    document.getElementById("resultado").innerHTML = "⚠️ Informe origem e destino.";
    return;
  }

  try {
    document.getElementById("resultado").innerHTML = "Calculando... ⏳";

    const origemCoords = await geocode(origemText); // [lon, lat]
    const destinoCoords = await geocode(destinoText);

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origemCoords[0]},${origemCoords[1]}&end=${destinoCoords[0]},${destinoCoords[1]}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.routes && data.routes.length > 0) {
      const distancia = (data.routes[0].summary.distance / 1000).toFixed(2); // km
      const duracaoMin = Math.ceil(data.routes[0].summary.duration / 60); // minutos

      document.getElementById("resultado").innerHTML =
        `🚚 Distância: <strong>${distancia} km</strong><br>⏱️ Tempo estimado: <strong>${duracaoMin} min</strong>`;

      // Remove rota antiga se existir
      if (rotaLayer) {
        map.removeLayer(rotaLayer);
      }

      // Converte coordenadas da rota para [lat, lon] e desenha no mapa
      const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
      rotaLayer = L.polyline(coords, {color: 'blue'}).addTo(map);
      map.fitBounds(rotaLayer.getBounds());
    } else {
      document.getElementById("resultado").innerHTML = "Não foi possível calcular a rota.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("resultado").innerHTML = "Erro: " + err.message;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnCalcular").addEventListener("click", calcular);
});

function initMap() {
  console.log("Google Maps API carregada!");
}


