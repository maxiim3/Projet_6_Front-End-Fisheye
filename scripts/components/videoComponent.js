class Video {
   $video
   mediaLink
   photographerName
   title

   constructor(data) {
      this.photographerName = data.photographerName
      this.title = data.title
      this.mediaLink = data.mediaLink
      this.$video = document.createElement('video')

   }

   setHTMLAttributes() {
      this.$video.controls = true
      this.$video.classList.value = 'imgMedia'
      this.$video.disablePictureInPicture = true
      this.$video.autoplay = true
      this.$video.src = this.mediaLink
      this.$video.alt = `${this.title} par ${this.photographerName}`
   }

   createComponent() {
      this.setHTMLAttributes()
      return this.$video
   }
}