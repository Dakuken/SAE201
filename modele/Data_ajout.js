"use strict";
if (dataAjout === undefined) {
    class DataAjout {
        //* ------- last intervention ---------//
        last_interv() {
            const sql = `SELECT MAX(num_interv)
                       FROM intervention`;
            return Object.values(APIpageWeb.SQLloadData(sql, []));
        }
        supprPrest() {
            const sql = `DELETE FROM utilisation 
                   WHERE utilisation.num_interv ='${numInterv}'`;
            APIpageWeb.SQLexec(sql, []);
        }
        verifDateAjout(contrat, childvalue) {
            let SQL = `SELECT intervention.date_interv
                       FROM intervention 
                       WHERE intervention.num_cont    = '${contrat}'
                       AND intervention.date_interv = '${childvalue}'`;
            return Object.values(APIpageWeb.SQLloadData(SQL, []));
        }
        Ajout_interv(tab) {
            console.log(`${tab[0]},${tab[5]},${tab[6]},${tab[1]},${tab[2]},${tab[3]},${tab[4]}`);
            let sql = `INSERT INTO intervention VALUES('${tab[0]}','${tab[5]}','${tab[6]}','${tab[1]}','${tab[2]}','${tab[3]}','${tab[4]}')`;
            console.log(sql);
            APIpageWeb.SQLexec(sql, []);
        }
    }
    var dataAjout = new DataAjout();
}
//# sourceMappingURL=Data_ajout.js.map