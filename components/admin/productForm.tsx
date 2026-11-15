"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

// Create an URL from a product
import slugify from "slugify";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent } from "../ui/card";

import { insertProductSchema } from "@/lib/validators";

import { createProduct } from "@/lib/actions/product.actions";

function ProductForm({ productId }: { productId: string }) {
  const router = useRouter();

  const form = useForm<
    z.input<typeof insertProductSchema>,
    unknown,
    z.output<typeof insertProductSchema>
  >({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "",
      brand: "",
      description: "",
      image: "",
      stock: 0,
      price: 0,
    },
  });

  //
  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    form.setValue("image", localUrl);
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });
    if (!res.ok) {
      form.setValue("image", "");
      alert("Upload image error!");
      return;
    }
    const json = (await res.json()) as { url: string };
    form.setValue("image", json.url);
  }

  // submit create product form
  async function onSubmit(values: z.infer<typeof insertProductSchema>) {
    const result = await createProduct(values);
    if (!result.success) {
      alert(result.message);
      return;
    }
    router.push("/admin/products");
  }

  return (
    <form
      id="product-form"
      method="POST"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-8">
        <div className="flex flex-row gap-5">
          {/* name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="product-form-name">
                  Product name
                </FieldLabel>
                <Input
                  {...field}
                  id="product-form-name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* slug */}
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="product-form-slug">Identifier</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="product-form-slug"
                    aria-invalid={fieldState.invalid}
                  />
                  <Button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                    onClick={() => {
                      form.setValue(
                        "slug",
                        slugify(form.getValues("name"), { lower: true }),
                      );
                    }}
                  >
                    Create
                  </Button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="flex flex-row gap-5">
          {/* Category */}
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="product-form-category">
                  Category
                </FieldLabel>
                <Input
                  {...field}
                  id="product-form-category"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Brand */}
          <Controller
            name="brand"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="product-form-brand">Brand</FieldLabel>
                <Input
                  {...field}
                  id="product-form-brand"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="flex flex-row gap-5">
          {/* Price */}
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="product-form-price">Price</FieldLabel>
                <Input
                  {...field}
                  value={field.value as number}
                  id="product-form-price"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Stock */}
          <Controller
            name="stock"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="product-form-stock">Stock</FieldLabel>
                <Input
                  {...field}
                  id="product-form-stock"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="upload-field flex flex-row gap-5">
          {/* Image */}
          <Controller
            name="image"
            control={form.control}
            render={({ fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="product-form-image">
                  Product image
                </FieldLabel>
                <div className="relative w-full">
                  <Input
                    id="product-form-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    aria-invalid={fieldState.invalid}
                    className="pl-16"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div>
            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-form-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="product-form-description"
                    aria-invalid={fieldState.invalid}
                    className="resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div>
            <Button
              type="submit"
              size="lg"
              className="button col-span-2 w-full"
            >
              Add
            </Button>
          </div>
        </div>
      </FieldGroup>
    </form>
  );
}

export default ProductForm;
