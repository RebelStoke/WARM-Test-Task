
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {
  AddToCart,
  ClearCart,
  DecreaseCountToProduct,
  GetAllSongs,
  GetFilteredSongs,
  IncreaseCountToProduct,
  RemoveFromCart
} from './cart.action';
import {CartService} from './cart.service';
import {Song} from '../entities/song';

export class CartStateMode {
  songsInCart: Song[];
  songs: Song[];
}


@State<CartStateMode>({
  name: 'cart',
  defaults: {
    songsInCart: [],
    songs: []
  }
})

@Injectable()
export class CartStat {

  constructor(private cartService: CartService) {
  }

  @Selector()
  static getCart(state: CartStateMode) {
    return state.songsInCart;
  }

  @Selector()
  static getAllSongs(state: CartStateMode) {
    return state.songs;
  }

  @Action(GetAllSongs)
  getSongs({getState, setState}: StateContext<CartStateMode>) {
    const state = getState();
    const songList = [];
    this.cartService.getAllSongs().map((data) => {
      songList.push(data as Song);
    });
    setState({
      ...state,
      songs: songList,
    });
  }

  @Action(GetFilteredSongs)
  getFilteredSongs({getState, setState}: StateContext<CartStateMode>, {payload}: GetFilteredSongs) {
    const state = getState();
    const songList = [];
    this.cartService.getAllSongs().filter(song => song.name.toLowerCase().includes(payload.toLowerCase())).map((data) => {
      songList.push(data as Song);
    });
    setState({
      ...state,
      songs: songList,
    });
  }


  @Action(AddToCart)
  addToCart({getState, patchState, setState}: StateContext<CartStateMode>, {payload}: AddToCart) {
    const state = getState();
    const productList = [...state.songsInCart];
    const productIndex = productList.findIndex(item => item.id === payload.id);
    if (productIndex === -1) {
      patchState({
        songsInCart: [...state.songsInCart, payload]
      });
    } else {
      const copiedArray = JSON.parse(JSON.stringify(productList));
      const newProduct = copiedArray[productIndex];
      newProduct.count++;
      if (newProduct.count <= newProduct.inStock) {
        copiedArray[productIndex] = newProduct;
        setState({
          ...state,
          songsInCart: copiedArray,
        });
      }
    }
  }

  @Action(IncreaseCountToProduct)
  increaseCountToProduct({getState, setState}: StateContext<CartStateMode>, {payload}: IncreaseCountToProduct) {
    const state = getState();
    const productList = [...state.songsInCart];
    const productIndex = productList.findIndex(item => item.id === payload.id);
    if (productIndex !== -1) {
      const copiedArray = JSON.parse(JSON.stringify(productList));
      const newProduct = copiedArray[productIndex];
      newProduct.count++;
      if (newProduct.count <= newProduct.inStock) {
        copiedArray[productIndex] = newProduct;

        setState({
          ...state,
          songsInCart: copiedArray,
        });
      }
    }
  }

  @Action(DecreaseCountToProduct)
  decreaseCountToProduct({getState, setState}: StateContext<CartStateMode>, {payload}: DecreaseCountToProduct) {
    const state = getState();
    const productList = [...state.songsInCart];
    const productIndex = productList.findIndex(item => item.id === payload.id);
    if (productIndex !== -1) {
      const copiedArray = JSON.parse(JSON.stringify(productList));
      const newProduct = copiedArray[productIndex];
      newProduct.count--;
      if (newProduct.count > 0) {
        copiedArray[productIndex] = newProduct;

        setState({
          ...state,
          songsInCart: copiedArray,
        });
      }
    }
  }

  @Action(RemoveFromCart)
  removeFromCart({getState, setState}: StateContext<CartStateMode>, {payload}: RemoveFromCart) {
    const state = getState();
    const filteredArray = state.songsInCart.filter(item => item.id !== payload.id);
    setState({
      ...state,
      songsInCart: filteredArray,
    });
  }

  @Action(ClearCart)
  clearCart({getState, setState}: StateContext<CartStateMode>) {
    const state = getState();
    setState({
      ...state,
      songsInCart: [],
    });
  }
}
