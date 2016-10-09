var Snackbar = require('./src/components/snackbar');
var SnackContainer = require('./src/components/snack-container');

var positions = [
    'tr',
    'tl',
    'tc',
    'br',
    'bl',
    'bc'
];

// elements to append the snackbar to
var targets = {};

window.markoSnackbars = exports;

/**
 *  Renders the notification onto the webpage
 **/
exports.createNotification = function(options, targetEl) {
    // default target is the document's body
    targetEl = targetEl || document.body;

    var position = options.position;
    if (!position) {
        // default to top left
        position = 'tr';
    } else if (positions.indexOf(position) === -1) {
        throw new Error('Invalid position specified. Accepted values: ' + positions.join(', '));
    }

    var direction = position[0] === 't' ? 'down' : 'up';

    if (!targets[targetEl]) {
        targets[targetEl] = {};
    }
    // lazily render the container element for notifications when the position is given
    var containerWidget = targets[targetEl][position];
    if (!containerWidget) {
        var containerEl = SnackContainer.render({
            position: position,
            direction: direction
        });
        containerEl.appendTo(targetEl);
        containerWidget = targets[targetEl][position] = containerEl.getWidget();
    }
    options.transitionDirection = direction;

    // render notification and append it to the container
    var notification = Snackbar.render(options);
    containerWidget.addNotification(notification);
};
