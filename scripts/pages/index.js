

const fetchDataFromApi= async () => {
   const api = new Api('/data/photographers.json')
  return await api.fetch()
}

const getPhotographers = async () => {
   //Import API
   const allData = await fetchDataFromApi()
   return allData.photographers
}

const displayData = async photographers => {
   // DOM
   const $photographersCardWrapper = document.getElementById('cardWrapper')
   // Index for screen reader
   let startingTabIndex = 2

   photographers
      .map(photographer => {
         return new PhotographerConstructor(photographer)
      })
      .forEach(photographer => {
         const template = new PhotographerFactory(photographer, startingTabIndex, 'photographer')
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
