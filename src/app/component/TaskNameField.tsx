import React, { useEffect, useRef, useState } from 'react'
import useTaskManager from '../hooks/useTaskManager'
import { useTaskContext } from '../utils/TaskProvider'

interface TaskNameFieldProps {
  name: string
  i: number
  checked: boolean
  editModeParent: boolean
}

const TaskNameField = ({
  name,
  checked,
  i,
  editModeParent,
}: TaskNameFieldProps) => {
  const { handleUpdateTaskName } = useTaskContext()
  const ref = useRef<HTMLDivElement>(null)
  const [editMode, setEditMode] = useState(false)

  const handleToggleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current && ref.current?.contains(event.target as Node)) {
      setEditMode(true)
    }
  }
  useEffect(() => {
    const handleClickOutOfTask = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        return setEditMode(false)
      }
    }
    document.addEventListener('click', handleClickOutOfTask)

    return () => {
      document.removeEventListener('click', handleClickOutOfTask)
    }
  }, [ref, editMode])

  return (
    <div
      ref={ref}
      className="pl-2 py-2 w-full h-full"
      onClick={handleToggleClick}
    >
      {editMode || editModeParent ? (
        <input
          maxLength={30}
          type="text"
          value={name}
          className={`lg:text-2xl mb-auto font-medium hover:cursor-pointer ${
            editMode ||
            (editModeParent &&
              'ring-2 focus:outline focus:ring-2 ring-sky-500 focus:cursor-default')
          }`}
          onChange={(e) => {
            handleUpdateTaskName(e.target.value, i)
          }}
        />
      ) : (
        <p
          className={`w-full lg:text-2xl font-medium ${
            checked ? 'line-through text-gray-400' : ''
          }`}
        >
          {name}
        </p>
      )}
    </div>
  )
}

export default TaskNameField
