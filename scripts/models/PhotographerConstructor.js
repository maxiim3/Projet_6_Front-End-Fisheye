/**
 * @type Class
 * @description PhotographerConstructor create object fetched from an API based on photographer.prhotographer
 * @param {JSON} data
 * @method {number} id
 * @method {string} name
 * @method {string} tagLine
 * @method {string} location
 * @method {string} price
 * @method {string} portrait
 * @return ObjectConstructor
 */
class PhotographerConstructor {
   _data
   constructor(data) {
      this._data = data
   }

   get id() {
      return this._data['id']
   }

   get name() {
      return this._data['name']
   }

   get tagline() {
      return this._data['tagline']
   }

   get location() {
      return `${this._data['city']}, ${this._data['country']}`
   }
   get price() {
      return `${this._data['price']}€/jour`
   }

   get portrait() {
      return `assets/images/photographerPortrait/${this._data['portrait']}`
   }
}
