// Ajouter et lister les observations de sol.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { versNombre } from './outils.js';

// Listes fermées des classes d'exercice, validées par le coach agronomie.
export const TEXTURES = ['sableux', 'limoneux', 'argileux'];
export const HUMIDITES = ['sec', 'intermédiaire', 'humide'];

// Renvoie une ligne de texte qui décrit l'observation.
// Exemple : 'S01 | P1 | sableux | pH 5.2 | sec'
export function formaterObservation(observation) {
 // throw new Error('TODO : coder formaterObservation dans src/registre.js');
return `${observation.id} | ${observation.parcelle} | ${observation.texture} | pH ${observation.pH} | ${observation.etatHumidite}`;

}

// Renvoie un texte avec une observation par ligne (lignes séparées par '\n'),
// ou 'Aucune observation enregistrée.' si la liste est vide.
export function listerObservations(observations) {
  //throw new Error('TODO : coder listerObservations dans src/registre.js');
  if(observations.length===0){
    return 'Aucune observation enregistrée.'
  }else{
    return observations.map(formaterObservation).join('\n')
  }
}

// Renvoie l'observation qui a cet identifiant de point, ou undefined si elle n'existe pas.
export function trouverParId(observations, id) {
  //throw new Error('TODO : coder trouverParId dans src/registre.js');
 return observations.find(observation => observation.id === id)
  }

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'S11', parcelle: 'P6', texture: 'limoneux', pH: '5,8', etatHumidite: 'humide' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · parcelle obligatoire (n'importe quel texte non vide)
// · texture présente dans TEXTURES · pH nombre entre 0 et 14 (bornes comprises)
// · etatHumidite présent dans HUMIDITES. N'ajoutez aucune autre règle que celles-ci.
export function verifierObservation(saisie, observations) {
  throw new Error('TODO : coder verifierObservation dans src/registre.js');
}

// Fabrique l'observation à enregistrer à partir d'une saisie VALIDE : pH devient un nombre.
export function creerObservation(saisie) {
  throw new Error('TODO : coder creerObservation dans src/registre.js');
}

// Ajoute la saisie au carnet si elle est valide (verifierObservation, puis creerObservation).
// Renvoie les erreurs : [] si l'observation a été ajoutée ; sinon les messages, et rien n'est ajouté.
export function ajouterObservation(observations, saisie) {
  throw new Error('TODO : coder ajouterObservation dans src/registre.js');
}
