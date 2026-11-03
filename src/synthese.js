// Synthèse des observations de sol.
// Fiche : fiches/5-synthese.md · Vérifier : npm run test:synthese
// Pas de moyenne de pH : son échelle est logarithmique, une moyenne simple serait trompeuse.

// Seuil pédagogique : en dessous, la valeur est « à discuter avec le coach ».
// Ce n'est ni un diagnostic ni un conseil de fertilisation.
export const SEUIL_PH_A_DISCUTER = 5.5;

// Renvoie { min, max } des pH, ou null si la liste est vide.
// Exemple : { min: 4.8, max: 7.6 }
export function phMinMax(observations) {
  //throw new Error('TODO : coder phMinMax dans src/synthese.js');
   if (!observations || observations.length === 0) {
    return null;
  }
  let min = observations[0].pH;
  let max = observations[0].pH;
  for (const obs of observations) {
    if (obs.pH < min) min = obs.pH;
    if (obs.pH > max) max = obs.pH;
  }
  return { min, max };
}

// Renvoie un objet : pour chaque texture présente, le nombre d'observations.
// Exemple : { sableux: 3, limoneux: 4, argileux: 3 }
// Liste vide : {} (un objet vide).
export function compterParTexture(observations) {
  //throw new Error('TODO : coder compterParTexture dans src/synthese.js');
   const compteur = {};
  for (const obs of observations) {
    const texture = obs.texture;
    if (compteur[texture]) {
      compteur[texture] += 1;
    } else {
      compteur[texture] = 1;
    }
  }
  return compteur;
}

// Renvoie un NOUVEAU tableau avec les observations dont le pH est STRICTEMENT inférieur au seuil.
// Exemple : pointsADiscuter(observations, 5.5) garde 5.4 mais pas 5.5.
export function pointsADiscuter(observations, seuil) {
  throw new Error('TODO : coder pointsADiscuter dans src/synthese.js');
}
