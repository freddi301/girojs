(function(window){

INDENT_SYMBOL = "\t";

/*

function gen_giro(indent, element, isRoot){
  if (element.nodeName=="#text") {
    var indented = _.repeat(INDENT_SYMBOL,indent);
    if (!element.textContent.match(/[^\s]+/)) return null;
    var trimt = element.textContent.trim();
    if (trimt[0]=="=") return indented+"e(\"#text\", "+trimt.slice(1)+")";
    return indented+"e(\"#text\", \""+trimt+"\")";
  }
  var tag = "\""+element.tagName.toLowerCase()+"\"", attributes = null, children = null;
  var wrapper_start = "", wrapper_end = "";
  if (element.hasAttribute("giro-repeat")) { var directive =  element.getAttribute("giro-repeat").trim().split(/\s+/); element.removeAttribute("giro-repeat");
    var loop_var = directive[0], loop_list = directive[1];
    wrapper_start="_.map, "+loop_list+", p(function("+loop_var+","+loop_var+"_index){return ";
    wrapper_end="})";
  }
  if (element.attributes.length) {
    attributes = "{"+_.map(element.attributes, function(att){
      if (att.name.slice(0,2)=="on") return "\""+att.name+"\": "+(att.value[0]=="="?"p(function(event){"+att.value.slice(1)+";event.preventDefault()})":"\""+att.value+"\"");
      return "\""+att.name+"\": "+(att.value[0]=="="?att.value.slice(1):"\""+att.value+"\"")
    }).join(", ")+"}";
  }
  if (element.childNodes.length) {
    var effective_children = _.chain(element.childNodes).map(_.partial(gen_giro, indent+1)).compact().map(function(v){return "p("+v+")"}).value();
    if (effective_children.length) children = "p(c,"+"\n"+effective_children.join(",\n")+"\n"+_.repeat(INDENT_SYMBOL,indent)+")";
  }
  if (isRoot===true) return children;
  return _.repeat(INDENT_SYMBOL,indent)+wrapper_start+"e("+[tag].concat(children?[attributes||"null", children]:attributes?[attributes]:[]).join(", ")+")"+wrapper_end;
};

var string2dom = function(fragmentString){
    var fragment = document.createElement("div");
    fragment.innerHTML = fragmentString;
    return fragment;
};

window.gen_giro = gen_giro;

document.currentScript.cog = {gen_giro:gen_giro, string2dom:string2dom};*/

})(window)
