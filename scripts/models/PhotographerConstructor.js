class PhotographerConstructor {
   _data
   constructor(data) {
      this._data = data
   }

   get id() {
      return this._data.id
   }

   get name() {
      return this._data.name
   }

   get tagline() {
      return this._data.tagline
   }

   get location() {
      return `${this._data.city}, ${this._data.country}`
   }
   get price() {
      return `${this._data.price}€/jour`
   }

   get portrait() {
      return `assets/photographers/id/${this._data.portrait}`
   }
}
