class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(string) {
    if (typeof string === "undefined"){
      return this.nodes[0];
    } else {
     for (var i = 0; i < this.nodes.length; i++) {
       this.nodes[i].innerHTML = string;
     }
    }
  }

  empty() {
    this.html("");
  }

  append(newEl) {
    if (typeof newEl === "object" ) {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML += $l(newEl).outerHTML;
      }
    }else if(typeof newEl === "string") {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML += newEl;
      }
    }else if((newEl)instanceof(HTMLElement)){
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML += newEl.outerHTML;
      }
    }
  }

  addClass(arg) {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].classList.add(arg)
    }
  }

  attr(attrName, attrValue){
    this.nodes.forEach((el) => el.setAttributes(attrName, attrValue));
  }

  removeClass(arg) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (typeof arg === "undefined") {
        this.nodes[i].className = "";
      } else {
        this.nodes[i].classList.remove(arg)
      }
    }
  }

  child() {
    return this.children()[0]
  }

  children() {
    let childs = [];
    const temp = this.nodes.forEach((el) => {
      if (el !== null) {
      childs = childs.concat(Array.from(el.children));
      }
    });
    let childrens = new DOMNodeCollection(childs);
    return childrens;
  }

  parent() {
    let parents = [];
    for (var i = 0; i < this.nodes.length; i++) {
      parents.push(this.nodes[i].parentNode);
    }
    let parentHood = new DOMNodeCollection(parents);
    return parentHood;

  }

  animate (animationName) {
    this.removeClass('slideInDown')
    this.addClass(animationName)
    setTimeout(() => this.removeClass(animationName), 1000)
    return this;
  }

  find(selector) {
    let results = [];
    for (var i = 0; i < this.nodes.length; i++) {
      results.push(this.nodes[i].querySelectorAll(selector));
    }
    return results;
  }

  remove() {
    this.nodes[0].parentNode.removeChild(this.nodes[0]);
  }

  on (e, callback) {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].addEventListener(e,callback);
    }
  }

  off (e, callback) {
    debugger
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].removeEventListener(e,callback);
    }
  }
}


// module.exports = DOMNodeCollection;
