(function(window){

window.Reactive = Reactive;
window.r = function(){ var ret = new Reactive(); Reactive.prototype.r.apply(ret, arguments); return ret};

function Reactive(){
  this.value = undefined;
  this.watchers = [];
  this.watchees = null;
  Reactive.prototype.r.apply(this, arguments);
};

Reactive.prototype.r = function react(){ switch (arguments.length) {
  case 0: return this.value;
  case 1: return this.s(arguments[0]);
  default: return Reactive.prototype.m.apply(this,arguments);
}};

Reactive.prototype.w = function watch(callback) { this.watchers.push(callback); return this; };

Reactive.prototype.u = function unwatch(callback) { var ws = this.watchers; ws.splice(ws.indexOf(callback),1); return this; }

Reactive.prototype.s = function set(value, isDependency) { if (!isDependency) this.c();
  var old = this.value, watcher; this.value = value;
  for (var i in this.watchers) (watcher = this.watchers[i]), watcher(value, old);
  return this;
};

Reactive.prototype.m = function method(fun) { this.c();
  var dependencies = [], args = Array.prototype.slice.call(arguments,1), watchees = [], self = this;
  for (var i in args){ var arg = args[i];
    if (arg instanceof Reactive) arg.w((function(i){
        var callback = function dependency(delta, old){
          dependencies[i] = delta;
          self.s(fun.apply(null, dependencies), true);
        };
        dependencies[i] = arg.r();
        watchees.push({reactive: arg, callback:callback});
        return callback;
    })(i));
    else dependencies[i] = arg;
  }
  this.watchees = watchees;
  this.s(fun.apply(null, dependencies), true);
  return this;
};

Reactive.prototype.c = function clear_dependencies () { var watchees = this.watchees, watchee;
  for (i in watchees) (watchee = watchees[i]), watchee.reactive.u(watchee.callback); this.watchees = null;
  return this;
};

})(window)
