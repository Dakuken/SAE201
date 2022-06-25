"use strict";
if (dataTable === undefined) {
    class DataTable {
        //* ------- Prepare Liste ---------/
        // Comme dans tp_inventaire
        listPrepare(where = '', order = '', select = ' ') {
            const sql = `SELECT intervention.num_interv,DATE_FORMAT(date_interv,'%d/%m/%Y'),contrat.num_cont,CONCAT(contrat.ville_site, '  ',contrat.cp_site),CONCAT(client.civ_cli, '. ', client.nom_cli),contrat.num_cli,conseiller.nom_cons,conseiller.num_cons,SUM(IF(utilisation.type_prest='R',tarif_ht*qte_prest,0)) ${select} 
                  FROM intervention, contrat,client,conseiller,prestation,utilisation
                  WHERE intervention.num_cont = contrat.num_cont AND contrat.num_cli = client.num_cli AND intervention.num_cons = conseiller.num_cons AND utilisation.num_interv = intervention.num_interv AND prestation.code_prest = utilisation.code_prest ${where}
                  GROUP BY intervention.num_interv
                  ${order}`;
            return sql;
        }
        //* ------- Fonction Afficher Intervention/Prestation ---------/
        // Mettre Intervention voulues dans un "tbody"
        listAll(where = '', order = '', select = '', sqlentries = '') {
            const sql = (sqlentries !== '') ? sqlentries : this.listPrepare(where, order, select);
            return Object.values(APIpageWeb.SQLloadData(sql, []));
        }
    }
    var dataTable = new DataTable();
}
//# sourceMappingURL=Data_table.js.map