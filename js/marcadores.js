// ============================
// 📍 MARCADORES DOS ESTABELECIMENTOS
// ============================
// Depende de: mapa.js, estabelecimentos.js, categorias.js, horarios.js e rotas.js
//
// Cada restaurante tem UM marcador só. O GPS não cria marcadores novos:
// ele apenas guarda a distância de rota em "marcador.dados.rota" (dentro do raio)
// ou em "marcador.dados.distanciaFora" (fora do raio, calculada de carro).

// Cria o ícone de gota com o emoji da categoria.
// Se estiver fechado, a gota fica cinza.
function criarIconeRestaurante(chaveCategoria, fechado) {
  const cat = CATEGORIAS[chaveCategoria];
  return L.divIcon({
    className: '',
    html: `<div class="pin-restaurante${fechado ? ' fechado' : ''}" style="--cor:${cat.cor}">
             <span>${cat.emoji}</span>
           </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 41],     // a ponta da gota fica exatamente no endereço
    popupAnchor: [0, -38]
  });
}

// Formata "3,25 km · ~8 min"
function formatarDistancia(r) {
  const km = (r.distancia / 1000).toFixed(2).replace('.', ',');
  const tempo = r.duracao != null ? ` · ~${Math.max(1, Math.round(r.duracao / 60))} min` : '';
  return `${km} km${tempo}`;
}

// Conteúdo do balão, montado na hora em que você clica
// (assim o status aberto/fechado e a distância estão sempre atualizados)
function montarPopup(marcador) {
  const { lat, lng, nome, categoria, rota, distanciaFora } = marcador.dados;
  const cat = CATEGORIAS[categoria];
  const aberto = estaAberto(nome);

  const div = document.createElement('div');
  let html = `<strong>${nome}</strong><br><small>${cat.emoji} ${cat.nome}</small>`;

  if (aberto !== null) {
    html += `<br>${aberto ? '🟢 Aberto agora' : '🔴 Fechado'} <small>· hoje: ${horarioDeHoje(nome)}</small>`;
  }

  if (rota) {
    // Dentro do raio de entrega
    const aviso = rota.linhaReta ? ' <small>(linha reta)</small>' : '';
    html += `<br>🛵 ${formatarDistancia(rota)}${aviso}`;
  } else if (distanciaFora) {
    // Fora do raio: distância de carro, calculada depois do clique
    html += `<br>🚗 ${formatarDistancia(distanciaFora)} <small>· fora da área de entrega</small>`;
  }

  div.innerHTML = html;

  // Botão de trajeto (só quando o GPS já achou sua posição)
  if (typeof posicaoAtual !== 'undefined' && posicaoAtual) {
    const botao = document.createElement('button');
    botao.className = 'botao-rota';
    botao.textContent = 'Ver trajeto';
    botao.addEventListener('click', async () => {
      botao.disabled = true;
      botao.textContent = 'Calculando...';
      try {
        // Rota de carro (PERFIL_ROTA). O retorno já traz distância e tempo.
        const resumo = await desenharRota(posicaoAtual, lat, lng);

        // Loja fora do raio: guarda a distância de carro e redesenha o balão
        if (!marcador.dados.rota && resumo && resumo.distance != null) {
          marcador.dados.distanciaFora = { distancia: resumo.distance, duracao: resumo.duration };
          marcador.getPopup().update();
          return;
        }
        botao.textContent = 'Ver trajeto';
      } catch (erro) {
        console.error('Erro ao desenhar o trajeto:', erro);
        botao.textContent = 'Erro ao calcular';
      }
      botao.disabled = false;
    });
    div.appendChild(document.createElement('br'));
    div.appendChild(botao);
  }

  return div;
}

// Cria todos os marcadores
const marcadoresRestaurantes = estabelecimentos.map(([lat, lng, nome]) => {
  const categoria = categoriaDe(nome);
  const fechado = estaAberto(nome) === false;

  const marcador = L.marker([lat, lng], {
    icon: criarIconeRestaurante(categoria, fechado),
    title: nome
  }).addTo(map);

  marcador.dados = { lat, lng, nome, categoria, fechado, rota: null, distanciaFora: null };
  marcador.bindPopup(montarPopup);
  return marcador;
});

// A cada minuto, confere quem abriu ou fechou e troca a cor do ícone
function atualizarAbertos() {
  marcadoresRestaurantes.forEach(marcador => {
    const fechado = estaAberto(marcador.dados.nome) === false;
    if (fechado !== marcador.dados.fechado) {
      marcador.dados.fechado = fechado;
      marcador.setIcon(criarIconeRestaurante(marcador.dados.categoria, fechado));
    }
  });
}
setInterval(atualizarAbertos, 60 * 1000);
