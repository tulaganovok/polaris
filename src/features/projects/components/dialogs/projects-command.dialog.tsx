'use client'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import ProjectIcon from '../shared/project-icon'
import { useProjects } from '../../hooks/use-projects'
import { useRouter } from 'next/navigation'

interface ProjectsCommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProjectsCommandDialog({ open, onOpenChange }: ProjectsCommandDialogProps) {
  const projects = useProjects()
  const router = useRouter()

  const handleSelect = (projectId: string) => {
    router.push(`/projects/${projectId}`)
    onOpenChange(false)
  }

  return (
    <Command>
      <CommandDialog
        open={open}
        onOpenChange={onOpenChange}
        title='Search Projects'
        description='Search and navigate to your projects'
      >
        <CommandInput placeholder='Search projects...' />
        
        <CommandList>
          <CommandEmpty>No projects found.</CommandEmpty>

          <CommandGroup heading='Projects'>
            {projects?.map(project => (
              <CommandItem
                key={project._id}
                value={`${project.name}-${project._id}`}
                onSelect={() => handleSelect(project._id)}
              >
                <ProjectIcon project={project} />

                <span className='text-base'>{project.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Command>
  )
}
