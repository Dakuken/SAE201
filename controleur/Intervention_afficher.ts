//* ----------------------------------------------------------------------------/
//* ---------------------------------AFFICHER-----------------------------------/
//* ---------------------------------------------------------------------------*/
if (afficherInfo === undefined) {
    class AfficherInfo {
    //* ------- INIT ---------/
    // on init la phrase erreur en hidden
        init(): void {
            noSelect.style.visibility = 'hidden';
        }

        //* ------- Selected  ---------/
        // Selector de la ligne d'info
        rowSelector(): void {
            rowSelected = <HTMLTableRowElement>document.querySelector('.selection');
        }

        // Return mon tableau d'info
        //* ------- Affichage  ---------/

        Afficher_Modifer(htmlElement: string = 'p') {
            (<HTMLParagraphElement>(
        document.querySelector('[id=NoSelect]')
      )).style.visibility = 'hidden';

            bouton.classList.add('hide');
            // on récupére un tableau de valeur à afficher dans la partie détail / modif
            const tabString = dataDetail.TableauValeur(htmlElement);

            // On remplie les champs
            afficherInfo.champsDetail(tabString, htmlElement);
            prestation.listPrestation();

            // Remove hide div & boutons needed
            divDetail.classList.remove('hide');
            if (htmlElement === 'p') {
                this.showAffichBtn();
            } else {
                this.hideAffichBtn();
            }
        }

        //* ------- Cacher bouton retour ---------/
        hideAffichBtn() {
            (<HTMLDivElement>(
        document.querySelector('[id=Div_Retour_Affich]')
      )).classList.add('hide');
            (<HTMLDivElement>(
        document.querySelector('[id=Div_Bouton_Prest]')
      )).classList.remove('hide');
            (<HTMLDivElement>(
        document.querySelector('[id=Div_Bouton_Modif]')
      )).classList.remove('hide');
        }

        //* ------- Montrer bouton retour  ---------/
        showAffichBtn() {
            (<HTMLDivElement>(
        document.querySelector('[id=Div_Retour_Affich]')
      )).classList.remove('hide');
            (<HTMLDivElement>(
        document.querySelector('[id=Div_Bouton_Prest]')
      )).classList.add('hide');
            (<HTMLDivElement>(
        document.querySelector('[id=Div_Bouton_Modif]')
      )).classList.add('hide');
        }

        //* ------- Remplir les champs  ---------/

        champsDetail(Result: string[], element: string = 'p') {
            this.viderDetail(); // On vide d'abord les infos précèdentes

            let dateAjd = new Date().toLocaleDateString();
            dateAjd = dateAjd.split('/').reverse().join('-');
            let dateInterv = Result[0];
            dateInterv = dateInterv.split('/').reverse().join('-');

            for (let i = 0; i <= tabId.length - 1; i ++) {
                const Parent = <HTMLDivElement>(document.querySelector(`[id=${tabId[i]}]`));
                if (element !== 'p') {
                    // Input
                    if (tabId[i] === 'num_cons') {
                        tabParentInputModif.push(Parent);
                        this.RemplirChamp(Parent, element, Result[i]);

                        // Hour
                    } else if (tabId[i] === 'heure_interv') {
                        tabParentInputModif.push(Parent);
                        this.RemplirChamp(Parent, element, Result[i], 'time');
                    } else if (tabId[i] === 'date_interv' || tabId[i] === 'num_cont') {
                        if (dateInterv > dateAjd) {
                            if (tabId[i] === 'date_interv') {
                                this.RemplirChamp(Parent, 'input', dateInterv, 'date');
                                tabParentInputModif.push(Parent);
                            } else if (tabId[i] === 'num_cont') {
                                tabParentInputModif.push(Parent);
                                this.RemplirChamp(Parent, element, Result[i]);
                            }
                        } else {
                            this.RemplirChamp(Parent, 'p', Result[i]);
                        }

                        // TextArea
                    } else if (tabId[i] === 'objet_interv' || tabId[i] === 'obs_interv') {
                        tabParentInputModif.push(Parent);
                        this.RemplirChamp(Parent, 'textarea', Result[i]);
                        tabInputSelector.push(
              <HTMLDivElement>document.querySelector(`[id=${tabId[i]}]`),
                        );
                    } else this.RemplirChamp(Parent, 'p', Result[i]);
                    // Paragraph
                } else this.RemplirChamp(Parent, 'p', Result[i]);
            }
        }

        RemplirChamp(
            parent: HTMLElement,
            element: string,
            result: string,
            type: string = '',
        ) {
            if (parent.id === 'obs_interv') {
                if (result === '') {
                    result = "Pas d'observation pour cette intervention.";
                }
                parent.prepend(this.CreateChild(element, result, type));
            } else {
                parent.prepend(this.CreateChild(element, result, type));
            }
        }

        CreateChild(
            element: string,
            Result: string,
            type: string = '',
        ): HTMLElement {
            if (element === 'input') {
                const child = <HTMLInputElement>document.createElement(element);
                child.setAttribute('value', Result);
                if (type === '') {
                    child.type = 'number';
                    child.min = '0';
                } else child.type = type;

                return child;
            }

            if (element === 'p') {
                const child = <HTMLParagraphElement>document.createElement(element);
                child.innerHTML = Result;
                return child;
            }

            if (element === 'textarea') {
                const child = <HTMLTextAreaElement>document.createElement(element);
                child.classList.add('texttest');
                if (Result !== '') {
                    child.innerText = Result;
                } else {
                    child.innerText = "Pas d'observation indiqués pour cette intervention";
                }
                return child;
            }

            // en réalité il faut throw error
            const child = document.createElement(element);
            child.innerHTML = 'Pas de types connu';
            return child;
        }

        //* ------- VIDER  ---------/
        // Vider si il y a des valeur
        viderDetail() {
            if (<HTMLParagraphElement>document.querySelector('[id=num_interv]') !== null && <HTMLParagraphElement>document.querySelector('[id=num_interv]') !== undefined) {
                for (let i = 0; i <= tabId.length - 1; i ++) {
                    const div = <HTMLDivElement>(document.querySelector(`[id=${tabId[i]}]`));
                    // console.log(div);
                    if (div.id !== 'num_cont' && div.id !== 'num_cons' && div.id !== 'objet_interv' && div.id !== 'date_interv') {
                        const child = <HTMLElement>div.firstChild;
                        // console.log(child);
                        try {
                            div.removeChild(child);
                        } catch { console.error(); }
                    } else {
                        let nbchild = div.childElementCount;
                        if (nbchild > 1) {
                            div.removeChild(div.firstChild);
                        }
                    }
                }
            }
        }

        // vider quand on change de page ou quand on recherche (peut etre retirer)
        viderDetailHidden() {
            this.viderDetail();
            gestionTable.remplirTable();
            divDetail.classList.add('hide');
            bouton.classList.remove('hide');
        }
    }

    var afficherInfo = new AfficherInfo();
}

let tabInputSelector: HTMLElement[] = [
  <HTMLDivElement>document.querySelector('[id=num_cons]'),
  <HTMLDivElement>document.querySelector('[id=heure_interv]'),
  <HTMLDivElement>document.querySelector('[id=num_cont]'),
];

let noSelect = <HTMLParagraphElement>document.querySelector('[id=NoSelect]');
afficherInfo.init();
// ?------- Afficher détails Interventions ---------/
(<HTMLInputElement>(
  document.querySelector('[id=Btn_Afficher]')
)).addEventListener('click', () => {
    if (rowSelected !== null && rowSelected !== undefined) {
        titre.innerHTML = "Détail d'une intervention";

        afficherInfo.Afficher_Modifer();
    } else noSelect.style.visibility = 'visible';
});
