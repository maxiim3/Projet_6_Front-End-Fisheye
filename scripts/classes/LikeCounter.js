class LikeCounter {
   media
   constructor(media) {
      this.media = media
      this.count = this.media._data.likes
   }

   update(action) {
      switch (action) {
         case 'INC':
            this.count++
            break
         case 'DEC':
            this.count > 0 ? this.count-- : this.count = 0
            break
         default:
            throw 'Action inconnue...'
      }
      this.media._data.likes= this.count
   }
}
