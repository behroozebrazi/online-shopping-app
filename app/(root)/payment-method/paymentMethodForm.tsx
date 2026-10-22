"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import { paymentMethodSchema } from "@/lib/validators";

function PaymentMethodForm({
  paymentMethods,
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | undefined;
  paymentMethods: readonly string[];
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod,
    },
  });

  async function onSubmit(values: z.infer<typeof paymentMethodSchema>) {
    const response = await updateUserPaymentMethod(values);
    if (!response.success) return;

    router.push("/place-order");
  }

  return (
    <div>
      <div className="max-w-md mx-auto space-4">
        <h1 className="bold mt-4">Payment method</h1>
        <p className="text-sm text-muted-foreground">Choose a payment method</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.type}>
              <FieldLabel>Payment method</FieldLabel>

              <RadioGroup
                value={form.watch("type")}
                onValueChange={(value) =>
                  form.setValue("type", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className="flex flex-col gap-3"
                aria-invalid={!!form.formState.errors.type}
              >
                {paymentMethods.map((paymentMethod) => (
                  <Field
                    key={paymentMethod}
                    orientation="horizontal"
                    data-invalid={!!form.formState.errors.type}
                  >
                    <RadioGroupItem
                      value={paymentMethod}
                      id={`payment-${paymentMethod}`}
                      aria-invalid={!!form.formState.errors.type}
                    />
                    <FieldLabel
                      htmlFor={`payment-${paymentMethod}`}
                      className="font-normal"
                    >
                      {paymentMethod}
                    </FieldLabel>
                  </Field>
                ))}
              </RadioGroup>

              {form.formState.errors.type && (
                <FieldError>{form.formState.errors.type.message}</FieldError>
              )}
            </Field>
          </FieldGroup>

          <div className="flex gap-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentMethodForm;
