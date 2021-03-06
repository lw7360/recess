function show(imgName, text) {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  var notification = new Notification(hour + time[2] + ' ' + period, {
    icon: imgName,
    body: text
  });
  setTimeout(function() {
    notification.close();
  }, 30000)
}

if (window.Notification) {
  var notified = false;
  setInterval(function() {
    chrome.storage.local.get([
      'eyes',
      'legs',
      'interval'
    ], function(items) {
      var curMin = new Date().getMinutes();
      var interval = +items.interval;
      var times = [interval, (interval + 20) % 60, (interval + 40) % 60];

      if (times.indexOf(curMin) === -1) {
        notified = false;
      }
      if (items.eyes) {
        if (times.indexOf(curMin) > -1 && !notified) {
          show('icons/eye.png', "It's time to rest your eyes!");
        }
      }
      if (items.legs) {
        if (curMin === interval && !notified) {
          show('icons/chair.png', 'Get up from your desk!');
        }
      }
      if (times.indexOf(curMin) > -1) {
        notified = true;
      }
    });

  }, 1000);
}
