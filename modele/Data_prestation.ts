if (dataPestation === undefined) {
    class DataPrestation {
        liste_Prestation():TtabAsso[] {
            const sql = `SELECT prestation.code_prest,lib_prest,tarif_ht,type_prest,qte_prest,IF(utilisation.type_prest='R',tarif_ht*qte_prest, '0.00 Gratuit')
            FROM utilisation,prestation 
            WHERE utilisation.code_prest  = prestation.code_prest
            AND   utilisation.num_interv = '${numInterv}' GROUP BY prestation.code_prest`;
            return Object.values(dataTable.listAll('', '', '', sql));
        }
    }

    var dataPestation = new DataPrestation();
}
