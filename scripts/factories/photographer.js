// function photographerFactory(data) {
//     const { name, portrait } = data;
//
//     function getUserCardDOM() {
//         const article = document.createElement( 'article' );
//
//         // title with name
//         const h2 = document.createElement( 'h2' );
//
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", portrait)
//
//         h2.textContent = name;
//
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
//     return { name, portrait, getUserCardDOM }
// }

//
// class PhotographerFactory {
//     _data
//     constructor(data) {
//         this._data = data
//     }
//
//     get data() {
//         return this._data
//     }
//
//     getUserCardDOM(){
//         const CardTemplate = new PhotographerCard(this.data)
//         return CardTemplate.createPhotographerCard()
//     }
// }

