import ProductList from "@/components/shared/product/productList";
import ViewAllProducts from "@/components/viewAllProducts";

// import data from "@/data/products";
import { getLatestProducts } from "@/lib/actions/product.actions";

async function HomePage() {
  // const { products } = data;
  const products = await getLatestProducts();

  return (
    <div>
      <main>
        <div>Home Page</div>
        <ProductList data={products} title="Products" limit={4}></ProductList>
        <ViewAllProducts />
      </main>
    </div>
  );
}

export default HomePage;
