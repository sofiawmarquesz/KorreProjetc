// ============================
// ⚙️ CONFIGURAÇÕES DO PROJETO
// ============================
// Este é o arquivo onde ficam as "chaves" e ajustes gerais.

// 🔑 Chave da API do OpenRouteService (openrouteservice.org → Dashboard → Tokens)
const CHAVE_ORS = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijc0NzIzOTZkMWU2ZDQzZDlhYmJhODU4YjNiYWI5MDAwIiwiaCI6Im11cm11cjY0In0=';

// Perfil de rota. 'driving-car' segue as regras de trânsito
// (sentido das vias, retornos, conversões proibidas).
const PERFIL_ROTA = 'driving-car';

// 📏 Raio de entrega em metros (medido pelo trajeto, não em linha reta)
const RAIO = 2750;

// Só recalcula as distâncias quando você se mover mais que isso (em metros).
// Evita gastar requisições da API a cada pequena atualização do GPS.
const DESLOCAMENTO_MINIMO = 150;
