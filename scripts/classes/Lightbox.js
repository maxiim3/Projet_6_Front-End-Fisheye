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
      this.$lightboxContent.classList.value = 'lightbox__container'

      this.$mediaContainer = document.createElement('div')
      this.$mediaContainer.classList.value = 'lightbox__media-wrapper'
      this.$mediaContainer.tabIndex = 0

      this.$previousIcon = document.createElement('span')
      this.$previousIcon.classList.value = 'fa-solid fa-angle-left'
      this.$previousBtn = document.createElement('button')
      this.$previousBtn.classList.value = 'navigation navigation--previous'
      this.$previousBtn.ariaRoleDescription = "naviguer à l'élément précédent"
      this.$previousBtn.appendChild(this.$previousIcon)

      this.$nextIcon = document.createElement('span')
      this.$nextIcon.classList.value = 'fa-solid fa-angle-right'
      this.$nextBtn = document.createElement('button')
      this.$nextBtn.classList.value = 'navigation navigation--next'
      this.$nextBtn.ariaRoleDescription = "naviguer à l'élément suivant"
      this.$nextBtn.appendChild(this.$nextIcon)

      this.$closeIcon = document.createElement('span')
      this.$closeIcon.classList.value = 'fa-solid fa-xmark'
      this.$closeBtn = document.createElement('button')
      this.$closeBtn.classList.value = 'navigation navigation--close'
      this.$closeBtn.ariaRoleDescription = 'Fermer la fenêtre'
      this.$closeBtn.appendChild(this.$closeIcon)

      this.$mediaTitle = document.createElement('h3')
      this.$mediaTitle.classList.value = 'lightbox__title'
      this.$mediaTitle.ariaLabel = 'titre'
      this.$mediaTitle.tabIndex = 0

      // All Medias from page
      this.allMediaLink = [...document.querySelectorAll('.media__link')]
      // Spinner Loader Class
      this.spinnerLoader = new LoadingSpinner(this.$mediaContainer)
   }

   /**
    * Add event Listener to all media cards in the photographer page
    * @param e
    */
   addEventListenerToAllMedias(e) {
      return this.allMediaLink.forEach($media =>
         $media.addEventListener('click', e => this.openLightbox(e, $media))
      )
   }

   removeEventListenerToAllMedias() {
      return this.allMediaLink.forEach(media =>
         media.removeEventListener('click', this.openLightbox)
      )
   }

   /**
    *
    * @param {MouseEvent} e
    * @param {HTMLLinkElement} $mediaLink
    */
   openLightbox(e, $mediaLink) {
      e.preventDefault()
      this.$activeMedia = $mediaLink

      document.querySelector('.lightbox__media-wrapper').focus({ focusVisible: true })
      //remove focus on main logo link
      document.querySelector('header a').ariaHidden = 'true'
      document.querySelector('header a').tabIndex = -1

      const previousMediaCard = document.querySelector('.lightbox__displayed-media')
      if (previousMediaCard) this.$mediaContainer.removeChild(previousMediaCard)

      this.spinnerLoader.renderSpinner()

      setTimeout(async () => {
         const mediaObject = this.medias
            .filter(({ id }) => id === parseInt(this.$activeMedia.dataset.id))
            .at(0)

         const mediaFactory = new MediaFactory(mediaObject, true)
         const mediaCard = mediaFactory.createComponent()

         mediaCard.classList.value = 'lightbox__displayed-media'
         this.$mediaTitle.innerText = mediaObject.title

         await this.displayMedia(mediaCard)
         this.$main.dataset.lightboxIsOpen = 'true'
         this.$lightbox.dataset.open = 'true'
         /*Enable KeyBoard Navigation*/
         document.addEventListener('keydown', e => this.keyboardNavigation(e))
         /*Enable Close Event*/
         this.$closeBtn.addEventListener('click', e => this.closeLightbox(e))
         /*Enable Previous Event*/
         this.$previousBtn.addEventListener('click', e => this.changeMedia(e, 'previous'))
         /*Enable Next Event*/
         this.$nextBtn.addEventListener('click', e => this.changeMedia(e, 'next'))
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
      this.$lightbox.dataset.open = 'false'
      //reset focus on main logo link
      document.querySelector('header a[href="index.html"]').ariaHidden = 'false'
      document.querySelector('header a').tabIndex = 0

      setTimeout(() => {
         this.$main.dataset.lightboxIsOpen = 'false'
      }, 250)

      this.addEventListenerToAllMedias()
      this.$previousBtn.removeEventListener('click', this.changeMedia)
      this.$nextBtn.removeEventListener('click', this.changeMedia)
      document.removeEventListener('keydown', this.keyboardNavigation)
      this.spinnerLoader.renderSpinner()
   }

   /**
    *
    * @param {MouseEvent | KeyboardEvent } e
    * @param {string} type is type of "previous" or "next"
    */
   async changeMedia(e, type) {
      e.preventDefault()
      this.spinnerLoader.renderSpinner()
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

      const nextMediaFactory = new MediaFactory(nextConstructorMedia, true)
      const nextMediaCard = nextMediaFactory.createComponent()

      nextMediaCard.classList.value = 'lightbox__displayed-media'

      this.$mediaTitle.innerText = nextConstructorMedia.title
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
            this.$previousBtn.classList.add('focusNavigation')
            break
         case 'ArrowRight':
            await this.changeMedia(e, 'next')
            this.$nextBtn.classList.add('focusNavigation')
            break
         case 'Escape':
            this.closeLightbox(e)
            this.$closeBtn.classList.add('focusNavigation')
            break
      }
   }

   async init() {
      this.addEventListenerToAllMedias()

      document.addEventListener('keyup', e => {
         setTimeout(() => {
            switch (e.key) {
               case 'ArrowLeft':
                  this.$previousBtn.classList.remove('focusNavigation')
                  break
               case 'ArrowRight':
                  this.$nextBtn.classList.remove('focusNavigation')
                  break
               case 'Escape':
                  this.$closeBtn.classList.remove('focusNavigation')
                  break
            }
         }, 250)
      })

      this.$lightboxContent.appendChild(this.$mediaContainer)
      this.$lightboxContent.appendChild(this.$mediaTitle)
      this.$lightbox.appendChild(this.$previousBtn)
      this.$lightbox.appendChild(this.$closeBtn)
      this.$lightbox.appendChild(this.$nextBtn)
      this.$lightbox.appendChild(this.$lightboxContent)
   }
}
