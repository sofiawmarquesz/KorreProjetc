// ============================
// 🕒 HORÁRIOS DE FUNCIONAMENTO
// ============================
// Use o nome EXATO do restaurante, igual ao de estabelecimentos.js.
//
// Dias: dom, seg, ter, qua, qui, sex, sab
// "todos" vale para qualquer dia que não estiver escrito separadamente.
//
// Formatos aceitos:
//   "18:00-23:30"                → um horário
//   "11:00-15:00, 18:00-23:00"   → dois turnos no mesmo dia
//   "18:00-02:00"                → passa da meia-noite (funciona normalmente)
//   "fechado"                    → não abre nesse dia
//
// Restaurante SEM horário cadastrado aparece colorido (considerado aberto).

const HORARIOS = {

  // Exemplos — apague as barras "//" e ajuste para usar:
  // "Roots Comedoria - Comida Brasileira": { todos: "11:00-15:00", dom: "fechado" },
  "Comedoria O Guloso": {todos: "16:30-22:45"},
  "Donna Miss": {seg: "fechado", ter: "11:00-22:00", qua: "09:00-23:00", qui: "fechado", sex: "09:00-23:00", sab: "11:00-23:00", dom: "09:00-22:00"},
  
  "O Lenhador": {todos: "fechado", seg: "09:25-17:00", dom: "09:20-16:00"},
  "Dona do Sabor": {todos: "11:00-22:00"},
  "Zé Coxinha": {todos: "11:00-22:00"},
  "Recanto Oriental": {todos: "11:00-22:00"},
  "Papi Burger": {todos: "11:00-22:00"},
  "Crispy Chicken / Rainha da Pizza / Click Pizza": {todos: "11:00-22:00"},
  "Oriental Sushi": {todos: "11:00-22:00"},
  "JR Lanches": {todos: "11:00-22:00"},
  "Tropical Comedoria": {todos: "11:00-22:00"},
  "Hamburgrill": {todos: "11:00-22:00"},
  "Barriga Cheia": {todos: "11:00-22:00"},
  "J Mix Janga": {todos: "11:00-22:00"},
  "Delikata": {todos: "11:00-22:00"},
  "Marrom Glacê": {todos: "11:00-22:00"},
  "RS Galetos": {todos: "11:00-22:00"},
  "Kyoto Sushi / Sushi Prime": {todos: "11:00-22:00"},
  "Rainha do Yaksoba / A Chinesinha": {todos: "11:00-22:00"},
  "Super Lanches": {todos: "11:00-22:00"},
  "Dogueria 1111": {todos: "11:00-22:00"},
  "ComeKone Temakeria": {todos: "11:00-22:00"},
  "Komu Sushi / Mini Mundo": {todos: "11:00-22:00"},
  "Churrascaria Tempero Goiano": {todos: "11:00-22:00"},
  "Restaurante Flor do Janga": {todos: "11:00-22:00"},
  "Buu Creams": {todos: "11:00-22:00"},
  "Chellys Burger": {todos: "11:00-22:00"},
  "Seu Parmê": {todos: "11:00-22:00"},
  "Joe Sushi": {todos: "11:00-22:00"},
  "Ootiima Pizza": {todos: "11:00-22:00"},
  "Churrascaria do Gaúcho em Casa": {todos: "11:00-22:00"},
  "Quero + Dog": {todos: "11:00-22:00"},
  "Quero + Pizza": {todos: "11:00-22:00"},
  "I9 Burger": {todos: "11:00-22:00"},
  "Pizzarella": {todos: "11:00-22:00"},
  "Esconderijo Bar & Petiscaria": {todos: "11:00-22:00"},
  "Taiyang": {todos: "11:00-22:00"},
  "Dona Florinda": {todos: "11:00-22:00"},
  "Super Burguer": {todos: "11:00-22:00"},
  "Carioca Burger": {todos: "11:00-22:00"},
  "Kanan Sushi / Sushi Abusado": {todos: "11:00-22:00"},
  "Vaca Burguer": {todos: "11:00-22:00"},
  "Fina Farina Rio Doce": {todos: "11:00-22:00"},
  "Papinhos Burguer": {todos: "11:00-22:00"},
  "Amigos Pizza": {todos: "11:00-22:00"},
  "X Pizza Food Paulista": {todos: "11:00-22:00"},
  "Frosty Sorvetes Janga": {todos: "11:00-22:00"},
  "Frosty Sorvetes Av. Brasil": {todos: "11:00-22:00"},
  "Frosty Sorvetes Novo Atacarejo": {todos: "11:00-22:00"},
  "Baluarte Mini-Market 24h": {todos: "11:00-22:00"},
  "Seu Coxa": {todos: "11:00-22:00"},
  "A Fábrica Pizzas": {todos: "11:00-22:00"},
  "Recanto do Bob": {todos: "11:00-22:00"},
  "Galeto do Rafa / Medeiros Pizza": {todos: "11:00-22:00"},
  "NB House Burguer": {todos: "11:00-22:00"},
  "Lucy Santos Confeitaria Artesanal": {todos: "11:00-22:00"},
  "Esfiharia Shalom": {todos: "11:00-22:00"},
  "Xaxando": {todos: "11:00-22:00"},
  "Delícias da Elô": {todos: "11:00-22:00"},
  "Nosso Açaí": {todos: "11:00-22:00"},
  "Coronel Lanches": {todos: "11:00-22:00"},
  "Point do Yakisoba": {todos: "11:00-22:00"},
  "Lá Portella Pizzaria": {todos: "11:00-22:00"},
  "Tropical Comedoria (Almoço)": {todos: "11:00-22:00"},
  "Caldinho da Sogra Bar e Comedoria": {todos: "11:00-22:00"},
  "Almoço da Dora": {todos: "11:00-22:00"},
  "Doces Arretados": {todos: "11:00-22:00"},
  "Matutu's Burguer": {todos: "11:00-22:00"},
  "Roots Comedoria - Comida Brasileira": {todos: "11:00-22:00"},
  "Rainha da Feijoada": {todos: "11:00-22:00"},
  "Marmitex da Quel": {todos: "11:00-22:00"},
  "Combos 90 Graus": {todos: "11:00-22:00"},
  "Sabor & Arte Hamburgueria": {todos: "11:00-22:00"},
  "JB Caldinho": {todos: "11:00-22:00"},
  "D'gustare Delivery": {todos: "11:00-22:00"},
  "Kin Sushi": {todos: "11:00-22:00"},
  "Sabores Pernambucanos": {todos: "11:00-22:00"},
  "Marmita": {todos: "11:00-22:00"},
  "Sorvetes Frosty Maranguape II": {todos: "11:00-22:00"},
  "Sabor Nordestino": {todos: "11:00-22:00"},
  "Pizza Pires": {todos: "11:00-22:00"},
  "Lice Doces Encantados": {todos: "11:00-22:00"},
  "Mister Pizzaria & Restaurante": {todos: "11:00-22:00"},
  "Coxinha de Batata Bom de Minas": {todos: "11:00-22:00"},
  "Profeta Burger": {todos: "11:00-22:00"},
  "King Tapioca Janga": {todos: "11:00-22:00"},
  "Brownies, Bolos e Sobremesas Airla & Dodô": {todos: "11:00-22:00"},
  "Le Sushi": {todos: "11:00-22:00"},
  "Paraíso Açaí e Lanche": {todos: "11:00-22:00"},
  "Duofeiojadaria": {todos: "11:00-22:00"},
  "Big Big Cachorrão": {todos: "11:00-22:00"},
  "O Lazer Pizzaria e Churrascaria": {todos: "11:00-22:00"},
  "Point do Pastel": {todos: "11:00-22:00"},
  "Índios Comedoria": {todos: "11:00-22:00"},
  "Feijoada da Casa": {todos: "11:00-22:00"},
  "Hapoke Janga": {todos: "11:00-22:00"},
  "Marmitas de Mainha": {todos: "11:00-22:00"},
  "Borges Burguer": {todos: "11:00-22:00"},
  "Maria's Confeitaria Gourmet": {todos: "11:00-22:00"},

  // "Baluarte Mini-Market 24h": { todos: "00:00-24:00" },
  // "Esconderijo Bar & Petiscaria": { todos: "17:00-01:00", sex: "17:00-03:00", sab: "17:00-03:00" },

};

