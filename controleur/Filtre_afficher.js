"use strict";
if (afficheFiltre === undefined) {
    class AfficheFiltre {
        // Select "Ensemble" par défaut
        init() {
            document.querySelector('[id=Btn_Ensemble]').classList.add('Selection_Filtre');
        }
        // Cacher ancien btn selectionné, Montrer nouveau puis montrer la zone de filtre
        selectFiltre(btn, zone) {
            const previousSelected = document.querySelector('.Selection_Filtre');
            previousSelected.classList.remove('Selection_Filtre');
            btn.classList.add('Selection_Filtre');
            // puis on montre la zone du filtre
            this.show_hideFiltre(zone);
        }
        // Cacher ancienne zone, Montrer la nouvelle
        show_hideFiltre(zone) {
            const previousShowed = document.querySelector('.show');
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
//# sourceMappingURL=Filtre_afficher.js.map