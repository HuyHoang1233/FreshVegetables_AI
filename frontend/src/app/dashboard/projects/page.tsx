import { PageHeader } from "@/components/ui/page-header";
import { ProjectManager } from "@/features/projects/project-manager";

export const metadata = { title: "Projects" };

export default function ProjectsPage() { return <div className="space-y-7"><PageHeader title="Projects" description="Plan, organize, and track the work that matters." /><ProjectManager /></div>; }
