class ComponentMediaFactory {
   data
   type
   thumbnail
   media

   /**
    *
    * @param {MediaConstructor} data
    * @param {string} type
    * @param thumbnail
    */
   constructor(data, type) {
      this.data = data
      this.type = type

      const { title, mediaLink: url, id, photographer } = this.data
      switch (this.type) {
         case 'image':
            this.media = document.createElement('img')
            break

         case 'video':
            this.media = document.createElement('video')
            this.media.controls = true
            this.media.disablePictureInPicture = true
            this.media.autoplay = false
            break

         default:
            throw "Le type saisie n'existe pas"
      }

      this.media.src = url
      this.media.classList.value = 'imgMedia'
      this.media.alt = `${title} par ${photographer.name}`
   }

   createComponent() {
      return this.media
   }
}
