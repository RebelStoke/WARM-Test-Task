import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CartStat} from '../shared/states/cart.state';
import {Observable} from 'rxjs';
import {Song} from '../shared/entities/song';
import {GetAllSongs, AddToCart, GetFilteredSongs} from '../shared/states/cart.action';
import {Router} from '@angular/router';
import {async} from '@angular/core/testing';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent{
  page = 1;
  pageSize = 5;
  collectionSize;
  songs: Song[];
  asc: boolean;

  @Select(CartStat.getAllSongs) Songs: Observable<Song[]>;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.store.dispatch(new GetAllSongs());
    this.subscribe();
    this.collectionSize = this.songs.length;
  }

  clickButton(song) {
    this.store.dispatch(new AddToCart(song));
  }

  subscribe(){
    this.Songs.subscribe(songs => {
      this.songs = songs;
    });
  }

  filterSongs(event){
    this.Songs = this.store.dispatch(new GetFilteredSongs(event.target.value));
  }

  sortBy(variable){
    this.songs = this.songs.slice().sort(this.sort(variable));
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
  sort(property) {
    let sortOrder = 1;
    if (this.asc){
      sortOrder = -1;
      this.asc = false;
    }
    else {
      this.asc = true;
    }
    return  (a, b) => {
      if (a[property] < b[property]){
        return -1 * sortOrder;
      }else if (a[property] > b[property]){
        return sortOrder;
      }else{
        return 0;
      }
    };
  }
}
