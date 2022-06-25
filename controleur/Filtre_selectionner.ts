class SelectionFiltre {
    constructor(selector: string, part: string) {
        this.selector = <HTMLInputElement>(
      document.querySelector(`[id=${selector}]`)
    );
        this.part = part;
        this.selectorPart = <HTMLElement>document.querySelector(`[id=${part}]`);
    }

    selector: HTMLInputElement;

    part: string;

    selectorPart: HTMLElement;
}

const tabBtn: SelectionFiltre[] = [
    new SelectionFiltre('Btn_Ensemble', 'Ensemble'),
    new SelectionFiltre('Btn_NumInt', 'Interv'),
    new SelectionFiltre('Btn_peri', 'Periode'),
    new SelectionFiltre('Btn_Contrat', 'Contrat'),
    new SelectionFiltre('Btn_NumCons', 'Conseiller'),
    new SelectionFiltre('Btn_Client', 'Client'),
];

// Choix filtre
tabBtn.forEach((btn) => {
    btn.selector.addEventListener('click', () => {
        afficherInfo.viderDetailHidden(); //! à laisser au dessus
        gestionTable.remplirTable();
        afficheFiltre.selectFiltre(btn.selector, btn.selectorPart);
        rowSelected = undefined;
    });
});

(<HTMLInputElement>document.querySelector('[id=Btn_Quitter]')).addEventListener(
    'click',
    () => {
        APIpageWeb.close();
    },
);
