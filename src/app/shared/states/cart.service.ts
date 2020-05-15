import {Injectable} from '@angular/core';
import {Song} from '../entities/song';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  getAllSongs(){
    return [
      { id: 1, name: 'Shape of you', active: false, count: 1 , inStock: 10 },
      { id: 2, name: 'Rockstar', active: false, count: 1 , inStock: 10 },
      { id: 3, name: 'One Dance', active: false , count: 1 , inStock: 10 },
      { id: 4, name: 'Closer', active: false , count: 1 , inStock: 10 },
      { id: 5, name: 'Think Out Loud', active: false , count: 1 , inStock: 10 },
      { id: 6, name: 'Gods Plan', active: false , count: 1 , inStock: 10 },
      { id: 7, name: 'Dance Monkey', active: false , count: 1 , inStock: 10 },
      { id: 8, name: 'Sunflower', active: false , count: 1 , inStock: 10 },
      { id: 9, name: 'Havana', active: false , count: 1 , inStock: 10 },
      { id: 10, name: 'Perfect', active: false , count: 1 , inStock: 10 }
      ];
  }
}
