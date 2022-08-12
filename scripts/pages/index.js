
const getPhotographers = async () => {
   //Import API
   const api = new Api('/data/photographers.json')
   return await api.getPhotographers()
}

const displayData = async photographers => {
   // DOM
   const $photographersCardWrapper = document.querySelector('.photographer_section')
   // Index for screen reader
   let startingTabIndex = 2

   photographers
      .map(data => {
         const photographer = new PhotographerConstructor(data)
         return new PhotographerFactory(photographer, startingTabIndex, 'photographer')
      })
      .forEach(template => {
         const card = template.createPhotographerCard()
         $photographersCardWrapper.appendChild(card)
         startingTabIndex += 2
      })
}

const init = async () => {
   const photographers = await getPhotographers()

   return await displayData(photographers)
}

init()
