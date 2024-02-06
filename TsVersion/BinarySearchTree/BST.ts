/* -- Byimaan -- 
    # BST (Binary search tree implementation...)
*/

import { serialize } from "v8";
import { BSTNode } from "./BSTNode.js";

type NumberOrNull = number | null;
type NodeOrNull = (BSTNode |  null );

class BST{

    root: BSTNode | null;
    size: number;

    constructor(rootVal: NumberOrNull= null){
        this.root = null;
        if (typeof rootVal === 'number'){
           this.root = new BSTNode(rootVal);
        };
        this.size = (this.root === null) ? 0 : 1;
    };


    insert(value: number): void{
        const newNode = new BSTNode(value);
        if (this.size === 0){
            this.root = newNode;
            this.size ++;
            return;
        };
        
        const _insert = (node: BSTNode | null): any => {
            if (node === null){
                node = newNode;
                this.size ++;
                return node;
            };

            if (value > node.val){
                node.right = _insert(node.right);
            } else {
                node.left = _insert(node.left); 
            };

            return node;
        };
        _insert(this.root);
    };

    insertArr(arr: number[]){
        for(let i of arr){
            this.insert(i);
        };
    };

    searchMax(subtree: null | BSTNode =null): NodeOrNull{  
        const _searchMaxNode = (node: BSTNode | null): NodeOrNull => {

            if (!node) return null;

            if (node?.right === null){
                // node does not have right subtree...
                // node is maximum by itself...
                return node;
            };
            return _searchMaxNode(node?.right)
        };
        return _searchMaxNode(subtree || this.root);
    };

    searchMin(subtree: null | BSTNode | undefined =null){
        const _searchMinNode = (node: BSTNode | null): NodeOrNull => {

            if (!node) return null;

            if (node?.left === null){
                // node does not have left subtree...
                // node is minimum by itself...
                return node;
            };
            return _searchMinNode(node?.left)
        };
        return _searchMinNode(subtree || this.root);
    };

    search(val: number,needParent=false,subtree?:BSTNode): {node: BSTNode | null, parent?: BSTNode | null, direction?: string | null} {

        
        const _search = (node: BSTNode | null): {node: BSTNode | null, parent?: BSTNode | null, direction?: string} => {
            
            if (node === null){
                return {node: null};
            };
            if (needParent){
                if (node?.left?.val === val){
                    // requested node found...
                    return { node: node?.left, parent: node, direction: 'left'};
                } else if (node?.right?.val === val){
                    return { node: node?.right, parent: node, direction: 'right'};
                }
            };
            if (node.val === val){
                // requested node found...
                return {node: node, parent: null};
            };

    
            if (node?.val > val){
                return _search(node.left);
            } else {
                return _search(node.right);
            };      
        };
        return _search(subtree || this.root);
    };

    delete(val: number){
        
        let {node : targetNode, parent: parentNode, direction: dir } = this.search(val,true);
        
        // Specific Case, if it is the root node...
        if (this.root?.val === val){
            this.root = null;
            this.size = 0;
            return targetNode;
        }

        if (!targetNode || !parentNode || !dir) return;

        // case I: target node is a leaf ...
        if (targetNode?.isLeaf()){
            if (dir === 'left'){
                parentNode.left = null;
                this.size --;
            } else if (dir === 'right') {
                parentNode.right = null;
                this.size --;
            } else{
                throw new Error('Deletion Failed!. deletion was failed due to some reason...')
            };
            return targetNode;
        };
        // case II: target node is a parent of single child...
        if (targetNode?.countChildren() === 1){     
            if (targetNode?.left){
                if (dir === 'left'){
                    parentNode.left = targetNode.left;
                } else{
                    parentNode.right = targetNode.left;
                }
            } else {
                if (dir === 'left'){
                    parentNode.left = targetNode.right;
                } else{
                    parentNode.right = targetNode.right;
                };
            };
            this.size --;
            return targetNode;
        };
        // case III: target node have two children...
        if (targetNode?.isFull()){
            // we have two choices either to find the maximum node in the left subtree
            // of the target node or to find the minimum node in the right subtree...
            // --- I will go with the first approach to find the max in left subtree for now ---

            const maxNodeOfTargetSubTree = this.searchMax(targetNode?.left);
            if (maxNodeOfTargetSubTree){
                // -- if the max node is a leaf then it is all okay. But,
                // there is an edge case while swapping the max node with the target node. suppose if the maxnode have left subtree.
                // when we will swap without preserving the left subtree of max node then then whole left tree will be skipped...
                // -- By the way, right subtree is not possible of the max node...


                // this will deal with edge case in both scenrios (leaf or non leaf)...
                // and also reduce the size...
                this.delete(maxNodeOfTargetSubTree?.val);

                if (dir === 'left' && parentNode?.left){
                    parentNode.left.val = maxNodeOfTargetSubTree?.val;
                } else if (dir === 'right' && parentNode?.right){
                    parentNode.right.val = maxNodeOfTargetSubTree?.val;
                };
                
                return targetNode;
            };
        };
    };

};

const bst = new BST();

for(let i of [4,2,6,1,3,20,21,18,15,16,19,10,11,13,12 ]){
    bst.insert(i);
};

console.log('Before deletion the size was - ',bst.size);
//console.log(bst.root)

console.log(bst.delete(4));

console.log('');
console.log("---- after deletion ----");
console.log('');
console.log(bst.root)
console.log('After deletion the size was - ',bst.size);