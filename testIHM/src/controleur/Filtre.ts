export default class Filtre {
    filtreBase(element: HTMLInputElement, where?: string) {
        if (element === undefined || element === null) {
            throw new Error('Le querySelector doit exister');
        }
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
        if (element === undefined || element === null) {
            throw new Error('element doit être définis ');
        }
        if (element2 === undefined || element2 === null) {
            throw new Error('element2 doit être définis ');
        }
        if (element.value !== '' && element2.value !== '') {
            max = (element.value > element2.value) ? element.value : element2.value;
            min = (element.value > element2.value) ? element2.value : element.value;
            console.log('pouet pouet');
            if (max === min) {
                throw new Error(`wtf ${max} ${min}`);
            }
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
