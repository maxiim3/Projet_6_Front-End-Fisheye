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

   async getPhotographers() {
      const photographer = await this.get()
      return photographer.photographers
   }

   async getMedia() {
      const photographer = await this.get()
      return photographer.media
   }
}