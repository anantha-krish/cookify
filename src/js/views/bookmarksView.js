import previewView from './previewView';
import View from './View';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  addLoadHandler(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new BookmarksView();
