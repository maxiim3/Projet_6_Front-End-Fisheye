class ComponentMediaFactory {
   data
   type

   /**
    *
    * @param {MediaConstructor} data
    * @param {string} type
    */
   constructor(data, type) {
      this.data = data
      this.type = type

      switch (this.type) {
         case 'image':
            return new Image(data)
         case 'video':
            return new Video(data)
         default:
            throw "Le type saisie n'existe pas"
      }
   }
}
