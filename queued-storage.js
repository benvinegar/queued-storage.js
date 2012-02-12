(function (window) {

    var QueuedStorage = function(store, max, queueKey) {
        this.store = store;
        this.max = max || 10;
        this.queueKey = queueKey || '__queue';

        if (!this.store.getItem(this.queueKey))
            this.store.setItem(this.queueKey, "[]");
    };

    QueuedStorage.prototype.setItem = function(key, value) {
        var queue = this.getQueue();
        if (queue.length === this.max)
            this.store.removeItem(queue.shift());

        this.store.setItem(key, value);

        queue.push(key);
        this.setQueue(queue);
    };

    QueuedStorage.prototype.getItem = function(key) {
        return this.store.getItem(key);
    };

    QueuedStorage.prototype.removeItem = function(key) {
        this.store.removeItem(key);
        var queue = this.getQueue();
        for (var i = 0; i < queue.length; i++) {
            if (queue[i] === key) {
                queue.splice(i, 1);
                break;
            }
        }
        this.setQueue(queue);
    };

    QueuedStorage.prototype.clear = function() {
        this.store.clear();
        this.setQueue([]);
    };

    QueuedStorage.prototype.getQueue = function() {
        return JSON.parse(this.store.getItem(this.queueKey));
    };

    QueuedStorage.prototype.setQueue = function(queue) {
        this.store.setItem(this.queueKey, JSON.stringify(queue));
    };

    window.QueuedStorage = QueuedStorage;
})(this);