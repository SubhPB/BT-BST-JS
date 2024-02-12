/* -- Byimaan --
  # DSA - Binary Tree (NODE)
*/
export class BTNode {
    constructor(value) {
        this.val = value;
        this.left = null;
        this.right = null;
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
    insert(val) {
        if (!this.isFull()) {
            if (this.isLeaf()) {
                this.left = new BTNode(val);
            }
            else {
                this.right = new BTNode(val);
            }
            ;
        }
        ;
    }
    ;
}
;
