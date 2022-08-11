class CloseButtonObserver {
   constructor() {
      this.$btn = document.querySelector('#closeModal')
   }
   get btn() {
      return this.$btn
   }
   updateDom($dom) {
      $dom.style.display = 'none'
   }
}