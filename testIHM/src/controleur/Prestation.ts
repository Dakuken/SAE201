//* ----------------------------------------------------------------------------/
//* ---------------------------------PRESTATION---------------------------------/
//* ---------------------------------------------------------------------------*/

if (prestation === undefined) {
    class Prestation {
        init() {
            (<HTMLParagraphElement>document.querySelector('[id=NoSelectPrest]')).classList.add('hide');
            (<HTMLParagraphElement>document.querySelector('[id=DetPrest]')).classList.add('hide');
            (<HTMLDivElement>document.querySelector('[id=NotGoodQte]')).classList.add('hide');
        }

        listPrestation() {
            const tbody = (<HTMLTableSectionElement>document.querySelector('[id=Tbody_Prest]'));

            const maliste = dataPestation.liste_Prestation();

            for (let i = 0; i <= maliste.length - 1; i ++) {
                const tabstring = Object.values(maliste[i]);

                for (let y = 0; y <= tabstring.length - 1; y ++) {
                    const str = tabstring[y];
                    if (y === 5 && str !== '0.00 Gratuit') {
                        totalHT += Number(str); // on additionne les totaux ensembles
                    }
                }
            }

            gestionTable.remplirTable('', '', '', tbody, maliste);
            selectPrestActu();
            this.afficheTotal();
        }

        afficheTotal() {
            const divHT = (<HTMLDivElement>document.querySelector('[id=Total_HT]'));
            const divTTC = (<HTMLDivElement>document.querySelector('[id=Total_TTC]'));
            const totalTVA = (<HTMLDivElement>document.querySelector('[id=Total_TVA]'));
            ViderAllChild(divHT);
            ViderAllChild(divTTC);
            ViderAllChild(totalTVA);
            afficherInfo.RemplirChamp(divHT, 'p', String((totalHT).toFixed(2)));
            afficherInfo.RemplirChamp(divTTC, 'p', String((totalHT * 1.10).toFixed(2)));
            afficherInfo.RemplirChamp(totalTVA, 'p', String(((totalHT * 1.10) - totalHT).toFixed(2)));
            totalHT = 0;
        }

        selectPrest(tr: HTMLTableRowElement): void {
            const previousSelect = <HTMLTableRowElement>document.querySelector('.selected_prest');
            if (previousSelect !== null && previousSelect !== undefined) {
                previousSelect.classList.remove('selected_prest');
            }
            tr.classList.add('selected_prest');
            afficherInfo.rowSelector();
        }

        cacher_montrer_Btn(bool: boolean = true, value: string = 'ajout', modifAjout: string = 'modif') {
            const btncacher = ['Tot', 'Div_Bouton_Prest'];
            if (modifAjout === 'modif') {
                btncacher.push('Div_Bouton_Modif');
            } else if (modifAjout === 'ajout') {
                btncacher.push('Div_Bouton_Ajout');
            }
            if (bool === true) {
                for (let i = 0; i <= btncacher.length - 1; i ++) {
                    (<HTMLDivElement>document.querySelector(`[id=${btncacher[i]}]`)).classList.add('hide');
                    if (i === 2) {
                        (<HTMLDivElement>document.querySelector(`[id=${btncacher[i]}]`)).classList.add('temp');
                    }
                }
                if (value === 'ajout') {
                    (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Valider_Ajout_Prest]')).classList.remove('hide');
                    (<HTMLParagraphElement>document.querySelector('[id=DetPrest]')).classList.remove('hide');
                } else if (value === 'modif') {
                    (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Valider_Modif_Prest]')).classList.remove('hide');
                    (<HTMLParagraphElement>document.querySelector('[id=DetPrest]')).classList.remove('hide');
                } else if (value === 'del') {
                    (<HTMLParagraphElement>document.querySelector('[id=DetPrest]')).classList.add('hide');
                    (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Valider_Del_Prest]')).classList.remove('hide');
                }

                return;
            }
            for (let i = 0; i <= btncacher.length - 1; i ++) {
                (<HTMLDivElement>document.querySelector(`[id=${btncacher[i]}]`)).classList.remove('hide');
                if (i === 2) {
                    (<HTMLDivElement>document.querySelector(`[id=${btncacher[i]}]`)).classList.remove('temp');
                }
            }
            (<HTMLDivElement>document.querySelector('[id=NotGoodQte]')).classList.add('hide');
            (<HTMLDivElement>document.querySelector('[id=Div_Message_Del_Prest]')).classList.add('hide');
            (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Valider_Ajout_Prest]')).classList.add('hide');
            (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Valider_Modif_Prest]')).classList.add('hide');
            (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Valider_Del_Prest]')).classList.add('hide');
            (<HTMLParagraphElement>document.querySelector('[id=DetPrest]')).classList.add('hide');
        }

        showListeLibelle() {
            const parent = <HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[1]}]`);
            const child = document.createElement('select');
            const allprest = dataUpdatePrest.all_prest();

            for (let i = 0; i <= allprest.length - 1; i ++) {
                const str = Object.values(allprest[i]);
                allCode.push(str[0]);
                allLibelle.push(str[1]);
                allTarif.push(str[2]);
            }
            allLibelle.forEach((libelle) => {
                const option = document.createElement('option');
                option.setAttribute('value', libelle);
                option.innerText = libelle;
                child.appendChild(option);
            });
            parent.appendChild(child);
        }

        showCodeTarif() {
            const select = (<HTMLSelectElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[1]}]`)).firstChild);
            const option = select.options[select.selectedIndex].value;
            for (let i = 0; i <= allLibelle.length - 1; i ++) {
                if (allLibelle[i] === option) {
                    const code = document.createElement('p');
                    code.innerText = allCode[i];
                    (<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[0]}]`)).appendChild(code);
                    const prix = document.createElement('p');
                    prix.innerText = allTarif[i];
                    (<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[2]}]`)).appendChild(prix);
                }
            }
        }

        showQuantity(value: string = '1') {
            ViderAllChild(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[4]}]`));
            const child = document.createElement('input');
            child.setAttribute('type', 'number');
            child.setAttribute('min', '1');
            child.setAttribute('value', `${value}`);
            <HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[4]}]`).appendChild(child);
        }

        showTotal() {
            const PrixUnit = ((<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[2]}]`)).firstChild).textContent;
            const Qte = (<HTMLInputElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[4]}]`)).firstChild).value;
            const select = (<HTMLSelectElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[3]}]`)).querySelector('select'));
            const type = select.options[select.selectedIndex].value;

            const NumQte = Number(Qte);
            let total: number;
            const child = (<HTMLParagraphElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[5]}]`)).querySelector('p'));
            if (type === 'M') {
                child.innerHTML = '0.00'; //* si prof veut gratuit verif avant envoie pour insert
                return;
            }
            if (NumQte <= 0 || Number.isNaN(NumQte)) {
                child.innerHTML = "La quantité rentrée n'est pas valide";
                child.style.color = '#1e5f94';
                child.style.fontWeight = 'bold';
                return;
            }

            total = (NumQte * Number(PrixUnit));
            child.style.color = '#000000';
            child.style.fontWeight = '400';
            child.innerHTML = String(total.toFixed(2));
        }

        actuCodeLibelPrixUnit() {
            const select = (<HTMLSelectElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[1]}]`)).firstChild);
            const option = select.options[select.selectedIndex].value;
            for (let i = 0; i <= allLibelle.length - 1; i ++) {
                if (allLibelle[i] === option) {
                    const code = <HTMLParagraphElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[0]}]`)).firstChild;
                    code.innerText = allCode[i];
                    const prix = <HTMLParagraphElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[2]}]`)).firstChild;
                    prix.innerText = allTarif[i];
                }
            }
        }

        champPrest() {
            this.showListeLibelle();
            this.showCodeTarif();
            this.showQuantity();
            this.showTotal();
        }

        ajoutPrest(modifAjout = 'modif'): void {
            this.cacher_montrer_Btn(true, 'ajout', modifAjout);
            this.champPrest();
            ActuPrestModif();
        }

        actuprest() {
            this.actuCodeLibelPrixUnit();
            this.showTotal();
        }

        finito() {
            for (let i = 0; i <= tabIdChampPrest.length - 1; i ++) {
                if (i !== 5) {
                    const parent = <HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[i]}]`);
                    if (i === 3) {
                        if (parent.querySelector('p') === null || parent.querySelector('p') === undefined) {
                            break;
                        } else {
                            parent.removeChild(parent.firstChild);
                            break;
                        }
                    }

                    ViderAllChild(parent);
                }
            }
            allLibelle = [];
            allCode = [];
            allTarif = [];
            const select = (<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[3]}]`)).querySelector('select');
            select.classList.remove('hide');
        }

        ajouterUnePrest() {
            // num interv, code_prest,qte_prest,type_prest
            const code = (<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[0]}]`).firstChild).textContent;
            let qte = (<HTMLInputElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[4]}]`)).querySelector('input')).value;
            const selectType = (<HTMLSelectElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[3]}]`)).querySelector('select'));
            const typePrest = selectType.options[selectType.selectedIndex].value;
            //* ok
            const maliste = dataUpdatePrest.allPrestFor1Inter(numInterv);
            const tab = [numInterv, code, qte, typePrest];
            let exist = false;
            let index: number;
            for (let i = 0; i <= maliste.length - 1; i ++) {
                if (tab[1] === Object.values(maliste[i])[1]) {
                    index = i;
                    exist = true;
                }
            }
            if (exist) {
                const qteactu = Object.values(maliste[index])[2];
                qte = String(Number(qte) + Number(qteactu));
                dataUpdatePrest.modif_prest(numInterv, code, qte, 'qte_prest');
            } else {
                dataUpdatePrest.ajout_prest(tab);
            }
            this.listPrestation();
        }

        modifPrest(row: HTMLTableRowElement, modifPrest: string = 'modif'): void {
            this.cacher_montrer_Btn(true, 'modif', modifPrest);
            const childs = row.childNodes;
            for (let i = 0; i <= tabIdChampPrest.length - 4; i ++) {
                const div = <HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[i]}]`);
                const p = document.createElement('p');
                p.innerText = childs[i].textContent;
                div.prepend(p);
            }
            const childslen = childs.length;
            this.showQuantity(childs[childslen - 2].textContent);
            this.showTotal();
            if (childs[3].textContent === 'R') {
                (<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[3]}]`)).querySelector('select').selectedIndex = 0;
            } else {
                (<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[3]}]`)).querySelector('select').selectedIndex = 1;
            }
            ActuPrestModif();
        }

        modifierUnePrest() {
            const code = (<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[0]}]`).firstChild).textContent;
            const selectType = (<HTMLSelectElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[3]}]`)).querySelector('select'));
            const typePrest = selectType.options[selectType.selectedIndex].value;
            const qtePrest = (<HTMLInputElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[4]}]`)).firstChild).value;

            dataUpdatePrest.modif_prest(numInterv, code, typePrest, 'type_prest');
            dataUpdatePrest.modif_prest(numInterv, code, qtePrest, 'qte_prest');
            this.listPrestation();
        }

        delPrest(modifAjout = 'modif') {
            this.cacher_montrer_Btn(true, 'del', modifAjout);
            (<HTMLDivElement>document.querySelector('[id=Div_Message_Del_Prest]')).classList.remove('hide');
        }

        supprimerUnePrest(row: HTMLTableRowElement, modifAjout = 'modif') {
            const child = row.firstChild;
            const code = (child).textContent;
            const allInterv = dataUpdatePrest.allPrestFor1Inter(numInterv);

            if (allInterv.length > 1) {
                (<HTMLDivElement>document.querySelector('[id=Div_Message_derniere_Prest]')).classList.add('hide');
                (<HTMLDivElement>document.querySelector('[id=Div_Message_Del_Prest]')).classList.add('hide');
                dataUpdatePrest.delete_prest(numInterv, code);
                this.listPrestation();
                prestation.finito();
                prestation.cacher_montrer_Btn(false, 'ajout', modifAjout);
            } else {
                (
                    (<HTMLDivElement>document.querySelector('[id=Div_Message_derniere_Prest]')).classList.remove('hide')
                );
            }
        }
    }
    var prestation = new Prestation();
}

