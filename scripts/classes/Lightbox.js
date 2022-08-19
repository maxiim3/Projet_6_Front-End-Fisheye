class Lightbox {
   constructor() {
      this.$main = document.querySelector('main')
      this.$lightbox = document.querySelector('#lightbox')
      this.allMediaLink = [...document.querySelectorAll('.mediaLink')]

      this.$lightboxContent = document.createElement('div')
      $lightboxContent.classList.value = 'lightbox__content'

      this.$mediaContainer = document.createElement('div')
      $mediaContainer.classList.value = 'media_container'

      this.$btnPrevious = document.createElement('i')
      $btnPrevious.classList.value = 'fa-solid fa-angle-left'

      this.$btnNext = document.createElement('i')
      $btnNext.classList.value = 'fa-solid fa-angle-right'

      this.$btnClose = document.createElement('i')
      $btnClose.classList.value = 'fa-solid fa-xmark'

      this.$mediaTitle = document.createElement('h3')
      $mediaTitle.classList.value = 'lightbox__title'

      this.spinner = document.createElement('div')
      spinner.classList.value = 'duo'
   }
}

const lightbox = async filterMedia => {
   //region DOM Element declarations
   // lightbox

   const $main = document.querySelector('main')
   const $lightbox = document.querySelector('#lightbox')
   const allMediaLink = [...document.querySelectorAll('.mediaLink')]

   const $lightboxContent = document.createElement('div')
   $lightboxContent.classList.value = 'lightbox__content'

   const $mediaContainer = document.createElement('div')
   $mediaContainer.classList.value = 'media_container'

   const $btnPrevious = document.createElement('i')
   $btnPrevious.classList.value = 'fa-solid fa-angle-left'

   const $btnNext = document.createElement('i')
   $btnNext.classList.value = 'fa-solid fa-angle-right'

   const $btnClose = document.createElement('i')
   $btnClose.classList.value = 'fa-solid fa-xmark'

   const $mediaTitle = document.createElement('h3')
   $mediaTitle.classList.value = 'lightbox__title'

   const spinner = document.createElement('div')
   spinner.classList.value = 'duo'

   //endregion

   function addEventListenerToAllMedias(e) {
      allMediaLink.forEach(media => media.addEventListener('click', e => openLightbox(e)))
   }

   function removeEventListenerToAllMedias() {
      allMediaLink.forEach(media => media.removeEventListener('click', openLightbox))
   }

   /**
    *
    * @param {MouseEvent} e
    */
   function openLightbox(e) {
      e.preventDefault()

      const previousMediaCard = document.querySelector('.lightbox__displayed-media')
      if (previousMediaCard) $mediaContainer.removeChild(previousMediaCard)

      $mediaContainer.appendChild(spinner)

      setTimeout(() => {
         const getMediaInstance = filterMedia
            .filter(({ id }) => id === parseInt(this.dataset.id))
            .at(0)
         const mediaFactory = new ComponentMediaFactory(getMediaInstance, this.dataset.type)
         const mediaCard = mediaFactory.createComponent()
         mediaCard.classList.value = 'lightbox__displayed-media'
         $mediaTitle.innerText = mediaFactory.title

         setTimeout(() => {
            $mediaContainer.removeChild(spinner)
            $mediaContainer.appendChild(mediaCard)
            $lightbox.dataset.activeMediaId = getMediaInstance.id
         }, 900)

         $main.dataset.lightboxIsOpen = 'true'
         $lightbox.dataset.open = 'true'
      }, 300)

      removeEventListenerToAllMedias()
   }

   /**
    *
    * @param {MouseEvent | KeyboardEvent } e
    */
   function closeLightbox(e) {
      $main.dataset.lightboxIsOpen = 'false'

      setTimeout(() => {
         $lightbox.dataset.open = 'false'
      }, 200)

      addEventListenerToAllMedias()
      $btnPrevious.removeEventListener('click', previousMedia)
      $btnNext.removeEventListener('click', nextMedia)
      document.removeEventListener('keydown', keyboardNavigation)
      this.removeEventListener('click', openLightbox)
   }

   /**
    *
    * @param {MouseEvent | KeyboardEvent } e
    */
   async function nextMedia(e) {
      e.preventDefault()
      this.focus()
      /* recupere toutes le data de photographe todo a refactoriser (repetition de code)*/
      const photographer = await getActivePhotographer()
      /* recupere toutes les medias todo a refactoriser (repetition de code)*/
      const media = await getMedia()
      /* recupere recupere les medias du photographe actif todo a refactoriser (repetition de code)*/
      const filterMedia = media
         .filter(media => media.photographerId === photographer.id)
         .map(media => {
            const mediaData = new MediaConstructor(media)
            return MediaWithPhotographer(mediaData, photographer)
         })
      /* DOM media actif dans lightbox*/
      const activeMediaCard = document.querySelector('.lightbox__displayed-media')
      const getActiveId = parseInt($lightbox.dataset.activeMediaId)
      const activeMediaInFilterMedia = filterMedia.filter(media => media.id === getActiveId)[0]

      let nextIndex

      const activeIndex = filterMedia.indexOf(activeMediaInFilterMedia)
      const arraySize = filterMedia.length - 1
      if (activeIndex === arraySize) nextIndex = 0
      else nextIndex = activeIndex + 1
      const nextConstructorMedia = filterMedia[nextIndex]

      const nextMediaFactory = new ComponentMediaFactory(
         nextConstructorMedia,
         nextConstructorMedia.mediaType
      )
      const nextMediaCard = nextMediaFactory.createComponent()
      nextMediaCard.classList.value = 'lightbox__displayed-media'
      $mediaTitle.innerText = nextMediaCard.title
      $mediaContainer.removeChild(activeMediaCard)
      $mediaContainer.appendChild(spinner)
      setTimeout(() => {
         $lightbox.dataset.activeMediaId = nextConstructorMedia.id
         $mediaContainer.removeChild(spinner)
         $mediaContainer.appendChild(nextMediaCard)
      }, 450)
   }

   /**
    *
    * @param {MouseEvent | KeyboardEvent } e
    */
   async function previousMedia(e) {
      e.preventDefault()
      this.focus()
      /* recupere toutes le data de photographe todo a refactoriser (repetition de code)*/
      const photographer = await getActivePhotographer()
      const media = await getMedia()
      const filterMedia = media
         .filter(media => media.photographerId === photographer.id)
         .map(media => {
            const mediaData = new MediaConstructor(media)
            return MediaWithPhotographer(mediaData, photographer)
         })
      const activeMediaCard = document.querySelector('.lightbox__displayed-media')

      const getActiveId = parseInt($lightbox.dataset.activeMediaId)
      const activeMediaInFilterMedia = filterMedia.filter(media => media.id === getActiveId)[0]

      let previousIndex

      const activeIndex = filterMedia.indexOf(activeMediaInFilterMedia)
      const arraySize = filterMedia.length - 1
      if (activeIndex === 0) previousIndex = arraySize
      else previousIndex = activeIndex - 1

      const previousConstructorMedia = filterMedia[previousIndex]
      const previousMediaFactory = new ComponentMediaFactory(
         previousConstructorMedia,
         previousConstructorMedia.mediaType
      )
      const previousMediaCard = previousMediaFactory.createComponent()
      previousMediaCard.classList.value = 'lightbox__displayed-media'
      $mediaTitle.innerText = previousMediaCard.title
      $mediaContainer.appendChild(spinner)
      $mediaContainer.removeChild(activeMediaCard)
      setTimeout(() => {
         $lightbox.dataset.activeMediaId = previousConstructorMedia.id
         $mediaContainer.removeChild(spinner)
         $mediaContainer.appendChild(previousMediaCard)
      }, 450)
   }

   function keyboardNavigation(e) {
      switch (e.key) {
         case 'ArrowLeft':
            previousMedia(e)
            $btnPrevious.classList.add('focusNavigation')
            break
         case 'ArrowRight':
            nextMedia(e)
            $btnNext.classList.add('focusNavigation')
            break
         case 'Escape':
            closeLightbox(e)
            $btnClose.classList.add('focusNavigation')
            break
      }
   }

   document.addEventListener('keyup', e => {
      setTimeout(() => {
         switch (e.key) {
            case 'ArrowLeft':
               $btnPrevious.classList.remove('focusNavigation')
               break
            case 'ArrowRight':
               $btnNext.classList.remove('focusNavigation')
               break
            case 'Escape':
               $btnClose.classList.remove('focusNavigation')
               break
         }
      }, 250)
   })

   addEventListenerToAllMedias()

   document.addEventListener('keydown', keyboardNavigation)
   /*Close*/
   $btnClose.addEventListener('click', closeLightbox)
   /*Previous*/
   $btnPrevious.addEventListener('click', previousMedia)
   /*Next*/
   $btnNext.addEventListener('click', previousMedia)

   /*! 1// Je test de d'appeler la Factory onLick media
   listOfMedias.forEach(mediaCard =>
      $mediaContainer.appendChild(mediaCard.createComponent())
   )*/
   $lightboxContent.appendChild($mediaContainer)
   $lightboxContent.appendChild($mediaTitle)
   $lightbox.appendChild($btnPrevious)
   $lightbox.appendChild($btnClose)
   $lightbox.appendChild($btnNext)
   $lightbox.appendChild($lightboxContent)

   return $lightbox
}
