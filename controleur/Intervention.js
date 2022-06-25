"use strict";
//* ----------------------------------------------------------------------------/
//* ----------------------------------VARIABLE----------------------------------/
//* ---------------------------------------------------------------------------*/
// Si pas de ligne selectionnée
let numInterv;
// Tab d'id d'info à récupérer/ afficher,
// ! l'ordre est important
const tabId = ['date_interv', 'heure_interv', 'num_interv', 'objet_interv', 'obs_interv', 'num_cont', 'date_cont', 'ville_site', 'num_cli', 'nom_cli', 'mel_cli', 'tel_cli', 'num_cons', 'nom_cons', 'tel_cons'];
// Facile pour récup id de row select
let rowSelected;
const divDetail = document.querySelector('[id=Detail_Interv]');
let totalHT = 0;
// Pour modif le titre
const titre = document.querySelector('[id=Intervention_Titre]');
//# sourceMappingURL=Intervention.js.map