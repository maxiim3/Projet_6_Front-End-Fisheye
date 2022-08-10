//Mettre le code JavaScript lié à la page photographer.html

// Todo recuperer les elements du contact modal et appeler les fonctions presentes dans le HTML cf Todo photographer.html

class App {
   constructor() {
      this.photographersApi = new PhotographersApi('/data/photographers.json')
      this.$photographersCardWrapper = document.querySelector('.photographer_section')
      this.params = new URL(document.location).searchParams
   }

   async getPhotographersData() {
      const allData = await this.photographersApi.getPhotographers()
      return await allData['photographers']
   }

   async getMediaData() {
      const allData = await this.photographersApi.getPhotographers()
      return await allData['media']
   }

   async init() {
      const photographers = await this.getPhotographersData()
      const photographerId = parseInt(this.params.get('photographer'))
      console.log(photographerId)
      const data = photographers.filter(data =>
         data.id === photographerId
      )
      console.log(photographerId)
      let tabIndex = 2
      const photographerData = new PhotographerConstructor(data[0])
      const CardTemplate = new PhotographerCard(photographerData, tabIndex)
      // todo call new Template
      // todo factory pour API
      // todo factory pour Data
      // todo factory pour Template
      // todo create new Constructor for media
      const card = CardTemplate.createPhotographerCard()
      this.$photographersCardWrapper.appendChild(card)

      const media = await this.getMediaData()
      // media.forEach(el => {
      //    console.log(el.photographerId === photographerId)
      // })
      const photoMedia = media.filter(data => data.photographerId === photographerData.id )

      console.log(photoMedia)
   }
}

const app = new App()
app.init()
