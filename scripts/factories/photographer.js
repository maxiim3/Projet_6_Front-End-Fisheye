class PhotographerFactory {
   /**
    *
    * @param {Object} data
    * @param {number} tabIndex
    * @param {string} type
    */
   constructor(data, tabIndex, type) {
      if (type === 'media') return new MediaCard(data, tabIndex)
      if (type === 'photographer') return new PhotographerCard(data, tabIndex)
      if (type === 'header') return new PhotographerHeader(data, tabIndex)
      else throw 'le type de donnée saisie n\'est pas valide'
   }
}