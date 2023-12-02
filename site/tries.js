"use strict";
class TNode {
    constructor(value, canStop, parent) {
        this.value = value;
        this.parent = parent;
        this.children = null;
        this.canStop = canStop;
    }
    addChild(node) {
        var _a;
        if (this.children == null) {
            this.children = [node];
            return;
        }
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.push(node);
    }
    getValue() {
        return this.value;
    }
    checkIfCanStop() {
        return this.canStop;
    }
    getChildren() {
        return this.children;
    }
    setCanStop(canStop) {
        this.canStop = canStop;
    }
    getParent() {
        return this.parent;
    }
}
class TrieTreeImpl {
    constructor() {
        this.root = new TNode("*", false, null);
    }
    reverse(word) {
        return [...word].reverse().join("");
    }
    add(word) {
        let cnode = this.root;
        for (let i = 0; i < word.length; i++) {
            const l = word[i];
            const canStop = i == word.length - 1;
            let nextElem = null;
            nextElem = new TNode(l, canStop, cnode);
            if (cnode === null || cnode === void 0 ? void 0 : cnode.getChildren()) {
                let found = false;
                for (let j = 0; j < cnode.getChildren().length; j++) {
                    if (cnode.getChildren()[j].getValue() == l) {
                        nextElem = cnode.getChildren()[j];
                        if (canStop)
                            nextElem.setCanStop(true);
                        found = true;
                    }
                }
                if (!found) {
                    cnode === null || cnode === void 0 ? void 0 : cnode.addChild(nextElem);
                }
            }
            else {
                cnode === null || cnode === void 0 ? void 0 : cnode.addChild(nextElem);
            }
            cnode = nextElem;
        }
        return true;
    }
    search(prefix) {
        let cnode = this.root;
        let stack = [cnode];
        let result = [""];
        let n = 0;
        let rootNode = null;
        while (stack.length > 0) {
            cnode = stack.pop();
            if (n >= prefix.length)
                continue;
            if (cnode == null)
                continue;
            if ((cnode === null || cnode === void 0 ? void 0 : cnode.getValue()) == prefix[n] && n == prefix.length - 1) {
                rootNode = cnode;
                break;
            }
            if ((cnode === null || cnode === void 0 ? void 0 : cnode.getValue()) == prefix[n]) {
                n++;
            }
            if (cnode.getChildren()) {
                for (let j = 0; j < cnode.getChildren().length; j++) {
                    stack.push(cnode.getChildren()[j]);
                }
            }
        }
        if (rootNode == null) {
            return result;
        }
        stack = [rootNode];
        while (stack.length > 0) {
            let cnode = stack.pop();
            if (cnode == null)
                continue;
            if (cnode.checkIfCanStop()) {
                let node = cnode;
                let word = "";
                while (node != null && node.getParent() != null) {
                    word += node.getValue();
                    node = node.getParent();
                }
                result.push(this.reverse(word));
            }
            if (cnode.getChildren()) {
                for (let j = 0; j < cnode.getChildren().length; j++) {
                    stack.push(cnode.getChildren()[j]);
                }
            }
        }
        return result;
    }
}
