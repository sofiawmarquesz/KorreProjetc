const map = L.map('map').setView([-7.925, -34.840], 14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, attribution: '&copy; OpenStreetMap'
}).addTo(map);


function parseHorario(texto) {
  const faixas = [];
  if (!texto) return faixas;
  
  const mapaDia = {
    'domingo':0, 'dom':0,
    'segunda':1, 'seg':1, 'segunda-feira':1,
    'terça':2, 'ter':2, 'terca':2, 'terça-feira':2, 'terca-feira':2,
    'quarta':3, 'qua':3, 'quarta-feira':3,
    'quinta':4, 'qui':4, 'quinta-feira':4,
    'sexta':5, 'sex':5, 'sexta-feira':5,
    'sábado':6, 'sabado':6, 'sáb':6, 'sab':6
  };

  function paraMinutos(horarioStr) {
    const m = horarioStr.match(/(\d{1,2})[:h]?\s*(\d{2})?/);
    if (!m) return null;
    return parseInt(m[1]) * 60 + (m[2] ? parseInt(m[2]) : 0);
  }

  texto.split('|').map(b => b.trim()).forEach(bloco => {
   
    const m = bloco.match(/([\wà-ú-]+)\s*[:：]\s*([\d:h]+)\s*(?:às|as|a)\s*([\d:h]+)/i);
    if (!m) return;
    
    const faixa = m[1].trim().toLowerCase();
    const inicioMin = paraMinutos(m[2]);
    const fimMin = paraMinutos(m[3]);
    if (!inicioMin || !fimMin) return;

    let dias = [];
    if (faixa.includes('-')) {
      const partes = faixa.split('-').map(p => p.trim());
      const inicio = mapaDia[partes[0]];
      const fim = mapaDia[partes[1]];
      
      if (inicio === undefined || fim === undefined) return;

      if (inicio <= fim) {
        for (let d = inicio; d <= fim; d++) dias.push(d);
      } else {
        // Cruza o domingo
        for (let d = inicio; d <= 6; d++) dias.push(d);
        for (let d = 0; d <= fim; d++) dias.push(d);
      }
    } else {
      const d = mapaDia[faixa];
      if (d !== undefined) dias.push(d);
    }

    dias.forEach(d => faixas.push({dia: d, inicio: inicioMin, fim: fimMin}));
  });
  
  return faixas;
}

function estaAberta(horarioTexto) {
  if (!horarioTexto || horarioTexto === "Horário a confirmar") return true;
  
  const agora = new Date();
  const dia = agora.getDay();
  const totalMinutos = agora.getHours() * 60 + agora.getMinutes();
  const faixas = parseHorario(horarioTexto);
  
  const hoje = faixas.filter(f => f.dia === dia);
  if (!hoje.length) return false;
  return hoje.some(f => totalMinutos >= f.inicio && totalMinutos < f.fim);
}

