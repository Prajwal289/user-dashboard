"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useAddUser } from "@/hooks/useAddUser";

export default function AddUserDialog() {
  const { mutate, isPending } = useAddUser();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: () => {
        setOpen(false); 
        setForm({ name: "", email: "", phone: "", company: "" });
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="px-4 py-2 bg-green-600 text-white rounded mb-4 ml-4">
        Add User
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed bg-white p-6 rounded shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Add User
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className="border p-2 rounded"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
              required
            />

            <input
              className="border p-2 rounded"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              required
            />

            <input
              className="border p-2 rounded"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
              required
            />

            <input
              className="border p-2 rounded"
              placeholder="Company"
              value={form.company}
              onChange={(e) =>
                setForm((f) => ({ ...f, company: e.target.value }))
              }
              required
            />

            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white py-2 rounded"
            >
              {isPending ? "Adding..." : "Add User"}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