// Selector intervention Actualisé
function selectPrestActu() {
    (document.querySelectorAll('.Selection_Prest')).forEach((element) => {
        element.addEventListener('click', (e) => {
            prestation.selectPrest(<HTMLTableRowElement>element);
        });
    });
}

prestation.init();
const btnAddPrest = (<HTMLTableRowElement>document.querySelector('[id=Btn_AjouterPrest]'));
const btnModifPrest = (<HTMLTableRowElement>document.querySelector('[id=Btn_ModifierPrest]'));
const btnSupprPrest = (<HTMLTableRowElement>document.querySelector('[id=Btn_SupprimerPrest]'));
let tabIdChampPrest = ['Code_prest', 'Lib_prest', 'Prix_prest', 'Type_prest', 'Qte_prest', 'Total_prest'];
const PrestSelect = (<HTMLDivElement>document.querySelector('[id=selected_prest]'));
let allLibelle: string[] = [];
let allCode: string[] = [];
let allTarif: string[] = [];

btnSupprPrest.addEventListener('click', () => {

});

// ? selector libelle type qte
function ActuPrestModif() {
    (<HTMLSelectElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[1]}]`)).firstChild).addEventListener('change', () => {
        prestation.actuprest();
    });

    (<HTMLSelectElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[4]}]`)).firstChild).addEventListener('change', () => {
        prestation.showTotal();
    });

    (<HTMLSelectElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[3]}]`)).querySelector('select')).addEventListener('change', () => {
        prestation.showTotal();
    });
}

//* ----------------Ajouter--------------------------------/
btnAddPrest.addEventListener('click', () => {
    const listclass = document.querySelector('[id = Div_Bouton_Ajout]').className;
    if (listclass.includes('hide') !== true || listclass.includes('temp') === true) {
        prestation.ajoutPrest('ajout');
    } else {
        prestation.ajoutPrest();
    }
});

(<HTMLDivElement>document.querySelector('[id=Btn_ValiderAjoutPrest]')).addEventListener('click', () => {
    const tot = (<HTMLParagraphElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[5]}]`)).querySelector('p')).textContent;
    if (Number.isNaN(Number(tot)) !== true && Number(tot) >= 0) {
        (<HTMLDivElement>document.querySelector('[id=NotGoodQte]')).classList.add('hide');
        prestation.ajouterUnePrest();
        prestation.finito();
        const listclass = document.querySelector('[id = Div_Bouton_Ajout]').className;

        if (listclass.includes('hide') !== true || listclass.includes('temp') === true) {
            prestation.cacher_montrer_Btn(false, 'ajout', 'ajout');
        } else {
            prestation.cacher_montrer_Btn(false);
        }
    } else {
        (<HTMLDivElement>document.querySelector('[id=NotGoodQte]')).classList.remove('hide');
    }
});

