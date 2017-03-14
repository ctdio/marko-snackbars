var count = 1
var clickDismissCount = 1
var dogeCount = 0
var generateNumberedSnackBtn = document.getElementById('simple-notification-btn')
var generateDogeSnackBtn = document.getElementById('doge-notification-btn')
var clickDismissEnabledSnackBtn = document.getElementById('click-dismiss-enabled-notification-btn')

var markoSnackbars = window.markoSnackbars

var dogeNotifications = [
  {
    message: 'Cool!',
    bgColor: 'red',
    class: 'doge-snackbar'
  },
  {
    message: 'Wow!',
    bgColor: '#3cdfe8',
    class: 'doge-snackbar'
  },
  {
    message: 'Much notification!',
    buttons: [
      {
        text: 'I agree',
        color: 'orange',
        class: 'doge-snackbar'
      },
      {
        text: 'Wow',
        color: 'red',
        class: 'doge-snackbar',
        onClick: function () {
          markoSnackbars.createNotification({
            message: 'Much Wow!',
            bgColor: 'pink'
          })
        }
      }
    ],
    bgColor: 'yellow',
    messageColor: 'black',
    class: 'doge-snackbar'
  },
  {
    message: 'Awesome!',
    bgColor: 'orange',
    class: 'doge-snackbar'
  },
  {
    message: 'Very snackbar',
    bgColor: 'brown',
    class: 'doge-snackbar'
  },
  {
    message: 'Much color',
    bgColor: 'purple',
    class: 'doge-snackbar'
  }
]

generateNumberedSnackBtn.addEventListener('click', function () {
  markoSnackbars.createNotification({
    position: 'tr',
    message: 'Notification ' + count,
    ttl: -1
  })
  count++
})

clickDismissEnabledSnackBtn.addEventListener('click', function () {
  markoSnackbars.createNotification({
    position: 'tr',
    message: 'Click Dismiss Notification ' + clickDismissCount,
    clickDismissEnabled: false,
    onDismiss: function () {
      console.log('Successfully dismissed')
    }
  })
  clickDismissCount++
})

generateDogeSnackBtn.addEventListener('click', function () {
  var notification = dogeNotifications[dogeCount % dogeNotifications.length]
  markoSnackbars.createNotification(notification)
  dogeCount++
})
