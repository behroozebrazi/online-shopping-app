import { notFound } from "next/navigation";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getProductBySlug } from "@/lib/actions/product.actions";

import { getMyCart } from "@/lib/actions/cart.actions";

import AddToCart from "@/components/shared/product/addToCart";

async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const cart = await getMyCart();

  return (
    <>
      <section>
        <div className="grid grid-cols-5">
          <div className="col-span-2 mr-5">
            <Image
              src={product.image}
              alt="Product Image"
              className="min-h-[300px] object-cover object-center"
              width={1000}
              height={1000}
            />
          </div>

          <div className="col-span-2 p5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>

              <h1 className="font-bold text-2xl">{product.name}</h1>

              <div className="flex flex-col gap-3">
                <p>$ {product.price}</p>
              </div>
            </div>

            <div className="mt-10">
              <p className="font-semibold underline">Description</p>
              <p className="font-semibold">{product.description}</p>
            </div>

            <div>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between mb-2">
                    <div>Price</div>
                    <div>$ {product.price}</div>
                  </div>

                  <div className="flex justify-between mb-2">
                    <div>State</div>
                    {product.stock > 0 ? (
                      <Badge variant="outline">Exist</Badge>
                    ) : (
                      <Badge variant="destructive">Not exist</Badge>
                    )}
                  </div>

                  {product.stock > 0 && (
                    <div className="flex items-center">
                      {/* <Button className="w-full">Add to card</Button> */}
                      <AddToCart
                        cart={cart}
                        item={{
                          productId: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          image: product.image,
                          qty: 1,
                        }}
                      ></AddToCart>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductPage;
