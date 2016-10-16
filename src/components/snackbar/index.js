/**
 *  Snackbar component
 **/
require('./style.css');

// default view length in ms
var FIVE_SEC = 5000;

// prevent event propogation and default behavior
function _preventEventBubbling(event) {
    event.stopPropagation();
    event.preventDefault();
}

function _handleRemove(component) {
    // briefly play removal animation before destroying
    component.setState('remove', true);
    setTimeout(function() {
        component.destroyTimeout = null;
        component.destroy();
    }, 500);
}

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),

    init: function() {
        var self = this;

        if (!self.state.persist) {
            self.destroyTimeout = setTimeout(_handleRemove.bind(null, self), self.state.ttl);
        }

        // slightly delay the animation
        self.animationDelayTimeout = setTimeout(function() {
            self.animationDelayTimeout = null;
            self.setState('animate', true);
        }, 50);
    },

    getInitialProps: function(input) {
        // negative ttl means persist indefinitely
        if (input.ttl < 0) {
            input.persist = true;
        }
        return input;
    },

    /**
     * @param {string} input.headerText
     * @param {string} input.messageText
     * @param {string} input.image
     * @param {string} input.dismissText
     */
    getInitialState: function(input) {
        return {
            message: input.message,
            transitionDirection: input.transitionDirection,
            ttl: input.ttl || FIVE_SEC,
            persist: input.persist,
            bgColor: input.bgColor,
            messageColor: input.messageColor,

            // array of buttons to render
            // example format for a button:
            // { text: 'hi', color: 'red', onClick: function() {...}}
            buttons: input.buttons
        };
    },

    handleButtonClick(event, buttonEl) {
        var pos = buttonEl.getAttribute('data-pos');
        let onClick = this.state.buttons[pos].onClick;

        if (onClick) {
            onClick();
        }

        _handleRemove(this);
        _preventEventBubbling(event);
    },

    handleDeny: function(event) {
        if (this.onDeny) {
            this.onDeny();
        }

        _handleRemove(this);
        event.preventDefault();
    },

    handleClick: function(event) {
        // dismiss notification onAllow or onDeny is not provided
        if (!this.onDeny && !this.onAllow) {
            _handleRemove(this);
        }

        _preventEventBubbling(event);
    }
});