function criarIcone(aberta) {
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${aberta ? 'green' : 'red'}.png`,
    shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });
}


let estabelecimentos = [], marcadores = [];

function adicionarMarcador(lat, lng, nome, horario) {
  const aberta = estaAberta(horario);
  const icone = criarIcone(aberta);
  const marcador = L.marker([lat, lng], { icon: icone })
    .addTo(map)
    .bindPopup(`
      <strong>${nome}</strong><br>
      ⏰ ${horario.replace(/\n/g, '<br>')}<br>
      ${aberta 
        ? '<span class="status-aberta">✅ ABERTA AGORA</span>' 
        : '<span class="status-fechada">🔴 FECHADA</span>'}
    `);
  marcadores.push(marcador);
}

function atualizarTudo() {
  marcadores.forEach(m => map.removeLayer(m));
  marcadores = [];
  const lista = document.getElementById('lista-conteudo');
  lista.innerHTML = '';

  estabelecimentos.forEach(([lat, lng, nome, horario]) => {
    adicionarMarcador(lat, lng, nome, horario);
    const aberta = estaAberta(horario);
    lista.innerHTML += `<div class="item-restaurante">
      <strong>${nome}</strong> ${aberta 
        ? '<span class="status-aberta">● Aberta</span>' 
        : '<span class="status-fechada">● Fechada</span>'}<br>
      <small>⏰ ${horario}</small>
    </div>`;
  });
}


function carregarLojas() {
  const salvas = localStorage.getItem('lojasCadastradas');
  estabelecimentos = [...LOJAS_ORIGINAIS];
  if (salvas) {
    JSON.parse(salvas).forEach(loja => {
      if (!estabelecimentos.some(e => e[2] === loja[2])) {
        estabelecimentos.push(loja);
      }
    });
  }
  atualizarTudo();
}

function salvarLojas() {
  localStorage.setItem('lojasCadastradas', JSON.stringify(
    estabelecimentos.filter(l => !LOJAS_ORIGINAIS.some(o => o[2] === l[2]))
  ));
}

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

function cadastrarLoja() {
  const nome = document.getElementById('nome-loja').value.trim();
  const lat = parseFloat(document.getElementById('lat-loja').value);
  const lng = parseFloat(document.getElementById('lng-loja').value);
  const horario = document.getElementById('horario-loja').value.trim();
  
  if (!nome || isNaN(lat) || isNaN(lng) || !horario) {
    return alert('Preencha todos os campos corretamente!');
  }
  if (!pontoNoPoligono(lat, lng, AREA_ATUACAO)) {
    document.getElementById('msg-erro').style.display = 'block';
    setTimeout(() => document.getElementById('msg-erro').style.display = 'none', 3000);
    return;
  }
  
  estabelecimentos.push([lat, lng, nome, horario]);
  salvarLojas();
  atualizarTudo();
  
  const codigoGerado = `  [${lat.toFixed(7)}, ${lng.toFixed(7)}, "${nome}", "${horario}"],`;
  
  if (!document.getElementById('codigo-gerado')) {
    const div = document.createElement('div');
    div.id = 'codigo-gerado';
    div.style = `
      margin-top: 15px; padding: 12px; background: #eef2ff;
      border: 1px solid #c7d2fe; border-radius: 8px; display: block;
    `;
    div.innerHTML = `
      <p style="font-weight: bold; margin-bottom: 8px; color: #3730a3;">📋 Código pronto para copiar:</p>
      <textarea id="area-codigo" readonly style="
        width: 100%; height: 80px; padding: 8px;
        background: white; border: 1px solid #ccc;
        border-radius: 4px; font-family: monospace; font-size: 13px;
      "></textarea>
      <button onclick="copiarCodigo()" style="
        margin-top: 8px; padding: 8px 16px; background: #4f46e5;
        color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;
      "> Copiar Código</button>
    `;
    document.getElementById('form-cadastro').appendChild(div);
  }
  
  document.getElementById('area-codigo').value = codigoGerado;
  
 
  ['nome-loja', 'lat-loja', 'lng-loja', 'horario-loja'].forEach(id => 
    document.getElementById(id).value = ''
  );
  
  document.getElementById('msg-sucesso').style.display = 'block';
  setTimeout(() => document.getElementById('msg-sucesso').style.display = 'none', 3000);
}

function copiarCodigo() {
  const texto = document.getElementById('area-codigo');
  texto.select();
  document.execCommand('copy');
  alert('✅ Código copiado! Agora é só colar no lojas-dados.js dentro do colchete!');
}

L.polygon(AREA_ATUACAO, {
  color: '#111',
  weight: 4,
  fillColor: '#000',
  fillOpacity: 0.04,
  interactive: false
}).addTo(map);

let marcadorLocalizacao = null;
let circuloLocalizacao = null;

map.locate({ watch: true, enableHighAccuracy: true });

map.on('locationfound', e => {
  if (marcadorLocalizacao) map.removeLayer(marcadorLocalizacao);
  if (circuloLocalizacao) map.removeLayer(circuloLocalizacao);

  marcadorLocalizacao = L.circleMarker(e.latlng, {
    radius: 10,              
    fillColor: '#3b82f6',   
    color: '#fff',          
    weight: 2,            
    fillOpacity: 1          
  })
  .addTo(map)
  .bindPopup("Você está aqui")
  .openPopup();

  circuloLocalizacao = L.circle(e.latlng, {
    radius: 2750,
    color: 'green',
    fillColor: '#22c55e',
    fillOpacity: 0.15
  }).addTo(map);
});
carregarLojas();