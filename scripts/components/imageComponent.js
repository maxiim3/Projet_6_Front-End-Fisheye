class Image {
   $img
   mediaLink
   title
   photographerName

   constructor(data) {
      this.photographerName = data.photographer.name
      this.title = data.title
      this.mediaLink = data.mediaLink
      this.id = data.id
      this.$img = document.createElement('img')
   }

   setHTMLAttributes() {
      this.$img.classList.value = 'imgMedia'
      this.$img.src = this.mediaLink
      this.$img.alt = `${this.title} par ${this.photographerName}`
   }

   createComponent() {
      this.setHTMLAttributes()
      return this.$img
   }
}