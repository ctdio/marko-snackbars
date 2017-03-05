var chai = require('chai')
var expect = chai.expect

var Snackbar = require('../../snackbar/index.marko')
var SnackContainer = require('../index.marko')

describe('snack-container component', function () {
  test('should apply the direction and position it is given as classes', function (context) {
    var direction = 'down'
    var position = 'tr'

    var output = context.render({
      direction: direction,
      position: position
    })

    var widget = output.widget

    var containerEl = widget.getEl()

    expect(containerEl.className).to.contain(direction)
    expect(containerEl.className).to.contain('mn-snack-' + position)
    widget.destroy()
  })

  context('when adding notifications', function () {
    var container
    beforeEach(function () {
      container = SnackContainer.renderSync({
        direction: 'down',
        position: 'tr'
      }).appendTo(document.body).getComponent()
    })

    afterEach(function () {
      container.destroy()
    })

    it('should add notifications to the container element', function () {
      var messageA = 'notifciation message A'
      var messageB = 'notifciation message B'
      var notificationA = Snackbar.renderSync({ message: messageA })
      var notificationB = Snackbar.renderSync({ message: messageB })

      var containerEl = container.getEl()

      container.addNotification(notificationA)
      container.addNotification(notificationB)

      expect(containerEl.childNodes.length).to.equal(2)

      var notificationEls = document.querySelectorAll('.mn-snackbar')
      expect(notificationEls.length).to.equal(2)
      expect(notificationEls[0].innerHTML).to.contain(messageA)
      expect(notificationEls[1].innerHTML).to.contain(messageB)
    })

    it('should keep track of notifications', function () {
      var notificationA = Snackbar.renderSync({ message: 'hey' })
      var notificationB = Snackbar.renderSync({ message: 'hi' })

      var notificationWidgetA = container.addNotification(notificationA)
      var notificationWidgetB = container.addNotification(notificationB)

      expect(Object.keys(container.notificationsMap).length).to.equal(2)
      expect(container.notificationsMap[notificationWidgetA.getId()]).to.equal(notificationWidgetA)
      expect(container.notificationsMap[notificationWidgetB.getId()]).to.equal(notificationWidgetB)
    })

    it('should no longer keep track of notifications after they are destroyed', function () {
      var notification = Snackbar.renderSync({})

      var notificationWidget = container.addNotification(notification)
      var notificationId = notificationWidget.getId()
      expect(container.notificationsMap[notificationId]).to.exist // eslint-disable-line
      notificationWidget.destroy()

      expect(container.notificationsMap[notificationId]).to.not.exist // eslint-disable-line
    })
  })
})
