import ProjectLayout from '@/features/projects/components/shared/project-layout'
import { PropsWithChildren } from 'react'
import { Id } from '../../../../convex/_generated/dataModel'

interface ProjectIdLayoutProps extends PropsWithChildren {
  params: Promise<{ projectId: Id<'projects'> }>
}

export default async function ProjectIdLayout({ params, children }: ProjectIdLayoutProps) {
  const { projectId } = await params

  return <ProjectLayout projectId={projectId}>{children}</ProjectLayout>
}
