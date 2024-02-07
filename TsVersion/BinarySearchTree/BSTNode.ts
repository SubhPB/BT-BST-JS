/* -- Byimaan --
    # Binary Search Tree Implementation...
*/


type NodeOrNull = BSTNode | null;

function nodeError(msg: string =''){
    throw new Error(msg);
};

export class BSTNode{
    val: number;
    left: NodeOrNull;
    right: NodeOrNull;

    constructor(value: number){ 
        this.val = value;
        this.left = null;
        this.right = null;
        this.checkViolation();
    };

    isFull(): boolean {
        return this.left !== null && this.right !== null;
    };
    isLeaf(): boolean{
        return this.left === null && this.right === null;
    };
    countChildren(): number {
        return ([this.left,this.right].filter( val => val !== null)).length;
    };

    checkViolation() {
        const rightVal = this.right?.val;
        const leftVal = this.left?.val;
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
    };
};