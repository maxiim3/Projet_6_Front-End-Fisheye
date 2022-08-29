class CardMedia {
   constructor(media, accessibilityIndex) {
      this._media = media
      this._index = accessibilityIndex
   }

   getMedia() {
      return new MediaFactory(this._media)
   }

   createInformationSection() {
      const { likes, title } = this._media
      //section
      const $section = document.createElement('section')
      $section.classList.value = 'card__information'
      $section.ariaLabel = "Plus d'informations"
      $section.tabIndex = this._index + 1

      // title
      const $mediaTitle = document.createElement('h3')
      $mediaTitle.innerText = title
      $mediaTitle.classList.value = 'card__information__title'

      // like Wrapper
      const $likeWrapper = document.createElement('div')
      $likeWrapper.classList.value = 'card__information__wrapper'
      $likeWrapper.ariaHidden = 'true'
      $likeWrapper.dataset.isLiked = 'false'
      $likeWrapper.dataset.mediaId = this._media.id

      // Like span
      const $likesCounter = document.createElement('p')
      $likesCounter.innerText = likes
      $likesCounter.classList.value = 'card__information__likes'
      $likesCounter.ariaLabel = `Nombre de likes : ${likes}`
      $likesCounter.tabIndex = 0
      $likesCounter.dataset.countLikes = likes

      // like Icon
      const $likesIcon = document.createElement('span')
      $likesIcon.alt = 'Cliquez pour ajouter à vos favoris'
      $likesIcon.classList.value = 'fa-solid fa-heart card__information__icon'
      $likesIcon.tabIndex = 0
      $likesIcon.ariaLabel = 'Sélectionner pour ajouter à vos favoris'

      $likeWrapper.appendChild($likesCounter)
      $likeWrapper.appendChild($likesIcon)

      $section.appendChild($mediaTitle)
      $section.appendChild($likeWrapper)

      return $section
   }

   getCardWrapper({ mediaType }) {
      const card = new CardComponent(mediaType, 'Média')
      return card.createComponent()
   }

   handleLike(card) {
      const $asideLike = document
         .querySelector('.photographer__aside')
         .querySelector('.aside__count-like')
      const $likesCounter = card.querySelector('.card__information__likes')

      card.querySelector('.card__information__icon').addEventListener('click', ev => {
         ev.preventDefault()

         const dom = { card, $likesCounter, $asideLike }
         if (card.dataset.isLiked === 'true') {
            card.dataset.isLiked = 'false'
            this.updateLikes('DEC', dom)
         } else {
            card.dataset.isLiked = 'true'
            this.updateLikes('INC', dom)
         }
      })
   }

   updateLikes(type, { card, $likesCounter, $asideLike }) {
      switch (type) {
         case 'DEC':
            this._media.LikeCounter.update('DEC')
            $asideLike.innerHTML = parseInt($asideLike.innerHTML) - 1
            break
         case 'INC':
            this._media.LikeCounter.update('INC')
            $asideLike.innerHTML = parseInt($asideLike.innerHTML) + 1
            break
      }
      $likesCounter.textContent = this._media.LikeCounter.count
      $likesCounter.dataset.countLikes = this._media.LikeCounter.count
      card.dataset.popularite = this._media.LikeCounter.count
   }

   createCard() {
      const { id, photographer, mediaType } = this._media
      const card = this.getCardWrapper(this._media)

      const link = new LinkComponent("Agrandir l'élément", this._index, {
         photographer: {
            id: 'photographer',
            value: photographer.id,
         },
         media: {
            id: 'media',
            value: id,
         },
      })
      const media = this.getMedia()
      const $media = media.createComponent()
      const $link = link.createComponent()
      $link.appendChild($media)
      $link.dataset.id = id
      $link.dataset.type = mediaType
      $link.dataset.photographer = photographer.id
      const information = this.createInformationSection()
      // add main component to card wrapper
      card.appendChild($link)
      card.appendChild(information)

      card.dataset.titre = this._media._data.title
      card.dataset.date = this._media._data.date
      card.dataset.popularite = this._media.LikeCounter.count

      this.handleLike(card)

      return card
   }
}
