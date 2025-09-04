/**
 * Vérifie les champs et gère la connexion
 */
function initialiserLogin() {
    const formulaire = document.querySelector("form");
    const messageErreur = document.querySelector(".message-erreur");

    if (!formulaire) return;

    formulaire.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email");
        const motDePasse = document.getElementById("mot-de-passe");

        const valeurEmail = email.value.trim();
        const valeurMotDePasse = motDePasse.value.trim();

        const regExp = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$/i;

        if (!regExp.test(valeurEmail) || !valeurMotDePasse) {
            messageErreur.textContent = "Veuillez entrer un email valide et un mot de passe.";
            messageErreur.style.display = "block";
            return;
        }

        try {
            const reponse = await fetch("http://localhost:5678/api/users/login", {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: valeurEmail,
                    password: valeurMotDePasse
                })
            });

            if (!reponse.ok) {
                throw new Error("Email ou mot de passe incorrect");
            }

            const data = await reponse.json();
            window.localStorage.setItem("token", data.token);
            window.location.href = "index.html";

            // Réinitialiser les champs après succès
            email.value = "";
            motDePasse.value = "";

        } catch (error) {
            messageErreur.textContent = "Erreur : " + error.message;
            messageErreur.style.display = "block";
        }
    });

    // Cacher le message d'erreur dès qu'on retape dans un champ
    ["#email", "#mot-de-passe"].forEach(selecteur => {
        const champ = document.querySelector(selecteur);
        if (champ) {
            champ.addEventListener("input", () => {
                messageErreur.style.display = "none";
            });
        }
    });
}

initialiserLogin();