import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { usersService } from "@/services/users.service";
import type { UserInput } from "@/types/user";

export const userKeys = { all: ["users"] as const };
export function useUsers() { return useQuery({ queryKey: userKeys.all, queryFn: usersService.list }); }
export function useUserMutations() {
  const client = useQueryClient();
  const invalidate = () => client.invalidateQueries({ queryKey: userKeys.all });
  return {
    create: useMutation({ mutationFn: (input: UserInput) => usersService.create(input), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, input }: { id: string; input: UserInput }) => usersService.update(id, input), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: usersService.remove, onSuccess: invalidate })
  };
}
