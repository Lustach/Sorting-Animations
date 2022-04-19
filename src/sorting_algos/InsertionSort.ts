import type { TswapFn, TpeekAt, TassignAt } from './types';
// export type TswapFn = (m: number, n: number) => Promise<0>;
// export type TpeekAt = (n: number) => Promise<number>
// export type TassignAt = (i: number, n: number) => Promise<void>


async function insertionSort(arr: Array<number>, swapFn: TswapFn, peekAt: TpeekAt, assignAt: TassignAt) {
    for (let i = 1; i < arr.length; i++) {
        let pivot = i
        let temp = await peekAt(pivot)
        let j = i - 1
        while (j >= 0) {
            let n = await peekAt(j)
            if (n > temp) {
                await assignAt(j-- + 1, n)
            } else {
                break
            }
        }
        await assignAt(j + 1, temp)
    }
}

export default insertionSort
