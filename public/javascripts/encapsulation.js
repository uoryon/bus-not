function sea(e){
  var self = document.querySelectorAll(e);
  this.click = function(callback){
    for(var i = self.length - 1; i >= 0; i --){
      self[i].addEventListener('click', callback, true);
    }
    return this;
  }
  this.text = function(){
    var text = '';
    for(var i = self.length-1; i>=0; i--){
      text += self[i].innerText; 
    }
    return text;
  }
  this.value = function(){
    var value = [];
    for(var i = self.length-1; i>=0; i--){
      value.push(self[i].value); 
    }
    if(value.length == 1) value = value[0];
    return value;
  }
  this.html = function(content){
    if(self.length>1){console.log('節點為複數。');return;}
    if(content) {
      self[0].innerHTML = content;
    }
    else return self[0].innerHTML;
  }
  this.after = function(node){
    if(self.length>1){console.log('節點為複數。');return;}
    self[0].innerHTML+=node;
  }
}


function $(e){
  var a = new sea(e);
  return a;
}
