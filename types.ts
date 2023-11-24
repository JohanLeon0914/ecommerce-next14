export interface Product {
    id: number;
    title: string;
    isNew: boolean;
    oldPrice: number;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: number;
    quantity: number;
  }
  
  export interface ItemProps {
    item: Product;
  }

  export interface ProductProps {
    product: Product
  }
  
  export interface StateProps {
    shopping: {
      productData: [];
      userInfo: {};
      orderData: {
        order: Product[];
      };
    };
  }