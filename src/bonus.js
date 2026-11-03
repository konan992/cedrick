// BONUS — Pour aller plus loin. Facultatif : commencez seulement quand le socle est complet.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
// Ni pseudo-code de référence ni aide détaillée : à vous de combiner ce que vous avez appris.
// Les choix 6 et 7 du menu sont à écrire vous-même dans app.js (voir la fiche).
import { versNombre } from './outils.js';
import { trouverParId, verifierObservation } from './registre.js';
import { compterParTexture } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['parcelle', 'texture', 'pH', 'etatHumidite'];


// Supprime du carnet l'observation qui a cet identifiant.
// Renvoie l'observation supprimée, ou undefined si elle n'existe pas (le carnet ne change pas).
export function supprimerObservation(observations, id) {
  //throw new Error('TODO Bonus : coder supprimerObservation dans src/bonus.js');
  const index = observations.findIndex((obs) => obs.id === id);
  if (index === -1) {
    return undefined;
  }
  return observations.splice(index, 1)[0];
}

// Modifie UN champ d'une observation. La nouvelle valeur arrive sous forme de TEXTE et suit
// les mêmes règles qu'à l'ajout. Renvoie les erreurs : [] si la modification est faite ;
// sinon les messages, et l'observation ne change pas. Le pH modifié est enregistré comme un nombre.
// Erreurs : identifiant introuvable · champ 'id' (non modifiable) · champ absent de CHAMPS_MODIFIABLES
//           · valeur refusée par les règles de l'ajout.
export function modifierObservation(observations, id, champ, valeur) {
 // throw new Error('TODO Bonus : coder modifierObservation dans src/bonus.js');
 const obs = trouverParId(observations, id);
  if (!obs) return ["L'observation est introuvable."];

  if (champ === 'id' || !CHAMPS_MODIFIABLES.includes(champ)) {
    return [`Le champ '${champ}' n'est pas modifiable.`];
  }

  const saisieSimulee = {
    id: obs.id,
    parcelle: String(obs.parcelle),
    texture: String(obs.texture),
    pH: String(obs.pH),
    etatHumidite: String(obs.etatHumidite),
    [champ]: valeur,
  };

  const autresObservations = observations.filter((o) => o.id !== id);
  const erreurs = verifierObservation(saisieSimulee, autresObservations);
  if (erreurs.length > 0) return erreurs;

  if (champ === 'pH') {
    obs.pH = versNombre(valeur);
  } else {
    obs[champ] = valeur;
  }
  return [];
}

// Renvoie une COPIE triée par pH décroissant. Le tableau reçu ne doit pas changer d'ordre.
export function trierParPhDecroissant(observations) {
 // throw new Error('TODO Bonus : coder trierParPhDecroissant dans src/bonus.js');
 return [...observations].sort((a, b) => b.pH - a.pH)
}

// Renvoie { texture, nombre } pour la texture la plus fréquente, ou null si la liste est vide.
// En cas d'égalité, la première texture rencontrée l'emporte.
// Exemple : { texture: 'limoneux', nombre: 4 }
export function textureLaPlusFrequente(observations) {
  //throw new Error('TODO Bonus : coder textureLaPlusFrequente dans src/bonus.js');
   if (!observations || observations.length === 0) return null;
  const compteur = compterParTexture(observations);
  let maxTexture = '';
  let maxNombre = 0;

  for (const obs of observations) {
    const nb = compteur[obs.texture];
    if (nb > maxNombre) {
      maxNombre = nb;
      maxTexture = obs.texture;
    }
  }
  return { texture: maxTexture, nombre: maxNombre };
}
