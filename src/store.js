import { action, createStore } from 'easy-peasy'

const ACTION_TYPES = {
  TOGGLE: 'TOGGLE',
}

const past = []
const current = []
const future = []

export const canUndo = () => current.length > 0

const store = createStore({
  todos: {
    items: [
      { id: 1, text: 'Create store', done: true },
      { id: 2, text: 'Wrap application', done: false },
      { id: 3, text: 'Use store', done: true },
    ],
    add: action((state, payload) => {
      state.items.push(payload)
    }),
    toggle: action((state, id) => {
      const index = state.items.findIndex((i) => i.id === id)
      current.push({
        type: ACTION_TYPES.TOGGLE,
        id,
        oldValue: state.items[index].done,
        newValue: !state.items[index].done,
      })
      state.items[index].done = !state.items[index].done
    }),
    setText: action((state, { newText, id }) => {
      const index = state.items.findIndex((i) => i.id === id)
      if (index > -1) {
        state.items[index].text = newText
      }
    }),
    delete: action((state, id) => {
      state.items = state.items.filter((i) => i.id !== id)
    }),
    undo: action((state) => {
      if (current.length > 0) {
        const i = current.pop()
        future.push(i)
        switch (i.type) {
          case ACTION_TYPES.TOGGLE: {
            state.items = state.items.map((item) => {
              if (i.id === item.id) {
                return {
                  ...item,
                  done: i.oldValue,
                }
              }
              return item
            })
            break
          }
          default:
            break
        }
        future.push(i)
      }
    }),
  },
})

export default store
