// Rechercher et trier les observations.
// Fiche : fiches/4-rechercher-trier.md · Vérifier : npm run test:recherche

// Renvoie un NOUVEAU tableau avec les observations de cette parcelle (éventuellement vide).
export function filtrerParParcelle(observations, parcelle) {
  //throw new Error('TODO : coder filtrerParParcelle dans src/recherche.js');
  return observations.filter((obs) => obs.parcelle === parcelle);
}

// Renvoie un NOUVEAU tableau avec les observations de cette texture (éventuellement vide).
export function filtrerParTexture(observations, texture) {
  //throw new Error('TODO : coder filtrerParTexture dans src/recherche.js');
  return observations.filter((obs) => obs.texture === texture);
}

// Renvoie une COPIE triée par pH croissant, avec un comparateur numérique.
// Le tableau reçu ne doit pas changer d'ordre. Deux observations de même pH gardent leur ordre d'origine.
export function trierParPh(observations) {
  //throw new Error('TODO : coder trierParPh dans src/recherche.js');
  return [...observations].sort((a, b) => a.pH - b.pH)
}
