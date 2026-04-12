'use client'

import { useState } from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { Allotment } from 'allotment'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import FileExplorer from '../file-explorer'

const MIN_SIDEBAR_WIDTH = 200
const MAX_SIDEBAR_WIDTH = 800
const DEFAULT_SIDEBAR_WIDTH = 350
const DEFAULT_MAIN_SIZE = 1000

interface ProjectViewProps {
  projectId: Id<'projects'>
}

export default function ProjectView({ projectId }: ProjectViewProps) {
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor')

  return (
    <div className='h-full flex flex-col'>
      <nav className='h-8.75 flex items-center bg-sidebar border-b'>
        <div
          onClick={() => setActiveView('editor')}
          className={cn(
            'flex items-center gap-2 h-full px-3 cursor-pointer text-muted-foreground border-r hover:bg-accent/30',
            activeView === 'editor' && 'bg-background text-foreground',
          )}
        >
          <span className='text-sm'>Code</span>
        </div>

        <div
          onClick={() => setActiveView('preview')}
          className={cn(
            'flex items-center gap-2 h-full px-3 cursor-pointer text-muted-foreground border-r hover:bg-accent/30',
            activeView === 'preview' && 'bg-background text-foreground',
          )}
        >
          <span className='text-sm'>Preview</span>
        </div>

        <div className='flex-1 flex justify-end h-full'>
          <Button variant={'outline'} className='h-full rounded-none'>
            <FaGithub /> Export
          </Button>
          {/* <ExportPopover projectId={projectId} /> */}
        </div>
      </nav>

      <div className='flex-1 relative'>
        <div className={cn('absolute inset-0', activeView === 'editor' ? 'visible' : 'invisible')}>
          <Allotment defaultSizes={[DEFAULT_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}>
            <Allotment.Pane
              snap
              minSize={MIN_SIDEBAR_WIDTH}
              maxSize={MAX_SIDEBAR_WIDTH}
              preferredSize={DEFAULT_SIDEBAR_WIDTH}
            >
              <FileExplorer projectId={projectId} />
            </Allotment.Pane>

            <Allotment.Pane>Panel 2{/* <EditorView projectId={projectId} /> */}</Allotment.Pane>
          </Allotment>
        </div>

        <div className={cn('absolute inset-0', activeView === 'preview' ? 'visible' : 'invisible')}>
          {/* <PreviewView projectId={projectId} /> */}
        </div>
      </div>
    </div>
  )
}
