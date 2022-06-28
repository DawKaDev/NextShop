import Link from "next/link";
import Rating from "../Rating"

type Product = {
  id: number,
  title: string,
  description: string,
  longDescription: string,
  thumbnailUrl: string,
  thumbnailAlt: string,
  price: number,
  rating: number,
}

type ProductListItem = Pick<Product, "id" | "title" | "price" | "thumbnailUrl" | "thumbnailAlt" | "rating" | "description">;

interface ProductProps {
  data: Product;
}

interface ProductListItemProps {
  data: ProductListItem;
}

export const Product = ({ data }: ProductProps) => {
  return (
    <div className="relative">
      <div className="flex align-middle justify-center h-40 bg-white rounded-lg p-4">
        <img src={data.thumbnailUrl} alt={data.thumbnailAlt}/>
      </div>
      <h2 className="text-xl font-bold py-3 uppercase">{data.title}</h2>
      <p className="leading-6 text-gray-400">{data.description}</p>
      <p>{data.longDescription}</p>
      <Rating rating={data.rating} />
      <p className="text-3xl font-semibold text-green-500 text-right">${data.price.toFixed(2)}</p>
    </div>
  )
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <div className="relative">
      <div className="flex align-middle justify-center h-40 bg-white rounded-lg p-4">
        <img src={data.thumbnailUrl} alt={data.thumbnailAlt}/>
      </div>
      <Link href={`/products/${data.id}`}>
        <a>
          <h2 className="text-xl font-bold py-3 uppercase">{data.title}</h2>
        </a>
      </Link>
      <p className="leading-6">{data.description}</p>
      <Rating rating={data.rating} />
      <p className="text-3xl font-semibold text-green-500 text-right">${data.price.toFixed(2)}</p>
    </div>
  )
}