import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { projectsService } from "@/services/projects.service";
import type { ProjectInput } from "@/types/project";

export const projectKeys = { all: ["projects"] as const };
export function useProjects() { return useQuery({ queryKey: projectKeys.all, queryFn: projectsService.list }); }
export function useProjectMutations() {
  const client = useQueryClient();
  const invalidate = () => client.invalidateQueries({ queryKey: projectKeys.all });
  return {
    create: useMutation({ mutationFn: (input: ProjectInput) => projectsService.create(input), onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, input }: { id: string; input: ProjectInput }) => projectsService.update(id, input), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: projectsService.remove, onSuccess: invalidate })
  };
}
