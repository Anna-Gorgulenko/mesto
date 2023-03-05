export default class Section {
   constructor({data, renderer, id}, containerSelector) {
      this._items = data;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
   }

   addItem = (element) => {
      this._container.prepend(element);
   }

   clear() {
      this._container.innerHTML = '';
   }

   renderItems() {
      this.clear();

      this._items.forEach(item => {
         this._renderer(item);
      });
   }
   
}