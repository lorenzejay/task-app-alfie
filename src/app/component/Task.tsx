import { Task } from '@/types/taskTypes'
import React, { useRef, useState } from 'react'
import TaskNameField from './TaskNameField'
import DescriptionNameField from './DescriptionNameField'
import { useTaskContext } from '../utils/TaskProvider'

interface TaskProps {
  task: Task
  i: number
}

const Task = ({ task, i }: TaskProps) => {
  const { handleUpdateChecked, handleDeleteTask } = useTaskContext()
  const taskContainerRef = useRef<HTMLDivElement>(null)
  const [editMode, setEditMode] = useState(false)

  return (
    <div
      key={i}
      ref={taskContainerRef}
      className={`border rounded-md shadow-lg p-3 min-h-[96px] lg:w-96 overflow-hidden ${
        task.checked ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div className="w-full flex items-start space-x-2 ">
        <div className="mt-1">
          <input
            type="checkbox"
            checked={task.checked}
            onChange={() => handleUpdateChecked(task.checked, i)}
          />
        </div>
        <div className="-mt-1 relative">
          <div className="lg:max-w-[384px]">
            <TaskNameField
              name={task.name}
              i={i}
              checked={task.checked}
              editModeParent={editMode}
            />
          </div>
          <DescriptionNameField
            description={task.description}
            i={i}
            checked={task.checked}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 items-end">
        <button
          onClick={() => {
            setEditMode(!editMode)
          }}
        >
          {editMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 icon icon-tabler icon-tabler-eye"
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
        <button className="" onClick={() => handleDeleteTask(i)}>
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

export default React.memo(Task)
