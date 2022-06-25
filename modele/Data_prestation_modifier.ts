if (dataUpdatePrest === undefined) {
    class DataUpdatePrest {
        all_prest():TtabAsso[] {
            const sql = `SELECT prestation.code_prest,prestation.lib_prest,prestation.tarif_ht 
                   FROM prestation`;
            return Object.values(APIpageWeb.SQLloadData(sql, []));
        }

        delete_prest(numInterv:string, code:string):void {
            const sql = `DELETE FROM utilisation 
                       WHERE utilisation.num_interv = '${numInterv}'
                       AND utilisation.code_prest = '${code}' `;
            APIpageWeb.SQLexec(sql, []);
        }

        modif_prest(numInterv:string, code:string, value:string, id:string):void {
            const sql = `UPDATE utilisation 
                          SET  
                           utilisation.${id} = '${value}'  
                          WHERE utilisation.num_interv = '${numInterv}'
                          AND utilisation.code_prest = '${code}' `;
            APIpageWeb.SQLexec(sql, []);
        }

        ajout_prest(tab:string[]):void {
            const sql = `INSERT INTO
                      utilisation VALUES('${tab[0]}','${tab[1]}','${tab[2]}','${tab[3]}') `;
            APIpageWeb.SQLexec(sql, []);
        }

        allPrestFor1Inter(numInterv:string) : TtabAsso[] {
            const sql = `SELECT * 
                      FROM utilisation 
                      WHERE num_interv = ${numInterv}`;
            return Object.values(APIpageWeb.SQLloadData(sql, []));
        }
    }
    var dataUpdatePrest = new DataUpdatePrest();
}
