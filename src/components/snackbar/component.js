/**
 *  Snackbar component
 **/
require('./style.css')

// default view length in ms
var FIVE_SEC = 5000

// prevent event propogation and default behavior
function _preventEventBubbling (event) {
  event.stopPropagation()
  event.preventDefault()
}

function _handleRemove (component) {
  // briefly play removal animation before destroying
  component.destroyTimeout = null
  component.setStateDirty('slideOut', true)

  function destroy () {
    component.destroy()

    if (component.state.onDismiss) {
      component.state.onDismiss.method()
    }
  }

  function transitionOut () {
    component.setState('remove', true)
    // if the next sibling is defined, delay element removal
    // so that vertical sliding transition can be handled
    // else, destroy the element immediately so that
    // all other elements will slide upwards
    var componentEl = component.getEl()
    if (componentEl && componentEl.nextSibling) {
      setTimeout(destroy, 500)
    } else {
      destroy()
    }
  }

  setTimeout(transitionOut, 250)
}

module.exports = {
  onMount: function (input) {
    var self = this

    if (!self.state.persist) {
      self.destroyTimeout = setTimeout(_handleRemove.bind(null, self), self.state.ttl)
    }

    // slightly delay the animation
    self.animationDelayTimeout = setTimeout(function () {
      self.animationDelayTimeout = null
      self.setState('animate', true)
    }, 50)
  },

  /**
   * @param {string} input.headerText
   * @param {string} input.messageText
   * @param {string} input.image
   * @param {string} input.dismissText
   */
  onInput: function (input) {
    var clickDismissEnabled = typeof input.clickDismissEnabled !== 'undefined'
      ? input.clickDismissEnabled
      : true

    var onDismiss
    var persist = false

    if (input.ttl < 0) {
      persist = true
    }

    if (input.onDismiss) {
      onDismiss = {
        method: input.onDismiss
      }
    }

    this.state = {
      message: input.message,
      transitionDirection: input.transitionDirection,
      ttl: input.ttl || FIVE_SEC,
      persist: persist,
      bgColor: input.bgColor,
      messageColor: input.messageColor,
      class: input.class,
      clickDismissEnabled: clickDismissEnabled,
      onDismiss: onDismiss,

      // array of buttons to render
      // example format for a button:
      // { text: 'hi', color: 'red', onClick: function() {...}}
      buttons: input.buttons
    }
  },

  getId: function () {
    // return the marko generated id of the component
    return this.id
  },

  handleButtonClick: function (event, buttonEl) {
    var pos = buttonEl.getAttribute('data-pos')
    var onClick = this.state.buttons[pos].onClick

    if (onClick) {
      onClick()
    }

    _handleRemove(this)
    _preventEventBubbling(event)
  },

  handleClick: function (event) {
    if (this.state.clickDismissEnabled) {
      _handleRemove(this)
    }

    _preventEventBubbling(event)
  }
}
