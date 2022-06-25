if (afficheFiltre === undefined) {
    class AfficheFiltre {
        // Select "Ensemble" par défaut
        init() : void {
            (<HTMLInputElement>document.querySelector('[id=Btn_Ensemble]')).classList.add('Selection_Filtre');
        }

        // Cacher ancien btn selectionné, Montrer nouveau puis montrer la zone de filtre
        selectFiltre(btn: HTMLInputElement, zone:HTMLElement) : void {
            try {
                const previousSelected = <HTMLInputElement>document.querySelector('.Selection_Filtre');
                if (previousSelected === null || previousSelected === undefined) {
                    throw new Error("Pas d'élément sélectionné précèdement");
                }
                previousSelected.classList.remove('Selection_Filtre');
            } catch (error) {
                console.log(error);
            }
            btn.classList.add('Selection_Filtre');
            // puis on montre la zone du filtre
            this.show_hideFiltre(zone);
        }

        // Cacher ancienne zone, Montrer la nouvelle
        show_hideFiltre(zone:HTMLElement) : void {
            const previousShowed = <HTMLElement>document.querySelector('.show');
            if (previousShowed !== null && previousShowed !== undefined) {
                previousShowed.classList.add('hide');
                previousShowed.classList.remove('show');
            }

            zone.classList.remove('hide');
            zone.classList.add('show');
        }
    }
    var afficheFiltre = new AfficheFiltre(); // création instance de la classe VuePersonnel
}
afficheFiltre.init();
