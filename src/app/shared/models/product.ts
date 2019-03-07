export class Product {

    key: string;
    name: string;
    price: number;
    description: string;
    fid: string;
  
    constructor(key, name, price, description,fid) {
      this.key = key;
      this.name = name;
      this.price = price;
      this.description = description;
      this.fid = fid;
    }
  }