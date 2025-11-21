import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/lib/users";
import { useActivityStore } from "@/store/activityStore";

export function useDeleteUser() {
  const queryClient = useQueryClient();
const addLog = useActivityStore.getState().addLog;
  return useMutation({
    mutationFn: deleteUser,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers =
        queryClient.getQueryData<any[]>(["users"]) || [];

      const updated = previousUsers.filter((u) => u.id !== id);

      queryClient.setQueryData(["users"], updated);

      return { previousUsers };
    },

    onError: (_, __, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },

    onSuccess: (_, variables) => {
  addLog(`User Deleted — ID ${variables}`);
},

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
