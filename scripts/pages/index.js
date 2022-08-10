class App {
   constructor() {
      this.photographersApi = new PhotographersApi('/data/photographers.json')
      this.$photographersCardWrapper = document.querySelector('.photographer_section')
      this.startingTabIndex = 2
   }

   async getPhotographersData() {
      const allData = await this.photographersApi.getPhotographers()
      return await allData['photographers']
   }

   // Other Version. Decommenter (*3)
   // displayData(data) {
   //    data.forEach(e => {
   //       const photographerData = new PhotographerConstructor(e)
   //
   //       const photographersFactory = new PhotographerFactory(photographerData)
   //       const cardDOM = photographersFactory.getUserCardDOM()
   //       return this.$photographersCardWrapper.appendChild(cardDOM)
   //    })
   // }
   async init() {
      const photographers = await this.getPhotographersData()
      let tabIndex = this.startingTabIndex

      photographers.forEach(data => {
         const photographerData = new PhotographerConstructor(data)
         const CardTemplate = new PhotographerCard(photographerData, tabIndex)

         const card = CardTemplate.createPhotographerCard()
         this.$photographersCardWrapper.appendChild(card)
         tabIndex += 2
      })
      // this.displayData(photographers) (*3)
   }
}

const app = new App()
app.init()

// let params = (new URL(document.location)).searchParams;
// let name = params.get('nom'); // la chaine de caractère "Jonathan Smith".
// let age = parseInt(params.get('age')); // le nombre 18


// ========================================== //

// async function getPhotographers() {
//    // Penser à remplacer par les données récupérées dans le json
//    // Utilisre un pattern ?
//    const photographers = [
//       {
//          name: 'Ma data test',
//          id: 1,
//          city: 'Paris',
//          country: 'France',
//          tagline: 'Ceci est ma data test',
//          price: 400,
//          portrait: 'account.png',
//       },
//       {
//          name: 'Autre data test',
//          id: 2,
//          city: 'Londres',
//          country: 'UK',
//          tagline: 'Ceci est ma data test 2',
//          price: 500,
//          portrait: 'account.png',
//       },
//    ]
//    // et bien retourner le tableau photographers seulement une fois
//    return {
//       photographers: [...photographers, ...photographers, ...photographers],
//    }
// }
// async function displayData(photographers) {
//    const photographersSection = document.querySelector('.photographer_section')
//    photographers.forEach(photographer => {
//       const photographerModel = photographerFactory(photographer)
//       const userCardDOM = photographerModel.getUserCardDOM()
//       photographersSection.appendChild(userCardDOM)
//    })
// }
// async function init() {
//    // Récupère les datas des photographes
//    const { photographers } = await getPhotographers()
//    displayData(photographers)
// }
//
// init()
