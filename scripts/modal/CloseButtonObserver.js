class CloseButtonObserver {
   constructor(closeButton) {
      this.$btn = closeButton
   }
   get btn() {
      return this.$btn
   }
   updateDom($dom) {
      // $dom.close()
      $dom.style.display = 'none'
   }
}