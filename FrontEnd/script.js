const token = localStorage.getItem("token");
const modeAdmin = document.getElementsByClassName("mode-admin")[0];
const projet = document.getElementsByClassName("projet")[0];
const btnModifier = document.getElementsByClassName("modifier")[0];
const modal = document.getElementsByClassName("modal")[0];
const contenuModal = document.getElementsByClassName("contenu-modal")[0];
const galleriePhotoProjet = document.getElementsByClassName("gallery");
const btnFermerModal = document.getElementsByClassName("fermer-modal")[0];
const galleriePhoto = document.getElementById("gallerie-modal");
const btnAjouterPhoto = document.getElementsByClassName("btn-ajouter-photo")[0];
const formAjoutPhoto = document.getElementsByClassName("formulaire-ajout-photo")[0];
const btnRetour = document.getElementsByClassName("retour-modal")[0];
const divApercuPhoto = document.getElementsByClassName("apercu-photo")[0];
const inputChoixPhoto = document.getElementById("input-image");

/**
 * fonction pour vérifier si le token existe et 
 * passer en mode admin sinon rester en mode visiteur
 */
function verifierExistanceToken() {
    const estQueTokenExiste = token ? "flex" : "none";

    modeAdmin.style.display = estQueTokenExiste ;
    btnModifier.style.display = estQueTokenExiste ;
}
verifierExistanceToken();

/**
 * Fonction qui affiche le modal lorsqu'on clique sur 'modifier'
 */
function afficherModal(){
    projet.addEventListener("click",()=>{
        modal.style.display = "flex";
    })
}
afficherModal();

/**
 * Fonction qui ferme le modal lorsqu'on clique sur la croix ou ailleurs
 */
function fermerModal() {
    // Pour chaque modal sur la page 
    const toutesLesModals = document.querySelectorAll(".modal");

    toutesLesModals.forEach(modalUnique => {
        modalUnique.addEventListener("click", (e)=> {
            e.preventDefault()
            // Si le clic a eu lieu directement sur le fond et pas dans le contenu
            if (e.target === modalUnique) {
                modalUnique.style.display = "none";
            }
        });
    });

    // Et fermeture par les boutons "X"
    const boutonsFermer = document.querySelectorAll(".fermer-modal");
    boutonsFermer.forEach(bouton => {
        bouton.addEventListener("click", (e)=> {
            e.preventDefault()
            // Remonter au parent .modal
            const modalParent = bouton.closest(".modal");
            modalParent.style.display = "none";
        });
    });
}

fermerModal();

/**
 * Fonction qui permet d'insérer des photos dans la modal
 */
function insererPhoto(){
    btnAjouterPhoto.addEventListener("click",(e)=>{
        e.preventDefault();
        fichierPhoto = document.createElement('input[type="file]"');
    })
}
insererPhoto();