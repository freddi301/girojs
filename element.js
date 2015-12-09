(function(window){

var Reactive = window.Giro.Reactive;

function e(tag, attributes, children) {
  if (tag=="#text"){
    if (attributes instanceof Reactive){
      var element = document.createTextNode(attributes.g());
      attributes.w(function ReactiveElement_text_watch(delta){element.textContent = delta});
      return element;
    } else return document.createTextNode(attributes);
  }
  var element = document.createElement(tag);
  for (var i in attributes) { var attribute = attributes[i];
    var callback = setElementAttribute(element, i);
    if (attribute instanceof Reactive) callback(attribute.g()), attribute.w(callback);
    else callback(attribute);
  }
  if (children instanceof Node) element.appendChild(children);
  else if (children instanceof Array) for (var c in children) element.appendChild(children[c]);
  else if (children instanceof Reactive) children.w(function ReactiveElement_children_watch(delta, old){
    if (old) for (var o in old) if (delta.indexOf(old[o])<0) element.removeChild(old[o]);
    if (delta) for (var c in delta) element.appendChild(delta[c]);
  }).s(children.g());
  return element
};

function setElementAttribute (element, i) { var body;
  return function ReactiveElement_attribute_watch(delta, old){
    if (i.slice(0,2)=="on") element.removeEventListener(body = i.slice(2), old), element.addEventListener(body, delta);
    else element.setAttribute(i, delta)
  }
};

window.Giro.element = e;
window.Giro._shortcuts.e = e;

})(window)
