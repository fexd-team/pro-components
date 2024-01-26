var Fu = Object.defineProperty
var Du = (He, Le, ie) =>
  Le in He ? Fu(He, Le, { enumerable: !0, configurable: !0, writable: !0, value: ie }) : (He[Le] = ie)
var ur = (He, Le, ie) => (Du(He, typeof Le != 'symbol' ? Le + '' : Le, ie), ie)
var Te = (He, Le, ie) =>
  new Promise((ni, Pe) => {
    var Q = (ge) => {
        try {
          fe(ie.next(ge))
        } catch (Ce) {
          Pe(Ce)
        }
      },
      ne = (ge) => {
        try {
          fe(ie.throw(ge))
        } catch (Ce) {
          Pe(Ce)
        }
      },
      fe = (ge) => (ge.done ? ni(ge.value) : Promise.resolve(ge.value).then(Q, ne))
    fe((ie = ie.apply(He, Le)).next())
  })
;(function () {
  var He = {
      224: function (Pe) {
        var Q = (Pe.exports = {}),
          ne,
          fe
        function ge() {
          throw new Error('setTimeout has not been defined')
        }
        function Ce() {
          throw new Error('clearTimeout has not been defined')
        }
        ;(function () {
          try {
            typeof setTimeout == 'function' ? (ne = setTimeout) : (ne = ge)
          } catch (K) {
            ne = ge
          }
          try {
            typeof clearTimeout == 'function' ? (fe = clearTimeout) : (fe = Ce)
          } catch (K) {
            fe = Ce
          }
        })()
        function Rt(K) {
          if (ne === setTimeout) return setTimeout(K, 0)
          if ((ne === ge || !ne) && setTimeout) return (ne = setTimeout), setTimeout(K, 0)
          try {
            return ne(K, 0)
          } catch (Y) {
            try {
              return ne.call(null, K, 0)
            } catch (Ke) {
              return ne.call(this, K, 0)
            }
          }
        }
        function jr(K) {
          if (fe === clearTimeout) return clearTimeout(K)
          if ((fe === Ce || !fe) && clearTimeout) return (fe = clearTimeout), clearTimeout(K)
          try {
            return fe(K)
          } catch (Y) {
            try {
              return fe.call(null, K)
            } catch (Ke) {
              return fe.call(this, K)
            }
          }
        }
        var Ve = [],
          ht = !1,
          Ze,
          Ot = -1
        function Ye() {
          !ht || !Ze || ((ht = !1), Ze.length ? (Ve = Ze.concat(Ve)) : (Ot = -1), Ve.length && yt())
        }
        function yt() {
          if (!ht) {
            var K = Rt(Ye)
            ht = !0
            for (var Y = Ve.length; Y; ) {
              for (Ze = Ve, Ve = []; ++Ot < Y; ) Ze && Ze[Ot].run()
              ;(Ot = -1), (Y = Ve.length)
            }
            ;(Ze = null), (ht = !1), jr(K)
          }
        }
        Q.nextTick = function (K) {
          var Y = new Array(arguments.length - 1)
          if (arguments.length > 1) for (var Ke = 1; Ke < arguments.length; Ke++) Y[Ke - 1] = arguments[Ke]
          Ve.push(new cr(K, Y)), Ve.length === 1 && !ht && Rt(yt)
        }
        function cr(K, Y) {
          ;(this.fun = K), (this.array = Y)
        }
        ;(cr.prototype.run = function () {
          this.fun.apply(null, this.array)
        }),
          (Q.title = 'browser'),
          (Q.browser = !0),
          (Q.env = {}),
          (Q.argv = []),
          (Q.version = ''),
          (Q.versions = {})
        function me() {}
        ;(Q.on = me),
          (Q.addListener = me),
          (Q.once = me),
          (Q.off = me),
          (Q.removeListener = me),
          (Q.removeAllListeners = me),
          (Q.emit = me),
          (Q.prependListener = me),
          (Q.prependOnceListener = me),
          (Q.listeners = function (K) {
            return []
          }),
          (Q.binding = function (K) {
            throw new Error('process.binding is not supported')
          }),
          (Q.cwd = function () {
            return '/'
          }),
          (Q.chdir = function (K) {
            throw new Error('process.chdir is not supported')
          }),
          (Q.umask = function () {
            return 0
          })
      },
    },
    Le = {}
  function ie(Pe) {
    var Q = Le[Pe]
    if (Q !== void 0) return Q.exports
    var ne = (Le[Pe] = { exports: {} })
    return He[Pe](ne, ne.exports, ie), ne.exports
  }
  ;(function () {
    ie.g = (function () {
      if (typeof globalThis == 'object') return globalThis
      try {
        return this || new Function('return this')()
      } catch (Pe) {
        if (typeof window == 'object') return window
      }
    })()
  })()
  var ni = {}
  ;(function () {
    'use strict'
    class Pe {
      constructor() {
        ;(this.listeners = []),
          (this.unexpectedErrorHandler = function (t) {
            setTimeout(() => {
              throw t.stack
                ? Ye.isErrorNoTelemetry(t)
                  ? new Ye(
                      t.message +
                        `

` +
                        t.stack,
                    )
                  : new Error(
                      t.message +
                        `

` +
                        t.stack,
                    )
                : t
            }, 0)
          })
      }
      emit(t) {
        this.listeners.forEach((r) => {
          r(t)
        })
      }
      onUnexpectedError(t) {
        this.unexpectedErrorHandler(t), this.emit(t)
      }
      onUnexpectedExternalError(t) {
        this.unexpectedErrorHandler(t)
      }
    }
    const Q = new Pe()
    function ne(e) {
      Rt(e) || Q.onUnexpectedError(e)
    }
    function fe(e) {
      Rt(e) || Q.onUnexpectedExternalError(e)
    }
    function ge(e) {
      if (e instanceof Error) {
        const { name: t, message: r } = e,
          n = e.stacktrace || e.stack
        return { $isError: !0, name: t, message: r, stack: n, noTelemetry: Ye.isErrorNoTelemetry(e) }
      }
      return e
    }
    const Ce = 'Canceled'
    function Rt(e) {
      return e instanceof jr ? !0 : e instanceof Error && e.name === Ce && e.message === Ce
    }
    class jr extends Error {
      constructor() {
        super(Ce), (this.name = this.message)
      }
    }
    function Ve() {
      const e = new Error(Ce)
      return (e.name = e.message), e
    }
    function ht(e) {
      return e ? new Error(`Illegal argument: ${e}`) : new Error('Illegal argument')
    }
    function Ze(e) {
      return e ? new Error(`Illegal state: ${e}`) : new Error('Illegal state')
    }
    class Ot extends Error {
      constructor(t) {
        super('NotSupported'), t && (this.message = t)
      }
    }
    class Ye extends Error {
      constructor(t) {
        super(t), (this.name = 'CodeExpectedError')
      }
      static fromError(t) {
        if (t instanceof Ye) return t
        const r = new Ye()
        return (r.message = t.message), (r.stack = t.stack), r
      }
      static isErrorNoTelemetry(t) {
        return t.name === 'CodeExpectedError'
      }
    }
    class yt extends Error {
      constructor(t) {
        super(t || 'An unexpected bug occurred.'), Object.setPrototypeOf(this, yt.prototype)
        debugger
      }
    }
    function cr(e) {
      const t = this
      let r = !1,
        n
      return function () {
        return r || ((r = !0), (n = e.apply(t, arguments))), n
      }
    }
    var me
    ;(function (e) {
      function t(v) {
        return v && typeof v == 'object' && typeof v[Symbol.iterator] == 'function'
      }
      e.is = t
      const r = Object.freeze([])
      function n() {
        return r
      }
      e.empty = n
      function* i(v) {
        yield v
      }
      e.single = i
      function s(v) {
        return t(v) ? v : i(v)
      }
      e.wrap = s
      function a(v) {
        return v || r
      }
      e.from = a
      function o(v) {
        return !v || v[Symbol.iterator]().next().done === !0
      }
      e.isEmpty = o
      function l(v) {
        return v[Symbol.iterator]().next().value
      }
      e.first = l
      function u(v, _) {
        for (const y of v) if (_(y)) return !0
        return !1
      }
      e.some = u
      function c(v, _) {
        for (const y of v) if (_(y)) return y
      }
      e.find = c
      function* f(v, _) {
        for (const y of v) _(y) && (yield y)
      }
      e.filter = f
      function* d(v, _) {
        let y = 0
        for (const E of v) yield _(E, y++)
      }
      e.map = d
      function* g(...v) {
        for (const _ of v) for (const y of _) yield y
      }
      e.concat = g
      function p(v, _, y) {
        let E = y
        for (const M of v) E = _(E, M)
        return E
      }
      e.reduce = p
      function* b(v, _, y = v.length) {
        for (_ < 0 && (_ += v.length), y < 0 ? (y += v.length) : y > v.length && (y = v.length); _ < y; _++) yield v[_]
      }
      e.slice = b
      function m(v, _ = Number.POSITIVE_INFINITY) {
        const y = []
        if (_ === 0) return [y, v]
        const E = v[Symbol.iterator]()
        for (let M = 0; M < _; M++) {
          const D = E.next()
          if (D.done) return [y, e.empty()]
          y.push(D.value)
        }
        return [
          y,
          {
            [Symbol.iterator]() {
              return E
            },
          },
        ]
      }
      e.consume = m
    })(me || (me = {}))
    const K = !1
    let Y = null
    function Ke(e) {
      Y = e
    }
    if (K) {
      const e = '__is_disposable_tracked__'
      Ke(
        new (class {
          trackDisposable(t) {
            const r = new Error('Potentially leaked disposable').stack
            setTimeout(() => {
              t[e] || console.log(r)
            }, 3e3)
          }
          setParent(t, r) {
            if (t && t !== wt.None)
              try {
                t[e] = !0
              } catch (n) {}
          }
          markAsDisposed(t) {
            if (t && t !== wt.None)
              try {
                t[e] = !0
              } catch (r) {}
          }
          markAsSingleton(t) {}
        })(),
      )
    }
    function _t(e) {
      return Y == null || Y.trackDisposable(e), e
    }
    function xt(e) {
      Y == null || Y.markAsDisposed(e)
    }
    function fr(e, t) {
      Y == null || Y.setParent(e, t)
    }
    function oa(e, t) {
      if (Y) for (const r of e) Y.setParent(r, t)
    }
    function Iu(e) {
      return Y == null || Y.markAsSingleton(e), e
    }
    function Ru(e) {
      return typeof e.dispose == 'function' && e.dispose.length === 0
    }
    function Wr(e) {
      if (me.is(e)) {
        const t = []
        for (const r of e)
          if (r)
            try {
              r.dispose()
            } catch (n) {
              t.push(n)
            }
        if (t.length === 1) throw t[0]
        if (t.length > 1) throw new AggregateError(t, 'Encountered errors while disposing of store')
        return Array.isArray(e) ? [] : e
      } else if (e) return e.dispose(), e
    }
    function la(...e) {
      const t = hr(() => Wr(e))
      return oa(e, t), t
    }
    function hr(e) {
      const t = _t({
        dispose: cr(() => {
          xt(t), e()
        }),
      })
      return t
    }
    class dt {
      constructor() {
        ;(this._toDispose = new Set()), (this._isDisposed = !1), _t(this)
      }
      dispose() {
        this._isDisposed || (xt(this), (this._isDisposed = !0), this.clear())
      }
      get isDisposed() {
        return this._isDisposed
      }
      clear() {
        if (this._toDispose.size !== 0)
          try {
            Wr(this._toDispose)
          } finally {
            this._toDispose.clear()
          }
      }
      add(t) {
        if (!t) return t
        if (t === this) throw new Error('Cannot register a disposable on itself!')
        return (
          fr(t, this),
          this._isDisposed
            ? dt.DISABLE_DISPOSED_WARNING ||
              console.warn(
                new Error(
                  'Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!',
                ).stack,
              )
            : this._toDispose.add(t),
          t
        )
      }
    }
    dt.DISABLE_DISPOSED_WARNING = !1
    class wt {
      constructor() {
        ;(this._store = new dt()), _t(this), fr(this._store, this)
      }
      dispose() {
        xt(this), this._store.dispose()
      }
      _register(t) {
        if (t === this) throw new Error('Cannot register a disposable on itself!')
        return this._store.add(t)
      }
    }
    wt.None = Object.freeze({ dispose() {} })
    class Ou {
      constructor() {
        ;(this._isDisposed = !1), _t(this)
      }
      get value() {
        return this._isDisposed ? void 0 : this._value
      }
      set value(t) {
        var r
        this._isDisposed ||
          t === this._value ||
          ((r = this._value) === null || r === void 0 || r.dispose(), t && fr(t, this), (this._value = t))
      }
      clear() {
        this.value = void 0
      }
      dispose() {
        var t
        ;(this._isDisposed = !0),
          xt(this),
          (t = this._value) === null || t === void 0 || t.dispose(),
          (this._value = void 0)
      }
      clearAndLeak() {
        const t = this._value
        return (this._value = void 0), t && fr(t, null), t
      }
    }
    class Vu {
      constructor(t) {
        ;(this._disposable = t), (this._counter = 1)
      }
      acquire() {
        return this._counter++, this
      }
      release() {
        return --this._counter === 0 && this._disposable.dispose(), this
      }
    }
    class ua {
      constructor() {
        ;(this.dispose = () => {}), (this.unset = () => {}), (this.isset = () => !1), _t(this)
      }
      set(t) {
        let r = t
        return (
          (this.unset = () => (r = void 0)),
          (this.isset = () => r !== void 0),
          (this.dispose = () => {
            r && (r(), (r = void 0), xt(this))
          }),
          this
        )
      }
    }
    class Bu {
      constructor(t) {
        this.object = t
      }
      dispose() {}
    }
    class Uu {
      constructor() {
        ;(this._store = new Map()), (this._isDisposed = !1), _t(this)
      }
      dispose() {
        xt(this), (this._isDisposed = !0), this.clearAndDisposeAll()
      }
      clearAndDisposeAll() {
        if (this._store.size)
          try {
            Wr(this._store.values())
          } finally {
            this._store.clear()
          }
      }
      get(t) {
        return this._store.get(t)
      }
      set(t, r, n = !1) {
        var i
        this._isDisposed &&
          console.warn(
            new Error(
              'Trying to add a disposable to a DisposableMap that has already been disposed of. The added object will be leaked!',
            ).stack,
          ),
          n || (i = this._store.get(t)) === null || i === void 0 || i.dispose(),
          this._store.set(t, r)
      }
      [Symbol.iterator]() {
        return this._store[Symbol.iterator]()
      }
    }
    class X {
      constructor(t) {
        ;(this.element = t), (this.next = X.Undefined), (this.prev = X.Undefined)
      }
    }
    X.Undefined = new X(void 0)
    class dr {
      constructor() {
        ;(this._first = X.Undefined), (this._last = X.Undefined), (this._size = 0)
      }
      get size() {
        return this._size
      }
      isEmpty() {
        return this._first === X.Undefined
      }
      clear() {
        let t = this._first
        for (; t !== X.Undefined; ) {
          const r = t.next
          ;(t.prev = X.Undefined), (t.next = X.Undefined), (t = r)
        }
        ;(this._first = X.Undefined), (this._last = X.Undefined), (this._size = 0)
      }
      unshift(t) {
        return this._insert(t, !1)
      }
      push(t) {
        return this._insert(t, !0)
      }
      _insert(t, r) {
        const n = new X(t)
        if (this._first === X.Undefined) (this._first = n), (this._last = n)
        else if (r) {
          const s = this._last
          ;(this._last = n), (n.prev = s), (s.next = n)
        } else {
          const s = this._first
          ;(this._first = n), (n.next = s), (s.prev = n)
        }
        this._size += 1
        let i = !1
        return () => {
          i || ((i = !0), this._remove(n))
        }
      }
      shift() {
        if (this._first !== X.Undefined) {
          const t = this._first.element
          return this._remove(this._first), t
        }
      }
      pop() {
        if (this._last !== X.Undefined) {
          const t = this._last.element
          return this._remove(this._last), t
        }
      }
      _remove(t) {
        if (t.prev !== X.Undefined && t.next !== X.Undefined) {
          const r = t.prev
          ;(r.next = t.next), (t.next.prev = r)
        } else
          t.prev === X.Undefined && t.next === X.Undefined
            ? ((this._first = X.Undefined), (this._last = X.Undefined))
            : t.next === X.Undefined
              ? ((this._last = this._last.prev), (this._last.next = X.Undefined))
              : t.prev === X.Undefined && ((this._first = this._first.next), (this._first.prev = X.Undefined))
        this._size -= 1
      }
      *[Symbol.iterator]() {
        let t = this._first
        for (; t !== X.Undefined; ) yield t.element, (t = t.next)
      }
    }
    var ii = function (e, t, r, n) {
      function i(s) {
        return s instanceof r
          ? s
          : new r(function (a) {
              a(s)
            })
      }
      return new (r || (r = Promise))(function (s, a) {
        function o(c) {
          try {
            u(n.next(c))
          } catch (f) {
            a(f)
          }
        }
        function l(c) {
          try {
            u(n.throw(c))
          } catch (f) {
            a(f)
          }
        }
        function u(c) {
          c.done ? s(c.value) : i(c.value).then(o, l)
        }
        u((n = n.apply(e, t || [])).next())
      })
    }
    let si = typeof document != 'undefined' && document.location && document.location.hash.indexOf('pseudo=true') >= 0
    const ca = 'i-default'
    function ai(e, t) {
      let r
      return (
        t.length === 0
          ? (r = e)
          : (r = e.replace(/\{(\d+)\}/g, (n, i) => {
              const s = i[0],
                a = t[s]
              let o = n
              return (
                typeof a == 'string'
                  ? (o = a)
                  : (typeof a == 'number' || typeof a == 'boolean' || a === void 0 || a === null) && (o = String(a)),
                o
              )
            })),
        si && (r = '\uFF3B' + r.replace(/[aouei]/g, '$&$&') + '\uFF3D'),
        r
      )
    }
    function fa(e, t) {
      let r = e[t]
      return r || ((r = e['*']), r) ? r : null
    }
    function qr(e) {
      return e.charAt(e.length - 1) === '/' ? e : e + '/'
    }
    function oi(e, t, r) {
      return ii(this, void 0, void 0, function* () {
        const n = qr(e) + qr(t) + 'vscode/' + qr(r),
          i = yield fetch(n)
        if (i.ok) return yield i.json()
        throw new Error(`${i.status} - ${i.statusText}`)
      })
    }
    function $r(e) {
      return function (t, r) {
        const n = Array.prototype.slice.call(arguments, 2)
        return ai(e[t], n)
      }
    }
    function li(e, t, ...r) {
      return ai(t, r)
    }
    function ju(e) {}
    function Wu(e) {
      si = e
    }
    function qu(e, t) {
      var r
      return {
        localize: $r(t[e]),
        getConfiguredDefaultLocale: (r = t.getConfiguredDefaultLocale) !== null && r !== void 0 ? r : (n) => {},
      }
    }
    function $u(e, t, r, n) {
      var i
      const s = (i = n['vs/nls']) !== null && i !== void 0 ? i : {}
      if (!e || e.length === 0)
        return r({
          localize: li,
          getConfiguredDefaultLocale: () => {
            var c
            return (c = s.availableLanguages) === null || c === void 0 ? void 0 : c['*']
          },
        })
      const a = s.availableLanguages ? fa(s.availableLanguages, e) : null,
        o = a === null || a === ca
      let l = '.nls'
      o || (l = l + '.' + a)
      const u = (c) => {
        Array.isArray(c) ? (c.localize = $r(c)) : (c.localize = $r(c[e])),
          (c.getConfiguredDefaultLocale = () => {
            var f
            return (f = s.availableLanguages) === null || f === void 0 ? void 0 : f['*']
          }),
          r(c)
      }
      typeof s.loadBundle == 'function'
        ? s.loadBundle(e, a, (c, f) => {
            c ? t([e + '.nls'], u) : u(f)
          })
        : s.translationServiceUrl && !o
          ? ii(this, void 0, void 0, function* () {
              var c
              try {
                const f = yield oi(s.translationServiceUrl, a, e)
                return u(f)
              } catch (f) {
                if (!a.includes('-')) return console.error(f), t([e + '.nls'], u)
                try {
                  const d = a.split('-')[0],
                    g = yield oi(s.translationServiceUrl, d, e)
                  return (
                    ((c = s.availableLanguages) !== null && c !== void 0) || (s.availableLanguages = {}),
                    (s.availableLanguages['*'] = d),
                    u(g)
                  )
                } catch (d) {
                  return console.error(d), t([e + '.nls'], u)
                }
              }
            })
          : t([e + l], u, (c) => {
              if (l === '.nls') {
                console.error('Failed trying to load default language strings', c)
                return
              }
              console.error(
                `Failed to load message bundle for language ${a}. Falling back to the default language:`,
                c,
              ),
                t([e + '.nls'], u)
            })
    }
    var ui = ie(224),
      Hr
    const gr = 'en'
    let Vt = !1,
      Bt = !1,
      mr = !1,
      ha = !1,
      da = !1,
      ci = !1,
      ga = !1,
      fi = !1,
      ma = !1,
      pa = !1,
      pr,
      zr = null,
      va = null,
      Fe
    const ae = typeof self == 'object' ? self : typeof ie.g == 'object' ? ie.g : {}
    let oe
    typeof ae.vscode != 'undefined' && typeof ae.vscode.process != 'undefined'
      ? (oe = ae.vscode.process)
      : typeof ui != 'undefined' && (oe = ui)
    const hi =
        typeof ((Hr = oe == null ? void 0 : oe.versions) === null || Hr === void 0 ? void 0 : Hr.electron) == 'string',
      ba = hi && (oe == null ? void 0 : oe.type) === 'renderer'
    if (typeof navigator == 'object' && !ba)
      (Fe = navigator.userAgent),
        (Vt = Fe.indexOf('Windows') >= 0),
        (Bt = Fe.indexOf('Macintosh') >= 0),
        (fi =
          (Fe.indexOf('Macintosh') >= 0 || Fe.indexOf('iPad') >= 0 || Fe.indexOf('iPhone') >= 0) &&
          !!navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 0),
        (mr = Fe.indexOf('Linux') >= 0),
        (pa = (Fe == null ? void 0 : Fe.indexOf('Mobi')) >= 0),
        (ci = !0),
        (pr = (li({ key: 'ensureLoaderPluginIsLoaded', comment: ['{Locked}'] }, '_'), void 0) || gr),
        (zr = pr)
    else if (typeof oe == 'object') {
      ;(Vt = oe.platform === 'win32'),
        (Bt = oe.platform === 'darwin'),
        (mr = oe.platform === 'linux'),
        (ha = mr && !!oe.env.SNAP && !!oe.env.SNAP_REVISION),
        (ga = hi),
        (ma = !!oe.env.CI || !!oe.env.BUILD_ARTIFACTSTAGINGDIRECTORY),
        (pr = gr),
        (zr = gr)
      const e = oe.env.VSCODE_NLS_CONFIG
      if (e)
        try {
          const t = JSON.parse(e),
            r = t.availableLanguages['*']
          ;(pr = t.locale), (zr = r || gr), (va = t._translationsConfigFile)
        } catch (t) {}
      da = !0
    } else console.error('Unable to resolve platform.')
    let Gr = 0
    Bt ? (Gr = 1) : Vt ? (Gr = 3) : mr && (Gr = 2)
    const Ut = Vt,
      ya = Bt,
      Hu = null,
      zu = null,
      Gu = null,
      Ju = ci && typeof ae.importScripts == 'function',
      Qu = null,
      Xu = null,
      Be = Fe,
      Zu = null,
      _a = typeof ae.postMessage == 'function' && !ae.importScripts,
      Yu = (() => {
        if (_a) {
          const e = []
          ae.addEventListener('message', (r) => {
            if (r.data && r.data.vscodeScheduleAsyncWork)
              for (let n = 0, i = e.length; n < i; n++) {
                const s = e[n]
                if (s.id === r.data.vscodeScheduleAsyncWork) {
                  e.splice(n, 1), s.callback()
                  return
                }
              }
          })
          let t = 0
          return (r) => {
            const n = ++t
            e.push({ id: n, callback: r }), ae.postMessage({ vscodeScheduleAsyncWork: n }, '*')
          }
        }
        return (e) => setTimeout(e)
      })(),
      Ku = Bt || fi ? 2 : Vt ? 1 : 3
    let di = !0,
      gi = !1
    function e0() {
      if (!gi) {
        gi = !0
        const e = new Uint8Array(2)
        ;(e[0] = 1), (e[1] = 2), (di = new Uint16Array(e.buffer)[0] === (2 << 8) + 1)
      }
      return di
    }
    const xa = !!(Be && Be.indexOf('Chrome') >= 0),
      t0 = !!(Be && Be.indexOf('Firefox') >= 0),
      r0 = !!(!xa && Be && Be.indexOf('Safari') >= 0),
      n0 = !!(Be && Be.indexOf('Edg/') >= 0),
      i0 = !!(Be && Be.indexOf('Android') >= 0),
      wa = ae.performance && typeof ae.performance.now == 'function'
    class vr {
      static create(t = !0) {
        return new vr(t)
      }
      constructor(t) {
        ;(this._highResolution = wa && t), (this._startTime = this._now()), (this._stopTime = -1)
      }
      stop() {
        this._stopTime = this._now()
      }
      elapsed() {
        return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime
      }
      _now() {
        return this._highResolution ? ae.performance.now() : Date.now()
      }
    }
    const mi = !1,
      Sa = !1
    var br
    ;(function (e) {
      e.None = () => wt.None
      function t(x) {
        if (Sa) {
          const { onDidAddListener: w } = x,
            A = jt.create()
          let S = 0
          x.onDidAddListener = () => {
            ++S === 2 &&
              (console.warn(
                'snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here',
              ),
              A.print()),
              w == null || w()
          }
        }
      }
      function r(x, w) {
        return f(x, () => {}, 0, void 0, !0, void 0, w)
      }
      e.defer = r
      function n(x) {
        return (w, A = null, S) => {
          let P = !1,
            R
          return (
            (R = x(
              (W) => {
                if (!P) return R ? R.dispose() : (P = !0), w.call(A, W)
              },
              null,
              S,
            )),
            P && R.dispose(),
            R
          )
        }
      }
      e.once = n
      function i(x, w, A) {
        return c((S, P = null, R) => x((W) => S.call(P, w(W)), null, R), A)
      }
      e.map = i
      function s(x, w, A) {
        return c(
          (S, P = null, R) =>
            x(
              (W) => {
                w(W), S.call(P, W)
              },
              null,
              R,
            ),
          A,
        )
      }
      e.forEach = s
      function a(x, w, A) {
        return c((S, P = null, R) => x((W) => w(W) && S.call(P, W), null, R), A)
      }
      e.filter = a
      function o(x) {
        return x
      }
      e.signal = o
      function l(...x) {
        return (w, A = null, S) => la(...x.map((P) => P((R) => w.call(A, R), null, S)))
      }
      e.any = l
      function u(x, w, A, S) {
        let P = A
        return i(x, (R) => ((P = w(P, R)), P), S)
      }
      e.reduce = u
      function c(x, w) {
        let A
        const S = {
          onWillAddFirstListener() {
            A = x(P.fire, P)
          },
          onDidRemoveLastListener() {
            A == null || A.dispose()
          },
        }
        w || t(S)
        const P = new Ne(S)
        return w == null || w.add(P), P.event
      }
      function f(x, w, A = 100, S = !1, P = !1, R, W) {
        let q,
          T,
          N,
          F = 0,
          I
        const B = {
          leakWarningThreshold: R,
          onWillAddFirstListener() {
            q = x((H) => {
              F++,
                (T = w(T, H)),
                S && !N && (U.fire(T), (T = void 0)),
                (I = () => {
                  const Ee = T
                  ;(T = void 0), (N = void 0), (!S || F > 1) && U.fire(Ee), (F = 0)
                }),
                typeof A == 'number'
                  ? (clearTimeout(N), (N = setTimeout(I, A)))
                  : N === void 0 && ((N = 0), queueMicrotask(I))
            })
          },
          onWillRemoveListener() {
            P && F > 0 && (I == null || I())
          },
          onDidRemoveLastListener() {
            ;(I = void 0), q.dispose()
          },
        }
        W || t(B)
        const U = new Ne(B)
        return W == null || W.add(U), U.event
      }
      e.debounce = f
      function d(x, w = 0, A) {
        return e.debounce(x, (S, P) => (S ? (S.push(P), S) : [P]), w, void 0, !0, void 0, A)
      }
      e.accumulate = d
      function g(x, w = (S, P) => S === P, A) {
        let S = !0,
          P
        return a(
          x,
          (R) => {
            const W = S || !w(R, P)
            return (S = !1), (P = R), W
          },
          A,
        )
      }
      e.latch = g
      function p(x, w, A) {
        return [e.filter(x, w, A), e.filter(x, (S) => !w(S), A)]
      }
      e.split = p
      function b(x, w = !1, A = []) {
        let S = A.slice(),
          P = x((q) => {
            S ? S.push(q) : W.fire(q)
          })
        const R = () => {
            S == null || S.forEach((q) => W.fire(q)), (S = null)
          },
          W = new Ne({
            onWillAddFirstListener() {
              P || (P = x((q) => W.fire(q)))
            },
            onDidAddFirstListener() {
              S && (w ? setTimeout(R) : R())
            },
            onDidRemoveLastListener() {
              P && P.dispose(), (P = null)
            },
          })
        return W.event
      }
      e.buffer = b
      class m {
        constructor(w) {
          ;(this.event = w), (this.disposables = new dt())
        }
        map(w) {
          return new m(i(this.event, w, this.disposables))
        }
        forEach(w) {
          return new m(s(this.event, w, this.disposables))
        }
        filter(w) {
          return new m(a(this.event, w, this.disposables))
        }
        reduce(w, A) {
          return new m(u(this.event, w, A, this.disposables))
        }
        latch() {
          return new m(g(this.event, void 0, this.disposables))
        }
        debounce(w, A = 100, S = !1, P = !1, R) {
          return new m(f(this.event, w, A, S, P, R, this.disposables))
        }
        on(w, A, S) {
          return this.event(w, A, S)
        }
        once(w, A, S) {
          return n(this.event)(w, A, S)
        }
        dispose() {
          this.disposables.dispose()
        }
      }
      function v(x) {
        return new m(x)
      }
      e.chain = v
      function _(x, w, A = (S) => S) {
        const S = (...q) => W.fire(A(...q)),
          P = () => x.on(w, S),
          R = () => x.removeListener(w, S),
          W = new Ne({ onWillAddFirstListener: P, onDidRemoveLastListener: R })
        return W.event
      }
      e.fromNodeEventEmitter = _
      function y(x, w, A = (S) => S) {
        const S = (...q) => W.fire(A(...q)),
          P = () => x.addEventListener(w, S),
          R = () => x.removeEventListener(w, S),
          W = new Ne({ onWillAddFirstListener: P, onDidRemoveLastListener: R })
        return W.event
      }
      e.fromDOMEventEmitter = y
      function E(x) {
        return new Promise((w) => n(x)(w))
      }
      e.toPromise = E
      function M(x, w) {
        return w(void 0), x((A) => w(A))
      }
      e.runAndSubscribe = M
      function D(x, w) {
        let A = null
        function S(R) {
          A == null || A.dispose(), (A = new dt()), w(R, A)
        }
        S(void 0)
        const P = x((R) => S(R))
        return hr(() => {
          P.dispose(), A == null || A.dispose()
        })
      }
      e.runAndSubscribeWithStore = D
      class C {
        constructor(w, A) {
          ;(this.obs = w), (this._counter = 0), (this._hasChanged = !1)
          const S = {
            onWillAddFirstListener: () => {
              w.addObserver(this)
            },
            onDidRemoveLastListener: () => {
              w.removeObserver(this)
            },
          }
          A || t(S), (this.emitter = new Ne(S)), A && A.add(this.emitter)
        }
        beginUpdate(w) {
          this._counter++
        }
        handleChange(w, A) {
          this._hasChanged = !0
        }
        endUpdate(w) {
          --this._counter === 0 && this._hasChanged && ((this._hasChanged = !1), this.emitter.fire(this.obs.get()))
        }
      }
      function k(x, w) {
        return new C(x, w).emitter.event
      }
      e.fromObservable = k
    })(br || (br = {}))
    class St {
      constructor(t) {
        ;(this.listenerCount = 0),
          (this.invocationCount = 0),
          (this.elapsedOverall = 0),
          (this.durations = []),
          (this.name = `${t}_${St._idPool++}`),
          St.all.add(this)
      }
      start(t) {
        ;(this._stopWatch = new vr(!0)), (this.listenerCount = t)
      }
      stop() {
        if (this._stopWatch) {
          const t = this._stopWatch.elapsed()
          this.durations.push(t), (this.elapsedOverall += t), (this.invocationCount += 1), (this._stopWatch = void 0)
        }
      }
    }
    ;(St.all = new Set()), (St._idPool = 0)
    let pi = -1
    class Aa {
      constructor(t, r = Math.random().toString(18).slice(2, 5)) {
        ;(this.threshold = t), (this.name = r), (this._warnCountdown = 0)
      }
      dispose() {
        var t
        ;(t = this._stacks) === null || t === void 0 || t.clear()
      }
      check(t, r) {
        const n = this.threshold
        if (n <= 0 || r < n) return
        this._stacks || (this._stacks = new Map())
        const i = this._stacks.get(t.value) || 0
        if ((this._stacks.set(t.value, i + 1), (this._warnCountdown -= 1), this._warnCountdown <= 0)) {
          this._warnCountdown = n * 0.5
          let s,
            a = 0
          for (const [o, l] of this._stacks) (!s || a < l) && ((s = o), (a = l))
          console.warn(
            `[${this.name}] potential listener LEAK detected, having ${r} listeners already. MOST frequent listener (${a}):`,
          ),
            console.warn(s)
        }
        return () => {
          const s = this._stacks.get(t.value) || 0
          this._stacks.set(t.value, s - 1)
        }
      }
    }
    class jt {
      static create() {
        var t
        return new jt((t = new Error().stack) !== null && t !== void 0 ? t : '')
      }
      constructor(t) {
        this.value = t
      }
      print() {
        console.warn(
          this.value
            .split(
              `
`,
            )
            .slice(2).join(`
`),
        )
      }
    }
    class La {
      constructor(t, r, n) {
        ;(this.callback = t), (this.callbackThis = r), (this.stack = n), (this.subscription = new ua())
      }
      invoke(t) {
        this.callback.call(this.callbackThis, t)
      }
    }
    class Ne {
      constructor(t) {
        var r, n, i, s, a
        ;(this._disposed = !1),
          (this._options = t),
          (this._leakageMon =
            pi > 0 || (!((r = this._options) === null || r === void 0) && r.leakWarningThreshold)
              ? new Aa(
                  (i = (n = this._options) === null || n === void 0 ? void 0 : n.leakWarningThreshold) !== null &&
                  i !== void 0
                    ? i
                    : pi,
                )
              : void 0),
          (this._perfMon =
            !((s = this._options) === null || s === void 0) && s._profName ? new St(this._options._profName) : void 0),
          (this._deliveryQueue = (a = this._options) === null || a === void 0 ? void 0 : a.deliveryQueue)
      }
      dispose() {
        var t, r, n, i
        if (!this._disposed) {
          if (((this._disposed = !0), this._listeners)) {
            if (mi) {
              const s = Array.from(this._listeners)
              queueMicrotask(() => {
                var a
                for (const o of s)
                  o.subscription.isset() &&
                    (o.subscription.unset(), (a = o.stack) === null || a === void 0 || a.print())
              })
            }
            this._listeners.clear()
          }
          ;(t = this._deliveryQueue) === null || t === void 0 || t.clear(this),
            (n = (r = this._options) === null || r === void 0 ? void 0 : r.onDidRemoveLastListener) === null ||
              n === void 0 ||
              n.call(r),
            (i = this._leakageMon) === null || i === void 0 || i.dispose()
        }
      }
      get event() {
        return (
          this._event ||
            (this._event = (t, r, n) => {
              var i, s, a
              if (
                (this._listeners || (this._listeners = new dr()),
                this._leakageMon && this._listeners.size > this._leakageMon.threshold * 3)
              )
                return (
                  console.warn(
                    `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far`,
                  ),
                  wt.None
                )
              const o = this._listeners.isEmpty()
              o &&
                !((i = this._options) === null || i === void 0) &&
                i.onWillAddFirstListener &&
                this._options.onWillAddFirstListener(this)
              let l, u
              this._leakageMon &&
                this._listeners.size >= Math.ceil(this._leakageMon.threshold * 0.2) &&
                ((u = jt.create()), (l = this._leakageMon.check(u, this._listeners.size + 1))),
                mi && (u = u != null ? u : jt.create())
              const c = new La(t, r, u),
                f = this._listeners.push(c)
              o &&
                !((s = this._options) === null || s === void 0) &&
                s.onDidAddFirstListener &&
                this._options.onDidAddFirstListener(this),
                !((a = this._options) === null || a === void 0) &&
                  a.onDidAddListener &&
                  this._options.onDidAddListener(this, t, r)
              const d = c.subscription.set(() => {
                var g, p
                l == null || l(),
                  this._disposed ||
                    ((p = (g = this._options) === null || g === void 0 ? void 0 : g.onWillRemoveListener) === null ||
                      p === void 0 ||
                      p.call(g, this),
                    f(),
                    this._options &&
                      this._options.onDidRemoveLastListener &&
                      ((this._listeners && !this._listeners.isEmpty()) || this._options.onDidRemoveLastListener(this)))
              })
              return n instanceof dt ? n.add(d) : Array.isArray(n) && n.push(d), d
            }),
          this._event
        )
      }
      fire(t) {
        var r, n
        if (this._listeners) {
          this._deliveryQueue || (this._deliveryQueue = new Na())
          for (const i of this._listeners) this._deliveryQueue.push(this, i, t)
          ;(r = this._perfMon) === null || r === void 0 || r.start(this._deliveryQueue.size),
            this._deliveryQueue.deliver(),
            (n = this._perfMon) === null || n === void 0 || n.stop()
        }
      }
      hasListeners() {
        return this._listeners ? !this._listeners.isEmpty() : !1
      }
    }
    class Ca {
      constructor() {
        this._queue = new dr()
      }
      get size() {
        return this._queue.size
      }
      push(t, r, n) {
        this._queue.push(new ka(t, r, n))
      }
      clear(t) {
        const r = new dr()
        for (const n of this._queue) n.emitter !== t && r.push(n)
        this._queue = r
      }
      deliver() {
        for (; this._queue.size > 0; ) {
          const t = this._queue.shift()
          try {
            t.listener.invoke(t.event)
          } catch (r) {
            ne(r)
          }
        }
      }
    }
    class Na extends Ca {
      clear(t) {
        this._queue.clear()
      }
    }
    class ka {
      constructor(t, r, n) {
        ;(this.emitter = t), (this.listener = r), (this.event = n)
      }
    }
    class s0 extends null {
      constructor(t) {
        super(t),
          (this._isPaused = 0),
          (this._eventQueue = new LinkedList()),
          (this._mergeFn = t == null ? void 0 : t.merge)
      }
      pause() {
        this._isPaused++
      }
      resume() {
        if (this._isPaused !== 0 && --this._isPaused === 0)
          if (this._mergeFn) {
            if (this._eventQueue.size > 0) {
              const t = Array.from(this._eventQueue)
              this._eventQueue.clear(), super.fire(this._mergeFn(t))
            }
          } else for (; !this._isPaused && this._eventQueue.size !== 0; ) super.fire(this._eventQueue.shift())
      }
      fire(t) {
        this._listeners && (this._isPaused !== 0 ? this._eventQueue.push(t) : super.fire(t))
      }
    }
    class a0 extends null {
      constructor(t) {
        var r
        super(t), (this._delay = (r = t.delay) !== null && r !== void 0 ? r : 100)
      }
      fire(t) {
        this._handle ||
          (this.pause(),
          (this._handle = setTimeout(() => {
            ;(this._handle = void 0), this.resume()
          }, this._delay))),
          super.fire(t)
      }
    }
    class o0 extends null {
      constructor(t) {
        super(t), (this._queuedEvents = []), (this._mergeFn = t == null ? void 0 : t.merge)
      }
      fire(t) {
        this.hasListeners() &&
          (this._queuedEvents.push(t),
          this._queuedEvents.length === 1 &&
            queueMicrotask(() => {
              this._mergeFn
                ? super.fire(this._mergeFn(this._queuedEvents))
                : this._queuedEvents.forEach((r) => super.fire(r)),
                (this._queuedEvents = [])
            }))
      }
    }
    class l0 {
      constructor() {
        ;(this.hasListeners = !1),
          (this.events = []),
          (this.emitter = new Ne({
            onWillAddFirstListener: () => this.onFirstListenerAdd(),
            onDidRemoveLastListener: () => this.onLastListenerRemove(),
          }))
      }
      get event() {
        return this.emitter.event
      }
      add(t) {
        const r = { event: t, listener: null }
        this.events.push(r), this.hasListeners && this.hook(r)
        const n = () => {
          this.hasListeners && this.unhook(r)
          const i = this.events.indexOf(r)
          this.events.splice(i, 1)
        }
        return toDisposable(onceFn(n))
      }
      onFirstListenerAdd() {
        ;(this.hasListeners = !0), this.events.forEach((t) => this.hook(t))
      }
      onLastListenerRemove() {
        ;(this.hasListeners = !1), this.events.forEach((t) => this.unhook(t))
      }
      hook(t) {
        t.listener = t.event((r) => this.emitter.fire(r))
      }
      unhook(t) {
        t.listener && t.listener.dispose(), (t.listener = null)
      }
      dispose() {
        this.emitter.dispose()
      }
    }
    class u0 {
      constructor() {
        this.buffers = []
      }
      wrapEvent(t) {
        return (r, n, i) =>
          t(
            (s) => {
              const a = this.buffers[this.buffers.length - 1]
              a ? a.push(() => r.call(n, s)) : r.call(n, s)
            },
            void 0,
            i,
          )
      }
      bufferEvents(t) {
        const r = []
        this.buffers.push(r)
        const n = t()
        return this.buffers.pop(), r.forEach((i) => i()), n
      }
    }
    class c0 {
      constructor() {
        ;(this.listening = !1),
          (this.inputEvent = br.None),
          (this.inputEventListener = Disposable.None),
          (this.emitter = new Ne({
            onDidAddFirstListener: () => {
              ;(this.listening = !0), (this.inputEventListener = this.inputEvent(this.emitter.fire, this.emitter))
            },
            onDidRemoveLastListener: () => {
              ;(this.listening = !1), this.inputEventListener.dispose()
            },
          })),
          (this.event = this.emitter.event)
      }
      set input(t) {
        ;(this.inputEvent = t),
          this.listening &&
            (this.inputEventListener.dispose(), (this.inputEventListener = t(this.emitter.fire, this.emitter)))
      }
      dispose() {
        this.inputEventListener.dispose(), this.emitter.dispose()
      }
    }
    function Ea(e) {
      if (!e || typeof e != 'object' || e instanceof RegExp) return e
      const t = Array.isArray(e) ? [] : {}
      return (
        Object.entries(e).forEach(([r, n]) => {
          t[r] = n && typeof n == 'object' ? Ea(n) : n
        }),
        t
      )
    }
    function f0(e) {
      if (!e || typeof e != 'object') return e
      const t = [e]
      for (; t.length > 0; ) {
        const r = t.shift()
        Object.freeze(r)
        for (const n in r)
          if (vi.call(r, n)) {
            const i = r[n]
            typeof i == 'object' && !Object.isFrozen(i) && !isTypedArray(i) && t.push(i)
          }
      }
      return e
    }
    const vi = Object.prototype.hasOwnProperty
    function h0(e, t) {
      return Jr(e, t, new Set())
    }
    function Jr(e, t, r) {
      if (isUndefinedOrNull(e)) return e
      const n = t(e)
      if (typeof n != 'undefined') return n
      if (Array.isArray(e)) {
        const i = []
        for (const s of e) i.push(Jr(s, t, r))
        return i
      }
      if (isObject(e)) {
        if (r.has(e)) throw new Error('Cannot clone recursive data-structure')
        r.add(e)
        const i = {}
        for (const s in e) vi.call(e, s) && (i[s] = Jr(e[s], t, r))
        return r.delete(e), i
      }
      return e
    }
    function Ma(e, t, r = !0) {
      return isObject(e)
        ? (isObject(t) &&
            Object.keys(t).forEach((n) => {
              n in e ? r && (isObject(e[n]) && isObject(t[n]) ? Ma(e[n], t[n], r) : (e[n] = t[n])) : (e[n] = t[n])
            }),
          e)
        : t
    }
    function Qr(e, t) {
      if (e === t) return !0
      if (
        e == null ||
        t === null ||
        t === void 0 ||
        typeof e != typeof t ||
        typeof e != 'object' ||
        Array.isArray(e) !== Array.isArray(t)
      )
        return !1
      let r, n
      if (Array.isArray(e)) {
        if (e.length !== t.length) return !1
        for (r = 0; r < e.length; r++) if (!Qr(e[r], t[r])) return !1
      } else {
        const i = []
        for (n in e) i.push(n)
        i.sort()
        const s = []
        for (n in t) s.push(n)
        if ((s.sort(), !Qr(i, s))) return !1
        for (r = 0; r < i.length; r++) if (!Qr(e[i[r]], t[i[r]])) return !1
      }
      return !0
    }
    function Ta(e) {
      let t = [],
        r = Object.getPrototypeOf(e)
      for (; Object.prototype !== r; ) (t = t.concat(Object.getOwnPropertyNames(r))), (r = Object.getPrototypeOf(r))
      return t
    }
    function Xr(e) {
      const t = []
      for (const r of Ta(e)) typeof e[r] == 'function' && t.push(r)
      return t
    }
    function Pa(e, t) {
      const r = (i) =>
          function () {
            const s = Array.prototype.slice.call(arguments, 0)
            return t(i, s)
          },
        n = {}
      for (const i of e) n[i] = r(i)
      return n
    }
    class Fa {
      constructor(t) {
        ;(this.fn = t), (this.lastCache = void 0), (this.lastArgKey = void 0)
      }
      get(t) {
        const r = JSON.stringify(t)
        return this.lastArgKey !== r && ((this.lastArgKey = r), (this.lastCache = this.fn(t))), this.lastCache
      }
    }
    class d0 {
      get cachedValues() {
        return this._map
      }
      constructor(t) {
        ;(this.fn = t), (this._map = new Map())
      }
      get(t) {
        if (this._map.has(t)) return this._map.get(t)
        const r = this.fn(t)
        return this._map.set(t, r), r
      }
    }
    class bi {
      constructor(t) {
        ;(this.executor = t), (this._didRun = !1)
      }
      get value() {
        if (!this._didRun)
          try {
            this._value = this.executor()
          } catch (t) {
            this._error = t
          } finally {
            this._didRun = !0
          }
        if (this._error) throw this._error
        return this._value
      }
      get rawValue() {
        return this._value
      }
    }
    var yi
    function g0(e) {
      return !e || typeof e != 'string' ? !0 : e.trim().length === 0
    }
    const Da = /{(\d+)}/g
    function m0(e, ...t) {
      return t.length === 0
        ? e
        : e.replace(Da, function (r, n) {
            const i = parseInt(n, 10)
            return isNaN(i) || i < 0 || i >= t.length ? r : t[i]
          })
    }
    function p0(e) {
      return e.replace(/[<>&]/g, function (t) {
        switch (t) {
          case '<':
            return '&lt;'
          case '>':
            return '&gt;'
          case '&':
            return '&amp;'
          default:
            return t
        }
      })
    }
    function _i(e) {
      return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&')
    }
    function v0(e, t = ' ') {
      const r = Ia(e, t)
      return Ra(r, t)
    }
    function Ia(e, t) {
      if (!e || !t) return e
      const r = t.length
      if (r === 0 || e.length === 0) return e
      let n = 0
      for (; e.indexOf(t, n) === n; ) n = n + r
      return e.substring(n)
    }
    function Ra(e, t) {
      if (!e || !t) return e
      const r = t.length,
        n = e.length
      if (r === 0 || n === 0) return e
      let i = n,
        s = -1
      for (; (s = e.lastIndexOf(t, i - 1)), !(s === -1 || s + r !== i); ) {
        if (s === 0) return ''
        i = s
      }
      return e.substring(0, i)
    }
    function b0(e) {
      return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*')
    }
    function y0(e) {
      return e.replace(/\*/g, '')
    }
    function _0(e, t, r = {}) {
      if (!e) throw new Error('Cannot create regex from empty string')
      t || (e = _i(e)),
        r.wholeWord && (/\B/.test(e.charAt(0)) || (e = '\\b' + e), /\B/.test(e.charAt(e.length - 1)) || (e = e + '\\b'))
      let n = ''
      return (
        r.global && (n += 'g'),
        r.matchCase || (n += 'i'),
        r.multiline && (n += 'm'),
        r.unicode && (n += 'u'),
        new RegExp(e, n)
      )
    }
    function x0(e) {
      return e.source === '^' || e.source === '^$' || e.source === '$' || e.source === '^\\s*$'
        ? !1
        : !!(e.exec('') && e.lastIndex === 0)
    }
    function w0(e) {
      return (e.global ? 'g' : '') + (e.ignoreCase ? 'i' : '') + (e.multiline ? 'm' : '') + (e.unicode ? 'u' : '')
    }
    function Oa(e) {
      return e.split(/\r\n|\r|\n/)
    }
    function Va(e) {
      for (let t = 0, r = e.length; t < r; t++) {
        const n = e.charCodeAt(t)
        if (n !== 32 && n !== 9) return t
      }
      return -1
    }
    function S0(e, t = 0, r = e.length) {
      for (let n = t; n < r; n++) {
        const i = e.charCodeAt(n)
        if (i !== 32 && i !== 9) return e.substring(t, n)
      }
      return e.substring(t, r)
    }
    function Ba(e, t = e.length - 1) {
      for (let r = t; r >= 0; r--) {
        const n = e.charCodeAt(r)
        if (n !== 32 && n !== 9) return r
      }
      return -1
    }
    function A0(e, t) {
      return e < t ? -1 : e > t ? 1 : 0
    }
    function Ua(e, t, r = 0, n = e.length, i = 0, s = t.length) {
      for (; r < n && i < s; r++, i++) {
        const l = e.charCodeAt(r),
          u = t.charCodeAt(i)
        if (l < u) return -1
        if (l > u) return 1
      }
      const a = n - r,
        o = s - i
      return a < o ? -1 : a > o ? 1 : 0
    }
    function L0(e, t) {
      return Zr(e, t, 0, e.length, 0, t.length)
    }
    function Zr(e, t, r = 0, n = e.length, i = 0, s = t.length) {
      for (; r < n && i < s; r++, i++) {
        let l = e.charCodeAt(r),
          u = t.charCodeAt(i)
        if (l === u) continue
        if (l >= 128 || u >= 128) return Ua(e.toLowerCase(), t.toLowerCase(), r, n, i, s)
        xi(l) && (l -= 32), xi(u) && (u -= 32)
        const c = l - u
        if (c !== 0) return c
      }
      const a = n - r,
        o = s - i
      return a < o ? -1 : a > o ? 1 : 0
    }
    function C0(e) {
      return e >= 48 && e <= 57
    }
    function xi(e) {
      return e >= 97 && e <= 122
    }
    function wi(e) {
      return e >= 65 && e <= 90
    }
    function N0(e, t) {
      return e.length === t.length && Zr(e, t) === 0
    }
    function k0(e, t) {
      const r = t.length
      return t.length > e.length ? !1 : Zr(e, t, 0, r) === 0
    }
    function E0(e, t) {
      const r = Math.min(e.length, t.length)
      let n
      for (n = 0; n < r; n++) if (e.charCodeAt(n) !== t.charCodeAt(n)) return n
      return r
    }
    function M0(e, t) {
      const r = Math.min(e.length, t.length)
      let n
      const i = e.length - 1,
        s = t.length - 1
      for (n = 0; n < r; n++) if (e.charCodeAt(i - n) !== t.charCodeAt(s - n)) return n
      return r
    }
    function Wt(e) {
      return 55296 <= e && e <= 56319
    }
    function qt(e) {
      return 56320 <= e && e <= 57343
    }
    function Yr(e, t) {
      return ((e - 55296) << 10) + (t - 56320) + 65536
    }
    function Si(e, t, r) {
      const n = e.charCodeAt(r)
      if (Wt(n) && r + 1 < t) {
        const i = e.charCodeAt(r + 1)
        if (qt(i)) return Yr(n, i)
      }
      return n
    }
    function ja(e, t) {
      const r = e.charCodeAt(t - 1)
      if (qt(r) && t > 1) {
        const n = e.charCodeAt(t - 2)
        if (Wt(n)) return Yr(n, r)
      }
      return r
    }
    class Kr {
      get offset() {
        return this._offset
      }
      constructor(t, r = 0) {
        ;(this._str = t), (this._len = t.length), (this._offset = r)
      }
      setOffset(t) {
        this._offset = t
      }
      prevCodePoint() {
        const t = ja(this._str, this._offset)
        return (this._offset -= t >= 65536 ? 2 : 1), t
      }
      nextCodePoint() {
        const t = Si(this._str, this._len, this._offset)
        return (this._offset += t >= 65536 ? 2 : 1), t
      }
      eol() {
        return this._offset >= this._len
      }
    }
    class Ai {
      get offset() {
        return this._iterator.offset
      }
      constructor(t, r = 0) {
        this._iterator = new Kr(t, r)
      }
      nextGraphemeLength() {
        const t = et.getInstance(),
          r = this._iterator,
          n = r.offset
        let i = t.getGraphemeBreakType(r.nextCodePoint())
        for (; !r.eol(); ) {
          const s = r.offset,
            a = t.getGraphemeBreakType(r.nextCodePoint())
          if (Li(i, a)) {
            r.setOffset(s)
            break
          }
          i = a
        }
        return r.offset - n
      }
      prevGraphemeLength() {
        const t = et.getInstance(),
          r = this._iterator,
          n = r.offset
        let i = t.getGraphemeBreakType(r.prevCodePoint())
        for (; r.offset > 0; ) {
          const s = r.offset,
            a = t.getGraphemeBreakType(r.prevCodePoint())
          if (Li(a, i)) {
            r.setOffset(s)
            break
          }
          i = a
        }
        return n - r.offset
      }
      eol() {
        return this._iterator.eol()
      }
    }
    function Wa(e, t) {
      return new Ai(e, t).nextGraphemeLength()
    }
    function qa(e, t) {
      return new Ai(e, t).prevGraphemeLength()
    }
    function T0(e, t) {
      t > 0 && qt(e.charCodeAt(t)) && t--
      const r = t + Wa(e, t)
      return [r - qa(e, r), r]
    }
    let en = null
    function $a() {
      return /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u088E\u08A0-\u08C9\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDC7\uFDF0-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE35\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDD23\uDE80-\uDEA9\uDEAD-\uDF45\uDF51-\uDF81\uDF86-\uDFF6]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD4B-\uDFFF]|\uD83B[\uDC00-\uDEBB])/
    }
    function P0(e) {
      return en || (en = $a()), en.test(e)
    }
    const Ha = /^[\t\n\r\x20-\x7E]*$/
    function za(e) {
      return Ha.test(e)
    }
    const Ga = /[\u2028\u2029]/
    function F0(e) {
      return Ga.test(e)
    }
    function D0(e) {
      return (e >= 11904 && e <= 55215) || (e >= 63744 && e <= 64255) || (e >= 65281 && e <= 65374)
    }
    function Ja(e) {
      return (
        (e >= 127462 && e <= 127487) ||
        e === 8986 ||
        e === 8987 ||
        e === 9200 ||
        e === 9203 ||
        (e >= 9728 && e <= 10175) ||
        e === 11088 ||
        e === 11093 ||
        (e >= 127744 && e <= 128591) ||
        (e >= 128640 && e <= 128764) ||
        (e >= 128992 && e <= 129008) ||
        (e >= 129280 && e <= 129535) ||
        (e >= 129648 && e <= 129782)
      )
    }
    const I0 = String.fromCharCode(65279)
    function R0(e) {
      return !!(e && e.length > 0 && e.charCodeAt(0) === 65279)
    }
    function O0(e, t = !1) {
      return e ? (t && (e = e.replace(/\\./g, '')), e.toLowerCase() !== e) : !1
    }
    function V0(e) {
      return (e = e % (2 * 26)), e < 26 ? String.fromCharCode(97 + e) : String.fromCharCode(65 + e - 26)
    }
    function Li(e, t) {
      return e === 0
        ? t !== 5 && t !== 7
        : e === 2 && t === 3
          ? !1
          : e === 4 || e === 2 || e === 3 || t === 4 || t === 2 || t === 3
            ? !0
            : !(
                (e === 8 && (t === 8 || t === 9 || t === 11 || t === 12)) ||
                ((e === 11 || e === 9) && (t === 9 || t === 10)) ||
                ((e === 12 || e === 10) && t === 10) ||
                t === 5 ||
                t === 13 ||
                t === 7 ||
                e === 1 ||
                (e === 13 && t === 14) ||
                (e === 6 && t === 6)
              )
    }
    class et {
      static getInstance() {
        return et._INSTANCE || (et._INSTANCE = new et()), et._INSTANCE
      }
      constructor() {
        this._data = Qa()
      }
      getGraphemeBreakType(t) {
        if (t < 32) return t === 10 ? 3 : t === 13 ? 2 : 4
        if (t < 127) return 0
        const r = this._data,
          n = r.length / 3
        let i = 1
        for (; i <= n; )
          if (t < r[3 * i]) i = 2 * i
          else if (t > r[3 * i + 1]) i = 2 * i + 1
          else return r[3 * i + 2]
        return 0
      }
    }
    et._INSTANCE = null
    function Qa() {
      return JSON.parse(
        '[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]',
      )
    }
    function B0(e, t) {
      if (e === 0) return 0
      const r = Xa(e, t)
      if (r !== void 0) return r
      const n = new Kr(t, e)
      return n.prevCodePoint(), n.offset
    }
    function Xa(e, t) {
      const r = new Kr(t, e)
      let n = r.prevCodePoint()
      for (; Za(n) || n === 65039 || n === 8419; ) {
        if (r.offset === 0) return
        n = r.prevCodePoint()
      }
      if (!Ja(n)) return
      let i = r.offset
      return i > 0 && r.prevCodePoint() === 8205 && (i = r.offset), i
    }
    function Za(e) {
      return 127995 <= e && e <= 127999
    }
    const U0 = '\xA0'
    class ke {
      static getInstance(t) {
        return ke.cache.get(Array.from(t))
      }
      static getLocales() {
        return ke._locales.value
      }
      constructor(t) {
        this.confusableDictionary = t
      }
      isAmbiguous(t) {
        return this.confusableDictionary.has(t)
      }
      getPrimaryConfusable(t) {
        return this.confusableDictionary.get(t)
      }
      getConfusableCodePoints() {
        return new Set(this.confusableDictionary.keys())
      }
    }
    ;(yi = ke),
      (ke.ambiguousCharacterData = new bi(() =>
        JSON.parse(
          '{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}',
        ),
      )),
      (ke.cache = new Fa((e) => {
        function t(u) {
          const c = new Map()
          for (let f = 0; f < u.length; f += 2) c.set(u[f], u[f + 1])
          return c
        }
        function r(u, c) {
          const f = new Map(u)
          for (const [d, g] of c) f.set(d, g)
          return f
        }
        function n(u, c) {
          if (!u) return c
          const f = new Map()
          for (const [d, g] of u) c.has(d) && f.set(d, g)
          return f
        }
        const i = yi.ambiguousCharacterData.value
        let s = e.filter((u) => !u.startsWith('_') && u in i)
        s.length === 0 && (s = ['_default'])
        let a
        for (const u of s) {
          const c = t(i[u])
          a = n(a, c)
        }
        const o = t(i._common),
          l = r(o, a)
        return new ke(l)
      })),
      (ke._locales = new bi(() => Object.keys(ke.ambiguousCharacterData.value).filter((e) => !e.startsWith('_'))))
    class tt {
      static getRawData() {
        return JSON.parse(
          '[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]',
        )
      }
      static getData() {
        return this._data || (this._data = new Set(tt.getRawData())), this._data
      }
      static isInvisibleCharacter(t) {
        return tt.getData().has(t)
      }
      static get codePoints() {
        return tt.getData()
      }
    }
    tt._data = void 0
    const Ci = '$initialize'
    let Ni = !1
    function j0(e) {
      isWeb &&
        (Ni ||
          ((Ni = !0),
          console.warn(
            'Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq',
          )),
        console.warn(e.message))
    }
    class Ya {
      constructor(t, r, n, i) {
        ;(this.vsWorker = t), (this.req = r), (this.method = n), (this.args = i), (this.type = 0)
      }
    }
    class ki {
      constructor(t, r, n, i) {
        ;(this.vsWorker = t), (this.seq = r), (this.res = n), (this.err = i), (this.type = 1)
      }
    }
    class Ka {
      constructor(t, r, n, i) {
        ;(this.vsWorker = t), (this.req = r), (this.eventName = n), (this.arg = i), (this.type = 2)
      }
    }
    class eo {
      constructor(t, r, n) {
        ;(this.vsWorker = t), (this.req = r), (this.event = n), (this.type = 3)
      }
    }
    class to {
      constructor(t, r) {
        ;(this.vsWorker = t), (this.req = r), (this.type = 4)
      }
    }
    class Ei {
      constructor(t) {
        ;(this._workerId = -1),
          (this._handler = t),
          (this._lastSentReq = 0),
          (this._pendingReplies = Object.create(null)),
          (this._pendingEmitters = new Map()),
          (this._pendingEvents = new Map())
      }
      setWorkerId(t) {
        this._workerId = t
      }
      sendMessage(t, r) {
        const n = String(++this._lastSentReq)
        return new Promise((i, s) => {
          ;(this._pendingReplies[n] = { resolve: i, reject: s }), this._send(new Ya(this._workerId, n, t, r))
        })
      }
      listen(t, r) {
        let n = null
        const i = new Ne({
          onWillAddFirstListener: () => {
            ;(n = String(++this._lastSentReq)),
              this._pendingEmitters.set(n, i),
              this._send(new Ka(this._workerId, n, t, r))
          },
          onDidRemoveLastListener: () => {
            this._pendingEmitters.delete(n), this._send(new to(this._workerId, n)), (n = null)
          },
        })
        return i.event
      }
      handleMessage(t) {
        !t || !t.vsWorker || (this._workerId !== -1 && t.vsWorker !== this._workerId) || this._handleMessage(t)
      }
      _handleMessage(t) {
        switch (t.type) {
          case 1:
            return this._handleReplyMessage(t)
          case 0:
            return this._handleRequestMessage(t)
          case 2:
            return this._handleSubscribeEventMessage(t)
          case 3:
            return this._handleEventMessage(t)
          case 4:
            return this._handleUnsubscribeEventMessage(t)
        }
      }
      _handleReplyMessage(t) {
        if (!this._pendingReplies[t.seq]) {
          console.warn('Got reply to unknown seq')
          return
        }
        const r = this._pendingReplies[t.seq]
        if ((delete this._pendingReplies[t.seq], t.err)) {
          let n = t.err
          t.err.$isError &&
            ((n = new Error()), (n.name = t.err.name), (n.message = t.err.message), (n.stack = t.err.stack)),
            r.reject(n)
          return
        }
        r.resolve(t.res)
      }
      _handleRequestMessage(t) {
        const r = t.req
        this._handler.handleMessage(t.method, t.args).then(
          (i) => {
            this._send(new ki(this._workerId, r, i, void 0))
          },
          (i) => {
            i.detail instanceof Error && (i.detail = ge(i.detail)), this._send(new ki(this._workerId, r, void 0, ge(i)))
          },
        )
      }
      _handleSubscribeEventMessage(t) {
        const r = t.req,
          n = this._handler.handleEvent(
            t.eventName,
            t.arg,
          )((i) => {
            this._send(new eo(this._workerId, r, i))
          })
        this._pendingEvents.set(r, n)
      }
      _handleEventMessage(t) {
        if (!this._pendingEmitters.has(t.req)) {
          console.warn('Got event for unknown req')
          return
        }
        this._pendingEmitters.get(t.req).fire(t.event)
      }
      _handleUnsubscribeEventMessage(t) {
        if (!this._pendingEvents.has(t.req)) {
          console.warn('Got unsubscribe for unknown req')
          return
        }
        this._pendingEvents.get(t.req).dispose(), this._pendingEvents.delete(t.req)
      }
      _send(t) {
        const r = []
        if (t.type === 0) for (let n = 0; n < t.args.length; n++) t.args[n] instanceof ArrayBuffer && r.push(t.args[n])
        else t.type === 1 && t.res instanceof ArrayBuffer && r.push(t.res)
        this._handler.sendMessage(t, r)
      }
    }
    class W0 extends null {
      constructor(t, r, n) {
        super()
        let i = null
        ;(this._worker = this._register(
          t.create(
            'vs/base/common/worker/simpleWorker',
            (u) => {
              this._protocol.handleMessage(u)
            },
            (u) => {
              i == null || i(u)
            },
          ),
        )),
          (this._protocol = new Ei({
            sendMessage: (u, c) => {
              this._worker.postMessage(u, c)
            },
            handleMessage: (u, c) => {
              if (typeof n[u] != 'function')
                return Promise.reject(new Error('Missing method ' + u + ' on main thread host.'))
              try {
                return Promise.resolve(n[u].apply(n, c))
              } catch (f) {
                return Promise.reject(f)
              }
            },
            handleEvent: (u, c) => {
              if (rn(u)) {
                const f = n[u].call(n, c)
                if (typeof f != 'function') throw new Error(`Missing dynamic event ${u} on main thread host.`)
                return f
              }
              if (tn(u)) {
                const f = n[u]
                if (typeof f != 'function') throw new Error(`Missing event ${u} on main thread host.`)
                return f
              }
              throw new Error(`Malformed event name ${u}`)
            },
          })),
          this._protocol.setWorkerId(this._worker.getId())
        let s = null
        typeof globals.require != 'undefined' && typeof globals.require.getConfig == 'function'
          ? (s = globals.require.getConfig())
          : typeof globals.requirejs != 'undefined' && (s = globals.requirejs.s.contexts._.config)
        const a = getAllMethodNames(n)
        this._onModuleLoaded = this._protocol.sendMessage(Ci, [
          this._worker.getId(),
          JSON.parse(JSON.stringify(s)),
          r,
          a,
        ])
        const o = (u, c) => this._request(u, c),
          l = (u, c) => this._protocol.listen(u, c)
        this._lazyProxy = new Promise((u, c) => {
          ;(i = c),
            this._onModuleLoaded.then(
              (f) => {
                u(Mi(f, o, l))
              },
              (f) => {
                c(f), this._onError('Worker failed to load ' + r, f)
              },
            )
        })
      }
      getProxyObject() {
        return this._lazyProxy
      }
      _request(t, r) {
        return new Promise((n, i) => {
          this._onModuleLoaded.then(() => {
            this._protocol.sendMessage(t, r).then(n, i)
          }, i)
        })
      }
      _onError(t, r) {
        console.error(t), console.info(r)
      }
    }
    function tn(e) {
      return e[0] === 'o' && e[1] === 'n' && wi(e.charCodeAt(2))
    }
    function rn(e) {
      return /^onDynamic/.test(e) && wi(e.charCodeAt(9))
    }
    function Mi(e, t, r) {
      const n = (a) =>
          function () {
            const o = Array.prototype.slice.call(arguments, 0)
            return t(a, o)
          },
        i = (a) =>
          function (o) {
            return r(a, o)
          },
        s = {}
      for (const a of e) {
        if (rn(a)) {
          s[a] = i(a)
          continue
        }
        if (tn(a)) {
          s[a] = r(a, void 0)
          continue
        }
        s[a] = n(a)
      }
      return s
    }
    class Ti {
      constructor(t, r) {
        ;(this._requestHandlerFactory = r),
          (this._requestHandler = null),
          (this._protocol = new Ei({
            sendMessage: (n, i) => {
              t(n, i)
            },
            handleMessage: (n, i) => this._handleMessage(n, i),
            handleEvent: (n, i) => this._handleEvent(n, i),
          }))
      }
      onmessage(t) {
        this._protocol.handleMessage(t)
      }
      _handleMessage(t, r) {
        if (t === Ci) return this.initialize(r[0], r[1], r[2], r[3])
        if (!this._requestHandler || typeof this._requestHandler[t] != 'function')
          return Promise.reject(new Error('Missing requestHandler or method: ' + t))
        try {
          return Promise.resolve(this._requestHandler[t].apply(this._requestHandler, r))
        } catch (n) {
          return Promise.reject(n)
        }
      }
      _handleEvent(t, r) {
        if (!this._requestHandler) throw new Error('Missing requestHandler')
        if (rn(t)) {
          const n = this._requestHandler[t].call(this._requestHandler, r)
          if (typeof n != 'function') throw new Error(`Missing dynamic event ${t} on request handler.`)
          return n
        }
        if (tn(t)) {
          const n = this._requestHandler[t]
          if (typeof n != 'function') throw new Error(`Missing event ${t} on request handler.`)
          return n
        }
        throw new Error(`Malformed event name ${t}`)
      }
      initialize(t, r, n, i) {
        this._protocol.setWorkerId(t)
        const o = Mi(
          i,
          (l, u) => this._protocol.sendMessage(l, u),
          (l, u) => this._protocol.listen(l, u),
        )
        return this._requestHandlerFactory
          ? ((this._requestHandler = this._requestHandlerFactory(o)), Promise.resolve(Xr(this._requestHandler)))
          : (r &&
              (typeof r.baseUrl != 'undefined' && delete r.baseUrl,
              typeof r.paths != 'undefined' && typeof r.paths.vs != 'undefined' && delete r.paths.vs,
              typeof r.trustedTypesPolicy !== void 0 && delete r.trustedTypesPolicy,
              (r.catchError = !0),
              ae.require.config(r)),
            new Promise((l, u) => {
              const c = ae.require
              c(
                [n],
                (f) => {
                  if (((this._requestHandler = f.create(o)), !this._requestHandler)) {
                    u(new Error('No RequestHandler!'))
                    return
                  }
                  l(Xr(this._requestHandler))
                },
                u,
              )
            }))
      }
    }
    function q0(e) {
      return new Ti(e, null)
    }
    class rt {
      constructor(t, r, n, i) {
        ;(this.originalStart = t), (this.originalLength = r), (this.modifiedStart = n), (this.modifiedLength = i)
      }
      getOriginalEnd() {
        return this.originalStart + this.originalLength
      }
      getModifiedEnd() {
        return this.modifiedStart + this.modifiedLength
      }
    }
    function $0(e) {
      return nn(e, 0)
    }
    function nn(e, t) {
      switch (typeof e) {
        case 'object':
          return e === null ? ze(349, t) : Array.isArray(e) ? no(e, t) : io(e, t)
        case 'string':
          return sn(e, t)
        case 'boolean':
          return ro(e, t)
        case 'number':
          return ze(e, t)
        case 'undefined':
          return ze(937, t)
        default:
          return ze(617, t)
      }
    }
    function ze(e, t) {
      return ((t << 5) - t + e) | 0
    }
    function ro(e, t) {
      return ze(e ? 433 : 863, t)
    }
    function sn(e, t) {
      t = ze(149417, t)
      for (let r = 0, n = e.length; r < n; r++) t = ze(e.charCodeAt(r), t)
      return t
    }
    function no(e, t) {
      return (t = ze(104579, t)), e.reduce((r, n) => nn(n, r), t)
    }
    function io(e, t) {
      return (
        (t = ze(181387, t)),
        Object.keys(e)
          .sort()
          .reduce((r, n) => ((r = sn(n, r)), nn(e[n], r)), t)
      )
    }
    function an(e, t, r = 32) {
      const n = r - t,
        i = ~((1 << n) - 1)
      return ((e << t) | ((i & e) >>> n)) >>> 0
    }
    function Pi(e, t = 0, r = e.byteLength, n = 0) {
      for (let i = 0; i < r; i++) e[t + i] = n
    }
    function so(e, t, r = '0') {
      for (; e.length < t; ) e = r + e
      return e
    }
    function $t(e, t = 32) {
      return e instanceof ArrayBuffer
        ? Array.from(new Uint8Array(e))
            .map((r) => r.toString(16).padStart(2, '0'))
            .join('')
        : so((e >>> 0).toString(16), t / 4)
    }
    class on {
      constructor() {
        ;(this._h0 = 1732584193),
          (this._h1 = 4023233417),
          (this._h2 = 2562383102),
          (this._h3 = 271733878),
          (this._h4 = 3285377520),
          (this._buff = new Uint8Array(64 + 3)),
          (this._buffDV = new DataView(this._buff.buffer)),
          (this._buffLen = 0),
          (this._totalLen = 0),
          (this._leftoverHighSurrogate = 0),
          (this._finished = !1)
      }
      update(t) {
        const r = t.length
        if (r === 0) return
        const n = this._buff
        let i = this._buffLen,
          s = this._leftoverHighSurrogate,
          a,
          o
        for (s !== 0 ? ((a = s), (o = -1), (s = 0)) : ((a = t.charCodeAt(0)), (o = 0)); ; ) {
          let l = a
          if (Wt(a))
            if (o + 1 < r) {
              const u = t.charCodeAt(o + 1)
              qt(u) ? (o++, (l = Yr(a, u))) : (l = 65533)
            } else {
              s = a
              break
            }
          else qt(a) && (l = 65533)
          if (((i = this._push(n, i, l)), o++, o < r)) a = t.charCodeAt(o)
          else break
        }
        ;(this._buffLen = i), (this._leftoverHighSurrogate = s)
      }
      _push(t, r, n) {
        return (
          n < 128
            ? (t[r++] = n)
            : n < 2048
              ? ((t[r++] = 192 | ((n & 1984) >>> 6)), (t[r++] = 128 | ((n & 63) >>> 0)))
              : n < 65536
                ? ((t[r++] = 224 | ((n & 61440) >>> 12)),
                  (t[r++] = 128 | ((n & 4032) >>> 6)),
                  (t[r++] = 128 | ((n & 63) >>> 0)))
                : ((t[r++] = 240 | ((n & 1835008) >>> 18)),
                  (t[r++] = 128 | ((n & 258048) >>> 12)),
                  (t[r++] = 128 | ((n & 4032) >>> 6)),
                  (t[r++] = 128 | ((n & 63) >>> 0))),
          r >= 64 &&
            (this._step(),
            (r -= 64),
            (this._totalLen += 64),
            (t[0] = t[64 + 0]),
            (t[1] = t[64 + 1]),
            (t[2] = t[64 + 2])),
          r
        )
      }
      digest() {
        return (
          this._finished ||
            ((this._finished = !0),
            this._leftoverHighSurrogate &&
              ((this._leftoverHighSurrogate = 0), (this._buffLen = this._push(this._buff, this._buffLen, 65533))),
            (this._totalLen += this._buffLen),
            this._wrapUp()),
          $t(this._h0) + $t(this._h1) + $t(this._h2) + $t(this._h3) + $t(this._h4)
        )
      }
      _wrapUp() {
        ;(this._buff[this._buffLen++] = 128),
          Pi(this._buff, this._buffLen),
          this._buffLen > 56 && (this._step(), Pi(this._buff))
        const t = 8 * this._totalLen
        this._buffDV.setUint32(56, Math.floor(t / 4294967296), !1),
          this._buffDV.setUint32(60, t % 4294967296, !1),
          this._step()
      }
      _step() {
        const t = on._bigBlock32,
          r = this._buffDV
        for (let f = 0; f < 64; f += 4) t.setUint32(f, r.getUint32(f, !1), !1)
        for (let f = 64; f < 320; f += 4)
          t.setUint32(
            f,
            an(
              t.getUint32(f - 12, !1) ^ t.getUint32(f - 32, !1) ^ t.getUint32(f - 56, !1) ^ t.getUint32(f - 64, !1),
              1,
            ),
            !1,
          )
        let n = this._h0,
          i = this._h1,
          s = this._h2,
          a = this._h3,
          o = this._h4,
          l,
          u,
          c
        for (let f = 0; f < 80; f++)
          f < 20
            ? ((l = (i & s) | (~i & a)), (u = 1518500249))
            : f < 40
              ? ((l = i ^ s ^ a), (u = 1859775393))
              : f < 60
                ? ((l = (i & s) | (i & a) | (s & a)), (u = 2400959708))
                : ((l = i ^ s ^ a), (u = 3395469782)),
            (c = (an(n, 5) + l + o + u + t.getUint32(f * 4, !1)) & 4294967295),
            (o = a),
            (a = s),
            (s = an(i, 30)),
            (i = n),
            (n = c)
        ;(this._h0 = (this._h0 + n) & 4294967295),
          (this._h1 = (this._h1 + i) & 4294967295),
          (this._h2 = (this._h2 + s) & 4294967295),
          (this._h3 = (this._h3 + a) & 4294967295),
          (this._h4 = (this._h4 + o) & 4294967295)
      }
    }
    on._bigBlock32 = new DataView(new ArrayBuffer(320))
    class Fi {
      constructor(t) {
        this.source = t
      }
      getElements() {
        const t = this.source,
          r = new Int32Array(t.length)
        for (let n = 0, i = t.length; n < i; n++) r[n] = t.charCodeAt(n)
        return r
      }
    }
    function ao(e, t, r) {
      return new nt(new Fi(e), new Fi(t)).ComputeDiff(r).changes
    }
    class At {
      static Assert(t, r) {
        if (!t) throw new Error(r)
      }
    }
    class Lt {
      static Copy(t, r, n, i, s) {
        for (let a = 0; a < s; a++) n[i + a] = t[r + a]
      }
      static Copy2(t, r, n, i, s) {
        for (let a = 0; a < s; a++) n[i + a] = t[r + a]
      }
    }
    class Di {
      constructor() {
        ;(this.m_changes = []),
          (this.m_originalStart = 1073741824),
          (this.m_modifiedStart = 1073741824),
          (this.m_originalCount = 0),
          (this.m_modifiedCount = 0)
      }
      MarkNextChange() {
        ;(this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
          this.m_changes.push(
            new rt(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount),
          ),
          (this.m_originalCount = 0),
          (this.m_modifiedCount = 0),
          (this.m_originalStart = 1073741824),
          (this.m_modifiedStart = 1073741824)
      }
      AddOriginalElement(t, r) {
        ;(this.m_originalStart = Math.min(this.m_originalStart, t)),
          (this.m_modifiedStart = Math.min(this.m_modifiedStart, r)),
          this.m_originalCount++
      }
      AddModifiedElement(t, r) {
        ;(this.m_originalStart = Math.min(this.m_originalStart, t)),
          (this.m_modifiedStart = Math.min(this.m_modifiedStart, r)),
          this.m_modifiedCount++
      }
      getChanges() {
        return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes
      }
      getReverseChanges() {
        return (
          (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(),
          this.m_changes.reverse(),
          this.m_changes
        )
      }
    }
    class nt {
      constructor(t, r, n = null) {
        ;(this.ContinueProcessingPredicate = n), (this._originalSequence = t), (this._modifiedSequence = r)
        const [i, s, a] = nt._getElements(t),
          [o, l, u] = nt._getElements(r)
        ;(this._hasStrings = a && u),
          (this._originalStringElements = i),
          (this._originalElementsOrHash = s),
          (this._modifiedStringElements = o),
          (this._modifiedElementsOrHash = l),
          (this.m_forwardHistory = []),
          (this.m_reverseHistory = [])
      }
      static _isStringArray(t) {
        return t.length > 0 && typeof t[0] == 'string'
      }
      static _getElements(t) {
        const r = t.getElements()
        if (nt._isStringArray(r)) {
          const n = new Int32Array(r.length)
          for (let i = 0, s = r.length; i < s; i++) n[i] = sn(r[i], 0)
          return [r, n, !0]
        }
        return r instanceof Int32Array ? [[], r, !1] : [[], new Int32Array(r), !1]
      }
      ElementsAreEqual(t, r) {
        return this._originalElementsOrHash[t] !== this._modifiedElementsOrHash[r]
          ? !1
          : this._hasStrings
            ? this._originalStringElements[t] === this._modifiedStringElements[r]
            : !0
      }
      ElementsAreStrictEqual(t, r) {
        if (!this.ElementsAreEqual(t, r)) return !1
        const n = nt._getStrictElement(this._originalSequence, t),
          i = nt._getStrictElement(this._modifiedSequence, r)
        return n === i
      }
      static _getStrictElement(t, r) {
        return typeof t.getStrictElement == 'function' ? t.getStrictElement(r) : null
      }
      OriginalElementsAreEqual(t, r) {
        return this._originalElementsOrHash[t] !== this._originalElementsOrHash[r]
          ? !1
          : this._hasStrings
            ? this._originalStringElements[t] === this._originalStringElements[r]
            : !0
      }
      ModifiedElementsAreEqual(t, r) {
        return this._modifiedElementsOrHash[t] !== this._modifiedElementsOrHash[r]
          ? !1
          : this._hasStrings
            ? this._modifiedStringElements[t] === this._modifiedStringElements[r]
            : !0
      }
      ComputeDiff(t) {
        return this._ComputeDiff(
          0,
          this._originalElementsOrHash.length - 1,
          0,
          this._modifiedElementsOrHash.length - 1,
          t,
        )
      }
      _ComputeDiff(t, r, n, i, s) {
        const a = [!1]
        let o = this.ComputeDiffRecursive(t, r, n, i, a)
        return s && (o = this.PrettifyChanges(o)), { quitEarly: a[0], changes: o }
      }
      ComputeDiffRecursive(t, r, n, i, s) {
        for (s[0] = !1; t <= r && n <= i && this.ElementsAreEqual(t, n); ) t++, n++
        for (; r >= t && i >= n && this.ElementsAreEqual(r, i); ) r--, i--
        if (t > r || n > i) {
          let f
          return (
            n <= i
              ? (At.Assert(t === r + 1, 'originalStart should only be one more than originalEnd'),
                (f = [new rt(t, 0, n, i - n + 1)]))
              : t <= r
                ? (At.Assert(n === i + 1, 'modifiedStart should only be one more than modifiedEnd'),
                  (f = [new rt(t, r - t + 1, n, 0)]))
                : (At.Assert(t === r + 1, 'originalStart should only be one more than originalEnd'),
                  At.Assert(n === i + 1, 'modifiedStart should only be one more than modifiedEnd'),
                  (f = [])),
            f
          )
        }
        const a = [0],
          o = [0],
          l = this.ComputeRecursionPoint(t, r, n, i, a, o, s),
          u = a[0],
          c = o[0]
        if (l !== null) return l
        if (!s[0]) {
          const f = this.ComputeDiffRecursive(t, u, n, c, s)
          let d = []
          return (
            s[0]
              ? (d = [new rt(u + 1, r - (u + 1) + 1, c + 1, i - (c + 1) + 1)])
              : (d = this.ComputeDiffRecursive(u + 1, r, c + 1, i, s)),
            this.ConcatenateChanges(f, d)
          )
        }
        return [new rt(t, r - t + 1, n, i - n + 1)]
      }
      WALKTRACE(t, r, n, i, s, a, o, l, u, c, f, d, g, p, b, m, v, _) {
        let y = null,
          E = null,
          M = new Di(),
          D = r,
          C = n,
          k = g[0] - m[0] - i,
          x = -1073741824,
          w = this.m_forwardHistory.length - 1
        do {
          const A = k + t
          A === D || (A < C && u[A - 1] < u[A + 1])
            ? ((f = u[A + 1]),
              (p = f - k - i),
              f < x && M.MarkNextChange(),
              (x = f),
              M.AddModifiedElement(f + 1, p),
              (k = A + 1 - t))
            : ((f = u[A - 1] + 1),
              (p = f - k - i),
              f < x && M.MarkNextChange(),
              (x = f - 1),
              M.AddOriginalElement(f, p + 1),
              (k = A - 1 - t)),
            w >= 0 && ((u = this.m_forwardHistory[w]), (t = u[0]), (D = 1), (C = u.length - 1))
        } while (--w >= -1)
        if (((y = M.getReverseChanges()), _[0])) {
          let A = g[0] + 1,
            S = m[0] + 1
          if (y !== null && y.length > 0) {
            const P = y[y.length - 1]
            ;(A = Math.max(A, P.getOriginalEnd())), (S = Math.max(S, P.getModifiedEnd()))
          }
          E = [new rt(A, d - A + 1, S, b - S + 1)]
        } else {
          ;(M = new Di()),
            (D = a),
            (C = o),
            (k = g[0] - m[0] - l),
            (x = 1073741824),
            (w = v ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2)
          do {
            const A = k + s
            A === D || (A < C && c[A - 1] >= c[A + 1])
              ? ((f = c[A + 1] - 1),
                (p = f - k - l),
                f > x && M.MarkNextChange(),
                (x = f + 1),
                M.AddOriginalElement(f + 1, p + 1),
                (k = A + 1 - s))
              : ((f = c[A - 1]),
                (p = f - k - l),
                f > x && M.MarkNextChange(),
                (x = f),
                M.AddModifiedElement(f + 1, p + 1),
                (k = A - 1 - s)),
              w >= 0 && ((c = this.m_reverseHistory[w]), (s = c[0]), (D = 1), (C = c.length - 1))
          } while (--w >= -1)
          E = M.getChanges()
        }
        return this.ConcatenateChanges(y, E)
      }
      ComputeRecursionPoint(t, r, n, i, s, a, o) {
        let l = 0,
          u = 0,
          c = 0,
          f = 0,
          d = 0,
          g = 0
        t--, n--, (s[0] = 0), (a[0] = 0), (this.m_forwardHistory = []), (this.m_reverseHistory = [])
        const p = r - t + (i - n),
          b = p + 1,
          m = new Int32Array(b),
          v = new Int32Array(b),
          _ = i - n,
          y = r - t,
          E = t - n,
          M = r - i,
          C = (y - _) % 2 === 0
        ;(m[_] = t), (v[y] = r), (o[0] = !1)
        for (let k = 1; k <= p / 2 + 1; k++) {
          let x = 0,
            w = 0
          ;(c = this.ClipDiagonalBound(_ - k, k, _, b)), (f = this.ClipDiagonalBound(_ + k, k, _, b))
          for (let S = c; S <= f; S += 2) {
            S === c || (S < f && m[S - 1] < m[S + 1]) ? (l = m[S + 1]) : (l = m[S - 1] + 1), (u = l - (S - _) - E)
            const P = l
            for (; l < r && u < i && this.ElementsAreEqual(l + 1, u + 1); ) l++, u++
            if (((m[S] = l), l + u > x + w && ((x = l), (w = u)), !C && Math.abs(S - y) <= k - 1 && l >= v[S]))
              return (
                (s[0] = l),
                (a[0] = u),
                P <= v[S] && 1447 > 0 && k <= 1447 + 1
                  ? this.WALKTRACE(_, c, f, E, y, d, g, M, m, v, l, r, s, u, i, a, C, o)
                  : null
              )
          }
          const A = (x - t + (w - n) - k) / 2
          if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(x, A))
            return (
              (o[0] = !0),
              (s[0] = x),
              (a[0] = w),
              A > 0 && 1447 > 0 && k <= 1447 + 1
                ? this.WALKTRACE(_, c, f, E, y, d, g, M, m, v, l, r, s, u, i, a, C, o)
                : (t++, n++, [new rt(t, r - t + 1, n, i - n + 1)])
            )
          ;(d = this.ClipDiagonalBound(y - k, k, y, b)), (g = this.ClipDiagonalBound(y + k, k, y, b))
          for (let S = d; S <= g; S += 2) {
            S === d || (S < g && v[S - 1] >= v[S + 1]) ? (l = v[S + 1] - 1) : (l = v[S - 1]), (u = l - (S - y) - M)
            const P = l
            for (; l > t && u > n && this.ElementsAreEqual(l, u); ) l--, u--
            if (((v[S] = l), C && Math.abs(S - _) <= k && l <= m[S]))
              return (
                (s[0] = l),
                (a[0] = u),
                P >= m[S] && 1447 > 0 && k <= 1447 + 1
                  ? this.WALKTRACE(_, c, f, E, y, d, g, M, m, v, l, r, s, u, i, a, C, o)
                  : null
              )
          }
          if (k <= 1447) {
            let S = new Int32Array(f - c + 2)
            ;(S[0] = _ - c + 1),
              Lt.Copy2(m, c, S, 1, f - c + 1),
              this.m_forwardHistory.push(S),
              (S = new Int32Array(g - d + 2)),
              (S[0] = y - d + 1),
              Lt.Copy2(v, d, S, 1, g - d + 1),
              this.m_reverseHistory.push(S)
          }
        }
        return this.WALKTRACE(_, c, f, E, y, d, g, M, m, v, l, r, s, u, i, a, C, o)
      }
      PrettifyChanges(t) {
        for (let r = 0; r < t.length; r++) {
          const n = t[r],
            i = r < t.length - 1 ? t[r + 1].originalStart : this._originalElementsOrHash.length,
            s = r < t.length - 1 ? t[r + 1].modifiedStart : this._modifiedElementsOrHash.length,
            a = n.originalLength > 0,
            o = n.modifiedLength > 0
          for (
            ;
            n.originalStart + n.originalLength < i &&
            n.modifiedStart + n.modifiedLength < s &&
            (!a || this.OriginalElementsAreEqual(n.originalStart, n.originalStart + n.originalLength)) &&
            (!o || this.ModifiedElementsAreEqual(n.modifiedStart, n.modifiedStart + n.modifiedLength));

          ) {
            const u = this.ElementsAreStrictEqual(n.originalStart, n.modifiedStart)
            if (
              this.ElementsAreStrictEqual(n.originalStart + n.originalLength, n.modifiedStart + n.modifiedLength) &&
              !u
            )
              break
            n.originalStart++, n.modifiedStart++
          }
          const l = [null]
          if (r < t.length - 1 && this.ChangesOverlap(t[r], t[r + 1], l)) {
            ;(t[r] = l[0]), t.splice(r + 1, 1), r--
            continue
          }
        }
        for (let r = t.length - 1; r >= 0; r--) {
          const n = t[r]
          let i = 0,
            s = 0
          if (r > 0) {
            const f = t[r - 1]
            ;(i = f.originalStart + f.originalLength), (s = f.modifiedStart + f.modifiedLength)
          }
          const a = n.originalLength > 0,
            o = n.modifiedLength > 0
          let l = 0,
            u = this._boundaryScore(n.originalStart, n.originalLength, n.modifiedStart, n.modifiedLength)
          for (let f = 1; ; f++) {
            const d = n.originalStart - f,
              g = n.modifiedStart - f
            if (
              d < i ||
              g < s ||
              (a && !this.OriginalElementsAreEqual(d, d + n.originalLength)) ||
              (o && !this.ModifiedElementsAreEqual(g, g + n.modifiedLength))
            )
              break
            const b = (d === i && g === s ? 5 : 0) + this._boundaryScore(d, n.originalLength, g, n.modifiedLength)
            b > u && ((u = b), (l = f))
          }
          ;(n.originalStart -= l), (n.modifiedStart -= l)
          const c = [null]
          if (r > 0 && this.ChangesOverlap(t[r - 1], t[r], c)) {
            ;(t[r - 1] = c[0]), t.splice(r, 1), r++
            continue
          }
        }
        if (this._hasStrings)
          for (let r = 1, n = t.length; r < n; r++) {
            const i = t[r - 1],
              s = t[r],
              a = s.originalStart - i.originalStart - i.originalLength,
              o = i.originalStart,
              l = s.originalStart + s.originalLength,
              u = l - o,
              c = i.modifiedStart,
              f = s.modifiedStart + s.modifiedLength,
              d = f - c
            if (a < 5 && u < 20 && d < 20) {
              const g = this._findBetterContiguousSequence(o, u, c, d, a)
              if (g) {
                const [p, b] = g
                ;(p !== i.originalStart + i.originalLength || b !== i.modifiedStart + i.modifiedLength) &&
                  ((i.originalLength = p - i.originalStart),
                  (i.modifiedLength = b - i.modifiedStart),
                  (s.originalStart = p + a),
                  (s.modifiedStart = b + a),
                  (s.originalLength = l - s.originalStart),
                  (s.modifiedLength = f - s.modifiedStart))
              }
            }
          }
        return t
      }
      _findBetterContiguousSequence(t, r, n, i, s) {
        if (r < s || i < s) return null
        const a = t + r - s + 1,
          o = n + i - s + 1
        let l = 0,
          u = 0,
          c = 0
        for (let f = t; f < a; f++)
          for (let d = n; d < o; d++) {
            const g = this._contiguousSequenceScore(f, d, s)
            g > 0 && g > l && ((l = g), (u = f), (c = d))
          }
        return l > 0 ? [u, c] : null
      }
      _contiguousSequenceScore(t, r, n) {
        let i = 0
        for (let s = 0; s < n; s++) {
          if (!this.ElementsAreEqual(t + s, r + s)) return 0
          i += this._originalStringElements[t + s].length
        }
        return i
      }
      _OriginalIsBoundary(t) {
        return t <= 0 || t >= this._originalElementsOrHash.length - 1
          ? !0
          : this._hasStrings && /^\s*$/.test(this._originalStringElements[t])
      }
      _OriginalRegionIsBoundary(t, r) {
        if (this._OriginalIsBoundary(t) || this._OriginalIsBoundary(t - 1)) return !0
        if (r > 0) {
          const n = t + r
          if (this._OriginalIsBoundary(n - 1) || this._OriginalIsBoundary(n)) return !0
        }
        return !1
      }
      _ModifiedIsBoundary(t) {
        return t <= 0 || t >= this._modifiedElementsOrHash.length - 1
          ? !0
          : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[t])
      }
      _ModifiedRegionIsBoundary(t, r) {
        if (this._ModifiedIsBoundary(t) || this._ModifiedIsBoundary(t - 1)) return !0
        if (r > 0) {
          const n = t + r
          if (this._ModifiedIsBoundary(n - 1) || this._ModifiedIsBoundary(n)) return !0
        }
        return !1
      }
      _boundaryScore(t, r, n, i) {
        const s = this._OriginalRegionIsBoundary(t, r) ? 1 : 0,
          a = this._ModifiedRegionIsBoundary(n, i) ? 1 : 0
        return s + a
      }
      ConcatenateChanges(t, r) {
        const n = []
        if (t.length === 0 || r.length === 0) return r.length > 0 ? r : t
        if (this.ChangesOverlap(t[t.length - 1], r[0], n)) {
          const i = new Array(t.length + r.length - 1)
          return (
            Lt.Copy(t, 0, i, 0, t.length - 1), (i[t.length - 1] = n[0]), Lt.Copy(r, 1, i, t.length, r.length - 1), i
          )
        } else {
          const i = new Array(t.length + r.length)
          return Lt.Copy(t, 0, i, 0, t.length), Lt.Copy(r, 0, i, t.length, r.length), i
        }
      }
      ChangesOverlap(t, r, n) {
        if (
          (At.Assert(t.originalStart <= r.originalStart, 'Left change is not less than or equal to right change'),
          At.Assert(t.modifiedStart <= r.modifiedStart, 'Left change is not less than or equal to right change'),
          t.originalStart + t.originalLength >= r.originalStart ||
            t.modifiedStart + t.modifiedLength >= r.modifiedStart)
        ) {
          const i = t.originalStart
          let s = t.originalLength
          const a = t.modifiedStart
          let o = t.modifiedLength
          return (
            t.originalStart + t.originalLength >= r.originalStart &&
              (s = r.originalStart + r.originalLength - t.originalStart),
            t.modifiedStart + t.modifiedLength >= r.modifiedStart &&
              (o = r.modifiedStart + r.modifiedLength - t.modifiedStart),
            (n[0] = new rt(i, s, a, o)),
            !0
          )
        } else return (n[0] = null), !1
      }
      ClipDiagonalBound(t, r, n, i) {
        if (t >= 0 && t < i) return t
        const s = n,
          a = i - n - 1,
          o = r % 2 === 0
        if (t < 0) {
          const l = s % 2 === 0
          return o === l ? 0 : 1
        } else {
          const l = a % 2 === 0
          return o === l ? i - 1 : i - 2
        }
      }
    }
    var yr = ie(224)
    let Ct
    if (typeof ae.vscode != 'undefined' && typeof ae.vscode.process != 'undefined') {
      const e = ae.vscode.process
      Ct = {
        get platform() {
          return e.platform
        },
        get arch() {
          return e.arch
        },
        get env() {
          return e.env
        },
        cwd() {
          return e.cwd()
        },
      }
    } else
      typeof yr != 'undefined'
        ? (Ct = {
            get platform() {
              return yr.platform
            },
            get arch() {
              return yr.arch
            },
            get env() {
              return { NODE_ENV: 'production', PUBLIC_PATH: '/pro-components/' }
            },
            cwd() {
              return { NODE_ENV: 'production', PUBLIC_PATH: '/pro-components/' }.VSCODE_CWD || yr.cwd()
            },
          })
        : (Ct = {
            get platform() {
              return Ut ? 'win32' : ya ? 'darwin' : 'linux'
            },
            get arch() {},
            get env() {
              return {}
            },
            cwd() {
              return '/'
            },
          })
    const _r = Ct.cwd,
      H0 = Ct.env,
      oo = Ct.platform,
      lo = 65,
      uo = 97,
      co = 90,
      fo = 122,
      it = 46,
      se = 47,
      pe = 92,
      st = 58,
      ho = 63
    class Ii extends Error {
      constructor(t, r, n) {
        let i
        typeof r == 'string' && r.indexOf('not ') === 0
          ? ((i = 'must not be'), (r = r.replace(/^not /, '')))
          : (i = 'must be')
        const s = t.indexOf('.') !== -1 ? 'property' : 'argument'
        let a = `The "${t}" ${s} ${i} of type ${r}`
        ;(a += `. Received type ${typeof n}`), super(a), (this.code = 'ERR_INVALID_ARG_TYPE')
      }
    }
    function go(e, t) {
      if (e === null || typeof e != 'object') throw new Ii(t, 'Object', e)
    }
    function ee(e, t) {
      if (typeof e != 'string') throw new Ii(t, 'string', e)
    }
    const at = oo === 'win32'
    function $(e) {
      return e === se || e === pe
    }
    function ln(e) {
      return e === se
    }
    function ot(e) {
      return (e >= lo && e <= co) || (e >= uo && e <= fo)
    }
    function xr(e, t, r, n) {
      let i = '',
        s = 0,
        a = -1,
        o = 0,
        l = 0
      for (let u = 0; u <= e.length; ++u) {
        if (u < e.length) l = e.charCodeAt(u)
        else {
          if (n(l)) break
          l = se
        }
        if (n(l)) {
          if (!(a === u - 1 || o === 1))
            if (o === 2) {
              if (i.length < 2 || s !== 2 || i.charCodeAt(i.length - 1) !== it || i.charCodeAt(i.length - 2) !== it) {
                if (i.length > 2) {
                  const c = i.lastIndexOf(r)
                  c === -1 ? ((i = ''), (s = 0)) : ((i = i.slice(0, c)), (s = i.length - 1 - i.lastIndexOf(r))),
                    (a = u),
                    (o = 0)
                  continue
                } else if (i.length !== 0) {
                  ;(i = ''), (s = 0), (a = u), (o = 0)
                  continue
                }
              }
              t && ((i += i.length > 0 ? `${r}..` : '..'), (s = 2))
            } else i.length > 0 ? (i += `${r}${e.slice(a + 1, u)}`) : (i = e.slice(a + 1, u)), (s = u - a - 1)
          ;(a = u), (o = 0)
        } else l === it && o !== -1 ? ++o : (o = -1)
      }
      return i
    }
    function Ri(e, t) {
      go(t, 'pathObject')
      const r = t.dir || t.root,
        n = t.base || `${t.name || ''}${t.ext || ''}`
      return r ? (r === t.root ? `${r}${n}` : `${r}${e}${n}`) : n
    }
    const he = {
        resolve(...e) {
          let t = '',
            r = '',
            n = !1
          for (let i = e.length - 1; i >= -1; i--) {
            let s
            if (i >= 0) {
              if (((s = e[i]), ee(s, 'path'), s.length === 0)) continue
            } else
              t.length === 0
                ? (s = _r())
                : ((s = { NODE_ENV: 'production', PUBLIC_PATH: '/pro-components/' }[`=${t}`] || _r()),
                  (s === void 0 || (s.slice(0, 2).toLowerCase() !== t.toLowerCase() && s.charCodeAt(2) === pe)) &&
                    (s = `${t}\\`))
            const a = s.length
            let o = 0,
              l = '',
              u = !1
            const c = s.charCodeAt(0)
            if (a === 1) $(c) && ((o = 1), (u = !0))
            else if ($(c))
              if (((u = !0), $(s.charCodeAt(1)))) {
                let f = 2,
                  d = f
                for (; f < a && !$(s.charCodeAt(f)); ) f++
                if (f < a && f !== d) {
                  const g = s.slice(d, f)
                  for (d = f; f < a && $(s.charCodeAt(f)); ) f++
                  if (f < a && f !== d) {
                    for (d = f; f < a && !$(s.charCodeAt(f)); ) f++
                    ;(f === a || f !== d) && ((l = `\\\\${g}\\${s.slice(d, f)}`), (o = f))
                  }
                }
              } else o = 1
            else
              ot(c) &&
                s.charCodeAt(1) === st &&
                ((l = s.slice(0, 2)), (o = 2), a > 2 && $(s.charCodeAt(2)) && ((u = !0), (o = 3)))
            if (l.length > 0)
              if (t.length > 0) {
                if (l.toLowerCase() !== t.toLowerCase()) continue
              } else t = l
            if (n) {
              if (t.length > 0) break
            } else if (((r = `${s.slice(o)}\\${r}`), (n = u), u && t.length > 0)) break
          }
          return (r = xr(r, !n, '\\', $)), n ? `${t}\\${r}` : `${t}${r}` || '.'
        },
        normalize(e) {
          ee(e, 'path')
          const t = e.length
          if (t === 0) return '.'
          let r = 0,
            n,
            i = !1
          const s = e.charCodeAt(0)
          if (t === 1) return ln(s) ? '\\' : e
          if ($(s))
            if (((i = !0), $(e.charCodeAt(1)))) {
              let o = 2,
                l = o
              for (; o < t && !$(e.charCodeAt(o)); ) o++
              if (o < t && o !== l) {
                const u = e.slice(l, o)
                for (l = o; o < t && $(e.charCodeAt(o)); ) o++
                if (o < t && o !== l) {
                  for (l = o; o < t && !$(e.charCodeAt(o)); ) o++
                  if (o === t) return `\\\\${u}\\${e.slice(l)}\\`
                  o !== l && ((n = `\\\\${u}\\${e.slice(l, o)}`), (r = o))
                }
              }
            } else r = 1
          else
            ot(s) &&
              e.charCodeAt(1) === st &&
              ((n = e.slice(0, 2)), (r = 2), t > 2 && $(e.charCodeAt(2)) && ((i = !0), (r = 3)))
          let a = r < t ? xr(e.slice(r), !i, '\\', $) : ''
          return (
            a.length === 0 && !i && (a = '.'),
            a.length > 0 && $(e.charCodeAt(t - 1)) && (a += '\\'),
            n === void 0 ? (i ? `\\${a}` : a) : i ? `${n}\\${a}` : `${n}${a}`
          )
        },
        isAbsolute(e) {
          ee(e, 'path')
          const t = e.length
          if (t === 0) return !1
          const r = e.charCodeAt(0)
          return $(r) || (t > 2 && ot(r) && e.charCodeAt(1) === st && $(e.charCodeAt(2)))
        },
        join(...e) {
          if (e.length === 0) return '.'
          let t, r
          for (let s = 0; s < e.length; ++s) {
            const a = e[s]
            ee(a, 'path'), a.length > 0 && (t === void 0 ? (t = r = a) : (t += `\\${a}`))
          }
          if (t === void 0) return '.'
          let n = !0,
            i = 0
          if (typeof r == 'string' && $(r.charCodeAt(0))) {
            ++i
            const s = r.length
            s > 1 && $(r.charCodeAt(1)) && (++i, s > 2 && ($(r.charCodeAt(2)) ? ++i : (n = !1)))
          }
          if (n) {
            for (; i < t.length && $(t.charCodeAt(i)); ) i++
            i >= 2 && (t = `\\${t.slice(i)}`)
          }
          return he.normalize(t)
        },
        relative(e, t) {
          if ((ee(e, 'from'), ee(t, 'to'), e === t)) return ''
          const r = he.resolve(e),
            n = he.resolve(t)
          if (r === n || ((e = r.toLowerCase()), (t = n.toLowerCase()), e === t)) return ''
          let i = 0
          for (; i < e.length && e.charCodeAt(i) === pe; ) i++
          let s = e.length
          for (; s - 1 > i && e.charCodeAt(s - 1) === pe; ) s--
          const a = s - i
          let o = 0
          for (; o < t.length && t.charCodeAt(o) === pe; ) o++
          let l = t.length
          for (; l - 1 > o && t.charCodeAt(l - 1) === pe; ) l--
          const u = l - o,
            c = a < u ? a : u
          let f = -1,
            d = 0
          for (; d < c; d++) {
            const p = e.charCodeAt(i + d)
            if (p !== t.charCodeAt(o + d)) break
            p === pe && (f = d)
          }
          if (d !== c) {
            if (f === -1) return n
          } else {
            if (u > c) {
              if (t.charCodeAt(o + d) === pe) return n.slice(o + d + 1)
              if (d === 2) return n.slice(o + d)
            }
            a > c && (e.charCodeAt(i + d) === pe ? (f = d) : d === 2 && (f = 3)), f === -1 && (f = 0)
          }
          let g = ''
          for (d = i + f + 1; d <= s; ++d) (d === s || e.charCodeAt(d) === pe) && (g += g.length === 0 ? '..' : '\\..')
          return (o += f), g.length > 0 ? `${g}${n.slice(o, l)}` : (n.charCodeAt(o) === pe && ++o, n.slice(o, l))
        },
        toNamespacedPath(e) {
          if (typeof e != 'string' || e.length === 0) return e
          const t = he.resolve(e)
          if (t.length <= 2) return e
          if (t.charCodeAt(0) === pe) {
            if (t.charCodeAt(1) === pe) {
              const r = t.charCodeAt(2)
              if (r !== ho && r !== it) return `\\\\?\\UNC\\${t.slice(2)}`
            }
          } else if (ot(t.charCodeAt(0)) && t.charCodeAt(1) === st && t.charCodeAt(2) === pe) return `\\\\?\\${t}`
          return e
        },
        dirname(e) {
          ee(e, 'path')
          const t = e.length
          if (t === 0) return '.'
          let r = -1,
            n = 0
          const i = e.charCodeAt(0)
          if (t === 1) return $(i) ? e : '.'
          if ($(i)) {
            if (((r = n = 1), $(e.charCodeAt(1)))) {
              let o = 2,
                l = o
              for (; o < t && !$(e.charCodeAt(o)); ) o++
              if (o < t && o !== l) {
                for (l = o; o < t && $(e.charCodeAt(o)); ) o++
                if (o < t && o !== l) {
                  for (l = o; o < t && !$(e.charCodeAt(o)); ) o++
                  if (o === t) return e
                  o !== l && (r = n = o + 1)
                }
              }
            }
          } else ot(i) && e.charCodeAt(1) === st && ((r = t > 2 && $(e.charCodeAt(2)) ? 3 : 2), (n = r))
          let s = -1,
            a = !0
          for (let o = t - 1; o >= n; --o)
            if ($(e.charCodeAt(o))) {
              if (!a) {
                s = o
                break
              }
            } else a = !1
          if (s === -1) {
            if (r === -1) return '.'
            s = r
          }
          return e.slice(0, s)
        },
        basename(e, t) {
          t !== void 0 && ee(t, 'ext'), ee(e, 'path')
          let r = 0,
            n = -1,
            i = !0,
            s
          if (
            (e.length >= 2 && ot(e.charCodeAt(0)) && e.charCodeAt(1) === st && (r = 2),
            t !== void 0 && t.length > 0 && t.length <= e.length)
          ) {
            if (t === e) return ''
            let a = t.length - 1,
              o = -1
            for (s = e.length - 1; s >= r; --s) {
              const l = e.charCodeAt(s)
              if ($(l)) {
                if (!i) {
                  r = s + 1
                  break
                }
              } else
                o === -1 && ((i = !1), (o = s + 1)),
                  a >= 0 && (l === t.charCodeAt(a) ? --a === -1 && (n = s) : ((a = -1), (n = o)))
            }
            return r === n ? (n = o) : n === -1 && (n = e.length), e.slice(r, n)
          }
          for (s = e.length - 1; s >= r; --s)
            if ($(e.charCodeAt(s))) {
              if (!i) {
                r = s + 1
                break
              }
            } else n === -1 && ((i = !1), (n = s + 1))
          return n === -1 ? '' : e.slice(r, n)
        },
        extname(e) {
          ee(e, 'path')
          let t = 0,
            r = -1,
            n = 0,
            i = -1,
            s = !0,
            a = 0
          e.length >= 2 && e.charCodeAt(1) === st && ot(e.charCodeAt(0)) && (t = n = 2)
          for (let o = e.length - 1; o >= t; --o) {
            const l = e.charCodeAt(o)
            if ($(l)) {
              if (!s) {
                n = o + 1
                break
              }
              continue
            }
            i === -1 && ((s = !1), (i = o + 1)),
              l === it ? (r === -1 ? (r = o) : a !== 1 && (a = 1)) : r !== -1 && (a = -1)
          }
          return r === -1 || i === -1 || a === 0 || (a === 1 && r === i - 1 && r === n + 1) ? '' : e.slice(r, i)
        },
        format: Ri.bind(null, '\\'),
        parse(e) {
          ee(e, 'path')
          const t = { root: '', dir: '', base: '', ext: '', name: '' }
          if (e.length === 0) return t
          const r = e.length
          let n = 0,
            i = e.charCodeAt(0)
          if (r === 1) return $(i) ? ((t.root = t.dir = e), t) : ((t.base = t.name = e), t)
          if ($(i)) {
            if (((n = 1), $(e.charCodeAt(1)))) {
              let f = 2,
                d = f
              for (; f < r && !$(e.charCodeAt(f)); ) f++
              if (f < r && f !== d) {
                for (d = f; f < r && $(e.charCodeAt(f)); ) f++
                if (f < r && f !== d) {
                  for (d = f; f < r && !$(e.charCodeAt(f)); ) f++
                  f === r ? (n = f) : f !== d && (n = f + 1)
                }
              }
            }
          } else if (ot(i) && e.charCodeAt(1) === st) {
            if (r <= 2) return (t.root = t.dir = e), t
            if (((n = 2), $(e.charCodeAt(2)))) {
              if (r === 3) return (t.root = t.dir = e), t
              n = 3
            }
          }
          n > 0 && (t.root = e.slice(0, n))
          let s = -1,
            a = n,
            o = -1,
            l = !0,
            u = e.length - 1,
            c = 0
          for (; u >= n; --u) {
            if (((i = e.charCodeAt(u)), $(i))) {
              if (!l) {
                a = u + 1
                break
              }
              continue
            }
            o === -1 && ((l = !1), (o = u + 1)),
              i === it ? (s === -1 ? (s = u) : c !== 1 && (c = 1)) : s !== -1 && (c = -1)
          }
          return (
            o !== -1 &&
              (s === -1 || c === 0 || (c === 1 && s === o - 1 && s === a + 1)
                ? (t.base = t.name = e.slice(a, o))
                : ((t.name = e.slice(a, s)), (t.base = e.slice(a, o)), (t.ext = e.slice(s, o)))),
            a > 0 && a !== n ? (t.dir = e.slice(0, a - 1)) : (t.dir = t.root),
            t
          )
        },
        sep: '\\',
        delimiter: ';',
        win32: null,
        posix: null,
      },
      mo = (() => {
        if (at) {
          const e = /\\/g
          return () => {
            const t = _r().replace(e, '/')
            return t.slice(t.indexOf('/'))
          }
        }
        return () => _r()
      })(),
      ve = {
        resolve(...e) {
          let t = '',
            r = !1
          for (let n = e.length - 1; n >= -1 && !r; n--) {
            const i = n >= 0 ? e[n] : mo()
            ee(i, 'path'), i.length !== 0 && ((t = `${i}/${t}`), (r = i.charCodeAt(0) === se))
          }
          return (t = xr(t, !r, '/', ln)), r ? `/${t}` : t.length > 0 ? t : '.'
        },
        normalize(e) {
          if ((ee(e, 'path'), e.length === 0)) return '.'
          const t = e.charCodeAt(0) === se,
            r = e.charCodeAt(e.length - 1) === se
          return (
            (e = xr(e, !t, '/', ln)), e.length === 0 ? (t ? '/' : r ? './' : '.') : (r && (e += '/'), t ? `/${e}` : e)
          )
        },
        isAbsolute(e) {
          return ee(e, 'path'), e.length > 0 && e.charCodeAt(0) === se
        },
        join(...e) {
          if (e.length === 0) return '.'
          let t
          for (let r = 0; r < e.length; ++r) {
            const n = e[r]
            ee(n, 'path'), n.length > 0 && (t === void 0 ? (t = n) : (t += `/${n}`))
          }
          return t === void 0 ? '.' : ve.normalize(t)
        },
        relative(e, t) {
          if ((ee(e, 'from'), ee(t, 'to'), e === t || ((e = ve.resolve(e)), (t = ve.resolve(t)), e === t))) return ''
          const r = 1,
            n = e.length,
            i = n - r,
            s = 1,
            a = t.length - s,
            o = i < a ? i : a
          let l = -1,
            u = 0
          for (; u < o; u++) {
            const f = e.charCodeAt(r + u)
            if (f !== t.charCodeAt(s + u)) break
            f === se && (l = u)
          }
          if (u === o)
            if (a > o) {
              if (t.charCodeAt(s + u) === se) return t.slice(s + u + 1)
              if (u === 0) return t.slice(s + u)
            } else i > o && (e.charCodeAt(r + u) === se ? (l = u) : u === 0 && (l = 0))
          let c = ''
          for (u = r + l + 1; u <= n; ++u) (u === n || e.charCodeAt(u) === se) && (c += c.length === 0 ? '..' : '/..')
          return `${c}${t.slice(s + l)}`
        },
        toNamespacedPath(e) {
          return e
        },
        dirname(e) {
          if ((ee(e, 'path'), e.length === 0)) return '.'
          const t = e.charCodeAt(0) === se
          let r = -1,
            n = !0
          for (let i = e.length - 1; i >= 1; --i)
            if (e.charCodeAt(i) === se) {
              if (!n) {
                r = i
                break
              }
            } else n = !1
          return r === -1 ? (t ? '/' : '.') : t && r === 1 ? '//' : e.slice(0, r)
        },
        basename(e, t) {
          t !== void 0 && ee(t, 'ext'), ee(e, 'path')
          let r = 0,
            n = -1,
            i = !0,
            s
          if (t !== void 0 && t.length > 0 && t.length <= e.length) {
            if (t === e) return ''
            let a = t.length - 1,
              o = -1
            for (s = e.length - 1; s >= 0; --s) {
              const l = e.charCodeAt(s)
              if (l === se) {
                if (!i) {
                  r = s + 1
                  break
                }
              } else
                o === -1 && ((i = !1), (o = s + 1)),
                  a >= 0 && (l === t.charCodeAt(a) ? --a === -1 && (n = s) : ((a = -1), (n = o)))
            }
            return r === n ? (n = o) : n === -1 && (n = e.length), e.slice(r, n)
          }
          for (s = e.length - 1; s >= 0; --s)
            if (e.charCodeAt(s) === se) {
              if (!i) {
                r = s + 1
                break
              }
            } else n === -1 && ((i = !1), (n = s + 1))
          return n === -1 ? '' : e.slice(r, n)
        },
        extname(e) {
          ee(e, 'path')
          let t = -1,
            r = 0,
            n = -1,
            i = !0,
            s = 0
          for (let a = e.length - 1; a >= 0; --a) {
            const o = e.charCodeAt(a)
            if (o === se) {
              if (!i) {
                r = a + 1
                break
              }
              continue
            }
            n === -1 && ((i = !1), (n = a + 1)),
              o === it ? (t === -1 ? (t = a) : s !== 1 && (s = 1)) : t !== -1 && (s = -1)
          }
          return t === -1 || n === -1 || s === 0 || (s === 1 && t === n - 1 && t === r + 1) ? '' : e.slice(t, n)
        },
        format: Ri.bind(null, '/'),
        parse(e) {
          ee(e, 'path')
          const t = { root: '', dir: '', base: '', ext: '', name: '' }
          if (e.length === 0) return t
          const r = e.charCodeAt(0) === se
          let n
          r ? ((t.root = '/'), (n = 1)) : (n = 0)
          let i = -1,
            s = 0,
            a = -1,
            o = !0,
            l = e.length - 1,
            u = 0
          for (; l >= n; --l) {
            const c = e.charCodeAt(l)
            if (c === se) {
              if (!o) {
                s = l + 1
                break
              }
              continue
            }
            a === -1 && ((o = !1), (a = l + 1)),
              c === it ? (i === -1 ? (i = l) : u !== 1 && (u = 1)) : i !== -1 && (u = -1)
          }
          if (a !== -1) {
            const c = s === 0 && r ? 1 : s
            i === -1 || u === 0 || (u === 1 && i === a - 1 && i === s + 1)
              ? (t.base = t.name = e.slice(c, a))
              : ((t.name = e.slice(c, i)), (t.base = e.slice(c, a)), (t.ext = e.slice(i, a)))
          }
          return s > 0 ? (t.dir = e.slice(0, s - 1)) : r && (t.dir = '/'), t
        },
        sep: '/',
        delimiter: ':',
        win32: null,
        posix: null,
      }
    ;(ve.win32 = he.win32 = he), (ve.posix = he.posix = ve)
    const z0 = at ? he.normalize : ve.normalize,
      G0 = at ? he.resolve : ve.resolve,
      J0 = at ? he.relative : ve.relative,
      Q0 = at ? he.dirname : ve.dirname,
      X0 = at ? he.basename : ve.basename,
      Z0 = at ? he.extname : ve.extname,
      Y0 = at ? he.sep : ve.sep,
      po = /^\w[\w\d+.-]*$/,
      vo = /^\//,
      bo = /^\/\//
    function Oi(e, t) {
      if (!e.scheme && t)
        throw new Error(
          `[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`,
        )
      if (e.scheme && !po.test(e.scheme)) throw new Error('[UriError]: Scheme contains illegal characters.')
      if (e.path) {
        if (e.authority) {
          if (!vo.test(e.path))
            throw new Error(
              '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character',
            )
        } else if (bo.test(e.path))
          throw new Error(
            '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")',
          )
      }
    }
    function yo(e, t) {
      return !e && !t ? 'file' : e
    }
    function _o(e, t) {
      switch (e) {
        case 'https':
        case 'http':
        case 'file':
          t ? t[0] !== De && (t = De + t) : (t = De)
          break
      }
      return t
    }
    const Z = '',
      De = '/',
      xo = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
    class gt {
      static isUri(t) {
        return t instanceof gt
          ? !0
          : t
            ? typeof t.authority == 'string' &&
              typeof t.fragment == 'string' &&
              typeof t.path == 'string' &&
              typeof t.query == 'string' &&
              typeof t.scheme == 'string' &&
              typeof t.fsPath == 'string' &&
              typeof t.with == 'function' &&
              typeof t.toString == 'function'
            : !1
      }
      constructor(t, r, n, i, s, a = !1) {
        typeof t == 'object'
          ? ((this.scheme = t.scheme || Z),
            (this.authority = t.authority || Z),
            (this.path = t.path || Z),
            (this.query = t.query || Z),
            (this.fragment = t.fragment || Z))
          : ((this.scheme = yo(t, a)),
            (this.authority = r || Z),
            (this.path = _o(this.scheme, n || Z)),
            (this.query = i || Z),
            (this.fragment = s || Z),
            Oi(this, a))
      }
      get fsPath() {
        return un(this, !1)
      }
      with(t) {
        if (!t) return this
        let { scheme: r, authority: n, path: i, query: s, fragment: a } = t
        return (
          r === void 0 ? (r = this.scheme) : r === null && (r = Z),
          n === void 0 ? (n = this.authority) : n === null && (n = Z),
          i === void 0 ? (i = this.path) : i === null && (i = Z),
          s === void 0 ? (s = this.query) : s === null && (s = Z),
          a === void 0 ? (a = this.fragment) : a === null && (a = Z),
          r === this.scheme && n === this.authority && i === this.path && s === this.query && a === this.fragment
            ? this
            : new Nt(r, n, i, s, a)
        )
      }
      static parse(t, r = !1) {
        const n = xo.exec(t)
        return n
          ? new Nt(n[2] || Z, wr(n[4] || Z), wr(n[5] || Z), wr(n[7] || Z), wr(n[9] || Z), r)
          : new Nt(Z, Z, Z, Z, Z)
      }
      static file(t) {
        let r = Z
        if ((Ut && (t = t.replace(/\\/g, De)), t[0] === De && t[1] === De)) {
          const n = t.indexOf(De, 2)
          n === -1 ? ((r = t.substring(2)), (t = De)) : ((r = t.substring(2, n)), (t = t.substring(n) || De))
        }
        return new Nt('file', r, t, Z, Z)
      }
      static from(t) {
        const r = new Nt(t.scheme, t.authority, t.path, t.query, t.fragment)
        return Oi(r, !0), r
      }
      static joinPath(t, ...r) {
        if (!t.path) throw new Error('[UriError]: cannot call joinPath on URI without path')
        let n
        return (
          Ut && t.scheme === 'file' ? (n = gt.file(he.join(un(t, !0), ...r)).path) : (n = ve.join(t.path, ...r)),
          t.with({ path: n })
        )
      }
      toString(t = !1) {
        return cn(this, t)
      }
      toJSON() {
        return this
      }
      static revive(t) {
        if (t) {
          if (t instanceof gt) return t
          {
            const r = new Nt(t)
            return (r._formatted = t.external), (r._fsPath = t._sep === Vi ? t.fsPath : null), r
          }
        } else return t
      }
    }
    const Vi = Ut ? 1 : void 0
    class Nt extends gt {
      constructor() {
        super(...arguments), (this._formatted = null), (this._fsPath = null)
      }
      get fsPath() {
        return this._fsPath || (this._fsPath = un(this, !1)), this._fsPath
      }
      toString(t = !1) {
        return t ? cn(this, !0) : (this._formatted || (this._formatted = cn(this, !1)), this._formatted)
      }
      toJSON() {
        const t = { $mid: 1 }
        return (
          this._fsPath && ((t.fsPath = this._fsPath), (t._sep = Vi)),
          this._formatted && (t.external = this._formatted),
          this.path && (t.path = this.path),
          this.scheme && (t.scheme = this.scheme),
          this.authority && (t.authority = this.authority),
          this.query && (t.query = this.query),
          this.fragment && (t.fragment = this.fragment),
          t
        )
      }
    }
    const Bi = {
      [58]: '%3A',
      [47]: '%2F',
      [63]: '%3F',
      [35]: '%23',
      [91]: '%5B',
      [93]: '%5D',
      [64]: '%40',
      [33]: '%21',
      [36]: '%24',
      [38]: '%26',
      [39]: '%27',
      [40]: '%28',
      [41]: '%29',
      [42]: '%2A',
      [43]: '%2B',
      [44]: '%2C',
      [59]: '%3B',
      [61]: '%3D',
      [32]: '%20',
    }
    function Ui(e, t, r) {
      let n,
        i = -1
      for (let s = 0; s < e.length; s++) {
        const a = e.charCodeAt(s)
        if (
          (a >= 97 && a <= 122) ||
          (a >= 65 && a <= 90) ||
          (a >= 48 && a <= 57) ||
          a === 45 ||
          a === 46 ||
          a === 95 ||
          a === 126 ||
          (t && a === 47) ||
          (r && a === 91) ||
          (r && a === 93) ||
          (r && a === 58)
        )
          i !== -1 && ((n += encodeURIComponent(e.substring(i, s))), (i = -1)), n !== void 0 && (n += e.charAt(s))
        else {
          n === void 0 && (n = e.substr(0, s))
          const o = Bi[a]
          o !== void 0
            ? (i !== -1 && ((n += encodeURIComponent(e.substring(i, s))), (i = -1)), (n += o))
            : i === -1 && (i = s)
        }
      }
      return i !== -1 && (n += encodeURIComponent(e.substring(i))), n !== void 0 ? n : e
    }
    function wo(e) {
      let t
      for (let r = 0; r < e.length; r++) {
        const n = e.charCodeAt(r)
        n === 35 || n === 63 ? (t === void 0 && (t = e.substr(0, r)), (t += Bi[n])) : t !== void 0 && (t += e[r])
      }
      return t !== void 0 ? t : e
    }
    function un(e, t) {
      let r
      return (
        e.authority && e.path.length > 1 && e.scheme === 'file'
          ? (r = `//${e.authority}${e.path}`)
          : e.path.charCodeAt(0) === 47 &&
              ((e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90) ||
                (e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122)) &&
              e.path.charCodeAt(2) === 58
            ? t
              ? (r = e.path.substr(1))
              : (r = e.path[1].toLowerCase() + e.path.substr(2))
            : (r = e.path),
        Ut && (r = r.replace(/\//g, '\\')),
        r
      )
    }
    function cn(e, t) {
      const r = t ? wo : Ui
      let n = '',
        { scheme: i, authority: s, path: a, query: o, fragment: l } = e
      if ((i && ((n += i), (n += ':')), (s || i === 'file') && ((n += De), (n += De)), s)) {
        let u = s.indexOf('@')
        if (u !== -1) {
          const c = s.substr(0, u)
          ;(s = s.substr(u + 1)),
            (u = c.lastIndexOf(':')),
            u === -1
              ? (n += r(c, !1, !1))
              : ((n += r(c.substr(0, u), !1, !1)), (n += ':'), (n += r(c.substr(u + 1), !1, !0))),
            (n += '@')
        }
        ;(s = s.toLowerCase()),
          (u = s.lastIndexOf(':')),
          u === -1 ? (n += r(s, !1, !0)) : ((n += r(s.substr(0, u), !1, !0)), (n += s.substr(u)))
      }
      if (a) {
        if (a.length >= 3 && a.charCodeAt(0) === 47 && a.charCodeAt(2) === 58) {
          const u = a.charCodeAt(1)
          u >= 65 && u <= 90 && (a = `/${String.fromCharCode(u + 32)}:${a.substr(3)}`)
        } else if (a.length >= 2 && a.charCodeAt(1) === 58) {
          const u = a.charCodeAt(0)
          u >= 65 && u <= 90 && (a = `${String.fromCharCode(u + 32)}:${a.substr(2)}`)
        }
        n += r(a, !0, !1)
      }
      return o && ((n += '?'), (n += r(o, !1, !1))), l && ((n += '#'), (n += t ? l : Ui(l, !1, !1))), n
    }
    function ji(e) {
      try {
        return decodeURIComponent(e)
      } catch (t) {
        return e.length > 3 ? e.substr(0, 3) + ji(e.substr(3)) : e
      }
    }
    const Wi = /(%[0-9A-Za-z][0-9A-Za-z])+/g
    function wr(e) {
      return e.match(Wi) ? e.replace(Wi, (t) => ji(t)) : e
    }
    class de {
      constructor(t, r) {
        ;(this.lineNumber = t), (this.column = r)
      }
      with(t = this.lineNumber, r = this.column) {
        return t === this.lineNumber && r === this.column ? this : new de(t, r)
      }
      delta(t = 0, r = 0) {
        return this.with(this.lineNumber + t, this.column + r)
      }
      equals(t) {
        return de.equals(this, t)
      }
      static equals(t, r) {
        return !t && !r ? !0 : !!t && !!r && t.lineNumber === r.lineNumber && t.column === r.column
      }
      isBefore(t) {
        return de.isBefore(this, t)
      }
      static isBefore(t, r) {
        return t.lineNumber < r.lineNumber ? !0 : r.lineNumber < t.lineNumber ? !1 : t.column < r.column
      }
      isBeforeOrEqual(t) {
        return de.isBeforeOrEqual(this, t)
      }
      static isBeforeOrEqual(t, r) {
        return t.lineNumber < r.lineNumber ? !0 : r.lineNumber < t.lineNumber ? !1 : t.column <= r.column
      }
      static compare(t, r) {
        const n = t.lineNumber | 0,
          i = r.lineNumber | 0
        if (n === i) {
          const s = t.column | 0,
            a = r.column | 0
          return s - a
        }
        return n - i
      }
      clone() {
        return new de(this.lineNumber, this.column)
      }
      toString() {
        return '(' + this.lineNumber + ',' + this.column + ')'
      }
      static lift(t) {
        return new de(t.lineNumber, t.column)
      }
      static isIPosition(t) {
        return t && typeof t.lineNumber == 'number' && typeof t.column == 'number'
      }
    }
    class G {
      constructor(t, r, n, i) {
        t > n || (t === n && r > i)
          ? ((this.startLineNumber = n), (this.startColumn = i), (this.endLineNumber = t), (this.endColumn = r))
          : ((this.startLineNumber = t), (this.startColumn = r), (this.endLineNumber = n), (this.endColumn = i))
      }
      isEmpty() {
        return G.isEmpty(this)
      }
      static isEmpty(t) {
        return t.startLineNumber === t.endLineNumber && t.startColumn === t.endColumn
      }
      containsPosition(t) {
        return G.containsPosition(this, t)
      }
      static containsPosition(t, r) {
        return !(
          r.lineNumber < t.startLineNumber ||
          r.lineNumber > t.endLineNumber ||
          (r.lineNumber === t.startLineNumber && r.column < t.startColumn) ||
          (r.lineNumber === t.endLineNumber && r.column > t.endColumn)
        )
      }
      static strictContainsPosition(t, r) {
        return !(
          r.lineNumber < t.startLineNumber ||
          r.lineNumber > t.endLineNumber ||
          (r.lineNumber === t.startLineNumber && r.column <= t.startColumn) ||
          (r.lineNumber === t.endLineNumber && r.column >= t.endColumn)
        )
      }
      containsRange(t) {
        return G.containsRange(this, t)
      }
      static containsRange(t, r) {
        return !(
          r.startLineNumber < t.startLineNumber ||
          r.endLineNumber < t.startLineNumber ||
          r.startLineNumber > t.endLineNumber ||
          r.endLineNumber > t.endLineNumber ||
          (r.startLineNumber === t.startLineNumber && r.startColumn < t.startColumn) ||
          (r.endLineNumber === t.endLineNumber && r.endColumn > t.endColumn)
        )
      }
      strictContainsRange(t) {
        return G.strictContainsRange(this, t)
      }
      static strictContainsRange(t, r) {
        return !(
          r.startLineNumber < t.startLineNumber ||
          r.endLineNumber < t.startLineNumber ||
          r.startLineNumber > t.endLineNumber ||
          r.endLineNumber > t.endLineNumber ||
          (r.startLineNumber === t.startLineNumber && r.startColumn <= t.startColumn) ||
          (r.endLineNumber === t.endLineNumber && r.endColumn >= t.endColumn)
        )
      }
      plusRange(t) {
        return G.plusRange(this, t)
      }
      static plusRange(t, r) {
        let n, i, s, a
        return (
          r.startLineNumber < t.startLineNumber
            ? ((n = r.startLineNumber), (i = r.startColumn))
            : r.startLineNumber === t.startLineNumber
              ? ((n = r.startLineNumber), (i = Math.min(r.startColumn, t.startColumn)))
              : ((n = t.startLineNumber), (i = t.startColumn)),
          r.endLineNumber > t.endLineNumber
            ? ((s = r.endLineNumber), (a = r.endColumn))
            : r.endLineNumber === t.endLineNumber
              ? ((s = r.endLineNumber), (a = Math.max(r.endColumn, t.endColumn)))
              : ((s = t.endLineNumber), (a = t.endColumn)),
          new G(n, i, s, a)
        )
      }
      intersectRanges(t) {
        return G.intersectRanges(this, t)
      }
      static intersectRanges(t, r) {
        let n = t.startLineNumber,
          i = t.startColumn,
          s = t.endLineNumber,
          a = t.endColumn
        const o = r.startLineNumber,
          l = r.startColumn,
          u = r.endLineNumber,
          c = r.endColumn
        return (
          n < o ? ((n = o), (i = l)) : n === o && (i = Math.max(i, l)),
          s > u ? ((s = u), (a = c)) : s === u && (a = Math.min(a, c)),
          n > s || (n === s && i > a) ? null : new G(n, i, s, a)
        )
      }
      equalsRange(t) {
        return G.equalsRange(this, t)
      }
      static equalsRange(t, r) {
        return !t && !r
          ? !0
          : !!t &&
              !!r &&
              t.startLineNumber === r.startLineNumber &&
              t.startColumn === r.startColumn &&
              t.endLineNumber === r.endLineNumber &&
              t.endColumn === r.endColumn
      }
      getEndPosition() {
        return G.getEndPosition(this)
      }
      static getEndPosition(t) {
        return new de(t.endLineNumber, t.endColumn)
      }
      getStartPosition() {
        return G.getStartPosition(this)
      }
      static getStartPosition(t) {
        return new de(t.startLineNumber, t.startColumn)
      }
      toString() {
        return (
          '[' + this.startLineNumber + ',' + this.startColumn + ' -> ' + this.endLineNumber + ',' + this.endColumn + ']'
        )
      }
      setEndPosition(t, r) {
        return new G(this.startLineNumber, this.startColumn, t, r)
      }
      setStartPosition(t, r) {
        return new G(t, r, this.endLineNumber, this.endColumn)
      }
      collapseToStart() {
        return G.collapseToStart(this)
      }
      static collapseToStart(t) {
        return new G(t.startLineNumber, t.startColumn, t.startLineNumber, t.startColumn)
      }
      collapseToEnd() {
        return G.collapseToEnd(this)
      }
      static collapseToEnd(t) {
        return new G(t.endLineNumber, t.endColumn, t.endLineNumber, t.endColumn)
      }
      delta(t) {
        return new G(this.startLineNumber + t, this.startColumn, this.endLineNumber + t, this.endColumn)
      }
      static fromPositions(t, r = t) {
        return new G(t.lineNumber, t.column, r.lineNumber, r.column)
      }
      static lift(t) {
        return t ? new G(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : null
      }
      static isIRange(t) {
        return (
          t &&
          typeof t.startLineNumber == 'number' &&
          typeof t.startColumn == 'number' &&
          typeof t.endLineNumber == 'number' &&
          typeof t.endColumn == 'number'
        )
      }
      static areIntersectingOrTouching(t, r) {
        return !(
          t.endLineNumber < r.startLineNumber ||
          (t.endLineNumber === r.startLineNumber && t.endColumn < r.startColumn) ||
          r.endLineNumber < t.startLineNumber ||
          (r.endLineNumber === t.startLineNumber && r.endColumn < t.startColumn)
        )
      }
      static areIntersecting(t, r) {
        return !(
          t.endLineNumber < r.startLineNumber ||
          (t.endLineNumber === r.startLineNumber && t.endColumn <= r.startColumn) ||
          r.endLineNumber < t.startLineNumber ||
          (r.endLineNumber === t.startLineNumber && r.endColumn <= t.startColumn)
        )
      }
      static compareRangesUsingStarts(t, r) {
        if (t && r) {
          const s = t.startLineNumber | 0,
            a = r.startLineNumber | 0
          if (s === a) {
            const o = t.startColumn | 0,
              l = r.startColumn | 0
            if (o === l) {
              const u = t.endLineNumber | 0,
                c = r.endLineNumber | 0
              if (u === c) {
                const f = t.endColumn | 0,
                  d = r.endColumn | 0
                return f - d
              }
              return u - c
            }
            return o - l
          }
          return s - a
        }
        return (t ? 1 : 0) - (r ? 1 : 0)
      }
      static compareRangesUsingEnds(t, r) {
        return t.endLineNumber === r.endLineNumber
          ? t.endColumn === r.endColumn
            ? t.startLineNumber === r.startLineNumber
              ? t.startColumn - r.startColumn
              : t.startLineNumber - r.startLineNumber
            : t.endColumn - r.endColumn
          : t.endLineNumber - r.endLineNumber
      }
      static spansMultipleLines(t) {
        return t.endLineNumber > t.startLineNumber
      }
      toJSON() {
        return this
      }
    }
    function K0(e, t = 0) {
      return e[e.length - (1 + t)]
    }
    function ec(e) {
      if (e.length === 0) throw new Error('Invalid tail call')
      return [e.slice(0, e.length - 1), e[e.length - 1]]
    }
    function tc(e, t, r = (n, i) => n === i) {
      if (e === t) return !0
      if (!e || !t || e.length !== t.length) return !1
      for (let n = 0, i = e.length; n < i; n++) if (!r(e[n], t[n])) return !1
      return !0
    }
    function rc(e, t) {
      const r = e.length - 1
      t < r && (e[t] = e[r]), e.pop()
    }
    function nc(e, t, r) {
      return So(e.length, (n) => r(e[n], t))
    }
    function So(e, t) {
      let r = 0,
        n = e - 1
      for (; r <= n; ) {
        const i = ((r + n) / 2) | 0,
          s = t(i)
        if (s < 0) r = i + 1
        else if (s > 0) n = i - 1
        else return i
      }
      return -(r + 1)
    }
    function ic(e, t) {
      let r = 0,
        n = e.length
      if (n === 0) return 0
      for (; r < n; ) {
        const i = Math.floor((r + n) / 2)
        t(e[i]) ? (n = i) : (r = i + 1)
      }
      return r
    }
    function qi(e, t, r) {
      if (((e = e | 0), e >= t.length)) throw new TypeError('invalid index')
      const n = t[Math.floor(t.length * Math.random())],
        i = [],
        s = [],
        a = []
      for (const o of t) {
        const l = r(o, n)
        l < 0 ? i.push(o) : l > 0 ? s.push(o) : a.push(o)
      }
      return e < i.length ? qi(e, i, r) : e < i.length + a.length ? a[0] : qi(e - (i.length + a.length), s, r)
    }
    function sc(e, t) {
      const r = []
      let n
      for (const i of e.slice(0).sort(t)) !n || t(n[0], i) !== 0 ? ((n = [i]), r.push(n)) : n.push(i)
      return r
    }
    function ac(e) {
      return e.filter((t) => !!t)
    }
    function oc(e) {
      let t = 0
      for (let r = 0; r < e.length; r++) e[r] && ((e[t] = e[r]), (t += 1))
      e.length = t
    }
    function lc(e) {
      return !Array.isArray(e) || e.length === 0
    }
    function uc(e) {
      return Array.isArray(e) && e.length > 0
    }
    function cc(e, t = (r) => r) {
      const r = new Set()
      return e.filter((n) => {
        const i = t(n)
        return r.has(i) ? !1 : (r.add(i), !0)
      })
    }
    function fc(e, t) {
      const r = Ao(e, t)
      if (r !== -1) return e[r]
    }
    function Ao(e, t) {
      for (let r = e.length - 1; r >= 0; r--) {
        const n = e[r]
        if (t(n)) return r
      }
      return -1
    }
    function hc(e, t) {
      return e.length > 0 ? e[0] : t
    }
    function dc(e, t) {
      let r = typeof t == 'number' ? e : 0
      typeof t == 'number' ? (r = e) : ((r = 0), (t = e))
      const n = []
      if (r <= t) for (let i = r; i < t; i++) n.push(i)
      else for (let i = r; i > t; i--) n.push(i)
      return n
    }
    function gc(e, t, r) {
      const n = e.slice(0, t),
        i = e.slice(t)
      return n.concat(r, i)
    }
    function mc(e, t) {
      const r = e.indexOf(t)
      r > -1 && (e.splice(r, 1), e.unshift(t))
    }
    function pc(e, t) {
      const r = e.indexOf(t)
      r > -1 && (e.splice(r, 1), e.push(t))
    }
    function vc(e, t) {
      for (const r of t) e.push(r)
    }
    function bc(e) {
      return Array.isArray(e) ? e : [e]
    }
    function Lo(e, t, r) {
      const n = $i(e, t),
        i = e.length,
        s = r.length
      e.length = i + s
      for (let a = i - 1; a >= n; a--) e[a + s] = e[a]
      for (let a = 0; a < s; a++) e[a + n] = r[a]
    }
    function yc(e, t, r, n) {
      const i = $i(e, t),
        s = e.splice(i, r)
      return Lo(e, i, n), s
    }
    function $i(e, t) {
      return t < 0 ? Math.max(t + e.length, 0) : Math.min(t, e.length)
    }
    var fn
    ;(function (e) {
      function t(i) {
        return i < 0
      }
      e.isLessThan = t
      function r(i) {
        return i > 0
      }
      e.isGreaterThan = r
      function n(i) {
        return i === 0
      }
      ;(e.isNeitherLessOrGreaterThan = n), (e.greaterThan = 1), (e.lessThan = -1), (e.neitherLessOrGreaterThan = 0)
    })(fn || (fn = {}))
    function _c(e, t) {
      return (r, n) => t(e(r), e(n))
    }
    const xc = (e, t) => e - t
    function Co(e, t) {
      if (e.length === 0) return
      let r = e[0]
      for (let n = 1; n < e.length; n++) {
        const i = e[n]
        t(i, r) > 0 && (r = i)
      }
      return r
    }
    function wc(e, t) {
      if (e.length === 0) return
      let r = e[0]
      for (let n = 1; n < e.length; n++) {
        const i = e[n]
        t(i, r) >= 0 && (r = i)
      }
      return r
    }
    function Sc(e, t) {
      return Co(e, (r, n) => -t(r, n))
    }
    class Ac {
      constructor(t) {
        ;(this.items = t), (this.firstIdx = 0), (this.lastIdx = this.items.length - 1)
      }
      get length() {
        return this.lastIdx - this.firstIdx + 1
      }
      takeWhile(t) {
        let r = this.firstIdx
        for (; r < this.items.length && t(this.items[r]); ) r++
        const n = r === this.firstIdx ? null : this.items.slice(this.firstIdx, r)
        return (this.firstIdx = r), n
      }
      takeFromEndWhile(t) {
        let r = this.lastIdx
        for (; r >= 0 && t(this.items[r]); ) r--
        const n = r === this.lastIdx ? null : this.items.slice(r + 1, this.lastIdx + 1)
        return (this.lastIdx = r), n
      }
      peek() {
        if (this.length !== 0) return this.items[this.firstIdx]
      }
      dequeue() {
        const t = this.items[this.firstIdx]
        return this.firstIdx++, t
      }
      takeCount(t) {
        const r = this.items.slice(this.firstIdx, this.firstIdx + t)
        return (this.firstIdx += t), r
      }
    }
    class Ht {
      constructor(t) {
        this.iterate = t
      }
      toArray() {
        const t = []
        return this.iterate((r) => (t.push(r), !0)), t
      }
      filter(t) {
        return new Ht((r) => this.iterate((n) => (t(n) ? r(n) : !0)))
      }
      map(t) {
        return new Ht((r) => this.iterate((n) => r(t(n))))
      }
      findLast(t) {
        let r
        return this.iterate((n) => (t(n) && (r = n), !0)), r
      }
      findLastMaxBy(t) {
        let r,
          n = !0
        return this.iterate((i) => ((n || fn.isGreaterThan(t(i, r))) && ((n = !1), (r = i)), !0)), r
      }
    }
    Ht.empty = new Ht((e) => {})
    function Hi(e) {
      return e < 0 ? 0 : e > 255 ? 255 : e | 0
    }
    function kt(e) {
      return e < 0 ? 0 : e > 4294967295 ? 4294967295 : e | 0
    }
    class No {
      constructor(t) {
        ;(this.values = t),
          (this.prefixSum = new Uint32Array(t.length)),
          (this.prefixSumValidIndex = new Int32Array(1)),
          (this.prefixSumValidIndex[0] = -1)
      }
      insertValues(t, r) {
        t = kt(t)
        const n = this.values,
          i = this.prefixSum,
          s = r.length
        return s === 0
          ? !1
          : ((this.values = new Uint32Array(n.length + s)),
            this.values.set(n.subarray(0, t), 0),
            this.values.set(n.subarray(t), t + s),
            this.values.set(r, t),
            t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1),
            (this.prefixSum = new Uint32Array(this.values.length)),
            this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(i.subarray(0, this.prefixSumValidIndex[0] + 1)),
            !0)
      }
      setValue(t, r) {
        return (
          (t = kt(t)),
          (r = kt(r)),
          this.values[t] === r
            ? !1
            : ((this.values[t] = r), t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), !0)
        )
      }
      removeValues(t, r) {
        ;(t = kt(t)), (r = kt(r))
        const n = this.values,
          i = this.prefixSum
        if (t >= n.length) return !1
        const s = n.length - t
        return (
          r >= s && (r = s),
          r === 0
            ? !1
            : ((this.values = new Uint32Array(n.length - r)),
              this.values.set(n.subarray(0, t), 0),
              this.values.set(n.subarray(t + r), t),
              (this.prefixSum = new Uint32Array(this.values.length)),
              t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1),
              this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(i.subarray(0, this.prefixSumValidIndex[0] + 1)),
              !0)
        )
      }
      getTotalSum() {
        return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1)
      }
      getPrefixSum(t) {
        return t < 0 ? 0 : ((t = kt(t)), this._getPrefixSum(t))
      }
      _getPrefixSum(t) {
        if (t <= this.prefixSumValidIndex[0]) return this.prefixSum[t]
        let r = this.prefixSumValidIndex[0] + 1
        r === 0 && ((this.prefixSum[0] = this.values[0]), r++), t >= this.values.length && (t = this.values.length - 1)
        for (let n = r; n <= t; n++) this.prefixSum[n] = this.prefixSum[n - 1] + this.values[n]
        return (this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], t)), this.prefixSum[t]
      }
      getIndexOf(t) {
        ;(t = Math.floor(t)), this.getTotalSum()
        let r = 0,
          n = this.values.length - 1,
          i = 0,
          s = 0,
          a = 0
        for (; r <= n; )
          if (((i = (r + (n - r) / 2) | 0), (s = this.prefixSum[i]), (a = s - this.values[i]), t < a)) n = i - 1
          else if (t >= s) r = i + 1
          else break
        return new zi(i, t - a)
      }
    }
    class Lc {
      constructor(t) {
        ;(this._values = t),
          (this._isValid = !1),
          (this._validEndIndex = -1),
          (this._prefixSum = []),
          (this._indexBySum = [])
      }
      getTotalSum() {
        return this._ensureValid(), this._indexBySum.length
      }
      getPrefixSum(t) {
        return this._ensureValid(), t === 0 ? 0 : this._prefixSum[t - 1]
      }
      getIndexOf(t) {
        this._ensureValid()
        const r = this._indexBySum[t],
          n = r > 0 ? this._prefixSum[r - 1] : 0
        return new zi(r, t - n)
      }
      removeValues(t, r) {
        this._values.splice(t, r), this._invalidate(t)
      }
      insertValues(t, r) {
        ;(this._values = arrayInsert(this._values, t, r)), this._invalidate(t)
      }
      _invalidate(t) {
        ;(this._isValid = !1), (this._validEndIndex = Math.min(this._validEndIndex, t - 1))
      }
      _ensureValid() {
        if (!this._isValid) {
          for (let t = this._validEndIndex + 1, r = this._values.length; t < r; t++) {
            const n = this._values[t],
              i = t > 0 ? this._prefixSum[t - 1] : 0
            this._prefixSum[t] = i + n
            for (let s = 0; s < n; s++) this._indexBySum[i + s] = t
          }
          ;(this._prefixSum.length = this._values.length),
            (this._indexBySum.length = this._prefixSum[this._prefixSum.length - 1]),
            (this._isValid = !0),
            (this._validEndIndex = this._values.length - 1)
        }
      }
      setValue(t, r) {
        this._values[t] !== r && ((this._values[t] = r), this._invalidate(t))
      }
    }
    class zi {
      constructor(t, r) {
        ;(this.index = t),
          (this.remainder = r),
          (this._prefixSumIndexOfResultBrand = void 0),
          (this.index = t),
          (this.remainder = r)
      }
    }
    class ko {
      constructor(t, r, n, i) {
        ;(this._uri = t),
          (this._lines = r),
          (this._eol = n),
          (this._versionId = i),
          (this._lineStarts = null),
          (this._cachedTextValue = null)
      }
      dispose() {
        this._lines.length = 0
      }
      get version() {
        return this._versionId
      }
      getText() {
        return (
          this._cachedTextValue === null && (this._cachedTextValue = this._lines.join(this._eol)), this._cachedTextValue
        )
      }
      onEvents(t) {
        t.eol && t.eol !== this._eol && ((this._eol = t.eol), (this._lineStarts = null))
        const r = t.changes
        for (const n of r)
          this._acceptDeleteRange(n.range),
            this._acceptInsertText(new de(n.range.startLineNumber, n.range.startColumn), n.text)
        ;(this._versionId = t.versionId), (this._cachedTextValue = null)
      }
      _ensureLineStarts() {
        if (!this._lineStarts) {
          const t = this._eol.length,
            r = this._lines.length,
            n = new Uint32Array(r)
          for (let i = 0; i < r; i++) n[i] = this._lines[i].length + t
          this._lineStarts = new No(n)
        }
      }
      _setLineText(t, r) {
        ;(this._lines[t] = r),
          this._lineStarts && this._lineStarts.setValue(t, this._lines[t].length + this._eol.length)
      }
      _acceptDeleteRange(t) {
        if (t.startLineNumber === t.endLineNumber) {
          if (t.startColumn === t.endColumn) return
          this._setLineText(
            t.startLineNumber - 1,
            this._lines[t.startLineNumber - 1].substring(0, t.startColumn - 1) +
              this._lines[t.startLineNumber - 1].substring(t.endColumn - 1),
          )
          return
        }
        this._setLineText(
          t.startLineNumber - 1,
          this._lines[t.startLineNumber - 1].substring(0, t.startColumn - 1) +
            this._lines[t.endLineNumber - 1].substring(t.endColumn - 1),
        ),
          this._lines.splice(t.startLineNumber, t.endLineNumber - t.startLineNumber),
          this._lineStarts && this._lineStarts.removeValues(t.startLineNumber, t.endLineNumber - t.startLineNumber)
      }
      _acceptInsertText(t, r) {
        if (r.length === 0) return
        const n = Oa(r)
        if (n.length === 1) {
          this._setLineText(
            t.lineNumber - 1,
            this._lines[t.lineNumber - 1].substring(0, t.column - 1) +
              n[0] +
              this._lines[t.lineNumber - 1].substring(t.column - 1),
          )
          return
        }
        ;(n[n.length - 1] += this._lines[t.lineNumber - 1].substring(t.column - 1)),
          this._setLineText(t.lineNumber - 1, this._lines[t.lineNumber - 1].substring(0, t.column - 1) + n[0])
        const i = new Uint32Array(n.length - 1)
        for (let s = 1; s < n.length; s++)
          this._lines.splice(t.lineNumber + s - 1, 0, n[s]), (i[s - 1] = n[s].length + this._eol.length)
        this._lineStarts && this._lineStarts.insertValues(t.lineNumber, i)
      }
    }
    const Eo = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?'
    function Mo(e = '') {
      let t = '(-?\\d*\\.\\d\\w*)|([^'
      for (const r of Eo) e.indexOf(r) >= 0 || (t += '\\' + r)
      return (t += '\\s]+)'), new RegExp(t, 'g')
    }
    const Gi = Mo()
    function To(e) {
      let t = Gi
      if (e && e instanceof RegExp)
        if (e.global) t = e
        else {
          let r = 'g'
          e.ignoreCase && (r += 'i'), e.multiline && (r += 'm'), e.unicode && (r += 'u'), (t = new RegExp(e.source, r))
        }
      return (t.lastIndex = 0), t
    }
    const Ji = new dr()
    Ji.unshift({ maxLen: 1e3, windowSize: 15, timeBudget: 150 })
    function hn(e, t, r, n, i) {
      if ((i || (i = me.first(Ji)), r.length > i.maxLen)) {
        let u = e - i.maxLen / 2
        return u < 0 ? (u = 0) : (n += u), (r = r.substring(u, e + i.maxLen / 2)), hn(e, t, r, n, i)
      }
      const s = Date.now(),
        a = e - 1 - n
      let o = -1,
        l = null
      for (let u = 1; !(Date.now() - s >= i.timeBudget); u++) {
        const c = a - i.windowSize * u
        t.lastIndex = Math.max(0, c)
        const f = Po(t, r, a, o)
        if ((!f && l) || ((l = f), c <= 0)) break
        o = c
      }
      if (l) {
        const u = { word: l[0], startColumn: n + 1 + l.index, endColumn: n + 1 + l.index + l[0].length }
        return (t.lastIndex = 0), u
      }
      return null
    }
    function Po(e, t, r, n) {
      let i
      for (; (i = e.exec(t)); ) {
        const s = i.index || 0
        if (s <= r && e.lastIndex >= r) return i
        if (n > 0 && s > n) return null
      }
      return null
    }
    class zt {
      constructor(t) {
        const r = Hi(t)
        ;(this._defaultValue = r), (this._asciiMap = zt._createAsciiMap(r)), (this._map = new Map())
      }
      static _createAsciiMap(t) {
        const r = new Uint8Array(256)
        return r.fill(t), r
      }
      set(t, r) {
        const n = Hi(r)
        t >= 0 && t < 256 ? (this._asciiMap[t] = n) : this._map.set(t, n)
      }
      get(t) {
        return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue
      }
      clear() {
        this._asciiMap.fill(this._defaultValue), this._map.clear()
      }
    }
    class Cc {
      constructor() {
        this._actual = new zt(0)
      }
      add(t) {
        this._actual.set(t, 1)
      }
      has(t) {
        return this._actual.get(t) === 1
      }
      clear() {
        return this._actual.clear()
      }
    }
    class Fo {
      constructor(t, r, n) {
        const i = new Uint8Array(t * r)
        for (let s = 0, a = t * r; s < a; s++) i[s] = n
        ;(this._data = i), (this.rows = t), (this.cols = r)
      }
      get(t, r) {
        return this._data[t * this.cols + r]
      }
      set(t, r, n) {
        this._data[t * this.cols + r] = n
      }
    }
    class Do {
      constructor(t) {
        let r = 0,
          n = 0
        for (let s = 0, a = t.length; s < a; s++) {
          const [o, l, u] = t[s]
          l > r && (r = l), o > n && (n = o), u > n && (n = u)
        }
        r++, n++
        const i = new Fo(n, r, 0)
        for (let s = 0, a = t.length; s < a; s++) {
          const [o, l, u] = t[s]
          i.set(o, l, u)
        }
        ;(this._states = i), (this._maxCharCode = r)
      }
      nextState(t, r) {
        return r < 0 || r >= this._maxCharCode ? 0 : this._states.get(t, r)
      }
    }
    let dn = null
    function Io() {
      return (
        dn === null &&
          (dn = new Do([
            [1, 104, 2],
            [1, 72, 2],
            [1, 102, 6],
            [1, 70, 6],
            [2, 116, 3],
            [2, 84, 3],
            [3, 116, 4],
            [3, 84, 4],
            [4, 112, 5],
            [4, 80, 5],
            [5, 115, 9],
            [5, 83, 9],
            [5, 58, 10],
            [6, 105, 7],
            [6, 73, 7],
            [7, 108, 8],
            [7, 76, 8],
            [8, 101, 9],
            [8, 69, 9],
            [9, 58, 10],
            [10, 47, 11],
            [11, 47, 12],
          ])),
        dn
      )
    }
    let Gt = null
    function Ro() {
      if (Gt === null) {
        Gt = new zt(0)
        const e = ` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026`
        for (let r = 0; r < e.length; r++) Gt.set(e.charCodeAt(r), 1)
        const t = '.,;:'
        for (let r = 0; r < t.length; r++) Gt.set(t.charCodeAt(r), 2)
      }
      return Gt
    }
    class Sr {
      static _createLink(t, r, n, i, s) {
        let a = s - 1
        do {
          const o = r.charCodeAt(a)
          if (t.get(o) !== 2) break
          a--
        } while (a > i)
        if (i > 0) {
          const o = r.charCodeAt(i - 1),
            l = r.charCodeAt(a)
          ;((o === 40 && l === 41) || (o === 91 && l === 93) || (o === 123 && l === 125)) && a--
        }
        return {
          range: { startLineNumber: n, startColumn: i + 1, endLineNumber: n, endColumn: a + 2 },
          url: r.substring(i, a + 1),
        }
      }
      static computeLinks(t, r = Io()) {
        const n = Ro(),
          i = []
        for (let s = 1, a = t.getLineCount(); s <= a; s++) {
          const o = t.getLineContent(s),
            l = o.length
          let u = 0,
            c = 0,
            f = 0,
            d = 1,
            g = !1,
            p = !1,
            b = !1,
            m = !1
          for (; u < l; ) {
            let v = !1
            const _ = o.charCodeAt(u)
            if (d === 13) {
              let y
              switch (_) {
                case 40:
                  ;(g = !0), (y = 0)
                  break
                case 41:
                  y = g ? 0 : 1
                  break
                case 91:
                  ;(b = !0), (p = !0), (y = 0)
                  break
                case 93:
                  ;(b = !1), (y = p ? 0 : 1)
                  break
                case 123:
                  ;(m = !0), (y = 0)
                  break
                case 125:
                  y = m ? 0 : 1
                  break
                case 39:
                case 34:
                case 96:
                  f === _ ? (y = 1) : f === 39 || f === 34 || f === 96 ? (y = 0) : (y = 1)
                  break
                case 42:
                  y = f === 42 ? 1 : 0
                  break
                case 124:
                  y = f === 124 ? 1 : 0
                  break
                case 32:
                  y = b ? 0 : 1
                  break
                default:
                  y = n.get(_)
              }
              y === 1 && (i.push(Sr._createLink(n, o, s, c, u)), (v = !0))
            } else if (d === 12) {
              let y
              _ === 91 ? ((p = !0), (y = 0)) : (y = n.get(_)), y === 1 ? (v = !0) : (d = 13)
            } else (d = r.nextState(d, _)), d === 0 && (v = !0)
            v && ((d = 1), (g = !1), (p = !1), (m = !1), (c = u + 1), (f = _)), u++
          }
          d === 13 && i.push(Sr._createLink(n, o, s, c, l))
        }
        return i
      }
    }
    function Oo(e) {
      return !e || typeof e.getLineCount != 'function' || typeof e.getLineContent != 'function'
        ? []
        : Sr.computeLinks(e)
    }
    class gn {
      constructor() {
        this._defaultValueSet = [
          ['true', 'false'],
          ['True', 'False'],
          ['Private', 'Public', 'Friend', 'ReadOnly', 'Partial', 'Protected', 'WriteOnly'],
          ['public', 'protected', 'private'],
        ]
      }
      navigateValueSet(t, r, n, i, s) {
        if (t && r) {
          const a = this.doNavigateValueSet(r, s)
          if (a) return { range: t, value: a }
        }
        if (n && i) {
          const a = this.doNavigateValueSet(i, s)
          if (a) return { range: n, value: a }
        }
        return null
      }
      doNavigateValueSet(t, r) {
        const n = this.numberReplace(t, r)
        return n !== null ? n : this.textReplace(t, r)
      }
      numberReplace(t, r) {
        const n = Math.pow(10, t.length - (t.lastIndexOf('.') + 1))
        let i = Number(t)
        const s = parseFloat(t)
        return !isNaN(i) && !isNaN(s) && i === s
          ? i === 0 && !r
            ? null
            : ((i = Math.floor(i * n)), (i += r ? n : -n), String(i / n))
          : null
      }
      textReplace(t, r) {
        return this.valueSetsReplace(this._defaultValueSet, t, r)
      }
      valueSetsReplace(t, r, n) {
        let i = null
        for (let s = 0, a = t.length; i === null && s < a; s++) i = this.valueSetReplace(t[s], r, n)
        return i
      }
      valueSetReplace(t, r, n) {
        let i = t.indexOf(r)
        return i >= 0 ? ((i += n ? 1 : -1), i < 0 ? (i = t.length - 1) : (i %= t.length), t[i]) : null
      }
    }
    gn.INSTANCE = new gn()
    const Qi = Object.freeze(function (e, t) {
      const r = setTimeout(e.bind(t), 0)
      return {
        dispose() {
          clearTimeout(r)
        },
      }
    })
    var Ar
    ;(function (e) {
      function t(r) {
        return r === e.None || r === e.Cancelled || r instanceof Lr
          ? !0
          : !r || typeof r != 'object'
            ? !1
            : typeof r.isCancellationRequested == 'boolean' && typeof r.onCancellationRequested == 'function'
      }
      ;(e.isCancellationToken = t),
        (e.None = Object.freeze({ isCancellationRequested: !1, onCancellationRequested: br.None })),
        (e.Cancelled = Object.freeze({ isCancellationRequested: !0, onCancellationRequested: Qi }))
    })(Ar || (Ar = {}))
    class Lr {
      constructor() {
        ;(this._isCancelled = !1), (this._emitter = null)
      }
      cancel() {
        this._isCancelled || ((this._isCancelled = !0), this._emitter && (this._emitter.fire(void 0), this.dispose()))
      }
      get isCancellationRequested() {
        return this._isCancelled
      }
      get onCancellationRequested() {
        return this._isCancelled ? Qi : (this._emitter || (this._emitter = new Ne()), this._emitter.event)
      }
      dispose() {
        this._emitter && (this._emitter.dispose(), (this._emitter = null))
      }
    }
    class Vo {
      constructor(t) {
        ;(this._token = void 0),
          (this._parentListener = void 0),
          (this._parentListener = t && t.onCancellationRequested(this.cancel, this))
      }
      get token() {
        return this._token || (this._token = new Lr()), this._token
      }
      cancel() {
        this._token ? this._token instanceof Lr && this._token.cancel() : (this._token = Ar.Cancelled)
      }
      dispose(t = !1) {
        var r
        t && this.cancel(),
          (r = this._parentListener) === null || r === void 0 || r.dispose(),
          this._token ? this._token instanceof Lr && this._token.dispose() : (this._token = Ar.None)
      }
    }
    class mn {
      constructor() {
        ;(this._keyCodeToStr = []), (this._strToKeyCode = Object.create(null))
      }
      define(t, r) {
        ;(this._keyCodeToStr[t] = r), (this._strToKeyCode[r.toLowerCase()] = t)
      }
      keyCodeToStr(t) {
        return this._keyCodeToStr[t]
      }
      strToKeyCode(t) {
        return this._strToKeyCode[t.toLowerCase()] || 0
      }
    }
    const Cr = new mn(),
      pn = new mn(),
      vn = new mn(),
      Bo = new Array(230),
      Uo = {},
      jo = [],
      Wo = Object.create(null),
      qo = Object.create(null),
      Xi = [],
      bn = []
    for (let e = 0; e <= 193; e++) Xi[e] = -1
    for (let e = 0; e <= 127; e++) bn[e] = -1
    ;(function () {
      const e = '',
        t = [
          [0, 1, 0, 'None', 0, 'unknown', 0, 'VK_UNKNOWN', e, e],
          [0, 1, 1, 'Hyper', 0, e, 0, e, e, e],
          [0, 1, 2, 'Super', 0, e, 0, e, e, e],
          [0, 1, 3, 'Fn', 0, e, 0, e, e, e],
          [0, 1, 4, 'FnLock', 0, e, 0, e, e, e],
          [0, 1, 5, 'Suspend', 0, e, 0, e, e, e],
          [0, 1, 6, 'Resume', 0, e, 0, e, e, e],
          [0, 1, 7, 'Turbo', 0, e, 0, e, e, e],
          [0, 1, 8, 'Sleep', 0, e, 0, 'VK_SLEEP', e, e],
          [0, 1, 9, 'WakeUp', 0, e, 0, e, e, e],
          [31, 0, 10, 'KeyA', 31, 'A', 65, 'VK_A', e, e],
          [32, 0, 11, 'KeyB', 32, 'B', 66, 'VK_B', e, e],
          [33, 0, 12, 'KeyC', 33, 'C', 67, 'VK_C', e, e],
          [34, 0, 13, 'KeyD', 34, 'D', 68, 'VK_D', e, e],
          [35, 0, 14, 'KeyE', 35, 'E', 69, 'VK_E', e, e],
          [36, 0, 15, 'KeyF', 36, 'F', 70, 'VK_F', e, e],
          [37, 0, 16, 'KeyG', 37, 'G', 71, 'VK_G', e, e],
          [38, 0, 17, 'KeyH', 38, 'H', 72, 'VK_H', e, e],
          [39, 0, 18, 'KeyI', 39, 'I', 73, 'VK_I', e, e],
          [40, 0, 19, 'KeyJ', 40, 'J', 74, 'VK_J', e, e],
          [41, 0, 20, 'KeyK', 41, 'K', 75, 'VK_K', e, e],
          [42, 0, 21, 'KeyL', 42, 'L', 76, 'VK_L', e, e],
          [43, 0, 22, 'KeyM', 43, 'M', 77, 'VK_M', e, e],
          [44, 0, 23, 'KeyN', 44, 'N', 78, 'VK_N', e, e],
          [45, 0, 24, 'KeyO', 45, 'O', 79, 'VK_O', e, e],
          [46, 0, 25, 'KeyP', 46, 'P', 80, 'VK_P', e, e],
          [47, 0, 26, 'KeyQ', 47, 'Q', 81, 'VK_Q', e, e],
          [48, 0, 27, 'KeyR', 48, 'R', 82, 'VK_R', e, e],
          [49, 0, 28, 'KeyS', 49, 'S', 83, 'VK_S', e, e],
          [50, 0, 29, 'KeyT', 50, 'T', 84, 'VK_T', e, e],
          [51, 0, 30, 'KeyU', 51, 'U', 85, 'VK_U', e, e],
          [52, 0, 31, 'KeyV', 52, 'V', 86, 'VK_V', e, e],
          [53, 0, 32, 'KeyW', 53, 'W', 87, 'VK_W', e, e],
          [54, 0, 33, 'KeyX', 54, 'X', 88, 'VK_X', e, e],
          [55, 0, 34, 'KeyY', 55, 'Y', 89, 'VK_Y', e, e],
          [56, 0, 35, 'KeyZ', 56, 'Z', 90, 'VK_Z', e, e],
          [22, 0, 36, 'Digit1', 22, '1', 49, 'VK_1', e, e],
          [23, 0, 37, 'Digit2', 23, '2', 50, 'VK_2', e, e],
          [24, 0, 38, 'Digit3', 24, '3', 51, 'VK_3', e, e],
          [25, 0, 39, 'Digit4', 25, '4', 52, 'VK_4', e, e],
          [26, 0, 40, 'Digit5', 26, '5', 53, 'VK_5', e, e],
          [27, 0, 41, 'Digit6', 27, '6', 54, 'VK_6', e, e],
          [28, 0, 42, 'Digit7', 28, '7', 55, 'VK_7', e, e],
          [29, 0, 43, 'Digit8', 29, '8', 56, 'VK_8', e, e],
          [30, 0, 44, 'Digit9', 30, '9', 57, 'VK_9', e, e],
          [21, 0, 45, 'Digit0', 21, '0', 48, 'VK_0', e, e],
          [3, 1, 46, 'Enter', 3, 'Enter', 13, 'VK_RETURN', e, e],
          [9, 1, 47, 'Escape', 9, 'Escape', 27, 'VK_ESCAPE', e, e],
          [1, 1, 48, 'Backspace', 1, 'Backspace', 8, 'VK_BACK', e, e],
          [2, 1, 49, 'Tab', 2, 'Tab', 9, 'VK_TAB', e, e],
          [10, 1, 50, 'Space', 10, 'Space', 32, 'VK_SPACE', e, e],
          [83, 0, 51, 'Minus', 83, '-', 189, 'VK_OEM_MINUS', '-', 'OEM_MINUS'],
          [81, 0, 52, 'Equal', 81, '=', 187, 'VK_OEM_PLUS', '=', 'OEM_PLUS'],
          [87, 0, 53, 'BracketLeft', 87, '[', 219, 'VK_OEM_4', '[', 'OEM_4'],
          [89, 0, 54, 'BracketRight', 89, ']', 221, 'VK_OEM_6', ']', 'OEM_6'],
          [88, 0, 55, 'Backslash', 88, '\\', 220, 'VK_OEM_5', '\\', 'OEM_5'],
          [0, 0, 56, 'IntlHash', 0, e, 0, e, e, e],
          [80, 0, 57, 'Semicolon', 80, ';', 186, 'VK_OEM_1', ';', 'OEM_1'],
          [90, 0, 58, 'Quote', 90, "'", 222, 'VK_OEM_7', "'", 'OEM_7'],
          [86, 0, 59, 'Backquote', 86, '`', 192, 'VK_OEM_3', '`', 'OEM_3'],
          [82, 0, 60, 'Comma', 82, ',', 188, 'VK_OEM_COMMA', ',', 'OEM_COMMA'],
          [84, 0, 61, 'Period', 84, '.', 190, 'VK_OEM_PERIOD', '.', 'OEM_PERIOD'],
          [85, 0, 62, 'Slash', 85, '/', 191, 'VK_OEM_2', '/', 'OEM_2'],
          [8, 1, 63, 'CapsLock', 8, 'CapsLock', 20, 'VK_CAPITAL', e, e],
          [59, 1, 64, 'F1', 59, 'F1', 112, 'VK_F1', e, e],
          [60, 1, 65, 'F2', 60, 'F2', 113, 'VK_F2', e, e],
          [61, 1, 66, 'F3', 61, 'F3', 114, 'VK_F3', e, e],
          [62, 1, 67, 'F4', 62, 'F4', 115, 'VK_F4', e, e],
          [63, 1, 68, 'F5', 63, 'F5', 116, 'VK_F5', e, e],
          [64, 1, 69, 'F6', 64, 'F6', 117, 'VK_F6', e, e],
          [65, 1, 70, 'F7', 65, 'F7', 118, 'VK_F7', e, e],
          [66, 1, 71, 'F8', 66, 'F8', 119, 'VK_F8', e, e],
          [67, 1, 72, 'F9', 67, 'F9', 120, 'VK_F9', e, e],
          [68, 1, 73, 'F10', 68, 'F10', 121, 'VK_F10', e, e],
          [69, 1, 74, 'F11', 69, 'F11', 122, 'VK_F11', e, e],
          [70, 1, 75, 'F12', 70, 'F12', 123, 'VK_F12', e, e],
          [0, 1, 76, 'PrintScreen', 0, e, 0, e, e, e],
          [79, 1, 77, 'ScrollLock', 79, 'ScrollLock', 145, 'VK_SCROLL', e, e],
          [7, 1, 78, 'Pause', 7, 'PauseBreak', 19, 'VK_PAUSE', e, e],
          [19, 1, 79, 'Insert', 19, 'Insert', 45, 'VK_INSERT', e, e],
          [14, 1, 80, 'Home', 14, 'Home', 36, 'VK_HOME', e, e],
          [11, 1, 81, 'PageUp', 11, 'PageUp', 33, 'VK_PRIOR', e, e],
          [20, 1, 82, 'Delete', 20, 'Delete', 46, 'VK_DELETE', e, e],
          [13, 1, 83, 'End', 13, 'End', 35, 'VK_END', e, e],
          [12, 1, 84, 'PageDown', 12, 'PageDown', 34, 'VK_NEXT', e, e],
          [17, 1, 85, 'ArrowRight', 17, 'RightArrow', 39, 'VK_RIGHT', 'Right', e],
          [15, 1, 86, 'ArrowLeft', 15, 'LeftArrow', 37, 'VK_LEFT', 'Left', e],
          [18, 1, 87, 'ArrowDown', 18, 'DownArrow', 40, 'VK_DOWN', 'Down', e],
          [16, 1, 88, 'ArrowUp', 16, 'UpArrow', 38, 'VK_UP', 'Up', e],
          [78, 1, 89, 'NumLock', 78, 'NumLock', 144, 'VK_NUMLOCK', e, e],
          [108, 1, 90, 'NumpadDivide', 108, 'NumPad_Divide', 111, 'VK_DIVIDE', e, e],
          [103, 1, 91, 'NumpadMultiply', 103, 'NumPad_Multiply', 106, 'VK_MULTIPLY', e, e],
          [106, 1, 92, 'NumpadSubtract', 106, 'NumPad_Subtract', 109, 'VK_SUBTRACT', e, e],
          [104, 1, 93, 'NumpadAdd', 104, 'NumPad_Add', 107, 'VK_ADD', e, e],
          [3, 1, 94, 'NumpadEnter', 3, e, 0, e, e, e],
          [94, 1, 95, 'Numpad1', 94, 'NumPad1', 97, 'VK_NUMPAD1', e, e],
          [95, 1, 96, 'Numpad2', 95, 'NumPad2', 98, 'VK_NUMPAD2', e, e],
          [96, 1, 97, 'Numpad3', 96, 'NumPad3', 99, 'VK_NUMPAD3', e, e],
          [97, 1, 98, 'Numpad4', 97, 'NumPad4', 100, 'VK_NUMPAD4', e, e],
          [98, 1, 99, 'Numpad5', 98, 'NumPad5', 101, 'VK_NUMPAD5', e, e],
          [99, 1, 100, 'Numpad6', 99, 'NumPad6', 102, 'VK_NUMPAD6', e, e],
          [100, 1, 101, 'Numpad7', 100, 'NumPad7', 103, 'VK_NUMPAD7', e, e],
          [101, 1, 102, 'Numpad8', 101, 'NumPad8', 104, 'VK_NUMPAD8', e, e],
          [102, 1, 103, 'Numpad9', 102, 'NumPad9', 105, 'VK_NUMPAD9', e, e],
          [93, 1, 104, 'Numpad0', 93, 'NumPad0', 96, 'VK_NUMPAD0', e, e],
          [107, 1, 105, 'NumpadDecimal', 107, 'NumPad_Decimal', 110, 'VK_DECIMAL', e, e],
          [92, 0, 106, 'IntlBackslash', 92, 'OEM_102', 226, 'VK_OEM_102', e, e],
          [58, 1, 107, 'ContextMenu', 58, 'ContextMenu', 93, e, e, e],
          [0, 1, 108, 'Power', 0, e, 0, e, e, e],
          [0, 1, 109, 'NumpadEqual', 0, e, 0, e, e, e],
          [71, 1, 110, 'F13', 71, 'F13', 124, 'VK_F13', e, e],
          [72, 1, 111, 'F14', 72, 'F14', 125, 'VK_F14', e, e],
          [73, 1, 112, 'F15', 73, 'F15', 126, 'VK_F15', e, e],
          [74, 1, 113, 'F16', 74, 'F16', 127, 'VK_F16', e, e],
          [75, 1, 114, 'F17', 75, 'F17', 128, 'VK_F17', e, e],
          [76, 1, 115, 'F18', 76, 'F18', 129, 'VK_F18', e, e],
          [77, 1, 116, 'F19', 77, 'F19', 130, 'VK_F19', e, e],
          [0, 1, 117, 'F20', 0, e, 0, 'VK_F20', e, e],
          [0, 1, 118, 'F21', 0, e, 0, 'VK_F21', e, e],
          [0, 1, 119, 'F22', 0, e, 0, 'VK_F22', e, e],
          [0, 1, 120, 'F23', 0, e, 0, 'VK_F23', e, e],
          [0, 1, 121, 'F24', 0, e, 0, 'VK_F24', e, e],
          [0, 1, 122, 'Open', 0, e, 0, e, e, e],
          [0, 1, 123, 'Help', 0, e, 0, e, e, e],
          [0, 1, 124, 'Select', 0, e, 0, e, e, e],
          [0, 1, 125, 'Again', 0, e, 0, e, e, e],
          [0, 1, 126, 'Undo', 0, e, 0, e, e, e],
          [0, 1, 127, 'Cut', 0, e, 0, e, e, e],
          [0, 1, 128, 'Copy', 0, e, 0, e, e, e],
          [0, 1, 129, 'Paste', 0, e, 0, e, e, e],
          [0, 1, 130, 'Find', 0, e, 0, e, e, e],
          [0, 1, 131, 'AudioVolumeMute', 112, 'AudioVolumeMute', 173, 'VK_VOLUME_MUTE', e, e],
          [0, 1, 132, 'AudioVolumeUp', 113, 'AudioVolumeUp', 175, 'VK_VOLUME_UP', e, e],
          [0, 1, 133, 'AudioVolumeDown', 114, 'AudioVolumeDown', 174, 'VK_VOLUME_DOWN', e, e],
          [105, 1, 134, 'NumpadComma', 105, 'NumPad_Separator', 108, 'VK_SEPARATOR', e, e],
          [110, 0, 135, 'IntlRo', 110, 'ABNT_C1', 193, 'VK_ABNT_C1', e, e],
          [0, 1, 136, 'KanaMode', 0, e, 0, e, e, e],
          [0, 0, 137, 'IntlYen', 0, e, 0, e, e, e],
          [0, 1, 138, 'Convert', 0, e, 0, e, e, e],
          [0, 1, 139, 'NonConvert', 0, e, 0, e, e, e],
          [0, 1, 140, 'Lang1', 0, e, 0, e, e, e],
          [0, 1, 141, 'Lang2', 0, e, 0, e, e, e],
          [0, 1, 142, 'Lang3', 0, e, 0, e, e, e],
          [0, 1, 143, 'Lang4', 0, e, 0, e, e, e],
          [0, 1, 144, 'Lang5', 0, e, 0, e, e, e],
          [0, 1, 145, 'Abort', 0, e, 0, e, e, e],
          [0, 1, 146, 'Props', 0, e, 0, e, e, e],
          [0, 1, 147, 'NumpadParenLeft', 0, e, 0, e, e, e],
          [0, 1, 148, 'NumpadParenRight', 0, e, 0, e, e, e],
          [0, 1, 149, 'NumpadBackspace', 0, e, 0, e, e, e],
          [0, 1, 150, 'NumpadMemoryStore', 0, e, 0, e, e, e],
          [0, 1, 151, 'NumpadMemoryRecall', 0, e, 0, e, e, e],
          [0, 1, 152, 'NumpadMemoryClear', 0, e, 0, e, e, e],
          [0, 1, 153, 'NumpadMemoryAdd', 0, e, 0, e, e, e],
          [0, 1, 154, 'NumpadMemorySubtract', 0, e, 0, e, e, e],
          [0, 1, 155, 'NumpadClear', 126, 'Clear', 12, 'VK_CLEAR', e, e],
          [0, 1, 156, 'NumpadClearEntry', 0, e, 0, e, e, e],
          [5, 1, 0, e, 5, 'Ctrl', 17, 'VK_CONTROL', e, e],
          [4, 1, 0, e, 4, 'Shift', 16, 'VK_SHIFT', e, e],
          [6, 1, 0, e, 6, 'Alt', 18, 'VK_MENU', e, e],
          [57, 1, 0, e, 57, 'Meta', 0, 'VK_COMMAND', e, e],
          [5, 1, 157, 'ControlLeft', 5, e, 0, 'VK_LCONTROL', e, e],
          [4, 1, 158, 'ShiftLeft', 4, e, 0, 'VK_LSHIFT', e, e],
          [6, 1, 159, 'AltLeft', 6, e, 0, 'VK_LMENU', e, e],
          [57, 1, 160, 'MetaLeft', 57, e, 0, 'VK_LWIN', e, e],
          [5, 1, 161, 'ControlRight', 5, e, 0, 'VK_RCONTROL', e, e],
          [4, 1, 162, 'ShiftRight', 4, e, 0, 'VK_RSHIFT', e, e],
          [6, 1, 163, 'AltRight', 6, e, 0, 'VK_RMENU', e, e],
          [57, 1, 164, 'MetaRight', 57, e, 0, 'VK_RWIN', e, e],
          [0, 1, 165, 'BrightnessUp', 0, e, 0, e, e, e],
          [0, 1, 166, 'BrightnessDown', 0, e, 0, e, e, e],
          [0, 1, 167, 'MediaPlay', 0, e, 0, e, e, e],
          [0, 1, 168, 'MediaRecord', 0, e, 0, e, e, e],
          [0, 1, 169, 'MediaFastForward', 0, e, 0, e, e, e],
          [0, 1, 170, 'MediaRewind', 0, e, 0, e, e, e],
          [114, 1, 171, 'MediaTrackNext', 119, 'MediaTrackNext', 176, 'VK_MEDIA_NEXT_TRACK', e, e],
          [115, 1, 172, 'MediaTrackPrevious', 120, 'MediaTrackPrevious', 177, 'VK_MEDIA_PREV_TRACK', e, e],
          [116, 1, 173, 'MediaStop', 121, 'MediaStop', 178, 'VK_MEDIA_STOP', e, e],
          [0, 1, 174, 'Eject', 0, e, 0, e, e, e],
          [117, 1, 175, 'MediaPlayPause', 122, 'MediaPlayPause', 179, 'VK_MEDIA_PLAY_PAUSE', e, e],
          [0, 1, 176, 'MediaSelect', 123, 'LaunchMediaPlayer', 181, 'VK_MEDIA_LAUNCH_MEDIA_SELECT', e, e],
          [0, 1, 177, 'LaunchMail', 124, 'LaunchMail', 180, 'VK_MEDIA_LAUNCH_MAIL', e, e],
          [0, 1, 178, 'LaunchApp2', 125, 'LaunchApp2', 183, 'VK_MEDIA_LAUNCH_APP2', e, e],
          [0, 1, 179, 'LaunchApp1', 0, e, 0, 'VK_MEDIA_LAUNCH_APP1', e, e],
          [0, 1, 180, 'SelectTask', 0, e, 0, e, e, e],
          [0, 1, 181, 'LaunchScreenSaver', 0, e, 0, e, e, e],
          [0, 1, 182, 'BrowserSearch', 115, 'BrowserSearch', 170, 'VK_BROWSER_SEARCH', e, e],
          [0, 1, 183, 'BrowserHome', 116, 'BrowserHome', 172, 'VK_BROWSER_HOME', e, e],
          [112, 1, 184, 'BrowserBack', 117, 'BrowserBack', 166, 'VK_BROWSER_BACK', e, e],
          [113, 1, 185, 'BrowserForward', 118, 'BrowserForward', 167, 'VK_BROWSER_FORWARD', e, e],
          [0, 1, 186, 'BrowserStop', 0, e, 0, 'VK_BROWSER_STOP', e, e],
          [0, 1, 187, 'BrowserRefresh', 0, e, 0, 'VK_BROWSER_REFRESH', e, e],
          [0, 1, 188, 'BrowserFavorites', 0, e, 0, 'VK_BROWSER_FAVORITES', e, e],
          [0, 1, 189, 'ZoomToggle', 0, e, 0, e, e, e],
          [0, 1, 190, 'MailReply', 0, e, 0, e, e, e],
          [0, 1, 191, 'MailForward', 0, e, 0, e, e, e],
          [0, 1, 192, 'MailSend', 0, e, 0, e, e, e],
          [109, 1, 0, e, 109, 'KeyInComposition', 229, e, e, e],
          [111, 1, 0, e, 111, 'ABNT_C2', 194, 'VK_ABNT_C2', e, e],
          [91, 1, 0, e, 91, 'OEM_8', 223, 'VK_OEM_8', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_KANA', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_HANGUL', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_JUNJA', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_FINAL', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_HANJA', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_KANJI', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_CONVERT', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_NONCONVERT', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_ACCEPT', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_MODECHANGE', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_SELECT', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_PRINT', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_EXECUTE', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_SNAPSHOT', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_HELP', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_APPS', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_PROCESSKEY', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_PACKET', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_DBE_SBCSCHAR', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_DBE_DBCSCHAR', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_ATTN', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_CRSEL', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_EXSEL', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_EREOF', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_PLAY', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_ZOOM', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_NONAME', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_PA1', e, e],
          [0, 1, 0, e, 0, e, 0, 'VK_OEM_CLEAR', e, e],
        ],
        r = [],
        n = []
      for (const i of t) {
        const [s, a, o, l, u, c, f, d, g, p] = i
        if (
          (n[o] ||
            ((n[o] = !0),
            (jo[o] = l),
            (Wo[l] = o),
            (qo[l.toLowerCase()] = o),
            a && ((Xi[o] = u), u !== 0 && u !== 3 && u !== 5 && u !== 4 && u !== 6 && u !== 57 && (bn[u] = o))),
          !r[u])
        ) {
          if (((r[u] = !0), !c))
            throw new Error(`String representation missing for key code ${u} around scan code ${l}`)
          Cr.define(u, c), pn.define(u, g || c), vn.define(u, p || g || c)
        }
        f && (Bo[f] = u), d && (Uo[d] = u)
      }
      bn[3] = 46
    })()
    var Zi
    ;(function (e) {
      function t(o) {
        return Cr.keyCodeToStr(o)
      }
      e.toString = t
      function r(o) {
        return Cr.strToKeyCode(o)
      }
      e.fromString = r
      function n(o) {
        return pn.keyCodeToStr(o)
      }
      e.toUserSettingsUS = n
      function i(o) {
        return vn.keyCodeToStr(o)
      }
      e.toUserSettingsGeneral = i
      function s(o) {
        return pn.strToKeyCode(o) || vn.strToKeyCode(o)
      }
      e.fromUserSettings = s
      function a(o) {
        if (o >= 93 && o <= 108) return null
        switch (o) {
          case 16:
            return 'Up'
          case 18:
            return 'Down'
          case 15:
            return 'Left'
          case 17:
            return 'Right'
        }
        return Cr.keyCodeToStr(o)
      }
      e.toElectronAccelerator = a
    })(Zi || (Zi = {}))
    function $o(e, t) {
      const r = ((t & 65535) << 16) >>> 0
      return (e | r) >>> 0
    }
    class we extends G {
      constructor(t, r, n, i) {
        super(t, r, n, i),
          (this.selectionStartLineNumber = t),
          (this.selectionStartColumn = r),
          (this.positionLineNumber = n),
          (this.positionColumn = i)
      }
      toString() {
        return (
          '[' +
          this.selectionStartLineNumber +
          ',' +
          this.selectionStartColumn +
          ' -> ' +
          this.positionLineNumber +
          ',' +
          this.positionColumn +
          ']'
        )
      }
      equalsSelection(t) {
        return we.selectionsEqual(this, t)
      }
      static selectionsEqual(t, r) {
        return (
          t.selectionStartLineNumber === r.selectionStartLineNumber &&
          t.selectionStartColumn === r.selectionStartColumn &&
          t.positionLineNumber === r.positionLineNumber &&
          t.positionColumn === r.positionColumn
        )
      }
      getDirection() {
        return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn
          ? 0
          : 1
      }
      setEndPosition(t, r) {
        return this.getDirection() === 0
          ? new we(this.startLineNumber, this.startColumn, t, r)
          : new we(t, r, this.startLineNumber, this.startColumn)
      }
      getPosition() {
        return new de(this.positionLineNumber, this.positionColumn)
      }
      getSelectionStart() {
        return new de(this.selectionStartLineNumber, this.selectionStartColumn)
      }
      setStartPosition(t, r) {
        return this.getDirection() === 0
          ? new we(t, r, this.endLineNumber, this.endColumn)
          : new we(this.endLineNumber, this.endColumn, t, r)
      }
      static fromPositions(t, r = t) {
        return new we(t.lineNumber, t.column, r.lineNumber, r.column)
      }
      static fromRange(t, r) {
        return r === 0
          ? new we(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn)
          : new we(t.endLineNumber, t.endColumn, t.startLineNumber, t.startColumn)
      }
      static liftSelection(t) {
        return new we(t.selectionStartLineNumber, t.selectionStartColumn, t.positionLineNumber, t.positionColumn)
      }
      static selectionsArrEqual(t, r) {
        if ((t && !r) || (!t && r)) return !1
        if (!t && !r) return !0
        if (t.length !== r.length) return !1
        for (let n = 0, i = t.length; n < i; n++) if (!this.selectionsEqual(t[n], r[n])) return !1
        return !0
      }
      static isISelection(t) {
        return (
          t &&
          typeof t.selectionStartLineNumber == 'number' &&
          typeof t.selectionStartColumn == 'number' &&
          typeof t.positionLineNumber == 'number' &&
          typeof t.positionColumn == 'number'
        )
      }
      static createWithDirection(t, r, n, i, s) {
        return s === 0 ? new we(t, r, n, i) : new we(n, i, t, r)
      }
    }
    function Yi(e) {
      return typeof e == 'string'
    }
    function Nc(e) {
      return typeof e == 'object' && e !== null && !Array.isArray(e) && !(e instanceof RegExp) && !(e instanceof Date)
    }
    function kc(e) {
      const t = Object.getPrototypeOf(Uint8Array)
      return typeof e == 'object' && e instanceof t
    }
    function Ec(e) {
      return typeof e == 'number' && !isNaN(e)
    }
    function Mc(e) {
      return !!e && typeof e[Symbol.iterator] == 'function'
    }
    function Tc(e) {
      return e === !0 || e === !1
    }
    function Ho(e) {
      return typeof e == 'undefined'
    }
    function Pc(e) {
      return !yn(e)
    }
    function yn(e) {
      return Ho(e) || e === null
    }
    function Fc(e, t) {
      if (!e) throw new Error(t ? `Unexpected type, expected '${t}'` : 'Unexpected type')
    }
    function Dc(e) {
      if (yn(e)) throw new Error('Assertion Failed: argument is undefined or null')
      return e
    }
    function zo(e) {
      return typeof e == 'function'
    }
    function Ic(e, t) {
      const r = Math.min(e.length, t.length)
      for (let n = 0; n < r; n++) Go(e[n], t[n])
    }
    function Go(e, t) {
      if (Yi(t)) {
        if (typeof e !== t) throw new Error(`argument does not match constraint: typeof ${t}`)
      } else if (zo(t)) {
        try {
          if (e instanceof t) return
        } catch (r) {}
        if ((!yn(e) && e.constructor === t) || (t.length === 1 && t.call(void 0, e) === !0)) return
        throw new Error(
          'argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true',
        )
      }
    }
    function Rc(e) {
      return e === null ? void 0 : e
    }
    const _n = Object.create(null)
    function h(e, t) {
      if (Yi(t)) {
        const r = _n[t]
        if (r === void 0) throw new Error(`${e} references an unknown codicon: ${t}`)
        t = r
      }
      return (_n[e] = t), { id: e }
    }
    function Oc() {
      return _n
    }
    const V = {
      add: h('add', 6e4),
      plus: h('plus', 6e4),
      gistNew: h('gist-new', 6e4),
      repoCreate: h('repo-create', 6e4),
      lightbulb: h('lightbulb', 60001),
      lightBulb: h('light-bulb', 60001),
      repo: h('repo', 60002),
      repoDelete: h('repo-delete', 60002),
      gistFork: h('gist-fork', 60003),
      repoForked: h('repo-forked', 60003),
      gitPullRequest: h('git-pull-request', 60004),
      gitPullRequestAbandoned: h('git-pull-request-abandoned', 60004),
      recordKeys: h('record-keys', 60005),
      keyboard: h('keyboard', 60005),
      tag: h('tag', 60006),
      tagAdd: h('tag-add', 60006),
      tagRemove: h('tag-remove', 60006),
      person: h('person', 60007),
      personFollow: h('person-follow', 60007),
      personOutline: h('person-outline', 60007),
      personFilled: h('person-filled', 60007),
      gitBranch: h('git-branch', 60008),
      gitBranchCreate: h('git-branch-create', 60008),
      gitBranchDelete: h('git-branch-delete', 60008),
      sourceControl: h('source-control', 60008),
      mirror: h('mirror', 60009),
      mirrorPublic: h('mirror-public', 60009),
      star: h('star', 60010),
      starAdd: h('star-add', 60010),
      starDelete: h('star-delete', 60010),
      starEmpty: h('star-empty', 60010),
      comment: h('comment', 60011),
      commentAdd: h('comment-add', 60011),
      alert: h('alert', 60012),
      warning: h('warning', 60012),
      search: h('search', 60013),
      searchSave: h('search-save', 60013),
      logOut: h('log-out', 60014),
      signOut: h('sign-out', 60014),
      logIn: h('log-in', 60015),
      signIn: h('sign-in', 60015),
      eye: h('eye', 60016),
      eyeUnwatch: h('eye-unwatch', 60016),
      eyeWatch: h('eye-watch', 60016),
      circleFilled: h('circle-filled', 60017),
      primitiveDot: h('primitive-dot', 60017),
      closeDirty: h('close-dirty', 60017),
      debugBreakpoint: h('debug-breakpoint', 60017),
      debugBreakpointDisabled: h('debug-breakpoint-disabled', 60017),
      debugHint: h('debug-hint', 60017),
      primitiveSquare: h('primitive-square', 60018),
      edit: h('edit', 60019),
      pencil: h('pencil', 60019),
      info: h('info', 60020),
      issueOpened: h('issue-opened', 60020),
      gistPrivate: h('gist-private', 60021),
      gitForkPrivate: h('git-fork-private', 60021),
      lock: h('lock', 60021),
      mirrorPrivate: h('mirror-private', 60021),
      close: h('close', 60022),
      removeClose: h('remove-close', 60022),
      x: h('x', 60022),
      repoSync: h('repo-sync', 60023),
      sync: h('sync', 60023),
      clone: h('clone', 60024),
      desktopDownload: h('desktop-download', 60024),
      beaker: h('beaker', 60025),
      microscope: h('microscope', 60025),
      vm: h('vm', 60026),
      deviceDesktop: h('device-desktop', 60026),
      file: h('file', 60027),
      fileText: h('file-text', 60027),
      more: h('more', 60028),
      ellipsis: h('ellipsis', 60028),
      kebabHorizontal: h('kebab-horizontal', 60028),
      mailReply: h('mail-reply', 60029),
      reply: h('reply', 60029),
      organization: h('organization', 60030),
      organizationFilled: h('organization-filled', 60030),
      organizationOutline: h('organization-outline', 60030),
      newFile: h('new-file', 60031),
      fileAdd: h('file-add', 60031),
      newFolder: h('new-folder', 60032),
      fileDirectoryCreate: h('file-directory-create', 60032),
      trash: h('trash', 60033),
      trashcan: h('trashcan', 60033),
      history: h('history', 60034),
      clock: h('clock', 60034),
      folder: h('folder', 60035),
      fileDirectory: h('file-directory', 60035),
      symbolFolder: h('symbol-folder', 60035),
      logoGithub: h('logo-github', 60036),
      markGithub: h('mark-github', 60036),
      github: h('github', 60036),
      terminal: h('terminal', 60037),
      console: h('console', 60037),
      repl: h('repl', 60037),
      zap: h('zap', 60038),
      symbolEvent: h('symbol-event', 60038),
      error: h('error', 60039),
      stop: h('stop', 60039),
      variable: h('variable', 60040),
      symbolVariable: h('symbol-variable', 60040),
      array: h('array', 60042),
      symbolArray: h('symbol-array', 60042),
      symbolModule: h('symbol-module', 60043),
      symbolPackage: h('symbol-package', 60043),
      symbolNamespace: h('symbol-namespace', 60043),
      symbolObject: h('symbol-object', 60043),
      symbolMethod: h('symbol-method', 60044),
      symbolFunction: h('symbol-function', 60044),
      symbolConstructor: h('symbol-constructor', 60044),
      symbolBoolean: h('symbol-boolean', 60047),
      symbolNull: h('symbol-null', 60047),
      symbolNumeric: h('symbol-numeric', 60048),
      symbolNumber: h('symbol-number', 60048),
      symbolStructure: h('symbol-structure', 60049),
      symbolStruct: h('symbol-struct', 60049),
      symbolParameter: h('symbol-parameter', 60050),
      symbolTypeParameter: h('symbol-type-parameter', 60050),
      symbolKey: h('symbol-key', 60051),
      symbolText: h('symbol-text', 60051),
      symbolReference: h('symbol-reference', 60052),
      goToFile: h('go-to-file', 60052),
      symbolEnum: h('symbol-enum', 60053),
      symbolValue: h('symbol-value', 60053),
      symbolRuler: h('symbol-ruler', 60054),
      symbolUnit: h('symbol-unit', 60054),
      activateBreakpoints: h('activate-breakpoints', 60055),
      archive: h('archive', 60056),
      arrowBoth: h('arrow-both', 60057),
      arrowDown: h('arrow-down', 60058),
      arrowLeft: h('arrow-left', 60059),
      arrowRight: h('arrow-right', 60060),
      arrowSmallDown: h('arrow-small-down', 60061),
      arrowSmallLeft: h('arrow-small-left', 60062),
      arrowSmallRight: h('arrow-small-right', 60063),
      arrowSmallUp: h('arrow-small-up', 60064),
      arrowUp: h('arrow-up', 60065),
      bell: h('bell', 60066),
      bold: h('bold', 60067),
      book: h('book', 60068),
      bookmark: h('bookmark', 60069),
      debugBreakpointConditionalUnverified: h('debug-breakpoint-conditional-unverified', 60070),
      debugBreakpointConditional: h('debug-breakpoint-conditional', 60071),
      debugBreakpointConditionalDisabled: h('debug-breakpoint-conditional-disabled', 60071),
      debugBreakpointDataUnverified: h('debug-breakpoint-data-unverified', 60072),
      debugBreakpointData: h('debug-breakpoint-data', 60073),
      debugBreakpointDataDisabled: h('debug-breakpoint-data-disabled', 60073),
      debugBreakpointLogUnverified: h('debug-breakpoint-log-unverified', 60074),
      debugBreakpointLog: h('debug-breakpoint-log', 60075),
      debugBreakpointLogDisabled: h('debug-breakpoint-log-disabled', 60075),
      briefcase: h('briefcase', 60076),
      broadcast: h('broadcast', 60077),
      browser: h('browser', 60078),
      bug: h('bug', 60079),
      calendar: h('calendar', 60080),
      caseSensitive: h('case-sensitive', 60081),
      check: h('check', 60082),
      checklist: h('checklist', 60083),
      chevronDown: h('chevron-down', 60084),
      dropDownButton: h('drop-down-button', 60084),
      chevronLeft: h('chevron-left', 60085),
      chevronRight: h('chevron-right', 60086),
      chevronUp: h('chevron-up', 60087),
      chromeClose: h('chrome-close', 60088),
      chromeMaximize: h('chrome-maximize', 60089),
      chromeMinimize: h('chrome-minimize', 60090),
      chromeRestore: h('chrome-restore', 60091),
      circle: h('circle', 60092),
      circleOutline: h('circle-outline', 60092),
      debugBreakpointUnverified: h('debug-breakpoint-unverified', 60092),
      circleSlash: h('circle-slash', 60093),
      circuitBoard: h('circuit-board', 60094),
      clearAll: h('clear-all', 60095),
      clippy: h('clippy', 60096),
      closeAll: h('close-all', 60097),
      cloudDownload: h('cloud-download', 60098),
      cloudUpload: h('cloud-upload', 60099),
      code: h('code', 60100),
      collapseAll: h('collapse-all', 60101),
      colorMode: h('color-mode', 60102),
      commentDiscussion: h('comment-discussion', 60103),
      compareChanges: h('compare-changes', 60157),
      creditCard: h('credit-card', 60105),
      dash: h('dash', 60108),
      dashboard: h('dashboard', 60109),
      database: h('database', 60110),
      debugContinue: h('debug-continue', 60111),
      debugDisconnect: h('debug-disconnect', 60112),
      debugPause: h('debug-pause', 60113),
      debugRestart: h('debug-restart', 60114),
      debugStart: h('debug-start', 60115),
      debugStepInto: h('debug-step-into', 60116),
      debugStepOut: h('debug-step-out', 60117),
      debugStepOver: h('debug-step-over', 60118),
      debugStop: h('debug-stop', 60119),
      debug: h('debug', 60120),
      deviceCameraVideo: h('device-camera-video', 60121),
      deviceCamera: h('device-camera', 60122),
      deviceMobile: h('device-mobile', 60123),
      diffAdded: h('diff-added', 60124),
      diffIgnored: h('diff-ignored', 60125),
      diffModified: h('diff-modified', 60126),
      diffRemoved: h('diff-removed', 60127),
      diffRenamed: h('diff-renamed', 60128),
      diff: h('diff', 60129),
      discard: h('discard', 60130),
      editorLayout: h('editor-layout', 60131),
      emptyWindow: h('empty-window', 60132),
      exclude: h('exclude', 60133),
      extensions: h('extensions', 60134),
      eyeClosed: h('eye-closed', 60135),
      fileBinary: h('file-binary', 60136),
      fileCode: h('file-code', 60137),
      fileMedia: h('file-media', 60138),
      filePdf: h('file-pdf', 60139),
      fileSubmodule: h('file-submodule', 60140),
      fileSymlinkDirectory: h('file-symlink-directory', 60141),
      fileSymlinkFile: h('file-symlink-file', 60142),
      fileZip: h('file-zip', 60143),
      files: h('files', 60144),
      filter: h('filter', 60145),
      flame: h('flame', 60146),
      foldDown: h('fold-down', 60147),
      foldUp: h('fold-up', 60148),
      fold: h('fold', 60149),
      folderActive: h('folder-active', 60150),
      folderOpened: h('folder-opened', 60151),
      gear: h('gear', 60152),
      gift: h('gift', 60153),
      gistSecret: h('gist-secret', 60154),
      gist: h('gist', 60155),
      gitCommit: h('git-commit', 60156),
      gitCompare: h('git-compare', 60157),
      gitMerge: h('git-merge', 60158),
      githubAction: h('github-action', 60159),
      githubAlt: h('github-alt', 60160),
      globe: h('globe', 60161),
      grabber: h('grabber', 60162),
      graph: h('graph', 60163),
      gripper: h('gripper', 60164),
      heart: h('heart', 60165),
      home: h('home', 60166),
      horizontalRule: h('horizontal-rule', 60167),
      hubot: h('hubot', 60168),
      inbox: h('inbox', 60169),
      issueClosed: h('issue-closed', 60324),
      issueReopened: h('issue-reopened', 60171),
      issues: h('issues', 60172),
      italic: h('italic', 60173),
      jersey: h('jersey', 60174),
      json: h('json', 60175),
      bracket: h('bracket', 60175),
      kebabVertical: h('kebab-vertical', 60176),
      key: h('key', 60177),
      law: h('law', 60178),
      lightbulbAutofix: h('lightbulb-autofix', 60179),
      linkExternal: h('link-external', 60180),
      link: h('link', 60181),
      listOrdered: h('list-ordered', 60182),
      listUnordered: h('list-unordered', 60183),
      liveShare: h('live-share', 60184),
      loading: h('loading', 60185),
      location: h('location', 60186),
      mailRead: h('mail-read', 60187),
      mail: h('mail', 60188),
      markdown: h('markdown', 60189),
      megaphone: h('megaphone', 60190),
      mention: h('mention', 60191),
      milestone: h('milestone', 60192),
      mortarBoard: h('mortar-board', 60193),
      move: h('move', 60194),
      multipleWindows: h('multiple-windows', 60195),
      mute: h('mute', 60196),
      noNewline: h('no-newline', 60197),
      note: h('note', 60198),
      octoface: h('octoface', 60199),
      openPreview: h('open-preview', 60200),
      package_: h('package', 60201),
      paintcan: h('paintcan', 60202),
      pin: h('pin', 60203),
      play: h('play', 60204),
      run: h('run', 60204),
      plug: h('plug', 60205),
      preserveCase: h('preserve-case', 60206),
      preview: h('preview', 60207),
      project: h('project', 60208),
      pulse: h('pulse', 60209),
      question: h('question', 60210),
      quote: h('quote', 60211),
      radioTower: h('radio-tower', 60212),
      reactions: h('reactions', 60213),
      references: h('references', 60214),
      refresh: h('refresh', 60215),
      regex: h('regex', 60216),
      remoteExplorer: h('remote-explorer', 60217),
      remote: h('remote', 60218),
      remove: h('remove', 60219),
      replaceAll: h('replace-all', 60220),
      replace: h('replace', 60221),
      repoClone: h('repo-clone', 60222),
      repoForcePush: h('repo-force-push', 60223),
      repoPull: h('repo-pull', 60224),
      repoPush: h('repo-push', 60225),
      report: h('report', 60226),
      requestChanges: h('request-changes', 60227),
      rocket: h('rocket', 60228),
      rootFolderOpened: h('root-folder-opened', 60229),
      rootFolder: h('root-folder', 60230),
      rss: h('rss', 60231),
      ruby: h('ruby', 60232),
      saveAll: h('save-all', 60233),
      saveAs: h('save-as', 60234),
      save: h('save', 60235),
      screenFull: h('screen-full', 60236),
      screenNormal: h('screen-normal', 60237),
      searchStop: h('search-stop', 60238),
      server: h('server', 60240),
      settingsGear: h('settings-gear', 60241),
      settings: h('settings', 60242),
      shield: h('shield', 60243),
      smiley: h('smiley', 60244),
      sortPrecedence: h('sort-precedence', 60245),
      splitHorizontal: h('split-horizontal', 60246),
      splitVertical: h('split-vertical', 60247),
      squirrel: h('squirrel', 60248),
      starFull: h('star-full', 60249),
      starHalf: h('star-half', 60250),
      symbolClass: h('symbol-class', 60251),
      symbolColor: h('symbol-color', 60252),
      symbolCustomColor: h('symbol-customcolor', 60252),
      symbolConstant: h('symbol-constant', 60253),
      symbolEnumMember: h('symbol-enum-member', 60254),
      symbolField: h('symbol-field', 60255),
      symbolFile: h('symbol-file', 60256),
      symbolInterface: h('symbol-interface', 60257),
      symbolKeyword: h('symbol-keyword', 60258),
      symbolMisc: h('symbol-misc', 60259),
      symbolOperator: h('symbol-operator', 60260),
      symbolProperty: h('symbol-property', 60261),
      wrench: h('wrench', 60261),
      wrenchSubaction: h('wrench-subaction', 60261),
      symbolSnippet: h('symbol-snippet', 60262),
      tasklist: h('tasklist', 60263),
      telescope: h('telescope', 60264),
      textSize: h('text-size', 60265),
      threeBars: h('three-bars', 60266),
      thumbsdown: h('thumbsdown', 60267),
      thumbsup: h('thumbsup', 60268),
      tools: h('tools', 60269),
      triangleDown: h('triangle-down', 60270),
      triangleLeft: h('triangle-left', 60271),
      triangleRight: h('triangle-right', 60272),
      triangleUp: h('triangle-up', 60273),
      twitter: h('twitter', 60274),
      unfold: h('unfold', 60275),
      unlock: h('unlock', 60276),
      unmute: h('unmute', 60277),
      unverified: h('unverified', 60278),
      verified: h('verified', 60279),
      versions: h('versions', 60280),
      vmActive: h('vm-active', 60281),
      vmOutline: h('vm-outline', 60282),
      vmRunning: h('vm-running', 60283),
      watch: h('watch', 60284),
      whitespace: h('whitespace', 60285),
      wholeWord: h('whole-word', 60286),
      window: h('window', 60287),
      wordWrap: h('word-wrap', 60288),
      zoomIn: h('zoom-in', 60289),
      zoomOut: h('zoom-out', 60290),
      listFilter: h('list-filter', 60291),
      listFlat: h('list-flat', 60292),
      listSelection: h('list-selection', 60293),
      selection: h('selection', 60293),
      listTree: h('list-tree', 60294),
      debugBreakpointFunctionUnverified: h('debug-breakpoint-function-unverified', 60295),
      debugBreakpointFunction: h('debug-breakpoint-function', 60296),
      debugBreakpointFunctionDisabled: h('debug-breakpoint-function-disabled', 60296),
      debugStackframeActive: h('debug-stackframe-active', 60297),
      circleSmallFilled: h('circle-small-filled', 60298),
      debugStackframeDot: h('debug-stackframe-dot', 60298),
      debugStackframe: h('debug-stackframe', 60299),
      debugStackframeFocused: h('debug-stackframe-focused', 60299),
      debugBreakpointUnsupported: h('debug-breakpoint-unsupported', 60300),
      symbolString: h('symbol-string', 60301),
      debugReverseContinue: h('debug-reverse-continue', 60302),
      debugStepBack: h('debug-step-back', 60303),
      debugRestartFrame: h('debug-restart-frame', 60304),
      callIncoming: h('call-incoming', 60306),
      callOutgoing: h('call-outgoing', 60307),
      menu: h('menu', 60308),
      expandAll: h('expand-all', 60309),
      feedback: h('feedback', 60310),
      groupByRefType: h('group-by-ref-type', 60311),
      ungroupByRefType: h('ungroup-by-ref-type', 60312),
      account: h('account', 60313),
      bellDot: h('bell-dot', 60314),
      debugConsole: h('debug-console', 60315),
      library: h('library', 60316),
      output: h('output', 60317),
      runAll: h('run-all', 60318),
      syncIgnored: h('sync-ignored', 60319),
      pinned: h('pinned', 60320),
      githubInverted: h('github-inverted', 60321),
      debugAlt: h('debug-alt', 60305),
      serverProcess: h('server-process', 60322),
      serverEnvironment: h('server-environment', 60323),
      pass: h('pass', 60324),
      stopCircle: h('stop-circle', 60325),
      playCircle: h('play-circle', 60326),
      record: h('record', 60327),
      debugAltSmall: h('debug-alt-small', 60328),
      vmConnect: h('vm-connect', 60329),
      cloud: h('cloud', 60330),
      merge: h('merge', 60331),
      exportIcon: h('export', 60332),
      graphLeft: h('graph-left', 60333),
      magnet: h('magnet', 60334),
      notebook: h('notebook', 60335),
      redo: h('redo', 60336),
      checkAll: h('check-all', 60337),
      pinnedDirty: h('pinned-dirty', 60338),
      passFilled: h('pass-filled', 60339),
      circleLargeFilled: h('circle-large-filled', 60340),
      circleLarge: h('circle-large', 60341),
      circleLargeOutline: h('circle-large-outline', 60341),
      combine: h('combine', 60342),
      gather: h('gather', 60342),
      table: h('table', 60343),
      variableGroup: h('variable-group', 60344),
      typeHierarchy: h('type-hierarchy', 60345),
      typeHierarchySub: h('type-hierarchy-sub', 60346),
      typeHierarchySuper: h('type-hierarchy-super', 60347),
      gitPullRequestCreate: h('git-pull-request-create', 60348),
      runAbove: h('run-above', 60349),
      runBelow: h('run-below', 60350),
      notebookTemplate: h('notebook-template', 60351),
      debugRerun: h('debug-rerun', 60352),
      workspaceTrusted: h('workspace-trusted', 60353),
      workspaceUntrusted: h('workspace-untrusted', 60354),
      workspaceUnspecified: h('workspace-unspecified', 60355),
      terminalCmd: h('terminal-cmd', 60356),
      terminalDebian: h('terminal-debian', 60357),
      terminalLinux: h('terminal-linux', 60358),
      terminalPowershell: h('terminal-powershell', 60359),
      terminalTmux: h('terminal-tmux', 60360),
      terminalUbuntu: h('terminal-ubuntu', 60361),
      terminalBash: h('terminal-bash', 60362),
      arrowSwap: h('arrow-swap', 60363),
      copy: h('copy', 60364),
      personAdd: h('person-add', 60365),
      filterFilled: h('filter-filled', 60366),
      wand: h('wand', 60367),
      debugLineByLine: h('debug-line-by-line', 60368),
      inspect: h('inspect', 60369),
      layers: h('layers', 60370),
      layersDot: h('layers-dot', 60371),
      layersActive: h('layers-active', 60372),
      compass: h('compass', 60373),
      compassDot: h('compass-dot', 60374),
      compassActive: h('compass-active', 60375),
      azure: h('azure', 60376),
      issueDraft: h('issue-draft', 60377),
      gitPullRequestClosed: h('git-pull-request-closed', 60378),
      gitPullRequestDraft: h('git-pull-request-draft', 60379),
      debugAll: h('debug-all', 60380),
      debugCoverage: h('debug-coverage', 60381),
      runErrors: h('run-errors', 60382),
      folderLibrary: h('folder-library', 60383),
      debugContinueSmall: h('debug-continue-small', 60384),
      beakerStop: h('beaker-stop', 60385),
      graphLine: h('graph-line', 60386),
      graphScatter: h('graph-scatter', 60387),
      pieChart: h('pie-chart', 60388),
      bracketDot: h('bracket-dot', 60389),
      bracketError: h('bracket-error', 60390),
      lockSmall: h('lock-small', 60391),
      azureDevops: h('azure-devops', 60392),
      verifiedFilled: h('verified-filled', 60393),
      newLine: h('newline', 60394),
      layout: h('layout', 60395),
      layoutActivitybarLeft: h('layout-activitybar-left', 60396),
      layoutActivitybarRight: h('layout-activitybar-right', 60397),
      layoutPanelLeft: h('layout-panel-left', 60398),
      layoutPanelCenter: h('layout-panel-center', 60399),
      layoutPanelJustify: h('layout-panel-justify', 60400),
      layoutPanelRight: h('layout-panel-right', 60401),
      layoutPanel: h('layout-panel', 60402),
      layoutSidebarLeft: h('layout-sidebar-left', 60403),
      layoutSidebarRight: h('layout-sidebar-right', 60404),
      layoutStatusbar: h('layout-statusbar', 60405),
      layoutMenubar: h('layout-menubar', 60406),
      layoutCentered: h('layout-centered', 60407),
      layoutSidebarRightOff: h('layout-sidebar-right-off', 60416),
      layoutPanelOff: h('layout-panel-off', 60417),
      layoutSidebarLeftOff: h('layout-sidebar-left-off', 60418),
      target: h('target', 60408),
      indent: h('indent', 60409),
      recordSmall: h('record-small', 60410),
      errorSmall: h('error-small', 60411),
      arrowCircleDown: h('arrow-circle-down', 60412),
      arrowCircleLeft: h('arrow-circle-left', 60413),
      arrowCircleRight: h('arrow-circle-right', 60414),
      arrowCircleUp: h('arrow-circle-up', 60415),
      heartFilled: h('heart-filled', 60420),
      map: h('map', 60421),
      mapFilled: h('map-filled', 60422),
      circleSmall: h('circle-small', 60423),
      bellSlash: h('bell-slash', 60424),
      bellSlashDot: h('bell-slash-dot', 60425),
      commentUnresolved: h('comment-unresolved', 60426),
      gitPullRequestGoToChanges: h('git-pull-request-go-to-changes', 60427),
      gitPullRequestNewChanges: h('git-pull-request-new-changes', 60428),
      searchFuzzy: h('search-fuzzy', 60429),
      commentDraft: h('comment-draft', 60430),
      dialogError: h('dialog-error', 'error'),
      dialogWarning: h('dialog-warning', 'warning'),
      dialogInfo: h('dialog-info', 'info'),
      dialogClose: h('dialog-close', 'close'),
      treeItemExpanded: h('tree-item-expanded', 'chevron-down'),
      treeFilterOnTypeOn: h('tree-filter-on-type-on', 'list-filter'),
      treeFilterOnTypeOff: h('tree-filter-on-type-off', 'list-selection'),
      treeFilterClear: h('tree-filter-clear', 'close'),
      treeItemLoading: h('tree-item-loading', 'loading'),
      menuSelection: h('menu-selection', 'check'),
      menuSubmenu: h('menu-submenu', 'chevron-right'),
      menuBarMore: h('menubar-more', 'more'),
      scrollbarButtonLeft: h('scrollbar-button-left', 'triangle-left'),
      scrollbarButtonRight: h('scrollbar-button-right', 'triangle-right'),
      scrollbarButtonUp: h('scrollbar-button-up', 'triangle-up'),
      scrollbarButtonDown: h('scrollbar-button-down', 'triangle-down'),
      toolBarMore: h('toolbar-more', 'more'),
      quickInputBack: h('quick-input-back', 'arrow-left'),
    }
    var xn = function (e, t, r, n) {
      function i(s) {
        return s instanceof r
          ? s
          : new r(function (a) {
              a(s)
            })
      }
      return new (r || (r = Promise))(function (s, a) {
        function o(c) {
          try {
            u(n.next(c))
          } catch (f) {
            a(f)
          }
        }
        function l(c) {
          try {
            u(n.throw(c))
          } catch (f) {
            a(f)
          }
        }
        function u(c) {
          c.done ? s(c.value) : i(c.value).then(o, l)
        }
        u((n = n.apply(e, t || [])).next())
      })
    }
    class Jo {
      constructor() {
        ;(this._map = new Map()),
          (this._factories = new Map()),
          (this._onDidChange = new Ne()),
          (this.onDidChange = this._onDidChange.event),
          (this._colorMap = null)
      }
      fire(t) {
        this._onDidChange.fire({ changedLanguages: t, changedColorMap: !1 })
      }
      register(t, r) {
        return (
          this._map.set(t, r),
          this.fire([t]),
          hr(() => {
            this._map.get(t) === r && (this._map.delete(t), this.fire([t]))
          })
        )
      }
      registerFactory(t, r) {
        var n
        ;(n = this._factories.get(t)) === null || n === void 0 || n.dispose()
        const i = new Qo(this, t, r)
        return (
          this._factories.set(t, i),
          hr(() => {
            const s = this._factories.get(t)
            !s || s !== i || (this._factories.delete(t), s.dispose())
          })
        )
      }
      getOrCreate(t) {
        return xn(this, void 0, void 0, function* () {
          const r = this.get(t)
          if (r) return r
          const n = this._factories.get(t)
          return !n || n.isResolved ? null : (yield n.resolve(), this.get(t))
        })
      }
      get(t) {
        return this._map.get(t) || null
      }
      isResolved(t) {
        if (this.get(t)) return !0
        const n = this._factories.get(t)
        return !!(!n || n.isResolved)
      }
      setColorMap(t) {
        ;(this._colorMap = t),
          this._onDidChange.fire({ changedLanguages: Array.from(this._map.keys()), changedColorMap: !0 })
      }
      getColorMap() {
        return this._colorMap
      }
      getDefaultBackground() {
        return this._colorMap && this._colorMap.length > 2 ? this._colorMap[2] : null
      }
    }
    class Qo extends wt {
      get isResolved() {
        return this._isResolved
      }
      constructor(t, r, n) {
        super(),
          (this._registry = t),
          (this._languageId = r),
          (this._factory = n),
          (this._isDisposed = !1),
          (this._resolvePromise = null),
          (this._isResolved = !1)
      }
      dispose() {
        ;(this._isDisposed = !0), super.dispose()
      }
      resolve() {
        return xn(this, void 0, void 0, function* () {
          return this._resolvePromise || (this._resolvePromise = this._create()), this._resolvePromise
        })
      }
      _create() {
        return xn(this, void 0, void 0, function* () {
          const t = yield Promise.resolve(this._factory.createTokenizationSupport())
          ;(this._isResolved = !0),
            t && !this._isDisposed && this._register(this._registry.register(this._languageId, t))
        })
      }
    }
    class Xo {
      constructor(t, r, n) {
        ;(this.offset = t), (this.type = r), (this.language = n), (this._tokenBrand = void 0)
      }
      toString() {
        return '(' + this.offset + ', ' + this.type + ')'
      }
    }
    class Vc {
      constructor(t, r) {
        ;(this.tokens = t), (this.endState = r), (this._tokenizationResultBrand = void 0)
      }
    }
    class Bc {
      constructor(t, r) {
        ;(this.tokens = t), (this.endState = r), (this._encodedTokenizationResultBrand = void 0)
      }
    }
    var Ki
    ;(function (e) {
      const t = new Map()
      t.set(0, V.symbolMethod),
        t.set(1, V.symbolFunction),
        t.set(2, V.symbolConstructor),
        t.set(3, V.symbolField),
        t.set(4, V.symbolVariable),
        t.set(5, V.symbolClass),
        t.set(6, V.symbolStruct),
        t.set(7, V.symbolInterface),
        t.set(8, V.symbolModule),
        t.set(9, V.symbolProperty),
        t.set(10, V.symbolEvent),
        t.set(11, V.symbolOperator),
        t.set(12, V.symbolUnit),
        t.set(13, V.symbolValue),
        t.set(15, V.symbolEnum),
        t.set(14, V.symbolConstant),
        t.set(15, V.symbolEnum),
        t.set(16, V.symbolEnumMember),
        t.set(17, V.symbolKeyword),
        t.set(27, V.symbolSnippet),
        t.set(18, V.symbolText),
        t.set(19, V.symbolColor),
        t.set(20, V.symbolFile),
        t.set(21, V.symbolReference),
        t.set(22, V.symbolCustomColor),
        t.set(23, V.symbolFolder),
        t.set(24, V.symbolTypeParameter),
        t.set(25, V.account),
        t.set(26, V.issues)
      function r(s) {
        let a = t.get(s)
        return a || (console.info('No codicon found for CompletionItemKind ' + s), (a = V.symbolProperty)), a
      }
      e.toIcon = r
      const n = new Map()
      n.set('method', 0),
        n.set('function', 1),
        n.set('constructor', 2),
        n.set('field', 3),
        n.set('variable', 4),
        n.set('class', 5),
        n.set('struct', 6),
        n.set('interface', 7),
        n.set('module', 8),
        n.set('property', 9),
        n.set('event', 10),
        n.set('operator', 11),
        n.set('unit', 12),
        n.set('value', 13),
        n.set('constant', 14),
        n.set('enum', 15),
        n.set('enum-member', 16),
        n.set('enumMember', 16),
        n.set('keyword', 17),
        n.set('snippet', 27),
        n.set('text', 18),
        n.set('color', 19),
        n.set('file', 20),
        n.set('reference', 21),
        n.set('customcolor', 22),
        n.set('folder', 23),
        n.set('type-parameter', 24),
        n.set('typeParameter', 24),
        n.set('account', 25),
        n.set('issue', 26)
      function i(s, a) {
        let o = n.get(s)
        return typeof o == 'undefined' && !a && (o = 9), o
      }
      e.fromString = i
    })(Ki || (Ki = {}))
    var es
    ;(function (e) {
      ;(e[(e.Automatic = 0)] = 'Automatic'), (e[(e.Explicit = 1)] = 'Explicit')
    })(es || (es = {}))
    var ts
    ;(function (e) {
      ;(e[(e.Invoke = 1)] = 'Invoke'),
        (e[(e.TriggerCharacter = 2)] = 'TriggerCharacter'),
        (e[(e.ContentChange = 3)] = 'ContentChange')
    })(ts || (ts = {}))
    var rs
    ;(function (e) {
      ;(e[(e.Text = 0)] = 'Text'), (e[(e.Read = 1)] = 'Read'), (e[(e.Write = 2)] = 'Write')
    })(rs || (rs = {}))
    function Uc(e) {
      return (
        e &&
        URI.isUri(e.uri) &&
        Range.isIRange(e.range) &&
        (Range.isIRange(e.originSelectionRange) || Range.isIRange(e.targetSelectionRange))
      )
    }
    var ns
    ;(function (e) {
      const t = new Map()
      t.set(0, V.symbolFile),
        t.set(1, V.symbolModule),
        t.set(2, V.symbolNamespace),
        t.set(3, V.symbolPackage),
        t.set(4, V.symbolClass),
        t.set(5, V.symbolMethod),
        t.set(6, V.symbolProperty),
        t.set(7, V.symbolField),
        t.set(8, V.symbolConstructor),
        t.set(9, V.symbolEnum),
        t.set(10, V.symbolInterface),
        t.set(11, V.symbolFunction),
        t.set(12, V.symbolVariable),
        t.set(13, V.symbolConstant),
        t.set(14, V.symbolString),
        t.set(15, V.symbolNumber),
        t.set(16, V.symbolBoolean),
        t.set(17, V.symbolArray),
        t.set(18, V.symbolObject),
        t.set(19, V.symbolKey),
        t.set(20, V.symbolNull),
        t.set(21, V.symbolEnumMember),
        t.set(22, V.symbolStruct),
        t.set(23, V.symbolEvent),
        t.set(24, V.symbolOperator),
        t.set(25, V.symbolTypeParameter)
      function r(n) {
        let i = t.get(n)
        return i || (console.info('No codicon found for SymbolKind ' + n), (i = V.symbolProperty)), i
      }
      e.toIcon = r
    })(ns || (ns = {}))
    class Ie {
      static fromValue(t) {
        switch (t) {
          case 'comment':
            return Ie.Comment
          case 'imports':
            return Ie.Imports
          case 'region':
            return Ie.Region
        }
        return new Ie(t)
      }
      constructor(t) {
        this.value = t
      }
    }
    ;(Ie.Comment = new Ie('comment')), (Ie.Imports = new Ie('imports')), (Ie.Region = new Ie('region'))
    var is
    ;(function (e) {
      function t(r) {
        return !r || typeof r != 'object' ? !1 : typeof r.id == 'string' && typeof r.title == 'string'
      }
      e.is = t
    })(is || (is = {}))
    var ss
    ;(function (e) {
      ;(e[(e.Type = 1)] = 'Type'), (e[(e.Parameter = 2)] = 'Parameter')
    })(ss || (ss = {}))
    const jc = new Jo()
    var as
    ;(function (e) {
      ;(e[(e.Unknown = 0)] = 'Unknown'), (e[(e.Disabled = 1)] = 'Disabled'), (e[(e.Enabled = 2)] = 'Enabled')
    })(as || (as = {}))
    var os
    ;(function (e) {
      ;(e[(e.Invoke = 1)] = 'Invoke'), (e[(e.Auto = 2)] = 'Auto')
    })(os || (os = {}))
    var ls
    ;(function (e) {
      ;(e[(e.None = 0)] = 'None'),
        (e[(e.KeepWhitespace = 1)] = 'KeepWhitespace'),
        (e[(e.InsertAsSnippet = 4)] = 'InsertAsSnippet')
    })(ls || (ls = {}))
    var us
    ;(function (e) {
      ;(e[(e.Method = 0)] = 'Method'),
        (e[(e.Function = 1)] = 'Function'),
        (e[(e.Constructor = 2)] = 'Constructor'),
        (e[(e.Field = 3)] = 'Field'),
        (e[(e.Variable = 4)] = 'Variable'),
        (e[(e.Class = 5)] = 'Class'),
        (e[(e.Struct = 6)] = 'Struct'),
        (e[(e.Interface = 7)] = 'Interface'),
        (e[(e.Module = 8)] = 'Module'),
        (e[(e.Property = 9)] = 'Property'),
        (e[(e.Event = 10)] = 'Event'),
        (e[(e.Operator = 11)] = 'Operator'),
        (e[(e.Unit = 12)] = 'Unit'),
        (e[(e.Value = 13)] = 'Value'),
        (e[(e.Constant = 14)] = 'Constant'),
        (e[(e.Enum = 15)] = 'Enum'),
        (e[(e.EnumMember = 16)] = 'EnumMember'),
        (e[(e.Keyword = 17)] = 'Keyword'),
        (e[(e.Text = 18)] = 'Text'),
        (e[(e.Color = 19)] = 'Color'),
        (e[(e.File = 20)] = 'File'),
        (e[(e.Reference = 21)] = 'Reference'),
        (e[(e.Customcolor = 22)] = 'Customcolor'),
        (e[(e.Folder = 23)] = 'Folder'),
        (e[(e.TypeParameter = 24)] = 'TypeParameter'),
        (e[(e.User = 25)] = 'User'),
        (e[(e.Issue = 26)] = 'Issue'),
        (e[(e.Snippet = 27)] = 'Snippet')
    })(us || (us = {}))
    var cs
    ;(function (e) {
      e[(e.Deprecated = 1)] = 'Deprecated'
    })(cs || (cs = {}))
    var fs
    ;(function (e) {
      ;(e[(e.Invoke = 0)] = 'Invoke'),
        (e[(e.TriggerCharacter = 1)] = 'TriggerCharacter'),
        (e[(e.TriggerForIncompleteCompletions = 2)] = 'TriggerForIncompleteCompletions')
    })(fs || (fs = {}))
    var hs
    ;(function (e) {
      ;(e[(e.EXACT = 0)] = 'EXACT'), (e[(e.ABOVE = 1)] = 'ABOVE'), (e[(e.BELOW = 2)] = 'BELOW')
    })(hs || (hs = {}))
    var ds
    ;(function (e) {
      ;(e[(e.NotSet = 0)] = 'NotSet'),
        (e[(e.ContentFlush = 1)] = 'ContentFlush'),
        (e[(e.RecoverFromMarkers = 2)] = 'RecoverFromMarkers'),
        (e[(e.Explicit = 3)] = 'Explicit'),
        (e[(e.Paste = 4)] = 'Paste'),
        (e[(e.Undo = 5)] = 'Undo'),
        (e[(e.Redo = 6)] = 'Redo')
    })(ds || (ds = {}))
    var gs
    ;(function (e) {
      ;(e[(e.LF = 1)] = 'LF'), (e[(e.CRLF = 2)] = 'CRLF')
    })(gs || (gs = {}))
    var ms
    ;(function (e) {
      ;(e[(e.Text = 0)] = 'Text'), (e[(e.Read = 1)] = 'Read'), (e[(e.Write = 2)] = 'Write')
    })(ms || (ms = {}))
    var ps
    ;(function (e) {
      ;(e[(e.None = 0)] = 'None'),
        (e[(e.Keep = 1)] = 'Keep'),
        (e[(e.Brackets = 2)] = 'Brackets'),
        (e[(e.Advanced = 3)] = 'Advanced'),
        (e[(e.Full = 4)] = 'Full')
    })(ps || (ps = {}))
    var vs
    ;(function (e) {
      ;(e[(e.acceptSuggestionOnCommitCharacter = 0)] = 'acceptSuggestionOnCommitCharacter'),
        (e[(e.acceptSuggestionOnEnter = 1)] = 'acceptSuggestionOnEnter'),
        (e[(e.accessibilitySupport = 2)] = 'accessibilitySupport'),
        (e[(e.accessibilityPageSize = 3)] = 'accessibilityPageSize'),
        (e[(e.ariaLabel = 4)] = 'ariaLabel'),
        (e[(e.autoClosingBrackets = 5)] = 'autoClosingBrackets'),
        (e[(e.autoClosingDelete = 6)] = 'autoClosingDelete'),
        (e[(e.autoClosingOvertype = 7)] = 'autoClosingOvertype'),
        (e[(e.autoClosingQuotes = 8)] = 'autoClosingQuotes'),
        (e[(e.autoIndent = 9)] = 'autoIndent'),
        (e[(e.automaticLayout = 10)] = 'automaticLayout'),
        (e[(e.autoSurround = 11)] = 'autoSurround'),
        (e[(e.bracketPairColorization = 12)] = 'bracketPairColorization'),
        (e[(e.guides = 13)] = 'guides'),
        (e[(e.codeLens = 14)] = 'codeLens'),
        (e[(e.codeLensFontFamily = 15)] = 'codeLensFontFamily'),
        (e[(e.codeLensFontSize = 16)] = 'codeLensFontSize'),
        (e[(e.colorDecorators = 17)] = 'colorDecorators'),
        (e[(e.colorDecoratorsLimit = 18)] = 'colorDecoratorsLimit'),
        (e[(e.columnSelection = 19)] = 'columnSelection'),
        (e[(e.comments = 20)] = 'comments'),
        (e[(e.contextmenu = 21)] = 'contextmenu'),
        (e[(e.copyWithSyntaxHighlighting = 22)] = 'copyWithSyntaxHighlighting'),
        (e[(e.cursorBlinking = 23)] = 'cursorBlinking'),
        (e[(e.cursorSmoothCaretAnimation = 24)] = 'cursorSmoothCaretAnimation'),
        (e[(e.cursorStyle = 25)] = 'cursorStyle'),
        (e[(e.cursorSurroundingLines = 26)] = 'cursorSurroundingLines'),
        (e[(e.cursorSurroundingLinesStyle = 27)] = 'cursorSurroundingLinesStyle'),
        (e[(e.cursorWidth = 28)] = 'cursorWidth'),
        (e[(e.disableLayerHinting = 29)] = 'disableLayerHinting'),
        (e[(e.disableMonospaceOptimizations = 30)] = 'disableMonospaceOptimizations'),
        (e[(e.domReadOnly = 31)] = 'domReadOnly'),
        (e[(e.dragAndDrop = 32)] = 'dragAndDrop'),
        (e[(e.dropIntoEditor = 33)] = 'dropIntoEditor'),
        (e[(e.emptySelectionClipboard = 34)] = 'emptySelectionClipboard'),
        (e[(e.experimentalWhitespaceRendering = 35)] = 'experimentalWhitespaceRendering'),
        (e[(e.extraEditorClassName = 36)] = 'extraEditorClassName'),
        (e[(e.fastScrollSensitivity = 37)] = 'fastScrollSensitivity'),
        (e[(e.find = 38)] = 'find'),
        (e[(e.fixedOverflowWidgets = 39)] = 'fixedOverflowWidgets'),
        (e[(e.folding = 40)] = 'folding'),
        (e[(e.foldingStrategy = 41)] = 'foldingStrategy'),
        (e[(e.foldingHighlight = 42)] = 'foldingHighlight'),
        (e[(e.foldingImportsByDefault = 43)] = 'foldingImportsByDefault'),
        (e[(e.foldingMaximumRegions = 44)] = 'foldingMaximumRegions'),
        (e[(e.unfoldOnClickAfterEndOfLine = 45)] = 'unfoldOnClickAfterEndOfLine'),
        (e[(e.fontFamily = 46)] = 'fontFamily'),
        (e[(e.fontInfo = 47)] = 'fontInfo'),
        (e[(e.fontLigatures = 48)] = 'fontLigatures'),
        (e[(e.fontSize = 49)] = 'fontSize'),
        (e[(e.fontWeight = 50)] = 'fontWeight'),
        (e[(e.fontVariations = 51)] = 'fontVariations'),
        (e[(e.formatOnPaste = 52)] = 'formatOnPaste'),
        (e[(e.formatOnType = 53)] = 'formatOnType'),
        (e[(e.glyphMargin = 54)] = 'glyphMargin'),
        (e[(e.gotoLocation = 55)] = 'gotoLocation'),
        (e[(e.hideCursorInOverviewRuler = 56)] = 'hideCursorInOverviewRuler'),
        (e[(e.hover = 57)] = 'hover'),
        (e[(e.inDiffEditor = 58)] = 'inDiffEditor'),
        (e[(e.inlineSuggest = 59)] = 'inlineSuggest'),
        (e[(e.letterSpacing = 60)] = 'letterSpacing'),
        (e[(e.lightbulb = 61)] = 'lightbulb'),
        (e[(e.lineDecorationsWidth = 62)] = 'lineDecorationsWidth'),
        (e[(e.lineHeight = 63)] = 'lineHeight'),
        (e[(e.lineNumbers = 64)] = 'lineNumbers'),
        (e[(e.lineNumbersMinChars = 65)] = 'lineNumbersMinChars'),
        (e[(e.linkedEditing = 66)] = 'linkedEditing'),
        (e[(e.links = 67)] = 'links'),
        (e[(e.matchBrackets = 68)] = 'matchBrackets'),
        (e[(e.minimap = 69)] = 'minimap'),
        (e[(e.mouseStyle = 70)] = 'mouseStyle'),
        (e[(e.mouseWheelScrollSensitivity = 71)] = 'mouseWheelScrollSensitivity'),
        (e[(e.mouseWheelZoom = 72)] = 'mouseWheelZoom'),
        (e[(e.multiCursorMergeOverlapping = 73)] = 'multiCursorMergeOverlapping'),
        (e[(e.multiCursorModifier = 74)] = 'multiCursorModifier'),
        (e[(e.multiCursorPaste = 75)] = 'multiCursorPaste'),
        (e[(e.multiCursorLimit = 76)] = 'multiCursorLimit'),
        (e[(e.occurrencesHighlight = 77)] = 'occurrencesHighlight'),
        (e[(e.overviewRulerBorder = 78)] = 'overviewRulerBorder'),
        (e[(e.overviewRulerLanes = 79)] = 'overviewRulerLanes'),
        (e[(e.padding = 80)] = 'padding'),
        (e[(e.parameterHints = 81)] = 'parameterHints'),
        (e[(e.peekWidgetDefaultFocus = 82)] = 'peekWidgetDefaultFocus'),
        (e[(e.definitionLinkOpensInPeek = 83)] = 'definitionLinkOpensInPeek'),
        (e[(e.quickSuggestions = 84)] = 'quickSuggestions'),
        (e[(e.quickSuggestionsDelay = 85)] = 'quickSuggestionsDelay'),
        (e[(e.readOnly = 86)] = 'readOnly'),
        (e[(e.renameOnType = 87)] = 'renameOnType'),
        (e[(e.renderControlCharacters = 88)] = 'renderControlCharacters'),
        (e[(e.renderFinalNewline = 89)] = 'renderFinalNewline'),
        (e[(e.renderLineHighlight = 90)] = 'renderLineHighlight'),
        (e[(e.renderLineHighlightOnlyWhenFocus = 91)] = 'renderLineHighlightOnlyWhenFocus'),
        (e[(e.renderValidationDecorations = 92)] = 'renderValidationDecorations'),
        (e[(e.renderWhitespace = 93)] = 'renderWhitespace'),
        (e[(e.revealHorizontalRightPadding = 94)] = 'revealHorizontalRightPadding'),
        (e[(e.roundedSelection = 95)] = 'roundedSelection'),
        (e[(e.rulers = 96)] = 'rulers'),
        (e[(e.scrollbar = 97)] = 'scrollbar'),
        (e[(e.scrollBeyondLastColumn = 98)] = 'scrollBeyondLastColumn'),
        (e[(e.scrollBeyondLastLine = 99)] = 'scrollBeyondLastLine'),
        (e[(e.scrollPredominantAxis = 100)] = 'scrollPredominantAxis'),
        (e[(e.selectionClipboard = 101)] = 'selectionClipboard'),
        (e[(e.selectionHighlight = 102)] = 'selectionHighlight'),
        (e[(e.selectOnLineNumbers = 103)] = 'selectOnLineNumbers'),
        (e[(e.showFoldingControls = 104)] = 'showFoldingControls'),
        (e[(e.showUnused = 105)] = 'showUnused'),
        (e[(e.snippetSuggestions = 106)] = 'snippetSuggestions'),
        (e[(e.smartSelect = 107)] = 'smartSelect'),
        (e[(e.smoothScrolling = 108)] = 'smoothScrolling'),
        (e[(e.stickyScroll = 109)] = 'stickyScroll'),
        (e[(e.stickyTabStops = 110)] = 'stickyTabStops'),
        (e[(e.stopRenderingLineAfter = 111)] = 'stopRenderingLineAfter'),
        (e[(e.suggest = 112)] = 'suggest'),
        (e[(e.suggestFontSize = 113)] = 'suggestFontSize'),
        (e[(e.suggestLineHeight = 114)] = 'suggestLineHeight'),
        (e[(e.suggestOnTriggerCharacters = 115)] = 'suggestOnTriggerCharacters'),
        (e[(e.suggestSelection = 116)] = 'suggestSelection'),
        (e[(e.tabCompletion = 117)] = 'tabCompletion'),
        (e[(e.tabIndex = 118)] = 'tabIndex'),
        (e[(e.unicodeHighlighting = 119)] = 'unicodeHighlighting'),
        (e[(e.unusualLineTerminators = 120)] = 'unusualLineTerminators'),
        (e[(e.useShadowDOM = 121)] = 'useShadowDOM'),
        (e[(e.useTabStops = 122)] = 'useTabStops'),
        (e[(e.wordBreak = 123)] = 'wordBreak'),
        (e[(e.wordSeparators = 124)] = 'wordSeparators'),
        (e[(e.wordWrap = 125)] = 'wordWrap'),
        (e[(e.wordWrapBreakAfterCharacters = 126)] = 'wordWrapBreakAfterCharacters'),
        (e[(e.wordWrapBreakBeforeCharacters = 127)] = 'wordWrapBreakBeforeCharacters'),
        (e[(e.wordWrapColumn = 128)] = 'wordWrapColumn'),
        (e[(e.wordWrapOverride1 = 129)] = 'wordWrapOverride1'),
        (e[(e.wordWrapOverride2 = 130)] = 'wordWrapOverride2'),
        (e[(e.wrappingIndent = 131)] = 'wrappingIndent'),
        (e[(e.wrappingStrategy = 132)] = 'wrappingStrategy'),
        (e[(e.showDeprecated = 133)] = 'showDeprecated'),
        (e[(e.inlayHints = 134)] = 'inlayHints'),
        (e[(e.editorClassName = 135)] = 'editorClassName'),
        (e[(e.pixelRatio = 136)] = 'pixelRatio'),
        (e[(e.tabFocusMode = 137)] = 'tabFocusMode'),
        (e[(e.layoutInfo = 138)] = 'layoutInfo'),
        (e[(e.wrappingInfo = 139)] = 'wrappingInfo')
    })(vs || (vs = {}))
    var bs
    ;(function (e) {
      ;(e[(e.TextDefined = 0)] = 'TextDefined'), (e[(e.LF = 1)] = 'LF'), (e[(e.CRLF = 2)] = 'CRLF')
    })(bs || (bs = {}))
    var ys
    ;(function (e) {
      ;(e[(e.LF = 0)] = 'LF'), (e[(e.CRLF = 1)] = 'CRLF')
    })(ys || (ys = {}))
    var _s
    ;(function (e) {
      ;(e[(e.None = 0)] = 'None'),
        (e[(e.Indent = 1)] = 'Indent'),
        (e[(e.IndentOutdent = 2)] = 'IndentOutdent'),
        (e[(e.Outdent = 3)] = 'Outdent')
    })(_s || (_s = {}))
    var xs
    ;(function (e) {
      ;(e[(e.Both = 0)] = 'Both'), (e[(e.Right = 1)] = 'Right'), (e[(e.Left = 2)] = 'Left'), (e[(e.None = 3)] = 'None')
    })(xs || (xs = {}))
    var ws
    ;(function (e) {
      ;(e[(e.Type = 1)] = 'Type'), (e[(e.Parameter = 2)] = 'Parameter')
    })(ws || (ws = {}))
    var Ss
    ;(function (e) {
      ;(e[(e.Automatic = 0)] = 'Automatic'), (e[(e.Explicit = 1)] = 'Explicit')
    })(Ss || (Ss = {}))
    var wn
    ;(function (e) {
      ;(e[(e.DependsOnKbLayout = -1)] = 'DependsOnKbLayout'),
        (e[(e.Unknown = 0)] = 'Unknown'),
        (e[(e.Backspace = 1)] = 'Backspace'),
        (e[(e.Tab = 2)] = 'Tab'),
        (e[(e.Enter = 3)] = 'Enter'),
        (e[(e.Shift = 4)] = 'Shift'),
        (e[(e.Ctrl = 5)] = 'Ctrl'),
        (e[(e.Alt = 6)] = 'Alt'),
        (e[(e.PauseBreak = 7)] = 'PauseBreak'),
        (e[(e.CapsLock = 8)] = 'CapsLock'),
        (e[(e.Escape = 9)] = 'Escape'),
        (e[(e.Space = 10)] = 'Space'),
        (e[(e.PageUp = 11)] = 'PageUp'),
        (e[(e.PageDown = 12)] = 'PageDown'),
        (e[(e.End = 13)] = 'End'),
        (e[(e.Home = 14)] = 'Home'),
        (e[(e.LeftArrow = 15)] = 'LeftArrow'),
        (e[(e.UpArrow = 16)] = 'UpArrow'),
        (e[(e.RightArrow = 17)] = 'RightArrow'),
        (e[(e.DownArrow = 18)] = 'DownArrow'),
        (e[(e.Insert = 19)] = 'Insert'),
        (e[(e.Delete = 20)] = 'Delete'),
        (e[(e.Digit0 = 21)] = 'Digit0'),
        (e[(e.Digit1 = 22)] = 'Digit1'),
        (e[(e.Digit2 = 23)] = 'Digit2'),
        (e[(e.Digit3 = 24)] = 'Digit3'),
        (e[(e.Digit4 = 25)] = 'Digit4'),
        (e[(e.Digit5 = 26)] = 'Digit5'),
        (e[(e.Digit6 = 27)] = 'Digit6'),
        (e[(e.Digit7 = 28)] = 'Digit7'),
        (e[(e.Digit8 = 29)] = 'Digit8'),
        (e[(e.Digit9 = 30)] = 'Digit9'),
        (e[(e.KeyA = 31)] = 'KeyA'),
        (e[(e.KeyB = 32)] = 'KeyB'),
        (e[(e.KeyC = 33)] = 'KeyC'),
        (e[(e.KeyD = 34)] = 'KeyD'),
        (e[(e.KeyE = 35)] = 'KeyE'),
        (e[(e.KeyF = 36)] = 'KeyF'),
        (e[(e.KeyG = 37)] = 'KeyG'),
        (e[(e.KeyH = 38)] = 'KeyH'),
        (e[(e.KeyI = 39)] = 'KeyI'),
        (e[(e.KeyJ = 40)] = 'KeyJ'),
        (e[(e.KeyK = 41)] = 'KeyK'),
        (e[(e.KeyL = 42)] = 'KeyL'),
        (e[(e.KeyM = 43)] = 'KeyM'),
        (e[(e.KeyN = 44)] = 'KeyN'),
        (e[(e.KeyO = 45)] = 'KeyO'),
        (e[(e.KeyP = 46)] = 'KeyP'),
        (e[(e.KeyQ = 47)] = 'KeyQ'),
        (e[(e.KeyR = 48)] = 'KeyR'),
        (e[(e.KeyS = 49)] = 'KeyS'),
        (e[(e.KeyT = 50)] = 'KeyT'),
        (e[(e.KeyU = 51)] = 'KeyU'),
        (e[(e.KeyV = 52)] = 'KeyV'),
        (e[(e.KeyW = 53)] = 'KeyW'),
        (e[(e.KeyX = 54)] = 'KeyX'),
        (e[(e.KeyY = 55)] = 'KeyY'),
        (e[(e.KeyZ = 56)] = 'KeyZ'),
        (e[(e.Meta = 57)] = 'Meta'),
        (e[(e.ContextMenu = 58)] = 'ContextMenu'),
        (e[(e.F1 = 59)] = 'F1'),
        (e[(e.F2 = 60)] = 'F2'),
        (e[(e.F3 = 61)] = 'F3'),
        (e[(e.F4 = 62)] = 'F4'),
        (e[(e.F5 = 63)] = 'F5'),
        (e[(e.F6 = 64)] = 'F6'),
        (e[(e.F7 = 65)] = 'F7'),
        (e[(e.F8 = 66)] = 'F8'),
        (e[(e.F9 = 67)] = 'F9'),
        (e[(e.F10 = 68)] = 'F10'),
        (e[(e.F11 = 69)] = 'F11'),
        (e[(e.F12 = 70)] = 'F12'),
        (e[(e.F13 = 71)] = 'F13'),
        (e[(e.F14 = 72)] = 'F14'),
        (e[(e.F15 = 73)] = 'F15'),
        (e[(e.F16 = 74)] = 'F16'),
        (e[(e.F17 = 75)] = 'F17'),
        (e[(e.F18 = 76)] = 'F18'),
        (e[(e.F19 = 77)] = 'F19'),
        (e[(e.NumLock = 78)] = 'NumLock'),
        (e[(e.ScrollLock = 79)] = 'ScrollLock'),
        (e[(e.Semicolon = 80)] = 'Semicolon'),
        (e[(e.Equal = 81)] = 'Equal'),
        (e[(e.Comma = 82)] = 'Comma'),
        (e[(e.Minus = 83)] = 'Minus'),
        (e[(e.Period = 84)] = 'Period'),
        (e[(e.Slash = 85)] = 'Slash'),
        (e[(e.Backquote = 86)] = 'Backquote'),
        (e[(e.BracketLeft = 87)] = 'BracketLeft'),
        (e[(e.Backslash = 88)] = 'Backslash'),
        (e[(e.BracketRight = 89)] = 'BracketRight'),
        (e[(e.Quote = 90)] = 'Quote'),
        (e[(e.OEM_8 = 91)] = 'OEM_8'),
        (e[(e.IntlBackslash = 92)] = 'IntlBackslash'),
        (e[(e.Numpad0 = 93)] = 'Numpad0'),
        (e[(e.Numpad1 = 94)] = 'Numpad1'),
        (e[(e.Numpad2 = 95)] = 'Numpad2'),
        (e[(e.Numpad3 = 96)] = 'Numpad3'),
        (e[(e.Numpad4 = 97)] = 'Numpad4'),
        (e[(e.Numpad5 = 98)] = 'Numpad5'),
        (e[(e.Numpad6 = 99)] = 'Numpad6'),
        (e[(e.Numpad7 = 100)] = 'Numpad7'),
        (e[(e.Numpad8 = 101)] = 'Numpad8'),
        (e[(e.Numpad9 = 102)] = 'Numpad9'),
        (e[(e.NumpadMultiply = 103)] = 'NumpadMultiply'),
        (e[(e.NumpadAdd = 104)] = 'NumpadAdd'),
        (e[(e.NUMPAD_SEPARATOR = 105)] = 'NUMPAD_SEPARATOR'),
        (e[(e.NumpadSubtract = 106)] = 'NumpadSubtract'),
        (e[(e.NumpadDecimal = 107)] = 'NumpadDecimal'),
        (e[(e.NumpadDivide = 108)] = 'NumpadDivide'),
        (e[(e.KEY_IN_COMPOSITION = 109)] = 'KEY_IN_COMPOSITION'),
        (e[(e.ABNT_C1 = 110)] = 'ABNT_C1'),
        (e[(e.ABNT_C2 = 111)] = 'ABNT_C2'),
        (e[(e.AudioVolumeMute = 112)] = 'AudioVolumeMute'),
        (e[(e.AudioVolumeUp = 113)] = 'AudioVolumeUp'),
        (e[(e.AudioVolumeDown = 114)] = 'AudioVolumeDown'),
        (e[(e.BrowserSearch = 115)] = 'BrowserSearch'),
        (e[(e.BrowserHome = 116)] = 'BrowserHome'),
        (e[(e.BrowserBack = 117)] = 'BrowserBack'),
        (e[(e.BrowserForward = 118)] = 'BrowserForward'),
        (e[(e.MediaTrackNext = 119)] = 'MediaTrackNext'),
        (e[(e.MediaTrackPrevious = 120)] = 'MediaTrackPrevious'),
        (e[(e.MediaStop = 121)] = 'MediaStop'),
        (e[(e.MediaPlayPause = 122)] = 'MediaPlayPause'),
        (e[(e.LaunchMediaPlayer = 123)] = 'LaunchMediaPlayer'),
        (e[(e.LaunchMail = 124)] = 'LaunchMail'),
        (e[(e.LaunchApp2 = 125)] = 'LaunchApp2'),
        (e[(e.Clear = 126)] = 'Clear'),
        (e[(e.MAX_VALUE = 127)] = 'MAX_VALUE')
    })(wn || (wn = {}))
    var Sn
    ;(function (e) {
      ;(e[(e.Hint = 1)] = 'Hint'),
        (e[(e.Info = 2)] = 'Info'),
        (e[(e.Warning = 4)] = 'Warning'),
        (e[(e.Error = 8)] = 'Error')
    })(Sn || (Sn = {}))
    var An
    ;(function (e) {
      ;(e[(e.Unnecessary = 1)] = 'Unnecessary'), (e[(e.Deprecated = 2)] = 'Deprecated')
    })(An || (An = {}))
    var As
    ;(function (e) {
      ;(e[(e.Inline = 1)] = 'Inline'), (e[(e.Gutter = 2)] = 'Gutter')
    })(As || (As = {}))
    var Ls
    ;(function (e) {
      ;(e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
        (e[(e.TEXTAREA = 1)] = 'TEXTAREA'),
        (e[(e.GUTTER_GLYPH_MARGIN = 2)] = 'GUTTER_GLYPH_MARGIN'),
        (e[(e.GUTTER_LINE_NUMBERS = 3)] = 'GUTTER_LINE_NUMBERS'),
        (e[(e.GUTTER_LINE_DECORATIONS = 4)] = 'GUTTER_LINE_DECORATIONS'),
        (e[(e.GUTTER_VIEW_ZONE = 5)] = 'GUTTER_VIEW_ZONE'),
        (e[(e.CONTENT_TEXT = 6)] = 'CONTENT_TEXT'),
        (e[(e.CONTENT_EMPTY = 7)] = 'CONTENT_EMPTY'),
        (e[(e.CONTENT_VIEW_ZONE = 8)] = 'CONTENT_VIEW_ZONE'),
        (e[(e.CONTENT_WIDGET = 9)] = 'CONTENT_WIDGET'),
        (e[(e.OVERVIEW_RULER = 10)] = 'OVERVIEW_RULER'),
        (e[(e.SCROLLBAR = 11)] = 'SCROLLBAR'),
        (e[(e.OVERLAY_WIDGET = 12)] = 'OVERLAY_WIDGET'),
        (e[(e.OUTSIDE_EDITOR = 13)] = 'OUTSIDE_EDITOR')
    })(Ls || (Ls = {}))
    var Cs
    ;(function (e) {
      ;(e[(e.TOP_RIGHT_CORNER = 0)] = 'TOP_RIGHT_CORNER'),
        (e[(e.BOTTOM_RIGHT_CORNER = 1)] = 'BOTTOM_RIGHT_CORNER'),
        (e[(e.TOP_CENTER = 2)] = 'TOP_CENTER')
    })(Cs || (Cs = {}))
    var Ns
    ;(function (e) {
      ;(e[(e.Left = 1)] = 'Left'),
        (e[(e.Center = 2)] = 'Center'),
        (e[(e.Right = 4)] = 'Right'),
        (e[(e.Full = 7)] = 'Full')
    })(Ns || (Ns = {}))
    var ks
    ;(function (e) {
      ;(e[(e.Left = 0)] = 'Left'),
        (e[(e.Right = 1)] = 'Right'),
        (e[(e.None = 2)] = 'None'),
        (e[(e.LeftOfInjectedText = 3)] = 'LeftOfInjectedText'),
        (e[(e.RightOfInjectedText = 4)] = 'RightOfInjectedText')
    })(ks || (ks = {}))
    var Es
    ;(function (e) {
      ;(e[(e.Off = 0)] = 'Off'),
        (e[(e.On = 1)] = 'On'),
        (e[(e.Relative = 2)] = 'Relative'),
        (e[(e.Interval = 3)] = 'Interval'),
        (e[(e.Custom = 4)] = 'Custom')
    })(Es || (Es = {}))
    var Ms
    ;(function (e) {
      ;(e[(e.None = 0)] = 'None'), (e[(e.Text = 1)] = 'Text'), (e[(e.Blocks = 2)] = 'Blocks')
    })(Ms || (Ms = {}))
    var Ts
    ;(function (e) {
      ;(e[(e.Smooth = 0)] = 'Smooth'), (e[(e.Immediate = 1)] = 'Immediate')
    })(Ts || (Ts = {}))
    var Ps
    ;(function (e) {
      ;(e[(e.Auto = 1)] = 'Auto'), (e[(e.Hidden = 2)] = 'Hidden'), (e[(e.Visible = 3)] = 'Visible')
    })(Ps || (Ps = {}))
    var Ln
    ;(function (e) {
      ;(e[(e.LTR = 0)] = 'LTR'), (e[(e.RTL = 1)] = 'RTL')
    })(Ln || (Ln = {}))
    var Fs
    ;(function (e) {
      ;(e[(e.Invoke = 1)] = 'Invoke'),
        (e[(e.TriggerCharacter = 2)] = 'TriggerCharacter'),
        (e[(e.ContentChange = 3)] = 'ContentChange')
    })(Fs || (Fs = {}))
    var Ds
    ;(function (e) {
      ;(e[(e.File = 0)] = 'File'),
        (e[(e.Module = 1)] = 'Module'),
        (e[(e.Namespace = 2)] = 'Namespace'),
        (e[(e.Package = 3)] = 'Package'),
        (e[(e.Class = 4)] = 'Class'),
        (e[(e.Method = 5)] = 'Method'),
        (e[(e.Property = 6)] = 'Property'),
        (e[(e.Field = 7)] = 'Field'),
        (e[(e.Constructor = 8)] = 'Constructor'),
        (e[(e.Enum = 9)] = 'Enum'),
        (e[(e.Interface = 10)] = 'Interface'),
        (e[(e.Function = 11)] = 'Function'),
        (e[(e.Variable = 12)] = 'Variable'),
        (e[(e.Constant = 13)] = 'Constant'),
        (e[(e.String = 14)] = 'String'),
        (e[(e.Number = 15)] = 'Number'),
        (e[(e.Boolean = 16)] = 'Boolean'),
        (e[(e.Array = 17)] = 'Array'),
        (e[(e.Object = 18)] = 'Object'),
        (e[(e.Key = 19)] = 'Key'),
        (e[(e.Null = 20)] = 'Null'),
        (e[(e.EnumMember = 21)] = 'EnumMember'),
        (e[(e.Struct = 22)] = 'Struct'),
        (e[(e.Event = 23)] = 'Event'),
        (e[(e.Operator = 24)] = 'Operator'),
        (e[(e.TypeParameter = 25)] = 'TypeParameter')
    })(Ds || (Ds = {}))
    var Is
    ;(function (e) {
      e[(e.Deprecated = 1)] = 'Deprecated'
    })(Is || (Is = {}))
    var Rs
    ;(function (e) {
      ;(e[(e.Hidden = 0)] = 'Hidden'),
        (e[(e.Blink = 1)] = 'Blink'),
        (e[(e.Smooth = 2)] = 'Smooth'),
        (e[(e.Phase = 3)] = 'Phase'),
        (e[(e.Expand = 4)] = 'Expand'),
        (e[(e.Solid = 5)] = 'Solid')
    })(Rs || (Rs = {}))
    var Os
    ;(function (e) {
      ;(e[(e.Line = 1)] = 'Line'),
        (e[(e.Block = 2)] = 'Block'),
        (e[(e.Underline = 3)] = 'Underline'),
        (e[(e.LineThin = 4)] = 'LineThin'),
        (e[(e.BlockOutline = 5)] = 'BlockOutline'),
        (e[(e.UnderlineThin = 6)] = 'UnderlineThin')
    })(Os || (Os = {}))
    var Vs
    ;(function (e) {
      ;(e[(e.AlwaysGrowsWhenTypingAtEdges = 0)] = 'AlwaysGrowsWhenTypingAtEdges'),
        (e[(e.NeverGrowsWhenTypingAtEdges = 1)] = 'NeverGrowsWhenTypingAtEdges'),
        (e[(e.GrowsOnlyWhenTypingBefore = 2)] = 'GrowsOnlyWhenTypingBefore'),
        (e[(e.GrowsOnlyWhenTypingAfter = 3)] = 'GrowsOnlyWhenTypingAfter')
    })(Vs || (Vs = {}))
    var Bs
    ;(function (e) {
      ;(e[(e.None = 0)] = 'None'),
        (e[(e.Same = 1)] = 'Same'),
        (e[(e.Indent = 2)] = 'Indent'),
        (e[(e.DeepIndent = 3)] = 'DeepIndent')
    })(Bs || (Bs = {}))
    class Jt {
      static chord(t, r) {
        return $o(t, r)
      }
    }
    ;(Jt.CtrlCmd = 2048), (Jt.Shift = 1024), (Jt.Alt = 512), (Jt.WinCtrl = 256)
    function Zo() {
      return {
        editor: void 0,
        languages: void 0,
        CancellationTokenSource: Vo,
        Emitter: Ne,
        KeyCode: wn,
        KeyMod: Jt,
        Position: de,
        Range: G,
        Selection: we,
        SelectionDirection: Ln,
        MarkerSeverity: Sn,
        MarkerTag: An,
        Uri: gt,
        Token: Xo,
      }
    }
    class Yo extends zt {
      constructor(t) {
        super(0)
        for (let r = 0, n = t.length; r < n; r++) this.set(t.charCodeAt(r), 2)
        this.set(32, 1), this.set(9, 1)
      }
    }
    function Ko(e) {
      const t = {}
      return (r) => (t.hasOwnProperty(r) || (t[r] = e(r)), t[r])
    }
    const Wc = Ko((e) => new Yo(e))
    var Us
    ;(function (e) {
      ;(e[(e.Left = 1)] = 'Left'),
        (e[(e.Center = 2)] = 'Center'),
        (e[(e.Right = 4)] = 'Right'),
        (e[(e.Full = 7)] = 'Full')
    })(Us || (Us = {}))
    var js
    ;(function (e) {
      ;(e[(e.Inline = 1)] = 'Inline'), (e[(e.Gutter = 2)] = 'Gutter')
    })(js || (js = {}))
    var Ws
    ;(function (e) {
      ;(e[(e.Both = 0)] = 'Both'), (e[(e.Right = 1)] = 'Right'), (e[(e.Left = 2)] = 'Left'), (e[(e.None = 3)] = 'None')
    })(Ws || (Ws = {}))
    class qc {
      get originalIndentSize() {
        return this._indentSizeIsTabSize ? 'tabSize' : this.indentSize
      }
      constructor(t) {
        ;(this._textModelResolvedOptionsBrand = void 0),
          (this.tabSize = Math.max(1, t.tabSize | 0)),
          t.indentSize === 'tabSize'
            ? ((this.indentSize = this.tabSize), (this._indentSizeIsTabSize = !0))
            : ((this.indentSize = Math.max(1, t.indentSize | 0)), (this._indentSizeIsTabSize = !1)),
          (this.insertSpaces = Boolean(t.insertSpaces)),
          (this.defaultEOL = t.defaultEOL | 0),
          (this.trimAutoWhitespace = Boolean(t.trimAutoWhitespace)),
          (this.bracketPairColorizationOptions = t.bracketPairColorizationOptions)
      }
      equals(t) {
        return (
          this.tabSize === t.tabSize &&
          this._indentSizeIsTabSize === t._indentSizeIsTabSize &&
          this.indentSize === t.indentSize &&
          this.insertSpaces === t.insertSpaces &&
          this.defaultEOL === t.defaultEOL &&
          this.trimAutoWhitespace === t.trimAutoWhitespace &&
          equals(this.bracketPairColorizationOptions, t.bracketPairColorizationOptions)
        )
      }
      createChangeEvent(t) {
        return {
          tabSize: this.tabSize !== t.tabSize,
          indentSize: this.indentSize !== t.indentSize,
          insertSpaces: this.insertSpaces !== t.insertSpaces,
          trimAutoWhitespace: this.trimAutoWhitespace !== t.trimAutoWhitespace,
        }
      }
    }
    class $c {
      constructor(t, r) {
        ;(this._findMatchBrand = void 0), (this.range = t), (this.matches = r)
      }
    }
    function Hc(e) {
      return e && typeof e.read == 'function'
    }
    class zc {
      constructor(t, r, n, i, s, a) {
        ;(this.identifier = t),
          (this.range = r),
          (this.text = n),
          (this.forceMoveMarkers = i),
          (this.isAutoWhitespaceEdit = s),
          (this._isTracked = a)
      }
    }
    class Gc {
      constructor(t, r, n) {
        ;(this.regex = t), (this.wordSeparators = r), (this.simpleSearch = n)
      }
    }
    class Jc {
      constructor(t, r, n) {
        ;(this.reverseEdits = t), (this.changes = r), (this.trimAutoWhitespaceLineNumbers = n)
      }
    }
    function Qc(e) {
      return !e.isTooLargeForSyncing() && !e.isForSimpleWidget
    }
    const el = 999
    class Xc {
      constructor(t, r, n, i) {
        ;(this.searchString = t), (this.isRegex = r), (this.matchCase = n), (this.wordSeparators = i)
      }
      parseSearchRequest() {
        if (this.searchString === '') return null
        let t
        this.isRegex
          ? (t = tl(this.searchString))
          : (t =
              this.searchString.indexOf(`
`) >= 0)
        let r = null
        try {
          r = strings.createRegExp(this.searchString, this.isRegex, {
            matchCase: this.matchCase,
            wholeWord: !1,
            multiline: t,
            global: !0,
            unicode: !0,
          })
        } catch (i) {
          return null
        }
        if (!r) return null
        let n = !this.isRegex && !t
        return (
          n && this.searchString.toLowerCase() !== this.searchString.toUpperCase() && (n = this.matchCase),
          new SearchData(
            r,
            this.wordSeparators ? getMapForWordSeparators(this.wordSeparators) : null,
            n ? this.searchString : null,
          )
        )
      }
    }
    function tl(e) {
      if (!e || e.length === 0) return !1
      for (let t = 0, r = e.length; t < r; t++) {
        const n = e.charCodeAt(t)
        if (n === 10) return !0
        if (n === 92) {
          if ((t++, t >= r)) break
          const i = e.charCodeAt(t)
          if (i === 110 || i === 114 || i === 87) return !0
        }
      }
      return !1
    }
    function Qt(e, t, r) {
      if (!r) return new FindMatch(e, null)
      const n = []
      for (let i = 0, s = t.length; i < s; i++) n[i] = t[i]
      return new FindMatch(e, n)
    }
    class qs {
      constructor(t) {
        const r = []
        let n = 0
        for (let i = 0, s = t.length; i < s; i++) t.charCodeAt(i) === 10 && (r[n++] = i)
        this._lineFeedsOffsets = r
      }
      findLineFeedCountBeforeOffset(t) {
        const r = this._lineFeedsOffsets
        let n = 0,
          i = r.length - 1
        if (i === -1 || t <= r[0]) return 0
        for (; n < i; ) {
          const s = n + (((i - n) / 2) >> 0)
          r[s] >= t ? (i = s - 1) : r[s + 1] >= t ? ((n = s), (i = s)) : (n = s + 1)
        }
        return n + 1
      }
    }
    class Zc {
      static findMatches(t, r, n, i, s) {
        const a = r.parseSearchRequest()
        return a
          ? a.regex.multiline
            ? this._doFindMatchesMultiline(t, n, new Xt(a.wordSeparators, a.regex), i, s)
            : this._doFindMatchesLineByLine(t, n, a, i, s)
          : []
      }
      static _getMultilineMatchRange(t, r, n, i, s, a) {
        let o,
          l = 0
        i ? ((l = i.findLineFeedCountBeforeOffset(s)), (o = r + s + l)) : (o = r + s)
        let u
        if (i) {
          const g = i.findLineFeedCountBeforeOffset(s + a.length) - l
          u = o + a.length + g
        } else u = o + a.length
        const c = t.getPositionAt(o),
          f = t.getPositionAt(u)
        return new Range(c.lineNumber, c.column, f.lineNumber, f.column)
      }
      static _doFindMatchesMultiline(t, r, n, i, s) {
        const a = t.getOffsetAt(r.getStartPosition()),
          o = t.getValueInRange(r, 1),
          l =
            t.getEOL() ===
            `\r
`
              ? new qs(o)
              : null,
          u = []
        let c = 0,
          f
        for (n.reset(0); (f = n.next(o)); )
          if (((u[c++] = Qt(this._getMultilineMatchRange(t, a, o, l, f.index, f[0]), f, i)), c >= s)) return u
        return u
      }
      static _doFindMatchesLineByLine(t, r, n, i, s) {
        const a = []
        let o = 0
        if (r.startLineNumber === r.endLineNumber) {
          const u = t.getLineContent(r.startLineNumber).substring(r.startColumn - 1, r.endColumn - 1)
          return (o = this._findMatchesInLine(n, u, r.startLineNumber, r.startColumn - 1, o, a, i, s)), a
        }
        const l = t.getLineContent(r.startLineNumber).substring(r.startColumn - 1)
        o = this._findMatchesInLine(n, l, r.startLineNumber, r.startColumn - 1, o, a, i, s)
        for (let u = r.startLineNumber + 1; u < r.endLineNumber && o < s; u++)
          o = this._findMatchesInLine(n, t.getLineContent(u), u, 0, o, a, i, s)
        if (o < s) {
          const u = t.getLineContent(r.endLineNumber).substring(0, r.endColumn - 1)
          o = this._findMatchesInLine(n, u, r.endLineNumber, 0, o, a, i, s)
        }
        return a
      }
      static _findMatchesInLine(t, r, n, i, s, a, o, l) {
        const u = t.wordSeparators
        if (!o && t.simpleSearch) {
          const d = t.simpleSearch,
            g = d.length,
            p = r.length
          let b = -g
          for (; (b = r.indexOf(d, b + g)) !== -1; )
            if (
              (!u || $s(u, r, p, b, g)) &&
              ((a[s++] = new FindMatch(new Range(n, b + 1 + i, n, b + 1 + g + i), null)), s >= l)
            )
              return s
          return s
        }
        const c = new Xt(t.wordSeparators, t.regex)
        let f
        c.reset(0)
        do
          if (
            ((f = c.next(r)),
            f && ((a[s++] = Qt(new Range(n, f.index + 1 + i, n, f.index + 1 + f[0].length + i), f, o)), s >= l))
          )
            return s
        while (f)
        return s
      }
      static findNextMatch(t, r, n, i) {
        const s = r.parseSearchRequest()
        if (!s) return null
        const a = new Xt(s.wordSeparators, s.regex)
        return s.regex.multiline
          ? this._doFindNextMatchMultiline(t, n, a, i)
          : this._doFindNextMatchLineByLine(t, n, a, i)
      }
      static _doFindNextMatchMultiline(t, r, n, i) {
        const s = new Position(r.lineNumber, 1),
          a = t.getOffsetAt(s),
          o = t.getLineCount(),
          l = t.getValueInRange(new Range(s.lineNumber, s.column, o, t.getLineMaxColumn(o)), 1),
          u =
            t.getEOL() ===
            `\r
`
              ? new qs(l)
              : null
        n.reset(r.column - 1)
        const c = n.next(l)
        return c
          ? Qt(this._getMultilineMatchRange(t, a, l, u, c.index, c[0]), c, i)
          : r.lineNumber !== 1 || r.column !== 1
            ? this._doFindNextMatchMultiline(t, new Position(1, 1), n, i)
            : null
      }
      static _doFindNextMatchLineByLine(t, r, n, i) {
        const s = t.getLineCount(),
          a = r.lineNumber,
          o = t.getLineContent(a),
          l = this._findFirstMatchInLine(n, o, a, r.column, i)
        if (l) return l
        for (let u = 1; u <= s; u++) {
          const c = (a + u - 1) % s,
            f = t.getLineContent(c + 1),
            d = this._findFirstMatchInLine(n, f, c + 1, 1, i)
          if (d) return d
        }
        return null
      }
      static _findFirstMatchInLine(t, r, n, i, s) {
        t.reset(i - 1)
        const a = t.next(r)
        return a ? Qt(new Range(n, a.index + 1, n, a.index + 1 + a[0].length), a, s) : null
      }
      static findPreviousMatch(t, r, n, i) {
        const s = r.parseSearchRequest()
        if (!s) return null
        const a = new Xt(s.wordSeparators, s.regex)
        return s.regex.multiline
          ? this._doFindPreviousMatchMultiline(t, n, a, i)
          : this._doFindPreviousMatchLineByLine(t, n, a, i)
      }
      static _doFindPreviousMatchMultiline(t, r, n, i) {
        const s = this._doFindMatchesMultiline(t, new Range(1, 1, r.lineNumber, r.column), n, i, 10 * el)
        if (s.length > 0) return s[s.length - 1]
        const a = t.getLineCount()
        return r.lineNumber !== a || r.column !== t.getLineMaxColumn(a)
          ? this._doFindPreviousMatchMultiline(t, new Position(a, t.getLineMaxColumn(a)), n, i)
          : null
      }
      static _doFindPreviousMatchLineByLine(t, r, n, i) {
        const s = t.getLineCount(),
          a = r.lineNumber,
          o = t.getLineContent(a).substring(0, r.column - 1),
          l = this._findLastMatchInLine(n, o, a, i)
        if (l) return l
        for (let u = 1; u <= s; u++) {
          const c = (s + a - u - 1) % s,
            f = t.getLineContent(c + 1),
            d = this._findLastMatchInLine(n, f, c + 1, i)
          if (d) return d
        }
        return null
      }
      static _findLastMatchInLine(t, r, n, i) {
        let s = null,
          a
        for (t.reset(0); (a = t.next(r)); ) s = Qt(new Range(n, a.index + 1, n, a.index + 1 + a[0].length), a, i)
        return s
      }
    }
    function rl(e, t, r, n, i) {
      if (n === 0) return !0
      const s = t.charCodeAt(n - 1)
      if (e.get(s) !== 0 || s === 13 || s === 10) return !0
      if (i > 0) {
        const a = t.charCodeAt(n)
        if (e.get(a) !== 0) return !0
      }
      return !1
    }
    function nl(e, t, r, n, i) {
      if (n + i === r) return !0
      const s = t.charCodeAt(n + i)
      if (e.get(s) !== 0 || s === 13 || s === 10) return !0
      if (i > 0) {
        const a = t.charCodeAt(n + i - 1)
        if (e.get(a) !== 0) return !0
      }
      return !1
    }
    function $s(e, t, r, n, i) {
      return rl(e, t, r, n, i) && nl(e, t, r, n, i)
    }
    class Xt {
      constructor(t, r) {
        ;(this._wordSeparators = t),
          (this._searchRegex = r),
          (this._prevMatchStartIndex = -1),
          (this._prevMatchLength = 0)
      }
      reset(t) {
        ;(this._searchRegex.lastIndex = t), (this._prevMatchStartIndex = -1), (this._prevMatchLength = 0)
      }
      next(t) {
        const r = t.length
        let n
        do {
          if (this._prevMatchStartIndex + this._prevMatchLength === r || ((n = this._searchRegex.exec(t)), !n))
            return null
          const i = n.index,
            s = n[0].length
          if (i === this._prevMatchStartIndex && s === this._prevMatchLength) {
            if (s === 0) {
              Si(t, r, this._searchRegex.lastIndex) > 65535
                ? (this._searchRegex.lastIndex += 2)
                : (this._searchRegex.lastIndex += 1)
              continue
            }
            return null
          }
          if (
            ((this._prevMatchStartIndex = i),
            (this._prevMatchLength = s),
            !this._wordSeparators || $s(this._wordSeparators, t, r, i, s))
          )
            return n
        } while (n)
        return null
      }
    }
    function Yc(e, t) {
      if (!e) throw new Error(t ? `Assertion failed (${t})` : 'Assertion Failed')
    }
    function il(e, t = 'Unreachable') {
      throw new Error(t)
    }
    function Cn(e) {
      if (!e()) {
        debugger
        e(), ne(new yt('Assertion Failed'))
      }
    }
    function Hs(e, t) {
      let r = 0
      for (; r < e.length - 1; ) {
        const n = e[r],
          i = e[r + 1]
        if (!t(n, i)) return !1
        r++
      }
      return !0
    }
    class sl {
      static computeUnicodeHighlights(t, r, n) {
        const i = n ? n.startLineNumber : 1,
          s = n ? n.endLineNumber : t.getLineCount(),
          a = new zs(r),
          o = a.getCandidateCodePoints()
        let l
        o === 'allNonBasicAscii'
          ? (l = new RegExp('[^\\t\\n\\r\\x20-\\x7E]', 'g'))
          : (l = new RegExp(`${al(Array.from(o))}`, 'g'))
        const u = new Xt(null, l),
          c = []
        let f = !1,
          d,
          g = 0,
          p = 0,
          b = 0
        e: for (let m = i, v = s; m <= v; m++) {
          const _ = t.getLineContent(m),
            y = _.length
          u.reset(0)
          do
            if (((d = u.next(_)), d)) {
              let E = d.index,
                M = d.index + d[0].length
              if (E > 0) {
                const x = _.charCodeAt(E - 1)
                Wt(x) && E--
              }
              if (M + 1 < y) {
                const x = _.charCodeAt(M - 1)
                Wt(x) && M++
              }
              const D = _.substring(E, M)
              let C = hn(E + 1, Gi, _, 0)
              C && C.endColumn <= E + 1 && (C = null)
              const k = a.shouldHighlightNonBasicASCII(D, C ? C.word : null)
              if (k !== 0) {
                k === 3 ? g++ : k === 2 ? p++ : k === 1 ? b++ : il(k)
                const x = 1e3
                if (c.length >= x) {
                  f = !0
                  break e
                }
                c.push(new G(m, E + 1, m, M + 1))
              }
            }
          while (d)
        }
        return {
          ranges: c,
          hasMore: f,
          ambiguousCharacterCount: g,
          invisibleCharacterCount: p,
          nonBasicAsciiCharacterCount: b,
        }
      }
      static computeUnicodeHighlightReason(t, r) {
        const n = new zs(r)
        switch (n.shouldHighlightNonBasicASCII(t, null)) {
          case 0:
            return null
          case 2:
            return { kind: 1 }
          case 3: {
            const s = t.codePointAt(0),
              a = n.ambiguousCharacters.getPrimaryConfusable(s),
              o = ke.getLocales().filter((l) => !ke.getInstance(new Set([...r.allowedLocales, l])).isAmbiguous(s))
            return { kind: 0, confusableWith: String.fromCodePoint(a), notAmbiguousInLocales: o }
          }
          case 1:
            return { kind: 2 }
        }
      }
    }
    function al(e, t) {
      return `[${_i(e.map((n) => String.fromCodePoint(n)).join(''))}]`
    }
    class zs {
      constructor(t) {
        ;(this.options = t),
          (this.allowedCodePoints = new Set(t.allowedCodePoints)),
          (this.ambiguousCharacters = ke.getInstance(new Set(t.allowedLocales)))
      }
      getCandidateCodePoints() {
        if (this.options.nonBasicASCII) return 'allNonBasicAscii'
        const t = new Set()
        if (this.options.invisibleCharacters) for (const r of tt.codePoints) Gs(String.fromCodePoint(r)) || t.add(r)
        if (this.options.ambiguousCharacters)
          for (const r of this.ambiguousCharacters.getConfusableCodePoints()) t.add(r)
        for (const r of this.allowedCodePoints) t.delete(r)
        return t
      }
      shouldHighlightNonBasicASCII(t, r) {
        const n = t.codePointAt(0)
        if (this.allowedCodePoints.has(n)) return 0
        if (this.options.nonBasicASCII) return 1
        let i = !1,
          s = !1
        if (r)
          for (const a of r) {
            const o = a.codePointAt(0),
              l = za(a)
            ;(i = i || l), !l && !this.ambiguousCharacters.isAmbiguous(o) && !tt.isInvisibleCharacter(o) && (s = !0)
          }
        return !i && s
          ? 0
          : this.options.invisibleCharacters && !Gs(t) && tt.isInvisibleCharacter(n)
            ? 2
            : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(n)
              ? 3
              : 0
      }
    }
    function Gs(e) {
      return (
        e === ' ' ||
        e ===
          `
` ||
        e === '	'
      )
    }
    class Nn {
      constructor(t, r, n) {
        ;(this.originalRange = t), (this.modifiedRange = r), (this.innerChanges = n)
      }
      toString() {
        return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`
      }
    }
    class Js {
      constructor(t, r) {
        ;(this.originalRange = t), (this.modifiedRange = r)
      }
      toString() {
        return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`
      }
    }
    class Ge {
      constructor(t, r) {
        ;(this.startLineNumber = t), (this.endLineNumberExclusive = r)
      }
      get isEmpty() {
        return this.startLineNumber === this.endLineNumberExclusive
      }
      delta(t) {
        return new Ge(this.startLineNumber + t, this.endLineNumberExclusive + t)
      }
      get length() {
        return this.endLineNumberExclusive - this.startLineNumber
      }
      join(t) {
        return new Ge(
          Math.min(this.startLineNumber, t.startLineNumber),
          Math.max(this.endLineNumberExclusive, t.endLineNumberExclusive),
        )
      }
      toString() {
        return `[${this.startLineNumber},${this.endLineNumberExclusive})`
      }
    }
    const ol = 3
    class ll {
      computeDiff(t, r, n) {
        var i
        const a = new fl(t, r, {
            maxComputationTime: n.maxComputationTimeMs,
            shouldIgnoreTrimWhitespace: n.ignoreTrimWhitespace,
            shouldComputeCharChanges: !0,
            shouldMakePrettyDiff: !0,
            shouldPostProcessCharChanges: !0,
          }).computeDiff(),
          o = []
        let l = null
        for (const u of a.changes) {
          let c
          u.originalEndLineNumber === 0
            ? (c = new Ge(u.originalStartLineNumber + 1, u.originalStartLineNumber + 1))
            : (c = new Ge(u.originalStartLineNumber, u.originalEndLineNumber + 1))
          let f
          u.modifiedEndLineNumber === 0
            ? (f = new Ge(u.modifiedStartLineNumber + 1, u.modifiedStartLineNumber + 1))
            : (f = new Ge(u.modifiedStartLineNumber, u.modifiedEndLineNumber + 1))
          let d = new Nn(
            c,
            f,
            (i = u.charChanges) === null || i === void 0
              ? void 0
              : i.map(
                  (g) =>
                    new Js(
                      new G(
                        g.originalStartLineNumber,
                        g.originalStartColumn,
                        g.originalEndLineNumber,
                        g.originalEndColumn,
                      ),
                      new G(
                        g.modifiedStartLineNumber,
                        g.modifiedStartColumn,
                        g.modifiedEndLineNumber,
                        g.modifiedEndColumn,
                      ),
                    ),
                ),
          )
          l &&
            (l.modifiedRange.endLineNumberExclusive === d.modifiedRange.startLineNumber ||
              l.originalRange.endLineNumberExclusive === d.originalRange.startLineNumber) &&
            ((d = new Nn(
              l.originalRange.join(d.originalRange),
              l.modifiedRange.join(d.modifiedRange),
              l.innerChanges && d.innerChanges ? l.innerChanges.concat(d.innerChanges) : void 0,
            )),
            o.pop()),
            o.push(d),
            (l = d)
        }
        return (
          Cn(() =>
            Hs(
              o,
              (u, c) =>
                c.originalRange.startLineNumber - u.originalRange.endLineNumberExclusive ===
                  c.modifiedRange.startLineNumber - u.modifiedRange.endLineNumberExclusive &&
                u.originalRange.endLineNumberExclusive < c.originalRange.startLineNumber &&
                u.modifiedRange.endLineNumberExclusive < c.modifiedRange.startLineNumber,
            ),
          ),
          { quitEarly: a.quitEarly, changes: o }
        )
      }
    }
    function Qs(e, t, r, n) {
      return new nt(e, t, r).ComputeDiff(n)
    }
    class Xs {
      constructor(t) {
        const r = [],
          n = []
        for (let i = 0, s = t.length; i < s; i++) (r[i] = kn(t[i], 1)), (n[i] = En(t[i], 1))
        ;(this.lines = t), (this._startColumns = r), (this._endColumns = n)
      }
      getElements() {
        const t = []
        for (let r = 0, n = this.lines.length; r < n; r++)
          t[r] = this.lines[r].substring(this._startColumns[r] - 1, this._endColumns[r] - 1)
        return t
      }
      getStrictElement(t) {
        return this.lines[t]
      }
      getStartLineNumber(t) {
        return t + 1
      }
      getEndLineNumber(t) {
        return t + 1
      }
      createCharSequence(t, r, n) {
        const i = [],
          s = [],
          a = []
        let o = 0
        for (let l = r; l <= n; l++) {
          const u = this.lines[l],
            c = t ? this._startColumns[l] : 1,
            f = t ? this._endColumns[l] : u.length + 1
          for (let d = c; d < f; d++) (i[o] = u.charCodeAt(d - 1)), (s[o] = l + 1), (a[o] = d), o++
          !t && l < n && ((i[o] = 10), (s[o] = l + 1), (a[o] = u.length + 1), o++)
        }
        return new ul(i, s, a)
      }
    }
    class ul {
      constructor(t, r, n) {
        ;(this._charCodes = t), (this._lineNumbers = r), (this._columns = n)
      }
      toString() {
        return (
          '[' +
          this._charCodes
            .map(
              (t, r) => (t === 10 ? '\\n' : String.fromCharCode(t)) + `-(${this._lineNumbers[r]},${this._columns[r]})`,
            )
            .join(', ') +
          ']'
        )
      }
      _assertIndex(t, r) {
        if (t < 0 || t >= r.length) throw new Error('Illegal index')
      }
      getElements() {
        return this._charCodes
      }
      getStartLineNumber(t) {
        return t > 0 && t === this._lineNumbers.length
          ? this.getEndLineNumber(t - 1)
          : (this._assertIndex(t, this._lineNumbers), this._lineNumbers[t])
      }
      getEndLineNumber(t) {
        return t === -1
          ? this.getStartLineNumber(t + 1)
          : (this._assertIndex(t, this._lineNumbers),
            this._charCodes[t] === 10 ? this._lineNumbers[t] + 1 : this._lineNumbers[t])
      }
      getStartColumn(t) {
        return t > 0 && t === this._columns.length
          ? this.getEndColumn(t - 1)
          : (this._assertIndex(t, this._columns), this._columns[t])
      }
      getEndColumn(t) {
        return t === -1
          ? this.getStartColumn(t + 1)
          : (this._assertIndex(t, this._columns), this._charCodes[t] === 10 ? 1 : this._columns[t] + 1)
      }
    }
    class Et {
      constructor(t, r, n, i, s, a, o, l) {
        ;(this.originalStartLineNumber = t),
          (this.originalStartColumn = r),
          (this.originalEndLineNumber = n),
          (this.originalEndColumn = i),
          (this.modifiedStartLineNumber = s),
          (this.modifiedStartColumn = a),
          (this.modifiedEndLineNumber = o),
          (this.modifiedEndColumn = l)
      }
      static createFromDiffChange(t, r, n) {
        const i = r.getStartLineNumber(t.originalStart),
          s = r.getStartColumn(t.originalStart),
          a = r.getEndLineNumber(t.originalStart + t.originalLength - 1),
          o = r.getEndColumn(t.originalStart + t.originalLength - 1),
          l = n.getStartLineNumber(t.modifiedStart),
          u = n.getStartColumn(t.modifiedStart),
          c = n.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1),
          f = n.getEndColumn(t.modifiedStart + t.modifiedLength - 1)
        return new Et(i, s, a, o, l, u, c, f)
      }
    }
    function cl(e) {
      if (e.length <= 1) return e
      const t = [e[0]]
      let r = t[0]
      for (let n = 1, i = e.length; n < i; n++) {
        const s = e[n],
          a = s.originalStart - (r.originalStart + r.originalLength),
          o = s.modifiedStart - (r.modifiedStart + r.modifiedLength)
        Math.min(a, o) < ol
          ? ((r.originalLength = s.originalStart + s.originalLength - r.originalStart),
            (r.modifiedLength = s.modifiedStart + s.modifiedLength - r.modifiedStart))
          : (t.push(s), (r = s))
      }
      return t
    }
    class Zt {
      constructor(t, r, n, i, s) {
        ;(this.originalStartLineNumber = t),
          (this.originalEndLineNumber = r),
          (this.modifiedStartLineNumber = n),
          (this.modifiedEndLineNumber = i),
          (this.charChanges = s)
      }
      static createFromDiffResult(t, r, n, i, s, a, o) {
        let l, u, c, f, d
        if (
          (r.originalLength === 0
            ? ((l = n.getStartLineNumber(r.originalStart) - 1), (u = 0))
            : ((l = n.getStartLineNumber(r.originalStart)),
              (u = n.getEndLineNumber(r.originalStart + r.originalLength - 1))),
          r.modifiedLength === 0
            ? ((c = i.getStartLineNumber(r.modifiedStart) - 1), (f = 0))
            : ((c = i.getStartLineNumber(r.modifiedStart)),
              (f = i.getEndLineNumber(r.modifiedStart + r.modifiedLength - 1))),
          a && r.originalLength > 0 && r.originalLength < 20 && r.modifiedLength > 0 && r.modifiedLength < 20 && s())
        ) {
          const g = n.createCharSequence(t, r.originalStart, r.originalStart + r.originalLength - 1),
            p = i.createCharSequence(t, r.modifiedStart, r.modifiedStart + r.modifiedLength - 1)
          if (g.getElements().length > 0 && p.getElements().length > 0) {
            let b = Qs(g, p, s, !0).changes
            o && (b = cl(b)), (d = [])
            for (let m = 0, v = b.length; m < v; m++) d.push(Et.createFromDiffChange(b[m], g, p))
          }
        }
        return new Zt(l, u, c, f, d)
      }
    }
    class fl {
      constructor(t, r, n) {
        ;(this.shouldComputeCharChanges = n.shouldComputeCharChanges),
          (this.shouldPostProcessCharChanges = n.shouldPostProcessCharChanges),
          (this.shouldIgnoreTrimWhitespace = n.shouldIgnoreTrimWhitespace),
          (this.shouldMakePrettyDiff = n.shouldMakePrettyDiff),
          (this.originalLines = t),
          (this.modifiedLines = r),
          (this.original = new Xs(t)),
          (this.modified = new Xs(r)),
          (this.continueLineDiff = Zs(n.maxComputationTime)),
          (this.continueCharDiff = Zs(n.maxComputationTime === 0 ? 0 : Math.min(n.maxComputationTime, 5e3)))
      }
      computeDiff() {
        if (this.original.lines.length === 1 && this.original.lines[0].length === 0)
          return this.modified.lines.length === 1 && this.modified.lines[0].length === 0
            ? { quitEarly: !1, changes: [] }
            : {
                quitEarly: !1,
                changes: [
                  {
                    originalStartLineNumber: 1,
                    originalEndLineNumber: 1,
                    modifiedStartLineNumber: 1,
                    modifiedEndLineNumber: this.modified.lines.length,
                    charChanges: void 0,
                  },
                ],
              }
        if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0)
          return {
            quitEarly: !1,
            changes: [
              {
                originalStartLineNumber: 1,
                originalEndLineNumber: this.original.lines.length,
                modifiedStartLineNumber: 1,
                modifiedEndLineNumber: 1,
                charChanges: void 0,
              },
            ],
          }
        const t = Qs(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff),
          r = t.changes,
          n = t.quitEarly
        if (this.shouldIgnoreTrimWhitespace) {
          const o = []
          for (let l = 0, u = r.length; l < u; l++)
            o.push(
              Zt.createFromDiffResult(
                this.shouldIgnoreTrimWhitespace,
                r[l],
                this.original,
                this.modified,
                this.continueCharDiff,
                this.shouldComputeCharChanges,
                this.shouldPostProcessCharChanges,
              ),
            )
          return { quitEarly: n, changes: o }
        }
        const i = []
        let s = 0,
          a = 0
        for (let o = -1, l = r.length; o < l; o++) {
          const u = o + 1 < l ? r[o + 1] : null,
            c = u ? u.originalStart : this.originalLines.length,
            f = u ? u.modifiedStart : this.modifiedLines.length
          for (; s < c && a < f; ) {
            const d = this.originalLines[s],
              g = this.modifiedLines[a]
            if (d !== g) {
              {
                let p = kn(d, 1),
                  b = kn(g, 1)
                for (; p > 1 && b > 1; ) {
                  const m = d.charCodeAt(p - 2),
                    v = g.charCodeAt(b - 2)
                  if (m !== v) break
                  p--, b--
                }
                ;(p > 1 || b > 1) && this._pushTrimWhitespaceCharChange(i, s + 1, 1, p, a + 1, 1, b)
              }
              {
                let p = En(d, 1),
                  b = En(g, 1)
                const m = d.length + 1,
                  v = g.length + 1
                for (; p < m && b < v; ) {
                  const _ = d.charCodeAt(p - 1),
                    y = d.charCodeAt(b - 1)
                  if (_ !== y) break
                  p++, b++
                }
                ;(p < m || b < v) && this._pushTrimWhitespaceCharChange(i, s + 1, p, m, a + 1, b, v)
              }
            }
            s++, a++
          }
          u &&
            (i.push(
              Zt.createFromDiffResult(
                this.shouldIgnoreTrimWhitespace,
                u,
                this.original,
                this.modified,
                this.continueCharDiff,
                this.shouldComputeCharChanges,
                this.shouldPostProcessCharChanges,
              ),
            ),
            (s += u.originalLength),
            (a += u.modifiedLength))
        }
        return { quitEarly: n, changes: i }
      }
      _pushTrimWhitespaceCharChange(t, r, n, i, s, a, o) {
        if (this._mergeTrimWhitespaceCharChange(t, r, n, i, s, a, o)) return
        let l
        this.shouldComputeCharChanges && (l = [new Et(r, n, r, i, s, a, s, o)]), t.push(new Zt(r, r, s, s, l))
      }
      _mergeTrimWhitespaceCharChange(t, r, n, i, s, a, o) {
        const l = t.length
        if (l === 0) return !1
        const u = t[l - 1]
        return u.originalEndLineNumber === 0 || u.modifiedEndLineNumber === 0
          ? !1
          : u.originalEndLineNumber === r && u.modifiedEndLineNumber === s
            ? (this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new Et(r, n, r, i, s, a, s, o)), !0)
            : u.originalEndLineNumber + 1 === r && u.modifiedEndLineNumber + 1 === s
              ? ((u.originalEndLineNumber = r),
                (u.modifiedEndLineNumber = s),
                this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new Et(r, n, r, i, s, a, s, o)),
                !0)
              : !1
      }
    }
    function kn(e, t) {
      const r = Va(e)
      return r === -1 ? t : r + 1
    }
    function En(e, t) {
      const r = Ba(e)
      return r === -1 ? t : r + 2
    }
    function Zs(e) {
      if (e === 0) return () => !0
      const t = Date.now()
      return () => Date.now() - t < e
    }
    class Ue {
      constructor(t, r) {
        ;(this.seq1Range = t), (this.seq2Range = r)
      }
      reverse() {
        return new Ue(this.seq2Range, this.seq1Range)
      }
      toString() {
        return `${this.seq1Range} <-> ${this.seq2Range}`
      }
    }
    class be {
      constructor(t, r) {
        ;(this.start = t), (this.endExclusive = r)
      }
      get isEmpty() {
        return this.start === this.endExclusive
      }
      delta(t) {
        return new be(this.start + t, this.endExclusive + t)
      }
      get length() {
        return this.endExclusive - this.start
      }
      toString() {
        return `[${this.start}, ${this.endExclusive})`
      }
      join(t) {
        return new be(Math.min(this.start, t.start), Math.max(this.endExclusive, t.endExclusive))
      }
    }
    class Mn {
      constructor(t, r) {
        ;(this.width = t), (this.height = r), (this.array = []), (this.array = new Array(t * r))
      }
      get(t, r) {
        return this.array[t + r * this.width]
      }
      set(t, r, n) {
        this.array[t + r * this.width] = n
      }
    }
    class hl {
      compute(t, r, n) {
        const i = new Mn(t.length, r.length),
          s = new Mn(t.length, r.length),
          a = new Mn(t.length, r.length)
        for (let g = 0; g < t.length; g++)
          for (let p = 0; p < r.length; p++) {
            const b = g === 0 ? 0 : i.get(g - 1, p),
              m = p === 0 ? 0 : i.get(g, p - 1)
            let v
            t.getElement(g) === r.getElement(p)
              ? (g === 0 || p === 0 ? (v = 0) : (v = i.get(g - 1, p - 1)),
                g > 0 && p > 0 && s.get(g - 1, p - 1) === 3 && (v += a.get(g - 1, p - 1)),
                (v += n ? n(g, p) : 1))
              : (v = -1)
            const _ = Math.max(b, m, v)
            if (_ === v) {
              const y = g > 0 && p > 0 ? a.get(g - 1, p - 1) : 0
              a.set(g, p, y + 1), s.set(g, p, 3)
            } else _ === b ? (a.set(g, p, 0), s.set(g, p, 1)) : _ === m && (a.set(g, p, 0), s.set(g, p, 2))
            i.set(g, p, _)
          }
        const o = []
        let l = t.length,
          u = r.length
        function c(g, p) {
          ;(g + 1 !== l || p + 1 !== u) && o.push(new Ue(new be(g + 1, l), new be(p + 1, u))), (l = g), (u = p)
        }
        let f = t.length - 1,
          d = r.length - 1
        for (; f >= 0 && d >= 0; ) s.get(f, d) === 3 ? (c(f, d), f--, d--) : s.get(f, d) === 1 ? f-- : d--
        return c(-1, -1), o.reverse(), o
      }
    }
    function Ys(e, t, r) {
      let n = r
      return (n = gl(e, t, n)), (n = ml(e, t, n)), n
    }
    function dl(e, t, r) {
      const n = []
      for (const i of r) {
        const s = n[n.length - 1]
        if (!s) {
          n.push(i)
          continue
        }
        i.seq1Range.start - s.seq1Range.endExclusive <= 2 || i.seq2Range.start - s.seq2Range.endExclusive <= 2
          ? (n[n.length - 1] = new Ue(s.seq1Range.join(i.seq1Range), s.seq2Range.join(i.seq2Range)))
          : n.push(i)
      }
      return n
    }
    function gl(e, t, r) {
      const n = []
      r.length > 0 && n.push(r[0])
      for (let i = 1; i < r.length; i++) {
        const s = n[n.length - 1],
          a = r[i]
        if (a.seq1Range.isEmpty) {
          let o = !0
          const l = a.seq1Range.start - s.seq1Range.endExclusive
          for (let u = 1; u <= l; u++)
            if (t.getElement(a.seq2Range.start - u) !== t.getElement(a.seq2Range.endExclusive - u)) {
              o = !1
              break
            }
          if (o) {
            n[n.length - 1] = new Ue(s.seq1Range, new be(s.seq2Range.start, a.seq2Range.endExclusive - l))
            continue
          }
        }
        n.push(a)
      }
      return n
    }
    function ml(e, t, r) {
      if (!e.getBoundaryScore || !t.getBoundaryScore) return r
      for (let n = 0; n < r.length; n++) {
        const i = r[n]
        if (i.seq1Range.isEmpty) {
          const s = n > 0 ? r[n - 1].seq2Range.endExclusive : -1,
            a = n + 1 < r.length ? r[n + 1].seq2Range.start : t.length
          r[n] = Ks(i, e, t, a, s)
        } else if (i.seq2Range.isEmpty) {
          const s = n > 0 ? r[n - 1].seq1Range.endExclusive : -1,
            a = n + 1 < r.length ? r[n + 1].seq1Range.start : e.length
          r[n] = Ks(i.reverse(), t, e, a, s).reverse()
        }
      }
      return r
    }
    function Ks(e, t, r, n, i) {
      let a = 1
      for (
        ;
        e.seq2Range.start - a > i &&
        r.getElement(e.seq2Range.start - a) === r.getElement(e.seq2Range.endExclusive - a) &&
        a < 20;

      )
        a++
      a--
      let o = 0
      for (
        ;
        e.seq2Range.start + o < n &&
        r.getElement(e.seq2Range.start + o) === r.getElement(e.seq2Range.endExclusive + o) &&
        o < 20;

      )
        o++
      if (a === 0 && o === 0) return e
      let l = 0,
        u = -1
      for (let c = -a; c <= o; c++) {
        const f = e.seq2Range.start + c,
          d = e.seq2Range.endExclusive + c,
          g = e.seq1Range.start + c,
          p = t.getBoundaryScore(g) + r.getBoundaryScore(f) + r.getBoundaryScore(d)
        p > u && ((u = p), (l = c))
      }
      return l !== 0 ? new Ue(e.seq1Range.delta(l), e.seq2Range.delta(l)) : e
    }
    class pl {
      compute(t, r) {
        if (t.length === 0) return [new Ue(new be(0, 0), new be(0, r.length))]
        if (r.length === 0) return [new Ue(new be(0, t.length), new be(0, 0))]
        function n(d, g) {
          for (; d < t.length && g < r.length && t.getElement(d) === r.getElement(g); ) d++, g++
          return d
        }
        let i = 0
        const s = new vl()
        s.set(0, n(0, 0))
        const a = new bl()
        a.set(0, s.get(0) === 0 ? null : new e1(null, 0, 0, s.get(0)))
        let o = 0
        e: for (;;)
          for (i++, o = -i; o <= i; o += 2) {
            const d = o === i ? -1 : s.get(o + 1),
              g = o === -i ? -1 : s.get(o - 1) + 1,
              p = Math.min(Math.max(d, g), t.length),
              b = p - o,
              m = n(p, b)
            s.set(o, m)
            const v = p === d ? a.get(o + 1) : a.get(o - 1)
            if ((a.set(o, m !== p ? new e1(v, p, b, m - p) : v), s.get(o) === t.length && s.get(o) - o === r.length))
              break e
          }
        let l = a.get(o)
        const u = []
        let c = t.length,
          f = r.length
        for (;;) {
          const d = l ? l.x + l.length : 0,
            g = l ? l.y + l.length : 0
          if (((d !== c || g !== f) && u.push(new Ue(new be(d, c), new be(g, f))), !l)) break
          ;(c = l.x), (f = l.y), (l = l.prev)
        }
        return u.reverse(), u
      }
    }
    class e1 {
      constructor(t, r, n, i) {
        ;(this.prev = t), (this.x = r), (this.y = n), (this.length = i)
      }
    }
    class vl {
      constructor() {
        ;(this.positiveArr = new Int32Array(10)), (this.negativeArr = new Int32Array(10))
      }
      get(t) {
        return t < 0 ? ((t = -t - 1), this.negativeArr[t]) : this.positiveArr[t]
      }
      set(t, r) {
        if (t < 0) {
          if (((t = -t - 1), t >= this.negativeArr.length)) {
            const n = this.negativeArr
            ;(this.negativeArr = new Int32Array(n.length * 2)), this.negativeArr.set(n)
          }
          this.negativeArr[t] = r
        } else {
          if (t >= this.positiveArr.length) {
            const n = this.positiveArr
            ;(this.positiveArr = new Int32Array(n.length * 2)), this.positiveArr.set(n)
          }
          this.positiveArr[t] = r
        }
      }
    }
    class bl {
      constructor() {
        ;(this.positiveArr = []), (this.negativeArr = [])
      }
      get(t) {
        return t < 0 ? ((t = -t - 1), this.negativeArr[t]) : this.positiveArr[t]
      }
      set(t, r) {
        t < 0 ? ((t = -t - 1), (this.negativeArr[t] = r)) : (this.positiveArr[t] = r)
      }
    }
    class yl {
      constructor() {
        ;(this.dynamicProgrammingDiffing = new hl()), (this.myersDiffingAlgorithm = new pl())
      }
      computeDiff(t, r, n) {
        const i = new Map()
        function s(m) {
          let v = i.get(m)
          return v === void 0 && ((v = i.size), i.set(m, v)), v
        }
        const a = t.map((m) => s(m.trim())),
          o = r.map((m) => s(m.trim())),
          l = new t1(a, t),
          u = new t1(o, r)
        let c = (() =>
          l.length + u.length < 1500
            ? this.dynamicProgrammingDiffing.compute(l, u, (m, v) =>
                t[m] === r[v] ? (r[v].length === 0 ? 0.1 : 1 + Math.log(1 + r[v].length)) : 0.99,
              )
            : this.myersDiffingAlgorithm.compute(l, u))()
        c = Ys(l, u, c)
        const f = [],
          d = (m) => {
            for (let v = 0; v < m; v++) {
              const _ = g + v,
                y = p + v
              if (t[_] !== r[y]) {
                const E = this.refineDiff(t, r, new Ue(new be(_, _ + 1), new be(y, y + 1)))
                for (const M of E) f.push(M)
              }
            }
          }
        let g = 0,
          p = 0
        for (const m of c) {
          Cn(() => m.seq1Range.start - g === m.seq2Range.start - p)
          const v = m.seq1Range.start - g
          d(v), (g = m.seq1Range.endExclusive), (p = m.seq2Range.endExclusive)
          const _ = this.refineDiff(t, r, m)
          for (const y of _) f.push(y)
        }
        return d(t.length - g), { quitEarly: !1, changes: _l(f) }
      }
      refineDiff(t, r, n) {
        const i = new n1(t, n.seq1Range),
          s = new n1(r, n.seq2Range),
          a =
            i.length + s.length < 500
              ? this.dynamicProgrammingDiffing.compute(i, s)
              : this.myersDiffingAlgorithm.compute(i, s)
        let o = Ys(i, s, a)
        return (
          (o = dl(i, s, o)),
          o.map(
            (u) =>
              new Js(
                i.translateRange(u.seq1Range).delta(n.seq1Range.start),
                s.translateRange(u.seq2Range).delta(n.seq2Range.start),
              ),
          )
        )
      }
    }
    function _l(e) {
      const t = []
      for (const r of xl(
        e,
        (n, i) =>
          i.originalRange.startLineNumber - (n.originalRange.endLineNumber - (n.originalRange.endColumn > 1 ? 0 : 1)) <=
            1 ||
          i.modifiedRange.startLineNumber - (n.modifiedRange.endLineNumber - (n.modifiedRange.endColumn > 1 ? 0 : 1)) <=
            1,
      )) {
        const n = r[0],
          i = r[r.length - 1]
        t.push(
          new Nn(
            new Ge(
              n.originalRange.startLineNumber,
              i.originalRange.endLineNumber + (i.originalRange.endColumn > 1 || i.modifiedRange.endColumn > 1 ? 1 : 0),
            ),
            new Ge(
              n.modifiedRange.startLineNumber,
              i.modifiedRange.endLineNumber + (i.originalRange.endColumn > 1 || i.modifiedRange.endColumn > 1 ? 1 : 0),
            ),
            r,
          ),
        )
      }
      return (
        Cn(() =>
          Hs(
            t,
            (r, n) =>
              n.originalRange.startLineNumber - r.originalRange.endLineNumberExclusive ===
                n.modifiedRange.startLineNumber - r.modifiedRange.endLineNumberExclusive &&
              r.originalRange.endLineNumberExclusive < n.originalRange.startLineNumber &&
              r.modifiedRange.endLineNumberExclusive < n.modifiedRange.startLineNumber,
          ),
        ),
        t
      )
    }
    function* xl(e, t) {
      let r, n
      for (const i of e) n !== void 0 && t(n, i) ? r.push(i) : (r && (yield r), (r = [i])), (n = i)
      r && (yield r)
    }
    class t1 {
      constructor(t, r) {
        ;(this.trimmedHash = t), (this.lines = r)
      }
      getElement(t) {
        return this.trimmedHash[t]
      }
      get length() {
        return this.trimmedHash.length
      }
      getBoundaryScore(t) {
        const r = t === 0 ? 0 : r1(this.lines[t - 1]),
          n = t === this.lines.length ? 0 : r1(this.lines[t])
        return 1e3 - (r + n)
      }
    }
    function r1(e) {
      let t = 0
      for (; t < e.length && (e.charCodeAt(t) === 32 || e.charCodeAt(t) === 9); ) t++
      return t
    }
    class n1 {
      constructor(t, r) {
        ;(this.lines = t), (this.lineRange = r)
        let n = 0
        this.firstCharOnLineOffsets = new Int32Array(r.length)
        for (let s = r.start; s < r.endExclusive; s++) {
          const a = t[s]
          ;(n += a.length), (this.firstCharOnLineOffsets[s - r.start] = n + 1), n++
        }
        this.elements = new Int32Array(n)
        let i = 0
        for (let s = r.start; s < r.endExclusive; s++) {
          const a = t[s]
          for (let o = 0; o < a.length; o++) this.elements[i + o] = a.charCodeAt(o)
          ;(i += a.length),
            s < t.length - 1 &&
              ((this.elements[i] = `
`.charCodeAt(0)),
              (i += 1))
        }
      }
      getElement(t) {
        return this.elements[t]
      }
      get length() {
        return this.elements.length
      }
      getBoundaryScore(t) {
        const r = s1(t > 0 ? this.elements[t - 1] : -1),
          n = s1(t < this.elements.length ? this.elements[t] : -1)
        if (r === 6 && n === 7) return 0
        let i = 0
        return r !== n && ((i += 10), n === 1 && (i += 1)), (i += i1(r)), (i += i1(n)), i
      }
      translateOffset(t) {
        let r = 0,
          n = this.firstCharOnLineOffsets.length
        for (; r < n; ) {
          const s = Math.floor((r + n) / 2)
          this.firstCharOnLineOffsets[s] > t ? (n = s) : (r = s + 1)
        }
        const i = r === 0 ? 0 : this.firstCharOnLineOffsets[r - 1]
        return new de(r + 1, t - i + 1)
      }
      translateRange(t) {
        return G.fromPositions(this.translateOffset(t.start), this.translateOffset(t.endExclusive))
      }
    }
    const wl = { [0]: 0, [1]: 0, [2]: 0, [3]: 10, [4]: 2, [5]: 3, [6]: 10, [7]: 10 }
    function i1(e) {
      return wl[e]
    }
    function s1(e) {
      return e === 10
        ? 7
        : e === 13
          ? 6
          : Sl(e)
            ? 5
            : e >= 97 && e <= 122
              ? 0
              : e >= 65 && e <= 90
                ? 1
                : e >= 48 && e <= 57
                  ? 2
                  : e === -1
                    ? 3
                    : 4
    }
    function Sl(e) {
      return e === 32 || e === 9
    }
    const a1 = { smart: new ll(), experimental: new yl() }
    var mt = function (e, t, r, n) {
      function i(s) {
        return s instanceof r
          ? s
          : new r(function (a) {
              a(s)
            })
      }
      return new (r || (r = Promise))(function (s, a) {
        function o(c) {
          try {
            u(n.next(c))
          } catch (f) {
            a(f)
          }
        }
        function l(c) {
          try {
            u(n.throw(c))
          } catch (f) {
            a(f)
          }
        }
        function u(c) {
          c.done ? s(c.value) : i(c.value).then(o, l)
        }
        u((n = n.apply(e, t || [])).next())
      })
    }
    class Al extends ko {
      get uri() {
        return this._uri
      }
      get eol() {
        return this._eol
      }
      getValue() {
        return this.getText()
      }
      getLinesContent() {
        return this._lines.slice(0)
      }
      getLineCount() {
        return this._lines.length
      }
      getLineContent(t) {
        return this._lines[t - 1]
      }
      getWordAtPosition(t, r) {
        const n = hn(t.column, To(r), this._lines[t.lineNumber - 1], 0)
        return n ? new G(t.lineNumber, n.startColumn, t.lineNumber, n.endColumn) : null
      }
      words(t) {
        const r = this._lines,
          n = this._wordenize.bind(this)
        let i = 0,
          s = '',
          a = 0,
          o = []
        return {
          *[Symbol.iterator]() {
            for (;;)
              if (a < o.length) {
                const l = s.substring(o[a].start, o[a].end)
                ;(a += 1), yield l
              } else if (i < r.length) (s = r[i]), (o = n(s, t)), (a = 0), (i += 1)
              else break
          },
        }
      }
      getLineWords(t, r) {
        const n = this._lines[t - 1],
          i = this._wordenize(n, r),
          s = []
        for (const a of i) s.push({ word: n.substring(a.start, a.end), startColumn: a.start + 1, endColumn: a.end + 1 })
        return s
      }
      _wordenize(t, r) {
        const n = []
        let i
        for (r.lastIndex = 0; (i = r.exec(t)) && i[0].length !== 0; )
          n.push({ start: i.index, end: i.index + i[0].length })
        return n
      }
      getValueInRange(t) {
        if (((t = this._validateRange(t)), t.startLineNumber === t.endLineNumber))
          return this._lines[t.startLineNumber - 1].substring(t.startColumn - 1, t.endColumn - 1)
        const r = this._eol,
          n = t.startLineNumber - 1,
          i = t.endLineNumber - 1,
          s = []
        s.push(this._lines[n].substring(t.startColumn - 1))
        for (let a = n + 1; a < i; a++) s.push(this._lines[a])
        return s.push(this._lines[i].substring(0, t.endColumn - 1)), s.join(r)
      }
      offsetAt(t) {
        return (
          (t = this._validatePosition(t)),
          this._ensureLineStarts(),
          this._lineStarts.getPrefixSum(t.lineNumber - 2) + (t.column - 1)
        )
      }
      positionAt(t) {
        ;(t = Math.floor(t)), (t = Math.max(0, t)), this._ensureLineStarts()
        const r = this._lineStarts.getIndexOf(t),
          n = this._lines[r.index].length
        return { lineNumber: 1 + r.index, column: 1 + Math.min(r.remainder, n) }
      }
      _validateRange(t) {
        const r = this._validatePosition({ lineNumber: t.startLineNumber, column: t.startColumn }),
          n = this._validatePosition({ lineNumber: t.endLineNumber, column: t.endColumn })
        return r.lineNumber !== t.startLineNumber ||
          r.column !== t.startColumn ||
          n.lineNumber !== t.endLineNumber ||
          n.column !== t.endColumn
          ? { startLineNumber: r.lineNumber, startColumn: r.column, endLineNumber: n.lineNumber, endColumn: n.column }
          : t
      }
      _validatePosition(t) {
        if (!de.isIPosition(t)) throw new Error('bad position')
        let { lineNumber: r, column: n } = t,
          i = !1
        if (r < 1) (r = 1), (n = 1), (i = !0)
        else if (r > this._lines.length) (r = this._lines.length), (n = this._lines[r - 1].length + 1), (i = !0)
        else {
          const s = this._lines[r - 1].length + 1
          n < 1 ? ((n = 1), (i = !0)) : n > s && ((n = s), (i = !0))
        }
        return i ? { lineNumber: r, column: n } : t
      }
    }
    class lt {
      constructor(t, r) {
        ;(this._host = t),
          (this._models = Object.create(null)),
          (this._foreignModuleFactory = r),
          (this._foreignModule = null)
      }
      dispose() {
        this._models = Object.create(null)
      }
      _getModel(t) {
        return this._models[t]
      }
      _getModels() {
        const t = []
        return Object.keys(this._models).forEach((r) => t.push(this._models[r])), t
      }
      acceptNewModel(t) {
        this._models[t.url] = new Al(gt.parse(t.url), t.lines, t.EOL, t.versionId)
      }
      acceptModelChanged(t, r) {
        if (!this._models[t]) return
        this._models[t].onEvents(r)
      }
      acceptRemovedModel(t) {
        this._models[t] && delete this._models[t]
      }
      computeUnicodeHighlights(t, r, n) {
        return mt(this, void 0, void 0, function* () {
          const i = this._getModel(t)
          return i
            ? sl.computeUnicodeHighlights(i, r, n)
            : {
                ranges: [],
                hasMore: !1,
                ambiguousCharacterCount: 0,
                invisibleCharacterCount: 0,
                nonBasicAsciiCharacterCount: 0,
              }
        })
      }
      computeDiff(t, r, n, i) {
        return mt(this, void 0, void 0, function* () {
          const s = this._getModel(t),
            a = this._getModel(r)
          return !s || !a ? null : lt.computeDiff(s, a, n, i)
        })
      }
      static computeDiff(t, r, n, i) {
        const s = i === 'experimental' ? a1.experimental : a1.smart,
          a = t.getLinesContent(),
          o = r.getLinesContent(),
          l = s.computeDiff(a, o, n)
        return {
          identical: l.changes.length > 0 ? !1 : this._modelsAreIdentical(t, r),
          quitEarly: l.quitEarly,
          changes: l.changes.map((c) => {
            var f
            return [
              c.originalRange.startLineNumber,
              c.originalRange.endLineNumberExclusive,
              c.modifiedRange.startLineNumber,
              c.modifiedRange.endLineNumberExclusive,
              (f = c.innerChanges) === null || f === void 0
                ? void 0
                : f.map((d) => [
                    d.originalRange.startLineNumber,
                    d.originalRange.startColumn,
                    d.originalRange.endLineNumber,
                    d.originalRange.endColumn,
                    d.modifiedRange.startLineNumber,
                    d.modifiedRange.startColumn,
                    d.modifiedRange.endLineNumber,
                    d.modifiedRange.endColumn,
                  ]),
            ]
          }),
        }
      }
      static _modelsAreIdentical(t, r) {
        const n = t.getLineCount(),
          i = r.getLineCount()
        if (n !== i) return !1
        for (let s = 1; s <= n; s++) {
          const a = t.getLineContent(s),
            o = r.getLineContent(s)
          if (a !== o) return !1
        }
        return !0
      }
      computeMoreMinimalEdits(t, r) {
        return mt(this, void 0, void 0, function* () {
          const n = this._getModel(t)
          if (!n) return r
          const i = []
          let s
          r = r.slice(0).sort((a, o) => {
            if (a.range && o.range) return G.compareRangesUsingStarts(a.range, o.range)
            const l = a.range ? 0 : 1,
              u = o.range ? 0 : 1
            return l - u
          })
          for (let { range: a, text: o, eol: l } of r) {
            if ((typeof l == 'number' && (s = l), G.isEmpty(a) && !o)) continue
            const u = n.getValueInRange(a)
            if (((o = o.replace(/\r\n|\n|\r/g, n.eol)), u === o)) continue
            if (Math.max(o.length, u.length) > lt._diffLimit) {
              i.push({ range: a, text: o })
              continue
            }
            const c = ao(u, o, !1),
              f = n.offsetAt(G.lift(a).getStartPosition())
            for (const d of c) {
              const g = n.positionAt(f + d.originalStart),
                p = n.positionAt(f + d.originalStart + d.originalLength),
                b = {
                  text: o.substr(d.modifiedStart, d.modifiedLength),
                  range: {
                    startLineNumber: g.lineNumber,
                    startColumn: g.column,
                    endLineNumber: p.lineNumber,
                    endColumn: p.column,
                  },
                }
              n.getValueInRange(b.range) !== b.text && i.push(b)
            }
          }
          return (
            typeof s == 'number' &&
              i.push({
                eol: s,
                text: '',
                range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 },
              }),
            i
          )
        })
      }
      computeLinks(t) {
        return mt(this, void 0, void 0, function* () {
          const r = this._getModel(t)
          return r ? Oo(r) : null
        })
      }
      textualSuggest(t, r, n, i) {
        return mt(this, void 0, void 0, function* () {
          const s = new vr(!0),
            a = new RegExp(n, i),
            o = new Set()
          e: for (const l of t) {
            const u = this._getModel(l)
            if (u) {
              for (const c of u.words(a))
                if (!(c === r || !isNaN(Number(c))) && (o.add(c), o.size > lt._suggestionsLimit)) break e
            }
          }
          return { words: Array.from(o), duration: s.elapsed() }
        })
      }
      computeWordRanges(t, r, n, i) {
        return mt(this, void 0, void 0, function* () {
          const s = this._getModel(t)
          if (!s) return Object.create(null)
          const a = new RegExp(n, i),
            o = Object.create(null)
          for (let l = r.startLineNumber; l < r.endLineNumber; l++) {
            const u = s.getLineWords(l, a)
            for (const c of u) {
              if (!isNaN(Number(c.word))) continue
              let f = o[c.word]
              f || ((f = []), (o[c.word] = f)),
                f.push({ startLineNumber: l, startColumn: c.startColumn, endLineNumber: l, endColumn: c.endColumn })
            }
          }
          return o
        })
      }
      navigateValueSet(t, r, n, i, s) {
        return mt(this, void 0, void 0, function* () {
          const a = this._getModel(t)
          if (!a) return null
          const o = new RegExp(i, s)
          r.startColumn === r.endColumn &&
            (r = {
              startLineNumber: r.startLineNumber,
              startColumn: r.startColumn,
              endLineNumber: r.endLineNumber,
              endColumn: r.endColumn + 1,
            })
          const l = a.getValueInRange(r),
            u = a.getWordAtPosition({ lineNumber: r.startLineNumber, column: r.startColumn }, o)
          if (!u) return null
          const c = a.getValueInRange(u)
          return gn.INSTANCE.navigateValueSet(r, l, u, c, n)
        })
      }
      loadForeignModule(t, r, n) {
        const a = { host: Pa(n, (o, l) => this._host.fhr(o, l)), getMirrorModels: () => this._getModels() }
        return this._foreignModuleFactory
          ? ((this._foreignModule = this._foreignModuleFactory(a, r)), Promise.resolve(Xr(this._foreignModule)))
          : Promise.reject(new Error('Unexpected usage'))
      }
      fmr(t, r) {
        if (!this._foreignModule || typeof this._foreignModule[t] != 'function')
          return Promise.reject(new Error('Missing requestHandler or method: ' + t))
        try {
          return Promise.resolve(this._foreignModule[t].apply(this._foreignModule, r))
        } catch (n) {
          return Promise.reject(n)
        }
      }
    }
    ;(lt._diffLimit = 1e5), (lt._suggestionsLimit = 1e4)
    function Kc(e) {
      return new lt(e, null)
    }
    typeof importScripts == 'function' && (ae.monaco = Zo())
    let Tn = !1
    function o1(e) {
      if (Tn) return
      Tn = !0
      const t = new Ti(
        (r) => {
          self.postMessage(r)
        },
        (r) => new lt(r, e),
      )
      self.onmessage = (r) => {
        t.onmessage(r.data)
      }
    }
    self.onmessage = (e) => {
      Tn || o1(null)
    }
    var Pn = ie(224)
    function Fn(e, t) {
      t === void 0 && (t = !1)
      var r = e.length,
        n = 0,
        i = '',
        s = 0,
        a = 16,
        o = 0,
        l = 0,
        u = 0,
        c = 0,
        f = 0
      function d(y, E) {
        for (var M = 0, D = 0; M < y || !E; ) {
          var C = e.charCodeAt(n)
          if (C >= 48 && C <= 57) D = D * 16 + C - 48
          else if (C >= 65 && C <= 70) D = D * 16 + C - 65 + 10
          else if (C >= 97 && C <= 102) D = D * 16 + C - 97 + 10
          else break
          n++, M++
        }
        return M < y && (D = -1), D
      }
      function g(y) {
        ;(n = y), (i = ''), (s = 0), (a = 16), (f = 0)
      }
      function p() {
        var y = n
        if (e.charCodeAt(n) === 48) n++
        else for (n++; n < e.length && Mt(e.charCodeAt(n)); ) n++
        if (n < e.length && e.charCodeAt(n) === 46)
          if ((n++, n < e.length && Mt(e.charCodeAt(n)))) for (n++; n < e.length && Mt(e.charCodeAt(n)); ) n++
          else return (f = 3), e.substring(y, n)
        var E = n
        if (n < e.length && (e.charCodeAt(n) === 69 || e.charCodeAt(n) === 101))
          if (
            (n++,
            ((n < e.length && e.charCodeAt(n) === 43) || e.charCodeAt(n) === 45) && n++,
            n < e.length && Mt(e.charCodeAt(n)))
          ) {
            for (n++; n < e.length && Mt(e.charCodeAt(n)); ) n++
            E = n
          } else f = 3
        return e.substring(y, E)
      }
      function b() {
        for (var y = '', E = n; ; ) {
          if (n >= r) {
            ;(y += e.substring(E, n)), (f = 2)
            break
          }
          var M = e.charCodeAt(n)
          if (M === 34) {
            ;(y += e.substring(E, n)), n++
            break
          }
          if (M === 92) {
            if (((y += e.substring(E, n)), n++, n >= r)) {
              f = 2
              break
            }
            var D = e.charCodeAt(n++)
            switch (D) {
              case 34:
                y += '"'
                break
              case 92:
                y += '\\'
                break
              case 47:
                y += '/'
                break
              case 98:
                y += '\b'
                break
              case 102:
                y += '\f'
                break
              case 110:
                y += `
`
                break
              case 114:
                y += '\r'
                break
              case 116:
                y += '	'
                break
              case 117:
                var C = d(4, !0)
                C >= 0 ? (y += String.fromCharCode(C)) : (f = 4)
                break
              default:
                f = 5
            }
            E = n
            continue
          }
          if (M >= 0 && M <= 31)
            if (Yt(M)) {
              ;(y += e.substring(E, n)), (f = 2)
              break
            } else f = 6
          n++
        }
        return y
      }
      function m() {
        if (((i = ''), (f = 0), (s = n), (l = o), (c = u), n >= r)) return (s = r), (a = 17)
        var y = e.charCodeAt(n)
        if (Dn(y)) {
          do n++, (i += String.fromCharCode(y)), (y = e.charCodeAt(n))
          while (Dn(y))
          return (a = 15)
        }
        if (Yt(y))
          return (
            n++,
            (i += String.fromCharCode(y)),
            y === 13 &&
              e.charCodeAt(n) === 10 &&
              (n++,
              (i += `
`)),
            o++,
            (u = n),
            (a = 14)
          )
        switch (y) {
          case 123:
            return n++, (a = 1)
          case 125:
            return n++, (a = 2)
          case 91:
            return n++, (a = 3)
          case 93:
            return n++, (a = 4)
          case 58:
            return n++, (a = 6)
          case 44:
            return n++, (a = 5)
          case 34:
            return n++, (i = b()), (a = 10)
          case 47:
            var E = n - 1
            if (e.charCodeAt(n + 1) === 47) {
              for (n += 2; n < r && !Yt(e.charCodeAt(n)); ) n++
              return (i = e.substring(E, n)), (a = 12)
            }
            if (e.charCodeAt(n + 1) === 42) {
              n += 2
              for (var M = r - 1, D = !1; n < M; ) {
                var C = e.charCodeAt(n)
                if (C === 42 && e.charCodeAt(n + 1) === 47) {
                  ;(n += 2), (D = !0)
                  break
                }
                n++, Yt(C) && (C === 13 && e.charCodeAt(n) === 10 && n++, o++, (u = n))
              }
              return D || (n++, (f = 1)), (i = e.substring(E, n)), (a = 13)
            }
            return (i += String.fromCharCode(y)), n++, (a = 16)
          case 45:
            if (((i += String.fromCharCode(y)), n++, n === r || !Mt(e.charCodeAt(n)))) return (a = 16)
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            return (i += p()), (a = 11)
          default:
            for (; n < r && v(y); ) n++, (y = e.charCodeAt(n))
            if (s !== n) {
              switch (((i = e.substring(s, n)), i)) {
                case 'true':
                  return (a = 8)
                case 'false':
                  return (a = 9)
                case 'null':
                  return (a = 7)
              }
              return (a = 16)
            }
            return (i += String.fromCharCode(y)), n++, (a = 16)
        }
      }
      function v(y) {
        if (Dn(y) || Yt(y)) return !1
        switch (y) {
          case 125:
          case 93:
          case 123:
          case 91:
          case 34:
          case 58:
          case 44:
          case 47:
            return !1
        }
        return !0
      }
      function _() {
        var y
        do y = m()
        while (y >= 12 && y <= 15)
        return y
      }
      return {
        setPosition: g,
        getPosition: function () {
          return n
        },
        scan: t ? _ : m,
        getToken: function () {
          return a
        },
        getTokenValue: function () {
          return i
        },
        getTokenOffset: function () {
          return s
        },
        getTokenLength: function () {
          return n - s
        },
        getTokenStartLine: function () {
          return l
        },
        getTokenStartCharacter: function () {
          return s - c
        },
        getTokenError: function () {
          return f
        },
      }
    }
    function Dn(e) {
      return (
        e === 32 ||
        e === 9 ||
        e === 11 ||
        e === 12 ||
        e === 160 ||
        e === 5760 ||
        (e >= 8192 && e <= 8203) ||
        e === 8239 ||
        e === 8287 ||
        e === 12288 ||
        e === 65279
      )
    }
    function Yt(e) {
      return e === 10 || e === 13 || e === 8232 || e === 8233
    }
    function Mt(e) {
      return e >= 48 && e <= 57
    }
    function Ll(e, t, r) {
      var n, i, s, a, o
      if (t) {
        for (a = t.offset, o = a + t.length, s = a; s > 0 && !l1(e, s - 1); ) s--
        for (var l = o; l < e.length && !l1(e, l); ) l++
        ;(i = e.substring(s, l)), (n = Cl(i, r))
      } else (i = e), (n = 0), (s = 0), (a = 0), (o = e.length)
      var u = Nl(r, e),
        c = !1,
        f = 0,
        d
      r.insertSpaces ? (d = In(' ', r.tabSize || 4)) : (d = '	')
      var g = Fn(i, !1),
        p = !1
      function b() {
        return u + In(d, n + f)
      }
      function m() {
        var S = g.scan()
        for (c = !1; S === 15 || S === 14; ) (c = c || S === 14), (S = g.scan())
        return (p = S === 16 || g.getTokenError() !== 0), S
      }
      var v = []
      function _(S, P, R) {
        !p && (!t || (P < o && R > a)) && e.substring(P, R) !== S && v.push({ offset: P, length: R - P, content: S })
      }
      var y = m()
      if (y !== 17) {
        var E = g.getTokenOffset() + s,
          M = In(d, n)
        _(M, s, E)
      }
      for (; y !== 17; ) {
        for (
          var D = g.getTokenOffset() + g.getTokenLength() + s, C = m(), k = '', x = !1;
          !c && (C === 12 || C === 13);

        ) {
          var w = g.getTokenOffset() + s
          _(' ', D, w), (D = g.getTokenOffset() + g.getTokenLength() + s), (x = C === 12), (k = x ? b() : ''), (C = m())
        }
        if (C === 2) y !== 1 && (f--, (k = b()))
        else if (C === 4) y !== 3 && (f--, (k = b()))
        else {
          switch (y) {
            case 3:
            case 1:
              f++, (k = b())
              break
            case 5:
            case 12:
              k = b()
              break
            case 13:
              c ? (k = b()) : x || (k = ' ')
              break
            case 6:
              x || (k = ' ')
              break
            case 10:
              if (C === 6) {
                x || (k = '')
                break
              }
            case 7:
            case 8:
            case 9:
            case 11:
            case 2:
            case 4:
              C === 12 || C === 13 ? x || (k = ' ') : C !== 5 && C !== 17 && (p = !0)
              break
            case 16:
              p = !0
              break
          }
          c && (C === 12 || C === 13) && (k = b())
        }
        C === 17 && (k = r.insertFinalNewline ? u : '')
        var A = g.getTokenOffset() + s
        _(k, D, A), (y = C)
      }
      return v
    }
    function In(e, t) {
      for (var r = '', n = 0; n < t; n++) r += e
      return r
    }
    function Cl(e, t) {
      for (var r = 0, n = 0, i = t.tabSize || 4; r < e.length; ) {
        var s = e.charAt(r)
        if (s === ' ') n++
        else if (s === '	') n += i
        else break
        r++
      }
      return Math.floor(n / i)
    }
    function Nl(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t.charAt(r)
        if (n === '\r')
          return r + 1 < t.length &&
            t.charAt(r + 1) ===
              `
`
            ? `\r
`
            : '\r'
        if (
          n ===
          `
`
        )
          return `
`
      }
      return (
        (e && e.eol) ||
        `
`
      )
    }
    function l1(e, t) {
      return (
        `\r
`.indexOf(e.charAt(t)) !== -1
      )
    }
    var Nr
    ;(function (e) {
      e.DEFAULT = { allowTrailingComma: !1 }
    })(Nr || (Nr = {}))
    function kl(e, t, r) {
      t === void 0 && (t = []), r === void 0 && (r = Nr.DEFAULT)
      var n = null,
        i = [],
        s = []
      function a(l) {
        Array.isArray(i) ? i.push(l) : n !== null && (i[n] = l)
      }
      var o = {
        onObjectBegin: function () {
          var l = {}
          a(l), s.push(i), (i = l), (n = null)
        },
        onObjectProperty: function (l) {
          n = l
        },
        onObjectEnd: function () {
          i = s.pop()
        },
        onArrayBegin: function () {
          var l = []
          a(l), s.push(i), (i = l), (n = null)
        },
        onArrayEnd: function () {
          i = s.pop()
        },
        onLiteralValue: a,
        onError: function (l, u, c) {
          t.push({ error: l, offset: u, length: c })
        },
      }
      return Ml(e, o, r), i[0]
    }
    function u1(e) {
      if (!e.parent || !e.parent.children) return []
      var t = u1(e.parent)
      if (e.parent.type === 'property') {
        var r = e.parent.children[0].value
        t.push(r)
      } else if (e.parent.type === 'array') {
        var n = e.parent.children.indexOf(e)
        n !== -1 && t.push(n)
      }
      return t
    }
    function Rn(e) {
      switch (e.type) {
        case 'array':
          return e.children.map(Rn)
        case 'object':
          for (var t = Object.create(null), r = 0, n = e.children; r < n.length; r++) {
            var i = n[r],
              s = i.children[1]
            s && (t[i.children[0].value] = Rn(s))
          }
          return t
        case 'null':
        case 'string':
        case 'number':
        case 'boolean':
          return e.value
        default:
          return
      }
    }
    function El(e, t, r) {
      return r === void 0 && (r = !1), (t >= e.offset && t < e.offset + e.length) || (r && t === e.offset + e.length)
    }
    function c1(e, t, r) {
      if ((r === void 0 && (r = !1), El(e, t, r))) {
        var n = e.children
        if (Array.isArray(n))
          for (var i = 0; i < n.length && n[i].offset <= t; i++) {
            var s = c1(n[i], t, r)
            if (s) return s
          }
        return e
      }
    }
    function Ml(e, t, r) {
      r === void 0 && (r = Nr.DEFAULT)
      var n = Fn(e, !1)
      function i(x) {
        return x
          ? function () {
              return x(n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter())
            }
          : function () {
              return !0
            }
      }
      function s(x) {
        return x
          ? function (w) {
              return x(w, n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter())
            }
          : function () {
              return !0
            }
      }
      var a = i(t.onObjectBegin),
        o = s(t.onObjectProperty),
        l = i(t.onObjectEnd),
        u = i(t.onArrayBegin),
        c = i(t.onArrayEnd),
        f = s(t.onLiteralValue),
        d = s(t.onSeparator),
        g = i(t.onComment),
        p = s(t.onError),
        b = r && r.disallowComments,
        m = r && r.allowTrailingComma
      function v() {
        for (;;) {
          var x = n.scan()
          switch (n.getTokenError()) {
            case 4:
              _(14)
              break
            case 5:
              _(15)
              break
            case 3:
              _(13)
              break
            case 1:
              b || _(11)
              break
            case 2:
              _(12)
              break
            case 6:
              _(16)
              break
          }
          switch (x) {
            case 12:
            case 13:
              b ? _(10) : g()
              break
            case 16:
              _(1)
              break
            case 15:
            case 14:
              break
            default:
              return x
          }
        }
      }
      function _(x, w, A) {
        if ((w === void 0 && (w = []), A === void 0 && (A = []), p(x), w.length + A.length > 0))
          for (var S = n.getToken(); S !== 17; ) {
            if (w.indexOf(S) !== -1) {
              v()
              break
            } else if (A.indexOf(S) !== -1) break
            S = v()
          }
      }
      function y(x) {
        var w = n.getTokenValue()
        return x ? f(w) : o(w), v(), !0
      }
      function E() {
        switch (n.getToken()) {
          case 11:
            var x = n.getTokenValue(),
              w = Number(x)
            isNaN(w) && (_(2), (w = 0)), f(w)
            break
          case 7:
            f(null)
            break
          case 8:
            f(!0)
            break
          case 9:
            f(!1)
            break
          default:
            return !1
        }
        return v(), !0
      }
      function M() {
        return n.getToken() !== 10
          ? (_(3, [], [2, 5]), !1)
          : (y(!1), n.getToken() === 6 ? (d(':'), v(), k() || _(4, [], [2, 5])) : _(5, [], [2, 5]), !0)
      }
      function D() {
        a(), v()
        for (var x = !1; n.getToken() !== 2 && n.getToken() !== 17; ) {
          if (n.getToken() === 5) {
            if ((x || _(4, [], []), d(','), v(), n.getToken() === 2 && m)) break
          } else x && _(6, [], [])
          M() || _(4, [], [2, 5]), (x = !0)
        }
        return l(), n.getToken() !== 2 ? _(7, [2], []) : v(), !0
      }
      function C() {
        u(), v()
        for (var x = !1; n.getToken() !== 4 && n.getToken() !== 17; ) {
          if (n.getToken() === 5) {
            if ((x || _(4, [], []), d(','), v(), n.getToken() === 4 && m)) break
          } else x && _(6, [], [])
          k() || _(4, [], [4, 5]), (x = !0)
        }
        return c(), n.getToken() !== 4 ? _(8, [4], []) : v(), !0
      }
      function k() {
        switch (n.getToken()) {
          case 3:
            return C()
          case 1:
            return D()
          case 10:
            return y(!0)
          default:
            return E()
        }
      }
      return (
        v(),
        n.getToken() === 17
          ? r.allowEmptyContent
            ? !0
            : (_(4, [], []), !1)
          : k()
            ? (n.getToken() !== 17 && _(9, [], []), !0)
            : (_(4, [], []), !1)
      )
    }
    var Tt = Fn,
      Tl = kl,
      Pl = c1,
      Fl = u1,
      Dl = Rn
    function Il(e, t, r) {
      return Ll(e, t, r)
    }
    function Kt(e, t) {
      if (e === t) return !0
      if (
        e == null ||
        t === null ||
        t === void 0 ||
        typeof e != typeof t ||
        typeof e != 'object' ||
        Array.isArray(e) !== Array.isArray(t)
      )
        return !1
      var r, n
      if (Array.isArray(e)) {
        if (e.length !== t.length) return !1
        for (r = 0; r < e.length; r++) if (!Kt(e[r], t[r])) return !1
      } else {
        var i = []
        for (n in e) i.push(n)
        i.sort()
        var s = []
        for (n in t) s.push(n)
        if ((s.sort(), !Kt(i, s))) return !1
        for (r = 0; r < i.length; r++) if (!Kt(e[i[r]], t[i[r]])) return !1
      }
      return !0
    }
    function Se(e) {
      return typeof e == 'number'
    }
    function Je(e) {
      return typeof e != 'undefined'
    }
    function je(e) {
      return typeof e == 'boolean'
    }
    function Rl(e) {
      return typeof e == 'string'
    }
    function Ol(e, t) {
      if (e.length < t.length) return !1
      for (var r = 0; r < t.length; r++) if (e[r] !== t[r]) return !1
      return !0
    }
    function er(e, t) {
      var r = e.length - t.length
      return r > 0 ? e.lastIndexOf(t) === r : r === 0 ? e === t : !1
    }
    function kr(e) {
      var t = ''
      Ol(e, '(?i)') && ((e = e.substring(4)), (t = 'i'))
      try {
        return new RegExp(e, t + 'u')
      } catch (r) {
        try {
          return new RegExp(e, t)
        } catch (n) {
          return
        }
      }
    }
    var f1
    ;(function (e) {
      ;(e.MIN_VALUE = -2147483648), (e.MAX_VALUE = 2147483647)
    })(f1 || (f1 = {}))
    var Er
    ;(function (e) {
      ;(e.MIN_VALUE = 0), (e.MAX_VALUE = 2147483647)
    })(Er || (Er = {}))
    var Re
    ;(function (e) {
      function t(n, i) {
        return (
          n === Number.MAX_VALUE && (n = Er.MAX_VALUE),
          i === Number.MAX_VALUE && (i = Er.MAX_VALUE),
          { line: n, character: i }
        )
      }
      e.create = t
      function r(n) {
        var i = n
        return L.objectLiteral(i) && L.uinteger(i.line) && L.uinteger(i.character)
      }
      e.is = r
    })(Re || (Re = {}))
    var J
    ;(function (e) {
      function t(n, i, s, a) {
        if (L.uinteger(n) && L.uinteger(i) && L.uinteger(s) && L.uinteger(a))
          return { start: Re.create(n, i), end: Re.create(s, a) }
        if (Re.is(n) && Re.is(i)) return { start: n, end: i }
        throw new Error('Range#create called with invalid arguments[' + n + ', ' + i + ', ' + s + ', ' + a + ']')
      }
      e.create = t
      function r(n) {
        var i = n
        return L.objectLiteral(i) && Re.is(i.start) && Re.is(i.end)
      }
      e.is = r
    })(J || (J = {}))
    var tr
    ;(function (e) {
      function t(n, i) {
        return { uri: n, range: i }
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && J.is(i.range) && (L.string(i.uri) || L.undefined(i.uri))
      }
      e.is = r
    })(tr || (tr = {}))
    var h1
    ;(function (e) {
      function t(n, i, s, a) {
        return { targetUri: n, targetRange: i, targetSelectionRange: s, originSelectionRange: a }
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          L.defined(i) &&
          J.is(i.targetRange) &&
          L.string(i.targetUri) &&
          (J.is(i.targetSelectionRange) || L.undefined(i.targetSelectionRange)) &&
          (J.is(i.originSelectionRange) || L.undefined(i.originSelectionRange))
        )
      }
      e.is = r
    })(h1 || (h1 = {}))
    var On
    ;(function (e) {
      function t(n, i, s, a) {
        return { red: n, green: i, blue: s, alpha: a }
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          L.numberRange(i.red, 0, 1) &&
          L.numberRange(i.green, 0, 1) &&
          L.numberRange(i.blue, 0, 1) &&
          L.numberRange(i.alpha, 0, 1)
        )
      }
      e.is = r
    })(On || (On = {}))
    var d1
    ;(function (e) {
      function t(n, i) {
        return { range: n, color: i }
      }
      e.create = t
      function r(n) {
        var i = n
        return J.is(i.range) && On.is(i.color)
      }
      e.is = r
    })(d1 || (d1 = {}))
    var g1
    ;(function (e) {
      function t(n, i, s) {
        return { label: n, textEdit: i, additionalTextEdits: s }
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          L.string(i.label) &&
          (L.undefined(i.textEdit) || Oe.is(i)) &&
          (L.undefined(i.additionalTextEdits) || L.typedArray(i.additionalTextEdits, Oe.is))
        )
      }
      e.is = r
    })(g1 || (g1 = {}))
    var rr
    ;(function (e) {
      ;(e.Comment = 'comment'), (e.Imports = 'imports'), (e.Region = 'region')
    })(rr || (rr = {}))
    var m1
    ;(function (e) {
      function t(n, i, s, a, o) {
        var l = { startLine: n, endLine: i }
        return (
          L.defined(s) && (l.startCharacter = s), L.defined(a) && (l.endCharacter = a), L.defined(o) && (l.kind = o), l
        )
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          L.uinteger(i.startLine) &&
          L.uinteger(i.startLine) &&
          (L.undefined(i.startCharacter) || L.uinteger(i.startCharacter)) &&
          (L.undefined(i.endCharacter) || L.uinteger(i.endCharacter)) &&
          (L.undefined(i.kind) || L.string(i.kind))
        )
      }
      e.is = r
    })(m1 || (m1 = {}))
    var Vn
    ;(function (e) {
      function t(n, i) {
        return { location: n, message: i }
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && tr.is(i.location) && L.string(i.message)
      }
      e.is = r
    })(Vn || (Vn = {}))
    var Ae
    ;(function (e) {
      ;(e.Error = 1), (e.Warning = 2), (e.Information = 3), (e.Hint = 4)
    })(Ae || (Ae = {}))
    var p1
    ;(function (e) {
      ;(e.Unnecessary = 1), (e.Deprecated = 2)
    })(p1 || (p1 = {}))
    var v1
    ;(function (e) {
      function t(r) {
        var n = r
        return n != null && L.string(n.href)
      }
      e.is = t
    })(v1 || (v1 = {}))
    var Qe
    ;(function (e) {
      function t(n, i, s, a, o, l) {
        var u = { range: n, message: i }
        return (
          L.defined(s) && (u.severity = s),
          L.defined(a) && (u.code = a),
          L.defined(o) && (u.source = o),
          L.defined(l) && (u.relatedInformation = l),
          u
        )
      }
      e.create = t
      function r(n) {
        var i,
          s = n
        return (
          L.defined(s) &&
          J.is(s.range) &&
          L.string(s.message) &&
          (L.number(s.severity) || L.undefined(s.severity)) &&
          (L.integer(s.code) || L.string(s.code) || L.undefined(s.code)) &&
          (L.undefined(s.codeDescription) ||
            L.string((i = s.codeDescription) === null || i === void 0 ? void 0 : i.href)) &&
          (L.string(s.source) || L.undefined(s.source)) &&
          (L.undefined(s.relatedInformation) || L.typedArray(s.relatedInformation, Vn.is))
        )
      }
      e.is = r
    })(Qe || (Qe = {}))
    var nr
    ;(function (e) {
      function t(n, i) {
        for (var s = [], a = 2; a < arguments.length; a++) s[a - 2] = arguments[a]
        var o = { title: n, command: i }
        return L.defined(s) && s.length > 0 && (o.arguments = s), o
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && L.string(i.title) && L.string(i.command)
      }
      e.is = r
    })(nr || (nr = {}))
    var Oe
    ;(function (e) {
      function t(s, a) {
        return { range: s, newText: a }
      }
      e.replace = t
      function r(s, a) {
        return { range: { start: s, end: s }, newText: a }
      }
      e.insert = r
      function n(s) {
        return { range: s, newText: '' }
      }
      e.del = n
      function i(s) {
        var a = s
        return L.objectLiteral(a) && L.string(a.newText) && J.is(a.range)
      }
      e.is = i
    })(Oe || (Oe = {}))
    var Pt
    ;(function (e) {
      function t(n, i, s) {
        var a = { label: n }
        return i !== void 0 && (a.needsConfirmation = i), s !== void 0 && (a.description = s), a
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          i !== void 0 &&
          L.objectLiteral(i) &&
          L.string(i.label) &&
          (L.boolean(i.needsConfirmation) || i.needsConfirmation === void 0) &&
          (L.string(i.description) || i.description === void 0)
        )
      }
      e.is = r
    })(Pt || (Pt = {}))
    var ue
    ;(function (e) {
      function t(r) {
        var n = r
        return typeof n == 'string'
      }
      e.is = t
    })(ue || (ue = {}))
    var ut
    ;(function (e) {
      function t(s, a, o) {
        return { range: s, newText: a, annotationId: o }
      }
      e.replace = t
      function r(s, a, o) {
        return { range: { start: s, end: s }, newText: a, annotationId: o }
      }
      e.insert = r
      function n(s, a) {
        return { range: s, newText: '', annotationId: a }
      }
      e.del = n
      function i(s) {
        var a = s
        return Oe.is(a) && (Pt.is(a.annotationId) || ue.is(a.annotationId))
      }
      e.is = i
    })(ut || (ut = {}))
    var Mr
    ;(function (e) {
      function t(n, i) {
        return { textDocument: n, edits: i }
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && Pr.is(i.textDocument) && Array.isArray(i.edits)
      }
      e.is = r
    })(Mr || (Mr = {}))
    var ir
    ;(function (e) {
      function t(n, i, s) {
        var a = { kind: 'create', uri: n }
        return (
          i !== void 0 && (i.overwrite !== void 0 || i.ignoreIfExists !== void 0) && (a.options = i),
          s !== void 0 && (a.annotationId = s),
          a
        )
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          i &&
          i.kind === 'create' &&
          L.string(i.uri) &&
          (i.options === void 0 ||
            ((i.options.overwrite === void 0 || L.boolean(i.options.overwrite)) &&
              (i.options.ignoreIfExists === void 0 || L.boolean(i.options.ignoreIfExists)))) &&
          (i.annotationId === void 0 || ue.is(i.annotationId))
        )
      }
      e.is = r
    })(ir || (ir = {}))
    var sr
    ;(function (e) {
      function t(n, i, s, a) {
        var o = { kind: 'rename', oldUri: n, newUri: i }
        return (
          s !== void 0 && (s.overwrite !== void 0 || s.ignoreIfExists !== void 0) && (o.options = s),
          a !== void 0 && (o.annotationId = a),
          o
        )
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          i &&
          i.kind === 'rename' &&
          L.string(i.oldUri) &&
          L.string(i.newUri) &&
          (i.options === void 0 ||
            ((i.options.overwrite === void 0 || L.boolean(i.options.overwrite)) &&
              (i.options.ignoreIfExists === void 0 || L.boolean(i.options.ignoreIfExists)))) &&
          (i.annotationId === void 0 || ue.is(i.annotationId))
        )
      }
      e.is = r
    })(sr || (sr = {}))
    var ar
    ;(function (e) {
      function t(n, i, s) {
        var a = { kind: 'delete', uri: n }
        return (
          i !== void 0 && (i.recursive !== void 0 || i.ignoreIfNotExists !== void 0) && (a.options = i),
          s !== void 0 && (a.annotationId = s),
          a
        )
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          i &&
          i.kind === 'delete' &&
          L.string(i.uri) &&
          (i.options === void 0 ||
            ((i.options.recursive === void 0 || L.boolean(i.options.recursive)) &&
              (i.options.ignoreIfNotExists === void 0 || L.boolean(i.options.ignoreIfNotExists)))) &&
          (i.annotationId === void 0 || ue.is(i.annotationId))
        )
      }
      e.is = r
    })(ar || (ar = {}))
    var Bn
    ;(function (e) {
      function t(r) {
        var n = r
        return (
          n &&
          (n.changes !== void 0 || n.documentChanges !== void 0) &&
          (n.documentChanges === void 0 ||
            n.documentChanges.every(function (i) {
              return L.string(i.kind) ? ir.is(i) || sr.is(i) || ar.is(i) : Mr.is(i)
            }))
        )
      }
      e.is = t
    })(Bn || (Bn = {}))
    var Tr = (function () {
        function e(t, r) {
          ;(this.edits = t), (this.changeAnnotations = r)
        }
        return (
          (e.prototype.insert = function (t, r, n) {
            var i, s
            if (
              (n === void 0
                ? (i = Oe.insert(t, r))
                : ue.is(n)
                  ? ((s = n), (i = ut.insert(t, r, n)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (s = this.changeAnnotations.manage(n)),
                    (i = ut.insert(t, r, s))),
              this.edits.push(i),
              s !== void 0)
            )
              return s
          }),
          (e.prototype.replace = function (t, r, n) {
            var i, s
            if (
              (n === void 0
                ? (i = Oe.replace(t, r))
                : ue.is(n)
                  ? ((s = n), (i = ut.replace(t, r, n)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (s = this.changeAnnotations.manage(n)),
                    (i = ut.replace(t, r, s))),
              this.edits.push(i),
              s !== void 0)
            )
              return s
          }),
          (e.prototype.delete = function (t, r) {
            var n, i
            if (
              (r === void 0
                ? (n = Oe.del(t))
                : ue.is(r)
                  ? ((i = r), (n = ut.del(t, r)))
                  : (this.assertChangeAnnotations(this.changeAnnotations),
                    (i = this.changeAnnotations.manage(r)),
                    (n = ut.del(t, i))),
              this.edits.push(n),
              i !== void 0)
            )
              return i
          }),
          (e.prototype.add = function (t) {
            this.edits.push(t)
          }),
          (e.prototype.all = function () {
            return this.edits
          }),
          (e.prototype.clear = function () {
            this.edits.splice(0, this.edits.length)
          }),
          (e.prototype.assertChangeAnnotations = function (t) {
            if (t === void 0) throw new Error('Text edit change is not configured to manage change annotations.')
          }),
          e
        )
      })(),
      b1 = (function () {
        function e(t) {
          ;(this._annotations = t === void 0 ? Object.create(null) : t), (this._counter = 0), (this._size = 0)
        }
        return (
          (e.prototype.all = function () {
            return this._annotations
          }),
          Object.defineProperty(e.prototype, 'size', {
            get: function () {
              return this._size
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.manage = function (t, r) {
            var n
            if ((ue.is(t) ? (n = t) : ((n = this.nextId()), (r = t)), this._annotations[n] !== void 0))
              throw new Error('Id ' + n + ' is already in use.')
            if (r === void 0) throw new Error('No annotation provided for id ' + n)
            return (this._annotations[n] = r), this._size++, n
          }),
          (e.prototype.nextId = function () {
            return this._counter++, this._counter.toString()
          }),
          e
        )
      })(),
      ef = (function () {
        function e(t) {
          var r = this
          ;(this._textEditChanges = Object.create(null)),
            t !== void 0
              ? ((this._workspaceEdit = t),
                t.documentChanges
                  ? ((this._changeAnnotations = new b1(t.changeAnnotations)),
                    (t.changeAnnotations = this._changeAnnotations.all()),
                    t.documentChanges.forEach(function (n) {
                      if (Mr.is(n)) {
                        var i = new Tr(n.edits, r._changeAnnotations)
                        r._textEditChanges[n.textDocument.uri] = i
                      }
                    }))
                  : t.changes &&
                    Object.keys(t.changes).forEach(function (n) {
                      var i = new Tr(t.changes[n])
                      r._textEditChanges[n] = i
                    }))
              : (this._workspaceEdit = {})
        }
        return (
          Object.defineProperty(e.prototype, 'edit', {
            get: function () {
              return (
                this.initDocumentChanges(),
                this._changeAnnotations !== void 0 &&
                  (this._changeAnnotations.size === 0
                    ? (this._workspaceEdit.changeAnnotations = void 0)
                    : (this._workspaceEdit.changeAnnotations = this._changeAnnotations.all())),
                this._workspaceEdit
              )
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.getTextEditChange = function (t) {
            if (Pr.is(t)) {
              if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
                throw new Error('Workspace edit is not configured for document changes.')
              var r = { uri: t.uri, version: t.version },
                n = this._textEditChanges[r.uri]
              if (!n) {
                var i = [],
                  s = { textDocument: r, edits: i }
                this._workspaceEdit.documentChanges.push(s),
                  (n = new Tr(i, this._changeAnnotations)),
                  (this._textEditChanges[r.uri] = n)
              }
              return n
            } else {
              if ((this.initChanges(), this._workspaceEdit.changes === void 0))
                throw new Error('Workspace edit is not configured for normal text edit changes.')
              var n = this._textEditChanges[t]
              if (!n) {
                var i = []
                ;(this._workspaceEdit.changes[t] = i), (n = new Tr(i)), (this._textEditChanges[t] = n)
              }
              return n
            }
          }),
          (e.prototype.initDocumentChanges = function () {
            this._workspaceEdit.documentChanges === void 0 &&
              this._workspaceEdit.changes === void 0 &&
              ((this._changeAnnotations = new b1()),
              (this._workspaceEdit.documentChanges = []),
              (this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()))
          }),
          (e.prototype.initChanges = function () {
            this._workspaceEdit.documentChanges === void 0 &&
              this._workspaceEdit.changes === void 0 &&
              (this._workspaceEdit.changes = Object.create(null))
          }),
          (e.prototype.createFile = function (t, r, n) {
            if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
              throw new Error('Workspace edit is not configured for document changes.')
            var i
            Pt.is(r) || ue.is(r) ? (i = r) : (n = r)
            var s, a
            if (
              (i === void 0
                ? (s = ir.create(t, n))
                : ((a = ue.is(i) ? i : this._changeAnnotations.manage(i)), (s = ir.create(t, n, a))),
              this._workspaceEdit.documentChanges.push(s),
              a !== void 0)
            )
              return a
          }),
          (e.prototype.renameFile = function (t, r, n, i) {
            if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
              throw new Error('Workspace edit is not configured for document changes.')
            var s
            Pt.is(n) || ue.is(n) ? (s = n) : (i = n)
            var a, o
            if (
              (s === void 0
                ? (a = sr.create(t, r, i))
                : ((o = ue.is(s) ? s : this._changeAnnotations.manage(s)), (a = sr.create(t, r, i, o))),
              this._workspaceEdit.documentChanges.push(a),
              o !== void 0)
            )
              return o
          }),
          (e.prototype.deleteFile = function (t, r, n) {
            if ((this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0))
              throw new Error('Workspace edit is not configured for document changes.')
            var i
            Pt.is(r) || ue.is(r) ? (i = r) : (n = r)
            var s, a
            if (
              (i === void 0
                ? (s = ar.create(t, n))
                : ((a = ue.is(i) ? i : this._changeAnnotations.manage(i)), (s = ar.create(t, n, a))),
              this._workspaceEdit.documentChanges.push(s),
              a !== void 0)
            )
              return a
          }),
          e
        )
      })(),
      y1
    ;(function (e) {
      function t(n) {
        return { uri: n }
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && L.string(i.uri)
      }
      e.is = r
    })(y1 || (y1 = {}))
    var _1
    ;(function (e) {
      function t(n, i) {
        return { uri: n, version: i }
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && L.string(i.uri) && L.integer(i.version)
      }
      e.is = r
    })(_1 || (_1 = {}))
    var Pr
    ;(function (e) {
      function t(n, i) {
        return { uri: n, version: i }
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && L.string(i.uri) && (i.version === null || L.integer(i.version))
      }
      e.is = r
    })(Pr || (Pr = {}))
    var x1
    ;(function (e) {
      function t(n, i, s, a) {
        return { uri: n, languageId: i, version: s, text: a }
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && L.string(i.uri) && L.string(i.languageId) && L.integer(i.version) && L.string(i.text)
      }
      e.is = r
    })(x1 || (x1 = {}))
    var Xe
    ;(function (e) {
      ;(e.PlainText = 'plaintext'), (e.Markdown = 'markdown')
    })(Xe || (Xe = {})),
      (function (e) {
        function t(r) {
          var n = r
          return n === e.PlainText || n === e.Markdown
        }
        e.is = t
      })(Xe || (Xe = {}))
    var Un
    ;(function (e) {
      function t(r) {
        var n = r
        return L.objectLiteral(r) && Xe.is(n.kind) && L.string(n.value)
      }
      e.is = t
    })(Un || (Un = {}))
    var ye
    ;(function (e) {
      ;(e.Text = 1),
        (e.Method = 2),
        (e.Function = 3),
        (e.Constructor = 4),
        (e.Field = 5),
        (e.Variable = 6),
        (e.Class = 7),
        (e.Interface = 8),
        (e.Module = 9),
        (e.Property = 10),
        (e.Unit = 11),
        (e.Value = 12),
        (e.Enum = 13),
        (e.Keyword = 14),
        (e.Snippet = 15),
        (e.Color = 16),
        (e.File = 17),
        (e.Reference = 18),
        (e.Folder = 19),
        (e.EnumMember = 20),
        (e.Constant = 21),
        (e.Struct = 22),
        (e.Event = 23),
        (e.Operator = 24),
        (e.TypeParameter = 25)
    })(ye || (ye = {}))
    var re
    ;(function (e) {
      ;(e.PlainText = 1), (e.Snippet = 2)
    })(re || (re = {}))
    var w1
    ;(function (e) {
      e.Deprecated = 1
    })(w1 || (w1 = {}))
    var S1
    ;(function (e) {
      function t(n, i, s) {
        return { newText: n, insert: i, replace: s }
      }
      e.create = t
      function r(n) {
        var i = n
        return i && L.string(i.newText) && J.is(i.insert) && J.is(i.replace)
      }
      e.is = r
    })(S1 || (S1 = {}))
    var A1
    ;(function (e) {
      ;(e.asIs = 1), (e.adjustIndentation = 2)
    })(A1 || (A1 = {}))
    var jn
    ;(function (e) {
      function t(r) {
        return { label: r }
      }
      e.create = t
    })(jn || (jn = {}))
    var L1
    ;(function (e) {
      function t(r, n) {
        return { items: r || [], isIncomplete: !!n }
      }
      e.create = t
    })(L1 || (L1 = {}))
    var Fr
    ;(function (e) {
      function t(n) {
        return n.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&')
      }
      e.fromPlainText = t
      function r(n) {
        var i = n
        return L.string(i) || (L.objectLiteral(i) && L.string(i.language) && L.string(i.value))
      }
      e.is = r
    })(Fr || (Fr = {}))
    var C1
    ;(function (e) {
      function t(r) {
        var n = r
        return (
          !!n &&
          L.objectLiteral(n) &&
          (Un.is(n.contents) || Fr.is(n.contents) || L.typedArray(n.contents, Fr.is)) &&
          (r.range === void 0 || J.is(r.range))
        )
      }
      e.is = t
    })(C1 || (C1 = {}))
    var N1
    ;(function (e) {
      function t(r, n) {
        return n ? { label: r, documentation: n } : { label: r }
      }
      e.create = t
    })(N1 || (N1 = {}))
    var k1
    ;(function (e) {
      function t(r, n) {
        for (var i = [], s = 2; s < arguments.length; s++) i[s - 2] = arguments[s]
        var a = { label: r }
        return L.defined(n) && (a.documentation = n), L.defined(i) ? (a.parameters = i) : (a.parameters = []), a
      }
      e.create = t
    })(k1 || (k1 = {}))
    var E1
    ;(function (e) {
      ;(e.Text = 1), (e.Read = 2), (e.Write = 3)
    })(E1 || (E1 = {}))
    var M1
    ;(function (e) {
      function t(r, n) {
        var i = { range: r }
        return L.number(n) && (i.kind = n), i
      }
      e.create = t
    })(M1 || (M1 = {}))
    var We
    ;(function (e) {
      ;(e.File = 1),
        (e.Module = 2),
        (e.Namespace = 3),
        (e.Package = 4),
        (e.Class = 5),
        (e.Method = 6),
        (e.Property = 7),
        (e.Field = 8),
        (e.Constructor = 9),
        (e.Enum = 10),
        (e.Interface = 11),
        (e.Function = 12),
        (e.Variable = 13),
        (e.Constant = 14),
        (e.String = 15),
        (e.Number = 16),
        (e.Boolean = 17),
        (e.Array = 18),
        (e.Object = 19),
        (e.Key = 20),
        (e.Null = 21),
        (e.EnumMember = 22),
        (e.Struct = 23),
        (e.Event = 24),
        (e.Operator = 25),
        (e.TypeParameter = 26)
    })(We || (We = {}))
    var T1
    ;(function (e) {
      e.Deprecated = 1
    })(T1 || (T1 = {}))
    var P1
    ;(function (e) {
      function t(r, n, i, s, a) {
        var o = { name: r, kind: n, location: { uri: s, range: i } }
        return a && (o.containerName = a), o
      }
      e.create = t
    })(P1 || (P1 = {}))
    var F1
    ;(function (e) {
      function t(n, i, s, a, o, l) {
        var u = { name: n, detail: i, kind: s, range: a, selectionRange: o }
        return l !== void 0 && (u.children = l), u
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          i &&
          L.string(i.name) &&
          L.number(i.kind) &&
          J.is(i.range) &&
          J.is(i.selectionRange) &&
          (i.detail === void 0 || L.string(i.detail)) &&
          (i.deprecated === void 0 || L.boolean(i.deprecated)) &&
          (i.children === void 0 || Array.isArray(i.children)) &&
          (i.tags === void 0 || Array.isArray(i.tags))
        )
      }
      e.is = r
    })(F1 || (F1 = {}))
    var D1
    ;(function (e) {
      ;(e.Empty = ''),
        (e.QuickFix = 'quickfix'),
        (e.Refactor = 'refactor'),
        (e.RefactorExtract = 'refactor.extract'),
        (e.RefactorInline = 'refactor.inline'),
        (e.RefactorRewrite = 'refactor.rewrite'),
        (e.Source = 'source'),
        (e.SourceOrganizeImports = 'source.organizeImports'),
        (e.SourceFixAll = 'source.fixAll')
    })(D1 || (D1 = {}))
    var I1
    ;(function (e) {
      function t(n, i) {
        var s = { diagnostics: n }
        return i != null && (s.only = i), s
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          L.defined(i) && L.typedArray(i.diagnostics, Qe.is) && (i.only === void 0 || L.typedArray(i.only, L.string))
        )
      }
      e.is = r
    })(I1 || (I1 = {}))
    var R1
    ;(function (e) {
      function t(n, i, s) {
        var a = { title: n },
          o = !0
        return (
          typeof i == 'string' ? ((o = !1), (a.kind = i)) : nr.is(i) ? (a.command = i) : (a.edit = i),
          o && s !== void 0 && (a.kind = s),
          a
        )
      }
      e.create = t
      function r(n) {
        var i = n
        return (
          i &&
          L.string(i.title) &&
          (i.diagnostics === void 0 || L.typedArray(i.diagnostics, Qe.is)) &&
          (i.kind === void 0 || L.string(i.kind)) &&
          (i.edit !== void 0 || i.command !== void 0) &&
          (i.command === void 0 || nr.is(i.command)) &&
          (i.isPreferred === void 0 || L.boolean(i.isPreferred)) &&
          (i.edit === void 0 || Bn.is(i.edit))
        )
      }
      e.is = r
    })(R1 || (R1 = {}))
    var O1
    ;(function (e) {
      function t(n, i) {
        var s = { range: n }
        return L.defined(i) && (s.data = i), s
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && J.is(i.range) && (L.undefined(i.command) || nr.is(i.command))
      }
      e.is = r
    })(O1 || (O1 = {}))
    var V1
    ;(function (e) {
      function t(n, i) {
        return { tabSize: n, insertSpaces: i }
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && L.uinteger(i.tabSize) && L.boolean(i.insertSpaces)
      }
      e.is = r
    })(V1 || (V1 = {}))
    var B1
    ;(function (e) {
      function t(n, i, s) {
        return { range: n, target: i, data: s }
      }
      e.create = t
      function r(n) {
        var i = n
        return L.defined(i) && J.is(i.range) && (L.undefined(i.target) || L.string(i.target))
      }
      e.is = r
    })(B1 || (B1 = {}))
    var Dr
    ;(function (e) {
      function t(n, i) {
        return { range: n, parent: i }
      }
      e.create = t
      function r(n) {
        var i = n
        return i !== void 0 && J.is(i.range) && (i.parent === void 0 || e.is(i.parent))
      }
      e.is = r
    })(Dr || (Dr = {}))
    var U1
    ;(function (e) {
      function t(s, a, o, l) {
        return new Vl(s, a, o, l)
      }
      e.create = t
      function r(s) {
        var a = s
        return !!(
          L.defined(a) &&
          L.string(a.uri) &&
          (L.undefined(a.languageId) || L.string(a.languageId)) &&
          L.uinteger(a.lineCount) &&
          L.func(a.getText) &&
          L.func(a.positionAt) &&
          L.func(a.offsetAt)
        )
      }
      e.is = r
      function n(s, a) {
        for (
          var o = s.getText(),
            l = i(a, function (p, b) {
              var m = p.range.start.line - b.range.start.line
              return m === 0 ? p.range.start.character - b.range.start.character : m
            }),
            u = o.length,
            c = l.length - 1;
          c >= 0;
          c--
        ) {
          var f = l[c],
            d = s.offsetAt(f.range.start),
            g = s.offsetAt(f.range.end)
          if (g <= u) o = o.substring(0, d) + f.newText + o.substring(g, o.length)
          else throw new Error('Overlapping edit')
          u = d
        }
        return o
      }
      e.applyEdits = n
      function i(s, a) {
        if (s.length <= 1) return s
        var o = (s.length / 2) | 0,
          l = s.slice(0, o),
          u = s.slice(o)
        i(l, a), i(u, a)
        for (var c = 0, f = 0, d = 0; c < l.length && f < u.length; ) {
          var g = a(l[c], u[f])
          g <= 0 ? (s[d++] = l[c++]) : (s[d++] = u[f++])
        }
        for (; c < l.length; ) s[d++] = l[c++]
        for (; f < u.length; ) s[d++] = u[f++]
        return s
      }
    })(U1 || (U1 = {}))
    var Vl = (function () {
        function e(t, r, n, i) {
          ;(this._uri = t),
            (this._languageId = r),
            (this._version = n),
            (this._content = i),
            (this._lineOffsets = void 0)
        }
        return (
          Object.defineProperty(e.prototype, 'uri', {
            get: function () {
              return this._uri
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'languageId', {
            get: function () {
              return this._languageId
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'version', {
            get: function () {
              return this._version
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.getText = function (t) {
            if (t) {
              var r = this.offsetAt(t.start),
                n = this.offsetAt(t.end)
              return this._content.substring(r, n)
            }
            return this._content
          }),
          (e.prototype.update = function (t, r) {
            ;(this._content = t.text), (this._version = r), (this._lineOffsets = void 0)
          }),
          (e.prototype.getLineOffsets = function () {
            if (this._lineOffsets === void 0) {
              for (var t = [], r = this._content, n = !0, i = 0; i < r.length; i++) {
                n && (t.push(i), (n = !1))
                var s = r.charAt(i)
                ;(n =
                  s === '\r' ||
                  s ===
                    `
`),
                  s === '\r' &&
                    i + 1 < r.length &&
                    r.charAt(i + 1) ===
                      `
` &&
                    i++
              }
              n && r.length > 0 && t.push(r.length), (this._lineOffsets = t)
            }
            return this._lineOffsets
          }),
          (e.prototype.positionAt = function (t) {
            t = Math.max(Math.min(t, this._content.length), 0)
            var r = this.getLineOffsets(),
              n = 0,
              i = r.length
            if (i === 0) return Re.create(0, t)
            for (; n < i; ) {
              var s = Math.floor((n + i) / 2)
              r[s] > t ? (i = s) : (n = s + 1)
            }
            var a = n - 1
            return Re.create(a, t - r[a])
          }),
          (e.prototype.offsetAt = function (t) {
            var r = this.getLineOffsets()
            if (t.line >= r.length) return this._content.length
            if (t.line < 0) return 0
            var n = r[t.line],
              i = t.line + 1 < r.length ? r[t.line + 1] : this._content.length
            return Math.max(Math.min(n + t.character, i), n)
          }),
          Object.defineProperty(e.prototype, 'lineCount', {
            get: function () {
              return this.getLineOffsets().length
            },
            enumerable: !1,
            configurable: !0,
          }),
          e
        )
      })(),
      L
    ;(function (e) {
      var t = Object.prototype.toString
      function r(g) {
        return typeof g != 'undefined'
      }
      e.defined = r
      function n(g) {
        return typeof g == 'undefined'
      }
      e.undefined = n
      function i(g) {
        return g === !0 || g === !1
      }
      e.boolean = i
      function s(g) {
        return t.call(g) === '[object String]'
      }
      e.string = s
      function a(g) {
        return t.call(g) === '[object Number]'
      }
      e.number = a
      function o(g, p, b) {
        return t.call(g) === '[object Number]' && p <= g && g <= b
      }
      e.numberRange = o
      function l(g) {
        return t.call(g) === '[object Number]' && -2147483648 <= g && g <= 2147483647
      }
      e.integer = l
      function u(g) {
        return t.call(g) === '[object Number]' && 0 <= g && g <= 2147483647
      }
      e.uinteger = u
      function c(g) {
        return t.call(g) === '[object Function]'
      }
      e.func = c
      function f(g) {
        return g !== null && typeof g == 'object'
      }
      e.objectLiteral = f
      function d(g, p) {
        return Array.isArray(g) && g.every(p)
      }
      e.typedArray = d
    })(L || (L = {}))
    var Ir = class {
        constructor(e, t, r, n) {
          ;(this._uri = e),
            (this._languageId = t),
            (this._version = r),
            (this._content = n),
            (this._lineOffsets = void 0)
        }
        get uri() {
          return this._uri
        }
        get languageId() {
          return this._languageId
        }
        get version() {
          return this._version
        }
        getText(e) {
          if (e) {
            const t = this.offsetAt(e.start),
              r = this.offsetAt(e.end)
            return this._content.substring(t, r)
          }
          return this._content
        }
        update(e, t) {
          for (let r of e)
            if (Ir.isIncremental(r)) {
              const n = W1(r.range),
                i = this.offsetAt(n.start),
                s = this.offsetAt(n.end)
              this._content = this._content.substring(0, i) + r.text + this._content.substring(s, this._content.length)
              const a = Math.max(n.start.line, 0),
                o = Math.max(n.end.line, 0)
              let l = this._lineOffsets
              const u = j1(r.text, !1, i)
              if (o - a === u.length) for (let f = 0, d = u.length; f < d; f++) l[f + a + 1] = u[f]
              else
                u.length < 1e4
                  ? l.splice(a + 1, o - a, ...u)
                  : (this._lineOffsets = l = l.slice(0, a + 1).concat(u, l.slice(o + 1)))
              const c = r.text.length - (s - i)
              if (c !== 0) for (let f = a + 1 + u.length, d = l.length; f < d; f++) l[f] = l[f] + c
            } else if (Ir.isFull(r)) (this._content = r.text), (this._lineOffsets = void 0)
            else throw new Error('Unknown change event received')
          this._version = t
        }
        getLineOffsets() {
          return this._lineOffsets === void 0 && (this._lineOffsets = j1(this._content, !0)), this._lineOffsets
        }
        positionAt(e) {
          e = Math.max(Math.min(e, this._content.length), 0)
          let t = this.getLineOffsets(),
            r = 0,
            n = t.length
          if (n === 0) return { line: 0, character: e }
          for (; r < n; ) {
            let s = Math.floor((r + n) / 2)
            t[s] > e ? (n = s) : (r = s + 1)
          }
          let i = r - 1
          return { line: i, character: e - t[i] }
        }
        offsetAt(e) {
          let t = this.getLineOffsets()
          if (e.line >= t.length) return this._content.length
          if (e.line < 0) return 0
          let r = t[e.line],
            n = e.line + 1 < t.length ? t[e.line + 1] : this._content.length
          return Math.max(Math.min(r + e.character, n), r)
        }
        get lineCount() {
          return this.getLineOffsets().length
        }
        static isIncremental(e) {
          let t = e
          return (
            t != null &&
            typeof t.text == 'string' &&
            t.range !== void 0 &&
            (t.rangeLength === void 0 || typeof t.rangeLength == 'number')
          )
        }
        static isFull(e) {
          let t = e
          return t != null && typeof t.text == 'string' && t.range === void 0 && t.rangeLength === void 0
        }
      },
      Wn
    ;(function (e) {
      function t(i, s, a, o) {
        return new Ir(i, s, a, o)
      }
      e.create = t
      function r(i, s, a) {
        if (i instanceof Ir) return i.update(s, a), i
        throw new Error('TextDocument.update: document must be created by TextDocument.create')
      }
      e.update = r
      function n(i, s) {
        let a = i.getText(),
          o = qn(s.map(Bl), (c, f) => {
            let d = c.range.start.line - f.range.start.line
            return d === 0 ? c.range.start.character - f.range.start.character : d
          }),
          l = 0
        const u = []
        for (const c of o) {
          let f = i.offsetAt(c.range.start)
          if (f < l) throw new Error('Overlapping edit')
          f > l && u.push(a.substring(l, f)), c.newText.length && u.push(c.newText), (l = i.offsetAt(c.range.end))
        }
        return u.push(a.substr(l)), u.join('')
      }
      e.applyEdits = n
    })(Wn || (Wn = {}))
    function qn(e, t) {
      if (e.length <= 1) return e
      const r = (e.length / 2) | 0,
        n = e.slice(0, r),
        i = e.slice(r)
      qn(n, t), qn(i, t)
      let s = 0,
        a = 0,
        o = 0
      for (; s < n.length && a < i.length; ) t(n[s], i[a]) <= 0 ? (e[o++] = n[s++]) : (e[o++] = i[a++])
      for (; s < n.length; ) e[o++] = n[s++]
      for (; a < i.length; ) e[o++] = i[a++]
      return e
    }
    function j1(e, t, r = 0) {
      const n = t ? [r] : []
      for (let i = 0; i < e.length; i++) {
        let s = e.charCodeAt(i)
        ;(s === 13 || s === 10) &&
          (s === 13 && i + 1 < e.length && e.charCodeAt(i + 1) === 10 && i++, n.push(r + i + 1))
      }
      return n
    }
    function W1(e) {
      const t = e.start,
        r = e.end
      return t.line > r.line || (t.line === r.line && t.character > r.character) ? { start: r, end: t } : e
    }
    function Bl(e) {
      const t = W1(e.range)
      return t !== e.range ? { newText: e.newText, range: t } : e
    }
    var z
    ;(function (e) {
      ;(e[(e.Undefined = 0)] = 'Undefined'),
        (e[(e.EnumValueMismatch = 1)] = 'EnumValueMismatch'),
        (e[(e.Deprecated = 2)] = 'Deprecated'),
        (e[(e.UnexpectedEndOfComment = 257)] = 'UnexpectedEndOfComment'),
        (e[(e.UnexpectedEndOfString = 258)] = 'UnexpectedEndOfString'),
        (e[(e.UnexpectedEndOfNumber = 259)] = 'UnexpectedEndOfNumber'),
        (e[(e.InvalidUnicode = 260)] = 'InvalidUnicode'),
        (e[(e.InvalidEscapeCharacter = 261)] = 'InvalidEscapeCharacter'),
        (e[(e.InvalidCharacter = 262)] = 'InvalidCharacter'),
        (e[(e.PropertyExpected = 513)] = 'PropertyExpected'),
        (e[(e.CommaExpected = 514)] = 'CommaExpected'),
        (e[(e.ColonExpected = 515)] = 'ColonExpected'),
        (e[(e.ValueExpected = 516)] = 'ValueExpected'),
        (e[(e.CommaOrCloseBacketExpected = 517)] = 'CommaOrCloseBacketExpected'),
        (e[(e.CommaOrCloseBraceExpected = 518)] = 'CommaOrCloseBraceExpected'),
        (e[(e.TrailingComma = 519)] = 'TrailingComma'),
        (e[(e.DuplicateKey = 520)] = 'DuplicateKey'),
        (e[(e.CommentNotPermitted = 521)] = 'CommentNotPermitted'),
        (e[(e.SchemaResolveError = 768)] = 'SchemaResolveError')
    })(z || (z = {}))
    var q1
    ;(function (e) {
      e.LATEST = {
        textDocument: {
          completion: {
            completionItem: { documentationFormat: [Xe.Markdown, Xe.PlainText], commitCharactersSupport: !0 },
          },
        },
      }
    })(q1 || (q1 = {}))
    function Ul(e, t) {
      let r
      return (
        t.length === 0
          ? (r = e)
          : (r = e.replace(/\{(\d+)\}/g, (n, i) => {
              let s = i[0]
              return typeof t[s] != 'undefined' ? t[s] : n
            })),
        r
      )
    }
    function jl(e, t, ...r) {
      return Ul(t, r)
    }
    function or(e) {
      return jl
    }
    var pt = (function () {
        var e = function (t, r) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (n, i) {
                  n.__proto__ = i
                }) ||
              function (n, i) {
                for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (n[s] = i[s])
              }),
            e(t, r)
          )
        }
        return function (t, r) {
          if (typeof r != 'function' && r !== null)
            throw new TypeError('Class extends value ' + String(r) + ' is not a constructor or null')
          e(t, r)
          function n() {
            this.constructor = t
          }
          t.prototype = r === null ? Object.create(r) : ((n.prototype = r.prototype), new n())
        }
      })(),
      O = or(),
      Wl = {
        'color-hex': {
          errorMessage: O('colorHexFormatWarning', 'Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA.'),
          pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/,
        },
        'date-time': {
          errorMessage: O('dateTimeFormatWarning', 'String is not a RFC3339 date-time.'),
          pattern:
            /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i,
        },
        date: {
          errorMessage: O('dateFormatWarning', 'String is not a RFC3339 date.'),
          pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i,
        },
        time: {
          errorMessage: O('timeFormatWarning', 'String is not a RFC3339 time.'),
          pattern:
            /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i,
        },
        email: {
          errorMessage: O('emailFormatWarning', 'String is not an e-mail address.'),
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/,
        },
        hostname: {
          errorMessage: O('hostnameFormatWarning', 'String is not a hostname.'),
          pattern:
            /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
        },
        ipv4: {
          errorMessage: O('ipv4FormatWarning', 'String is not an IPv4 address.'),
          pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
        },
        ipv6: {
          errorMessage: O('ipv6FormatWarning', 'String is not an IPv6 address.'),
          pattern:
            /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
        },
      },
      vt = (function () {
        function e(t, r, n) {
          n === void 0 && (n = 0), (this.offset = r), (this.length = n), (this.parent = t)
        }
        return (
          Object.defineProperty(e.prototype, 'children', {
            get: function () {
              return []
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.toString = function () {
            return (
              'type: ' +
              this.type +
              ' (' +
              this.offset +
              '/' +
              this.length +
              ')' +
              (this.parent ? ' parent: {' + this.parent.toString() + '}' : '')
            )
          }),
          e
        )
      })(),
      ql = (function (e) {
        pt(t, e)
        function t(r, n) {
          var i = e.call(this, r, n) || this
          return (i.type = 'null'), (i.value = null), i
        }
        return t
      })(vt),
      $1 = (function (e) {
        pt(t, e)
        function t(r, n, i) {
          var s = e.call(this, r, i) || this
          return (s.type = 'boolean'), (s.value = n), s
        }
        return t
      })(vt),
      $l = (function (e) {
        pt(t, e)
        function t(r, n) {
          var i = e.call(this, r, n) || this
          return (i.type = 'array'), (i.items = []), i
        }
        return (
          Object.defineProperty(t.prototype, 'children', {
            get: function () {
              return this.items
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        )
      })(vt),
      Hl = (function (e) {
        pt(t, e)
        function t(r, n) {
          var i = e.call(this, r, n) || this
          return (i.type = 'number'), (i.isInteger = !0), (i.value = Number.NaN), i
        }
        return t
      })(vt),
      $n = (function (e) {
        pt(t, e)
        function t(r, n, i) {
          var s = e.call(this, r, n, i) || this
          return (s.type = 'string'), (s.value = ''), s
        }
        return t
      })(vt),
      zl = (function (e) {
        pt(t, e)
        function t(r, n, i) {
          var s = e.call(this, r, n) || this
          return (s.type = 'property'), (s.colonOffset = -1), (s.keyNode = i), s
        }
        return (
          Object.defineProperty(t.prototype, 'children', {
            get: function () {
              return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode]
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        )
      })(vt),
      Gl = (function (e) {
        pt(t, e)
        function t(r, n) {
          var i = e.call(this, r, n) || this
          return (i.type = 'object'), (i.properties = []), i
        }
        return (
          Object.defineProperty(t.prototype, 'children', {
            get: function () {
              return this.properties
            },
            enumerable: !1,
            configurable: !0,
          }),
          t
        )
      })(vt)
    function _e(e) {
      return je(e) ? (e ? {} : { not: {} }) : e
    }
    var H1
    ;(function (e) {
      ;(e[(e.Key = 0)] = 'Key'), (e[(e.Enum = 1)] = 'Enum')
    })(H1 || (H1 = {}))
    var Jl = (function () {
        function e(t, r) {
          t === void 0 && (t = -1), (this.focusOffset = t), (this.exclude = r), (this.schemas = [])
        }
        return (
          (e.prototype.add = function (t) {
            this.schemas.push(t)
          }),
          (e.prototype.merge = function (t) {
            Array.prototype.push.apply(this.schemas, t.schemas)
          }),
          (e.prototype.include = function (t) {
            return (this.focusOffset === -1 || z1(t, this.focusOffset)) && t !== this.exclude
          }),
          (e.prototype.newSub = function () {
            return new e(-1, this.exclude)
          }),
          e
        )
      })(),
      Hn = (function () {
        function e() {}
        return (
          Object.defineProperty(e.prototype, 'schemas', {
            get: function () {
              return []
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.add = function (t) {}),
          (e.prototype.merge = function (t) {}),
          (e.prototype.include = function (t) {
            return !0
          }),
          (e.prototype.newSub = function () {
            return this
          }),
          (e.instance = new e()),
          e
        )
      })(),
      xe = (function () {
        function e() {
          ;(this.problems = []),
            (this.propertiesMatches = 0),
            (this.propertiesValueMatches = 0),
            (this.primaryValueMatches = 0),
            (this.enumValueMatch = !1),
            (this.enumValues = void 0)
        }
        return (
          (e.prototype.hasProblems = function () {
            return !!this.problems.length
          }),
          (e.prototype.mergeAll = function (t) {
            for (var r = 0, n = t; r < n.length; r++) {
              var i = n[r]
              this.merge(i)
            }
          }),
          (e.prototype.merge = function (t) {
            this.problems = this.problems.concat(t.problems)
          }),
          (e.prototype.mergeEnumValues = function (t) {
            if (!this.enumValueMatch && !t.enumValueMatch && this.enumValues && t.enumValues) {
              this.enumValues = this.enumValues.concat(t.enumValues)
              for (var r = 0, n = this.problems; r < n.length; r++) {
                var i = n[r]
                i.code === z.EnumValueMismatch &&
                  (i.message = O(
                    'enumWarning',
                    'Value is not accepted. Valid values: {0}.',
                    this.enumValues
                      .map(function (s) {
                        return JSON.stringify(s)
                      })
                      .join(', '),
                  ))
              }
            }
          }),
          (e.prototype.mergePropertyMatch = function (t) {
            this.merge(t),
              this.propertiesMatches++,
              (t.enumValueMatch || (!t.hasProblems() && t.propertiesMatches)) && this.propertiesValueMatches++,
              t.enumValueMatch && t.enumValues && t.enumValues.length === 1 && this.primaryValueMatches++
          }),
          (e.prototype.compare = function (t) {
            var r = this.hasProblems()
            return r !== t.hasProblems()
              ? r
                ? -1
                : 1
              : this.enumValueMatch !== t.enumValueMatch
                ? t.enumValueMatch
                  ? -1
                  : 1
                : this.primaryValueMatches !== t.primaryValueMatches
                  ? this.primaryValueMatches - t.primaryValueMatches
                  : this.propertiesValueMatches !== t.propertiesValueMatches
                    ? this.propertiesValueMatches - t.propertiesValueMatches
                    : this.propertiesMatches - t.propertiesMatches
          }),
          e
        )
      })()
    function Ql(e, t) {
      return t === void 0 && (t = []), new G1(e, t, [])
    }
    function bt(e) {
      return Dl(e)
    }
    function zn(e) {
      return Fl(e)
    }
    function z1(e, t, r) {
      return r === void 0 && (r = !1), (t >= e.offset && t < e.offset + e.length) || (r && t === e.offset + e.length)
    }
    var G1 = (function () {
      function e(t, r, n) {
        r === void 0 && (r = []),
          n === void 0 && (n = []),
          (this.root = t),
          (this.syntaxErrors = r),
          (this.comments = n)
      }
      return (
        (e.prototype.getNodeFromOffset = function (t, r) {
          if ((r === void 0 && (r = !1), this.root)) return Pl(this.root, t, r)
        }),
        (e.prototype.visit = function (t) {
          if (this.root) {
            var r = function (n) {
              var i = t(n),
                s = n.children
              if (Array.isArray(s)) for (var a = 0; a < s.length && i; a++) i = r(s[a])
              return i
            }
            r(this.root)
          }
        }),
        (e.prototype.validate = function (t, r, n) {
          if ((n === void 0 && (n = Ae.Warning), this.root && r)) {
            var i = new xe()
            return (
              le(this.root, r, i, Hn.instance),
              i.problems.map(function (s) {
                var a,
                  o = J.create(t.positionAt(s.location.offset), t.positionAt(s.location.offset + s.location.length))
                return Qe.create(o, s.message, (a = s.severity) !== null && a !== void 0 ? a : n, s.code)
              })
            )
          }
        }),
        (e.prototype.getMatchingSchemas = function (t, r, n) {
          r === void 0 && (r = -1)
          var i = new Jl(r, n)
          return this.root && t && le(this.root, t, new xe(), i), i.schemas
        }),
        e
      )
    })()
    function le(e, t, r, n) {
      if (!e || !n.include(e)) return
      var i = e
      switch (i.type) {
        case 'object':
          u(i, t, r, n)
          break
        case 'array':
          l(i, t, r, n)
          break
        case 'string':
          o(i, t, r, n)
          break
        case 'number':
          a(i, t, r, n)
          break
        case 'property':
          return le(i.valueNode, t, r, n)
      }
      s(), n.add({ node: i, schema: t })
      function s() {
        function c(P) {
          return i.type === P || (P === 'integer' && i.type === 'number' && i.isInteger)
        }
        if (
          (Array.isArray(t.type)
            ? t.type.some(c) ||
              r.problems.push({
                location: { offset: i.offset, length: i.length },
                message:
                  t.errorMessage ||
                  O('typeArrayMismatchWarning', 'Incorrect type. Expected one of {0}.', t.type.join(', ')),
              })
            : t.type &&
              (c(t.type) ||
                r.problems.push({
                  location: { offset: i.offset, length: i.length },
                  message: t.errorMessage || O('typeMismatchWarning', 'Incorrect type. Expected "{0}".', t.type),
                })),
          Array.isArray(t.allOf))
        )
          for (var f = 0, d = t.allOf; f < d.length; f++) {
            var g = d[f]
            le(i, _e(g), r, n)
          }
        var p = _e(t.not)
        if (p) {
          var b = new xe(),
            m = n.newSub()
          le(i, p, b, m),
            b.hasProblems() ||
              r.problems.push({
                location: { offset: i.offset, length: i.length },
                message: O('notSchemaWarning', 'Matches a schema that is not allowed.'),
              })
          for (var v = 0, _ = m.schemas; v < _.length; v++) {
            var y = _[v]
            ;(y.inverted = !y.inverted), n.add(y)
          }
        }
        var E = function (P, R) {
          for (var W = [], q = void 0, T = 0, N = P; T < N.length; T++) {
            var F = N[T],
              I = _e(F),
              B = new xe(),
              U = n.newSub()
            if ((le(i, I, B, U), B.hasProblems() || W.push(I), !q))
              q = { schema: I, validationResult: B, matchingSchemas: U }
            else if (!R && !B.hasProblems() && !q.validationResult.hasProblems())
              q.matchingSchemas.merge(U),
                (q.validationResult.propertiesMatches += B.propertiesMatches),
                (q.validationResult.propertiesValueMatches += B.propertiesValueMatches)
            else {
              var H = B.compare(q.validationResult)
              H > 0
                ? (q = { schema: I, validationResult: B, matchingSchemas: U })
                : H === 0 && (q.matchingSchemas.merge(U), q.validationResult.mergeEnumValues(B))
            }
          }
          return (
            W.length > 1 &&
              R &&
              r.problems.push({
                location: { offset: i.offset, length: 1 },
                message: O('oneOfWarning', 'Matches multiple schemas when only one must validate.'),
              }),
            q &&
              (r.merge(q.validationResult),
              (r.propertiesMatches += q.validationResult.propertiesMatches),
              (r.propertiesValueMatches += q.validationResult.propertiesValueMatches),
              n.merge(q.matchingSchemas)),
            W.length
          )
        }
        Array.isArray(t.anyOf) && E(t.anyOf, !1), Array.isArray(t.oneOf) && E(t.oneOf, !0)
        var M = function (P) {
            var R = new xe(),
              W = n.newSub()
            le(i, _e(P), R, W),
              r.merge(R),
              (r.propertiesMatches += R.propertiesMatches),
              (r.propertiesValueMatches += R.propertiesValueMatches),
              n.merge(W)
          },
          D = function (P, R, W) {
            var q = _e(P),
              T = new xe(),
              N = n.newSub()
            le(i, q, T, N), n.merge(N), T.hasProblems() ? W && M(W) : R && M(R)
          },
          C = _e(t.if)
        if ((C && D(C, _e(t.then), _e(t.else)), Array.isArray(t.enum))) {
          for (var k = bt(i), x = !1, w = 0, A = t.enum; w < A.length; w++) {
            var S = A[w]
            if (Kt(k, S)) {
              x = !0
              break
            }
          }
          ;(r.enumValues = t.enum),
            (r.enumValueMatch = x),
            x ||
              r.problems.push({
                location: { offset: i.offset, length: i.length },
                code: z.EnumValueMismatch,
                message:
                  t.errorMessage ||
                  O(
                    'enumWarning',
                    'Value is not accepted. Valid values: {0}.',
                    t.enum
                      .map(function (P) {
                        return JSON.stringify(P)
                      })
                      .join(', '),
                  ),
              })
        }
        if (Je(t.const)) {
          var k = bt(i)
          Kt(k, t.const)
            ? (r.enumValueMatch = !0)
            : (r.problems.push({
                location: { offset: i.offset, length: i.length },
                code: z.EnumValueMismatch,
                message: t.errorMessage || O('constWarning', 'Value must be {0}.', JSON.stringify(t.const)),
              }),
              (r.enumValueMatch = !1)),
            (r.enumValues = [t.const])
        }
        t.deprecationMessage &&
          i.parent &&
          r.problems.push({
            location: { offset: i.parent.offset, length: i.parent.length },
            severity: Ae.Warning,
            message: t.deprecationMessage,
            code: z.Deprecated,
          })
      }
      function a(c, f, d, g) {
        var p = c.value
        function b(w) {
          var A,
            S = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(w.toString())
          return (
            S && {
              value: Number(S[1] + (S[2] || '')),
              multiplier: (((A = S[2]) === null || A === void 0 ? void 0 : A.length) || 0) - (parseInt(S[3]) || 0),
            }
          )
        }
        if (Se(f.multipleOf)) {
          var m = -1
          if (Number.isInteger(f.multipleOf)) m = p % f.multipleOf
          else {
            var v = b(f.multipleOf),
              _ = b(p)
            if (v && _) {
              var y = Math.pow(10, Math.abs(_.multiplier - v.multiplier))
              _.multiplier < v.multiplier ? (_.value *= y) : (v.value *= y), (m = _.value % v.value)
            }
          }
          m !== 0 &&
            d.problems.push({
              location: { offset: c.offset, length: c.length },
              message: O('multipleOfWarning', 'Value is not divisible by {0}.', f.multipleOf),
            })
        }
        function E(w, A) {
          if (Se(A)) return A
          if (je(A) && A) return w
        }
        function M(w, A) {
          if (!je(A) || !A) return w
        }
        var D = E(f.minimum, f.exclusiveMinimum)
        Se(D) &&
          p <= D &&
          d.problems.push({
            location: { offset: c.offset, length: c.length },
            message: O('exclusiveMinimumWarning', 'Value is below the exclusive minimum of {0}.', D),
          })
        var C = E(f.maximum, f.exclusiveMaximum)
        Se(C) &&
          p >= C &&
          d.problems.push({
            location: { offset: c.offset, length: c.length },
            message: O('exclusiveMaximumWarning', 'Value is above the exclusive maximum of {0}.', C),
          })
        var k = M(f.minimum, f.exclusiveMinimum)
        Se(k) &&
          p < k &&
          d.problems.push({
            location: { offset: c.offset, length: c.length },
            message: O('minimumWarning', 'Value is below the minimum of {0}.', k),
          })
        var x = M(f.maximum, f.exclusiveMaximum)
        Se(x) &&
          p > x &&
          d.problems.push({
            location: { offset: c.offset, length: c.length },
            message: O('maximumWarning', 'Value is above the maximum of {0}.', x),
          })
      }
      function o(c, f, d, g) {
        if (
          (Se(f.minLength) &&
            c.value.length < f.minLength &&
            d.problems.push({
              location: { offset: c.offset, length: c.length },
              message: O('minLengthWarning', 'String is shorter than the minimum length of {0}.', f.minLength),
            }),
          Se(f.maxLength) &&
            c.value.length > f.maxLength &&
            d.problems.push({
              location: { offset: c.offset, length: c.length },
              message: O('maxLengthWarning', 'String is longer than the maximum length of {0}.', f.maxLength),
            }),
          Rl(f.pattern))
        ) {
          var p = kr(f.pattern)
          ;(p != null && p.test(c.value)) ||
            d.problems.push({
              location: { offset: c.offset, length: c.length },
              message:
                f.patternErrorMessage ||
                f.errorMessage ||
                O('patternWarning', 'String does not match the pattern of "{0}".', f.pattern),
            })
        }
        if (f.format)
          switch (f.format) {
            case 'uri':
            case 'uri-reference':
              {
                var b = void 0
                if (!c.value) b = O('uriEmpty', 'URI expected.')
                else {
                  var m = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(c.value)
                  m
                    ? !m[2] && f.format === 'uri' && (b = O('uriSchemeMissing', 'URI with a scheme is expected.'))
                    : (b = O('uriMissing', 'URI is expected.'))
                }
                b &&
                  d.problems.push({
                    location: { offset: c.offset, length: c.length },
                    message:
                      f.patternErrorMessage || f.errorMessage || O('uriFormatWarning', 'String is not a URI: {0}', b),
                  })
              }
              break
            case 'color-hex':
            case 'date-time':
            case 'date':
            case 'time':
            case 'email':
            case 'hostname':
            case 'ipv4':
            case 'ipv6':
              var v = Wl[f.format]
              ;(!c.value || !v.pattern.exec(c.value)) &&
                d.problems.push({
                  location: { offset: c.offset, length: c.length },
                  message: f.patternErrorMessage || f.errorMessage || v.errorMessage,
                })
            default:
          }
      }
      function l(c, f, d, g) {
        if (Array.isArray(f.items)) {
          for (var p = f.items, b = 0; b < p.length; b++) {
            var m = p[b],
              v = _e(m),
              _ = new xe(),
              y = c.items[b]
            y ? (le(y, v, _, g), d.mergePropertyMatch(_)) : c.items.length >= p.length && d.propertiesValueMatches++
          }
          if (c.items.length > p.length)
            if (typeof f.additionalItems == 'object')
              for (var E = p.length; E < c.items.length; E++) {
                var _ = new xe()
                le(c.items[E], f.additionalItems, _, g), d.mergePropertyMatch(_)
              }
            else
              f.additionalItems === !1 &&
                d.problems.push({
                  location: { offset: c.offset, length: c.length },
                  message: O(
                    'additionalItemsWarning',
                    'Array has too many items according to schema. Expected {0} or fewer.',
                    p.length,
                  ),
                })
        } else {
          var M = _e(f.items)
          if (M)
            for (var D = 0, C = c.items; D < C.length; D++) {
              var y = C[D],
                _ = new xe()
              le(y, M, _, g), d.mergePropertyMatch(_)
            }
        }
        var k = _e(f.contains)
        if (k) {
          var x = c.items.some(function (S) {
            var P = new xe()
            return le(S, k, P, Hn.instance), !P.hasProblems()
          })
          x ||
            d.problems.push({
              location: { offset: c.offset, length: c.length },
              message: f.errorMessage || O('requiredItemMissingWarning', 'Array does not contain required item.'),
            })
        }
        if (
          (Se(f.minItems) &&
            c.items.length < f.minItems &&
            d.problems.push({
              location: { offset: c.offset, length: c.length },
              message: O('minItemsWarning', 'Array has too few items. Expected {0} or more.', f.minItems),
            }),
          Se(f.maxItems) &&
            c.items.length > f.maxItems &&
            d.problems.push({
              location: { offset: c.offset, length: c.length },
              message: O('maxItemsWarning', 'Array has too many items. Expected {0} or fewer.', f.maxItems),
            }),
          f.uniqueItems === !0)
        ) {
          var w = bt(c),
            A = w.some(function (S, P) {
              return P !== w.lastIndexOf(S)
            })
          A &&
            d.problems.push({
              location: { offset: c.offset, length: c.length },
              message: O('uniqueItemsWarning', 'Array has duplicate items.'),
            })
        }
      }
      function u(c, f, d, g) {
        for (var p = Object.create(null), b = [], m = 0, v = c.properties; m < v.length; m++) {
          var _ = v[m],
            y = _.keyNode.value
          ;(p[y] = _.valueNode), b.push(y)
        }
        if (Array.isArray(f.required))
          for (var E = 0, M = f.required; E < M.length; E++) {
            var D = M[E]
            if (!p[D]) {
              var C = c.parent && c.parent.type === 'property' && c.parent.keyNode,
                k = C ? { offset: C.offset, length: C.length } : { offset: c.offset, length: 1 }
              d.problems.push({ location: k, message: O('MissingRequiredPropWarning', 'Missing property "{0}".', D) })
            }
          }
        var x = function (aa) {
          for (var ri = b.indexOf(aa); ri >= 0; ) b.splice(ri, 1), (ri = b.indexOf(aa))
        }
        if (f.properties)
          for (var w = 0, A = Object.keys(f.properties); w < A.length; w++) {
            var D = A[w]
            x(D)
            var S = f.properties[D],
              P = p[D]
            if (P)
              if (je(S))
                if (S) d.propertiesMatches++, d.propertiesValueMatches++
                else {
                  var _ = P.parent
                  d.problems.push({
                    location: { offset: _.keyNode.offset, length: _.keyNode.length },
                    message: f.errorMessage || O('DisallowedExtraPropWarning', 'Property {0} is not allowed.', D),
                  })
                }
              else {
                var R = new xe()
                le(P, S, R, g), d.mergePropertyMatch(R)
              }
          }
        if (f.patternProperties)
          for (var W = 0, q = Object.keys(f.patternProperties); W < q.length; W++)
            for (var T = q[W], N = kr(T), F = 0, I = b.slice(0); F < I.length; F++) {
              var D = I[F]
              if (N != null && N.test(D)) {
                x(D)
                var P = p[D]
                if (P) {
                  var S = f.patternProperties[T]
                  if (je(S))
                    if (S) d.propertiesMatches++, d.propertiesValueMatches++
                    else {
                      var _ = P.parent
                      d.problems.push({
                        location: { offset: _.keyNode.offset, length: _.keyNode.length },
                        message: f.errorMessage || O('DisallowedExtraPropWarning', 'Property {0} is not allowed.', D),
                      })
                    }
                  else {
                    var R = new xe()
                    le(P, S, R, g), d.mergePropertyMatch(R)
                  }
                }
              }
            }
        if (typeof f.additionalProperties == 'object')
          for (var B = 0, U = b; B < U.length; B++) {
            var D = U[B],
              P = p[D]
            if (P) {
              var R = new xe()
              le(P, f.additionalProperties, R, g), d.mergePropertyMatch(R)
            }
          }
        else if (f.additionalProperties === !1 && b.length > 0)
          for (var H = 0, Ee = b; H < Ee.length; H++) {
            var D = Ee[H],
              P = p[D]
            if (P) {
              var _ = P.parent
              d.problems.push({
                location: { offset: _.keyNode.offset, length: _.keyNode.length },
                message: f.errorMessage || O('DisallowedExtraPropWarning', 'Property {0} is not allowed.', D),
              })
            }
          }
        if (
          (Se(f.maxProperties) &&
            c.properties.length > f.maxProperties &&
            d.problems.push({
              location: { offset: c.offset, length: c.length },
              message: O('MaxPropWarning', 'Object has more properties than limit of {0}.', f.maxProperties),
            }),
          Se(f.minProperties) &&
            c.properties.length < f.minProperties &&
            d.problems.push({
              location: { offset: c.offset, length: c.length },
              message: O(
                'MinPropWarning',
                'Object has fewer properties than the required number of {0}',
                f.minProperties,
              ),
            }),
          f.dependencies)
        )
          for (var ce = 0, Me = Object.keys(f.dependencies); ce < Me.length; ce++) {
            var y = Me[ce],
              It = p[y]
            if (It) {
              var $e = f.dependencies[y]
              if (Array.isArray($e))
                for (var ei = 0, ra = $e; ei < ra.length; ei++) {
                  var na = ra[ei]
                  p[na]
                    ? d.propertiesValueMatches++
                    : d.problems.push({
                        location: { offset: c.offset, length: c.length },
                        message: O(
                          'RequiredDependentPropWarning',
                          'Object is missing property {0} required by property {1}.',
                          na,
                          y,
                        ),
                      })
                }
              else {
                var S = _e($e)
                if (S) {
                  var R = new xe()
                  le(c, S, R, g), d.mergePropertyMatch(R)
                }
              }
            }
          }
        var ia = _e(f.propertyNames)
        if (ia)
          for (var ti = 0, sa = c.properties; ti < sa.length; ti++) {
            var Pu = sa[ti],
              y = Pu.keyNode
            y && le(y, ia, d, Hn.instance)
          }
      }
    }
    function Xl(e, t) {
      var r = [],
        n = -1,
        i = e.getText(),
        s = Tt(i, !1),
        a = t && t.collectComments ? [] : void 0
      function o() {
        for (;;) {
          var C = s.scan()
          switch ((f(), C)) {
            case 12:
            case 13:
              Array.isArray(a) &&
                a.push(
                  J.create(e.positionAt(s.getTokenOffset()), e.positionAt(s.getTokenOffset() + s.getTokenLength())),
                )
              break
            case 15:
            case 14:
              break
            default:
              return C
          }
        }
      }
      function l(C) {
        return s.getToken() === C ? (o(), !0) : !1
      }
      function u(C, k, x, w, A) {
        if ((A === void 0 && (A = Ae.Error), r.length === 0 || x !== n)) {
          var S = J.create(e.positionAt(x), e.positionAt(w))
          r.push(Qe.create(S, C, A, k, e.languageId)), (n = x)
        }
      }
      function c(C, k, x, w, A) {
        x === void 0 && (x = void 0), w === void 0 && (w = []), A === void 0 && (A = [])
        var S = s.getTokenOffset(),
          P = s.getTokenOffset() + s.getTokenLength()
        if (S === P && S > 0) {
          for (S--; S > 0 && /\s/.test(i.charAt(S)); ) S--
          P = S + 1
        }
        if ((u(C, k, S, P), x && d(x, !1), w.length + A.length > 0))
          for (var R = s.getToken(); R !== 17; ) {
            if (w.indexOf(R) !== -1) {
              o()
              break
            } else if (A.indexOf(R) !== -1) break
            R = o()
          }
        return x
      }
      function f() {
        switch (s.getTokenError()) {
          case 4:
            return c(O('InvalidUnicode', 'Invalid unicode sequence in string.'), z.InvalidUnicode), !0
          case 5:
            return c(O('InvalidEscapeCharacter', 'Invalid escape character in string.'), z.InvalidEscapeCharacter), !0
          case 3:
            return c(O('UnexpectedEndOfNumber', 'Unexpected end of number.'), z.UnexpectedEndOfNumber), !0
          case 1:
            return c(O('UnexpectedEndOfComment', 'Unexpected end of comment.'), z.UnexpectedEndOfComment), !0
          case 2:
            return c(O('UnexpectedEndOfString', 'Unexpected end of string.'), z.UnexpectedEndOfString), !0
          case 6:
            return (
              c(
                O('InvalidCharacter', 'Invalid characters in string. Control characters must be escaped.'),
                z.InvalidCharacter,
              ),
              !0
            )
        }
        return !1
      }
      function d(C, k) {
        return (C.length = s.getTokenOffset() + s.getTokenLength() - C.offset), k && o(), C
      }
      function g(C) {
        if (s.getToken() === 3) {
          var k = new $l(C, s.getTokenOffset())
          o()
          for (var x = 0, w = !1; s.getToken() !== 4 && s.getToken() !== 17; ) {
            if (s.getToken() === 5) {
              w || c(O('ValueExpected', 'Value expected'), z.ValueExpected)
              var A = s.getTokenOffset()
              if ((o(), s.getToken() === 4)) {
                w && u(O('TrailingComma', 'Trailing comma'), z.TrailingComma, A, A + 1)
                continue
              }
            } else w && c(O('ExpectedComma', 'Expected comma'), z.CommaExpected)
            var S = E(k)
            S ? k.items.push(S) : c(O('PropertyExpected', 'Value expected'), z.ValueExpected, void 0, [], [4, 5]),
              (w = !0)
          }
          return s.getToken() !== 4
            ? c(O('ExpectedCloseBracket', 'Expected comma or closing bracket'), z.CommaOrCloseBacketExpected, k)
            : d(k, !0)
        }
      }
      var p = new $n(void 0, 0, 0)
      function b(C, k) {
        var x = new zl(C, s.getTokenOffset(), p),
          w = v(x)
        if (!w)
          if (s.getToken() === 16) {
            c(O('DoubleQuotesExpected', 'Property keys must be doublequoted'), z.Undefined)
            var A = new $n(x, s.getTokenOffset(), s.getTokenLength())
            ;(A.value = s.getTokenValue()), (w = A), o()
          } else return
        x.keyNode = w
        var S = k[w.value]
        if (
          (S
            ? (u(
                O('DuplicateKeyWarning', 'Duplicate object key'),
                z.DuplicateKey,
                x.keyNode.offset,
                x.keyNode.offset + x.keyNode.length,
                Ae.Warning,
              ),
              typeof S == 'object' &&
                u(
                  O('DuplicateKeyWarning', 'Duplicate object key'),
                  z.DuplicateKey,
                  S.keyNode.offset,
                  S.keyNode.offset + S.keyNode.length,
                  Ae.Warning,
                ),
              (k[w.value] = !0))
            : (k[w.value] = x),
          s.getToken() === 6)
        )
          (x.colonOffset = s.getTokenOffset()), o()
        else if (
          (c(O('ColonExpected', 'Colon expected'), z.ColonExpected),
          s.getToken() === 10 && e.positionAt(w.offset + w.length).line < e.positionAt(s.getTokenOffset()).line)
        )
          return (x.length = w.length), x
        var P = E(x)
        return P
          ? ((x.valueNode = P), (x.length = P.offset + P.length - x.offset), x)
          : c(O('ValueExpected', 'Value expected'), z.ValueExpected, x, [], [2, 5])
      }
      function m(C) {
        if (s.getToken() === 1) {
          var k = new Gl(C, s.getTokenOffset()),
            x = Object.create(null)
          o()
          for (var w = !1; s.getToken() !== 2 && s.getToken() !== 17; ) {
            if (s.getToken() === 5) {
              w || c(O('PropertyExpected', 'Property expected'), z.PropertyExpected)
              var A = s.getTokenOffset()
              if ((o(), s.getToken() === 2)) {
                w && u(O('TrailingComma', 'Trailing comma'), z.TrailingComma, A, A + 1)
                continue
              }
            } else w && c(O('ExpectedComma', 'Expected comma'), z.CommaExpected)
            var S = b(k, x)
            S
              ? k.properties.push(S)
              : c(O('PropertyExpected', 'Property expected'), z.PropertyExpected, void 0, [], [2, 5]),
              (w = !0)
          }
          return s.getToken() !== 2
            ? c(O('ExpectedCloseBrace', 'Expected comma or closing brace'), z.CommaOrCloseBraceExpected, k)
            : d(k, !0)
        }
      }
      function v(C) {
        if (s.getToken() === 10) {
          var k = new $n(C, s.getTokenOffset())
          return (k.value = s.getTokenValue()), d(k, !0)
        }
      }
      function _(C) {
        if (s.getToken() === 11) {
          var k = new Hl(C, s.getTokenOffset())
          if (s.getTokenError() === 0) {
            var x = s.getTokenValue()
            try {
              var w = JSON.parse(x)
              if (!Se(w)) return c(O('InvalidNumberFormat', 'Invalid number format.'), z.Undefined, k)
              k.value = w
            } catch (A) {
              return c(O('InvalidNumberFormat', 'Invalid number format.'), z.Undefined, k)
            }
            k.isInteger = x.indexOf('.') === -1
          }
          return d(k, !0)
        }
      }
      function y(C) {
        var k
        switch (s.getToken()) {
          case 7:
            return d(new ql(C, s.getTokenOffset()), !0)
          case 8:
            return d(new $1(C, !0, s.getTokenOffset()), !0)
          case 9:
            return d(new $1(C, !1, s.getTokenOffset()), !0)
          default:
            return
        }
      }
      function E(C) {
        return g(C) || m(C) || v(C) || _(C) || y(C)
      }
      var M = void 0,
        D = o()
      return (
        D !== 17 &&
          ((M = E(M)),
          M
            ? s.getToken() !== 17 && c(O('End of file expected', 'End of file expected.'), z.Undefined)
            : c(O('Invalid symbol', 'Expected a JSON object, array or literal.'), z.Undefined)),
        new G1(M, r, a)
      )
    }
    function Gn(e, t, r) {
      if (e !== null && typeof e == 'object') {
        var n = t + '	'
        if (Array.isArray(e)) {
          if (e.length === 0) return '[]'
          for (
            var i = `[
`,
              s = 0;
            s < e.length;
            s++
          )
            (i += n + Gn(e[s], n, r)),
              s < e.length - 1 && (i += ','),
              (i += `
`)
          return (i += t + ']'), i
        } else {
          var a = Object.keys(e)
          if (a.length === 0) return '{}'
          for (
            var i = `{
`,
              s = 0;
            s < a.length;
            s++
          ) {
            var o = a[s]
            ;(i += n + JSON.stringify(o) + ': ' + Gn(e[o], n, r)),
              s < a.length - 1 && (i += ','),
              (i += `
`)
          }
          return (i += t + '}'), i
        }
      }
      return r(e)
    }
    var Jn = or(),
      Zl = [',', '}', ']'],
      Yl = [':'],
      Kl = (function () {
        function e(t, r, n, i) {
          r === void 0 && (r = []),
            n === void 0 && (n = Promise),
            i === void 0 && (i = {}),
            (this.schemaService = t),
            (this.contributions = r),
            (this.promiseConstructor = n),
            (this.clientCapabilities = i)
        }
        return (
          (e.prototype.doResolve = function (t) {
            for (var r = this.contributions.length - 1; r >= 0; r--) {
              var n = this.contributions[r].resolveCompletion
              if (n) {
                var i = n(t)
                if (i) return i
              }
            }
            return this.promiseConstructor.resolve(t)
          }),
          (e.prototype.doComplete = function (t, r, n) {
            var i = this,
              s = { items: [], isIncomplete: !1 },
              a = t.getText(),
              o = t.offsetAt(r),
              l = n.getNodeFromOffset(o, !0)
            if (this.isInComment(t, l ? l.offset : 0, o)) return Promise.resolve(s)
            if (l && o === l.offset + l.length && o > 0) {
              var u = a[o - 1]
              ;((l.type === 'object' && u === '}') || (l.type === 'array' && u === ']')) && (l = l.parent)
            }
            var c = this.getCurrentWord(t, o),
              f
            if (l && (l.type === 'string' || l.type === 'number' || l.type === 'boolean' || l.type === 'null'))
              f = J.create(t.positionAt(l.offset), t.positionAt(l.offset + l.length))
            else {
              var d = o - c.length
              d > 0 && a[d - 1] === '"' && d--, (f = J.create(t.positionAt(d), r))
            }
            var g = !1,
              p = {},
              b = {
                add: function (m) {
                  var v = m.label,
                    _ = p[v]
                  if (_) _.documentation || (_.documentation = m.documentation), _.detail || (_.detail = m.detail)
                  else {
                    if (((v = v.replace(/[\n]/g, '\u21B5')), v.length > 60)) {
                      var y = v.substr(0, 57).trim() + '...'
                      p[y] || (v = y)
                    }
                    f && m.insertText !== void 0 && (m.textEdit = Oe.replace(f, m.insertText)),
                      g && (m.commitCharacters = m.kind === ye.Property ? Yl : Zl),
                      (m.label = v),
                      (p[v] = m),
                      s.items.push(m)
                  }
                },
                setAsIncomplete: function () {
                  s.isIncomplete = !0
                },
                error: function (m) {
                  console.error(m)
                },
                log: function (m) {
                  console.log(m)
                },
                getNumberOfProposals: function () {
                  return s.items.length
                },
              }
            return this.schemaService.getSchemaForResource(t.uri, n).then(function (m) {
              var v = [],
                _ = !0,
                y = '',
                E = void 0
              if (l && l.type === 'string') {
                var M = l.parent
                M &&
                  M.type === 'property' &&
                  M.keyNode === l &&
                  ((_ = !M.valueNode), (E = M), (y = a.substr(l.offset + 1, l.length - 2)), M && (l = M.parent))
              }
              if (l && l.type === 'object') {
                if (l.offset === o) return s
                var D = l.properties
                D.forEach(function (w) {
                  ;(!E || E !== w) && (p[w.keyNode.value] = jn.create('__'))
                })
                var C = ''
                _ && (C = i.evaluateSeparatorAfter(t, t.offsetAt(f.end))),
                  m ? i.getPropertyCompletions(m, n, l, _, C, b) : i.getSchemaLessPropertyCompletions(n, l, y, b)
                var k = zn(l)
                i.contributions.forEach(function (w) {
                  var A = w.collectPropertyCompletions(t.uri, k, c, _, C === '', b)
                  A && v.push(A)
                }),
                  !m &&
                    c.length > 0 &&
                    a.charAt(o - c.length - 1) !== '"' &&
                    (b.add({
                      kind: ye.Property,
                      label: i.getLabelForValue(c),
                      insertText: i.getInsertTextForProperty(c, void 0, !1, C),
                      insertTextFormat: re.Snippet,
                      documentation: '',
                    }),
                    b.setAsIncomplete())
              }
              var x = {}
              return (
                m ? i.getValueCompletions(m, n, l, o, t, b, x) : i.getSchemaLessValueCompletions(n, l, o, t, b),
                i.contributions.length > 0 && i.getContributedValueCompletions(n, l, o, t, b, v),
                i.promiseConstructor.all(v).then(function () {
                  if (b.getNumberOfProposals() === 0) {
                    var w = o
                    l &&
                      (l.type === 'string' || l.type === 'number' || l.type === 'boolean' || l.type === 'null') &&
                      (w = l.offset + l.length)
                    var A = i.evaluateSeparatorAfter(t, w)
                    i.addFillerValueCompletions(x, A, b)
                  }
                  return s
                })
              )
            })
          }),
          (e.prototype.getPropertyCompletions = function (t, r, n, i, s, a) {
            var o = this,
              l = r.getMatchingSchemas(t.schema, n.offset)
            l.forEach(function (u) {
              if (u.node === n && !u.inverted) {
                var c = u.schema.properties
                c &&
                  Object.keys(c).forEach(function (b) {
                    var m = c[b]
                    if (typeof m == 'object' && !m.deprecationMessage && !m.doNotSuggest) {
                      var v = {
                        kind: ye.Property,
                        label: b,
                        insertText: o.getInsertTextForProperty(b, m, i, s),
                        insertTextFormat: re.Snippet,
                        filterText: o.getFilterTextForValue(b),
                        documentation: o.fromMarkup(m.markdownDescription) || m.description || '',
                      }
                      m.suggestSortText !== void 0 && (v.sortText = m.suggestSortText),
                        v.insertText &&
                          er(v.insertText, '$1'.concat(s)) &&
                          (v.command = { title: 'Suggest', command: 'editor.action.triggerSuggest' }),
                        a.add(v)
                    }
                  })
                var f = u.schema.propertyNames
                if (typeof f == 'object' && !f.deprecationMessage && !f.doNotSuggest) {
                  var d = function (b, m) {
                    m === void 0 && (m = void 0)
                    var v = {
                      kind: ye.Property,
                      label: b,
                      insertText: o.getInsertTextForProperty(b, void 0, i, s),
                      insertTextFormat: re.Snippet,
                      filterText: o.getFilterTextForValue(b),
                      documentation: m || o.fromMarkup(f.markdownDescription) || f.description || '',
                    }
                    f.suggestSortText !== void 0 && (v.sortText = f.suggestSortText),
                      v.insertText &&
                        er(v.insertText, '$1'.concat(s)) &&
                        (v.command = { title: 'Suggest', command: 'editor.action.triggerSuggest' }),
                      a.add(v)
                  }
                  if (f.enum)
                    for (var g = 0; g < f.enum.length; g++) {
                      var p = void 0
                      f.markdownEnumDescriptions && g < f.markdownEnumDescriptions.length
                        ? (p = o.fromMarkup(f.markdownEnumDescriptions[g]))
                        : f.enumDescriptions && g < f.enumDescriptions.length && (p = f.enumDescriptions[g]),
                        d(f.enum[g], p)
                    }
                  f.const && d(f.const)
                }
              }
            })
          }),
          (e.prototype.getSchemaLessPropertyCompletions = function (t, r, n, i) {
            var s = this,
              a = function (l) {
                l.properties.forEach(function (u) {
                  var c = u.keyNode.value
                  i.add({
                    kind: ye.Property,
                    label: c,
                    insertText: s.getInsertTextForValue(c, ''),
                    insertTextFormat: re.Snippet,
                    filterText: s.getFilterTextForValue(c),
                    documentation: '',
                  })
                })
              }
            if (r.parent)
              if (r.parent.type === 'property') {
                var o = r.parent.keyNode.value
                t.visit(function (l) {
                  return (
                    l.type === 'property' &&
                      l !== r.parent &&
                      l.keyNode.value === o &&
                      l.valueNode &&
                      l.valueNode.type === 'object' &&
                      a(l.valueNode),
                    !0
                  )
                })
              } else
                r.parent.type === 'array' &&
                  r.parent.items.forEach(function (l) {
                    l.type === 'object' && l !== r && a(l)
                  })
            else
              r.type === 'object' &&
                i.add({
                  kind: ye.Property,
                  label: '$schema',
                  insertText: this.getInsertTextForProperty('$schema', void 0, !0, ''),
                  insertTextFormat: re.Snippet,
                  documentation: '',
                  filterText: this.getFilterTextForValue('$schema'),
                })
          }),
          (e.prototype.getSchemaLessValueCompletions = function (t, r, n, i, s) {
            var a = this,
              o = n
            if (
              (r &&
                (r.type === 'string' || r.type === 'number' || r.type === 'boolean' || r.type === 'null') &&
                ((o = r.offset + r.length), (r = r.parent)),
              !r)
            ) {
              s.add({
                kind: this.getSuggestionKind('object'),
                label: 'Empty object',
                insertText: this.getInsertTextForValue({}, ''),
                insertTextFormat: re.Snippet,
                documentation: '',
              }),
                s.add({
                  kind: this.getSuggestionKind('array'),
                  label: 'Empty array',
                  insertText: this.getInsertTextForValue([], ''),
                  insertTextFormat: re.Snippet,
                  documentation: '',
                })
              return
            }
            var l = this.evaluateSeparatorAfter(i, o),
              u = function (g) {
                g.parent &&
                  !z1(g.parent, n, !0) &&
                  s.add({
                    kind: a.getSuggestionKind(g.type),
                    label: a.getLabelTextForMatchingNode(g, i),
                    insertText: a.getInsertTextForMatchingNode(g, i, l),
                    insertTextFormat: re.Snippet,
                    documentation: '',
                  }),
                  g.type === 'boolean' && a.addBooleanValueCompletion(!g.value, l, s)
              }
            if (r.type === 'property' && n > (r.colonOffset || 0)) {
              var c = r.valueNode
              if (c && (n > c.offset + c.length || c.type === 'object' || c.type === 'array')) return
              var f = r.keyNode.value
              t.visit(function (g) {
                return g.type === 'property' && g.keyNode.value === f && g.valueNode && u(g.valueNode), !0
              }),
                f === '$schema' && r.parent && !r.parent.parent && this.addDollarSchemaCompletions(l, s)
            }
            if (r.type === 'array')
              if (r.parent && r.parent.type === 'property') {
                var d = r.parent.keyNode.value
                t.visit(function (g) {
                  return (
                    g.type === 'property' &&
                      g.keyNode.value === d &&
                      g.valueNode &&
                      g.valueNode.type === 'array' &&
                      g.valueNode.items.forEach(u),
                    !0
                  )
                })
              } else r.items.forEach(u)
          }),
          (e.prototype.getValueCompletions = function (t, r, n, i, s, a, o) {
            var l = i,
              u = void 0,
              c = void 0
            if (
              (n &&
                (n.type === 'string' || n.type === 'number' || n.type === 'boolean' || n.type === 'null') &&
                ((l = n.offset + n.length), (c = n), (n = n.parent)),
              !n)
            ) {
              this.addSchemaValueCompletions(t.schema, '', a, o)
              return
            }
            if (n.type === 'property' && i > (n.colonOffset || 0)) {
              var f = n.valueNode
              if (f && i > f.offset + f.length) return
              ;(u = n.keyNode.value), (n = n.parent)
            }
            if (n && (u !== void 0 || n.type === 'array')) {
              for (
                var d = this.evaluateSeparatorAfter(s, l),
                  g = r.getMatchingSchemas(t.schema, n.offset, c),
                  p = 0,
                  b = g;
                p < b.length;
                p++
              ) {
                var m = b[p]
                if (m.node === n && !m.inverted && m.schema) {
                  if (n.type === 'array' && m.schema.items)
                    if (Array.isArray(m.schema.items)) {
                      var v = this.findItemAtOffset(n, s, i)
                      v < m.schema.items.length && this.addSchemaValueCompletions(m.schema.items[v], d, a, o)
                    } else this.addSchemaValueCompletions(m.schema.items, d, a, o)
                  if (u !== void 0) {
                    var _ = !1
                    if (m.schema.properties) {
                      var y = m.schema.properties[u]
                      y && ((_ = !0), this.addSchemaValueCompletions(y, d, a, o))
                    }
                    if (m.schema.patternProperties && !_)
                      for (var E = 0, M = Object.keys(m.schema.patternProperties); E < M.length; E++) {
                        var D = M[E],
                          C = kr(D)
                        if (C != null && C.test(u)) {
                          _ = !0
                          var y = m.schema.patternProperties[D]
                          this.addSchemaValueCompletions(y, d, a, o)
                        }
                      }
                    if (m.schema.additionalProperties && !_) {
                      var y = m.schema.additionalProperties
                      this.addSchemaValueCompletions(y, d, a, o)
                    }
                  }
                }
              }
              u === '$schema' && !n.parent && this.addDollarSchemaCompletions(d, a),
                o.boolean && (this.addBooleanValueCompletion(!0, d, a), this.addBooleanValueCompletion(!1, d, a)),
                o.null && this.addNullValueCompletion(d, a)
            }
          }),
          (e.prototype.getContributedValueCompletions = function (t, r, n, i, s, a) {
            if (!r)
              this.contributions.forEach(function (c) {
                var f = c.collectDefaultCompletions(i.uri, s)
                f && a.push(f)
              })
            else if (
              ((r.type === 'string' || r.type === 'number' || r.type === 'boolean' || r.type === 'null') &&
                (r = r.parent),
              r && r.type === 'property' && n > (r.colonOffset || 0))
            ) {
              var o = r.keyNode.value,
                l = r.valueNode
              if ((!l || n <= l.offset + l.length) && r.parent) {
                var u = zn(r.parent)
                this.contributions.forEach(function (c) {
                  var f = c.collectValueCompletions(i.uri, u, o, s)
                  f && a.push(f)
                })
              }
            }
          }),
          (e.prototype.addSchemaValueCompletions = function (t, r, n, i) {
            var s = this
            typeof t == 'object' &&
              (this.addEnumValueCompletions(t, r, n),
              this.addDefaultValueCompletions(t, r, n),
              this.collectTypes(t, i),
              Array.isArray(t.allOf) &&
                t.allOf.forEach(function (a) {
                  return s.addSchemaValueCompletions(a, r, n, i)
                }),
              Array.isArray(t.anyOf) &&
                t.anyOf.forEach(function (a) {
                  return s.addSchemaValueCompletions(a, r, n, i)
                }),
              Array.isArray(t.oneOf) &&
                t.oneOf.forEach(function (a) {
                  return s.addSchemaValueCompletions(a, r, n, i)
                }))
          }),
          (e.prototype.addDefaultValueCompletions = function (t, r, n, i) {
            var s = this
            i === void 0 && (i = 0)
            var a = !1
            if (Je(t.default)) {
              for (var o = t.type, l = t.default, u = i; u > 0; u--) (l = [l]), (o = 'array')
              n.add({
                kind: this.getSuggestionKind(o),
                label: this.getLabelForValue(l),
                insertText: this.getInsertTextForValue(l, r),
                insertTextFormat: re.Snippet,
                detail: Jn('json.suggest.default', 'Default value'),
              }),
                (a = !0)
            }
            Array.isArray(t.examples) &&
              t.examples.forEach(function (c) {
                for (var f = t.type, d = c, g = i; g > 0; g--) (d = [d]), (f = 'array')
                n.add({
                  kind: s.getSuggestionKind(f),
                  label: s.getLabelForValue(d),
                  insertText: s.getInsertTextForValue(d, r),
                  insertTextFormat: re.Snippet,
                }),
                  (a = !0)
              }),
              Array.isArray(t.defaultSnippets) &&
                t.defaultSnippets.forEach(function (c) {
                  var f = t.type,
                    d = c.body,
                    g = c.label,
                    p,
                    b
                  if (Je(d)) {
                    for (var m = t.type, v = i; v > 0; v--) (d = [d]), (m = 'array')
                    ;(p = s.getInsertTextForSnippetValue(d, r)),
                      (b = s.getFilterTextForSnippetValue(d)),
                      (g = g || s.getLabelForSnippetValue(d))
                  } else if (typeof c.bodyText == 'string') {
                    for (var _ = '', y = '', E = '', v = i; v > 0; v--)
                      (_ =
                        _ +
                        E +
                        `[
`),
                        (y =
                          y +
                          `
` +
                          E +
                          ']'),
                        (E += '	'),
                        (f = 'array')
                    ;(p =
                      _ +
                      E +
                      c.bodyText
                        .split(
                          `
`,
                        )
                        .join(
                          `
` + E,
                        ) +
                      y +
                      r),
                      (g = g || p),
                      (b = p.replace(/[\n]/g, ''))
                  } else return
                  n.add({
                    kind: s.getSuggestionKind(f),
                    label: g,
                    documentation: s.fromMarkup(c.markdownDescription) || c.description,
                    insertText: p,
                    insertTextFormat: re.Snippet,
                    filterText: b,
                  }),
                    (a = !0)
                }),
              !a &&
                typeof t.items == 'object' &&
                !Array.isArray(t.items) &&
                i < 5 &&
                this.addDefaultValueCompletions(t.items, r, n, i + 1)
          }),
          (e.prototype.addEnumValueCompletions = function (t, r, n) {
            if (
              (Je(t.const) &&
                n.add({
                  kind: this.getSuggestionKind(t.type),
                  label: this.getLabelForValue(t.const),
                  insertText: this.getInsertTextForValue(t.const, r),
                  insertTextFormat: re.Snippet,
                  documentation: this.fromMarkup(t.markdownDescription) || t.description,
                }),
              Array.isArray(t.enum))
            )
              for (var i = 0, s = t.enum.length; i < s; i++) {
                var a = t.enum[i],
                  o = this.fromMarkup(t.markdownDescription) || t.description
                t.markdownEnumDescriptions && i < t.markdownEnumDescriptions.length && this.doesSupportMarkdown()
                  ? (o = this.fromMarkup(t.markdownEnumDescriptions[i]))
                  : t.enumDescriptions && i < t.enumDescriptions.length && (o = t.enumDescriptions[i]),
                  n.add({
                    kind: this.getSuggestionKind(t.type),
                    label: this.getLabelForValue(a),
                    insertText: this.getInsertTextForValue(a, r),
                    insertTextFormat: re.Snippet,
                    documentation: o,
                  })
              }
          }),
          (e.prototype.collectTypes = function (t, r) {
            if (!(Array.isArray(t.enum) || Je(t.const))) {
              var n = t.type
              Array.isArray(n)
                ? n.forEach(function (i) {
                    return (r[i] = !0)
                  })
                : n && (r[n] = !0)
            }
          }),
          (e.prototype.addFillerValueCompletions = function (t, r, n) {
            t.object &&
              n.add({
                kind: this.getSuggestionKind('object'),
                label: '{}',
                insertText: this.getInsertTextForGuessedValue({}, r),
                insertTextFormat: re.Snippet,
                detail: Jn('defaults.object', 'New object'),
                documentation: '',
              }),
              t.array &&
                n.add({
                  kind: this.getSuggestionKind('array'),
                  label: '[]',
                  insertText: this.getInsertTextForGuessedValue([], r),
                  insertTextFormat: re.Snippet,
                  detail: Jn('defaults.array', 'New array'),
                  documentation: '',
                })
          }),
          (e.prototype.addBooleanValueCompletion = function (t, r, n) {
            n.add({
              kind: this.getSuggestionKind('boolean'),
              label: t ? 'true' : 'false',
              insertText: this.getInsertTextForValue(t, r),
              insertTextFormat: re.Snippet,
              documentation: '',
            })
          }),
          (e.prototype.addNullValueCompletion = function (t, r) {
            r.add({
              kind: this.getSuggestionKind('null'),
              label: 'null',
              insertText: 'null' + t,
              insertTextFormat: re.Snippet,
              documentation: '',
            })
          }),
          (e.prototype.addDollarSchemaCompletions = function (t, r) {
            var n = this,
              i = this.schemaService.getRegisteredSchemaIds(function (s) {
                return s === 'http' || s === 'https'
              })
            i.forEach(function (s) {
              return r.add({
                kind: ye.Module,
                label: n.getLabelForValue(s),
                filterText: n.getFilterTextForValue(s),
                insertText: n.getInsertTextForValue(s, t),
                insertTextFormat: re.Snippet,
                documentation: '',
              })
            })
          }),
          (e.prototype.getLabelForValue = function (t) {
            return JSON.stringify(t)
          }),
          (e.prototype.getFilterTextForValue = function (t) {
            return JSON.stringify(t)
          }),
          (e.prototype.getFilterTextForSnippetValue = function (t) {
            return JSON.stringify(t).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1')
          }),
          (e.prototype.getLabelForSnippetValue = function (t) {
            var r = JSON.stringify(t)
            return r.replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1')
          }),
          (e.prototype.getInsertTextForPlainText = function (t) {
            return t.replace(/[\\\$\}]/g, '\\$&')
          }),
          (e.prototype.getInsertTextForValue = function (t, r) {
            var n = JSON.stringify(t, null, '	')
            return n === '{}' ? '{$1}' + r : n === '[]' ? '[$1]' + r : this.getInsertTextForPlainText(n + r)
          }),
          (e.prototype.getInsertTextForSnippetValue = function (t, r) {
            var n = function (i) {
              return typeof i == 'string' && i[0] === '^' ? i.substr(1) : JSON.stringify(i)
            }
            return Gn(t, '', n) + r
          }),
          (e.prototype.getInsertTextForGuessedValue = function (t, r) {
            switch (typeof t) {
              case 'object':
                return t === null ? '${1:null}' + r : this.getInsertTextForValue(t, r)
              case 'string':
                var n = JSON.stringify(t)
                return (n = n.substr(1, n.length - 2)), (n = this.getInsertTextForPlainText(n)), '"${1:' + n + '}"' + r
              case 'number':
              case 'boolean':
                return '${1:' + JSON.stringify(t) + '}' + r
            }
            return this.getInsertTextForValue(t, r)
          }),
          (e.prototype.getSuggestionKind = function (t) {
            if (Array.isArray(t)) {
              var r = t
              t = r.length > 0 ? r[0] : void 0
            }
            if (!t) return ye.Value
            switch (t) {
              case 'string':
                return ye.Value
              case 'object':
                return ye.Module
              case 'property':
                return ye.Property
              default:
                return ye.Value
            }
          }),
          (e.prototype.getLabelTextForMatchingNode = function (t, r) {
            switch (t.type) {
              case 'array':
                return '[]'
              case 'object':
                return '{}'
              default:
                var n = r.getText().substr(t.offset, t.length)
                return n
            }
          }),
          (e.prototype.getInsertTextForMatchingNode = function (t, r, n) {
            switch (t.type) {
              case 'array':
                return this.getInsertTextForValue([], n)
              case 'object':
                return this.getInsertTextForValue({}, n)
              default:
                var i = r.getText().substr(t.offset, t.length) + n
                return this.getInsertTextForPlainText(i)
            }
          }),
          (e.prototype.getInsertTextForProperty = function (t, r, n, i) {
            var s = this.getInsertTextForValue(t, '')
            if (!n) return s
            var a = s + ': ',
              o,
              l = 0
            if (r) {
              if (Array.isArray(r.defaultSnippets)) {
                if (r.defaultSnippets.length === 1) {
                  var u = r.defaultSnippets[0].body
                  Je(u) && (o = this.getInsertTextForSnippetValue(u, ''))
                }
                l += r.defaultSnippets.length
              }
              if (
                (r.enum &&
                  (!o && r.enum.length === 1 && (o = this.getInsertTextForGuessedValue(r.enum[0], '')),
                  (l += r.enum.length)),
                Je(r.default) && (o || (o = this.getInsertTextForGuessedValue(r.default, '')), l++),
                Array.isArray(r.examples) &&
                  r.examples.length &&
                  (o || (o = this.getInsertTextForGuessedValue(r.examples[0], '')), (l += r.examples.length)),
                l === 0)
              ) {
                var c = Array.isArray(r.type) ? r.type[0] : r.type
                switch ((c || (r.properties ? (c = 'object') : r.items && (c = 'array')), c)) {
                  case 'boolean':
                    o = '$1'
                    break
                  case 'string':
                    o = '"$1"'
                    break
                  case 'object':
                    o = '{$1}'
                    break
                  case 'array':
                    o = '[$1]'
                    break
                  case 'number':
                  case 'integer':
                    o = '${1:0}'
                    break
                  case 'null':
                    o = '${1:null}'
                    break
                  default:
                    return s
                }
              }
            }
            return (!o || l > 1) && (o = '$1'), a + o + i
          }),
          (e.prototype.getCurrentWord = function (t, r) {
            for (
              var n = r - 1, i = t.getText();
              n >= 0 &&
              ` 	
\r\v":{[,]}`.indexOf(i.charAt(n)) === -1;

            )
              n--
            return i.substring(n + 1, r)
          }),
          (e.prototype.evaluateSeparatorAfter = function (t, r) {
            var n = Tt(t.getText(), !0)
            n.setPosition(r)
            var i = n.scan()
            switch (i) {
              case 5:
              case 2:
              case 4:
              case 17:
                return ''
              default:
                return ','
            }
          }),
          (e.prototype.findItemAtOffset = function (t, r, n) {
            for (var i = Tt(r.getText(), !0), s = t.items, a = s.length - 1; a >= 0; a--) {
              var o = s[a]
              if (n > o.offset + o.length) {
                i.setPosition(o.offset + o.length)
                var l = i.scan()
                return l === 5 && n >= i.getTokenOffset() + i.getTokenLength() ? a + 1 : a
              } else if (n >= o.offset) return a
            }
            return 0
          }),
          (e.prototype.isInComment = function (t, r, n) {
            var i = Tt(t.getText(), !1)
            i.setPosition(r)
            for (var s = i.scan(); s !== 17 && i.getTokenOffset() + i.getTokenLength() < n; ) s = i.scan()
            return (s === 12 || s === 13) && i.getTokenOffset() <= n
          }),
          (e.prototype.fromMarkup = function (t) {
            if (t && this.doesSupportMarkdown()) return { kind: Xe.Markdown, value: t }
          }),
          (e.prototype.doesSupportMarkdown = function () {
            if (!Je(this.supportsMarkdown)) {
              var t = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion
              this.supportsMarkdown =
                t &&
                t.completionItem &&
                Array.isArray(t.completionItem.documentationFormat) &&
                t.completionItem.documentationFormat.indexOf(Xe.Markdown) !== -1
            }
            return this.supportsMarkdown
          }),
          (e.prototype.doesSupportsCommitCharacters = function () {
            if (!Je(this.supportsCommitCharacters)) {
              var t = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion
              this.supportsCommitCharacters = t && t.completionItem && !!t.completionItem.commitCharactersSupport
            }
            return this.supportsCommitCharacters
          }),
          e
        )
      })(),
      eu = (function () {
        function e(t, r, n) {
          r === void 0 && (r = []), (this.schemaService = t), (this.contributions = r), (this.promise = n || Promise)
        }
        return (
          (e.prototype.doHover = function (t, r, n) {
            var i = t.offsetAt(r),
              s = n.getNodeFromOffset(i)
            if (!s || ((s.type === 'object' || s.type === 'array') && i > s.offset + 1 && i < s.offset + s.length - 1))
              return this.promise.resolve(null)
            var a = s
            if (s.type === 'string') {
              var o = s.parent
              if (o && o.type === 'property' && o.keyNode === s && ((s = o.valueNode), !s))
                return this.promise.resolve(null)
            }
            for (
              var l = J.create(t.positionAt(a.offset), t.positionAt(a.offset + a.length)),
                u = function (p) {
                  var b = { contents: p, range: l }
                  return b
                },
                c = zn(s),
                f = this.contributions.length - 1;
              f >= 0;
              f--
            ) {
              var d = this.contributions[f],
                g = d.getInfoContribution(t.uri, c)
              if (g)
                return g.then(function (p) {
                  return u(p)
                })
            }
            return this.schemaService.getSchemaForResource(t.uri, n).then(function (p) {
              if (p && s) {
                var b = n.getMatchingSchemas(p.schema, s.offset),
                  m = void 0,
                  v = void 0,
                  _ = void 0,
                  y = void 0
                b.every(function (M) {
                  if (
                    M.node === s &&
                    !M.inverted &&
                    M.schema &&
                    ((m = m || M.schema.title),
                    (v = v || M.schema.markdownDescription || Qn(M.schema.description)),
                    M.schema.enum)
                  ) {
                    var D = M.schema.enum.indexOf(bt(s))
                    M.schema.markdownEnumDescriptions
                      ? (_ = M.schema.markdownEnumDescriptions[D])
                      : M.schema.enumDescriptions && (_ = Qn(M.schema.enumDescriptions[D])),
                      _ && ((y = M.schema.enum[D]), typeof y != 'string' && (y = JSON.stringify(y)))
                  }
                  return !0
                })
                var E = ''
                return (
                  m && (E = Qn(m)),
                  v &&
                    (E.length > 0 &&
                      (E += `

`),
                    (E += v)),
                  _ &&
                    (E.length > 0 &&
                      (E += `

`),
                    (E += '`'.concat(tu(y), '`: ').concat(_))),
                  u([E])
                )
              }
              return null
            })
          }),
          e
        )
      })()
    function Qn(e) {
      if (e) {
        var t = e.replace(
          /([^\n\r])(\r?\n)([^\n\r])/gm,
          `$1

$3`,
        )
        return t.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&')
      }
    }
    function tu(e) {
      return e.indexOf('`') !== -1 ? '`` ' + e + ' ``' : e
    }
    var ru = or(),
      nu = (function () {
        function e(t, r) {
          ;(this.jsonSchemaService = t), (this.promise = r), (this.validationEnabled = !0)
        }
        return (
          (e.prototype.configure = function (t) {
            t &&
              ((this.validationEnabled = t.validate !== !1),
              (this.commentSeverity = t.allowComments ? void 0 : Ae.Error))
          }),
          (e.prototype.doValidation = function (t, r, n, i) {
            var s = this
            if (!this.validationEnabled) return this.promise.resolve([])
            var a = [],
              o = {},
              l = function (d) {
                var g = d.range.start.line + ' ' + d.range.start.character + ' ' + d.message
                o[g] || ((o[g] = !0), a.push(d))
              },
              u = function (d) {
                var g = n != null && n.trailingCommas ? Rr(n.trailingCommas) : Ae.Error,
                  p = n != null && n.comments ? Rr(n.comments) : s.commentSeverity,
                  b = n != null && n.schemaValidation ? Rr(n.schemaValidation) : Ae.Warning,
                  m = n != null && n.schemaRequest ? Rr(n.schemaRequest) : Ae.Warning
                if (d) {
                  if (d.errors.length && r.root && m) {
                    var v = r.root,
                      _ = v.type === 'object' ? v.properties[0] : void 0
                    if (_ && _.keyNode.value === '$schema') {
                      var y = _.valueNode || _,
                        E = J.create(t.positionAt(y.offset), t.positionAt(y.offset + y.length))
                      l(Qe.create(E, d.errors[0], m, z.SchemaResolveError))
                    } else {
                      var E = J.create(t.positionAt(v.offset), t.positionAt(v.offset + 1))
                      l(Qe.create(E, d.errors[0], m, z.SchemaResolveError))
                    }
                  } else if (b) {
                    var M = r.validate(t, d.schema, b)
                    M && M.forEach(l)
                  }
                  J1(d.schema) && (p = void 0), Q1(d.schema) && (g = void 0)
                }
                for (var D = 0, C = r.syntaxErrors; D < C.length; D++) {
                  var k = C[D]
                  if (k.code === z.TrailingComma) {
                    if (typeof g != 'number') continue
                    k.severity = g
                  }
                  l(k)
                }
                if (typeof p == 'number') {
                  var x = ru('InvalidCommentToken', 'Comments are not permitted in JSON.')
                  r.comments.forEach(function (w) {
                    l(Qe.create(w, x, p, z.CommentNotPermitted))
                  })
                }
                return a
              }
            if (i) {
              var c = i.id || 'schemaservice://untitled/' + iu++,
                f = this.jsonSchemaService.registerExternalSchema(c, [], i)
              return f.getResolvedSchema().then(function (d) {
                return u(d)
              })
            }
            return this.jsonSchemaService.getSchemaForResource(t.uri, r).then(function (d) {
              return u(d)
            })
          }),
          (e.prototype.getLanguageStatus = function (t, r) {
            return { schemas: this.jsonSchemaService.getSchemaURIsForResource(t.uri, r) }
          }),
          e
        )
      })(),
      iu = 0
    function J1(e) {
      if (e && typeof e == 'object') {
        if (je(e.allowComments)) return e.allowComments
        if (e.allOf)
          for (var t = 0, r = e.allOf; t < r.length; t++) {
            var n = r[t],
              i = J1(n)
            if (je(i)) return i
          }
      }
    }
    function Q1(e) {
      if (e && typeof e == 'object') {
        if (je(e.allowTrailingCommas)) return e.allowTrailingCommas
        var t = e
        if (je(t.allowsTrailingCommas)) return t.allowsTrailingCommas
        if (e.allOf)
          for (var r = 0, n = e.allOf; r < n.length; r++) {
            var i = n[r],
              s = Q1(i)
            if (je(s)) return s
          }
      }
    }
    function Rr(e) {
      switch (e) {
        case 'error':
          return Ae.Error
        case 'warning':
          return Ae.Warning
        case 'ignore':
          return
      }
    }
    var X1 = 48,
      su = 57,
      au = 65,
      Or = 97,
      ou = 102
    function te(e) {
      return e < X1 ? 0 : e <= su ? e - X1 : (e < Or && (e += Or - au), e >= Or && e <= ou ? e - Or + 10 : 0)
    }
    function lu(e) {
      if (e[0] === '#')
        switch (e.length) {
          case 4:
            return {
              red: (te(e.charCodeAt(1)) * 17) / 255,
              green: (te(e.charCodeAt(2)) * 17) / 255,
              blue: (te(e.charCodeAt(3)) * 17) / 255,
              alpha: 1,
            }
          case 5:
            return {
              red: (te(e.charCodeAt(1)) * 17) / 255,
              green: (te(e.charCodeAt(2)) * 17) / 255,
              blue: (te(e.charCodeAt(3)) * 17) / 255,
              alpha: (te(e.charCodeAt(4)) * 17) / 255,
            }
          case 7:
            return {
              red: (te(e.charCodeAt(1)) * 16 + te(e.charCodeAt(2))) / 255,
              green: (te(e.charCodeAt(3)) * 16 + te(e.charCodeAt(4))) / 255,
              blue: (te(e.charCodeAt(5)) * 16 + te(e.charCodeAt(6))) / 255,
              alpha: 1,
            }
          case 9:
            return {
              red: (te(e.charCodeAt(1)) * 16 + te(e.charCodeAt(2))) / 255,
              green: (te(e.charCodeAt(3)) * 16 + te(e.charCodeAt(4))) / 255,
              blue: (te(e.charCodeAt(5)) * 16 + te(e.charCodeAt(6))) / 255,
              alpha: (te(e.charCodeAt(7)) * 16 + te(e.charCodeAt(8))) / 255,
            }
        }
    }
    var uu = (function () {
      function e(t) {
        this.schemaService = t
      }
      return (
        (e.prototype.findDocumentSymbols = function (t, r, n) {
          var i = this
          n === void 0 && (n = { resultLimit: Number.MAX_VALUE })
          var s = r.root
          if (!s) return []
          var a = n.resultLimit || Number.MAX_VALUE,
            o = t.uri
          if (
            (o === 'vscode://defaultsettings/keybindings.json' || er(o.toLowerCase(), '/user/keybindings.json')) &&
            s.type === 'array'
          ) {
            for (var l = [], u = 0, c = s.items; u < c.length; u++) {
              var f = c[u]
              if (f.type === 'object')
                for (var d = 0, g = f.properties; d < g.length; d++) {
                  var p = g[d]
                  if (p.keyNode.value === 'key' && p.valueNode) {
                    var b = tr.create(t.uri, ct(t, f))
                    if ((l.push({ name: bt(p.valueNode), kind: We.Function, location: b }), a--, a <= 0))
                      return n && n.onResultLimitExceeded && n.onResultLimitExceeded(o), l
                  }
                }
            }
            return l
          }
          for (
            var m = [{ node: s, containerName: '' }],
              v = 0,
              _ = !1,
              y = [],
              E = function (D, C) {
                D.type === 'array'
                  ? D.items.forEach(function (k) {
                      k && m.push({ node: k, containerName: C })
                    })
                  : D.type === 'object' &&
                    D.properties.forEach(function (k) {
                      var x = k.valueNode
                      if (x)
                        if (a > 0) {
                          a--
                          var w = tr.create(t.uri, ct(t, k)),
                            A = C ? C + '.' + k.keyNode.value : k.keyNode.value
                          y.push({
                            name: i.getKeyLabel(k),
                            kind: i.getSymbolKind(x.type),
                            location: w,
                            containerName: C,
                          }),
                            m.push({ node: x, containerName: A })
                        } else _ = !0
                    })
              };
            v < m.length;

          ) {
            var M = m[v++]
            E(M.node, M.containerName)
          }
          return _ && n && n.onResultLimitExceeded && n.onResultLimitExceeded(o), y
        }),
        (e.prototype.findDocumentSymbols2 = function (t, r, n) {
          var i = this
          n === void 0 && (n = { resultLimit: Number.MAX_VALUE })
          var s = r.root
          if (!s) return []
          var a = n.resultLimit || Number.MAX_VALUE,
            o = t.uri
          if (
            (o === 'vscode://defaultsettings/keybindings.json' || er(o.toLowerCase(), '/user/keybindings.json')) &&
            s.type === 'array'
          ) {
            for (var l = [], u = 0, c = s.items; u < c.length; u++) {
              var f = c[u]
              if (f.type === 'object')
                for (var d = 0, g = f.properties; d < g.length; d++) {
                  var p = g[d]
                  if (p.keyNode.value === 'key' && p.valueNode) {
                    var b = ct(t, f),
                      m = ct(t, p.keyNode)
                    if (
                      (l.push({ name: bt(p.valueNode), kind: We.Function, range: b, selectionRange: m }), a--, a <= 0)
                    )
                      return n && n.onResultLimitExceeded && n.onResultLimitExceeded(o), l
                  }
                }
            }
            return l
          }
          for (
            var v = [],
              _ = [{ node: s, result: v }],
              y = 0,
              E = !1,
              M = function (C, k) {
                C.type === 'array'
                  ? C.items.forEach(function (x, w) {
                      if (x)
                        if (a > 0) {
                          a--
                          var A = ct(t, x),
                            S = A,
                            P = String(w),
                            R = { name: P, kind: i.getSymbolKind(x.type), range: A, selectionRange: S, children: [] }
                          k.push(R), _.push({ result: R.children, node: x })
                        } else E = !0
                    })
                  : C.type === 'object' &&
                    C.properties.forEach(function (x) {
                      var w = x.valueNode
                      if (w)
                        if (a > 0) {
                          a--
                          var A = ct(t, x),
                            S = ct(t, x.keyNode),
                            P = [],
                            R = {
                              name: i.getKeyLabel(x),
                              kind: i.getSymbolKind(w.type),
                              range: A,
                              selectionRange: S,
                              children: P,
                              detail: i.getDetail(w),
                            }
                          k.push(R), _.push({ result: P, node: w })
                        } else E = !0
                    })
              };
            y < _.length;

          ) {
            var D = _[y++]
            M(D.node, D.result)
          }
          return E && n && n.onResultLimitExceeded && n.onResultLimitExceeded(o), v
        }),
        (e.prototype.getSymbolKind = function (t) {
          switch (t) {
            case 'object':
              return We.Module
            case 'string':
              return We.String
            case 'number':
              return We.Number
            case 'array':
              return We.Array
            case 'boolean':
              return We.Boolean
            default:
              return We.Variable
          }
        }),
        (e.prototype.getKeyLabel = function (t) {
          var r = t.keyNode.value
          return r && (r = r.replace(/[\n]/g, '\u21B5')), r && r.trim() ? r : '"'.concat(r, '"')
        }),
        (e.prototype.getDetail = function (t) {
          if (t) {
            if (t.type === 'boolean' || t.type === 'number' || t.type === 'null' || t.type === 'string')
              return String(t.value)
            if (t.type === 'array') return t.children.length ? void 0 : '[]'
            if (t.type === 'object') return t.children.length ? void 0 : '{}'
          }
        }),
        (e.prototype.findDocumentColors = function (t, r, n) {
          return this.schemaService.getSchemaForResource(t.uri, r).then(function (i) {
            var s = []
            if (i)
              for (
                var a = n && typeof n.resultLimit == 'number' ? n.resultLimit : Number.MAX_VALUE,
                  o = r.getMatchingSchemas(i.schema),
                  l = {},
                  u = 0,
                  c = o;
                u < c.length;
                u++
              ) {
                var f = c[u]
                if (
                  !f.inverted &&
                  f.schema &&
                  (f.schema.format === 'color' || f.schema.format === 'color-hex') &&
                  f.node &&
                  f.node.type === 'string'
                ) {
                  var d = String(f.node.offset)
                  if (!l[d]) {
                    var g = lu(bt(f.node))
                    if (g) {
                      var p = ct(t, f.node)
                      s.push({ color: g, range: p })
                    }
                    if (((l[d] = !0), a--, a <= 0))
                      return n && n.onResultLimitExceeded && n.onResultLimitExceeded(t.uri), s
                  }
                }
              }
            return s
          })
        }),
        (e.prototype.getColorPresentations = function (t, r, n, i) {
          var s = [],
            a = Math.round(n.red * 255),
            o = Math.round(n.green * 255),
            l = Math.round(n.blue * 255)
          function u(f) {
            var d = f.toString(16)
            return d.length !== 2 ? '0' + d : d
          }
          var c
          return (
            n.alpha === 1
              ? (c = '#'.concat(u(a)).concat(u(o)).concat(u(l)))
              : (c = '#'
                  .concat(u(a))
                  .concat(u(o))
                  .concat(u(l))
                  .concat(u(Math.round(n.alpha * 255)))),
            s.push({ label: c, textEdit: Oe.replace(i, JSON.stringify(c)) }),
            s
          )
        }),
        e
      )
    })()
    function ct(e, t) {
      return J.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length))
    }
    var j = or(),
      Xn = {
        schemaAssociations: [],
        schemas: {
          'http://json-schema.org/schema#': { $ref: 'http://json-schema.org/draft-07/schema#' },
          'http://json-schema.org/draft-04/schema#': {
            $schema: 'http://json-schema.org/draft-04/schema#',
            definitions: {
              schemaArray: { type: 'array', minItems: 1, items: { $ref: '#' } },
              positiveInteger: { type: 'integer', minimum: 0 },
              positiveIntegerDefault0: { allOf: [{ $ref: '#/definitions/positiveInteger' }, { default: 0 }] },
              simpleTypes: {
                type: 'string',
                enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'],
              },
              stringArray: { type: 'array', items: { type: 'string' }, minItems: 1, uniqueItems: !0 },
            },
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uri' },
              $schema: { type: 'string', format: 'uri' },
              title: { type: 'string' },
              description: { type: 'string' },
              default: {},
              multipleOf: { type: 'number', minimum: 0, exclusiveMinimum: !0 },
              maximum: { type: 'number' },
              exclusiveMaximum: { type: 'boolean', default: !1 },
              minimum: { type: 'number' },
              exclusiveMinimum: { type: 'boolean', default: !1 },
              maxLength: { allOf: [{ $ref: '#/definitions/positiveInteger' }] },
              minLength: { allOf: [{ $ref: '#/definitions/positiveIntegerDefault0' }] },
              pattern: { type: 'string', format: 'regex' },
              additionalItems: { anyOf: [{ type: 'boolean' }, { $ref: '#' }], default: {} },
              items: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/schemaArray' }], default: {} },
              maxItems: { allOf: [{ $ref: '#/definitions/positiveInteger' }] },
              minItems: { allOf: [{ $ref: '#/definitions/positiveIntegerDefault0' }] },
              uniqueItems: { type: 'boolean', default: !1 },
              maxProperties: { allOf: [{ $ref: '#/definitions/positiveInteger' }] },
              minProperties: { allOf: [{ $ref: '#/definitions/positiveIntegerDefault0' }] },
              required: { allOf: [{ $ref: '#/definitions/stringArray' }] },
              additionalProperties: { anyOf: [{ type: 'boolean' }, { $ref: '#' }], default: {} },
              definitions: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
              properties: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
              patternProperties: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
              dependencies: {
                type: 'object',
                additionalProperties: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/stringArray' }] },
              },
              enum: { type: 'array', minItems: 1, uniqueItems: !0 },
              type: {
                anyOf: [
                  { $ref: '#/definitions/simpleTypes' },
                  { type: 'array', items: { $ref: '#/definitions/simpleTypes' }, minItems: 1, uniqueItems: !0 },
                ],
              },
              format: {
                anyOf: [
                  { type: 'string', enum: ['date-time', 'uri', 'email', 'hostname', 'ipv4', 'ipv6', 'regex'] },
                  { type: 'string' },
                ],
              },
              allOf: { allOf: [{ $ref: '#/definitions/schemaArray' }] },
              anyOf: { allOf: [{ $ref: '#/definitions/schemaArray' }] },
              oneOf: { allOf: [{ $ref: '#/definitions/schemaArray' }] },
              not: { allOf: [{ $ref: '#' }] },
            },
            dependencies: { exclusiveMaximum: ['maximum'], exclusiveMinimum: ['minimum'] },
            default: {},
          },
          'http://json-schema.org/draft-07/schema#': {
            definitions: {
              schemaArray: { type: 'array', minItems: 1, items: { $ref: '#' } },
              nonNegativeInteger: { type: 'integer', minimum: 0 },
              nonNegativeIntegerDefault0: { allOf: [{ $ref: '#/definitions/nonNegativeInteger' }, { default: 0 }] },
              simpleTypes: { enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'] },
              stringArray: { type: 'array', items: { type: 'string' }, uniqueItems: !0, default: [] },
            },
            type: ['object', 'boolean'],
            properties: {
              $id: { type: 'string', format: 'uri-reference' },
              $schema: { type: 'string', format: 'uri' },
              $ref: { type: 'string', format: 'uri-reference' },
              $comment: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              default: !0,
              readOnly: { type: 'boolean', default: !1 },
              examples: { type: 'array', items: !0 },
              multipleOf: { type: 'number', exclusiveMinimum: 0 },
              maximum: { type: 'number' },
              exclusiveMaximum: { type: 'number' },
              minimum: { type: 'number' },
              exclusiveMinimum: { type: 'number' },
              maxLength: { $ref: '#/definitions/nonNegativeInteger' },
              minLength: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
              pattern: { type: 'string', format: 'regex' },
              additionalItems: { $ref: '#' },
              items: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/schemaArray' }], default: !0 },
              maxItems: { $ref: '#/definitions/nonNegativeInteger' },
              minItems: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
              uniqueItems: { type: 'boolean', default: !1 },
              contains: { $ref: '#' },
              maxProperties: { $ref: '#/definitions/nonNegativeInteger' },
              minProperties: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
              required: { $ref: '#/definitions/stringArray' },
              additionalProperties: { $ref: '#' },
              definitions: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
              properties: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
              patternProperties: {
                type: 'object',
                additionalProperties: { $ref: '#' },
                propertyNames: { format: 'regex' },
                default: {},
              },
              dependencies: {
                type: 'object',
                additionalProperties: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/stringArray' }] },
              },
              propertyNames: { $ref: '#' },
              const: !0,
              enum: { type: 'array', items: !0, minItems: 1, uniqueItems: !0 },
              type: {
                anyOf: [
                  { $ref: '#/definitions/simpleTypes' },
                  { type: 'array', items: { $ref: '#/definitions/simpleTypes' }, minItems: 1, uniqueItems: !0 },
                ],
              },
              format: { type: 'string' },
              contentMediaType: { type: 'string' },
              contentEncoding: { type: 'string' },
              if: { $ref: '#' },
              then: { $ref: '#' },
              else: { $ref: '#' },
              allOf: { $ref: '#/definitions/schemaArray' },
              anyOf: { $ref: '#/definitions/schemaArray' },
              oneOf: { $ref: '#/definitions/schemaArray' },
              not: { $ref: '#' },
            },
            default: !0,
          },
        },
      },
      cu = {
        id: j('schema.json.id', 'A unique identifier for the schema.'),
        $schema: j('schema.json.$schema', 'The schema to verify this document against.'),
        title: j('schema.json.title', 'A descriptive title of the element.'),
        description: j(
          'schema.json.description',
          'A long description of the element. Used in hover menus and suggestions.',
        ),
        default: j('schema.json.default', 'A default value. Used by suggestions.'),
        multipleOf: j(
          'schema.json.multipleOf',
          'A number that should cleanly divide the current value (i.e. have no remainder).',
        ),
        maximum: j('schema.json.maximum', 'The maximum numerical value, inclusive by default.'),
        exclusiveMaximum: j('schema.json.exclusiveMaximum', 'Makes the maximum property exclusive.'),
        minimum: j('schema.json.minimum', 'The minimum numerical value, inclusive by default.'),
        exclusiveMinimum: j('schema.json.exclusiveMininum', 'Makes the minimum property exclusive.'),
        maxLength: j('schema.json.maxLength', 'The maximum length of a string.'),
        minLength: j('schema.json.minLength', 'The minimum length of a string.'),
        pattern: j(
          'schema.json.pattern',
          'A regular expression to match the string against. It is not implicitly anchored.',
        ),
        additionalItems: j(
          'schema.json.additionalItems',
          'For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail.',
        ),
        items: j(
          'schema.json.items',
          'For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on.',
        ),
        maxItems: j('schema.json.maxItems', 'The maximum number of items that can be inside an array. Inclusive.'),
        minItems: j('schema.json.minItems', 'The minimum number of items that can be inside an array. Inclusive.'),
        uniqueItems: j(
          'schema.json.uniqueItems',
          'If all of the items in the array must be unique. Defaults to false.',
        ),
        maxProperties: j(
          'schema.json.maxProperties',
          'The maximum number of properties an object can have. Inclusive.',
        ),
        minProperties: j(
          'schema.json.minProperties',
          'The minimum number of properties an object can have. Inclusive.',
        ),
        required: j(
          'schema.json.required',
          'An array of strings that lists the names of all properties required on this object.',
        ),
        additionalProperties: j(
          'schema.json.additionalProperties',
          "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail.",
        ),
        definitions: j(
          'schema.json.definitions',
          'Not used for validation. Place subschemas here that you wish to reference inline with $ref.',
        ),
        properties: j('schema.json.properties', 'A map of property names to schemas for each property.'),
        patternProperties: j(
          'schema.json.patternProperties',
          'A map of regular expressions on property names to schemas for matching properties.',
        ),
        dependencies: j(
          'schema.json.dependencies',
          'A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object.',
        ),
        enum: j('schema.json.enum', 'The set of literal values that are valid.'),
        type: j(
          'schema.json.type',
          'Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types.',
        ),
        format: j('schema.json.format', 'Describes the format expected for the value.'),
        allOf: j('schema.json.allOf', 'An array of schemas, all of which must match.'),
        anyOf: j('schema.json.anyOf', 'An array of schemas, where at least one must match.'),
        oneOf: j('schema.json.oneOf', 'An array of schemas, exactly one of which must match.'),
        not: j('schema.json.not', 'A schema which must not match.'),
        $id: j('schema.json.$id', 'A unique identifier for the schema.'),
        $ref: j('schema.json.$ref', 'Reference a definition hosted on any location.'),
        $comment: j('schema.json.$comment', 'Comments from schema authors to readers or maintainers of the schema.'),
        readOnly: j(
          'schema.json.readOnly',
          'Indicates that the value of the instance is managed exclusively by the owning authority.',
        ),
        examples: j(
          'schema.json.examples',
          'Sample JSON values associated with a particular schema, for the purpose of illustrating usage.',
        ),
        contains: j(
          'schema.json.contains',
          'An array instance is valid against "contains" if at least one of its elements is valid against the given schema.',
        ),
        propertyNames: j(
          'schema.json.propertyNames',
          'If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema.',
        ),
        const: j(
          'schema.json.const',
          'An instance validates successfully against this keyword if its value is equal to the value of the keyword.',
        ),
        contentMediaType: j('schema.json.contentMediaType', 'Describes the media type of a string property.'),
        contentEncoding: j('schema.json.contentEncoding', 'Describes the content encoding of a string property.'),
        if: j(
          'schema.json.if',
          'The validation outcome of the "if" subschema controls which of the "then" or "else" keywords are evaluated.',
        ),
        then: j('schema.json.then', 'The "if" subschema is used for validation when the "if" subschema succeeds.'),
        else: j('schema.json.else', 'The "else" subschema is used for validation when the "if" subschema fails.'),
      }
    for (Z1 in Xn.schemas) {
      Vr = Xn.schemas[Z1]
      for (Ft in Vr.properties)
        (Br = Vr.properties[Ft]),
          typeof Br == 'boolean' && (Br = Vr.properties[Ft] = {}),
          (Zn = cu[Ft]),
          Zn ? (Br.description = Zn) : console.log(''.concat(Ft, ": localize('schema.json.").concat(Ft, `', "")`))
    }
    var Vr, Br, Zn, Ft, Z1, Y1
    Y1 = (() => {
      'use strict'
      var e = {
          470: (n) => {
            function i(o) {
              if (typeof o != 'string') throw new TypeError('Path must be a string. Received ' + JSON.stringify(o))
            }
            function s(o, l) {
              for (var u, c = '', f = 0, d = -1, g = 0, p = 0; p <= o.length; ++p) {
                if (p < o.length) u = o.charCodeAt(p)
                else {
                  if (u === 47) break
                  u = 47
                }
                if (u === 47) {
                  if (!(d === p - 1 || g === 1))
                    if (d !== p - 1 && g === 2) {
                      if (
                        c.length < 2 ||
                        f !== 2 ||
                        c.charCodeAt(c.length - 1) !== 46 ||
                        c.charCodeAt(c.length - 2) !== 46
                      ) {
                        if (c.length > 2) {
                          var b = c.lastIndexOf('/')
                          if (b !== c.length - 1) {
                            b === -1 ? ((c = ''), (f = 0)) : (f = (c = c.slice(0, b)).length - 1 - c.lastIndexOf('/')),
                              (d = p),
                              (g = 0)
                            continue
                          }
                        } else if (c.length === 2 || c.length === 1) {
                          ;(c = ''), (f = 0), (d = p), (g = 0)
                          continue
                        }
                      }
                      l && (c.length > 0 ? (c += '/..') : (c = '..'), (f = 2))
                    } else c.length > 0 ? (c += '/' + o.slice(d + 1, p)) : (c = o.slice(d + 1, p)), (f = p - d - 1)
                  ;(d = p), (g = 0)
                } else u === 46 && g !== -1 ? ++g : (g = -1)
              }
              return c
            }
            var a = {
              resolve: function () {
                for (var o, l = '', u = !1, c = arguments.length - 1; c >= -1 && !u; c--) {
                  var f
                  c >= 0 ? (f = arguments[c]) : (o === void 0 && (o = Pn.cwd()), (f = o)),
                    i(f),
                    f.length !== 0 && ((l = f + '/' + l), (u = f.charCodeAt(0) === 47))
                }
                return (l = s(l, !u)), u ? (l.length > 0 ? '/' + l : '/') : l.length > 0 ? l : '.'
              },
              normalize: function (o) {
                if ((i(o), o.length === 0)) return '.'
                var l = o.charCodeAt(0) === 47,
                  u = o.charCodeAt(o.length - 1) === 47
                return (o = s(o, !l)).length !== 0 || l || (o = '.'), o.length > 0 && u && (o += '/'), l ? '/' + o : o
              },
              isAbsolute: function (o) {
                return i(o), o.length > 0 && o.charCodeAt(0) === 47
              },
              join: function () {
                if (arguments.length === 0) return '.'
                for (var o, l = 0; l < arguments.length; ++l) {
                  var u = arguments[l]
                  i(u), u.length > 0 && (o === void 0 ? (o = u) : (o += '/' + u))
                }
                return o === void 0 ? '.' : a.normalize(o)
              },
              relative: function (o, l) {
                if ((i(o), i(l), o === l || (o = a.resolve(o)) === (l = a.resolve(l)))) return ''
                for (var u = 1; u < o.length && o.charCodeAt(u) === 47; ++u);
                for (var c = o.length, f = c - u, d = 1; d < l.length && l.charCodeAt(d) === 47; ++d);
                for (var g = l.length - d, p = f < g ? f : g, b = -1, m = 0; m <= p; ++m) {
                  if (m === p) {
                    if (g > p) {
                      if (l.charCodeAt(d + m) === 47) return l.slice(d + m + 1)
                      if (m === 0) return l.slice(d + m)
                    } else f > p && (o.charCodeAt(u + m) === 47 ? (b = m) : m === 0 && (b = 0))
                    break
                  }
                  var v = o.charCodeAt(u + m)
                  if (v !== l.charCodeAt(d + m)) break
                  v === 47 && (b = m)
                }
                var _ = ''
                for (m = u + b + 1; m <= c; ++m)
                  (m !== c && o.charCodeAt(m) !== 47) || (_.length === 0 ? (_ += '..') : (_ += '/..'))
                return _.length > 0 ? _ + l.slice(d + b) : ((d += b), l.charCodeAt(d) === 47 && ++d, l.slice(d))
              },
              _makeLong: function (o) {
                return o
              },
              dirname: function (o) {
                if ((i(o), o.length === 0)) return '.'
                for (var l = o.charCodeAt(0), u = l === 47, c = -1, f = !0, d = o.length - 1; d >= 1; --d)
                  if ((l = o.charCodeAt(d)) === 47) {
                    if (!f) {
                      c = d
                      break
                    }
                  } else f = !1
                return c === -1 ? (u ? '/' : '.') : u && c === 1 ? '//' : o.slice(0, c)
              },
              basename: function (o, l) {
                if (l !== void 0 && typeof l != 'string') throw new TypeError('"ext" argument must be a string')
                i(o)
                var u,
                  c = 0,
                  f = -1,
                  d = !0
                if (l !== void 0 && l.length > 0 && l.length <= o.length) {
                  if (l.length === o.length && l === o) return ''
                  var g = l.length - 1,
                    p = -1
                  for (u = o.length - 1; u >= 0; --u) {
                    var b = o.charCodeAt(u)
                    if (b === 47) {
                      if (!d) {
                        c = u + 1
                        break
                      }
                    } else
                      p === -1 && ((d = !1), (p = u + 1)),
                        g >= 0 && (b === l.charCodeAt(g) ? --g == -1 && (f = u) : ((g = -1), (f = p)))
                  }
                  return c === f ? (f = p) : f === -1 && (f = o.length), o.slice(c, f)
                }
                for (u = o.length - 1; u >= 0; --u)
                  if (o.charCodeAt(u) === 47) {
                    if (!d) {
                      c = u + 1
                      break
                    }
                  } else f === -1 && ((d = !1), (f = u + 1))
                return f === -1 ? '' : o.slice(c, f)
              },
              extname: function (o) {
                i(o)
                for (var l = -1, u = 0, c = -1, f = !0, d = 0, g = o.length - 1; g >= 0; --g) {
                  var p = o.charCodeAt(g)
                  if (p !== 47)
                    c === -1 && ((f = !1), (c = g + 1)),
                      p === 46 ? (l === -1 ? (l = g) : d !== 1 && (d = 1)) : l !== -1 && (d = -1)
                  else if (!f) {
                    u = g + 1
                    break
                  }
                }
                return l === -1 || c === -1 || d === 0 || (d === 1 && l === c - 1 && l === u + 1) ? '' : o.slice(l, c)
              },
              format: function (o) {
                if (o === null || typeof o != 'object')
                  throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof o)
                return (function (l, u) {
                  var c = u.dir || u.root,
                    f = u.base || (u.name || '') + (u.ext || '')
                  return c ? (c === u.root ? c + f : c + '/' + f) : f
                })(0, o)
              },
              parse: function (o) {
                i(o)
                var l = { root: '', dir: '', base: '', ext: '', name: '' }
                if (o.length === 0) return l
                var u,
                  c = o.charCodeAt(0),
                  f = c === 47
                f ? ((l.root = '/'), (u = 1)) : (u = 0)
                for (var d = -1, g = 0, p = -1, b = !0, m = o.length - 1, v = 0; m >= u; --m)
                  if ((c = o.charCodeAt(m)) !== 47)
                    p === -1 && ((b = !1), (p = m + 1)),
                      c === 46 ? (d === -1 ? (d = m) : v !== 1 && (v = 1)) : d !== -1 && (v = -1)
                  else if (!b) {
                    g = m + 1
                    break
                  }
                return (
                  d === -1 || p === -1 || v === 0 || (v === 1 && d === p - 1 && d === g + 1)
                    ? p !== -1 && (l.base = l.name = g === 0 && f ? o.slice(1, p) : o.slice(g, p))
                    : (g === 0 && f
                        ? ((l.name = o.slice(1, d)), (l.base = o.slice(1, p)))
                        : ((l.name = o.slice(g, d)), (l.base = o.slice(g, p))),
                      (l.ext = o.slice(d, p))),
                  g > 0 ? (l.dir = o.slice(0, g - 1)) : f && (l.dir = '/'),
                  l
                )
              },
              sep: '/',
              delimiter: ':',
              win32: null,
              posix: null,
            }
            ;(a.posix = a), (n.exports = a)
          },
          447: (n, i, s) => {
            var a
            if ((s.r(i), s.d(i, { URI: () => _, Utils: () => P }), typeof Pn == 'object')) a = Pn.platform === 'win32'
            else if (typeof navigator == 'object') {
              var o = navigator.userAgent
              a = o.indexOf('Windows') >= 0
            }
            var l,
              u,
              c =
                ((l = function (T, N) {
                  return (l =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (F, I) {
                        F.__proto__ = I
                      }) ||
                    function (F, I) {
                      for (var B in I) Object.prototype.hasOwnProperty.call(I, B) && (F[B] = I[B])
                    })(T, N)
                }),
                function (T, N) {
                  if (typeof N != 'function' && N !== null)
                    throw new TypeError('Class extends value ' + String(N) + ' is not a constructor or null')
                  function F() {
                    this.constructor = T
                  }
                  l(T, N), (T.prototype = N === null ? Object.create(N) : ((F.prototype = N.prototype), new F()))
                }),
              f = /^\w[\w\d+.-]*$/,
              d = /^\//,
              g = /^\/\//
            function p(T, N) {
              if (!T.scheme && N)
                throw new Error(
                  '[UriError]: Scheme is missing: {scheme: "", authority: "'
                    .concat(T.authority, '", path: "')
                    .concat(T.path, '", query: "')
                    .concat(T.query, '", fragment: "')
                    .concat(T.fragment, '"}'),
                )
              if (T.scheme && !f.test(T.scheme)) throw new Error('[UriError]: Scheme contains illegal characters.')
              if (T.path) {
                if (T.authority) {
                  if (!d.test(T.path))
                    throw new Error(
                      '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character',
                    )
                } else if (g.test(T.path))
                  throw new Error(
                    '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")',
                  )
              }
            }
            var b = '',
              m = '/',
              v = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
              _ = (function () {
                function T(N, F, I, B, U, H) {
                  H === void 0 && (H = !1),
                    typeof N == 'object'
                      ? ((this.scheme = N.scheme || b),
                        (this.authority = N.authority || b),
                        (this.path = N.path || b),
                        (this.query = N.query || b),
                        (this.fragment = N.fragment || b))
                      : ((this.scheme = (function (Ee, ce) {
                          return Ee || ce ? Ee : 'file'
                        })(N, H)),
                        (this.authority = F || b),
                        (this.path = (function (Ee, ce) {
                          switch (Ee) {
                            case 'https':
                            case 'http':
                            case 'file':
                              ce ? ce[0] !== m && (ce = m + ce) : (ce = m)
                          }
                          return ce
                        })(this.scheme, I || b)),
                        (this.query = B || b),
                        (this.fragment = U || b),
                        p(this, H))
                }
                return (
                  (T.isUri = function (N) {
                    return (
                      N instanceof T ||
                      (!!N &&
                        typeof N.authority == 'string' &&
                        typeof N.fragment == 'string' &&
                        typeof N.path == 'string' &&
                        typeof N.query == 'string' &&
                        typeof N.scheme == 'string' &&
                        typeof N.fsPath == 'string' &&
                        typeof N.with == 'function' &&
                        typeof N.toString == 'function')
                    )
                  }),
                  Object.defineProperty(T.prototype, 'fsPath', {
                    get: function () {
                      return k(this, !1)
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (T.prototype.with = function (N) {
                    if (!N) return this
                    var F = N.scheme,
                      I = N.authority,
                      B = N.path,
                      U = N.query,
                      H = N.fragment
                    return (
                      F === void 0 ? (F = this.scheme) : F === null && (F = b),
                      I === void 0 ? (I = this.authority) : I === null && (I = b),
                      B === void 0 ? (B = this.path) : B === null && (B = b),
                      U === void 0 ? (U = this.query) : U === null && (U = b),
                      H === void 0 ? (H = this.fragment) : H === null && (H = b),
                      F === this.scheme &&
                      I === this.authority &&
                      B === this.path &&
                      U === this.query &&
                      H === this.fragment
                        ? this
                        : new E(F, I, B, U, H)
                    )
                  }),
                  (T.parse = function (N, F) {
                    F === void 0 && (F = !1)
                    var I = v.exec(N)
                    return I
                      ? new E(I[2] || b, S(I[4] || b), S(I[5] || b), S(I[7] || b), S(I[9] || b), F)
                      : new E(b, b, b, b, b)
                  }),
                  (T.file = function (N) {
                    var F = b
                    if ((a && (N = N.replace(/\\/g, m)), N[0] === m && N[1] === m)) {
                      var I = N.indexOf(m, 2)
                      I === -1 ? ((F = N.substring(2)), (N = m)) : ((F = N.substring(2, I)), (N = N.substring(I) || m))
                    }
                    return new E('file', F, N, b, b)
                  }),
                  (T.from = function (N) {
                    var F = new E(N.scheme, N.authority, N.path, N.query, N.fragment)
                    return p(F, !0), F
                  }),
                  (T.prototype.toString = function (N) {
                    return N === void 0 && (N = !1), x(this, N)
                  }),
                  (T.prototype.toJSON = function () {
                    return this
                  }),
                  (T.revive = function (N) {
                    if (N) {
                      if (N instanceof T) return N
                      var F = new E(N)
                      return (F._formatted = N.external), (F._fsPath = N._sep === y ? N.fsPath : null), F
                    }
                    return N
                  }),
                  T
                )
              })(),
              y = a ? 1 : void 0,
              E = (function (T) {
                function N() {
                  var F = (T !== null && T.apply(this, arguments)) || this
                  return (F._formatted = null), (F._fsPath = null), F
                }
                return (
                  c(N, T),
                  Object.defineProperty(N.prototype, 'fsPath', {
                    get: function () {
                      return this._fsPath || (this._fsPath = k(this, !1)), this._fsPath
                    },
                    enumerable: !1,
                    configurable: !0,
                  }),
                  (N.prototype.toString = function (F) {
                    return (
                      F === void 0 && (F = !1),
                      F ? x(this, !0) : (this._formatted || (this._formatted = x(this, !1)), this._formatted)
                    )
                  }),
                  (N.prototype.toJSON = function () {
                    var F = { $mid: 1 }
                    return (
                      this._fsPath && ((F.fsPath = this._fsPath), (F._sep = y)),
                      this._formatted && (F.external = this._formatted),
                      this.path && (F.path = this.path),
                      this.scheme && (F.scheme = this.scheme),
                      this.authority && (F.authority = this.authority),
                      this.query && (F.query = this.query),
                      this.fragment && (F.fragment = this.fragment),
                      F
                    )
                  }),
                  N
                )
              })(_),
              M =
                (((u = {})[58] = '%3A'),
                (u[47] = '%2F'),
                (u[63] = '%3F'),
                (u[35] = '%23'),
                (u[91] = '%5B'),
                (u[93] = '%5D'),
                (u[64] = '%40'),
                (u[33] = '%21'),
                (u[36] = '%24'),
                (u[38] = '%26'),
                (u[39] = '%27'),
                (u[40] = '%28'),
                (u[41] = '%29'),
                (u[42] = '%2A'),
                (u[43] = '%2B'),
                (u[44] = '%2C'),
                (u[59] = '%3B'),
                (u[61] = '%3D'),
                (u[32] = '%20'),
                u)
            function D(T, N) {
              for (var F = void 0, I = -1, B = 0; B < T.length; B++) {
                var U = T.charCodeAt(B)
                if (
                  (U >= 97 && U <= 122) ||
                  (U >= 65 && U <= 90) ||
                  (U >= 48 && U <= 57) ||
                  U === 45 ||
                  U === 46 ||
                  U === 95 ||
                  U === 126 ||
                  (N && U === 47)
                )
                  I !== -1 && ((F += encodeURIComponent(T.substring(I, B))), (I = -1)),
                    F !== void 0 && (F += T.charAt(B))
                else {
                  F === void 0 && (F = T.substr(0, B))
                  var H = M[U]
                  H !== void 0
                    ? (I !== -1 && ((F += encodeURIComponent(T.substring(I, B))), (I = -1)), (F += H))
                    : I === -1 && (I = B)
                }
              }
              return I !== -1 && (F += encodeURIComponent(T.substring(I))), F !== void 0 ? F : T
            }
            function C(T) {
              for (var N = void 0, F = 0; F < T.length; F++) {
                var I = T.charCodeAt(F)
                I === 35 || I === 63 ? (N === void 0 && (N = T.substr(0, F)), (N += M[I])) : N !== void 0 && (N += T[F])
              }
              return N !== void 0 ? N : T
            }
            function k(T, N) {
              var F
              return (
                (F =
                  T.authority && T.path.length > 1 && T.scheme === 'file'
                    ? '//'.concat(T.authority).concat(T.path)
                    : T.path.charCodeAt(0) === 47 &&
                        ((T.path.charCodeAt(1) >= 65 && T.path.charCodeAt(1) <= 90) ||
                          (T.path.charCodeAt(1) >= 97 && T.path.charCodeAt(1) <= 122)) &&
                        T.path.charCodeAt(2) === 58
                      ? N
                        ? T.path.substr(1)
                        : T.path[1].toLowerCase() + T.path.substr(2)
                      : T.path),
                a && (F = F.replace(/\//g, '\\')),
                F
              )
            }
            function x(T, N) {
              var F = N ? C : D,
                I = '',
                B = T.scheme,
                U = T.authority,
                H = T.path,
                Ee = T.query,
                ce = T.fragment
              if ((B && ((I += B), (I += ':')), (U || B === 'file') && ((I += m), (I += m)), U)) {
                var Me = U.indexOf('@')
                if (Me !== -1) {
                  var It = U.substr(0, Me)
                  ;(U = U.substr(Me + 1)),
                    (Me = It.indexOf(':')) === -1
                      ? (I += F(It, !1))
                      : ((I += F(It.substr(0, Me), !1)), (I += ':'), (I += F(It.substr(Me + 1), !1))),
                    (I += '@')
                }
                ;(Me = (U = U.toLowerCase()).indexOf(':')) === -1
                  ? (I += F(U, !1))
                  : ((I += F(U.substr(0, Me), !1)), (I += U.substr(Me)))
              }
              if (H) {
                if (H.length >= 3 && H.charCodeAt(0) === 47 && H.charCodeAt(2) === 58)
                  ($e = H.charCodeAt(1)) >= 65 &&
                    $e <= 90 &&
                    (H = '/'.concat(String.fromCharCode($e + 32), ':').concat(H.substr(3)))
                else if (H.length >= 2 && H.charCodeAt(1) === 58) {
                  var $e
                  ;($e = H.charCodeAt(0)) >= 65 &&
                    $e <= 90 &&
                    (H = ''.concat(String.fromCharCode($e + 32), ':').concat(H.substr(2)))
                }
                I += F(H, !0)
              }
              return Ee && ((I += '?'), (I += F(Ee, !1))), ce && ((I += '#'), (I += N ? ce : D(ce, !1))), I
            }
            function w(T) {
              try {
                return decodeURIComponent(T)
              } catch (N) {
                return T.length > 3 ? T.substr(0, 3) + w(T.substr(3)) : T
              }
            }
            var A = /(%[0-9A-Za-z][0-9A-Za-z])+/g
            function S(T) {
              return T.match(A)
                ? T.replace(A, function (N) {
                    return w(N)
                  })
                : T
            }
            var P,
              R = s(470),
              W = function (T, N, F) {
                if (F || arguments.length === 2)
                  for (var I, B = 0, U = N.length; B < U; B++)
                    (!I && B in N) || (I || (I = Array.prototype.slice.call(N, 0, B)), (I[B] = N[B]))
                return T.concat(I || Array.prototype.slice.call(N))
              },
              q = R.posix || R
            ;(function (T) {
              ;(T.joinPath = function (N) {
                for (var F = [], I = 1; I < arguments.length; I++) F[I - 1] = arguments[I]
                return N.with({ path: q.join.apply(q, W([N.path], F, !1)) })
              }),
                (T.resolvePath = function (N) {
                  for (var F = [], I = 1; I < arguments.length; I++) F[I - 1] = arguments[I]
                  var B = N.path || '/'
                  return N.with({ path: q.resolve.apply(q, W([B], F, !1)) })
                }),
                (T.dirname = function (N) {
                  var F = q.dirname(N.path)
                  return F.length === 1 && F.charCodeAt(0) === 46 ? N : N.with({ path: F })
                }),
                (T.basename = function (N) {
                  return q.basename(N.path)
                }),
                (T.extname = function (N) {
                  return q.extname(N.path)
                })
            })(P || (P = {}))
          },
        },
        t = {}
      function r(n) {
        if (t[n]) return t[n].exports
        var i = (t[n] = { exports: {} })
        return e[n](i, i.exports, r), i.exports
      }
      return (
        (r.d = (n, i) => {
          for (var s in i) r.o(i, s) && !r.o(n, s) && Object.defineProperty(n, s, { enumerable: !0, get: i[s] })
        }),
        (r.o = (n, i) => Object.prototype.hasOwnProperty.call(n, i)),
        (r.r = (n) => {
          typeof Symbol != 'undefined' &&
            Symbol.toStringTag &&
            Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(n, '__esModule', { value: !0 })
        }),
        r(447)
      )
    })()
    var { URI: Dt, Utils: tf } = Y1
    function fu(e, t) {
      if (typeof e != 'string') throw new TypeError('Expected a string')
      for (
        var r = String(e),
          n = '',
          i = t ? !!t.extended : !1,
          s = t ? !!t.globstar : !1,
          a = !1,
          o = t && typeof t.flags == 'string' ? t.flags : '',
          l,
          u = 0,
          c = r.length;
        u < c;
        u++
      )
        switch (((l = r[u]), l)) {
          case '/':
          case '$':
          case '^':
          case '+':
          case '.':
          case '(':
          case ')':
          case '=':
          case '!':
          case '|':
            n += '\\' + l
            break
          case '?':
            if (i) {
              n += '.'
              break
            }
          case '[':
          case ']':
            if (i) {
              n += l
              break
            }
          case '{':
            if (i) {
              ;(a = !0), (n += '(')
              break
            }
          case '}':
            if (i) {
              ;(a = !1), (n += ')')
              break
            }
          case ',':
            if (a) {
              n += '|'
              break
            }
            n += '\\' + l
            break
          case '*':
            for (var f = r[u - 1], d = 1; r[u + 1] === '*'; ) d++, u++
            var g = r[u + 1]
            if (!s) n += '.*'
            else {
              var p =
                d > 1 &&
                (f === '/' || f === void 0 || f === '{' || f === ',') &&
                (g === '/' || g === void 0 || g === ',' || g === '}')
              p
                ? (g === '/' ? u++ : f === '/' && n.endsWith('\\/') && (n = n.substr(0, n.length - 2)),
                  (n += '((?:[^/]*(?:/|$))*)'))
                : (n += '([^/]*)')
            }
            break
          default:
            n += l
        }
      return (!o || !~o.indexOf('g')) && (n = '^' + n + '$'), new RegExp(n, o)
    }
    var qe = or(),
      hu = '!',
      du = '/',
      gu = (function () {
        function e(t, r) {
          this.globWrappers = []
          try {
            for (var n = 0, i = t; n < i.length; n++) {
              var s = i[n],
                a = s[0] !== hu
              a || (s = s.substring(1)),
                s.length > 0 &&
                  (s[0] === du && (s = s.substring(1)),
                  this.globWrappers.push({ regexp: fu('**/' + s, { extended: !0, globstar: !0 }), include: a }))
            }
            this.uris = r
          } catch (o) {
            ;(this.globWrappers.length = 0), (this.uris = [])
          }
        }
        return (
          (e.prototype.matchesPattern = function (t) {
            for (var r = !1, n = 0, i = this.globWrappers; n < i.length; n++) {
              var s = i[n],
                a = s.regexp,
                o = s.include
              a.test(t) && (r = o)
            }
            return r
          }),
          (e.prototype.getURIs = function () {
            return this.uris
          }),
          e
        )
      })(),
      mu = (function () {
        function e(t, r, n) {
          ;(this.service = t),
            (this.uri = r),
            (this.dependencies = new Set()),
            (this.anchors = void 0),
            n && (this.unresolvedSchema = this.service.promise.resolve(new lr(n)))
        }
        return (
          (e.prototype.getUnresolvedSchema = function () {
            return (
              this.unresolvedSchema || (this.unresolvedSchema = this.service.loadSchema(this.uri)),
              this.unresolvedSchema
            )
          }),
          (e.prototype.getResolvedSchema = function () {
            var t = this
            return (
              this.resolvedSchema ||
                (this.resolvedSchema = this.getUnresolvedSchema().then(function (r) {
                  return t.service.resolveSchemaContent(r, t)
                })),
              this.resolvedSchema
            )
          }),
          (e.prototype.clearSchema = function () {
            var t = !!this.unresolvedSchema
            return (
              (this.resolvedSchema = void 0),
              (this.unresolvedSchema = void 0),
              this.dependencies.clear(),
              (this.anchors = void 0),
              t
            )
          }),
          e
        )
      })(),
      lr = (function () {
        function e(t, r) {
          r === void 0 && (r = []), (this.schema = t), (this.errors = r)
        }
        return e
      })(),
      K1 = (function () {
        function e(t, r) {
          r === void 0 && (r = []), (this.schema = t), (this.errors = r)
        }
        return (
          (e.prototype.getSection = function (t) {
            var r = this.getSectionRecursive(t, this.schema)
            if (r) return _e(r)
          }),
          (e.prototype.getSectionRecursive = function (t, r) {
            if (!r || typeof r == 'boolean' || t.length === 0) return r
            var n = t.shift()
            if (r.properties && typeof r.properties[n]) return this.getSectionRecursive(t, r.properties[n])
            if (r.patternProperties)
              for (var i = 0, s = Object.keys(r.patternProperties); i < s.length; i++) {
                var a = s[i],
                  o = kr(a)
                if (o != null && o.test(n)) return this.getSectionRecursive(t, r.patternProperties[a])
              }
            else {
              if (typeof r.additionalProperties == 'object') return this.getSectionRecursive(t, r.additionalProperties)
              if (n.match('[0-9]+')) {
                if (Array.isArray(r.items)) {
                  var l = parseInt(n, 10)
                  if (!isNaN(l) && r.items[l]) return this.getSectionRecursive(t, r.items[l])
                } else if (r.items) return this.getSectionRecursive(t, r.items)
              }
            }
          }),
          e
        )
      })(),
      pu = (function () {
        function e(t, r, n) {
          ;(this.contextService = r),
            (this.requestService = t),
            (this.promiseConstructor = n || Promise),
            (this.callOnDispose = []),
            (this.contributionSchemas = {}),
            (this.contributionAssociations = []),
            (this.schemasById = {}),
            (this.filePatternAssociations = []),
            (this.registeredSchemasIds = {})
        }
        return (
          (e.prototype.getRegisteredSchemaIds = function (t) {
            return Object.keys(this.registeredSchemasIds).filter(function (r) {
              var n = Dt.parse(r).scheme
              return n !== 'schemaservice' && (!t || t(n))
            })
          }),
          Object.defineProperty(e.prototype, 'promise', {
            get: function () {
              return this.promiseConstructor
            },
            enumerable: !1,
            configurable: !0,
          }),
          (e.prototype.dispose = function () {
            for (; this.callOnDispose.length > 0; ) this.callOnDispose.pop()()
          }),
          (e.prototype.onResourceChange = function (t) {
            var r = this
            this.cachedSchemaForResource = void 0
            var n = !1
            t = ft(t)
            for (
              var i = [t],
                s = Object.keys(this.schemasById).map(function (u) {
                  return r.schemasById[u]
                });
              i.length;

            )
              for (var a = i.pop(), o = 0; o < s.length; o++) {
                var l = s[o]
                l &&
                  (l.uri === a || l.dependencies.has(a)) &&
                  (l.uri !== a && i.push(l.uri), l.clearSchema() && (n = !0), (s[o] = void 0))
              }
            return n
          }),
          (e.prototype.setSchemaContributions = function (t) {
            if (t.schemas) {
              var r = t.schemas
              for (var n in r) {
                var i = ft(n)
                this.contributionSchemas[i] = this.addSchemaHandle(i, r[n])
              }
            }
            if (Array.isArray(t.schemaAssociations))
              for (var s = t.schemaAssociations, a = 0, o = s; a < o.length; a++) {
                var l = o[a],
                  u = l.uris.map(ft),
                  c = this.addFilePatternAssociation(l.pattern, u)
                this.contributionAssociations.push(c)
              }
          }),
          (e.prototype.addSchemaHandle = function (t, r) {
            var n = new mu(this, t, r)
            return (this.schemasById[t] = n), n
          }),
          (e.prototype.getOrAddSchemaHandle = function (t, r) {
            return this.schemasById[t] || this.addSchemaHandle(t, r)
          }),
          (e.prototype.addFilePatternAssociation = function (t, r) {
            var n = new gu(t, r)
            return this.filePatternAssociations.push(n), n
          }),
          (e.prototype.registerExternalSchema = function (t, r, n) {
            var i = ft(t)
            return (
              (this.registeredSchemasIds[i] = !0),
              (this.cachedSchemaForResource = void 0),
              r && this.addFilePatternAssociation(r, [i]),
              n ? this.addSchemaHandle(i, n) : this.getOrAddSchemaHandle(i)
            )
          }),
          (e.prototype.clearExternalSchemas = function () {
            ;(this.schemasById = {}),
              (this.filePatternAssociations = []),
              (this.registeredSchemasIds = {}),
              (this.cachedSchemaForResource = void 0)
            for (var t in this.contributionSchemas)
              (this.schemasById[t] = this.contributionSchemas[t]), (this.registeredSchemasIds[t] = !0)
            for (var r = 0, n = this.contributionAssociations; r < n.length; r++) {
              var i = n[r]
              this.filePatternAssociations.push(i)
            }
          }),
          (e.prototype.getResolvedSchema = function (t) {
            var r = ft(t),
              n = this.schemasById[r]
            return n ? n.getResolvedSchema() : this.promise.resolve(void 0)
          }),
          (e.prototype.loadSchema = function (t) {
            if (!this.requestService) {
              var r = qe(
                'json.schema.norequestservice',
                "Unable to load schema from '{0}'. No schema request service available",
                Ur(t),
              )
              return this.promise.resolve(new lr({}, [r]))
            }
            return this.requestService(t).then(
              function (n) {
                if (!n) {
                  var i = qe('json.schema.nocontent', "Unable to load schema from '{0}': No content.", Ur(t))
                  return new lr({}, [i])
                }
                var s = {},
                  a = []
                s = Tl(n, a)
                var o = a.length
                  ? [
                      qe(
                        'json.schema.invalidFormat',
                        "Unable to parse content from '{0}': Parse error at offset {1}.",
                        Ur(t),
                        a[0].offset,
                      ),
                    ]
                  : []
                return new lr(s, o)
              },
              function (n) {
                var i = n.toString(),
                  s = n.toString().split('Error: ')
                return (
                  s.length > 1 && (i = s[1]),
                  er(i, '.') && (i = i.substr(0, i.length - 1)),
                  new lr({}, [qe('json.schema.nocontent', "Unable to load schema from '{0}': {1}.", Ur(t), i)])
                )
              },
            )
          }),
          (e.prototype.resolveSchemaContent = function (t, r) {
            var n = this,
              i = t.errors.slice(0),
              s = t.schema
            if (s.$schema) {
              var a = ft(s.$schema)
              if (a === 'http://json-schema.org/draft-03/schema')
                return this.promise.resolve(
                  new K1({}, [qe('json.schema.draft03.notsupported', 'Draft-03 schemas are not supported.')]),
                )
              a === 'https://json-schema.org/draft/2019-09/schema'
                ? i.push(
                    qe('json.schema.draft201909.notsupported', 'Draft 2019-09 schemas are not yet fully supported.'),
                  )
                : a === 'https://json-schema.org/draft/2020-12/schema' &&
                  i.push(
                    qe('json.schema.draft202012.notsupported', 'Draft 2020-12 schemas are not yet fully supported.'),
                  )
            }
            var o = this.contextService,
              l = function (b, m) {
                m = decodeURIComponent(m)
                var v = b
                return (
                  m[0] === '/' && (m = m.substring(1)),
                  m.split('/').some(function (_) {
                    return (_ = _.replace(/~1/g, '/').replace(/~0/g, '~')), (v = v[_]), !v
                  }),
                  v
                )
              },
              u = function (b, m, v) {
                return m.anchors || (m.anchors = p(b)), m.anchors.get(v)
              },
              c = function (b, m) {
                for (var v in m)
                  m.hasOwnProperty(v) && !b.hasOwnProperty(v) && v !== 'id' && v !== '$id' && (b[v] = m[v])
              },
              f = function (b, m, v, _) {
                var y
                _ === void 0 || _.length === 0 ? (y = m) : _.charAt(0) === '/' ? (y = l(m, _)) : (y = u(m, v, _)),
                  y
                    ? c(b, y)
                    : i.push(qe('json.schema.invalidid', "$ref '{0}' in '{1}' can not be resolved.", _, v.uri))
              },
              d = function (b, m, v, _) {
                o && !/^[A-Za-z][A-Za-z0-9+\-.+]*:\/\/.*/.test(m) && (m = o.resolveRelativePath(m, _.uri)), (m = ft(m))
                var y = n.getOrAddSchemaHandle(m)
                return y.getUnresolvedSchema().then(function (E) {
                  if ((_.dependencies.add(m), E.errors.length)) {
                    var M = v ? m + '#' + v : m
                    i.push(qe('json.schema.problemloadingref', "Problems loading reference '{0}': {1}", M, E.errors[0]))
                  }
                  return f(b, E.schema, y, v), g(b, E.schema, y)
                })
              },
              g = function (b, m, v) {
                var _ = []
                return (
                  n.traverseNodes(b, function (y) {
                    for (var E = new Set(); y.$ref; ) {
                      var M = y.$ref,
                        D = M.split('#', 2)
                      if ((delete y.$ref, D[0].length > 0)) {
                        _.push(d(y, D[0], D[1], v))
                        return
                      } else if (!E.has(M)) {
                        var C = D[1]
                        f(y, m, v, C), E.add(M)
                      }
                    }
                  }),
                  n.promise.all(_)
                )
              },
              p = function (b) {
                var m = new Map()
                return (
                  n.traverseNodes(b, function (v) {
                    var _ = v.$id || v.id
                    if (typeof _ == 'string' && _.charAt(0) === '#') {
                      var y = _.substring(1)
                      m.has(y)
                        ? i.push(qe('json.schema.duplicateid', "Duplicate id declaration: '{0}'", _))
                        : m.set(y, v)
                    }
                  }),
                  m
                )
              }
            return g(s, s, r).then(function (b) {
              return new K1(s, i)
            })
          }),
          (e.prototype.traverseNodes = function (t, r) {
            if (!t || typeof t != 'object') return Promise.resolve(null)
            for (
              var n = new Set(),
                i = function () {
                  for (var u = [], c = 0; c < arguments.length; c++) u[c] = arguments[c]
                  for (var f = 0, d = u; f < d.length; f++) {
                    var g = d[f]
                    typeof g == 'object' && o.push(g)
                  }
                },
                s = function () {
                  for (var u = [], c = 0; c < arguments.length; c++) u[c] = arguments[c]
                  for (var f = 0, d = u; f < d.length; f++) {
                    var g = d[f]
                    if (typeof g == 'object')
                      for (var p in g) {
                        var b = p,
                          m = g[b]
                        typeof m == 'object' && o.push(m)
                      }
                  }
                },
                a = function () {
                  for (var u = [], c = 0; c < arguments.length; c++) u[c] = arguments[c]
                  for (var f = 0, d = u; f < d.length; f++) {
                    var g = d[f]
                    if (Array.isArray(g))
                      for (var p = 0, b = g; p < b.length; p++) {
                        var m = b[p]
                        typeof m == 'object' && o.push(m)
                      }
                  }
                },
                o = [t],
                l = o.pop();
              l;

            )
              n.has(l) ||
                (n.add(l),
                r(l),
                i(
                  l.items,
                  l.additionalItems,
                  l.additionalProperties,
                  l.not,
                  l.contains,
                  l.propertyNames,
                  l.if,
                  l.then,
                  l.else,
                ),
                s(l.definitions, l.properties, l.patternProperties, l.dependencies),
                a(l.anyOf, l.allOf, l.oneOf, l.items)),
                (l = o.pop())
          }),
          (e.prototype.getSchemaFromProperty = function (t, r) {
            var n, i
            if (((n = r.root) === null || n === void 0 ? void 0 : n.type) === 'object')
              for (var s = 0, a = r.root.properties; s < a.length; s++) {
                var o = a[s]
                if (
                  o.keyNode.value === '$schema' &&
                  ((i = o.valueNode) === null || i === void 0 ? void 0 : i.type) === 'string'
                ) {
                  var l = o.valueNode.value
                  return (
                    this.contextService &&
                      !/^\w[\w\d+.-]*:/.test(l) &&
                      (l = this.contextService.resolveRelativePath(l, t)),
                    l
                  )
                }
              }
          }),
          (e.prototype.getAssociatedSchemas = function (t) {
            for (
              var r = Object.create(null), n = [], i = bu(t), s = 0, a = this.filePatternAssociations;
              s < a.length;
              s++
            ) {
              var o = a[s]
              if (o.matchesPattern(i))
                for (var l = 0, u = o.getURIs(); l < u.length; l++) {
                  var c = u[l]
                  r[c] || (n.push(c), (r[c] = !0))
                }
            }
            return n
          }),
          (e.prototype.getSchemaURIsForResource = function (t, r) {
            var n = r && this.getSchemaFromProperty(t, r)
            return n ? [n] : this.getAssociatedSchemas(t)
          }),
          (e.prototype.getSchemaForResource = function (t, r) {
            if (r) {
              var n = this.getSchemaFromProperty(t, r)
              if (n) {
                var i = ft(n)
                return this.getOrAddSchemaHandle(i).getResolvedSchema()
              }
            }
            if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === t)
              return this.cachedSchemaForResource.resolvedSchema
            var s = this.getAssociatedSchemas(t),
              a = s.length > 0 ? this.createCombinedSchema(t, s).getResolvedSchema() : this.promise.resolve(void 0)
            return (this.cachedSchemaForResource = { resource: t, resolvedSchema: a }), a
          }),
          (e.prototype.createCombinedSchema = function (t, r) {
            if (r.length === 1) return this.getOrAddSchemaHandle(r[0])
            var n = 'schemaservice://combinedSchema/' + encodeURIComponent(t),
              i = {
                allOf: r.map(function (s) {
                  return { $ref: s }
                }),
              }
            return this.addSchemaHandle(n, i)
          }),
          (e.prototype.getMatchingSchemas = function (t, r, n) {
            if (n) {
              var i = n.id || 'schemaservice://untitled/matchingSchemas/' + vu++,
                s = this.addSchemaHandle(i, n)
              return s.getResolvedSchema().then(function (a) {
                return r.getMatchingSchemas(a.schema).filter(function (o) {
                  return !o.inverted
                })
              })
            }
            return this.getSchemaForResource(t.uri, r).then(function (a) {
              return a
                ? r.getMatchingSchemas(a.schema).filter(function (o) {
                    return !o.inverted
                  })
                : []
            })
          }),
          e
        )
      })(),
      vu = 0
    function ft(e) {
      try {
        return Dt.parse(e).toString(!0)
      } catch (t) {
        return e
      }
    }
    function bu(e) {
      try {
        return Dt.parse(e).with({ fragment: null, query: null }).toString(!0)
      } catch (t) {
        return e
      }
    }
    function Ur(e) {
      try {
        var t = Dt.parse(e)
        if (t.scheme === 'file') return t.fsPath
      } catch (r) {}
      return e
    }
    function yu(e, t) {
      var r = [],
        n = [],
        i = [],
        s = -1,
        a = Tt(e.getText(), !1),
        o = a.scan()
      function l(w) {
        r.push(w), n.push(i.length)
      }
      for (; o !== 17; ) {
        switch (o) {
          case 1:
          case 3: {
            var u = e.positionAt(a.getTokenOffset()).line,
              c = { startLine: u, endLine: u, kind: o === 1 ? 'object' : 'array' }
            i.push(c)
            break
          }
          case 2:
          case 4: {
            var f = o === 2 ? 'object' : 'array'
            if (i.length > 0 && i[i.length - 1].kind === f) {
              var c = i.pop(),
                d = e.positionAt(a.getTokenOffset()).line
              c && d > c.startLine + 1 && s !== c.startLine && ((c.endLine = d - 1), l(c), (s = c.startLine))
            }
            break
          }
          case 13: {
            var u = e.positionAt(a.getTokenOffset()).line,
              g = e.positionAt(a.getTokenOffset() + a.getTokenLength()).line
            a.getTokenError() === 1 && u + 1 < e.lineCount
              ? a.setPosition(e.offsetAt(Re.create(u + 1, 0)))
              : u < g && (l({ startLine: u, endLine: g, kind: rr.Comment }), (s = u))
            break
          }
          case 12: {
            var p = e.getText().substr(a.getTokenOffset(), a.getTokenLength()),
              b = p.match(/^\/\/\s*#(region\b)|(endregion\b)/)
            if (b) {
              var d = e.positionAt(a.getTokenOffset()).line
              if (b[1]) {
                var c = { startLine: d, endLine: d, kind: rr.Region }
                i.push(c)
              } else {
                for (var m = i.length - 1; m >= 0 && i[m].kind !== rr.Region; ) m--
                if (m >= 0) {
                  var c = i[m]
                  ;(i.length = m), d > c.startLine && s !== c.startLine && ((c.endLine = d), l(c), (s = c.startLine))
                }
              }
            }
            break
          }
        }
        o = a.scan()
      }
      var v = t && t.rangeLimit
      if (typeof v != 'number' || r.length <= v) return r
      t && t.onRangeLimitExceeded && t.onRangeLimitExceeded(e.uri)
      for (var _ = [], y = 0, E = n; y < E.length; y++) {
        var M = E[y]
        M < 30 && (_[M] = (_[M] || 0) + 1)
      }
      for (var D = 0, C = 0, m = 0; m < _.length; m++) {
        var k = _[m]
        if (k) {
          if (k + D > v) {
            C = m
            break
          }
          D += k
        }
      }
      for (var x = [], m = 0; m < r.length; m++) {
        var M = n[m]
        typeof M == 'number' && (M < C || (M === C && D++ < v)) && x.push(r[m])
      }
      return x
    }
    function _u(e, t, r) {
      function n(o) {
        for (var l = e.offsetAt(o), u = r.getNodeFromOffset(l, !0), c = []; u; ) {
          switch (u.type) {
            case 'string':
            case 'object':
            case 'array':
              var f = u.offset + 1,
                d = u.offset + u.length - 1
              f < d && l >= f && l <= d && c.push(i(f, d)), c.push(i(u.offset, u.offset + u.length))
              break
            case 'number':
            case 'boolean':
            case 'null':
            case 'property':
              c.push(i(u.offset, u.offset + u.length))
              break
          }
          if (u.type === 'property' || (u.parent && u.parent.type === 'array')) {
            var g = a(u.offset + u.length, 5)
            g !== -1 && c.push(i(u.offset, g))
          }
          u = u.parent
        }
        for (var p = void 0, b = c.length - 1; b >= 0; b--) p = Dr.create(c[b], p)
        return p || (p = Dr.create(J.create(o, o))), p
      }
      function i(o, l) {
        return J.create(e.positionAt(o), e.positionAt(l))
      }
      var s = Tt(e.getText(), !0)
      function a(o, l) {
        s.setPosition(o)
        var u = s.scan()
        return u === l ? s.getTokenOffset() + s.getTokenLength() : -1
      }
      return t.map(n)
    }
    function xu(e, t) {
      var r = []
      return (
        t.visit(function (n) {
          var i
          if (
            n.type === 'property' &&
            n.keyNode.value === '$ref' &&
            ((i = n.valueNode) === null || i === void 0 ? void 0 : i.type) === 'string'
          ) {
            var s = n.valueNode.value,
              a = Su(t, s)
            if (a) {
              var o = e.positionAt(a.offset)
              r.push({
                target: ''
                  .concat(e.uri, '#')
                  .concat(o.line + 1, ',')
                  .concat(o.character + 1),
                range: wu(e, n.valueNode),
              })
            }
          }
          return !0
        }),
        Promise.resolve(r)
      )
    }
    function wu(e, t) {
      return J.create(e.positionAt(t.offset + 1), e.positionAt(t.offset + t.length - 1))
    }
    function Su(e, t) {
      var r = Au(t)
      return r ? Yn(r, e.root) : null
    }
    function Yn(e, t) {
      if (!t) return null
      if (e.length === 0) return t
      var r = e.shift()
      if (t && t.type === 'object') {
        var n = t.properties.find(function (a) {
          return a.keyNode.value === r
        })
        return n ? Yn(e, n.valueNode) : null
      } else if (t && t.type === 'array' && r.match(/^(0|[1-9][0-9]*)$/)) {
        var i = Number.parseInt(r),
          s = t.items[i]
        return s ? Yn(e, s) : null
      }
      return null
    }
    function Au(e) {
      return e === '#' ? [] : e[0] !== '#' || e[1] !== '/' ? null : e.substring(2).split(/\//).map(Lu)
    }
    function Lu(e) {
      return e.replace(/~1/g, '/').replace(/~0/g, '~')
    }
    function Cu(e) {
      var t = e.promiseConstructor || Promise,
        r = new pu(e.schemaRequestService, e.workspaceContext, t)
      r.setSchemaContributions(Xn)
      var n = new Kl(r, e.contributions, t, e.clientCapabilities),
        i = new eu(r, e.contributions, t),
        s = new uu(r),
        a = new nu(r, t)
      return {
        configure: function (o) {
          r.clearExternalSchemas(),
            o.schemas &&
              o.schemas.forEach(function (l) {
                r.registerExternalSchema(l.uri, l.fileMatch, l.schema)
              }),
            a.configure(o)
        },
        resetSchema: function (o) {
          return r.onResourceChange(o)
        },
        doValidation: a.doValidation.bind(a),
        getLanguageStatus: a.getLanguageStatus.bind(a),
        parseJSONDocument: function (o) {
          return Xl(o, { collectComments: !0 })
        },
        newJSONDocument: function (o, l) {
          return Ql(o, l)
        },
        getMatchingSchemas: r.getMatchingSchemas.bind(r),
        doResolve: n.doResolve.bind(n),
        doComplete: n.doComplete.bind(n),
        findDocumentSymbols: s.findDocumentSymbols.bind(s),
        findDocumentSymbols2: s.findDocumentSymbols2.bind(s),
        findDocumentColors: s.findDocumentColors.bind(s),
        getColorPresentations: s.getColorPresentations.bind(s),
        doHover: i.doHover.bind(i),
        getFoldingRanges: yu,
        getSelectionRanges: _u,
        findDefinition: function () {
          return Promise.resolve([])
        },
        findLinks: xu,
        format: function (o, l, u) {
          var c = void 0
          if (l) {
            var f = o.offsetAt(l.start),
              d = o.offsetAt(l.end) - f
            c = { offset: f, length: d }
          }
          var g = {
            tabSize: u ? u.tabSize : 4,
            insertSpaces: (u == null ? void 0 : u.insertSpaces) === !0,
            insertFinalNewline: (u == null ? void 0 : u.insertFinalNewline) === !0,
            eol: `
`,
          }
          return Il(o.getText(), c, g).map(function (p) {
            return Oe.replace(J.create(o.positionAt(p.offset), o.positionAt(p.offset + p.length)), p.content)
          })
        },
      }
    }
    var ea
    typeof fetch != 'undefined' &&
      (ea = function (e) {
        return fetch(e).then((t) => t.text())
      })
    var Nu = class {
        constructor(e, t) {
          ur(this, '_ctx')
          ur(this, '_languageService')
          ur(this, '_languageSettings')
          ur(this, '_languageId')
          ;(this._ctx = e),
            (this._languageSettings = t.languageSettings),
            (this._languageId = t.languageId),
            (this._languageService = Cu({
              workspaceContext: {
                resolveRelativePath: (r, n) => {
                  const i = n.substr(0, n.lastIndexOf('/') + 1)
                  return Mu(i, r)
                },
              },
              schemaRequestService: t.enableSchemaRequest ? ea : void 0,
            })),
            this._languageService.configure(this._languageSettings)
        }
        doValidation(e) {
          return Te(this, null, function* () {
            let t = this._getTextDocument(e)
            if (t) {
              let r = this._languageService.parseJSONDocument(t)
              return this._languageService.doValidation(t, r, this._languageSettings)
            }
            return Promise.resolve([])
          })
        }
        doComplete(e, t) {
          return Te(this, null, function* () {
            let r = this._getTextDocument(e)
            if (!r) return null
            let n = this._languageService.parseJSONDocument(r)
            return this._languageService.doComplete(r, t, n)
          })
        }
        doResolve(e) {
          return Te(this, null, function* () {
            return this._languageService.doResolve(e)
          })
        }
        doHover(e, t) {
          return Te(this, null, function* () {
            let r = this._getTextDocument(e)
            if (!r) return null
            let n = this._languageService.parseJSONDocument(r)
            return this._languageService.doHover(r, t, n)
          })
        }
        format(e, t, r) {
          return Te(this, null, function* () {
            let n = this._getTextDocument(e)
            if (!n) return []
            let i = this._languageService.format(n, t, r)
            return Promise.resolve(i)
          })
        }
        resetSchema(e) {
          return Te(this, null, function* () {
            return Promise.resolve(this._languageService.resetSchema(e))
          })
        }
        findDocumentSymbols(e) {
          return Te(this, null, function* () {
            let t = this._getTextDocument(e)
            if (!t) return []
            let r = this._languageService.parseJSONDocument(t),
              n = this._languageService.findDocumentSymbols(t, r)
            return Promise.resolve(n)
          })
        }
        findDocumentColors(e) {
          return Te(this, null, function* () {
            let t = this._getTextDocument(e)
            if (!t) return []
            let r = this._languageService.parseJSONDocument(t),
              n = this._languageService.findDocumentColors(t, r)
            return Promise.resolve(n)
          })
        }
        getColorPresentations(e, t, r) {
          return Te(this, null, function* () {
            let n = this._getTextDocument(e)
            if (!n) return []
            let i = this._languageService.parseJSONDocument(n),
              s = this._languageService.getColorPresentations(n, i, t, r)
            return Promise.resolve(s)
          })
        }
        getFoldingRanges(e, t) {
          return Te(this, null, function* () {
            let r = this._getTextDocument(e)
            if (!r) return []
            let n = this._languageService.getFoldingRanges(r, t)
            return Promise.resolve(n)
          })
        }
        getSelectionRanges(e, t) {
          return Te(this, null, function* () {
            let r = this._getTextDocument(e)
            if (!r) return []
            let n = this._languageService.parseJSONDocument(r),
              i = this._languageService.getSelectionRanges(r, t, n)
            return Promise.resolve(i)
          })
        }
        _getTextDocument(e) {
          let t = this._ctx.getMirrorModels()
          for (let r of t) if (r.uri.toString() === e) return Wn.create(e, this._languageId, r.version, r.getValue())
          return null
        }
      },
      ku = '/'.charCodeAt(0),
      Kn = '.'.charCodeAt(0)
    function Eu(e) {
      return e.charCodeAt(0) === ku
    }
    function Mu(e, t) {
      if (Eu(t)) {
        const r = Dt.parse(e),
          n = t.split('/')
        return r.with({ path: ta(n) }).toString()
      }
      return Tu(e, t)
    }
    function ta(e) {
      const t = []
      for (const n of e)
        n.length === 0 ||
          (n.length === 1 && n.charCodeAt(0) === Kn) ||
          (n.length === 2 && n.charCodeAt(0) === Kn && n.charCodeAt(1) === Kn ? t.pop() : t.push(n))
      e.length > 1 && e[e.length - 1].length === 0 && t.push('')
      let r = t.join('/')
      return e[0].length === 0 && (r = '/' + r), r
    }
    function Tu(e, ...t) {
      const r = Dt.parse(e),
        n = r.path.split('/')
      for (let i of t) n.push(...i.split('/'))
      return r.with({ path: ta(n) }).toString()
    }
    self.onmessage = () => {
      o1((e, t) => new Nu(e, t))
    }
  })()
})()
