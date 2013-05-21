# Sioux UINavigation

``` batch
npm install sioux-ui-navigation
```

Navigation (similar to the [iOS one](http://developer.apple.com/library/ios/#documentation/UIKit/Reference/UINavigationController_Class/Reference/Reference.html)) for sioux. [demo](http://felix.lovassy.hu/projects/gellert/sioux/navexample/) (on desktop in Chrome use emulate touch events in devtools)

### Inherits from
* [Sioux UI](https://github.com/gerhardberger/sioux-ui)

### Create
``` js
var UINavigation = require('sioux-ui-navigation');

// the first argument is in which the navigation will be appended
var nav = new UINavigation(document.querySelector('.screen'), {
  isToolbarHidden: true
  , isBarHidden: false
  , initWith: navElem
});
```

### The navigation elem
The `stack` contains and at the creation the `initWith` property and `.push()` method take an object, which has to contain:
* __title__: the title in the bar, _String_
* __content__: the HTML what will be inserted into the `content` part, _DOM_
* __complete__: this function will be executed when the eleme will be loaded, _Function_

### Properties
* __stack__: the stack of the windows in the navigation, the last elem of the stack is the one active on the screen
* __isToolbarHidden__: _Boolean_
* __isBarHidden__: _Boolean_
* __bar__: the top bar element
* __toolbar__: the bottom toolbar element __not so useable right now__
* __content__: the content element
* __segue__: the [UISegue](https://github.com/gerhardberger/sioux-ui-segue) object (in the content element)

### Methods
##### .push(navElem)
A new elem will be added to the `stack` and it will be displayed on screen.

##### .pop()
The last elem of the `stack` will be popped and then the previous elemnt will be displayed.

##### .then(callback)
Chain it to the `push` and `pop` method and when they finish the `callback` argument will be executed.

``` js
var navObj = {
  title: 'Test Title'
  , content: someHTML
  , complete: function (content) {
    console.log('Completed!');
  }
};

navigation.push(navObj)
  .then(function () {
    console.log('Pushed!')
  })
  .pop()
  .then(function () {
    console.log('Popped!')
  });
```