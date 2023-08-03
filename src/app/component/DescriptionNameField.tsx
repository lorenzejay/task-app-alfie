import React, { useEffect, useRef, useState } from 'react'
import useTaskManager from '../hooks/useTaskManager'
import { useTaskContext } from '../utils/TaskProvider'

interface DescriptionNameFieldProps {
  description: string
  i: number
  checked: boolean
}

const DescriptionNameField = ({
  description,
  i,
  checked,
}: DescriptionNameFieldProps) => {
  const { handleUpdateTaskDescription } = useTaskContext()
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
    <div ref={ref} className="w-full p-2" onClick={handleToggleClick}>
      {editMode ? (
        <textarea
          className="text-xs lg:text-xl text-gray-700"
          value={description}
          onChange={(e) => {
            handleUpdateTaskDescription(e.target.value, i)
          }}
        ></textarea>
      ) : (
        <p
          className={`w-full text-xs lg:text-xl text-gray-700 ${
            checked ? 'line-through text-gray-400' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default DescriptionNameField
