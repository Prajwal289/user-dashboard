"use client";

import { useUserById } from "@/hooks/useUserById";

export default async function UserDetail({ params }: any) {
  const { id } = await params; 

  const { data: user, isLoading, error } = useUserById(id);

  if (isLoading) return <p className="p-4">Loading user...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load user</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>

      <div className="grid gap-2 text-lg">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p>
          <strong>Address:</strong>{" "}
          {user.address.street}, {user.address.city},{" "}
          {user.address.zipcode}
        </p>
      </div>
    </div>
  );
}
