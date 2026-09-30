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
  // "Baluarte Mini-Market 24h": { todos: "00:00-24:00" },
  // "Esconderijo Bar & Petiscaria": { todos: "17:00-01:00", sex: "17:00-03:00", sab: "17:00-03:00" },

  // JANGA
  "Crispy Chicken / Rainha da Pizza / Click Pizza": {todos: "16:30-22:45", ter: "fechado"},
  "Tropical Comedoria": {todos: "16:00-23:30"},
  "Hamburgrill": {todos: "18:00-23:00"},
  "J Mix Janga": {todos: "15:00-22:00"},
  "Delikata": {todos: "11:00-18:45", dom: "13:00-17:45"},
  "Kyoto Sushi / Sushi Prime": {todos: "11:00-23:59"},
  "Super Lanches": {todos: "17:30-22:59"},
  "Dogueria 1111": {todos: "16:15-23:15", qua: "fechado"},
  "Komu Sushi / Mini Mundo": {todos: "17:00-23:00"},
  "Churrascaria Tempero Goiano": {todos: "11:00-15:30", dom: "fechado"},
  "Restaurante Flor do Janga": {todos: "11:00-15:00", dom: "fechado"},
  "Buu Creams": {todos: "10:00-23:59"},
  "Quero + Dog": {todos: "17:30-23:30"},
  "Quero + Pizza": {todos: "17:30-23:30"},
  "I9 Burger": {seg: "fechado", ter: "fechado", todos: "18:00-22:50"},
  "Taiyang": {todos: "10:30-22:30"},
  "Dona Florinda": {todos: "11:00-15:00"},
  "Amigos Pizza": {todos: "17:00-23:59", qua: "fechado"},
  "Frosty Sorvetes Janga": {todos: "09:15-20:45"},
  "Baluarte Mini-Market 24h": {todos: "00:00-24:00"},
  "Seu Coxa": {todos: "14:00-22:45", seg: "fechado"},
  "A Fábrica Pizzas": {todos: "17:00-23:15"},
  "Galeto do Rafa / Medeiros Pizza": {seg: "fechado", ter: "fechado", qua: "fechado", todos: "09:00-15:30"},
  "NB House Burguer": {dom: "fechado", seg: "fechado", ter: "fechado", qua: "18:00-01:00", qui: "17:00-23:59", sex: "17:00-03:00", sab: "15:45-23:59"},
  "Esfiharia Shalom": {seg: "fechado", todos: "18:00-22:30"},
  "Xaxando": {todos: "11:00-18:30", dom: "11:00-16:00"},
  "Delícias da Elô": {todos: "11:00-23:00", dom: "18:00-23:00"},
  "Lá Portella Pizzaria": {todos: "17:00-23:00", seg: "fechado"},
  "Caldinho da Sogra Bar e Comedoria": {seg: "fechado", ter: "11:00-15:30", qua: "11:00-15:30", qui: "11:00-15:30", sex: "11:00-22:00", sab: "11:00-22:00", dom: "11:00-21:00"},
  "Pizza Pires": {seg: "17:00-01:00", ter: "17:00-23:59", qua: "17:00-21:00", qui: "17:00-01:00", sex: "fechado", sab: "17:00-01:00", dom: "fechado"},
  "Kin Sushi": {seg: "fechado", ter: "18:00-22:00", todos: "11:00-14:30, 18:00-22:00"},
  "King Tapioca Janga": {todos: "17:30-21:45", qua: "fechado"},
  "Duofeiojadaria": {todos: "fechado", sab: "10:00-16:00", dom: "09:30-16:50"},
  "Hapoke Janga": {todos: "11:00-15:00, 17:00-22:00"},

  // PAU AMARELO
  "Donna Miss": {todos: "fechado", qua: "09:00-23:00", sex: "09:00-23:00", sab: "11:00-23:00", dom: "09:00-22:00"},
  "Recanto Oriental": {todos: "18:00-23:59"},
  "JR Lanches": {seg: "fechado", ter: "fechado", qua: "18:00-23:30", qui: "17:00-23:30", sex: "17:15-23:15", sab: "17:00-23:30", dom: "17:50-23:30"},
  "Tropical Comedoria (Almoço)": {todos: "10:00-14:30"},
  "Matutu's Burguer": {todos: "19:00-03:00", ter: "fechado"},
  "Roots Comedoria - Comida Brasileira": {seg: "fechado", todos: "10:30-16:00"},
  "Profeta Burger": {seg: "fechado", todos: "17:00-23:30", sab: "11:00-15:00", dom: "11:00-15:00"},
  "D'gustare Delivery": {seg: "fechado", ter: "fechado", qua: "18:00-03:00", qui: "18:00-03:00", sex: "19:30-04:00", sab: "11:00-03:30", dom: "10:30-04:00"},
  "Sabor Nordestino": {seg: "11:00-15:00", ter: "11:42-15:00", qua: "11:10-15:00", todos: "fechado"},
  "Lice Doces Encantados": {todos: "13:30-20:30", dom: "fechado"},
  "Brownies, Bolos e Sobremesas Airla & Dodô": {todos: "08:00-23:00"},

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
