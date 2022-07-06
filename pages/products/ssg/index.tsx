import { InferGetStaticPropsType } from "next";
import { Product, ProductListItem } from "../../../components/Product";

const ProductsPage = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div>Products page</div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.map(product => (
          <li key={product.id} className="shadow-lg border-2 rounded-lg p-4 hover:shadow-2xl">
            <ProductListItem data={{
              id: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
              thumbnailUrl: product.image,
              thumbnailAlt: product.title,
              rating: product.rating.rate,
            }}/>
          </li>
        )
        )}
      </ul>
    </>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/`);
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  longDescription: string,
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};