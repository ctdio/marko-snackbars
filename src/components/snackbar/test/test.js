var chai = require('chai')
var expect = chai.expect

describe('snackbar component', function () {
  test('should be rendered with the given background color', function (context) {
    var bgColor = 'blue'

    var output = context.render({
      bgColor: bgColor
    })

    var $ = output.$

    var snackbarStyle = $('.mn-snackbar').attr('style')
    expect(snackbarStyle).to.contain('background-color:' + bgColor)
  })

  test('should be rendered with the given snackbar and snackbar color', function (context) {
    var testMessage = 'this is a snackbar'
    var snackbarColor = 'orange'

    var output = context.render({
      message: testMessage,
      messageColor: snackbarColor
    })

    var $ = output.$

    var snackbarText = $('.mn-snackbar').text()
    var snackbarStyle = $('.mn-snackbar').attr('style')
    expect(snackbarText).to.equal(testMessage)
    expect(snackbarStyle).to.contain('color:' + snackbarColor)
  })

  test('should be rendered with the given transition direction', function (context) {
    var direction = 'tr'

    var output = context.render({
      transitionDirection: direction
    })

    var $ = output.$

    var snackbarClass = $('.mn-snackbar').attr('class')
    expect(snackbarClass).to.contain('transition-' + direction)
  })

  test('should be rendered with the provided classes', function (context) {
    var cssClass = 'my-snackbar-class another-snackbar-class'

    var output = context.render({ class: cssClass })

    var $ = output.$

    var snackbarClass = $('.mn-snackbar').attr('class')
    expect(snackbarClass).to.contain(cssClass)
  })

  context('buttons', function () {
    test('should render the component with the given buttons', function (context) {
      var testButtons = [
        {
          text: 'button1',
          class: 'my-button1-class',
          color: 'red'
        },
        {
          text: 'button2',
          class: 'my-button2-class',
          color: 'blue'
        }
      ]

      var output = context.render({
        buttons: testButtons
      })

      var $ = output.$

      var buttons = $('.mn-snack-button')
      expect(buttons.length).to.equal(testButtons.length)

      for (var i = 0; i < buttons.length; i++) {
        var buttonInput = testButtons[i]
        var actualButton = buttons.eq(i)
        expect(actualButton.attr('style')).to.equal('color:' + buttonInput.color)
        expect(actualButton.attr('class')).to.contain(buttonInput.class)
        expect(actualButton.text()).to.equal(buttonInput.text)
      }
    })
    test('should call a button\'s onClick handler when clicked', function (context) {
      var buttonClicked = false
      var testButtons = [
        {
          text: 'button1',
          onClick: function () {
            buttonClicked = true
          }
        }
      ]

      var output = context.render({
        buttons: testButtons
      })

      var widget = output.widget // eslint-disable-line

      var buttonEl = document.querySelector('.mn-snack-button')
      buttonEl.click()

      expect(buttonClicked).to.equal(true)

      widget.destroy()
    })
  })

  context('clicking on the notification', function () {
    function applyClickTest (context, renderOptions) {
      var output = context.render(renderOptions)
      var widget = output.widget

      var dismissPromise = new Promise(function (resolve) {
        widget.on('destroy', function () {
          resolve()
        })
      })

      var snackbarEl = widget.getEl()
      snackbarEl.click()

      expect(snackbarEl.className).to.contain('slide-out')

      return dismissPromise
    }

    test('should dismiss notification if "clickDismissEnabled" is set to true', function (context) {
      var renderOptions = {
        clickDismissEnabled: true
      }

      return applyClickTest(context, renderOptions)
    })

    test('should call on "onDismiss" handler after being dismissed', function (context) {
      var onDismissCalled = false

      var renderOptions = {
        onDismiss: function () {
          onDismissCalled = true
        }
      }

      return applyClickTest(context, renderOptions).then(function () {
        expect(onDismissCalled).to.equal(true)
      })
    })

    test('should NOT dismiss notification if "clickDismissEnabled" is set to false', function (context) {
      var output = context.render({
        clickDismissEnabled: false
      })

      var widget = output.widget

      var snackbarEl = document.querySelector('.mn-snackbar')
      snackbarEl.click()

      expect(snackbarEl.className).to.not.contain('slide-out')
      widget.destroy()
    })
  })

  context('auto dismissing', function () {
    test('by default should happen after about five seconds have passed', function (context) {
      this.timeout(6000)

      var output = context.render()
      var widget = output.widget
      var startTime = Date.now()

      return new Promise(function (resolve) {
        widget.on('destroy', function () {
          var currentTime = Date.now()
          expect(currentTime - startTime).to.be.above(5000)
          resolve()
        })
      })
    })

    test('should happen after the designated ttl has passed', function (context) {
      this.timeout(3000)

      var ttl = 2500

      var output = context.render({
        ttl: ttl
      })
      var widget = output.widget

      var startTime = Date.now()

      return new Promise(function (resolve) {
        widget.on('destroy', function () {
          var currentTime = Date.now()
          expect(currentTime - startTime).to.be.above(ttl)
          expect(currentTime - startTime).to.be.below(5000)
          resolve()
        })
      })
    })
  })
})
