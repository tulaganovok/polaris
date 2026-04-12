import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Id } from '../../../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CloudCheckIcon, LoaderIcon } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { UserButton } from '@clerk/nextjs'
import { useProject, useRenameProject } from '../../hooks/use-projects'
import { useState } from 'react'
import { Poppins } from 'next/font/google'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

interface NavbarProps {
  projectId: Id<'projects'>
}

export default function Navbar({ projectId }: NavbarProps) {
  const project = useProject(projectId)
  const renameProject = useRenameProject()

  const [isRenaming, setIsRenaming] = useState(false)
  const [name, setName] = useState('')

  const handleStartRename = () => {
    if (!project) return
    setName(project.name)
    setIsRenaming(true)
  }

  const handleSubmit = () => {
    if (!project) return
    setIsRenaming(false)

    const trimmedName = name.trim()
    if (!trimmedName || trimmedName === project.name) return

    renameProject({ id: projectId, name: trimmedName })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      setIsRenaming(false)
    }
  }

  return (
    <nav className='flex justify-between items-center gap-x-2 py-3 px-4 bg-sidebar border-b'>
      <div className='flex items-center gap-x-2'>
        <Breadcrumb>
          <BreadcrumbList className='gap-0!'>
            <BreadcrumbItem>
              <BreadcrumbLink className='flex items-center gap-2' asChild>
                <Button variant='ghost' className='w-fit! p-1.5! h-7!' asChild>
                  <Link href='/'>
                    <Image src='/logo.svg' alt='Logo' width={25} height={25} />
                    <span className={cn('text-base font-medium', font.className)}>Polaris</span>
                  </Link>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className='ml-0! mr-1' />

            <BreadcrumbItem>
              {isRenaming ? (
                <input
                  autoFocus
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={e => e.currentTarget.select()}
                  onBlur={handleSubmit}
                  onKeyDown={handleKeyDown}
                  className='text-base bg-transparent text-foreground outline-none focus:ring-1 focus:ring-inset focus:ring-ring font-medium max-w-40 truncate'
                />
              ) : (
                <BreadcrumbPage
                  onClick={handleStartRename}
                  className='text-base cursor-pointer hover:text-primary font-medium max-w-40 truncate'
                >
                  {project?.name ?? 'Loading...'}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {project?.importStatus === 'importing' ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <LoaderIcon className='size-4 text-muted-foreground animate-spin' />
            </TooltipTrigger>
            
            <TooltipContent>Importing...</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <CloudCheckIcon className='size-4 text-muted-foreground' />
            </TooltipTrigger>

            <TooltipContent>
              Saved{' '}
              {project?.updatedAt
                ? formatDistanceToNow(project.updatedAt, { addSuffix: true })
                : 'Loading...'}
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className='flex items-center gap-2'>
        <UserButton />
      </div>
    </nav>
  )
}
