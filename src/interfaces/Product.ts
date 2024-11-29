export interface Product {
  _id: string;
  title: string;
  description: string;
  price: {
    $numberDecimal: string;
  };
  quantity: number;
}

export interface FormData {
  title: string;
  description: string;
  image?: string;
  price: string,
  quantity: number;
}