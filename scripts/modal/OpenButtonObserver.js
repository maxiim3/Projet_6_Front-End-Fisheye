class OpenButtonObserver {
   constructor(openBtn) {
      this.$btn = openBtn
   }

   get btn() {
      return this.$btn
   }

   updateDom($dom) {
      $dom.style.display = 'flex'
      // $dom.showModal()
   }
}