var chai = require('chai')
var expect = chai.expect

var Snackbar = require('../../snackbar')

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

  context('"addNotification" function', function () {
    test('should add notifications to the container element', function (context) {
      var output = context.render({
        direction: 'down',
        posiiton: 'tr'
      })

      var notification = Snackbar.renderSync({})

      var widget = output.widget
      var containerEl = widget.getEl()

      widget.addNotification(notification)

      expect(widget.notifications.length).to.equal(1)
      expect(containerEl.childNodes.length).to.equal(1)

      expect(document.querySelector('.mn-snackbar')).to.exist // eslint-disable-line

      widget.destroy()
    })
  })
})
