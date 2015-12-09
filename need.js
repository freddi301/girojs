(function(window){

var currentScript = document.currentScript;

var loadScript = function (url) {return new Promise(function(resolve, reject){
  var existing = document.querySelector("script[src='"+url+"']");
  if (existing) return existing.addEventListener("load", function(){resolve(existing)});
  var tag = document.createElement("script");
  var fail = setTimeout(reject, 5000);
  tag.onload = function(){clearTimeout(fail); resolve(tag)};
  tag.src=url; document.head.appendChild(tag);
})};

var need = function(props){
  if (_.isString(props)) {
    return loadScript(props).then(function(script){return script.cog});
  }
  var ret = {};
  _.each(props, function(prop, name){
    ret[name] = loadScript(prop);
  });
  return Promise.props(ret).then(function(scripts){
    var cogs = {};
    _.each(scripts, function(script, name){
      cogs[name] = script.cog;
    });
    return Promise.props(cogs);
  });
};

var fileName = /[^\/]+$/;
var dirName = function(string){return string.replace(fileName, "")};

function template(url){
  return Promise.join(need(dirName(currentScript.src.toString())+"/template.js"), $.get(url),
  function (template, html){
    var source = template.node(template.html2dom(html)); console.log(source);
    return new Function("s","\"use strict\"; return "+source);
  }
)};

window.Giro = window.Giro || { _shortcuts: {}};

window.Giro.need = need;
window.Giro.loadScript = loadScript;
window.Giro.template = template;

window.Giro._shortcuts.n = need;
window.Giro._shortcuts.lS = loadScript;
window.Giro._shortcuts.t = template;

})(window);
