require('./style.css')

module.exports = {
  onMount: function () {
    this.notificationsMap = {}
  },

  onInput: function (input) {
    this.state = {
      direction: input.direction,
      position: input.position
    }
  },

  onDestroy: function () {
    // destroy any leftover notifications
    var notificationsMap = this.notificationsMap
    Object.keys(notificationsMap).forEach(function (key) {
      var notification = notificationsMap[key]
      notification.destroy()
    })
  },

  addNotification: function (notification) {
    var self = this
    var notificationsMap = self.notificationsMap

    var notificationComponent = notification.appendTo(self.getEl()).getComponent()
    var notificationId = notificationComponent.getId()

    notificationComponent.on('destroy', function () {
      delete notificationsMap[notificationId]
    })

    notificationsMap[notificationId] = notificationComponent

    return notificationComponent
  }
}
