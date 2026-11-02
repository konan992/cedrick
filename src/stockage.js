// Lire et écrire les données dans un fichier JSON. À coder EN PREMIER : le menu en a besoin pour démarrer.
// Fiche : fiches/2-donnees-json.md · Vérifier : npm run test:stockage
import { readFile, writeFile } from 'node:fs/promises';

// Lit le fichier JSON et renvoie le tableau qu'il contient.
// Si le fichier n'existe pas ou n'est pas du JSON valide, laissez l'erreur remonter : le menu l'affichera.
export async function chargerJson(chemin) {
 // throw new Error('TODO : coder chargerJson dans src/stockage.js');
 const contenu = await readFile(chemin,"utf-8")
 const donnees = JSON.parse(contenu)
 return donnees 
}

// Écrit le tableau dans le fichier, au format JSON indenté de 2 espaces.
export async function enregistrerJson(chemin, enregistrements) {
  //throw new Error('TODO : coder enregistrerJson dans src/stockage.js');
  const contenu = JSON.stringify(enregistrements,null,2)
  await writeFile(chemin,contenu,"utf-8")
}
