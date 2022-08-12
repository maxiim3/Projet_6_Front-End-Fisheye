class MediaCard {
   constructor(media, accessibilityIndex) {
      this._media = media
      this._index = accessibilityIndex
   }

   // createImage() {
   //    const $img = document.createElement('img')
   //    $img.classList.value = 'imgMedia'
   //
   //    return $img
   // }

   // createVideo() {
   //    const $video = document.createElement('video')
   //    $video.controls = true
   //    $video.classList.value = 'imgMedia'
   //    $video.disablePictureInPicture = true
   //    $video.autoplay = true
   //
   //    return $video
   // }
   getMedia() {
      const { title, mediaType, mediaLink, photographerName } = this._media
      let media

      if (mediaType === 'image') media = this.createImage()
      else if (mediaType === 'video') media = this.createVideo()

      media.src = mediaLink
      media.alt = `${title} par ${photographerName}`

      return media
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

   getCardWrapper({mediaType}) {
      const card = new CardComponent(mediaType, "Média")
      return card.createComponent()
   }
   createMediaCard() {
      const { id } = this._media
      const card = this.getCardWrapper(this._media)
      const link = new LinkComponent(id, 'media', 'Agrandir l\'élément', this._index)
      const media = this.getMedia()

      const $link = link.createComponent()
      $link.appendChild(media)

      const information = this.createInformationSection()
 // todo refactoriser avec les nouveaux composants comme pour photographerCard et Cardheader
      // add main component to card wrapper
      card.appendChild($link)
      card.appendChild(information)

      return card
   }
}
