// Netflop version XMLHttpRequest

function chargerNetflopXml() {
    // Créer un nouveal objet XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // Configurer une requête
    // Utiliser la méthode 'GET' = pour récuperer des données
    // Le nom du fichier à charger
    // - true = requête asynchrone (ne bloque pas le navigateur et l'exécution du code)
    xhr.open("GET","data/netflop.xml",true);

    // Définir le gestionnaire d'évenement pour le chargement
    xhr.onload = function (){
        // Vérifie si la requête réussi
        // status 200 = OK (succès)
        if (xhr.status === 200) {

            // Parser le XML avec DOMPARSER
            // On créé une instance de DOMParser
            let parser = new DOMParser();
            // console.log(parser);

            // Parse le texte XML reçu et convertit en document XML
            // xhr.responseText = le contenu du fichier XML en texte
            // "text/xml" = type MIME pour indiquer que c'est du XML
            let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
            // console.log(xmlDoc);

            afficherFilmsXML(xmlDoc);

        }
        else {
            console.error("Erreur lors du chargement du fichier XML");
            console.error("Status  :",xhr.status);
            console.error("Message :",xhr.statusText);
        }
    }

    // Gérer les erreurs réseau
    xhr.onerror = function (){
        console.log("Erreur réseau lors du chargement du fichier XML.");
        alert("Impossible de charger les données. Vérifiez votre connexion !");
    }

    // Envoi de la requête
    xhr.send();

}

chargerNetflopXml();

/**
 * Fonction pour afficher les films depuis le document XML
 * @param {Document} xmlDoc Document XML parsé par DOMParser
 */
function afficherFilmsXML(xmlDoc) {
    // Récupérer le conteneur HTML où afficher les films
    let container = document.getElementById("section-films");

    // Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Films";
    container.appendChild(titre);

    // Recupéérer TOUS les éléments <film> du XML
    // getElementsByTagName() retourne une collection
    let films = xmlDoc.getElementsByTagName("film");
    console.log(films);

    // Parcourir tous les films (attention fils est un HTMLCollection, du coup pas un vrai tableau)
    for (let i = 0; i < films.length; i++) {
        console.log(films[i]);
    }
}