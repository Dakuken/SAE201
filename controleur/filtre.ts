if (filtre === undefined) {
    class Filtre {
        filtreBase(element:HTMLInputElement, where?:string) {
            this.hideNoResult();
            if (element.value !== '') {
                gestionTable.remplirTable(where);
            } else {
                gestionTable.remplirTable();
            }
        }

        filtreDate(element:HTMLInputElement, element2:HTMLInputElement) {
            this.hideNoResult();
            let min: string;
            let max: string;

            if (element.value !== '' && element2.value !== '') {
                max = (element.value > element2.value) ? element.value : element2.value;
                min = (element.value > element2.value) ? element2.value : element.value;
                let where = ` AND date_interv <= '${max}' AND date_interv >= '${min}'`;
                gestionTable.remplirTable(where);
            }
        }

        //* ------- Error ---------/

        hideNoResult() {
            let cache = <HTMLElement>document.querySelector('[id=NoResult]');
            cache.style.display = 'none';
        }

        showNoResult() {
            let cache = <HTMLElement>document.querySelector('[id=NoResult]');
            cache.style.display = '';
        }
    }
    var filtre = new Filtre();
}

class FiltreSelector {
    btnquery : HTMLElement;

    inputquery: HTMLInputElement;

    btnid : string;

    inputid : string;

    conidtion : string;

    constructor(btnid:string, inputid:string, condition:string) {
        this.inputid = inputid;
        this.btnid = btnid;
        this.convToSelectorBTN(btnid);
        this.convToSelectorINPUT(inputid);
        this.conidtion = condition;
    }

    private convToSelectorBTN(id:string) {
        return this.btnquery = <HTMLInputElement>document.querySelector(`[id=${id}]`);
    }

    private convToSelectorINPUT(id:string) {
        return this.inputquery = <HTMLInputElement>document.querySelector(`[id=${id}]`);
    }
}

let filtreSelectors:FiltreSelector[] = [new FiltreSelector('Btn_Recherche_Interv', 'Input_Interv', 'intervention.num_interv'),
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

let btnPeriode = (<HTMLInputElement>document.querySelector('[id=Btn_Recherche_Periode]'));

// ?------- Filtre Bouton ---------/
btnPeriode.addEventListener('click', () => {
    afficherInfo.viderDetailHidden(); //! à laisser au dessus
    filtre.filtreDate(
<HTMLInputElement>document.querySelector('[id=Input_Periode1]'),
                      <HTMLInputElement>document.querySelector('[id=Input_Periode2]'),
    );
});

//* ------- Filtre Client ---------/

let btnClient = (<HTMLInputElement>document.querySelector('[id=Btn_Recherche_Client]'));
let inputNomClient = (<HTMLInputElement>document.querySelector('[id=Input_Nom_client]'));
let inputClient = (<HTMLInputElement>document.querySelector('[id=Input_Numero_client]'));

// ?------- Filtre Bouton ---------/

btnClient.addEventListener('click', () => {
    afficherInfo.viderDetailHidden(); //! à laisser au dessus

    // On utilise LIKE
    let valeur: HTMLInputElement = inputClient;
    let where:string = ' AND ';

    // Si le nom client est remplie
    if (inputNomClient.value !== '') {
        // Si le num client est remplie
        if (inputClient.value !== '') {
            where += ` (client.nom_cli  LIKE '%${inputNomClient.value}%' OR client.num_cli LIKE '%${inputClient.value}%') `;
        } else {
            valeur = inputNomClient;
            where += `client.nom_cli  LIKE '%${inputNomClient.value}%' `;
        }
    } else if (inputClient.value !== '') {
        valeur = inputClient;
        where += `client.num_cli  LIKE '%${inputClient.value}%' `;
    }
    filtre.filtreBase(valeur, where);
});
