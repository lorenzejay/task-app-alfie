'use client'
import { TaskProvider } from './utils/TaskProvider'
import TaskUI from './component/TaskUI'

export default function Home() {
  return (
    <main className="p-4 max-w-[1440px] mx-auto">
      <h1 className="text-2xl font-bold mb-12">Task App</h1>
      <div className="flex flex-col ">
        <TaskProvider>
          <TaskUI />
        </TaskProvider>
      </div>
    </main>
  )
}
