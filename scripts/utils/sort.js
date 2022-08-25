/**
 * Sort an Array
 * @param type { String } "titre" | "date" | "popularite"
 * @param container {NodeList}
 */
function sortBy(type, container) {
      const { childNodes: children } = container
      const startIndex = 3

   function recursive() {
      const output = []
      let propA
      let propB
      let compare
      for (let i = startIndex; i < children.length - 1; i++) {

         switch (formatText(type)) {
            case 'date':
               propA = new Date (children[i].dataset.date)
               propB = new Date (children[i + 1].dataset.date)
               compare = propA - propB // retourne la difference des dates en valeurs millisecondes (nombre positif ou negatif)
               break
            case 'popularite':
               propA = children[i].dataset.popularite
               propB = children[i + 1].dataset.popularite
               compare = propA - propB // retourne la difference entre a et b (nombre positif ou negatif)
               break
            case 'titre':
               propA = children[i].dataset.titre
               propB = children[i + 1].dataset.titre
               compare = propA.localeCompare(propB, 'en', { sensitivity: 'base' }) // retourne un nombre positif ou negatif)
               break
         }

         if (compare > 0) { // si A plus grand que B
            container.insertBefore(children[i + 1], children[i]) // alors on place B (children[i + 1]) avant A (children[i])
            output.push(propA - propB > 0) // push true
         }
      }
      if (output.length !== 0 ) recursive() // si output comprend au moins une valeur (true) alors on appelle de nouveau la fonction
   }
   return recursive()
}
