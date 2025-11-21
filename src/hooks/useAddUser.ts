import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "@/lib/users";
import { useActivityStore } from "@/store/activityStore";

export function useAddUser() {
  const queryClient = useQueryClient();
  const addLog = useActivityStore.getState().addLog;

  return useMutation({
    mutationFn: addUser,
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers =
        queryClient.getQueryData<any[]>(["users"]) || [];

      const optimisticUser = {
        ...newUser,
        id: Math.random(),
      };

      queryClient.setQueryData(["users"], [...previousUsers, optimisticUser]);

      return { previousUsers };
    },

    onError: (_, __, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },

    onSuccess: (_, newUser) => {
      addLog(`User Added — ${newUser.name}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
