"use client";

import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup } from "@/components/ui/field";

import { updateProfile } from "@/lib/actions/user.actions";

import { updateProfileSchema } from "@/lib/validators";

function ProfileForm() {
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    // update user profile in database
    const response = await updateProfile(values);

    // create an updated user session
    const newSession = {
      ...session,
      user: { ...session?.user, name: values.name },
    };

    // update user profile in session
    await update(newSession);
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-5">
        <Field className="w-full">
          <Input disabled placeholder="Email" {...form.register("email")} />
        </Field>

        <Field className="w-full">
          <Input placeholder="Name" {...form.register("name")} />
        </Field>
      </FieldGroup>

      <Button type="submit" size="lg" className="col-span-2 w-full">
        Update profile
      </Button>
    </form>
  );
}

export default ProfileForm;
