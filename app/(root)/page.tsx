import data from "@/data/products";

import ProductList from "@/components/shared/product/productList";

function HomePage() {
  const { products } = data;

  return (
    <div>
      <main>
        <div>Home Page</div>
        <ProductList data={products} title="Products"></ProductList>
      </main>
    </div>
  );
}

export default HomePage;