(<HTMLDivElement>document.querySelector('[id=Btn_AnnulerAjoutPrest]')).addEventListener('click', () => {
    prestation.finito();
    const listclass = document.querySelector('[id = Div_Bouton_Ajout]').className;
    if (listclass.includes('hide') !== true || listclass.includes('temp') === true) {
        prestation.cacher_montrer_Btn(false, 'ajout', 'ajout');
    } else {
        prestation.cacher_montrer_Btn(false);
    }
});

//* ---------modifier--------/
btnModifPrest.addEventListener('click', () => {
    const prestSelect = <HTMLTableRowElement>document.querySelector('.selected_prest');
    if (prestSelect !== null && prestSelect !== undefined) {
        (<HTMLDivElement>document.querySelector('[id=NoSelectPrest]')).classList.add('hide');
        const listclass = document.querySelector('[id = Div_Bouton_Ajout]').className;
        if (listclass.includes('hide') !== true || listclass.includes('temp') === true) {
            prestation.modifPrest(prestSelect, 'ajout');
        } else {
            prestation.modifPrest(prestSelect);
        }
    } else (<HTMLDivElement>document.querySelector('[id=NoSelectPrest]')).classList.remove('hide');
});

(<HTMLDivElement>document.querySelector('[id=Btn_ValiderModifPrest]')).addEventListener('click', () => {
    const tot = (<HTMLParagraphElement>(<HTMLDivElement>document.querySelector(`[id=${tabIdChampPrest[5]}]`)).querySelector('p')).textContent;
    if (Number.isNaN(Number(tot)) !== true && Number(tot) >= 0) {
        (<HTMLDivElement>document.querySelector('[id=NotGoodQte]')).classList.add('hide');
        prestation.modifierUnePrest();
        prestation.finito();
        const listclass = document.querySelector('[id = Div_Bouton_Ajout]').className;
        if (listclass.includes('hide') !== true || listclass.includes('temp') === true) {
            prestation.cacher_montrer_Btn(false, 'ajout', 'ajout');
        } else {
            prestation.cacher_montrer_Btn(false);
        }
    } else {
        (<HTMLDivElement>document.querySelector('[id=NotGoodQte]')).classList.remove('hide');
    }
});

