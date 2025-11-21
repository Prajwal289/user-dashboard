import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/lib/users";
import { useActivityStore } from "@/store/activityStore";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const addLog = useActivityStore.getState().addLog;

  return useMutation({
    mutationFn: updateUser,

    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers =
        queryClient.getQueryData<any[]>(["users"]) || [];

      const newUsers = previousUsers.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );

      queryClient.setQueryData(["users"], newUsers);

      return { previousUsers };
    },

    onError: (_, __, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },

     onSuccess: (_, newUser) => {
      addLog(`User Updated — ${newUser.name}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
