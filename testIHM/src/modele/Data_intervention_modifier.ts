if (dataModifDetail === undefined) {
    class DataModifDetail {
        newListeContrat(childvalue:string):TtabAsso[] {
            let SQL = `SELECT DATE_FORMAT(contrat.date_cont,'%d/%m/%Y'),CONCAT(contrat.adr_site, ' - ', contrat.ville_site, '  ',contrat.cp_site),client.num_cli,CONCAT(client.civ_cli, '. ', client.nom_cli,' ',client.prenom_cli),client.mel_cli,client.tel_cli
                       FROM client,contrat
                       WHERE contrat.num_cont = '${childvalue}'
                       AND   contrat.num_cli  = client.num_cli`;
            return Object.values(APIpageWeb.SQLloadData(SQL, []));
        }

        newListeConseiller(childvalue:string):TtabAsso[] {
            let SQL = `SELECT CONCAT(nom_cons, ' ',prenom_cons), tel_cons
                       FROM conseiller
                       WHERE num_cons = '${childvalue}' `;
            return Object.values(APIpageWeb.SQLloadData(SQL, []));
        }

        Update_interv(id:string, childvalue:string):void {
            let longeur = (rowSelected.id).length;
            let numInterv = String((rowSelected.id).substr(- longeur + 2));
            let sql = `UPDATE intervention 
                        SET  
                        intervention.${id}                     = '${childvalue}'
                        WHERE          intervention.num_interv = ${numInterv}`;
            APIpageWeb.SQLexec(sql, []);
        }

        Max_interv():TtabAsso[] {
            let sql = 'select MAX(num_interv)+1 from intervention';
            return Object.values(APIpageWeb.SQLloadData(sql, []));
        }

        verif_date(contrat:string, childvalue:string):TtabAsso[] {
            let longeur = (rowSelected.id).length;
            let numInterv = String((rowSelected.id).substr(- longeur + 2));
            let SQL = `SELECT intervention.date_interv
                        FROM contrat,intervention 
                        WHERE intervention.num_cont    = '${contrat}'
                        and   contrat.num_cont         = intervention.num_cont
                        and   intervention.num_interv! = '${numInterv}'`;
            return Object.values(APIpageWeb.SQLloadData(SQL, []));
        }
    }

    var dataModifDetail = new DataModifDetail();
}
