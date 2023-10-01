export interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  uploaddate: string;
  quantity: number;
  rating: number;
  reviews: string;
  status: ItemStatus;
}

export enum ItemStatus {
  FORSALE = 'FORSALE',
  SOLDOUT = 'SOLDOUT',
}