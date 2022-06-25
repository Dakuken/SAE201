"use strict";
if (filtre === undefined) {
    class Filtre {
        filtreBase(element, where) {
            this.hideNoResult();
            if (element.value !== '') {
                gestionTable.remplirTable(where);
            }
            else {
                gestionTable.remplirTable();
            }
        }
        filtreDate(element, element2) {
            this.hideNoResult();
            let min;
            let max;
            if (element.value !== '' && element2.value !== '') {
                max = (element.value > element2.value) ? element.value : element2.value;
                min = (element.value > element2.value) ? element2.value : element.value;
                let where = ` AND date_interv <= '${max}' AND date_interv >= '${min}'`;
                gestionTable.remplirTable(where);
            }
        }
        //* ------- Error ---------/
        hideNoResult() {
            let cache = document.querySelector('[id=NoResult]');
            cache.style.display = 'none';
        }
        showNoResult() {
            let cache = document.querySelector('[id=NoResult]');
            cache.style.display = '';
        }
    }
    var filtre = new Filtre();
}
class FiltreSelector {
    constructor(btnid, inputid, condition) {
        this.inputid = inputid;
        this.btnid = btnid;
        this.convToSelectorBTN(btnid);
        this.convToSelectorINPUT(inputid);
        this.conidtion = condition;
    }
    convToSelectorBTN(id) {
        return this.btnquery = document.querySelector(`[id=${id}]`);
    }
    convToSelectorINPUT(id) {
        return this.inputquery = document.querySelector(`[id=${id}]`);
    }
}
let filtreSelectors = [new FiltreSelector('Btn_Recherche_Interv', 'Input_Interv', 'intervention.num_interv'),
    new FiltreSelector('Btn_Recherche_Contrat', 'Input_Contrat', 'contrat.num_cont'),
    new FiltreSelector('Btn_Recherche_Conseiller', 'Input_Conseiller', 'conseiller.num_cons'),
    new FiltreSelector('Btn_Recherche_Conseiller', 'Input_Conseiller', 'conseiller.num_cons')];
filtreSelectors.forEach((element) => {
    element.btnquery.addEventListener('click', () => {
        afficherInfo.viderDetailHidden();
        filtre.filtreBase(element.inputquery, ` AND ${element.conidtion} = '${element.inputquery.value}'`);
    });
});
filtreSelectors.forEach((element) => {
    element.inputquery.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            afficherInfo.viderDetailHidden();
            filtre.filtreBase(element.inputquery, ` AND ${element.conidtion} = '${element.inputquery.value}'`);
        }
    });
});
//* ------- Filtre Periode ---------/
let btnPeriode = document.querySelector('[id=Btn_Recherche_Periode]');
// ?------- Filtre Bouton ---------/
btnPeriode.addEventListener('click', () => {
    afficherInfo.viderDetailHidden(); //! à laisser au dessus
    filtre.filtreDate(document.querySelector('[id=Input_Periode1]'), document.querySelector('[id=Input_Periode2]'));
});
//* ------- Filtre Client ---------/
let btnClient = document.querySelector('[id=Btn_Recherche_Client]');
let inputNomClient = document.querySelector('[id=Input_Nom_client]');
let inputClient = document.querySelector('[id=Input_Numero_client]');
// ?------- Filtre Bouton ---------/
btnClient.addEventListener('click', () => {
    afficherInfo.viderDetailHidden(); //! à laisser au dessus
    // On utilise LIKE
    let valeur = inputClient;
    let where = ' AND ';
    // Si le nom client est remplie
    if (inputNomClient.value !== '') {
        // Si le num client est remplie
        if (inputClient.value !== '') {
            where += ` (client.nom_cli  LIKE '%${inputNomClient.value}%' OR client.num_cli LIKE '%${inputClient.value}%') `;
        }
        else {
            valeur = inputNomClient;
            where += `client.nom_cli  LIKE '%${inputNomClient.value}%' `;
        }
    }
    else if (inputClient.value !== '') {
        valeur = inputClient;
        where += `client.num_cli  LIKE '%${inputClient.value}%' `;
    }
    filtre.filtreBase(valeur, where);
});
//# sourceMappingURL=Filtre.js.map