import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Pagination } from "../../../components/Pagination";
import { ProductListItem } from "../../../components/Product";

const ProductsCsrPage = () => {
  const [take, setTake] = useState(20);
  const [offset, setOffset] = useState(20);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<StoreApiResponse[]>([]);
  const { isLoading, data } = useQuery(["products", page, offset, take], () => fetchProducts(take, offset),);

  function handlePagingAction(e: React.MouseEvent) {
    e.preventDefault();
    setPage(parseInt((e.target as any).text));
  }

  const fetchProducts = async (take: number, offset: number) => {
    const res = await fetch(`https://naszsklep-api.vercel.app/api/products/?take=${take}&offset=${offset}`);
    const data: StoreApiResponse[] = await res.json();
    return data;
  }

  useEffect(() => {
    setOffset(take * (page - 1));
    //fetchProducts(take, offset);
  },[page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || !products) {
    return <div>No data found!</div>;
  }
  return (
    <>
      <div>Products page</div>
      <Pagination pages={20} page={page} action={handlePagingAction}/>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.length && data.map((product) => (
          <li key={product.id} className="shadow-lg border-2 rounded-lg p-4">
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

export default ProductsCsrPage;

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};