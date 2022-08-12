class MediaFactory {
   data
   type

   constructor(data, type) {
      this.data = data
      this.type = type

      if (this.type === 'image') return new Image(data)
      else if (this.type === 'video') return new Video(data)
      else throw "Le type saisie n'existe pas"
   }
}
