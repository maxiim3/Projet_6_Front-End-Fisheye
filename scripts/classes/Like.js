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
            this.count--
            break
         default:
            throw 'Action inconnue...'
      }
      this.media._data.likes= this.count
   }
}
/*

class LikeSubject {
   constructor() {
      this.observers = []
   }

   subscribe(observer) {
      this.observers.push(observer)
   }

   unsubscribe(observer) {
      this._observers = this._observers.filter(obs => obs !== observer)
   }

   fire(action) {
      this.observers.forEach(obs => obs.update(action))
   }
}
*/
