;(function () {
  var vr = {
      224: function (fe) {
        var P = (fe.exports = {}),
          O,
          ne
        function ke() {
          throw new Error('setTimeout has not been defined')
        }
        function he() {
          throw new Error('clearTimeout has not been defined')
        }
        ;(function () {
          try {
            typeof setTimeout == 'function' ? (O = setTimeout) : (O = ke)
          } catch (V) {
            O = ke
          }
          try {
            typeof clearTimeout == 'function' ? (ne = clearTimeout) : (ne = he)
          } catch (V) {
            ne = he
          }
        })()
        function $e(V) {
          if (O === setTimeout) return setTimeout(V, 0)
          if ((O === ke || !O) && setTimeout) return (O = setTimeout), setTimeout(V, 0)
          try {
            return O(V, 0)
          } catch (B) {
            try {
              return O.call(null, V, 0)
            } catch (ge) {
              return O.call(this, V, 0)
            }
          }
        }
        function At(V) {
          if (ne === clearTimeout) return clearTimeout(V)
          if ((ne === he || !ne) && clearTimeout) return (ne = clearTimeout), clearTimeout(V)
          try {
            return ne(V)
          } catch (B) {
            try {
              return ne.call(null, V)
            } catch (ge) {
              return ne.call(this, V)
            }
          }
        }
        var oe = [],
          Ne = !1,
          de,
          Ge = -1
        function me() {
          !Ne || !de || ((Ne = !1), de.length ? (oe = de.concat(oe)) : (Ge = -1), oe.length && De())
        }
        function De() {
          if (!Ne) {
            var V = $e(me)
            Ne = !0
            for (var B = oe.length; B; ) {
              for (de = oe, oe = []; ++Ge < B; ) de && de[Ge].run()
              ;(Ge = -1), (B = oe.length)
            }
            ;(de = null), (Ne = !1), At(V)
          }
        }
        P.nextTick = function (V) {
          var B = new Array(arguments.length - 1)
          if (arguments.length > 1) for (var ge = 1; ge < arguments.length; ge++) B[ge - 1] = arguments[ge]
          oe.push(new lt(V, B)), oe.length === 1 && !Ne && $e(De)
        }
        function lt(V, B) {
          ;(this.fun = V), (this.array = B)
        }
        ;(lt.prototype.run = function () {
          this.fun.apply(null, this.array)
        }),
          (P.title = 'browser'),
          (P.browser = !0),
          (P.env = {}),
          (P.argv = []),
          (P.version = ''),
          (P.versions = {})
        function j() {}
        ;(P.on = j),
          (P.addListener = j),
          (P.once = j),
          (P.off = j),
          (P.removeListener = j),
          (P.removeAllListeners = j),
          (P.emit = j),
          (P.prependListener = j),
          (P.prependOnceListener = j),
          (P.listeners = function (V) {
            return []
          }),
          (P.binding = function (V) {
            throw new Error('process.binding is not supported')
          }),
          (P.cwd = function () {
            return '/'
          }),
          (P.chdir = function (V) {
            throw new Error('process.chdir is not supported')
          }),
          (P.umask = function () {
            return 0
          })
      },
    },
    b1 = {}
  function Re(fe) {
    var P = b1[fe]
    if (P !== void 0) return P.exports
    var O = (b1[fe] = { exports: {} })
    return vr[fe](O, O.exports, Re), O.exports
  }
  ;(function () {
    Re.g = (function () {
      if (typeof globalThis == 'object') return globalThis
      try {
        return this || new Function('return this')()
      } catch (fe) {
        if (typeof window == 'object') return window
      }
    })()
  })()
  var Hi = {}
  ;(function () {
    'use strict'
    class fe {
      constructor() {
        ;(this.listeners = []),
          (this.unexpectedErrorHandler = function (t) {
            setTimeout(() => {
              throw t.stack
                ? me.isErrorNoTelemetry(t)
                  ? new me(
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
        this.listeners.forEach((n) => {
          n(t)
        })
      }
      onUnexpectedError(t) {
        this.unexpectedErrorHandler(t), this.emit(t)
      }
      onUnexpectedExternalError(t) {
        this.unexpectedErrorHandler(t)
      }
    }
    const P = new fe()
    function O(e) {
      $e(e) || P.onUnexpectedError(e)
    }
    function ne(e) {
      $e(e) || P.onUnexpectedExternalError(e)
    }
    function ke(e) {
      if (e instanceof Error) {
        const { name: t, message: n } = e,
          r = e.stacktrace || e.stack
        return { $isError: !0, name: t, message: n, stack: r, noTelemetry: me.isErrorNoTelemetry(e) }
      }
      return e
    }
    const he = 'Canceled'
    function $e(e) {
      return e instanceof At ? !0 : e instanceof Error && e.name === he && e.message === he
    }
    class At extends Error {
      constructor() {
        super(he), (this.name = this.message)
      }
    }
    function oe() {
      const e = new Error(he)
      return (e.name = e.message), e
    }
    function Ne(e) {
      return e ? new Error(`Illegal argument: ${e}`) : new Error('Illegal argument')
    }
    function de(e) {
      return e ? new Error(`Illegal state: ${e}`) : new Error('Illegal state')
    }
    class Ge extends Error {
      constructor(t) {
        super('NotSupported'), t && (this.message = t)
      }
    }
    class me extends Error {
      constructor(t) {
        super(t), (this.name = 'CodeExpectedError')
      }
      static fromError(t) {
        if (t instanceof me) return t
        const n = new me()
        return (n.message = t.message), (n.stack = t.stack), n
      }
      static isErrorNoTelemetry(t) {
        return t.name === 'CodeExpectedError'
      }
    }
    class De extends Error {
      constructor(t) {
        super(t || 'An unexpected bug occurred.'), Object.setPrototypeOf(this, De.prototype)
        debugger
      }
    }
    function lt(e) {
      const t = this
      let n = !1,
        r
      return function () {
        return n || ((n = !0), (r = e.apply(t, arguments))), r
      }
    }
    var j
    ;(function (e) {
      function t(_) {
        return _ && typeof _ == 'object' && typeof _[Symbol.iterator] == 'function'
      }
      e.is = t
      const n = Object.freeze([])
      function r() {
        return n
      }
      e.empty = r
      function* s(_) {
        yield _
      }
      e.single = s
      function i(_) {
        return t(_) ? _ : s(_)
      }
      e.wrap = i
      function l(_) {
        return _ || n
      }
      e.from = l
      function a(_) {
        return !_ || _[Symbol.iterator]().next().done === !0
      }
      e.isEmpty = a
      function c(_) {
        return _[Symbol.iterator]().next().value
      }
      e.first = c
      function u(_, S) {
        for (const L of _) if (S(L)) return !0
        return !1
      }
      e.some = u
      function h(_, S) {
        for (const L of _) if (S(L)) return L
      }
      e.find = h
      function* f(_, S) {
        for (const L of _) S(L) && (yield L)
      }
      e.filter = f
      function* d(_, S) {
        let L = 0
        for (const D of _) yield S(D, L++)
      }
      e.map = d
      function* m(..._) {
        for (const S of _) for (const L of S) yield L
      }
      e.concat = m
      function b(_, S, L) {
        let D = L
        for (const R of _) D = S(D, R)
        return D
      }
      e.reduce = b
      function* C(_, S, L = _.length) {
        for (S < 0 && (S += _.length), L < 0 ? (L += _.length) : L > _.length && (L = _.length); S < L; S++) yield _[S]
      }
      e.slice = C
      function w(_, S = Number.POSITIVE_INFINITY) {
        const L = []
        if (S === 0) return [L, _]
        const D = _[Symbol.iterator]()
        for (let R = 0; R < S; R++) {
          const J = D.next()
          if (J.done) return [L, e.empty()]
          L.push(J.value)
        }
        return [
          L,
          {
            [Symbol.iterator]() {
              return D
            },
          },
        ]
      }
      e.consume = w
    })(j || (j = {}))
    const V = !1
    let B = null
    function ge(e) {
      B = e
    }
    if (V) {
      const e = '__is_disposable_tracked__'
      ge(
        new (class {
          trackDisposable(t) {
            const n = new Error('Potentially leaked disposable').stack
            setTimeout(() => {
              t[e] || console.log(n)
            }, 3e3)
          }
          setParent(t, n) {
            if (t && t !== Ie.None)
              try {
                t[e] = !0
              } catch (r) {}
          }
          markAsDisposed(t) {
            if (t && t !== Ie.None)
              try {
                t[e] = !0
              } catch (n) {}
          }
          markAsSingleton(t) {}
        })(),
      )
    }
    function Fe(e) {
      return B == null || B.trackDisposable(e), e
    }
    function Pe(e) {
      B == null || B.markAsDisposed(e)
    }
    function at(e, t) {
      B == null || B.setParent(e, t)
    }
    function Sr(e, t) {
      if (B) for (const n of e) B.setParent(n, t)
    }
    function zi(e) {
      return B == null || B.markAsSingleton(e), e
    }
    function $i(e) {
      return typeof e.dispose == 'function' && e.dispose.length === 0
    }
    function yt(e) {
      if (j.is(e)) {
        const t = []
        for (const n of e)
          if (n)
            try {
              n.dispose()
            } catch (r) {
              t.push(r)
            }
        if (t.length === 1) throw t[0]
        if (t.length > 1) throw new AggregateError(t, 'Encountered errors while disposing of store')
        return Array.isArray(e) ? [] : e
      } else if (e) return e.dispose(), e
    }
    function Cr(...e) {
      const t = ut(() => yt(e))
      return Sr(e, t), t
    }
    function ut(e) {
      const t = Fe({
        dispose: lt(() => {
          Pe(t), e()
        }),
      })
      return t
    }
    class Ae {
      constructor() {
        ;(this._toDispose = new Set()), (this._isDisposed = !1), Fe(this)
      }
      dispose() {
        this._isDisposed || (Pe(this), (this._isDisposed = !0), this.clear())
      }
      get isDisposed() {
        return this._isDisposed
      }
      clear() {
        if (this._toDispose.size !== 0)
          try {
            yt(this._toDispose)
          } finally {
            this._toDispose.clear()
          }
      }
      add(t) {
        if (!t) return t
        if (t === this) throw new Error('Cannot register a disposable on itself!')
        return (
          at(t, this),
          this._isDisposed
            ? Ae.DISABLE_DISPOSED_WARNING ||
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
    Ae.DISABLE_DISPOSED_WARNING = !1
    class Ie {
      constructor() {
        ;(this._store = new Ae()), Fe(this), at(this._store, this)
      }
      dispose() {
        Pe(this), this._store.dispose()
      }
      _register(t) {
        if (t === this) throw new Error('Cannot register a disposable on itself!')
        return this._store.add(t)
      }
    }
    Ie.None = Object.freeze({ dispose() {} })
    class Gi {
      constructor() {
        ;(this._isDisposed = !1), Fe(this)
      }
      get value() {
        return this._isDisposed ? void 0 : this._value
      }
      set value(t) {
        var n
        this._isDisposed ||
          t === this._value ||
          ((n = this._value) === null || n === void 0 || n.dispose(), t && at(t, this), (this._value = t))
      }
      clear() {
        this.value = void 0
      }
      dispose() {
        var t
        ;(this._isDisposed = !0),
          Pe(this),
          (t = this._value) === null || t === void 0 || t.dispose(),
          (this._value = void 0)
      }
      clearAndLeak() {
        const t = this._value
        return (this._value = void 0), t && at(t, null), t
      }
    }
    class ji {
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
    class Nr {
      constructor() {
        ;(this.dispose = () => {}), (this.unset = () => {}), (this.isset = () => !1), Fe(this)
      }
      set(t) {
        let n = t
        return (
          (this.unset = () => (n = void 0)),
          (this.isset = () => n !== void 0),
          (this.dispose = () => {
            n && (n(), (n = void 0), Pe(this))
          }),
          this
        )
      }
    }
    class Qi {
      constructor(t) {
        this.object = t
      }
      dispose() {}
    }
    class Yi {
      constructor() {
        ;(this._store = new Map()), (this._isDisposed = !1), Fe(this)
      }
      dispose() {
        Pe(this), (this._isDisposed = !0), this.clearAndDisposeAll()
      }
      clearAndDisposeAll() {
        if (this._store.size)
          try {
            yt(this._store.values())
          } finally {
            this._store.clear()
          }
      }
      get(t) {
        return this._store.get(t)
      }
      set(t, n, r = !1) {
        var s
        this._isDisposed &&
          console.warn(
            new Error(
              'Trying to add a disposable to a DisposableMap that has already been disposed of. The added object will be leaked!',
            ).stack,
          ),
          r || (s = this._store.get(t)) === null || s === void 0 || s.dispose(),
          this._store.set(t, n)
      }
      [Symbol.iterator]() {
        return this._store[Symbol.iterator]()
      }
    }
    class F {
      constructor(t) {
        ;(this.element = t), (this.next = F.Undefined), (this.prev = F.Undefined)
      }
    }
    F.Undefined = new F(void 0)
    class ct {
      constructor() {
        ;(this._first = F.Undefined), (this._last = F.Undefined), (this._size = 0)
      }
      get size() {
        return this._size
      }
      isEmpty() {
        return this._first === F.Undefined
      }
      clear() {
        let t = this._first
        for (; t !== F.Undefined; ) {
          const n = t.next
          ;(t.prev = F.Undefined), (t.next = F.Undefined), (t = n)
        }
        ;(this._first = F.Undefined), (this._last = F.Undefined), (this._size = 0)
      }
      unshift(t) {
        return this._insert(t, !1)
      }
      push(t) {
        return this._insert(t, !0)
      }
      _insert(t, n) {
        const r = new F(t)
        if (this._first === F.Undefined) (this._first = r), (this._last = r)
        else if (n) {
          const i = this._last
          ;(this._last = r), (r.prev = i), (i.next = r)
        } else {
          const i = this._first
          ;(this._first = r), (r.next = i), (i.prev = r)
        }
        this._size += 1
        let s = !1
        return () => {
          s || ((s = !0), this._remove(r))
        }
      }
      shift() {
        if (this._first !== F.Undefined) {
          const t = this._first.element
          return this._remove(this._first), t
        }
      }
      pop() {
        if (this._last !== F.Undefined) {
          const t = this._last.element
          return this._remove(this._last), t
        }
      }
      _remove(t) {
        if (t.prev !== F.Undefined && t.next !== F.Undefined) {
          const n = t.prev
          ;(n.next = t.next), (t.next.prev = n)
        } else
          t.prev === F.Undefined && t.next === F.Undefined
            ? ((this._first = F.Undefined), (this._last = F.Undefined))
            : t.next === F.Undefined
              ? ((this._last = this._last.prev), (this._last.next = F.Undefined))
              : t.prev === F.Undefined && ((this._first = this._first.next), (this._first.prev = F.Undefined))
        this._size -= 1
      }
      *[Symbol.iterator]() {
        let t = this._first
        for (; t !== F.Undefined; ) yield t.element, (t = t.next)
      }
    }
    var _1 = function (e, t, n, r) {
      function s(i) {
        return i instanceof n
          ? i
          : new n(function (l) {
              l(i)
            })
      }
      return new (n || (n = Promise))(function (i, l) {
        function a(h) {
          try {
            u(r.next(h))
          } catch (f) {
            l(f)
          }
        }
        function c(h) {
          try {
            u(r.throw(h))
          } catch (f) {
            l(f)
          }
        }
        function u(h) {
          h.done ? i(h.value) : s(h.value).then(a, c)
        }
        u((r = r.apply(e, t || [])).next())
      })
    }
    let p1 = typeof document != 'undefined' && document.location && document.location.hash.indexOf('pseudo=true') >= 0
    const Ar = 'i-default'
    function x1(e, t) {
      let n
      return (
        t.length === 0
          ? (n = e)
          : (n = e.replace(/\{(\d+)\}/g, (r, s) => {
              const i = s[0],
                l = t[i]
              let a = r
              return (
                typeof l == 'string'
                  ? (a = l)
                  : (typeof l == 'number' || typeof l == 'boolean' || l === void 0 || l === null) && (a = String(l)),
                a
              )
            })),
        p1 && (n = '\uFF3B' + n.replace(/[aouei]/g, '$&$&') + '\uFF3D'),
        n
      )
    }
    function yr(e, t) {
      let n = e[t]
      return n || ((n = e['*']), n) ? n : null
    }
    function Et(e) {
      return e.charAt(e.length - 1) === '/' ? e : e + '/'
    }
    function L1(e, t, n) {
      return _1(this, void 0, void 0, function* () {
        const r = Et(e) + Et(t) + 'vscode/' + Et(n),
          s = yield fetch(r)
        if (s.ok) return yield s.json()
        throw new Error(`${s.status} - ${s.statusText}`)
      })
    }
    function Mt(e) {
      return function (t, n) {
        const r = Array.prototype.slice.call(arguments, 2)
        return x1(e[t], r)
      }
    }
    function w1(e, t, ...n) {
      return x1(t, n)
    }
    function Xi(e) {}
    function Zi(e) {
      p1 = e
    }
    function Ji(e, t) {
      var n
      return {
        localize: Mt(t[e]),
        getConfiguredDefaultLocale: (n = t.getConfiguredDefaultLocale) !== null && n !== void 0 ? n : (r) => {},
      }
    }
    function Ki(e, t, n, r) {
      var s
      const i = (s = r['vs/nls']) !== null && s !== void 0 ? s : {}
      if (!e || e.length === 0)
        return n({
          localize: w1,
          getConfiguredDefaultLocale: () => {
            var h
            return (h = i.availableLanguages) === null || h === void 0 ? void 0 : h['*']
          },
        })
      const l = i.availableLanguages ? yr(i.availableLanguages, e) : null,
        a = l === null || l === Ar
      let c = '.nls'
      a || (c = c + '.' + l)
      const u = (h) => {
        Array.isArray(h) ? (h.localize = Mt(h)) : (h.localize = Mt(h[e])),
          (h.getConfiguredDefaultLocale = () => {
            var f
            return (f = i.availableLanguages) === null || f === void 0 ? void 0 : f['*']
          }),
          n(h)
      }
      typeof i.loadBundle == 'function'
        ? i.loadBundle(e, l, (h, f) => {
            h ? t([e + '.nls'], u) : u(f)
          })
        : i.translationServiceUrl && !a
          ? _1(this, void 0, void 0, function* () {
              var h
              try {
                const f = yield L1(i.translationServiceUrl, l, e)
                return u(f)
              } catch (f) {
                if (!l.includes('-')) return console.error(f), t([e + '.nls'], u)
                try {
                  const d = l.split('-')[0],
                    m = yield L1(i.translationServiceUrl, d, e)
                  return (
                    ((h = i.availableLanguages) !== null && h !== void 0) || (i.availableLanguages = {}),
                    (i.availableLanguages['*'] = d),
                    u(m)
                  )
                } catch (d) {
                  return console.error(d), t([e + '.nls'], u)
                }
              }
            })
          : t([e + c], u, (h) => {
              if (c === '.nls') {
                console.error('Failed trying to load default language strings', h)
                return
              }
              console.error(
                `Failed to load message bundle for language ${l}. Falling back to the default language:`,
                h,
              ),
                t([e + '.nls'], u)
            })
    }
    var v1 = Re(224),
      Rt
    const ft = 'en'
    let je = !1,
      Qe = !1,
      ht = !1,
      Er = !1,
      Mr = !1,
      S1 = !1,
      Rr = !1,
      C1 = !1,
      kr = !1,
      Dr = !1,
      dt,
      kt = null,
      Fr = null,
      re
    const H = typeof self == 'object' ? self : typeof Re.g == 'object' ? Re.g : {}
    let z
    typeof H.vscode != 'undefined' && typeof H.vscode.process != 'undefined'
      ? (z = H.vscode.process)
      : typeof v1 != 'undefined' && (z = v1)
    const N1 =
        typeof ((Rt = z == null ? void 0 : z.versions) === null || Rt === void 0 ? void 0 : Rt.electron) == 'string',
      Pr = N1 && (z == null ? void 0 : z.type) === 'renderer'
    if (typeof navigator == 'object' && !Pr)
      (re = navigator.userAgent),
        (je = re.indexOf('Windows') >= 0),
        (Qe = re.indexOf('Macintosh') >= 0),
        (C1 =
          (re.indexOf('Macintosh') >= 0 || re.indexOf('iPad') >= 0 || re.indexOf('iPhone') >= 0) &&
          !!navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 0),
        (ht = re.indexOf('Linux') >= 0),
        (Dr = (re == null ? void 0 : re.indexOf('Mobi')) >= 0),
        (S1 = !0),
        (dt = (w1({ key: 'ensureLoaderPluginIsLoaded', comment: ['{Locked}'] }, '_'), void 0) || ft),
        (kt = dt)
    else if (typeof z == 'object') {
      ;(je = z.platform === 'win32'),
        (Qe = z.platform === 'darwin'),
        (ht = z.platform === 'linux'),
        (Er = ht && !!z.env.SNAP && !!z.env.SNAP_REVISION),
        (Rr = N1),
        (kr = !!z.env.CI || !!z.env.BUILD_ARTIFACTSTAGINGDIRECTORY),
        (dt = ft),
        (kt = ft)
      const e = z.env.VSCODE_NLS_CONFIG
      if (e)
        try {
          const t = JSON.parse(e),
            n = t.availableLanguages['*']
          ;(dt = t.locale), (kt = n || ft), (Fr = t._translationsConfigFile)
        } catch (t) {}
      Mr = !0
    } else console.error('Unable to resolve platform.')
    let Dt = 0
    Qe ? (Dt = 1) : je ? (Dt = 3) : ht && (Dt = 2)
    const Ye = je,
      Ir = Qe,
      e0 = null,
      t0 = null,
      n0 = null,
      r0 = S1 && typeof H.importScripts == 'function',
      s0 = null,
      i0 = null,
      le = re,
      o0 = null,
      Tr = typeof H.postMessage == 'function' && !H.importScripts,
      l0 = (() => {
        if (Tr) {
          const e = []
          H.addEventListener('message', (n) => {
            if (n.data && n.data.vscodeScheduleAsyncWork)
              for (let r = 0, s = e.length; r < s; r++) {
                const i = e[r]
                if (i.id === n.data.vscodeScheduleAsyncWork) {
                  e.splice(r, 1), i.callback()
                  return
                }
              }
          })
          let t = 0
          return (n) => {
            const r = ++t
            e.push({ id: r, callback: n }), H.postMessage({ vscodeScheduleAsyncWork: r }, '*')
          }
        }
        return (e) => setTimeout(e)
      })(),
      a0 = Qe || C1 ? 2 : je ? 1 : 3
    let A1 = !0,
      y1 = !1
    function u0() {
      if (!y1) {
        y1 = !0
        const e = new Uint8Array(2)
        ;(e[0] = 1), (e[1] = 2), (A1 = new Uint16Array(e.buffer)[0] === (2 << 8) + 1)
      }
      return A1
    }
    const Br = !!(le && le.indexOf('Chrome') >= 0),
      c0 = !!(le && le.indexOf('Firefox') >= 0),
      f0 = !!(!Br && le && le.indexOf('Safari') >= 0),
      h0 = !!(le && le.indexOf('Edg/') >= 0),
      d0 = !!(le && le.indexOf('Android') >= 0),
      Vr = H.performance && typeof H.performance.now == 'function'
    class mt {
      static create(t = !0) {
        return new mt(t)
      }
      constructor(t) {
        ;(this._highResolution = Vr && t), (this._startTime = this._now()), (this._stopTime = -1)
      }
      stop() {
        this._stopTime = this._now()
      }
      elapsed() {
        return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime
      }
      _now() {
        return this._highResolution ? H.performance.now() : Date.now()
      }
    }
    const E1 = !1,
      Ur = !1
    var gt
    ;(function (e) {
      e.None = () => Ie.None
      function t(v) {
        if (Ur) {
          const { onDidAddListener: x } = v,
            p = Xe.create()
          let g = 0
          v.onDidAddListener = () => {
            ++g === 2 &&
              (console.warn(
                'snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here',
              ),
              p.print()),
              x == null || x()
          }
        }
      }
      function n(v, x) {
        return f(v, () => {}, 0, void 0, !0, void 0, x)
      }
      e.defer = n
      function r(v) {
        return (x, p = null, g) => {
          let A = !1,
            M
          return (
            (M = v(
              (T) => {
                if (!A) return M ? M.dispose() : (A = !0), x.call(p, T)
              },
              null,
              g,
            )),
            A && M.dispose(),
            M
          )
        }
      }
      e.once = r
      function s(v, x, p) {
        return h((g, A = null, M) => v((T) => g.call(A, x(T)), null, M), p)
      }
      e.map = s
      function i(v, x, p) {
        return h(
          (g, A = null, M) =>
            v(
              (T) => {
                x(T), g.call(A, T)
              },
              null,
              M,
            ),
          p,
        )
      }
      e.forEach = i
      function l(v, x, p) {
        return h((g, A = null, M) => v((T) => x(T) && g.call(A, T), null, M), p)
      }
      e.filter = l
      function a(v) {
        return v
      }
      e.signal = a
      function c(...v) {
        return (x, p = null, g) => Cr(...v.map((A) => A((M) => x.call(p, M), null, g)))
      }
      e.any = c
      function u(v, x, p, g) {
        let A = p
        return s(v, (M) => ((A = x(A, M)), A), g)
      }
      e.reduce = u
      function h(v, x) {
        let p
        const g = {
          onWillAddFirstListener() {
            p = v(A.fire, A)
          },
          onDidRemoveLastListener() {
            p == null || p.dispose()
          },
        }
        x || t(g)
        const A = new ee(g)
        return x == null || x.add(A), A.event
      }
      function f(v, x, p = 100, g = !1, A = !1, M, T) {
        let K,
          He,
          ze,
          Ct = 0,
          Me
        const wr = {
          leakWarningThreshold: M,
          onWillAddFirstListener() {
            K = v((Wi) => {
              Ct++,
                (He = x(He, Wi)),
                g && !ze && (Nt.fire(He), (He = void 0)),
                (Me = () => {
                  const Oi = He
                  ;(He = void 0), (ze = void 0), (!g || Ct > 1) && Nt.fire(Oi), (Ct = 0)
                }),
                typeof p == 'number'
                  ? (clearTimeout(ze), (ze = setTimeout(Me, p)))
                  : ze === void 0 && ((ze = 0), queueMicrotask(Me))
            })
          },
          onWillRemoveListener() {
            A && Ct > 0 && (Me == null || Me())
          },
          onDidRemoveLastListener() {
            ;(Me = void 0), K.dispose()
          },
        }
        T || t(wr)
        const Nt = new ee(wr)
        return T == null || T.add(Nt), Nt.event
      }
      e.debounce = f
      function d(v, x = 0, p) {
        return e.debounce(v, (g, A) => (g ? (g.push(A), g) : [A]), x, void 0, !0, void 0, p)
      }
      e.accumulate = d
      function m(v, x = (g, A) => g === A, p) {
        let g = !0,
          A
        return l(
          v,
          (M) => {
            const T = g || !x(M, A)
            return (g = !1), (A = M), T
          },
          p,
        )
      }
      e.latch = m
      function b(v, x, p) {
        return [e.filter(v, x, p), e.filter(v, (g) => !x(g), p)]
      }
      e.split = b
      function C(v, x = !1, p = []) {
        let g = p.slice(),
          A = v((K) => {
            g ? g.push(K) : T.fire(K)
          })
        const M = () => {
            g == null || g.forEach((K) => T.fire(K)), (g = null)
          },
          T = new ee({
            onWillAddFirstListener() {
              A || (A = v((K) => T.fire(K)))
            },
            onDidAddFirstListener() {
              g && (x ? setTimeout(M) : M())
            },
            onDidRemoveLastListener() {
              A && A.dispose(), (A = null)
            },
          })
        return T.event
      }
      e.buffer = C
      class w {
        constructor(x) {
          ;(this.event = x), (this.disposables = new Ae())
        }
        map(x) {
          return new w(s(this.event, x, this.disposables))
        }
        forEach(x) {
          return new w(i(this.event, x, this.disposables))
        }
        filter(x) {
          return new w(l(this.event, x, this.disposables))
        }
        reduce(x, p) {
          return new w(u(this.event, x, p, this.disposables))
        }
        latch() {
          return new w(m(this.event, void 0, this.disposables))
        }
        debounce(x, p = 100, g = !1, A = !1, M) {
          return new w(f(this.event, x, p, g, A, M, this.disposables))
        }
        on(x, p, g) {
          return this.event(x, p, g)
        }
        once(x, p, g) {
          return r(this.event)(x, p, g)
        }
        dispose() {
          this.disposables.dispose()
        }
      }
      function _(v) {
        return new w(v)
      }
      e.chain = _
      function S(v, x, p = (g) => g) {
        const g = (...K) => T.fire(p(...K)),
          A = () => v.on(x, g),
          M = () => v.removeListener(x, g),
          T = new ee({ onWillAddFirstListener: A, onDidRemoveLastListener: M })
        return T.event
      }
      e.fromNodeEventEmitter = S
      function L(v, x, p = (g) => g) {
        const g = (...K) => T.fire(p(...K)),
          A = () => v.addEventListener(x, g),
          M = () => v.removeEventListener(x, g),
          T = new ee({ onWillAddFirstListener: A, onDidRemoveLastListener: M })
        return T.event
      }
      e.fromDOMEventEmitter = L
      function D(v) {
        return new Promise((x) => r(v)(x))
      }
      e.toPromise = D
      function R(v, x) {
        return x(void 0), v((p) => x(p))
      }
      e.runAndSubscribe = R
      function J(v, x) {
        let p = null
        function g(M) {
          p == null || p.dispose(), (p = new Ae()), x(M, p)
        }
        g(void 0)
        const A = v((M) => g(M))
        return ut(() => {
          A.dispose(), p == null || p.dispose()
        })
      }
      e.runAndSubscribeWithStore = J
      class q {
        constructor(x, p) {
          ;(this.obs = x), (this._counter = 0), (this._hasChanged = !1)
          const g = {
            onWillAddFirstListener: () => {
              x.addObserver(this)
            },
            onDidRemoveLastListener: () => {
              x.removeObserver(this)
            },
          }
          p || t(g), (this.emitter = new ee(g)), p && p.add(this.emitter)
        }
        beginUpdate(x) {
          this._counter++
        }
        handleChange(x, p) {
          this._hasChanged = !0
        }
        endUpdate(x) {
          --this._counter === 0 && this._hasChanged && ((this._hasChanged = !1), this.emitter.fire(this.obs.get()))
        }
      }
      function E(v, x) {
        return new q(v, x).emitter.event
      }
      e.fromObservable = E
    })(gt || (gt = {}))
    class Te {
      constructor(t) {
        ;(this.listenerCount = 0),
          (this.invocationCount = 0),
          (this.elapsedOverall = 0),
          (this.durations = []),
          (this.name = `${t}_${Te._idPool++}`),
          Te.all.add(this)
      }
      start(t) {
        ;(this._stopWatch = new mt(!0)), (this.listenerCount = t)
      }
      stop() {
        if (this._stopWatch) {
          const t = this._stopWatch.elapsed()
          this.durations.push(t), (this.elapsedOverall += t), (this.invocationCount += 1), (this._stopWatch = void 0)
        }
      }
    }
    ;(Te.all = new Set()), (Te._idPool = 0)
    let M1 = -1
    class qr {
      constructor(t, n = Math.random().toString(18).slice(2, 5)) {
        ;(this.threshold = t), (this.name = n), (this._warnCountdown = 0)
      }
      dispose() {
        var t
        ;(t = this._stacks) === null || t === void 0 || t.clear()
      }
      check(t, n) {
        const r = this.threshold
        if (r <= 0 || n < r) return
        this._stacks || (this._stacks = new Map())
        const s = this._stacks.get(t.value) || 0
        if ((this._stacks.set(t.value, s + 1), (this._warnCountdown -= 1), this._warnCountdown <= 0)) {
          this._warnCountdown = r * 0.5
          let i,
            l = 0
          for (const [a, c] of this._stacks) (!i || l < c) && ((i = a), (l = c))
          console.warn(
            `[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${l}):`,
          ),
            console.warn(i)
        }
        return () => {
          const i = this._stacks.get(t.value) || 0
          this._stacks.set(t.value, i - 1)
        }
      }
    }
    class Xe {
      static create() {
        var t
        return new Xe((t = new Error().stack) !== null && t !== void 0 ? t : '')
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
    class Wr {
      constructor(t, n, r) {
        ;(this.callback = t), (this.callbackThis = n), (this.stack = r), (this.subscription = new Nr())
      }
      invoke(t) {
        this.callback.call(this.callbackThis, t)
      }
    }
    class ee {
      constructor(t) {
        var n, r, s, i, l
        ;(this._disposed = !1),
          (this._options = t),
          (this._leakageMon =
            M1 > 0 || (!((n = this._options) === null || n === void 0) && n.leakWarningThreshold)
              ? new qr(
                  (s = (r = this._options) === null || r === void 0 ? void 0 : r.leakWarningThreshold) !== null &&
                  s !== void 0
                    ? s
                    : M1,
                )
              : void 0),
          (this._perfMon =
            !((i = this._options) === null || i === void 0) && i._profName ? new Te(this._options._profName) : void 0),
          (this._deliveryQueue = (l = this._options) === null || l === void 0 ? void 0 : l.deliveryQueue)
      }
      dispose() {
        var t, n, r, s
        if (!this._disposed) {
          if (((this._disposed = !0), this._listeners)) {
            if (E1) {
              const i = Array.from(this._listeners)
              queueMicrotask(() => {
                var l
                for (const a of i)
                  a.subscription.isset() &&
                    (a.subscription.unset(), (l = a.stack) === null || l === void 0 || l.print())
              })
            }
            this._listeners.clear()
          }
          ;(t = this._deliveryQueue) === null || t === void 0 || t.clear(this),
            (r = (n = this._options) === null || n === void 0 ? void 0 : n.onDidRemoveLastListener) === null ||
              r === void 0 ||
              r.call(n),
            (s = this._leakageMon) === null || s === void 0 || s.dispose()
        }
      }
      get event() {
        return (
          this._event ||
            (this._event = (t, n, r) => {
              var s, i, l
              if (
                (this._listeners || (this._listeners = new ct()),
                this._leakageMon && this._listeners.size > this._leakageMon.threshold * 3)
              )
                return (
                  console.warn(
                    `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far`,
                  ),
                  Ie.None
                )
              const a = this._listeners.isEmpty()
              a &&
                !((s = this._options) === null || s === void 0) &&
                s.onWillAddFirstListener &&
                this._options.onWillAddFirstListener(this)
              let c, u
              this._leakageMon &&
                this._listeners.size >= Math.ceil(this._leakageMon.threshold * 0.2) &&
                ((u = Xe.create()), (c = this._leakageMon.check(u, this._listeners.size + 1))),
                E1 && (u = u != null ? u : Xe.create())
              const h = new Wr(t, n, u),
                f = this._listeners.push(h)
              a &&
                !((i = this._options) === null || i === void 0) &&
                i.onDidAddFirstListener &&
                this._options.onDidAddFirstListener(this),
                !((l = this._options) === null || l === void 0) &&
                  l.onDidAddListener &&
                  this._options.onDidAddListener(this, t, n)
              const d = h.subscription.set(() => {
                var m, b
                c == null || c(),
                  this._disposed ||
                    ((b = (m = this._options) === null || m === void 0 ? void 0 : m.onWillRemoveListener) === null ||
                      b === void 0 ||
                      b.call(m, this),
                    f(),
                    this._options &&
                      this._options.onDidRemoveLastListener &&
                      ((this._listeners && !this._listeners.isEmpty()) || this._options.onDidRemoveLastListener(this)))
              })
              return r instanceof Ae ? r.add(d) : Array.isArray(r) && r.push(d), d
            }),
          this._event
        )
      }
      fire(t) {
        var n, r
        if (this._listeners) {
          this._deliveryQueue || (this._deliveryQueue = new Hr())
          for (const s of this._listeners) this._deliveryQueue.push(this, s, t)
          ;(n = this._perfMon) === null || n === void 0 || n.start(this._deliveryQueue.size),
            this._deliveryQueue.deliver(),
            (r = this._perfMon) === null || r === void 0 || r.stop()
        }
      }
      hasListeners() {
        return this._listeners ? !this._listeners.isEmpty() : !1
      }
    }
    class Or {
      constructor() {
        this._queue = new ct()
      }
      get size() {
        return this._queue.size
      }
      push(t, n, r) {
        this._queue.push(new zr(t, n, r))
      }
      clear(t) {
        const n = new ct()
        for (const r of this._queue) r.emitter !== t && n.push(r)
        this._queue = n
      }
      deliver() {
        for (; this._queue.size > 0; ) {
          const t = this._queue.shift()
          try {
            t.listener.invoke(t.event)
          } catch (n) {
            O(n)
          }
        }
      }
    }
    class Hr extends Or {
      clear(t) {
        this._queue.clear()
      }
    }
    class zr {
      constructor(t, n, r) {
        ;(this.emitter = t), (this.listener = n), (this.event = r)
      }
    }
    class m0 extends null {
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
    class g0 extends null {
      constructor(t) {
        var n
        super(t), (this._delay = (n = t.delay) !== null && n !== void 0 ? n : 100)
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
    class b0 extends null {
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
                : this._queuedEvents.forEach((n) => super.fire(n)),
                (this._queuedEvents = [])
            }))
      }
    }
    class _0 {
      constructor() {
        ;(this.hasListeners = !1),
          (this.events = []),
          (this.emitter = new ee({
            onWillAddFirstListener: () => this.onFirstListenerAdd(),
            onDidRemoveLastListener: () => this.onLastListenerRemove(),
          }))
      }
      get event() {
        return this.emitter.event
      }
      add(t) {
        const n = { event: t, listener: null }
        this.events.push(n), this.hasListeners && this.hook(n)
        const r = () => {
          this.hasListeners && this.unhook(n)
          const s = this.events.indexOf(n)
          this.events.splice(s, 1)
        }
        return toDisposable(onceFn(r))
      }
      onFirstListenerAdd() {
        ;(this.hasListeners = !0), this.events.forEach((t) => this.hook(t))
      }
      onLastListenerRemove() {
        ;(this.hasListeners = !1), this.events.forEach((t) => this.unhook(t))
      }
      hook(t) {
        t.listener = t.event((n) => this.emitter.fire(n))
      }
      unhook(t) {
        t.listener && t.listener.dispose(), (t.listener = null)
      }
      dispose() {
        this.emitter.dispose()
      }
    }
    class p0 {
      constructor() {
        this.buffers = []
      }
      wrapEvent(t) {
        return (n, r, s) =>
          t(
            (i) => {
              const l = this.buffers[this.buffers.length - 1]
              l ? l.push(() => n.call(r, i)) : n.call(r, i)
            },
            void 0,
            s,
          )
      }
      bufferEvents(t) {
        const n = []
        this.buffers.push(n)
        const r = t()
        return this.buffers.pop(), n.forEach((s) => s()), r
      }
    }
    class x0 {
      constructor() {
        ;(this.listening = !1),
          (this.inputEvent = gt.None),
          (this.inputEventListener = Disposable.None),
          (this.emitter = new ee({
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
    function $r(e) {
      if (!e || typeof e != 'object' || e instanceof RegExp) return e
      const t = Array.isArray(e) ? [] : {}
      return (
        Object.entries(e).forEach(([n, r]) => {
          t[n] = r && typeof r == 'object' ? $r(r) : r
        }),
        t
      )
    }
    function L0(e) {
      if (!e || typeof e != 'object') return e
      const t = [e]
      for (; t.length > 0; ) {
        const n = t.shift()
        Object.freeze(n)
        for (const r in n)
          if (R1.call(n, r)) {
            const s = n[r]
            typeof s == 'object' && !Object.isFrozen(s) && !isTypedArray(s) && t.push(s)
          }
      }
      return e
    }
    const R1 = Object.prototype.hasOwnProperty
    function w0(e, t) {
      return Ft(e, t, new Set())
    }
    function Ft(e, t, n) {
      if (isUndefinedOrNull(e)) return e
      const r = t(e)
      if (typeof r != 'undefined') return r
      if (Array.isArray(e)) {
        const s = []
        for (const i of e) s.push(Ft(i, t, n))
        return s
      }
      if (isObject(e)) {
        if (n.has(e)) throw new Error('Cannot clone recursive data-structure')
        n.add(e)
        const s = {}
        for (const i in e) R1.call(e, i) && (s[i] = Ft(e[i], t, n))
        return n.delete(e), s
      }
      return e
    }
    function Gr(e, t, n = !0) {
      return isObject(e)
        ? (isObject(t) &&
            Object.keys(t).forEach((r) => {
              r in e ? n && (isObject(e[r]) && isObject(t[r]) ? Gr(e[r], t[r], n) : (e[r] = t[r])) : (e[r] = t[r])
            }),
          e)
        : t
    }
    function Pt(e, t) {
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
      let n, r
      if (Array.isArray(e)) {
        if (e.length !== t.length) return !1
        for (n = 0; n < e.length; n++) if (!Pt(e[n], t[n])) return !1
      } else {
        const s = []
        for (r in e) s.push(r)
        s.sort()
        const i = []
        for (r in t) i.push(r)
        if ((i.sort(), !Pt(s, i))) return !1
        for (n = 0; n < s.length; n++) if (!Pt(e[s[n]], t[s[n]])) return !1
      }
      return !0
    }
    function jr(e) {
      let t = [],
        n = Object.getPrototypeOf(e)
      for (; Object.prototype !== n; ) (t = t.concat(Object.getOwnPropertyNames(n))), (n = Object.getPrototypeOf(n))
      return t
    }
    function It(e) {
      const t = []
      for (const n of jr(e)) typeof e[n] == 'function' && t.push(n)
      return t
    }
    function Qr(e, t) {
      const n = (s) =>
          function () {
            const i = Array.prototype.slice.call(arguments, 0)
            return t(s, i)
          },
        r = {}
      for (const s of e) r[s] = n(s)
      return r
    }
    class Yr {
      constructor(t) {
        ;(this.fn = t), (this.lastCache = void 0), (this.lastArgKey = void 0)
      }
      get(t) {
        const n = JSON.stringify(t)
        return this.lastArgKey !== n && ((this.lastArgKey = n), (this.lastCache = this.fn(t))), this.lastCache
      }
    }
    class v0 {
      get cachedValues() {
        return this._map
      }
      constructor(t) {
        ;(this.fn = t), (this._map = new Map())
      }
      get(t) {
        if (this._map.has(t)) return this._map.get(t)
        const n = this.fn(t)
        return this._map.set(t, n), n
      }
    }
    class k1 {
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
    var D1
    function S0(e) {
      return !e || typeof e != 'string' ? !0 : e.trim().length === 0
    }
    const Xr = /{(\d+)}/g
    function C0(e, ...t) {
      return t.length === 0
        ? e
        : e.replace(Xr, function (n, r) {
            const s = parseInt(r, 10)
            return isNaN(s) || s < 0 || s >= t.length ? n : t[s]
          })
    }
    function N0(e) {
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
    function F1(e) {
      return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&')
    }
    function A0(e, t = ' ') {
      const n = Zr(e, t)
      return Jr(n, t)
    }
    function Zr(e, t) {
      if (!e || !t) return e
      const n = t.length
      if (n === 0 || e.length === 0) return e
      let r = 0
      for (; e.indexOf(t, r) === r; ) r = r + n
      return e.substring(r)
    }
    function Jr(e, t) {
      if (!e || !t) return e
      const n = t.length,
        r = e.length
      if (n === 0 || r === 0) return e
      let s = r,
        i = -1
      for (; (i = e.lastIndexOf(t, s - 1)), !(i === -1 || i + n !== s); ) {
        if (i === 0) return ''
        s = i
      }
      return e.substring(0, s)
    }
    function y0(e) {
      return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*')
    }
    function E0(e) {
      return e.replace(/\*/g, '')
    }
    function M0(e, t, n = {}) {
      if (!e) throw new Error('Cannot create regex from empty string')
      t || (e = F1(e)),
        n.wholeWord && (/\B/.test(e.charAt(0)) || (e = '\\b' + e), /\B/.test(e.charAt(e.length - 1)) || (e = e + '\\b'))
      let r = ''
      return (
        n.global && (r += 'g'),
        n.matchCase || (r += 'i'),
        n.multiline && (r += 'm'),
        n.unicode && (r += 'u'),
        new RegExp(e, r)
      )
    }
    function R0(e) {
      return e.source === '^' || e.source === '^$' || e.source === '$' || e.source === '^\\s*$'
        ? !1
        : !!(e.exec('') && e.lastIndex === 0)
    }
    function k0(e) {
      return (e.global ? 'g' : '') + (e.ignoreCase ? 'i' : '') + (e.multiline ? 'm' : '') + (e.unicode ? 'u' : '')
    }
    function Kr(e) {
      return e.split(/\r\n|\r|\n/)
    }
    function es(e) {
      for (let t = 0, n = e.length; t < n; t++) {
        const r = e.charCodeAt(t)
        if (r !== 32 && r !== 9) return t
      }
      return -1
    }
    function D0(e, t = 0, n = e.length) {
      for (let r = t; r < n; r++) {
        const s = e.charCodeAt(r)
        if (s !== 32 && s !== 9) return e.substring(t, r)
      }
      return e.substring(t, n)
    }
    function ts(e, t = e.length - 1) {
      for (let n = t; n >= 0; n--) {
        const r = e.charCodeAt(n)
        if (r !== 32 && r !== 9) return n
      }
      return -1
    }
    function F0(e, t) {
      return e < t ? -1 : e > t ? 1 : 0
    }
    function ns(e, t, n = 0, r = e.length, s = 0, i = t.length) {
      for (; n < r && s < i; n++, s++) {
        const c = e.charCodeAt(n),
          u = t.charCodeAt(s)
        if (c < u) return -1
        if (c > u) return 1
      }
      const l = r - n,
        a = i - s
      return l < a ? -1 : l > a ? 1 : 0
    }
    function P0(e, t) {
      return Tt(e, t, 0, e.length, 0, t.length)
    }
    function Tt(e, t, n = 0, r = e.length, s = 0, i = t.length) {
      for (; n < r && s < i; n++, s++) {
        let c = e.charCodeAt(n),
          u = t.charCodeAt(s)
        if (c === u) continue
        if (c >= 128 || u >= 128) return ns(e.toLowerCase(), t.toLowerCase(), n, r, s, i)
        P1(c) && (c -= 32), P1(u) && (u -= 32)
        const h = c - u
        if (h !== 0) return h
      }
      const l = r - n,
        a = i - s
      return l < a ? -1 : l > a ? 1 : 0
    }
    function I0(e) {
      return e >= 48 && e <= 57
    }
    function P1(e) {
      return e >= 97 && e <= 122
    }
    function I1(e) {
      return e >= 65 && e <= 90
    }
    function T0(e, t) {
      return e.length === t.length && Tt(e, t) === 0
    }
    function B0(e, t) {
      const n = t.length
      return t.length > e.length ? !1 : Tt(e, t, 0, n) === 0
    }
    function V0(e, t) {
      const n = Math.min(e.length, t.length)
      let r
      for (r = 0; r < n; r++) if (e.charCodeAt(r) !== t.charCodeAt(r)) return r
      return n
    }
    function U0(e, t) {
      const n = Math.min(e.length, t.length)
      let r
      const s = e.length - 1,
        i = t.length - 1
      for (r = 0; r < n; r++) if (e.charCodeAt(s - r) !== t.charCodeAt(i - r)) return r
      return n
    }
    function Ze(e) {
      return 55296 <= e && e <= 56319
    }
    function Je(e) {
      return 56320 <= e && e <= 57343
    }
    function Bt(e, t) {
      return ((e - 55296) << 10) + (t - 56320) + 65536
    }
    function T1(e, t, n) {
      const r = e.charCodeAt(n)
      if (Ze(r) && n + 1 < t) {
        const s = e.charCodeAt(n + 1)
        if (Je(s)) return Bt(r, s)
      }
      return r
    }
    function rs(e, t) {
      const n = e.charCodeAt(t - 1)
      if (Je(n) && t > 1) {
        const r = e.charCodeAt(t - 2)
        if (Ze(r)) return Bt(r, n)
      }
      return n
    }
    class Vt {
      get offset() {
        return this._offset
      }
      constructor(t, n = 0) {
        ;(this._str = t), (this._len = t.length), (this._offset = n)
      }
      setOffset(t) {
        this._offset = t
      }
      prevCodePoint() {
        const t = rs(this._str, this._offset)
        return (this._offset -= t >= 65536 ? 2 : 1), t
      }
      nextCodePoint() {
        const t = T1(this._str, this._len, this._offset)
        return (this._offset += t >= 65536 ? 2 : 1), t
      }
      eol() {
        return this._offset >= this._len
      }
    }
    class B1 {
      get offset() {
        return this._iterator.offset
      }
      constructor(t, n = 0) {
        this._iterator = new Vt(t, n)
      }
      nextGraphemeLength() {
        const t = be.getInstance(),
          n = this._iterator,
          r = n.offset
        let s = t.getGraphemeBreakType(n.nextCodePoint())
        for (; !n.eol(); ) {
          const i = n.offset,
            l = t.getGraphemeBreakType(n.nextCodePoint())
          if (V1(s, l)) {
            n.setOffset(i)
            break
          }
          s = l
        }
        return n.offset - r
      }
      prevGraphemeLength() {
        const t = be.getInstance(),
          n = this._iterator,
          r = n.offset
        let s = t.getGraphemeBreakType(n.prevCodePoint())
        for (; n.offset > 0; ) {
          const i = n.offset,
            l = t.getGraphemeBreakType(n.prevCodePoint())
          if (V1(l, s)) {
            n.setOffset(i)
            break
          }
          s = l
        }
        return r - n.offset
      }
      eol() {
        return this._iterator.eol()
      }
    }
    function ss(e, t) {
      return new B1(e, t).nextGraphemeLength()
    }
    function is(e, t) {
      return new B1(e, t).prevGraphemeLength()
    }
    function q0(e, t) {
      t > 0 && Je(e.charCodeAt(t)) && t--
      const n = t + ss(e, t)
      return [n - is(e, n), n]
    }
    let Ut = null
    function os() {
      return /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u088E\u08A0-\u08C9\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDC7\uFDF0-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE35\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDD23\uDE80-\uDEA9\uDEAD-\uDF45\uDF51-\uDF81\uDF86-\uDFF6]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD4B-\uDFFF]|\uD83B[\uDC00-\uDEBB])/
    }
    function W0(e) {
      return Ut || (Ut = os()), Ut.test(e)
    }
    const ls = /^[\t\n\r\x20-\x7E]*$/
    function as(e) {
      return ls.test(e)
    }
    const us = /[\u2028\u2029]/
    function O0(e) {
      return us.test(e)
    }
    function H0(e) {
      return (e >= 11904 && e <= 55215) || (e >= 63744 && e <= 64255) || (e >= 65281 && e <= 65374)
    }
    function cs(e) {
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
    const z0 = String.fromCharCode(65279)
    function $0(e) {
      return !!(e && e.length > 0 && e.charCodeAt(0) === 65279)
    }
    function G0(e, t = !1) {
      return e ? (t && (e = e.replace(/\\./g, '')), e.toLowerCase() !== e) : !1
    }
    function j0(e) {
      return (e = e % (2 * 26)), e < 26 ? String.fromCharCode(97 + e) : String.fromCharCode(65 + e - 26)
    }
    function V1(e, t) {
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
    class be {
      static getInstance() {
        return be._INSTANCE || (be._INSTANCE = new be()), be._INSTANCE
      }
      constructor() {
        this._data = fs()
      }
      getGraphemeBreakType(t) {
        if (t < 32) return t === 10 ? 3 : t === 13 ? 2 : 4
        if (t < 127) return 0
        const n = this._data,
          r = n.length / 3
        let s = 1
        for (; s <= r; )
          if (t < n[3 * s]) s = 2 * s
          else if (t > n[3 * s + 1]) s = 2 * s + 1
          else return n[3 * s + 2]
        return 0
      }
    }
    be._INSTANCE = null
    function fs() {
      return JSON.parse(
        '[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]',
      )
    }
    function Q0(e, t) {
      if (e === 0) return 0
      const n = hs(e, t)
      if (n !== void 0) return n
      const r = new Vt(t, e)
      return r.prevCodePoint(), r.offset
    }
    function hs(e, t) {
      const n = new Vt(t, e)
      let r = n.prevCodePoint()
      for (; ds(r) || r === 65039 || r === 8419; ) {
        if (n.offset === 0) return
        r = n.prevCodePoint()
      }
      if (!cs(r)) return
      let s = n.offset
      return s > 0 && n.prevCodePoint() === 8205 && (s = n.offset), s
    }
    function ds(e) {
      return 127995 <= e && e <= 127999
    }
    const Y0 = '\xA0'
    class te {
      static getInstance(t) {
        return te.cache.get(Array.from(t))
      }
      static getLocales() {
        return te._locales.value
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
    ;(D1 = te),
      (te.ambiguousCharacterData = new k1(() =>
        JSON.parse(
          '{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}',
        ),
      )),
      (te.cache = new Yr((e) => {
        function t(u) {
          const h = new Map()
          for (let f = 0; f < u.length; f += 2) h.set(u[f], u[f + 1])
          return h
        }
        function n(u, h) {
          const f = new Map(u)
          for (const [d, m] of h) f.set(d, m)
          return f
        }
        function r(u, h) {
          if (!u) return h
          const f = new Map()
          for (const [d, m] of u) h.has(d) && f.set(d, m)
          return f
        }
        const s = D1.ambiguousCharacterData.value
        let i = e.filter((u) => !u.startsWith('_') && u in s)
        i.length === 0 && (i = ['_default'])
        let l
        for (const u of i) {
          const h = t(s[u])
          l = r(l, h)
        }
        const a = t(s._common),
          c = n(a, l)
        return new te(c)
      })),
      (te._locales = new k1(() => Object.keys(te.ambiguousCharacterData.value).filter((e) => !e.startsWith('_'))))
    class _e {
      static getRawData() {
        return JSON.parse(
          '[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]',
        )
      }
      static getData() {
        return this._data || (this._data = new Set(_e.getRawData())), this._data
      }
      static isInvisibleCharacter(t) {
        return _e.getData().has(t)
      }
      static get codePoints() {
        return _e.getData()
      }
    }
    _e._data = void 0
    const U1 = '$initialize'
    let q1 = !1
    function X0(e) {
      isWeb &&
        (q1 ||
          ((q1 = !0),
          console.warn(
            'Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq',
          )),
        console.warn(e.message))
    }
    class ms {
      constructor(t, n, r, s) {
        ;(this.vsWorker = t), (this.req = n), (this.method = r), (this.args = s), (this.type = 0)
      }
    }
    class W1 {
      constructor(t, n, r, s) {
        ;(this.vsWorker = t), (this.seq = n), (this.res = r), (this.err = s), (this.type = 1)
      }
    }
    class gs {
      constructor(t, n, r, s) {
        ;(this.vsWorker = t), (this.req = n), (this.eventName = r), (this.arg = s), (this.type = 2)
      }
    }
    class bs {
      constructor(t, n, r) {
        ;(this.vsWorker = t), (this.req = n), (this.event = r), (this.type = 3)
      }
    }
    class _s {
      constructor(t, n) {
        ;(this.vsWorker = t), (this.req = n), (this.type = 4)
      }
    }
    class O1 {
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
      sendMessage(t, n) {
        const r = String(++this._lastSentReq)
        return new Promise((s, i) => {
          ;(this._pendingReplies[r] = { resolve: s, reject: i }), this._send(new ms(this._workerId, r, t, n))
        })
      }
      listen(t, n) {
        let r = null
        const s = new ee({
          onWillAddFirstListener: () => {
            ;(r = String(++this._lastSentReq)),
              this._pendingEmitters.set(r, s),
              this._send(new gs(this._workerId, r, t, n))
          },
          onDidRemoveLastListener: () => {
            this._pendingEmitters.delete(r), this._send(new _s(this._workerId, r)), (r = null)
          },
        })
        return s.event
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
        const n = this._pendingReplies[t.seq]
        if ((delete this._pendingReplies[t.seq], t.err)) {
          let r = t.err
          t.err.$isError &&
            ((r = new Error()), (r.name = t.err.name), (r.message = t.err.message), (r.stack = t.err.stack)),
            n.reject(r)
          return
        }
        n.resolve(t.res)
      }
      _handleRequestMessage(t) {
        const n = t.req
        this._handler.handleMessage(t.method, t.args).then(
          (s) => {
            this._send(new W1(this._workerId, n, s, void 0))
          },
          (s) => {
            s.detail instanceof Error && (s.detail = ke(s.detail)), this._send(new W1(this._workerId, n, void 0, ke(s)))
          },
        )
      }
      _handleSubscribeEventMessage(t) {
        const n = t.req,
          r = this._handler.handleEvent(
            t.eventName,
            t.arg,
          )((s) => {
            this._send(new bs(this._workerId, n, s))
          })
        this._pendingEvents.set(n, r)
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
        const n = []
        if (t.type === 0) for (let r = 0; r < t.args.length; r++) t.args[r] instanceof ArrayBuffer && n.push(t.args[r])
        else t.type === 1 && t.res instanceof ArrayBuffer && n.push(t.res)
        this._handler.sendMessage(t, n)
      }
    }
    class Z0 extends null {
      constructor(t, n, r) {
        super()
        let s = null
        ;(this._worker = this._register(
          t.create(
            'vs/base/common/worker/simpleWorker',
            (u) => {
              this._protocol.handleMessage(u)
            },
            (u) => {
              s == null || s(u)
            },
          ),
        )),
          (this._protocol = new O1({
            sendMessage: (u, h) => {
              this._worker.postMessage(u, h)
            },
            handleMessage: (u, h) => {
              if (typeof r[u] != 'function')
                return Promise.reject(new Error('Missing method ' + u + ' on main thread host.'))
              try {
                return Promise.resolve(r[u].apply(r, h))
              } catch (f) {
                return Promise.reject(f)
              }
            },
            handleEvent: (u, h) => {
              if (Wt(u)) {
                const f = r[u].call(r, h)
                if (typeof f != 'function') throw new Error(`Missing dynamic event ${u} on main thread host.`)
                return f
              }
              if (qt(u)) {
                const f = r[u]
                if (typeof f != 'function') throw new Error(`Missing event ${u} on main thread host.`)
                return f
              }
              throw new Error(`Malformed event name ${u}`)
            },
          })),
          this._protocol.setWorkerId(this._worker.getId())
        let i = null
        typeof globals.require != 'undefined' && typeof globals.require.getConfig == 'function'
          ? (i = globals.require.getConfig())
          : typeof globals.requirejs != 'undefined' && (i = globals.requirejs.s.contexts._.config)
        const l = getAllMethodNames(r)
        this._onModuleLoaded = this._protocol.sendMessage(U1, [
          this._worker.getId(),
          JSON.parse(JSON.stringify(i)),
          n,
          l,
        ])
        const a = (u, h) => this._request(u, h),
          c = (u, h) => this._protocol.listen(u, h)
        this._lazyProxy = new Promise((u, h) => {
          ;(s = h),
            this._onModuleLoaded.then(
              (f) => {
                u(H1(f, a, c))
              },
              (f) => {
                h(f), this._onError('Worker failed to load ' + n, f)
              },
            )
        })
      }
      getProxyObject() {
        return this._lazyProxy
      }
      _request(t, n) {
        return new Promise((r, s) => {
          this._onModuleLoaded.then(() => {
            this._protocol.sendMessage(t, n).then(r, s)
          }, s)
        })
      }
      _onError(t, n) {
        console.error(t), console.info(n)
      }
    }
    function qt(e) {
      return e[0] === 'o' && e[1] === 'n' && I1(e.charCodeAt(2))
    }
    function Wt(e) {
      return /^onDynamic/.test(e) && I1(e.charCodeAt(9))
    }
    function H1(e, t, n) {
      const r = (l) =>
          function () {
            const a = Array.prototype.slice.call(arguments, 0)
            return t(l, a)
          },
        s = (l) =>
          function (a) {
            return n(l, a)
          },
        i = {}
      for (const l of e) {
        if (Wt(l)) {
          i[l] = s(l)
          continue
        }
        if (qt(l)) {
          i[l] = n(l, void 0)
          continue
        }
        i[l] = r(l)
      }
      return i
    }
    class z1 {
      constructor(t, n) {
        ;(this._requestHandlerFactory = n),
          (this._requestHandler = null),
          (this._protocol = new O1({
            sendMessage: (r, s) => {
              t(r, s)
            },
            handleMessage: (r, s) => this._handleMessage(r, s),
            handleEvent: (r, s) => this._handleEvent(r, s),
          }))
      }
      onmessage(t) {
        this._protocol.handleMessage(t)
      }
      _handleMessage(t, n) {
        if (t === U1) return this.initialize(n[0], n[1], n[2], n[3])
        if (!this._requestHandler || typeof this._requestHandler[t] != 'function')
          return Promise.reject(new Error('Missing requestHandler or method: ' + t))
        try {
          return Promise.resolve(this._requestHandler[t].apply(this._requestHandler, n))
        } catch (r) {
          return Promise.reject(r)
        }
      }
      _handleEvent(t, n) {
        if (!this._requestHandler) throw new Error('Missing requestHandler')
        if (Wt(t)) {
          const r = this._requestHandler[t].call(this._requestHandler, n)
          if (typeof r != 'function') throw new Error(`Missing dynamic event ${t} on request handler.`)
          return r
        }
        if (qt(t)) {
          const r = this._requestHandler[t]
          if (typeof r != 'function') throw new Error(`Missing event ${t} on request handler.`)
          return r
        }
        throw new Error(`Malformed event name ${t}`)
      }
      initialize(t, n, r, s) {
        this._protocol.setWorkerId(t)
        const a = H1(
          s,
          (c, u) => this._protocol.sendMessage(c, u),
          (c, u) => this._protocol.listen(c, u),
        )
        return this._requestHandlerFactory
          ? ((this._requestHandler = this._requestHandlerFactory(a)), Promise.resolve(It(this._requestHandler)))
          : (n &&
              (typeof n.baseUrl != 'undefined' && delete n.baseUrl,
              typeof n.paths != 'undefined' && typeof n.paths.vs != 'undefined' && delete n.paths.vs,
              typeof n.trustedTypesPolicy !== void 0 && delete n.trustedTypesPolicy,
              (n.catchError = !0),
              H.require.config(n)),
            new Promise((c, u) => {
              const h = H.require
              h(
                [r],
                (f) => {
                  if (((this._requestHandler = f.create(a)), !this._requestHandler)) {
                    u(new Error('No RequestHandler!'))
                    return
                  }
                  c(It(this._requestHandler))
                },
                u,
              )
            }))
      }
    }
    function J0(e) {
      return new z1(e, null)
    }
    class pe {
      constructor(t, n, r, s) {
        ;(this.originalStart = t), (this.originalLength = n), (this.modifiedStart = r), (this.modifiedLength = s)
      }
      getOriginalEnd() {
        return this.originalStart + this.originalLength
      }
      getModifiedEnd() {
        return this.modifiedStart + this.modifiedLength
      }
    }
    function K0(e) {
      return Ot(e, 0)
    }
    function Ot(e, t) {
      switch (typeof e) {
        case 'object':
          return e === null ? ue(349, t) : Array.isArray(e) ? xs(e, t) : Ls(e, t)
        case 'string':
          return Ht(e, t)
        case 'boolean':
          return ps(e, t)
        case 'number':
          return ue(e, t)
        case 'undefined':
          return ue(937, t)
        default:
          return ue(617, t)
      }
    }
    function ue(e, t) {
      return ((t << 5) - t + e) | 0
    }
    function ps(e, t) {
      return ue(e ? 433 : 863, t)
    }
    function Ht(e, t) {
      t = ue(149417, t)
      for (let n = 0, r = e.length; n < r; n++) t = ue(e.charCodeAt(n), t)
      return t
    }
    function xs(e, t) {
      return (t = ue(104579, t)), e.reduce((n, r) => Ot(r, n), t)
    }
    function Ls(e, t) {
      return (
        (t = ue(181387, t)),
        Object.keys(e)
          .sort()
          .reduce((n, r) => ((n = Ht(r, n)), Ot(e[r], n)), t)
      )
    }
    function zt(e, t, n = 32) {
      const r = n - t,
        s = ~((1 << r) - 1)
      return ((e << t) | ((s & e) >>> r)) >>> 0
    }
    function $1(e, t = 0, n = e.byteLength, r = 0) {
      for (let s = 0; s < n; s++) e[t + s] = r
    }
    function ws(e, t, n = '0') {
      for (; e.length < t; ) e = n + e
      return e
    }
    function Ke(e, t = 32) {
      return e instanceof ArrayBuffer
        ? Array.from(new Uint8Array(e))
            .map((n) => n.toString(16).padStart(2, '0'))
            .join('')
        : ws((e >>> 0).toString(16), t / 4)
    }
    class $t {
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
        const n = t.length
        if (n === 0) return
        const r = this._buff
        let s = this._buffLen,
          i = this._leftoverHighSurrogate,
          l,
          a
        for (i !== 0 ? ((l = i), (a = -1), (i = 0)) : ((l = t.charCodeAt(0)), (a = 0)); ; ) {
          let c = l
          if (Ze(l))
            if (a + 1 < n) {
              const u = t.charCodeAt(a + 1)
              Je(u) ? (a++, (c = Bt(l, u))) : (c = 65533)
            } else {
              i = l
              break
            }
          else Je(l) && (c = 65533)
          if (((s = this._push(r, s, c)), a++, a < n)) l = t.charCodeAt(a)
          else break
        }
        ;(this._buffLen = s), (this._leftoverHighSurrogate = i)
      }
      _push(t, n, r) {
        return (
          r < 128
            ? (t[n++] = r)
            : r < 2048
              ? ((t[n++] = 192 | ((r & 1984) >>> 6)), (t[n++] = 128 | ((r & 63) >>> 0)))
              : r < 65536
                ? ((t[n++] = 224 | ((r & 61440) >>> 12)),
                  (t[n++] = 128 | ((r & 4032) >>> 6)),
                  (t[n++] = 128 | ((r & 63) >>> 0)))
                : ((t[n++] = 240 | ((r & 1835008) >>> 18)),
                  (t[n++] = 128 | ((r & 258048) >>> 12)),
                  (t[n++] = 128 | ((r & 4032) >>> 6)),
                  (t[n++] = 128 | ((r & 63) >>> 0))),
          n >= 64 &&
            (this._step(),
            (n -= 64),
            (this._totalLen += 64),
            (t[0] = t[64 + 0]),
            (t[1] = t[64 + 1]),
            (t[2] = t[64 + 2])),
          n
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
          Ke(this._h0) + Ke(this._h1) + Ke(this._h2) + Ke(this._h3) + Ke(this._h4)
        )
      }
      _wrapUp() {
        ;(this._buff[this._buffLen++] = 128),
          $1(this._buff, this._buffLen),
          this._buffLen > 56 && (this._step(), $1(this._buff))
        const t = 8 * this._totalLen
        this._buffDV.setUint32(56, Math.floor(t / 4294967296), !1),
          this._buffDV.setUint32(60, t % 4294967296, !1),
          this._step()
      }
      _step() {
        const t = $t._bigBlock32,
          n = this._buffDV
        for (let f = 0; f < 64; f += 4) t.setUint32(f, n.getUint32(f, !1), !1)
        for (let f = 64; f < 320; f += 4)
          t.setUint32(
            f,
            zt(
              t.getUint32(f - 12, !1) ^ t.getUint32(f - 32, !1) ^ t.getUint32(f - 56, !1) ^ t.getUint32(f - 64, !1),
              1,
            ),
            !1,
          )
        let r = this._h0,
          s = this._h1,
          i = this._h2,
          l = this._h3,
          a = this._h4,
          c,
          u,
          h
        for (let f = 0; f < 80; f++)
          f < 20
            ? ((c = (s & i) | (~s & l)), (u = 1518500249))
            : f < 40
              ? ((c = s ^ i ^ l), (u = 1859775393))
              : f < 60
                ? ((c = (s & i) | (s & l) | (i & l)), (u = 2400959708))
                : ((c = s ^ i ^ l), (u = 3395469782)),
            (h = (zt(r, 5) + c + a + u + t.getUint32(f * 4, !1)) & 4294967295),
            (a = l),
            (l = i),
            (i = zt(s, 30)),
            (s = r),
            (r = h)
        ;(this._h0 = (this._h0 + r) & 4294967295),
          (this._h1 = (this._h1 + s) & 4294967295),
          (this._h2 = (this._h2 + i) & 4294967295),
          (this._h3 = (this._h3 + l) & 4294967295),
          (this._h4 = (this._h4 + a) & 4294967295)
      }
    }
    $t._bigBlock32 = new DataView(new ArrayBuffer(320))
    class G1 {
      constructor(t) {
        this.source = t
      }
      getElements() {
        const t = this.source,
          n = new Int32Array(t.length)
        for (let r = 0, s = t.length; r < s; r++) n[r] = t.charCodeAt(r)
        return n
      }
    }
    function vs(e, t, n) {
      return new xe(new G1(e), new G1(t)).ComputeDiff(n).changes
    }
    class Be {
      static Assert(t, n) {
        if (!t) throw new Error(n)
      }
    }
    class Ve {
      static Copy(t, n, r, s, i) {
        for (let l = 0; l < i; l++) r[s + l] = t[n + l]
      }
      static Copy2(t, n, r, s, i) {
        for (let l = 0; l < i; l++) r[s + l] = t[n + l]
      }
    }
    class j1 {
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
            new pe(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount),
          ),
          (this.m_originalCount = 0),
          (this.m_modifiedCount = 0),
          (this.m_originalStart = 1073741824),
          (this.m_modifiedStart = 1073741824)
      }
      AddOriginalElement(t, n) {
        ;(this.m_originalStart = Math.min(this.m_originalStart, t)),
          (this.m_modifiedStart = Math.min(this.m_modifiedStart, n)),
          this.m_originalCount++
      }
      AddModifiedElement(t, n) {
        ;(this.m_originalStart = Math.min(this.m_originalStart, t)),
          (this.m_modifiedStart = Math.min(this.m_modifiedStart, n)),
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
    class xe {
      constructor(t, n, r = null) {
        ;(this.ContinueProcessingPredicate = r), (this._originalSequence = t), (this._modifiedSequence = n)
        const [s, i, l] = xe._getElements(t),
          [a, c, u] = xe._getElements(n)
        ;(this._hasStrings = l && u),
          (this._originalStringElements = s),
          (this._originalElementsOrHash = i),
          (this._modifiedStringElements = a),
          (this._modifiedElementsOrHash = c),
          (this.m_forwardHistory = []),
          (this.m_reverseHistory = [])
      }
      static _isStringArray(t) {
        return t.length > 0 && typeof t[0] == 'string'
      }
      static _getElements(t) {
        const n = t.getElements()
        if (xe._isStringArray(n)) {
          const r = new Int32Array(n.length)
          for (let s = 0, i = n.length; s < i; s++) r[s] = Ht(n[s], 0)
          return [n, r, !0]
        }
        return n instanceof Int32Array ? [[], n, !1] : [[], new Int32Array(n), !1]
      }
      ElementsAreEqual(t, n) {
        return this._originalElementsOrHash[t] !== this._modifiedElementsOrHash[n]
          ? !1
          : this._hasStrings
            ? this._originalStringElements[t] === this._modifiedStringElements[n]
            : !0
      }
      ElementsAreStrictEqual(t, n) {
        if (!this.ElementsAreEqual(t, n)) return !1
        const r = xe._getStrictElement(this._originalSequence, t),
          s = xe._getStrictElement(this._modifiedSequence, n)
        return r === s
      }
      static _getStrictElement(t, n) {
        return typeof t.getStrictElement == 'function' ? t.getStrictElement(n) : null
      }
      OriginalElementsAreEqual(t, n) {
        return this._originalElementsOrHash[t] !== this._originalElementsOrHash[n]
          ? !1
          : this._hasStrings
            ? this._originalStringElements[t] === this._originalStringElements[n]
            : !0
      }
      ModifiedElementsAreEqual(t, n) {
        return this._modifiedElementsOrHash[t] !== this._modifiedElementsOrHash[n]
          ? !1
          : this._hasStrings
            ? this._modifiedStringElements[t] === this._modifiedStringElements[n]
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
      _ComputeDiff(t, n, r, s, i) {
        const l = [!1]
        let a = this.ComputeDiffRecursive(t, n, r, s, l)
        return i && (a = this.PrettifyChanges(a)), { quitEarly: l[0], changes: a }
      }
      ComputeDiffRecursive(t, n, r, s, i) {
        for (i[0] = !1; t <= n && r <= s && this.ElementsAreEqual(t, r); ) t++, r++
        for (; n >= t && s >= r && this.ElementsAreEqual(n, s); ) n--, s--
        if (t > n || r > s) {
          let f
          return (
            r <= s
              ? (Be.Assert(t === n + 1, 'originalStart should only be one more than originalEnd'),
                (f = [new pe(t, 0, r, s - r + 1)]))
              : t <= n
                ? (Be.Assert(r === s + 1, 'modifiedStart should only be one more than modifiedEnd'),
                  (f = [new pe(t, n - t + 1, r, 0)]))
                : (Be.Assert(t === n + 1, 'originalStart should only be one more than originalEnd'),
                  Be.Assert(r === s + 1, 'modifiedStart should only be one more than modifiedEnd'),
                  (f = [])),
            f
          )
        }
        const l = [0],
          a = [0],
          c = this.ComputeRecursionPoint(t, n, r, s, l, a, i),
          u = l[0],
          h = a[0]
        if (c !== null) return c
        if (!i[0]) {
          const f = this.ComputeDiffRecursive(t, u, r, h, i)
          let d = []
          return (
            i[0]
              ? (d = [new pe(u + 1, n - (u + 1) + 1, h + 1, s - (h + 1) + 1)])
              : (d = this.ComputeDiffRecursive(u + 1, n, h + 1, s, i)),
            this.ConcatenateChanges(f, d)
          )
        }
        return [new pe(t, n - t + 1, r, s - r + 1)]
      }
      WALKTRACE(t, n, r, s, i, l, a, c, u, h, f, d, m, b, C, w, _, S) {
        let L = null,
          D = null,
          R = new j1(),
          J = n,
          q = r,
          E = m[0] - w[0] - s,
          v = -1073741824,
          x = this.m_forwardHistory.length - 1
        do {
          const p = E + t
          p === J || (p < q && u[p - 1] < u[p + 1])
            ? ((f = u[p + 1]),
              (b = f - E - s),
              f < v && R.MarkNextChange(),
              (v = f),
              R.AddModifiedElement(f + 1, b),
              (E = p + 1 - t))
            : ((f = u[p - 1] + 1),
              (b = f - E - s),
              f < v && R.MarkNextChange(),
              (v = f - 1),
              R.AddOriginalElement(f, b + 1),
              (E = p - 1 - t)),
            x >= 0 && ((u = this.m_forwardHistory[x]), (t = u[0]), (J = 1), (q = u.length - 1))
        } while (--x >= -1)
        if (((L = R.getReverseChanges()), S[0])) {
          let p = m[0] + 1,
            g = w[0] + 1
          if (L !== null && L.length > 0) {
            const A = L[L.length - 1]
            ;(p = Math.max(p, A.getOriginalEnd())), (g = Math.max(g, A.getModifiedEnd()))
          }
          D = [new pe(p, d - p + 1, g, C - g + 1)]
        } else {
          ;(R = new j1()),
            (J = l),
            (q = a),
            (E = m[0] - w[0] - c),
            (v = 1073741824),
            (x = _ ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2)
          do {
            const p = E + i
            p === J || (p < q && h[p - 1] >= h[p + 1])
              ? ((f = h[p + 1] - 1),
                (b = f - E - c),
                f > v && R.MarkNextChange(),
                (v = f + 1),
                R.AddOriginalElement(f + 1, b + 1),
                (E = p + 1 - i))
              : ((f = h[p - 1]),
                (b = f - E - c),
                f > v && R.MarkNextChange(),
                (v = f),
                R.AddModifiedElement(f + 1, b + 1),
                (E = p - 1 - i)),
              x >= 0 && ((h = this.m_reverseHistory[x]), (i = h[0]), (J = 1), (q = h.length - 1))
          } while (--x >= -1)
          D = R.getChanges()
        }
        return this.ConcatenateChanges(L, D)
      }
      ComputeRecursionPoint(t, n, r, s, i, l, a) {
        let c = 0,
          u = 0,
          h = 0,
          f = 0,
          d = 0,
          m = 0
        t--, r--, (i[0] = 0), (l[0] = 0), (this.m_forwardHistory = []), (this.m_reverseHistory = [])
        const b = n - t + (s - r),
          C = b + 1,
          w = new Int32Array(C),
          _ = new Int32Array(C),
          S = s - r,
          L = n - t,
          D = t - r,
          R = n - s,
          q = (L - S) % 2 === 0
        ;(w[S] = t), (_[L] = n), (a[0] = !1)
        for (let E = 1; E <= b / 2 + 1; E++) {
          let v = 0,
            x = 0
          ;(h = this.ClipDiagonalBound(S - E, E, S, C)), (f = this.ClipDiagonalBound(S + E, E, S, C))
          for (let g = h; g <= f; g += 2) {
            g === h || (g < f && w[g - 1] < w[g + 1]) ? (c = w[g + 1]) : (c = w[g - 1] + 1), (u = c - (g - S) - D)
            const A = c
            for (; c < n && u < s && this.ElementsAreEqual(c + 1, u + 1); ) c++, u++
            if (((w[g] = c), c + u > v + x && ((v = c), (x = u)), !q && Math.abs(g - L) <= E - 1 && c >= _[g]))
              return (
                (i[0] = c),
                (l[0] = u),
                A <= _[g] && 1447 > 0 && E <= 1447 + 1
                  ? this.WALKTRACE(S, h, f, D, L, d, m, R, w, _, c, n, i, u, s, l, q, a)
                  : null
              )
          }
          const p = (v - t + (x - r) - E) / 2
          if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(v, p))
            return (
              (a[0] = !0),
              (i[0] = v),
              (l[0] = x),
              p > 0 && 1447 > 0 && E <= 1447 + 1
                ? this.WALKTRACE(S, h, f, D, L, d, m, R, w, _, c, n, i, u, s, l, q, a)
                : (t++, r++, [new pe(t, n - t + 1, r, s - r + 1)])
            )
          ;(d = this.ClipDiagonalBound(L - E, E, L, C)), (m = this.ClipDiagonalBound(L + E, E, L, C))
          for (let g = d; g <= m; g += 2) {
            g === d || (g < m && _[g - 1] >= _[g + 1]) ? (c = _[g + 1] - 1) : (c = _[g - 1]), (u = c - (g - L) - R)
            const A = c
            for (; c > t && u > r && this.ElementsAreEqual(c, u); ) c--, u--
            if (((_[g] = c), q && Math.abs(g - S) <= E && c <= w[g]))
              return (
                (i[0] = c),
                (l[0] = u),
                A >= w[g] && 1447 > 0 && E <= 1447 + 1
                  ? this.WALKTRACE(S, h, f, D, L, d, m, R, w, _, c, n, i, u, s, l, q, a)
                  : null
              )
          }
          if (E <= 1447) {
            let g = new Int32Array(f - h + 2)
            ;(g[0] = S - h + 1),
              Ve.Copy2(w, h, g, 1, f - h + 1),
              this.m_forwardHistory.push(g),
              (g = new Int32Array(m - d + 2)),
              (g[0] = L - d + 1),
              Ve.Copy2(_, d, g, 1, m - d + 1),
              this.m_reverseHistory.push(g)
          }
        }
        return this.WALKTRACE(S, h, f, D, L, d, m, R, w, _, c, n, i, u, s, l, q, a)
      }
      PrettifyChanges(t) {
        for (let n = 0; n < t.length; n++) {
          const r = t[n],
            s = n < t.length - 1 ? t[n + 1].originalStart : this._originalElementsOrHash.length,
            i = n < t.length - 1 ? t[n + 1].modifiedStart : this._modifiedElementsOrHash.length,
            l = r.originalLength > 0,
            a = r.modifiedLength > 0
          for (
            ;
            r.originalStart + r.originalLength < s &&
            r.modifiedStart + r.modifiedLength < i &&
            (!l || this.OriginalElementsAreEqual(r.originalStart, r.originalStart + r.originalLength)) &&
            (!a || this.ModifiedElementsAreEqual(r.modifiedStart, r.modifiedStart + r.modifiedLength));

          ) {
            const u = this.ElementsAreStrictEqual(r.originalStart, r.modifiedStart)
            if (
              this.ElementsAreStrictEqual(r.originalStart + r.originalLength, r.modifiedStart + r.modifiedLength) &&
              !u
            )
              break
            r.originalStart++, r.modifiedStart++
          }
          const c = [null]
          if (n < t.length - 1 && this.ChangesOverlap(t[n], t[n + 1], c)) {
            ;(t[n] = c[0]), t.splice(n + 1, 1), n--
            continue
          }
        }
        for (let n = t.length - 1; n >= 0; n--) {
          const r = t[n]
          let s = 0,
            i = 0
          if (n > 0) {
            const f = t[n - 1]
            ;(s = f.originalStart + f.originalLength), (i = f.modifiedStart + f.modifiedLength)
          }
          const l = r.originalLength > 0,
            a = r.modifiedLength > 0
          let c = 0,
            u = this._boundaryScore(r.originalStart, r.originalLength, r.modifiedStart, r.modifiedLength)
          for (let f = 1; ; f++) {
            const d = r.originalStart - f,
              m = r.modifiedStart - f
            if (
              d < s ||
              m < i ||
              (l && !this.OriginalElementsAreEqual(d, d + r.originalLength)) ||
              (a && !this.ModifiedElementsAreEqual(m, m + r.modifiedLength))
            )
              break
            const C = (d === s && m === i ? 5 : 0) + this._boundaryScore(d, r.originalLength, m, r.modifiedLength)
            C > u && ((u = C), (c = f))
          }
          ;(r.originalStart -= c), (r.modifiedStart -= c)
          const h = [null]
          if (n > 0 && this.ChangesOverlap(t[n - 1], t[n], h)) {
            ;(t[n - 1] = h[0]), t.splice(n, 1), n++
            continue
          }
        }
        if (this._hasStrings)
          for (let n = 1, r = t.length; n < r; n++) {
            const s = t[n - 1],
              i = t[n],
              l = i.originalStart - s.originalStart - s.originalLength,
              a = s.originalStart,
              c = i.originalStart + i.originalLength,
              u = c - a,
              h = s.modifiedStart,
              f = i.modifiedStart + i.modifiedLength,
              d = f - h
            if (l < 5 && u < 20 && d < 20) {
              const m = this._findBetterContiguousSequence(a, u, h, d, l)
              if (m) {
                const [b, C] = m
                ;(b !== s.originalStart + s.originalLength || C !== s.modifiedStart + s.modifiedLength) &&
                  ((s.originalLength = b - s.originalStart),
                  (s.modifiedLength = C - s.modifiedStart),
                  (i.originalStart = b + l),
                  (i.modifiedStart = C + l),
                  (i.originalLength = c - i.originalStart),
                  (i.modifiedLength = f - i.modifiedStart))
              }
            }
          }
        return t
      }
      _findBetterContiguousSequence(t, n, r, s, i) {
        if (n < i || s < i) return null
        const l = t + n - i + 1,
          a = r + s - i + 1
        let c = 0,
          u = 0,
          h = 0
        for (let f = t; f < l; f++)
          for (let d = r; d < a; d++) {
            const m = this._contiguousSequenceScore(f, d, i)
            m > 0 && m > c && ((c = m), (u = f), (h = d))
          }
        return c > 0 ? [u, h] : null
      }
      _contiguousSequenceScore(t, n, r) {
        let s = 0
        for (let i = 0; i < r; i++) {
          if (!this.ElementsAreEqual(t + i, n + i)) return 0
          s += this._originalStringElements[t + i].length
        }
        return s
      }
      _OriginalIsBoundary(t) {
        return t <= 0 || t >= this._originalElementsOrHash.length - 1
          ? !0
          : this._hasStrings && /^\s*$/.test(this._originalStringElements[t])
      }
      _OriginalRegionIsBoundary(t, n) {
        if (this._OriginalIsBoundary(t) || this._OriginalIsBoundary(t - 1)) return !0
        if (n > 0) {
          const r = t + n
          if (this._OriginalIsBoundary(r - 1) || this._OriginalIsBoundary(r)) return !0
        }
        return !1
      }
      _ModifiedIsBoundary(t) {
        return t <= 0 || t >= this._modifiedElementsOrHash.length - 1
          ? !0
          : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[t])
      }
      _ModifiedRegionIsBoundary(t, n) {
        if (this._ModifiedIsBoundary(t) || this._ModifiedIsBoundary(t - 1)) return !0
        if (n > 0) {
          const r = t + n
          if (this._ModifiedIsBoundary(r - 1) || this._ModifiedIsBoundary(r)) return !0
        }
        return !1
      }
      _boundaryScore(t, n, r, s) {
        const i = this._OriginalRegionIsBoundary(t, n) ? 1 : 0,
          l = this._ModifiedRegionIsBoundary(r, s) ? 1 : 0
        return i + l
      }
      ConcatenateChanges(t, n) {
        const r = []
        if (t.length === 0 || n.length === 0) return n.length > 0 ? n : t
        if (this.ChangesOverlap(t[t.length - 1], n[0], r)) {
          const s = new Array(t.length + n.length - 1)
          return (
            Ve.Copy(t, 0, s, 0, t.length - 1), (s[t.length - 1] = r[0]), Ve.Copy(n, 1, s, t.length, n.length - 1), s
          )
        } else {
          const s = new Array(t.length + n.length)
          return Ve.Copy(t, 0, s, 0, t.length), Ve.Copy(n, 0, s, t.length, n.length), s
        }
      }
      ChangesOverlap(t, n, r) {
        if (
          (Be.Assert(t.originalStart <= n.originalStart, 'Left change is not less than or equal to right change'),
          Be.Assert(t.modifiedStart <= n.modifiedStart, 'Left change is not less than or equal to right change'),
          t.originalStart + t.originalLength >= n.originalStart ||
            t.modifiedStart + t.modifiedLength >= n.modifiedStart)
        ) {
          const s = t.originalStart
          let i = t.originalLength
          const l = t.modifiedStart
          let a = t.modifiedLength
          return (
            t.originalStart + t.originalLength >= n.originalStart &&
              (i = n.originalStart + n.originalLength - t.originalStart),
            t.modifiedStart + t.modifiedLength >= n.modifiedStart &&
              (a = n.modifiedStart + n.modifiedLength - t.modifiedStart),
            (r[0] = new pe(s, i, l, a)),
            !0
          )
        } else return (r[0] = null), !1
      }
      ClipDiagonalBound(t, n, r, s) {
        if (t >= 0 && t < s) return t
        const i = r,
          l = s - r - 1,
          a = n % 2 === 0
        if (t < 0) {
          const c = i % 2 === 0
          return a === c ? 0 : 1
        } else {
          const c = l % 2 === 0
          return a === c ? s - 1 : s - 2
        }
      }
    }
    var bt = Re(224)
    let Ue
    if (typeof H.vscode != 'undefined' && typeof H.vscode.process != 'undefined') {
      const e = H.vscode.process
      Ue = {
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
      typeof bt != 'undefined'
        ? (Ue = {
            get platform() {
              return bt.platform
            },
            get arch() {
              return bt.arch
            },
            get env() {
              return { NODE_ENV: 'production', PUBLIC_PATH: '/pro-components/' }
            },
            cwd() {
              return { NODE_ENV: 'production', PUBLIC_PATH: '/pro-components/' }.VSCODE_CWD || bt.cwd()
            },
          })
        : (Ue = {
            get platform() {
              return Ye ? 'win32' : Ir ? 'darwin' : 'linux'
            },
            get arch() {},
            get env() {
              return {}
            },
            cwd() {
              return '/'
            },
          })
    const _t = Ue.cwd,
      eo = Ue.env,
      Ss = Ue.platform,
      Cs = 65,
      Ns = 97,
      As = 90,
      ys = 122,
      Le = 46,
      W = 47,
      Q = 92,
      we = 58,
      Es = 63
    class Q1 extends Error {
      constructor(t, n, r) {
        let s
        typeof n == 'string' && n.indexOf('not ') === 0
          ? ((s = 'must not be'), (n = n.replace(/^not /, '')))
          : (s = 'must be')
        const i = t.indexOf('.') !== -1 ? 'property' : 'argument'
        let l = `The "${t}" ${i} ${s} of type ${n}`
        ;(l += `. Received type ${typeof r}`), super(l), (this.code = 'ERR_INVALID_ARG_TYPE')
      }
    }
    function Ms(e, t) {
      if (e === null || typeof e != 'object') throw new Q1(t, 'Object', e)
    }
    function U(e, t) {
      if (typeof e != 'string') throw new Q1(t, 'string', e)
    }
    const ve = Ss === 'win32'
    function y(e) {
      return e === W || e === Q
    }
    function Gt(e) {
      return e === W
    }
    function Se(e) {
      return (e >= Cs && e <= As) || (e >= Ns && e <= ys)
    }
    function pt(e, t, n, r) {
      let s = '',
        i = 0,
        l = -1,
        a = 0,
        c = 0
      for (let u = 0; u <= e.length; ++u) {
        if (u < e.length) c = e.charCodeAt(u)
        else {
          if (r(c)) break
          c = W
        }
        if (r(c)) {
          if (!(l === u - 1 || a === 1))
            if (a === 2) {
              if (s.length < 2 || i !== 2 || s.charCodeAt(s.length - 1) !== Le || s.charCodeAt(s.length - 2) !== Le) {
                if (s.length > 2) {
                  const h = s.lastIndexOf(n)
                  h === -1 ? ((s = ''), (i = 0)) : ((s = s.slice(0, h)), (i = s.length - 1 - s.lastIndexOf(n))),
                    (l = u),
                    (a = 0)
                  continue
                } else if (s.length !== 0) {
                  ;(s = ''), (i = 0), (l = u), (a = 0)
                  continue
                }
              }
              t && ((s += s.length > 0 ? `${n}..` : '..'), (i = 2))
            } else s.length > 0 ? (s += `${n}${e.slice(l + 1, u)}`) : (s = e.slice(l + 1, u)), (i = u - l - 1)
          ;(l = u), (a = 0)
        } else c === Le && a !== -1 ? ++a : (a = -1)
      }
      return s
    }
    function Y1(e, t) {
      Ms(t, 'pathObject')
      const n = t.dir || t.root,
        r = t.base || `${t.name || ''}${t.ext || ''}`
      return n ? (n === t.root ? `${n}${r}` : `${n}${e}${r}`) : r
    }
    const $ = {
        resolve(...e) {
          let t = '',
            n = '',
            r = !1
          for (let s = e.length - 1; s >= -1; s--) {
            let i
            if (s >= 0) {
              if (((i = e[s]), U(i, 'path'), i.length === 0)) continue
            } else
              t.length === 0
                ? (i = _t())
                : ((i = { NODE_ENV: 'production', PUBLIC_PATH: '/pro-components/' }[`=${t}`] || _t()),
                  (i === void 0 || (i.slice(0, 2).toLowerCase() !== t.toLowerCase() && i.charCodeAt(2) === Q)) &&
                    (i = `${t}\\`))
            const l = i.length
            let a = 0,
              c = '',
              u = !1
            const h = i.charCodeAt(0)
            if (l === 1) y(h) && ((a = 1), (u = !0))
            else if (y(h))
              if (((u = !0), y(i.charCodeAt(1)))) {
                let f = 2,
                  d = f
                for (; f < l && !y(i.charCodeAt(f)); ) f++
                if (f < l && f !== d) {
                  const m = i.slice(d, f)
                  for (d = f; f < l && y(i.charCodeAt(f)); ) f++
                  if (f < l && f !== d) {
                    for (d = f; f < l && !y(i.charCodeAt(f)); ) f++
                    ;(f === l || f !== d) && ((c = `\\\\${m}\\${i.slice(d, f)}`), (a = f))
                  }
                }
              } else a = 1
            else
              Se(h) &&
                i.charCodeAt(1) === we &&
                ((c = i.slice(0, 2)), (a = 2), l > 2 && y(i.charCodeAt(2)) && ((u = !0), (a = 3)))
            if (c.length > 0)
              if (t.length > 0) {
                if (c.toLowerCase() !== t.toLowerCase()) continue
              } else t = c
            if (r) {
              if (t.length > 0) break
            } else if (((n = `${i.slice(a)}\\${n}`), (r = u), u && t.length > 0)) break
          }
          return (n = pt(n, !r, '\\', y)), r ? `${t}\\${n}` : `${t}${n}` || '.'
        },
        normalize(e) {
          U(e, 'path')
          const t = e.length
          if (t === 0) return '.'
          let n = 0,
            r,
            s = !1
          const i = e.charCodeAt(0)
          if (t === 1) return Gt(i) ? '\\' : e
          if (y(i))
            if (((s = !0), y(e.charCodeAt(1)))) {
              let a = 2,
                c = a
              for (; a < t && !y(e.charCodeAt(a)); ) a++
              if (a < t && a !== c) {
                const u = e.slice(c, a)
                for (c = a; a < t && y(e.charCodeAt(a)); ) a++
                if (a < t && a !== c) {
                  for (c = a; a < t && !y(e.charCodeAt(a)); ) a++
                  if (a === t) return `\\\\${u}\\${e.slice(c)}\\`
                  a !== c && ((r = `\\\\${u}\\${e.slice(c, a)}`), (n = a))
                }
              }
            } else n = 1
          else
            Se(i) &&
              e.charCodeAt(1) === we &&
              ((r = e.slice(0, 2)), (n = 2), t > 2 && y(e.charCodeAt(2)) && ((s = !0), (n = 3)))
          let l = n < t ? pt(e.slice(n), !s, '\\', y) : ''
          return (
            l.length === 0 && !s && (l = '.'),
            l.length > 0 && y(e.charCodeAt(t - 1)) && (l += '\\'),
            r === void 0 ? (s ? `\\${l}` : l) : s ? `${r}\\${l}` : `${r}${l}`
          )
        },
        isAbsolute(e) {
          U(e, 'path')
          const t = e.length
          if (t === 0) return !1
          const n = e.charCodeAt(0)
          return y(n) || (t > 2 && Se(n) && e.charCodeAt(1) === we && y(e.charCodeAt(2)))
        },
        join(...e) {
          if (e.length === 0) return '.'
          let t, n
          for (let i = 0; i < e.length; ++i) {
            const l = e[i]
            U(l, 'path'), l.length > 0 && (t === void 0 ? (t = n = l) : (t += `\\${l}`))
          }
          if (t === void 0) return '.'
          let r = !0,
            s = 0
          if (typeof n == 'string' && y(n.charCodeAt(0))) {
            ++s
            const i = n.length
            i > 1 && y(n.charCodeAt(1)) && (++s, i > 2 && (y(n.charCodeAt(2)) ? ++s : (r = !1)))
          }
          if (r) {
            for (; s < t.length && y(t.charCodeAt(s)); ) s++
            s >= 2 && (t = `\\${t.slice(s)}`)
          }
          return $.normalize(t)
        },
        relative(e, t) {
          if ((U(e, 'from'), U(t, 'to'), e === t)) return ''
          const n = $.resolve(e),
            r = $.resolve(t)
          if (n === r || ((e = n.toLowerCase()), (t = r.toLowerCase()), e === t)) return ''
          let s = 0
          for (; s < e.length && e.charCodeAt(s) === Q; ) s++
          let i = e.length
          for (; i - 1 > s && e.charCodeAt(i - 1) === Q; ) i--
          const l = i - s
          let a = 0
          for (; a < t.length && t.charCodeAt(a) === Q; ) a++
          let c = t.length
          for (; c - 1 > a && t.charCodeAt(c - 1) === Q; ) c--
          const u = c - a,
            h = l < u ? l : u
          let f = -1,
            d = 0
          for (; d < h; d++) {
            const b = e.charCodeAt(s + d)
            if (b !== t.charCodeAt(a + d)) break
            b === Q && (f = d)
          }
          if (d !== h) {
            if (f === -1) return r
          } else {
            if (u > h) {
              if (t.charCodeAt(a + d) === Q) return r.slice(a + d + 1)
              if (d === 2) return r.slice(a + d)
            }
            l > h && (e.charCodeAt(s + d) === Q ? (f = d) : d === 2 && (f = 3)), f === -1 && (f = 0)
          }
          let m = ''
          for (d = s + f + 1; d <= i; ++d) (d === i || e.charCodeAt(d) === Q) && (m += m.length === 0 ? '..' : '\\..')
          return (a += f), m.length > 0 ? `${m}${r.slice(a, c)}` : (r.charCodeAt(a) === Q && ++a, r.slice(a, c))
        },
        toNamespacedPath(e) {
          if (typeof e != 'string' || e.length === 0) return e
          const t = $.resolve(e)
          if (t.length <= 2) return e
          if (t.charCodeAt(0) === Q) {
            if (t.charCodeAt(1) === Q) {
              const n = t.charCodeAt(2)
              if (n !== Es && n !== Le) return `\\\\?\\UNC\\${t.slice(2)}`
            }
          } else if (Se(t.charCodeAt(0)) && t.charCodeAt(1) === we && t.charCodeAt(2) === Q) return `\\\\?\\${t}`
          return e
        },
        dirname(e) {
          U(e, 'path')
          const t = e.length
          if (t === 0) return '.'
          let n = -1,
            r = 0
          const s = e.charCodeAt(0)
          if (t === 1) return y(s) ? e : '.'
          if (y(s)) {
            if (((n = r = 1), y(e.charCodeAt(1)))) {
              let a = 2,
                c = a
              for (; a < t && !y(e.charCodeAt(a)); ) a++
              if (a < t && a !== c) {
                for (c = a; a < t && y(e.charCodeAt(a)); ) a++
                if (a < t && a !== c) {
                  for (c = a; a < t && !y(e.charCodeAt(a)); ) a++
                  if (a === t) return e
                  a !== c && (n = r = a + 1)
                }
              }
            }
          } else Se(s) && e.charCodeAt(1) === we && ((n = t > 2 && y(e.charCodeAt(2)) ? 3 : 2), (r = n))
          let i = -1,
            l = !0
          for (let a = t - 1; a >= r; --a)
            if (y(e.charCodeAt(a))) {
              if (!l) {
                i = a
                break
              }
            } else l = !1
          if (i === -1) {
            if (n === -1) return '.'
            i = n
          }
          return e.slice(0, i)
        },
        basename(e, t) {
          t !== void 0 && U(t, 'ext'), U(e, 'path')
          let n = 0,
            r = -1,
            s = !0,
            i
          if (
            (e.length >= 2 && Se(e.charCodeAt(0)) && e.charCodeAt(1) === we && (n = 2),
            t !== void 0 && t.length > 0 && t.length <= e.length)
          ) {
            if (t === e) return ''
            let l = t.length - 1,
              a = -1
            for (i = e.length - 1; i >= n; --i) {
              const c = e.charCodeAt(i)
              if (y(c)) {
                if (!s) {
                  n = i + 1
                  break
                }
              } else
                a === -1 && ((s = !1), (a = i + 1)),
                  l >= 0 && (c === t.charCodeAt(l) ? --l === -1 && (r = i) : ((l = -1), (r = a)))
            }
            return n === r ? (r = a) : r === -1 && (r = e.length), e.slice(n, r)
          }
          for (i = e.length - 1; i >= n; --i)
            if (y(e.charCodeAt(i))) {
              if (!s) {
                n = i + 1
                break
              }
            } else r === -1 && ((s = !1), (r = i + 1))
          return r === -1 ? '' : e.slice(n, r)
        },
        extname(e) {
          U(e, 'path')
          let t = 0,
            n = -1,
            r = 0,
            s = -1,
            i = !0,
            l = 0
          e.length >= 2 && e.charCodeAt(1) === we && Se(e.charCodeAt(0)) && (t = r = 2)
          for (let a = e.length - 1; a >= t; --a) {
            const c = e.charCodeAt(a)
            if (y(c)) {
              if (!i) {
                r = a + 1
                break
              }
              continue
            }
            s === -1 && ((i = !1), (s = a + 1)),
              c === Le ? (n === -1 ? (n = a) : l !== 1 && (l = 1)) : n !== -1 && (l = -1)
          }
          return n === -1 || s === -1 || l === 0 || (l === 1 && n === s - 1 && n === r + 1) ? '' : e.slice(n, s)
        },
        format: Y1.bind(null, '\\'),
        parse(e) {
          U(e, 'path')
          const t = { root: '', dir: '', base: '', ext: '', name: '' }
          if (e.length === 0) return t
          const n = e.length
          let r = 0,
            s = e.charCodeAt(0)
          if (n === 1) return y(s) ? ((t.root = t.dir = e), t) : ((t.base = t.name = e), t)
          if (y(s)) {
            if (((r = 1), y(e.charCodeAt(1)))) {
              let f = 2,
                d = f
              for (; f < n && !y(e.charCodeAt(f)); ) f++
              if (f < n && f !== d) {
                for (d = f; f < n && y(e.charCodeAt(f)); ) f++
                if (f < n && f !== d) {
                  for (d = f; f < n && !y(e.charCodeAt(f)); ) f++
                  f === n ? (r = f) : f !== d && (r = f + 1)
                }
              }
            }
          } else if (Se(s) && e.charCodeAt(1) === we) {
            if (n <= 2) return (t.root = t.dir = e), t
            if (((r = 2), y(e.charCodeAt(2)))) {
              if (n === 3) return (t.root = t.dir = e), t
              r = 3
            }
          }
          r > 0 && (t.root = e.slice(0, r))
          let i = -1,
            l = r,
            a = -1,
            c = !0,
            u = e.length - 1,
            h = 0
          for (; u >= r; --u) {
            if (((s = e.charCodeAt(u)), y(s))) {
              if (!c) {
                l = u + 1
                break
              }
              continue
            }
            a === -1 && ((c = !1), (a = u + 1)),
              s === Le ? (i === -1 ? (i = u) : h !== 1 && (h = 1)) : i !== -1 && (h = -1)
          }
          return (
            a !== -1 &&
              (i === -1 || h === 0 || (h === 1 && i === a - 1 && i === l + 1)
                ? (t.base = t.name = e.slice(l, a))
                : ((t.name = e.slice(l, i)), (t.base = e.slice(l, a)), (t.ext = e.slice(i, a)))),
            l > 0 && l !== r ? (t.dir = e.slice(0, l - 1)) : (t.dir = t.root),
            t
          )
        },
        sep: '\\',
        delimiter: ';',
        win32: null,
        posix: null,
      },
      Rs = (() => {
        if (ve) {
          const e = /\\/g
          return () => {
            const t = _t().replace(e, '/')
            return t.slice(t.indexOf('/'))
          }
        }
        return () => _t()
      })(),
      Y = {
        resolve(...e) {
          let t = '',
            n = !1
          for (let r = e.length - 1; r >= -1 && !n; r--) {
            const s = r >= 0 ? e[r] : Rs()
            U(s, 'path'), s.length !== 0 && ((t = `${s}/${t}`), (n = s.charCodeAt(0) === W))
          }
          return (t = pt(t, !n, '/', Gt)), n ? `/${t}` : t.length > 0 ? t : '.'
        },
        normalize(e) {
          if ((U(e, 'path'), e.length === 0)) return '.'
          const t = e.charCodeAt(0) === W,
            n = e.charCodeAt(e.length - 1) === W
          return (
            (e = pt(e, !t, '/', Gt)), e.length === 0 ? (t ? '/' : n ? './' : '.') : (n && (e += '/'), t ? `/${e}` : e)
          )
        },
        isAbsolute(e) {
          return U(e, 'path'), e.length > 0 && e.charCodeAt(0) === W
        },
        join(...e) {
          if (e.length === 0) return '.'
          let t
          for (let n = 0; n < e.length; ++n) {
            const r = e[n]
            U(r, 'path'), r.length > 0 && (t === void 0 ? (t = r) : (t += `/${r}`))
          }
          return t === void 0 ? '.' : Y.normalize(t)
        },
        relative(e, t) {
          if ((U(e, 'from'), U(t, 'to'), e === t || ((e = Y.resolve(e)), (t = Y.resolve(t)), e === t))) return ''
          const n = 1,
            r = e.length,
            s = r - n,
            i = 1,
            l = t.length - i,
            a = s < l ? s : l
          let c = -1,
            u = 0
          for (; u < a; u++) {
            const f = e.charCodeAt(n + u)
            if (f !== t.charCodeAt(i + u)) break
            f === W && (c = u)
          }
          if (u === a)
            if (l > a) {
              if (t.charCodeAt(i + u) === W) return t.slice(i + u + 1)
              if (u === 0) return t.slice(i + u)
            } else s > a && (e.charCodeAt(n + u) === W ? (c = u) : u === 0 && (c = 0))
          let h = ''
          for (u = n + c + 1; u <= r; ++u) (u === r || e.charCodeAt(u) === W) && (h += h.length === 0 ? '..' : '/..')
          return `${h}${t.slice(i + c)}`
        },
        toNamespacedPath(e) {
          return e
        },
        dirname(e) {
          if ((U(e, 'path'), e.length === 0)) return '.'
          const t = e.charCodeAt(0) === W
          let n = -1,
            r = !0
          for (let s = e.length - 1; s >= 1; --s)
            if (e.charCodeAt(s) === W) {
              if (!r) {
                n = s
                break
              }
            } else r = !1
          return n === -1 ? (t ? '/' : '.') : t && n === 1 ? '//' : e.slice(0, n)
        },
        basename(e, t) {
          t !== void 0 && U(t, 'ext'), U(e, 'path')
          let n = 0,
            r = -1,
            s = !0,
            i
          if (t !== void 0 && t.length > 0 && t.length <= e.length) {
            if (t === e) return ''
            let l = t.length - 1,
              a = -1
            for (i = e.length - 1; i >= 0; --i) {
              const c = e.charCodeAt(i)
              if (c === W) {
                if (!s) {
                  n = i + 1
                  break
                }
              } else
                a === -1 && ((s = !1), (a = i + 1)),
                  l >= 0 && (c === t.charCodeAt(l) ? --l === -1 && (r = i) : ((l = -1), (r = a)))
            }
            return n === r ? (r = a) : r === -1 && (r = e.length), e.slice(n, r)
          }
          for (i = e.length - 1; i >= 0; --i)
            if (e.charCodeAt(i) === W) {
              if (!s) {
                n = i + 1
                break
              }
            } else r === -1 && ((s = !1), (r = i + 1))
          return r === -1 ? '' : e.slice(n, r)
        },
        extname(e) {
          U(e, 'path')
          let t = -1,
            n = 0,
            r = -1,
            s = !0,
            i = 0
          for (let l = e.length - 1; l >= 0; --l) {
            const a = e.charCodeAt(l)
            if (a === W) {
              if (!s) {
                n = l + 1
                break
              }
              continue
            }
            r === -1 && ((s = !1), (r = l + 1)),
              a === Le ? (t === -1 ? (t = l) : i !== 1 && (i = 1)) : t !== -1 && (i = -1)
          }
          return t === -1 || r === -1 || i === 0 || (i === 1 && t === r - 1 && t === n + 1) ? '' : e.slice(t, r)
        },
        format: Y1.bind(null, '/'),
        parse(e) {
          U(e, 'path')
          const t = { root: '', dir: '', base: '', ext: '', name: '' }
          if (e.length === 0) return t
          const n = e.charCodeAt(0) === W
          let r
          n ? ((t.root = '/'), (r = 1)) : (r = 0)
          let s = -1,
            i = 0,
            l = -1,
            a = !0,
            c = e.length - 1,
            u = 0
          for (; c >= r; --c) {
            const h = e.charCodeAt(c)
            if (h === W) {
              if (!a) {
                i = c + 1
                break
              }
              continue
            }
            l === -1 && ((a = !1), (l = c + 1)),
              h === Le ? (s === -1 ? (s = c) : u !== 1 && (u = 1)) : s !== -1 && (u = -1)
          }
          if (l !== -1) {
            const h = i === 0 && n ? 1 : i
            s === -1 || u === 0 || (u === 1 && s === l - 1 && s === i + 1)
              ? (t.base = t.name = e.slice(h, l))
              : ((t.name = e.slice(h, s)), (t.base = e.slice(h, l)), (t.ext = e.slice(s, l)))
          }
          return i > 0 ? (t.dir = e.slice(0, i - 1)) : n && (t.dir = '/'), t
        },
        sep: '/',
        delimiter: ':',
        win32: null,
        posix: null,
      }
    ;(Y.win32 = $.win32 = $), (Y.posix = $.posix = Y)
    const to = ve ? $.normalize : Y.normalize,
      no = ve ? $.resolve : Y.resolve,
      ro = ve ? $.relative : Y.relative,
      so = ve ? $.dirname : Y.dirname,
      io = ve ? $.basename : Y.basename,
      oo = ve ? $.extname : Y.extname,
      lo = ve ? $.sep : Y.sep,
      ks = /^\w[\w\d+.-]*$/,
      Ds = /^\//,
      Fs = /^\/\//
    function X1(e, t) {
      if (!e.scheme && t)
        throw new Error(
          `[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`,
        )
      if (e.scheme && !ks.test(e.scheme)) throw new Error('[UriError]: Scheme contains illegal characters.')
      if (e.path) {
        if (e.authority) {
          if (!Ds.test(e.path))
            throw new Error(
              '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character',
            )
        } else if (Fs.test(e.path))
          throw new Error(
            '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")',
          )
      }
    }
    function Ps(e, t) {
      return !e && !t ? 'file' : e
    }
    function Is(e, t) {
      switch (e) {
        case 'https':
        case 'http':
        case 'file':
          t ? t[0] !== se && (t = se + t) : (t = se)
          break
      }
      return t
    }
    const I = '',
      se = '/',
      Ts = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
    class ye {
      static isUri(t) {
        return t instanceof ye
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
      constructor(t, n, r, s, i, l = !1) {
        typeof t == 'object'
          ? ((this.scheme = t.scheme || I),
            (this.authority = t.authority || I),
            (this.path = t.path || I),
            (this.query = t.query || I),
            (this.fragment = t.fragment || I))
          : ((this.scheme = Ps(t, l)),
            (this.authority = n || I),
            (this.path = Is(this.scheme, r || I)),
            (this.query = s || I),
            (this.fragment = i || I),
            X1(this, l))
      }
      get fsPath() {
        return jt(this, !1)
      }
      with(t) {
        if (!t) return this
        let { scheme: n, authority: r, path: s, query: i, fragment: l } = t
        return (
          n === void 0 ? (n = this.scheme) : n === null && (n = I),
          r === void 0 ? (r = this.authority) : r === null && (r = I),
          s === void 0 ? (s = this.path) : s === null && (s = I),
          i === void 0 ? (i = this.query) : i === null && (i = I),
          l === void 0 ? (l = this.fragment) : l === null && (l = I),
          n === this.scheme && r === this.authority && s === this.path && i === this.query && l === this.fragment
            ? this
            : new qe(n, r, s, i, l)
        )
      }
      static parse(t, n = !1) {
        const r = Ts.exec(t)
        return r
          ? new qe(r[2] || I, xt(r[4] || I), xt(r[5] || I), xt(r[7] || I), xt(r[9] || I), n)
          : new qe(I, I, I, I, I)
      }
      static file(t) {
        let n = I
        if ((Ye && (t = t.replace(/\\/g, se)), t[0] === se && t[1] === se)) {
          const r = t.indexOf(se, 2)
          r === -1 ? ((n = t.substring(2)), (t = se)) : ((n = t.substring(2, r)), (t = t.substring(r) || se))
        }
        return new qe('file', n, t, I, I)
      }
      static from(t) {
        const n = new qe(t.scheme, t.authority, t.path, t.query, t.fragment)
        return X1(n, !0), n
      }
      static joinPath(t, ...n) {
        if (!t.path) throw new Error('[UriError]: cannot call joinPath on URI without path')
        let r
        return (
          Ye && t.scheme === 'file' ? (r = ye.file($.join(jt(t, !0), ...n)).path) : (r = Y.join(t.path, ...n)),
          t.with({ path: r })
        )
      }
      toString(t = !1) {
        return Qt(this, t)
      }
      toJSON() {
        return this
      }
      static revive(t) {
        if (t) {
          if (t instanceof ye) return t
          {
            const n = new qe(t)
            return (n._formatted = t.external), (n._fsPath = t._sep === Z1 ? t.fsPath : null), n
          }
        } else return t
      }
    }
    const Z1 = Ye ? 1 : void 0
    class qe extends ye {
      constructor() {
        super(...arguments), (this._formatted = null), (this._fsPath = null)
      }
      get fsPath() {
        return this._fsPath || (this._fsPath = jt(this, !1)), this._fsPath
      }
      toString(t = !1) {
        return t ? Qt(this, !0) : (this._formatted || (this._formatted = Qt(this, !1)), this._formatted)
      }
      toJSON() {
        const t = { $mid: 1 }
        return (
          this._fsPath && ((t.fsPath = this._fsPath), (t._sep = Z1)),
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
    const J1 = {
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
    function K1(e, t, n) {
      let r,
        s = -1
      for (let i = 0; i < e.length; i++) {
        const l = e.charCodeAt(i)
        if (
          (l >= 97 && l <= 122) ||
          (l >= 65 && l <= 90) ||
          (l >= 48 && l <= 57) ||
          l === 45 ||
          l === 46 ||
          l === 95 ||
          l === 126 ||
          (t && l === 47) ||
          (n && l === 91) ||
          (n && l === 93) ||
          (n && l === 58)
        )
          s !== -1 && ((r += encodeURIComponent(e.substring(s, i))), (s = -1)), r !== void 0 && (r += e.charAt(i))
        else {
          r === void 0 && (r = e.substr(0, i))
          const a = J1[l]
          a !== void 0
            ? (s !== -1 && ((r += encodeURIComponent(e.substring(s, i))), (s = -1)), (r += a))
            : s === -1 && (s = i)
        }
      }
      return s !== -1 && (r += encodeURIComponent(e.substring(s))), r !== void 0 ? r : e
    }
    function Bs(e) {
      let t
      for (let n = 0; n < e.length; n++) {
        const r = e.charCodeAt(n)
        r === 35 || r === 63 ? (t === void 0 && (t = e.substr(0, n)), (t += J1[r])) : t !== void 0 && (t += e[n])
      }
      return t !== void 0 ? t : e
    }
    function jt(e, t) {
      let n
      return (
        e.authority && e.path.length > 1 && e.scheme === 'file'
          ? (n = `//${e.authority}${e.path}`)
          : e.path.charCodeAt(0) === 47 &&
              ((e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90) ||
                (e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122)) &&
              e.path.charCodeAt(2) === 58
            ? t
              ? (n = e.path.substr(1))
              : (n = e.path[1].toLowerCase() + e.path.substr(2))
            : (n = e.path),
        Ye && (n = n.replace(/\//g, '\\')),
        n
      )
    }
    function Qt(e, t) {
      const n = t ? Bs : K1
      let r = '',
        { scheme: s, authority: i, path: l, query: a, fragment: c } = e
      if ((s && ((r += s), (r += ':')), (i || s === 'file') && ((r += se), (r += se)), i)) {
        let u = i.indexOf('@')
        if (u !== -1) {
          const h = i.substr(0, u)
          ;(i = i.substr(u + 1)),
            (u = h.lastIndexOf(':')),
            u === -1
              ? (r += n(h, !1, !1))
              : ((r += n(h.substr(0, u), !1, !1)), (r += ':'), (r += n(h.substr(u + 1), !1, !0))),
            (r += '@')
        }
        ;(i = i.toLowerCase()),
          (u = i.lastIndexOf(':')),
          u === -1 ? (r += n(i, !1, !0)) : ((r += n(i.substr(0, u), !1, !0)), (r += i.substr(u)))
      }
      if (l) {
        if (l.length >= 3 && l.charCodeAt(0) === 47 && l.charCodeAt(2) === 58) {
          const u = l.charCodeAt(1)
          u >= 65 && u <= 90 && (l = `/${String.fromCharCode(u + 32)}:${l.substr(3)}`)
        } else if (l.length >= 2 && l.charCodeAt(1) === 58) {
          const u = l.charCodeAt(0)
          u >= 65 && u <= 90 && (l = `${String.fromCharCode(u + 32)}:${l.substr(2)}`)
        }
        r += n(l, !0, !1)
      }
      return a && ((r += '?'), (r += n(a, !1, !1))), c && ((r += '#'), (r += t ? c : K1(c, !1, !1))), r
    }
    function en(e) {
      try {
        return decodeURIComponent(e)
      } catch (t) {
        return e.length > 3 ? e.substr(0, 3) + en(e.substr(3)) : e
      }
    }
    const tn = /(%[0-9A-Za-z][0-9A-Za-z])+/g
    function xt(e) {
      return e.match(tn) ? e.replace(tn, (t) => en(t)) : e
    }
    class G {
      constructor(t, n) {
        ;(this.lineNumber = t), (this.column = n)
      }
      with(t = this.lineNumber, n = this.column) {
        return t === this.lineNumber && n === this.column ? this : new G(t, n)
      }
      delta(t = 0, n = 0) {
        return this.with(this.lineNumber + t, this.column + n)
      }
      equals(t) {
        return G.equals(this, t)
      }
      static equals(t, n) {
        return !t && !n ? !0 : !!t && !!n && t.lineNumber === n.lineNumber && t.column === n.column
      }
      isBefore(t) {
        return G.isBefore(this, t)
      }
      static isBefore(t, n) {
        return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column < n.column
      }
      isBeforeOrEqual(t) {
        return G.isBeforeOrEqual(this, t)
      }
      static isBeforeOrEqual(t, n) {
        return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column <= n.column
      }
      static compare(t, n) {
        const r = t.lineNumber | 0,
          s = n.lineNumber | 0
        if (r === s) {
          const i = t.column | 0,
            l = n.column | 0
          return i - l
        }
        return r - s
      }
      clone() {
        return new G(this.lineNumber, this.column)
      }
      toString() {
        return '(' + this.lineNumber + ',' + this.column + ')'
      }
      static lift(t) {
        return new G(t.lineNumber, t.column)
      }
      static isIPosition(t) {
        return t && typeof t.lineNumber == 'number' && typeof t.column == 'number'
      }
    }
    class k {
      constructor(t, n, r, s) {
        t > r || (t === r && n > s)
          ? ((this.startLineNumber = r), (this.startColumn = s), (this.endLineNumber = t), (this.endColumn = n))
          : ((this.startLineNumber = t), (this.startColumn = n), (this.endLineNumber = r), (this.endColumn = s))
      }
      isEmpty() {
        return k.isEmpty(this)
      }
      static isEmpty(t) {
        return t.startLineNumber === t.endLineNumber && t.startColumn === t.endColumn
      }
      containsPosition(t) {
        return k.containsPosition(this, t)
      }
      static containsPosition(t, n) {
        return !(
          n.lineNumber < t.startLineNumber ||
          n.lineNumber > t.endLineNumber ||
          (n.lineNumber === t.startLineNumber && n.column < t.startColumn) ||
          (n.lineNumber === t.endLineNumber && n.column > t.endColumn)
        )
      }
      static strictContainsPosition(t, n) {
        return !(
          n.lineNumber < t.startLineNumber ||
          n.lineNumber > t.endLineNumber ||
          (n.lineNumber === t.startLineNumber && n.column <= t.startColumn) ||
          (n.lineNumber === t.endLineNumber && n.column >= t.endColumn)
        )
      }
      containsRange(t) {
        return k.containsRange(this, t)
      }
      static containsRange(t, n) {
        return !(
          n.startLineNumber < t.startLineNumber ||
          n.endLineNumber < t.startLineNumber ||
          n.startLineNumber > t.endLineNumber ||
          n.endLineNumber > t.endLineNumber ||
          (n.startLineNumber === t.startLineNumber && n.startColumn < t.startColumn) ||
          (n.endLineNumber === t.endLineNumber && n.endColumn > t.endColumn)
        )
      }
      strictContainsRange(t) {
        return k.strictContainsRange(this, t)
      }
      static strictContainsRange(t, n) {
        return !(
          n.startLineNumber < t.startLineNumber ||
          n.endLineNumber < t.startLineNumber ||
          n.startLineNumber > t.endLineNumber ||
          n.endLineNumber > t.endLineNumber ||
          (n.startLineNumber === t.startLineNumber && n.startColumn <= t.startColumn) ||
          (n.endLineNumber === t.endLineNumber && n.endColumn >= t.endColumn)
        )
      }
      plusRange(t) {
        return k.plusRange(this, t)
      }
      static plusRange(t, n) {
        let r, s, i, l
        return (
          n.startLineNumber < t.startLineNumber
            ? ((r = n.startLineNumber), (s = n.startColumn))
            : n.startLineNumber === t.startLineNumber
              ? ((r = n.startLineNumber), (s = Math.min(n.startColumn, t.startColumn)))
              : ((r = t.startLineNumber), (s = t.startColumn)),
          n.endLineNumber > t.endLineNumber
            ? ((i = n.endLineNumber), (l = n.endColumn))
            : n.endLineNumber === t.endLineNumber
              ? ((i = n.endLineNumber), (l = Math.max(n.endColumn, t.endColumn)))
              : ((i = t.endLineNumber), (l = t.endColumn)),
          new k(r, s, i, l)
        )
      }
      intersectRanges(t) {
        return k.intersectRanges(this, t)
      }
      static intersectRanges(t, n) {
        let r = t.startLineNumber,
          s = t.startColumn,
          i = t.endLineNumber,
          l = t.endColumn
        const a = n.startLineNumber,
          c = n.startColumn,
          u = n.endLineNumber,
          h = n.endColumn
        return (
          r < a ? ((r = a), (s = c)) : r === a && (s = Math.max(s, c)),
          i > u ? ((i = u), (l = h)) : i === u && (l = Math.min(l, h)),
          r > i || (r === i && s > l) ? null : new k(r, s, i, l)
        )
      }
      equalsRange(t) {
        return k.equalsRange(this, t)
      }
      static equalsRange(t, n) {
        return !t && !n
          ? !0
          : !!t &&
              !!n &&
              t.startLineNumber === n.startLineNumber &&
              t.startColumn === n.startColumn &&
              t.endLineNumber === n.endLineNumber &&
              t.endColumn === n.endColumn
      }
      getEndPosition() {
        return k.getEndPosition(this)
      }
      static getEndPosition(t) {
        return new G(t.endLineNumber, t.endColumn)
      }
      getStartPosition() {
        return k.getStartPosition(this)
      }
      static getStartPosition(t) {
        return new G(t.startLineNumber, t.startColumn)
      }
      toString() {
        return (
          '[' + this.startLineNumber + ',' + this.startColumn + ' -> ' + this.endLineNumber + ',' + this.endColumn + ']'
        )
      }
      setEndPosition(t, n) {
        return new k(this.startLineNumber, this.startColumn, t, n)
      }
      setStartPosition(t, n) {
        return new k(t, n, this.endLineNumber, this.endColumn)
      }
      collapseToStart() {
        return k.collapseToStart(this)
      }
      static collapseToStart(t) {
        return new k(t.startLineNumber, t.startColumn, t.startLineNumber, t.startColumn)
      }
      collapseToEnd() {
        return k.collapseToEnd(this)
      }
      static collapseToEnd(t) {
        return new k(t.endLineNumber, t.endColumn, t.endLineNumber, t.endColumn)
      }
      delta(t) {
        return new k(this.startLineNumber + t, this.startColumn, this.endLineNumber + t, this.endColumn)
      }
      static fromPositions(t, n = t) {
        return new k(t.lineNumber, t.column, n.lineNumber, n.column)
      }
      static lift(t) {
        return t ? new k(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : null
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
      static areIntersectingOrTouching(t, n) {
        return !(
          t.endLineNumber < n.startLineNumber ||
          (t.endLineNumber === n.startLineNumber && t.endColumn < n.startColumn) ||
          n.endLineNumber < t.startLineNumber ||
          (n.endLineNumber === t.startLineNumber && n.endColumn < t.startColumn)
        )
      }
      static areIntersecting(t, n) {
        return !(
          t.endLineNumber < n.startLineNumber ||
          (t.endLineNumber === n.startLineNumber && t.endColumn <= n.startColumn) ||
          n.endLineNumber < t.startLineNumber ||
          (n.endLineNumber === t.startLineNumber && n.endColumn <= t.startColumn)
        )
      }
      static compareRangesUsingStarts(t, n) {
        if (t && n) {
          const i = t.startLineNumber | 0,
            l = n.startLineNumber | 0
          if (i === l) {
            const a = t.startColumn | 0,
              c = n.startColumn | 0
            if (a === c) {
              const u = t.endLineNumber | 0,
                h = n.endLineNumber | 0
              if (u === h) {
                const f = t.endColumn | 0,
                  d = n.endColumn | 0
                return f - d
              }
              return u - h
            }
            return a - c
          }
          return i - l
        }
        return (t ? 1 : 0) - (n ? 1 : 0)
      }
      static compareRangesUsingEnds(t, n) {
        return t.endLineNumber === n.endLineNumber
          ? t.endColumn === n.endColumn
            ? t.startLineNumber === n.startLineNumber
              ? t.startColumn - n.startColumn
              : t.startLineNumber - n.startLineNumber
            : t.endColumn - n.endColumn
          : t.endLineNumber - n.endLineNumber
      }
      static spansMultipleLines(t) {
        return t.endLineNumber > t.startLineNumber
      }
      toJSON() {
        return this
      }
    }
    function ao(e, t = 0) {
      return e[e.length - (1 + t)]
    }
    function uo(e) {
      if (e.length === 0) throw new Error('Invalid tail call')
      return [e.slice(0, e.length - 1), e[e.length - 1]]
    }
    function co(e, t, n = (r, s) => r === s) {
      if (e === t) return !0
      if (!e || !t || e.length !== t.length) return !1
      for (let r = 0, s = e.length; r < s; r++) if (!n(e[r], t[r])) return !1
      return !0
    }
    function fo(e, t) {
      const n = e.length - 1
      t < n && (e[t] = e[n]), e.pop()
    }
    function ho(e, t, n) {
      return Vs(e.length, (r) => n(e[r], t))
    }
    function Vs(e, t) {
      let n = 0,
        r = e - 1
      for (; n <= r; ) {
        const s = ((n + r) / 2) | 0,
          i = t(s)
        if (i < 0) n = s + 1
        else if (i > 0) r = s - 1
        else return s
      }
      return -(n + 1)
    }
    function mo(e, t) {
      let n = 0,
        r = e.length
      if (r === 0) return 0
      for (; n < r; ) {
        const s = Math.floor((n + r) / 2)
        t(e[s]) ? (r = s) : (n = s + 1)
      }
      return n
    }
    function nn(e, t, n) {
      if (((e = e | 0), e >= t.length)) throw new TypeError('invalid index')
      const r = t[Math.floor(t.length * Math.random())],
        s = [],
        i = [],
        l = []
      for (const a of t) {
        const c = n(a, r)
        c < 0 ? s.push(a) : c > 0 ? i.push(a) : l.push(a)
      }
      return e < s.length ? nn(e, s, n) : e < s.length + l.length ? l[0] : nn(e - (s.length + l.length), i, n)
    }
    function go(e, t) {
      const n = []
      let r
      for (const s of e.slice(0).sort(t)) !r || t(r[0], s) !== 0 ? ((r = [s]), n.push(r)) : r.push(s)
      return n
    }
    function bo(e) {
      return e.filter((t) => !!t)
    }
    function _o(e) {
      let t = 0
      for (let n = 0; n < e.length; n++) e[n] && ((e[t] = e[n]), (t += 1))
      e.length = t
    }
    function po(e) {
      return !Array.isArray(e) || e.length === 0
    }
    function xo(e) {
      return Array.isArray(e) && e.length > 0
    }
    function Lo(e, t = (n) => n) {
      const n = new Set()
      return e.filter((r) => {
        const s = t(r)
        return n.has(s) ? !1 : (n.add(s), !0)
      })
    }
    function wo(e, t) {
      const n = Us(e, t)
      if (n !== -1) return e[n]
    }
    function Us(e, t) {
      for (let n = e.length - 1; n >= 0; n--) {
        const r = e[n]
        if (t(r)) return n
      }
      return -1
    }
    function vo(e, t) {
      return e.length > 0 ? e[0] : t
    }
    function So(e, t) {
      let n = typeof t == 'number' ? e : 0
      typeof t == 'number' ? (n = e) : ((n = 0), (t = e))
      const r = []
      if (n <= t) for (let s = n; s < t; s++) r.push(s)
      else for (let s = n; s > t; s--) r.push(s)
      return r
    }
    function Co(e, t, n) {
      const r = e.slice(0, t),
        s = e.slice(t)
      return r.concat(n, s)
    }
    function No(e, t) {
      const n = e.indexOf(t)
      n > -1 && (e.splice(n, 1), e.unshift(t))
    }
    function Ao(e, t) {
      const n = e.indexOf(t)
      n > -1 && (e.splice(n, 1), e.push(t))
    }
    function yo(e, t) {
      for (const n of t) e.push(n)
    }
    function Eo(e) {
      return Array.isArray(e) ? e : [e]
    }
    function qs(e, t, n) {
      const r = rn(e, t),
        s = e.length,
        i = n.length
      e.length = s + i
      for (let l = s - 1; l >= r; l--) e[l + i] = e[l]
      for (let l = 0; l < i; l++) e[l + r] = n[l]
    }
    function Mo(e, t, n, r) {
      const s = rn(e, t),
        i = e.splice(s, n)
      return qs(e, s, r), i
    }
    function rn(e, t) {
      return t < 0 ? Math.max(t + e.length, 0) : Math.min(t, e.length)
    }
    var Yt
    ;(function (e) {
      function t(s) {
        return s < 0
      }
      e.isLessThan = t
      function n(s) {
        return s > 0
      }
      e.isGreaterThan = n
      function r(s) {
        return s === 0
      }
      ;(e.isNeitherLessOrGreaterThan = r), (e.greaterThan = 1), (e.lessThan = -1), (e.neitherLessOrGreaterThan = 0)
    })(Yt || (Yt = {}))
    function Ro(e, t) {
      return (n, r) => t(e(n), e(r))
    }
    const ko = (e, t) => e - t
    function Ws(e, t) {
      if (e.length === 0) return
      let n = e[0]
      for (let r = 1; r < e.length; r++) {
        const s = e[r]
        t(s, n) > 0 && (n = s)
      }
      return n
    }
    function Do(e, t) {
      if (e.length === 0) return
      let n = e[0]
      for (let r = 1; r < e.length; r++) {
        const s = e[r]
        t(s, n) >= 0 && (n = s)
      }
      return n
    }
    function Fo(e, t) {
      return Ws(e, (n, r) => -t(n, r))
    }
    class Po {
      constructor(t) {
        ;(this.items = t), (this.firstIdx = 0), (this.lastIdx = this.items.length - 1)
      }
      get length() {
        return this.lastIdx - this.firstIdx + 1
      }
      takeWhile(t) {
        let n = this.firstIdx
        for (; n < this.items.length && t(this.items[n]); ) n++
        const r = n === this.firstIdx ? null : this.items.slice(this.firstIdx, n)
        return (this.firstIdx = n), r
      }
      takeFromEndWhile(t) {
        let n = this.lastIdx
        for (; n >= 0 && t(this.items[n]); ) n--
        const r = n === this.lastIdx ? null : this.items.slice(n + 1, this.lastIdx + 1)
        return (this.lastIdx = n), r
      }
      peek() {
        if (this.length !== 0) return this.items[this.firstIdx]
      }
      dequeue() {
        const t = this.items[this.firstIdx]
        return this.firstIdx++, t
      }
      takeCount(t) {
        const n = this.items.slice(this.firstIdx, this.firstIdx + t)
        return (this.firstIdx += t), n
      }
    }
    class et {
      constructor(t) {
        this.iterate = t
      }
      toArray() {
        const t = []
        return this.iterate((n) => (t.push(n), !0)), t
      }
      filter(t) {
        return new et((n) => this.iterate((r) => (t(r) ? n(r) : !0)))
      }
      map(t) {
        return new et((n) => this.iterate((r) => n(t(r))))
      }
      findLast(t) {
        let n
        return this.iterate((r) => (t(r) && (n = r), !0)), n
      }
      findLastMaxBy(t) {
        let n,
          r = !0
        return this.iterate((s) => ((r || Yt.isGreaterThan(t(s, n))) && ((r = !1), (n = s)), !0)), n
      }
    }
    et.empty = new et((e) => {})
    function sn(e) {
      return e < 0 ? 0 : e > 255 ? 255 : e | 0
    }
    function We(e) {
      return e < 0 ? 0 : e > 4294967295 ? 4294967295 : e | 0
    }
    class Os {
      constructor(t) {
        ;(this.values = t),
          (this.prefixSum = new Uint32Array(t.length)),
          (this.prefixSumValidIndex = new Int32Array(1)),
          (this.prefixSumValidIndex[0] = -1)
      }
      insertValues(t, n) {
        t = We(t)
        const r = this.values,
          s = this.prefixSum,
          i = n.length
        return i === 0
          ? !1
          : ((this.values = new Uint32Array(r.length + i)),
            this.values.set(r.subarray(0, t), 0),
            this.values.set(r.subarray(t), t + i),
            this.values.set(n, t),
            t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1),
            (this.prefixSum = new Uint32Array(this.values.length)),
            this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(s.subarray(0, this.prefixSumValidIndex[0] + 1)),
            !0)
      }
      setValue(t, n) {
        return (
          (t = We(t)),
          (n = We(n)),
          this.values[t] === n
            ? !1
            : ((this.values[t] = n), t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), !0)
        )
      }
      removeValues(t, n) {
        ;(t = We(t)), (n = We(n))
        const r = this.values,
          s = this.prefixSum
        if (t >= r.length) return !1
        const i = r.length - t
        return (
          n >= i && (n = i),
          n === 0
            ? !1
            : ((this.values = new Uint32Array(r.length - n)),
              this.values.set(r.subarray(0, t), 0),
              this.values.set(r.subarray(t + n), t),
              (this.prefixSum = new Uint32Array(this.values.length)),
              t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1),
              this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(s.subarray(0, this.prefixSumValidIndex[0] + 1)),
              !0)
        )
      }
      getTotalSum() {
        return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1)
      }
      getPrefixSum(t) {
        return t < 0 ? 0 : ((t = We(t)), this._getPrefixSum(t))
      }
      _getPrefixSum(t) {
        if (t <= this.prefixSumValidIndex[0]) return this.prefixSum[t]
        let n = this.prefixSumValidIndex[0] + 1
        n === 0 && ((this.prefixSum[0] = this.values[0]), n++), t >= this.values.length && (t = this.values.length - 1)
        for (let r = n; r <= t; r++) this.prefixSum[r] = this.prefixSum[r - 1] + this.values[r]
        return (this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], t)), this.prefixSum[t]
      }
      getIndexOf(t) {
        ;(t = Math.floor(t)), this.getTotalSum()
        let n = 0,
          r = this.values.length - 1,
          s = 0,
          i = 0,
          l = 0
        for (; n <= r; )
          if (((s = (n + (r - n) / 2) | 0), (i = this.prefixSum[s]), (l = i - this.values[s]), t < l)) r = s - 1
          else if (t >= i) n = s + 1
          else break
        return new on(s, t - l)
      }
    }
    class Io {
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
        const n = this._indexBySum[t],
          r = n > 0 ? this._prefixSum[n - 1] : 0
        return new on(n, t - r)
      }
      removeValues(t, n) {
        this._values.splice(t, n), this._invalidate(t)
      }
      insertValues(t, n) {
        ;(this._values = arrayInsert(this._values, t, n)), this._invalidate(t)
      }
      _invalidate(t) {
        ;(this._isValid = !1), (this._validEndIndex = Math.min(this._validEndIndex, t - 1))
      }
      _ensureValid() {
        if (!this._isValid) {
          for (let t = this._validEndIndex + 1, n = this._values.length; t < n; t++) {
            const r = this._values[t],
              s = t > 0 ? this._prefixSum[t - 1] : 0
            this._prefixSum[t] = s + r
            for (let i = 0; i < r; i++) this._indexBySum[s + i] = t
          }
          ;(this._prefixSum.length = this._values.length),
            (this._indexBySum.length = this._prefixSum[this._prefixSum.length - 1]),
            (this._isValid = !0),
            (this._validEndIndex = this._values.length - 1)
        }
      }
      setValue(t, n) {
        this._values[t] !== n && ((this._values[t] = n), this._invalidate(t))
      }
    }
    class on {
      constructor(t, n) {
        ;(this.index = t),
          (this.remainder = n),
          (this._prefixSumIndexOfResultBrand = void 0),
          (this.index = t),
          (this.remainder = n)
      }
    }
    class Hs {
      constructor(t, n, r, s) {
        ;(this._uri = t),
          (this._lines = n),
          (this._eol = r),
          (this._versionId = s),
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
        const n = t.changes
        for (const r of n)
          this._acceptDeleteRange(r.range),
            this._acceptInsertText(new G(r.range.startLineNumber, r.range.startColumn), r.text)
        ;(this._versionId = t.versionId), (this._cachedTextValue = null)
      }
      _ensureLineStarts() {
        if (!this._lineStarts) {
          const t = this._eol.length,
            n = this._lines.length,
            r = new Uint32Array(n)
          for (let s = 0; s < n; s++) r[s] = this._lines[s].length + t
          this._lineStarts = new Os(r)
        }
      }
      _setLineText(t, n) {
        ;(this._lines[t] = n),
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
      _acceptInsertText(t, n) {
        if (n.length === 0) return
        const r = Kr(n)
        if (r.length === 1) {
          this._setLineText(
            t.lineNumber - 1,
            this._lines[t.lineNumber - 1].substring(0, t.column - 1) +
              r[0] +
              this._lines[t.lineNumber - 1].substring(t.column - 1),
          )
          return
        }
        ;(r[r.length - 1] += this._lines[t.lineNumber - 1].substring(t.column - 1)),
          this._setLineText(t.lineNumber - 1, this._lines[t.lineNumber - 1].substring(0, t.column - 1) + r[0])
        const s = new Uint32Array(r.length - 1)
        for (let i = 1; i < r.length; i++)
          this._lines.splice(t.lineNumber + i - 1, 0, r[i]), (s[i - 1] = r[i].length + this._eol.length)
        this._lineStarts && this._lineStarts.insertValues(t.lineNumber, s)
      }
    }
    const zs = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?'
    function $s(e = '') {
      let t = '(-?\\d*\\.\\d\\w*)|([^'
      for (const n of zs) e.indexOf(n) >= 0 || (t += '\\' + n)
      return (t += '\\s]+)'), new RegExp(t, 'g')
    }
    const ln = $s()
    function Gs(e) {
      let t = ln
      if (e && e instanceof RegExp)
        if (e.global) t = e
        else {
          let n = 'g'
          e.ignoreCase && (n += 'i'), e.multiline && (n += 'm'), e.unicode && (n += 'u'), (t = new RegExp(e.source, n))
        }
      return (t.lastIndex = 0), t
    }
    const an = new ct()
    an.unshift({ maxLen: 1e3, windowSize: 15, timeBudget: 150 })
    function Xt(e, t, n, r, s) {
      if ((s || (s = j.first(an)), n.length > s.maxLen)) {
        let u = e - s.maxLen / 2
        return u < 0 ? (u = 0) : (r += u), (n = n.substring(u, e + s.maxLen / 2)), Xt(e, t, n, r, s)
      }
      const i = Date.now(),
        l = e - 1 - r
      let a = -1,
        c = null
      for (let u = 1; !(Date.now() - i >= s.timeBudget); u++) {
        const h = l - s.windowSize * u
        t.lastIndex = Math.max(0, h)
        const f = js(t, n, l, a)
        if ((!f && c) || ((c = f), h <= 0)) break
        a = h
      }
      if (c) {
        const u = { word: c[0], startColumn: r + 1 + c.index, endColumn: r + 1 + c.index + c[0].length }
        return (t.lastIndex = 0), u
      }
      return null
    }
    function js(e, t, n, r) {
      let s
      for (; (s = e.exec(t)); ) {
        const i = s.index || 0
        if (i <= n && e.lastIndex >= n) return s
        if (r > 0 && i > r) return null
      }
      return null
    }
    class tt {
      constructor(t) {
        const n = sn(t)
        ;(this._defaultValue = n), (this._asciiMap = tt._createAsciiMap(n)), (this._map = new Map())
      }
      static _createAsciiMap(t) {
        const n = new Uint8Array(256)
        return n.fill(t), n
      }
      set(t, n) {
        const r = sn(n)
        t >= 0 && t < 256 ? (this._asciiMap[t] = r) : this._map.set(t, r)
      }
      get(t) {
        return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue
      }
      clear() {
        this._asciiMap.fill(this._defaultValue), this._map.clear()
      }
    }
    class To {
      constructor() {
        this._actual = new tt(0)
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
    class Qs {
      constructor(t, n, r) {
        const s = new Uint8Array(t * n)
        for (let i = 0, l = t * n; i < l; i++) s[i] = r
        ;(this._data = s), (this.rows = t), (this.cols = n)
      }
      get(t, n) {
        return this._data[t * this.cols + n]
      }
      set(t, n, r) {
        this._data[t * this.cols + n] = r
      }
    }
    class Ys {
      constructor(t) {
        let n = 0,
          r = 0
        for (let i = 0, l = t.length; i < l; i++) {
          const [a, c, u] = t[i]
          c > n && (n = c), a > r && (r = a), u > r && (r = u)
        }
        n++, r++
        const s = new Qs(r, n, 0)
        for (let i = 0, l = t.length; i < l; i++) {
          const [a, c, u] = t[i]
          s.set(a, c, u)
        }
        ;(this._states = s), (this._maxCharCode = n)
      }
      nextState(t, n) {
        return n < 0 || n >= this._maxCharCode ? 0 : this._states.get(t, n)
      }
    }
    let Zt = null
    function Xs() {
      return (
        Zt === null &&
          (Zt = new Ys([
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
        Zt
      )
    }
    let nt = null
    function Zs() {
      if (nt === null) {
        nt = new tt(0)
        const e = ` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026`
        for (let n = 0; n < e.length; n++) nt.set(e.charCodeAt(n), 1)
        const t = '.,;:'
        for (let n = 0; n < t.length; n++) nt.set(t.charCodeAt(n), 2)
      }
      return nt
    }
    class Lt {
      static _createLink(t, n, r, s, i) {
        let l = i - 1
        do {
          const a = n.charCodeAt(l)
          if (t.get(a) !== 2) break
          l--
        } while (l > s)
        if (s > 0) {
          const a = n.charCodeAt(s - 1),
            c = n.charCodeAt(l)
          ;((a === 40 && c === 41) || (a === 91 && c === 93) || (a === 123 && c === 125)) && l--
        }
        return {
          range: { startLineNumber: r, startColumn: s + 1, endLineNumber: r, endColumn: l + 2 },
          url: n.substring(s, l + 1),
        }
      }
      static computeLinks(t, n = Xs()) {
        const r = Zs(),
          s = []
        for (let i = 1, l = t.getLineCount(); i <= l; i++) {
          const a = t.getLineContent(i),
            c = a.length
          let u = 0,
            h = 0,
            f = 0,
            d = 1,
            m = !1,
            b = !1,
            C = !1,
            w = !1
          for (; u < c; ) {
            let _ = !1
            const S = a.charCodeAt(u)
            if (d === 13) {
              let L
              switch (S) {
                case 40:
                  ;(m = !0), (L = 0)
                  break
                case 41:
                  L = m ? 0 : 1
                  break
                case 91:
                  ;(C = !0), (b = !0), (L = 0)
                  break
                case 93:
                  ;(C = !1), (L = b ? 0 : 1)
                  break
                case 123:
                  ;(w = !0), (L = 0)
                  break
                case 125:
                  L = w ? 0 : 1
                  break
                case 39:
                case 34:
                case 96:
                  f === S ? (L = 1) : f === 39 || f === 34 || f === 96 ? (L = 0) : (L = 1)
                  break
                case 42:
                  L = f === 42 ? 1 : 0
                  break
                case 124:
                  L = f === 124 ? 1 : 0
                  break
                case 32:
                  L = C ? 0 : 1
                  break
                default:
                  L = r.get(S)
              }
              L === 1 && (s.push(Lt._createLink(r, a, i, h, u)), (_ = !0))
            } else if (d === 12) {
              let L
              S === 91 ? ((b = !0), (L = 0)) : (L = r.get(S)), L === 1 ? (_ = !0) : (d = 13)
            } else (d = n.nextState(d, S)), d === 0 && (_ = !0)
            _ && ((d = 1), (m = !1), (b = !1), (w = !1), (h = u + 1), (f = S)), u++
          }
          d === 13 && s.push(Lt._createLink(r, a, i, h, c))
        }
        return s
      }
    }
    function Js(e) {
      return !e || typeof e.getLineCount != 'function' || typeof e.getLineContent != 'function'
        ? []
        : Lt.computeLinks(e)
    }
    class Jt {
      constructor() {
        this._defaultValueSet = [
          ['true', 'false'],
          ['True', 'False'],
          ['Private', 'Public', 'Friend', 'ReadOnly', 'Partial', 'Protected', 'WriteOnly'],
          ['public', 'protected', 'private'],
        ]
      }
      navigateValueSet(t, n, r, s, i) {
        if (t && n) {
          const l = this.doNavigateValueSet(n, i)
          if (l) return { range: t, value: l }
        }
        if (r && s) {
          const l = this.doNavigateValueSet(s, i)
          if (l) return { range: r, value: l }
        }
        return null
      }
      doNavigateValueSet(t, n) {
        const r = this.numberReplace(t, n)
        return r !== null ? r : this.textReplace(t, n)
      }
      numberReplace(t, n) {
        const r = Math.pow(10, t.length - (t.lastIndexOf('.') + 1))
        let s = Number(t)
        const i = parseFloat(t)
        return !isNaN(s) && !isNaN(i) && s === i
          ? s === 0 && !n
            ? null
            : ((s = Math.floor(s * r)), (s += n ? r : -r), String(s / r))
          : null
      }
      textReplace(t, n) {
        return this.valueSetsReplace(this._defaultValueSet, t, n)
      }
      valueSetsReplace(t, n, r) {
        let s = null
        for (let i = 0, l = t.length; s === null && i < l; i++) s = this.valueSetReplace(t[i], n, r)
        return s
      }
      valueSetReplace(t, n, r) {
        let s = t.indexOf(n)
        return s >= 0 ? ((s += r ? 1 : -1), s < 0 ? (s = t.length - 1) : (s %= t.length), t[s]) : null
      }
    }
    Jt.INSTANCE = new Jt()
    const un = Object.freeze(function (e, t) {
      const n = setTimeout(e.bind(t), 0)
      return {
        dispose() {
          clearTimeout(n)
        },
      }
    })
    var wt
    ;(function (e) {
      function t(n) {
        return n === e.None || n === e.Cancelled || n instanceof vt
          ? !0
          : !n || typeof n != 'object'
            ? !1
            : typeof n.isCancellationRequested == 'boolean' && typeof n.onCancellationRequested == 'function'
      }
      ;(e.isCancellationToken = t),
        (e.None = Object.freeze({ isCancellationRequested: !1, onCancellationRequested: gt.None })),
        (e.Cancelled = Object.freeze({ isCancellationRequested: !0, onCancellationRequested: un }))
    })(wt || (wt = {}))
    class vt {
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
        return this._isCancelled ? un : (this._emitter || (this._emitter = new ee()), this._emitter.event)
      }
      dispose() {
        this._emitter && (this._emitter.dispose(), (this._emitter = null))
      }
    }
    class Ks {
      constructor(t) {
        ;(this._token = void 0),
          (this._parentListener = void 0),
          (this._parentListener = t && t.onCancellationRequested(this.cancel, this))
      }
      get token() {
        return this._token || (this._token = new vt()), this._token
      }
      cancel() {
        this._token ? this._token instanceof vt && this._token.cancel() : (this._token = wt.Cancelled)
      }
      dispose(t = !1) {
        var n
        t && this.cancel(),
          (n = this._parentListener) === null || n === void 0 || n.dispose(),
          this._token ? this._token instanceof vt && this._token.dispose() : (this._token = wt.None)
      }
    }
    class Kt {
      constructor() {
        ;(this._keyCodeToStr = []), (this._strToKeyCode = Object.create(null))
      }
      define(t, n) {
        ;(this._keyCodeToStr[t] = n), (this._strToKeyCode[n.toLowerCase()] = t)
      }
      keyCodeToStr(t) {
        return this._keyCodeToStr[t]
      }
      strToKeyCode(t) {
        return this._strToKeyCode[t.toLowerCase()] || 0
      }
    }
    const St = new Kt(),
      e1 = new Kt(),
      t1 = new Kt(),
      ei = new Array(230),
      ti = {},
      ni = [],
      ri = Object.create(null),
      si = Object.create(null),
      cn = [],
      n1 = []
    for (let e = 0; e <= 193; e++) cn[e] = -1
    for (let e = 0; e <= 127; e++) n1[e] = -1
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
        n = [],
        r = []
      for (const s of t) {
        const [i, l, a, c, u, h, f, d, m, b] = s
        if (
          (r[a] ||
            ((r[a] = !0),
            (ni[a] = c),
            (ri[c] = a),
            (si[c.toLowerCase()] = a),
            l && ((cn[a] = u), u !== 0 && u !== 3 && u !== 5 && u !== 4 && u !== 6 && u !== 57 && (n1[u] = a))),
          !n[u])
        ) {
          if (((n[u] = !0), !h))
            throw new Error(`String representation missing for key code ${u} around scan code ${c}`)
          St.define(u, h), e1.define(u, m || h), t1.define(u, b || m || h)
        }
        f && (ei[f] = u), d && (ti[d] = u)
      }
      n1[3] = 46
    })()
    var fn
    ;(function (e) {
      function t(a) {
        return St.keyCodeToStr(a)
      }
      e.toString = t
      function n(a) {
        return St.strToKeyCode(a)
      }
      e.fromString = n
      function r(a) {
        return e1.keyCodeToStr(a)
      }
      e.toUserSettingsUS = r
      function s(a) {
        return t1.keyCodeToStr(a)
      }
      e.toUserSettingsGeneral = s
      function i(a) {
        return e1.strToKeyCode(a) || t1.strToKeyCode(a)
      }
      e.fromUserSettings = i
      function l(a) {
        if (a >= 93 && a <= 108) return null
        switch (a) {
          case 16:
            return 'Up'
          case 18:
            return 'Down'
          case 15:
            return 'Left'
          case 17:
            return 'Right'
        }
        return St.keyCodeToStr(a)
      }
      e.toElectronAccelerator = l
    })(fn || (fn = {}))
    function ii(e, t) {
      const n = ((t & 65535) << 16) >>> 0
      return (e | n) >>> 0
    }
    class Z extends k {
      constructor(t, n, r, s) {
        super(t, n, r, s),
          (this.selectionStartLineNumber = t),
          (this.selectionStartColumn = n),
          (this.positionLineNumber = r),
          (this.positionColumn = s)
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
        return Z.selectionsEqual(this, t)
      }
      static selectionsEqual(t, n) {
        return (
          t.selectionStartLineNumber === n.selectionStartLineNumber &&
          t.selectionStartColumn === n.selectionStartColumn &&
          t.positionLineNumber === n.positionLineNumber &&
          t.positionColumn === n.positionColumn
        )
      }
      getDirection() {
        return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn
          ? 0
          : 1
      }
      setEndPosition(t, n) {
        return this.getDirection() === 0
          ? new Z(this.startLineNumber, this.startColumn, t, n)
          : new Z(t, n, this.startLineNumber, this.startColumn)
      }
      getPosition() {
        return new G(this.positionLineNumber, this.positionColumn)
      }
      getSelectionStart() {
        return new G(this.selectionStartLineNumber, this.selectionStartColumn)
      }
      setStartPosition(t, n) {
        return this.getDirection() === 0
          ? new Z(t, n, this.endLineNumber, this.endColumn)
          : new Z(this.endLineNumber, this.endColumn, t, n)
      }
      static fromPositions(t, n = t) {
        return new Z(t.lineNumber, t.column, n.lineNumber, n.column)
      }
      static fromRange(t, n) {
        return n === 0
          ? new Z(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn)
          : new Z(t.endLineNumber, t.endColumn, t.startLineNumber, t.startColumn)
      }
      static liftSelection(t) {
        return new Z(t.selectionStartLineNumber, t.selectionStartColumn, t.positionLineNumber, t.positionColumn)
      }
      static selectionsArrEqual(t, n) {
        if ((t && !n) || (!t && n)) return !1
        if (!t && !n) return !0
        if (t.length !== n.length) return !1
        for (let r = 0, s = t.length; r < s; r++) if (!this.selectionsEqual(t[r], n[r])) return !1
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
      static createWithDirection(t, n, r, s, i) {
        return i === 0 ? new Z(t, n, r, s) : new Z(r, s, t, n)
      }
    }
    function hn(e) {
      return typeof e == 'string'
    }
    function Bo(e) {
      return typeof e == 'object' && e !== null && !Array.isArray(e) && !(e instanceof RegExp) && !(e instanceof Date)
    }
    function Vo(e) {
      const t = Object.getPrototypeOf(Uint8Array)
      return typeof e == 'object' && e instanceof t
    }
    function Uo(e) {
      return typeof e == 'number' && !isNaN(e)
    }
    function qo(e) {
      return !!e && typeof e[Symbol.iterator] == 'function'
    }
    function Wo(e) {
      return e === !0 || e === !1
    }
    function oi(e) {
      return typeof e == 'undefined'
    }
    function Oo(e) {
      return !r1(e)
    }
    function r1(e) {
      return oi(e) || e === null
    }
    function Ho(e, t) {
      if (!e) throw new Error(t ? `Unexpected type, expected '${t}'` : 'Unexpected type')
    }
    function zo(e) {
      if (r1(e)) throw new Error('Assertion Failed: argument is undefined or null')
      return e
    }
    function li(e) {
      return typeof e == 'function'
    }
    function $o(e, t) {
      const n = Math.min(e.length, t.length)
      for (let r = 0; r < n; r++) ai(e[r], t[r])
    }
    function ai(e, t) {
      if (hn(t)) {
        if (typeof e !== t) throw new Error(`argument does not match constraint: typeof ${t}`)
      } else if (li(t)) {
        try {
          if (e instanceof t) return
        } catch (n) {}
        if ((!r1(e) && e.constructor === t) || (t.length === 1 && t.call(void 0, e) === !0)) return
        throw new Error(
          'argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true',
        )
      }
    }
    function Go(e) {
      return e === null ? void 0 : e
    }
    const s1 = Object.create(null)
    function o(e, t) {
      if (hn(t)) {
        const n = s1[t]
        if (n === void 0) throw new Error(`${e} references an unknown codicon: ${t}`)
        t = n
      }
      return (s1[e] = t), { id: e }
    }
    function jo() {
      return s1
    }
    const N = {
      add: o('add', 6e4),
      plus: o('plus', 6e4),
      gistNew: o('gist-new', 6e4),
      repoCreate: o('repo-create', 6e4),
      lightbulb: o('lightbulb', 60001),
      lightBulb: o('light-bulb', 60001),
      repo: o('repo', 60002),
      repoDelete: o('repo-delete', 60002),
      gistFork: o('gist-fork', 60003),
      repoForked: o('repo-forked', 60003),
      gitPullRequest: o('git-pull-request', 60004),
      gitPullRequestAbandoned: o('git-pull-request-abandoned', 60004),
      recordKeys: o('record-keys', 60005),
      keyboard: o('keyboard', 60005),
      tag: o('tag', 60006),
      tagAdd: o('tag-add', 60006),
      tagRemove: o('tag-remove', 60006),
      person: o('person', 60007),
      personFollow: o('person-follow', 60007),
      personOutline: o('person-outline', 60007),
      personFilled: o('person-filled', 60007),
      gitBranch: o('git-branch', 60008),
      gitBranchCreate: o('git-branch-create', 60008),
      gitBranchDelete: o('git-branch-delete', 60008),
      sourceControl: o('source-control', 60008),
      mirror: o('mirror', 60009),
      mirrorPublic: o('mirror-public', 60009),
      star: o('star', 60010),
      starAdd: o('star-add', 60010),
      starDelete: o('star-delete', 60010),
      starEmpty: o('star-empty', 60010),
      comment: o('comment', 60011),
      commentAdd: o('comment-add', 60011),
      alert: o('alert', 60012),
      warning: o('warning', 60012),
      search: o('search', 60013),
      searchSave: o('search-save', 60013),
      logOut: o('log-out', 60014),
      signOut: o('sign-out', 60014),
      logIn: o('log-in', 60015),
      signIn: o('sign-in', 60015),
      eye: o('eye', 60016),
      eyeUnwatch: o('eye-unwatch', 60016),
      eyeWatch: o('eye-watch', 60016),
      circleFilled: o('circle-filled', 60017),
      primitiveDot: o('primitive-dot', 60017),
      closeDirty: o('close-dirty', 60017),
      debugBreakpoint: o('debug-breakpoint', 60017),
      debugBreakpointDisabled: o('debug-breakpoint-disabled', 60017),
      debugHint: o('debug-hint', 60017),
      primitiveSquare: o('primitive-square', 60018),
      edit: o('edit', 60019),
      pencil: o('pencil', 60019),
      info: o('info', 60020),
      issueOpened: o('issue-opened', 60020),
      gistPrivate: o('gist-private', 60021),
      gitForkPrivate: o('git-fork-private', 60021),
      lock: o('lock', 60021),
      mirrorPrivate: o('mirror-private', 60021),
      close: o('close', 60022),
      removeClose: o('remove-close', 60022),
      x: o('x', 60022),
      repoSync: o('repo-sync', 60023),
      sync: o('sync', 60023),
      clone: o('clone', 60024),
      desktopDownload: o('desktop-download', 60024),
      beaker: o('beaker', 60025),
      microscope: o('microscope', 60025),
      vm: o('vm', 60026),
      deviceDesktop: o('device-desktop', 60026),
      file: o('file', 60027),
      fileText: o('file-text', 60027),
      more: o('more', 60028),
      ellipsis: o('ellipsis', 60028),
      kebabHorizontal: o('kebab-horizontal', 60028),
      mailReply: o('mail-reply', 60029),
      reply: o('reply', 60029),
      organization: o('organization', 60030),
      organizationFilled: o('organization-filled', 60030),
      organizationOutline: o('organization-outline', 60030),
      newFile: o('new-file', 60031),
      fileAdd: o('file-add', 60031),
      newFolder: o('new-folder', 60032),
      fileDirectoryCreate: o('file-directory-create', 60032),
      trash: o('trash', 60033),
      trashcan: o('trashcan', 60033),
      history: o('history', 60034),
      clock: o('clock', 60034),
      folder: o('folder', 60035),
      fileDirectory: o('file-directory', 60035),
      symbolFolder: o('symbol-folder', 60035),
      logoGithub: o('logo-github', 60036),
      markGithub: o('mark-github', 60036),
      github: o('github', 60036),
      terminal: o('terminal', 60037),
      console: o('console', 60037),
      repl: o('repl', 60037),
      zap: o('zap', 60038),
      symbolEvent: o('symbol-event', 60038),
      error: o('error', 60039),
      stop: o('stop', 60039),
      variable: o('variable', 60040),
      symbolVariable: o('symbol-variable', 60040),
      array: o('array', 60042),
      symbolArray: o('symbol-array', 60042),
      symbolModule: o('symbol-module', 60043),
      symbolPackage: o('symbol-package', 60043),
      symbolNamespace: o('symbol-namespace', 60043),
      symbolObject: o('symbol-object', 60043),
      symbolMethod: o('symbol-method', 60044),
      symbolFunction: o('symbol-function', 60044),
      symbolConstructor: o('symbol-constructor', 60044),
      symbolBoolean: o('symbol-boolean', 60047),
      symbolNull: o('symbol-null', 60047),
      symbolNumeric: o('symbol-numeric', 60048),
      symbolNumber: o('symbol-number', 60048),
      symbolStructure: o('symbol-structure', 60049),
      symbolStruct: o('symbol-struct', 60049),
      symbolParameter: o('symbol-parameter', 60050),
      symbolTypeParameter: o('symbol-type-parameter', 60050),
      symbolKey: o('symbol-key', 60051),
      symbolText: o('symbol-text', 60051),
      symbolReference: o('symbol-reference', 60052),
      goToFile: o('go-to-file', 60052),
      symbolEnum: o('symbol-enum', 60053),
      symbolValue: o('symbol-value', 60053),
      symbolRuler: o('symbol-ruler', 60054),
      symbolUnit: o('symbol-unit', 60054),
      activateBreakpoints: o('activate-breakpoints', 60055),
      archive: o('archive', 60056),
      arrowBoth: o('arrow-both', 60057),
      arrowDown: o('arrow-down', 60058),
      arrowLeft: o('arrow-left', 60059),
      arrowRight: o('arrow-right', 60060),
      arrowSmallDown: o('arrow-small-down', 60061),
      arrowSmallLeft: o('arrow-small-left', 60062),
      arrowSmallRight: o('arrow-small-right', 60063),
      arrowSmallUp: o('arrow-small-up', 60064),
      arrowUp: o('arrow-up', 60065),
      bell: o('bell', 60066),
      bold: o('bold', 60067),
      book: o('book', 60068),
      bookmark: o('bookmark', 60069),
      debugBreakpointConditionalUnverified: o('debug-breakpoint-conditional-unverified', 60070),
      debugBreakpointConditional: o('debug-breakpoint-conditional', 60071),
      debugBreakpointConditionalDisabled: o('debug-breakpoint-conditional-disabled', 60071),
      debugBreakpointDataUnverified: o('debug-breakpoint-data-unverified', 60072),
      debugBreakpointData: o('debug-breakpoint-data', 60073),
      debugBreakpointDataDisabled: o('debug-breakpoint-data-disabled', 60073),
      debugBreakpointLogUnverified: o('debug-breakpoint-log-unverified', 60074),
      debugBreakpointLog: o('debug-breakpoint-log', 60075),
      debugBreakpointLogDisabled: o('debug-breakpoint-log-disabled', 60075),
      briefcase: o('briefcase', 60076),
      broadcast: o('broadcast', 60077),
      browser: o('browser', 60078),
      bug: o('bug', 60079),
      calendar: o('calendar', 60080),
      caseSensitive: o('case-sensitive', 60081),
      check: o('check', 60082),
      checklist: o('checklist', 60083),
      chevronDown: o('chevron-down', 60084),
      dropDownButton: o('drop-down-button', 60084),
      chevronLeft: o('chevron-left', 60085),
      chevronRight: o('chevron-right', 60086),
      chevronUp: o('chevron-up', 60087),
      chromeClose: o('chrome-close', 60088),
      chromeMaximize: o('chrome-maximize', 60089),
      chromeMinimize: o('chrome-minimize', 60090),
      chromeRestore: o('chrome-restore', 60091),
      circle: o('circle', 60092),
      circleOutline: o('circle-outline', 60092),
      debugBreakpointUnverified: o('debug-breakpoint-unverified', 60092),
      circleSlash: o('circle-slash', 60093),
      circuitBoard: o('circuit-board', 60094),
      clearAll: o('clear-all', 60095),
      clippy: o('clippy', 60096),
      closeAll: o('close-all', 60097),
      cloudDownload: o('cloud-download', 60098),
      cloudUpload: o('cloud-upload', 60099),
      code: o('code', 60100),
      collapseAll: o('collapse-all', 60101),
      colorMode: o('color-mode', 60102),
      commentDiscussion: o('comment-discussion', 60103),
      compareChanges: o('compare-changes', 60157),
      creditCard: o('credit-card', 60105),
      dash: o('dash', 60108),
      dashboard: o('dashboard', 60109),
      database: o('database', 60110),
      debugContinue: o('debug-continue', 60111),
      debugDisconnect: o('debug-disconnect', 60112),
      debugPause: o('debug-pause', 60113),
      debugRestart: o('debug-restart', 60114),
      debugStart: o('debug-start', 60115),
      debugStepInto: o('debug-step-into', 60116),
      debugStepOut: o('debug-step-out', 60117),
      debugStepOver: o('debug-step-over', 60118),
      debugStop: o('debug-stop', 60119),
      debug: o('debug', 60120),
      deviceCameraVideo: o('device-camera-video', 60121),
      deviceCamera: o('device-camera', 60122),
      deviceMobile: o('device-mobile', 60123),
      diffAdded: o('diff-added', 60124),
      diffIgnored: o('diff-ignored', 60125),
      diffModified: o('diff-modified', 60126),
      diffRemoved: o('diff-removed', 60127),
      diffRenamed: o('diff-renamed', 60128),
      diff: o('diff', 60129),
      discard: o('discard', 60130),
      editorLayout: o('editor-layout', 60131),
      emptyWindow: o('empty-window', 60132),
      exclude: o('exclude', 60133),
      extensions: o('extensions', 60134),
      eyeClosed: o('eye-closed', 60135),
      fileBinary: o('file-binary', 60136),
      fileCode: o('file-code', 60137),
      fileMedia: o('file-media', 60138),
      filePdf: o('file-pdf', 60139),
      fileSubmodule: o('file-submodule', 60140),
      fileSymlinkDirectory: o('file-symlink-directory', 60141),
      fileSymlinkFile: o('file-symlink-file', 60142),
      fileZip: o('file-zip', 60143),
      files: o('files', 60144),
      filter: o('filter', 60145),
      flame: o('flame', 60146),
      foldDown: o('fold-down', 60147),
      foldUp: o('fold-up', 60148),
      fold: o('fold', 60149),
      folderActive: o('folder-active', 60150),
      folderOpened: o('folder-opened', 60151),
      gear: o('gear', 60152),
      gift: o('gift', 60153),
      gistSecret: o('gist-secret', 60154),
      gist: o('gist', 60155),
      gitCommit: o('git-commit', 60156),
      gitCompare: o('git-compare', 60157),
      gitMerge: o('git-merge', 60158),
      githubAction: o('github-action', 60159),
      githubAlt: o('github-alt', 60160),
      globe: o('globe', 60161),
      grabber: o('grabber', 60162),
      graph: o('graph', 60163),
      gripper: o('gripper', 60164),
      heart: o('heart', 60165),
      home: o('home', 60166),
      horizontalRule: o('horizontal-rule', 60167),
      hubot: o('hubot', 60168),
      inbox: o('inbox', 60169),
      issueClosed: o('issue-closed', 60324),
      issueReopened: o('issue-reopened', 60171),
      issues: o('issues', 60172),
      italic: o('italic', 60173),
      jersey: o('jersey', 60174),
      json: o('json', 60175),
      bracket: o('bracket', 60175),
      kebabVertical: o('kebab-vertical', 60176),
      key: o('key', 60177),
      law: o('law', 60178),
      lightbulbAutofix: o('lightbulb-autofix', 60179),
      linkExternal: o('link-external', 60180),
      link: o('link', 60181),
      listOrdered: o('list-ordered', 60182),
      listUnordered: o('list-unordered', 60183),
      liveShare: o('live-share', 60184),
      loading: o('loading', 60185),
      location: o('location', 60186),
      mailRead: o('mail-read', 60187),
      mail: o('mail', 60188),
      markdown: o('markdown', 60189),
      megaphone: o('megaphone', 60190),
      mention: o('mention', 60191),
      milestone: o('milestone', 60192),
      mortarBoard: o('mortar-board', 60193),
      move: o('move', 60194),
      multipleWindows: o('multiple-windows', 60195),
      mute: o('mute', 60196),
      noNewline: o('no-newline', 60197),
      note: o('note', 60198),
      octoface: o('octoface', 60199),
      openPreview: o('open-preview', 60200),
      package_: o('package', 60201),
      paintcan: o('paintcan', 60202),
      pin: o('pin', 60203),
      play: o('play', 60204),
      run: o('run', 60204),
      plug: o('plug', 60205),
      preserveCase: o('preserve-case', 60206),
      preview: o('preview', 60207),
      project: o('project', 60208),
      pulse: o('pulse', 60209),
      question: o('question', 60210),
      quote: o('quote', 60211),
      radioTower: o('radio-tower', 60212),
      reactions: o('reactions', 60213),
      references: o('references', 60214),
      refresh: o('refresh', 60215),
      regex: o('regex', 60216),
      remoteExplorer: o('remote-explorer', 60217),
      remote: o('remote', 60218),
      remove: o('remove', 60219),
      replaceAll: o('replace-all', 60220),
      replace: o('replace', 60221),
      repoClone: o('repo-clone', 60222),
      repoForcePush: o('repo-force-push', 60223),
      repoPull: o('repo-pull', 60224),
      repoPush: o('repo-push', 60225),
      report: o('report', 60226),
      requestChanges: o('request-changes', 60227),
      rocket: o('rocket', 60228),
      rootFolderOpened: o('root-folder-opened', 60229),
      rootFolder: o('root-folder', 60230),
      rss: o('rss', 60231),
      ruby: o('ruby', 60232),
      saveAll: o('save-all', 60233),
      saveAs: o('save-as', 60234),
      save: o('save', 60235),
      screenFull: o('screen-full', 60236),
      screenNormal: o('screen-normal', 60237),
      searchStop: o('search-stop', 60238),
      server: o('server', 60240),
      settingsGear: o('settings-gear', 60241),
      settings: o('settings', 60242),
      shield: o('shield', 60243),
      smiley: o('smiley', 60244),
      sortPrecedence: o('sort-precedence', 60245),
      splitHorizontal: o('split-horizontal', 60246),
      splitVertical: o('split-vertical', 60247),
      squirrel: o('squirrel', 60248),
      starFull: o('star-full', 60249),
      starHalf: o('star-half', 60250),
      symbolClass: o('symbol-class', 60251),
      symbolColor: o('symbol-color', 60252),
      symbolCustomColor: o('symbol-customcolor', 60252),
      symbolConstant: o('symbol-constant', 60253),
      symbolEnumMember: o('symbol-enum-member', 60254),
      symbolField: o('symbol-field', 60255),
      symbolFile: o('symbol-file', 60256),
      symbolInterface: o('symbol-interface', 60257),
      symbolKeyword: o('symbol-keyword', 60258),
      symbolMisc: o('symbol-misc', 60259),
      symbolOperator: o('symbol-operator', 60260),
      symbolProperty: o('symbol-property', 60261),
      wrench: o('wrench', 60261),
      wrenchSubaction: o('wrench-subaction', 60261),
      symbolSnippet: o('symbol-snippet', 60262),
      tasklist: o('tasklist', 60263),
      telescope: o('telescope', 60264),
      textSize: o('text-size', 60265),
      threeBars: o('three-bars', 60266),
      thumbsdown: o('thumbsdown', 60267),
      thumbsup: o('thumbsup', 60268),
      tools: o('tools', 60269),
      triangleDown: o('triangle-down', 60270),
      triangleLeft: o('triangle-left', 60271),
      triangleRight: o('triangle-right', 60272),
      triangleUp: o('triangle-up', 60273),
      twitter: o('twitter', 60274),
      unfold: o('unfold', 60275),
      unlock: o('unlock', 60276),
      unmute: o('unmute', 60277),
      unverified: o('unverified', 60278),
      verified: o('verified', 60279),
      versions: o('versions', 60280),
      vmActive: o('vm-active', 60281),
      vmOutline: o('vm-outline', 60282),
      vmRunning: o('vm-running', 60283),
      watch: o('watch', 60284),
      whitespace: o('whitespace', 60285),
      wholeWord: o('whole-word', 60286),
      window: o('window', 60287),
      wordWrap: o('word-wrap', 60288),
      zoomIn: o('zoom-in', 60289),
      zoomOut: o('zoom-out', 60290),
      listFilter: o('list-filter', 60291),
      listFlat: o('list-flat', 60292),
      listSelection: o('list-selection', 60293),
      selection: o('selection', 60293),
      listTree: o('list-tree', 60294),
      debugBreakpointFunctionUnverified: o('debug-breakpoint-function-unverified', 60295),
      debugBreakpointFunction: o('debug-breakpoint-function', 60296),
      debugBreakpointFunctionDisabled: o('debug-breakpoint-function-disabled', 60296),
      debugStackframeActive: o('debug-stackframe-active', 60297),
      circleSmallFilled: o('circle-small-filled', 60298),
      debugStackframeDot: o('debug-stackframe-dot', 60298),
      debugStackframe: o('debug-stackframe', 60299),
      debugStackframeFocused: o('debug-stackframe-focused', 60299),
      debugBreakpointUnsupported: o('debug-breakpoint-unsupported', 60300),
      symbolString: o('symbol-string', 60301),
      debugReverseContinue: o('debug-reverse-continue', 60302),
      debugStepBack: o('debug-step-back', 60303),
      debugRestartFrame: o('debug-restart-frame', 60304),
      callIncoming: o('call-incoming', 60306),
      callOutgoing: o('call-outgoing', 60307),
      menu: o('menu', 60308),
      expandAll: o('expand-all', 60309),
      feedback: o('feedback', 60310),
      groupByRefType: o('group-by-ref-type', 60311),
      ungroupByRefType: o('ungroup-by-ref-type', 60312),
      account: o('account', 60313),
      bellDot: o('bell-dot', 60314),
      debugConsole: o('debug-console', 60315),
      library: o('library', 60316),
      output: o('output', 60317),
      runAll: o('run-all', 60318),
      syncIgnored: o('sync-ignored', 60319),
      pinned: o('pinned', 60320),
      githubInverted: o('github-inverted', 60321),
      debugAlt: o('debug-alt', 60305),
      serverProcess: o('server-process', 60322),
      serverEnvironment: o('server-environment', 60323),
      pass: o('pass', 60324),
      stopCircle: o('stop-circle', 60325),
      playCircle: o('play-circle', 60326),
      record: o('record', 60327),
      debugAltSmall: o('debug-alt-small', 60328),
      vmConnect: o('vm-connect', 60329),
      cloud: o('cloud', 60330),
      merge: o('merge', 60331),
      exportIcon: o('export', 60332),
      graphLeft: o('graph-left', 60333),
      magnet: o('magnet', 60334),
      notebook: o('notebook', 60335),
      redo: o('redo', 60336),
      checkAll: o('check-all', 60337),
      pinnedDirty: o('pinned-dirty', 60338),
      passFilled: o('pass-filled', 60339),
      circleLargeFilled: o('circle-large-filled', 60340),
      circleLarge: o('circle-large', 60341),
      circleLargeOutline: o('circle-large-outline', 60341),
      combine: o('combine', 60342),
      gather: o('gather', 60342),
      table: o('table', 60343),
      variableGroup: o('variable-group', 60344),
      typeHierarchy: o('type-hierarchy', 60345),
      typeHierarchySub: o('type-hierarchy-sub', 60346),
      typeHierarchySuper: o('type-hierarchy-super', 60347),
      gitPullRequestCreate: o('git-pull-request-create', 60348),
      runAbove: o('run-above', 60349),
      runBelow: o('run-below', 60350),
      notebookTemplate: o('notebook-template', 60351),
      debugRerun: o('debug-rerun', 60352),
      workspaceTrusted: o('workspace-trusted', 60353),
      workspaceUntrusted: o('workspace-untrusted', 60354),
      workspaceUnspecified: o('workspace-unspecified', 60355),
      terminalCmd: o('terminal-cmd', 60356),
      terminalDebian: o('terminal-debian', 60357),
      terminalLinux: o('terminal-linux', 60358),
      terminalPowershell: o('terminal-powershell', 60359),
      terminalTmux: o('terminal-tmux', 60360),
      terminalUbuntu: o('terminal-ubuntu', 60361),
      terminalBash: o('terminal-bash', 60362),
      arrowSwap: o('arrow-swap', 60363),
      copy: o('copy', 60364),
      personAdd: o('person-add', 60365),
      filterFilled: o('filter-filled', 60366),
      wand: o('wand', 60367),
      debugLineByLine: o('debug-line-by-line', 60368),
      inspect: o('inspect', 60369),
      layers: o('layers', 60370),
      layersDot: o('layers-dot', 60371),
      layersActive: o('layers-active', 60372),
      compass: o('compass', 60373),
      compassDot: o('compass-dot', 60374),
      compassActive: o('compass-active', 60375),
      azure: o('azure', 60376),
      issueDraft: o('issue-draft', 60377),
      gitPullRequestClosed: o('git-pull-request-closed', 60378),
      gitPullRequestDraft: o('git-pull-request-draft', 60379),
      debugAll: o('debug-all', 60380),
      debugCoverage: o('debug-coverage', 60381),
      runErrors: o('run-errors', 60382),
      folderLibrary: o('folder-library', 60383),
      debugContinueSmall: o('debug-continue-small', 60384),
      beakerStop: o('beaker-stop', 60385),
      graphLine: o('graph-line', 60386),
      graphScatter: o('graph-scatter', 60387),
      pieChart: o('pie-chart', 60388),
      bracketDot: o('bracket-dot', 60389),
      bracketError: o('bracket-error', 60390),
      lockSmall: o('lock-small', 60391),
      azureDevops: o('azure-devops', 60392),
      verifiedFilled: o('verified-filled', 60393),
      newLine: o('newline', 60394),
      layout: o('layout', 60395),
      layoutActivitybarLeft: o('layout-activitybar-left', 60396),
      layoutActivitybarRight: o('layout-activitybar-right', 60397),
      layoutPanelLeft: o('layout-panel-left', 60398),
      layoutPanelCenter: o('layout-panel-center', 60399),
      layoutPanelJustify: o('layout-panel-justify', 60400),
      layoutPanelRight: o('layout-panel-right', 60401),
      layoutPanel: o('layout-panel', 60402),
      layoutSidebarLeft: o('layout-sidebar-left', 60403),
      layoutSidebarRight: o('layout-sidebar-right', 60404),
      layoutStatusbar: o('layout-statusbar', 60405),
      layoutMenubar: o('layout-menubar', 60406),
      layoutCentered: o('layout-centered', 60407),
      layoutSidebarRightOff: o('layout-sidebar-right-off', 60416),
      layoutPanelOff: o('layout-panel-off', 60417),
      layoutSidebarLeftOff: o('layout-sidebar-left-off', 60418),
      target: o('target', 60408),
      indent: o('indent', 60409),
      recordSmall: o('record-small', 60410),
      errorSmall: o('error-small', 60411),
      arrowCircleDown: o('arrow-circle-down', 60412),
      arrowCircleLeft: o('arrow-circle-left', 60413),
      arrowCircleRight: o('arrow-circle-right', 60414),
      arrowCircleUp: o('arrow-circle-up', 60415),
      heartFilled: o('heart-filled', 60420),
      map: o('map', 60421),
      mapFilled: o('map-filled', 60422),
      circleSmall: o('circle-small', 60423),
      bellSlash: o('bell-slash', 60424),
      bellSlashDot: o('bell-slash-dot', 60425),
      commentUnresolved: o('comment-unresolved', 60426),
      gitPullRequestGoToChanges: o('git-pull-request-go-to-changes', 60427),
      gitPullRequestNewChanges: o('git-pull-request-new-changes', 60428),
      searchFuzzy: o('search-fuzzy', 60429),
      commentDraft: o('comment-draft', 60430),
      dialogError: o('dialog-error', 'error'),
      dialogWarning: o('dialog-warning', 'warning'),
      dialogInfo: o('dialog-info', 'info'),
      dialogClose: o('dialog-close', 'close'),
      treeItemExpanded: o('tree-item-expanded', 'chevron-down'),
      treeFilterOnTypeOn: o('tree-filter-on-type-on', 'list-filter'),
      treeFilterOnTypeOff: o('tree-filter-on-type-off', 'list-selection'),
      treeFilterClear: o('tree-filter-clear', 'close'),
      treeItemLoading: o('tree-item-loading', 'loading'),
      menuSelection: o('menu-selection', 'check'),
      menuSubmenu: o('menu-submenu', 'chevron-right'),
      menuBarMore: o('menubar-more', 'more'),
      scrollbarButtonLeft: o('scrollbar-button-left', 'triangle-left'),
      scrollbarButtonRight: o('scrollbar-button-right', 'triangle-right'),
      scrollbarButtonUp: o('scrollbar-button-up', 'triangle-up'),
      scrollbarButtonDown: o('scrollbar-button-down', 'triangle-down'),
      toolBarMore: o('toolbar-more', 'more'),
      quickInputBack: o('quick-input-back', 'arrow-left'),
    }
    var i1 = function (e, t, n, r) {
      function s(i) {
        return i instanceof n
          ? i
          : new n(function (l) {
              l(i)
            })
      }
      return new (n || (n = Promise))(function (i, l) {
        function a(h) {
          try {
            u(r.next(h))
          } catch (f) {
            l(f)
          }
        }
        function c(h) {
          try {
            u(r.throw(h))
          } catch (f) {
            l(f)
          }
        }
        function u(h) {
          h.done ? i(h.value) : s(h.value).then(a, c)
        }
        u((r = r.apply(e, t || [])).next())
      })
    }
    class ui {
      constructor() {
        ;(this._map = new Map()),
          (this._factories = new Map()),
          (this._onDidChange = new ee()),
          (this.onDidChange = this._onDidChange.event),
          (this._colorMap = null)
      }
      fire(t) {
        this._onDidChange.fire({ changedLanguages: t, changedColorMap: !1 })
      }
      register(t, n) {
        return (
          this._map.set(t, n),
          this.fire([t]),
          ut(() => {
            this._map.get(t) === n && (this._map.delete(t), this.fire([t]))
          })
        )
      }
      registerFactory(t, n) {
        var r
        ;(r = this._factories.get(t)) === null || r === void 0 || r.dispose()
        const s = new ci(this, t, n)
        return (
          this._factories.set(t, s),
          ut(() => {
            const i = this._factories.get(t)
            !i || i !== s || (this._factories.delete(t), i.dispose())
          })
        )
      }
      getOrCreate(t) {
        return i1(this, void 0, void 0, function* () {
          const n = this.get(t)
          if (n) return n
          const r = this._factories.get(t)
          return !r || r.isResolved ? null : (yield r.resolve(), this.get(t))
        })
      }
      get(t) {
        return this._map.get(t) || null
      }
      isResolved(t) {
        if (this.get(t)) return !0
        const r = this._factories.get(t)
        return !!(!r || r.isResolved)
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
    class ci extends Ie {
      get isResolved() {
        return this._isResolved
      }
      constructor(t, n, r) {
        super(),
          (this._registry = t),
          (this._languageId = n),
          (this._factory = r),
          (this._isDisposed = !1),
          (this._resolvePromise = null),
          (this._isResolved = !1)
      }
      dispose() {
        ;(this._isDisposed = !0), super.dispose()
      }
      resolve() {
        return i1(this, void 0, void 0, function* () {
          return this._resolvePromise || (this._resolvePromise = this._create()), this._resolvePromise
        })
      }
      _create() {
        return i1(this, void 0, void 0, function* () {
          const t = yield Promise.resolve(this._factory.createTokenizationSupport())
          ;(this._isResolved = !0),
            t && !this._isDisposed && this._register(this._registry.register(this._languageId, t))
        })
      }
    }
    class fi {
      constructor(t, n, r) {
        ;(this.offset = t), (this.type = n), (this.language = r), (this._tokenBrand = void 0)
      }
      toString() {
        return '(' + this.offset + ', ' + this.type + ')'
      }
    }
    class Qo {
      constructor(t, n) {
        ;(this.tokens = t), (this.endState = n), (this._tokenizationResultBrand = void 0)
      }
    }
    class Yo {
      constructor(t, n) {
        ;(this.tokens = t), (this.endState = n), (this._encodedTokenizationResultBrand = void 0)
      }
    }
    var dn
    ;(function (e) {
      const t = new Map()
      t.set(0, N.symbolMethod),
        t.set(1, N.symbolFunction),
        t.set(2, N.symbolConstructor),
        t.set(3, N.symbolField),
        t.set(4, N.symbolVariable),
        t.set(5, N.symbolClass),
        t.set(6, N.symbolStruct),
        t.set(7, N.symbolInterface),
        t.set(8, N.symbolModule),
        t.set(9, N.symbolProperty),
        t.set(10, N.symbolEvent),
        t.set(11, N.symbolOperator),
        t.set(12, N.symbolUnit),
        t.set(13, N.symbolValue),
        t.set(15, N.symbolEnum),
        t.set(14, N.symbolConstant),
        t.set(15, N.symbolEnum),
        t.set(16, N.symbolEnumMember),
        t.set(17, N.symbolKeyword),
        t.set(27, N.symbolSnippet),
        t.set(18, N.symbolText),
        t.set(19, N.symbolColor),
        t.set(20, N.symbolFile),
        t.set(21, N.symbolReference),
        t.set(22, N.symbolCustomColor),
        t.set(23, N.symbolFolder),
        t.set(24, N.symbolTypeParameter),
        t.set(25, N.account),
        t.set(26, N.issues)
      function n(i) {
        let l = t.get(i)
        return l || (console.info('No codicon found for CompletionItemKind ' + i), (l = N.symbolProperty)), l
      }
      e.toIcon = n
      const r = new Map()
      r.set('method', 0),
        r.set('function', 1),
        r.set('constructor', 2),
        r.set('field', 3),
        r.set('variable', 4),
        r.set('class', 5),
        r.set('struct', 6),
        r.set('interface', 7),
        r.set('module', 8),
        r.set('property', 9),
        r.set('event', 10),
        r.set('operator', 11),
        r.set('unit', 12),
        r.set('value', 13),
        r.set('constant', 14),
        r.set('enum', 15),
        r.set('enum-member', 16),
        r.set('enumMember', 16),
        r.set('keyword', 17),
        r.set('snippet', 27),
        r.set('text', 18),
        r.set('color', 19),
        r.set('file', 20),
        r.set('reference', 21),
        r.set('customcolor', 22),
        r.set('folder', 23),
        r.set('type-parameter', 24),
        r.set('typeParameter', 24),
        r.set('account', 25),
        r.set('issue', 26)
      function s(i, l) {
        let a = r.get(i)
        return typeof a == 'undefined' && !l && (a = 9), a
      }
      e.fromString = s
    })(dn || (dn = {}))
    var mn
    ;(function (e) {
      ;(e[(e.Automatic = 0)] = 'Automatic'), (e[(e.Explicit = 1)] = 'Explicit')
    })(mn || (mn = {}))
    var gn
    ;(function (e) {
      ;(e[(e.Invoke = 1)] = 'Invoke'),
        (e[(e.TriggerCharacter = 2)] = 'TriggerCharacter'),
        (e[(e.ContentChange = 3)] = 'ContentChange')
    })(gn || (gn = {}))
    var bn
    ;(function (e) {
      ;(e[(e.Text = 0)] = 'Text'), (e[(e.Read = 1)] = 'Read'), (e[(e.Write = 2)] = 'Write')
    })(bn || (bn = {}))
    function Xo(e) {
      return (
        e &&
        URI.isUri(e.uri) &&
        Range.isIRange(e.range) &&
        (Range.isIRange(e.originSelectionRange) || Range.isIRange(e.targetSelectionRange))
      )
    }
    var _n
    ;(function (e) {
      const t = new Map()
      t.set(0, N.symbolFile),
        t.set(1, N.symbolModule),
        t.set(2, N.symbolNamespace),
        t.set(3, N.symbolPackage),
        t.set(4, N.symbolClass),
        t.set(5, N.symbolMethod),
        t.set(6, N.symbolProperty),
        t.set(7, N.symbolField),
        t.set(8, N.symbolConstructor),
        t.set(9, N.symbolEnum),
        t.set(10, N.symbolInterface),
        t.set(11, N.symbolFunction),
        t.set(12, N.symbolVariable),
        t.set(13, N.symbolConstant),
        t.set(14, N.symbolString),
        t.set(15, N.symbolNumber),
        t.set(16, N.symbolBoolean),
        t.set(17, N.symbolArray),
        t.set(18, N.symbolObject),
        t.set(19, N.symbolKey),
        t.set(20, N.symbolNull),
        t.set(21, N.symbolEnumMember),
        t.set(22, N.symbolStruct),
        t.set(23, N.symbolEvent),
        t.set(24, N.symbolOperator),
        t.set(25, N.symbolTypeParameter)
      function n(r) {
        let s = t.get(r)
        return s || (console.info('No codicon found for SymbolKind ' + r), (s = N.symbolProperty)), s
      }
      e.toIcon = n
    })(_n || (_n = {}))
    class ie {
      static fromValue(t) {
        switch (t) {
          case 'comment':
            return ie.Comment
          case 'imports':
            return ie.Imports
          case 'region':
            return ie.Region
        }
        return new ie(t)
      }
      constructor(t) {
        this.value = t
      }
    }
    ;(ie.Comment = new ie('comment')), (ie.Imports = new ie('imports')), (ie.Region = new ie('region'))
    var pn
    ;(function (e) {
      function t(n) {
        return !n || typeof n != 'object' ? !1 : typeof n.id == 'string' && typeof n.title == 'string'
      }
      e.is = t
    })(pn || (pn = {}))
    var xn
    ;(function (e) {
      ;(e[(e.Type = 1)] = 'Type'), (e[(e.Parameter = 2)] = 'Parameter')
    })(xn || (xn = {}))
    const Zo = new ui()
    var Ln
    ;(function (e) {
      ;(e[(e.Unknown = 0)] = 'Unknown'), (e[(e.Disabled = 1)] = 'Disabled'), (e[(e.Enabled = 2)] = 'Enabled')
    })(Ln || (Ln = {}))
    var wn
    ;(function (e) {
      ;(e[(e.Invoke = 1)] = 'Invoke'), (e[(e.Auto = 2)] = 'Auto')
    })(wn || (wn = {}))
    var vn
    ;(function (e) {
      ;(e[(e.None = 0)] = 'None'),
        (e[(e.KeepWhitespace = 1)] = 'KeepWhitespace'),
        (e[(e.InsertAsSnippet = 4)] = 'InsertAsSnippet')
    })(vn || (vn = {}))
    var Sn
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
    })(Sn || (Sn = {}))
    var Cn
    ;(function (e) {
      e[(e.Deprecated = 1)] = 'Deprecated'
    })(Cn || (Cn = {}))
    var Nn
    ;(function (e) {
      ;(e[(e.Invoke = 0)] = 'Invoke'),
        (e[(e.TriggerCharacter = 1)] = 'TriggerCharacter'),
        (e[(e.TriggerForIncompleteCompletions = 2)] = 'TriggerForIncompleteCompletions')
    })(Nn || (Nn = {}))
    var An
    ;(function (e) {
      ;(e[(e.EXACT = 0)] = 'EXACT'), (e[(e.ABOVE = 1)] = 'ABOVE'), (e[(e.BELOW = 2)] = 'BELOW')
    })(An || (An = {}))
    var yn
    ;(function (e) {
      ;(e[(e.NotSet = 0)] = 'NotSet'),
        (e[(e.ContentFlush = 1)] = 'ContentFlush'),
        (e[(e.RecoverFromMarkers = 2)] = 'RecoverFromMarkers'),
        (e[(e.Explicit = 3)] = 'Explicit'),
        (e[(e.Paste = 4)] = 'Paste'),
        (e[(e.Undo = 5)] = 'Undo'),
        (e[(e.Redo = 6)] = 'Redo')
    })(yn || (yn = {}))
    var En
    ;(function (e) {
      ;(e[(e.LF = 1)] = 'LF'), (e[(e.CRLF = 2)] = 'CRLF')
    })(En || (En = {}))
    var Mn
    ;(function (e) {
      ;(e[(e.Text = 0)] = 'Text'), (e[(e.Read = 1)] = 'Read'), (e[(e.Write = 2)] = 'Write')
    })(Mn || (Mn = {}))
    var Rn
    ;(function (e) {
      ;(e[(e.None = 0)] = 'None'),
        (e[(e.Keep = 1)] = 'Keep'),
        (e[(e.Brackets = 2)] = 'Brackets'),
        (e[(e.Advanced = 3)] = 'Advanced'),
        (e[(e.Full = 4)] = 'Full')
    })(Rn || (Rn = {}))
    var kn
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
    })(kn || (kn = {}))
    var Dn
    ;(function (e) {
      ;(e[(e.TextDefined = 0)] = 'TextDefined'), (e[(e.LF = 1)] = 'LF'), (e[(e.CRLF = 2)] = 'CRLF')
    })(Dn || (Dn = {}))
    var Fn
    ;(function (e) {
      ;(e[(e.LF = 0)] = 'LF'), (e[(e.CRLF = 1)] = 'CRLF')
    })(Fn || (Fn = {}))
    var Pn
    ;(function (e) {
      ;(e[(e.None = 0)] = 'None'),
        (e[(e.Indent = 1)] = 'Indent'),
        (e[(e.IndentOutdent = 2)] = 'IndentOutdent'),
        (e[(e.Outdent = 3)] = 'Outdent')
    })(Pn || (Pn = {}))
    var In
    ;(function (e) {
      ;(e[(e.Both = 0)] = 'Both'), (e[(e.Right = 1)] = 'Right'), (e[(e.Left = 2)] = 'Left'), (e[(e.None = 3)] = 'None')
    })(In || (In = {}))
    var Tn
    ;(function (e) {
      ;(e[(e.Type = 1)] = 'Type'), (e[(e.Parameter = 2)] = 'Parameter')
    })(Tn || (Tn = {}))
    var Bn
    ;(function (e) {
      ;(e[(e.Automatic = 0)] = 'Automatic'), (e[(e.Explicit = 1)] = 'Explicit')
    })(Bn || (Bn = {}))
    var o1
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
    })(o1 || (o1 = {}))
    var l1
    ;(function (e) {
      ;(e[(e.Hint = 1)] = 'Hint'),
        (e[(e.Info = 2)] = 'Info'),
        (e[(e.Warning = 4)] = 'Warning'),
        (e[(e.Error = 8)] = 'Error')
    })(l1 || (l1 = {}))
    var a1
    ;(function (e) {
      ;(e[(e.Unnecessary = 1)] = 'Unnecessary'), (e[(e.Deprecated = 2)] = 'Deprecated')
    })(a1 || (a1 = {}))
    var Vn
    ;(function (e) {
      ;(e[(e.Inline = 1)] = 'Inline'), (e[(e.Gutter = 2)] = 'Gutter')
    })(Vn || (Vn = {}))
    var Un
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
    })(Un || (Un = {}))
    var qn
    ;(function (e) {
      ;(e[(e.TOP_RIGHT_CORNER = 0)] = 'TOP_RIGHT_CORNER'),
        (e[(e.BOTTOM_RIGHT_CORNER = 1)] = 'BOTTOM_RIGHT_CORNER'),
        (e[(e.TOP_CENTER = 2)] = 'TOP_CENTER')
    })(qn || (qn = {}))
    var Wn
    ;(function (e) {
      ;(e[(e.Left = 1)] = 'Left'),
        (e[(e.Center = 2)] = 'Center'),
        (e[(e.Right = 4)] = 'Right'),
        (e[(e.Full = 7)] = 'Full')
    })(Wn || (Wn = {}))
    var On
    ;(function (e) {
      ;(e[(e.Left = 0)] = 'Left'),
        (e[(e.Right = 1)] = 'Right'),
        (e[(e.None = 2)] = 'None'),
        (e[(e.LeftOfInjectedText = 3)] = 'LeftOfInjectedText'),
        (e[(e.RightOfInjectedText = 4)] = 'RightOfInjectedText')
    })(On || (On = {}))
    var Hn
    ;(function (e) {
      ;(e[(e.Off = 0)] = 'Off'),
        (e[(e.On = 1)] = 'On'),
        (e[(e.Relative = 2)] = 'Relative'),
        (e[(e.Interval = 3)] = 'Interval'),
        (e[(e.Custom = 4)] = 'Custom')
    })(Hn || (Hn = {}))
    var zn
    ;(function (e) {
      ;(e[(e.None = 0)] = 'None'), (e[(e.Text = 1)] = 'Text'), (e[(e.Blocks = 2)] = 'Blocks')
    })(zn || (zn = {}))
    var $n
    ;(function (e) {
      ;(e[(e.Smooth = 0)] = 'Smooth'), (e[(e.Immediate = 1)] = 'Immediate')
    })($n || ($n = {}))
    var Gn
    ;(function (e) {
      ;(e[(e.Auto = 1)] = 'Auto'), (e[(e.Hidden = 2)] = 'Hidden'), (e[(e.Visible = 3)] = 'Visible')
    })(Gn || (Gn = {}))
    var u1
    ;(function (e) {
      ;(e[(e.LTR = 0)] = 'LTR'), (e[(e.RTL = 1)] = 'RTL')
    })(u1 || (u1 = {}))
    var jn
    ;(function (e) {
      ;(e[(e.Invoke = 1)] = 'Invoke'),
        (e[(e.TriggerCharacter = 2)] = 'TriggerCharacter'),
        (e[(e.ContentChange = 3)] = 'ContentChange')
    })(jn || (jn = {}))
    var Qn
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
    })(Qn || (Qn = {}))
    var Yn
    ;(function (e) {
      e[(e.Deprecated = 1)] = 'Deprecated'
    })(Yn || (Yn = {}))
    var Xn
    ;(function (e) {
      ;(e[(e.Hidden = 0)] = 'Hidden'),
        (e[(e.Blink = 1)] = 'Blink'),
        (e[(e.Smooth = 2)] = 'Smooth'),
        (e[(e.Phase = 3)] = 'Phase'),
        (e[(e.Expand = 4)] = 'Expand'),
        (e[(e.Solid = 5)] = 'Solid')
    })(Xn || (Xn = {}))
    var Zn
    ;(function (e) {
      ;(e[(e.Line = 1)] = 'Line'),
        (e[(e.Block = 2)] = 'Block'),
        (e[(e.Underline = 3)] = 'Underline'),
        (e[(e.LineThin = 4)] = 'LineThin'),
        (e[(e.BlockOutline = 5)] = 'BlockOutline'),
        (e[(e.UnderlineThin = 6)] = 'UnderlineThin')
    })(Zn || (Zn = {}))
    var Jn
    ;(function (e) {
      ;(e[(e.AlwaysGrowsWhenTypingAtEdges = 0)] = 'AlwaysGrowsWhenTypingAtEdges'),
        (e[(e.NeverGrowsWhenTypingAtEdges = 1)] = 'NeverGrowsWhenTypingAtEdges'),
        (e[(e.GrowsOnlyWhenTypingBefore = 2)] = 'GrowsOnlyWhenTypingBefore'),
        (e[(e.GrowsOnlyWhenTypingAfter = 3)] = 'GrowsOnlyWhenTypingAfter')
    })(Jn || (Jn = {}))
    var Kn
    ;(function (e) {
      ;(e[(e.None = 0)] = 'None'),
        (e[(e.Same = 1)] = 'Same'),
        (e[(e.Indent = 2)] = 'Indent'),
        (e[(e.DeepIndent = 3)] = 'DeepIndent')
    })(Kn || (Kn = {}))
    class rt {
      static chord(t, n) {
        return ii(t, n)
      }
    }
    ;(rt.CtrlCmd = 2048), (rt.Shift = 1024), (rt.Alt = 512), (rt.WinCtrl = 256)
    function hi() {
      return {
        editor: void 0,
        languages: void 0,
        CancellationTokenSource: Ks,
        Emitter: ee,
        KeyCode: o1,
        KeyMod: rt,
        Position: G,
        Range: k,
        Selection: Z,
        SelectionDirection: u1,
        MarkerSeverity: l1,
        MarkerTag: a1,
        Uri: ye,
        Token: fi,
      }
    }
    class di extends tt {
      constructor(t) {
        super(0)
        for (let n = 0, r = t.length; n < r; n++) this.set(t.charCodeAt(n), 2)
        this.set(32, 1), this.set(9, 1)
      }
    }
    function mi(e) {
      const t = {}
      return (n) => (t.hasOwnProperty(n) || (t[n] = e(n)), t[n])
    }
    const Jo = mi((e) => new di(e))
    var er
    ;(function (e) {
      ;(e[(e.Left = 1)] = 'Left'),
        (e[(e.Center = 2)] = 'Center'),
        (e[(e.Right = 4)] = 'Right'),
        (e[(e.Full = 7)] = 'Full')
    })(er || (er = {}))
    var tr
    ;(function (e) {
      ;(e[(e.Inline = 1)] = 'Inline'), (e[(e.Gutter = 2)] = 'Gutter')
    })(tr || (tr = {}))
    var nr
    ;(function (e) {
      ;(e[(e.Both = 0)] = 'Both'), (e[(e.Right = 1)] = 'Right'), (e[(e.Left = 2)] = 'Left'), (e[(e.None = 3)] = 'None')
    })(nr || (nr = {}))
    class Ko {
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
    class el {
      constructor(t, n) {
        ;(this._findMatchBrand = void 0), (this.range = t), (this.matches = n)
      }
    }
    function tl(e) {
      return e && typeof e.read == 'function'
    }
    class nl {
      constructor(t, n, r, s, i, l) {
        ;(this.identifier = t),
          (this.range = n),
          (this.text = r),
          (this.forceMoveMarkers = s),
          (this.isAutoWhitespaceEdit = i),
          (this._isTracked = l)
      }
    }
    class rl {
      constructor(t, n, r) {
        ;(this.regex = t), (this.wordSeparators = n), (this.simpleSearch = r)
      }
    }
    class sl {
      constructor(t, n, r) {
        ;(this.reverseEdits = t), (this.changes = n), (this.trimAutoWhitespaceLineNumbers = r)
      }
    }
    function il(e) {
      return !e.isTooLargeForSyncing() && !e.isForSimpleWidget
    }
    const gi = 999
    class ol {
      constructor(t, n, r, s) {
        ;(this.searchString = t), (this.isRegex = n), (this.matchCase = r), (this.wordSeparators = s)
      }
      parseSearchRequest() {
        if (this.searchString === '') return null
        let t
        this.isRegex
          ? (t = bi(this.searchString))
          : (t =
              this.searchString.indexOf(`
`) >= 0)
        let n = null
        try {
          n = strings.createRegExp(this.searchString, this.isRegex, {
            matchCase: this.matchCase,
            wholeWord: !1,
            multiline: t,
            global: !0,
            unicode: !0,
          })
        } catch (s) {
          return null
        }
        if (!n) return null
        let r = !this.isRegex && !t
        return (
          r && this.searchString.toLowerCase() !== this.searchString.toUpperCase() && (r = this.matchCase),
          new SearchData(
            n,
            this.wordSeparators ? getMapForWordSeparators(this.wordSeparators) : null,
            r ? this.searchString : null,
          )
        )
      }
    }
    function bi(e) {
      if (!e || e.length === 0) return !1
      for (let t = 0, n = e.length; t < n; t++) {
        const r = e.charCodeAt(t)
        if (r === 10) return !0
        if (r === 92) {
          if ((t++, t >= n)) break
          const s = e.charCodeAt(t)
          if (s === 110 || s === 114 || s === 87) return !0
        }
      }
      return !1
    }
    function st(e, t, n) {
      if (!n) return new FindMatch(e, null)
      const r = []
      for (let s = 0, i = t.length; s < i; s++) r[s] = t[s]
      return new FindMatch(e, r)
    }
    class rr {
      constructor(t) {
        const n = []
        let r = 0
        for (let s = 0, i = t.length; s < i; s++) t.charCodeAt(s) === 10 && (n[r++] = s)
        this._lineFeedsOffsets = n
      }
      findLineFeedCountBeforeOffset(t) {
        const n = this._lineFeedsOffsets
        let r = 0,
          s = n.length - 1
        if (s === -1 || t <= n[0]) return 0
        for (; r < s; ) {
          const i = r + (((s - r) / 2) >> 0)
          n[i] >= t ? (s = i - 1) : n[i + 1] >= t ? ((r = i), (s = i)) : (r = i + 1)
        }
        return r + 1
      }
    }
    class ll {
      static findMatches(t, n, r, s, i) {
        const l = n.parseSearchRequest()
        return l
          ? l.regex.multiline
            ? this._doFindMatchesMultiline(t, r, new it(l.wordSeparators, l.regex), s, i)
            : this._doFindMatchesLineByLine(t, r, l, s, i)
          : []
      }
      static _getMultilineMatchRange(t, n, r, s, i, l) {
        let a,
          c = 0
        s ? ((c = s.findLineFeedCountBeforeOffset(i)), (a = n + i + c)) : (a = n + i)
        let u
        if (s) {
          const m = s.findLineFeedCountBeforeOffset(i + l.length) - c
          u = a + l.length + m
        } else u = a + l.length
        const h = t.getPositionAt(a),
          f = t.getPositionAt(u)
        return new Range(h.lineNumber, h.column, f.lineNumber, f.column)
      }
      static _doFindMatchesMultiline(t, n, r, s, i) {
        const l = t.getOffsetAt(n.getStartPosition()),
          a = t.getValueInRange(n, 1),
          c =
            t.getEOL() ===
            `\r
`
              ? new rr(a)
              : null,
          u = []
        let h = 0,
          f
        for (r.reset(0); (f = r.next(a)); )
          if (((u[h++] = st(this._getMultilineMatchRange(t, l, a, c, f.index, f[0]), f, s)), h >= i)) return u
        return u
      }
      static _doFindMatchesLineByLine(t, n, r, s, i) {
        const l = []
        let a = 0
        if (n.startLineNumber === n.endLineNumber) {
          const u = t.getLineContent(n.startLineNumber).substring(n.startColumn - 1, n.endColumn - 1)
          return (a = this._findMatchesInLine(r, u, n.startLineNumber, n.startColumn - 1, a, l, s, i)), l
        }
        const c = t.getLineContent(n.startLineNumber).substring(n.startColumn - 1)
        a = this._findMatchesInLine(r, c, n.startLineNumber, n.startColumn - 1, a, l, s, i)
        for (let u = n.startLineNumber + 1; u < n.endLineNumber && a < i; u++)
          a = this._findMatchesInLine(r, t.getLineContent(u), u, 0, a, l, s, i)
        if (a < i) {
          const u = t.getLineContent(n.endLineNumber).substring(0, n.endColumn - 1)
          a = this._findMatchesInLine(r, u, n.endLineNumber, 0, a, l, s, i)
        }
        return l
      }
      static _findMatchesInLine(t, n, r, s, i, l, a, c) {
        const u = t.wordSeparators
        if (!a && t.simpleSearch) {
          const d = t.simpleSearch,
            m = d.length,
            b = n.length
          let C = -m
          for (; (C = n.indexOf(d, C + m)) !== -1; )
            if (
              (!u || sr(u, n, b, C, m)) &&
              ((l[i++] = new FindMatch(new Range(r, C + 1 + s, r, C + 1 + m + s), null)), i >= c)
            )
              return i
          return i
        }
        const h = new it(t.wordSeparators, t.regex)
        let f
        h.reset(0)
        do
          if (
            ((f = h.next(n)),
            f && ((l[i++] = st(new Range(r, f.index + 1 + s, r, f.index + 1 + f[0].length + s), f, a)), i >= c))
          )
            return i
        while (f)
        return i
      }
      static findNextMatch(t, n, r, s) {
        const i = n.parseSearchRequest()
        if (!i) return null
        const l = new it(i.wordSeparators, i.regex)
        return i.regex.multiline
          ? this._doFindNextMatchMultiline(t, r, l, s)
          : this._doFindNextMatchLineByLine(t, r, l, s)
      }
      static _doFindNextMatchMultiline(t, n, r, s) {
        const i = new Position(n.lineNumber, 1),
          l = t.getOffsetAt(i),
          a = t.getLineCount(),
          c = t.getValueInRange(new Range(i.lineNumber, i.column, a, t.getLineMaxColumn(a)), 1),
          u =
            t.getEOL() ===
            `\r
`
              ? new rr(c)
              : null
        r.reset(n.column - 1)
        const h = r.next(c)
        return h
          ? st(this._getMultilineMatchRange(t, l, c, u, h.index, h[0]), h, s)
          : n.lineNumber !== 1 || n.column !== 1
            ? this._doFindNextMatchMultiline(t, new Position(1, 1), r, s)
            : null
      }
      static _doFindNextMatchLineByLine(t, n, r, s) {
        const i = t.getLineCount(),
          l = n.lineNumber,
          a = t.getLineContent(l),
          c = this._findFirstMatchInLine(r, a, l, n.column, s)
        if (c) return c
        for (let u = 1; u <= i; u++) {
          const h = (l + u - 1) % i,
            f = t.getLineContent(h + 1),
            d = this._findFirstMatchInLine(r, f, h + 1, 1, s)
          if (d) return d
        }
        return null
      }
      static _findFirstMatchInLine(t, n, r, s, i) {
        t.reset(s - 1)
        const l = t.next(n)
        return l ? st(new Range(r, l.index + 1, r, l.index + 1 + l[0].length), l, i) : null
      }
      static findPreviousMatch(t, n, r, s) {
        const i = n.parseSearchRequest()
        if (!i) return null
        const l = new it(i.wordSeparators, i.regex)
        return i.regex.multiline
          ? this._doFindPreviousMatchMultiline(t, r, l, s)
          : this._doFindPreviousMatchLineByLine(t, r, l, s)
      }
      static _doFindPreviousMatchMultiline(t, n, r, s) {
        const i = this._doFindMatchesMultiline(t, new Range(1, 1, n.lineNumber, n.column), r, s, 10 * gi)
        if (i.length > 0) return i[i.length - 1]
        const l = t.getLineCount()
        return n.lineNumber !== l || n.column !== t.getLineMaxColumn(l)
          ? this._doFindPreviousMatchMultiline(t, new Position(l, t.getLineMaxColumn(l)), r, s)
          : null
      }
      static _doFindPreviousMatchLineByLine(t, n, r, s) {
        const i = t.getLineCount(),
          l = n.lineNumber,
          a = t.getLineContent(l).substring(0, n.column - 1),
          c = this._findLastMatchInLine(r, a, l, s)
        if (c) return c
        for (let u = 1; u <= i; u++) {
          const h = (i + l - u - 1) % i,
            f = t.getLineContent(h + 1),
            d = this._findLastMatchInLine(r, f, h + 1, s)
          if (d) return d
        }
        return null
      }
      static _findLastMatchInLine(t, n, r, s) {
        let i = null,
          l
        for (t.reset(0); (l = t.next(n)); ) i = st(new Range(r, l.index + 1, r, l.index + 1 + l[0].length), l, s)
        return i
      }
    }
    function _i(e, t, n, r, s) {
      if (r === 0) return !0
      const i = t.charCodeAt(r - 1)
      if (e.get(i) !== 0 || i === 13 || i === 10) return !0
      if (s > 0) {
        const l = t.charCodeAt(r)
        if (e.get(l) !== 0) return !0
      }
      return !1
    }
    function pi(e, t, n, r, s) {
      if (r + s === n) return !0
      const i = t.charCodeAt(r + s)
      if (e.get(i) !== 0 || i === 13 || i === 10) return !0
      if (s > 0) {
        const l = t.charCodeAt(r + s - 1)
        if (e.get(l) !== 0) return !0
      }
      return !1
    }
    function sr(e, t, n, r, s) {
      return _i(e, t, n, r, s) && pi(e, t, n, r, s)
    }
    class it {
      constructor(t, n) {
        ;(this._wordSeparators = t),
          (this._searchRegex = n),
          (this._prevMatchStartIndex = -1),
          (this._prevMatchLength = 0)
      }
      reset(t) {
        ;(this._searchRegex.lastIndex = t), (this._prevMatchStartIndex = -1), (this._prevMatchLength = 0)
      }
      next(t) {
        const n = t.length
        let r
        do {
          if (this._prevMatchStartIndex + this._prevMatchLength === n || ((r = this._searchRegex.exec(t)), !r))
            return null
          const s = r.index,
            i = r[0].length
          if (s === this._prevMatchStartIndex && i === this._prevMatchLength) {
            if (i === 0) {
              T1(t, n, this._searchRegex.lastIndex) > 65535
                ? (this._searchRegex.lastIndex += 2)
                : (this._searchRegex.lastIndex += 1)
              continue
            }
            return null
          }
          if (
            ((this._prevMatchStartIndex = s),
            (this._prevMatchLength = i),
            !this._wordSeparators || sr(this._wordSeparators, t, n, s, i))
          )
            return r
        } while (r)
        return null
      }
    }
    function al(e, t) {
      if (!e) throw new Error(t ? `Assertion failed (${t})` : 'Assertion Failed')
    }
    function xi(e, t = 'Unreachable') {
      throw new Error(t)
    }
    function c1(e) {
      if (!e()) {
        debugger
        e(), O(new De('Assertion Failed'))
      }
    }
    function ir(e, t) {
      let n = 0
      for (; n < e.length - 1; ) {
        const r = e[n],
          s = e[n + 1]
        if (!t(r, s)) return !1
        n++
      }
      return !0
    }
    class Li {
      static computeUnicodeHighlights(t, n, r) {
        const s = r ? r.startLineNumber : 1,
          i = r ? r.endLineNumber : t.getLineCount(),
          l = new or(n),
          a = l.getCandidateCodePoints()
        let c
        a === 'allNonBasicAscii'
          ? (c = new RegExp('[^\\t\\n\\r\\x20-\\x7E]', 'g'))
          : (c = new RegExp(`${wi(Array.from(a))}`, 'g'))
        const u = new it(null, c),
          h = []
        let f = !1,
          d,
          m = 0,
          b = 0,
          C = 0
        e: for (let w = s, _ = i; w <= _; w++) {
          const S = t.getLineContent(w),
            L = S.length
          u.reset(0)
          do
            if (((d = u.next(S)), d)) {
              let D = d.index,
                R = d.index + d[0].length
              if (D > 0) {
                const v = S.charCodeAt(D - 1)
                Ze(v) && D--
              }
              if (R + 1 < L) {
                const v = S.charCodeAt(R - 1)
                Ze(v) && R++
              }
              const J = S.substring(D, R)
              let q = Xt(D + 1, ln, S, 0)
              q && q.endColumn <= D + 1 && (q = null)
              const E = l.shouldHighlightNonBasicASCII(J, q ? q.word : null)
              if (E !== 0) {
                E === 3 ? m++ : E === 2 ? b++ : E === 1 ? C++ : xi(E)
                const v = 1e3
                if (h.length >= v) {
                  f = !0
                  break e
                }
                h.push(new k(w, D + 1, w, R + 1))
              }
            }
          while (d)
        }
        return {
          ranges: h,
          hasMore: f,
          ambiguousCharacterCount: m,
          invisibleCharacterCount: b,
          nonBasicAsciiCharacterCount: C,
        }
      }
      static computeUnicodeHighlightReason(t, n) {
        const r = new or(n)
        switch (r.shouldHighlightNonBasicASCII(t, null)) {
          case 0:
            return null
          case 2:
            return { kind: 1 }
          case 3: {
            const i = t.codePointAt(0),
              l = r.ambiguousCharacters.getPrimaryConfusable(i),
              a = te.getLocales().filter((c) => !te.getInstance(new Set([...n.allowedLocales, c])).isAmbiguous(i))
            return { kind: 0, confusableWith: String.fromCodePoint(l), notAmbiguousInLocales: a }
          }
          case 1:
            return { kind: 2 }
        }
      }
    }
    function wi(e, t) {
      return `[${F1(e.map((r) => String.fromCodePoint(r)).join(''))}]`
    }
    class or {
      constructor(t) {
        ;(this.options = t),
          (this.allowedCodePoints = new Set(t.allowedCodePoints)),
          (this.ambiguousCharacters = te.getInstance(new Set(t.allowedLocales)))
      }
      getCandidateCodePoints() {
        if (this.options.nonBasicASCII) return 'allNonBasicAscii'
        const t = new Set()
        if (this.options.invisibleCharacters) for (const n of _e.codePoints) lr(String.fromCodePoint(n)) || t.add(n)
        if (this.options.ambiguousCharacters)
          for (const n of this.ambiguousCharacters.getConfusableCodePoints()) t.add(n)
        for (const n of this.allowedCodePoints) t.delete(n)
        return t
      }
      shouldHighlightNonBasicASCII(t, n) {
        const r = t.codePointAt(0)
        if (this.allowedCodePoints.has(r)) return 0
        if (this.options.nonBasicASCII) return 1
        let s = !1,
          i = !1
        if (n)
          for (const l of n) {
            const a = l.codePointAt(0),
              c = as(l)
            ;(s = s || c), !c && !this.ambiguousCharacters.isAmbiguous(a) && !_e.isInvisibleCharacter(a) && (i = !0)
          }
        return !s && i
          ? 0
          : this.options.invisibleCharacters && !lr(t) && _e.isInvisibleCharacter(r)
            ? 2
            : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(r)
              ? 3
              : 0
      }
    }
    function lr(e) {
      return (
        e === ' ' ||
        e ===
          `
` ||
        e === '	'
      )
    }
    class f1 {
      constructor(t, n, r) {
        ;(this.originalRange = t), (this.modifiedRange = n), (this.innerChanges = r)
      }
      toString() {
        return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`
      }
    }
    class ar {
      constructor(t, n) {
        ;(this.originalRange = t), (this.modifiedRange = n)
      }
      toString() {
        return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`
      }
    }
    class ce {
      constructor(t, n) {
        ;(this.startLineNumber = t), (this.endLineNumberExclusive = n)
      }
      get isEmpty() {
        return this.startLineNumber === this.endLineNumberExclusive
      }
      delta(t) {
        return new ce(this.startLineNumber + t, this.endLineNumberExclusive + t)
      }
      get length() {
        return this.endLineNumberExclusive - this.startLineNumber
      }
      join(t) {
        return new ce(
          Math.min(this.startLineNumber, t.startLineNumber),
          Math.max(this.endLineNumberExclusive, t.endLineNumberExclusive),
        )
      }
      toString() {
        return `[${this.startLineNumber},${this.endLineNumberExclusive})`
      }
    }
    const vi = 3
    class Si {
      computeDiff(t, n, r) {
        var s
        const l = new Ai(t, n, {
            maxComputationTime: r.maxComputationTimeMs,
            shouldIgnoreTrimWhitespace: r.ignoreTrimWhitespace,
            shouldComputeCharChanges: !0,
            shouldMakePrettyDiff: !0,
            shouldPostProcessCharChanges: !0,
          }).computeDiff(),
          a = []
        let c = null
        for (const u of l.changes) {
          let h
          u.originalEndLineNumber === 0
            ? (h = new ce(u.originalStartLineNumber + 1, u.originalStartLineNumber + 1))
            : (h = new ce(u.originalStartLineNumber, u.originalEndLineNumber + 1))
          let f
          u.modifiedEndLineNumber === 0
            ? (f = new ce(u.modifiedStartLineNumber + 1, u.modifiedStartLineNumber + 1))
            : (f = new ce(u.modifiedStartLineNumber, u.modifiedEndLineNumber + 1))
          let d = new f1(
            h,
            f,
            (s = u.charChanges) === null || s === void 0
              ? void 0
              : s.map(
                  (m) =>
                    new ar(
                      new k(
                        m.originalStartLineNumber,
                        m.originalStartColumn,
                        m.originalEndLineNumber,
                        m.originalEndColumn,
                      ),
                      new k(
                        m.modifiedStartLineNumber,
                        m.modifiedStartColumn,
                        m.modifiedEndLineNumber,
                        m.modifiedEndColumn,
                      ),
                    ),
                ),
          )
          c &&
            (c.modifiedRange.endLineNumberExclusive === d.modifiedRange.startLineNumber ||
              c.originalRange.endLineNumberExclusive === d.originalRange.startLineNumber) &&
            ((d = new f1(
              c.originalRange.join(d.originalRange),
              c.modifiedRange.join(d.modifiedRange),
              c.innerChanges && d.innerChanges ? c.innerChanges.concat(d.innerChanges) : void 0,
            )),
            a.pop()),
            a.push(d),
            (c = d)
        }
        return (
          c1(() =>
            ir(
              a,
              (u, h) =>
                h.originalRange.startLineNumber - u.originalRange.endLineNumberExclusive ===
                  h.modifiedRange.startLineNumber - u.modifiedRange.endLineNumberExclusive &&
                u.originalRange.endLineNumberExclusive < h.originalRange.startLineNumber &&
                u.modifiedRange.endLineNumberExclusive < h.modifiedRange.startLineNumber,
            ),
          ),
          { quitEarly: l.quitEarly, changes: a }
        )
      }
    }
    function ur(e, t, n, r) {
      return new xe(e, t, n).ComputeDiff(r)
    }
    class cr {
      constructor(t) {
        const n = [],
          r = []
        for (let s = 0, i = t.length; s < i; s++) (n[s] = h1(t[s], 1)), (r[s] = d1(t[s], 1))
        ;(this.lines = t), (this._startColumns = n), (this._endColumns = r)
      }
      getElements() {
        const t = []
        for (let n = 0, r = this.lines.length; n < r; n++)
          t[n] = this.lines[n].substring(this._startColumns[n] - 1, this._endColumns[n] - 1)
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
      createCharSequence(t, n, r) {
        const s = [],
          i = [],
          l = []
        let a = 0
        for (let c = n; c <= r; c++) {
          const u = this.lines[c],
            h = t ? this._startColumns[c] : 1,
            f = t ? this._endColumns[c] : u.length + 1
          for (let d = h; d < f; d++) (s[a] = u.charCodeAt(d - 1)), (i[a] = c + 1), (l[a] = d), a++
          !t && c < r && ((s[a] = 10), (i[a] = c + 1), (l[a] = u.length + 1), a++)
        }
        return new Ci(s, i, l)
      }
    }
    class Ci {
      constructor(t, n, r) {
        ;(this._charCodes = t), (this._lineNumbers = n), (this._columns = r)
      }
      toString() {
        return (
          '[' +
          this._charCodes
            .map(
              (t, n) => (t === 10 ? '\\n' : String.fromCharCode(t)) + `-(${this._lineNumbers[n]},${this._columns[n]})`,
            )
            .join(', ') +
          ']'
        )
      }
      _assertIndex(t, n) {
        if (t < 0 || t >= n.length) throw new Error('Illegal index')
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
    class Oe {
      constructor(t, n, r, s, i, l, a, c) {
        ;(this.originalStartLineNumber = t),
          (this.originalStartColumn = n),
          (this.originalEndLineNumber = r),
          (this.originalEndColumn = s),
          (this.modifiedStartLineNumber = i),
          (this.modifiedStartColumn = l),
          (this.modifiedEndLineNumber = a),
          (this.modifiedEndColumn = c)
      }
      static createFromDiffChange(t, n, r) {
        const s = n.getStartLineNumber(t.originalStart),
          i = n.getStartColumn(t.originalStart),
          l = n.getEndLineNumber(t.originalStart + t.originalLength - 1),
          a = n.getEndColumn(t.originalStart + t.originalLength - 1),
          c = r.getStartLineNumber(t.modifiedStart),
          u = r.getStartColumn(t.modifiedStart),
          h = r.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1),
          f = r.getEndColumn(t.modifiedStart + t.modifiedLength - 1)
        return new Oe(s, i, l, a, c, u, h, f)
      }
    }
    function Ni(e) {
      if (e.length <= 1) return e
      const t = [e[0]]
      let n = t[0]
      for (let r = 1, s = e.length; r < s; r++) {
        const i = e[r],
          l = i.originalStart - (n.originalStart + n.originalLength),
          a = i.modifiedStart - (n.modifiedStart + n.modifiedLength)
        Math.min(l, a) < vi
          ? ((n.originalLength = i.originalStart + i.originalLength - n.originalStart),
            (n.modifiedLength = i.modifiedStart + i.modifiedLength - n.modifiedStart))
          : (t.push(i), (n = i))
      }
      return t
    }
    class ot {
      constructor(t, n, r, s, i) {
        ;(this.originalStartLineNumber = t),
          (this.originalEndLineNumber = n),
          (this.modifiedStartLineNumber = r),
          (this.modifiedEndLineNumber = s),
          (this.charChanges = i)
      }
      static createFromDiffResult(t, n, r, s, i, l, a) {
        let c, u, h, f, d
        if (
          (n.originalLength === 0
            ? ((c = r.getStartLineNumber(n.originalStart) - 1), (u = 0))
            : ((c = r.getStartLineNumber(n.originalStart)),
              (u = r.getEndLineNumber(n.originalStart + n.originalLength - 1))),
          n.modifiedLength === 0
            ? ((h = s.getStartLineNumber(n.modifiedStart) - 1), (f = 0))
            : ((h = s.getStartLineNumber(n.modifiedStart)),
              (f = s.getEndLineNumber(n.modifiedStart + n.modifiedLength - 1))),
          l && n.originalLength > 0 && n.originalLength < 20 && n.modifiedLength > 0 && n.modifiedLength < 20 && i())
        ) {
          const m = r.createCharSequence(t, n.originalStart, n.originalStart + n.originalLength - 1),
            b = s.createCharSequence(t, n.modifiedStart, n.modifiedStart + n.modifiedLength - 1)
          if (m.getElements().length > 0 && b.getElements().length > 0) {
            let C = ur(m, b, i, !0).changes
            a && (C = Ni(C)), (d = [])
            for (let w = 0, _ = C.length; w < _; w++) d.push(Oe.createFromDiffChange(C[w], m, b))
          }
        }
        return new ot(c, u, h, f, d)
      }
    }
    class Ai {
      constructor(t, n, r) {
        ;(this.shouldComputeCharChanges = r.shouldComputeCharChanges),
          (this.shouldPostProcessCharChanges = r.shouldPostProcessCharChanges),
          (this.shouldIgnoreTrimWhitespace = r.shouldIgnoreTrimWhitespace),
          (this.shouldMakePrettyDiff = r.shouldMakePrettyDiff),
          (this.originalLines = t),
          (this.modifiedLines = n),
          (this.original = new cr(t)),
          (this.modified = new cr(n)),
          (this.continueLineDiff = fr(r.maxComputationTime)),
          (this.continueCharDiff = fr(r.maxComputationTime === 0 ? 0 : Math.min(r.maxComputationTime, 5e3)))
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
        const t = ur(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff),
          n = t.changes,
          r = t.quitEarly
        if (this.shouldIgnoreTrimWhitespace) {
          const a = []
          for (let c = 0, u = n.length; c < u; c++)
            a.push(
              ot.createFromDiffResult(
                this.shouldIgnoreTrimWhitespace,
                n[c],
                this.original,
                this.modified,
                this.continueCharDiff,
                this.shouldComputeCharChanges,
                this.shouldPostProcessCharChanges,
              ),
            )
          return { quitEarly: r, changes: a }
        }
        const s = []
        let i = 0,
          l = 0
        for (let a = -1, c = n.length; a < c; a++) {
          const u = a + 1 < c ? n[a + 1] : null,
            h = u ? u.originalStart : this.originalLines.length,
            f = u ? u.modifiedStart : this.modifiedLines.length
          for (; i < h && l < f; ) {
            const d = this.originalLines[i],
              m = this.modifiedLines[l]
            if (d !== m) {
              {
                let b = h1(d, 1),
                  C = h1(m, 1)
                for (; b > 1 && C > 1; ) {
                  const w = d.charCodeAt(b - 2),
                    _ = m.charCodeAt(C - 2)
                  if (w !== _) break
                  b--, C--
                }
                ;(b > 1 || C > 1) && this._pushTrimWhitespaceCharChange(s, i + 1, 1, b, l + 1, 1, C)
              }
              {
                let b = d1(d, 1),
                  C = d1(m, 1)
                const w = d.length + 1,
                  _ = m.length + 1
                for (; b < w && C < _; ) {
                  const S = d.charCodeAt(b - 1),
                    L = d.charCodeAt(C - 1)
                  if (S !== L) break
                  b++, C++
                }
                ;(b < w || C < _) && this._pushTrimWhitespaceCharChange(s, i + 1, b, w, l + 1, C, _)
              }
            }
            i++, l++
          }
          u &&
            (s.push(
              ot.createFromDiffResult(
                this.shouldIgnoreTrimWhitespace,
                u,
                this.original,
                this.modified,
                this.continueCharDiff,
                this.shouldComputeCharChanges,
                this.shouldPostProcessCharChanges,
              ),
            ),
            (i += u.originalLength),
            (l += u.modifiedLength))
        }
        return { quitEarly: r, changes: s }
      }
      _pushTrimWhitespaceCharChange(t, n, r, s, i, l, a) {
        if (this._mergeTrimWhitespaceCharChange(t, n, r, s, i, l, a)) return
        let c
        this.shouldComputeCharChanges && (c = [new Oe(n, r, n, s, i, l, i, a)]), t.push(new ot(n, n, i, i, c))
      }
      _mergeTrimWhitespaceCharChange(t, n, r, s, i, l, a) {
        const c = t.length
        if (c === 0) return !1
        const u = t[c - 1]
        return u.originalEndLineNumber === 0 || u.modifiedEndLineNumber === 0
          ? !1
          : u.originalEndLineNumber === n && u.modifiedEndLineNumber === i
            ? (this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new Oe(n, r, n, s, i, l, i, a)), !0)
            : u.originalEndLineNumber + 1 === n && u.modifiedEndLineNumber + 1 === i
              ? ((u.originalEndLineNumber = n),
                (u.modifiedEndLineNumber = i),
                this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new Oe(n, r, n, s, i, l, i, a)),
                !0)
              : !1
      }
    }
    function h1(e, t) {
      const n = es(e)
      return n === -1 ? t : n + 1
    }
    function d1(e, t) {
      const n = ts(e)
      return n === -1 ? t : n + 2
    }
    function fr(e) {
      if (e === 0) return () => !0
      const t = Date.now()
      return () => Date.now() - t < e
    }
    class ae {
      constructor(t, n) {
        ;(this.seq1Range = t), (this.seq2Range = n)
      }
      reverse() {
        return new ae(this.seq2Range, this.seq1Range)
      }
      toString() {
        return `${this.seq1Range} <-> ${this.seq2Range}`
      }
    }
    class X {
      constructor(t, n) {
        ;(this.start = t), (this.endExclusive = n)
      }
      get isEmpty() {
        return this.start === this.endExclusive
      }
      delta(t) {
        return new X(this.start + t, this.endExclusive + t)
      }
      get length() {
        return this.endExclusive - this.start
      }
      toString() {
        return `[${this.start}, ${this.endExclusive})`
      }
      join(t) {
        return new X(Math.min(this.start, t.start), Math.max(this.endExclusive, t.endExclusive))
      }
    }
    class m1 {
      constructor(t, n) {
        ;(this.width = t), (this.height = n), (this.array = []), (this.array = new Array(t * n))
      }
      get(t, n) {
        return this.array[t + n * this.width]
      }
      set(t, n, r) {
        this.array[t + n * this.width] = r
      }
    }
    class yi {
      compute(t, n, r) {
        const s = new m1(t.length, n.length),
          i = new m1(t.length, n.length),
          l = new m1(t.length, n.length)
        for (let m = 0; m < t.length; m++)
          for (let b = 0; b < n.length; b++) {
            const C = m === 0 ? 0 : s.get(m - 1, b),
              w = b === 0 ? 0 : s.get(m, b - 1)
            let _
            t.getElement(m) === n.getElement(b)
              ? (m === 0 || b === 0 ? (_ = 0) : (_ = s.get(m - 1, b - 1)),
                m > 0 && b > 0 && i.get(m - 1, b - 1) === 3 && (_ += l.get(m - 1, b - 1)),
                (_ += r ? r(m, b) : 1))
              : (_ = -1)
            const S = Math.max(C, w, _)
            if (S === _) {
              const L = m > 0 && b > 0 ? l.get(m - 1, b - 1) : 0
              l.set(m, b, L + 1), i.set(m, b, 3)
            } else S === C ? (l.set(m, b, 0), i.set(m, b, 1)) : S === w && (l.set(m, b, 0), i.set(m, b, 2))
            s.set(m, b, S)
          }
        const a = []
        let c = t.length,
          u = n.length
        function h(m, b) {
          ;(m + 1 !== c || b + 1 !== u) && a.push(new ae(new X(m + 1, c), new X(b + 1, u))), (c = m), (u = b)
        }
        let f = t.length - 1,
          d = n.length - 1
        for (; f >= 0 && d >= 0; ) i.get(f, d) === 3 ? (h(f, d), f--, d--) : i.get(f, d) === 1 ? f-- : d--
        return h(-1, -1), a.reverse(), a
      }
    }
    function hr(e, t, n) {
      let r = n
      return (r = Mi(e, t, r)), (r = Ri(e, t, r)), r
    }
    function Ei(e, t, n) {
      const r = []
      for (const s of n) {
        const i = r[r.length - 1]
        if (!i) {
          r.push(s)
          continue
        }
        s.seq1Range.start - i.seq1Range.endExclusive <= 2 || s.seq2Range.start - i.seq2Range.endExclusive <= 2
          ? (r[r.length - 1] = new ae(i.seq1Range.join(s.seq1Range), i.seq2Range.join(s.seq2Range)))
          : r.push(s)
      }
      return r
    }
    function Mi(e, t, n) {
      const r = []
      n.length > 0 && r.push(n[0])
      for (let s = 1; s < n.length; s++) {
        const i = r[r.length - 1],
          l = n[s]
        if (l.seq1Range.isEmpty) {
          let a = !0
          const c = l.seq1Range.start - i.seq1Range.endExclusive
          for (let u = 1; u <= c; u++)
            if (t.getElement(l.seq2Range.start - u) !== t.getElement(l.seq2Range.endExclusive - u)) {
              a = !1
              break
            }
          if (a) {
            r[r.length - 1] = new ae(i.seq1Range, new X(i.seq2Range.start, l.seq2Range.endExclusive - c))
            continue
          }
        }
        r.push(l)
      }
      return r
    }
    function Ri(e, t, n) {
      if (!e.getBoundaryScore || !t.getBoundaryScore) return n
      for (let r = 0; r < n.length; r++) {
        const s = n[r]
        if (s.seq1Range.isEmpty) {
          const i = r > 0 ? n[r - 1].seq2Range.endExclusive : -1,
            l = r + 1 < n.length ? n[r + 1].seq2Range.start : t.length
          n[r] = dr(s, e, t, l, i)
        } else if (s.seq2Range.isEmpty) {
          const i = r > 0 ? n[r - 1].seq1Range.endExclusive : -1,
            l = r + 1 < n.length ? n[r + 1].seq1Range.start : e.length
          n[r] = dr(s.reverse(), t, e, l, i).reverse()
        }
      }
      return n
    }
    function dr(e, t, n, r, s) {
      let l = 1
      for (
        ;
        e.seq2Range.start - l > s &&
        n.getElement(e.seq2Range.start - l) === n.getElement(e.seq2Range.endExclusive - l) &&
        l < 20;

      )
        l++
      l--
      let a = 0
      for (
        ;
        e.seq2Range.start + a < r &&
        n.getElement(e.seq2Range.start + a) === n.getElement(e.seq2Range.endExclusive + a) &&
        a < 20;

      )
        a++
      if (l === 0 && a === 0) return e
      let c = 0,
        u = -1
      for (let h = -l; h <= a; h++) {
        const f = e.seq2Range.start + h,
          d = e.seq2Range.endExclusive + h,
          m = e.seq1Range.start + h,
          b = t.getBoundaryScore(m) + n.getBoundaryScore(f) + n.getBoundaryScore(d)
        b > u && ((u = b), (c = h))
      }
      return c !== 0 ? new ae(e.seq1Range.delta(c), e.seq2Range.delta(c)) : e
    }
    class ki {
      compute(t, n) {
        if (t.length === 0) return [new ae(new X(0, 0), new X(0, n.length))]
        if (n.length === 0) return [new ae(new X(0, t.length), new X(0, 0))]
        function r(d, m) {
          for (; d < t.length && m < n.length && t.getElement(d) === n.getElement(m); ) d++, m++
          return d
        }
        let s = 0
        const i = new Di()
        i.set(0, r(0, 0))
        const l = new Fi()
        l.set(0, i.get(0) === 0 ? null : new mr(null, 0, 0, i.get(0)))
        let a = 0
        e: for (;;)
          for (s++, a = -s; a <= s; a += 2) {
            const d = a === s ? -1 : i.get(a + 1),
              m = a === -s ? -1 : i.get(a - 1) + 1,
              b = Math.min(Math.max(d, m), t.length),
              C = b - a,
              w = r(b, C)
            i.set(a, w)
            const _ = b === d ? l.get(a + 1) : l.get(a - 1)
            if ((l.set(a, w !== b ? new mr(_, b, C, w - b) : _), i.get(a) === t.length && i.get(a) - a === n.length))
              break e
          }
        let c = l.get(a)
        const u = []
        let h = t.length,
          f = n.length
        for (;;) {
          const d = c ? c.x + c.length : 0,
            m = c ? c.y + c.length : 0
          if (((d !== h || m !== f) && u.push(new ae(new X(d, h), new X(m, f))), !c)) break
          ;(h = c.x), (f = c.y), (c = c.prev)
        }
        return u.reverse(), u
      }
    }
    class mr {
      constructor(t, n, r, s) {
        ;(this.prev = t), (this.x = n), (this.y = r), (this.length = s)
      }
    }
    class Di {
      constructor() {
        ;(this.positiveArr = new Int32Array(10)), (this.negativeArr = new Int32Array(10))
      }
      get(t) {
        return t < 0 ? ((t = -t - 1), this.negativeArr[t]) : this.positiveArr[t]
      }
      set(t, n) {
        if (t < 0) {
          if (((t = -t - 1), t >= this.negativeArr.length)) {
            const r = this.negativeArr
            ;(this.negativeArr = new Int32Array(r.length * 2)), this.negativeArr.set(r)
          }
          this.negativeArr[t] = n
        } else {
          if (t >= this.positiveArr.length) {
            const r = this.positiveArr
            ;(this.positiveArr = new Int32Array(r.length * 2)), this.positiveArr.set(r)
          }
          this.positiveArr[t] = n
        }
      }
    }
    class Fi {
      constructor() {
        ;(this.positiveArr = []), (this.negativeArr = [])
      }
      get(t) {
        return t < 0 ? ((t = -t - 1), this.negativeArr[t]) : this.positiveArr[t]
      }
      set(t, n) {
        t < 0 ? ((t = -t - 1), (this.negativeArr[t] = n)) : (this.positiveArr[t] = n)
      }
    }
    class Pi {
      constructor() {
        ;(this.dynamicProgrammingDiffing = new yi()), (this.myersDiffingAlgorithm = new ki())
      }
      computeDiff(t, n, r) {
        const s = new Map()
        function i(w) {
          let _ = s.get(w)
          return _ === void 0 && ((_ = s.size), s.set(w, _)), _
        }
        const l = t.map((w) => i(w.trim())),
          a = n.map((w) => i(w.trim())),
          c = new gr(l, t),
          u = new gr(a, n)
        let h = (() =>
          c.length + u.length < 1500
            ? this.dynamicProgrammingDiffing.compute(c, u, (w, _) =>
                t[w] === n[_] ? (n[_].length === 0 ? 0.1 : 1 + Math.log(1 + n[_].length)) : 0.99,
              )
            : this.myersDiffingAlgorithm.compute(c, u))()
        h = hr(c, u, h)
        const f = [],
          d = (w) => {
            for (let _ = 0; _ < w; _++) {
              const S = m + _,
                L = b + _
              if (t[S] !== n[L]) {
                const D = this.refineDiff(t, n, new ae(new X(S, S + 1), new X(L, L + 1)))
                for (const R of D) f.push(R)
              }
            }
          }
        let m = 0,
          b = 0
        for (const w of h) {
          c1(() => w.seq1Range.start - m === w.seq2Range.start - b)
          const _ = w.seq1Range.start - m
          d(_), (m = w.seq1Range.endExclusive), (b = w.seq2Range.endExclusive)
          const S = this.refineDiff(t, n, w)
          for (const L of S) f.push(L)
        }
        return d(t.length - m), { quitEarly: !1, changes: Ii(f) }
      }
      refineDiff(t, n, r) {
        const s = new _r(t, r.seq1Range),
          i = new _r(n, r.seq2Range),
          l =
            s.length + i.length < 500
              ? this.dynamicProgrammingDiffing.compute(s, i)
              : this.myersDiffingAlgorithm.compute(s, i)
        let a = hr(s, i, l)
        return (
          (a = Ei(s, i, a)),
          a.map(
            (u) =>
              new ar(
                s.translateRange(u.seq1Range).delta(r.seq1Range.start),
                i.translateRange(u.seq2Range).delta(r.seq2Range.start),
              ),
          )
        )
      }
    }
    function Ii(e) {
      const t = []
      for (const n of Ti(
        e,
        (r, s) =>
          s.originalRange.startLineNumber - (r.originalRange.endLineNumber - (r.originalRange.endColumn > 1 ? 0 : 1)) <=
            1 ||
          s.modifiedRange.startLineNumber - (r.modifiedRange.endLineNumber - (r.modifiedRange.endColumn > 1 ? 0 : 1)) <=
            1,
      )) {
        const r = n[0],
          s = n[n.length - 1]
        t.push(
          new f1(
            new ce(
              r.originalRange.startLineNumber,
              s.originalRange.endLineNumber + (s.originalRange.endColumn > 1 || s.modifiedRange.endColumn > 1 ? 1 : 0),
            ),
            new ce(
              r.modifiedRange.startLineNumber,
              s.modifiedRange.endLineNumber + (s.originalRange.endColumn > 1 || s.modifiedRange.endColumn > 1 ? 1 : 0),
            ),
            n,
          ),
        )
      }
      return (
        c1(() =>
          ir(
            t,
            (n, r) =>
              r.originalRange.startLineNumber - n.originalRange.endLineNumberExclusive ===
                r.modifiedRange.startLineNumber - n.modifiedRange.endLineNumberExclusive &&
              n.originalRange.endLineNumberExclusive < r.originalRange.startLineNumber &&
              n.modifiedRange.endLineNumberExclusive < r.modifiedRange.startLineNumber,
          ),
        ),
        t
      )
    }
    function* Ti(e, t) {
      let n, r
      for (const s of e) r !== void 0 && t(r, s) ? n.push(s) : (n && (yield n), (n = [s])), (r = s)
      n && (yield n)
    }
    class gr {
      constructor(t, n) {
        ;(this.trimmedHash = t), (this.lines = n)
      }
      getElement(t) {
        return this.trimmedHash[t]
      }
      get length() {
        return this.trimmedHash.length
      }
      getBoundaryScore(t) {
        const n = t === 0 ? 0 : br(this.lines[t - 1]),
          r = t === this.lines.length ? 0 : br(this.lines[t])
        return 1e3 - (n + r)
      }
    }
    function br(e) {
      let t = 0
      for (; t < e.length && (e.charCodeAt(t) === 32 || e.charCodeAt(t) === 9); ) t++
      return t
    }
    class _r {
      constructor(t, n) {
        ;(this.lines = t), (this.lineRange = n)
        let r = 0
        this.firstCharOnLineOffsets = new Int32Array(n.length)
        for (let i = n.start; i < n.endExclusive; i++) {
          const l = t[i]
          ;(r += l.length), (this.firstCharOnLineOffsets[i - n.start] = r + 1), r++
        }
        this.elements = new Int32Array(r)
        let s = 0
        for (let i = n.start; i < n.endExclusive; i++) {
          const l = t[i]
          for (let a = 0; a < l.length; a++) this.elements[s + a] = l.charCodeAt(a)
          ;(s += l.length),
            i < t.length - 1 &&
              ((this.elements[s] = `
`.charCodeAt(0)),
              (s += 1))
        }
      }
      getElement(t) {
        return this.elements[t]
      }
      get length() {
        return this.elements.length
      }
      getBoundaryScore(t) {
        const n = xr(t > 0 ? this.elements[t - 1] : -1),
          r = xr(t < this.elements.length ? this.elements[t] : -1)
        if (n === 6 && r === 7) return 0
        let s = 0
        return n !== r && ((s += 10), r === 1 && (s += 1)), (s += pr(n)), (s += pr(r)), s
      }
      translateOffset(t) {
        let n = 0,
          r = this.firstCharOnLineOffsets.length
        for (; n < r; ) {
          const i = Math.floor((n + r) / 2)
          this.firstCharOnLineOffsets[i] > t ? (r = i) : (n = i + 1)
        }
        const s = n === 0 ? 0 : this.firstCharOnLineOffsets[n - 1]
        return new G(n + 1, t - s + 1)
      }
      translateRange(t) {
        return k.fromPositions(this.translateOffset(t.start), this.translateOffset(t.endExclusive))
      }
    }
    const Bi = { [0]: 0, [1]: 0, [2]: 0, [3]: 10, [4]: 2, [5]: 3, [6]: 10, [7]: 10 }
    function pr(e) {
      return Bi[e]
    }
    function xr(e) {
      return e === 10
        ? 7
        : e === 13
          ? 6
          : Vi(e)
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
    function Vi(e) {
      return e === 32 || e === 9
    }
    const Lr = { smart: new Si(), experimental: new Pi() }
    var Ee = function (e, t, n, r) {
      function s(i) {
        return i instanceof n
          ? i
          : new n(function (l) {
              l(i)
            })
      }
      return new (n || (n = Promise))(function (i, l) {
        function a(h) {
          try {
            u(r.next(h))
          } catch (f) {
            l(f)
          }
        }
        function c(h) {
          try {
            u(r.throw(h))
          } catch (f) {
            l(f)
          }
        }
        function u(h) {
          h.done ? i(h.value) : s(h.value).then(a, c)
        }
        u((r = r.apply(e, t || [])).next())
      })
    }
    class Ui extends Hs {
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
      getWordAtPosition(t, n) {
        const r = Xt(t.column, Gs(n), this._lines[t.lineNumber - 1], 0)
        return r ? new k(t.lineNumber, r.startColumn, t.lineNumber, r.endColumn) : null
      }
      words(t) {
        const n = this._lines,
          r = this._wordenize.bind(this)
        let s = 0,
          i = '',
          l = 0,
          a = []
        return {
          *[Symbol.iterator]() {
            for (;;)
              if (l < a.length) {
                const c = i.substring(a[l].start, a[l].end)
                ;(l += 1), yield c
              } else if (s < n.length) (i = n[s]), (a = r(i, t)), (l = 0), (s += 1)
              else break
          },
        }
      }
      getLineWords(t, n) {
        const r = this._lines[t - 1],
          s = this._wordenize(r, n),
          i = []
        for (const l of s) i.push({ word: r.substring(l.start, l.end), startColumn: l.start + 1, endColumn: l.end + 1 })
        return i
      }
      _wordenize(t, n) {
        const r = []
        let s
        for (n.lastIndex = 0; (s = n.exec(t)) && s[0].length !== 0; )
          r.push({ start: s.index, end: s.index + s[0].length })
        return r
      }
      getValueInRange(t) {
        if (((t = this._validateRange(t)), t.startLineNumber === t.endLineNumber))
          return this._lines[t.startLineNumber - 1].substring(t.startColumn - 1, t.endColumn - 1)
        const n = this._eol,
          r = t.startLineNumber - 1,
          s = t.endLineNumber - 1,
          i = []
        i.push(this._lines[r].substring(t.startColumn - 1))
        for (let l = r + 1; l < s; l++) i.push(this._lines[l])
        return i.push(this._lines[s].substring(0, t.endColumn - 1)), i.join(n)
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
        const n = this._lineStarts.getIndexOf(t),
          r = this._lines[n.index].length
        return { lineNumber: 1 + n.index, column: 1 + Math.min(n.remainder, r) }
      }
      _validateRange(t) {
        const n = this._validatePosition({ lineNumber: t.startLineNumber, column: t.startColumn }),
          r = this._validatePosition({ lineNumber: t.endLineNumber, column: t.endColumn })
        return n.lineNumber !== t.startLineNumber ||
          n.column !== t.startColumn ||
          r.lineNumber !== t.endLineNumber ||
          r.column !== t.endColumn
          ? { startLineNumber: n.lineNumber, startColumn: n.column, endLineNumber: r.lineNumber, endColumn: r.column }
          : t
      }
      _validatePosition(t) {
        if (!G.isIPosition(t)) throw new Error('bad position')
        let { lineNumber: n, column: r } = t,
          s = !1
        if (n < 1) (n = 1), (r = 1), (s = !0)
        else if (n > this._lines.length) (n = this._lines.length), (r = this._lines[n - 1].length + 1), (s = !0)
        else {
          const i = this._lines[n - 1].length + 1
          r < 1 ? ((r = 1), (s = !0)) : r > i && ((r = i), (s = !0))
        }
        return s ? { lineNumber: n, column: r } : t
      }
    }
    class Ce {
      constructor(t, n) {
        ;(this._host = t),
          (this._models = Object.create(null)),
          (this._foreignModuleFactory = n),
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
        return Object.keys(this._models).forEach((n) => t.push(this._models[n])), t
      }
      acceptNewModel(t) {
        this._models[t.url] = new Ui(ye.parse(t.url), t.lines, t.EOL, t.versionId)
      }
      acceptModelChanged(t, n) {
        if (!this._models[t]) return
        this._models[t].onEvents(n)
      }
      acceptRemovedModel(t) {
        this._models[t] && delete this._models[t]
      }
      computeUnicodeHighlights(t, n, r) {
        return Ee(this, void 0, void 0, function* () {
          const s = this._getModel(t)
          return s
            ? Li.computeUnicodeHighlights(s, n, r)
            : {
                ranges: [],
                hasMore: !1,
                ambiguousCharacterCount: 0,
                invisibleCharacterCount: 0,
                nonBasicAsciiCharacterCount: 0,
              }
        })
      }
      computeDiff(t, n, r, s) {
        return Ee(this, void 0, void 0, function* () {
          const i = this._getModel(t),
            l = this._getModel(n)
          return !i || !l ? null : Ce.computeDiff(i, l, r, s)
        })
      }
      static computeDiff(t, n, r, s) {
        const i = s === 'experimental' ? Lr.experimental : Lr.smart,
          l = t.getLinesContent(),
          a = n.getLinesContent(),
          c = i.computeDiff(l, a, r)
        return {
          identical: c.changes.length > 0 ? !1 : this._modelsAreIdentical(t, n),
          quitEarly: c.quitEarly,
          changes: c.changes.map((h) => {
            var f
            return [
              h.originalRange.startLineNumber,
              h.originalRange.endLineNumberExclusive,
              h.modifiedRange.startLineNumber,
              h.modifiedRange.endLineNumberExclusive,
              (f = h.innerChanges) === null || f === void 0
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
      static _modelsAreIdentical(t, n) {
        const r = t.getLineCount(),
          s = n.getLineCount()
        if (r !== s) return !1
        for (let i = 1; i <= r; i++) {
          const l = t.getLineContent(i),
            a = n.getLineContent(i)
          if (l !== a) return !1
        }
        return !0
      }
      computeMoreMinimalEdits(t, n) {
        return Ee(this, void 0, void 0, function* () {
          const r = this._getModel(t)
          if (!r) return n
          const s = []
          let i
          n = n.slice(0).sort((l, a) => {
            if (l.range && a.range) return k.compareRangesUsingStarts(l.range, a.range)
            const c = l.range ? 0 : 1,
              u = a.range ? 0 : 1
            return c - u
          })
          for (let { range: l, text: a, eol: c } of n) {
            if ((typeof c == 'number' && (i = c), k.isEmpty(l) && !a)) continue
            const u = r.getValueInRange(l)
            if (((a = a.replace(/\r\n|\n|\r/g, r.eol)), u === a)) continue
            if (Math.max(a.length, u.length) > Ce._diffLimit) {
              s.push({ range: l, text: a })
              continue
            }
            const h = vs(u, a, !1),
              f = r.offsetAt(k.lift(l).getStartPosition())
            for (const d of h) {
              const m = r.positionAt(f + d.originalStart),
                b = r.positionAt(f + d.originalStart + d.originalLength),
                C = {
                  text: a.substr(d.modifiedStart, d.modifiedLength),
                  range: {
                    startLineNumber: m.lineNumber,
                    startColumn: m.column,
                    endLineNumber: b.lineNumber,
                    endColumn: b.column,
                  },
                }
              r.getValueInRange(C.range) !== C.text && s.push(C)
            }
          }
          return (
            typeof i == 'number' &&
              s.push({
                eol: i,
                text: '',
                range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 },
              }),
            s
          )
        })
      }
      computeLinks(t) {
        return Ee(this, void 0, void 0, function* () {
          const n = this._getModel(t)
          return n ? Js(n) : null
        })
      }
      textualSuggest(t, n, r, s) {
        return Ee(this, void 0, void 0, function* () {
          const i = new mt(!0),
            l = new RegExp(r, s),
            a = new Set()
          e: for (const c of t) {
            const u = this._getModel(c)
            if (u) {
              for (const h of u.words(l))
                if (!(h === n || !isNaN(Number(h))) && (a.add(h), a.size > Ce._suggestionsLimit)) break e
            }
          }
          return { words: Array.from(a), duration: i.elapsed() }
        })
      }
      computeWordRanges(t, n, r, s) {
        return Ee(this, void 0, void 0, function* () {
          const i = this._getModel(t)
          if (!i) return Object.create(null)
          const l = new RegExp(r, s),
            a = Object.create(null)
          for (let c = n.startLineNumber; c < n.endLineNumber; c++) {
            const u = i.getLineWords(c, l)
            for (const h of u) {
              if (!isNaN(Number(h.word))) continue
              let f = a[h.word]
              f || ((f = []), (a[h.word] = f)),
                f.push({ startLineNumber: c, startColumn: h.startColumn, endLineNumber: c, endColumn: h.endColumn })
            }
          }
          return a
        })
      }
      navigateValueSet(t, n, r, s, i) {
        return Ee(this, void 0, void 0, function* () {
          const l = this._getModel(t)
          if (!l) return null
          const a = new RegExp(s, i)
          n.startColumn === n.endColumn &&
            (n = {
              startLineNumber: n.startLineNumber,
              startColumn: n.startColumn,
              endLineNumber: n.endLineNumber,
              endColumn: n.endColumn + 1,
            })
          const c = l.getValueInRange(n),
            u = l.getWordAtPosition({ lineNumber: n.startLineNumber, column: n.startColumn }, a)
          if (!u) return null
          const h = l.getValueInRange(u)
          return Jt.INSTANCE.navigateValueSet(n, c, u, h, r)
        })
      }
      loadForeignModule(t, n, r) {
        const l = { host: Qr(r, (a, c) => this._host.fhr(a, c)), getMirrorModels: () => this._getModels() }
        return this._foreignModuleFactory
          ? ((this._foreignModule = this._foreignModuleFactory(l, n)), Promise.resolve(It(this._foreignModule)))
          : Promise.reject(new Error('Unexpected usage'))
      }
      fmr(t, n) {
        if (!this._foreignModule || typeof this._foreignModule[t] != 'function')
          return Promise.reject(new Error('Missing requestHandler or method: ' + t))
        try {
          return Promise.resolve(this._foreignModule[t].apply(this._foreignModule, n))
        } catch (r) {
          return Promise.reject(r)
        }
      }
    }
    ;(Ce._diffLimit = 1e5), (Ce._suggestionsLimit = 1e4)
    function ul(e) {
      return new Ce(e, null)
    }
    typeof importScripts == 'function' && (H.monaco = hi())
    let g1 = !1
    function qi(e) {
      if (g1) return
      g1 = !0
      const t = new z1(
        (n) => {
          self.postMessage(n)
        },
        (n) => new Ce(n, e),
      )
      self.onmessage = (n) => {
        t.onmessage(n.data)
      }
    }
    self.onmessage = (e) => {
      g1 || qi(null)
    }
  })()
})()
