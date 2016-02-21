

function Linkable(opts){
    _.extend(this, opts);
}


Linkable.prototype.focusNext = function(){
    this.focused = false;

};
Linkable.prototype.focusPrev = function(){
    this.focused = false;

};


Linkable.prototype.linkNext = function(linkable){

};
