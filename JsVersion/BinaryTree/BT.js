/* -- Byimaan --
    # Binary Tree
*/
import { BTNode } from "./BTNode.js";
class BinaryTree {
    constructor(rootVal = null) {
        this.root = null;
        if (typeof rootVal === 'number') {
            this.root = new BTNode(rootVal);
        }
        ;
        this.size = (this.root === null) ? 0 : 1;
    }
    ;
    insert(val) {
        const newNode = new BTNode(val);
        if (!this.root) {
            this.root = newNode;
            this.size++;
            return this.root;
        }
        const queue = [this.root];
        while (queue.length > 0) {
            const currNode = queue.shift();
            if ((currNode === null || currNode === void 0 ? void 0 : currNode.left) === null) {
                currNode.left = newNode;
                this.size++;
                return this.root;
            }
            else {
                queue.push(currNode === null || currNode === void 0 ? void 0 : currNode.left);
            }
            if ((currNode === null || currNode === void 0 ? void 0 : currNode.right) === null) {
                currNode.right = newNode;
                this.size++;
                return this.root;
            }
            else {
                queue.push(currNode === null || currNode === void 0 ? void 0 : currNode.right);
            }
            ;
        }
        ;
    }
    ;
    pop() {
        if (!this.root) {
            return null;
        }
        ;
        if (this.size === 1) {
            this.root = null;
            this.size--;
            return null;
        }
        else {
            let i = this.size;
            let currNode = this.root;
            let parentNode = new BTNode(0);
            while (i > 1) {
                parentNode = currNode;
                const goLeft = () => Math.floor(i / 2) % 2 === 0 ? true : false;
                if (goLeft()) {
                    currNode = currNode.left;
                }
                else {
                    currNode = currNode.right;
                }
                ;
                i = Math.floor(i / 2);
            }
            ;
            if (currNode === parentNode.left) {
                parentNode.left = null;
            }
            else {
                parentNode.right = null;
            }
            ;
            this.size--;
        }
        ;
    }
    ;
    preOrderTransversal() {
        const _preOrder = (node) => {
            if (node === null) {
                return [];
            }
            else {
                return [node.val, ..._preOrder(node === null || node === void 0 ? void 0 : node.left), ..._preOrder(node === null || node === void 0 ? void 0 : node.right)];
            }
            ;
        };
        return _preOrder(this.root);
    }
    ;
    inOrderTransversal() {
        const _inOrder = (node) => {
            if (node === null) {
                return [];
            }
            else {
                return [..._inOrder(node === null || node === void 0 ? void 0 : node.left), node === null || node === void 0 ? void 0 : node.val, ..._inOrder(node === null || node === void 0 ? void 0 : node.right)];
            }
        };
        return _inOrder(this.root);
    }
    ;
    postOrderTransversal() {
        const _postOrder = (node) => {
            if (node === null) {
                return [];
            }
            else {
                return [..._postOrder(node === null || node === void 0 ? void 0 : node.left), ..._postOrder(node === null || node === void 0 ? void 0 : node.right), node === null || node === void 0 ? void 0 : node.val];
            }
        };
        return _postOrder(this.root);
    }
    ;
}
;
const BT = new BinaryTree();
for (let i = 0; i < 15; i++) {
    BT.insert(i + 1);
}
;
console.log(BT.postOrderTransversal());
