let algorithmInfo = {
    insertionSort: {
        name: 'Insertionsort',
        worstCase: 'n^2',
        bestCase: 'n',
        average: 'n^2',
        stable: 'Yes'
    },
    quickSort: {
        name: 'Quicksort',
        worstCase: 'n^2',
        bestCase: 'nlogn',
        average: 'nlogn',
        stable: 'No'
    },
    mergeSortIP: {
        name: 'Mergesort(In-Place)',
        worstCase: 'n^2',
        bestCase: 'nlogn',
        average: 'n^2',
        stable: 'Yes'
    },
    shellSort: {
        name: 'Shellsort',
        worstCase: 'n^2',
        bestCase: 'nlog^2n',
        average: 'nlogn',
        stable: 'No'
    },
}

export default algorithmInfo
