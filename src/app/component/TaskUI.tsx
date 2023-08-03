import React, { useState } from 'react'
import { useTaskContext } from '../utils/TaskProvider'
import Task from './Task'

const TaskUI = () => {
  const { tasks, handleAddTask: addTask } = useTaskContext()
  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')

  const handleAddTask = (e: React.SyntheticEvent) => {
    e.preventDefault()
    addTask(taskName, description)
    setTaskName('')
    setDescription('')
  }
  return (
    <div>
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
      <div className="mt-12">
        <div className="text-xl">Tasks:</div>
        <div className="flex flex-col lg:flex-row flex-wrap gap-4">
          {tasks.map((task, i) => (
            <Task key={i} task={task} i={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskUI
