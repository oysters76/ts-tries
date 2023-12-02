/*
 Trie datastructure implementation in Pure TS. 
 Author: Chirath Nissanka
 Reference: ("trie"): https://en.wikipedia.org/wiki/Trie
*/
type NULL_NODE = TNode|null; 

class TNode{
    
    private value:string; 
    private parent:NULL_NODE;
    private children:[TNode] | null;
    private canStop : boolean; 

    constructor(value:string, canStop:boolean, parent:NULL_NODE){
        this.value = value;
        this.parent = parent;
        this.children = null;
        this.canStop = canStop;
    }

    addChild(node : TNode){
        if (this.children == null){
            this.children = [node];
            return;
        }
        this.children?.push(node);
    }

    getValue():string{
        return this.value;
    }

    checkIfCanStop():boolean{
        return this.canStop;
    }

    getChildren():[TNode]|null{
        return this.children;
    }

    setCanStop(canStop:boolean):void{
        this.canStop = canStop;
    }

    getParent():NULL_NODE{
        return this.parent;
    }

}

interface TrieTree{
    add(word :string):boolean; 
    search(word:string):[string];
}

class TrieTreeImpl implements TrieTree{
    private root:NULL_NODE; 

    constructor(){
        this.root = new TNode("*", false, null);
    }

    reverse(word:string):string{
        return [...word].reverse().join("");
    }

    add(word:string): boolean {
        let cnode = this.root; 
        for (let i = 0; i < word.length; i++){
            const l = word[i]; 
            const canStop = i == word.length-1;
            let nextElem:NULL_NODE =  null;
            nextElem = new TNode(l, canStop, cnode);
            if (cnode?.getChildren()){
                let found = false;
                for (let j = 0; j < cnode.getChildren()!.length; j++){  
                   if (cnode.getChildren()![j].getValue() == l){
                     nextElem = cnode.getChildren()![j];
                     if (canStop)
                        nextElem.setCanStop(true);
                     found = true;
                   }     
                }                
                if (!found){
                    cnode?.addChild(nextElem);
                }
            }else{
                cnode?.addChild(nextElem);
            }
            cnode = nextElem;
        }
        return true;
    }

    search(prefix: string): [string] {
       let cnode : NULL_NODE | undefined = this.root; 
       let stack = [cnode]; 
       let result : [string] = [""];
       let n = 0; 
       
       let rootNode : NULL_NODE | undefined = null; 

       while (stack.length > 0){
          cnode = stack.pop();
        
          if (n >= prefix.length) 
            continue; 
        
          if (cnode == null)
            continue; 

          if (cnode?.getValue() == prefix[n] && n == prefix.length-1){
            rootNode = cnode; 
            break;
          }
          
          if (cnode?.getValue() == prefix[n]){
            n++; 
          }
          
          if (cnode.getChildren()){
            for (let j = 0; j < cnode.getChildren()!.length; j++){
                stack.push(cnode.getChildren()![j]);
            }
          }

       }

       if (rootNode == null){
        return result; 
       }

       stack = [rootNode]; 
       while (stack.length > 0){
            let cnode = stack.pop();
            
            if (cnode == null) 
                continue; 

            if (cnode.checkIfCanStop()){
                let node : NULL_NODE | undefined = cnode; 
                let word = "";
                while (node != null && node.getParent() != null){
                    word += node.getValue();
                    node = node.getParent();
                }
                result.push(this.reverse(word));
            }

            if (cnode.getChildren()){
                for (let j = 0; j < cnode.getChildren()!.length; j++){
                    stack.push(cnode.getChildren()![j]);
                }  
            }            
            
       }

       return result;
    }

}
