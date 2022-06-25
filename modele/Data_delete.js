"use strict";
if (dataDelete === undefined) {
    class DataDelete {
        //* ------- delete intervention ---------//
        deleteInterv() {
            let longeur = (rowSelected.id).length;
            let numInterv = String((rowSelected.id).substr(-longeur + 2));
            let sql = `DELETE FROM intervention 
                       WHERE intervention.num_interv ='${numInterv}'`;
            APIpageWeb.SQLexec(sql, []);
            this.deleteAllPrest();
        }
        deleteAllPrest() {
            let sql = `DELETE FROM utilisation
                       WHERE utilisation.num_interv = ${numInterv}`;
            APIpageWeb.SQLexec(sql, []);
        }
    }
    var dataDelete = new DataDelete();
}
//# sourceMappingURL=Data_delete.js.map