(<HTMLDivElement>document.querySelector('[id=Btn_AnnulerModifPrest]')).addEventListener('click', () => {
    prestation.finito();
    const listclass = document.querySelector('[id = Div_Bouton_Ajout]').className;
    if (listclass.includes('hide') !== true || listclass.includes('temp') === true) {
        prestation.cacher_montrer_Btn(false, 'ajout', 'ajout');
    } else {
        prestation.cacher_montrer_Btn(false);
    }
});

//* ---------supprimer--------/
btnSupprPrest.addEventListener('click', () => {
    const prestSelect = <HTMLTableRowElement>document.querySelector('.selected_prest');
    if (prestSelect !== null && prestSelect !== undefined) {
        (<HTMLDivElement>document.querySelector('[id=NoSelectPrest]')).classList.add('hide');
        const listclass = document.querySelector('[id = Div_Bouton_Ajout]').className;
        if (listclass.includes('hide') !== true || listclass.includes('temp') === true) {
            prestation.delPrest('ajout');
        } else {
            prestation.delPrest();
        }
    } else (<HTMLDivElement>document.querySelector('[id=NoSelectPrest]')).classList.remove('hide');
});

(<HTMLDivElement>document.querySelector('[id=Btn_ValiderDelPrest]')).addEventListener('click', () => {
    const prestSelect = <HTMLTableRowElement>document.querySelector('.selected_prest');
    if (prestSelect !== null && prestSelect !== undefined) {
        const listclass = document.querySelector('[id = Div_Bouton_Ajout]').className;
        if (listclass.includes('hide') !== true || listclass.includes('temp') === true) {
            prestation.supprimerUnePrest(prestSelect, 'ajout');
        } else {
            prestation.supprimerUnePrest(prestSelect);
        }
    }
});

(<HTMLDivElement>document.querySelector('[id=Btn_AnnulerDelPrest]')).addEventListener('click', () => {
    prestation.finito();
    const listclass = document.querySelector('[id = Div_Bouton_Ajout]').className;
    if (listclass.includes('hide') !== true || listclass.includes('temp') === true) {
        prestation.cacher_montrer_Btn(false, 'ajout', 'ajout');
    } else {
        prestation.cacher_montrer_Btn(false);
    }
});
