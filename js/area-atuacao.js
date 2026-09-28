// ============================
// ⬡ ÁREA DE ATUAÇÃO DOS ENTREGADORES
// ============================
// Depende de: mapa.js (variável map)

// Contorno aproximado da área (latitude, longitude).
// Para ajustar, mova/adicione pontos; a borda se adapta sozinha.
const AREA_ATUACAO = [
  [-7.850, -34.838], [-7.850, -34.828], [-7.870, -34.830], [-7.895, -34.822],
  [-7.915, -34.818], [-7.935, -34.818], [-7.955, -34.824], [-7.970, -34.830],
  [-7.980, -34.838], [-7.978, -34.855], [-7.965, -34.864], [-7.950, -34.878],
  [-7.935, -34.880], [-7.915, -34.868], [-7.900, -34.855], [-7.885, -34.848],
  [-7.870, -34.842], [-7.858, -34.845]
];

// Tamanho de cada hexágono em metros (distância do centro até a ponta).
// Menor = borda mais detalhada; maior = zigue-zague mais "grosso".
const TAMANHO_HEX = 450;

// ---- Funções auxiliares (não precisa mexer) ----

// Ponto dentro de polígono (algoritmo do raio)
function pontoNoPoligono(lat, lng, poligono) {
  let dentro = false;
  for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
    const [yi, xi] = poligono[i];
    const [yj, xj] = poligono[j];
    if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      dentro = !dentro;
    }
  }
  return dentro;
}

// Cobre a área com hexágonos e devolve só o contorno externo deles
function contornoHexagonal(area, tamanho) {
  const lat0 = area.reduce((s, p) => s + p[0], 0) / area.length;
  const mLat = 111320;                                   // metros por grau de latitude
  const mLng = 111320 * Math.cos(lat0 * Math.PI / 180);  // metros por grau de longitude

  const lats = area.map(p => p[0]);
  const lngs = area.map(p => p[1]);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);

  const larguraHex = Math.sqrt(3) * tamanho;  // hexágono "em pé"
  const alturaLinha = 1.5 * tamanho;
  const dLat = alturaLinha / mLat;
  const dLng = larguraHex / mLng;

  // 1) Centros dos hexágonos que caem dentro da área
  const contagemArestas = new Map();
  const chave = (a, b) => a[0].toFixed(6) + ',' + a[1].toFixed(6) + '|' + b[0].toFixed(6) + ',' + b[1].toFixed(6);

  let linha = 0;
  for (let lat = minLat - dLat; lat <= maxLat + dLat; lat += dLat, linha++) {
    const desloc = (linha % 2) * dLng / 2;
    for (let lng = minLng - dLng + desloc; lng <= maxLng + dLng; lng += dLng) {
      if (!pontoNoPoligono(lat, lng, area)) continue;

      // 2) Os 6 vértices deste hexágono
      const v = [];
      for (let k = 0; k < 6; k++) {
        const ang = Math.PI / 180 * (60 * k - 30);
        v.push([
          +(lat + (tamanho * Math.sin(ang)) / mLat).toFixed(6),
          +(lng + (tamanho * Math.cos(ang)) / mLng).toFixed(6)
        ]);
      }
      // 3) Conta cada aresta; as internas aparecem 2 vezes
      for (let k = 0; k < 6; k++) {
        const a = v[k], b = v[(k + 1) % 6];
        const [p, q] = (a[0] < b[0] || (a[0] === b[0] && a[1] < b[1])) ? [a, b] : [b, a];
        const c = chave(p, q);
        const atual = contagemArestas.get(c);
        contagemArestas.set(c, { a: p, b: q, n: atual ? atual.n + 1 : 1 });
      }
    }
  }

  // 4) Arestas que aparecem 1 vez só = borda. Encadeia em anéis fechados.
  const borda = [...contagemArestas.values()].filter(e => e.n === 1);
  const vizinhos = new Map();
  const id = p => p[0].toFixed(6) + ',' + p[1].toFixed(6);
  borda.forEach((e, i) => {
    [e.a, e.b].forEach(p => {
      if (!vizinhos.has(id(p))) vizinhos.set(id(p), []);
      vizinhos.get(id(p)).push(i);
    });
  });

  const usada = new Array(borda.length).fill(false);
  const aneis = [];
  for (let i = 0; i < borda.length; i++) {
    if (usada[i]) continue;
    usada[i] = true;
    const anel = [borda[i].a];
    let atual = borda[i].b;
    while (id(atual) !== id(anel[0])) {
      anel.push(atual);
      const prox = vizinhos.get(id(atual)).find(j => !usada[j]);
      if (prox === undefined) break;
      usada[prox] = true;
      atual = id(borda[prox].a) === id(atual) ? borda[prox].b : borda[prox].a;
    }
    aneis.push(anel);
  }
  return aneis;
}

// ---- Desenha a borda ----
let contornoAtuacao = [];
try {
  contornoAtuacao = contornoHexagonal(AREA_ATUACAO, TAMANHO_HEX);

  const bordaAtuacao = L.polygon(contornoAtuacao, {
    color: '#111',        // borda preta
    weight: 4,
    fillColor: '#000',
    fillOpacity: 0.04,    // leve sombreado dentro da área
    interactive: false    // não bloqueia cliques nos marcadores
  }).addTo(map);

  map.fitBounds(bordaAtuacao.getBounds());
} catch (erro) {
  // Se algo der errado aqui, o resto do mapa continua funcionando
  console.error('Erro ao desenhar a área de atuação:', erro);
}

// Verifica se um ponto está dentro da área (útil para filtros)
function dentroDaArea(lat, lng) {
  return contornoAtuacao.some(anel => pontoNoPoligono(lat, lng, anel));
}
