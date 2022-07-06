import Link from "next/link";
import Image from "next/image";
import Rating from "../Rating"
import Button from "../Button";
import { ShoppingCartIcon, DocumentTextIcon } from "@heroicons/react/solid";

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
    <div className="relative flex flex-col lg:flex-row w-full gap-8">
      <div className="bg-white rounded-lg p-4 w-full lg:w-1/2 flex-grow-0">
        <Image src={data.thumbnailUrl} layout="responsive" width={16} height={9} objectFit="contain" alt={data.thumbnailAlt}/>
      </div>
      <div className="w-full lg:w-1/2 p-4">
        <h2 className="text-3xl font-bold py-3 uppercase">{data.title}</h2>
        <p className="leading-6 text-gray-400 mb-8">{data.description}</p>
        <div className="flex items-center text-teal-700 uppercase border-b-2 py-2 text-lg opacity-50"><DocumentTextIcon className="w-10 h-10"/> Opis produktu</div>
        <p className="p-4">{data.longDescription}</p>
        <Rating rating={data.rating} />
        <p className="text-3xl font-semibold text-green-500 text-right">${data.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <div className="relative flex flex-col h-full">
      <div className="bg-white rounded-lg p-4">
        <Image src={data.thumbnailUrl} layout="responsive" width={16} height={9} objectFit="contain" alt={data.thumbnailAlt}/>
      </div>
      <Link href={`/products/${data.id}`}>
        <a>
          <h2 className="text-xl font-bold py-3 uppercase">{data.title}</h2>
        </a>
      </Link>
      <p className="leading-6 pb-4">{data.description}</p>
      <Rating rating={data.rating} />
      <div className="flex justify-between flex-grow-0 align-middle mt-auto items-center">
      <p className="text-3xl font-semibold text-teal-500 text-right">${data.price.toFixed(2)}</p>
      <Button title="Add to cart" className="w-auto justify-center text-center leading-4 p-4 border-4 border-white
       bg-teal-700 
       hover:bg-teal-100 
       hover:text-teal-900
       hover:border-teal-900 text-white rounded-full"><ShoppingCartIcon className="h-5 w-5"/></Button>
       </div>
    </div>
  )
}