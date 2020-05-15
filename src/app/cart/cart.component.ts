import { Component } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CartStat} from '../shared/states/cart.state';
import {Observable} from 'rxjs';
import {Song} from '../shared/entities/song';
import {Router} from '@angular/router';
import {AddToCart, DecreaseCountToProduct, GetAllSongs, IncreaseCountToProduct, RemoveFromCart} from '../shared/states/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  @Select(CartStat.getCart) Songs: Observable<Song[]>;

  constructor(
    private router: Router,
    private store: Store
  ) {
  }

  removeFromCart(song) {
    this.store.dispatch(new RemoveFromCart(song));
  }

  increaseCount(song: Song) {
    this.store.dispatch(new IncreaseCountToProduct(song));
  }

  decreaseCount(song: Song) {
    this.store.dispatch(new DecreaseCountToProduct(song));
  }
  goToSongs() {
    this.router.navigate(['/']);
  }
}
