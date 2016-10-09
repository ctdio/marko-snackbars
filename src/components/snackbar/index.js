/**
 *  Snackbar component
 **/
require('./style.css');

// default view length in ms
var FIVE_SEC = 5000;

function _handleRemove(component) {
    // briefly play removal animation before destroying
    component.setState('remove', true);
    setTimeout(function() {
        component.destroy();
    }, 500);
}

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),

    init: function() {
        var self = this;

        // store allow and deny actions
        self.onAllow = self.state.actions.onAllow;
        self.onDeny = self.state.actions.onDeny;

        if (!self.state.persist) {
            self.destroyTimeout = setTimeout(_handleRemove.bind(null, self), self.state.ttl);
        }

        self.setState('animate', true);
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
            allowText: input.allowText,
            denyText: input.denyText,
            ttl: input.ttl || FIVE_SEC,
            persist: input.persist,
            bgColor: input.bgColor,
            messageColor: input.messageColor,
            allowTextColor: input.allowTextColor,
            denyTextColor: input.denyTextColor,
            // wrap callbacks in another object so that it doesn't get
            // removed by marko
            actions: {
                onAllow: input.onAllow,
                onDeny: input.onDeny
            }
        };
    },

    // handle any cleaning up of timeout (if it exists)
    onDestroy: function() {
        if (this.destroyTimeout) {
            clearTimeout(this.destroyTimeout);
            _handleRemove(this);
        }
    },

    handleAllow: function() {
        if (this.onAllow) {
            this.onAllow();
        }
        _handleRemove(this);
    },

    handleDeny: function() {
        if (this.onDeny) {
            this.onDeny();
        }
        _handleRemove(this);
    }
});
