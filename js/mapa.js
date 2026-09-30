// ===================
// 🗺️ CRIAÇÃO DO MAPA
// ===================
// Este é o PRIMEIRO arquivo: cria a variável "map" que os outros usam.

// Centralizado na região dos marcadores (Paulista/Janga)
const map = L.map('map').setView([-7.925, -34.840], 14);

// Camada do OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
