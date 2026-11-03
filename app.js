// Carnet d'observation des sols — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
// Carnet d'observation des sols — point d'entrée : le menu.
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { HUMIDITES, TEXTURES, ajouterObservation, formaterObservation, listerObservations, trouverParId } from './src/registre.js';
import { filtrerParParcelle, filtrerParTexture, trierParPh } from './src/recherche.js';
import { SEUIL_PH_A_DISCUTER, compterParTexture, phMinMax, pointsADiscuter } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/observations.json';

function afficherAccueil() {
    console.log('========================================');
    console.log("CARNET D'OBSERVATION DES SOLS");
    console.log('Ferme pédagogique');
    console.log('========================================');
}

function afficherMenu() {
    console.log('\nMENU');
    console.log('1. Ajouter une observation');
    console.log('2. Lister les observations');
    console.log('3. Rechercher (point, parcelle, texture)');
    console.log('4. Trier par pH');
    console.log('5. Synthèse des observations');
    console.log('0. Quitter');
}

async function chargerRegistre() {
    try {
        const observations = await chargerJson(FICHIER_DONNEES);
        console.log(`${observations.length} observation(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
        return observations;
    } catch (erreur) {
        console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le registre démarre vide.`);
        return [];
    }
}

async function ajouter(observations) {
    console.log('\n--- Ajouter une observation ---');
    const id = await demander('Identifiant du point (ex: S04) : ');
    if (id === null) return;
    
    const parcelle = await demander('Parcelle (ex: P2) : ');
    if (parcelle === null) return;
    
    const texture = await demander(`Texture (${TEXTURES.join(', ')}) : `);
    if (texture === null) return;
    
    const pH = await demander('pH (0 à 14) : ');
    if (pH === null) return;
    
    const etatHumidite = await demander(`État d'humidité (${HUMIDITES.join(', ')}) : `);
    if (etatHumidite === null) return;

    const saisie = {
        id: id.trim(),
        parcelle: parcelle.trim(),
        texture: texture.toLowerCase().trim(),
        pH: pH,
        etatHumidite: etatHumidite.toLowerCase().trim()
    };

    const erreurs = ajouterObservation(observations, saisie);
    if (erreurs.length === 0) {
        await enregistrerJson(FICHIER_DONNEES, observations);
        console.log(`Observation ${saisie.id} ajoutée avec succès. Le registre compte ${observations.length} observation(s).`);
    } else {
        console.log('Observation refusée :');
        for (const erreur of erreurs) {
            console.log(` - ${erreur}`);
        }
    }
}

function lister(observations) {
    console.log('\n--- Liste des observations ---');
    console.log(listerObservations(observations));
}

async function rechercher(observations) {
    console.log('\n--- Rechercher ---');
    console.log('1. Par identifiant de point');
    console.log('2. Par parcelle');
    console.log('3. Par texture');
    
    const sousChoix = await demander('Votre choix : ');
    if (sousChoix === null) return;

    if (sousChoix === '1') {
        const idSaisi = await demander('Identifiant : ');
        if (idSaisi === null) return;
        const trouve = trouverParId(observations, idSaisi.trim());
        if (trouve) {
            console.log('\n1 observation trouvée :');
            console.log(formaterObservation(trouve));
        } else {
            console.log(`Aucune observation trouvée pour l'identifiant "${idSaisi}".`);
        }
    } else if (sousChoix === '2') {
        const parcelleSaisie = await demander('Parcelle : ');
        if (parcelleSaisie === null) return;
        const trouvees = filtrerParParcelle(observations, parcelleSaisie.trim());
        console.log(`\n${trouvees.length} observation(s) trouvée(s) pour la parcelle "${parcelleSaisie}" :`);
        console.log(listerObservations(trouvees));
    } else if (sousChoix === '3') {
        const textureSaisie = await demander(`Texture (${TEXTURES.join(', ')}) : `);
        if (textureSaisie === null) return;
        const trouvees = filtrerParTexture(observations, textureSaisie.toLowerCase().trim());
        console.log(`\n${trouvees.length} observation(s) trouvée(s) pour la texture "${textureSaisie}" :`);
        console.log(listerObservations(trouvees));
    } else {
        console.log('Choix inconnu, retour au menu.');
    }
}

async function trier(observations) {
    console.log('\n--- Trier ---');
    console.log('1. Par pH croissant');
    const sousChoix = await demander('Votre choix : ');
    if (sousChoix === null) return;

    if (sousChoix === '1') {
        const triees = trierParPh(observations);
        console.log('\n--- Observations triées par pH ---');
        console.log(listerObservations(triees));
    } else {
        console.log('Choix inconnu, retour au menu.');
    }
}

function synthese(observations) {
    console.log('\n--- Synthèse des observations ---');
    console.log(`Nombre total d'observations : ${observations.length}`);
    
    const minMax = phMinMax(observations);
    if (minMax === null) {
        console.log('pH minimum et maximum : aucune donnée[cite: 3].');
    } else {
        console.log(`- pH Minimum : ${minMax.min}[cite: 3]`);
        console.log(`- pH Maximum : ${minMax.max}[cite: 3]`);
    }

    console.log('- Comptage par texture :');
    const comptage = compterParTexture(observations);
    for (const [texture, count] of Object.entries(comptage)) {
        console.log(`  * ${texture} : ${count}`);
    }

    const aDiscuter = pointsADiscuter(observations);
    console.log(`- Points à discuter (pH < ${SEUIL_PH_A_DISCUTER}) : ${aDiscuter.length > 0 ? aDiscuter.map(o => o.id).join(', ') : 'Aucun'}`);
}

async function main() {
    ouvrirSaisie();
    afficherAccueil();
    const observations = await chargerRegistre();

    let continuer = true;
    while (continuer) {
        afficherMenu();
        const choix = await demander('Votre choix : ');
        if (choix === null) {
            break;
        }

        try {
            switch (choix.trim()) {
                case '1':
                    await ajouter(observations);
                    break;
                case '2':
                    lister(observations);
                    break;
                case '3':
                    await rechercher(observations);
                    break;
                case '4':
                    await trier(observations);
                    break;
                case '5':
                    synthese(observations);
                    break;
                case '0':
                    console.log('Au revoir !');
                    continuer = false;
                    break;
                default:
                    console.log(`Choix inconnu : "${choix}". Tapez un chiffre du menu.`);
                    break;
            }
        } catch (erreur) {
            if (erreur.message.startsWith('TODO')) {
                console.log(`À compléter : ${erreur.message}`);
            } else {
                console.log(`Erreur inattendue : ${erreur.message}`);
            }
        }
    }
    fermerSaisie();
} 

main();