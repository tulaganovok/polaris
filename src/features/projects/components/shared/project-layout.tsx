'use client'

import { PropsWithChildren } from 'react'
import Navbar from './navbar'
import { Id } from '../../../../../convex/_generated/dataModel'
import { Allotment } from 'allotment'
import Sidebar from '@/features/conversations/components/shared/sidebar'
import 'allotment/dist/style.css'

const MIN_SIDEBAR_WIDTH = 200
const MAX_SIDEBAR_WIDTH = 800
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH = 400
const DEFAULT_MAIN_SIZE = 1000

interface ProjectIdLayoutProps extends PropsWithChildren {
  projectId: Id<'projects'>
}

export default function ProjectLayout({ projectId, children }: ProjectIdLayoutProps) {
  return (
    <div className='w-full h-screen flex flex-col'>
      <Navbar projectId={projectId} />

      <div className='flex-1 flex overflow-hidden'>
        <Allotment
          className='flex-1'
          defaultSizes={[DEFAULT_CONVERSATION_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}
        >
          <Allotment.Pane
            snap
            minSize={MIN_SIDEBAR_WIDTH}
            maxSize={MAX_SIDEBAR_WIDTH}
            preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
          >
            <Sidebar projectId={projectId} />
          </Allotment.Pane>

          <Allotment.Pane>{children}</Allotment.Pane>
        </Allotment>
      </div>
    </div>
  )
}
