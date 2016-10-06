/**
 *  Snackbar component
 **/
require('./style.less');

// default view length in ms
var FIVE_SEC = 5000;

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),

    init: function() {
        var self = this;
        self.onAllow = self.state.actions.onAllow;
        self.onDeny = self.state.actions.onDeny;

        if (!self.state.persist && self.state.ttl) {
            self.destroyTimeout = setTimeout(function() {
                self.destroy();
            }, self.state.ttl);
        }
        self.setState('animation', 'slide-left');
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
        }
    },

    handleAllow: function() {
        if (this.onAllow) {
            this.onAllow();
        }
        this.destroy();
    },

    handleDeny: function() {
        if (this.onDeny) {
            this.onDeny();
        }
        this.destroy();
    }
});
