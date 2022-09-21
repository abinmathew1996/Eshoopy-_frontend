import { category } from './category';

export class product {
  id?: any;
  name?: any;
  description?: any;
  richDescription?: string;
  image?: string;
  images?: string;
  brand?: string;
  price?: string;
  category?: category;
  countInStock?: string;
  rating?: string;
  numReviews?: string;
  isFeatured?: boolean;
  dateCreated?: string;
}
