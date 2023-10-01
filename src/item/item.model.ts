export interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  quantity: number;
  uploaddate: string;
  status: ItemStatus;
  reviews: string;
}

export enum ItemStatus {
  FORSALE = 'FORSALE',
  SOLDOUT = 'SOLDOUT',
}