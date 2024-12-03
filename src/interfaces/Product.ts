export interface Product {
  _id: string,
  title: string,
  description: string,
  price: {
    $numberDecimal: string,
  };
  quantity: number,
  images: string[]
}

export interface FormData {
  title: string,
  description: string,
  price: string,
  quantity: number,
  images: (File | string)[]
}