class CardTemplateFactory {
   data
   tabIndex
   type

   /**
    *
    * @param {PhotographerConstructor || MediaConstructor} data
    * @param {number} tabIndex
    * @param {string} type
    */
   constructor(data, tabIndex, type) {
      this.data = data
      this.tabIndex = tabIndex
      this.type = type

      switch (this.type) {
         case 'media':
            return new CardMedia(this.data, this.tabIndex)
         case 'photographer':
            return new CardPhotographer(this.data, this.tabIndex)
         default:
            throw "le type de donnée saisie n'est pas valide"
      }
   }
}
