// ============================
// 📡 GPS EM TEMPO REAL
// ============================
// Depende de: config.js, mapa.js, rotas.js e marcadores.js

// Ícone do usuário: um ponto azul feito em CSS (ver .ponto-usuario no estilo.css)
const iconeUsuario = L.divIcon({
  className: '',                                  // remove o fundo branco padrão do Leaflet
  html: '<div class="ponto-usuario"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9]                              // centro do ponto = posição exata
});

let marcadorUsuario = null;
let circuloRaio = null;
let posicaoAtual = null;             // última posição recebida do GPS
let ultimaPosicaoCalculada = null;   // posição usada no último cálculo de rotas
let numeroCalculo = 0;               // evita que um cálculo antigo sobrescreva um novo

map.locate({
  watch: true,
  enableHighAccuracy: true
});

map.on('locationfound', function (e) {
  const latlng = e.latlng;
  const primeiraVez = !posicaoAtual;
  posicaoAtual = latlng;

  // 🔵 ponto azul e círculo: só movem de lugar (não recria a cada atualização)
  if (!marcadorUsuario) {
    marcadorUsuario = L.marker(latlng, { icon: iconeUsuario, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup("📍 Você está aqui");

    circuloRaio = L.circle(latlng, {
      radius: RAIO,
      color: 'green',
      fillColor: '#22c55e',
      fillOpacity: 0.15,
      interactive: false
    }).addTo(map);
  } else {
    marcadorUsuario.setLatLng(latlng);
    circuloRaio.setLatLng(latlng);
  }

  // Centraliza só na primeira localização, para não "puxar" o mapa
  // enquanto você estiver arrastando ou olhando outra região.
  if (primeiraVez) map.setView(latlng, 14);

  // 🛣️ Recalcula as distâncias só se tiver andado o suficiente
  if (!ultimaPosicaoCalculada || latlng.distanceTo(ultimaPosicaoCalculada) > DESLOCAMENTO_MINIMO) {
    ultimaPosicaoCalculada = latlng;
    atualizarDistancias(latlng);
  }
});

// Calcula a distância pelo trajeto até os restaurantes do raio
// e guarda o resultado em cada marcador (aparece ao abrir o balão)
async function atualizarDistancias(origem) {
  const meuNumero = ++numeroCalculo;

  // 1) Pré-filtro rápido em linha reta. O trajeto nunca é menor que a
  //    linha reta, então quem está fora do raio aqui também estaria pela rota.
  const candidatos = marcadoresRestaurantes.filter(m =>
    origem.distanceTo([m.dados.lat, m.dados.lng]) <= RAIO
  );
  const destinos = candidatos.map(m => [m.dados.lat, m.dados.lng, m.dados.nome]);

  // 2) Distância real pelas ruas, numa única chamada à API
  let resultados;
  try {
    resultados = destinos.length ? await distanciasPorRota(origem, destinos) : [];
  } catch (erro) {
    // Se a API falhar (sem internet, limite atingido...), usa a linha reta
    console.warn('Rota indisponível, usando linha reta:', erro);
    resultados = destinos.map(([lat, lng]) => ({
      distancia: origem.distanceTo([lat, lng]),
      duracao: null,
      linhaReta: true
    }));
  }

  // Se enquanto esperava a resposta já começou um cálculo mais novo, descarta este
  if (meuNumero !== numeroCalculo) return;

  // 3) Guarda a distância só em quem está dentro do raio PELO TRAJETO
  marcadoresRestaurantes.forEach(m => { m.dados.rota = null; });
  candidatos.forEach((m, i) => {
    const r = resultados[i];
    if (r.distancia != null && r.distancia <= RAIO) m.dados.rota = r;
  });
}
