class MediaCard {
   constructor(media, accessibilityIndex) {
      this._media = media
      this._index = accessibilityIndex
   }

   getMedia() {
      return new MediaFactory(this._media, this._media.mediaType)
   }

   createInformationSection() {
      const { likes, title } = this._media
      //section
      const $section = document.createElement('section')
      $section.classList.value = 'card__information flex flex__row justifyBetween alignCenter'
      $section.ariaLabel = "Plus d'informations"
      $section.tabIndex = this._index + 1

      // title
      const $mediaTitle = document.createElement('h3')
      $mediaTitle.innerText = title
      $mediaTitle.classList.value = 'card__information--title'
      // Like span
      const $likesSpan = document.createElement('span')
      $likesSpan.innerText = likes
      $likesSpan.classList.value = 'card__information--likes'

      // like Icon
      const $likesIcon = document.createElement('img')
      $likesIcon.src = 'assets/icons/heart-solid.svg'
      $likesIcon.alt = 'Cliquez pour ajouter à vos favoris'
      $likesIcon.classList.value = 'likeIcon'

      $likesSpan.appendChild($likesIcon)
      $section.appendChild($mediaTitle)
      $section.appendChild($likesSpan)

      return $section
   }

   getCardWrapper({ mediaType }) {
      const card = new CardComponent(mediaType, 'Média')
      return card.createComponent()
   }

   createMediaCard() {
      const { id, title, photographer } = this._media
      const card = this.getCardWrapper(this._media)
      const link = new LinkComponent('media', id, photographer,  "Agrandir l'élément", this._index)
      const media = this.getMedia()
      const $media = media.createComponent()
      const $link = link.createComponent()
      $link.appendChild($media)

      $link.addEventListener('click', e => {
         e.preventDefault()
         console.log(`opening ${photographer.name}'s ${title}...`)
      })

      const information = this.createInformationSection()
      // add main component to card wrapper
      card.appendChild($link)
      card.appendChild(information)

      return card
   }
}
