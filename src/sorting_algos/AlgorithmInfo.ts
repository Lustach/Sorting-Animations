type TAlgorithmInfoItem = {
    name: string,
    worstCase: string,
    bestCase: string,
    average: string,
    stable: Boolean
}
interface IAlgorithmInfo {
    [key: string]: TAlgorithmInfoItem
}
let algorithmInfo: IAlgorithmInfo = {
    insertionSort: {
        name: 'Insertionsort',
        worstCase: 'n^2',
        bestCase: 'n',
        average: 'n^2',
        stable: true
    },
    quickSort: {
        name: 'Quicksort',
        worstCase: 'n^2',
        bestCase: 'nlogn',
        average: 'nlogn',
        stable: false
    },
    mergeSortIP: {
        name: 'Mergesort(In-Place)',
        worstCase: 'n^2',
        bestCase: 'nlogn',
        average: 'n^2',
        stable: true
    },
    shellSort: {
        name: 'Shellsort',
        worstCase: 'n^2',
        bestCase: 'nlog^2n',
        average: 'nlogn',
        stable: false
    },
}

export default algorithmInfo