// ---- Funções (não precisa mexer) ----

const DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

// "18:30" → 1110 (minutos desde a meia-noite)
function paraMinutos(hora) {
  const [h, m] = hora.trim().split(':').map(Number);
  return h * 60 + (m || 0);
}

// Faixas de horário de um dia: [[inicio, fim], ...] em minutos
function faixasDoDia(horario, indiceDia) {
  const texto = horario[DIAS[indiceDia]] ?? horario.todos ?? 'fechado';
  if (texto.trim().toLowerCase() === 'fechado') return [];

  return texto.split(',').map(faixa => {
    const [inicio, fim] = faixa.split('-');
    return [paraMinutos(inicio), paraMinutos(fim)];
  });
}

// true = aberto, false = fechado, null = sem horário cadastrado
function estaAberto(nome, agora = new Date()) {
  const horario = HORARIOS[nome];
  if (!horario) return null;

  const hoje = agora.getDay();
  const ontem = (hoje + 6) % 7;
  const minutos = agora.getHours() * 60 + agora.getMinutes();

  // Turnos de hoje
  for (const [inicio, fim] of faixasDoDia(horario, hoje)) {
    if (inicio < fim  && minutos >= inicio && minutos < fim) return true;  // turno normal
    if (inicio > fim  && minutos >= inicio) return true;                   // vira a noite
  }

  // Turnos de ontem que passaram da meia-noite (ex.: 18:00-02:00 às 01:00)
  for (const [inicio, fim] of faixasDoDia(horario, ontem)) {
    if (inicio > fim && minutos < fim) return true;
  }

  return false;
}

// Texto do horário de hoje, para mostrar no balão (ex.: "18:00-23:30")
function horarioDeHoje(nome, agora = new Date()) {
  const horario = HORARIOS[nome];
  if (!horario) return null;
  return horario[DIAS[agora.getDay()]] ?? horario.todos ?? 'fechado';
}
