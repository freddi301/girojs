/*

(function(window){

var currentScript = document.currentScript;

var stuff = function(){};

stuff.load = function (url, options){ return new Promise(function(resolve, reject){
  $.ajax(_.extend({url:url}, options)).then(resolve, reject);
})}

stuff.loadScript = function (url) {return new Promise(function(resolve, reject){
  var existing = document.querySelector("script[src='"+url+"']");
  if (existing) return resolve(existing);
  var tag = document.createElement("script");
  var fail = setTimeout(reject, 5000);
  tag.onload = function(){clearTimeout(fail); resolve(tag)};
  tag.src=url; document.head.appendChild(tag);
})};

stuff.need = function(props){
  if (_.isString(props)) {
    return stuff.loadScript(props).then(function(script){return script.cog});
  }
  var ret = {};
  _.each(props, function(prop, name){
    ret[name] = stuff.loadScript(prop);
  });
  return Promise.props(ret).then(function(scripts){
    var cogs = {};
    _.each(scripts, function(script, name){
      cogs[name] = script.cog;
    });
    return Promise.props(cogs);
  });
};

stuff.fileName = /[^\/]+$/;
stuff.dirName = function(string){return string.replace(stuff.fileName, "")};

stuff.giro = function(url){
  var ret_promise = Promise.join(stuff.need(stuff.dirName(currentScript.src)+"giro.js"), stuff.load(url), function(giro,text){
    var fnsrc = "\"use strict\";\nreturn "+giro.gen_giro(0,giro.string2dom(text),true); console.log(fnsrc);
    return new Function("scope", fnsrc);
  });
  ret_promise.append=function(model, element, wrap, wrap_attributes){
    if(typeof element == "string") element = document.querySelector(element);
    ret_promise.then(function(template){element.appendChild(e(wrap||"div",wrap_attributes||null,template(model)))});
  };
  return ret_promise;
};

window.stuff = stuff;
window.l = stuff.load;
window.lS = stuff.loadScript;
window.n = stuff.need;

})(window);
*/
