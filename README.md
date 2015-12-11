# Giro.js

Reactive front-end framework
[examples](https://rawgit.com/freddi301/girojs/e1/index.html)

install
    bower install giro

## Reactive

You create Reactive variables in this way:

    var a = r(); // is equivalent to
    var a = new Reactive();

#### .g() - get
Returns variable value

#### .s( *value* ) - **set**
Sets variable value and returns variable

#### .m( *yourFunction*, *[...args]* ) - **method**
Tells the variable that it's value is the returned value
from *yourFunction* applied to arguments suplied. Returns variable.
The arguments can be Reactive variables, if some of them change
the method is invoked anew with changed arguments.
It's raccomanded to use functions without side-effects.

So istead of writing

    function concat(x,y){return x.concat(y)};
    var a = [1,2,3];
    var b = [4,5,6];
    var c = concat(a, b);

You have to

    var a = r().s([1,2,3]);
    var b = r().s([4,5,6]);
    var c = r().m(concat, a, b);


## Element

DOM definition in javascript (like hyperscript)

    e("p", {id:"example", class:"haha"}, [
      e("#text")
    ])

#### e - element
    e("tagname" [,atributes][,children])
    attributes: {name:"value"}
    children: e | <e>[]

All values (except tagname) supplied to e() can be Reactive variables, so we get our reactive DOM :)

## Need

## Template
Writing hyperscript ins't that fun, so here a Template

    <div class="=scope.skin" g-let="list=scope.recipes">
      <a g-for="item, index" g-in="list" onclick="#list.g().splice(index,1); list.s(list.g())">=item</a>
    </div>

The template is translated to hyperscript so JavaScript.

- Everything that begins with **=** must be *JavaScript expression*
- Everything that begins with **#** is a *JavaScript function body*
- **g-let** declares variables
- **g-for** *value, key* **g-in** *list* iterates an element over a list
- attributes begginning with **on** are EventListeners
