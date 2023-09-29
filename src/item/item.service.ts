import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService {

  private items = [{
    id: 1,
    name: 'Burger',
    price: 5.99,
  }, {
    id: 2,
    name: 'Omelette',
    price: 6.99,
  }];

  getAllItems() {
    return this.items;
  }
}
