if (connexion === undefined) {
    class Connexion {
        constructor() {
            this.init();
        }

        // à adapter avec voter nom de base et vos identifiants de connexion
        init() {
            APIpageWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr', '3306', 'burnel12u_sae201', 'burnel12u_appli', 'Justin55500', 'utf8');
        }
    }
    var connexion = new Connexion();
}
