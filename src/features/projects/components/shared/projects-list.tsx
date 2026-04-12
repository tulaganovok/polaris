import { Spinner } from '@/components/ui/spinner'
import { useProjectsPartial } from '../../hooks/use-projects'
import { Kbd } from '@/components/ui/kbd'
import ProjectItem from './project-item'
import ContinueCard from '../cards/continue.card'

interface ProjectsListProps {
  onViewAll: () => void
}

export default function ProjectsList({ onViewAll }: ProjectsListProps) {
  const projects = useProjectsPartial(6)

  if (!projects) {
    return <Spinner className='size-4 text-ring' />
  }

  const [mostRecent, ...rest] = projects

  return (
    <div className='flex flex-col gap-6'>
      {mostRecent && <ContinueCard project={mostRecent} />}

      {rest.length > 0 && (
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <span className='text-sm text-muted-foreground'>Recent projects</span>

            <button
              onClick={onViewAll}
              className='flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors'
            >
              <span>View all</span>
              <Kbd className='bg-accent border'>⌘K</Kbd>
            </button>
          </div>

          <ul className='flex flex-col'>
            {rest.map(project => (
              <ProjectItem key={project._id} project={project} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
