class MediaCard {
   constructor(media, accessibilityIndex) {
      this._media = media
      this._index = accessibilityIndex
   }

   createCardWrapper() {
      const { mediaType } = this._media

      const $card = document.createElement('li')
      $card.classList.value = 'card'
      $card.ariaRoleDescription = mediaType
      $card.ariaLabel = `Media : ${mediaType}`
      return $card
   }

   createImage() {
      const $img = document.createElement('img')
      $img.classList.value = 'card__link__media card__link__media--image'

      return $img
   }

   createVideo() {
      const $video = document.createElement('video')
      $video.controls = true
      $video.classList.value = 'card__link__media card__link__media--video'
      $video.disablePictureInPicture = true
      $video.autoplay = true

      return $video
   }
   getMedia() {
      const { title, mediaType, mediaLink, photographerName } = this._media
      let media

      if (mediaType === 'image') media = this.createImage()
      else if (mediaType === 'video') media = this.createVideo()

      media.src = mediaLink
      media.alt = `${title} par ${photographerName}`

      return media
   }

   createLinkSection() {
      const { id } = this._media
      // link to artist page | contains img and h2
      const $linkFocusable = document.createElement('a')
      $linkFocusable.classList.value = 'card__link'
      $linkFocusable.href = `photographer.html?media=${id}`
      $linkFocusable.ariaRoleDescription = "Ouvrir l'élément en grand"
      $linkFocusable.ariaLabel = `Cliquer pour agrandir`
      $linkFocusable.tabIndex = this._index
      $linkFocusable.addEventListener('click', e => {
         e.preventDefault()
         console.log($linkFocusable.href)
      })
      const media = this.getMedia()
      $linkFocusable.appendChild(media)

      return $linkFocusable
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

      $likesSpan.appendChild($likesIcon)
      $section.appendChild($mediaTitle)
      $section.appendChild($likesSpan)

      return $section
   }

   createMediaCard() {
      const card = this.createCardWrapper()
      const linkFocusable = this.createLinkSection()
      const information = this.createInformationSection()

      // add main component to card wrapper
      card.appendChild(linkFocusable)
      card.appendChild(information)

      return card
   }
}
