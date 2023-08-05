import Tree from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.rightChild !== null) {
        prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
        prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function createRandomArray(n) {
    const array = [];
    for (let i = 0; i < n; i++) {
        array[i] = Math.floor(Math.random() * 100);
    }
    return array;
}

function addNumbers(n) {
    const array = createRandomArray(n);
    for (let i = 0; i < n; i++) {
        tree.insert(array[i]);
    }
}

console.log(createRandomArray(10));

const tree = new Tree(createRandomArray(5));
prettyPrint(tree.root);
tree.insert(addNumbers(3));
console.log(tree.delete(72));
prettyPrint(tree.root);
//console.log(tree.find(54));
console.log("Level-Order:" + tree.levelOrder());
console.log("In-Order:" + tree.inorder());
console.log("Pre-Order:" + tree.preorder());
console.log("Post-Order:" + tree.postorder());
console.log(tree);
console.log(tree.height(tree.root.leftChild.leftChild));
//console.log(tree.depth(tree.root.leftChild.leftChild.rightChild));
//console.log(tree.root.leftChild.leftChild.rightChild.data);
console.log(tree.isBalanced());