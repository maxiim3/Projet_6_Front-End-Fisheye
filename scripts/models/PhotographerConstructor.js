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
   #data

   constructor(data) {
      this.#data = data
   }

   get data() {
      return this.#data
   }

   get id() {
      return this.#data['id']
   }

   get name() {
      return this.#data['name']
   }

   get tagline() {
      return this.#data['tagline']
   }

   get location() {
      return `${this.#data['city']}, ${this.#data['country']}`
   }

   get price() {
      return `${this.#data['price']}€/jour`
   }

   get portrait() {
      return `assets/images/photographerPortrait/${this.#data['portrait']}`
   }
}
