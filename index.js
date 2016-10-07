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

var containers = {};

window.markoSnackbars = exports;

/**
 *  Renders the notification onto the webpage
 **/
exports.createNotification = function(options) {
    var position = options.position;
    if (!position) {
        // default to top left
        position = 'tr';
    } else if (positions.indexOf(position) === -1) {
        throw new Error('Invalid position specified. Accepted values: ' + positions.join(', '));
    }

    var direction = position[0] === 't' ? 'down' : 'up';
    // lazily render the container element for notifications when the position is given
    if (!containers[position]) {
        var container = SnackContainer.render({
            position: position,
            direction: direction
        });
        container.appendTo(document.body);
        containers[position] = container.getWidget();
    }
    options.transitionDirection = direction;
    var notification = Snackbar.render(options);
    containers[position].addNotification(notification);
};
