import React, { useEffect, useRef, useState } from 'react'

interface DescriptionNameFieldProps {
  description: string
  setDescription: (x: string) => void
  handleUpdateTaskDescription: (newDescription: string, i: number) => void
  i: number
}

const DescriptionNameField = ({
  description,
  setDescription,
  handleUpdateTaskDescription,
  i,
}: DescriptionNameFieldProps) => {
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
    <div ref={ref} className="w-full p-2">
      {editMode ? (
        <textarea
          className="text-xs lg:text-xl text-gray-700"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            handleUpdateTaskDescription(e.target.value, i)
          }}
        ></textarea>
      ) : (
        <div className="text-xs lg:text-xl text-gray-700">{description}</div>
      )}
    </div>
  )
}

export default DescriptionNameField
