class PhotographerCard {
   _photographer

   constructor(photographer) {
      this._photographer = photographer
   }

   get photographer() {
      return this._photographer
   }

   createPhotographerCard() {
      // article main card element
      const $article = document.createElement('article')
      $article.setAttribute('class', 'photographerCard')
      $article.setAttribute('aria-label', `Informations sur le photographe ${this.photographer.name}`)

      // link to artist page | contains img and h2
      const $linkFocusable = document.createElement('a')
      $linkFocusable.setAttribute('class', 'card__artistLink')
      $linkFocusable.setAttribute('href', `/photographer-${this.photographer.name}`)

      const $portrait = document.createElement('img')
      $portrait.setAttribute('src', this.photographer.portrait)
      $portrait.setAttribute('class', 'card__artistLink__portrait')
      $portrait.setAttribute('alt', `Photo de profil de ${this.photographer.name}`)

      const $h2 = document.createElement('h2')
      $h2.innerText = this.photographer.name
      $h2.setAttribute('class', 'card__artistLink__title')

      // static texte
      const $information = document.createElement('ul')
      $information.setAttribute('class', 'card__information')

      const $location = document.createElement('li')
      $location.innerText = this.photographer.getLocation()
      $location.setAttribute('aria-label', "Localisation de l'artiste")
      $location.setAttribute('class', 'card__information__item card__information__item--location')

      const $tagline = document.createElement('li')
      $tagline.innerText = this.photographer.tagline
      $tagline.setAttribute('aria-label', 'Slogan')
      $tagline.setAttribute('class', 'card__information__item card__information__item--tagline')

      const $price = document.createElement('li')
      $price.innerText = this.photographer.price
      $price.setAttribute('aria-label', "Localisation de l'artiste")
      $price.setAttribute('class', 'card__information__item card__information__item--price')

      // Append list items to list
      $information.appendChild($location)
      $information.appendChild($tagline)
      $information.appendChild($price)

      //Append img and title to link
      $linkFocusable.appendChild($portrait)
      $linkFocusable.appendChild($h2)

      // add main component to card wrapper
      $article.appendChild($linkFocusable)
      $article.appendChild($information)

      return $article
   }
}
