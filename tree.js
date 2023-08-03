import Node from "./node.js";

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const sortedArray = this.sortArray(array);
        const uniqueValueArrays = this.deleteDuplicates(sortedArray);
        const arrayLength = uniqueValueArrays.length;
        const root = this.sortedArrayToBST(uniqueValueArrays, 0, arrayLength - 1);
        return root;
    }

    sortArray(array) {
        const sorted = array.sort((a, b) => a - b);
        return sorted;
    }

    deleteDuplicates(array) {
        const unique = [...new Set(array)];
        return unique;
    }

    sortedArrayToBST(array, startIndex, endIndex) {
        if (startIndex > endIndex) {
            return null;
        }
        const mid = parseInt((startIndex + endIndex) / 2, 10);
        const node = new Node(array[mid]);
        node.leftChild = this.sortedArrayToBST(array, startIndex, mid - 1);
        node.rightChild = this.sortedArrayToBST(array, mid + 1, endIndex);
        return node;
    }
}