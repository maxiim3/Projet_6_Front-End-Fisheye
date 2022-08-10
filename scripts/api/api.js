class Api {
   _url
   constructor(url) {
      this._url = url
   }

   get url() {
      return this._url
   }

   async get() {
      return fetch(this.url)
         .then(res => res.json())
         .then(data => data)
         .catch(err => console.warn(`Un problème est survenu...${err}`))
   }
}

class PhotographersApi extends Api {
   constructor(url) {
      super(url)
   }

   async getPhotographers () {
      return await this.get()
   }
}