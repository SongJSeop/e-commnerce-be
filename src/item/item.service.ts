import { Injectable } from "@nestjs/common";
import { Item, ItemStatus } from "./item.model";
import { v1 as uuid } from 'uuid';

@Injectable()
export class ItemService {

  private items: Item[] = [{
    id: 1,
    name: 'Burger',
    price: 5.99,
    category: 'Food',
    description: "It's a burger",
    image: "https://www.publicdomainpictures.net/pictures/270000/velka/burger-1553429729kTU.jpg",
    rating: 4.5,
    quantity: 10,
    uploaddate: "2020-01-01",
    reviews: "It's a good burger",
    status: ItemStatus.FORSALE,
  }, {
    id: 2,
    name: 'Omelette',
    price: 6.99,
    category: 'Food',
    description: "A delicious omelette with cheese and ham.",
    image: "https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png",
    rating: 4.5,
    quantity: 10,
    uploaddate: "2020-01-01",
    reviews: "It's a good omelette",
    status: ItemStatus.FORSALE,
  }];

  getAllItems(): Item[] {
    return this.items;
  }

  addItem(itemData) {
    const newItem: Item = {
      id: uuid(),
      name: itemData.name,
      price: itemData.price,
      category: itemData.category,
      description: itemData.description,
      image: itemData.image,
      rating: itemData.rating,
      quantity: itemData.quantity,
      uploaddate: new Date(),
      reviews: [],
      status: ItemStatus.FORSALE,
    }

    this.items.push(newItem);
  }
}
