# queued-storage.js #

Introduces a class, QueuedStorage, which wraps a DOM Storage object (localStorage, globalStorage, etc.) 
so that each key insertion is tracked using a queue, which is also stored. When the maximum queue size 
is exceeded, room is made available by shifting the first queued element off the queue, and removing it 
from the storage object.

This is useful when you want to store some kind of history in a storage object, and want to put a limit 
on the number of actions stored.

See also: [lscache](https://github.com/pamelafox/lscache)

## Usage

Initializing a QueuedStorage object:

```javascript
var queuedStorage = new QueuedStorage(window.localStorage, 100, '__unique_queue_key');
```

Afterwards, QueuedStorage implements the standard [DOM Storage interface](http://dev.w3.org/html5/webstorage/#storage-0):

```javascript
queuedStorage.setItem('foo', 'bar');

queuedStorage.getItem('foo'); // => 'bar'

queuedStorage.removeItem('foo');

queuedStorage.clear();
```

QueuedStorage also provides some additional utility methods for inspecting or modifying the queue:

```javascript
queuedStorage.getQueue(); // => ['foo']

queuedStorage.setQueue(['foo']);
```

## Tests

See test/test.html.

## Undeserved praise

Written by Ben Vinegar (@bentlegen)