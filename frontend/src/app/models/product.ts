export class Product {
  id: string = "";
  name: string = "";
  price: number = 0;
  shortDescription: string = "";
  fullDescription: string = "";
  images: string[] = [];
  technicalSpecifications: { [key: string]: string } = {};

  quantity: number = 0;
}
