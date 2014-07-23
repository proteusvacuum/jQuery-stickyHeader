stickyHeader.js makes table headers stick to the top of the viewport when scrolling down long HTML data tables. 
Adapted from kingkool68/stickyHeader

This fork allows you to use this on **dynamically generated** tables.

You can also **specify an offset** if you have other things also stuck to the top of your screen. 

It also takes into account whether you are scrolling a wrapper div **sideways**, to keep your header stuck in the right place, e.g. if you have a really wide table, or a really small viewport. 

To get started just include:

0. stickyHeader.jquery.js
0. The two CSS rules to your stylesheet

## CSS Rules

```css
    .hide {
        display:none;
    }
    div.stickyHeader {
        top:0;
        position:fixed;
    }
```


## API


### Stick it. 
- Stick that header: 

```js 
    $('table.sticky').stickyHeader() 
```
- With an offset (e.g. if you have something else stuck to your screen:

```js 
    $('table.sticky').stickyHeader( { offset: 25px } ) 
```

### Unstick it.
This is good when you are destroying your views e.g. in Backbone. Unbinds it from the `$(window).scroll()` event, and destroys the created stuck elements.
```js 
    $('table.sticky').stickyHeader( { mode: "unstick" } )
```

### Restick it.

```js 
    $('table.sticky').stickyHeader( { mode: "restick" } )
```
This is useful to call on ```$(window).resize()``` (with a throttle!), in case your table changes size. 

e.g. using underscore debounce:
```js
var $table = $('table');
var table_width = $table.width();

var restickHeader =  $table.stickyHeader( { mode: "restick", offset: $nav.height() } );
var lazyRestick = _.debounce( restickHeader, 500 );

$(window).on("resize", function(){
    if ( table_width == $table.width() ){
        lazyRestick();
    }
});

```
