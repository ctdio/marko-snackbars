# marko-snackbars

Snackbar notifications implemented with [Marko](https://github.com/marko-js/marko) and [Marko Widgets](https://github.com/marko-js/marko-widgets).

<p align='center'>
    <img src='https://media.giphy.com/media/3o6Ztk4LGGjbbhTvyg/giphy.gif'/>
</p>

### Installation

```
npm install --save marko-snackbars
```

### Usage

Creating notifications is simple. Just require the module and start creating the notifications using the `createNotification` method.

```
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
    messageColor: 'white'

    // the buttons to render on the snackbar (optional)
    buttons: [
        {
            // text to render on button
            text: 'Allow',

            // color of button text
            color: 'green',

            // on click handler
            onClick: function() {
                console.log('cool');
            }
        }
    ]

    // the amount of time in ms to show the notification
    // default is 5000ms, specifying a negative number will
    // allow the notification to persist indefinitely
    // until closed via the 'allow' or 'deny' button
    ttl: 3000
});

```

By default, notifications will be appended to the document's `body`. An alternative target can be specified by passing the `createNotification` method the target element.

```
snackbars.createNotification(options, targetElement);
```

### Todo
- Add tests using [marko-devtools](https://github.com/mlrawlings/marko-devtools)
- Add support for custom animations, like those from [animate.css](https://github.com/daneden/animate.css)
