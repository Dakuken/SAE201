//* ----------------------------------------------------------------------------/
//* ----------------------------------VARIABLE----------------------------------/
//* ---------------------------------------------------------------------------*/
// Si pas de ligne selectionnée

let numInterv: string;

// Tab d'id d'info à récupérer/ afficher,
// ! l'ordre est important
const tabId = ['date_interv', 'heure_interv', 'num_interv', 'objet_interv', 'obs_interv', 'num_cont', 'date_cont', 'ville_site', 'num_cli', 'nom_cli', 'mel_cli', 'tel_cli', 'num_cons', 'nom_cons', 'tel_cons'];

// Facile pour récup id de row select
let rowSelected: HTMLTableRowElement;

const divDetail = <HTMLDivElement>document.querySelector('[id=Detail_Interv]');
let totalHT:number = 0;
// Pour modif le titre
const titre = <HTMLParagraphElement>document.querySelector('[id=Intervention_Titre]');
