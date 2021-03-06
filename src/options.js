chrome.storage.local.get('initialized', function(items) {
  if (!items.initialized) {
    chrome.storage.local.set({
      'initialized': true,
      'eyes': true,
      'legs': true,
      'start': 0
    }, function() {
      store.set('eyes', true);
      store.set('legs', true);
      store.set('start', 0);
      handleChanges(); 
    });
  } else {
    handleChanges(); 
  }
});

function handleChanges() {
  options.eyes.checked = store.get('eyes'); 
  options.legs.checked = store.get('legs');
  options.start.value = store.get('start') || 0;
  document.getElementById('start').innerHTML = store.get('start') || 0;

  function saveOptions() {
    store.set('eyes', options.eyes.checked);
    store.set('legs', options.legs.checked);
    store.set('start', options.start.value);
    document.getElementById('start').innerHTML = store.get('start');
    chrome.storage.local.set({
      'eyes': store.get('eyes'),
      'legs': store.get('legs'),
      'interval': store.get('start')
    }, function() {});
  }

  options.eyes.onchange = saveOptions;
  options.legs.onchange = saveOptions;
  options.start.oninput = saveOptions;
}
