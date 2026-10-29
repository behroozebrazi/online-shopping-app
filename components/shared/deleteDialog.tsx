"use client";

import { useState } from "react";

import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

function DeleteDialog({
  id,
  action,
}: {
  id: string;
  action: (
    id: string,
  ) => Promise<{ success: boolean; message: string | unknown }>;
}) {
  const [open, setOpen] = useState(false);

  function handleDeleteClick() {}

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button size="sm" variant="destructive" className="ml-2" />}
      >
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent className="text-right">
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete this order?</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex justify-end gap-2 rtl:flex-row-reverse">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button size="sm" variant="destructive" onClick={handleDeleteClick}>
            Delete
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDialog;
