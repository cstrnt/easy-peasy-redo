import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { canUndo } from './store'

function App() {
  const todos = useStoreState((state) => state.todos.items)
  const toggleItem = useStoreActions((actions) => actions.todos.toggle)
  const undo = useStoreActions((actions) => actions.todos.undo)
  return (
    <div>
      {todos.map(({ text, id, done }) => (
        <div
          key={id}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <input
            type="checkbox"
            checked={done}
            onChange={() => toggleItem(id)}
          />
          <p>{text}</p>
        </div>
      ))}
      <button disabled={!canUndo()} onClick={() => undo()}>
        UNDO
      </button>
    </div>
  )
}

export default App
