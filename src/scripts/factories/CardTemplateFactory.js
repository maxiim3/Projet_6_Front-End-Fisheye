class CardTemplateFactory {
   data
   type

   /**
    *
    * @param {PhotographerConstructor || MediaConstructor} data
    * @param {string} type
    */
   constructor(data, type) {
      this.data = data
      this.type = type

      switch (this.type) {
         case 'media':
            return new CardMedia(this.data)
         case 'photographer':
            return new CardPhotographer(this.data)
         default:
            throw "le type de donnée saisie n'est pas valide"
      }
   }
}
