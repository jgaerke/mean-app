var Module = Class.extend({

  ensureLocals: function () {
    if (this.ensured) return;
    this.callbacks = {};
    this._id = 0;
    this.ensured = true;
  },

  on: function (events, fn) {
    var self = this;
    this.ensureLocals();
    if (typeof fn == 'function') {
      fn._id = typeof fn._id == 'undefined' ? this._id++ : fn._id

      events.replace(/\S+/g, function (name, pos) {
        (self.callbacks[name] = self.callbacks[name] || []).push(fn)
        fn.typed = pos > 0
      })
    }
    return this;
  },

  off: function (events, fn) {
    var self = this;
    this.ensureLocals();
    if (events == '*') this.callbacks = {}
    else {
      events.replace(/\S+/g, function (name) {
        if (fn) {
          var arr = self.callbacks[name]
          for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
            if (cb._id == fn._id) {
              arr.splice(i, 1);
              i--
            }
          }
        } else {
          self.callbacks[name] = []
        }
      })
    }
    return this;
  },

  one: function (name, fn) {
    this.ensureLocals();
    function on() {
      this.off(name, on)
      fn.apply(this, arguments)
    }

    return this.on(name, on)
  },

  trigger: function (name) {
    this.ensureLocals();
    var args = [].slice.call(arguments, 1),
        fns = this.callbacks[name] || []

    for (var i = 0, fn; (fn = fns[i]); ++i) {
      if (!fn.busy) {
        fn.busy = 1
        fn.apply(this, fn.typed ? [name].concat(args) : args)
        if (fns[i] !== fn) {
          i--
        }
        fn.busy = 0
      }
    }

    if (this.callbacks.all && name != 'all') {
      this.trigger.apply(this, ['all', name].concat(args))
    }

    return this
  }
});

ia.Module = Module;