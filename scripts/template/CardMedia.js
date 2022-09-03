class CardMedia {
   constructor(media) {
      this._media = media
   }

   createInformationSection() {
      const { likes, title } = this._media

      // Like counter : number of likes {string}
      const $likesCounter = document.createElement('p')
      $likesCounter.innerText = likes
      $likesCounter.classList.value = 'card__information__likes'
      $likesCounter.ariaLabel = `Nombre de likes : ${likes}`
      $likesCounter.tabIndex = 0
      $likesCounter.dataset.countLikes = likes

      // like Icon
      const $likesIcon = document.createElement('span')
      $likesIcon.classList.value = 'fa-solid fa-heart card__information__icon'

      // Like BTN | wraps like icon
      const $likeBtn = document.createElement('button')
      $likeBtn.classList.value = 'card__information__btn'
      $likeBtn.alt = 'Cliquez pour ajouter à vos favoris'
      $likeBtn.ariaLabel = 'Sélectionner pour ajouter à vos favoris'
      $likeBtn.appendChild($likesIcon)

      // like Wrapper
      const $likeWrapper = document.createElement('div')
      $likeWrapper.classList.value = 'card__information__wrapper'
      $likeWrapper.ariaHidden = 'true'
      $likeWrapper.dataset.isLiked = 'false'
      $likeWrapper.dataset.mediaId = this._media.id
      $likeWrapper.appendChild($likesCounter)
      $likeWrapper.appendChild($likeBtn)

      // title
      const $mediaTitle = document.createElement('h3')
      $mediaTitle.innerText = title
      $mediaTitle.classList.value = 'card__information__title'

      //section
      const $section = document.createElement('section')
      $section.classList.value = 'card__information'
      $section.ariaLabel = "Plus d'informations"
      $section.tabIndex = 0
      $section.appendChild($mediaTitle)
      $section.appendChild($likeWrapper)

      return $section
   }

   handleOnLike(card) {
      const $asideLike = document
         .querySelector('.photographer__aside')
         .querySelector('.aside__count-like')
      const $likesCounter = card.querySelector('.card__information__likes')

      card.querySelector('.card__information__btn').addEventListener('click', ev => {
         ev.preventDefault()

         const dom = { card, $likesCounter, $asideLike }

         switch (card.dataset.isLiked) {
            case 'true':
               card.dataset.isLiked = 'false'
               this.updateLikes('DEC', dom)
               break
            case 'false':
               card.dataset.isLiked = 'true'
               this.updateLikes('INC', dom)
               break
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
      const { id, photographer, mediaType, date, title, LikeCounter } = this._media

      // Card Wrapper
      const card = new CardComponent(mediaType, 'Média')
      const $card = card.createComponent()
      $card.dataset.titre = title
      $card.dataset.date = date
      $card.dataset.popularite = LikeCounter.count

      // Media <Img | Video>
      const media = new MediaFactory(this._media)
      const $media = media.createComponent()

      // Link to Lightbox
      const link = new LinkComponent("Agrandir l'élément", {
         photographer: {
            id: 'photographer',
            value: photographer.id,
         },
         media: {
            id: 'media',
            value: id,
         },
      })
      const $link = link.createComponent()
      $link.appendChild($media)
      $link.dataset.id = id
      $link.dataset.type = mediaType
      $link.dataset.photographer = photographer.id

      // Card Information
      const information = this.createInformationSection()

      // Append Dom elements
      $card.appendChild($link)
      $card.appendChild(information)

      this.handleOnLike($card)

      return $card
   }
}
