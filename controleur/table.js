"use strict";
if (gestionTable === undefined) {
    class GestionTable {
        //* ------- INIT ---------/
        // On cache les message d'erreur et affiche la liste trié par num_interv par défaut
        init() {
            filtre.hideNoResult();
            this.remplirTable();
        }
        // ?------- Permet de remplir le "tbody" voulue avec la liste qu'on veut ---------/
        remplirTable(where = '', order = 'ORDER BY date_interv DESC', select = '', tbody = document.querySelector('[id=tbody]'), listeBase = []) {
            ViderAllChild(tbody);
            let maliste;
            if (listeBase.length === 0) {
                maliste = dataTable.listAll(where, order, select);
            }
            else
                maliste = listeBase;
            if (maliste.length === 0) {
                return filtre.showNoResult();
            }
            filtre.hideNoResult();
            for (let i = 0; i <= maliste.length - 1; i++) {
                let str = Object.values(maliste[i]);
                let tb = tbody;
                let tr = document.createElement('tr');
                let id = `tr${str[0]}`;
                if (tbody === document.querySelector('[id=tbody]')) {
                    tr.setAttribute('class', 'Selection_Interv');
                }
                else {
                    tr.setAttribute('class', 'Selection_Prest');
                }
                tr.setAttribute('id', id);
                tb.appendChild(tr);
                // Ajout sous forme de TD de chaque valeur de chaque ligne de la requete
                for (let y = 0; y <= str.length - 1; y++) {
                    let td = document.createElement('td');
                    td.innerHTML = String(str[y]);
                    tr.appendChild(td);
                }
            }
            // On actualise le selecteur de la liste
            selectIntervActu();
        }
        //* ------- Selection ---------/
        // Select "tr"
        selectInterv(tr) {
            let previousSelect = document.querySelector('.selection');
            if (previousSelect !== null && previousSelect !== undefined) {
                previousSelect.classList.remove('selection');
            }
            tr.classList.add('selection');
            afficherInfo.rowSelector();
        }
    }
    var gestionTable = new GestionTable();
}
setTimeout(() => { gestionTable.init(); }, 80);
// Selector intervention Actualisé
function selectIntervActu() {
    (document.querySelectorAll('.Selection_Interv')).forEach((element) => {
        element.addEventListener('click', (e) => {
            gestionTable.selectInterv(element);
        });
    });
}
// ? gérer les erreurs d'api
window.addEventListener('error', () => {
    location.reload();
});
let bouton = document.querySelector('[id=Bouton_interv]');
//# sourceMappingURL=Table.js.map