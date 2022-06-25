"use strict";
if (deleteInterv === undefined) {
    class Deleteinterv {
        confirmer_supp() {
            divPage.classList.add('opacity');
            divPage.classList.add('unselectable');
            divPage.style.pointerEvents = 'none';
            divPopUp.classList.remove('hide');
        }
        end_supp() {
            divPage.classList.remove('unselectable');
            divPage.classList.remove('opacity');
            divPage.removeAttribute('style');
            divPopUp.classList.add('hide');
        }
        supprimer_interv() {
            dataDelete.deleteInterv();
            this.end_supp();
            gestionTable.remplirTable();
            afficherInfo.viderDetailHidden();
            rowSelected = null;
        }
    }
    var deleteInterv = new Deleteinterv();
}
let divPopUp = document.querySelector('[id=pop_up]');
let divPage = document.querySelector('[id=all_page]');
document.querySelector('[id=Btn_Supprimer]').addEventListener('click', () => {
    if (rowSelected !== null && rowSelected !== undefined) {
        deleteInterv.confirmer_supp();
    }
});
document.querySelector('[id=Btn_Valider_pop_up]').addEventListener('click', () => {
    deleteInterv.supprimer_interv();
});
document.querySelector('[id=Btn_Annuler_pop_up]').addEventListener('click', () => {
    deleteInterv.end_supp();
});
// pointer-events: none;
//# sourceMappingURL=Intervention_supprimer.js.map