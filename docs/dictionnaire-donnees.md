# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | S11 |
| parcelle|surface délimité et identifiée |texte |  obligatoire (n'importe quel texte non vide)| — |P6 |
|texture |la sensation des particules du solau toucher |texte| présente dans TEXTURES | —  | limoneux |
| pH | il indique si le sol est acide ou basique|nombre |nombre entre 0 et 14 (bornes comprises) | — |5.8 |
| etatHumidite|la quantité d'eau ressebtie dans le sol |texte |présent dans HUMIDITES || —  |humide|

**Listes de valeurs autorisées** : ✏️

**Sources** : ✏️