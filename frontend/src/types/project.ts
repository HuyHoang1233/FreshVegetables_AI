export type ProjectStatus = "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED";

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  ownerName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectInput {
  name: string;
  description?: string;
  status: ProjectStatus;
}
