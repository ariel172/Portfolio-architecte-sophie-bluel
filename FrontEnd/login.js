async function verifierChamp() {
    const email = document.getElementById("email");
    const motDePasse = document.getElementById("mot-de-passe");
    const formulaire = document.querySelector("form");
    const messageErreur = document.querySelector(".message-erreur");

    formulaire.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        let regExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+", "i");
        
        let valeurEmail = email.value;
        let valeurMotDePasse = motDePasse.value;

        if (!regExp.test(valeurEmail.trim()) || !valeurMotDePasse.trim()) {
            messageErreur.textContent = "Veuillez entrer un email valide et un mot de passe.";
            messageErreur.style.display = "block";
            return;
        } else {
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
                window.location.href = "index.html";

                // Réinitialisation des champs du formulaire après soumission
                email.value = "";
                motDePasse.value = "";

            } catch (error) {
                alert("Erreur : " + error.message);
            }
        }
    });
}
// Cacher le message d'erreur dès qu'on retape un champ
[email, motDePasse].forEach(champ => {
    if(champ){
        champ.addEventListener("input", () => {
        messageErreur.style.display = "none";
        });
    }
});

verifierChamp();