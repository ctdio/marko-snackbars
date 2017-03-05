require('./style.css')

module.exports = require('marko-widgets').defineComponent({
  template: require('./template.marko'),

  init: function () {
    this.notificationsMap = {}
  },

  onDestroy: function () {
    // destroy any leftover notifications
    var notificationsMap = this.notificationsMap
    Object.keys(notificationsMap).forEach(function (key) {
      var notification = notificationsMap[key]
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
    var self = this
    var notificationsMap = self.notificationsMap
    var notificationWidget = notification.appendTo(self.getEl()).getWidget()
    var notificationId = notificationWidget.getId()

    notificationWidget.on('destroy', function () {
      delete notificationsMap[notificationId]
    })

    notificationsMap[notificationId] = notificationWidget

    return notificationWidget
  }
})
