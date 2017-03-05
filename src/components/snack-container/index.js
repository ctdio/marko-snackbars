require('./style.css')

module.exports = require('marko-widgets').defineComponent({
  template: require('./template.marko'),

  init: function () {
    this.notifications = []
  },

  onDestroy: function () {
    // destroy any leftover notifications
    this.notifications.forEach(function (notification) {
      notification.destroy()
    })
  },

  getInitialState: function (input) {
    return {
      direction: input.direction,
      position: input.position
    }
  },

  addNotification: function (notification) {
    var notificationWidget = notification.appendTo(this.getEl()).getWidget()

    this.notifications.push(notificationWidget)

    return notificationWidget
  }
})
