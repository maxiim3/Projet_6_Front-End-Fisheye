# Open Classrooms Formation React 2022-2023
## Projet 6 - FishEye
### Maxime Tamburrini

---
👉Si les modules Node ne sont pas présent, lancer le terminal puis : `npm install` 

👉Dans le terminal lancer _Sass Watch_ : `npm run watch` 

👉 Ouvrir index.html avec _LiveServer_ ou un serveur local


---- 
- Presentation (1min30)
    - Protagoniste (15sec)
        - (Je suis Dev Junior chez Techasite)
        - (Amanda : Cheffe de projet chez Techasite)
    - Contexte (15sec)
        - Livraison du prototype de site FishEye
    - Sommaire (1min)
        - Structure du Projet
        - Rendu Visuel et comportement du Site
        - Code et impleementation des fonctionnalités du site
- ---
- Structure du projet (1min)
    - Deux pages HTML
    - Assets qui comprends les ressources (logo, images, videos...)
    - Data -> fichier JSON (DATA)
    - CSS -> Utilisation de SASS
    - Scripts -> Javascript
        - On va y revenir lorsque l'on verra le code en détail
- - ---
- Rendu Visuel
    - Page Home
        - Navigation clavier - Voice over
    - Page Photographer
        - Navigation Clavier sur les différents éléments
        - Filtre
            - Navigation Clavier + Souris
        - Like
            - Navigation Clavier + Souris
            - On ne peut liker que une seule fois
            - Le total de like se met à jour automatiquement
        - LightBox
            - Navigation Clavier + Souris
            - Precendent / Suivant
            - Video Thumbnail avec control lors de l'agrandissement
    - Formulaire
        - Navigation Clavier + Souris
        - Soumission formulaire
- ---
- Code
    1. Page Photographer (3min)
        - API -> GET DATA
            - I - Dans index.js on instancie la class Api avec URL vers JSON
            - I  - get Data with Key "Photographer"
        - Map Data using Construcxto Pattern
            - II- Map JSON to Constructor Pattern
        - Generate HTML using Factiry Pattern
            - III -  Use Factory Pattern to generate Card HTML from Template
            - IV -  Add to DOM
        - Navigate to Photographer Page
            - V - Link component in Factory CARD to navigate to photographer page (append params)
            -
    2. Page Medias (9min)
        - I - API -> GET DATA (1min)
            - I - Instanciation, puis getData Method
            - I - Recupere les data avec clés "photographer" et "media"
        - II- Filter Photographer
            - II - Get Photographer ID, then filter DATA and create Photographer Object using Constructor Pattern
        - III - Filter Medias
            - 1- Filter Media by photographer
            - 2 - add Photographer Data to Media using Decorator Pattern and Media Constructor
            - 3- Push them to array
        - IV - Render DOM
            - 2 -  set document title and h1
            - 3, 4 -  Hero Banner
            - 5, 6 - Aside Information
            - 7 - MAP Media Cards
            - 8 -  Decorator Pattern With LikeCounter
            - 9 - Render Method
            - 10 - FactoryPattern
            - 11 - Media Factory
            - 12 - HTML Template
        - V - LIKE Implementation
            - 1. count like
            - 2. add total to aside section
            - 3. LikeCounter add to Decorator Pattern
            - 4. implement the method
            - 5. in Media Card -> Handle onLike method to call LikeCounter.update()
            - 6. EventListener on all like btn
            - 7.  dataset.isLiked instanciation
            - 8. dataset.isLiked switch case
            - 9. update likes

          # HERE
        - VI - Filter
            - 1. Instanciate new Filter
            - 2. Render Filter to DOM
            - 3. getAll element  and add evenet listener for Each -> call handleSort()
            - 4. Check if menu is dropped
            - 5. reorder dom elementds
            - 6. and call sortBy()
            - 7. SortBy() => Will reorder DOM using recursive function
            -
        - VII - Modal / Form
            - 1. call RenderModal
            - 2. create new Modal
            - 3. Modal HTML -> Event Listener on click to open
            - 4. add trigger hideModal with mouse
            - 5. add trigger hideModal with keyboard
                 . 6. In photographer.js calls static method to generate Form
                 . 7. In photographer.js calls static method to handle Form

        - VIII - Lightbox
            - 1. Create new Lightbox
            - 2. Generate DoM
            - 3. Add event Listeners to media click
            - 4. openLightbox
            - 5. remove previous media if it was one
            - 6. MediaFactory
            - 7. Add media to DOM
            - 8. Add event listener on Keyboard Navigation
            - 9. Add event listener on Buttons
            - 10. Close Lightbox
            - 11. Change Media
            - 12. Get previous/next media ID
            - 13. render Media
	