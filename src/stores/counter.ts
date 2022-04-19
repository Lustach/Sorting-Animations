import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'util',
  state: () => ({
    dataList: [],
    canvasWidth: 1,
    canvasHeight: 1,
    maxHeight: 1,
    m: -1,
    n: -1,
    peeking: -1,
    assigning: -1,
    diff: 0,
    step: 1,
    sorting: false,
    speed: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
