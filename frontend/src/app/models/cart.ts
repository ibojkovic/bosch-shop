export class Cart {
  id!: string;
  _id?: string;
  productId: string = '';
  quantity: number = 0;
  userId: string = '';


  totalPrice: number = 0;
  updQuantity:number = 0;
}
