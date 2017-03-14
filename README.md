# marko-snackbars

[![Build Status](https://travis-ci.org/charlieduong94/marko-snackbars.svg?branch=master)](https://travis-ci.org/charlieduong94/marko-snackbars)
[![Coverage Status](https://coveralls.io/repos/github/charlieduong94/marko-snackbars/badge.svg?branch=master)](https://coveralls.io/github/charlieduong94/marko-snackbars?branch=master)


Snackbar notifications implemented with [Marko](https://github.com/marko-js/marko) and [Marko Widgets](https://github.com/marko-js/marko-widgets).

<p align='center'>
    <img src='https://media.giphy.com/media/3oriNVIZjxeyBhCXhS/giphy.gif'/>
</p>

### Installation

```sh
npm install --save marko-snackbars
```

### Usage

Creating notifications is simple. Just require the module and start creating the notifications using the `createNotification` method.

```js
var snackbars = require('marko-snackbars');

snackbars.createNotification({
    // specify the position
    // defaults to 'tr' (top right)
    // other possible values: 'tl', 'tc', 'bl', 'bc', and 'br'
    position: 'tr',

    // the message to display
    message: 'Enter message here',

    // the color of the notification's background (defaults to black)
    bgColor: 'purple',

    // the color of the notification's message (defaults to white)
    messageColor: 'white',

    // the notification will not be dismissed from clicking on it (defaults to true)
    clickDismissEnabled: false,

    // specify custom class(es) for the snackbar
    // useful when testing and you find yourself needing a unique selector.
    // of course, can also be used for overriding styles
    class: 'my-snackbar'

    // the buttons to render on the snackbar (optional)
    buttons: [
        {
            // text to render on button
            text: 'Allow',

            // color of button text
            color: 'green',

            // specify custom class(es) for the button
            class: 'my-button'

            // on click handler
            onClick: function() {
                console.log('cool');
            }
        }
    ],

    onDismiss: function() {
        // successfully dismissed and destroyed the component
    },

    // the amount of time in ms to show the notification
    // default is 5000ms, specifying a negative number will
    // allow the notification to persist indefinitely
    // until closed via the 'allow' or 'deny' button
    ttl: 3000
});

```

By default, notifications will be appended to the document's `body`. An alternative target
can be specified by passing the `createNotification` method the target element.

```js
snackbars.createNotification(options, targetElement);
```

### Demo

A demo site running with `marko-snackbars` can be started by running:

```bash
npm start
```

By default, the demo runs on port `8080` and is accessible from `http://localhost:8080`.
To change the default port set the `PORT` environment variable.

```bash
PORT=8082 npm start
```

### Todo
- Add support for custom animations, like those from [animate.css](https://github.com/daneden/animate.css)
