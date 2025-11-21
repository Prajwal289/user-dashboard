"use client";

import { useUsers } from "@/hooks/useUsers";
import { useState, useMemo } from "react";
import * as Select from "@radix-ui/react-select";
import AddUserDialog from "./AddUserDialog";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import { useRouter } from "next/navigation";




export default function UserTable() {
  const { data: users, isLoading, error } = useUsers();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc" | "none">("none");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;



  const filteredUsers = useMemo(() => {
    if (!users) return [];

    let filtered = [...users];

    // Search by name
    if (search.trim()) {
      filtered = filtered.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by company
    if (companyFilter !== "all") {
      filtered = filtered.filter((u) => u.company.name === companyFilter);
    }

    // Sort by email
    if (sort !== "none") {
      filtered.sort((a, b) =>
        sort === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email)
      );
    }

    return filtered;
  }, [users, search, sort, companyFilter]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, page]);


  if (isLoading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load users</p>;

  return (
    <div className="p-4">
      <AddUserDialog />

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4 p-2">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-60"
        />

        {/* Sort */}
        <button
          onClick={() =>
            setSort(sort === "asc" ? "desc" : sort === "desc" ? "none" : "asc")
          }
          className="px-3 py-2 border rounded"
        >
          Sort Email ({sort})
        </button>

        {/* Filter by Company */}
        <Select.Root value={companyFilter} onValueChange={setCompanyFilter}>
          <Select.Trigger className="border p-2 rounded w-48 flex justify-between items-center">
            <Select.Value placeholder="Select Company" />
            <Select.Icon>▼</Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              position="popper"
              side="bottom"
              align="start"
              sideOffset={4}
              className="bg-white dark:bg-gray-300 border rounded shadow w-48 z-50"
            >
              <Select.Viewport>
                <Select.Item
                  value="all"
                  className="p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  All Companies
                </Select.Item>

                {users?.map((u: any) => (
                  <Select.Item
                    key={u.id}
                    value={u.company.name}
                    className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {u.company.name}
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>


      </div>


      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Avatar</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedUsers?.map((u: any) => (
            <tr
              key={u.id}
              className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => router.push(`/users/${u.id}`)}
            >

              <td className="p-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                  {u.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
              </td>

              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phone}</td>
              <td className="p-2">{u.company.name}</td>

              <td className="p-2 flex gap-2">
                <div onClick={(e) => e.stopPropagation()}>
                  <EditUserDialog user={u} />
                  <DeleteUserDialog id={u.id} />
                </div>



              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          className="px-3 py-2 border rounded disabled:opacity-40"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {Math.ceil(filteredUsers.length / PAGE_SIZE)}
        </span>

        <button
          className="px-3 py-2 border rounded disabled:opacity-40"
          disabled={page >= Math.ceil(filteredUsers.length / PAGE_SIZE)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}
