"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useDeleteUser } from "@/hooks/useDeleteUser";

export default function DeleteUserDialog({ id }: { id: number }) {
  const { mutate, isPending } = useDeleteUser();

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="px-2 py-1 bg-red-500 text-white rounded">
        Delete
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/30" />

        <AlertDialog.Content className="fixed bg-white p-6 rounded shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px]">
          <AlertDialog.Title className="text-lg font-bold">
            Delete User?
          </AlertDialog.Title>

          <AlertDialog.Description className="mt-2 text-gray-600">
            This action cannot be undone.
          </AlertDialog.Description>

          <div className="flex justify-end gap-3 mt-4">
            <AlertDialog.Cancel className="px-3 py-2 border rounded">
              Cancel
            </AlertDialog.Cancel>

            <AlertDialog.Action
              onClick={handleDelete}
              className="px-3 py-2 bg-red-600 text-white rounded"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
