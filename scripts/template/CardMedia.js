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
