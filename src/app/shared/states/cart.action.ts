import {Song} from '../entities/song';

export class AddToCart {
  static readonly type = 'AddToCart';
  constructor(public payload: Song) {}
}
export class IncreaseCountToProduct {
  static readonly type = 'IncreaseCountToProduct';
  constructor(public payload: Song) {}
}

export class DecreaseCountToProduct {
  static readonly type = 'DecreaseCountToProduct';
  constructor(public payload: Song) {}
}

export class RemoveFromCart {
  static readonly type = 'RemoveFromCart';
  constructor(public payload: Song) {}
}

export class ClearCart {
  static readonly type = 'ClearCart';
}

export class GetAllSongs {
  static readonly type = 'GetAllSongs';
  constructor() {}
}

export class GetFilteredSongs {
  static readonly type = 'GetFilteredSongs';
  constructor(public payload: string) {}
}
