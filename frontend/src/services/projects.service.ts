import { api, unpack } from "@/lib/api";
import type { ApiResponse, PageResponse } from "@/types/api";
import type { Project, ProjectInput } from "@/types/project";

function listFrom<T>(value: T[] | PageResponse<T>) { return Array.isArray(value) ? value : value.content; }
type BackendProject = Omit<Project, "ownerName"> & { owner?: { fullName?: string; name?: string } | null };
function normalizeProject(project: BackendProject): Project { return { ...project, ownerName: project.owner?.name ?? project.owner?.fullName }; }

export const projectsService = {
  async list() {
    const { data } = await api.get<ApiResponse<BackendProject[] | PageResponse<BackendProject>>>("/projects");
    return listFrom(unpack(data)).map(normalizeProject);
  },
  async create(input: ProjectInput) {
    const { data } = await api.post<ApiResponse<BackendProject>>("/projects", input);
    return normalizeProject(unpack(data));
  },
  async update(id: string, input: ProjectInput) {
    const { data } = await api.put<ApiResponse<BackendProject>>(`/projects/${id}`, input);
    return normalizeProject(unpack(data));
  },
  async remove(id: string) {
    await api.delete(`/projects/${id}`);
  }
};
