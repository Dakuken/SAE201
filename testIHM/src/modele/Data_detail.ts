if (dataDetail === undefined) {
    class DataDetail {
        // Fonction qui retourne un tableau de String depuis un SQL load data
        TableauValeur(htmlElement:string) : string[] {
            let tabresult: TtabAsso[];
            if (htmlElement === 'p') { tabresult = this.TabInfo(); } else { tabresult = this.TabInfo(htmlElement); }

            const stringResult = Object.values(tabresult[0]);

            // Tableau de valeur à entrer
            return [stringResult[1], stringResult[9], stringResult[0],
                stringResult[10], stringResult[11], stringResult[2], stringResult[12],
                stringResult[3], stringResult[5], stringResult[4], stringResult[13],
                stringResult[14], stringResult[7], stringResult[6], stringResult[15]];
        }

        // on récup les info de la ligne qu'on veut + info qu'on veut
        TabInfo(element : string = 'p') : TtabAsso[] {
            // ? quelle num_interv ? => id

            // Taille id
            const longeur = (rowSelected.id).length;
            // id-"tr"
            numInterv = String((rowSelected.id).substr(- longeur + 2));

            // Select toute les infos pour après
            const sql = `SELECT intervention.num_interv,DATE_FORMAT(date_interv,'%d/%m/%Y'),contrat.num_cont,CONCAT(contrat.adr_site, ' - ', contrat.ville_site, '  ',contrat.cp_site),CONCAT(client.civ_cli, '. ', client.nom_cli,' ',client.prenom_cli),contrat.num_cli,CONCAT(conseiller.nom_cons,' ',conseiller.prenom_cons),conseiller.num_cons,SUM(IF(utilisation.type_prest='R',tarif_ht*qte_prest,0))
                ,intervention.heure_interv, intervention.objet_interv,intervention.obs_interv,DATE_FORMAT(date_cont,'%d/%m/%Y'),mel_cli,tel_cli,conseiller.tel_cons
                  FROM intervention, contrat,client,conseiller,prestation,utilisation
                  WHERE intervention.num_cont   = contrat.num_cont AND contrat.num_cli = client.num_cli AND intervention.num_cons = conseiller.num_cons AND utilisation.num_interv = intervention.num_interv AND prestation.code_prest = utilisation.code_prest
                  AND   intervention.num_interv = '${numInterv}'
                  GROUP BY intervention.num_interv`;

            const maliste = (dataTable.listAll('', '', '', sql));

            const cond:string = (element === 'input') ? ` AND intervention.num_interv = '${numInterv}' ` : '';

            gestionTable.remplirTable(cond);
            gestionTable.selectInterv(<HTMLTableRowElement>document.querySelector(`[id=${rowSelected.id}]`));
            return maliste;
        }
    }
    var dataDetail = new DataDetail();
}
