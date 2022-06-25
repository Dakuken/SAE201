"use strict";
//* ----------------------------------------------------------------------------/
//* ---------------------------------MODIFIER-----------------------------------/
//* ---------------------------------------------------------------------------*/
if (modifierInfo === undefined) {
    class ModifierInfo {
        // Actualise détail, avec num_cont,num_cons
        ChangerDetail(Parent, id) {
            // ? Valeur de l'input
            const childvalue = (Parent.firstChild).value;
            // Message d'erreur peut apparaitre
            let erreur = (document.querySelector(`[id=${id}]`).children[1]);
            if (Parent.id === 'heure_interv') {
                if (childvalue === '') {
                    document.querySelector('[id=erreurHeure]').classList.remove('hide');
                    return;
                }
                document.querySelector('[id=erreurHeure]').classList.add('hide');
                return;
            }
            if (Parent.id === 'obs_interv') {
                return;
            }
            if (erreur.id === 'erreurObjet') {
                if (childvalue === '') {
                    this.messagErreur(erreur, childvalue);
                    return;
                }
                erreur.classList.add('hide');
                return;
            }
            // Erreur si input est vide
            if (childvalue === '') {
                this.messagErreur(erreur, childvalue);
                return;
            }
            // Avoir index a partir duquel commencé a modifer cf : tabId
            let parentInListe;
            for (let i = 0; i <= tabId.length - 1; i++) {
                if (id === tabId[i]) {
                    parentInListe = i + 1;
                }
            }
            const maliste = this.newInfoListe(id, childvalue);
            console.log(erreur);
            if (maliste.length !== 0) {
                erreur.classList.add('hide');
                const values = Object.values(maliste[0]);
                for (let i = 0; i <= values.length - 1; i++) {
                    const str = values[i];
                    const child = document.querySelector(`[id=${tabId[i + parentInListe]}]`);
                    child.innerText = str;
                }
            }
            else {
                this.messagErreur(erreur, childvalue);
            }
        }
        messagErreur(selector, childvalue) {
            const { id } = selector;
            if (childvalue !== '') {
                switch (id) {
                    case 'Erreur_Cont':
                        selector.innerText = 'Attention, aucun numéro de contrat ne correspond.';
                        selector.classList.remove('hide');
                        break;
                    case 'Erreur_Cons':
                        selector.innerText = 'Attention, aucun numéro de conseiller ne correspond';
                        selector.classList.remove('hide');
                        break;
                    default: break;
                }
            }
            else {
                switch (id) {
                    case 'erreurObjet':
                        selector.innerText = "Attention, un motif d'intervention ne peut être vide";
                        selector.classList.remove('hide');
                        break;
                    case 'Erreur_Cont':
                        selector.innerText = 'Le numéro de contrat doit être renseigné.';
                        selector.classList.remove('hide');
                        break;
                    case 'Erreur_Cons':
                        selector.innerText = 'Le numéro de conseiller doit être renseigné.';
                        selector.classList.remove('hide');
                        break;
                    default: break;
                }
            }
        }
        newInfoListe(id, childvalue) {
            switch (id) {
                case 'num_cont': return dataModifDetail.newListeContrat(childvalue);
                case 'num_cons': return dataModifDetail.newListeConseiller(childvalue);
                default: break;
            }
            return [];
        }
        // Update_interv(id,childvalue)
        validerModif() {
            // let ValueOfChild:string = []
            for (let i = 0; i <= tabParentInputModif.length - 1; i++) {
                console.log(tabParentInputModif[i].id);
                if (tabParentInputModif[i].id === 'num_cont' || tabParentInputModif[i].id === 'num_cons') {
                    const childValue = this.valueOfChild(tabParentInputModif[i]);
                    const check = this.verif(tabParentInputModif[i], childValue);
                    if (check.length === 0) {
                        this.messagErreur(tabParentInputModif[i], childValue);
                        return;
                    }
                    dataModifDetail.Update_interv(tabParentInputModif[i].id, childValue);
                }
                else if (tabParentInputModif[i].id === 'date_interv') {
                    const numCont = document.querySelector('[id=num_cont]').firstChild.value;
                    const childValue = this.valueOfChild(tabParentInputModif[i]);
                    const maliste = dataModifDetail.verif_date(numCont, childValue);
                    for (let y = 0; y <= maliste.length - 1; y++) {
                        const str = Object.values(maliste[y]);
                        if (str[0] === childValue) {
                            //! show error date
                            tabSelectorError[2].textContent = "Attention, cette date d'intervention existe déjà pour ce contrat";
                            tabSelectorError[2].classList.remove('hide');
                            return;
                        }
                        dataModifDetail.Update_interv(tabParentInputModif[y].id, childValue);
                    }
                }
                else if (tabParentInputModif[i].id === 'objet_interv') {
                    let content = tabParentInputModif[i].querySelector('textarea').value;
                    console.log(tabParentInputModif[i], tabParentInputModif[i].querySelector('textarea'), content);
                    if (content === '') {
                        tabParentInputModif[i].querySelector('p').classList.remove('hide');
                        return;
                    }
                    dataModifDetail.Update_interv(tabParentInputModif[i].id, content);
                    tabParentInputModif[i].querySelector('p').classList.add('hide');
                }
                else {
                    const childValue = this.valueOfChild(tabParentInputModif[i]);
                    dataModifDetail.Update_interv(tabParentInputModif[i].id, childValue);
                }
            }
            tabParentInputModif = [];
            TabBoutonAffichModif = [];
            tabInputSelector = [];
            afficherInfo.viderDetailHidden();
            document.querySelector('[id=Div_Bouton_Modif]').classList.add('hide');
        }
        valueOfChild(Parent) {
            return (Parent.firstChild).value;
        }
        verif(parent, child) {
            return this.newInfoListe(parent.id, child);
        }
        CacherErreur() {
            for (let i = 0; i <= tabSelectorError.length - 1; i++) {
                tabSelectorError[i].classList.add('hide');
            }
        }
    }
    var modifierInfo = new ModifierInfo();
}
let TabBoutonAffichModif = [document.querySelector('[id=Btn_RetourAffich]'), document.querySelector('[id=Div_Bouton_Prest]'), document.querySelector('[id=Btn_ValiderModif]'), document.querySelector('[id=Btn_AnnulerModif]')];
function updateInputListener() {
    tabInputSelector.forEach((element) => {
        element.addEventListener('input', () => {
            modifierInfo.ChangerDetail(element, element.id);
        });
    });
}
let tabParentInputModif = [];
let tabSelectorError = [document.querySelector('[id=Erreur_Cont]'),
    document.querySelector('[id=Erreur_Cons]'),
    document.querySelector('[id=Erreur_Date]')];
//* ----------------------------------Modifier----------------------------------/
// ?------- Modifier détails Interventions ---------/
document.querySelector('[id=Btn_Modifier]').addEventListener('click', () => {
    if (rowSelected !== null && rowSelected !== undefined) {
        bouton.classList.add('hide');
        titre.innerHTML = "Modification d'une intervention";
        afficherInfo.Afficher_Modifer('input');
        noSelect.style.visibility = 'hidden';
        updateInputListener();
    }
    else
        noSelect.style.visibility = 'visible';
});
// ?------- Annuler modifier détails inerventions ---------/
TabBoutonAffichModif[3].addEventListener('click', () => {
    modifierInfo.CacherErreur();
    afficherInfo.viderDetailHidden();
    document.querySelector('[id=Div_Bouton_Modif]').classList.add('hide');
});
// ?------- Valider modifier détails inerventions ---------/
TabBoutonAffichModif[2].addEventListener('click', () => {
    modifierInfo.validerModif();
});
// ?------- Valider afficher détails inerventions ---------/
TabBoutonAffichModif[0].addEventListener('click', () => {
    afficherInfo.hideAffichBtn();
    afficherInfo.viderDetailHidden();
});
//# sourceMappingURL=Intervention_modifier.js.map