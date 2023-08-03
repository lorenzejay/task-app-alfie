import { Task } from '@/types/taskTypes'
import { useEffect, useState } from 'react'

export interface TaskManagerHook {
  tasks: Task[]
  handleAddTask: (name: string, description: string) => void
  handleDeleteTask: (i: number) => void
  handleUpdateChecked: (checked: boolean, i: number) => void
  handleUpdateTaskDescription: (newTaskDescription: string, i: number) => void
  handleUpdateTaskName: (newTaskName: string, i: number) => void
}
const useTaskManager = (initialTasks = []): TaskManagerHook => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  useEffect(() => {
    const storedTasks =
      JSON.parse(localStorage.getItem('tasks') as string) || []
    setTasks(storedTasks)
  }, [])

  const saveTasksToLocalStorage = (updatedTasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  const handleAddTask = (name: string, description: string) => {
    const newTask = { checked: false, name, description }
    setTasks([...tasks, newTask])
    saveTasksToLocalStorage([...tasks, newTask])
  }

  const handleUpdateChecked = (checked: boolean, i: number) => {
    const tasksCopy = [...tasks]
    const selected = tasksCopy[i]
    if (!selected) return
    selected.checked = !checked

    setTasks([...tasksCopy])
    saveTasksToLocalStorage([...tasksCopy])
  }
  const handleDeleteTask = (i: number) => {
    const remainingTasks = [...tasks].filter((_, index) => index !== i)
    setTasks(remainingTasks)
    saveTasksToLocalStorage(remainingTasks)
  }
  const handleUpdateTaskName = (newTaskName: string, i: number) => {
    const tasksCopy = [...tasks]
    const taskToUpdate = tasksCopy[i]
    if (!taskToUpdate) return
    taskToUpdate.name = newTaskName
    setTasks([...tasksCopy])
    saveTasksToLocalStorage([...tasksCopy])
  }
  const handleUpdateTaskDescription = (
    newTaskDescription: string,
    i: number
  ) => {
    const tasksCopy = [...tasks]
    const taskToUpdate = tasksCopy[i]
    if (!taskToUpdate) return
    taskToUpdate.description = newTaskDescription
    setTasks([...tasksCopy])
    saveTasksToLocalStorage([...tasksCopy])
  }

  return {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleUpdateChecked,
    handleUpdateTaskDescription,
    handleUpdateTaskName,
  }
}

export default useTaskManager
