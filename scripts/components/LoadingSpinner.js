class LoadingSpinner {

   constructor($dom) {
      this.$dom = $dom
      this.$loader = document.createElement('div')
      this.$loader.classList.value = 'duo'
      this.$loader.ariaHidden = 'true'
      this.$loader.tabIndex = -1
   }

   renderSpinner(){
      this.$dom.appendChild(this.$loader)
   }

   removeSpinner(){
      this.$dom.removeChild(this.$loader)
   }
}