// ============================
// 🛣️ ROTAS (OpenRouteService)
// ============================
// Depende de: config.js (CHAVE_ORS, PERFIL_ROTA) e mapa.js (map)

const ORS_URL = 'https://api.openrouteservice.org/v2';

// Faz uma chamada à API e devolve o JSON da resposta
async function chamarORS(caminho, corpo) {
  if (!CHAVE_ORS || CHAVE_ORS === 'COLE_SUA_CHAVE_AQUI') {
    throw new Error('Chave do OpenRouteService não configurada em js/config.js');
  }

  const resposta = await fetch(`${ORS_URL}/${caminho}`, {
    method: 'POST',
    headers: {
      'Authorization': CHAVE_ORS,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(corpo)
  });

  if (!resposta.ok) {
    throw new Error(`OpenRouteService respondeu ${resposta.status}: ${await resposta.text()}`);
  }
  return resposta.json();
}

// Calcula, numa ÚNICA chamada, a distância pelo trajeto da origem
// até cada destino. Atenção: a API usa a ordem [longitude, latitude].
//
// origem:   L.LatLng (sua posição)
// destinos: [[lat, lng, nome], ...]
// retorna:  [{ distancia: metros, duracao: segundos }, ...] na mesma ordem
async function distanciasPorRota(origem, destinos) {
  const locations = [
    [origem.lng, origem.lat],
    ...destinos.map(([lat, lng]) => [lng, lat])
  ];

  const dados = await chamarORS(`matrix/${PERFIL_ROTA}`, {
    locations,
    sources: [0],                                   // parte da sua posição
    destinations: destinos.map((_, i) => i + 1),    // até cada restaurante
    metrics: ['distance', 'duration']
  });

  return destinos.map((_, i) => ({
    distancia: dados.distances[0][i],   // pode vir null se não houver rota
    duracao: dados.durations[0][i]
  }));
}

// Desenha no mapa o trajeto da origem até um restaurante
let camadaRota = null;

async function desenharRota(origem, lat, lng) {
  const dados = await chamarORS(`directions/${PERFIL_ROTA}/geojson`, {
    coordinates: [[origem.lng, origem.lat], [lng, lat]]
  });

  if (camadaRota) map.removeLayer(camadaRota);

  camadaRota = L.geoJSON(dados, {
    style: { color: '#1a73e8', weight: 6, opacity: 0.8 },
    interactive: false
  }).addTo(map);

  map.fitBounds(camadaRota.getBounds(), { padding: [40, 40] });

  return dados.features[0].properties.summary; // { distance, duration }
}

// Apaga o trajeto desenhado (se houver)
function limparRota() {
  if (camadaRota) {
    map.removeLayer(camadaRota);
    camadaRota = null;
  }
}
