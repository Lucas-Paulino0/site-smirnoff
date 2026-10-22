// Busca da wiki: cada termo tem que ser o começo de alguma palavra do texto
// ("rei" acha "Rei Goblin", mas não "Ferreiro"). Ignora acentos e maiúsculas.

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const searchTerms = (query: string) => normalize(query).split(/\s+/).filter(Boolean);

export function matchesTerms(terms: string[], text: string) {
  if (terms.length === 0) return false;
  const words = normalize(text).split(/[^a-z0-9]+/);
  return terms.every((term) => words.some((word) => word.startsWith(term)));
}
