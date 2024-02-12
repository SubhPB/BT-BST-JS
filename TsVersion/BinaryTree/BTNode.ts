/* -- Byimaan --
  # DSA - Binary Tree (NODE)
*/

type NodeOrNull = BTNode | null;

export class BTNode{

    val: number;
    left: NodeOrNull;
    right: NodeOrNull;

    constructor(value: number){
        this.val = value;
        this.left = null;
        this.right = null;
    };

    isFull(): boolean {
        return this.left !== null && this.right !== null;
    };

    isLeaf(): boolean{
        return this.left === null && this.right === null;
    };

    insert(val:number){
        if (!this.isFull()){
            if (this.isLeaf()){
                this.left = new BTNode(val);
            } else{
                this.right = new BTNode(val);
            };
        };
    };

};

