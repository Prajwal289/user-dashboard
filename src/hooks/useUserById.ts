import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/users";

export function useUserById(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
}
