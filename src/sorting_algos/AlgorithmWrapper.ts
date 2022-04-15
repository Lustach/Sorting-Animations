import insertionSortHelper from '@/sorting_algos/InsertionSort'
import quickSortHelper from '@/sorting_algos/QuickSort'
import mergeSortIPHelper from '@/sorting_algos/MergeSortInPlace'
import shellSortHelper from '@/sorting_algos/ShellSort'

const algorithms = {
    async insertionSort(arr: number[], swapFn: Function, peekAt: Function, assignAt: Function) {
        await insertionSortHelper(arr, swapFn, peekAt, assignAt)
        return true
    },
    async quickSort(arr: number[], swapFn: Function, peekAt: Function) {
        await quickSortHelper(arr, 0, arr.length - 1, swapFn, peekAt)
        return true
    },
    async mergeSortIP(arr: number[], swapFn: Function, peekAt: Function, assignAt: Function) {
        await mergeSortIPHelper(arr, 0, arr.length - 1, swapFn, peekAt, assignAt)
        return true
    },
    async shellSort(arr: number[], swapFn: Function, peekAt: Function, assignAt: Function) {
        await shellSortHelper(arr, swapFn, peekAt, assignAt)
        return true
    }
}

export default algorithms
