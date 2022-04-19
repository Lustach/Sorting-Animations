export type TswapFn = (m: number, n: number) => Promise<void>;
export type TpeekAt = (n: number) => Promise<number>
export type TassignAt = (i: number, n: number) => Promise<void>
export type TAlgorithmsItem = {
    (arr: Array<number>, swapFn: TswapFn, peekAt: TpeekAt, assignAt: TassignAt): Promise<Boolean>
}

export interface IAlgorithms {
    insertionSort: TAlgorithmsItem,
    quickSort: (arr: Array<number>, swapFn: TswapFn, peekAt: TpeekAt) => Promise<Boolean>,
    mergeSortIP: TAlgorithmsItem,
    shellSort: TAlgorithmsItem,
}
