/* -- Byimaan -- 
    # Binary Tree 
*/

import { serialize } from "v8";
import { BTNode } from "./BTNode.js";

type NumberOrNull = number | null;

class BinaryTree{
    
    root: BTNode | null;
    size: number;

    constructor(rootVal: NumberOrNull= null){

        this.root = null;
        if (typeof rootVal === 'number'){
           this.root = new BTNode(rootVal);
        };

        this.size = (this.root === null) ? 0 : 1;
    };

    insert(val: number){
        const newNode = new BTNode(val);

        if (!this.root){
            this.root = newNode;
            this.size ++;
            return this.root;
        }

        const queue: any[] = [this.root];

        while (queue.length > 0){

            const currNode: (BTNode | undefined) = queue.shift();
            if ( currNode?.left === null ){
                currNode.left = newNode;
                this.size ++;
                return this.root;
            } else{
                queue.push(currNode?.left);
            }

            if ( currNode?.right === null){
                currNode.right = newNode;
                this.size ++;
                return this.root;
            } else {
                queue.push(currNode?.right);
            };
        };
    };

    pop(){
        if (!this.root){
            return null;
        };
        if (this.size === 1){
            this.root = null;
            this.size --;
            return null;
        } else {
            let i = this.size;
            let currNode: any = this.root;
            let parentNode: BTNode = new BTNode(0);

            while(i > 1){
                parentNode = currNode;
                const goLeft = (): boolean => Math.floor(i/2)%2 === 0 ? true : false;
                if (goLeft()){
                    currNode = currNode.left;
                } else {
                    currNode = currNode.right;
                };
                i = Math.floor(i/2);
            };

            if (currNode === parentNode.left){
                parentNode.left = null;
            
            } else {
                parentNode.right = null;
            };
            this.size --;
        };
    };

    preOrderTransversal(): number[] {
        const _preOrder = (node: BTNode | null):number[] => {
            if (node === null){
                return []
            } else {
                return [node.val, ..._preOrder(node?.left), ..._preOrder(node?.right)]
            };
        };
        return _preOrder(this.root);
    };

    inOrderTransversal(): number[]{
        const _inOrder = (node: BTNode | null): number[] => {  
            if (node === null){
                return []
            } else {
                return [ ..._inOrder(node?.left), node?.val, ..._inOrder(node?.right) ]
            }
        };
        return _inOrder(this.root);
    };

    postOrderTransversal(): number[]{
        const _postOrder = (node: BTNode | null): number[] => {
            if(node === null){
                return [];
            } else {
                return [..._postOrder(node?.left), ..._postOrder(node?.right), node?.val]
            }
        };
        return _postOrder(this.root);
    };
};


const BT = new BinaryTree();
for(let i = 0; i < 15; i++){
    BT.insert(i+ 1)
};

console.log(BT.postOrderTransversal());