import ProjectView from '@/features/projects/components/shared/project-view'
import { Id } from '../../../../convex/_generated/dataModel'

interface ProjectIdPageProps {
  params: Promise<{ projectId: string }>
}

export default async function ProjectIdPage({ params }: ProjectIdPageProps) {
  const { projectId } = await params

  return <ProjectView projectId={projectId as Id<'projects'>} />
}
