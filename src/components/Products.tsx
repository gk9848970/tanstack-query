import { Fragment } from "react/jsx-runtime";
import { useProducts, useProduct } from "../services/queries";
import { useState } from "react";

export default function Products() {
  const [seletectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const productsQuery = useProducts();
  const productQuery = useProduct(seletectedProductId);

  return (
    <>
      <div>
        {productsQuery.data &&
          productsQuery.data.pages.map((groups, index) => (
            <Fragment key={index}>
              {groups.map((product) => (
                <Fragment key={product.id}>
                  <button onClick={() => setSelectedProductId(product.id)}>
                    {product.name}
                  </button>
                </Fragment>
              ))}
            </Fragment>
          ))}
      </div>
      <button
        onClick={() => productsQuery.fetchNextPage()}
        disabled={
          !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
        }
      >
        {productsQuery.isFetchingNextPage ? "Loading" : "Load more"}{" "}
      </button>{" "}
      <div>
        <div>Selected Product:</div>
        <div>{JSON.stringify(productQuery.data)}</div>{" "}
      </div>
    </>
  );
}
