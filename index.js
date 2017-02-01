var Snackbar = require('./src/components/snackbar');
var SnackContainer = require('./src/components/snack-container');
var _createUUID = require('uuid/v4');

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

    // retrieve unique id of the element that notification containers are being attached to
    var targetId;
    if (targetEl.__snackbarContainerId) {
        targetId = targetEl.__snackbarContainerId;
    } else {
        targetId = targetEl.__snackbarContainerId = _createUUID();
    }

    var position = options.position;
    if (!position) {
        // default to top right
        position = 'tr';
    } else if (positions.indexOf(position) === -1) {
        throw new Error('Invalid position specified. Accepted values: ' + positions.join(', '));
    }

    var direction = position[0] === 't' ? 'down' : 'up';

    if (!targets[targetId]) {
        targets[targetId] = {};
    }

    // lazily render the container element for notifications when the position is given
    var containerWidget = targets[targetId][position];
    if (!containerWidget) {
        var containerEl = SnackContainer.renderSync({
            position: position,
            direction: direction
        });

        containerEl.appendTo(targetEl);
        containerWidget = targets[targetId][position] = containerEl.getWidget();

        // clean up dead widgets
        containerWidget.on('destroy', function() {
            delete targets[targetId][position];
            if (Object.keys(targets[targetId]).length === 0) {
                // targetElement does not have any other container elements
                delete targets[targetId];
            }
        });
    }
    options.transitionDirection = direction;

    // render notification and append it to the container
    var notification = Snackbar.renderSync(options);
    containerWidget.addNotification(notification);

    return {
        container: containerWidget,
        notification: notification
    };
};
