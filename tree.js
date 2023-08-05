import Node from "./node.js";

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
        this.levelOrderTraversed = [];
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

    insert(data, node = this.root) {
        if (node == null) {
            node = new Node(data);
            return node;
        }

        if (data < node.data) {
            node.leftChild = this.insert(data, node.leftChild);
        } else if (data > node.data) {
            node.rightChild = this.insert(data, node.rightChild);
        }
        return node;
    }

    delete(data, node = this.root) {
        //base case of the recursive function
        if (node == null) {
            return node;
        }
        //if the data we want to delete is less than the data in the current node
        //we want to recursively traverse the left tree node until we find the value
        if (data < node.data) {
            node.leftChild = this.delete(data, node.leftChild);
        }
        //if the data we want to delete is greater than the data in the current node
        //we want to recursively traverse the right tree node until we find the value
        else if (data > node.data) {
            node.rightChild = this.delete(data, node.rightChild);
        }
        //when the data we want to delete is equal to the current node data then we have found our node
        else {
            //node with only one child or no chil
            if (node.leftChild == null) {
                return node.rightChild;
            }
            if (node.rightChild == null) {
                return node.leftChild;
            }

            //if the node has both children
            node.data = this.minValue(node.rightChild);
            node.rightChild = this.delete(node.data, node.rightChild);
        }
        return node;
    }

    find(data, node = this.root) {
        if (data === node.data) {
            return node;
        }
        if (data < node.data) {
            return this.find(data, node.leftChild)
        }
        if (data > node.data) {
            return this.find(data, node.rightChild);
        }
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

    minValue(node) {
        let minv = node.data;

        while (node.leftChild != null) {
            minv = node.leftChild.data;
            node = node.leftChild;
        }
        return minv;
    }

    levelOrder(func = this.toArray) {
        this.levelOrderTraversed = [];
        if (this.root == null) return;
        const queue = [];
        queue.push(this.root);
        console.log(queue.length);
        while (queue.length > 0) {
            const node = queue[0];
            func(this.levelOrderTraversed, node.data);
            if (node.leftChild != null) queue.push(node.leftChild);
            if (node.rightChild != null) queue.push(node.rightChild);
            queue.shift();
        }
        return this.levelOrderTraversed;
    }

    inorder() {
        this.inorderTraversed = [];
        return this.recInorder();
    }

    recInorder(func = this.toArray, node = this.root) {
        if (node == null) return;
        this.recInorder(func, node.leftChild);
        func(this.inorderTraversed, node.data);
        this.recInorder(func, node.rightChild);
        return this.inorderTraversed;
    }

    preorder() {
        this.preorderTraversed = [];
        return this.recpreorder();
    }

    recpreorder(func = this.toArray, node = this.root) {
        if (node == null) return;
        func(this.preorderTraversed, node.data);
        this.recpreorder(func, node.leftChild);
        this.recpreorder(func, node.rightChild);

        return this.preorderTraversed;
    }

    postorder() {
        this.postorderTraversed = [];
        return this.recpostorder();
    }

    recpostorder(func = this.toArray, node = this.root) {
        if (node == null) return;
        this.recpostorder(func, node.leftChild);
        this.recpostorder(func, node.rightChild);
        func(this.postorderTraversed, node.data);

        return this.postorderTraversed;
    }

    toArray(arr, value) {
        arr.push(value);
    }

    height(node) {
        if (node === null) return 0;
        const leftHeight = this.height(node.leftChild);
        const rightHeight = this.height(node.rightChild);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(data, node = this.root) {
        if (data.data === node.data) return 0;
        if (data.data < node.data) return this.depth(data, node.leftChild) + 1;
        if (data.data > node.data) return this.depth(data, node.rightChild) + 1;
    }

    isBalanced() {
        const allNodes = this.inorder();
        for (let i = 0; i < allNodes.length; i++) {
            const node = this.find(allNodes[i]);
            const leftSubtreeHeight = this.height(node.leftChild);
            const rightSubtreeHeight = this.height(node.rightChild);
            if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) return false;
        }
        return true;
    }

    rebalance() {
        const currentTree = this.inorder();
        this.buildTree(currentTree);
    }
}