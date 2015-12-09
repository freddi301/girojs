(function(window){

var Reactive = window.Reactive.Reactive;

function e(tag, attributes, children) {
  var element;
  if (tag=="#text"){
    if (attributes instanceof Reactive){
      element = document.createTextNode(attributes.g());
      attributes.w(function ReactiveElement_text_watch(delta){element.textContent = delta});
      return element;
    } else return document.createTextNode(attributes);
  }
  /*element = document.createElement(tag);
  for (var i in attributes)
    if (attributes[i] && attributes[i].p==p) attributes[i].watch(function(i, delta, old){
      if (i=="#") element.textContent = delta;
      else if (i.slice(0,2)=="on") !element.removeEventListener(i.slice(2),old) && !element.addEventListener(i.slice(2), delta);
      else element.setAttribute(i,delta);
    }.bind(null, i)).fire();
    else element.setAttribute(i, attributes[i]);
  function append_child(c){if(c instanceof Node) element.appendChild(c)};
  if (children&&children.p==p) children.watch(function(delta, old){
    if (old) for (var i in old) if ((old[i] instanceof Node) && (delta.indexOf(old[i])<0)) element.removeChild(old[i]);
    if (delta) for (var i in delta) append_child(delta[i]);
  });
  else if (children instanceof Array) for (var k in children) append_child(children[k]);
  else if (children) append_child(children);
  return element;*/
};

window.Reactive.element = e;
window.Reactive._shortcuts.e = e;

})(window)
