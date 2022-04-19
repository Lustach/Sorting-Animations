import type { IAlgorithms } from './types';
import insertionSortHelper from '@/sorting_algos/InsertionSort'
import quickSortHelper from '@/sorting_algos/QuickSort'
import mergeSortIPHelper from '@/sorting_algos/MergeSortInPlace'
import shellSortHelper from '@/sorting_algos/ShellSort'


const algorithms: IAlgorithms = {
    async insertionSort(arr, swapFn, peekAt, assignAt) {
        await insertionSortHelper(arr, swapFn, peekAt, assignAt)
        return true
    },
    async quickSort(arr, swapFn, peekAt) {
        await quickSortHelper(arr, 0, arr.length - 1, swapFn, peekAt)
        return true
    },
    async mergeSortIP(arr, swapFn, peekAt, assignAt) {
        await mergeSortIPHelper(arr, 0, arr.length - 1, swapFn, peekAt, assignAt)
        return true
    },
    async shellSort(arr, swapFn, peekAt, assignAt) {
        await shellSortHelper(arr, swapFn, peekAt, assignAt)
        return true
    }
}

export default algorithms
