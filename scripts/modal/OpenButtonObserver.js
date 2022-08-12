class OpenButtonObserver {
   constructor() {
      this.$btn = document.querySelector('#showModal')
   }

   get btn() {
      return this.$btn
   }

   updateDom($dom) {
      $dom.style.display = 'block'
   }
}