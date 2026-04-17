'use client'

import { Poppins } from 'next/font/google'
import { SparkleIcon } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import Image from 'next/image'
import ProjectsList from './projects-list'
import { useCreateProject } from '../../hooks/use-projects'
import ProjectsCommandDialog from '../dialogs/projects-command.dialog'
import ImportGithubDialog from '../dialogs/import-github.dialog'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function ProjectsView() {
  const [commandDialogOpen, setCommandDialogOpen] = useState(false)
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false)

  const createProject = useCreateProject()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'k') {
          e.preventDefault()
          setCommandDialogOpen(true)
        }

        if (e.key === 'i') {
          e.preventDefault()
          setImportDialogOpen(true)
        }

        if (e.key === 'j') {
          e.preventDefault()
          setNewProjectDialogOpen(true)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <ImportGithubDialog open={importDialogOpen} onOpenChange={setImportDialogOpen} />

      {/* <NewProjectDialog
        open={newProjectDialogOpen}
        onOpenChange={setNewProjectDialogOpen}
      /> */}

      <div className='min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-16'>
        <div className='w-full max-w-lg mx-auto flex flex-col gap-6 items-center'>
          <div className='flex justify-between gap-4 w-full items-center'>
            <div className='flex items-center gap-2 w-full group/logo'>
              <div className='size-8 md:size-11.5 relative'>
                <Image src='/logo.svg' alt='Polaris' fill />
              </div>

              <h1 className={cn('text-4xl md:text-5xl font-semibold', font.className)}>Polaris</h1>
            </div>
          </div>

          <div className='flex flex-col gap-4 w-full'>
            <div className='grid grid-cols-2 gap-4'>
              <Button
                variant='outline'
                onClick={() => createProject({ name: 'Untitled Project' })}
                className='h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none'
              >
                <div className='flex items-center justify-between w-full'>
                  <SparkleIcon className='size-6' />
                  <Kbd className='bg-accent border'>⌘J</Kbd>
                </div>

                <div>
                  <span className='text-lg'>New</span>
                </div>
              </Button>

              <Button
                variant='outline'
                onClick={() => setImportDialogOpen(true)}
                className='h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none'
              >
                <div className='flex items-center justify-between w-full'>
                  <FaGithub className='size-6' />
                  <Kbd className='bg-accent border'>⌘I</Kbd>
                </div>

                <div>
                  <span className='text-lg'>Import</span>
                </div>
              </Button>
            </div>

            <ProjectsList onViewAll={() => setCommandDialogOpen(true)} />
          </div>
        </div>

        <ProjectsCommandDialog open={commandDialogOpen} onOpenChange={setCommandDialogOpen} />
      </div>
    </>
  )
}
