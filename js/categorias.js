// ===============================
// 🏷️ CATEGORIAS DOS RESTAURANTES
// ===============================
// A categoria é descoberta pelo NOME do restaurante, usando palavras-chave.
// A primeira regra que combinar vence, então a ORDEM importa
// (ex.: "Galeto do Rafa / Medeiros Pizza" cai em pizza porque pizza vem antes).

const CATEGORIAS = {
  sorvete:    { emoji: '🍦', cor: '#D4537E', nome: 'Sorvete e açaí',   palavras: /frosty|sorvet|a[çc]a[íi]|creams/i },
  oriental:   { emoji: '🍣', cor: '#1D9E75', nome: 'Oriental',         palavras: /sushi|temaker|oriental|kyoto|poke|yakisoba|yaksoba|chines|taiyang/i },
  pizza:      { emoji: '🍕', cor: '#E24B4A', nome: 'Pizzaria',         palavras: /pizz|farina/i },
  doces:      { emoji: '🧁', cor: '#993556', nome: 'Doces e bolos',    palavras: /doce|confeitaria|brownie|bolo|glac[êe]|sobremesa|del[íi]cias/i },
  hamburguer: { emoji: '🍔', cor: '#D85A30', nome: 'Hambúrguer',       palavras: /burg|grill/i },
  cachorro:   { emoji: '🌭', cor: '#BA7517', nome: 'Cachorro-quente',  palavras: /dog|cachorr/i },
  frango:     { emoji: '🍗', cor: '#993C1D', nome: 'Frango e churrasco', palavras: /galet|churrasc|chicken|coxa\b/i },
  lanches:    { emoji: '🥪', cor: '#854F0B', nome: 'Lanches e salgados', palavras: /lanche|pastel|tapioca|coxinha|esfih|mix/i },
  caseira:    { emoji: '🍛', cor: '#639922', nome: 'Comida caseira',   palavras: /comedoria|marmit|almo[çc]o|feijo|sabor|restaurante|caldinho|mainha|nordestino|pernambucan|parm[êe]|barriga/i },
  bar:        { emoji: '🍺', cor: '#633806', nome: 'Bar e petiscos',   palavras: /\bbar\b|petisc/i },
  mercado:    { emoji: '🛒', cor: '#0F6E56', nome: 'Mercado',          palavras: /market|mercad/i },
  outros:     { emoji: '🍽️', cor: '#534AB7', nome: 'Restaurante',      palavras: null }
};

// ✏️ Correções manuais: para quando o nome não diz o tipo de comida,
// ou a regra automática errou. Use o nome EXATO de estabelecimentos.js.
const CATEGORIA_MANUAL = {
  "Duofeiojadaria": "caseira",
  "Delikata": "doces",
  "Xaxando": "caseira",
  "Recanto do Bob": "pizza",
  
};

// Devolve a chave da categoria de um restaurante (ex.: 'pizza')
function categoriaDe(nome) {
  if (CATEGORIA_MANUAL[nome]) return CATEGORIA_MANUAL[nome];

  for (const [chave, cat] of Object.entries(CATEGORIAS)) {
    if (cat.palavras && cat.palavras.test(nome)) return chave;
  }
  return 'outros';
}
