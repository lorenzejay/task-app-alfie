import React, { createContext, useContext } from 'react'
import useTaskManager, { TaskManagerHook } from '../hooks/useTaskManager'

const TaskContext = createContext<TaskManagerHook | undefined>(undefined)

export const TaskProvider = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode
}) => {
  const taskManager = useTaskManager()

  return (
    <TaskContext.Provider value={taskManager}>{children}</TaskContext.Provider>
  )
}

export const useTaskContext = (): TaskManagerHook => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
