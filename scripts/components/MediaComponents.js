class Video {
   $video
   title
   mediaLink
   photographerName

   constructor(data) {
      this.photographerName = data.photographer.name
      this.title = data.title
      this.mediaLink = data.mediaLink
      this.id = data.id
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

class Image {
   $img
   title
   mediaLink
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
/*


class ThumbnailImg {
   constructor(data) {
      this.photographerName = data.photographer.name
      this.title = data.title
      this.mediaLink = data.mediaLink
      this.id = data.id
      this.$c = document.createElement('canvas')
      this.$img = document.createElement('img')
   }

   setHTMLAttributes() {
      this.$img.src = this.mediaLink
      this.$c.classList.value = 'imgMedia'
      this.$c.textContent = `${this.title} par ${this.photographerName}`
      const ctx = this.$c.getContext('2d')
      ctx.drawImage(this.$img, 0, 0, this.$img.width, this.$img.height)
      return ctx
   }

   createComponent() {
      this.setHTMLAttributes()
      return this.$c
   }

}


class ThumbnailVideo {
   constructor(data) {
      this.photographerName = data.photographer.name
      this.title = data.title
      this.mediaLink = data.mediaLink
      this.id = data.id
      this.$c = document.createElement('canvas')
      this.$video = document.createElement('video')
   }

   setHTMLAttributes() {
      this.$c.classList.value = 'imgMedia'
      this.$video.src = this.mediaLink
      this.$video.alt = `${this.title} par ${this.photographerName}`
   }

   createComponent() {
      this.setHTMLAttributes()
      this.$c.getContext('2d').drawImage(this.$video, 0, 0, this.$video.width, this.$video.height)
      return this.$c
   }

}
*/
