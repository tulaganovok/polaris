import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { Doc } from '../../../../../convex/_generated/dataModel'
import { formatTimestamp } from '../../utils'
import Link from 'next/link'
import ProjectIcon from '../shared/project-icon'

interface ContinueCardProps {
  project: Doc<'projects'>
}

export default function ContinueCard({ project }: ContinueCardProps) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <span className='text-sm text-muted-foreground'>Last modified</span>

      <Button
        variant='outline'
        asChild
        className='items-start justify-start p-4 bg-background border rounded-lg flex flex-col gap-2 w-full h-auto group'
      >
        <Link href={`/projects/${project._id}`} className='group'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-2'>
              <ProjectIcon project={project} className='text-foreground' />

              <span className='font-medium truncate text-base'>{project.name}</span>
            </div>

            <ArrowRightIcon className='size-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform group-hover:text-foreground' />
          </div>

          <span className='text-sm text-muted-foreground'>
            {formatTimestamp(project.updatedAt)}
          </span>
        </Link>
      </Button>
    </div>
  )
}
