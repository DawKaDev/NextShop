import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Product } from "../../components/Product";

const ProductIdPage = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if(router.isFallback){
    return <div>Ładowanie strony...</div>
  }

  if(!data){
    return <div>Brak danych</div>;
  }

  return (
    <>
      <Link href="/products/ssg"><a>Lista Produktów</a></Link>
      <Product data={{
        id: data.id,
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        thumbnailUrl: data.image,
        thumbnailAlt: data.title,
        price: data.price,
        rating: data.rating.rate
      }}/>
    </>
  )
}

export default ProductIdPage;

export const getStaticPaths = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  const data: StoreApiResponse[] = await res.json();

  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(),
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: InferGetStaticPaths<typeof getStaticPaths>) => {
  if(!params?.productId){
    return {
      props: {},
      notFound: true,
    };
  }
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params.productId}`);
  const data: StoreApiResponse | null = await res.json();

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

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;