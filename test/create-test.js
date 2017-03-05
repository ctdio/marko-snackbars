var chai = require('chai')
var expect = chai.expect

var markoSnackbars = require('../index')

describe('marko-snackbars', function () {
  var targetEl

  context('"createNotification" function', function () {
    beforeEach(function () {
      // create targetEl to test against
      targetEl = document.createElement('div')
      document.body.appendChild(targetEl)
    })

    afterEach(function () {
      // clean up afterwards
      targetEl.remove()
    })

    it('should be able to create a notification', function () {
      var testMessage = 'test message'
      var options = {
        message: testMessage
      }

      var result = markoSnackbars.createNotification(options, targetEl)

      var notificationEl = document.querySelector('.mn-snackbar')
      expect(notificationEl).to.exist // eslint-disable-line

      expect(notificationEl.innerHTML).to.contain(testMessage)

      result.notification.destroy()
      result.container.destroy()
    })

    it('should place notifications into the same containers when the given position is the same', function () {
      var testMessage = 'test message'
      var notificationOptionsA = {
        message: testMessage,
        position: 'tr'
      }
      var notificationOptionsB = {
        message: testMessage,
        position: 'tr'
      }

      var resultA = markoSnackbars.createNotification(notificationOptionsA, targetEl)
      var containerA = resultA.container

      var resultB = markoSnackbars.createNotification(notificationOptionsB, targetEl)
      var containerB = resultB.container

      expect(containerA).to.equal(containerB)
      expect(containerA.notifications.length).to.equal(2)
      expect(document.querySelectorAll('.mn-snackbar').length).to.equal(2)

      containerA.destroy()
    })

    it('should place NOT notifications into the same containers when the positions given are different', function () {
      var testMessage = 'test message'
      var notificationOptionsA = {
        message: testMessage,
        position: 'tr'
      }
      var notificationOptionsB = {
        message: testMessage,
        position: 'tl'
      }

      var resultA = markoSnackbars.createNotification(notificationOptionsA, targetEl)
      var containerA = resultA.container

      var resultB = markoSnackbars.createNotification(notificationOptionsB, targetEl)
      var containerB = resultB.container

      expect(containerA.notifications.length).to.equal(1)
      expect(containerB.notifications.length).to.equal(1)
      expect(document.querySelectorAll('.mn-snackbar').length).to.equal(2)

      containerA.destroy()
      containerB.destroy()
    })
  })
})
