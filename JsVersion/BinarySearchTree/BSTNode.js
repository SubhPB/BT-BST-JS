/* -- Byimaan --
    # Binary Search Tree Implementation...
*/
function nodeError(msg = '') {
    throw new Error(msg);
}
;
export class BSTNode {
    constructor(value) {
        this.val = value;
        this.left = null;
        this.right = null;
        this.checkViolation();
    }
    ;
    isFull() {
        return this.left !== null && this.right !== null;
    }
    ;
    isLeaf() {
        return this.left === null && this.right === null;
    }
    ;
    countChildren() {
        return ([this.left, this.right].filter(val => val !== null)).length;
    }
    ;
    checkViolation() {
        var _a, _b;
        const rightVal = (_a = this.right) === null || _a === void 0 ? void 0 : _a.val;
        const leftVal = (_b = this.left) === null || _b === void 0 ? void 0 : _b.val;
        const parentVal = this.val;
        // Check if right child violates BST property
        if (rightVal !== undefined && rightVal <= parentVal) {
            throw new Error("BST Rule Violation! Right child must be greater than the parent.");
        }
        // Check if left child violates BST property
        if (leftVal !== undefined && leftVal >= parentVal) {
            throw new Error("BST Rule Violation! Left child must be less than the parent.");
        }
        // Check if left child is greater than right child
        if (leftVal !== undefined && rightVal !== undefined && leftVal >= rightVal) {
            throw new Error("BST Rule Violation! Left child must be less than the right child.");
        }
    }
    ;
}
;
