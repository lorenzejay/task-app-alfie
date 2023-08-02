import React, { useEffect, useRef, useState } from 'react'
import { Task } from '../page'

interface TaskNameFieldProps {
  task: Task
  name: string
  setName: (x: string) => void
  handleUpdateTaskName: (newTaskName: string, i: number) => void
  i: number
}

const TaskNameField = ({
  name,
  task,
  setName,
  handleUpdateTaskName,
  i,
}: TaskNameFieldProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const handleClickOutOfTask = (event: any) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        return setEditMode(!editMode)
      }
    }
    document.addEventListener('mousedown', handleClickOutOfTask)

    return () => {
      document.removeEventListener('mousedown', handleClickOutOfTask)
    }
  }, [ref, editMode])
  return (
    <div ref={ref} className="p-2">
      {editMode ? (
        <input
          type="text"
          value={name}
          className={`bg-red-500 lg:text-2xl mb-auto font-medium hover:cursor-pointer ${
            editMode &&
            'focus:outline focus:ring-2 ring-sky-500 focus:cursor-default'
          }`}
          onChange={(e) => {
            setName(e.target.value)
            handleUpdateTaskName(e.target.value, i)
          }}
        />
      ) : (
        <div
          className={`lg:text-2xl font-medium ${
            task.checked ? 'line-through' : ''
          }`}
        >
          {name}
        </div>
      )}
    </div>
  )
}

export default TaskNameField
