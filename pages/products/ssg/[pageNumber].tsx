import { InferGetStaticPropsType } from "next";
import { ProductListItem } from "../../../components/Product";
import { Pagination } from "../../../components/Pagination";

const PageNumberPage = ({data, pages, page}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if(!data){
    return <div>Brak danych</div>;
  }
  return (
    <>
      <div>Products page</div>
      <Pagination pages={pages} page={page}/>
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
  )
}

export default PageNumberPage;

export const getStaticPaths = async () => {
  //const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  //const data: StoreApiResponse[] = await res.json();

  return {
    paths: Array.from(Array(10).keys()).map((page) => {
      return {
        params: {
          pageNumber: (page + 1).toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: InferGetStaticPaths<typeof getStaticPaths>) => {
  if(!params?.pageNumber){
    return {
      props: {},
      notFound: true,
    };
  }
  const offset = 25 * parseInt(params.pageNumber) - 25;
  const take = 25;

  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/?take=${take}&offset=${offset}`);
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
      pages: 10,
      page: parseInt(params.pageNumber)
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

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;