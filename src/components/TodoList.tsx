import { useState, FormEvent, useCallback } from 'react'
import { XCircleIcon } from '@heroicons/react/16/solid'
import { PlusIcon } from '@heroicons/react/16/solid'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import { todoListState } from '../utils/atoms'
import { Todo } from '../interfaces'

const TodoList = () => {
  const todoList = useRecoilValue(todoListState)
  const setTodoList = useSetRecoilState(todoListState)

  const [value, setValue] = useState<string>('')
  const [showInput, setShowInput] = useState(false)

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (value.trim()) {
        setTodoList((prevTodos: Todo[]) => [...prevTodos, { id: uuidv4(), text: value, status: false }])
        setValue('')
      }
    },
    [value, setTodoList]
  )

  const handleStatusChange = useCallback(
    (id: string) => {
      setTodoList(
        todoList.map((todo) => {
          if (todo.id === id) {
            return { ...todo, status: !todo.status }
          }
          return todo
        })
      )
    },
    [todoList, setTodoList]
  )

  const handleDelete = useCallback(
    (id: string) => {
      setTodoList(todoList.filter((todo) => todo.id !== id))
    },
    [todoList, setTodoList]
  )

  const handleInputDisplay = useCallback(() => {
    setShowInput((prevState) => !prevState)
  }, [])

  return (
    <section className="h-screen flex justify-center items-center bg-gradient-to-r from-pink-200 to-purple-400 sm:w-">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className={`flex flex-col-reverse h-[30rem] px-8 sm:h-3/4 bg-white sm:px-14 rounded-lg pt-5 pb-12 ${showInput ? 'justify-between' : 'justify-end'} min-w-[18rem] sm:min-w-[27rem] relative`}
      >
        {showInput && (
          <>
            <input
              type="text"
              value={value}
              placeholder="Add new todo"
              onChange={(e) => setValue(e.target.value)}
              className="text-center border-solid border-2 border-zinc-400 font-bold py-1 rounded-md bg-slate-50 self-center w-44 sm:w-56"
            />
            <button type="submit" />
          </>
        )}
        <div className="overflow-auto">
          {todoList.map((todo, index) => (
            <div key={`${todo}${index}`} className="text-gray-500 flex items-center justify-between mb-1">
              <div
                onClick={() => handleStatusChange(todo.id)}
                className={`rounded-full w-5 h-5 cursor-pointer flex-shrink-0 ${todo.status ? 'bg-fuchsia-300' : 'border-2 border-fuchsia-300'}`}
              />
              <p className={`text-slate-500 font-bold flex-grow break-words overflow-hidden text-center max-w-44 ${todo.status ? 'line-through' : ''}`}>
                {todo.text}
              </p>
              <XCircleIcon className="text-red-400 h-7 w-7 cursor-pointer flex-shrink-0" onClick={() => handleDelete(todo.id)} />
            </div>
          ))}
        </div>
        <PlusIcon
          className="absolute bg-amber-300 h-14 w-14 text-white left-0 right-0 mx-auto -bottom-7 rounded-full p-2 cursor-pointer"
          onClick={handleInputDisplay}
        />
      </form>
    </section>
  )
}

export default TodoList
