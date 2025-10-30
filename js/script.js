console.log("Site CargoBlue carregado com sucesso!");

// // Substitua pela sua chave alfanumérica real do OpenRouteService
// const API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjE4N2NkMjJiYmY0MzQyMjU4ZDY3N2U3ZjI3YmZlMDYxIiwiaCI6Im11cm11cjY0In0=";

// // Inicializa o mapa
// const map = L.map('map').setView([-15.7801, -47.9292], 4); // Brasil central
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; OpenStreetMap contributors'
// }).addTo(map);

// let rotaLayer;
// let origemMarker;
// let destinoMarker;

// // Função de geocodificação
// async function geocode(endereco) {
//   const url = `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(endereco)}&size=1`;
//   const res = await fetch(url);
//   const data = await res.json();

//   if (data && data.features && data.features.length > 0) {
//     const feature = data.features[0];
//     if (feature.geometry && feature.geometry.coordinates) {
//       return feature.geometry.coordinates; // [lon, lat]
//     } else {
//       throw new Error("Geometria inválida para: " + endereco);
//     }
//   } else {
//     throw new Error("Endereço não encontrado: " + endereco);
//   }
// }

// // Função principal de cálculo
// async function calcular() {
//   const origemText = document.getElementById("origem").value;
//   const destinoText = document.getElementById("destino").value;

//   if (!origemText || !destinoText) {
//     document.getElementById("resultado").innerHTML = "⚠️ Informe origem e destino.";
//     return;
//   }

//   try {
//     document.getElementById("resultado").innerHTML = "Calculando... ⏳";

//     // Geocodifica os endereços
//     const origemCoords = await geocode(origemText); // [lon, lat]
//     const destinoCoords = await geocode(destinoText);

//     // Consulta a rota
//     const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origemCoords[0]},${origemCoords[1]}&end=${destinoCoords[0]},${destinoCoords[1]}`;
//     const res = await fetch(url);
//     const data = await res.json();

//     if (data.features && data.features.length > 0) {
//       const rota = data.features[0];

//       // Distância em km e duração em minutos
//         const distancia = (rota.properties.summary.distance / 1000).toFixed(2);
//         const duracaoSeg = rota.properties.summary.duration;
//         const horas = Math.floor(duracaoSeg / 3600);
//         const minutos = Math.ceil((duracaoSeg % 3600) / 60);

//         let tempoFormatado = "";
//         if (horas > 0) {
//         tempoFormatado = `${horas}h ${minutos}min`;
//         } else {
//         tempoFormatado = `${minutos}min`;
//         }

//         document.getElementById("resultado").innerHTML =
//         `🚚 Distância: <strong>${distancia} km</strong><br>⏱️ Tempo estimado: <strong>${tempoFormatado}</strong>`;

//       // Remove rota antiga
//       if (rotaLayer) map.removeLayer(rotaLayer);
//       if (origemMarker) map.removeLayer(origemMarker);
//       if (destinoMarker) map.removeLayer(destinoMarker);

//       // Desenha a rota
//       const coords = rota.geometry.coordinates.map(c => [c[1], c[0]]);
//       rotaLayer = L.polyline(coords, { color: 'blue', weight: 5 }).addTo(map);

//       // Adiciona marcadores
//       origemMarker = L.marker([origemCoords[1], origemCoords[0]])
//         .addTo(map).bindPopup("Origem").openPopup();
//       destinoMarker = L.marker([destinoCoords[1], destinoCoords[0]])
//         .addTo(map).bindPopup("Destino");

//       // Ajusta o mapa para caber toda a rota
//       map.fitBounds(rotaLayer.getBounds());
//     } else {
//       document.getElementById("resultado").innerHTML = "Não foi possível calcular a rota.";
//     }
//   } catch (err) {
//     console.error(err);
//     document.getElementById("resultado").innerHTML = "Erro: " + err.message;
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("btnCalcular").addEventListener("click", calcular);
// });

// function initMap() {
//   console.log("Google Maps API carregada!");
// }

// // Efeito de fade-in em scroll
// document.addEventListener('DOMContentLoaded', () => {
//     const elements = document.querySelectorAll('.service-card, .hero h1, .hero p');

//     elements.forEach((el) => {
//         el.style.opacity = 0;
//         el.style.animation = 'fadeIn 2s forwards';
//     });
// });


// Inicia AOS (animações no scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 120
});

// Navbar muda de cor ao rolar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
