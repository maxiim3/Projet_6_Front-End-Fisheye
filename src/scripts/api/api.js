class Api {
   _url

   constructor(url) {
      this._url = url
   }

   get url() {
      return this._url
   }

   async fetch() {
      try {
         const fetchData = await fetch(this.url) // Promesse
         return await fetchData.json() // renvoie un objet JSON
      } catch (e) {
         throw new Error('Un problème est survenu...')
      }
   }

}
