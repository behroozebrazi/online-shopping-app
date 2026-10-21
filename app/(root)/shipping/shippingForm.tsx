"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { ArrowRight } from "lucide-react";

import { shippingAddressSchema } from "@/lib/validators";

import { type ShippingAddress } from "@/types";

function ShippingForm({ address }: { address: ShippingAddress }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: address?.fullName || "",
      streetAddress: address?.streetAddress || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
    },
  });

  async function onSubmit() {}

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="mt-4 font-bold">Address</h1>
        <p className="text-sm text-muted-foreground">Enter the address</p>
        <form
          id="shipping-form"
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            {/* fullName */}
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="shipping-form-fullName">Name</FieldLabel>
                  <Input
                    {...field}
                    id="shipping-form-fullName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* streetAddress */}
            <Controller
              name="streetAddress"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="shipping-form-streetAddress">
                    Street
                  </FieldLabel>
                  <Input
                    {...field}
                    id="shipping-form-streetAddress"
                    aria-invalid={fieldState.invalid}
                    placeholder="Street"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* city */}
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="shipping-form-city">City</FieldLabel>
                  <Input
                    {...field}
                    id="shipping-form-city"
                    aria-invalid={fieldState.invalid}
                    placeholder="City"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* state */}
            <Controller
              name="state"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="shipping-form-state">State</FieldLabel>
                  <Input
                    {...field}
                    id="shipping-form-state"
                    aria-invalid={fieldState.invalid}
                    placeholder="State"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* postalCode */}
            <Controller
              name="postalCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="shipping-form-postalCode">
                    Zip code
                  </FieldLabel>
                  <Input
                    {...field}
                    id="shipping-form-postalCode"
                    aria-invalid={fieldState.invalid}
                    placeholder="Zip code"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit">
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </>
  );
}

export default ShippingForm;
