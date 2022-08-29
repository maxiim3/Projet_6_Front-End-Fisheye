class MediaFactory {
   data
   type
   thumbnail
   media
   _withVideoControl

   /**
    *
    * @param {MediaConstructor} data
    * @param {string} type
    * @param withVideoControl
    */
   constructor(data, withVideoControl = false) {
      this._withVideoControl = withVideoControl

      const { mediaType: type, title, mediaLink: url, id, photographer } = data
      try {
         switch (type) {
            case 'image':
               this.media = document.createElement('img')
               break

            case 'video':
               this.media = document.createElement('video')
               this.media.controls = this._withVideoControl
               this.media.disablePictureInPicture = this._withVideoControl
               this.media.autoplay = false
               break
            default:
               throw new Error("Le type saisie n'existe pas")
         }
      } catch (err) {
         console.warn(err)
      }

      this.media.src = url
      this.media.classList.value = 'imgMedia'
      this.media.alt = `${title} par ${photographer.name}`

   }

   createComponent() {
      return this.media
   }
}
