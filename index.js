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

const tree = new Tree([31, 22, 73, 14, 25, 56, 87, 54, 83, 73, 35, 72, 73, 87, 12, 33, 44]);
prettyPrint(tree.root);
tree.insert(9);
console.log(tree.delete(72));
prettyPrint(tree.root);
console.log(tree.find(54));
console.log("Level-Order:" + tree.levelOrder());
console.log("In-Order:" + tree.inorder());
console.log("Pre-Order:" + tree.preorder());
console.log("Post-Order:" + tree.postorder());