import { Doc } from '../../../../../convex/_generated/dataModel'
import { FaGithub } from 'react-icons/fa'
import { AlertCircleIcon, GlobeIcon, LoaderIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectIconProps {
  project: Doc<'projects'>
  className?: string
}

export default function ProjectIcon({ project, className = '' }: ProjectIconProps) {
  if (project.importStatus === 'completed') {
    return <FaGithub className={cn('size-5 text-muted-foreground', className)} />
  }

  if (project.importStatus === 'failed') {
    return <AlertCircleIcon className={cn('size-5 text-muted-foreground', className)} />
  }

  if (project.importStatus === 'importing') {
    return <LoaderIcon className={cn('size-5 text-muted-foreground animate-spin', className)} />
  }

  return (
    <GlobeIcon
      className={cn('size-5 text-muted-foreground group-hover:text-foreground', className)}
    />
  )
}
