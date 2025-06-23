const email = document.getElementById("email");
const motDePasse = document.getElementById("mot-de-passe");
const formulaire = document.querySelector("form");

/**
 * Empêcher le chargement par défaut de la page 
 * Vérifier les données email et mot de passe
 */
async function verifierChamp() {
    formulaire.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        let regExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+", "i");
        let valeurEmail = email.value;
        let valeurMotDePasse = motDePasse.value;

        // Vérification de l'email et du mot de passe
        if (!regExp.test(valeurEmail.trim()) || !valeurMotDePasse.trim()) {
            alert("Merci de saisir un email valide et un mot de passe.");
        }else{
            try {
                const reponse = await fetch("http://localhost:5678/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: valeurEmail,
                        password: valeurMotDePasse
                    })
                });

                if (!reponse.ok) {
                    throw new Error("Erreur lors de la connexion");
                }

                const data = await reponse.json();
                window.localStorage.setItem("token", data.token);
                
                //redirection vers la page d'accueil
                window.location.href = "index.html";
                // Réinitialisation des champs du formulaire
                email.value = "";
                motDePasse.value = "";

            } catch (error) {
                alert("Erreur : " + error.message);
            }
        }

    });
}
//Appel de la fonction
verifierChamp();