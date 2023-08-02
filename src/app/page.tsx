'use client'

import { useEffect, useRef, useState } from 'react'
import TaskNameField from './component/TaskNameField'
import DescriptionNameField from './component/DescriptionNameField'

export interface Task {
  name: string
  description: string
  checked: boolean
}

interface TaskProps {
  task: Task
  i: number
  handleUpdateChecked: (checked: boolean, i: number) => void
  handleDeleteTask: (task: Task, i: number) => void
  handleUpdateTaskName: (newTaskName: string, i: number) => void
  handleUpdateTaskDescription: (newTaskDescription: string, i: number) => void
}

const Task = ({
  task,
  i,
  handleUpdateChecked,
  handleDeleteTask,
  handleUpdateTaskName,
  handleUpdateTaskDescription,
}: TaskProps) => {
  const [name, setName] = useState(task.name)
  const [description, setDescription] = useState(task.description)
  const [editNameMode, setEditNameMode] = useState(false)
  const [editDescriptionMode, setEditDescriptionMode] = useState(false)

  const taskContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutOfTask = (event: any) => {
      if (
        taskContainerRef.current &&
        !taskContainerRef.current?.contains(event.target)
      ) {
        if (editNameMode) {
          setEditNameMode(false)
        }
        console.log('clciked outside')
      }
    }
    document.addEventListener('mousedown', handleClickOutOfTask)

    return () => {
      document.removeEventListener('mousedown', handleClickOutOfTask)
    }
  }, [taskContainerRef, editNameMode])

  return (
    <div
      ref={taskContainerRef}
      className="border rounded-md shadow-lg p-3 min-h-[96px] lg:w-64"
    >
      <div key={i} className="flex items-start space-x-2 ">
        <div className="mt-1">
          <input
            type="checkbox"
            checked={task.checked}
            onChange={() => handleUpdateChecked(task.checked, i)}
          />
        </div>
        <div className="-mt-1">
          <TaskNameField
            task={task}
            name={name}
            setName={setName}
            i={i}
            handleUpdateTaskName={handleUpdateTaskName}
          />
          <DescriptionNameField
            description={description}
            setDescription={setDescription}
            handleUpdateTaskDescription={handleUpdateTaskDescription}
            i={i}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 items-end">
        <button
          onClick={() => {
            setEditNameMode(!editNameMode)
          }}
        >
          {editNameMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 icon icon-tabler icon-tabler-eye"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 icon icon-tabler icon-tabler-edit"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
              <path d="M16 5l3 3"></path>
            </svg>
          )}
        </button>
        <button className="" onClick={() => handleDeleteTask(task, i)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 icon icon-tabler icon-tabler-trash"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7l16 0"></path>
            <path d="M10 11l0 6"></path>
            <path d="M14 11l0 6"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')

  const handleAddTask = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const task: Task = {
      name: taskName,
      description: description,
      checked: false,
    }
    setTasks([...tasks, task])
    setTaskName('')
    setDescription('')
  }

  const handleUpdateChecked = (checked: boolean, i: number) => {
    const tasksCopy = [...tasks]
    const selected = tasksCopy[i]

    if (!selected) return
    selected.checked = !checked

    setTasks([...tasksCopy])
  }
  const handleDeleteTask = (task: Task, i: number) => {
    const tasksCopy = [...tasks]
    const remainingTasks = tasksCopy.filter((_, index) => index !== i)
    console.log('remaining tasks', remainingTasks)
    setTasks([...remainingTasks])
  }
  const handleUpdateTaskName = (newTaskName: string, i: number) => {
    const tasksCopy = [...tasks]
    const taskToUpdate = tasksCopy[i]
    if (!taskToUpdate) return
    taskToUpdate.name = newTaskName
    setTasks([...tasksCopy])
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
  }

  console.log('tasks', tasks)

  return (
    <main className="p-4 max-w-[1440px] mx-auto">
      <h1 className="text-2xl font-bold mb-12">Task App</h1>
      <div className="flex flex-col ">
        <form onSubmit={handleAddTask} className="flex flex-col space-y-4 ">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Task Name
            </label>
            <input
              required
              name="name"
              id="name"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 "
          >
            Add
          </button>
        </form>
        <div className="mt-4">
          <div className="text-xl">Tasks:</div>
          <div className="space-y-2">
            {tasks.map((task, i) => (
              <Task
                key={i}
                task={task}
                i={i}
                handleUpdateChecked={handleUpdateChecked}
                handleDeleteTask={handleDeleteTask}
                handleUpdateTaskName={handleUpdateTaskName}
                handleUpdateTaskDescription={handleUpdateTaskDescription}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
