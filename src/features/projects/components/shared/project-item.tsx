import Link from 'next/link'
import { Doc } from '../../../../../convex/_generated/dataModel'
import ProjectIcon from './project-icon'
import { formatTimestamp } from '../../utils'

interface ProjectItemProps {
  project: Doc<'projects'>
}

export default function ProjectItem({ project }: ProjectItemProps) {
  return (
    <Link
      href={`/projects/${project._id}`}
      className='text-sm text-foreground/60 font-medium hover:text-foreground py-1.5 flex items-center justify-between w-full group'
    >
      <div className='flex items-center gap-2'>
        <ProjectIcon project={project} />
        <span className='truncate text-base'>{project.name}</span>
      </div>

      <span className='text-sm text-muted-foreground transition-colors group-hover:text-foreground'>
        {formatTimestamp(project.updatedAt)}
      </span>
    </Link>
  )
}
