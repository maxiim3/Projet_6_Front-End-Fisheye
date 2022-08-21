class CardMedia {
   constructor(media, accessibilityIndex) {
      this._media = media
      this._index = accessibilityIndex
   }

   getMedia() {
      return new ComponentMediaFactory(this._media, this._media.mediaType)
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
      $likesCounter.dataset.countLikes = likes

      // like Icon
      const $likesIcon = document.createElement('i')
      $likesIcon.alt = 'Cliquez pour ajouter à vos favoris'
      $likesIcon.classList.value = 'fa-solid fa-heart card__information__icon'

      $likeWrapper.appendChild($likesCounter)
      $likeWrapper.appendChild($likesIcon)

      const $asideLike = document
         .querySelector('.photographer__aside')
         .querySelector('.aside__count-like')

      $likeWrapper
         .querySelector('.card__information__icon')
         .addEventListener('click', ev => {
            ev.preventDefault()

            if ($likeWrapper.dataset.isLiked === 'true') {
               $likeWrapper.dataset.isLiked = 'false'
               this._media.LikeCounter.update('DEC')
               $likesCounter.innerText = this._media.LikeCounter.count
               $likesCounter.dataset.countLikes = this._media.LikeCounter.count
               $asideLike.innerHTML = parseInt($asideLike.innerHTML) -1
            } else {
               $likeWrapper.dataset.isLiked = 'true'
               this._media.LikeCounter.update('INC')
               $likesCounter.innerText = this._media.LikeCounter.count
               $likesCounter.dataset.countLikes = this._media.LikeCounter.count
               $asideLike.innerHTML = parseInt($asideLike.innerHTML) +1
            }
         })

      $section.appendChild($mediaTitle)
      $section.appendChild($likeWrapper)

      return $section
   }

   getCardWrapper({ mediaType }) {
      const card = new CardComponent(mediaType, 'Média')
      return card.createComponent()
   }

   createCard(name, value) {
      const { id, title, photographer, mediaType } = this._media
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

      return card
   }

   // async setUrl() {
   //    const { id, title, photographer } = this._media
   //    let [url, params] = location.href.split('?')
   //    params = `?photographer=${photographer.id}&media=${id}`
   //    location.href = url + params
   // }
}
