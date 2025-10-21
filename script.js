// Netflop version XMLHttpRequest

function chargerNetflopXml() {
    // Créer un nouveal objet XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // Configurer une requête
    // Utiliser la méthode 'GET' = pour récuperer des données
    // Le nom du fichier à charger
    // - true = requête asynchrone (ne bloque pas le navigateur et l'exécution du code)
    xhr.open("GET","./netflop.xml",true);

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



//ici
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
        let filmCard = creatCarteXML(films[i]);
    container.appendChild(filmCard);
    }//pour chaque catégories  crée variable qui stoque ul + crée une boucle for qui fonctionnera sur les li
}//la
/**
 * Fonction générique pour créer une carte d'affichage à partir d'un élément XML
 * @param {element} item - element XML (film, serie, etc)
 * @returns {HTMLElement} - element div representant la carte
 */
function creatCarteXML(item){

    //crée un div pour la carte
let card = document.createElement('div');
card.className = 'card';

//extraire du XML
let nom = item.getElementsByTagName('nom')[0].textContent;

// recuperer le genre depuis la balise <genre>
let genre = item.getElementsByTagName('genre')[0].textContent;

// recuperer le réalisateur depuis la balise <realisateur>
let realisateur = item.getElementsByTagName('realisateur')[0].textContent;

// recuperer la date de sortie depuis la balise <dateSortie>
let dateSortie = item.getElementsByTagName('dateSortie')[0].textContent;

// recuperer le résumé depuis la balise <resumer>
//trim() = supprimer les espaces au début et à la fin
let resumer = item.getElementsByTagName('resumer')[0].textContent.trim();

// recuperer l'url de l'image depuis la balise <url>
let url = item.getElementsByTagName('url')[0].textContent;

// creer un element img pour afficher l'image
let img = document.createElement('img');
// définir la source de l'image
img.src = url;
img.alt = nom;
img.className = 'card-image col-3'; //style class

// creer le conteneur pour les informations
// creer un div pour contenir toutes les infos textuelles
let infoDiv = document.createElement('div');
infoDiv.className ='card-info';

// Creer le titre
// creer un element H3 pour le titre
let titreElement = document.createElement('h3');
titreElement.textContent = nom;

// creer l'element genre
// creer un paragraphe pour le genre
let genreElement = document.createElement('p');
//innerHTML permet d'inserer du html
genreElement.innerHTML = '<strong>Genre:</strong>' + genre;

// creer l'element realisateur
// creer un paragraphe pour le realisateur
let realisateurElement = document.createElement('p');
realisateurElement.innerHTML = '<strong> Réalisateur</strong>' + realisateur;

// creer l'element date de sortie
// creer un paragraphe pour la date de sortie
let dateElement = document.createElement('p');
dateElement.innerHTML = "<strong> date de  sortie</strong>" + dateSortie;

// creer le conteneur du résumé
// creer un div pour contenir le résumé et le bouton
let resumerContainer = document.createElement('div');
resumerContainer.className = 'resume-container';

// creer l'element résumé
// creer le paragraphe pour le résumé
let resumerElement = document.createElement('p');
resumerElement.className = 'resume';
resumerElement.innerHTML = "<strong>Résumé :</strong>" + resumer;

//ajouter le resumé au conteneur
resumerContainer.appendChild(resumerElement);

// verifier si le résumé dépasse 4 lignes
//on utiliser le setTimeout pour laisser le dom se mettre à jour
//permettre aussi de mesurer la hauteur réelle
// assembler tous les element

//ajouter tous les elements au conteneur d'information
infoDiv.appendChild(titreElement);
infoDiv.appendChild(genreElement);
infoDiv.appendChild(realisateurElement);
infoDiv.appendChild(dateElement);
infoDiv.appendChild(resumerContainer);

// on ajoute l'image et les informations à la carte
card.appendChild(img);
card.appendChild(infoDiv);

// on retourne la carte complete
return card;

}

//faire des fonction qui s'afficher correctement 

/**
 * charger les données lorsque le dom est complétement chargé
 * DOMContentLoaded = évenement déclenché lorsque le html est pret
 */

document.addEventListener('DOMContentLoaded', function(){
   console.log("le DOM est chargé");
    // execute la function chargerNetflopXML
    chargerNetflopXml();
});
