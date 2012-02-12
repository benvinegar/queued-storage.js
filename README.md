# queued-storage.js #

Wraps a DOM Storage object (localStorage, globalStorage, etc.) so that each key insertion is tracked using a queue, which
is also stored. When the maximum queue size is exceeded, room is made available by shifting the first queued element off
the queue, and removing it from the storage object.

This is useful when you want to store some kind of history in a storage object, and want to put a limit on the number of actions stored.

## Usage

```javascript
var queuedStorage = new QueuedStorage(window.localStorage, 100, '__unique_queue_key');

queuedStorage.setItem('foo', 'bar');

queuedStorage.getItem('foo'); // => 'bar'

```

