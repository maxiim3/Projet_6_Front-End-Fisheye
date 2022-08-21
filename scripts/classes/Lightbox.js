/**
 * # LightBox
 * @param {Array} medias
 * @param {PhotographerConstructor} photographer
 */
class Lightbox {
   photographer
   medias
   $activeMedia

   constructor(photographer, medias) {
      this.photographer = photographer
      this.medias = medias

      // DOM Nodes
      this.$main = document.getElementById('main')
      this.$lightbox = document.querySelector('#lightbox')
      this.$lightboxContent = document.createElement('div')
      this.$mediaContainer = document.createElement('div')
      this.$btnPrevious = document.createElement('i')
      this.$btnNext = document.createElement('i')
      this.$btnClose = document.createElement('i')
      this.$mediaTitle = document.createElement('h3')
      // Set Classes
      this.$lightboxContent.classList.value = 'lightbox__container'
      this.$mediaContainer.classList.value = 'lightbox__media-wrapper'
      this.$btnPrevious.classList.value = 'fa-solid fa-angle-left'
      this.$btnNext.classList.value = 'fa-solid fa-angle-right'
      this.$btnClose.classList.value = 'fa-solid fa-xmark'
      this.$mediaTitle.classList.value = 'lightbox__title'
      // All Medias from page
      this.allMediaLink = [...document.querySelectorAll('.mediaLink')]
      // Spinner Loader Class
      this.spinnerLoader = new LoadingSpinner(this.$mediaContainer)
   }

   /* todo make observer -> subscribe || unsubscribe ```this.allMediaLink.forEach```*/
   /**
    * Add event Listener to all media cards in the photographer page
    * @param e
    */
   addEventListenerToAllMedias(e) {
      this.allMediaLink.forEach($media =>
         $media.addEventListener('click', e => this.openLightbox(e, $media))
      )
   }

   removeEventListenerToAllMedias() {
      this.allMediaLink.forEach(media => media.removeEventListener('click', this.openLightbox))
   }

   /**
    *
    * @param {MouseEvent} e
    * @param {HTMLLinkElement} $mediaLink
    */
   openLightbox(e, $mediaLink) {
      this.$activeMedia = $mediaLink

      e.preventDefault()
      const previousMediaCard = document.querySelector('.lightbox__displayed-media')
      if (previousMediaCard) this.$mediaContainer.removeChild(previousMediaCard)

      this.spinnerLoader.renderSpinner()

      setTimeout(async () => {
         const mediaObject = this.medias
            .filter(({ id }) => id === parseInt(this.$activeMedia.dataset.id))
            .at(0)

         const mediaFactory = new ComponentMediaFactory(mediaObject, this.$activeMedia.dataset.type)
         const mediaCard = mediaFactory.createComponent()

         mediaCard.classList.value = 'lightbox__displayed-media'
         this.$mediaTitle.innerText = mediaFactory.title

         await this.displayMedia(mediaCard)
         this.$main.dataset.lightboxIsOpen = 'true'
         this.$lightbox.dataset.open = 'true'
         /*Enable KeyBoard Navigation*/
         document.addEventListener('keydown', e => this.keyboardNavigation(e))
         /*Enable Close Event*/
         this.$btnClose.addEventListener('click', e => this.closeLightbox(e))
         /*Enable Previous Event*/
         this.$btnPrevious.addEventListener('click', e => this.changeMedia(e, 'previous'))
         /*Enable Next Event*/
         this.$btnNext.addEventListener('click', e =>this.changeMedia(e, 'next'))
      }, 300)

      this.removeEventListenerToAllMedias()
   }

   async displayMedia(mediaCard) {
      setTimeout(async () => {
         this.spinnerLoader.removeSpinner()
         this.$mediaContainer.prepend(mediaCard)
         this.$lightbox.dataset.activeMediaId = this.$activeMedia.dataset.id
      }, 900)
   }

   /**
    *
    * @param {MouseEvent | KeyboardEvent } e
    */
   closeLightbox(e) {
      this.$main.dataset.lightboxIsOpen = 'false'

      setTimeout(() => {
      this.$lightbox.dataset.open = 'false'
      }, 400)

      this.addEventListenerToAllMedias()
      this.$btnPrevious.removeEventListener('click', this.changeMedia)
      this.$btnNext.removeEventListener('click', this.changeMedia)
      document.removeEventListener('keydown', this.keyboardNavigation)
   }

   /**
    *
    * @param {MouseEvent | KeyboardEvent } e
    * @param {string} type is type of "previous" or "next"
    */
   async changeMedia(e, type){
      e.preventDefault()

      const activeMediaCard = document.querySelector('.lightbox__displayed-media')
      const getActiveId = parseInt(this.$lightbox.dataset.activeMediaId)
      const activeMediaInFilterMedia = this.medias.filter(media => media.id === getActiveId)[0]

      let index

      const activeIndex = this.medias.indexOf(activeMediaInFilterMedia)
      const arraySize = this.medias.length - 1

      switch (type) {
         case 'next':
            if (activeIndex === arraySize) index = 0
            else index = activeIndex + 1
            break
         case 'previous':
            if (activeIndex === 0) index = arraySize
            else index = activeIndex - 1
            break
      }

      const nextConstructorMedia = this.medias[index]

      const nextMediaFactory = new ComponentMediaFactory(
         nextConstructorMedia,
         nextConstructorMedia.mediaType
      )
      const nextMediaCard = nextMediaFactory.createComponent()

      nextMediaCard.classList.value = 'lightbox__displayed-media'
      this.$mediaTitle.innerText = nextMediaFactory.title
      this.$mediaContainer.removeChild(activeMediaCard)
      this.spinnerLoader.renderSpinner()

      setTimeout(() => {
         this.$lightbox.dataset.activeMediaId = nextConstructorMedia.id
         this.spinnerLoader.removeSpinner()
         this.$mediaContainer.appendChild(nextMediaCard)
      }, 450)
   }

   async keyboardNavigation(e) {
      switch (e.key) {
         case 'ArrowLeft':
            await this.changeMedia(e, 'previous')
            this.$btnPrevious.classList.add('focusNavigation')
            break
         case 'ArrowRight':
            await this.changeMedia(e, 'next')
            this.$btnNext.classList.add('focusNavigation')
            break
         case 'Escape':
            this.closeLightbox(e)
            this.$btnClose.classList.add('focusNavigation')
            break
      }
   }

   async init() {
      document.addEventListener('keyup', e => {
         setTimeout(() => {
            switch (e.key) {
               case 'ArrowLeft':
                  this.$btnPrevious.classList.remove('focusNavigation')
                  break
               case 'ArrowRight':
                  this.$btnNext.classList.remove('focusNavigation')
                  break
               case 'Escape':
                  this.$btnClose.classList.remove('focusNavigation')
                  break
            }
         }, 250)
      })
      this.addEventListenerToAllMedias()

      this.$lightboxContent.appendChild(this.$mediaContainer)
      this.$lightboxContent.appendChild(this.$mediaTitle)
      this.$lightbox.appendChild(this.$btnPrevious)
      this.$lightbox.appendChild(this.$btnClose)
      this.$lightbox.appendChild(this.$btnNext)
      this.$lightbox.appendChild(this.$lightboxContent)
   }
}
