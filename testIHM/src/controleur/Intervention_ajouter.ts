//* ----------------------------------------------------------------------------/
//* ---------------------------------AJOUTER-----------------------------------/
//* ---------------------------------------------------------------------------*/

if (ajoutInterv === undefined) {
    class AjoutInterv {
        ajout() {
            this.PrepareAjout();
            this.champsAjout();
            updateInputListener();
        }

        PrepareAjout() {
            afficherInfo.viderDetail();
            ViderAllChild((<HTMLTableElement>document.querySelector('[id=Tbody_Prest]')));
            const table = (<HTMLTableElement>document.querySelector('[id=Table_Inter]'));
            const filtre = (<HTMLDivElement>document.querySelector('[id=Div_MenuFiltre]'));
            const btnAjout = (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Ajout]'));
            const Title = (<HTMLParagraphElement>(<HTMLDivElement>document.querySelector('[id=Div_ListeP]')).firstChild);
            const detailInterv = (<HTMLDivElement>document.querySelector('[id=Detail_Interv]'));
            const btnPrest = (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Prest]'));
            const btnModif = (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Modif]'));
            const divRetourAffich = (<HTMLDivElement>document.querySelector('[id=Div_Retour_Affich]'));
            divRetourAffich.classList.add('hide');
            btnModif.classList.add('hide');
            btnPrest.classList.remove('hide');
            table.classList.add('hide');
            bouton.classList.add('hide');
            filtre.classList.add('hide');
            btnAjout.classList.remove('hide');
            detailInterv.classList.remove('hide');
            Title.innerText = 'Ajout d\'une intervention';

            const totalchild = ((<HTMLDivElement>document.querySelector('[id=Total]')).querySelectorAll('div'));
            for (let i = 0; i <= totalchild.length - 1; i ++) {
                const p = totalchild[i].querySelector('p');
                try {
                    p.innerText = '0.00';
                } catch (error) {
                    const p2 = document.createElement('p');
                    p2.innerText = '0.00';
                    totalchild[i].append(p2);
                }
            }
        }

        champsAjout() {
        // noublions pas tabid hehe
            for (let i = 0; i <= tabId.length - 1; i ++) {
                if (i === 2) {
                    const div = <HTMLDivElement>document.querySelector(`[id=${tabId[i]}]`);
                    const numInterv = document.createElement('p');
                    div.prepend(numInterv);
                } else if (! (i >= 6 && i <= 14) || i === 12) {
                    const div = <HTMLDivElement>document.querySelector(`[id=${tabId[i]}]`);
                    let input:HTMLElement;
                    if (i === 3 || i === 4) {
                        input = document.createElement('textarea');
                        input.classList.add('texttest');
                    } else {
                        input = document.createElement('input');

                        switch (i) {
                        case 12:
                        case 5: input.setAttribute('type', 'number'); break;
                        case 0: input.setAttribute('type', 'date'); break;
                        case 1: input.setAttribute('type', 'time'); break;
                        default: break;
                        }
                    }
                    div.prepend(input);
                }
            }
            this.num_interv_auto();
            this.date_init();
        }

        num_interv_auto() {
            const maxInterv = dataAjout.last_interv();
            const tabNumInterv = Object.values(maxInterv[0]);
            const numInterv1 = String(Number(tabNumInterv[0]) + 1);
            (<HTMLParagraphElement>(<HTMLDivElement>document.querySelector('[id=num_interv]').firstChild)).innerText = numInterv1;
        }

        date_init() {
            const dateAjd = new Date().toLocaleDateString();
            const tabDateAjd = ((dateAjd.split('/')).reverse());
            tabDateAjd[2] = String(Number(tabDateAjd[2]) + 1);
            const dateDemain = tabDateAjd.join('-');
            (<HTMLInputElement>(<HTMLDivElement>document.querySelector('[id=date_interv]').firstChild)).setAttribute('value', dateDemain);
        }

        AnnulerAjout() {
            this.finAjout();
            dataAjout.supprPrest();
        }

        confirmerAjout() {
            const parents: HTMLDivElement[] = [];
            for (let i = 0; i <= tabId.length - 1; i ++) {
                if ((! (i >= 6 && i <= 14) && i !== 2) || i === 12) {
                    const div = <HTMLDivElement>document.querySelector(`[id=${tabId[i]}]`);
                    parents.push(div);
                }
            }
            console.log({ parent });

            let response:string[] = [];
            parents.forEach((parent) => {
                if (this.verif_num(parent) === 'no') {
                    response.push('no');
                }
            });
            if (this.verif_prest() === 'no') {
                response.push('no');
            }
            if (response.length === 0) {
                this.ajouter_interv(parents);
            }
        }

        verif_num(parent: HTMLDivElement):string {
            if (parent.id === 'num_cont' || parent.id === 'num_cons') {
                const child = <HTMLInputElement>(parent.firstChild);
                const check = modifierInfo.verif(parent, child.value);

                if (child.value === '') {
                    parent.querySelector('p').classList.remove('hide');
                    return 'no';
                } if (check.length === 0) {
                    modifierInfo.messagErreur(parent, child.value);
                    return 'no';
                }
                (parent.querySelector('p').classList.add('hide'));
            } else if (parent.id === 'date_interv') {
                let dateInput = parent.querySelector('input').value;
                const dateAjd = new Date().toLocaleDateString();
                const tabDateAjd = ((dateAjd.split('/')).reverse());
                tabDateAjd[2] = String(Number(tabDateAjd[2]) + 1);
                const dateDemain = tabDateAjd.join('-');

                // si inférieur à demain
                if (dateInput < dateDemain) {
                    parent.querySelector('p').textContent = "La date de l'intervention ne peut pas être inférieur à la date de demain ";
                    parent.querySelector('p').classList.remove('hide');
                    return 'no';
                // sinon on regarde numéro de contrat
                }
                let numCont = (<HTMLInputElement>(<HTMLDivElement>document.querySelector('[id=num_cont]')).querySelector('input')).value;
                if (numCont !== '') {
                    const maliste = dataAjout.verifDateAjout(numCont, dateInput);
                    if (maliste.length !== 0) {
                        parent.querySelector('p').textContent = "Attention, cette date d'intervention existe déjà pour ce contrat";
                        parent.querySelector('p').classList.remove('hide');
                        return 'no';
                    }
                }
                parent.querySelector('p').classList.add('hide');
                return 'ok';
            } else if (parent.id === 'objet_interv') {
                let content = parent.querySelector('textarea').value;
                if (content === '') {
                    parent.querySelector('p').classList.remove('hide');
                    return 'no';
                }
                parent.querySelector('p').classList.add('hide');
            } else if (parent.id === 'heure_interv') {
                let content = parent.querySelector('input').value;
                if (content === '') {
                    (<HTMLParagraphElement>document.querySelector('[id=erreurHeure]')).classList.remove('hide');
                    return 'no';
                }
                (<HTMLParagraphElement>document.querySelector('[id=erreurHeure]')).classList.add('hide');
            } else {
                return 'ok';
            }
            return 'ok';
        }

        verif_prest():string {
            const numInterv = (<HTMLDivElement>document.querySelector(`[id=${tabId[2]}]`)).querySelector('p').innerText;
            const prests = dataUpdatePrest.allPrestFor1Inter(numInterv);
            if (prests.length === 0) {
                (<HTMLDivElement>document.querySelector('[id=Div_Message_Pas_Prest]')).classList.remove('hide');
                return 'no';
            }
            (<HTMLDivElement>document.querySelector('[id=Div_Message_Pas_Prest]')).classList.add('hide');
            return 'ok';
        }

        ajouter_interv(parents: HTMLDivElement[]) {
            const numInterv = (<HTMLDivElement>document.querySelector(`[id=${tabId[2]}]`)).querySelector('p').innerText;
            let tabString: string[] = [numInterv];
            parents.forEach((parent) => {
                tabString.push((<HTMLInputElement>parent.firstChild).value);
            });
            console.log(tabString);
            dataAjout.Ajout_interv(tabString);
            this.finAjout();
            gestionTable.remplirTable();
            this.cacherErreur();
        }

        finAjout() {
            const table = (<HTMLTableElement>document.querySelector('[id=Table_Inter]'));
            const filtre = (<HTMLDivElement>document.querySelector('[id=Div_MenuFiltre]'));
            const btnAjout = (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Ajout]'));
            const Title = (<HTMLParagraphElement>(<HTMLDivElement>document.querySelector('[id=Div_ListeP]')).firstChild);
            const detailInterv = (<HTMLDivElement>document.querySelector('[id=Detail_Interv]'));
            const btnPrest = (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Prest]'));
            const btnModif = (<HTMLDivElement>document.querySelector('[id=Div_Bouton_Modif]'));
            btnModif.classList.add('hide');
            btnPrest.classList.add('hide');
            table.classList.remove('hide');
            bouton.classList.remove('hide');
            filtre.classList.remove('hide');
            btnAjout.classList.add('hide');
            detailInterv.classList.add('hide');
            Title.innerText = 'Liste des interventions';
            this.cacherErreur();
        }

        cacherErreur() {
            (<HTMLParagraphElement>document.querySelector('#erreurObjet')).classList.add('hide');
            (<HTMLParagraphElement>document.querySelector('#erreurHeure')).classList.add('hide');
            (<HTMLParagraphElement>document.querySelector('#Erreur_Cont')).classList.add('hide');
            (<HTMLParagraphElement>document.querySelector('#Erreur_Cons')).classList.add('hide');
            (<HTMLDivElement>document.querySelector('#Div_Message_Pas_Prest')).querySelector('p').classList.add('hide');
            (<HTMLDivElement>document.querySelector('#NoSelectPrest')).querySelector('p').classList.add('hide');
        }
    }

    var ajoutInterv = new AjoutInterv();
}

(<HTMLInputElement>document.querySelector('[id=Btn_Ajouter]')).addEventListener('click', () => {
    titre.innerHTML = 'Ajouter une intervention';
    ajoutInterv.ajout();
    numInterv = (<HTMLDivElement>document.querySelector('[id=num_interv]')).querySelector('p').textContent;
});

(<HTMLInputElement>document.querySelector('[id=Btn_AnnulerAjout]')).addEventListener('click', () => {
    ajoutInterv.AnnulerAjout();
});

(<HTMLInputElement>document.querySelector('[id=Btn_ValiderAjout]')).addEventListener('click', () => {
    ajoutInterv.confirmerAjout();
});
