class PhotographerConstructor {
   _name
   _city
   _country
   _tagline
   _price
   _portrait
   constructor(data) {
      this._name = data.name
      this._city = data.city
      this._country = data.country
      this._tagline = data.tagline
      this._price = data.price
      this._portrait = data.portrait
      }

   get name() {
      return this._name
   }

   get city() {
      return this._city
   }

   get country() {
      return this._country
   }

   get tagline() {
      return this._tagline
   }

   getLocation() {
      return `${this.city}, ${this.country}`
   }
   get price() {
      return `${this._price}€/jour`
   }

   get portrait() {
      return `assets/photographers/id/${this._portrait}`
   }
}