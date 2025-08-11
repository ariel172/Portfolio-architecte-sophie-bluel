// Sélection des éléments du DOM : email, mot de passe et formulaire
const email = document.getElementById("email");
const motDePasse = document.getElementById("mot-de-passe");
const formulaire = document.querySelector("form");
const messageErreur = document.querySelector(".message-erreur");

/**
 * Fonction asynchrone pour gérer la soumission du formulaire
 * Empêche le comportement par défaut et vérifie les données (email et mot de passe)
 */
async function verifierChamp() {
    // Ajout d'un écouteur d'événements au formulaire, qui écoute la soumission
    formulaire.addEventListener("submit", async (e) => {
        // Empêcher le comportement par défaut de la soumission du formulaire (rechargement de la page)
        e.preventDefault();
        
        // Expression régulière pour valider l'email (doit correspondre au format standard d'un email)
        let regExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+", "i");
        
        // Récupération des valeurs entrées par l'utilisateur dans les champs email et mot de passe
        let valeurEmail = email.value;
        let valeurMotDePasse = motDePasse.value;

        // Vérification de la validité des champs email et mot de passe
        if (!regExp.test(valeurEmail.trim()) || !valeurMotDePasse.trim()) {
            // Si l'email est invalide ou si le mot de passe est vide, affiche une erreur
            messageErreur.textContent = "Veuillez entrer un email valide et un mot de passe.";
            messageErreur.style.display = "block";
            return;  // Sort de la fonction pour ne pas continuer la soumission
        } else {
            try {
                // Envoi de la requête de connexion au serveur
                const reponse = await fetch("http://localhost:5678/api/users/login", {
                    method: "POST",  // Méthode POST pour soumettre les données
                    headers: {
                        "Content-Type": "application/json",  // Type de contenu en JSON
                    },
                    body: JSON.stringify({
                        email: valeurEmail,  // Email de l'utilisateur
                        password: valeurMotDePasse  // Mot de passe de l'utilisateur
                    })
                });

                // Si la réponse du serveur n'est pas OK, on lance une erreur
                if (!reponse.ok) {
                    throw new Error("Erreur lors de la connexion");
                }

                // Si la connexion est réussie, on récupère les données de la réponse (incluant le token)
                const data = await reponse.json();
                
                // Sauvegarde du token JWT dans le localStorage
                window.localStorage.setItem("token", data.token);

                // Redirection vers la page d'accueil
                window.location.href = "index.html";

                // Réinitialisation des champs du formulaire après soumission
                email.value = "";
                motDePasse.value = "";

            } catch (error) {
                // Affichage d'une alerte en cas d'erreur (réseau ou autre)
                alert("Erreur : " + error.message);
            }
        }
    });
}
// Cacher le message d'erreur dès qu'on retape un champ
[email, motDePasse].forEach(champ => {
    champ.addEventListener("input", () => {
        messageErreur.style.display = "none";
    });
});

/**Appel de la fonction pour initialiser la vérification 
 * champs et la soumission du formulaire
 */
verifierChamp();