(function () {

    // Mocked localStorage object for testing
    var HashStorage = function(hash) {
        this.store = hash || {};
    };
    HashStorage.prototype = {
        setItem: function(key, val) { this.store[key] = val; },
        getItem: function(key) { return this.store[key]; },
        removeItem: function(key) { delete this.store[key]; },
        clear: function() { this.store = {}; }
    };

    test("test basic set/get", function () {
        var qs = new QueuedStorage(new HashStorage());
        qs.setItem('a', 1);
        qs.setItem('b', '2');

        equal(qs.getItem('a'), '1'); // Integers converted to string (expected)
        equal(qs.getItem('b'), '2');
    });

    test("test exceed limit", function () {
        var qs = new QueuedStorage(new HashStorage(), 3);

        qs.setItem('a', 1);
        qs.setItem('b', 2);
        qs.setItem('c', 3);
        qs.setItem('d', 4);

        equal(qs.getItem('a'), null);
        equal(qs.getQueue().toString(), ['b', 'c', 'd'].toString());
    });

    test("test exceed limit after restore", function () {
        var hs = new HashStorage({
            'b': 2,
            'c': 3,
            'd': 4,
            '__queue': '["b", "c", "d"]'
        });

        var qs = new QueuedStorage(hs, 3);
        qs.setItem('e', 5);

        equal(qs.getItem('b'), null);
        equal(qs.getQueue().toString(), ['c', 'd', 'e'].toString());
    });

    test("test remove item", function () {
        var qs = new QueuedStorage(new HashStorage({
            'b': 2,
            'c': 3,
            'd': 4,
            '__queue': '["b", "c", "d"]'
        }), 3);

        qs.removeItem('c');

        equal(qs.getItem('c'), undefined);
        equal(qs.getQueue().toString(), ['b', 'd'].toString());
    });

    test("test clear", function () {
        var qs = new QueuedStorage(new HashStorage({
            'b': 2,
            'c': 3,
            'd': 4,
            '__queue': '["b", "c", "d"]'
        }), 3);

        qs.clear();

        equal(qs.getItem('b'), null);
        equal(qs.getItem('c'), null);
        equal(qs.getItem('d'), null);
        equal(qs.getQueue().length, 0);
    });
})();

