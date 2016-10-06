require('./style.less');

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),

    init: function() {
        this.notifications = [];
    },

    getInitialState: function(input) {
        return {
            direction: input.direction,
            position: input.position
        };
    },

    addNotification: function(notificationWidget) {
        notificationWidget.appendTo(this.getEl());
        this.notifications.push(notificationWidget.getWidget());
    }
});
