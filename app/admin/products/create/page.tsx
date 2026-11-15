import { Suspense } from "react";

import { requireAdmin } from "@/lib/auth-gaurd";

import ProductForm from "@/components/admin/productForm";

function CreateProductPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CreateProductContent />
    </Suspense>
  );
}

async function CreateProductContent() {
  await requireAdmin();
  return (
    <>
      <h2 className="font-bold text-3xl">Create A Product</h2>
      <div className="my-10">
        <ProductForm />
      </div>
    </>
  );
}

export default CreateProductPage;
