var Ur = Object.defineProperty,
  Kr = Object.defineProperties
var Vr = Object.getOwnPropertyDescriptors
var Sn = Object.getOwnPropertySymbols
var Tt = Object.prototype.hasOwnProperty,
  Rt = Object.prototype.propertyIsEnumerable
var zt = (E, a, o) => (a in E ? Ur(E, a, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (E[a] = o)),
  Me = (E, a) => {
    for (var o in a || (a = {})) Tt.call(a, o) && zt(E, o, a[o])
    if (Sn) for (var o of Sn(a)) Rt.call(a, o) && zt(E, o, a[o])
    return E
  },
  _e = (E, a) => Kr(E, Vr(a))
var Lo = (E, a) => {
  var o = {}
  for (var c in E) Tt.call(E, c) && a.indexOf(c) < 0 && (o[c] = E[c])
  if (E != null && Sn) for (var c of Sn(E)) a.indexOf(c) < 0 && Rt.call(E, c) && (o[c] = E[c])
  return o
}
var mo = (E, a, o) =>
  new Promise((c, f) => {
    var m = (k) => {
        try {
          w(o.next(k))
        } catch (C) {
          f(C)
        }
      },
      x = (k) => {
        try {
          w(o.throw(k))
        } catch (C) {
          f(C)
        }
      },
      w = (k) => (k.done ? c(k.value) : Promise.resolve(k.value).then(m, x))
    w((o = o.apply(E, a)).next())
  })
;(self.webpackChunk = self.webpackChunk || []).push([
  [9304],
  {
    62658: function (E, a) {
      'use strict'
      var o = {
        icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: 'false' },
          children: [
            {
              tag: 'path',
              attrs: {
                d: 'M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z',
              },
            },
          ],
        },
        name: 'edit',
        theme: 'outlined',
      }
      a.Z = o
    },
    54709: function (E, a) {
      'use strict'
      var o = {
        icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: 'false' },
          children: [
            {
              tag: 'path',
              attrs: {
                d: 'M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z',
              },
            },
          ],
        },
        name: 'ellipsis',
        theme: 'outlined',
      }
      a.Z = o
    },
    32156: function (E, a) {
      'use strict'
      var o = {
        icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: 'false' },
          children: [
            {
              tag: 'path',
              attrs: {
                d: 'M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z',
              },
            },
          ],
        },
        name: 'left',
        theme: 'outlined',
      }
      a.Z = o
    },
    99565: function (E, a) {
      'use strict'
      var o = {
        icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: 'false' },
          children: [
            { tag: 'defs', attrs: {}, children: [{ tag: 'style', attrs: {} }] },
            { tag: 'path', attrs: { d: 'M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z' } },
            { tag: 'path', attrs: { d: 'M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z' } },
          ],
        },
        name: 'plus',
        theme: 'outlined',
      }
      a.Z = o
    },
    10011: function (E, a) {
      'use strict'
      var o = {
        icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: 'false' },
          children: [
            {
              tag: 'path',
              attrs: {
                d: 'M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z',
              },
            },
          ],
        },
        name: 'right',
        theme: 'outlined',
      }
      a.Z = o
    },
    81691: function (E, a) {
      'use strict'
      var o = {
        icon: {
          tag: 'svg',
          attrs: { viewBox: '64 64 896 896', focusable: 'false' },
          children: [
            {
              tag: 'path',
              attrs: {
                d: 'M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z',
              },
            },
          ],
        },
        name: 'search',
        theme: 'outlined',
      }
      a.Z = o
    },
    47398: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z',
                },
              },
            ],
          },
          name: 'arrow-down',
          theme: 'outlined',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'ArrowDownOutlined'
      var C = f.forwardRef(k)
    },
    79068: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z',
                },
              },
            ],
          },
          name: 'arrow-left',
          theme: 'outlined',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'ArrowLeftOutlined'
      var C = f.forwardRef(k)
    },
    45267: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z',
                },
              },
            ],
          },
          name: 'arrow-right',
          theme: 'outlined',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'ArrowRightOutlined'
      var C = f.forwardRef(k)
    },
    2097: function (E, a, o) {
      'use strict'
      var c = o(84045),
        f = o(57689),
        m = o(62658),
        x = o(90660),
        w = function (C, g) {
          return f.createElement(x.Z, (0, c.Z)((0, c.Z)({}, C), {}, { ref: g, icon: m.Z }))
        }
      ;(w.displayName = 'EditOutlined'), (a.Z = f.forwardRef(w))
    },
    7092: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z',
                },
              },
            ],
          },
          name: 'github',
          theme: 'filled',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'GithubFilled'
      var C = f.forwardRef(k)
    },
    99134: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z',
                },
              },
            ],
          },
          name: 'github',
          theme: 'outlined',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'GithubOutlined'
      var C = f.forwardRef(k)
    },
    94661: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M536.1 273H488c-4.4 0-8 3.6-8 8v275.3c0 2.6 1.2 5 3.3 6.5l165.3 120.7c3.6 2.6 8.6 1.9 11.2-1.7l28.6-39c2.7-3.7 1.9-8.7-1.7-11.2L544.1 528.5V281c0-4.4-3.6-8-8-8zm219.8 75.2l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3L752.9 334.1a8 8 0 003 14.1zm167.7 301.1l-56.7-19.5a8 8 0 00-10.1 4.8c-1.9 5.1-3.9 10.1-6 15.1-17.8 42.1-43.3 80-75.9 112.5a353 353 0 01-112.5 75.9 352.18 352.18 0 01-137.7 27.8c-47.8 0-94.1-9.3-137.7-27.8a353 353 0 01-112.5-75.9c-32.5-32.5-58-70.4-75.9-112.5A353.44 353.44 0 01171 512c0-47.8 9.3-94.2 27.8-137.8 17.8-42.1 43.3-80 75.9-112.5a353 353 0 01112.5-75.9C430.6 167.3 477 158 524.8 158s94.1 9.3 137.7 27.8A353 353 0 01775 261.7c10.2 10.3 19.8 21 28.6 32.3l59.8-46.8C784.7 146.6 662.2 81.9 524.6 82 285 82.1 92.6 276.7 95 516.4 97.4 751.9 288.9 942 524.8 942c185.5 0 343.5-117.6 403.7-282.3 1.5-4.2-.7-8.9-4.9-10.4z',
                },
              },
            ],
          },
          name: 'history',
          theme: 'outlined',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'HistoryOutlined'
      var C = f.forwardRef(k)
    },
    92253: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M464 688a48 48 0 1096 0 48 48 0 10-96 0zm72-112c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48zm400-188h-59.3c-2.6 0-5 1.2-6.5 3.3L763.7 538.1l-49.9-68.8a7.92 7.92 0 00-6.5-3.3H648c-6.5 0-10.3 7.4-6.5 12.7l109.2 150.7a16.1 16.1 0 0026 0l165.8-228.7c3.8-5.3 0-12.7-6.5-12.7zm-44 306h-64.2c-5.5 0-10.6 2.9-13.6 7.5a352.2 352.2 0 01-49.8 62.2A355.92 355.92 0 01651.1 840a355 355 0 01-138.7 27.9c-48.1 0-94.8-9.4-138.7-27.9a355.92 355.92 0 01-113.3-76.3A353.06 353.06 0 01184 650.5c-18.6-43.8-28-90.5-28-138.5s9.4-94.7 28-138.5c17.9-42.4 43.6-80.5 76.4-113.2 32.8-32.7 70.9-58.4 113.3-76.3a355 355 0 01138.7-27.9c48.1 0 94.8 9.4 138.7 27.9 42.4 17.9 80.5 43.6 113.3 76.3 19 19 35.6 39.8 49.8 62.2 2.9 4.7 8.1 7.5 13.6 7.5H892c6 0 9.8-6.3 7.2-11.6C828.8 178.5 684.7 82 517.7 80 278.9 77.2 80.5 272.5 80 511.2 79.5 750.1 273.3 944 512.4 944c169.2 0 315.6-97 386.7-238.4A8 8 0 00892 694z',
                },
              },
            ],
          },
          name: 'issues-close',
          theme: 'outlined',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'IssuesCloseOutlined'
      var C = f.forwardRef(k)
    },
    34559: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M834.7 279.8l61.3-58.9V208H683.7L532.4 586.4 360.3 208H137.7v12.9l71.6 86.6c7 6.4 10.6 15.8 9.7 25.2V673c2.2 12.3-1.7 24.8-10.3 33.7L128 805v12.7h228.6v-12.9l-80.6-98a39.99 39.99 0 01-11.1-33.7V378.7l200.7 439.2h23.3l172.6-439.2v349.9c0 9.2 0 11.1-6 17.2l-62.1 60.3V819h301.2v-12.9l-59.9-58.9c-5.2-4-7.9-10.7-6.8-17.2V297a18.1 18.1 0 016.8-17.2z',
                },
              },
            ],
          },
          name: 'medium',
          theme: 'outlined',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'MediumOutlined'
      var C = f.forwardRef(k)
    },
    80697: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z',
                },
              },
            ],
          },
          name: 'menu',
          theme: 'outlined',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'MenuOutlined'
      var C = f.forwardRef(k)
    },
    60292: function (E, a, o) {
      'use strict'
      var c = o(84045),
        f = o(57689),
        m = o(81691),
        x = o(90660),
        w = function (C, g) {
          return f.createElement(x.Z, (0, c.Z)((0, c.Z)({}, C), {}, { ref: g, icon: m.Z }))
        }
      ;(w.displayName = 'SearchOutlined'), (a.Z = f.forwardRef(w))
    },
    21332: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0075-94 336.64 336.64 0 01-108.2 41.2A170.1 170.1 0 00672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 00-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 01-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 01-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z',
                },
              },
            ],
          },
          name: 'twitter',
          theme: 'outlined',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'TwitterOutlined'
      var C = f.forwardRef(k)
    },
    7618: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return C
        },
      })
      var c = o(84045),
        f = o(57689),
        m = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M564.7 230.1V803h60l25.2 71.4L756.3 803h131.5V230.1H564.7zm247.7 497h-59.9l-75.1 50.4-17.8-50.4h-18V308.3h170.7v418.8zM526.1 486.9H393.3c2.1-44.9 4.3-104.3 6.6-172.9h130.9l-.1-8.1c0-.6-.2-14.7-2.3-29.1-2.1-15-6.6-34.9-21-34.9H287.8c4.4-20.6 15.7-69.7 29.4-93.8l6.4-11.2-12.9-.7c-.8 0-19.6-.9-41.4 10.6-35.7 19-51.7 56.4-58.7 84.4-18.4 73.1-44.6 123.9-55.7 145.6-3.3 6.4-5.3 10.2-6.2 12.8-1.8 4.9-.8 9.8 2.8 13 10.5 9.5 38.2-2.9 38.5-3 .6-.3 1.3-.6 2.2-1 13.9-6.3 55.1-25 69.8-84.5h56.7c.7 32.2 3.1 138.4 2.9 172.9h-141l-2.1 1.5c-23.1 16.9-30.5 63.2-30.8 65.2l-1.4 9.2h167c-12.3 78.3-26.5 113.4-34 127.4-3.7 7-7.3 14-10.7 20.8-21.3 42.2-43.4 85.8-126.3 153.6-3.6 2.8-7 8-4.8 13.7 2.4 6.3 9.3 9.1 24.6 9.1 5.4 0 11.8-.3 19.4-1 49.9-4.4 100.8-18 135.1-87.6 17-35.1 31.7-71.7 43.9-108.9L497 850l5-12c.8-1.9 19-46.3 5.1-95.9l-.5-1.8-108.1-123-22 16.6c6.4-26.1 10.6-49.9 12.5-71.1h158.7v-8c0-40.1-18.5-63.9-19.2-64.9l-2.4-3z',
                },
              },
            ],
          },
          name: 'zhihu',
          theme: 'outlined',
        },
        x = m,
        w = o(90660),
        k = function (p, u) {
          return f.createElement(w.Z, (0, c.Z)((0, c.Z)({}, p), {}, { ref: u, icon: x }))
        }
      k.displayName = 'ZhihuOutlined'
      var C = f.forwardRef(k)
    },
    7451: function (E, a, o) {
      'use strict'
      var c = o(75782),
        f = o(57689),
        m = o(32156),
        x = o(37105),
        w = function (C, g) {
          return f.createElement(x.Z, (0, c.Z)((0, c.Z)({}, C), {}, { ref: g, icon: m.Z }))
        }
      ;(w.displayName = 'LeftOutlined'), (a.Z = f.forwardRef(w))
    },
    21256: function (E, a, o) {
      'use strict'
      var c = o(75782),
        f = o(57689),
        m = o(10011),
        x = o(37105),
        w = function (C, g) {
          return f.createElement(x.Z, (0, c.Z)((0, c.Z)({}, C), {}, { ref: g, icon: m.Z }))
        }
      ;(w.displayName = 'RightOutlined'), (a.Z = f.forwardRef(w))
    },
    16618: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return ce
        },
      })
      var c = o(57689),
        f = o(51163),
        m = o(91457),
        x =
          /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
        w = (0, m.Z)(function (se) {
          return x.test(se) || (se.charCodeAt(0) === 111 && se.charCodeAt(1) === 110 && se.charCodeAt(2) < 91)
        }),
        k = w,
        C = o(23713),
        g = o(3986),
        p = o(81301),
        u = o(87738),
        v = k,
        H = function (J) {
          return J !== 'theme'
        },
        P = function (J) {
          return typeof J == 'string' && J.charCodeAt(0) > 96 ? v : H
        },
        F = function (J, Ee, Ce) {
          var j
          if (Ee) {
            var V = Ee.shouldForwardProp
            j =
              J.__emotion_forwardProp && V
                ? function (q) {
                    return J.__emotion_forwardProp(q) && V(q)
                  }
                : V
          }
          return typeof j != 'function' && Ce && (j = J.__emotion_forwardProp), j
        },
        I = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
        U = function (J) {
          var Ee = J.cache,
            Ce = J.serialized,
            j = J.isStringTag
          ;(0, g.hC)(Ee, Ce, j)
          var V = (0, u.L)(function () {
            return (0, g.My)(Ee, Ce, j)
          })
          return null
        },
        $ = function se(J, Ee) {
          var Ce = J.__emotion_real === J,
            j = (Ce && J.__emotion_base) || J,
            V,
            q
          Ee !== void 0 && ((V = Ee.label), (q = Ee.target))
          var be = F(J, Ee, Ce),
            Q = be || P(j),
            te = !Q('as')
          return function () {
            var _ = arguments,
              re = Ce && J.__emotion_styles !== void 0 ? J.__emotion_styles.slice(0) : []
            if ((V !== void 0 && re.push('label:' + V + ';'), _[0] == null || _[0].raw === void 0)) re.push.apply(re, _)
            else {
              re.push(_[0][0])
              for (var oe = _.length, ke = 1; ke < oe; ke++) re.push(_[ke], _[0][ke])
            }
            var he = (0, C.w)(function (Ae, we, ie) {
              var le = (te && Ae.as) || j,
                fe = '',
                Te = [],
                Le = Ae
              if (Ae.theme == null) {
                Le = {}
                for (var ve in Ae) Le[ve] = Ae[ve]
                Le.theme = (0, c.useContext)(C.T)
              }
              typeof Ae.className == 'string'
                ? (fe = (0, g.fp)(we.registered, Te, Ae.className))
                : Ae.className != null && (fe = Ae.className + ' ')
              var xe = (0, p.O)(re.concat(Te), we.registered, Le)
              ;(fe += we.key + '-' + xe.name), q !== void 0 && (fe += ' ' + q)
              var ne = te && be === void 0 ? P(le) : Q,
                Z = {}
              for (var Ze in Ae) (te && Ze === 'as') || (ne(Ze) && (Z[Ze] = Ae[Ze]))
              return (
                (Z.className = fe),
                (Z.ref = ie),
                (0, c.createElement)(
                  c.Fragment,
                  null,
                  (0, c.createElement)(U, { cache: we, serialized: xe, isStringTag: typeof le == 'string' }),
                  (0, c.createElement)(le, Z),
                )
              )
            })
            return (
              (he.displayName =
                V !== void 0
                  ? V
                  : 'Styled(' + (typeof j == 'string' ? j : j.displayName || j.name || 'Component') + ')'),
              (he.defaultProps = J.defaultProps),
              (he.__emotion_real = he),
              (he.__emotion_base = j),
              (he.__emotion_styles = re),
              (he.__emotion_forwardProp = be),
              Object.defineProperty(he, 'toString', {
                value: function () {
                  return '.' + q
                },
              }),
              (he.withComponent = function (Ae, we) {
                return se(Ae, (0, f.Z)({}, Ee, we, { shouldForwardProp: F(he, we, !0) })).apply(void 0, re)
              }),
              he
            )
          }
        },
        X = $,
        ue = [
          'a',
          'abbr',
          'address',
          'area',
          'article',
          'aside',
          'audio',
          'b',
          'base',
          'bdi',
          'bdo',
          'big',
          'blockquote',
          'body',
          'br',
          'button',
          'canvas',
          'caption',
          'cite',
          'code',
          'col',
          'colgroup',
          'data',
          'datalist',
          'dd',
          'del',
          'details',
          'dfn',
          'dialog',
          'div',
          'dl',
          'dt',
          'em',
          'embed',
          'fieldset',
          'figcaption',
          'figure',
          'footer',
          'form',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'head',
          'header',
          'hgroup',
          'hr',
          'html',
          'i',
          'iframe',
          'img',
          'input',
          'ins',
          'kbd',
          'keygen',
          'label',
          'legend',
          'li',
          'link',
          'main',
          'map',
          'mark',
          'marquee',
          'menu',
          'menuitem',
          'meta',
          'meter',
          'nav',
          'noscript',
          'object',
          'ol',
          'optgroup',
          'option',
          'output',
          'p',
          'param',
          'picture',
          'pre',
          'progress',
          'q',
          'rp',
          'rt',
          'ruby',
          's',
          'samp',
          'script',
          'section',
          'select',
          'small',
          'source',
          'span',
          'strong',
          'style',
          'sub',
          'summary',
          'sup',
          'table',
          'tbody',
          'td',
          'textarea',
          'tfoot',
          'th',
          'thead',
          'time',
          'title',
          'tr',
          'track',
          'u',
          'ul',
          'var',
          'video',
          'wbr',
          'circle',
          'clipPath',
          'defs',
          'ellipse',
          'foreignObject',
          'g',
          'image',
          'line',
          'linearGradient',
          'mask',
          'path',
          'pattern',
          'polygon',
          'polyline',
          'radialGradient',
          'rect',
          'stop',
          'svg',
          'text',
          'tspan',
        ],
        B = X.bind()
      ue.forEach(function (se) {
        B[se] = B(se)
      })
      var ce = B
    },
    6953: function (E, a, o) {
      'use strict'
      var c = o(84875),
        f = o.n(c)
      a.Z = f()
    },
    88586: function (E, a, o) {
      'use strict'
      o.d(a, {
        a: function () {
          return f
        },
      })
      var c = o(57689),
        f = function (w) {
          return function (k, C) {
            var g = (0, c.useRef)(!1)
            w(function () {
              return function () {
                g.current = !1
              }
            }, []),
              w(function () {
                if (!g.current) g.current = !0
                else return k()
              }, C)
          }
        },
        m = null
    },
    19263: function (E, a, o) {
      'use strict'
      var c = o(57689),
        f = o(72930),
        m = o(97581),
        x = function (k, C) {
          var g = typeof Symbol == 'function' && k[Symbol.iterator]
          if (!g) return k
          var p = g.call(k),
            u,
            v = [],
            H
          try {
            for (; (C === void 0 || C-- > 0) && !(u = p.next()).done; ) v.push(u.value)
          } catch (P) {
            H = { error: P }
          } finally {
            try {
              u && !u.done && (g = p.return) && g.call(p)
            } finally {
              if (H) throw H.error
            }
          }
          return v
        }
      function w(k, C, g) {
        var p = x((0, c.useState)({}), 2),
          u = p[0],
          v = p[1],
          H = (0, f.Z)(function () {
            v({})
          }, g).run
        ;(0, c.useEffect)(function () {
          return H()
        }, C),
          (0, m.Z)(k, [u])
      }
      a.Z = w
    },
    72930: function (E, a, o) {
      'use strict'
      var c = o(66292),
        f = o.n(c),
        m = o(57689),
        x = o(97727),
        w = o(35335),
        k = function (p, u) {
          var v = typeof Symbol == 'function' && p[Symbol.iterator]
          if (!v) return p
          var H = v.call(p),
            P,
            F = [],
            I
          try {
            for (; (u === void 0 || u-- > 0) && !(P = H.next()).done; ) F.push(P.value)
          } catch (U) {
            I = { error: U }
          } finally {
            try {
              P && !P.done && (v = H.return) && v.call(H)
            } finally {
              if (I) throw I.error
            }
          }
          return F
        },
        C = function () {
          for (var p = [], u = 0; u < arguments.length; u++) p = p.concat(k(arguments[u]))
          return p
        }
      function g(p, u) {
        var v,
          H = (0, x.Z)(p),
          P = (v = u == null ? void 0 : u.wait) !== null && v !== void 0 ? v : 1e3,
          F = (0, m.useMemo)(function () {
            return f()(
              function () {
                for (var I = [], U = 0; U < arguments.length; U++) I[U] = arguments[U]
                return H.current.apply(H, C(I))
              },
              P,
              u,
            )
          }, [])
        return (
          (0, w.Z)(function () {
            F.cancel()
          }),
          { run: F, cancel: F.cancel, flush: F.flush }
        )
      }
      a.Z = g
    },
    53983: function (E, a, o) {
      'use strict'
      var c = o(97727),
        f = o(97099),
        m = o(45952)
      function x(w, k, C) {
        C === void 0 && (C = {})
        var g = (0, c.Z)(k)
        ;(0, m.Z)(
          function () {
            var p = (0, f.n)(C.target, window)
            if (p != null && p.addEventListener) {
              var u = function (H) {
                return g.current(H)
              }
              return (
                p.addEventListener(w, u, { capture: C.capture, once: C.once, passive: C.passive }),
                function () {
                  p.removeEventListener(w, u, { capture: C.capture })
                }
              )
            }
          },
          [w, C.capture, C.once, C.passive],
          C.target,
        )
      }
      a.Z = x
    },
    97727: function (E, a, o) {
      'use strict'
      var c = o(57689)
      function f(m) {
        var x = (0, c.useRef)(m)
        return (x.current = m), x
      }
      a.Z = f
    },
    35335: function (E, a, o) {
      'use strict'
      var c = o(57689),
        f = o(97727),
        m = function (w) {
          var k = (0, f.Z)(w)
          ;(0, c.useEffect)(function () {
            return function () {
              k.current()
            }
          }, [])
        }
      a.Z = m
    },
    97581: function (E, a, o) {
      'use strict'
      var c = o(57689),
        f = o(88586)
      a.Z = (0, f.a)(c.useEffect)
    },
    36200: function (E, a, o) {
      'use strict'
      var c = o(57689),
        f = o(35335),
        m = o(96748),
        x = o(97099),
        w = function (C) {
          var g = function (u, v, H) {
            var P = (0, c.useRef)(!1),
              F = (0, c.useRef)([]),
              I = (0, c.useRef)([]),
              U = (0, c.useRef)()
            C(function () {
              var $,
                X = Array.isArray(H) ? H : [H],
                ue = X.map(function (B) {
                  return (0, x.n)(B)
                })
              if (!P.current) {
                ;(P.current = !0), (F.current = ue), (I.current = v), (U.current = u())
                return
              }
              ;(ue.length !== F.current.length || !(0, m.Z)(ue, F.current) || !(0, m.Z)(v, I.current)) &&
                (($ = U.current) === null || $ === void 0 || $.call(U),
                (F.current = ue),
                (I.current = v),
                (U.current = u()))
            }),
              (0, f.Z)(function () {
                var $
                ;($ = U.current) === null || $ === void 0 || $.call(U), (P.current = !1)
              })
          }
          return g
        }
      a.Z = w
    },
    96748: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return c
        },
      })
      function c(f, m) {
        if (f === m) return !0
        for (var x = 0; x < f.length; x++) if (!Object.is(f[x], m[x])) return !1
        return !0
      }
    },
    97099: function (E, a, o) {
      'use strict'
      o.d(a, {
        n: function () {
          return m
        },
      })
      var c = o(1584),
        f = o(865)
      function m(x, w) {
        if (f.Z) {
          if (!x) return w
          var k
          return (0, c.mf)(x) ? (k = x()) : 'current' in x ? (k = x.current) : (k = x), k
        }
      }
    },
    1584: function (E, a, o) {
      'use strict'
      o.d(a, {
        G7: function () {
          return k
        },
        HD: function () {
          return m
        },
        Kn: function () {
          return c
        },
        hj: function () {
          return w
        },
        mf: function () {
          return f
        },
      })
      var c = function (g) {
          return g !== null && typeof g == 'object'
        },
        f = function (g) {
          return typeof g == 'function'
        },
        m = function (g) {
          return typeof g == 'string'
        },
        x = function (g) {
          return typeof g == 'boolean'
        },
        w = function (g) {
          return typeof g == 'number'
        },
        k = function (g) {
          return typeof g == 'undefined'
        }
    },
    865: function (E, a) {
      'use strict'
      var o = !!(typeof window != 'undefined' && window.document && window.document.createElement)
      a.Z = o
    },
    45952: function (E, a, o) {
      'use strict'
      var c = o(57689),
        f = o(36200),
        m = (0, f.Z)(c.useEffect)
      a.Z = m
    },
    22725: function (E, a, o) {
      'use strict'
      o.d(a, {
        F: function () {
          return x
        },
      })
      var c = o(62725),
        f = o(38592),
        m = o(57689),
        x = function () {
          var k = f.ZP.useBreakpoint()
          return (0, m.useMemo)(
            function () {
              return (0, c.f)(k)
            },
            [k],
          )
        }
    },
    83573: function (E, a, o) {
      'use strict'
      o.d(a, {
        $: function () {
          return be
        },
      })
      var c = o(7092),
        f = o(2097),
        m = o(64155),
        x = o(13345),
        w = o(49094),
        k = o(22725),
        C = o(57689),
        g = o(6298),
        p = o(61386),
        u = o(25191),
        v = o(86322),
        H = o.n(v),
        P = o(90799),
        F = o(89563),
        I = o(85e3),
        U = o(76599),
        $ = o(97210),
        X,
        ue = (0, $.kc)(function (Q) {
          var te = Q.css,
            _ = Q.token
          return te(
            X ||
              (X = (0, U.Z)([
                `
      cursor: pointer;
      &:hover {
        background: `,
                `;
        border-radius: 4px;
      }
      pre {
        background: none !important;
        padding: 2px 8px !important;
        margin: 0;
      }
      code[class*='language-'] {
        background: none !important;
      }
    `,
              ])),
            _.colorFillSecondary,
          )
        }),
        B = o(58801),
        ce = function (te) {
          var _ = te.children,
            re = ue(),
            oe = re.styles,
            ke = re.theme,
            he = (0, k.F)(),
            Ae = he.mobile,
            we = (0, I.M)(),
            ie = we.copied,
            le = we.setCopied
          return (0, B.jsx)(u.Z, {
            placement: Ae ? void 0 : 'right',
            title: ie
              ? (0, B.jsxs)(B.Fragment, {
                  children: [(0, B.jsx)(p.Z, { style: { color: ke.colorSuccess } }), ' \u590D\u5236\u6210\u529F'],
                })
              : '\u590D\u5236',
            children: (0, B.jsx)('div', {
              className: oe,
              onClick: function () {
                H()(_), le()
              },
              children: (0, B.jsx)(P.oP, {
                background: !1,
                type: 'prism',
                copyable: !1,
                syntaxThemes: { prism: { dark: F.YC, light: F.vs } },
                language: 'js',
                children: _,
              }),
            }),
          })
        },
        se = ce,
        J,
        Ee,
        Ce,
        j,
        V,
        q = (0, $.kc)(function (Q) {
          var te = Q.css,
            _ = Q.token,
            re = Q.responsive,
            oe = Q.stylish
          return {
            title: te(
              J ||
                (J = (0, U.Z)([
                  `
    font-family: monospace;
    `,
                  ` {
      margin-block: 0;
      font-size: 32px !important;
    }
  `,
                ])),
              re.mobile,
            ),
            label: te(
              Ee ||
                (Ee = (0, U.Z)([
                  `
    width: 80px;
  `,
                ])),
            ),
            desc: te(
              Ce ||
                (Ce = (0, U.Z)([
                  `
    font-size: `,
                  `px;
    line-height: `,
                  `px;
  `,
                ])),
              _.fontSizeLG,
              _.lineHeightLG,
            ),
            text: te(
              j ||
                (j = (0, U.Z)([
                  `
    `,
                  `
  `,
                ])),
              oe.clickableText,
            ),
            meta: te(V || (V = (0, U.Z)(['']))),
          }
        }),
        be = (0, C.memo)(function (Q) {
          var te = Q.title,
            _ = Q.componentName,
            re = Q.description,
            oe = Q.defaultImport,
            ke = Q.pkg,
            he = Q.sourceUrl,
            Ae = Q.docUrl,
            we = Q.serviceList,
            ie = we === void 0 ? [] : we,
            le = q(),
            fe = le.styles,
            Te = (0, k.F)(),
            Le = Te.mobile,
            ve = [
              he && { icon: (0, B.jsx)(c.Z, {}), children: '\u67E5\u770B\u6E90\u7801', url: he },
              Ae && { icon: (0, B.jsx)(f.Z, {}), children: '\u7F16\u8F91\u6587\u6863', url: Ae },
            ].filter(function (ne) {
              return ne
            }),
            xe = oe
              ? 'import '.concat(_, " from '").concat(ke, "';")
              : 'import { '.concat(_, " } from '").concat(ke, "';")
          return (0, B.jsxs)(g.D, {
            children: [
              (0, B.jsx)(m.Z.Title, { className: fe.title, children: te }),
              re &&
                (0, B.jsx)('div', {
                  children: (0, B.jsx)(m.Z.Text, { type: 'secondary', className: fe.desc, children: re }),
                }),
              (0, B.jsxs)(g.D, {
                style: { marginTop: 16 },
                gap: Le ? 16 : 24,
                children: [
                  (0, B.jsxs)(g.D, {
                    horizontal: !Le,
                    gap: Le ? 12 : 0,
                    children: [
                      (0, B.jsx)(m.Z.Text, {
                        className: fe.label,
                        type: 'secondary',
                        style: { display: 'flex', alignItems: 'center' },
                        children: '\u5F15\u5165\u65B9\u6CD5',
                      }),
                      (0, B.jsx)(se, { children: xe }),
                    ],
                  }),
                  (0, B.jsx)(x.Z, { dashed: !0, style: { margin: '2px 0' } }),
                  (0, B.jsxs)(g.D, {
                    horizontal: !Le,
                    gap: Le ? 24 : 0,
                    distribution: 'space-between',
                    children: [
                      (0, B.jsx)(w.Z, {
                        split: (0, B.jsx)(x.Z, { type: 'vertical' }),
                        wrap: !0,
                        children: ie.map(function (ne) {
                          return (0, B.jsx)(
                            'a',
                            {
                              href: ne.url,
                              target: '_blank',
                              rel: 'noreferrer',
                              title: ne.label,
                              children: (0, B.jsxs)(g.D, {
                                horizontal: !0,
                                align: 'center',
                                gap: 8,
                                className: fe.text,
                                children: [
                                  (0, B.jsx)(B.Fragment, { children: ne.icon }),
                                  (0, B.jsx)(B.Fragment, { children: ne.children }),
                                ],
                              }),
                            },
                            ne.label,
                          )
                        }),
                      }),
                      (0, B.jsx)(w.Z, {
                        split: (0, B.jsx)(x.Z, { type: 'vertical' }),
                        className: fe.meta,
                        children: ve.map(function (ne) {
                          return (0, B.jsx)(
                            'a',
                            {
                              href: ne.url,
                              target: '_blank',
                              rel: 'noreferrer',
                              children: (0, B.jsxs)(g.D, {
                                horizontal: !0,
                                align: 'center',
                                gap: 8,
                                className: fe.text,
                                children: [
                                  (0, B.jsx)(B.Fragment, { children: ne.icon }),
                                  (0, B.jsx)(B.Fragment, { children: ne.children }),
                                ],
                              }),
                            },
                            ne.url,
                          )
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        })
    },
    16181: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return V
        },
      })
      var c = o(91600),
        f = o(93562),
        m = o(47364),
        x = o(87343),
        w = o(3341),
        k = o.n(w),
        C = o(32699),
        g = o(57689),
        p = o(39649),
        u = o(17852),
        v = o(74491),
        H = o(76599),
        P = o(16618),
        F = o(97210),
        I = o(87356),
        U,
        $,
        X,
        ue,
        B,
        ce,
        se,
        J = P.Z.div(
          U ||
            (U = (0, H.Z)([
              `
  background: `,
              `;

  width: 100%;
`,
            ])),
          function (q) {
            return (0, I.m4)(q.theme.colorBgContainer, 0.8)
          },
        ),
        Ee = (0, F.kc)(function (q) {
          var be = q.token,
            Q = q.prefixCls,
            te = q.cx,
            _ = q.css,
            re = 6
          return {
            icon: te(
              'site-burger-icon',
              _(
                $ ||
                  ($ = (0, H.Z)([
                    `
        position: relative;

        &,
        &::before,
        &::after {
          display: inline-block;
          height: 2px;
          background: `,
                    `;

          width: 16px;

          transition: all 150ms ease;
        }

        &::before,
        &::after {
          position: absolute;
          left: 0;

          content: '';
        }

        &::before {
          top: `,
                    `px;
        }

        &::after {
          top: -`,
                    `px;
        }
      `,
                  ])),
                be.colorTextSecondary,
                re,
                re,
              ),
            ),
            active: _(
              X ||
                (X = (0, H.Z)([
                  `
      &::before,
      &::after {
        background: `,
                  `;
      }
      & {
        background: transparent;
      }

      &::before {
        top: 0;
        transform: rotate(-135deg);
      }

      &::after {
        top: 0;
        transform: rotate(135deg);
      }
    `,
                ])),
              be.colorText,
            ),
            container: _(
              ue ||
                (ue = (0, H.Z)([
                  `
      width: `,
                  `px;
      height: `,
                  `px;
      border-radius: `,
                  `px;
      cursor: pointer;
    `,
                ])),
              be.controlHeight,
              be.controlHeight,
              be.borderRadius,
            ),
            drawerRoot: _(
              B ||
                (B = (0, H.Z)([
                  `
      top: `,
                  `px;

      :focus-visible {
        outline: none;
      }

      .`,
                  `-drawer {
        &-mask {
          background: transparent;
          backdrop-filter: blur(7px);
          background: `,
                  `;
        }

        &-content-wrapper {
          box-shadow: none;
        }
      }
    `,
                ])),
              be.headerHeight + 1,
              Q,
              (0, I.m4)(be.colorBgBase, 0.5),
            ),
            drawer: _(
              ce ||
                (ce = (0, H.Z)([
                  `
      &.`,
                  `-drawer-content {
        background: transparent;
      }

      .`,
                  `-drawer-body {
        display: flex;
        flex-direction: column;
      }
    `,
                ])),
              Q,
              Q,
            ),
            menu: _(
              se ||
                (se = (0, H.Z)([
                  `
      background: transparent;
      border-inline-end: transparent !important;

      > .`,
                  '-menu-item-only-child,.',
                  `-menu-submenu-title {
        background: `,
                  `;
        border-radius: 0;
        margin: 0;
        width: 100%;
        &:active {
          margin-inline: 4px;
          border-radius: `,
                  `px;
        }
      }

      .`,
                  '-menu-sub.',
                  `-menu-inline {
        //background: transparent !important;
        background: `,
                  ` !important;
      }
    `,
                ])),
              Q,
              Q,
              (0, I.m4)(be.colorBgContainer, 0.8),
              be.borderRadius,
              Q,
              Q,
              (0, I.m4)(be.colorBgContainer, 0.2),
            ),
          }
        }),
        Ce = o(58801),
        j = function () {
          var be = (0, g.useState)(!1),
            Q = (0, c.Z)(be, 2),
            te = Q[0],
            _ = Q[1],
            re = Ee(),
            oe = re.styles,
            ke = re.cx,
            he = (0, u.H)(function (le) {
              return le.navData
            }, k()),
            Ae = (0, u.H)(function (le) {
              return le.sidebar
            }, k()),
            we = (0, u.H)(v.K1),
            ie = (0, u.H)(function (le) {
              return le.location.pathname
            })
          return (0, Ce.jsxs)(p.Z, {
            className: oe.container,
            onClick: function () {
              _(!te)
            },
            children: [
              (0, Ce.jsx)('div', { className: ke(oe.icon, te ? oe.active : '') }),
              (0, Ce.jsxs)(f.Z, {
                open: te,
                placement: 'left',
                closeIcon: null,
                rootClassName: oe.drawerRoot,
                className: oe.drawer,
                width: '100vw',
                headerStyle: { display: 'none' },
                bodyStyle: { padding: 0 },
                children: [
                  (0, Ce.jsx)(J, { style: { height: 24 } }),
                  (0, Ce.jsx)(m.Z, {
                    mode: 'inline',
                    selectedKeys: (0, C.uniq)([we, 's-'.concat(ie)]),
                    openKeys: [we],
                    className: oe.menu,
                    items: he.map(function (le) {
                      return {
                        label: (0, Ce.jsx)(x.rU, { to: le.link, children: le.title }),
                        key: le.activePath || le.link,
                        children:
                          (le.activePath || le.link) === we &&
                          (Ae == null
                            ? void 0
                            : Ae.map(function (fe) {
                                return (
                                  !fe.link && {
                                    label: fe.title,
                                    type: 'group',
                                    children: fe.children.map(function (Te) {
                                      return {
                                        label: (0, Ce.jsx)(x.rU, {
                                          to: Te.link,
                                          onClick: function () {
                                            _(!1)
                                          },
                                          children: Te.title,
                                        }),
                                        key: 's-'.concat(Te.link),
                                      }
                                    }),
                                  }
                                )
                              })),
                      }
                    }),
                  }),
                  (0, Ce.jsx)(J, { style: { flex: 1 } }),
                ],
              }),
            ],
          })
        },
        V = j
    },
    64820: function (E, a, o) {
      'use strict'
      var c = o(7092),
        f = o(25191),
        m = o(20476),
        x = o(57689),
        w = o(17852),
        k = o(58801),
        C = function () {
          var p = (0, w.H)(function (u) {
            var v
            return (v = u.siteData.themeConfig) === null || v === void 0 ? void 0 : v.github
          })
          return p
            ? (0, k.jsx)(f.Z, {
                arrow: !1,
                title: 'Github',
                children: (0, k.jsx)('a', {
                  href: p,
                  target: '_blank',
                  rel: 'noreferrer',
                  children: (0, k.jsx)(m.ZP, { icon: (0, k.jsx)(c.Z, {}) }),
                }),
              })
            : null
        }
      a.Z = (0, x.memo)(C)
    },
    60276: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return g
        },
      })
      var c = o(20476),
        f = o(76599),
        m = o(97210),
        x,
        w = (0, m.kc)(function (p) {
          var u = p.css,
            v = p.stylish
          return {
            button: u(
              x ||
                (x = (0, f.Z)([
                  `
      border: none;

      `,
                  `
      `,
                  `

      background-size: 200% 100%;

      &:hover {
        animation: none;
      }
    `,
                ])),
              v.heroButtonGradient,
              v.heroGradientFlow,
            ),
          }
        }),
        k = o(58801),
        C = function (u) {
          var v = u.children,
            H = w(),
            P = H.styles
          return (0, k.jsx)(c.ZP, { size: 'large', shape: 'round', type: 'primary', className: P.button, children: v })
        },
        g = C
    },
    4611: function (E, a, o) {
      'use strict'
      o.d(a, {
        y: function () {
          return u
        },
      })
      var c = o(76599),
        f = o(97210),
        m,
        x,
        w,
        k,
        C,
        g,
        p,
        u = (0, f.kc)(function (v) {
          var H = v.css,
            P = v.responsive,
            F = v.token,
            I = v.stylish,
            U = v.isDarkMode
          return {
            container: H(
              m ||
                (m = (0, c.Z)([
                  `
    position: relative;
    text-align: center;
    box-sizing: border-box;

    + * {
      position: relative;
    }

    > p {
      margin: 32px;
      color: `,
                  `;
      font-size: 20px;
      line-height: 1.6;

      `,
                  `
    }
  `,
                ])),
              F.colorTextSecondary,
              P({ mobile: { fontSize: 16 } }),
            ),
            titleContainer: H(
              x ||
                (x = (0, c.Z)([
                  `
    position: relative;
  `,
                ])),
            ),
            title: H(
              w ||
                (w = (0, c.Z)([
                  `
    font-size: 68px;
    z-index: 10;
    color: transparent;
    margin: 0;
    font-family: AliPuHui, `,
                  `;

    `,
                  `

    b {
      position: relative;
      z-index: 5;
      `,
                  `;
      `,
                  `

      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `,
                ])),
              F.fontFamily,
              P({ mobile: { fontSize: 40 } }),
              I.heroGradient,
              I.heroGradientFlow,
            ),
            titleShadow: H(
              k ||
                (k = (0, c.Z)([
                  `
    position: absolute;
    z-index: 0;
    color: `,
                  `;

    top: 0;
    left: 0;
    font-size: 68px;
    font-family: AliPuHui, `,
                  `;
    font-weight: bold;
    `,
                  `

    `,
                  `

    b {
      color: transparent;
    }
  `,
                ])),
              U ? F.colorWhite : F.colorTextBase,
              F.fontFamily,
              P({ mobile: { fontSize: 40 } }),
              I.heroTextShadow,
            ),
            desc: H(
              C ||
                (C = (0, c.Z)([
                  `
    font-size: `,
                  `px;
    color: `,
                  `;

    `,
                  ` {
      font-size: `,
                  `px;
      margin: 24px 16px;
    }
  `,
                ])),
              F.fontSizeHeading3,
              F.colorTextSecondary,
              P.mobile,
              F.fontSizeHeading5,
            ),
            actions: H(
              g ||
                (g = (0, c.Z)([
                  `
    margin-top: 48px;
    display: flex;
    justify-content: center;

    `,
                  `
  `,
                ])),
              P({ mobile: { marginTop: 24 } }),
            ),
            canvas: H(
              p ||
                (p = (0, c.Z)([
                  `
    z-index: 10;
    pointer-events: none;
    position: absolute;
    top: -250px;
    left: 50%;
    transform: translateX(-50%) scale(1.5);
    width: 600px;
    height: 400px;
    opacity: 0.2;
    `,
                  `

    `,
                  ` {
      width: 200px;
      height: 300px;
    }
  `,
                ])),
              I.heroBlurBall,
              P.mobile,
            ),
          }
        })
    },
    69023: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return Fr
        },
      })
      var c = o(24572),
        f = o(91600)
      function m(e) {
        return e.split('-')[1]
      }
      function x(e) {
        return e === 'y' ? 'height' : 'width'
      }
      function w(e) {
        return e.split('-')[0]
      }
      function k(e) {
        return ['top', 'bottom'].includes(w(e)) ? 'x' : 'y'
      }
      function C(e, t, n) {
        let { reference: r, floating: l } = e
        const i = r.x + r.width / 2 - l.width / 2,
          s = r.y + r.height / 2 - l.height / 2,
          d = k(t),
          S = x(d),
          b = r[S] / 2 - l[S] / 2,
          A = d === 'x'
        let h
        switch (w(t)) {
          case 'top':
            h = { x: i, y: r.y - l.height }
            break
          case 'bottom':
            h = { x: i, y: r.y + r.height }
            break
          case 'right':
            h = { x: r.x + r.width, y: s }
            break
          case 'left':
            h = { x: r.x - l.width, y: s }
            break
          default:
            h = { x: r.x, y: r.y }
        }
        switch (m(t)) {
          case 'start':
            h[d] -= b * (n && A ? -1 : 1)
            break
          case 'end':
            h[d] += b * (n && A ? -1 : 1)
        }
        return h
      }
      const g = (e, t, n) =>
        mo(this, null, function* () {
          const { placement: r = 'bottom', strategy: l = 'absolute', middleware: i = [], platform: s } = n,
            d = i.filter(Boolean),
            S = yield s.isRTL == null ? void 0 : s.isRTL(t)
          let b = yield s.getElementRects({ reference: e, floating: t, strategy: l }),
            { x: A, y: h } = C(b, r, S),
            y = r,
            M = {},
            O = 0
          for (let z = 0; z < d.length; z++) {
            const { name: T, fn: K } = d[z],
              {
                x: G,
                y: N,
                data: Y,
                reset: W,
              } = yield K({
                x: A,
                y: h,
                initialPlacement: r,
                placement: y,
                strategy: l,
                middlewareData: M,
                rects: b,
                platform: s,
                elements: { reference: e, floating: t },
              })
            ;(A = G != null ? G : A),
              (h = N != null ? N : h),
              (M = _e(Me({}, M), { [T]: Me(Me({}, M[T]), Y) })),
              W &&
                O <= 50 &&
                (O++,
                typeof W == 'object' &&
                  (W.placement && (y = W.placement),
                  W.rects &&
                    (b =
                      W.rects === !0 ? yield s.getElementRects({ reference: e, floating: t, strategy: l }) : W.rects),
                  ({ x: A, y: h } = C(b, y, S))),
                (z = -1))
          }
          return { x: A, y: h, placement: y, strategy: l, middlewareData: M }
        })
      function p(e) {
        return typeof e != 'number'
          ? (function (t) {
              return Me({ top: 0, right: 0, bottom: 0, left: 0 }, t)
            })(e)
          : { top: e, right: e, bottom: e, left: e }
      }
      function u(e) {
        return _e(Me({}, e), { top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height })
      }
      function v(e, t) {
        return mo(this, null, function* () {
          var n
          t === void 0 && (t = {})
          const { x: r, y: l, platform: i, rects: s, elements: d, strategy: S } = e,
            {
              boundary: b = 'clippingAncestors',
              rootBoundary: A = 'viewport',
              elementContext: h = 'floating',
              altBoundary: y = !1,
              padding: M = 0,
            } = t,
            O = p(M),
            z = d[y ? (h === 'floating' ? 'reference' : 'floating') : h],
            T = u(
              yield i.getClippingRect({
                element:
                  (n = yield i.isElement == null ? void 0 : i.isElement(z)) == null || n
                    ? z
                    : z.contextElement ||
                      (yield i.getDocumentElement == null ? void 0 : i.getDocumentElement(d.floating)),
                boundary: b,
                rootBoundary: A,
                strategy: S,
              }),
            ),
            K = h === 'floating' ? _e(Me({}, s.floating), { x: r, y: l }) : s.reference,
            G = yield i.getOffsetParent == null ? void 0 : i.getOffsetParent(d.floating),
            N = ((yield i.isElement == null ? void 0 : i.isElement(G)) &&
              (yield i.getScale == null ? void 0 : i.getScale(G))) || { x: 1, y: 1 },
            Y = u(
              i.convertOffsetParentRelativeRectToViewportRelativeRect
                ? yield i.convertOffsetParentRelativeRectToViewportRelativeRect({
                    rect: K,
                    offsetParent: G,
                    strategy: S,
                  })
                : K,
            )
          return {
            top: (T.top - Y.top + O.top) / N.y,
            bottom: (Y.bottom - T.bottom + O.bottom) / N.y,
            left: (T.left - Y.left + O.left) / N.x,
            right: (Y.right - T.right + O.right) / N.x,
          }
        })
      }
      const H = Math.min,
        P = Math.max
      function F(e, t, n) {
        return P(e, H(t, n))
      }
      const I = (e) => ({
          name: 'arrow',
          options: e,
          fn(n) {
            return mo(this, null, function* () {
              const { element: r, padding: l = 0 } = e || {},
                { x: i, y: s, placement: d, rects: S, platform: b, elements: A } = n
              if (r == null) return {}
              const h = p(l),
                y = { x: i, y: s },
                M = k(d),
                O = x(M),
                z = yield b.getDimensions(r),
                T = M === 'y',
                K = T ? 'top' : 'left',
                G = T ? 'bottom' : 'right',
                N = T ? 'clientHeight' : 'clientWidth',
                Y = S.reference[O] + S.reference[M] - y[M] - S.floating[O],
                W = y[M] - S.reference[M],
                pe = yield b.getOffsetParent == null ? void 0 : b.getOffsetParent(r)
              let Oe = pe ? pe[N] : 0
              ;(Oe && (yield b.isElement == null ? void 0 : b.isElement(pe))) || (Oe = A.floating[N] || S.floating[O])
              const Re = Y / 2 - W / 2,
                de = h[K],
                ae = Oe - z[O] - h[G],
                R = Oe / 2 - z[O] / 2 + Re,
                D = F(de, R, ae),
                ee = m(d) != null && R != D && S.reference[O] / 2 - (R < de ? h[K] : h[G]) - z[O] / 2 < 0
              return { [M]: y[M] - (ee ? (R < de ? de - R : ae - R) : 0), data: { [M]: D, centerOffset: R - D } }
            })
          },
        }),
        U = ['top', 'right', 'bottom', 'left'],
        $ = U.reduce((e, t) => e.concat(t, t + '-start', t + '-end'), []),
        X = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
      function ue(e) {
        return e.replace(/left|right|bottom|top/g, (t) => X[t])
      }
      function B(e, t, n) {
        n === void 0 && (n = !1)
        const r = m(e),
          l = k(e),
          i = x(l)
        let s = l === 'x' ? (r === (n ? 'end' : 'start') ? 'right' : 'left') : r === 'start' ? 'bottom' : 'top'
        return t.reference[i] > t.floating[i] && (s = ue(s)), { main: s, cross: ue(s) }
      }
      const ce = { start: 'end', end: 'start' }
      function se(e) {
        return e.replace(/start|end/g, (t) => ce[t])
      }
      const J = function (e) {
          return (
            e === void 0 && (e = {}),
            {
              name: 'autoPlacement',
              options: e,
              fn(n) {
                return mo(this, null, function* () {
                  var r, l, i
                  const { rects: s, middlewareData: d, placement: S, platform: b, elements: A } = n,
                    R = e,
                    { crossAxis: h = !1, alignment: y, allowedPlacements: M = $, autoAlignment: O = !0 } = R,
                    z = Lo(R, ['crossAxis', 'alignment', 'allowedPlacements', 'autoAlignment']),
                    T =
                      y !== void 0 || M === $
                        ? (function (D, ee, me) {
                            return (
                              D
                                ? [...me.filter((ge) => m(ge) === D), ...me.filter((ge) => m(ge) !== D)]
                                : me.filter((ge) => w(ge) === ge)
                            ).filter((ge) => !D || m(ge) === D || (!!ee && se(ge) !== ge))
                          })(y || null, O, M)
                        : M,
                    K = yield v(n, z),
                    G = ((r = d.autoPlacement) == null ? void 0 : r.index) || 0,
                    N = T[G]
                  if (N == null) return {}
                  const { main: Y, cross: W } = B(N, s, yield b.isRTL == null ? void 0 : b.isRTL(A.floating))
                  if (S !== N) return { reset: { placement: T[0] } }
                  const pe = [K[w(N)], K[Y], K[W]],
                    Oe = [
                      ...(((l = d.autoPlacement) == null ? void 0 : l.overflows) || []),
                      { placement: N, overflows: pe },
                    ],
                    Re = T[G + 1]
                  if (Re) return { data: { index: G + 1, overflows: Oe }, reset: { placement: Re } }
                  const de = Oe.map((D) => {
                      const ee = m(D.placement)
                      return [
                        D.placement,
                        ee && h ? D.overflows.slice(0, 2).reduce((me, ge) => me + ge, 0) : D.overflows[0],
                        D.overflows,
                      ]
                    }).sort((D, ee) => D[1] - ee[1]),
                    ae =
                      ((i = de.filter((D) => D[2].slice(0, m(D[0]) ? 2 : 3).every((ee) => ee <= 0))[0]) == null
                        ? void 0
                        : i[0]) || de[0][0]
                  return ae !== S ? { data: { index: G + 1, overflows: Oe }, reset: { placement: ae } } : {}
                })
              },
            }
          )
        },
        Ee = function (e) {
          return (
            e === void 0 && (e = {}),
            {
              name: 'flip',
              options: e,
              fn(n) {
                return mo(this, null, function* () {
                  var r
                  const {
                      placement: l,
                      middlewareData: i,
                      rects: s,
                      initialPlacement: d,
                      platform: S,
                      elements: b,
                    } = n,
                    D = e,
                    {
                      mainAxis: A = !0,
                      crossAxis: h = !0,
                      fallbackPlacements: y,
                      fallbackStrategy: M = 'bestFit',
                      fallbackAxisSideDirection: O = 'none',
                      flipAlignment: z = !0,
                    } = D,
                    T = Lo(D, [
                      'mainAxis',
                      'crossAxis',
                      'fallbackPlacements',
                      'fallbackStrategy',
                      'fallbackAxisSideDirection',
                      'flipAlignment',
                    ]),
                    K = w(l),
                    G = w(d) === d,
                    N = yield S.isRTL == null ? void 0 : S.isRTL(b.floating),
                    Y =
                      y ||
                      (G || !z
                        ? [ue(d)]
                        : (function (ee) {
                            const me = ue(ee)
                            return [se(ee), me, se(me)]
                          })(d))
                  y ||
                    O === 'none' ||
                    Y.push(
                      ...(function (ee, me, ge, Ye) {
                        const Ue = m(ee)
                        let Se = (function (He, ye, De) {
                          const We = ['left', 'right'],
                            ze = ['right', 'left'],
                            Ie = ['top', 'bottom'],
                            je = ['bottom', 'top']
                          switch (He) {
                            case 'top':
                            case 'bottom':
                              return De ? (ye ? ze : We) : ye ? We : ze
                            case 'left':
                            case 'right':
                              return ye ? Ie : je
                            default:
                              return []
                          }
                        })(w(ee), ge === 'start', Ye)
                        return Ue && ((Se = Se.map((He) => He + '-' + Ue)), me && (Se = Se.concat(Se.map(se)))), Se
                      })(d, z, O, N),
                    )
                  const W = [d, ...Y],
                    pe = yield v(n, T),
                    Oe = []
                  let Re = ((r = i.flip) == null ? void 0 : r.overflows) || []
                  if ((A && Oe.push(pe[K]), h)) {
                    const { main: ee, cross: me } = B(l, s, N)
                    Oe.push(pe[ee], pe[me])
                  }
                  if (((Re = [...Re, { placement: l, overflows: Oe }]), !Oe.every((ee) => ee <= 0))) {
                    var de, ae
                    const ee = (((de = i.flip) == null ? void 0 : de.index) || 0) + 1,
                      me = W[ee]
                    if (me) return { data: { index: ee, overflows: Re }, reset: { placement: me } }
                    let ge =
                      (ae = Re.filter((Ye) => Ye.overflows[0] <= 0).sort(
                        (Ye, Ue) => Ye.overflows[1] - Ue.overflows[1],
                      )[0]) == null
                        ? void 0
                        : ae.placement
                    if (!ge)
                      switch (M) {
                        case 'bestFit': {
                          var R
                          const Ye =
                            (R = Re.map((Ue) => [
                              Ue.placement,
                              Ue.overflows.filter((Se) => Se > 0).reduce((Se, He) => Se + He, 0),
                            ]).sort((Ue, Se) => Ue[1] - Se[1])[0]) == null
                              ? void 0
                              : R[0]
                          Ye && (ge = Ye)
                          break
                        }
                        case 'initialPlacement':
                          ge = d
                      }
                    if (l !== ge) return { reset: { placement: ge } }
                  }
                  return {}
                })
              },
            }
          )
        }
      function Ce(e, t) {
        return { top: e.top - t.height, right: e.right - t.width, bottom: e.bottom - t.height, left: e.left - t.width }
      }
      function j(e) {
        return U.some((t) => e[t] >= 0)
      }
      const V = function (e) {
          return (
            e === void 0 && (e = {}),
            {
              name: 'hide',
              options: e,
              fn(n) {
                return mo(this, null, function* () {
                  const s = e,
                    { strategy: r = 'referenceHidden' } = s,
                    l = Lo(s, ['strategy']),
                    { rects: i } = n
                  switch (r) {
                    case 'referenceHidden': {
                      const d = Ce(yield v(n, _e(Me({}, l), { elementContext: 'reference' })), i.reference)
                      return { data: { referenceHiddenOffsets: d, referenceHidden: j(d) } }
                    }
                    case 'escaped': {
                      const d = Ce(yield v(n, _e(Me({}, l), { altBoundary: !0 })), i.floating)
                      return { data: { escapedOffsets: d, escaped: j(d) } }
                    }
                    default:
                      return {}
                  }
                })
              },
            }
          )
        },
        q = function (e) {
          return (
            e === void 0 && (e = {}),
            {
              name: 'inline',
              options: e,
              fn(n) {
                return mo(this, null, function* () {
                  const { placement: r, elements: l, rects: i, platform: s, strategy: d } = n,
                    { padding: S = 2, x: b, y: A } = e,
                    h = u(
                      s.convertOffsetParentRelativeRectToViewportRelativeRect
                        ? yield s.convertOffsetParentRelativeRectToViewportRelativeRect({
                            rect: i.reference,
                            offsetParent: yield s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating),
                            strategy: d,
                          })
                        : i.reference,
                    ),
                    y = (yield s.getClientRects == null ? void 0 : s.getClientRects(l.reference)) || [],
                    M = p(S),
                    O = yield s.getElementRects({
                      reference: {
                        getBoundingClientRect: function () {
                          if (y.length === 2 && y[0].left > y[1].right && b != null && A != null)
                            return (
                              y.find(
                                (z) =>
                                  b > z.left - M.left &&
                                  b < z.right + M.right &&
                                  A > z.top - M.top &&
                                  A < z.bottom + M.bottom,
                              ) || h
                            )
                          if (y.length >= 2) {
                            if (k(r) === 'x') {
                              const W = y[0],
                                pe = y[y.length - 1],
                                Oe = w(r) === 'top',
                                Re = W.top,
                                de = pe.bottom,
                                ae = Oe ? W.left : pe.left,
                                R = Oe ? W.right : pe.right
                              return {
                                top: Re,
                                bottom: de,
                                left: ae,
                                right: R,
                                width: R - ae,
                                height: de - Re,
                                x: ae,
                                y: Re,
                              }
                            }
                            const z = w(r) === 'left',
                              T = P(...y.map((W) => W.right)),
                              K = H(...y.map((W) => W.left)),
                              G = y.filter((W) => (z ? W.left === K : W.right === T)),
                              N = G[0].top,
                              Y = G[G.length - 1].bottom
                            return { top: N, bottom: Y, left: K, right: T, width: T - K, height: Y - N, x: K, y: N }
                          }
                          return h
                        },
                      },
                      floating: l.floating,
                      strategy: d,
                    })
                  return i.reference.x !== O.reference.x ||
                    i.reference.y !== O.reference.y ||
                    i.reference.width !== O.reference.width ||
                    i.reference.height !== O.reference.height
                    ? { reset: { rects: O } }
                    : {}
                })
              },
            }
          )
        },
        be = function (e) {
          return (
            e === void 0 && (e = 0),
            {
              name: 'offset',
              options: e,
              fn(n) {
                return mo(this, null, function* () {
                  const { x: r, y: l } = n,
                    i = yield (function (s, d) {
                      return mo(this, null, function* () {
                        const { placement: S, platform: b, elements: A } = s,
                          h = yield b.isRTL == null ? void 0 : b.isRTL(A.floating),
                          y = w(S),
                          M = m(S),
                          O = k(S) === 'x',
                          z = ['left', 'top'].includes(y) ? -1 : 1,
                          T = h && O ? -1 : 1,
                          K = typeof d == 'function' ? d(s) : d
                        let {
                          mainAxis: G,
                          crossAxis: N,
                          alignmentAxis: Y,
                        } = typeof K == 'number'
                          ? { mainAxis: K, crossAxis: 0, alignmentAxis: null }
                          : Me({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, K)
                        return (
                          M && typeof Y == 'number' && (N = M === 'end' ? -1 * Y : Y),
                          O ? { x: N * T, y: G * z } : { x: G * z, y: N * T }
                        )
                      })
                    })(n, e)
                  return { x: r + i.x, y: l + i.y, data: i }
                })
              },
            }
          )
        }
      function Q(e) {
        return e === 'x' ? 'y' : 'x'
      }
      const te = function (e) {
          return (
            e === void 0 && (e = {}),
            {
              name: 'shift',
              options: e,
              fn(n) {
                return mo(this, null, function* () {
                  const { x: r, y: l, placement: i } = n,
                    K = e,
                    {
                      mainAxis: s = !0,
                      crossAxis: d = !1,
                      limiter: S = {
                        fn: (G) => {
                          let { x: N, y: Y } = G
                          return { x: N, y: Y }
                        },
                      },
                    } = K,
                    b = Lo(K, ['mainAxis', 'crossAxis', 'limiter']),
                    A = { x: r, y: l },
                    h = yield v(n, b),
                    y = k(w(i)),
                    M = Q(y)
                  let O = A[y],
                    z = A[M]
                  if (s) {
                    const G = y === 'y' ? 'bottom' : 'right'
                    O = F(O + h[y === 'y' ? 'top' : 'left'], O, O - h[G])
                  }
                  if (d) {
                    const G = M === 'y' ? 'bottom' : 'right'
                    z = F(z + h[M === 'y' ? 'top' : 'left'], z, z - h[G])
                  }
                  const T = S.fn(_e(Me({}, n), { [y]: O, [M]: z }))
                  return _e(Me({}, T), { data: { x: T.x - r, y: T.y - l } })
                })
              },
            }
          )
        },
        _ = function (e) {
          return (
            e === void 0 && (e = {}),
            {
              options: e,
              fn(t) {
                const { x: n, y: r, placement: l, rects: i, middlewareData: s } = t,
                  { offset: d = 0, mainAxis: S = !0, crossAxis: b = !0 } = e,
                  A = { x: n, y: r },
                  h = k(l),
                  y = Q(h)
                let M = A[h],
                  O = A[y]
                const z = typeof d == 'function' ? d(t) : d,
                  T = typeof z == 'number' ? { mainAxis: z, crossAxis: 0 } : Me({ mainAxis: 0, crossAxis: 0 }, z)
                if (S) {
                  const N = h === 'y' ? 'height' : 'width',
                    Y = i.reference[h] - i.floating[N] + T.mainAxis,
                    W = i.reference[h] + i.reference[N] - T.mainAxis
                  M < Y ? (M = Y) : M > W && (M = W)
                }
                if (b) {
                  var K, G
                  const N = h === 'y' ? 'width' : 'height',
                    Y = ['top', 'left'].includes(w(l)),
                    W =
                      i.reference[y] -
                      i.floating[N] +
                      ((Y && ((K = s.offset) == null ? void 0 : K[y])) || 0) +
                      (Y ? 0 : T.crossAxis),
                    pe =
                      i.reference[y] +
                      i.reference[N] +
                      (Y ? 0 : ((G = s.offset) == null ? void 0 : G[y]) || 0) -
                      (Y ? T.crossAxis : 0)
                  O < W ? (O = W) : O > pe && (O = pe)
                }
                return { [h]: M, [y]: O }
              },
            }
          )
        },
        re = function (e) {
          return (
            e === void 0 && (e = {}),
            {
              name: 'size',
              options: e,
              fn(n) {
                return mo(this, null, function* () {
                  const { placement: r, rects: l, platform: i, elements: s } = n,
                    pe = e,
                    { apply: d = () => {} } = pe,
                    S = Lo(pe, ['apply']),
                    b = yield v(n, S),
                    A = w(r),
                    h = m(r),
                    y = k(r) === 'x',
                    { width: M, height: O } = l.floating
                  let z, T
                  A === 'top' || A === 'bottom'
                    ? ((z = A),
                      (T =
                        h === ((yield i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? 'start' : 'end')
                          ? 'left'
                          : 'right'))
                    : ((T = A), (z = h === 'end' ? 'top' : 'bottom'))
                  const K = O - b[z],
                    G = M - b[T]
                  let N = K,
                    Y = G
                  if (
                    (y ? (Y = H(M - b.right - b.left, G)) : (N = H(O - b.bottom - b.top, K)),
                    !n.middlewareData.shift && !h)
                  ) {
                    const Oe = P(b.left, 0),
                      Re = P(b.right, 0),
                      de = P(b.top, 0),
                      ae = P(b.bottom, 0)
                    y
                      ? (Y = M - 2 * (Oe !== 0 || Re !== 0 ? Oe + Re : P(b.left, b.right)))
                      : (N = O - 2 * (de !== 0 || ae !== 0 ? de + ae : P(b.top, b.bottom)))
                  }
                  yield d(_e(Me({}, n), { availableWidth: Y, availableHeight: N }))
                  const W = yield i.getDimensions(s.floating)
                  return M !== W.width || O !== W.height ? { reset: { rects: !0 } } : {}
                })
              },
            }
          )
        }
      function oe(e) {
        var t
        return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
      }
      function ke(e) {
        return oe(e).getComputedStyle(e)
      }
      const he = Math.min,
        Ae = Math.max,
        we = Math.round
      function ie(e) {
        const t = ke(e)
        let n = parseFloat(t.width),
          r = parseFloat(t.height)
        const l = e.offsetWidth,
          i = e.offsetHeight,
          s = we(n) !== l || we(r) !== i
        return s && ((n = l), (r = i)), { width: n, height: r, fallback: s }
      }
      function le(e) {
        return xe(e) ? (e.nodeName || '').toLowerCase() : ''
      }
      let fe
      function Te() {
        if (fe) return fe
        const e = navigator.userAgentData
        return e && Array.isArray(e.brands)
          ? ((fe = e.brands.map((t) => t.brand + '/' + t.version).join(' ')), fe)
          : navigator.userAgent
      }
      function Le(e) {
        return e instanceof oe(e).HTMLElement
      }
      function ve(e) {
        return e instanceof oe(e).Element
      }
      function xe(e) {
        return e instanceof oe(e).Node
      }
      function ne(e) {
        return typeof ShadowRoot == 'undefined' ? !1 : e instanceof oe(e).ShadowRoot || e instanceof ShadowRoot
      }
      function Z(e) {
        const { overflow: t, overflowX: n, overflowY: r, display: l } = ke(e)
        return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !['inline', 'contents'].includes(l)
      }
      function Ze(e) {
        return ['table', 'td', 'th'].includes(le(e))
      }
      function Fe(e) {
        const t = /firefox/i.test(Te()),
          n = ke(e),
          r = n.backdropFilter || n.WebkitBackdropFilter
        return (
          n.transform !== 'none' ||
          n.perspective !== 'none' ||
          (!!r && r !== 'none') ||
          (t && n.willChange === 'filter') ||
          (t && !!n.filter && n.filter !== 'none') ||
          ['transform', 'perspective'].some((l) => n.willChange.includes(l)) ||
          ['paint', 'layout', 'strict', 'content'].some((l) => {
            const i = n.contain
            return i != null && i.includes(l)
          })
        )
      }
      function Ge() {
        return /^((?!chrome|android).)*safari/i.test(Te())
      }
      function so(e) {
        return ['html', 'body', '#document'].includes(le(e))
      }
      function no(e) {
        return ve(e) ? e : e.contextElement
      }
      const $e = { x: 1, y: 1 }
      function qe(e) {
        const t = no(e)
        if (!Le(t)) return $e
        const n = t.getBoundingClientRect(),
          { width: r, height: l, fallback: i } = ie(t)
        let s = (i ? we(n.width) : n.width) / r,
          d = (i ? we(n.height) : n.height) / l
        return (s && Number.isFinite(s)) || (s = 1), (d && Number.isFinite(d)) || (d = 1), { x: s, y: d }
      }
      function Xe(e, t, n, r) {
        var l, i
        t === void 0 && (t = !1), n === void 0 && (n = !1)
        const s = e.getBoundingClientRect(),
          d = no(e)
        let S = $e
        t && (r ? ve(r) && (S = qe(r)) : (S = qe(e)))
        const b = d ? oe(d) : window,
          A = Ge() && n
        let h = (s.left + ((A && ((l = b.visualViewport) == null ? void 0 : l.offsetLeft)) || 0)) / S.x,
          y = (s.top + ((A && ((i = b.visualViewport) == null ? void 0 : i.offsetTop)) || 0)) / S.y,
          M = s.width / S.x,
          O = s.height / S.y
        if (d) {
          const z = oe(d),
            T = r && ve(r) ? oe(r) : r
          let K = z.frameElement
          for (; K && r && T !== z; ) {
            const G = qe(K),
              N = K.getBoundingClientRect(),
              Y = getComputedStyle(K)
            ;(N.x += (K.clientLeft + parseFloat(Y.paddingLeft)) * G.x),
              (N.y += (K.clientTop + parseFloat(Y.paddingTop)) * G.y),
              (h *= G.x),
              (y *= G.y),
              (M *= G.x),
              (O *= G.y),
              (h += N.x),
              (y += N.y),
              (K = oe(K).frameElement)
          }
        }
        return u({ width: M, height: O, x: h, y })
      }
      function Je(e) {
        return ((xe(e) ? e.ownerDocument : e.document) || window.document).documentElement
      }
      function Ke(e) {
        return ve(e)
          ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
          : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset }
      }
      function to(e) {
        return Xe(Je(e)).left + Ke(e).scrollLeft
      }
      function oo(e) {
        if (le(e) === 'html') return e
        const t = e.assignedSlot || e.parentNode || (ne(e) && e.host) || Je(e)
        return ne(t) ? t.host : t
      }
      function Co(e) {
        const t = oo(e)
        return so(t) ? t.ownerDocument.body : Le(t) && Z(t) ? t : Co(t)
      }
      function lo(e, t) {
        var n
        t === void 0 && (t = [])
        const r = Co(e),
          l = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
          i = oe(r)
        return l ? t.concat(i, i.visualViewport || [], Z(r) ? r : []) : t.concat(r, lo(r))
      }
      function uo(e, t, n) {
        let r
        if (t === 'viewport')
          r = (function (s, d) {
            const S = oe(s),
              b = Je(s),
              A = S.visualViewport
            let h = b.clientWidth,
              y = b.clientHeight,
              M = 0,
              O = 0
            if (A) {
              ;(h = A.width), (y = A.height)
              const z = Ge()
              ;(!z || (z && d === 'fixed')) && ((M = A.offsetLeft), (O = A.offsetTop))
            }
            return { width: h, height: y, x: M, y: O }
          })(e, n)
        else if (t === 'document')
          r = (function (s) {
            const d = Je(s),
              S = Ke(s),
              b = s.ownerDocument.body,
              A = Ae(d.scrollWidth, d.clientWidth, b.scrollWidth, b.clientWidth),
              h = Ae(d.scrollHeight, d.clientHeight, b.scrollHeight, b.clientHeight)
            let y = -S.scrollLeft + to(s)
            const M = -S.scrollTop
            return (
              ke(b).direction === 'rtl' && (y += Ae(d.clientWidth, b.clientWidth) - A),
              { width: A, height: h, x: y, y: M }
            )
          })(Je(e))
        else if (ve(t))
          r = (function (s, d) {
            const S = Xe(s, !0, d === 'fixed'),
              b = S.top + s.clientTop,
              A = S.left + s.clientLeft,
              h = Le(s) ? qe(s) : { x: 1, y: 1 }
            return { width: s.clientWidth * h.x, height: s.clientHeight * h.y, x: A * h.x, y: b * h.y }
          })(t, n)
        else {
          const s = Me({}, t)
          if (Ge()) {
            var l, i
            const d = oe(e)
            ;(s.x -= ((l = d.visualViewport) == null ? void 0 : l.offsetLeft) || 0),
              (s.y -= ((i = d.visualViewport) == null ? void 0 : i.offsetTop) || 0)
          }
          r = s
        }
        return u(r)
      }
      function Ko(e, t) {
        return Le(e) && ke(e).position !== 'fixed' ? (t ? t(e) : e.offsetParent) : null
      }
      function Oo(e, t) {
        const n = oe(e)
        if (!Le(e)) return n
        let r = Ko(e, t)
        for (; r && Ze(r) && ke(r).position === 'static'; ) r = Ko(r, t)
        return r && (le(r) === 'html' || (le(r) === 'body' && ke(r).position === 'static' && !Fe(r)))
          ? n
          : r ||
              (function (l) {
                let i = oo(l)
                for (; Le(i) && !so(i); ) {
                  if (Fe(i)) return i
                  i = oo(i)
                }
                return null
              })(e) ||
              n
      }
      function ro(e, t, n) {
        const r = Le(t),
          l = Je(t),
          i = Xe(e, !0, n === 'fixed', t)
        let s = { scrollLeft: 0, scrollTop: 0 }
        const d = { x: 0, y: 0 }
        if (r || (!r && n !== 'fixed'))
          if (((le(t) !== 'body' || Z(l)) && (s = Ke(t)), Le(t))) {
            const S = Xe(t, !0)
            ;(d.x = S.x + t.clientLeft), (d.y = S.y + t.clientTop)
          } else l && (d.x = to(l))
        return { x: i.left + s.scrollLeft - d.x, y: i.top + s.scrollTop - d.y, width: i.width, height: i.height }
      }
      const _o = {
        getClippingRect: function (e) {
          let { element: t, boundary: n, rootBoundary: r, strategy: l } = e
          const i =
              n === 'clippingAncestors'
                ? (function (b, A) {
                    const h = A.get(b)
                    if (h) return h
                    let y = lo(b).filter((T) => ve(T) && le(T) !== 'body'),
                      M = null
                    const O = ke(b).position === 'fixed'
                    let z = O ? oo(b) : b
                    for (; ve(z) && !so(z); ) {
                      const T = ke(z),
                        K = Fe(z)
                      T.position === 'fixed'
                        ? (M = null)
                        : (
                              O
                                ? K || M
                                : K || T.position !== 'static' || !M || !['absolute', 'fixed'].includes(M.position)
                            )
                          ? (M = T)
                          : (y = y.filter((G) => G !== z)),
                        (z = oo(z))
                    }
                    return A.set(b, y), y
                  })(t, this._c)
                : [].concat(n),
            s = [...i, r],
            d = s[0],
            S = s.reduce(
              (b, A) => {
                const h = uo(t, A, l)
                return (
                  (b.top = Ae(h.top, b.top)),
                  (b.right = he(h.right, b.right)),
                  (b.bottom = he(h.bottom, b.bottom)),
                  (b.left = Ae(h.left, b.left)),
                  b
                )
              },
              uo(t, d, l),
            )
          return { width: S.right - S.left, height: S.bottom - S.top, x: S.left, y: S.top }
        },
        convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
          let { rect: t, offsetParent: n, strategy: r } = e
          const l = Le(n),
            i = Je(n)
          if (n === i) return t
          let s = { scrollLeft: 0, scrollTop: 0 },
            d = { x: 1, y: 1 }
          const S = { x: 0, y: 0 }
          if ((l || (!l && r !== 'fixed')) && ((le(n) !== 'body' || Z(i)) && (s = Ke(n)), Le(n))) {
            const b = Xe(n)
            ;(d = qe(n)), (S.x = b.x + n.clientLeft), (S.y = b.y + n.clientTop)
          }
          return {
            width: t.width * d.x,
            height: t.height * d.y,
            x: t.x * d.x - s.scrollLeft * d.x + S.x,
            y: t.y * d.y - s.scrollTop * d.y + S.y,
          }
        },
        isElement: ve,
        getDimensions: function (e) {
          return Le(e) ? ie(e) : e.getBoundingClientRect()
        },
        getOffsetParent: Oo,
        getDocumentElement: Je,
        getScale: qe,
        getElementRects(e) {
          return mo(this, null, function* () {
            let { reference: t, floating: n, strategy: r } = e
            const l = this.getOffsetParent || Oo,
              i = this.getDimensions
            return { reference: ro(t, yield l(n), r), floating: Me({ x: 0, y: 0 }, yield i(n)) }
          })
        },
        getClientRects: (e) => Array.from(e.getClientRects()),
        isRTL: (e) => ke(e).direction === 'rtl',
      }
      function Eo(e, t, n, r) {
        r === void 0 && (r = {})
        const { ancestorScroll: l = !0, ancestorResize: i = !0, elementResize: s = !0, animationFrame: d = !1 } = r,
          S = l && !d,
          b = S || i ? [...(ve(e) ? lo(e) : e.contextElement ? lo(e.contextElement) : []), ...lo(t)] : []
        b.forEach((M) => {
          S && M.addEventListener('scroll', n, { passive: !0 }), i && M.addEventListener('resize', n)
        })
        let A,
          h = null
        if (s) {
          let M = !0
          ;(h = new ResizeObserver(() => {
            M || n(), (M = !1)
          })),
            ve(e) && !d && h.observe(e),
            ve(e) || !e.contextElement || d || h.observe(e.contextElement),
            h.observe(t)
        }
        let y = d ? Xe(e) : null
        return (
          d &&
            (function M() {
              const O = Xe(e)
              !y || (O.x === y.x && O.y === y.y && O.width === y.width && O.height === y.height) || n(),
                (y = O),
                (A = requestAnimationFrame(M))
            })(),
          n(),
          () => {
            var M
            b.forEach((O) => {
              S && O.removeEventListener('scroll', n), i && O.removeEventListener('resize', n)
            }),
              (M = h) == null || M.disconnect(),
              (h = null),
              d && cancelAnimationFrame(A)
          }
        )
      }
      const Mn = (e, t, n) => {
        const r = new Map(),
          l = Me({ platform: _o }, n),
          i = _e(Me({}, l.platform), { _c: r })
        return g(e, t, _e(Me({}, l), { platform: i }))
      }
      var L = o(57689),
        on = o.t(L, 2),
        co = o(97326)
      const Bn = (e) => {
        const { element: t, padding: n } = e
        function r(l) {
          return Object.prototype.hasOwnProperty.call(l, 'current')
        }
        return {
          name: 'arrow',
          options: e,
          fn(l) {
            return r(t)
              ? t.current != null
                ? arrow$1({ element: t.current, padding: n }).fn(l)
                : {}
              : t
                ? arrow$1({ element: t, padding: n }).fn(l)
                : {}
          },
        }
      }
      var jo = typeof document != 'undefined' ? L.useLayoutEffect : L.useEffect
      function Ve(e, t) {
        if (e === t) return !0
        if (typeof e != typeof t) return !1
        if (typeof e == 'function' && e.toString() === t.toString()) return !0
        let n, r, l
        if (e && t && typeof e == 'object') {
          if (Array.isArray(e)) {
            if (((n = e.length), n != t.length)) return !1
            for (r = n; r-- !== 0; ) if (!Ve(e[r], t[r])) return !1
            return !0
          }
          if (((l = Object.keys(e)), (n = l.length), n !== Object.keys(t).length)) return !1
          for (r = n; r-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(t, l[r])) return !1
          for (r = n; r-- !== 0; ) {
            const i = l[r]
            if (!(i === '_owner' && e.$$typeof) && !Ve(e[i], t[i])) return !1
          }
          return !0
        }
        return e !== e && t !== t
      }
      function ao(e) {
        const t = L.useRef(e)
        return (
          jo(() => {
            t.current = e
          }),
          t
        )
      }
      function Do(e) {
        e === void 0 && (e = {})
        const {
            placement: t = 'bottom',
            strategy: n = 'absolute',
            middleware: r = [],
            platform: l,
            whileElementsMounted: i,
            open: s,
          } = e,
          [d, S] = L.useState({ x: null, y: null, strategy: n, placement: t, middlewareData: {}, isPositioned: !1 }),
          [b, A] = L.useState(r)
        Ve(b, r) || A(r)
        const h = L.useRef(null),
          y = L.useRef(null),
          M = L.useRef(d),
          O = ao(i),
          z = ao(l),
          [T, K] = L.useState(null),
          [G, N] = L.useState(null),
          Y = L.useCallback((ae) => {
            h.current !== ae && ((h.current = ae), K(ae))
          }, []),
          W = L.useCallback((ae) => {
            y.current !== ae && ((y.current = ae), N(ae))
          }, []),
          pe = L.useCallback(() => {
            if (!h.current || !y.current) return
            const ae = { placement: t, strategy: n, middleware: b }
            z.current && (ae.platform = z.current),
              Mn(h.current, y.current, ae).then((R) => {
                const D = _e(Me({}, R), { isPositioned: !0 })
                Oe.current &&
                  !Ve(M.current, D) &&
                  ((M.current = D),
                  co.flushSync(() => {
                    S(D)
                  }))
              })
          }, [b, t, n, z])
        jo(() => {
          s === !1 &&
            M.current.isPositioned &&
            ((M.current.isPositioned = !1), S((ae) => _e(Me({}, ae), { isPositioned: !1 })))
        }, [s])
        const Oe = L.useRef(!1)
        jo(
          () => (
            (Oe.current = !0),
            () => {
              Oe.current = !1
            }
          ),
          [],
        ),
          jo(() => {
            if (T && G) {
              if (O.current) return O.current(T, G, pe)
              pe()
            }
          }, [T, G, pe, O])
        const Re = L.useMemo(() => ({ reference: h, floating: y, setReference: Y, setFloating: W }), [Y, W]),
          de = L.useMemo(() => ({ reference: T, floating: G }), [T, G])
        return L.useMemo(
          () => _e(Me({}, d), { update: pe, refs: Re, elements: de, reference: Y, floating: W }),
          [d, pe, Re, de, Y, W],
        )
      }
      var zo = function (e) {
          if (typeof document == 'undefined') return null
          var t = Array.isArray(e) ? e[0] : e
          return t.ownerDocument.body
        },
        So = new WeakMap(),
        Ho = new WeakMap(),
        nn = {},
        An = 0,
        Wn = function (e) {
          return e && (e.host || Wn(e.parentNode))
        },
        Dt = function (e, t) {
          return t
            .map(function (n) {
              if (e.contains(n)) return n
              var r = Wn(n)
              return r && e.contains(r)
                ? r
                : (console.error('aria-hidden', n, 'in not contained inside', e, '. Doing nothing'), null)
            })
            .filter(function (n) {
              return Boolean(n)
            })
        },
        In = function (e, t, n, r) {
          var l = Dt(t, Array.isArray(e) ? e : [e])
          nn[n] || (nn[n] = new WeakMap())
          var i = nn[n],
            s = [],
            d = new Set(),
            S = new Set(l),
            b = function (h) {
              !h || d.has(h) || (d.add(h), b(h.parentNode))
            }
          l.forEach(b)
          var A = function (h) {
            !h ||
              S.has(h) ||
              Array.prototype.forEach.call(h.children, function (y) {
                if (d.has(y)) A(y)
                else {
                  var M = y.getAttribute(r),
                    O = M !== null && M !== 'false',
                    z = (So.get(y) || 0) + 1,
                    T = (i.get(y) || 0) + 1
                  So.set(y, z),
                    i.set(y, T),
                    s.push(y),
                    z === 1 && O && Ho.set(y, !0),
                    T === 1 && y.setAttribute(n, 'true'),
                    O || y.setAttribute(r, 'true')
                }
              })
          }
          return (
            A(t),
            d.clear(),
            An++,
            function () {
              s.forEach(function (h) {
                var y = So.get(h) - 1,
                  M = i.get(h) - 1
                So.set(h, y),
                  i.set(h, M),
                  y || (Ho.has(h) || h.removeAttribute(r), Ho.delete(h)),
                  M || h.removeAttribute(n)
              }),
                An--,
                An || ((So = new WeakMap()), (So = new WeakMap()), (Ho = new WeakMap()), (nn = {}))
            }
          )
        },
        _n = function (e, t, n) {
          n === void 0 && (n = 'data-aria-hidden')
          var r = Array.from(Array.isArray(e) ? e : [e]),
            l = t || zo(e)
          return l
            ? (r.push.apply(r, Array.from(l.querySelectorAll('[aria-live]'))), In(r, l, n, 'aria-hidden'))
            : function () {
                return null
              }
        },
        Ht = function (e, t, n) {
          n === void 0 && (n = 'data-inert-ed')
          var r = t || zo(e)
          return r
            ? In(e, r, n, 'inert')
            : function () {
                return null
              }
        },
        Pt = function () {
          return typeof HTMLElement != 'undefined' && HTMLElement.prototype.hasOwnProperty('inert')
        },
        Gr = function (e, t, n) {
          return n === void 0 && (n = 'data-suppressed'), (Pt() ? Ht : _n)(e, t, n)
        }
      var Lt = [
          'input:not([inert])',
          'select:not([inert])',
          'textarea:not([inert])',
          'a[href]:not([inert])',
          'button:not([inert])',
          '[tabindex]:not(slot):not([inert])',
          'audio[controls]:not([inert])',
          'video[controls]:not([inert])',
          '[contenteditable]:not([contenteditable="false"]):not([inert])',
          'details>summary:first-of-type:not([inert])',
          'details:not([inert])',
        ],
        tn = Lt.join(','),
        Zn = typeof Element == 'undefined',
        Fo = Zn
          ? function () {}
          : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector,
        rn =
          !Zn && Element.prototype.getRootNode
            ? function (e) {
                var t
                return e == null || (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e)
              }
            : function (e) {
                return e == null ? void 0 : e.ownerDocument
              },
        an = function e(t, n) {
          var r
          n === void 0 && (n = !0)
          var l = t == null || (r = t.getAttribute) === null || r === void 0 ? void 0 : r.call(t, 'inert'),
            i = l === '' || l === 'true',
            s = i || (n && t && e(t.parentNode))
          return s
        },
        jt = function (t) {
          var n,
            r = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, 'contenteditable')
          return r === '' || r === 'true'
        },
        Nn = function (t, n, r) {
          if (an(t)) return []
          var l = Array.prototype.slice.apply(t.querySelectorAll(tn))
          return n && Fo.call(t, tn) && l.unshift(t), (l = l.filter(r)), l
        },
        Un = function e(t, n, r) {
          for (var l = [], i = Array.from(t); i.length; ) {
            var s = i.shift()
            if (!an(s, !1))
              if (s.tagName === 'SLOT') {
                var d = s.assignedElements(),
                  S = d.length ? d : s.children,
                  b = e(S, !0, r)
                r.flatten ? l.push.apply(l, b) : l.push({ scopeParent: s, candidates: b })
              } else {
                var A = Fo.call(s, tn)
                A && r.filter(s) && (n || !t.includes(s)) && l.push(s)
                var h = s.shadowRoot || (typeof r.getShadowRoot == 'function' && r.getShadowRoot(s)),
                  y = !an(h, !1) && (!r.shadowRootFilter || r.shadowRootFilter(s))
                if (h && y) {
                  var M = e(h === !0 ? s.children : h.children, !0, r)
                  r.flatten ? l.push.apply(l, M) : l.push({ scopeParent: s, candidates: M })
                } else i.unshift.apply(i, s.children)
              }
          }
          return l
        },
        Kn = function (t, n) {
          return t.tabIndex < 0 &&
            (n || /^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || jt(t)) &&
            isNaN(parseInt(t.getAttribute('tabindex'), 10))
            ? 0
            : t.tabIndex
        },
        Ft = function (t, n) {
          return t.tabIndex === n.tabIndex ? t.documentOrder - n.documentOrder : t.tabIndex - n.tabIndex
        },
        Vn = function (t) {
          return t.tagName === 'INPUT'
        },
        Bt = function (t) {
          return Vn(t) && t.type === 'hidden'
        },
        Wt = function (t) {
          var n =
            t.tagName === 'DETAILS' &&
            Array.prototype.slice.apply(t.children).some(function (r) {
              return r.tagName === 'SUMMARY'
            })
          return n
        },
        It = function (t, n) {
          for (var r = 0; r < t.length; r++) if (t[r].checked && t[r].form === n) return t[r]
        },
        _t = function (t) {
          if (!t.name) return !0
          var n = t.form || rn(t),
            r = function (d) {
              return n.querySelectorAll('input[type="radio"][name="' + d + '"]')
            },
            l
          if (
            typeof window != 'undefined' &&
            typeof window.CSS != 'undefined' &&
            typeof window.CSS.escape == 'function'
          )
            l = r(window.CSS.escape(t.name))
          else
            try {
              l = r(t.name)
            } catch (s) {
              return (
                console.error(
                  'Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s',
                  s.message,
                ),
                !1
              )
            }
          var i = It(l, t.form)
          return !i || i === t
        },
        Zt = function (t) {
          return Vn(t) && t.type === 'radio'
        },
        Nt = function (t) {
          return Zt(t) && !_t(t)
        },
        Ut = function (t) {
          var n,
            r = t && rn(t),
            l = (n = r) === null || n === void 0 ? void 0 : n.host,
            i = !1
          if (r && r !== t) {
            var s, d, S
            for (
              i = !!(
                ((s = l) !== null && s !== void 0 && (d = s.ownerDocument) !== null && d !== void 0 && d.contains(l)) ||
                (t != null && (S = t.ownerDocument) !== null && S !== void 0 && S.contains(t))
              );
              !i && l;

            ) {
              var b, A, h
              ;(r = rn(l)),
                (l = (b = r) === null || b === void 0 ? void 0 : b.host),
                (i = !!(
                  (A = l) !== null &&
                  A !== void 0 &&
                  (h = A.ownerDocument) !== null &&
                  h !== void 0 &&
                  h.contains(l)
                ))
            }
          }
          return i
        },
        Gn = function (t) {
          var n = t.getBoundingClientRect(),
            r = n.width,
            l = n.height
          return r === 0 && l === 0
        },
        Kt = function (t, n) {
          var r = n.displayCheck,
            l = n.getShadowRoot
          if (getComputedStyle(t).visibility === 'hidden') return !0
          var i = Fo.call(t, 'details>summary:first-of-type'),
            s = i ? t.parentElement : t
          if (Fo.call(s, 'details:not([open]) *')) return !0
          if (!r || r === 'full' || r === 'legacy-full') {
            if (typeof l == 'function') {
              for (var d = t; t; ) {
                var S = t.parentElement,
                  b = rn(t)
                if (S && !S.shadowRoot && l(S) === !0) return Gn(t)
                t.assignedSlot ? (t = t.assignedSlot) : !S && b !== t.ownerDocument ? (t = b.host) : (t = S)
              }
              t = d
            }
            if (Ut(t)) return !t.getClientRects().length
            if (r !== 'legacy-full') return !0
          } else if (r === 'non-zero-area') return Gn(t)
          return !1
        },
        Vt = function (t) {
          if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
            for (var n = t.parentElement; n; ) {
              if (n.tagName === 'FIELDSET' && n.disabled) {
                for (var r = 0; r < n.children.length; r++) {
                  var l = n.children.item(r)
                  if (l.tagName === 'LEGEND') return Fo.call(n, 'fieldset[disabled] *') ? !0 : !l.contains(t)
                }
                return !0
              }
              n = n.parentElement
            }
          return !1
        },
        ln = function (t, n) {
          return !(n.disabled || an(n) || Bt(n) || Kt(n, t) || Wt(n) || Vt(n))
        },
        Cn = function (t, n) {
          return !(Nt(n) || Kn(n) < 0 || !ln(t, n))
        },
        Gt = function (t) {
          var n = parseInt(t.getAttribute('tabindex'), 10)
          return !!(isNaN(n) || n >= 0)
        },
        Yt = function e(t) {
          var n = [],
            r = []
          return (
            t.forEach(function (l, i) {
              var s = !!l.scopeParent,
                d = s ? l.scopeParent : l,
                S = Kn(d, s),
                b = s ? e(l.candidates) : d
              S === 0
                ? s
                  ? n.push.apply(n, b)
                  : n.push(d)
                : r.push({ documentOrder: i, tabIndex: S, item: l, isScope: s, content: b })
            }),
            r
              .sort(Ft)
              .reduce(function (l, i) {
                return i.isScope ? l.push.apply(l, i.content) : l.push(i.content), l
              }, [])
              .concat(n)
          )
        },
        cn = function (t, n) {
          n = n || {}
          var r
          return (
            n.getShadowRoot
              ? (r = Un([t], n.includeContainer, {
                  filter: Cn.bind(null, n),
                  flatten: !1,
                  getShadowRoot: n.getShadowRoot,
                  shadowRootFilter: Gt,
                }))
              : (r = Nn(t, n.includeContainer, Cn.bind(null, n))),
            Yt(r)
          )
        },
        Yr = function (t, n) {
          n = n || {}
          var r
          return (
            n.getShadowRoot
              ? (r = Un([t], n.includeContainer, {
                  filter: ln.bind(null, n),
                  flatten: !0,
                  getShadowRoot: n.getShadowRoot,
                }))
              : (r = Nn(t, n.includeContainer, ln.bind(null, n))),
            r
          )
        },
        Qr = function (t, n) {
          if (((n = n || {}), !t)) throw new Error('No node provided')
          return Fo.call(t, tn) === !1 ? !1 : Cn(n, t)
        },
        Qt = null,
        Xr = function (t, n) {
          if (((n = n || {}), !t)) throw new Error('No node provided')
          return Fo.call(t, Qt) === !1 ? !1 : ln(n, t)
        },
        eo = typeof document != 'undefined' ? L.useLayoutEffect : L.useEffect
      let On = !1,
        Xt = 0
      const Yn = () => 'floating-ui-' + Xt++
      function $t() {
        const [e, t] = L.useState(() => (On ? Yn() : void 0))
        return (
          eo(() => {
            e == null && t(Yn())
          }, []),
          L.useEffect(() => {
            On || (On = !0)
          }, []),
          e
        )
      }
      const sn = on['useId'.toString()] || $t
      function Qn() {
        const e = new Map()
        return {
          emit(t, n) {
            var r
            ;(r = e.get(t)) == null || r.forEach((l) => l(n))
          },
          on(t, n) {
            e.set(t, [...(e.get(t) || []), n])
          },
          off(t, n) {
            e.set(
              t,
              (e.get(t) || []).filter((r) => r !== n),
            )
          },
        }
      }
      const Xn = L.createContext(null),
        $n = L.createContext(null),
        un = () => {
          var e
          return ((e = L.useContext(Xn)) == null ? void 0 : e.id) || null
        },
        Zo = () => L.useContext($n),
        Jr = (e) => {
          const t = sn(),
            n = Zo(),
            r = un(),
            l = e || r
          return (
            eo(() => {
              const i = { id: t, parentId: l }
              return (
                n == null || n.addNode(i),
                () => {
                  n == null || n.removeNode(i)
                }
              )
            }, [n, t, l]),
            t
          )
        },
        qr = (e) => {
          let { children: t, id: n } = e
          const r = un()
          return React.createElement(Xn.Provider, { value: React.useMemo(() => ({ id: n, parentId: r }), [n, r]) }, t)
        },
        ea = (e) => {
          let { children: t } = e
          const n = React.useRef([]),
            r = React.useCallback((s) => {
              n.current = [...n.current, s]
            }, []),
            l = React.useCallback((s) => {
              n.current = n.current.filter((d) => d !== s)
            }, []),
            i = React.useState(() => Qn())[0]
          return React.createElement(
            $n.Provider,
            { value: React.useMemo(() => ({ nodesRef: n, addNode: r, removeNode: l, events: i }), [n, r, l, i]) },
            t,
          )
        }
      function go(e) {
        return (e == null ? void 0 : e.ownerDocument) || document
      }
      function En() {
        const e = navigator.userAgentData
        return e != null && e.platform ? e.platform : navigator.platform
      }
      function Jn() {
        const e = navigator.userAgentData
        return e && Array.isArray(e.brands)
          ? e.brands
              .map((t) => {
                let { brand: n, version: r } = t
                return n + '/' + r
              })
              .join(' ')
          : navigator.userAgent
      }
      function zn(e) {
        return go(e).defaultView || window
      }
      function ko(e) {
        return e ? e instanceof zn(e).Element : !1
      }
      function Bo(e) {
        return e ? e instanceof zn(e).HTMLElement : !1
      }
      function Jt(e) {
        if (typeof ShadowRoot == 'undefined') return !1
        const t = zn(e).ShadowRoot
        return e instanceof t || e instanceof ShadowRoot
      }
      function qn(e) {
        if (e.mozInputSource === 0 && e.isTrusted) return !0
        const t = /Android/i
        return (t.test(En()) || t.test(Jn())) && e.pointerType
          ? e.type === 'click' && e.buttons === 1
          : e.detail === 0 && !e.pointerType
      }
      function et(e) {
        return (
          (e.width === 0 && e.height === 0) ||
          (e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType !== 'mouse') ||
          (e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0)
        )
      }
      function dn() {
        return /apple/i.test(navigator.vendor)
      }
      function ot() {
        return En().toLowerCase().startsWith('mac') && !navigator.maxTouchPoints
      }
      function fn(e, t) {
        const n = ['mouse', 'pen']
        return t || n.push('', void 0), n.includes(e)
      }
      function fo(e, t) {
        if (!e || !t) return !1
        const n = t.getRootNode && t.getRootNode()
        if (e.contains(t)) return !0
        if (n && Jt(n)) {
          let r = t
          do {
            if (r && e === r) return !0
            r = r.parentNode || r.host
          } while (r)
        }
        return !1
      }
      function Vo(e, t) {
        let n =
            e.filter((l) => {
              var i
              return l.parentId === t && ((i = l.context) == null ? void 0 : i.open)
            }) || [],
          r = n
        for (; r.length; )
          (r =
            e.filter((l) => {
              var i
              return (i = r) == null
                ? void 0
                : i.some((s) => {
                    var d
                    return l.parentId === s.id && ((d = l.context) == null ? void 0 : d.open)
                  })
            }) || []),
            (n = n.concat(r))
        return n
      }
      function gn(e) {
        return 'composedPath' in e ? e.composedPath()[0] : e.target
      }
      function qt(e, t) {
        const [n, r] = e
        let l = !1
        const i = t.length
        for (let s = 0, d = i - 1; s < i; d = s++) {
          const [S, b] = t[s] || [0, 0],
            [A, h] = t[d] || [0, 0]
          b >= r != h >= r && n <= ((A - S) * (r - b)) / (h - b) + S && (l = !l)
        }
        return l
      }
      const nt = 'http://www.w3.org/2000/svg'
      function er(e, t, n) {
        var r, l
        const i = dn(),
          s = t.defaultView || window,
          d = t.createElementNS(nt, 'svg')
        Object.assign(d.style, {
          position: 'fixed',
          left: ((i && ((r = s.visualViewport) == null ? void 0 : r.offsetLeft)) || 0) + 'px',
          top: ((i && ((l = s.visualViewport) == null ? void 0 : l.offsetTop)) || 0) + 'px',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2147483647,
        }),
          d.setAttribute('data-type', n ? 'rect' : 'triangle')
        const S = t.createElementNS(nt, 'polygon')
        return (
          S.setAttribute(
            'points',
            e
              .map((b) => {
                let [A, h] = b
                return A + ',' + h
              })
              .join(' '),
          ),
          Object.assign(S.style, { pointerEvents: 'auto', fill: 'transparent', opacity: 0 }),
          d.appendChild(S),
          d
        )
      }
      function Go(e) {
        e.current && (e.current.remove(), (e.current = null))
      }
      function oa(e) {
        let { restMs: t = 0, buffer: n = 0.5, blockPointerEvents: r = !0 } = e === void 0 ? {} : e,
          l,
          i = !1,
          s = !1
        return (S) => {
          let { x: b, y: A, placement: h, elements: y, onClose: M, nodeId: O, tree: z, polygonRef: T } = S
          return function (G) {
            var N
            function Y() {
              Go(T), clearTimeout(l), M()
            }
            if ((clearTimeout(l), !y.domReference || !y.floating || h == null || b == null || A == null)) return
            const { clientX: W, clientY: pe } = G,
              Oe = gn(G),
              Re = G.type === 'mouseleave',
              de = fo(y.domReference, Oe),
              ae = fo(y.floating, Oe)
            if (!Re && de) {
              Go(T)
              return
            }
            if (
              (!Re && (de || (i && fo(T.current, Oe)))) ||
              (Re && ko(G.relatedTarget) && fo(y.floating, G.relatedTarget)) ||
              (z &&
                Vo(z.nodesRef.current, O).some((He) => {
                  let { context: ye } = He
                  return ye == null ? void 0 : ye.open
                }))
            )
              return
            if ((ae && (s = !0), ae && !Re && ((N = T.current) == null ? void 0 : N.dataset.type) !== 'rect')) {
              Go(T)
              return
            }
            const R = y.domReference.getBoundingClientRect(),
              D = y.floating.getBoundingClientRect(),
              ee = h.split('-')[0],
              me = b > D.right - D.width / 2,
              ge = A > D.bottom - D.height / 2
            if (
              (ee === 'top' && A >= R.bottom - 1) ||
              (ee === 'bottom' && A <= R.top + 1) ||
              (ee === 'left' && b >= R.right - 1) ||
              (ee === 'right' && b <= R.left + 1)
            )
              return Y()
            let Ye = []
            switch (ee) {
              case 'top':
                ;(Ye = [
                  [D.left, R.top + 1],
                  [D.left, D.bottom - 1],
                  [D.right, D.bottom - 1],
                  [D.right, R.top + 1],
                ]),
                  (i = W >= D.left && W <= D.right && pe >= D.top && pe <= R.top + 1)
                break
              case 'bottom':
                ;(Ye = [
                  [D.left, D.top + 1],
                  [D.left, R.bottom - 1],
                  [D.right, R.bottom - 1],
                  [D.right, D.top + 1],
                ]),
                  (i = W >= D.left && W <= D.right && pe >= R.bottom - 1 && pe <= D.bottom)
                break
              case 'left':
                ;(Ye = [
                  [D.right - 1, D.bottom],
                  [D.right - 1, D.top],
                  [R.left + 1, D.top],
                  [R.left + 1, D.bottom],
                ]),
                  (i = W >= D.left && W <= R.left + 1 && pe >= D.top && pe <= D.bottom)
                break
              case 'right':
                ;(Ye = [
                  [R.right - 1, D.bottom],
                  [R.right - 1, D.top],
                  [D.left + 1, D.top],
                  [D.left + 1, D.bottom],
                ]),
                  (i = W >= R.right - 1 && W <= D.right && pe >= D.top && pe <= D.bottom)
                break
            }
            function Ue(He) {
              let [ye, De] = He
              const We = D.width > R.width,
                ze = D.height > R.height
              switch (ee) {
                case 'top': {
                  const Ie = [We ? ye + n / 2 : me ? ye + n * 4 : ye - n * 4, De + n + 1],
                    je = [We ? ye - n / 2 : me ? ye + n * 4 : ye - n * 4, De + n + 1],
                    Ne = [
                      [D.left, me || We ? D.bottom - n : D.top],
                      [D.right, me ? (We ? D.bottom - n : D.top) : D.bottom - n],
                    ]
                  return [Ie, je, ...Ne]
                }
                case 'bottom': {
                  const Ie = [We ? ye + n / 2 : me ? ye + n * 4 : ye - n * 4, De - n],
                    je = [We ? ye - n / 2 : me ? ye + n * 4 : ye - n * 4, De - n],
                    Ne = [
                      [D.left, me || We ? D.top + n : D.bottom],
                      [D.right, me ? (We ? D.top + n : D.bottom) : D.top + n],
                    ]
                  return [Ie, je, ...Ne]
                }
                case 'left': {
                  const Ie = [ye + n + 1, ze ? De + n / 2 : ge ? De + n * 4 : De - n * 4],
                    je = [ye + n + 1, ze ? De - n / 2 : ge ? De + n * 4 : De - n * 4]
                  return [
                    ...[
                      [ge || ze ? D.right - n : D.left, D.top],
                      [ge ? (ze ? D.right - n : D.left) : D.right - n, D.bottom],
                    ],
                    Ie,
                    je,
                  ]
                }
                case 'right': {
                  const Ie = [ye - n, ze ? De + n / 2 : ge ? De + n * 4 : De - n * 4],
                    je = [ye - n, ze ? De - n / 2 : ge ? De + n * 4 : De - n * 4],
                    Ne = [
                      [ge || ze ? D.left + n : D.right, D.top],
                      [ge ? (ze ? D.left + n : D.right) : D.left + n, D.bottom],
                    ]
                  return [Ie, je, ...Ne]
                }
              }
            }
            const Se = i ? Ye : Ue([b, A])
            if (!T.current && r && Re) {
              const He = go(y.floating)
              ;(T.current = er(Se, He, i)), He.body.appendChild(T.current)
            }
            i || (qt([W, pe], Se) ? t && !s && (l = setTimeout(M, t)) : Y())
          }
        }
      }
      function yo(e) {
        const t = (0, L.useRef)(e)
        return (
          eo(() => {
            t.current = e
          }),
          t
        )
      }
      function pn(e, t, n) {
        return n && !fn(n) ? 0 : typeof e == 'number' ? e : e == null ? void 0 : e[t]
      }
      const na = function (e, t) {
          let {
            enabled: n = !0,
            delay: r = 0,
            handleClose: l = null,
            mouseOnly: i = !1,
            restMs: s = 0,
            move: d = !0,
          } = t === void 0 ? {} : t
          const {
              open: S,
              onOpenChange: b,
              dataRef: A,
              events: h,
              elements: { domReference: y, floating: M },
            } = e,
            O = Zo(),
            z = yo(l),
            T = yo(r),
            K = React.useRef(),
            G = React.useRef(),
            N = React.useRef(),
            Y = React.useRef(),
            W = React.useRef(!0),
            pe = React.useRef(null),
            Oe = React.useCallback(() => {
              var ae
              const R = (ae = A.current.openEvent) == null ? void 0 : ae.type
              return (R == null ? void 0 : R.includes('mouse')) && R !== 'mousedown'
            }, [A])
          React.useEffect(() => {
            if (!n) return
            function ae() {
              clearTimeout(G.current), clearTimeout(Y.current), (W.current = !0)
            }
            return (
              h.on('dismiss', ae),
              () => {
                h.off('dismiss', ae)
              }
            )
          }, [n, h]),
            React.useEffect(() => {
              if (!n || !z.current || !S) return
              function ae() {
                Oe() && b(!1)
              }
              const R = go(M).documentElement
              return (
                R.addEventListener('mouseleave', ae),
                () => {
                  R.removeEventListener('mouseleave', ae)
                }
              )
            }, [M, S, b, n, z, A, Oe])
          const Re = React.useCallback(
              function (ae) {
                ae === void 0 && (ae = !0)
                const R = pn(T.current, 'close', K.current)
                R && !N.current
                  ? (clearTimeout(G.current), (G.current = setTimeout(() => b(!1), R)))
                  : ae && (clearTimeout(G.current), b(!1))
              },
              [T, b],
            ),
            de = React.useCallback(() => {
              N.current && (go(M).removeEventListener('mousemove', N.current), (N.current = void 0))
            }, [M])
          return (
            React.useEffect(() => {
              if (!n) return
              function ae() {
                return A.current.openEvent ? ['click', 'mousedown'].includes(A.current.openEvent.type) : !1
              }
              function R(me) {
                if (
                  (clearTimeout(G.current),
                  (W.current = !1),
                  (i && !fn(K.current)) || (s > 0 && pn(T.current, 'open') === 0))
                )
                  return
                A.current.openEvent = me
                const ge = pn(T.current, 'open', K.current)
                ge
                  ? (G.current = setTimeout(() => {
                      b(!0)
                    }, ge))
                  : b(!0)
              }
              function D(me) {
                if (ae()) return
                const ge = go(M)
                if ((clearTimeout(Y.current), z.current)) {
                  clearTimeout(G.current),
                    N.current && ge.removeEventListener('mousemove', N.current),
                    (N.current = z.current(
                      _e(Me({}, e), {
                        tree: O,
                        polygonRef: pe,
                        x: me.clientX,
                        y: me.clientY,
                        onClose() {
                          de(), Re()
                        },
                      }),
                    )),
                    ge.addEventListener('mousemove', N.current)
                  return
                }
                Re()
              }
              function ee(me) {
                ae() ||
                  z.current == null ||
                  z.current(
                    _e(Me({}, e), {
                      tree: O,
                      polygonRef: pe,
                      x: me.clientX,
                      y: me.clientY,
                      onClose() {
                        de(), Re()
                      },
                    }),
                  )(me)
              }
              if (ko(y)) {
                const me = y
                return (
                  S && me.addEventListener('mouseleave', ee),
                  M == null || M.addEventListener('mouseleave', ee),
                  d && me.addEventListener('mousemove', R, { once: !0 }),
                  me.addEventListener('mouseenter', R),
                  me.addEventListener('mouseleave', D),
                  () => {
                    S && me.removeEventListener('mouseleave', ee),
                      M == null || M.removeEventListener('mouseleave', ee),
                      d && me.removeEventListener('mousemove', R),
                      me.removeEventListener('mouseenter', R),
                      me.removeEventListener('mouseleave', D)
                  }
                )
              }
            }, [y, M, n, e, i, s, d, Re, de, b, S, O, T, z, A]),
            eo(() => {
              S || ((K.current = void 0), de(), Go(pe))
            }, [S, de]),
            React.useEffect(
              () => () => {
                de(), clearTimeout(G.current), clearTimeout(Y.current), Go(pe)
              },
              [n, de],
            ),
            React.useMemo(() => {
              if (!n) return {}
              function ae(R) {
                K.current = R.pointerType
              }
              return {
                reference: {
                  onPointerDown: ae,
                  onPointerEnter: ae,
                  onMouseMove() {
                    S ||
                      s === 0 ||
                      (clearTimeout(Y.current),
                      (Y.current = setTimeout(() => {
                        W.current || b(!0)
                      }, s)))
                  },
                },
                floating: {
                  onMouseEnter() {
                    clearTimeout(G.current)
                  },
                  onMouseLeave() {
                    h.emit('dismiss', { type: 'mouseLeave', data: { returnFocus: !1 } }), Re(!1)
                  },
                },
              }
            }, [h, n, s, S, b, Re])
          )
        },
        tt = L.createContext({
          delay: 0,
          initialDelay: 0,
          timeoutMs: 0,
          currentId: null,
          setCurrentId: () => {},
          setState: () => {},
        }),
        or = () => React.useContext(tt),
        ta = (e) => {
          let { children: t, delay: n, timeoutMs: r = 0 } = e
          const [l, i] = React.useState({ delay: n, timeoutMs: r, initialDelay: n, currentId: null }),
            s = React.useCallback((d) => {
              i((S) => _e(Me({}, S), { currentId: d }))
            }, [])
          return React.createElement(
            tt.Provider,
            { value: React.useMemo(() => _e(Me({}, l), { setState: i, setCurrentId: s }), [l, i, s]) },
            t,
          )
        },
        ra = (e, t) => {
          let { open: n, onOpenChange: r } = e,
            { id: l } = t
          const { currentId: i, initialDelay: s, setState: d, timeoutMs: S } = or(),
            b = React.useRef()
          React.useEffect(() => {
            i &&
              (clearTimeout(b.current),
              d((A) => _e(Me({}, A), { delay: { open: 1, close: pn(s, 'close') } })),
              i !== l && r(!1))
          }, [l, r, d, i, s]),
            React.useEffect(() => {
              function A() {
                r(!1), d((h) => _e(Me({}, h), { delay: s, currentId: null }))
              }
              clearTimeout(b.current), !n && i === l && (S ? (b.current = window.setTimeout(A, S)) : A())
            }, [n, d, i, l, r, s, S]),
            React.useEffect(
              () => () => {
                clearTimeout(b.current)
              },
              [],
            )
        }
      function Yo() {
        return (
          (Yo =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t]
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
              }
              return e
            }),
          Yo.apply(this, arguments)
        )
      }
      function Wo(e) {
        let t = e.activeElement
        for (; ((n = t) == null || (r = n.shadowRoot) == null ? void 0 : r.activeElement) != null; ) {
          var n, r
          t = t.shadowRoot.activeElement
        }
        return t
      }
      let rt = 0
      function Po(e, t) {
        t === void 0 && (t = {})
        const { preventScroll: n = !1, cancelPrevious: r = !0, sync: l = !1 } = t
        r && cancelAnimationFrame(rt)
        const i = () => (e == null ? void 0 : e.focus({ preventScroll: n }))
        l ? i() : (rt = requestAnimationFrame(i))
      }
      function nr(e, t) {
        var n
        let r = [],
          l = (n = e.find((i) => i.id === t)) == null ? void 0 : n.parentId
        for (; l; ) {
          const i = e.find((s) => s.id === l)
          ;(l = i == null ? void 0 : i.parentId), i && (r = r.concat(i))
        }
        return r
      }
      const tr =
        "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])"
      function at(e) {
        return Bo(e) && e.matches(tr)
      }
      function xo(e) {
        e.preventDefault(), e.stopPropagation()
      }
      const mn = () => ({
        getShadowRoot: !0,
        displayCheck:
          typeof ResizeObserver == 'function' && ResizeObserver.toString().includes('[native code]') ? 'full' : 'none',
      })
      function lt(e, t) {
        const n = cn(e, mn())
        t === 'prev' && n.reverse()
        const r = n.indexOf(Wo(go(e)))
        return n.slice(r + 1)[0]
      }
      function ct() {
        return lt(document.body, 'next')
      }
      function it() {
        return lt(document.body, 'prev')
      }
      function Qo(e, t) {
        const n = t || e.currentTarget,
          r = e.relatedTarget
        return !r || !fo(n, r)
      }
      function rr(e) {
        cn(e, mn()).forEach((n) => {
          ;(n.dataset.tabindex = n.getAttribute('tabindex') || ''), n.setAttribute('tabindex', '-1')
        })
      }
      function ar(e) {
        e.querySelectorAll('[data-tabindex]').forEach((n) => {
          const r = n.dataset.tabindex
          delete n.dataset.tabindex, r ? n.setAttribute('tabindex', r) : n.removeAttribute('tabindex')
        })
      }
      const lr = on['useInsertionEffect'.toString()] || ((e) => e())
      function No(e) {
        const t = L.useRef(() => {})
        return (
          lr(() => {
            t.current = e
          }),
          L.useCallback(function () {
            for (var n = arguments.length, r = new Array(n), l = 0; l < n; l++) r[l] = arguments[l]
            return t.current == null ? void 0 : t.current(...r)
          }, [])
        )
      }
      const Tn = {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: 0,
        position: 'fixed',
        whiteSpace: 'nowrap',
        width: '1px',
        top: 0,
        left: 0,
      }
      let Rn, Dn
      function st(e) {
        e.key === 'Tab' && ((Rn = e.target), clearTimeout(Dn))
      }
      function cr(e) {
        const t = Rn === e.relatedTarget
        return (Rn = e.relatedTarget), clearTimeout(Dn), t
      }
      const bn = L.forwardRef(function (t, n) {
          const r = No(t.onFocus),
            [l, i] = L.useState()
          return (
            eo(
              () => (
                dn() && i('button'),
                document.addEventListener('keydown', st),
                () => {
                  document.removeEventListener('keydown', st)
                }
              ),
              [],
            ),
            L.createElement(
              'span',
              Yo({}, t, {
                ref: n,
                tabIndex: 0,
                role: l,
                'aria-hidden': l ? void 0 : !0,
                'data-floating-ui-focus-guard': '',
                style: Tn,
                onFocus: (s) => {
                  dn() && ot() && !cr(s)
                    ? (s.persist(),
                      (Dn = window.setTimeout(() => {
                        r(s)
                      }, 50)))
                    : r(s)
                },
              }),
            )
          )
        }),
        ut = L.createContext(null),
        ir = function (e) {
          let { id: t, enabled: n = !0 } = e === void 0 ? {} : e
          const [r, l] = L.useState(null),
            i = sn(),
            s = dt()
          return (
            eo(() => {
              if (!n) return
              const d = t ? document.getElementById(t) : null
              if (d) d.setAttribute('data-floating-ui-portal', ''), l(d)
              else {
                const S = document.createElement('div')
                ;(S.id = t || i), S.setAttribute('data-floating-ui-portal', ''), l(S)
                const b = (s == null ? void 0 : s.portalNode) || document.body
                return (
                  b.appendChild(S),
                  () => {
                    b.removeChild(S)
                  }
                )
              }
            }, [t, s, i, n]),
            r
          )
        },
        sr = (e) => {
          let { children: t, id: n, root: r = null, preserveTabOrder: l = !0 } = e
          const i = ir({ id: n, enabled: !r }),
            [s, d] = L.useState(null),
            S = L.useRef(null),
            b = L.useRef(null),
            A = L.useRef(null),
            h = L.useRef(null),
            y = !!s && !s.modal && !!(r || i) && l
          return (
            L.useEffect(() => {
              if (!i || !l || (s != null && s.modal)) return
              function M(O) {
                i && Qo(O) && (O.type === 'focusin' ? ar : rr)(i)
              }
              return (
                i.addEventListener('focusin', M, !0),
                i.addEventListener('focusout', M, !0),
                () => {
                  i.removeEventListener('focusin', M, !0), i.removeEventListener('focusout', M, !0)
                }
              )
            }, [i, l, s == null ? void 0 : s.modal]),
            L.createElement(
              ut.Provider,
              {
                value: L.useMemo(
                  () => ({
                    preserveTabOrder: l,
                    beforeOutsideRef: S,
                    afterOutsideRef: b,
                    beforeInsideRef: A,
                    afterInsideRef: h,
                    portalNode: i,
                    setFocusManagerState: d,
                  }),
                  [l, i],
                ),
              },
              y &&
                i &&
                L.createElement(bn, {
                  ref: S,
                  onFocus: (M) => {
                    if (Qo(M, i)) {
                      var O
                      ;(O = A.current) == null || O.focus()
                    } else {
                      const z = it() || (s == null ? void 0 : s.refs.domReference.current)
                      z == null || z.focus()
                    }
                  },
                }),
              y && i && L.createElement('span', { 'aria-owns': i.id, style: Tn }),
              r ? (0, co.createPortal)(t, r) : i ? (0, co.createPortal)(t, i) : null,
              y &&
                i &&
                L.createElement(bn, {
                  ref: b,
                  onFocus: (M) => {
                    if (Qo(M, i)) {
                      var O
                      ;(O = h.current) == null || O.focus()
                    } else {
                      const z = ct() || (s == null ? void 0 : s.refs.domReference.current)
                      z == null || z.focus(), s != null && s.closeOnFocusOut && (s == null || s.onOpenChange(!1))
                    }
                  },
                }),
            )
          )
        },
        dt = () => L.useContext(ut),
        ur = L.forwardRef(function (t, n) {
          return L.createElement('button', Yo({}, t, { ref: n, tabIndex: -1, style: Tn }))
        })
      function dr(e) {
        let {
          context: t,
          children: n,
          order: r = ['content'],
          guards: l = !0,
          initialFocus: i = 0,
          returnFocus: s = !0,
          modal: d = !0,
          visuallyHiddenDismiss: S = !1,
          closeOnFocusOut: b = !0,
        } = e
        const {
            refs: A,
            nodeId: h,
            onOpenChange: y,
            events: M,
            dataRef: O,
            elements: { domReference: z, floating: T },
          } = t,
          K = yo(r),
          G = Zo(),
          N = dt(),
          [Y, W] = L.useState(null),
          pe = typeof i == 'number' && i < 0,
          Oe = L.useRef(null),
          Re = L.useRef(null),
          de = L.useRef(!1),
          ae = L.useRef(null),
          R = L.useRef(!1),
          D = N != null,
          ee = z && z.getAttribute('role') === 'combobox' && at(z),
          me = L.useCallback(
            function (Se) {
              return Se === void 0 && (Se = T), Se ? cn(Se, mn()) : []
            },
            [T],
          ),
          ge = L.useCallback(
            (Se) => {
              const He = me(Se)
              return K.current
                .map((ye) => (z && ye === 'reference' ? z : T && ye === 'floating' ? T : He))
                .filter(Boolean)
                .flat()
            },
            [z, T, K, me],
          )
        L.useEffect(() => {
          if (!d) return
          function Se(ye) {
            if (ye.key === 'Tab') {
              me().length === 0 && !ee && xo(ye)
              const De = ge(),
                We = gn(ye)
              K.current[0] === 'reference' && We === z && (xo(ye), ye.shiftKey ? Po(De[De.length - 1]) : Po(De[1])),
                K.current[1] === 'floating' && We === T && ye.shiftKey && (xo(ye), Po(De[0]))
            }
          }
          const He = go(T)
          return (
            He.addEventListener('keydown', Se),
            () => {
              He.removeEventListener('keydown', Se)
            }
          )
        }, [z, T, d, K, A, ee, me, ge]),
          L.useEffect(() => {
            if (!b) return
            function Se() {
              ;(R.current = !0),
                setTimeout(() => {
                  R.current = !1
                })
            }
            function He(ye) {
              const De = ye.relatedTarget,
                We = !(
                  fo(z, De) ||
                  fo(T, De) ||
                  fo(De, T) ||
                  fo(N == null ? void 0 : N.portalNode, De) ||
                  (De != null && De.hasAttribute('data-floating-ui-focus-guard')) ||
                  (G &&
                    (Vo(G.nodesRef.current, h).find((ze) => {
                      var Ie, je
                      return (
                        fo((Ie = ze.context) == null ? void 0 : Ie.elements.floating, De) ||
                        fo((je = ze.context) == null ? void 0 : je.elements.domReference, De)
                      )
                    }) ||
                      nr(G.nodesRef.current, h).find((ze) => {
                        var Ie, je
                        return (
                          ((Ie = ze.context) == null ? void 0 : Ie.elements.floating) === De ||
                          ((je = ze.context) == null ? void 0 : je.elements.domReference) === De
                        )
                      })))
                )
              De && We && !R.current && De !== ae.current && ((de.current = !0), setTimeout(() => y(!1)))
            }
            if (T && Bo(z))
              return (
                z.addEventListener('focusout', He),
                z.addEventListener('pointerdown', Se),
                !d && T.addEventListener('focusout', He),
                () => {
                  z.removeEventListener('focusout', He),
                    z.removeEventListener('pointerdown', Se),
                    !d && T.removeEventListener('focusout', He)
                }
              )
          }, [z, T, d, h, G, N, y, b]),
          L.useEffect(() => {
            var Se
            const He = Array.from(
              (N == null || (Se = N.portalNode) == null ? void 0 : Se.querySelectorAll('[data-floating-ui-portal]')) ||
                [],
            )
            function ye() {
              return [Oe.current, Re.current].filter(Boolean)
            }
            if (T && d) {
              const De = [T, ...He, ...ye()],
                We = _n(K.current.includes('reference') || ee ? De.concat(z || []) : De)
              return () => {
                We()
              }
            }
          }, [z, T, d, K, N, ee]),
          L.useEffect(() => {
            if (d && !l && T) {
              const Se = [],
                He = mn(),
                ye = cn(go(T).body, He),
                De = ge(),
                We = ye.filter((ze) => !De.includes(ze))
              return (
                We.forEach((ze, Ie) => {
                  ;(Se[Ie] = ze.getAttribute('tabindex')), ze.setAttribute('tabindex', '-1')
                }),
                () => {
                  We.forEach((ze, Ie) => {
                    const je = Se[Ie]
                    je == null ? ze.removeAttribute('tabindex') : ze.setAttribute('tabindex', je)
                  })
                }
              )
            }
          }, [T, d, l, ge]),
          eo(() => {
            if (!T) return
            const Se = go(T)
            let He = s,
              ye = !1
            const De = Wo(Se),
              We = O.current
            ae.current = De
            const ze = ge(T),
              Ie = (typeof i == 'number' ? ze[i] : i.current) || T
            !pe && Po(Ie, { preventScroll: Ie === T })
            function je(Ne) {
              if (
                (Ne.type === 'escapeKey' && A.domReference.current && (ae.current = A.domReference.current),
                ['referencePress', 'escapeKey'].includes(Ne.type))
              )
                return
              const bo = Ne.data.returnFocus
              typeof bo == 'object' ? ((He = !0), (ye = bo.preventScroll)) : (He = bo)
            }
            return (
              M.on('dismiss', je),
              () => {
                if (
                  (M.off('dismiss', je),
                  fo(T, Wo(Se)) && A.domReference.current && (ae.current = A.domReference.current),
                  He && Bo(ae.current) && !de.current)
                )
                  if (!A.domReference.current || R.current) Po(ae.current, { cancelPrevious: !1, preventScroll: ye })
                  else {
                    var Ne
                    ;(We.__syncReturnFocus = !0),
                      (Ne = ae.current) == null || Ne.focus({ preventScroll: ye }),
                      setTimeout(() => {
                        delete We.__syncReturnFocus
                      })
                  }
              }
            )
          }, [T, ge, i, s, O, A, M, pe]),
          eo(() => {
            if (N)
              return (
                N.setFocusManagerState(_e(Me({}, t), { modal: d, closeOnFocusOut: b })),
                () => {
                  N.setFocusManagerState(null)
                }
              )
          }, [N, d, b, t]),
          eo(() => {
            if (pe || !T) return
            function Se() {
              W(me().length)
            }
            if ((Se(), typeof MutationObserver == 'function')) {
              const He = new MutationObserver(Se)
              return (
                He.observe(T, { childList: !0, subtree: !0 }),
                () => {
                  He.disconnect()
                }
              )
            }
          }, [T, me, pe, A])
        const Ye = l && (D || d) && !ee
        function Ue(Se) {
          return S && d
            ? L.createElement(
                ur,
                { ref: Se === 'start' ? Oe : Re, onClick: () => y(!1) },
                typeof S == 'string' ? S : 'Dismiss',
              )
            : null
        }
        return L.createElement(
          L.Fragment,
          null,
          Ye &&
            L.createElement(bn, {
              ref: N == null ? void 0 : N.beforeInsideRef,
              onFocus: (Se) => {
                if (d) {
                  const ye = ge()
                  Po(r[0] === 'reference' ? ye[0] : ye[ye.length - 1])
                } else if (N != null && N.preserveTabOrder && N.portalNode)
                  if (((de.current = !1), Qo(Se, N.portalNode))) {
                    const ye = ct() || z
                    ye == null || ye.focus()
                  } else {
                    var He
                    ;(He = N.beforeOutsideRef.current) == null || He.focus()
                  }
              },
            }),
          ee ? null : Ue('start'),
          L.cloneElement(n, Y === 0 || r.includes('floating') ? { tabIndex: 0 } : {}),
          Ue('end'),
          Ye &&
            L.createElement(bn, {
              ref: N == null ? void 0 : N.afterInsideRef,
              onFocus: (Se) => {
                if (d) Po(ge()[0])
                else if (N != null && N.preserveTabOrder && N.portalNode)
                  if (((de.current = !0), Qo(Se, N.portalNode))) {
                    const ye = it() || z
                    ye == null || ye.focus()
                  } else {
                    var He
                    ;(He = N.afterOutsideRef.current) == null || He.focus()
                  }
              },
            }),
        )
      }
      const hn = 'data-floating-ui-scroll-lock',
        fr = L.forwardRef(function (t, n) {
          let i = t,
            { lockScroll: r = !1 } = i,
            l = Lo(i, ['lockScroll'])
          return (
            eo(() => {
              var s, d
              if (!r || document.body.hasAttribute(hn)) return
              document.body.setAttribute(hn, '')
              const A =
                  Math.round(document.documentElement.getBoundingClientRect().left) +
                  document.documentElement.scrollLeft
                    ? 'paddingLeft'
                    : 'paddingRight',
                h = window.innerWidth - document.documentElement.clientWidth
              if (!/iP(hone|ad|od)|iOS/.test(En()))
                return (
                  Object.assign(document.body.style, { overflow: 'hidden', [A]: h + 'px' }),
                  () => {
                    document.body.removeAttribute(hn), Object.assign(document.body.style, { overflow: '', [A]: '' })
                  }
                )
              const y = ((s = window.visualViewport) == null ? void 0 : s.offsetLeft) || 0,
                M = ((d = window.visualViewport) == null ? void 0 : d.offsetTop) || 0,
                O = window.pageXOffset,
                z = window.pageYOffset
              return (
                Object.assign(document.body.style, {
                  position: 'fixed',
                  overflow: 'hidden',
                  top: -(z - Math.floor(M)) + 'px',
                  left: -(O - Math.floor(y)) + 'px',
                  right: '0',
                  [A]: h + 'px',
                }),
                () => {
                  Object.assign(document.body.style, {
                    position: '',
                    overflow: '',
                    top: '',
                    left: '',
                    right: '',
                    [A]: '',
                  }),
                    document.body.removeAttribute(hn),
                    window.scrollTo(O, z)
                }
              )
            }, [r]),
            L.createElement(
              'div',
              Yo({ ref: n }, l, {
                style: Me({ position: 'fixed', overflow: 'auto', top: 0, right: 0, bottom: 0, left: 0 }, l.style),
              }),
            )
          )
        })
      function ft(e) {
        return Bo(e.target) && e.target.tagName === 'BUTTON'
      }
      function gt(e) {
        return at(e)
      }
      const gr = function (e, t) {
        let { open: n, onOpenChange: r, dataRef: l, refs: i } = e,
          {
            enabled: s = !0,
            event: d = 'click',
            toggle: S = !0,
            ignoreMouse: b = !1,
            keyboardHandlers: A = !0,
          } = t === void 0 ? {} : t
        const h = L.useRef()
        return L.useMemo(
          () =>
            s
              ? {
                  reference: {
                    onPointerDown(y) {
                      h.current = y.pointerType
                    },
                    onMouseDown(y) {
                      y.button === 0 &&
                        ((fn(h.current, !0) && b) ||
                          (d !== 'click' &&
                            (n
                              ? S && (!l.current.openEvent || l.current.openEvent.type === 'mousedown') && r(!1)
                              : (y.preventDefault(), r(!0)),
                            (l.current.openEvent = y.nativeEvent))))
                    },
                    onClick(y) {
                      if (!l.current.__syncReturnFocus) {
                        if (d === 'mousedown' && h.current) {
                          h.current = void 0
                          return
                        }
                        ;(fn(h.current, !0) && b) ||
                          (n ? S && (!l.current.openEvent || l.current.openEvent.type === 'click') && r(!1) : r(!0),
                          (l.current.openEvent = y.nativeEvent))
                      }
                    },
                    onKeyDown(y) {
                      ;(h.current = void 0),
                        A &&
                          (ft(y) ||
                            (y.key === ' ' && !gt(i.domReference.current) && y.preventDefault(),
                            y.key === 'Enter' && (n ? S && r(!1) : r(!0))))
                    },
                    onKeyUp(y) {
                      A && (ft(y) || gt(i.domReference.current) || (y.key === ' ' && (n ? S && r(!1) : r(!0))))
                    },
                  },
                }
              : {},
          [s, l, d, b, A, i, S, n, r],
        )
      }
      function vn(e, t) {
        if (t == null) return !1
        if ('composedPath' in e) return e.composedPath().includes(t)
        const n = e
        return n.target != null && t.contains(n.target)
      }
      const pr = { pointerdown: 'onPointerDown', mousedown: 'onMouseDown', click: 'onClick' },
        mr = { pointerdown: 'onPointerDownCapture', mousedown: 'onMouseDownCapture', click: 'onClickCapture' },
        br = function (e) {
          var t, n
          return (
            e === void 0 && (e = !0),
            {
              escapeKeyBubbles: typeof e == 'boolean' ? e : (t = e.escapeKey) != null ? t : !0,
              outsidePressBubbles: typeof e == 'boolean' ? e : (n = e.outsidePress) != null ? n : !0,
            }
          )
        },
        hr = function (e, t) {
          let {
              open: n,
              onOpenChange: r,
              events: l,
              nodeId: i,
              elements: { reference: s, domReference: d, floating: S },
            } = e,
            {
              enabled: b = !0,
              escapeKey: A = !0,
              outsidePress: h = !0,
              outsidePressEvent: y = 'pointerdown',
              referencePress: M = !1,
              referencePressEvent: O = 'pointerdown',
              ancestorScroll: z = !1,
              bubbles: T = !0,
            } = t === void 0 ? {} : t
          const K = Zo(),
            G = un() != null,
            N = No(typeof h == 'function' ? h : () => !1),
            Y = typeof h == 'function' ? N : h,
            W = L.useRef(!1),
            { escapeKeyBubbles: pe, outsidePressBubbles: Oe } = br(T)
          return (
            L.useEffect(() => {
              if (!n || !b) return
              function Re(ee) {
                if (ee.key === 'Escape') {
                  if (!pe && K && Vo(K.nodesRef.current, i).length > 0) return
                  l.emit('dismiss', { type: 'escapeKey', data: { returnFocus: { preventScroll: !1 } } }), r(!1)
                }
              }
              function de(ee) {
                const me = W.current
                if (((W.current = !1), me || (typeof Y == 'function' && !Y(ee)))) return
                const ge = gn(ee)
                if (Bo(ge) && S) {
                  const Ue = S.ownerDocument.defaultView || window,
                    Se = ge.scrollWidth > ge.clientWidth,
                    He = ge.scrollHeight > ge.clientHeight
                  let ye = He && ee.offsetX > ge.clientWidth
                  if (
                    (He &&
                      Ue.getComputedStyle(ge).direction === 'rtl' &&
                      (ye = ee.offsetX <= ge.offsetWidth - ge.clientWidth),
                    ye || (Se && ee.offsetY > ge.clientHeight))
                  )
                    return
                }
                const Ye =
                  K &&
                  Vo(K.nodesRef.current, i).some((Ue) => {
                    var Se
                    return vn(ee, (Se = Ue.context) == null ? void 0 : Se.elements.floating)
                  })
                vn(ee, S) ||
                  vn(ee, d) ||
                  Ye ||
                  (!Oe && K && Vo(K.nodesRef.current, i).length > 0) ||
                  (l.emit('dismiss', {
                    type: 'outsidePress',
                    data: { returnFocus: G ? { preventScroll: !0 } : qn(ee) || et(ee) },
                  }),
                  r(!1))
              }
              function ae() {
                r(!1)
              }
              const R = go(S)
              A && R.addEventListener('keydown', Re), Y && R.addEventListener(y, de)
              let D = []
              return (
                z &&
                  (ko(d) && (D = lo(d)),
                  ko(S) && (D = D.concat(lo(S))),
                  !ko(s) && s && s.contextElement && (D = D.concat(lo(s.contextElement)))),
                (D = D.filter((ee) => {
                  var me
                  return ee !== ((me = R.defaultView) == null ? void 0 : me.visualViewport)
                })),
                D.forEach((ee) => {
                  ee.addEventListener('scroll', ae, { passive: !0 })
                }),
                () => {
                  A && R.removeEventListener('keydown', Re),
                    Y && R.removeEventListener(y, de),
                    D.forEach((ee) => {
                      ee.removeEventListener('scroll', ae)
                    })
                }
              )
            }, [S, d, s, A, Y, y, l, K, i, n, r, z, b, pe, Oe, G]),
            L.useEffect(() => {
              W.current = !1
            }, [Y, y]),
            L.useMemo(
              () =>
                b
                  ? {
                      reference: {
                        [pr[O]]: () => {
                          M && (l.emit('dismiss', { type: 'referencePress', data: { returnFocus: !1 } }), r(!1))
                        },
                      },
                      floating: {
                        [mr[y]]: () => {
                          W.current = !0
                        },
                      },
                    }
                  : {},
              [b, l, M, y, O, r],
            )
          )
        },
        la = function (e, t) {
          let {
              open: n,
              onOpenChange: r,
              dataRef: l,
              events: i,
              elements: { domReference: s, floating: d },
            } = e,
            { enabled: S = !0, keyboardOnly: b = !0 } = t === void 0 ? {} : t
          const A = React.useRef(''),
            h = React.useRef(!1),
            y = React.useRef()
          return (
            React.useEffect(() => {
              if (!S) return
              const O = go(d).defaultView || window
              function z() {
                !n && Bo(s) && s === Wo(go(s)) && (h.current = !0)
              }
              return (
                O.addEventListener('blur', z),
                () => {
                  O.removeEventListener('blur', z)
                }
              )
            }, [d, s, n, S]),
            React.useEffect(() => {
              if (!S) return
              function M(O) {
                ;(O.type === 'referencePress' || O.type === 'escapeKey') && (h.current = !0)
              }
              return (
                i.on('dismiss', M),
                () => {
                  i.off('dismiss', M)
                }
              )
            }, [i, S]),
            React.useEffect(
              () => () => {
                clearTimeout(y.current)
              },
              [],
            ),
            React.useMemo(
              () =>
                S
                  ? {
                      reference: {
                        onPointerDown(M) {
                          let { pointerType: O } = M
                          ;(A.current = O), (h.current = !!(O && b))
                        },
                        onMouseLeave() {
                          h.current = !1
                        },
                        onFocus(M) {
                          var O
                          h.current ||
                            (M.type === 'focus' &&
                              ((O = l.current.openEvent) == null ? void 0 : O.type) === 'mousedown' &&
                              l.current.openEvent &&
                              vn(l.current.openEvent, s)) ||
                            ((l.current.openEvent = M.nativeEvent), r(!0))
                        },
                        onBlur(M) {
                          h.current = !1
                          const O = M.relatedTarget,
                            z = ko(O) && O.hasAttribute('data-floating-ui-focus-guard')
                          y.current = setTimeout(() => {
                            fo(d, O) || fo(s, O) || z || r(!1)
                          })
                        },
                      },
                    }
                  : {},
              [S, b, s, d, l, r],
            )
          )
        }
      let pt = !1
      const Hn = 'ArrowUp',
        yn = 'ArrowDown',
        Uo = 'ArrowLeft',
        Xo = 'ArrowRight'
      function xn(e, t, n) {
        return Math.floor(e / t) !== n
      }
      function $o(e, t) {
        return t < 0 || t >= e.current.length
      }
      function io(e, t) {
        let { startingIndex: n = -1, decrement: r = !1, disabledIndices: l, amount: i = 1 } = t === void 0 ? {} : t
        const s = e.current
        let d = n
        do {
          var S, b
          d = d + (r ? -i : i)
        } while (
          d >= 0 &&
          d <= s.length - 1 &&
          (l
            ? l.includes(d)
            : s[d] == null ||
              ((S = s[d]) != null && S.hasAttribute('disabled')) ||
              ((b = s[d]) == null ? void 0 : b.getAttribute('aria-disabled')) === 'true')
        )
        return d
      }
      function kn(e, t, n) {
        switch (e) {
          case 'vertical':
            return t
          case 'horizontal':
            return n
          default:
            return t || n
        }
      }
      function mt(e, t) {
        return kn(t, e === Hn || e === yn, e === Uo || e === Xo)
      }
      function Pn(e, t, n) {
        return kn(t, e === yn, n ? e === Uo : e === Xo) || e === 'Enter' || e == ' ' || e === ''
      }
      function vr(e, t, n) {
        return kn(t, n ? e === Uo : e === Xo, e === yn)
      }
      function yr(e, t, n) {
        return kn(t, n ? e === Xo : e === Uo, e === Hn)
      }
      function Ln(e, t) {
        return io(e, { disabledIndices: t })
      }
      function bt(e, t) {
        return io(e, { decrement: !0, startingIndex: e.current.length, disabledIndices: t })
      }
      const xr = function (e, t) {
        let {
            open: n,
            onOpenChange: r,
            elements: { domReference: l, floating: i },
          } = e,
          {
            listRef: s,
            activeIndex: d,
            onNavigate: S = () => {},
            enabled: b = !0,
            selectedIndex: A = null,
            allowEscape: h = !1,
            loop: y = !1,
            nested: M = !1,
            rtl: O = !1,
            virtual: z = !1,
            focusItemOnOpen: T = 'auto',
            focusItemOnHover: K = !0,
            openOnArrowKeyDown: G = !0,
            disabledIndices: N = void 0,
            orientation: Y = 'vertical',
            cols: W = 1,
            scrollItemIntoView: pe = !0,
          } = t === void 0 ? { listRef: { current: [] }, activeIndex: null, onNavigate: () => {} } : t
        const Oe = un(),
          Re = Zo(),
          de = No(S),
          ae = L.useRef(T),
          R = L.useRef(A != null ? A : -1),
          D = L.useRef(null),
          ee = L.useRef(!0),
          me = L.useRef(de),
          ge = L.useRef(n),
          Ye = L.useRef(!1),
          Ue = yo(N),
          Se = yo(n),
          He = yo(pe),
          [ye, De] = L.useState(),
          We = L.useCallback(
            function (ze, Ie, je) {
              je === void 0 && (je = !1)
              const Ne = ze.current[Ie.current]
              z
                ? De(Ne == null ? void 0 : Ne.id)
                : Po(Ne, { preventScroll: !0, sync: ot() && dn() ? pt || Ye.current : !1 }),
                requestAnimationFrame(() => {
                  const bo = He.current
                  bo &&
                    Ne &&
                    (je ? !0 : !ee.current) &&
                    (Ne.scrollIntoView == null ||
                      Ne.scrollIntoView(typeof bo == 'boolean' ? { block: 'nearest', inline: 'nearest' } : bo))
                })
            },
            [z, He],
          )
        return (
          eo(() => {
            document.createElement('div').focus({
              get preventScroll() {
                return (pt = !0), !1
              },
            })
          }, []),
          eo(() => {
            b && (n ? ae.current && A != null && de(A) : ge.current && ((R.current = -1), me.current(null)))
          }, [b, n, A, de]),
          eo(() => {
            if (b && n)
              if (d == null) {
                if (((Ye.current = !1), A != null)) return
                ge.current && ((R.current = -1), We(s, R)),
                  !ge.current &&
                    ae.current &&
                    (D.current != null || (ae.current === !0 && D.current == null)) &&
                    ((R.current =
                      D.current == null || Pn(D.current, Y, O) || M ? Ln(s, Ue.current) : bt(s, Ue.current)),
                    de(R.current))
              } else $o(s, d) || ((R.current = d), We(s, R, d === A))
          }, [b, n, d, A, M, s, Y, O, de, We, Ue]),
          eo(() => {
            if (b && ge.current && !n) {
              var ze, Ie
              const je =
                Re == null || (ze = Re.nodesRef.current.find((Ne) => Ne.id === Oe)) == null || (Ie = ze.context) == null
                  ? void 0
                  : Ie.elements.floating
              je && !fo(je, Wo(go(je))) && je.focus({ preventScroll: !0 })
            }
          }, [b, n, Re, Oe]),
          eo(() => {
            ;(D.current = null), (me.current = de), (ge.current = n)
          }),
          L.useMemo(() => {
            if (!b) return {}
            const ze = Ue.current
            function Ie(Pe) {
              if (((ee.current = !1), (Ye.current = !0), !Se.current && Pe.currentTarget === i)) return
              if (M && yr(Pe.key, Y, O)) {
                xo(Pe), r(!1), Bo(l) && l.focus()
                return
              }
              const Qe = R.current,
                wo = Ln(s, ze),
                po = bt(s, ze)
              if (
                (Pe.key === 'Home' && ((R.current = wo), de(R.current)),
                Pe.key === 'End' && ((R.current = po), de(R.current)),
                W > 1)
              ) {
                const Be = R.current
                if (Pe.key === Hn) {
                  if ((xo(Pe), Be === -1)) R.current = po
                  else if (
                    ((R.current = io(s, { startingIndex: Be, amount: W, decrement: !0, disabledIndices: ze })),
                    y && (Be - W < wo || R.current < 0))
                  ) {
                    const ho = Be % W,
                      To = po % W,
                      wn = po - (To - ho)
                    To === ho ? (R.current = po) : (R.current = To > ho ? wn : wn - W)
                  }
                  $o(s, R.current) && (R.current = Be), de(R.current)
                }
                if (
                  (Pe.key === yn &&
                    (xo(Pe),
                    Be === -1
                      ? (R.current = wo)
                      : ((R.current = io(s, { startingIndex: Be, amount: W, disabledIndices: ze })),
                        y &&
                          Be + W > po &&
                          (R.current = io(s, { startingIndex: (Be % W) - W, amount: W, disabledIndices: ze }))),
                    $o(s, R.current) && (R.current = Be),
                    de(R.current)),
                  Y === 'both')
                ) {
                  const ho = Math.floor(Be / W)
                  Pe.key === Xo &&
                    (xo(Pe),
                    Be % W !== W - 1
                      ? ((R.current = io(s, { startingIndex: Be, disabledIndices: ze })),
                        y &&
                          xn(R.current, W, ho) &&
                          (R.current = io(s, { startingIndex: Be - (Be % W) - 1, disabledIndices: ze })))
                      : y && (R.current = io(s, { startingIndex: Be - (Be % W) - 1, disabledIndices: ze })),
                    xn(R.current, W, ho) && (R.current = Be)),
                    Pe.key === Uo &&
                      (xo(Pe),
                      Be % W !== 0
                        ? ((R.current = io(s, { startingIndex: Be, disabledIndices: ze, decrement: !0 })),
                          y &&
                            xn(R.current, W, ho) &&
                            (R.current = io(s, {
                              startingIndex: Be + (W - (Be % W)),
                              decrement: !0,
                              disabledIndices: ze,
                            })))
                        : y &&
                          (R.current = io(s, {
                            startingIndex: Be + (W - (Be % W)),
                            decrement: !0,
                            disabledIndices: ze,
                          })),
                      xn(R.current, W, ho) && (R.current = Be))
                  const To = Math.floor(po / W) === ho
                  $o(s, R.current) &&
                    (y && To
                      ? (R.current =
                          Pe.key === Uo ? po : io(s, { startingIndex: Be - (Be % W) - 1, disabledIndices: ze }))
                      : (R.current = Be)),
                    de(R.current)
                  return
                }
              }
              if (mt(Pe.key, Y)) {
                if ((xo(Pe), n && !z && Wo(Pe.currentTarget.ownerDocument) === Pe.currentTarget)) {
                  ;(R.current = Pn(Pe.key, Y, O) ? wo : po), de(R.current)
                  return
                }
                Pn(Pe.key, Y, O)
                  ? y
                    ? (R.current =
                        Qe >= po
                          ? h && Qe !== s.current.length
                            ? -1
                            : wo
                          : io(s, { startingIndex: Qe, disabledIndices: ze }))
                    : (R.current = Math.min(po, io(s, { startingIndex: Qe, disabledIndices: ze })))
                  : y
                    ? (R.current =
                        Qe <= wo
                          ? h && Qe !== -1
                            ? s.current.length
                            : po
                          : io(s, { startingIndex: Qe, decrement: !0, disabledIndices: ze }))
                    : (R.current = Math.max(wo, io(s, { startingIndex: Qe, decrement: !0, disabledIndices: ze }))),
                  $o(s, R.current) ? de(null) : de(R.current)
              }
            }
            function je(Pe) {
              T === 'auto' && qn(Pe.nativeEvent) && (ae.current = !0)
            }
            function Ne(Pe) {
              ;(ae.current = T), T === 'auto' && et(Pe.nativeEvent) && (ae.current = !0)
            }
            function bo(Pe) {
              const Qe = s.current.indexOf(Pe)
              Qe !== -1 && d !== Qe && de(Qe)
            }
            return {
              reference: _e(Me({}, z && n && d != null && { 'aria-activedescendant': ye }), {
                onKeyDown(Pe) {
                  ee.current = !1
                  const Qe = Pe.key.indexOf('Arrow') === 0
                  if (z && n) return Ie(Pe)
                  if (!n && !G && Qe) return
                  if (((Qe || Pe.key === 'Enter' || Pe.key === ' ' || Pe.key === '') && (D.current = Pe.key), M)) {
                    vr(Pe.key, Y, O) && (xo(Pe), n ? ((R.current = Ln(s, ze)), de(R.current)) : r(!0))
                    return
                  }
                  mt(Pe.key, Y) && (A != null && (R.current = A), xo(Pe), !n && G ? r(!0) : Ie(Pe), n && de(R.current))
                },
                onFocus() {
                  n && de(null)
                },
                onPointerDown: Ne,
                onMouseDown: je,
                onClick: je,
              }),
              floating: _e(
                Me(
                  { 'aria-orientation': Y === 'both' ? void 0 : Y },
                  z && d != null && { 'aria-activedescendant': ye },
                ),
                {
                  onKeyDown: Ie,
                  onPointerMove() {
                    ee.current = !0
                  },
                },
              ),
              item: Me(
                {
                  onFocus(Pe) {
                    let { currentTarget: Qe } = Pe
                    bo(Qe)
                  },
                  onClick: (Pe) => {
                    let { currentTarget: Qe } = Pe
                    return Qe.focus({ preventScroll: !0 })
                  },
                },
                K && {
                  onMouseMove(Pe) {
                    let { currentTarget: Qe } = Pe
                    bo(Qe)
                  },
                  onPointerLeave() {
                    ee.current &&
                      ((R.current = -1),
                      We(s, R),
                      (0, co.flushSync)(() => de(null)),
                      z || i == null || i.focus({ preventScroll: !0 }))
                  },
                },
              ),
            }
          }, [l, i, ye, Ue, Se, s, b, Y, O, z, n, d, M, A, G, K, h, W, y, T, We, de, r])
        )
      }
      function ca(e) {
        return React.useMemo(
          () =>
            e.every((t) => t == null)
              ? null
              : (t) => {
                  e.forEach((n) => {
                    typeof n == 'function' ? n(t) : n != null && (n.current = t)
                  })
                },
          e,
        )
      }
      const kr = function (e, t) {
          let { open: n } = e,
            { enabled: r = !0, role: l = 'dialog' } = t === void 0 ? {} : t
          const i = sn(),
            s = sn()
          return L.useMemo(() => {
            const d = { id: i, role: l }
            return r
              ? l === 'tooltip'
                ? { reference: { 'aria-describedby': n ? i : void 0 }, floating: d }
                : {
                    reference: Me(
                      Me(
                        {
                          'aria-expanded': n ? 'true' : 'false',
                          'aria-haspopup': l === 'alertdialog' ? 'dialog' : l,
                          'aria-controls': n ? i : void 0,
                        },
                        l === 'listbox' && { role: 'combobox' },
                      ),
                      l === 'menu' && { id: s },
                    ),
                    floating: Me(Me({}, d), l === 'menu' && { 'aria-labelledby': s }),
                  }
              : {}
          }, [r, l, n, i, s])
        },
        ht = (e) => e.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (t, n) => (n ? '-' : '') + t.toLowerCase())
      function wr(e, t) {
        const [n, r] = React.useState(e)
        return (
          e && !n && r(!0),
          React.useEffect(() => {
            if (!e) {
              const l = setTimeout(() => r(!1), t)
              return () => clearTimeout(l)
            }
          }, [e, t]),
          n
        )
      }
      function Sr(e, t) {
        let {
            open: n,
            elements: { floating: r },
          } = e,
          { duration: l = 250 } = t === void 0 ? {} : t
        const s = (typeof l == 'number' ? l : l.close) || 0,
          [d, S] = React.useState(!1),
          [b, A] = React.useState('unmounted'),
          h = wr(n, s)
        return (
          d && !h && b !== 'unmounted' && A('unmounted'),
          eo(() => {
            if (r)
              if (n) {
                A('initial')
                const y = requestAnimationFrame(() => {
                  A('open')
                })
                return () => {
                  cancelAnimationFrame(y)
                }
              } else S(!0), A('close')
          }, [n, r]),
          { isMounted: h, status: b }
        )
      }
      function ia(e, t) {
        let { initial: n = { opacity: 0 }, open: r, close: l, common: i, duration: s = 250 } = t === void 0 ? {} : t
        const d = e.placement,
          S = d.split('-')[0],
          [b, A] = React.useState({}),
          { isMounted: h, status: y } = Sr(e, { duration: s }),
          M = yo(n),
          O = yo(r),
          z = yo(l),
          T = yo(i),
          K = typeof s == 'number',
          G = (K ? s : s.open) || 0,
          N = (K ? s : s.close) || 0
        return (
          eo(() => {
            const Y = { side: S, placement: d },
              W = M.current,
              pe = z.current,
              Oe = O.current,
              Re = T.current,
              de = typeof W == 'function' ? W(Y) : W,
              ae = typeof pe == 'function' ? pe(Y) : pe,
              R = typeof Re == 'function' ? Re(Y) : Re,
              D = (typeof Oe == 'function' ? Oe(Y) : Oe) || Object.keys(de).reduce((ee, me) => ((ee[me] = ''), ee), {})
            if (
              (y === 'initial' && A((ee) => Me(Me({ transitionProperty: ee.transitionProperty }, R), de)),
              y === 'open' &&
                A(Me(Me({ transitionProperty: Object.keys(D).map(ht).join(','), transitionDuration: G + 'ms' }, R), D)),
              y === 'close')
            ) {
              const ee = ae || de
              A(Me(Me({ transitionProperty: Object.keys(ee).map(ht).join(','), transitionDuration: N + 'ms' }, R), ee))
            }
          }, [S, d, N, z, M, O, T, G, y]),
          { isMounted: h, styles: b }
        )
      }
      const Mr = function (e, t) {
        var n
        let { open: r, dataRef: l } = e,
          {
            listRef: i,
            activeIndex: s,
            onMatch: d = () => {},
            enabled: S = !0,
            findMatch: b = null,
            resetMs: A = 1e3,
            ignoreKeys: h = [],
            selectedIndex: y = null,
          } = t === void 0 ? { listRef: { current: [] }, activeIndex: null } : t
        const M = L.useRef(),
          O = L.useRef(''),
          z = L.useRef((n = y != null ? y : s) != null ? n : -1),
          T = L.useRef(null),
          K = No(d),
          G = yo(b),
          N = yo(h)
        return (
          eo(() => {
            r && (clearTimeout(M.current), (T.current = null), (O.current = ''))
          }, [r]),
          eo(() => {
            if (r && O.current === '') {
              var Y
              z.current = (Y = y != null ? y : s) != null ? Y : -1
            }
          }, [r, y, s]),
          L.useMemo(() => {
            if (!S) return {}
            function Y(W) {
              const pe = gn(W.nativeEvent)
              if (
                ko(pe) &&
                Wo(go(pe)) !== W.currentTarget &&
                pe.closest('[role="dialog"],[role="menu"],[role="listbox"],[role="tree"],[role="grid"]') !==
                  W.currentTarget
              )
                return
              O.current.length > 0 && O.current[0] !== ' ' && ((l.current.typing = !0), W.key === ' ' && xo(W))
              const Oe = i.current
              if (Oe == null || N.current.includes(W.key) || W.key.length !== 1 || W.ctrlKey || W.metaKey || W.altKey)
                return
              Oe.every((ee) => {
                var me, ge
                return ee
                  ? ((me = ee[0]) == null ? void 0 : me.toLocaleLowerCase()) !==
                      ((ge = ee[1]) == null ? void 0 : ge.toLocaleLowerCase())
                  : !0
              }) &&
                O.current === W.key &&
                ((O.current = ''), (z.current = T.current)),
                (O.current += W.key),
                clearTimeout(M.current),
                (M.current = setTimeout(() => {
                  ;(O.current = ''), (z.current = T.current), (l.current.typing = !1)
                }, A))
              const de = z.current,
                ae = [...Oe.slice((de || 0) + 1), ...Oe.slice(0, (de || 0) + 1)],
                R = G.current
                  ? G.current(ae, O.current)
                  : ae.find(
                      (ee) =>
                        (ee == null ? void 0 : ee.toLocaleLowerCase().indexOf(O.current.toLocaleLowerCase())) === 0,
                    ),
                D = R ? Oe.indexOf(R) : -1
              D !== -1 && (K(D), (T.current = D))
            }
            return { reference: { onKeyDown: Y }, floating: { onKeyDown: Y } }
          }, [S, l, i, A, N, G, K])
        )
      }
      function vt(e, t) {
        return _e(Me({}, e), { rects: _e(Me({}, e.rects), { floating: _e(Me({}, e.rects.floating), { height: t }) }) })
      }
      const Ar = (e) => ({
          name: 'inner',
          options: e,
          fn(n) {
            return mo(this, null, function* () {
              const pe = e,
                {
                  listRef: r,
                  overflowRef: l,
                  onFallbackChange: i,
                  offset: s = 0,
                  index: d = 0,
                  minItemsVisible: S = 4,
                  referenceOverflowThreshold: b = 0,
                  scrollRef: A,
                } = pe,
                h = Lo(pe, [
                  'listRef',
                  'overflowRef',
                  'onFallbackChange',
                  'offset',
                  'index',
                  'minItemsVisible',
                  'referenceOverflowThreshold',
                  'scrollRef',
                ]),
                {
                  rects: y,
                  elements: { floating: M },
                } = n,
                O = r.current[d]
              if (!O) return {}
              const z = Me(Me({}, n), yield be(-O.offsetTop - y.reference.height / 2 - O.offsetHeight / 2 - s).fn(n)),
                T = (A == null ? void 0 : A.current) || M,
                K = yield v(vt(z, T.scrollHeight), h),
                G = yield v(z, _e(Me({}, h), { elementContext: 'reference' })),
                N = Math.max(0, K.top),
                Y = z.y + N,
                W = Math.max(0, T.scrollHeight - N - Math.max(0, K.bottom))
              return (
                (T.style.maxHeight = W + 'px'),
                (T.scrollTop = N),
                i &&
                  (T.offsetHeight < O.offsetHeight * Math.min(S, r.current.length - 1) - 1 ||
                  G.top >= -b ||
                  G.bottom >= -b
                    ? (0, co.flushSync)(() => i(!0))
                    : (0, co.flushSync)(() => i(!1))),
                l && (l.current = yield v(vt(_e(Me({}, z), { y: Y }), T.offsetHeight), h)),
                { y: Y }
              )
            })
          },
        }),
        Cr = (e, t) => {
          let { open: n, elements: r } = e,
            { enabled: l = !0, overflowRef: i, scrollRef: s, onChange: d } = t
          const S = No(d),
            b = L.useRef(!1),
            A = L.useRef(null),
            h = L.useRef(null)
          return (
            L.useEffect(() => {
              if (!l) return
              function y(O) {
                if (O.ctrlKey || !M || i.current == null) return
                const z = O.deltaY,
                  T = i.current.top >= -0.5,
                  K = i.current.bottom >= -0.5,
                  G = M.scrollHeight - M.clientHeight,
                  N = z < 0 ? -1 : 1,
                  Y = z < 0 ? 'max' : 'min'
                M.scrollHeight <= M.clientHeight ||
                  ((!T && z > 0) || (!K && z < 0)
                    ? (O.preventDefault(),
                      (0, co.flushSync)(() => {
                        S((W) => W + Math[Y](z, G * N))
                      }))
                    : /firefox/i.test(Jn()) && (M.scrollTop += z))
              }
              const M = (s == null ? void 0 : s.current) || r.floating
              if (n && M)
                return (
                  M.addEventListener('wheel', y),
                  requestAnimationFrame(() => {
                    ;(A.current = M.scrollTop), i.current != null && (h.current = Me({}, i.current))
                  }),
                  () => {
                    ;(A.current = null), (h.current = null), M.removeEventListener('wheel', y)
                  }
                )
            }, [l, n, r.floating, i, s, S]),
            L.useMemo(
              () =>
                l
                  ? {
                      floating: {
                        onKeyDown() {
                          b.current = !0
                        },
                        onWheel() {
                          b.current = !1
                        },
                        onPointerMove() {
                          b.current = !1
                        },
                        onScroll() {
                          const y = (s == null ? void 0 : s.current) || r.floating
                          if (!(!i.current || !y || !b.current)) {
                            if (A.current !== null) {
                              const M = y.scrollTop - A.current
                              ;((i.current.bottom < -0.5 && M < -1) || (i.current.top < -0.5 && M > 1)) &&
                                (0, co.flushSync)(() => S((O) => O + M))
                            }
                            requestAnimationFrame(() => {
                              A.current = y.scrollTop
                            })
                          }
                        },
                      },
                    }
                  : {},
              [l, i, r.floating, s, S],
            )
          )
        }
      function Or(e) {
        e === void 0 && (e = {})
        const { open: t = !1, onOpenChange: n, nodeId: r } = e,
          l = Do(e),
          i = Zo(),
          s = L.useRef(null),
          d = L.useRef({}),
          S = L.useState(() => Qn())[0],
          [b, A] = L.useState(null),
          h = L.useCallback(
            (K) => {
              const G = ko(K) ? { getBoundingClientRect: () => K.getBoundingClientRect(), contextElement: K } : K
              l.refs.setReference(G)
            },
            [l.refs],
          ),
          y = L.useCallback(
            (K) => {
              ;(ko(K) || K === null) && ((s.current = K), A(K)),
                (ko(l.refs.reference.current) || l.refs.reference.current === null || (K !== null && !ko(K))) &&
                  l.refs.setReference(K)
            },
            [l.refs],
          ),
          M = L.useMemo(
            () => _e(Me({}, l.refs), { setReference: y, setPositionReference: h, domReference: s }),
            [l.refs, y, h],
          ),
          O = L.useMemo(() => _e(Me({}, l.elements), { domReference: b }), [l.elements, b]),
          z = No(n),
          T = L.useMemo(
            () => _e(Me({}, l), { refs: M, elements: O, dataRef: d, nodeId: r, events: S, open: t, onOpenChange: z }),
            [l, r, S, t, z, M, O],
          )
        return (
          eo(() => {
            const K = i == null ? void 0 : i.nodesRef.current.find((G) => G.id === r)
            K && (K.context = T)
          }),
          L.useMemo(() => _e(Me({}, l), { context: T, refs: M, reference: y, positionReference: h }), [l, M, T, y, h])
        )
      }
      function jn(e, t, n) {
        const r = new Map()
        return Me(
          Me(Me({}, n === 'floating' && { tabIndex: -1 }), e),
          t
            .map((l) => (l ? l[n] : null))
            .concat(e)
            .reduce(
              (l, i) => (
                i &&
                  Object.entries(i).forEach((s) => {
                    let [d, S] = s
                    if (d.indexOf('on') === 0) {
                      if ((r.has(d) || r.set(d, []), typeof S == 'function')) {
                        var b
                        ;(b = r.get(d)) == null || b.push(S),
                          (l[d] = function () {
                            for (var A, h = arguments.length, y = new Array(h), M = 0; M < h; M++) y[M] = arguments[M]
                            ;(A = r.get(d)) == null || A.forEach((O) => O(...y))
                          })
                      }
                    } else l[d] = S
                  }),
                l
              ),
              {},
            ),
        )
      }
      const Er = function (e) {
        e === void 0 && (e = [])
        const t = e,
          n = L.useCallback((i) => jn(i, e, 'reference'), t),
          r = L.useCallback((i) => jn(i, e, 'floating'), t),
          l = L.useCallback((i) => jn(i, e, 'item'), t)
        return L.useMemo(() => ({ getReferenceProps: n, getFloatingProps: r, getItemProps: l }), [n, r, l])
      }
      var zr = o(87869),
        Tr = o(58733),
        Jo = o(76599),
        yt = o(97210),
        xt,
        kt,
        wt,
        Rr = (0, yt.kc)(function (e, t) {
          var n = e.css,
            r = e.cx,
            l = e.token
          return {
            item: r(
              ''.concat(t, '-item'),
              n(
                xt ||
                  (xt = (0, Jo.Z)([
                    `
      display: block;
      all: unset;
      width: 100%;
      padding: 12px 10px;
      border-radius: 5px;
      box-sizing: inherit;
      user-select: none;
      line-height: 1;
      scroll-margin: 50px;

      font-weight: normal;
      font-family: `,
                    `;
      color: `,
                    `;
      background: transparent;
      &:hover {
        background: `,
                    `;
      }
    `,
                  ])),
                l.fontFamily,
                l.colorText,
                l.colorFillTertiary,
              ),
            ),
            selected: r(
              ''.concat(t, '-item-selected'),
              n(
                kt ||
                  (kt = (0, Jo.Z)([
                    `
      color: `,
                    `;
      background: `,
                    `;
      font-weight: bold;
      &:hover {
        color: `,
                    `;
        background: `,
                    `;
      }
    `,
                  ])),
                l.colorPrimaryText,
                l.colorPrimaryBg,
                l.colorPrimaryTextHover,
                l.colorPrimaryBgHover,
              ),
            ),
            active: r(
              ''.concat(t, '-item-active'),
              n(
                wt ||
                  (wt = (0, Jo.Z)([
                    `
      background: `,
                    `;
    `,
                  ])),
                l.colorFillTertiary,
              ),
            ),
          }
        }),
        Mo = o(58801),
        Dr = ['value', 'label', 'prefixCls', 'isSelected', 'isActive', 'disabled']
      function St(e, t) {
        var n = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e)
          t &&
            (r = r.filter(function (l) {
              return Object.getOwnPropertyDescriptor(e, l).enumerable
            })),
            n.push.apply(n, r)
        }
        return n
      }
      function Mt(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t] != null ? arguments[t] : {}
          t % 2
            ? St(Object(n), !0).forEach(function (r) {
                ;(0, c.Z)(e, r, n[r])
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : St(Object(n)).forEach(function (r) {
                  Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
                })
        }
        return e
      }
      var Hr = (0, L.forwardRef)(function (e, t) {
          var n,
            r = e.value,
            l = e.label,
            i = e.prefixCls,
            s = e.isSelected,
            d = e.isActive,
            S = e.disabled,
            b = (0, Tr.Z)(e, Dr),
            A = Rr(i),
            h = A.styles,
            y = A.cx
          return (0, Mo.jsx)(
            'button',
            Mt(
              Mt(
                {
                  type: 'button',
                  disabled: S,
                  'aria-selected': s,
                  role: 'option',
                  tabIndex: -1,
                  className: y(h.item, ((n = {}), (0, c.Z)(n, h.selected, s), (0, c.Z)(n, h.active, d), n)),
                  ref: t,
                },
                b,
              ),
              {},
              { children: l },
            ),
            r,
          )
        }),
        Pr = Hr,
        At,
        Ct,
        Lr = (0, yt.kc)(function (e, t) {
          var n = e.css,
            r = e.stylish,
            l = e.cx,
            i = e.token
          return {
            container: l(
              t,
              n(
                At ||
                  (At = (0, Jo.Z)([
                    `
      background: `,
                    `;
      font-size: `,
                    `;
      border: 1px solid `,
                    `;
      box-shadow: `,
                    `;
      border-radius: 8px;
      box-sizing: border-box;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: none;
      padding: 5px;
      outline: 0;
      user-select: none;
      width: 160px;

      &::-webkit-scrollbar {
        display: none;
      }
    `,
                  ])),
                i.colorBgElevated,
                i.fontSize,
                i.colorBorder,
                i.boxShadowSecondary,
              ),
            ),
            button: l(
              ''.concat(t, '-button'),
              n(
                Ct ||
                  (Ct = (0, Jo.Z)([
                    `
      all: unset;
      font-size: `,
                    `px;
      padding: 8px;
      line-height: 0;
      background: `,
                    `;
      color: `,
                    `;
      border-radius: `,
                    `px;
      cursor: default;
      user-select: none;
      border: 1px solid `,
                    `;
      -webkit-tap-highlight-color: transparent;

      `,
                    `

      &:focus-visible {
        border-color: `,
                    `;
        box-shadow: 0 0 0 2px `,
                    `;
      }
    `,
                  ])),
                i.fontSize,
                i.colorBgContainer,
                i.colorTextSecondary,
                i.borderRadius,
                i.colorBorder,
                r.buttonDefaultHover,
                i.colorPrimary,
                i.colorPrimaryBg,
              ),
            ),
          }
        })
      function Ot(e, t) {
        var n = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e)
          t &&
            (r = r.filter(function (l) {
              return Object.getOwnPropertyDescriptor(e, l).enumerable
            })),
            n.push.apply(n, r)
        }
        return n
      }
      function qo(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t] != null ? arguments[t] : {}
          t % 2
            ? Ot(Object(n), !0).forEach(function (r) {
                ;(0, c.Z)(e, r, n[r])
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : Ot(Object(n)).forEach(function (r) {
                  Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
                })
        }
        return e
      }
      var jr = function (t) {
          var n = t.options,
            r = n === void 0 ? [] : n,
            l = t.value,
            i = t.prefixCls,
            s = t.onChange,
            d = t.renderValue,
            S = t.renderItem,
            b = t.style,
            A = i != null ? i : 'native-select',
            h = (0, zr.Z)(0, { value: l, onChange: s }),
            y = (0, f.Z)(h, 2),
            M = y[0],
            O = y[1],
            z = Lr(A),
            T = z.styles,
            K = (0, L.useRef)([]),
            G = (0, L.useRef)([]),
            N = (0, L.useRef)(null),
            Y = (0, L.useRef)(!1),
            W = (0, L.useRef)(!0),
            pe = (0, L.useRef)(),
            Oe = (0, L.useRef)(null),
            Re = (0, L.useState)(!1),
            de = (0, f.Z)(Re, 2),
            ae = de[0],
            R = de[1],
            D = (0, L.useState)(null),
            ee = (0, f.Z)(D, 2),
            me = ee[0],
            ge = ee[1],
            Ye = (0, L.useState)(!1),
            Ue = (0, f.Z)(Ye, 2),
            Se = Ue[0],
            He = Ue[1],
            ye = (0, L.useState)(0),
            De = (0, f.Z)(ye, 2),
            We = De[0],
            ze = De[1],
            Ie = (0, L.useState)(!1),
            je = (0, f.Z)(Ie, 2),
            Ne = je[0],
            bo = je[1],
            Pe = (0, L.useState)(!1),
            Qe = (0, f.Z)(Pe, 2),
            wo = Qe[0],
            po = Qe[1]
          ae || (We !== 0 && ze(0), Se && He(!1), wo && po(!1))
          var Be = Or({
              placement: 'bottom-start',
              open: ae,
              onOpenChange: R,
              whileElementsMounted: Eo,
              middleware: Se
                ? [
                    be(5),
                    Ne ? te({ crossAxis: !0, padding: 10 }) : Ee({ padding: 10 }),
                    re({
                      apply: function (vo) {
                        var Ao,
                          en,
                          Nr = vo.availableHeight
                        Object.assign(
                          (Ao = (en = Oe.current) === null || en === void 0 ? void 0 : en.style) !== null &&
                            Ao !== void 0
                            ? Ao
                            : {},
                          { maxHeight: ''.concat(Nr, 'px') },
                        )
                      },
                      padding: 10,
                    }),
                  ]
                : [
                    Ar({
                      listRef: K,
                      overflowRef: N,
                      scrollRef: Oe,
                      index: M,
                      offset: We,
                      onFallbackChange: He,
                      padding: 10,
                      minItemsVisible: Ne ? 8 : 4,
                      referenceOverflowThreshold: 20,
                    }),
                    be({ crossAxis: -4 }),
                  ],
            }),
            ho = Be.x,
            To = Be.y,
            wn = Be.strategy,
            Et = Be.refs,
            Io = Be.context,
            Fn = Er([
              gr(Io, { event: 'mousedown' }),
              hr(Io),
              kr(Io, { role: 'listbox' }),
              Cr(Io, { enabled: !Se, onChange: ze, overflowRef: N, scrollRef: Oe }),
              xr(Io, { listRef: K, activeIndex: me, selectedIndex: M, onNavigate: ge }),
              Mr(Io, { listRef: G, activeIndex: me, onMatch: ae ? ge : O }),
            ]),
            Br = Fn.getReferenceProps,
            Wr = Fn.getFloatingProps,
            Ir = Fn.getItemProps
          ;(0, L.useEffect)(
            function () {
              if (ae)
                return (
                  (pe.current = setTimeout(function () {
                    Y.current = !0
                  }, 300)),
                  function () {
                    clearTimeout(pe.current)
                  }
                )
              ;(Y.current = !1), (W.current = !0)
            },
            [ae],
          )
          var _r = r[M] || {},
            Zr = _r.label
          return (0, Mo.jsxs)(Mo.Fragment, {
            children: [
              (0, Mo.jsx)(
                'button',
                qo(
                  qo(
                    {
                      type: 'button',
                      ref: Et.setReference,
                      className: T.button,
                      'aria-label': 'selected-item',
                      style: b,
                    },
                    Br({
                      onTouchStart: function () {
                        bo(!0)
                      },
                      onPointerMove: function (vo) {
                        var Ao = vo.pointerType
                        Ao === 'mouse' && bo(!1)
                      },
                    }),
                  ),
                  {},
                  { children: d ? d(M) : Zr },
                ),
              ),
              (0, Mo.jsx)(sr, {
                children:
                  ae &&
                  (0, Mo.jsx)(fr, {
                    lockScroll: !Ne,
                    style: { zIndex: 3e3 },
                    children: (0, Mo.jsx)(dr, {
                      context: Io,
                      modal: !1,
                      initialFocus: -1,
                      children: (0, Mo.jsx)('div', {
                        ref: Et.setFloating,
                        style: { position: wn, top: To != null ? To : 0, left: ho != null ? ho : 0 },
                        children: (0, Mo.jsx)(
                          'div',
                          qo(
                            qo(
                              { className: T.container, style: { overflowY: 'auto' }, ref: Oe },
                              Wr({
                                onContextMenu: function (vo) {
                                  vo.preventDefault()
                                },
                              }),
                            ),
                            {},
                            {
                              children: r.map(function (Ro, vo) {
                                return (0, Mo.jsx)(
                                  Pr,
                                  qo(
                                    {
                                      prefixCls: A,
                                      value: Ro.value,
                                      label: S ? S(Ro, vo) : Ro.label,
                                      disabled: wo,
                                      isSelected: vo === M,
                                      isActive: vo === me,
                                      ref: function (en) {
                                        ;(K.current[vo] = en), (G.current[vo] = Ro.label)
                                      },
                                    },
                                    Ir({
                                      onTouchStart: function () {
                                        ;(Y.current = !0), (W.current = !1)
                                      },
                                      onKeyDown: function () {
                                        Y.current = !0
                                      },
                                      onClick: function () {
                                        Y.current && (O(vo), R(!1))
                                      },
                                      onMouseUp: function () {
                                        W.current &&
                                          (Y.current && (O(vo), R(!1)),
                                          clearTimeout(pe.current),
                                          (pe.current = setTimeout(function () {
                                            Y.current = !0
                                          })))
                                      },
                                    }),
                                  ),
                                  Ro.value,
                                )
                              }),
                            },
                          ),
                        ),
                      }),
                    }),
                  }),
              }),
            ],
          })
        },
        Fr = jr
    },
    18490: function (E, a, o) {
      'use strict'
      o.d(a, {
        A: function () {
          return ue
        },
      })
      var c = o(49544),
        f = o(58733),
        m = o(24572),
        x = o(87343),
        w = o(3341),
        k = o.n(w),
        C = o(19263),
        g = o(57689),
        p = o(17852),
        u = ['setLoading'],
        v = ['setLoading'],
        H = typeof window != 'undefined',
        P = {},
        F = function (ce, se) {
          ;(0, g.useEffect)(function () {
            g.startTransition(function () {
              ce()
            })
          }, se)
        },
        I = function (ce, se) {
          ;(0, C.Z)(
            function () {
              ce()
            },
            se,
            { wait: 32, maxWait: 96 },
          )
        },
        U = typeof g.startTransition == 'function' ? F : I,
        $ = function (ce, se, J) {
          var Ee =
            J ||
            function (Ce, j) {
              return p.H.setState((0, m.Z)({}, Ce, j))
            }
          !H && !P[ce] && (Ee(ce, se), (P[ce] = !0)),
            U(
              function () {
                Ee(ce, se)
              },
              [se],
            )
        },
        X = { title: '\u9996\u9875', link: '/', activePath: '/' },
        ue = (0, g.memo)(function () {
          var B = (0, x.WF)(),
            ce = (0, x.tx)(),
            se = (0, x.eL)(),
            J = (0, x.OK)(),
            Ee = (0, x.TH)(),
            Ce = (0, x.bU)()
          return (
            $('siteData', B, function () {
              var j = B.setLoading,
                V = (0, f.Z)(B, u),
                q = p.H.getState(),
                be = q.siteData,
                Q = be.setLoading,
                te = (0, f.Z)(be, v)
              k()(V, te) || p.H.setState({ siteData: B })
            }),
            $('sidebar', ce),
            $('routeMeta', se),
            $('location', Ee),
            $('locale', Ce),
            $('navData', J, function () {
              p.H.setState({ navData: [X].concat((0, c.Z)(J)) })
            }),
            null
          )
        })
    },
    71331: function (E, a, o) {
      'use strict'
      var c = o(76599),
        f = o(16618),
        m = o(57689),
        x = o(6298),
        w = o(43084),
        k = o(69023),
        C = o(58801),
        g,
        p = function () {
          return (0, C.jsx)('svg', {
            viewBox: '0 0 16 16',
            width: '1em',
            height: '1em',
            fill: 'currentColor',
            children: (0, C.jsx)('path', {
              d: 'M8.218 1.455c3.527.109 6.327 3.018 6.327 6.545 0 3.6-2.945 6.545-6.545 6.545a6.562 6.562 0 0 1-6.036-4h.218c3.6 0 6.545-2.945 6.545-6.545 0-.91-.182-1.745-.509-2.545m0-1.455c-.473 0-.909.218-1.2.618-.29.4-.327.946-.145 1.382.254.655.4 1.31.4 2 0 2.8-2.291 5.09-5.091 5.09h-.218c-.473 0-.91.22-1.2.62-.291.4-.328.945-.146 1.38C1.891 14.074 4.764 16 8 16c4.4 0 8-3.6 8-8a7.972 7.972 0 0 0-7.745-8h-.037Z',
            }),
          })
        },
        u = function () {
          return (0, C.jsx)('svg', {
            viewBox: '0 0 16 16',
            width: '1em',
            height: '1em',
            fill: 'currentColor',
            children: (0, C.jsx)('path', {
              d: 'M8 13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM8 3a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm7 4a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM3 8a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm9.95 3.536.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-9.9-7.072-.707-.707a1 1 0 0 1 1.414-1.414l.707.707A1 1 0 0 1 3.05 4.464Zm9.9 0a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707Zm-9.9 7.072a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707ZM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z',
            }),
          })
        },
        v = function () {
          return (0, C.jsx)('svg', {
            viewBox: '0 0 16 16',
            width: '1em',
            height: '1em',
            fill: 'currentColor',
            children: (0, C.jsx)('path', {
              d: 'M14.595 8a6.595 6.595 0 1 1-13.19 0 6.595 6.595 0 0 1 13.19 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 2.014v11.972A5.986 5.986 0 0 0 8 2.014Z',
            }),
          })
        },
        H = f.Z.span(
          g ||
            (g = (0, c.Z)([
              `
  width: 12px;
`,
            ])),
        ),
        P = function ($) {
          var X = $.icon,
            ue = $.label
          return (0, C.jsxs)(x.D, {
            horizontal: !0,
            gap: 12,
            align: 'center',
            children: [(0, C.jsxs)(H, { children: [X, ' '] }), ue],
          })
        },
        F = [
          { label: '\u8DDF\u968F\u7CFB\u7EDF', icon: (0, C.jsx)(v, {}), value: 'auto' },
          { label: '\u4EAE\u8272\u6A21\u5F0F', icon: (0, C.jsx)(u, {}), value: 'light' },
          { label: '\u6697\u8272\u6A21\u5F0F', icon: (0, C.jsx)(p, {}), value: 'dark' },
        ],
        I = function () {
          var $ = (0, w.f)(function (X) {
            return X.themeMode
          })
          return (0, C.jsx)('span', {
            children: (0, C.jsx)(k.Z, {
              options: F,
              value: F.findIndex(function (X) {
                return X.value === $
              }),
              onChange: function (ue) {
                var B = F[ue].value
                w.f.setState({ themeMode: B })
              },
              renderValue: function (ue) {
                return F[ue].icon
              },
              renderItem: function (ue) {
                return (0, C.jsx)(P, { label: ue.label, icon: ue.icon })
              },
            }),
          })
        }
      a.Z = (0, m.memo)(I)
    },
    78972: function (E, a, o) {
      'use strict'
      o.d(a, {
        y: function () {
          return g
        },
      })
      var c = o(76599),
        f = o(97210),
        m = o(87356),
        x,
        w,
        k,
        C,
        g = (0, f.kc)(function (p) {
          var u = p.token,
            v = p.stylish,
            H = p.prefixCls,
            P = p.responsive,
            F = p.css,
            I = 36
          return {
            container: F(
              x ||
                (x = (0, c.Z)([
                  `
      grid-area: toc;
      position: sticky;
      top: 100px;
      width: `,
                  `px;
      margin-inline-end: 24px;
      max-height: 80vh;
      overflow: auto;
      margin-top: 48px;
      z-index: 10;
      border-radius: 8px;

      `,
                  ` {
        z-index: 300;
        top: `,
                  `px;
        margin-top: 0;
        width: 100%;
      }

      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;

      > h4 {
        margin: 0 0 8px;
        color: `,
                  `;
        font-size: 12px;
        line-height: 1;
      }
    `,
                ])),
              u.tocWidth,
              P.mobile,
              u.headerHeight + 1,
              u.colorTextDescription,
            ),
            mobileCtn: F(
              w ||
                (w = (0, c.Z)([
                  `
      position: sticky;
      top: `,
                  `px;

      height: `,
                  `px;
      width: 100%;
      z-index: 200;
      background: transparent;
      background: `,
                  `;
    `,
                ])),
              u.headerHeight + 1,
              I,
              (0, m.m4)(u.colorBgContainer, 0.8),
            ),
            expand: F(
              k ||
                (k = (0, c.Z)([
                  `
      backdrop-filter: blur(6px);
      border-radius: 0;
      border-bottom: 1px solid `,
                  `;

      box-shadow: `,
                  `;
      width: 100%;
      z-index: 201;
      background: `,
                  `;

      .`,
                  `-collapse-header {
        padding: 8px 16px !important;
      }
    `,
                ])),
              u.colorSplit,
              u.boxShadowSecondary,
              (0, m.m4)(u.colorBgContainer, 0.8),
              H,
            ),
            anchor: F(
              C ||
                (C = (0, c.Z)([
                  `
      `,
                  `
    `,
                ])),
              v.blur,
            ),
          }
        })
    },
    38736: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return x
        },
      })
      var c = o(76599),
        f = o(97210),
        m,
        x = (0, f.vJ)(
          m ||
            (m = (0, c.Z)([
              `
  body {
    margin: 0;
    padding: 0;
    background-color: `,
              `;
  }

  @font-face {
    font-family: AliPuHui;
    font-weight: normal;
    src: url('//at.alicdn.com/t/webfont_exesdog9toj.woff2') format('woff2'),
    url('//at.alicdn.com/t/webfont_exesdog9toj.woff') format('woff'),
    url('//at.alicdn.com/t/webfont_exesdog9toj.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: AliPuHui;
    font-weight: bold;
    src: url('https://at.alicdn.com/wf/webfont/exMpJIukiCms/Gsw2PSKrftc1yNWMNlXgw.woff2') format('woff2'),
    url('https://at.alicdn.com/wf/webfont/exMpJIukiCms/vtu73by4O2gEBcvBuLgeu.woff') format('woff');
    font-display: swap;
  }

  /* \u5B9A\u4E49\u6EDA\u52A8\u69FD\u7684\u6837\u5F0F */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    margin-right: 4px;
    background-color: transparent; // \u5B9A\u4E49\u6EDA\u52A8\u69FD\u7684\u80CC\u666F\u8272

    &-thumb {
      background-color: `,
              `; // \u5B9A\u4E49\u6EDA\u52A8\u5757\u7684\u80CC\u666F\u8272
      border-radius: 4px; // \u5B9A\u4E49\u6EDA\u52A8\u5757\u7684\u5706\u89D2\u534A\u5F84
    }

    &-corner {
      display: none;
    }
  }
`,
            ])),
          function (w) {
            return w.theme.colorBgLayout
          },
          function (w) {
            var k = w.theme
            return k.colorFill
          },
        )
    },
    75158: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return Le
        },
      })
      var c = o(87343),
        f = o(57689),
        m = o(6298),
        x = o(86335),
        w = o(24572),
        k = o(45267),
        C = o(47277),
        g = o(39649),
        p = o(76599),
        u = o(97210),
        v = o(87356),
        H,
        P,
        F,
        I,
        U,
        $,
        X,
        ue,
        B,
        ce,
        se = (0, u.kc)(function (ve, xe) {
          var ne = ve.token,
            Z = ve.prefixCls,
            Ze = ve.responsive,
            Fe = ve.css,
            Ge = ve.stylish,
            so = ve.isDarkMode,
            no = ve.cx,
            $e = xe.rowNum,
            qe = xe.hasLink,
            Xe = ''.concat(Z, '-features'),
            Je = ''.concat(Xe, '-cover'),
            Ke = ''.concat(Xe, '-description'),
            to = ''.concat(Xe, '-title'),
            oo = ''.concat(Xe, '-img'),
            Co = 20,
            lo = function (Oo) {
              return Fe(
                H ||
                  (H = (0, p.Z)([
                    `
      width: `,
                    `px;
      height: `,
                    `px;
      font-size: `,
                    `px;
    `,
                  ])),
                Oo,
                Oo,
                Oo * (22 / 24),
              )
            },
            uo = Fe(
              P ||
                (P = (0, p.Z)([
                  `
      transition: all `,
                  ' ',
                  `;
    `,
                ])),
              ne.motionDurationSlow,
              ne.motionEaseInOutCirc,
            )
          return {
            cell: Fe(
              F ||
                (F = (0, p.Z)([
                  `
        overflow: hidden;
      `,
                ])),
            ),
            container: Fe(
              I ||
                (I = (0, p.Z)([
                  `
        `,
                  `;

        z-index: 1;
        padding: 24px;
        border-radius: 24px;

        background: linear-gradient(
          135deg,
          `,
                  `,
          `,
                  `
        );

        position: relative;

        &:hover {
          scale: 1.03;

          background: linear-gradient(
            135deg,
            `,
                  `,
            `,
                  `
          );

          box-shadow: inset 0 0 0 1px `,
                  ', ',
                  `;

          .`,
                  ` {
            height: `,
                  `px;
            width: 100%;
            padding: 0;
          }

          .`,
                  ` {
            `,
                  `;
          }

          .`,
                  ` {
            position: absolute;
            visibility: hidden;
            opacity: 0;
          }

          .`,
                  ` {
            font-size: `,
                  `px;
          }
        }
      `,
                ])),
              uo,
              ne.colorFillContent,
              ne.colorFillQuaternary,
              (0, v.$n)(0.5, ne.colorFillContent),
              (0, v.$n)(0.5, ne.colorFillQuaternary),
              ne.colorBorder,
              ne.boxShadowSecondary,
              Je,
              Co * $e,
              oo,
              lo(100),
              Ke,
              to,
              qe ? 14 : 20,
            ),
            title: no(
              to,
              uo,
              Fe(
                U ||
                  (U = (0, p.Z)([
                    `
          pointer-events: none;
          font-size: 20px;
          line-height: `,
                    `;
          margin: 16px 0;
          color: `,
                    `;
        `,
                  ])),
                ne.lineHeightHeading3,
                ne.colorText,
              ),
            ),
            desc: no(
              Ke,
              uo,
              Fe(
                $ ||
                  ($ = (0, p.Z)([
                    `
          color: `,
                    `;

          pointer-events: none;
          quotient {
            color: `,
                    `;
            display: block;
            margin: 12px 0;
            padding-left: 12px;
            position: relative;
            &:before {
              position: absolute;
              content: '';
              left: 0;
              display: block;
              border-radius: 2px;
              width: 4px;
              height: 100%;
              background: `,
                    `;
            }
          }
        `,
                  ])),
                ne.colorTextSecondary,
                ne.colorTextDescription,
                so ? ne.colorPrimary : ne.colorPrimaryBgHover,
              ),
            ),
            imgContainer: no(
              Je,
              uo,
              Fe(
                X ||
                  (X = (0, p.Z)([
                    `
          background: `,
                    `;
          border-radius: 8px;
          opacity: 0.8;

          `,
                    `;
          padding: 4px;

          &[image-style='primary'] {
            background: linear-gradient(135deg, `,
                    ', ',
                    `);
          }

          &[image-style='light'] {
            background: `,
                    `;
          }

          &[image-style='soon'] {
            opacity: 0.5;
            background: linear-gradient(
              135deg,
              `,
                    `,
              `,
                    ` 50%,
              `,
                    `
            );
          }
        `,
                  ])),
                ne.colorFillContent,
                lo(24),
                ne.gradientColor1,
                ne.gradientColor2,
                ne.colorBgContainer,
                (0, v.m4)(ne.gradientColor2, 0.3),
                (0, v.m4)(ne.gradientColor2, 0.3),
                (0, v.m4)(ne.gradientColor1, 0.3),
              ),
            ),
            img: no(
              oo,
              uo,
              Fe(
                ue ||
                  (ue = (0, p.Z)([
                    `
          `,
                    `;
          color: `,
                    `;
        `,
                  ])),
                lo(20),
                ne.colorWhite,
              ),
            ),
            link: Fe(
              B ||
                (B = (0, p.Z)([
                  `
        `,
                  `;

        margin-top: 24px;

        a {
          `,
                  `;

          color: `,
                  `;
          &:hover {
            color: `,
                  `;
          }
        }
      `,
                ])),
              uo,
              Ge.resetLinkColor,
              ne.colorTextDescription,
              ne.colorPrimaryHover,
            ),
            blur: Fe(
              ce ||
                (ce = (0, p.Z)([
                  `
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        `,
                  `;
        scale: 2;
        opacity: `,
                  `;
        `,
                  ` {
          display: none;
        }
      `,
                ])),
              Ge.heroBlurBall,
              so ? 0.05 : 0.08,
              Ze.mobile,
            ),
          }
        }),
        J = o(58801),
        Ee = function (xe) {
          var ne = xe.image,
            Z = xe.className,
            Ze = xe.title
          return ne.startsWith('http')
            ? (0, J.jsx)('img', { className: Z, src: ne, alt: Ze })
            : (0, J.jsx)(g.Z, { className: Z, children: ne })
        },
        Ce = function (xe) {
          var ne = xe.imageType,
            Z = xe.row,
            Ze = xe.column,
            Fe = xe.hero,
            Ge = xe.description,
            so = xe.image,
            no = xe.title,
            $e = xe.link,
            qe = xe.imageStyle,
            Xe = Z || 7,
            Je = se({ rowNum: Xe, hasLink: !!$e }),
            Ke = Je.styles,
            to = Je.theme
          return (0, J.jsxs)('div', {
            className: Ke.container,
            style: {
              gridRow: 'span '.concat(Xe),
              gridColumn: 'span '.concat(Ze || 1),
              cursor: $e ? 'pointer' : 'default',
            },
            onClick: function () {
              $e && c.m8.push($e)
            },
            children: [
              (0, J.jsxs)('div', {
                className: Ke.cell,
                children: [
                  so &&
                    (0, J.jsx)(g.Z, {
                      'image-style': ne,
                      className: Ke.imgContainer,
                      style: qe,
                      children: (0, J.jsx)(Ee, { className: Ke.img, image: so, title: no }),
                    }),
                  no &&
                    (0, J.jsxs)(m.D, {
                      as: 'h3',
                      horizontal: !0,
                      gap: 8,
                      align: 'center',
                      className: Ke.title,
                      children: [
                        no,
                        ne === 'soon'
                          ? (0, J.jsx)(C.Z, {
                              color: to.isDarkMode ? 'pink-inverse' : 'cyan-inverse',
                              children: 'SOON',
                            })
                          : null,
                      ],
                    }),
                  Ge && (0, J.jsx)('p', { dangerouslySetInnerHTML: { __html: Ge }, className: Ke.desc }),
                  $e &&
                    (0, J.jsx)('div', {
                      className: Ke.link,
                      children: (0, J.jsxs)(c.rU, {
                        to: $e,
                        children: ['\u7ACB\u5373\u4E86\u89E3 ', (0, J.jsx)(k.Z, {})],
                      }),
                    }),
                ],
              }),
              Fe && (0, J.jsx)('div', { className: Ke.blur }),
            ],
          })
        },
        j = Ce,
        V,
        q,
        be = (0, u.kc)(function (ve) {
          var xe = ve.token,
            ne = ve.prefixCls,
            Z = ve.responsive,
            Ze = ve.css,
            Fe = ve.cx,
            Ge = ''.concat(ne, '-features')
          return {
            container: Fe(
              Ge,
              Ze(
                V ||
                  (V = (0, p.Z)([
                    `
        max-width: `,
                    `px;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row dense;
        grid-auto-rows: 24px;
        gap: 16px;

        `,
                    `
      `,
                  ])),
                xe.contentMaxWidth,
                Z({
                  mobile: Ze(
                    q ||
                      (q = (0, p.Z)([
                        `
            flex-direction: column;
            display: flex;
          `,
                      ])),
                  ),
                  laptop: { gridTemplateColumns: 'repeat(2, 1fr)' },
                }),
              ),
            ),
          }
        })
      function Q(ve, xe) {
        var ne = Object.keys(ve)
        if (Object.getOwnPropertySymbols) {
          var Z = Object.getOwnPropertySymbols(ve)
          xe &&
            (Z = Z.filter(function (Ze) {
              return Object.getOwnPropertyDescriptor(ve, Ze).enumerable
            })),
            ne.push.apply(ne, Z)
        }
        return ne
      }
      function te(ve) {
        for (var xe = 1; xe < arguments.length; xe++) {
          var ne = arguments[xe] != null ? arguments[xe] : {}
          xe % 2
            ? Q(Object(ne), !0).forEach(function (Z) {
                ;(0, w.Z)(ve, Z, ne[Z])
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(ve, Object.getOwnPropertyDescriptors(ne))
              : Q(Object(ne)).forEach(function (Z) {
                  Object.defineProperty(ve, Z, Object.getOwnPropertyDescriptor(ne, Z))
                })
        }
        return ve
      }
      var _ = function (xe) {
          var ne = xe.items,
            Z = xe.style,
            Ze = be(),
            Fe = Ze.styles
          return Boolean(ne == null ? void 0 : ne.length)
            ? (0, J.jsx)('div', {
                className: Fe.container,
                style: Z,
                children: ne.map(function (Ge) {
                  return (0, J.jsx)(j, te({}, Ge), Ge.title)
                }),
              })
            : null
        },
        re = _,
        oe = o(17852),
        ke = o(69470),
        he = function () {
          var xe = (0, oe.H)(ke.SL, x.X)
          return Boolean(xe == null ? void 0 : xe.length)
            ? (0, J.jsx)(re, { items: xe, style: { margin: '0 16px' } })
            : null
        },
        Ae = he,
        we = o(69582),
        ie = o(27756),
        le = o(94847),
        fe = o(74491),
        Te = (0, f.memo)(function () {
          var ve = (0, oe.H)(fe.TG)
          return (0, J.jsxs)(J.Fragment, {
            children: [
              (0, J.jsx)(c.ql, { children: (0, J.jsx)('title', { children: ve }) }),
              (0, J.jsxs)(m.D, {
                align: 'center',
                gap: 80,
                children: [(0, J.jsx)(ie.Z, {}), (0, J.jsx)(le.Z, {}), (0, J.jsx)(Ae, {}), (0, J.jsx)(we.Z, {})],
              }),
            ],
          })
        }),
        Le = Te
    },
    12655: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return Q
        },
      })
      var c = o(55632),
        f = o(22725),
        m = o(57689),
        x = o(6298),
        w = o(24572),
        k = o(3341),
        C = o.n(k),
        g = o(17852),
        p = o(74491),
        u = o(79068),
        v = o(45267),
        H = o(87343),
        P = o(76599),
        F = o(97210),
        I,
        U,
        $,
        X,
        ue = (0, F.kc)(function (te) {
          var _ = te.token,
            re = te.css
          return {
            container: re(
              I ||
                (I = (0, P.Z)([
                  `
    background: `,
                  `;
    padding: 16px 24px;
    border-radius: 8px;
    cursor: pointer;

    min-width: 250px;
    &:hover {
      background: `,
                  `;
    }
  `,
                ])),
              _.colorBgContainer,
              _.colorFillTertiary,
            ),
            nav: re(
              U ||
                (U = (0, P.Z)([
                  `
    color: `,
                  `;
    font-size: 12px;
  `,
                ])),
              _.colorTextTertiary,
            ),
            title: re(
              $ ||
                ($ = (0, P.Z)([
                  `
    font-size: 16px;
  `,
                ])),
            ),
            alignmentEnd: re(
              X ||
                (X = (0, P.Z)([
                  `
    justify-content: flex-end;
  `,
                ])),
            ),
          }
        }),
        B = o(58801),
        ce = function (_) {
          var re = _.title,
            oe = _.link,
            ke = _.type,
            he = ue(),
            Ae = he.styles,
            we = he.cx,
            ie = (0, m.useMemo)(
              function () {
                switch (ke) {
                  case 'prev':
                    return (0, B.jsxs)(B.Fragment, { children: [(0, B.jsx)(u.Z, {}), ' \u4E0A\u4E00\u7BC7'] })
                  case 'next':
                    return (0, B.jsxs)(B.Fragment, { children: ['\u4E0B\u4E00\u7BC7 ', (0, B.jsx)(v.Z, {})] })
                }
              },
              [ke],
            )
          return (0, B.jsx)(H.rU, {
            to: oe,
            children: (0, B.jsxs)(x.D, {
              className: Ae.container,
              gap: 8,
              children: [
                (0, B.jsx)(x.D, {
                  horizontal: !0,
                  gap: 4,
                  className: we(Ae.nav, ke === 'next' && Ae.alignmentEnd),
                  children: ie,
                }),
                (0, B.jsx)(x.D, {
                  horizontal: !0,
                  className: we(Ae.title, ke === 'next' && Ae.alignmentEnd),
                  children: re,
                }),
              ],
            }),
          })
        },
        se = (0, m.memo)(ce)
      function J(te, _) {
        var re = Object.keys(te)
        if (Object.getOwnPropertySymbols) {
          var oe = Object.getOwnPropertySymbols(te)
          _ &&
            (oe = oe.filter(function (ke) {
              return Object.getOwnPropertyDescriptor(te, ke).enumerable
            })),
            re.push.apply(re, oe)
        }
        return re
      }
      function Ee(te) {
        for (var _ = 1; _ < arguments.length; _++) {
          var re = arguments[_] != null ? arguments[_] : {}
          _ % 2
            ? J(Object(re), !0).forEach(function (oe) {
                ;(0, w.Z)(te, oe, re[oe])
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(te, Object.getOwnPropertyDescriptors(re))
              : J(Object(re)).forEach(function (oe) {
                  Object.defineProperty(te, oe, Object.getOwnPropertyDescriptor(re, oe))
                })
        }
        return te
      }
      var Ce = function () {
          var _ = (0, g.H)(p.e9, C()),
            re = _.prev,
            oe = _.next,
            ke = (0, f.F)(),
            he = ke.mobile
          return (0, B.jsxs)(x.D, {
            horizontal: !he,
            gap: he ? 12 : 0,
            distribution: 'space-between',
            style: { margin: he ? 12 : 0 },
            children: [
              re ? (0, B.jsx)(se, Ee({ type: 'prev' }, re)) : (0, B.jsx)('div', {}),
              oe ? (0, B.jsx)(se, Ee({ type: 'next' }, oe)) : (0, B.jsx)('div', {}),
            ],
          })
        },
        j = (0, m.memo)(Ce),
        V,
        q = (0, F.kc)(function (te) {
          var _ = te.token,
            re = te.responsive,
            oe = te.isDarkMode,
            ke = te.css
          return {
            content: ke(
              V ||
                (V = (0, P.Z)([
                  `
    min-height: 400px;
    flex: 1;
    width: 100%;
    box-sizing: border-box;

    padding: 24px 48px;
    border-radius: 10px;
    background-color: `,
                  `;
    box-shadow: `,
                  `;

    `,
                  ` {
      padding: 8px 16px;
      border-radius: 0;
    }

    .markdown {
      color: `,
                  `;

      h1,
      h2,
      h3 {
        color: `,
                  `;
      }
      p {
        line-height: 1.8;
      }

      // hyperlink
      a {
        color: `,
                  `;

        &:hover {
          color: `,
                  `;
        }

        &:active {
          color: `,
                  `;
        }
      }

      img {
        max-width: 100%;

        opacity: `,
                  `;
      }

      > [data-code-type='highlighter'] {
        pre {
          margin: 8px 0 !important;
        }
      }
      // inline code
      > :not([data-code-type='highlighter']) code {
        padding: 2px 6px;

        //FIXME: \u7B49\u4E0B\u4E00\u7248 token \u4F18\u5316\u5347\u7EA7
        color: `,
                  `;
        background: `,
                  `;
        border-radius: 4px;
      }

      // pre tag
      pre {
        font-size: 14px;
        padding-left: 24px;
        padding-right: 24px;
      }

      // table
      table {
        width: 100%;
        border-spacing: 1px;
      }

      th {
        background: `,
                  `;
      }

      tr {
      }
      th,
      td {
        padding-block-start: 10px;
        padding-block-end: 10px;
        padding-inline-start: 16px;
        padding-inline-end: 16px;
        border-bottom: 1px solid `,
                  `;
      }

      // blockquote
      blockquote {
        font-style: italic;

        margin: 16px 0;
        padding: 0 12px;
        color: `,
                  `;
        border-left: 3px solid `,
                  `;
      }

      // list
      ul li {
        line-height: 1.8;
      }

      // anchor of headings
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        > a[aria-hidden]:first-child {
          float: left;
          width: 20px;
          padding-inline-end: 4px;
          margin-inline-start: -24px;
          color: `,
                  `;
          // hide phantom blank node
          font-size: 0;
          text-align: right;
          line-height: inherit;

          &:hover {
            border: 0;
          }

          > .icon-link::before {
            content: '#';
            color: `,
                  `;
            font-size: 20px;
          }
        }

        &:not(:hover) > a[aria-hidden]:first-child > .icon-link {
          visibility: hidden;
        }
      }
    }
  `,
                ])),
              _.colorBgContainer,
              _.boxShadowTertiary,
              re.mobile,
              oe ? _.colorTextSecondary : _.colorText,
              _.colorText,
              _.colorLink,
              _.colorLinkHover,
              _.colorLinkActive,
              oe ? 0.8 : 1,
              oe ? _['cyan-7'] : _.colorPrimaryText,
              oe ? _['cyan-1'] : _.colorPrimaryBg,
              _.colorFillTertiary,
              _.colorBorderSecondary,
              _.colorTextDescription,
              _.colorBorder,
              _.colorText,
              _.colorTextTertiary,
            ),
          }
        }),
        be = function (_) {
          var re = _.children,
            oe = (0, g.H)(function (le) {
              return le.siteData.loading
            }),
            ke = q(),
            he = ke.styles,
            Ae = ke.cx,
            we = (0, f.F)(),
            ie = we.mobile
          return (0, B.jsxs)(x.D, {
            width: '100%',
            gap: ie ? 0 : 24,
            children: [
              (0, B.jsxs)('div', {
                className: Ae('dumi-antd-style-content', he.content),
                children: [(0, B.jsx)(c.Z, { active: !0, paragraph: !0, loading: oe }), re],
              }),
              (0, B.jsx)(j, {}),
            ],
          })
        },
        Q = (0, m.memo)(be)
    },
    69582: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return Ae
        },
      })
      var c = o(13345),
        f = o(22725),
        m = o(39649),
        x = o(6298),
        w = o(75782),
        k = o(24572),
        C = o(58733),
        g = o(57689),
        p = o(84875),
        u = o.n(p),
        v = function (ie) {
          var le = ie.prefixCls,
            fe = ie.icon,
            Te = ie.title,
            Le = ie.items,
            ve = Le === void 0 ? [] : Le,
            xe = ie.style,
            ne = ie.className
          return g.createElement(
            'div',
            { className: u()(''.concat(le, '-column'), ne), style: xe },
            (Te || fe) &&
              g.createElement(
                'h2',
                null,
                fe && g.createElement('span', { className: ''.concat(le, '-column-icon') }, fe),
                Te,
              ),
            ve.map(function (Z, Ze) {
              var Fe = Z.LinkComponent || 'a'
              return g.createElement(
                'div',
                { className: u()(''.concat(le, '-item'), Z.className), style: Z.style, key: Ze },
                g.createElement(
                  Fe,
                  {
                    href: Z.url,
                    to: typeof Fe != 'string' ? Z.url : void 0,
                    target: Z.openExternal ? '_blank' : void 0,
                    rel: Z.openExternal ? 'noopener noreferrer' : void 0,
                  },
                  Z.icon && g.createElement('span', { className: ''.concat(le, '-item-icon') }, Z.icon),
                  Z.title,
                ),
                Z.description &&
                  g.createElement(
                    g.Fragment,
                    null,
                    g.createElement('span', { className: ''.concat(le, '-item-separator') }, '-'),
                    g.createElement('span', { className: ''.concat(le, '-item-description') }, Z.description),
                  ),
              )
            }),
          )
        },
        H = v,
        P = [
          'prefixCls',
          'className',
          'style',
          'bottom',
          'columns',
          'maxColumnsPerRow',
          'backgroundColor',
          'columnLayout',
          'theme',
        ],
        F = function (ie) {
          var le = ie.prefixCls,
            fe = le === void 0 ? 'rc-footer' : le,
            Te = ie.className,
            Le = ie.style,
            ve = ie.bottom,
            xe = ie.columns,
            ne = ie.maxColumnsPerRow,
            Z = ie.backgroundColor,
            Ze = ie.columnLayout,
            Fe = ie.theme,
            Ge = Fe === void 0 ? 'dark' : Fe,
            so = (0, C.Z)(ie, P),
            no = u()(''.concat(fe), Te, (0, k.Z)({}, ''.concat(fe, '-').concat(Ge), !!Ge)),
            $e = typeof ne == 'number' && ne > 0
          return g.createElement(
            'footer',
            (0, w.Z)(
              (0, w.Z)({}, so),
              {},
              { className: no, style: (0, w.Z)((0, w.Z)({}, Le), {}, { backgroundColor: Z }) },
            ),
            g.createElement(
              'section',
              { className: ''.concat(fe, '-container') },
              xe &&
                xe.length > 0 &&
                g.createElement(
                  'section',
                  {
                    className: ''.concat(fe, '-columns'),
                    style: { justifyContent: Ze, flexWrap: $e ? 'wrap' : void 0 },
                  },
                  xe.map(function (qe, Xe) {
                    var Je = qe.title,
                      Ke = qe.icon,
                      to = qe.style,
                      oo = qe.className,
                      Co = qe.items,
                      lo = Co === void 0 ? [] : Co,
                      uo = (0, w.Z)({}, to)
                    return (
                      $e && (uo.flex = '0 0 '.concat(100 / (ne + 1) + 0.1, '%')),
                      g.createElement(H, {
                        key: Xe,
                        prefixCls: fe,
                        title: Je,
                        icon: Ke,
                        items: lo,
                        style: uo,
                        className: oo,
                      })
                    )
                  }),
                ),
            ),
            ve &&
              g.createElement(
                'section',
                { className: ''.concat(fe, '-bottom') },
                g.createElement('div', { className: ''.concat(fe, '-bottom-container') }, ve),
              ),
          )
        },
        I = F,
        U = o(76599),
        $ = o(97210),
        X,
        ue,
        B = (0, $.kc)(function (we, ie) {
          var le = we.css,
            fe = we.responsive,
            Te = we.token,
            Le = 'rc-footer'
          return {
            container: le(
              X ||
                (X = (0, U.Z)([
                  `
      grid-area: footer;
      border-top: 1px solid `,
                  `;
      color: `,
                  `;
      text-align: center;
      align-self: stretch;

      `,
                  ` {
        border: none;
        flex-direction: column;
      }
    `,
                ])),
              Te.colorSplit,
              Te.colorTextDescription,
              fe.mobile,
            ),
            footer: le(
              ue ||
                (ue = (0, U.Z)([
                  `
      color: `,
                  `;
      font-size: 14px;
      line-height: 1.5;
      background-color: `,
                  `;

      &.`,
                  ` {
        a {
          color: `,
                  `;
          text-decoration: none;
          transition: all 0.3s;

          &:hover {
            color: `,
                  `;
          }
        }
      }

      .`,
                  ` {
        &-container {
          width: 100%;
          max-width: `,
                  `px;
          margin: auto;
          padding: `,
                  `;
        }

        &-columns {
          display: flex;
          justify-content: space-around;
        }

        &-column {
          h2 {
            position: relative;
            margin: 0 auto;
            color: `,
                  `;
            font-weight: 500;
            font-size: 16px;
          }

          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 22px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.5em;

            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }
        }

        &-item {
          margin: 12px 0;

          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 16px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.4em;

            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }

          &-separator {
            margin: 0 0.3em;
          }
        }

        &-bottom {
          &-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 0;
            font-size: 16px;
            line-height: 32px;
            text-align: center;
            border-top: 1px solid `,
                  `;
          }
        }

        &-light {
          color: rgba(0, 0, 0, 0.85);
          background-color: transparent;

          h2,
          a {
            color: rgba(0, 0, 0, 0.85);
          }
        }

        &-light &-bottom-container {
          border-top-color: #e8e8e8;
        }

        &-light &-item-separator,
        &-light &-item-description {
          color: rgba(0, 0, 0, 0.45);
        }
      }

      `,
                  ` {
        .`,
                  ` {
          text-align: center;

          &-container {
            padding: 40px 0;
          }

          &-columns {
            display: block;
          }

          &-column {
            display: block;
            margin-bottom: 40px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    `,
                ])),
              Te.colorTextSecondary,
              Te.colorBgLayout,
              Le,
              Te.colorTextTertiary,
              Te.colorLinkHover,
              Le,
              Te.contentMaxWidth,
              ie ? '0' : '60px 0 20px',
              Te.colorText,
              ie ? 'transparent' : Te.colorBorderSecondary,
              fe.mobile,
              Le,
            ),
          }
        }),
        ce = o(58801),
        se = function (ie) {
          var le = ie.columns,
            fe = ie.bottom,
            Te = ie.theme,
            Le = !le || (le == null ? void 0 : le.length) === 0,
            ve = B(Le),
            xe = ve.styles
          return (0, ce.jsx)('div', {
            className: xe.container,
            children: (0, ce.jsx)(I, { theme: Te, className: xe.footer, columns: le, bottom: fe }),
          })
        },
        J = se,
        Ee = o(17852),
        Ce = o(34559),
        j = o(21332),
        V = o(7618),
        q = o(99134),
        be = o(94661),
        Q = o(92253),
        te = o(87343),
        _ = function (ie) {
          var le = ie.github,
            fe = {
              title: '\u76F8\u5173\u8D44\u6E90',
              items: [
                { title: 'Ant Design', url: 'https://ant.design', openExternal: !0 },
                { title: 'Ant Design Pro', url: 'https://pro.ant.design', openExternal: !0 },
                { title: 'Ant Design Pro Components', url: 'https://procomponents.ant.design', openExternal: !0 },
                {
                  title: 'Umi',
                  description: 'React \u5E94\u7528\u5F00\u53D1\u6846\u67B6',
                  url: 'https://umijs.org',
                  openExternal: !0,
                },
                {
                  title: 'Dumi',
                  description: '\u7EC4\u4EF6/\u6587\u6863\u7814\u53D1\u5DE5\u5177',
                  url: 'https://d.umijs.org',
                  openExternal: !0,
                },
                {
                  title: 'qiankun',
                  description: '\u5FAE\u524D\u7AEF\u6846\u67B6',
                  url: 'https://qiankun.umijs.org',
                  openExternal: !0,
                },
              ],
            },
            Te = {
              title: '\u793E\u533A',
              items: [
                {
                  icon: (0, ce.jsx)(Ce.Z, {}),
                  title: 'Medium',
                  url: 'http://medium.com/ant-design/',
                  openExternal: !0,
                },
                {
                  icon: (0, ce.jsx)(j.Z, { style: { color: '#1DA1F2' } }),
                  title: 'Twitter',
                  url: 'http://twitter.com/antdesignui',
                  openExternal: !0,
                },
                {
                  icon: (0, ce.jsx)('img', {
                    src: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
                    alt: 'yuque',
                  }),
                  title: 'Ant Design \u8BED\u96C0\u4E13\u680F',
                  url: 'https://yuque.com/ant-design/ant-design',
                  openExternal: !0,
                },
                {
                  icon: (0, ce.jsx)(V.Z, { style: { color: '#056de8' } }),
                  title: 'Ant Design \u77E5\u4E4E\u4E13\u680F',
                  url: 'https://www.zhihu.com/column/c_1564262000561106944',
                  openExternal: !0,
                },
                {
                  icon: (0, ce.jsx)(V.Z, { style: { color: '#056de8' } }),
                  title: '\u4F53\u9A8C\u79D1\u6280\u4E13\u680F',
                  url: 'http://zhuanlan.zhihu.com/xtech',
                  openExternal: !0,
                },
                {
                  icon: (0, ce.jsx)('img', {
                    src: 'https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png',
                    alt: 'seeconf',
                  }),
                  title: 'SEE Conf',
                  description: 'SEE Conf-\u8682\u8681\u4F53\u9A8C\u79D1\u6280\u5927\u4F1A',
                  url: 'https://seeconf.antfin.com/',
                  openExternal: !0,
                },
              ],
            },
            Le = {
              icon: (0, ce.jsx)('img', {
                src: 'https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg',
                alt: 'more products',
              }),
              title: '\u66F4\u591A\u4EA7\u54C1',
              items: [
                {
                  icon: (0, ce.jsx)('img', {
                    src: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
                    alt: 'yuque',
                  }),
                  title: '\u8BED\u96C0',
                  url: 'https://yuque.com',
                  description: '\u77E5\u8BC6\u521B\u4F5C\u4E0E\u5206\u4EAB\u5DE5\u5177',
                  openExternal: !0,
                },
                {
                  icon: (0, ce.jsx)('img', {
                    src: 'https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png',
                    alt: 'AntV',
                  }),
                  title: 'AntV',
                  url: 'https://antv.vision',
                  description: '\u6570\u636E\u53EF\u89C6\u5316\u89E3\u51B3\u65B9\u6848',
                  openExternal: !0,
                },
                {
                  icon: (0, ce.jsx)('img', { src: 'https://www.eggjs.org/logo.svg', alt: 'Egg' }),
                  title: 'Egg',
                  url: 'https://eggjs.org',
                  description: '\u4F01\u4E1A\u7EA7 Node.js \u6846\u67B6',
                  openExternal: !0,
                },
                {
                  icon: (0, ce.jsx)('img', {
                    src: 'https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico',
                    alt: 'kitchen',
                  }),
                  title: 'Kitchen',
                  description: 'Sketch \u5DE5\u5177\u96C6',
                  url: 'https://kitchen.alipay.com',
                  openExternal: !0,
                },
                {
                  icon: (0, ce.jsx)('img', {
                    src: 'https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg',
                    alt: 'xtech',
                  }),
                  title: '\u8682\u8681\u4F53\u9A8C\u79D1\u6280',
                  url: 'https://xtech.antfin.com/',
                  openExternal: !0,
                },
              ],
            },
            ve = {
              title: '\u5E2E\u52A9',
              items: [
                le ? { icon: (0, ce.jsx)(q.Z, {}), title: 'GitHub', url: le, openExternal: !0 } : void 0,
                {
                  icon: (0, ce.jsx)(be.Z, {}),
                  title: '\u66F4\u65B0\u65E5\u5FD7',
                  url: '/changelog',
                  LinkComponent: te.rU,
                },
                le
                  ? {
                      icon: (0, ce.jsx)(Q.Z, {}),
                      title: '\u8BA8\u8BBA',
                      url: ''.concat(le, '/issues'),
                      openExternal: !0,
                    }
                  : void 0,
              ].filter(Boolean),
            }
          return [fe, Te, ve, Le]
        },
        re,
        oe,
        ke = (0, $.kc)(function (we) {
          var ie = we.css,
            le = we.responsive,
            fe = we.token,
            Te = 'rc-footer'
          return {
            container: ie(
              re ||
                (re = (0, U.Z)([
                  `
      grid-area: footer;
      border-top: 1px solid `,
                  `;
      color: `,
                  `;
      text-align: center;
      align-self: stretch;

      `,
                  ` {
        border: none;
        flex-direction: column;
      }
    `,
                ])),
              fe.colorSplit,
              fe.colorTextDescription,
              le.mobile,
            ),
            footer: ie(
              oe ||
                (oe = (0, U.Z)([
                  `
      color: `,
                  `;
      font-size: 14px;
      line-height: 1.5;
      background-color: `,
                  `;

      &.`,
                  ` {
        a {
          color: `,
                  `;
          text-decoration: none;
          transition: all 0.3s;

          &:hover {
            color: `,
                  `;
          }
        }
      }

      .`,
                  ` {
        &-container {
          width: 100%;
          max-width: `,
                  `px;
          margin: auto;
          padding: 60px 0 20px;
        }

        &-columns {
          display: flex;
          justify-content: space-around;
        }

        &-column {
          //margin-bottom: 60px;

          h2 {
            position: relative;
            margin: 0 auto;
            color: `,
                  `;
            font-weight: 500;
            font-size: 16px;
          }

          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 22px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.5em;

            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }
        }

        &-item {
          margin: 12px 0;

          &-icon {
            position: relative;
            top: -1px;
            display: inline-block;
            width: 16px;
            text-align: center;
            vertical-align: middle;
            margin-inline-end: 0.4em;

            > span,
            > svg,
            img {
              display: block;
              width: 100%;
            }
          }

          &-separator {
            margin: 0 0.3em;
          }
        }

        &-bottom {
          &-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 0;
            font-size: 16px;
            line-height: 32px;
            text-align: center;
            border-top: 1px solid `,
                  `;
          }
        }

        &-light {
          color: rgba(0, 0, 0, 0.85);
          background-color: transparent;

          h2,
          a {
            color: rgba(0, 0, 0, 0.85);
          }
        }

        &-light &-bottom-container {
          border-top-color: #e8e8e8;
        }

        &-light &-item-separator,
        &-light &-item-description {
          color: rgba(0, 0, 0, 0.45);
        }
      }

      `,
                  ` {
        .`,
                  ` {
          text-align: center;

          &-container {
            padding: 40px 0;
          }

          &-columns {
            display: block;
          }

          &-column {
            display: block;
            margin-bottom: 40px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    `,
                ])),
              fe.colorTextSecondary,
              fe.colorBgLayout,
              Te,
              fe.colorTextTertiary,
              fe.colorLinkHover,
              Te,
              fe.contentMaxWidth,
              fe.colorText,
              fe.colorBorderSecondary,
              le.mobile,
              Te,
            ),
          }
        }),
        he = function () {
          var ie = (0, Ee.H)(function (Ge) {
              return Ge.siteData
            }),
            le = ie.themeConfig,
            fe = ie.pkg,
            Te = ke(),
            Le = Te.styles,
            ve = Te.theme,
            xe = (0, f.F)(),
            ne = xe.mobile
          if (!le.footer) return null
          var Z = le.footerConfig,
            Ze = (Z == null ? void 0 : Z.columns) === !1 ? void 0 : _({ github: le.github || fe.homepage }),
            Fe = (Z == null ? void 0 : Z.bottom) || le.footer
          return (0, ce.jsx)(J, {
            theme: (Z == null ? void 0 : Z.theme) || ve.appearance,
            columns: Ze,
            bottom: ne
              ? (0, ce.jsxs)(m.Z, {
                  className: Le.container,
                  children: [
                    'Copyright \xA9 2022-',
                    new Date().getFullYear(),
                    (0, ce.jsx)(x.D, { align: 'center', horizontal: !0, dangerouslySetInnerHTML: { __html: Fe } }),
                  ],
                })
              : (0, ce.jsxs)(m.Z, {
                  horizontal: !0,
                  children: [
                    'Copyright \xA9 2022-',
                    new Date().getFullYear(),
                    ' ',
                    (0, ce.jsx)(c.Z, { type: 'vertical' }),
                    (0, ce.jsx)('span', { dangerouslySetInnerHTML: { __html: Fe } }),
                  ],
                }),
          })
        },
        Ae = he
    },
    39761: function (E, a, o) {
      'use strict'
      o.d(a, {
        X: function () {
          return C
        },
      })
      var c = o(76599),
        f = o(97210),
        m,
        x,
        w,
        k,
        C = (0, f.kc)(function (g) {
          var p = g.css,
            u = g.responsive,
            v = g.token
          return {
            header: p(
              m ||
                (m = (0, c.Z)([
                  `
    top: 0;
    position: sticky;
    background-color: transparent;
    backdrop-filter: blur(6px);
    z-index: `,
                  `;
    border-bottom: 1px solid `,
                  `;

    grid-area: head;
    align-self: stretch;

    `,
                  ` {
      background: `,
                  `;
    }
  `,
                ])),
              v.zIndexPopupBase - 50,
              v.colorSplit,
              u.mobile,
              v.colorBgContainer,
            ),
            content: p(
              x ||
                (x = (0, c.Z)([
                  `
    padding: 0 24px;
    height: 64px;

    `,
                  ` {
      padding: 0 12px;
    }
  `,
                ])),
              u.mobile,
            ),
            left: p(w || (w = (0, c.Z)(['']))),
            right: p(
              k ||
                (k = (0, c.Z)([
                  `
    flex: 1;
    display: flex;
    justify-content: space-between;

    &-aside {
      display: flex;
      align-items: center;

      `,
                  ` {
        margin: 8px 16px;
        padding-top: 24px;
        justify-content: center;
        border-top: 1px solid `,
                  `;
      }
    }
  `,
                ])),
              u.mobile,
              v.colorBorder,
            ),
          }
        })
    },
    94244: function (E, a, o) {
      'use strict'
      var c = o(91600),
        f = o(20476),
        m = o(87343),
        x = o(57689),
        w = o(69023),
        k = o(17852),
        C = o(58801)
      function g(P) {
        var F = P.pathname,
          I = P.current,
          U = P.target,
          $ =
            'base' in I
              ? F.replace(I.base.replace(/\/$/, ''), '') || '/'
              : F.replace(new RegExp(''.concat(I.suffix, '$')), '')
        return 'base' in U
          ? ''
              .concat(U.base.replace(/\/$/, ''))
              .concat($)
              .replace(/([^/])\/$/, '$1')
          : ''.concat($).concat(U.suffix)
      }
      var p = {
          'zh-CN': '\u{1F1E8}\u{1F1F3}',
          'en-US': '\u{1F1FA}\u{1F1F8}',
          'jp-JP': '\u{1F1EF}\u{1F1F5}',
          'ko-KR': '\u{1F1F0}\u{1F1F7}',
          'ru-RU': '\u{1F1F7}\u{1F1FA}',
          'es-ES': '\u{1F1EA}\u{1F1F8}',
          'fr-FR': '\u{1F1EB}\u{1F1F7}',
          'de-DE': '\u{1F1E9}\u{1F1EA}',
          'pt-BR': '\u{1F1E7}\u{1F1F7}',
          'it-IT': '\u{1F1EE}\u{1F1F9}',
          'tr-TR': '\u{1F1F9}\u{1F1F7}',
          'vi-VN': '\u{1F1FB}\u{1F1F3}',
        },
        u = { 'zh-CN': '\u4E2D', 'en-US': 'EN' },
        v = function (F) {
          var I = F.locale,
            U = F.current,
            $ = (0, m.TH)(),
            X = $.pathname,
            ue = (0, x.useState)(function () {
              return g({ pathname: X, current: U, target: I })
            }),
            B = (0, c.Z)(ue, 2),
            ce = B[0],
            se = B[1]
          return (
            (0, x.useEffect)(
              function () {
                se(g({ pathname: X, current: U, target: I }))
              },
              [X, U.id, I.id],
            ),
            (0, C.jsx)(m.rU, {
              to: ce,
              children: (0, C.jsx)(f.ZP, {
                style: { minWidth: 34, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' },
                children: u[I.id],
              }),
            })
          )
        },
        H = function () {
          var F = (0, k.H)(function (U) {
              return U.siteData.locales
            }),
            I = (0, k.H)(function (U) {
              return U.locale
            })
          return F.length <= 1
            ? null
            : F.length > 2
              ? (0, C.jsx)(w.Z, {
                  value: F.findIndex(function (U) {
                    return U.id === I.id
                  }),
                  onChange: function ($) {
                    console.log(g({ pathname: location.pathname, current: I, target: F[$] })),
                      m.m8.push(g({ pathname: location.pathname, current: I, target: F[$] }))
                  },
                  options: F.map(function (U) {
                    return { value: U.id, label: u[U.id] }
                  }),
                  renderItem: function ($, X) {
                    return ''.concat(p[F[X].id], ' ').concat(F[X].name)
                  },
                  style: {
                    height: 32,
                    minWidth: 32,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                })
              : (0, C.jsx)(v, {
                  locale: F.find(function (U) {
                    var $ = U.id
                    return $ !== I.id
                  }),
                  current: I,
                })
        }
      a.Z = (0, x.memo)(H)
    },
    94839: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return P
        },
      })
      var c = o(22725),
        f = o(87343),
        m = o(3341),
        x = o.n(m),
        w = o(57689),
        k = o(17852),
        C = o(76599),
        g = o(97210),
        p,
        u = (0, g.kc)(function (F) {
          var I = F.css,
            U = F.responsive,
            $ = F.token
          return I(
            p ||
              (p = (0, C.Z)([
                `
    display: inline-flex;
    align-items: center;
    font-family: AliPuHui, `,
                `;
    color: `,
                `;
    font-size: 22px;
    line-height: 1;
    font-weight: 500;
    text-decoration: none;

    `,
                ` {
      font-size: 18px;
    }

    img {
      margin-inline-end: 10px;
    }
  `,
              ])),
            $.fontFamily,
            $.colorText,
            U.mobile,
          )
        }),
        v = o(58801),
        H = function () {
          var I = (0, k.H)(function (se) {
              return se.siteData.themeConfig
            }, x()),
            U = (0, k.H)(function (se) {
              return se.locale
            }, x()),
            $ = u(),
            X = $.styles,
            ue = $.cx,
            B = (0, c.F)(),
            ce = B.mobile
          return (
            I &&
            (0, v.jsxs)(f.rU, {
              className: ue(X),
              to: 'base' in U ? U.base : '/',
              children: [!!I.logo && (0, v.jsx)('img', { src: I.logo, alt: I.name, height: ce ? 32 : 40 }), I.name],
            })
          )
        },
        P = (0, w.memo)(H)
    },
    2622: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return U
        },
      })
      var c = o(76599),
        f = o(7033),
        m = o(97210),
        x = o(87343),
        w = o(57689),
        k = function () {
          return w.createElement(w.Fragment, null)
        },
        C = k,
        g = o(86335),
        p = o(17852),
        u = o(74491),
        v = o(58801),
        H,
        P,
        F = (0, m.kc)(function ($) {
          var X = $.css,
            ue = $.responsive,
            B = $.token,
            ce = $.stylish,
            se = $.prefixCls,
            J = '.'.concat(se, '-tabs'),
            Ee = 16,
            Ce = 6
          return {
            tabs: X(
              H ||
                (H = (0, c.Z)([
                  `
      `,
                  '-tab + ',
                  `-tab {
        margin: `,
                  `px 4px !important;
        padding: 0 12px !important;
      }

      `,
                  `-tab {
        color: `,
                  `;
        transition: background-color 100ms ease-out;

        &:first-child {
          margin: `,
                  'px 4px ',
                  `px 0;
          padding: `,
                  `px 12px !important;
        }

        &:hover {
          color: `,
                  ` !important;
          background: `,
                  `;
          border-radius: `,
                  `px;
        }
      }

      `,
                  `-nav {
        margin-bottom: 0;
      }

      `,
                  ` {
        display: none;
      }
    `,
                ])),
              J,
              J,
              Ee,
              J,
              B.colorTextSecondary,
              Ee,
              Ee,
              Ce,
              B.colorText,
              B.colorFillTertiary,
              B.borderRadius,
              J,
              ue.mobile,
            ),
            link: X(
              P ||
                (P = (0, c.Z)([
                  `
      `,
                  `
    `,
                ])),
              ce.resetLinkColor,
            ),
          }
        }),
        I = function () {
          var X = F(),
            ue = X.styles,
            B = (0, p.H)(function (se) {
              return se.navData
            }, g.X),
            ce = (0, p.H)(u.K1)
          return (0, v.jsxs)(v.Fragment, {
            children: [
              (0, v.jsx)(f.Z, {
                onChange: function (J) {
                  var Ee,
                    Ce =
                      (Ee = B.find(function (j) {
                        return j.activePath === J || j.link === J
                      })) === null || Ee === void 0
                        ? void 0
                        : Ee.link
                  Ce && x.m8.push(Ce)
                },
                activeKey: ce,
                className: ue.tabs,
                items: B.map(function (se) {
                  return {
                    label: (0, v.jsx)(x.rU, { className: ue.link, to: se.link, children: se.title }),
                    key: se.activePath || se.link,
                  }
                }),
              }),
              (0, v.jsx)(C, {}),
            ],
          })
        },
        U = (0, w.memo)(I)
    },
    47553: function (E, a, o) {
      'use strict'
      o.d(a, {
        I: function () {
          return x
        },
      })
      var c = o(87343),
        f = o(57689),
        m = o(58801),
        x = (0, f.forwardRef)(function (w, k) {
          var C = (0, c.YB)(),
            g = (0, f.useRef)(!1),
            p = (0, f.useRef)(null)
          return (
            (0, f.useImperativeHandle)(k, function () {
              return p.current
            }),
            (0, m.jsx)('input', {
              className: w.className,
              onCompositionStart: function () {
                return (g.current = !0)
              },
              onCompositionEnd: function (v) {
                ;(g.current = !1), w.onChange(v.currentTarget.value)
              },
              onFocus: w.onFocus,
              onBlur: w.onBlur,
              onKeyDown: function (v) {
                ;['ArrowDown', 'ArrowUp'].includes(v.key) && v.preventDefault(),
                  v.key === 'Escape' && !g.current && v.currentTarget.blur()
              },
              onChange: function (v) {
                setTimeout(function () {
                  g.current || w.onChange(v.target.value)
                }, 1)
              },
              placeholder: C.formatMessage({ id: 'header.search.placeholder' }),
              ref: p,
            })
          )
        })
    },
    50957: function (E, a, o) {
      'use strict'
      o.d(a, {
        z: function () {
          return p
        },
      })
      var c = o(57689),
        f = o(76599),
        m = o(97210),
        x,
        w,
        k,
        C = (0, m.kc)(function (u) {
          var v = u.token,
            H = u.css
          return {
            modal: H(
              x ||
                (x = (0, f.Z)([
                  `
      position: fixed;
      top: 0;
      inset-inline-start: 0;
      z-index: 1000;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
    `,
                ])),
            ),
            mask: H(
              w ||
                (w = (0, f.Z)([
                  `
      background-color: `,
                  `;
      width: 100%;
      height: 100%;
    `,
                ])),
              v.colorBgMask,
            ),
            content: H(
              k ||
                (k = (0, f.Z)([
                  `
      position: absolute;
      top: 60px;
      background-color: `,
                  `;
      width: 500px;
      padding: 12px;
      box-sizing: border-box;
      box-shadow: inset 1px 1px 0 0 hsla(0deg, 0%, 100%, 50%), 0 3px 8px 0 #555a64;
      border-radius: 8px;
      max-height: calc(100% - 120px);
      display: flex;
      flex-direction: column;
    `,
                ])),
              v.colorBgElevated,
            ),
          }
        }),
        g = o(58801),
        p = function (v) {
          var H = C(),
            P = H.styles
          return (
            (0, c.useEffect)(
              function () {
                if (v.visible) document.body.style.overflow = 'hidden'
                else {
                  var F
                  ;(document.body.style.overflow = ''), (F = v.onClose) === null || F === void 0 || F.call(v)
                }
              },
              [v.visible],
            ),
            v.visible
              ? (0, g.jsxs)('div', {
                  className: P.modal,
                  children: [
                    (0, g.jsx)('div', { className: P.mask, onClick: v.onMaskClick }),
                    (0, g.jsx)('div', { className: P.content, children: v.children }),
                  ],
                })
              : null
          )
        }
    },
    87643: function (E, a, o) {
      'use strict'
      o.d(a, {
        y: function () {
          return g
        },
      })
      var c = o(76599),
        f = o(97210),
        m,
        x,
        w,
        k,
        C,
        g = (0, f.kc)(function (p) {
          var u = p.token,
            v = p.responsive,
            H = p.css,
            P = p.cx
          return {
            container: H(
              m ||
                (m = (0, c.Z)([
                  `
      position: relative;

      // TODO: support search for mobile devices
      `,
                  ` {
        display: none;
      }
    `,
                ])),
              v.mobile,
            ),
            shortcut: P(
              'site-header-shortcut',
              H(
                x ||
                  (x = (0, c.Z)([
                    `
        position: absolute;
        top: 50%;
        inset-inline-end: 11px;
        display: inline-block;
        padding: 4px 8px;
        color: `,
                    `;
        font-size: 12px;
        line-height: 1;
        white-space: nowrap;
        background-color: `,
                    `;
        border-radius: 11px;
        border: 1px solid `,
                    `;
        transform: translateY(-50%);
        transition: all 0.3s;
        pointer-events: none;

        `,
                    ` {
          display: none;
        }
      `,
                  ])),
                u.colorTextDescription,
                u.colorFillSecondary,
                u.colorBorderSecondary,
                v.mobile,
              ),
            ),
            popover: H(
              w ||
                (w = (0, c.Z)([
                  `
      position: absolute;
      top: 100%;
      inset-inline-end: 0;
      display: flex;
      flex-direction: column;
      width: 540px;
      max-height: 460px;
      margin-top: 18px;
      background-color: `,
                  `;
      border-radius: 8px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 20%);

      &::before {
        content: '';
        position: absolute;
        bottom: 100%;
        inset-inline-end: 100px;
        display: inline-block;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-bottom-color: #fff;
      }

      > section {
        flex: 1;
        min-height: 60px;
        overflow: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        border-radius: inherit;
      }
    `,
                ])),
              u.colorBgElevated,
            ),
            svg: P(
              H(
                k ||
                  (k = (0, c.Z)([
                    `
        position: absolute;
        top: 50%;
        margin-top: 1px;
        inset-inline-start: 16px;
        width: 16px;
        color: `,
                    `;
        transform: translateY(-50%);
      `,
                  ])),
                u.colorTextPlaceholder,
              ),
            ),
            input: H(
              C ||
                (C = (0, c.Z)([
                  `
      width: 280px;
      height: `,
                  `px;
      padding: 0;
      padding-inline-start: 40px;
      padding-inline-end: 12px;
      color: `,
                  `;
      font-size: 14px;
      border: 1px solid `,
                  `;
      border-radius: 20px;
      box-sizing: border-box;
      outline: none;
      transition: all 0.3s;
      background-color: transparent;

      &:focus {
        border-color: `,
                  `;
        background: `,
                  `;

        ~ .site-header-shortcut {
          opacity: 0;
        }
      }

      &::-webkit-input-placeholder {
        color: `,
                  `;
      }
    `,
                ])),
              u.controlHeightLG,
              u.colorTextSecondary,
              u.colorBorder,
              u.colorBorderSecondary,
              u.colorBgElevated,
              u.colorTextPlaceholder,
            ),
          }
        })
    },
    97805: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return H
        },
      })
      var c = o(87343),
        f = o(3341),
        m = o.n(f),
        x = o(57689),
        w = o(17852),
        k = o(76599),
        C = o(97210),
        g,
        p = (0, C.kc)(function (P) {
          var F = P.css,
            I = P.token
          return {
            sidebar: F(
              g ||
                (g = (0, k.Z)([
                  `
    grid-area: sidebar;
    overflow: auto;
    position: sticky;
    top: `,
                  `px;
    max-height: calc(100vh - `,
                  `px);

    padding-top: 20px;
    padding-bottom: 24px;
    padding-inline: 16px;
    border-right: 1px solid `,
                  `;

    > dl {
      margin: 0;
      padding: 0;
      line-height: 1;

      > dt {
        margin: 8px 0;
        color: `,
                  `;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: uppercase;
      }

      > dd {
        margin: 0;
        padding: 2px 0;

        > a {
          padding: 6px 12px;
          border-radius: 6px;
          display: block;
          font-size: `,
                  `px;
          line-height: `,
                  `;
          text-decoration: none;
          transition: all 0.1s;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          color: `,
                  `;

          &:hover {
            color: `,
                  `;
            background: `,
                  `;
          }

          &.active {
            color: `,
                  `;
            background: `,
                  `;

            &:hover {
              color: `,
                  `;
              background: `,
                  `;
            }
          }
        }
      }

      // divider line & gap
      + dl {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px dashed `,
                  `;
      }
    }
  `,
                ])),
              I.headerHeight,
              I.headerHeight,
              I.colorSplit,
              I.colorText,
              I.fontSize,
              I.lineHeight,
              I.colorTextSecondary,
              I.colorText,
              I.colorFillTertiary,
              I.colorPrimaryText,
              I.colorPrimaryBg,
              I.colorPrimaryTextHover,
              I.colorPrimaryBgHover,
              I.colorBorder,
            ),
          }
        }),
        u = o(58801),
        v = function () {
          var F = (0, w.H)(function (X) {
              return X.sidebar
            }, m()),
            I = p(),
            U = I.styles,
            $ = !F || F.length === 0
          return $
            ? null
            : (0, u.jsx)('div', {
                className: U.sidebar,
                children: F.map(function (X, ue) {
                  return (0, u.jsxs)(
                    'dl',
                    {
                      children: [
                        X.title && (0, u.jsx)('dt', { children: X.title }),
                        X.children.map(function (B) {
                          return (0, u.jsx)(
                            'dd',
                            { children: (0, u.jsx)(c.OL, { to: B.link, title: B.title, end: !0, children: B.title }) },
                            B.link,
                          )
                        }),
                      ],
                    },
                    String(ue),
                  )
                }),
              })
        },
        H = (0, x.memo)(v)
    },
    36441: function (E, a, o) {
      'use strict'
      o.d(a, {
        UQ: function () {
          return m
        },
        Yo: function () {
          return f
        },
      })
      var c = o(49544),
        f = function (w) {
          var k,
            C = w.routeMeta.frontmatter
          if (w.siteData.themeConfig.apiHeader === !1 || C.apiHeader === !1) return !1
          if (C.apiHeader) return !0
          var g = ['/api', '/components'].concat(
            (0, c.Z)(((k = w.siteData.themeConfig.apiHeader) === null || k === void 0 ? void 0 : k.match) || []),
          )
          return g.some(function (p) {
            return w.location.pathname.startsWith(p)
          })
        },
        m = function (w) {
          var k,
            C,
            g,
            p,
            u = w.siteData.themeConfig.github,
            v = w.routeMeta.frontmatter,
            H = w.locale.id,
            P = function (j) {
              return j
                .replace('{github}', u)
                .replace('{atomId}', v.atomId || '')
                .replace('{title}', v.title)
                .replace('{locale}', H)
            },
            F = function (j) {
              return j === !1 ? !1 : typeof j == 'string'
            },
            I = w.siteData.themeConfig.apiHeader || {},
            U = I.pkg,
            $ = U === void 0 ? w.siteData.pkg.name : U,
            X = I.sourceUrl,
            ue = I.docUrl,
            B = ((k = v.apiHeader) === null || k === void 0 ? void 0 : k.pkg) || $,
            ce = v.atomId || v.title,
            se = ((C = v.apiHeader) === null || C === void 0 ? void 0 : C.defaultImport) || !1,
            J = ((g = v.apiHeader) === null || g === void 0 ? void 0 : g.sourceUrl) || (F(X) ? P(X) : void 0),
            Ee = ((p = v.apiHeader) === null || p === void 0 ? void 0 : p.docUrl) || (F(ue) ? P(ue) : void 0)
          return {
            title: v.title,
            description: v.description,
            pkg: B,
            defaultImport: se,
            componentName: ce,
            sourceUrl: J,
            docUrl: Ee,
          }
        }
    },
    69470: function (E, a, o) {
      'use strict'
      o.d(a, {
        D$: function () {
          return c
        },
        S2: function () {
          return x
        },
        SL: function () {
          return k
        },
        Vd: function () {
          return w
        },
        aH: function () {
          return m
        },
      })
      var c = function (g) {
          return !!g.routeMeta.frontmatter.hero
        },
        f = function (g, p) {
          if (p) return p[g.locale.id] ? p[g.locale.id] : p
        },
        m = function (g) {
          var p, u
          return (
            ((p = g.routeMeta.frontmatter.hero) === null || p === void 0 ? void 0 : p.title) ||
            ((u = f(g, g.siteData.themeConfig.hero)) === null || u === void 0 ? void 0 : u.title) ||
            f(g, g.siteData.themeConfig.title) ||
            g.siteData.themeConfig.name
          )
        },
        x = function (g) {
          var p, u
          return (
            ((p = g.routeMeta.frontmatter.hero) === null || p === void 0 ? void 0 : p.description) ||
            ((u = f(g, g.siteData.themeConfig.hero)) === null || u === void 0 ? void 0 : u.description) ||
            f(g, g.siteData.themeConfig.description)
          )
        },
        w = function (g) {
          var p, u
          return (
            ((p = g.routeMeta.frontmatter.hero) === null || p === void 0 ? void 0 : p.actions) ||
            ((u = f(g, g.siteData.themeConfig.hero)) === null || u === void 0 ? void 0 : u.actions) ||
            f(g, g.siteData.themeConfig.actions)
          )
        },
        k = function (g) {
          var p
          return c(g)
            ? ((p = f(g, g.siteData.themeConfig.hero)) === null || p === void 0 ? void 0 : p.features) ||
                f(g, g.siteData.themeConfig.features) ||
                g.routeMeta.frontmatter.features ||
                []
            : []
        }
    },
    74491: function (E, a, o) {
      'use strict'
      o.d(a, {
        K1: function () {
          return w
        },
        TG: function () {
          return x
        },
        TL: function () {
          return k
        },
        e9: function () {
          return g
        },
      })
      var c = o(24572)
      function f(p, u) {
        var v = Object.keys(p)
        if (Object.getOwnPropertySymbols) {
          var H = Object.getOwnPropertySymbols(p)
          u &&
            (H = H.filter(function (P) {
              return Object.getOwnPropertyDescriptor(p, P).enumerable
            })),
            v.push.apply(v, H)
        }
        return v
      }
      function m(p) {
        for (var u = 1; u < arguments.length; u++) {
          var v = arguments[u] != null ? arguments[u] : {}
          u % 2
            ? f(Object(v), !0).forEach(function (H) {
                ;(0, c.Z)(p, H, v[H])
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(p, Object.getOwnPropertyDescriptors(v))
              : f(Object(v)).forEach(function (H) {
                  Object.defineProperty(p, H, Object.getOwnPropertyDescriptor(v, H))
                })
        }
        return p
      }
      var x = function (u) {
          return u.siteData.themeConfig.name
        },
        w = function (u) {
          if (u.location.pathname === '/') return '/'
          var v = u.navData
            .filter(function (H) {
              return H.link !== '/'
            })
            .find(function (H) {
              return u.location.pathname.startsWith(H.activePath || H.link)
            })
          return (v == null ? void 0 : v.activePath) || (v == null ? void 0 : v.link) || ''
        },
        k = function (u) {
          return u.routeMeta.toc.reduce(function (v, H) {
            var P = function (U) {
              if (
                !u.routeMeta.frontmatter.tocDepth ||
                (typeof u.routeMeta.frontmatter.tocDepth == 'number' && u.routeMeta.frontmatter.tocDepth > U - 1)
              )
                return !0
            }
            if (H.depth === 2 && P(2)) v.push(m({}, H))
            else if (H.depth === 3 && P(3)) {
              var F = v[v.length - 1]
              F && ((F.children = F.children || []), F.children.push(m({}, H)))
            }
            return v
          }, [])
        },
        C = function (u) {
          var v
          return (
            ((v = u.sidebar) === null || v === void 0
              ? void 0
              : v
                  .map(function (H) {
                    return H.children
                  })
                  .flat()) || []
          )
        },
        g = function (u) {
          var v = C(u),
            H = u.location.pathname,
            P = v.findIndex(function (F) {
              return F.link === H
            })
          return { prev: v[P - 1], currentIndex: P, next: v[P + 1] }
        }
    },
    29085: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return Ce
        },
      })
      var c = o(57689),
        f = Object.defineProperty,
        m = Object.getOwnPropertySymbols,
        x = Object.prototype.hasOwnProperty,
        w = Object.prototype.propertyIsEnumerable,
        k = (j, V, q) => (V in j ? f(j, V, { enumerable: !0, configurable: !0, writable: !0, value: q }) : (j[V] = q)),
        C = (j, V) => {
          for (var q in V || (V = {})) x.call(V, q) && k(j, q, V[q])
          if (m) for (var q of m(V)) w.call(V, q) && k(j, q, V[q])
          return j
        }
      const g = (j) =>
        c.createElement(
          'svg',
          C({ viewBox: '0 0 1024 1024' }, j),
          c.createElement('path', {
            d: 'm885.2 446.3-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0 0 60.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z',
          }),
        )
      var p =
          'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0Ij48cGF0aCBkPSJtODg1LjIgNDQ2LjMtLjItLjgtMTEyLjItMjg1LjFjLTUtMTYuMS0xOS45LTI3LjItMzYuOC0yNy4ySDI4MS4yYy0xNyAwLTMyLjEgMTEuMy0zNi45IDI3LjZMMTM5LjQgNDQzbC0uMy43LS4yLjhjLTEuMyA0LjktMS43IDkuOS0xIDE0LjgtLjEgMS42LS4yIDMuMi0uMiA0LjhWODMwYTYwLjkgNjAuOSAwIDAgMCA2MC44IDYwLjhoNjI3LjJjMzMuNSAwIDYwLjgtMjcuMyA2MC45LTYwLjhWNDY0LjFjMC0xLjMgMC0yLjYtLjEtMy43LjQtNC45IDAtOS42LTEuMy0xNC4xem0tMjk1LjgtNDMtLjMgMTUuN2MtLjggNDQuOS0zMS44IDc1LjEtNzcuMSA3NS4xLTIyLjEgMC00MS4xLTcuMS01NC44LTIwLjZTNDM2IDQ0MS4yIDQzNS42IDQxOWwtLjMtMTUuN0gyMjkuNUwzMDkgMjEwaDM5OS4ybDgxLjcgMTkzLjNINTg5LjR6bS0zNzUgNzYuOGgxNTcuM2MyNC4zIDU3LjEgNzYgOTAuOCAxNDAuNCA5MC44IDMzLjcgMCA2NS05LjQgOTAuMy0yNy4yIDIyLjItMTUuNiAzOS41LTM3LjQgNTAuNy02My42aDE1Ni41VjgxNEgyMTQuNFY0ODAuMXoiLz48L3N2Zz4=',
        u = o(87343)
      function v(j, V) {
        return U(j) || I(j, V) || P(j, V) || H()
      }
      function H() {
        throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
      }
      function P(j, V) {
        if (j) {
          if (typeof j == 'string') return F(j, V)
          var q = Object.prototype.toString.call(j).slice(8, -1)
          if ((q === 'Object' && j.constructor && (q = j.constructor.name), q === 'Map' || q === 'Set'))
            return Array.from(j)
          if (q === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(q)) return F(j, V)
        }
      }
      function F(j, V) {
        ;(V == null || V > j.length) && (V = j.length)
        for (var q = 0, be = new Array(V); q < V; q++) be[q] = j[q]
        return be
      }
      function I(j, V) {
        var q = j == null ? null : (typeof Symbol != 'undefined' && j[Symbol.iterator]) || j['@@iterator']
        if (q != null) {
          var be = [],
            Q = !0,
            te = !1,
            _,
            re
          try {
            for (q = q.call(j); !(Q = (_ = q.next()).done) && (be.push(_.value), !(V && be.length === V)); Q = !0);
          } catch (oe) {
            ;(te = !0), (re = oe)
          } finally {
            try {
              !Q && q.return != null && q.return()
            } finally {
              if (te) throw re
            }
          }
          return be
        }
      }
      function U(j) {
        if (Array.isArray(j)) return j
      }
      var $ = function () {
          return c.createElement(
            'svg',
            { viewBox: '0 0 32 32', xmlns: 'http://www.w3.org/2000/svg' },
            c.createElement('path', {
              d: 'M5.333 10.667h21.334c.889 0 1.333.444 1.333 1.333s-.444 1.333-1.333 1.333H5.333C4.444 13.333 4 12.89 4 12s.444-1.333 1.333-1.333Z',
            }),
            c.createElement('path', {
              d: 'M13.207 2.667h.126a1.206 1.206 0 0 1 1.2 1.326l-2.413 24.14a1.333 1.333 0 0 1-1.327 1.2h-.126a1.206 1.206 0 0 1-1.2-1.326l2.413-24.14c.068-.682.642-1.2 1.327-1.2Zm8 0h.126a1.206 1.206 0 0 1 1.2 1.326l-2.413 24.14a1.333 1.333 0 0 1-1.327 1.2h-.126a1.206 1.206 0 0 1-1.2-1.326l2.413-24.14c.068-.682.642-1.2 1.327-1.2Z',
            }),
            c.createElement('path', {
              d: 'M5.333 18.667h21.334c.889 0 1.333.444 1.333 1.333s-.444 1.333-1.333 1.333H5.333C4.444 21.333 4 20.89 4 20s.444-1.333 1.333-1.333Z',
            }),
          )
        },
        X = function () {
          return c.createElement(
            'svg',
            { viewBox: '0 0 32 32', xmlns: 'http://www.w3.org/2000/svg' },
            c.createElement('path', {
              d: 'M9.402 0h14.78L30 6.16V24.5c0 1.933-1.71 3.5-3.589 3.5H9.401C7.524 28 6 26.433 6 24.5v-21C6 1.567 7.523 0 9.402 0ZM23 2v4.183c0 .451.366.817.817.817H28l-5-5Zm3.333 24c.92 0 1.667-.768 1.667-1.714V8.857h-5c-.92 0-1.667-.767-1.667-1.714V2H9.667C8.747 2 8 2.768 8 3.714v20.572C8 25.232 8.746 26 9.667 26h16.666Z',
            }),
          )
        },
        ue = function () {
          return c.createElement(
            'svg',
            { viewBox: '0 0 32 32', xmlns: 'http://www.w3.org/2000/svg' },
            c.createElement('path', {
              d: 'M6.12 14.589h6.628l1.52 4.004h2.485l-5.938-15.19H8.053L2.115 18.732H4.6l1.52-4.143ZM8.88 6.855c.139-.414.277-.828.415-1.38h.138c0 .138.138.414.414 1.104 0 .138.138.276.138.276 0 .138.829 2.072 2.21 5.938H6.672c1.519-3.866 2.21-5.8 2.21-5.938Zm8.148 2.348h12.705v1.933H17.029V9.203ZM2.115 20.665h27.619v1.933H2.114v-1.933Zm14.914-5.662h12.705v1.933H17.029v-1.933ZM2.115 26.327h27.619v1.933H2.114v-1.933ZM17.029 3.54h12.705v1.934H17.029V3.54Z',
            }),
          )
        },
        B = function () {
          return c.createElement(
            'svg',
            { viewBox: '0 0 32 32', xmlns: 'http://www.w3.org/2000/svg' },
            c.createElement('path', {
              d: 'M28 6h-5a5 5 0 0 0-10 0H8a2 2 0 0 0-2 2v5a5 5 0 0 0 0 10v5a2 2 0 0 0 2 2h7v-2a3 3 0 0 1 6 0v2h7a2 2 0 0 0 2-2v-7h-2a3 3 0 0 1 0-6h2V8a2 2 0 0 0-2-2Zm-5 12a5 5 0 0 0 5 5v5h-5a5 5 0 0 0-10 0H8v-7H6a3 3 0 0 1 0-6h2V8h7V6a3 3 0 0 1 6 0v2h7v5a5 5 0 0 0-5 5Z',
            }),
          )
        },
        ce = { title: $, page: X, content: ue, demo: B },
        se = function (V) {
          return c.createElement(
            c.Fragment,
            null,
            V.texts.map(function (q, be) {
              return c.createElement(
                c.Fragment,
                { key: be },
                q.highlighted ? c.createElement('mark', null, q.text) : q.text,
              )
            }),
          )
        },
        J = function (V) {
          var q = (0, c.useCallback)(
              function () {
                var re = 0,
                  oe = []
                return (
                  V.forEach(function (ke) {
                    ke.title && oe.push({ type: 'title', value: { title: ke.title } }),
                      ke.hints.forEach(function (he) {
                        oe.push({ type: 'hint', activeIndex: re++, value: he })
                      })
                  }),
                  [oe, re]
                )
              },
              [V],
            ),
            be = (0, c.useState)(q),
            Q = v(be, 2),
            te = Q[0],
            _ = Q[1]
          return (
            (0, c.useEffect)(
              function () {
                _(q)
              },
              [V],
            ),
            te
          )
        },
        Ee = function (V) {
          var q = J(V.data),
            be = v(q, 2),
            Q = be[0],
            te = be[1],
            _ = (0, c.useState)(-1),
            re = v(_, 2),
            oe = re[0],
            ke = re[1]
          return (
            (0, c.useEffect)(function () {
              var he = function (we) {
                if (we.key === 'ArrowDown') ke((oe + 1) % te)
                else if (we.key === 'ArrowUp') ke((oe + te - 1) % te)
                else if (we.key === 'Enter' && oe >= 0) {
                  var ie,
                    le = Q.find(function (fe) {
                      return fe.type === 'hint' && fe.activeIndex === oe
                    }).value
                  u.m8.push(le.link),
                    (ie = V.onItemSelect) === null || ie === void 0 || ie.call(V, le),
                    document.activeElement.blur()
                }
                ;['Escape', 'Enter'].includes(we.key) && ke(-1)
              }
              return (
                document.addEventListener('keydown', he),
                function () {
                  return document.removeEventListener('keydown', he)
                }
              )
            }),
            c.createElement(
              'div',
              {
                className: 'dumi-default-search-result',
                onMouseEnter: function () {
                  return ke(-1)
                },
                onMouseDownCapture: function (Ae) {
                  return Ae.preventDefault()
                },
                onMouseUpCapture: function () {
                  document.activeElement.blur()
                },
              },
              Boolean(V.data.length || V.loading)
                ? c.createElement(
                    'dl',
                    null,
                    Q.map(function (he, Ae) {
                      return he.type === 'title'
                        ? c.createElement('dt', { key: String(Ae) }, he.value.title)
                        : c.createElement(
                            'dd',
                            { key: String(Ae) },
                            c.createElement(
                              u.rU,
                              {
                                to: he.value.link,
                                'data-active': oe === he.activeIndex || void 0,
                                onClick: function () {
                                  var ie
                                  return (ie = V.onItemSelect) === null || ie === void 0 ? void 0 : ie.call(V, he.value)
                                },
                              },
                              c.createElement(ce[he.value.type]),
                              c.createElement('h4', null, c.createElement(se, { texts: he.value.highlightTitleTexts })),
                              c.createElement('p', null, c.createElement(se, { texts: he.value.highlightTexts })),
                            ),
                          )
                    }),
                  )
                : c.createElement(
                    'div',
                    { className: 'dumi-default-search-empty' },
                    c.createElement(g, null),
                    c.createElement(u._H, { id: 'search.not.found' }),
                  ),
            )
          )
        },
        Ce = Ee
    },
    3341: function (E) {
      'use strict'
      E.exports = function a(o, c) {
        if (o === c) return !0
        if (o && c && typeof o == 'object' && typeof c == 'object') {
          if (o.constructor !== c.constructor) return !1
          var f, m, x
          if (Array.isArray(o)) {
            if (((f = o.length), f != c.length)) return !1
            for (m = f; m-- !== 0; ) if (!a(o[m], c[m])) return !1
            return !0
          }
          if (o.constructor === RegExp) return o.source === c.source && o.flags === c.flags
          if (o.valueOf !== Object.prototype.valueOf) return o.valueOf() === c.valueOf()
          if (o.toString !== Object.prototype.toString) return o.toString() === c.toString()
          if (((x = Object.keys(o)), (f = x.length), f !== Object.keys(c).length)) return !1
          for (m = f; m-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(c, x[m])) return !1
          for (m = f; m-- !== 0; ) {
            var w = x[m]
            if (!a(o[w], c[w])) return !1
          }
          return !0
        }
        return o !== o && c !== c
      }
    },
    33124: function (E, a, o) {
      var c = o(82996),
        f = /^\s+/
      function m(x) {
        return x && x.slice(0, c(x) + 1).replace(f, '')
      }
      E.exports = m
    },
    82996: function (E) {
      var a = /\s/
      function o(c) {
        for (var f = c.length; f-- && a.test(c.charAt(f)); );
        return f
      }
      E.exports = o
    },
    66292: function (E, a, o) {
      var c = o(36838),
        f = o(76668),
        m = o(12448),
        x = 'Expected a function',
        w = Math.max,
        k = Math.min
      function C(g, p, u) {
        var v,
          H,
          P,
          F,
          I,
          U,
          $ = 0,
          X = !1,
          ue = !1,
          B = !0
        if (typeof g != 'function') throw new TypeError(x)
        ;(p = m(p) || 0),
          c(u) &&
            ((X = !!u.leading),
            (ue = 'maxWait' in u),
            (P = ue ? w(m(u.maxWait) || 0, p) : P),
            (B = 'trailing' in u ? !!u.trailing : B))
        function ce(Q) {
          var te = v,
            _ = H
          return (v = H = void 0), ($ = Q), (F = g.apply(_, te)), F
        }
        function se(Q) {
          return ($ = Q), (I = setTimeout(Ce, p)), X ? ce(Q) : F
        }
        function J(Q) {
          var te = Q - U,
            _ = Q - $,
            re = p - te
          return ue ? k(re, P - _) : re
        }
        function Ee(Q) {
          var te = Q - U,
            _ = Q - $
          return U === void 0 || te >= p || te < 0 || (ue && _ >= P)
        }
        function Ce() {
          var Q = f()
          if (Ee(Q)) return j(Q)
          I = setTimeout(Ce, J(Q))
        }
        function j(Q) {
          return (I = void 0), B && v ? ce(Q) : ((v = H = void 0), F)
        }
        function V() {
          I !== void 0 && clearTimeout(I), ($ = 0), (v = U = H = I = void 0)
        }
        function q() {
          return I === void 0 ? F : j(f())
        }
        function be() {
          var Q = f(),
            te = Ee(Q)
          if (((v = arguments), (H = this), (U = Q), te)) {
            if (I === void 0) return se(U)
            if (ue) return clearTimeout(I), (I = setTimeout(Ce, p)), ce(U)
          }
          return I === void 0 && (I = setTimeout(Ce, p)), F
        }
        return (be.cancel = V), (be.flush = q), be
      }
      E.exports = C
    },
    16764: function (E, a, o) {
      var c = o(80732),
        f = o(55073),
        m = '[object Symbol]'
      function x(w) {
        return typeof w == 'symbol' || (f(w) && c(w) == m)
      }
      E.exports = x
    },
    76668: function (E, a, o) {
      var c = o(29165),
        f = function () {
          return c.Date.now()
        }
      E.exports = f
    },
    12448: function (E, a, o) {
      var c = o(33124),
        f = o(36838),
        m = o(16764),
        x = 0 / 0,
        w = /^[-+]0x[0-9a-f]+$/i,
        k = /^0b[01]+$/i,
        C = /^0o[0-7]+$/i,
        g = parseInt
      function p(u) {
        if (typeof u == 'number') return u
        if (m(u)) return x
        if (f(u)) {
          var v = typeof u.valueOf == 'function' ? u.valueOf() : u
          u = f(v) ? v + '' : v
        }
        if (typeof u != 'string') return u === 0 ? u : +u
        u = c(u)
        var H = k.test(u)
        return H || C.test(u) ? g(u.slice(2), H ? 2 : 8) : w.test(u) ? x : +u
      }
      E.exports = p
    },
    56510: function (E, a, o) {
      'use strict'
      o.d(a, {
        Z: function () {
          return Ce
        },
      })
      var c = o(75782),
        f = o(91600),
        m = o(57689),
        x = o(35687),
        w = o(34869),
        k = o(24572),
        C = o(51163),
        g = o(84875),
        p = o.n(g),
        u = o(49239),
        v = function (V) {
          var q = V.prefixCls,
            be = V.className,
            Q = V.style,
            te = V.children,
            _ = V.containerRef
          return m.createElement(
            m.Fragment,
            null,
            m.createElement(
              'div',
              {
                className: p()(''.concat(q, '-content'), be),
                style: (0, c.Z)({}, Q),
                'aria-modal': 'true',
                role: 'dialog',
                ref: _,
              },
              te,
            ),
          )
        },
        H = v,
        P = m.createContext(null),
        F = P,
        I = o(11268),
        U = o(86596)
      function $(j) {
        return typeof j == 'string' && String(Number(j)) === j
          ? ((0, U.ZP)(!1, 'Invalid value type of `width` or `height` which should be number type instead.'), Number(j))
          : j
      }
      function X(j) {
        warning(!('wrapperClassName' in j), "'wrapperClassName' is removed. Please use 'rootClassName' instead.")
      }
      var ue = { width: 0, height: 0, overflow: 'hidden', outline: 'none', position: 'absolute' }
      function B(j, V) {
        var q,
          be,
          Q,
          te,
          _ = j.prefixCls,
          re = j.open,
          oe = j.placement,
          ke = j.inline,
          he = j.push,
          Ae = j.forceRender,
          we = j.autoFocus,
          ie = j.keyboard,
          le = j.rootClassName,
          fe = j.rootStyle,
          Te = j.zIndex,
          Le = j.className,
          ve = j.style,
          xe = j.motion,
          ne = j.width,
          Z = j.height,
          Ze = j.children,
          Fe = j.contentWrapperStyle,
          Ge = j.mask,
          so = j.maskClosable,
          no = j.maskMotion,
          $e = j.maskClassName,
          qe = j.maskStyle,
          Xe = j.afterOpenChange,
          Je = j.onClose,
          Ke = m.useRef(),
          to = m.useRef(),
          oo = m.useRef()
        m.useImperativeHandle(V, function () {
          return Ke.current
        })
        var Co = function (ao) {
          var Do = ao.keyCode,
            zo = ao.shiftKey
          switch (Do) {
            case I.Z.TAB: {
              if (Do === I.Z.TAB) {
                if (!zo && document.activeElement === oo.current) {
                  var So
                  ;(So = to.current) === null || So === void 0 || So.focus({ preventScroll: !0 })
                } else if (zo && document.activeElement === to.current) {
                  var Ho
                  ;(Ho = oo.current) === null || Ho === void 0 || Ho.focus({ preventScroll: !0 })
                }
              }
              break
            }
            case I.Z.ESC: {
              Je && ie && (ao.stopPropagation(), Je(ao))
              break
            }
          }
        }
        m.useEffect(
          function () {
            if (re && we) {
              var Ve
              ;(Ve = Ke.current) === null || Ve === void 0 || Ve.focus({ preventScroll: !0 })
            }
          },
          [re],
        )
        var lo = m.useState(!1),
          uo = (0, f.Z)(lo, 2),
          Ko = uo[0],
          Oo = uo[1],
          ro = m.useContext(F),
          _o
        he === !1 ? (_o = { distance: 0 }) : he === !0 ? (_o = {}) : (_o = he || {})
        var Eo =
            (q =
              (be = (Q = _o) === null || Q === void 0 ? void 0 : Q.distance) !== null && be !== void 0
                ? be
                : ro == null
                  ? void 0
                  : ro.pushDistance) !== null && q !== void 0
              ? q
              : 180,
          Mn = m.useMemo(
            function () {
              return {
                pushDistance: Eo,
                push: function () {
                  Oo(!0)
                },
                pull: function () {
                  Oo(!1)
                },
              }
            },
            [Eo],
          )
        m.useEffect(
          function () {
            if (re) {
              var Ve
              ro == null || (Ve = ro.push) === null || Ve === void 0 || Ve.call(ro)
            } else {
              var ao
              ro == null || (ao = ro.pull) === null || ao === void 0 || ao.call(ro)
            }
          },
          [re],
        ),
          m.useEffect(function () {
            return function () {
              var Ve
              ro == null || (Ve = ro.pull) === null || Ve === void 0 || Ve.call(ro)
            }
          }, [])
        var L =
            Ge &&
            m.createElement(u.Z, (0, C.Z)({ key: 'mask' }, no, { visible: re }), function (Ve, ao) {
              var Do = Ve.className,
                zo = Ve.style
              return m.createElement('div', {
                className: p()(''.concat(_, '-mask'), Do, $e),
                style: (0, c.Z)((0, c.Z)({}, zo), qe),
                onClick: so && re ? Je : void 0,
                ref: ao,
              })
            }),
          on = typeof xe == 'function' ? xe(oe) : xe,
          co = {}
        if (Ko && Eo)
          switch (oe) {
            case 'top':
              co.transform = 'translateY('.concat(Eo, 'px)')
              break
            case 'bottom':
              co.transform = 'translateY('.concat(-Eo, 'px)')
              break
            case 'left':
              co.transform = 'translateX('.concat(Eo, 'px)')
              break
            default:
              co.transform = 'translateX('.concat(-Eo, 'px)')
              break
          }
        oe === 'left' || oe === 'right' ? (co.width = $(ne)) : (co.height = $(Z))
        var Bn = m.createElement(
            u.Z,
            (0, C.Z)({ key: 'panel' }, on, {
              visible: re,
              forceRender: Ae,
              onVisibleChanged: function (ao) {
                Xe == null || Xe(ao)
              },
              removeOnLeave: !1,
              leavedClassName: ''.concat(_, '-content-wrapper-hidden'),
            }),
            function (Ve, ao) {
              var Do = Ve.className,
                zo = Ve.style
              return m.createElement(
                'div',
                {
                  className: p()(''.concat(_, '-content-wrapper'), Do),
                  style: (0, c.Z)((0, c.Z)((0, c.Z)({}, co), zo), Fe),
                },
                m.createElement(H, { containerRef: ao, prefixCls: _, className: Le, style: ve }, Ze),
              )
            },
          ),
          jo = (0, c.Z)({}, fe)
        return (
          Te && (jo.zIndex = Te),
          m.createElement(
            F.Provider,
            { value: Mn },
            m.createElement(
              'div',
              {
                className: p()(
                  _,
                  ''.concat(_, '-').concat(oe),
                  le,
                  ((te = {}), (0, k.Z)(te, ''.concat(_, '-open'), re), (0, k.Z)(te, ''.concat(_, '-inline'), ke), te),
                ),
                style: jo,
                tabIndex: -1,
                ref: Ke,
                onKeyDown: Co,
              },
              L,
              m.createElement('div', {
                tabIndex: 0,
                ref: to,
                style: ue,
                'aria-hidden': 'true',
                'data-sentinel': 'start',
              }),
              Bn,
              m.createElement('div', {
                tabIndex: 0,
                ref: oo,
                style: ue,
                'aria-hidden': 'true',
                'data-sentinel': 'end',
              }),
            ),
          )
        )
      }
      var ce = m.forwardRef(B),
        se = ce,
        J = function (V) {
          var q = V.open,
            be = q === void 0 ? !1 : q,
            Q = V.prefixCls,
            te = Q === void 0 ? 'rc-drawer' : Q,
            _ = V.placement,
            re = _ === void 0 ? 'right' : _,
            oe = V.autoFocus,
            ke = oe === void 0 ? !0 : oe,
            he = V.keyboard,
            Ae = he === void 0 ? !0 : he,
            we = V.width,
            ie = we === void 0 ? 378 : we,
            le = V.mask,
            fe = le === void 0 ? !0 : le,
            Te = V.maskClosable,
            Le = Te === void 0 ? !0 : Te,
            ve = V.getContainer,
            xe = V.forceRender,
            ne = V.afterOpenChange,
            Z = V.destroyOnClose,
            Ze = m.useState(!1),
            Fe = (0, f.Z)(Ze, 2),
            Ge = Fe[0],
            so = Fe[1],
            no = m.useRef(),
            $e = m.useRef()
          ;(0, w.Z)(
            function () {
              be && ($e.current = document.activeElement)
            },
            [be],
          )
          var qe = function (Ke) {
            var to
            if (
              (so(Ke),
              ne == null || ne(Ke),
              !Ke && $e.current && !(!((to = no.current) === null || to === void 0) && to.contains($e.current)))
            ) {
              var oo
              ;(oo = $e.current) === null || oo === void 0 || oo.focus()
            }
          }
          if (!xe && !Ge && !be && Z) return null
          var Xe = (0, c.Z)(
            (0, c.Z)({}, V),
            {},
            {
              open: be,
              prefixCls: te,
              placement: re,
              autoFocus: ke,
              keyboard: Ae,
              width: ie,
              mask: fe,
              maskClosable: Le,
              inline: ve === !1,
              afterOpenChange: qe,
              ref: no,
            },
          )
          return m.createElement(
            x.Z,
            { open: be || xe || Ge, autoDestroy: !1, getContainer: ve, autoLock: fe && (be || Ge) },
            m.createElement(se, Xe),
          )
        },
        Ee = J,
        Ce = Ee
    },
    31219: function (E, a, o) {
      'use strict'
      o.d(a, {
        G: function () {
          return x
        },
      })
      var c = o(22923),
        f = function (k) {
          if ((0, c.Z)() && window.document.documentElement) {
            var C = Array.isArray(k) ? k : [k],
              g = window.document.documentElement
            return C.some(function (p) {
              return p in g.style
            })
          }
          return !1
        },
        m = function (k, C) {
          if (!f(k)) return !1
          var g = document.createElement('div'),
            p = g.style[k]
          return (g.style[k] = C), g.style[k] !== p
        }
      function x(w, k) {
        return !Array.isArray(w) && k !== void 0 ? m(w, k) : f(w)
      }
    },
    13379: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#f8f8f2',
          background: 'none',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#f8f8f2',
          background: '#2b2b2b',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '0.5em 0',
          overflow: 'auto',
          borderRadius: '0.3em',
        },
        ':not(pre) > code[class*="language-"]': {
          background: '#2b2b2b',
          padding: '0.1em',
          borderRadius: '0.3em',
          whiteSpace: 'normal',
        },
        comment: { color: '#d4d0ab' },
        prolog: { color: '#d4d0ab' },
        doctype: { color: '#d4d0ab' },
        cdata: { color: '#d4d0ab' },
        punctuation: { color: '#fefefe' },
        property: { color: '#ffa07a' },
        tag: { color: '#ffa07a' },
        constant: { color: '#ffa07a' },
        symbol: { color: '#ffa07a' },
        deleted: { color: '#ffa07a' },
        boolean: { color: '#00e0e0' },
        number: { color: '#00e0e0' },
        selector: { color: '#abe338' },
        'attr-name': { color: '#abe338' },
        string: { color: '#abe338' },
        char: { color: '#abe338' },
        builtin: { color: '#abe338' },
        inserted: { color: '#abe338' },
        operator: { color: '#00e0e0' },
        entity: { color: '#00e0e0', cursor: 'help' },
        url: { color: '#00e0e0' },
        '.language-css .token.string': { color: '#00e0e0' },
        '.style .token.string': { color: '#00e0e0' },
        variable: { color: '#00e0e0' },
        atrule: { color: '#ffd700' },
        'attr-value': { color: '#ffd700' },
        function: { color: '#ffd700' },
        keyword: { color: '#00e0e0' },
        regex: { color: '#ffd700' },
        important: { color: '#ffd700', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    83150: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#c5c8c6',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#c5c8c6',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          borderRadius: '0.3em',
          background: '#1d1f21',
        },
        ':not(pre) > code[class*="language-"]': { background: '#1d1f21', padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#7C7C7C' },
        prolog: { color: '#7C7C7C' },
        doctype: { color: '#7C7C7C' },
        cdata: { color: '#7C7C7C' },
        punctuation: { color: '#c5c8c6' },
        '.namespace': { Opacity: '.7' },
        property: { color: '#96CBFE' },
        keyword: { color: '#96CBFE' },
        tag: { color: '#96CBFE' },
        'class-name': { color: '#FFFFB6', textDecoration: 'underline' },
        boolean: { color: '#99CC99' },
        constant: { color: '#99CC99' },
        symbol: { color: '#f92672' },
        deleted: { color: '#f92672' },
        number: { color: '#FF73FD' },
        selector: { color: '#A8FF60' },
        'attr-name': { color: '#A8FF60' },
        string: { color: '#A8FF60' },
        char: { color: '#A8FF60' },
        builtin: { color: '#A8FF60' },
        inserted: { color: '#A8FF60' },
        variable: { color: '#C6C5FE' },
        operator: { color: '#EDEDED' },
        entity: { color: '#FFFFB6', cursor: 'help' },
        url: { color: '#96CBFE' },
        '.language-css .token.string': { color: '#87C38A' },
        '.style .token.string': { color: '#87C38A' },
        atrule: { color: '#F9EE98' },
        'attr-value': { color: '#F9EE98' },
        function: { color: '#DAD085' },
        regex: { color: '#E9C062' },
        important: { color: '#fd971f', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    36352: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#f5f7ff',
          color: '#5e6687',
        },
        'pre[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#f5f7ff',
          color: '#5e6687',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        'pre[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#dfe2f1' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#dfe2f1' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#dfe2f1' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#dfe2f1' },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: '#dfe2f1' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: '#dfe2f1' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: '#dfe2f1' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: '#dfe2f1' },
        ':not(pre) > code[class*="language-"]': { padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#898ea4' },
        prolog: { color: '#898ea4' },
        doctype: { color: '#898ea4' },
        cdata: { color: '#898ea4' },
        punctuation: { color: '#5e6687' },
        namespace: { Opacity: '.7' },
        operator: { color: '#c76b29' },
        boolean: { color: '#c76b29' },
        number: { color: '#c76b29' },
        property: { color: '#c08b30' },
        tag: { color: '#3d8fd1' },
        string: { color: '#22a2c9' },
        selector: { color: '#6679cc' },
        'attr-name': { color: '#c76b29' },
        entity: { color: '#22a2c9', cursor: 'help' },
        url: { color: '#22a2c9' },
        '.language-css .token.string': { color: '#22a2c9' },
        '.style .token.string': { color: '#22a2c9' },
        'attr-value': { color: '#ac9739' },
        keyword: { color: '#ac9739' },
        control: { color: '#ac9739' },
        directive: { color: '#ac9739' },
        unit: { color: '#ac9739' },
        statement: { color: '#22a2c9' },
        regex: { color: '#22a2c9' },
        atrule: { color: '#22a2c9' },
        placeholder: { color: '#3d8fd1' },
        variable: { color: '#3d8fd1' },
        deleted: { textDecoration: 'line-through' },
        inserted: { borderBottom: '1px dotted #202746', textDecoration: 'none' },
        italic: { fontStyle: 'italic' },
        important: { fontWeight: 'bold', color: '#c94922' },
        bold: { fontWeight: 'bold' },
        'pre > code.highlight': { Outline: '0.4em solid #c94922', OutlineOffset: '.4em' },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRightColor: '#dfe2f1' },
        '.line-numbers .line-numbers-rows > span:before': { color: '#979db4' },
        '.line-highlight.line-highlight': {
          background: 'linear-gradient(to right, rgba(107, 115, 148, 0.2) 70%, rgba(107, 115, 148, 0))',
        },
      }
      a.default = o
    },
    89449: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#fff',
          textShadow: '0 1px 1px #000',
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          direction: 'ltr',
          textAlign: 'left',
          wordSpacing: 'normal',
          whiteSpace: 'pre',
          wordWrap: 'normal',
          lineHeight: '1.4',
          background: 'none',
          border: '0',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#fff',
          textShadow: '0 1px 1px #000',
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          direction: 'ltr',
          textAlign: 'left',
          wordSpacing: 'normal',
          whiteSpace: 'pre',
          wordWrap: 'normal',
          lineHeight: '1.4',
          background: '#222',
          border: '0',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '15px',
          margin: '1em 0',
          overflow: 'auto',
          MozBorderRadius: '8px',
          WebkitBorderRadius: '8px',
          borderRadius: '8px',
        },
        'pre[class*="language-"] code': { float: 'left', padding: '0 15px 0 0' },
        ':not(pre) > code[class*="language-"]': {
          background: '#222',
          padding: '5px 10px',
          lineHeight: '1',
          MozBorderRadius: '3px',
          WebkitBorderRadius: '3px',
          borderRadius: '3px',
        },
        comment: { color: '#797979' },
        prolog: { color: '#797979' },
        doctype: { color: '#797979' },
        cdata: { color: '#797979' },
        selector: { color: '#fff' },
        operator: { color: '#fff' },
        punctuation: { color: '#fff' },
        namespace: { Opacity: '.7' },
        tag: { color: '#ffd893' },
        boolean: { color: '#ffd893' },
        atrule: { color: '#B0C975' },
        'attr-value': { color: '#B0C975' },
        hex: { color: '#B0C975' },
        string: { color: '#B0C975' },
        property: { color: '#c27628' },
        entity: { color: '#c27628', cursor: 'help' },
        url: { color: '#c27628' },
        'attr-name': { color: '#c27628' },
        keyword: { color: '#c27628' },
        regex: { color: '#9B71C6' },
        function: { color: '#e5a638' },
        constant: { color: '#e5a638' },
        variable: { color: '#fdfba8' },
        number: { color: '#8799B0' },
        important: { color: '#E45734' },
        deliminator: { color: '#E45734' },
        '.line-highlight.line-highlight': { background: 'rgba(255, 255, 255, .2)' },
        '.line-highlight.line-highlight:before': {
          top: '.3em',
          backgroundColor: 'rgba(255, 255, 255, .3)',
          color: '#fff',
          MozBorderRadius: '8px',
          WebkitBorderRadius: '8px',
          borderRadius: '8px',
        },
        '.line-highlight.line-highlight[data-end]:after': {
          top: '.3em',
          backgroundColor: 'rgba(255, 255, 255, .3)',
          color: '#fff',
          MozBorderRadius: '8px',
          WebkitBorderRadius: '8px',
          borderRadius: '8px',
        },
        '.line-numbers .line-numbers-rows > span': { borderRight: '3px #d9d336 solid' },
      }
      a.default = o
    },
    56577: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#111b27',
          background: 'none',
          fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#111b27',
          background: '#e3eaf2',
          fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '0.5em 0',
          overflow: 'auto',
        },
        'pre[class*="language-"]::-moz-selection': { background: '#8da1b9' },
        'pre[class*="language-"] ::-moz-selection': { background: '#8da1b9' },
        'code[class*="language-"]::-moz-selection': { background: '#8da1b9' },
        'code[class*="language-"] ::-moz-selection': { background: '#8da1b9' },
        'pre[class*="language-"]::selection': { background: '#8da1b9' },
        'pre[class*="language-"] ::selection': { background: '#8da1b9' },
        'code[class*="language-"]::selection': { background: '#8da1b9' },
        'code[class*="language-"] ::selection': { background: '#8da1b9' },
        ':not(pre) > code[class*="language-"]': {
          background: '#e3eaf2',
          padding: '0.1em 0.3em',
          borderRadius: '0.3em',
          whiteSpace: 'normal',
        },
        comment: { color: '#3c526d' },
        prolog: { color: '#3c526d' },
        doctype: { color: '#3c526d' },
        cdata: { color: '#3c526d' },
        punctuation: { color: '#111b27' },
        'delimiter.important': { color: '#006d6d', fontWeight: 'inherit' },
        'selector.parent': { color: '#006d6d' },
        tag: { color: '#006d6d' },
        'tag.punctuation': { color: '#006d6d' },
        'attr-name': { color: '#755f00' },
        boolean: { color: '#755f00' },
        'boolean.important': { color: '#755f00' },
        number: { color: '#755f00' },
        constant: { color: '#755f00' },
        'selector.attribute': { color: '#755f00' },
        'class-name': { color: '#005a8e' },
        key: { color: '#005a8e' },
        parameter: { color: '#005a8e' },
        property: { color: '#005a8e' },
        'property-access': { color: '#005a8e' },
        variable: { color: '#005a8e' },
        'attr-value': { color: '#116b00' },
        inserted: { color: '#116b00' },
        color: { color: '#116b00' },
        'selector.value': { color: '#116b00' },
        string: { color: '#116b00' },
        'string.url-link': { color: '#116b00' },
        builtin: { color: '#af00af' },
        'keyword-array': { color: '#af00af' },
        package: { color: '#af00af' },
        regex: { color: '#af00af' },
        function: { color: '#7c00aa' },
        'selector.class': { color: '#7c00aa' },
        'selector.id': { color: '#7c00aa' },
        'atrule.rule': { color: '#a04900' },
        combinator: { color: '#a04900' },
        keyword: { color: '#a04900' },
        operator: { color: '#a04900' },
        'pseudo-class': { color: '#a04900' },
        'pseudo-element': { color: '#a04900' },
        selector: { color: '#a04900' },
        unit: { color: '#a04900' },
        deleted: { color: '#c22f2e' },
        important: { color: '#c22f2e', fontWeight: 'bold' },
        'keyword-this': { color: '#005a8e', fontWeight: 'bold' },
        this: { color: '#005a8e', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        entity: { cursor: 'help' },
        '.language-markdown .token.title': { color: '#005a8e', fontWeight: 'bold' },
        '.language-markdown .token.title .token.punctuation': { color: '#005a8e', fontWeight: 'bold' },
        '.language-markdown .token.blockquote.punctuation': { color: '#af00af' },
        '.language-markdown .token.code': { color: '#006d6d' },
        '.language-markdown .token.hr.punctuation': { color: '#005a8e' },
        '.language-markdown .token.url > .token.content': { color: '#116b00' },
        '.language-markdown .token.url-link': { color: '#755f00' },
        '.language-markdown .token.list.punctuation': { color: '#af00af' },
        '.language-markdown .token.table-header': { color: '#111b27' },
        '.language-json .token.operator': { color: '#111b27' },
        '.language-scss .token.variable': { color: '#006d6d' },
        'token.tab:not(:empty):before': { color: '#3c526d' },
        'token.cr:before': { color: '#3c526d' },
        'token.lf:before': { color: '#3c526d' },
        'token.space:before': { color: '#3c526d' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a': { color: '#e3eaf2', background: '#005a8e' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button': { color: '#e3eaf2', background: '#005a8e' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover': {
          color: '#e3eaf2',
          background: '#005a8eda',
          textDecoration: 'none',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus': {
          color: '#e3eaf2',
          background: '#005a8eda',
          textDecoration: 'none',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover': {
          color: '#e3eaf2',
          background: '#005a8eda',
          textDecoration: 'none',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus': {
          color: '#e3eaf2',
          background: '#005a8eda',
          textDecoration: 'none',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span': { color: '#e3eaf2', background: '#3c526d' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover': { color: '#e3eaf2', background: '#3c526d' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus': { color: '#e3eaf2', background: '#3c526d' },
        '.line-highlight.line-highlight': { background: 'linear-gradient(to right, #8da1b92f 70%, #8da1b925)' },
        '.line-highlight.line-highlight:before': {
          backgroundColor: '#3c526d',
          color: '#e3eaf2',
          boxShadow: '0 1px #8da1b9',
        },
        '.line-highlight.line-highlight[data-end]:after': {
          backgroundColor: '#3c526d',
          color: '#e3eaf2',
          boxShadow: '0 1px #8da1b9',
        },
        'pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before': {
          backgroundColor: '#3c526d1f',
        },
        '.line-numbers.line-numbers .line-numbers-rows': {
          borderRight: '1px solid #8da1b97a',
          background: '#d0dae77a',
        },
        '.line-numbers .line-numbers-rows > span:before': { color: '#3c526dda' },
        '.rainbow-braces .token.token.punctuation.brace-level-1': { color: '#755f00' },
        '.rainbow-braces .token.token.punctuation.brace-level-5': { color: '#755f00' },
        '.rainbow-braces .token.token.punctuation.brace-level-9': { color: '#755f00' },
        '.rainbow-braces .token.token.punctuation.brace-level-2': { color: '#af00af' },
        '.rainbow-braces .token.token.punctuation.brace-level-6': { color: '#af00af' },
        '.rainbow-braces .token.token.punctuation.brace-level-10': { color: '#af00af' },
        '.rainbow-braces .token.token.punctuation.brace-level-3': { color: '#005a8e' },
        '.rainbow-braces .token.token.punctuation.brace-level-7': { color: '#005a8e' },
        '.rainbow-braces .token.token.punctuation.brace-level-11': { color: '#005a8e' },
        '.rainbow-braces .token.token.punctuation.brace-level-4': { color: '#7c00aa' },
        '.rainbow-braces .token.token.punctuation.brace-level-8': { color: '#7c00aa' },
        '.rainbow-braces .token.token.punctuation.brace-level-12': { color: '#7c00aa' },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix)': { backgroundColor: '#c22f2e1f' },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix)': { backgroundColor: '#c22f2e1f' },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix)': { backgroundColor: '#116b001f' },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix)': { backgroundColor: '#116b001f' },
        '.command-line .command-line-prompt': { borderRight: '1px solid #8da1b97a' },
        '.command-line .command-line-prompt > span:before': { color: '#3c526dda' },
      }
      a.default = o
    },
    96946: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#e3eaf2',
          background: 'none',
          fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#e3eaf2',
          background: '#111b27',
          fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '0.5em 0',
          overflow: 'auto',
        },
        'pre[class*="language-"]::-moz-selection': { background: '#3c526d' },
        'pre[class*="language-"] ::-moz-selection': { background: '#3c526d' },
        'code[class*="language-"]::-moz-selection': { background: '#3c526d' },
        'code[class*="language-"] ::-moz-selection': { background: '#3c526d' },
        'pre[class*="language-"]::selection': { background: '#3c526d' },
        'pre[class*="language-"] ::selection': { background: '#3c526d' },
        'code[class*="language-"]::selection': { background: '#3c526d' },
        'code[class*="language-"] ::selection': { background: '#3c526d' },
        ':not(pre) > code[class*="language-"]': {
          background: '#111b27',
          padding: '0.1em 0.3em',
          borderRadius: '0.3em',
          whiteSpace: 'normal',
        },
        comment: { color: '#8da1b9' },
        prolog: { color: '#8da1b9' },
        doctype: { color: '#8da1b9' },
        cdata: { color: '#8da1b9' },
        punctuation: { color: '#e3eaf2' },
        'delimiter.important': { color: '#66cccc', fontWeight: 'inherit' },
        'selector.parent': { color: '#66cccc' },
        tag: { color: '#66cccc' },
        'tag.punctuation': { color: '#66cccc' },
        'attr-name': { color: '#e6d37a' },
        boolean: { color: '#e6d37a' },
        'boolean.important': { color: '#e6d37a' },
        number: { color: '#e6d37a' },
        constant: { color: '#e6d37a' },
        'selector.attribute': { color: '#e6d37a' },
        'class-name': { color: '#6cb8e6' },
        key: { color: '#6cb8e6' },
        parameter: { color: '#6cb8e6' },
        property: { color: '#6cb8e6' },
        'property-access': { color: '#6cb8e6' },
        variable: { color: '#6cb8e6' },
        'attr-value': { color: '#91d076' },
        inserted: { color: '#91d076' },
        color: { color: '#91d076' },
        'selector.value': { color: '#91d076' },
        string: { color: '#91d076' },
        'string.url-link': { color: '#91d076' },
        builtin: { color: '#f4adf4' },
        'keyword-array': { color: '#f4adf4' },
        package: { color: '#f4adf4' },
        regex: { color: '#f4adf4' },
        function: { color: '#c699e3' },
        'selector.class': { color: '#c699e3' },
        'selector.id': { color: '#c699e3' },
        'atrule.rule': { color: '#e9ae7e' },
        combinator: { color: '#e9ae7e' },
        keyword: { color: '#e9ae7e' },
        operator: { color: '#e9ae7e' },
        'pseudo-class': { color: '#e9ae7e' },
        'pseudo-element': { color: '#e9ae7e' },
        selector: { color: '#e9ae7e' },
        unit: { color: '#e9ae7e' },
        deleted: { color: '#cd6660' },
        important: { color: '#cd6660', fontWeight: 'bold' },
        'keyword-this': { color: '#6cb8e6', fontWeight: 'bold' },
        this: { color: '#6cb8e6', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        entity: { cursor: 'help' },
        '.language-markdown .token.title': { color: '#6cb8e6', fontWeight: 'bold' },
        '.language-markdown .token.title .token.punctuation': { color: '#6cb8e6', fontWeight: 'bold' },
        '.language-markdown .token.blockquote.punctuation': { color: '#f4adf4' },
        '.language-markdown .token.code': { color: '#66cccc' },
        '.language-markdown .token.hr.punctuation': { color: '#6cb8e6' },
        '.language-markdown .token.url .token.content': { color: '#91d076' },
        '.language-markdown .token.url-link': { color: '#e6d37a' },
        '.language-markdown .token.list.punctuation': { color: '#f4adf4' },
        '.language-markdown .token.table-header': { color: '#e3eaf2' },
        '.language-json .token.operator': { color: '#e3eaf2' },
        '.language-scss .token.variable': { color: '#66cccc' },
        'token.tab:not(:empty):before': { color: '#8da1b9' },
        'token.cr:before': { color: '#8da1b9' },
        'token.lf:before': { color: '#8da1b9' },
        'token.space:before': { color: '#8da1b9' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a': { color: '#111b27', background: '#6cb8e6' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button': { color: '#111b27', background: '#6cb8e6' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover': {
          color: '#111b27',
          background: '#6cb8e6da',
          textDecoration: 'none',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus': {
          color: '#111b27',
          background: '#6cb8e6da',
          textDecoration: 'none',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover': {
          color: '#111b27',
          background: '#6cb8e6da',
          textDecoration: 'none',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus': {
          color: '#111b27',
          background: '#6cb8e6da',
          textDecoration: 'none',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span': { color: '#111b27', background: '#8da1b9' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover': { color: '#111b27', background: '#8da1b9' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus': { color: '#111b27', background: '#8da1b9' },
        '.line-highlight.line-highlight': { background: 'linear-gradient(to right, #3c526d5f 70%, #3c526d55)' },
        '.line-highlight.line-highlight:before': {
          backgroundColor: '#8da1b9',
          color: '#111b27',
          boxShadow: '0 1px #3c526d',
        },
        '.line-highlight.line-highlight[data-end]:after': {
          backgroundColor: '#8da1b9',
          color: '#111b27',
          boxShadow: '0 1px #3c526d',
        },
        'pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before': {
          backgroundColor: '#8da1b918',
        },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRight: '1px solid #0b121b', background: '#0b121b7a' },
        '.line-numbers .line-numbers-rows > span:before': { color: '#8da1b9da' },
        '.rainbow-braces .token.token.punctuation.brace-level-1': { color: '#e6d37a' },
        '.rainbow-braces .token.token.punctuation.brace-level-5': { color: '#e6d37a' },
        '.rainbow-braces .token.token.punctuation.brace-level-9': { color: '#e6d37a' },
        '.rainbow-braces .token.token.punctuation.brace-level-2': { color: '#f4adf4' },
        '.rainbow-braces .token.token.punctuation.brace-level-6': { color: '#f4adf4' },
        '.rainbow-braces .token.token.punctuation.brace-level-10': { color: '#f4adf4' },
        '.rainbow-braces .token.token.punctuation.brace-level-3': { color: '#6cb8e6' },
        '.rainbow-braces .token.token.punctuation.brace-level-7': { color: '#6cb8e6' },
        '.rainbow-braces .token.token.punctuation.brace-level-11': { color: '#6cb8e6' },
        '.rainbow-braces .token.token.punctuation.brace-level-4': { color: '#c699e3' },
        '.rainbow-braces .token.token.punctuation.brace-level-8': { color: '#c699e3' },
        '.rainbow-braces .token.token.punctuation.brace-level-12': { color: '#c699e3' },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix)': { backgroundColor: '#cd66601f' },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix)': { backgroundColor: '#cd66601f' },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix)': { backgroundColor: '#91d0761f' },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix)': { backgroundColor: '#91d0761f' },
        '.command-line .command-line-prompt': { borderRight: '1px solid #0b121b' },
        '.command-line .command-line-prompt > span:before': { color: '#8da1b9da' },
      }
      a.default = o
    },
    28459: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: 'black',
          background: 'none',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: 'black',
          background: 'none',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          position: 'relative',
          borderLeft: '10px solid #358ccb',
          boxShadow: '-1px 0 0 0 #358ccb, 0 0 0 1px #dfdfdf',
          backgroundColor: '#fdfdfd',
          backgroundImage: 'linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)',
          backgroundSize: '3em 3em',
          backgroundOrigin: 'content-box',
          backgroundAttachment: 'local',
          margin: '.5em 0',
          padding: '0 1em',
        },
        'pre[class*="language-"] > code': { display: 'block' },
        ':not(pre) > code[class*="language-"]': {
          position: 'relative',
          padding: '.2em',
          borderRadius: '0.3em',
          color: '#c92c2c',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'inline',
          whiteSpace: 'normal',
          backgroundColor: '#fdfdfd',
          WebkitBoxSizing: 'border-box',
          MozBoxSizing: 'border-box',
          boxSizing: 'border-box',
        },
        comment: { color: '#7D8B99' },
        'block-comment': { color: '#7D8B99' },
        prolog: { color: '#7D8B99' },
        doctype: { color: '#7D8B99' },
        cdata: { color: '#7D8B99' },
        punctuation: { color: '#5F6364' },
        property: { color: '#c92c2c' },
        tag: { color: '#c92c2c' },
        boolean: { color: '#c92c2c' },
        number: { color: '#c92c2c' },
        'function-name': { color: '#c92c2c' },
        constant: { color: '#c92c2c' },
        symbol: { color: '#c92c2c' },
        deleted: { color: '#c92c2c' },
        selector: { color: '#2f9c0a' },
        'attr-name': { color: '#2f9c0a' },
        string: { color: '#2f9c0a' },
        char: { color: '#2f9c0a' },
        function: { color: '#2f9c0a' },
        builtin: { color: '#2f9c0a' },
        inserted: { color: '#2f9c0a' },
        operator: { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)' },
        entity: { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)', cursor: 'help' },
        url: { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)' },
        variable: { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)' },
        atrule: { color: '#1990b8' },
        'attr-value': { color: '#1990b8' },
        keyword: { color: '#1990b8' },
        'class-name': { color: '#1990b8' },
        regex: { color: '#e90' },
        important: { color: '#e90', fontWeight: 'normal' },
        '.language-css .token.string': { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)' },
        '.style .token.string': { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        namespace: { Opacity: '.7' },
      }
      a.default = o
    },
    18403: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: 'black',
          background: 'none',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          maxHeight: 'inherit',
          height: 'inherit',
          padding: '0 1em',
          display: 'block',
          overflow: 'auto',
        },
        'pre[class*="language-"]': {
          color: 'black',
          background: 'none',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          position: 'relative',
          margin: '.5em 0',
          overflow: 'visible',
          padding: '1px',
          backgroundColor: '#fdfdfd',
          WebkitBoxSizing: 'border-box',
          MozBoxSizing: 'border-box',
          boxSizing: 'border-box',
          marginBottom: '1em',
        },
        'pre[class*="language-"] > code': {
          position: 'relative',
          zIndex: '1',
          borderLeft: '10px solid #358ccb',
          boxShadow: '-1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf',
          backgroundColor: '#fdfdfd',
          backgroundImage: 'linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)',
          backgroundSize: '3em 3em',
          backgroundOrigin: 'content-box',
          backgroundAttachment: 'local',
        },
        ':not(pre) > code[class*="language-"]': {
          backgroundColor: '#fdfdfd',
          WebkitBoxSizing: 'border-box',
          MozBoxSizing: 'border-box',
          boxSizing: 'border-box',
          marginBottom: '1em',
          position: 'relative',
          padding: '.2em',
          borderRadius: '0.3em',
          color: '#c92c2c',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'inline',
          whiteSpace: 'normal',
        },
        'pre[class*="language-"]:before': {
          content: "''",
          display: 'block',
          position: 'absolute',
          bottom: '0.75em',
          left: '0.18em',
          width: '40%',
          height: '20%',
          maxHeight: '13em',
          boxShadow: '0px 13px 8px #979797',
          WebkitTransform: 'rotate(-2deg)',
          MozTransform: 'rotate(-2deg)',
          msTransform: 'rotate(-2deg)',
          OTransform: 'rotate(-2deg)',
          transform: 'rotate(-2deg)',
        },
        'pre[class*="language-"]:after': {
          content: "''",
          display: 'block',
          position: 'absolute',
          bottom: '0.75em',
          left: 'auto',
          width: '40%',
          height: '20%',
          maxHeight: '13em',
          boxShadow: '0px 13px 8px #979797',
          WebkitTransform: 'rotate(2deg)',
          MozTransform: 'rotate(2deg)',
          msTransform: 'rotate(2deg)',
          OTransform: 'rotate(2deg)',
          transform: 'rotate(2deg)',
          right: '0.75em',
        },
        comment: { color: '#7D8B99' },
        'block-comment': { color: '#7D8B99' },
        prolog: { color: '#7D8B99' },
        doctype: { color: '#7D8B99' },
        cdata: { color: '#7D8B99' },
        punctuation: { color: '#5F6364' },
        property: { color: '#c92c2c' },
        tag: { color: '#c92c2c' },
        boolean: { color: '#c92c2c' },
        number: { color: '#c92c2c' },
        'function-name': { color: '#c92c2c' },
        constant: { color: '#c92c2c' },
        symbol: { color: '#c92c2c' },
        deleted: { color: '#c92c2c' },
        selector: { color: '#2f9c0a' },
        'attr-name': { color: '#2f9c0a' },
        string: { color: '#2f9c0a' },
        char: { color: '#2f9c0a' },
        function: { color: '#2f9c0a' },
        builtin: { color: '#2f9c0a' },
        inserted: { color: '#2f9c0a' },
        operator: { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)' },
        entity: { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)', cursor: 'help' },
        url: { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)' },
        variable: { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)' },
        atrule: { color: '#1990b8' },
        'attr-value': { color: '#1990b8' },
        keyword: { color: '#1990b8' },
        'class-name': { color: '#1990b8' },
        regex: { color: '#e90' },
        important: { color: '#e90', fontWeight: 'normal' },
        '.language-css .token.string': { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)' },
        '.style .token.string': { color: '#a67f59', background: 'rgba(255, 255, 255, 0.5)' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        namespace: { Opacity: '.7' },
        'pre[class*="language-"].line-numbers.line-numbers': { paddingLeft: '0' },
        'pre[class*="language-"].line-numbers.line-numbers code': { paddingLeft: '3.8em' },
        'pre[class*="language-"].line-numbers.line-numbers .line-numbers-rows': { left: '0' },
        'pre[class*="language-"][data-line]': { paddingTop: '0', paddingBottom: '0', paddingLeft: '0' },
        'pre[data-line] code': { position: 'relative', paddingLeft: '4em' },
        'pre .line-highlight': { marginTop: '0' },
      }
      a.default = o
    },
    36063: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#a9b7c6',
          fontFamily: "Consolas, Monaco, 'Andale Mono', monospace",
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#a9b7c6',
          fontFamily: "Consolas, Monaco, 'Andale Mono', monospace",
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          background: '#2b2b2b',
        },
        'pre[class*="language-"]::-moz-selection': { color: 'inherit', background: 'rgba(33, 66, 131, .85)' },
        'pre[class*="language-"] ::-moz-selection': { color: 'inherit', background: 'rgba(33, 66, 131, .85)' },
        'code[class*="language-"]::-moz-selection': { color: 'inherit', background: 'rgba(33, 66, 131, .85)' },
        'code[class*="language-"] ::-moz-selection': { color: 'inherit', background: 'rgba(33, 66, 131, .85)' },
        'pre[class*="language-"]::selection': { color: 'inherit', background: 'rgba(33, 66, 131, .85)' },
        'pre[class*="language-"] ::selection': { color: 'inherit', background: 'rgba(33, 66, 131, .85)' },
        'code[class*="language-"]::selection': { color: 'inherit', background: 'rgba(33, 66, 131, .85)' },
        'code[class*="language-"] ::selection': { color: 'inherit', background: 'rgba(33, 66, 131, .85)' },
        ':not(pre) > code[class*="language-"]': { background: '#2b2b2b', padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#808080' },
        prolog: { color: '#808080' },
        cdata: { color: '#808080' },
        delimiter: { color: '#cc7832' },
        boolean: { color: '#cc7832' },
        keyword: { color: '#cc7832' },
        selector: { color: '#cc7832' },
        important: { color: '#cc7832' },
        atrule: { color: '#cc7832' },
        operator: { color: '#a9b7c6' },
        punctuation: { color: '#a9b7c6' },
        'attr-name': { color: '#a9b7c6' },
        tag: { color: '#e8bf6a' },
        'tag.punctuation': { color: '#e8bf6a' },
        doctype: { color: '#e8bf6a' },
        builtin: { color: '#e8bf6a' },
        entity: { color: '#6897bb' },
        number: { color: '#6897bb' },
        symbol: { color: '#6897bb' },
        property: { color: '#9876aa' },
        constant: { color: '#9876aa' },
        variable: { color: '#9876aa' },
        string: { color: '#6a8759' },
        char: { color: '#6a8759' },
        'attr-value': { color: '#a5c261' },
        'attr-value.punctuation': { color: '#a5c261' },
        'attr-value.punctuation:first-child': { color: '#a9b7c6' },
        url: { color: '#287bde', textDecoration: 'underline' },
        function: { color: '#ffc66d' },
        regex: { background: '#364135' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        inserted: { background: '#294436' },
        deleted: { background: '#484a4a' },
        'code.language-css .token.property': { color: '#a9b7c6' },
        'code.language-css .token.property + .token.punctuation': { color: '#a9b7c6' },
        'code.language-css .token.id': { color: '#ffc66d' },
        'code.language-css .token.selector > .token.class': { color: '#ffc66d' },
        'code.language-css .token.selector > .token.attribute': { color: '#ffc66d' },
        'code.language-css .token.selector > .token.pseudo-class': { color: '#ffc66d' },
        'code.language-css .token.selector > .token.pseudo-element': { color: '#ffc66d' },
      }
      a.default = o
    },
    15762: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: 'white',
          background: 'none',
          textShadow: '0 -.1em .2em black',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: 'white',
          background: 'hsl(30, 20%, 25%)',
          textShadow: '0 -.1em .2em black',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          border: '.3em solid hsl(30, 20%, 40%)',
          borderRadius: '.5em',
          boxShadow: '1px 1px .5em black inset',
        },
        ':not(pre) > code[class*="language-"]': {
          background: 'hsl(30, 20%, 25%)',
          padding: '.15em .2em .05em',
          borderRadius: '.3em',
          border: '.13em solid hsl(30, 20%, 40%)',
          boxShadow: '1px 1px .3em -.1em black inset',
          whiteSpace: 'normal',
        },
        comment: { color: 'hsl(30, 20%, 50%)' },
        prolog: { color: 'hsl(30, 20%, 50%)' },
        doctype: { color: 'hsl(30, 20%, 50%)' },
        cdata: { color: 'hsl(30, 20%, 50%)' },
        punctuation: { Opacity: '.7' },
        namespace: { Opacity: '.7' },
        property: { color: 'hsl(350, 40%, 70%)' },
        tag: { color: 'hsl(350, 40%, 70%)' },
        boolean: { color: 'hsl(350, 40%, 70%)' },
        number: { color: 'hsl(350, 40%, 70%)' },
        constant: { color: 'hsl(350, 40%, 70%)' },
        symbol: { color: 'hsl(350, 40%, 70%)' },
        selector: { color: 'hsl(75, 70%, 60%)' },
        'attr-name': { color: 'hsl(75, 70%, 60%)' },
        string: { color: 'hsl(75, 70%, 60%)' },
        char: { color: 'hsl(75, 70%, 60%)' },
        builtin: { color: 'hsl(75, 70%, 60%)' },
        inserted: { color: 'hsl(75, 70%, 60%)' },
        operator: { color: 'hsl(40, 90%, 60%)' },
        entity: { color: 'hsl(40, 90%, 60%)', cursor: 'help' },
        url: { color: 'hsl(40, 90%, 60%)' },
        '.language-css .token.string': { color: 'hsl(40, 90%, 60%)' },
        '.style .token.string': { color: 'hsl(40, 90%, 60%)' },
        variable: { color: 'hsl(40, 90%, 60%)' },
        atrule: { color: 'hsl(350, 40%, 70%)' },
        'attr-value': { color: 'hsl(350, 40%, 70%)' },
        keyword: { color: 'hsl(350, 40%, 70%)' },
        regex: { color: '#e90' },
        important: { color: '#e90', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        deleted: { color: 'red' },
      }
      a.default = o
    },
    23525: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#f8f8f2',
          background: 'none',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#f8f8f2',
          background: '#282a36',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          borderRadius: '0.3em',
        },
        ':not(pre) > code[class*="language-"]': {
          background: '#282a36',
          padding: '.1em',
          borderRadius: '.3em',
          whiteSpace: 'normal',
        },
        comment: { color: '#6272a4' },
        prolog: { color: '#6272a4' },
        doctype: { color: '#6272a4' },
        cdata: { color: '#6272a4' },
        punctuation: { color: '#f8f8f2' },
        '.namespace': { Opacity: '.7' },
        property: { color: '#ff79c6' },
        tag: { color: '#ff79c6' },
        constant: { color: '#ff79c6' },
        symbol: { color: '#ff79c6' },
        deleted: { color: '#ff79c6' },
        boolean: { color: '#bd93f9' },
        number: { color: '#bd93f9' },
        selector: { color: '#50fa7b' },
        'attr-name': { color: '#50fa7b' },
        string: { color: '#50fa7b' },
        char: { color: '#50fa7b' },
        builtin: { color: '#50fa7b' },
        inserted: { color: '#50fa7b' },
        operator: { color: '#f8f8f2' },
        entity: { color: '#f8f8f2', cursor: 'help' },
        url: { color: '#f8f8f2' },
        '.language-css .token.string': { color: '#f8f8f2' },
        '.style .token.string': { color: '#f8f8f2' },
        variable: { color: '#f8f8f2' },
        atrule: { color: '#f1fa8c' },
        'attr-value': { color: '#f1fa8c' },
        function: { color: '#f1fa8c' },
        'class-name': { color: '#f1fa8c' },
        keyword: { color: '#8be9fd' },
        regex: { color: '#ffb86c' },
        important: { color: '#ffb86c', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    50585: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#2a2734',
          color: '#9a86fd',
        },
        'pre[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#2a2734',
          color: '#9a86fd',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        'pre[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#6a51e6' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#6a51e6' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#6a51e6' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#6a51e6' },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: '#6a51e6' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: '#6a51e6' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: '#6a51e6' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: '#6a51e6' },
        ':not(pre) > code[class*="language-"]': { padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#6c6783' },
        prolog: { color: '#6c6783' },
        doctype: { color: '#6c6783' },
        cdata: { color: '#6c6783' },
        punctuation: { color: '#6c6783' },
        namespace: { Opacity: '.7' },
        tag: { color: '#e09142' },
        operator: { color: '#e09142' },
        number: { color: '#e09142' },
        property: { color: '#9a86fd' },
        function: { color: '#9a86fd' },
        'tag-id': { color: '#eeebff' },
        selector: { color: '#eeebff' },
        'atrule-id': { color: '#eeebff' },
        'code.language-javascript': { color: '#c4b9fe' },
        'attr-name': { color: '#c4b9fe' },
        'code.language-css': { color: '#ffcc99' },
        'code.language-scss': { color: '#ffcc99' },
        boolean: { color: '#ffcc99' },
        string: { color: '#ffcc99' },
        entity: { color: '#ffcc99', cursor: 'help' },
        url: { color: '#ffcc99' },
        '.language-css .token.string': { color: '#ffcc99' },
        '.language-scss .token.string': { color: '#ffcc99' },
        '.style .token.string': { color: '#ffcc99' },
        'attr-value': { color: '#ffcc99' },
        keyword: { color: '#ffcc99' },
        control: { color: '#ffcc99' },
        directive: { color: '#ffcc99' },
        unit: { color: '#ffcc99' },
        statement: { color: '#ffcc99' },
        regex: { color: '#ffcc99' },
        atrule: { color: '#ffcc99' },
        placeholder: { color: '#ffcc99' },
        variable: { color: '#ffcc99' },
        deleted: { textDecoration: 'line-through' },
        inserted: { borderBottom: '1px dotted #eeebff', textDecoration: 'none' },
        italic: { fontStyle: 'italic' },
        important: { fontWeight: 'bold', color: '#c4b9fe' },
        bold: { fontWeight: 'bold' },
        'pre > code.highlight': { Outline: '.4em solid #8a75f5', OutlineOffset: '.4em' },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRightColor: '#2c2937' },
        '.line-numbers .line-numbers-rows > span:before': { color: '#3c3949' },
        '.line-highlight.line-highlight': {
          background: 'linear-gradient(to right, rgba(224, 145, 66, 0.2) 70%, rgba(224, 145, 66, 0))',
        },
      }
      a.default = o
    },
    55481: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#322d29',
          color: '#88786d',
        },
        'pre[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#322d29',
          color: '#88786d',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        'pre[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#6f5849' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#6f5849' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#6f5849' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#6f5849' },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: '#6f5849' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: '#6f5849' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: '#6f5849' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: '#6f5849' },
        ':not(pre) > code[class*="language-"]': { padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#6a5f58' },
        prolog: { color: '#6a5f58' },
        doctype: { color: '#6a5f58' },
        cdata: { color: '#6a5f58' },
        punctuation: { color: '#6a5f58' },
        namespace: { Opacity: '.7' },
        tag: { color: '#bfa05a' },
        operator: { color: '#bfa05a' },
        number: { color: '#bfa05a' },
        property: { color: '#88786d' },
        function: { color: '#88786d' },
        'tag-id': { color: '#fff3eb' },
        selector: { color: '#fff3eb' },
        'atrule-id': { color: '#fff3eb' },
        'code.language-javascript': { color: '#a48774' },
        'attr-name': { color: '#a48774' },
        'code.language-css': { color: '#fcc440' },
        'code.language-scss': { color: '#fcc440' },
        boolean: { color: '#fcc440' },
        string: { color: '#fcc440' },
        entity: { color: '#fcc440', cursor: 'help' },
        url: { color: '#fcc440' },
        '.language-css .token.string': { color: '#fcc440' },
        '.language-scss .token.string': { color: '#fcc440' },
        '.style .token.string': { color: '#fcc440' },
        'attr-value': { color: '#fcc440' },
        keyword: { color: '#fcc440' },
        control: { color: '#fcc440' },
        directive: { color: '#fcc440' },
        unit: { color: '#fcc440' },
        statement: { color: '#fcc440' },
        regex: { color: '#fcc440' },
        atrule: { color: '#fcc440' },
        placeholder: { color: '#fcc440' },
        variable: { color: '#fcc440' },
        deleted: { textDecoration: 'line-through' },
        inserted: { borderBottom: '1px dotted #fff3eb', textDecoration: 'none' },
        italic: { fontStyle: 'italic' },
        important: { fontWeight: 'bold', color: '#a48774' },
        bold: { fontWeight: 'bold' },
        'pre > code.highlight': { Outline: '.4em solid #816d5f', OutlineOffset: '.4em' },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRightColor: '#35302b' },
        '.line-numbers .line-numbers-rows > span:before': { color: '#46403d' },
        '.line-highlight.line-highlight': {
          background: 'linear-gradient(to right, rgba(191, 160, 90, 0.2) 70%, rgba(191, 160, 90, 0))',
        },
      }
      a.default = o
    },
    7791: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#2a2d2a',
          color: '#687d68',
        },
        'pre[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#2a2d2a',
          color: '#687d68',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        'pre[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#435643' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#435643' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#435643' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#435643' },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: '#435643' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: '#435643' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: '#435643' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: '#435643' },
        ':not(pre) > code[class*="language-"]': { padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#535f53' },
        prolog: { color: '#535f53' },
        doctype: { color: '#535f53' },
        cdata: { color: '#535f53' },
        punctuation: { color: '#535f53' },
        namespace: { Opacity: '.7' },
        tag: { color: '#a2b34d' },
        operator: { color: '#a2b34d' },
        number: { color: '#a2b34d' },
        property: { color: '#687d68' },
        function: { color: '#687d68' },
        'tag-id': { color: '#f0fff0' },
        selector: { color: '#f0fff0' },
        'atrule-id': { color: '#f0fff0' },
        'code.language-javascript': { color: '#b3d6b3' },
        'attr-name': { color: '#b3d6b3' },
        'code.language-css': { color: '#e5fb79' },
        'code.language-scss': { color: '#e5fb79' },
        boolean: { color: '#e5fb79' },
        string: { color: '#e5fb79' },
        entity: { color: '#e5fb79', cursor: 'help' },
        url: { color: '#e5fb79' },
        '.language-css .token.string': { color: '#e5fb79' },
        '.language-scss .token.string': { color: '#e5fb79' },
        '.style .token.string': { color: '#e5fb79' },
        'attr-value': { color: '#e5fb79' },
        keyword: { color: '#e5fb79' },
        control: { color: '#e5fb79' },
        directive: { color: '#e5fb79' },
        unit: { color: '#e5fb79' },
        statement: { color: '#e5fb79' },
        regex: { color: '#e5fb79' },
        atrule: { color: '#e5fb79' },
        placeholder: { color: '#e5fb79' },
        variable: { color: '#e5fb79' },
        deleted: { textDecoration: 'line-through' },
        inserted: { borderBottom: '1px dotted #f0fff0', textDecoration: 'none' },
        italic: { fontStyle: 'italic' },
        important: { fontWeight: 'bold', color: '#b3d6b3' },
        bold: { fontWeight: 'bold' },
        'pre > code.highlight': { Outline: '.4em solid #5c705c', OutlineOffset: '.4em' },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRightColor: '#2c302c' },
        '.line-numbers .line-numbers-rows > span:before': { color: '#3b423b' },
        '.line-highlight.line-highlight': {
          background: 'linear-gradient(to right, rgba(162, 179, 77, 0.2) 70%, rgba(162, 179, 77, 0))',
        },
      }
      a.default = o
    },
    20598: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#faf8f5',
          color: '#728fcb',
        },
        'pre[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#faf8f5',
          color: '#728fcb',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        'pre[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#faf8f5' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#faf8f5' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#faf8f5' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#faf8f5' },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: '#faf8f5' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: '#faf8f5' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: '#faf8f5' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: '#faf8f5' },
        ':not(pre) > code[class*="language-"]': { padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#b6ad9a' },
        prolog: { color: '#b6ad9a' },
        doctype: { color: '#b6ad9a' },
        cdata: { color: '#b6ad9a' },
        punctuation: { color: '#b6ad9a' },
        namespace: { Opacity: '.7' },
        tag: { color: '#063289' },
        operator: { color: '#063289' },
        number: { color: '#063289' },
        property: { color: '#b29762' },
        function: { color: '#b29762' },
        'tag-id': { color: '#2d2006' },
        selector: { color: '#2d2006' },
        'atrule-id': { color: '#2d2006' },
        'code.language-javascript': { color: '#896724' },
        'attr-name': { color: '#896724' },
        'code.language-css': { color: '#728fcb' },
        'code.language-scss': { color: '#728fcb' },
        boolean: { color: '#728fcb' },
        string: { color: '#728fcb' },
        entity: { color: '#728fcb', cursor: 'help' },
        url: { color: '#728fcb' },
        '.language-css .token.string': { color: '#728fcb' },
        '.language-scss .token.string': { color: '#728fcb' },
        '.style .token.string': { color: '#728fcb' },
        'attr-value': { color: '#728fcb' },
        keyword: { color: '#728fcb' },
        control: { color: '#728fcb' },
        directive: { color: '#728fcb' },
        unit: { color: '#728fcb' },
        statement: { color: '#728fcb' },
        regex: { color: '#728fcb' },
        atrule: { color: '#728fcb' },
        placeholder: { color: '#93abdc' },
        variable: { color: '#93abdc' },
        deleted: { textDecoration: 'line-through' },
        inserted: { borderBottom: '1px dotted #2d2006', textDecoration: 'none' },
        italic: { fontStyle: 'italic' },
        important: { fontWeight: 'bold', color: '#896724' },
        bold: { fontWeight: 'bold' },
        'pre > code.highlight': { Outline: '.4em solid #896724', OutlineOffset: '.4em' },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRightColor: '#ece8de' },
        '.line-numbers .line-numbers-rows > span:before': { color: '#cdc4b1' },
        '.line-highlight.line-highlight': {
          background: 'linear-gradient(to right, rgba(45, 32, 6, 0.2) 70%, rgba(45, 32, 6, 0))',
        },
      }
      a.default = o
    },
    22402: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#1d262f',
          color: '#57718e',
        },
        'pre[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#1d262f',
          color: '#57718e',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        'pre[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#004a9e' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#004a9e' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#004a9e' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#004a9e' },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: '#004a9e' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: '#004a9e' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: '#004a9e' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: '#004a9e' },
        ':not(pre) > code[class*="language-"]': { padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#4a5f78' },
        prolog: { color: '#4a5f78' },
        doctype: { color: '#4a5f78' },
        cdata: { color: '#4a5f78' },
        punctuation: { color: '#4a5f78' },
        namespace: { Opacity: '.7' },
        tag: { color: '#0aa370' },
        operator: { color: '#0aa370' },
        number: { color: '#0aa370' },
        property: { color: '#57718e' },
        function: { color: '#57718e' },
        'tag-id': { color: '#ebf4ff' },
        selector: { color: '#ebf4ff' },
        'atrule-id': { color: '#ebf4ff' },
        'code.language-javascript': { color: '#7eb6f6' },
        'attr-name': { color: '#7eb6f6' },
        'code.language-css': { color: '#47ebb4' },
        'code.language-scss': { color: '#47ebb4' },
        boolean: { color: '#47ebb4' },
        string: { color: '#47ebb4' },
        entity: { color: '#47ebb4', cursor: 'help' },
        url: { color: '#47ebb4' },
        '.language-css .token.string': { color: '#47ebb4' },
        '.language-scss .token.string': { color: '#47ebb4' },
        '.style .token.string': { color: '#47ebb4' },
        'attr-value': { color: '#47ebb4' },
        keyword: { color: '#47ebb4' },
        control: { color: '#47ebb4' },
        directive: { color: '#47ebb4' },
        unit: { color: '#47ebb4' },
        statement: { color: '#47ebb4' },
        regex: { color: '#47ebb4' },
        atrule: { color: '#47ebb4' },
        placeholder: { color: '#47ebb4' },
        variable: { color: '#47ebb4' },
        deleted: { textDecoration: 'line-through' },
        inserted: { borderBottom: '1px dotted #ebf4ff', textDecoration: 'none' },
        italic: { fontStyle: 'italic' },
        important: { fontWeight: 'bold', color: '#7eb6f6' },
        bold: { fontWeight: 'bold' },
        'pre > code.highlight': { Outline: '.4em solid #34659d', OutlineOffset: '.4em' },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRightColor: '#1f2932' },
        '.line-numbers .line-numbers-rows > span:before': { color: '#2c3847' },
        '.line-highlight.line-highlight': {
          background: 'linear-gradient(to right, rgba(10, 163, 112, 0.2) 70%, rgba(10, 163, 112, 0))',
        },
      }
      a.default = o
    },
    94092: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#24242e',
          color: '#767693',
        },
        'pre[class*="language-"]': {
          fontFamily:
            'Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace',
          fontSize: '14px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: '#24242e',
          color: '#767693',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        'pre[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#5151e6' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#5151e6' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#5151e6' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#5151e6' },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: '#5151e6' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: '#5151e6' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: '#5151e6' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: '#5151e6' },
        ':not(pre) > code[class*="language-"]': { padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#5b5b76' },
        prolog: { color: '#5b5b76' },
        doctype: { color: '#5b5b76' },
        cdata: { color: '#5b5b76' },
        punctuation: { color: '#5b5b76' },
        namespace: { Opacity: '.7' },
        tag: { color: '#dd672c' },
        operator: { color: '#dd672c' },
        number: { color: '#dd672c' },
        property: { color: '#767693' },
        function: { color: '#767693' },
        'tag-id': { color: '#ebebff' },
        selector: { color: '#ebebff' },
        'atrule-id': { color: '#ebebff' },
        'code.language-javascript': { color: '#aaaaca' },
        'attr-name': { color: '#aaaaca' },
        'code.language-css': { color: '#fe8c52' },
        'code.language-scss': { color: '#fe8c52' },
        boolean: { color: '#fe8c52' },
        string: { color: '#fe8c52' },
        entity: { color: '#fe8c52', cursor: 'help' },
        url: { color: '#fe8c52' },
        '.language-css .token.string': { color: '#fe8c52' },
        '.language-scss .token.string': { color: '#fe8c52' },
        '.style .token.string': { color: '#fe8c52' },
        'attr-value': { color: '#fe8c52' },
        keyword: { color: '#fe8c52' },
        control: { color: '#fe8c52' },
        directive: { color: '#fe8c52' },
        unit: { color: '#fe8c52' },
        statement: { color: '#fe8c52' },
        regex: { color: '#fe8c52' },
        atrule: { color: '#fe8c52' },
        placeholder: { color: '#fe8c52' },
        variable: { color: '#fe8c52' },
        deleted: { textDecoration: 'line-through' },
        inserted: { borderBottom: '1px dotted #ebebff', textDecoration: 'none' },
        italic: { fontStyle: 'italic' },
        important: { fontWeight: 'bold', color: '#aaaaca' },
        bold: { fontWeight: 'bold' },
        'pre > code.highlight': { Outline: '.4em solid #7676f4', OutlineOffset: '.4em' },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRightColor: '#262631' },
        '.line-numbers .line-numbers-rows > span:before': { color: '#393949' },
        '.line-highlight.line-highlight': {
          background: 'linear-gradient(to right, rgba(221, 103, 44, 0.2) 70%, rgba(221, 103, 44, 0))',
        },
      }
      a.default = o
    },
    50754: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          background: 'black',
          color: 'white',
          boxShadow: '-.3em 0 0 .3em black, .3em 0 0 .3em black',
        },
        'pre[class*="language-"]': {
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '.4em .8em',
          margin: '.5em 0',
          overflow: 'auto',
          background: `url('data:image/svg+xml;charset=utf-8,<svg%20version%3D"1.1"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20width%3D"100"%20height%3D"100"%20fill%3D"rgba(0%2C0%2C0%2C.2)">%0D%0A<polygon%20points%3D"0%2C50%2050%2C0%200%2C0"%20%2F>%0D%0A<polygon%20points%3D"0%2C100%2050%2C100%20100%2C50%20100%2C0"%20%2F>%0D%0A<%2Fsvg>')`,
          backgroundSize: '1em 1em',
        },
        ':not(pre) > code[class*="language-"]': {
          padding: '.2em',
          borderRadius: '.3em',
          boxShadow: 'none',
          whiteSpace: 'normal',
        },
        comment: { color: '#aaa' },
        prolog: { color: '#aaa' },
        doctype: { color: '#aaa' },
        cdata: { color: '#aaa' },
        punctuation: { color: '#999' },
        namespace: { Opacity: '.7' },
        property: { color: '#0cf' },
        tag: { color: '#0cf' },
        boolean: { color: '#0cf' },
        number: { color: '#0cf' },
        constant: { color: '#0cf' },
        symbol: { color: '#0cf' },
        selector: { color: 'yellow' },
        'attr-name': { color: 'yellow' },
        string: { color: 'yellow' },
        char: { color: 'yellow' },
        builtin: { color: 'yellow' },
        operator: { color: 'yellowgreen' },
        entity: { color: 'yellowgreen', cursor: 'help' },
        url: { color: 'yellowgreen' },
        '.language-css .token.string': { color: 'yellowgreen' },
        variable: { color: 'yellowgreen' },
        inserted: { color: 'yellowgreen' },
        atrule: { color: 'deeppink' },
        'attr-value': { color: 'deeppink' },
        keyword: { color: 'deeppink' },
        regex: { color: 'orange' },
        important: { color: 'orange', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        deleted: { color: 'red' },
        'pre.diff-highlight.diff-highlight > code .token.deleted:not(.prefix)': {
          backgroundColor: 'rgba(255, 0, 0, .3)',
          display: 'inline',
        },
        'pre > code.diff-highlight.diff-highlight .token.deleted:not(.prefix)': {
          backgroundColor: 'rgba(255, 0, 0, .3)',
          display: 'inline',
        },
        'pre.diff-highlight.diff-highlight > code .token.inserted:not(.prefix)': {
          backgroundColor: 'rgba(0, 255, 128, .3)',
          display: 'inline',
        },
        'pre > code.diff-highlight.diff-highlight .token.inserted:not(.prefix)': {
          backgroundColor: 'rgba(0, 255, 128, .3)',
          display: 'inline',
        },
      }
      a.default = o
    },
    97483: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#393A34',
          fontFamily: '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          fontSize: '.9em',
          lineHeight: '1.2em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#393A34',
          fontFamily: '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          fontSize: '.9em',
          lineHeight: '1.2em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          border: '1px solid #dddddd',
          backgroundColor: 'white',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        'pre[class*="language-"]::-moz-selection': { background: '#b3d4fc' },
        'pre[class*="language-"] ::-moz-selection': { background: '#b3d4fc' },
        'code[class*="language-"]::-moz-selection': { background: '#b3d4fc' },
        'code[class*="language-"] ::-moz-selection': { background: '#b3d4fc' },
        'pre[class*="language-"]::selection': { background: '#b3d4fc' },
        'pre[class*="language-"] ::selection': { background: '#b3d4fc' },
        'code[class*="language-"]::selection': { background: '#b3d4fc' },
        'code[class*="language-"] ::selection': { background: '#b3d4fc' },
        ':not(pre) > code[class*="language-"]': {
          padding: '.2em',
          paddingTop: '1px',
          paddingBottom: '1px',
          background: '#f8f8f8',
          border: '1px solid #dddddd',
        },
        comment: { color: '#999988', fontStyle: 'italic' },
        prolog: { color: '#999988', fontStyle: 'italic' },
        doctype: { color: '#999988', fontStyle: 'italic' },
        cdata: { color: '#999988', fontStyle: 'italic' },
        namespace: { Opacity: '.7' },
        string: { color: '#e3116c' },
        'attr-value': { color: '#e3116c' },
        punctuation: { color: '#393A34' },
        operator: { color: '#393A34' },
        entity: { color: '#36acaa' },
        url: { color: '#36acaa' },
        symbol: { color: '#36acaa' },
        number: { color: '#36acaa' },
        boolean: { color: '#36acaa' },
        variable: { color: '#36acaa' },
        constant: { color: '#36acaa' },
        property: { color: '#36acaa' },
        regex: { color: '#36acaa' },
        inserted: { color: '#36acaa' },
        atrule: { color: '#00a4db' },
        keyword: { color: '#00a4db' },
        'attr-name': { color: '#00a4db' },
        '.language-autohotkey .token.selector': { color: '#00a4db' },
        function: { color: '#9a050f', fontWeight: 'bold' },
        deleted: { color: '#9a050f' },
        '.language-autohotkey .token.tag': { color: '#9a050f' },
        tag: { color: '#00009f' },
        selector: { color: '#00009f' },
        '.language-autohotkey .token.keyword': { color: '#00009f' },
        important: { fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    12278: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#ebdbb2',
          fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#ebdbb2',
          fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '0.5em 0',
          overflow: 'auto',
          background: '#1d2021',
        },
        'pre[class*="language-"]::-moz-selection': { color: '#fbf1c7', background: '#7c6f64' },
        'pre[class*="language-"] ::-moz-selection': { color: '#fbf1c7', background: '#7c6f64' },
        'code[class*="language-"]::-moz-selection': { color: '#fbf1c7', background: '#7c6f64' },
        'code[class*="language-"] ::-moz-selection': { color: '#fbf1c7', background: '#7c6f64' },
        'pre[class*="language-"]::selection': { color: '#fbf1c7', background: '#7c6f64' },
        'pre[class*="language-"] ::selection': { color: '#fbf1c7', background: '#7c6f64' },
        'code[class*="language-"]::selection': { color: '#fbf1c7', background: '#7c6f64' },
        'code[class*="language-"] ::selection': { color: '#fbf1c7', background: '#7c6f64' },
        ':not(pre) > code[class*="language-"]': { background: '#1d2021', padding: '0.1em', borderRadius: '0.3em' },
        comment: { color: '#a89984' },
        prolog: { color: '#a89984' },
        cdata: { color: '#a89984' },
        delimiter: { color: '#fb4934' },
        boolean: { color: '#fb4934' },
        keyword: { color: '#fb4934' },
        selector: { color: '#fb4934' },
        important: { color: '#fb4934' },
        atrule: { color: '#fb4934' },
        operator: { color: '#a89984' },
        punctuation: { color: '#a89984' },
        'attr-name': { color: '#a89984' },
        tag: { color: '#fabd2f' },
        'tag.punctuation': { color: '#fabd2f' },
        doctype: { color: '#fabd2f' },
        builtin: { color: '#fabd2f' },
        entity: { color: '#d3869b' },
        number: { color: '#d3869b' },
        symbol: { color: '#d3869b' },
        property: { color: '#fb4934' },
        constant: { color: '#fb4934' },
        variable: { color: '#fb4934' },
        string: { color: '#b8bb26' },
        char: { color: '#b8bb26' },
        'attr-value': { color: '#a89984' },
        'attr-value.punctuation': { color: '#a89984' },
        url: { color: '#b8bb26', textDecoration: 'underline' },
        function: { color: '#fabd2f' },
        regex: { background: '#b8bb26' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        inserted: { background: '#a89984' },
        deleted: { background: '#fb4934' },
      }
      a.default = o
    },
    52615: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#3c3836',
          fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#3c3836',
          fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '0.5em 0',
          overflow: 'auto',
          background: '#f9f5d7',
        },
        'pre[class*="language-"]::-moz-selection': { color: '#282828', background: '#a89984' },
        'pre[class*="language-"] ::-moz-selection': { color: '#282828', background: '#a89984' },
        'code[class*="language-"]::-moz-selection': { color: '#282828', background: '#a89984' },
        'code[class*="language-"] ::-moz-selection': { color: '#282828', background: '#a89984' },
        'pre[class*="language-"]::selection': { color: '#282828', background: '#a89984' },
        'pre[class*="language-"] ::selection': { color: '#282828', background: '#a89984' },
        'code[class*="language-"]::selection': { color: '#282828', background: '#a89984' },
        'code[class*="language-"] ::selection': { color: '#282828', background: '#a89984' },
        ':not(pre) > code[class*="language-"]': { background: '#f9f5d7', padding: '0.1em', borderRadius: '0.3em' },
        comment: { color: '#7c6f64' },
        prolog: { color: '#7c6f64' },
        cdata: { color: '#7c6f64' },
        delimiter: { color: '#9d0006' },
        boolean: { color: '#9d0006' },
        keyword: { color: '#9d0006' },
        selector: { color: '#9d0006' },
        important: { color: '#9d0006' },
        atrule: { color: '#9d0006' },
        operator: { color: '#7c6f64' },
        punctuation: { color: '#7c6f64' },
        'attr-name': { color: '#7c6f64' },
        tag: { color: '#b57614' },
        'tag.punctuation': { color: '#b57614' },
        doctype: { color: '#b57614' },
        builtin: { color: '#b57614' },
        entity: { color: '#8f3f71' },
        number: { color: '#8f3f71' },
        symbol: { color: '#8f3f71' },
        property: { color: '#9d0006' },
        constant: { color: '#9d0006' },
        variable: { color: '#9d0006' },
        string: { color: '#797403' },
        char: { color: '#797403' },
        'attr-value': { color: '#7c6f64' },
        'attr-value.punctuation': { color: '#7c6f64' },
        url: { color: '#797403', textDecoration: 'underline' },
        function: { color: '#b57614' },
        regex: { background: '#797403' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        inserted: { background: '#7c6f64' },
        deleted: { background: '#9d0006' },
      }
      a.default = o
    },
    75531: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        "code[class*='language-']": {
          color: '#d6e7ff',
          background: '#030314',
          textShadow: 'none',
          fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          fontSize: '1em',
          lineHeight: '1.5',
          letterSpacing: '.2px',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          textAlign: 'left',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        "pre[class*='language-']": {
          color: '#d6e7ff',
          background: '#030314',
          textShadow: 'none',
          fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          fontSize: '1em',
          lineHeight: '1.5',
          letterSpacing: '.2px',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          textAlign: 'left',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          border: '1px solid #2a4555',
          borderRadius: '5px',
          padding: '1.5em 1em',
          margin: '1em 0',
          overflow: 'auto',
        },
        "pre[class*='language-']::-moz-selection": { color: 'inherit', background: '#1d3b54', textShadow: 'none' },
        "pre[class*='language-'] ::-moz-selection": { color: 'inherit', background: '#1d3b54', textShadow: 'none' },
        "code[class*='language-']::-moz-selection": { color: 'inherit', background: '#1d3b54', textShadow: 'none' },
        "code[class*='language-'] ::-moz-selection": { color: 'inherit', background: '#1d3b54', textShadow: 'none' },
        "pre[class*='language-']::selection": { color: 'inherit', background: '#1d3b54', textShadow: 'none' },
        "pre[class*='language-'] ::selection": { color: 'inherit', background: '#1d3b54', textShadow: 'none' },
        "code[class*='language-']::selection": { color: 'inherit', background: '#1d3b54', textShadow: 'none' },
        "code[class*='language-'] ::selection": { color: 'inherit', background: '#1d3b54', textShadow: 'none' },
        ":not(pre) > code[class*='language-']": {
          color: '#f0f6f6',
          background: '#2a4555',
          padding: '0.2em 0.3em',
          borderRadius: '0.2em',
          boxDecorationBreak: 'clone',
        },
        comment: { color: '#446e69' },
        prolog: { color: '#446e69' },
        doctype: { color: '#446e69' },
        cdata: { color: '#446e69' },
        punctuation: { color: '#d6b007' },
        property: { color: '#d6e7ff' },
        tag: { color: '#d6e7ff' },
        boolean: { color: '#d6e7ff' },
        number: { color: '#d6e7ff' },
        constant: { color: '#d6e7ff' },
        symbol: { color: '#d6e7ff' },
        deleted: { color: '#d6e7ff' },
        selector: { color: '#e60067' },
        'attr-name': { color: '#e60067' },
        builtin: { color: '#e60067' },
        inserted: { color: '#e60067' },
        string: { color: '#49c6ec' },
        char: { color: '#49c6ec' },
        operator: { color: '#ec8e01', background: 'transparent' },
        entity: { color: '#ec8e01', background: 'transparent' },
        url: { color: '#ec8e01', background: 'transparent' },
        '.language-css .token.string': { color: '#ec8e01', background: 'transparent' },
        '.style .token.string': { color: '#ec8e01', background: 'transparent' },
        atrule: { color: '#0fe468' },
        'attr-value': { color: '#0fe468' },
        keyword: { color: '#0fe468' },
        function: { color: '#78f3e9' },
        'class-name': { color: '#78f3e9' },
        regex: { color: '#d6e7ff' },
        important: { color: '#d6e7ff' },
        variable: { color: '#d6e7ff' },
      }
      a.default = o
    },
    70096: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          fontFamily: '"Fira Mono", Menlo, Monaco, "Lucida Console", "Courier New", Courier, monospace',
          fontSize: '16px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          wordSpacing: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          wordWrap: 'break-word',
          background: '#322931',
          color: '#b9b5b8',
        },
        'pre[class*="language-"]': {
          fontFamily: '"Fira Mono", Menlo, Monaco, "Lucida Console", "Courier New", Courier, monospace',
          fontSize: '16px',
          lineHeight: '1.375',
          direction: 'ltr',
          textAlign: 'left',
          wordSpacing: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          wordWrap: 'break-word',
          background: '#322931',
          color: '#b9b5b8',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        ':not(pre) > code[class*="language-"]': { padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#797379' },
        prolog: { color: '#797379' },
        doctype: { color: '#797379' },
        cdata: { color: '#797379' },
        punctuation: { color: '#b9b5b8' },
        '.namespace': { Opacity: '.7' },
        null: { color: '#fd8b19' },
        operator: { color: '#fd8b19' },
        boolean: { color: '#fd8b19' },
        number: { color: '#fd8b19' },
        property: { color: '#fdcc59' },
        tag: { color: '#1290bf' },
        string: { color: '#149b93' },
        selector: { color: '#c85e7c' },
        'attr-name': { color: '#fd8b19' },
        entity: { color: '#149b93', cursor: 'help' },
        url: { color: '#149b93' },
        '.language-css .token.string': { color: '#149b93' },
        '.style .token.string': { color: '#149b93' },
        'attr-value': { color: '#8fc13e' },
        keyword: { color: '#8fc13e' },
        control: { color: '#8fc13e' },
        directive: { color: '#8fc13e' },
        unit: { color: '#8fc13e' },
        statement: { color: '#149b93' },
        regex: { color: '#149b93' },
        atrule: { color: '#149b93' },
        placeholder: { color: '#1290bf' },
        variable: { color: '#1290bf' },
        important: { color: '#dd464c', fontWeight: 'bold' },
        'pre > code.highlight': { Outline: '.4em solid red', OutlineOffset: '.4em' },
      }
      a.default = o
    },
    89563: function (E, a, o) {
      'use strict'
      var c,
        f = o(98772)
      ;(c = { value: !0 }),
        (c = {
          enumerable: !0,
          get: function () {
            return v.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return H.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return P.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return F.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return I.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return U.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return m.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return $.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return X.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return x.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return ue.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return B.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return ce.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return se.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return J.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return Ee.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return Ce.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return w.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return j.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return V.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return q.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return be.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return Q.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return te.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return _.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return re.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return oe.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return ke.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return he.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return k.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return Ae.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return we.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return ie.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return u.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return le.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return fe.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return C.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return Te.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return g.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return p.default
          },
        }),
        Object.defineProperty(a, 'vs', {
          enumerable: !0,
          get: function () {
            return Le.default
          },
        }),
        Object.defineProperty(a, 'YC', {
          enumerable: !0,
          get: function () {
            return ve.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return xe.default
          },
        }),
        (c = {
          enumerable: !0,
          get: function () {
            return ne.default
          },
        })
      var m = f(o(18403)),
        x = f(o(15762)),
        w = f(o(50754)),
        k = f(o(6168)),
        C = f(o(17889)),
        g = f(o(38157)),
        p = f(o(42358)),
        u = f(o(47863)),
        v = f(o(13379)),
        H = f(o(83150)),
        P = f(o(36352)),
        F = f(o(89449)),
        I = f(o(56577)),
        U = f(o(96946)),
        $ = f(o(28459)),
        X = f(o(36063)),
        ue = f(o(23525)),
        B = f(o(50585)),
        ce = f(o(55481)),
        se = f(o(7791)),
        J = f(o(20598)),
        Ee = f(o(22402)),
        Ce = f(o(94092)),
        j = f(o(97483)),
        V = f(o(12278)),
        q = f(o(52615)),
        be = f(o(75531)),
        Q = f(o(70096)),
        te = f(o(31616)),
        _ = f(o(76241)),
        re = f(o(26691)),
        oe = f(o(44573)),
        ke = f(o(57555)),
        he = f(o(34430)),
        Ae = f(o(48444)),
        we = f(o(14635)),
        ie = f(o(40197)),
        le = f(o(78648)),
        fe = f(o(28451)),
        Te = f(o(70243)),
        Le = f(o(43889)),
        ve = f(o(55375)),
        xe = f(o(74771)),
        ne = f(o(3415))
    },
    31616: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#f8f8f2',
          background: 'none',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: "Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', monospace",
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#f8f8f2',
          background: '#263E52',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: "Monaco, Consolas, 'Andale Mono', 'Ubuntu Mono', monospace",
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          borderRadius: '0.3em',
        },
        ':not(pre) > code[class*="language-"]': {
          background: '#263E52',
          padding: '.1em',
          borderRadius: '.3em',
          whiteSpace: 'normal',
        },
        comment: { color: '#5c98cd' },
        prolog: { color: '#5c98cd' },
        doctype: { color: '#5c98cd' },
        cdata: { color: '#5c98cd' },
        punctuation: { color: '#f8f8f2' },
        '.namespace': { Opacity: '.7' },
        property: { color: '#F05E5D' },
        tag: { color: '#F05E5D' },
        constant: { color: '#F05E5D' },
        symbol: { color: '#F05E5D' },
        deleted: { color: '#F05E5D' },
        boolean: { color: '#BC94F9' },
        number: { color: '#BC94F9' },
        selector: { color: '#FCFCD6' },
        'attr-name': { color: '#FCFCD6' },
        string: { color: '#FCFCD6' },
        char: { color: '#FCFCD6' },
        builtin: { color: '#FCFCD6' },
        inserted: { color: '#FCFCD6' },
        operator: { color: '#f8f8f2' },
        entity: { color: '#f8f8f2', cursor: 'help' },
        url: { color: '#f8f8f2' },
        '.language-css .token.string': { color: '#f8f8f2' },
        '.style .token.string': { color: '#f8f8f2' },
        variable: { color: '#f8f8f2' },
        atrule: { color: '#66D8EF' },
        'attr-value': { color: '#66D8EF' },
        function: { color: '#66D8EF' },
        'class-name': { color: '#66D8EF' },
        keyword: { color: '#6EB26E' },
        regex: { color: '#F05E5D' },
        important: { color: '#F05E5D', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    76241: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          color: '#eee',
          background: '#2f2f2f',
          fontFamily: 'Roboto Mono, monospace',
          fontSize: '1em',
          lineHeight: '1.5em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          color: '#eee',
          background: '#2f2f2f',
          fontFamily: 'Roboto Mono, monospace',
          fontSize: '1em',
          lineHeight: '1.5em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          overflow: 'auto',
          position: 'relative',
          margin: '0.5em 0',
          padding: '1.25em 1em',
        },
        'code[class*="language-"]::-moz-selection': { background: '#363636' },
        'pre[class*="language-"]::-moz-selection': { background: '#363636' },
        'code[class*="language-"] ::-moz-selection': { background: '#363636' },
        'pre[class*="language-"] ::-moz-selection': { background: '#363636' },
        'code[class*="language-"]::selection': { background: '#363636' },
        'pre[class*="language-"]::selection': { background: '#363636' },
        'code[class*="language-"] ::selection': { background: '#363636' },
        'pre[class*="language-"] ::selection': { background: '#363636' },
        ':not(pre) > code[class*="language-"]': { whiteSpace: 'normal', borderRadius: '0.2em', padding: '0.1em' },
        '.language-css > code': { color: '#fd9170' },
        '.language-sass > code': { color: '#fd9170' },
        '.language-scss > code': { color: '#fd9170' },
        '[class*="language-"] .namespace': { Opacity: '0.7' },
        atrule: { color: '#c792ea' },
        'attr-name': { color: '#ffcb6b' },
        'attr-value': { color: '#a5e844' },
        attribute: { color: '#a5e844' },
        boolean: { color: '#c792ea' },
        builtin: { color: '#ffcb6b' },
        cdata: { color: '#80cbc4' },
        char: { color: '#80cbc4' },
        class: { color: '#ffcb6b' },
        'class-name': { color: '#f2ff00' },
        comment: { color: '#616161' },
        constant: { color: '#c792ea' },
        deleted: { color: '#ff6666' },
        doctype: { color: '#616161' },
        entity: { color: '#ff6666' },
        function: { color: '#c792ea' },
        hexcode: { color: '#f2ff00' },
        id: { color: '#c792ea', fontWeight: 'bold' },
        important: { color: '#c792ea', fontWeight: 'bold' },
        inserted: { color: '#80cbc4' },
        keyword: { color: '#c792ea' },
        number: { color: '#fd9170' },
        operator: { color: '#89ddff' },
        prolog: { color: '#616161' },
        property: { color: '#80cbc4' },
        'pseudo-class': { color: '#a5e844' },
        'pseudo-element': { color: '#a5e844' },
        punctuation: { color: '#89ddff' },
        regex: { color: '#f2ff00' },
        selector: { color: '#ff6666' },
        string: { color: '#a5e844' },
        symbol: { color: '#c792ea' },
        tag: { color: '#ff6666' },
        unit: { color: '#fd9170' },
        url: { color: '#ff6666' },
        variable: { color: '#ff6666' },
      }
      a.default = o
    },
    26691: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          color: '#90a4ae',
          background: '#fafafa',
          fontFamily: 'Roboto Mono, monospace',
          fontSize: '1em',
          lineHeight: '1.5em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          color: '#90a4ae',
          background: '#fafafa',
          fontFamily: 'Roboto Mono, monospace',
          fontSize: '1em',
          lineHeight: '1.5em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          overflow: 'auto',
          position: 'relative',
          margin: '0.5em 0',
          padding: '1.25em 1em',
        },
        'code[class*="language-"]::-moz-selection': { background: '#cceae7', color: '#263238' },
        'pre[class*="language-"]::-moz-selection': { background: '#cceae7', color: '#263238' },
        'code[class*="language-"] ::-moz-selection': { background: '#cceae7', color: '#263238' },
        'pre[class*="language-"] ::-moz-selection': { background: '#cceae7', color: '#263238' },
        'code[class*="language-"]::selection': { background: '#cceae7', color: '#263238' },
        'pre[class*="language-"]::selection': { background: '#cceae7', color: '#263238' },
        'code[class*="language-"] ::selection': { background: '#cceae7', color: '#263238' },
        'pre[class*="language-"] ::selection': { background: '#cceae7', color: '#263238' },
        ':not(pre) > code[class*="language-"]': { whiteSpace: 'normal', borderRadius: '0.2em', padding: '0.1em' },
        '.language-css > code': { color: '#f76d47' },
        '.language-sass > code': { color: '#f76d47' },
        '.language-scss > code': { color: '#f76d47' },
        '[class*="language-"] .namespace': { Opacity: '0.7' },
        atrule: { color: '#7c4dff' },
        'attr-name': { color: '#39adb5' },
        'attr-value': { color: '#f6a434' },
        attribute: { color: '#f6a434' },
        boolean: { color: '#7c4dff' },
        builtin: { color: '#39adb5' },
        cdata: { color: '#39adb5' },
        char: { color: '#39adb5' },
        class: { color: '#39adb5' },
        'class-name': { color: '#6182b8' },
        comment: { color: '#aabfc9' },
        constant: { color: '#7c4dff' },
        deleted: { color: '#e53935' },
        doctype: { color: '#aabfc9' },
        entity: { color: '#e53935' },
        function: { color: '#7c4dff' },
        hexcode: { color: '#f76d47' },
        id: { color: '#7c4dff', fontWeight: 'bold' },
        important: { color: '#7c4dff', fontWeight: 'bold' },
        inserted: { color: '#39adb5' },
        keyword: { color: '#7c4dff' },
        number: { color: '#f76d47' },
        operator: { color: '#39adb5' },
        prolog: { color: '#aabfc9' },
        property: { color: '#39adb5' },
        'pseudo-class': { color: '#f6a434' },
        'pseudo-element': { color: '#f6a434' },
        punctuation: { color: '#39adb5' },
        regex: { color: '#6182b8' },
        selector: { color: '#e53935' },
        string: { color: '#f6a434' },
        symbol: { color: '#7c4dff' },
        tag: { color: '#e53935' },
        unit: { color: '#f76d47' },
        url: { color: '#e53935' },
        variable: { color: '#e53935' },
      }
      a.default = o
    },
    44573: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          color: '#c3cee3',
          background: '#263238',
          fontFamily: 'Roboto Mono, monospace',
          fontSize: '1em',
          lineHeight: '1.5em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          color: '#c3cee3',
          background: '#263238',
          fontFamily: 'Roboto Mono, monospace',
          fontSize: '1em',
          lineHeight: '1.5em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          overflow: 'auto',
          position: 'relative',
          margin: '0.5em 0',
          padding: '1.25em 1em',
        },
        'code[class*="language-"]::-moz-selection': { background: '#363636' },
        'pre[class*="language-"]::-moz-selection': { background: '#363636' },
        'code[class*="language-"] ::-moz-selection': { background: '#363636' },
        'pre[class*="language-"] ::-moz-selection': { background: '#363636' },
        'code[class*="language-"]::selection': { background: '#363636' },
        'pre[class*="language-"]::selection': { background: '#363636' },
        'code[class*="language-"] ::selection': { background: '#363636' },
        'pre[class*="language-"] ::selection': { background: '#363636' },
        ':not(pre) > code[class*="language-"]': { whiteSpace: 'normal', borderRadius: '0.2em', padding: '0.1em' },
        '.language-css > code': { color: '#fd9170' },
        '.language-sass > code': { color: '#fd9170' },
        '.language-scss > code': { color: '#fd9170' },
        '[class*="language-"] .namespace': { Opacity: '0.7' },
        atrule: { color: '#c792ea' },
        'attr-name': { color: '#ffcb6b' },
        'attr-value': { color: '#c3e88d' },
        attribute: { color: '#c3e88d' },
        boolean: { color: '#c792ea' },
        builtin: { color: '#ffcb6b' },
        cdata: { color: '#80cbc4' },
        char: { color: '#80cbc4' },
        class: { color: '#ffcb6b' },
        'class-name': { color: '#f2ff00' },
        color: { color: '#f2ff00' },
        comment: { color: '#546e7a' },
        constant: { color: '#c792ea' },
        deleted: { color: '#f07178' },
        doctype: { color: '#546e7a' },
        entity: { color: '#f07178' },
        function: { color: '#c792ea' },
        hexcode: { color: '#f2ff00' },
        id: { color: '#c792ea', fontWeight: 'bold' },
        important: { color: '#c792ea', fontWeight: 'bold' },
        inserted: { color: '#80cbc4' },
        keyword: { color: '#c792ea', fontStyle: 'italic' },
        number: { color: '#fd9170' },
        operator: { color: '#89ddff' },
        prolog: { color: '#546e7a' },
        property: { color: '#80cbc4' },
        'pseudo-class': { color: '#c3e88d' },
        'pseudo-element': { color: '#c3e88d' },
        punctuation: { color: '#89ddff' },
        regex: { color: '#f2ff00' },
        selector: { color: '#f07178' },
        string: { color: '#c3e88d' },
        symbol: { color: '#c792ea' },
        tag: { color: '#f07178' },
        unit: { color: '#f07178' },
        url: { color: '#fd9170' },
        variable: { color: '#f07178' },
      }
      a.default = o
    },
    57555: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#d6deeb',
          fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          fontSize: '1em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: 'white',
          fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          fontSize: '1em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '0.5em 0',
          overflow: 'auto',
          background: '#011627',
        },
        'pre[class*="language-"]::-moz-selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        ':not(pre) > code[class*="language-"]': {
          color: 'white',
          background: '#011627',
          padding: '0.1em',
          borderRadius: '0.3em',
          whiteSpace: 'normal',
        },
        comment: { color: 'rgb(99, 119, 119)', fontStyle: 'italic' },
        prolog: { color: 'rgb(99, 119, 119)', fontStyle: 'italic' },
        cdata: { color: 'rgb(99, 119, 119)', fontStyle: 'italic' },
        punctuation: { color: 'rgb(199, 146, 234)' },
        '.namespace': { color: 'rgb(178, 204, 214)' },
        deleted: { color: 'rgba(239, 83, 80, 0.56)', fontStyle: 'italic' },
        symbol: { color: 'rgb(128, 203, 196)' },
        property: { color: 'rgb(128, 203, 196)' },
        tag: { color: 'rgb(127, 219, 202)' },
        operator: { color: 'rgb(127, 219, 202)' },
        keyword: { color: 'rgb(127, 219, 202)' },
        boolean: { color: 'rgb(255, 88, 116)' },
        number: { color: 'rgb(247, 140, 108)' },
        constant: { color: 'rgb(130, 170, 255)' },
        function: { color: 'rgb(130, 170, 255)' },
        builtin: { color: 'rgb(130, 170, 255)' },
        char: { color: 'rgb(130, 170, 255)' },
        selector: { color: 'rgb(199, 146, 234)', fontStyle: 'italic' },
        doctype: { color: 'rgb(199, 146, 234)', fontStyle: 'italic' },
        'attr-name': { color: 'rgb(173, 219, 103)', fontStyle: 'italic' },
        inserted: { color: 'rgb(173, 219, 103)', fontStyle: 'italic' },
        string: { color: 'rgb(173, 219, 103)' },
        url: { color: 'rgb(173, 219, 103)' },
        entity: { color: 'rgb(173, 219, 103)' },
        '.language-css .token.string': { color: 'rgb(173, 219, 103)' },
        '.style .token.string': { color: 'rgb(173, 219, 103)' },
        'class-name': { color: 'rgb(255, 203, 139)' },
        atrule: { color: 'rgb(255, 203, 139)' },
        'attr-value': { color: 'rgb(255, 203, 139)' },
        regex: { color: 'rgb(214, 222, 235)' },
        important: { color: 'rgb(214, 222, 235)', fontWeight: 'bold' },
        variable: { color: 'rgb(214, 222, 235)' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    34430: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#f8f8f2',
          background: 'none',
          fontFamily: `"Fira Code", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#f8f8f2',
          background: '#2E3440',
          fontFamily: `"Fira Code", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          borderRadius: '0.3em',
        },
        ':not(pre) > code[class*="language-"]': {
          background: '#2E3440',
          padding: '.1em',
          borderRadius: '.3em',
          whiteSpace: 'normal',
        },
        comment: { color: '#636f88' },
        prolog: { color: '#636f88' },
        doctype: { color: '#636f88' },
        cdata: { color: '#636f88' },
        punctuation: { color: '#81A1C1' },
        '.namespace': { Opacity: '.7' },
        property: { color: '#81A1C1' },
        tag: { color: '#81A1C1' },
        constant: { color: '#81A1C1' },
        symbol: { color: '#81A1C1' },
        deleted: { color: '#81A1C1' },
        number: { color: '#B48EAD' },
        boolean: { color: '#81A1C1' },
        selector: { color: '#A3BE8C' },
        'attr-name': { color: '#A3BE8C' },
        string: { color: '#A3BE8C' },
        char: { color: '#A3BE8C' },
        builtin: { color: '#A3BE8C' },
        inserted: { color: '#A3BE8C' },
        operator: { color: '#81A1C1' },
        entity: { color: '#81A1C1', cursor: 'help' },
        url: { color: '#81A1C1' },
        '.language-css .token.string': { color: '#81A1C1' },
        '.style .token.string': { color: '#81A1C1' },
        variable: { color: '#81A1C1' },
        atrule: { color: '#88C0D0' },
        'attr-value': { color: '#88C0D0' },
        function: { color: '#88C0D0' },
        'class-name': { color: '#88C0D0' },
        keyword: { color: '#81A1C1' },
        regex: { color: '#EBCB8B' },
        important: { color: '#EBCB8B', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    6168: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#f8f8f2',
          background: 'none',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#f8f8f2',
          background: '#272822',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          borderRadius: '0.3em',
        },
        ':not(pre) > code[class*="language-"]': {
          background: '#272822',
          padding: '.1em',
          borderRadius: '.3em',
          whiteSpace: 'normal',
        },
        comment: { color: '#8292a2' },
        prolog: { color: '#8292a2' },
        doctype: { color: '#8292a2' },
        cdata: { color: '#8292a2' },
        punctuation: { color: '#f8f8f2' },
        namespace: { Opacity: '.7' },
        property: { color: '#f92672' },
        tag: { color: '#f92672' },
        constant: { color: '#f92672' },
        symbol: { color: '#f92672' },
        deleted: { color: '#f92672' },
        boolean: { color: '#ae81ff' },
        number: { color: '#ae81ff' },
        selector: { color: '#a6e22e' },
        'attr-name': { color: '#a6e22e' },
        string: { color: '#a6e22e' },
        char: { color: '#a6e22e' },
        builtin: { color: '#a6e22e' },
        inserted: { color: '#a6e22e' },
        operator: { color: '#f8f8f2' },
        entity: { color: '#f8f8f2', cursor: 'help' },
        url: { color: '#f8f8f2' },
        '.language-css .token.string': { color: '#f8f8f2' },
        '.style .token.string': { color: '#f8f8f2' },
        variable: { color: '#f8f8f2' },
        atrule: { color: '#e6db74' },
        'attr-value': { color: '#e6db74' },
        function: { color: '#e6db74' },
        'class-name': { color: '#e6db74' },
        keyword: { color: '#66d9ef' },
        regex: { color: '#fd971f' },
        important: { color: '#fd971f', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    48444: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          background: 'hsl(220, 13%, 18%)',
          color: 'hsl(220, 14%, 71%)',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '2',
          OTabSize: '2',
          tabSize: '2',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          background: 'hsl(220, 13%, 18%)',
          color: 'hsl(220, 14%, 71%)',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '2',
          OTabSize: '2',
          tabSize: '2',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '0.5em 0',
          overflow: 'auto',
          borderRadius: '0.3em',
        },
        'code[class*="language-"]::-moz-selection': {
          background: 'hsl(220, 13%, 28%)',
          color: 'inherit',
          textShadow: 'none',
        },
        'code[class*="language-"] *::-moz-selection': {
          background: 'hsl(220, 13%, 28%)',
          color: 'inherit',
          textShadow: 'none',
        },
        'pre[class*="language-"] *::-moz-selection': {
          background: 'hsl(220, 13%, 28%)',
          color: 'inherit',
          textShadow: 'none',
        },
        'code[class*="language-"]::selection': {
          background: 'hsl(220, 13%, 28%)',
          color: 'inherit',
          textShadow: 'none',
        },
        'code[class*="language-"] *::selection': {
          background: 'hsl(220, 13%, 28%)',
          color: 'inherit',
          textShadow: 'none',
        },
        'pre[class*="language-"] *::selection': {
          background: 'hsl(220, 13%, 28%)',
          color: 'inherit',
          textShadow: 'none',
        },
        ':not(pre) > code[class*="language-"]': { padding: '0.2em 0.3em', borderRadius: '0.3em', whiteSpace: 'normal' },
        comment: { color: 'hsl(220, 10%, 40%)', fontStyle: 'italic' },
        prolog: { color: 'hsl(220, 10%, 40%)' },
        cdata: { color: 'hsl(220, 10%, 40%)' },
        doctype: { color: 'hsl(220, 14%, 71%)' },
        punctuation: { color: 'hsl(220, 14%, 71%)' },
        entity: { color: 'hsl(220, 14%, 71%)', cursor: 'help' },
        'attr-name': { color: 'hsl(29, 54%, 61%)' },
        'class-name': { color: 'hsl(29, 54%, 61%)' },
        boolean: { color: 'hsl(29, 54%, 61%)' },
        constant: { color: 'hsl(29, 54%, 61%)' },
        number: { color: 'hsl(29, 54%, 61%)' },
        atrule: { color: 'hsl(29, 54%, 61%)' },
        keyword: { color: 'hsl(286, 60%, 67%)' },
        property: { color: 'hsl(355, 65%, 65%)' },
        tag: { color: 'hsl(355, 65%, 65%)' },
        symbol: { color: 'hsl(355, 65%, 65%)' },
        deleted: { color: 'hsl(355, 65%, 65%)' },
        important: { color: 'hsl(355, 65%, 65%)' },
        selector: { color: 'hsl(95, 38%, 62%)' },
        string: { color: 'hsl(95, 38%, 62%)' },
        char: { color: 'hsl(95, 38%, 62%)' },
        builtin: { color: 'hsl(95, 38%, 62%)' },
        inserted: { color: 'hsl(95, 38%, 62%)' },
        regex: { color: 'hsl(95, 38%, 62%)' },
        'attr-value': { color: 'hsl(95, 38%, 62%)' },
        'attr-value > .token.punctuation': { color: 'hsl(95, 38%, 62%)' },
        variable: { color: 'hsl(207, 82%, 66%)' },
        operator: { color: 'hsl(207, 82%, 66%)' },
        function: { color: 'hsl(207, 82%, 66%)' },
        url: { color: 'hsl(187, 47%, 55%)' },
        'attr-value > .token.punctuation.attr-equals': { color: 'hsl(220, 14%, 71%)' },
        'special-attr > .token.attr-value > .token.value.css': { color: 'hsl(220, 14%, 71%)' },
        '.language-css .token.selector': { color: 'hsl(355, 65%, 65%)' },
        '.language-css .token.property': { color: 'hsl(220, 14%, 71%)' },
        '.language-css .token.function': { color: 'hsl(187, 47%, 55%)' },
        '.language-css .token.url > .token.function': { color: 'hsl(187, 47%, 55%)' },
        '.language-css .token.url > .token.string.url': { color: 'hsl(95, 38%, 62%)' },
        '.language-css .token.important': { color: 'hsl(286, 60%, 67%)' },
        '.language-css .token.atrule .token.rule': { color: 'hsl(286, 60%, 67%)' },
        '.language-javascript .token.operator': { color: 'hsl(286, 60%, 67%)' },
        '.language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation':
          { color: 'hsl(5, 48%, 51%)' },
        '.language-json .token.operator': { color: 'hsl(220, 14%, 71%)' },
        '.language-json .token.null.keyword': { color: 'hsl(29, 54%, 61%)' },
        '.language-markdown .token.url': { color: 'hsl(220, 14%, 71%)' },
        '.language-markdown .token.url > .token.operator': { color: 'hsl(220, 14%, 71%)' },
        '.language-markdown .token.url-reference.url > .token.string': { color: 'hsl(220, 14%, 71%)' },
        '.language-markdown .token.url > .token.content': { color: 'hsl(207, 82%, 66%)' },
        '.language-markdown .token.url > .token.url': { color: 'hsl(187, 47%, 55%)' },
        '.language-markdown .token.url-reference.url': { color: 'hsl(187, 47%, 55%)' },
        '.language-markdown .token.blockquote.punctuation': { color: 'hsl(220, 10%, 40%)', fontStyle: 'italic' },
        '.language-markdown .token.hr.punctuation': { color: 'hsl(220, 10%, 40%)', fontStyle: 'italic' },
        '.language-markdown .token.code-snippet': { color: 'hsl(95, 38%, 62%)' },
        '.language-markdown .token.bold .token.content': { color: 'hsl(29, 54%, 61%)' },
        '.language-markdown .token.italic .token.content': { color: 'hsl(286, 60%, 67%)' },
        '.language-markdown .token.strike .token.content': { color: 'hsl(355, 65%, 65%)' },
        '.language-markdown .token.strike .token.punctuation': { color: 'hsl(355, 65%, 65%)' },
        '.language-markdown .token.list.punctuation': { color: 'hsl(355, 65%, 65%)' },
        '.language-markdown .token.title.important > .token.punctuation': { color: 'hsl(355, 65%, 65%)' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        namespace: { Opacity: '0.8' },
        'token.tab:not(:empty):before': { color: 'hsla(220, 14%, 71%, 0.15)', textShadow: 'none' },
        'token.cr:before': { color: 'hsla(220, 14%, 71%, 0.15)', textShadow: 'none' },
        'token.lf:before': { color: 'hsla(220, 14%, 71%, 0.15)', textShadow: 'none' },
        'token.space:before': { color: 'hsla(220, 14%, 71%, 0.15)', textShadow: 'none' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item': { marginRight: '0.4em' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button': {
          background: 'hsl(220, 13%, 26%)',
          color: 'hsl(220, 9%, 55%)',
          padding: '0.1em 0.4em',
          borderRadius: '0.3em',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a': {
          background: 'hsl(220, 13%, 26%)',
          color: 'hsl(220, 9%, 55%)',
          padding: '0.1em 0.4em',
          borderRadius: '0.3em',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span': {
          background: 'hsl(220, 13%, 26%)',
          color: 'hsl(220, 9%, 55%)',
          padding: '0.1em 0.4em',
          borderRadius: '0.3em',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover': {
          background: 'hsl(220, 13%, 28%)',
          color: 'hsl(220, 14%, 71%)',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus': {
          background: 'hsl(220, 13%, 28%)',
          color: 'hsl(220, 14%, 71%)',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover': {
          background: 'hsl(220, 13%, 28%)',
          color: 'hsl(220, 14%, 71%)',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus': {
          background: 'hsl(220, 13%, 28%)',
          color: 'hsl(220, 14%, 71%)',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover': {
          background: 'hsl(220, 13%, 28%)',
          color: 'hsl(220, 14%, 71%)',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus': {
          background: 'hsl(220, 13%, 28%)',
          color: 'hsl(220, 14%, 71%)',
        },
        '.line-highlight.line-highlight': { background: 'hsla(220, 100%, 80%, 0.04)' },
        '.line-highlight.line-highlight:before': {
          background: 'hsl(220, 13%, 26%)',
          color: 'hsl(220, 14%, 71%)',
          padding: '0.1em 0.6em',
          borderRadius: '0.3em',
          boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
        },
        '.line-highlight.line-highlight[data-end]:after': {
          background: 'hsl(220, 13%, 26%)',
          color: 'hsl(220, 14%, 71%)',
          padding: '0.1em 0.6em',
          borderRadius: '0.3em',
          boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
        },
        'pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before': {
          backgroundColor: 'hsla(220, 100%, 80%, 0.04)',
        },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRightColor: 'hsla(220, 14%, 71%, 0.15)' },
        '.command-line .command-line-prompt': { borderRightColor: 'hsla(220, 14%, 71%, 0.15)' },
        '.line-numbers .line-numbers-rows > span:before': { color: 'hsl(220, 14%, 45%)' },
        '.command-line .command-line-prompt > span:before': { color: 'hsl(220, 14%, 45%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-1': { color: 'hsl(355, 65%, 65%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-5': { color: 'hsl(355, 65%, 65%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-9': { color: 'hsl(355, 65%, 65%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-2': { color: 'hsl(95, 38%, 62%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-6': { color: 'hsl(95, 38%, 62%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-10': { color: 'hsl(95, 38%, 62%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-3': { color: 'hsl(207, 82%, 66%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-7': { color: 'hsl(207, 82%, 66%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-11': { color: 'hsl(207, 82%, 66%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-4': { color: 'hsl(286, 60%, 67%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-8': { color: 'hsl(286, 60%, 67%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-12': { color: 'hsl(286, 60%, 67%)' },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix)': {
          backgroundColor: 'hsla(353, 100%, 66%, 0.15)',
        },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix)': {
          backgroundColor: 'hsla(353, 100%, 66%, 0.15)',
        },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix)': {
          backgroundColor: 'hsla(137, 100%, 55%, 0.15)',
        },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix)': {
          backgroundColor: 'hsla(137, 100%, 55%, 0.15)',
        },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        '.prism-previewer.prism-previewer:before': { borderColor: 'hsl(224, 13%, 17%)' },
        '.prism-previewer-gradient.prism-previewer-gradient div': {
          borderColor: 'hsl(224, 13%, 17%)',
          borderRadius: '0.3em',
        },
        '.prism-previewer-color.prism-previewer-color:before': { borderRadius: '0.3em' },
        '.prism-previewer-easing.prism-previewer-easing:before': { borderRadius: '0.3em' },
        '.prism-previewer.prism-previewer:after': { borderTopColor: 'hsl(224, 13%, 17%)' },
        '.prism-previewer-flipped.prism-previewer-flipped.after': { borderBottomColor: 'hsl(224, 13%, 17%)' },
        '.prism-previewer-angle.prism-previewer-angle:before': { background: 'hsl(219, 13%, 22%)' },
        '.prism-previewer-time.prism-previewer-time:before': { background: 'hsl(219, 13%, 22%)' },
        '.prism-previewer-easing.prism-previewer-easing': { background: 'hsl(219, 13%, 22%)' },
        '.prism-previewer-angle.prism-previewer-angle circle': { stroke: 'hsl(220, 14%, 71%)', strokeOpacity: '1' },
        '.prism-previewer-time.prism-previewer-time circle': { stroke: 'hsl(220, 14%, 71%)', strokeOpacity: '1' },
        '.prism-previewer-easing.prism-previewer-easing circle': { stroke: 'hsl(220, 14%, 71%)', fill: 'transparent' },
        '.prism-previewer-easing.prism-previewer-easing path': { stroke: 'hsl(220, 14%, 71%)' },
        '.prism-previewer-easing.prism-previewer-easing line': { stroke: 'hsl(220, 14%, 71%)' },
      }
      a.default = o
    },
    14635: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          background: 'hsl(230, 1%, 98%)',
          color: 'hsl(230, 8%, 24%)',
          fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '2',
          OTabSize: '2',
          tabSize: '2',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          background: 'hsl(230, 1%, 98%)',
          color: 'hsl(230, 8%, 24%)',
          fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '2',
          OTabSize: '2',
          tabSize: '2',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '0.5em 0',
          overflow: 'auto',
          borderRadius: '0.3em',
        },
        'code[class*="language-"]::-moz-selection': { background: 'hsl(230, 1%, 90%)', color: 'inherit' },
        'code[class*="language-"] *::-moz-selection': { background: 'hsl(230, 1%, 90%)', color: 'inherit' },
        'pre[class*="language-"] *::-moz-selection': { background: 'hsl(230, 1%, 90%)', color: 'inherit' },
        'code[class*="language-"]::selection': { background: 'hsl(230, 1%, 90%)', color: 'inherit' },
        'code[class*="language-"] *::selection': { background: 'hsl(230, 1%, 90%)', color: 'inherit' },
        'pre[class*="language-"] *::selection': { background: 'hsl(230, 1%, 90%)', color: 'inherit' },
        ':not(pre) > code[class*="language-"]': { padding: '0.2em 0.3em', borderRadius: '0.3em', whiteSpace: 'normal' },
        comment: { color: 'hsl(230, 4%, 64%)', fontStyle: 'italic' },
        prolog: { color: 'hsl(230, 4%, 64%)' },
        cdata: { color: 'hsl(230, 4%, 64%)' },
        doctype: { color: 'hsl(230, 8%, 24%)' },
        punctuation: { color: 'hsl(230, 8%, 24%)' },
        entity: { color: 'hsl(230, 8%, 24%)', cursor: 'help' },
        'attr-name': { color: 'hsl(35, 99%, 36%)' },
        'class-name': { color: 'hsl(35, 99%, 36%)' },
        boolean: { color: 'hsl(35, 99%, 36%)' },
        constant: { color: 'hsl(35, 99%, 36%)' },
        number: { color: 'hsl(35, 99%, 36%)' },
        atrule: { color: 'hsl(35, 99%, 36%)' },
        keyword: { color: 'hsl(301, 63%, 40%)' },
        property: { color: 'hsl(5, 74%, 59%)' },
        tag: { color: 'hsl(5, 74%, 59%)' },
        symbol: { color: 'hsl(5, 74%, 59%)' },
        deleted: { color: 'hsl(5, 74%, 59%)' },
        important: { color: 'hsl(5, 74%, 59%)' },
        selector: { color: 'hsl(119, 34%, 47%)' },
        string: { color: 'hsl(119, 34%, 47%)' },
        char: { color: 'hsl(119, 34%, 47%)' },
        builtin: { color: 'hsl(119, 34%, 47%)' },
        inserted: { color: 'hsl(119, 34%, 47%)' },
        regex: { color: 'hsl(119, 34%, 47%)' },
        'attr-value': { color: 'hsl(119, 34%, 47%)' },
        'attr-value > .token.punctuation': { color: 'hsl(119, 34%, 47%)' },
        variable: { color: 'hsl(221, 87%, 60%)' },
        operator: { color: 'hsl(221, 87%, 60%)' },
        function: { color: 'hsl(221, 87%, 60%)' },
        url: { color: 'hsl(198, 99%, 37%)' },
        'attr-value > .token.punctuation.attr-equals': { color: 'hsl(230, 8%, 24%)' },
        'special-attr > .token.attr-value > .token.value.css': { color: 'hsl(230, 8%, 24%)' },
        '.language-css .token.selector': { color: 'hsl(5, 74%, 59%)' },
        '.language-css .token.property': { color: 'hsl(230, 8%, 24%)' },
        '.language-css .token.function': { color: 'hsl(198, 99%, 37%)' },
        '.language-css .token.url > .token.function': { color: 'hsl(198, 99%, 37%)' },
        '.language-css .token.url > .token.string.url': { color: 'hsl(119, 34%, 47%)' },
        '.language-css .token.important': { color: 'hsl(301, 63%, 40%)' },
        '.language-css .token.atrule .token.rule': { color: 'hsl(301, 63%, 40%)' },
        '.language-javascript .token.operator': { color: 'hsl(301, 63%, 40%)' },
        '.language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation':
          { color: 'hsl(344, 84%, 43%)' },
        '.language-json .token.operator': { color: 'hsl(230, 8%, 24%)' },
        '.language-json .token.null.keyword': { color: 'hsl(35, 99%, 36%)' },
        '.language-markdown .token.url': { color: 'hsl(230, 8%, 24%)' },
        '.language-markdown .token.url > .token.operator': { color: 'hsl(230, 8%, 24%)' },
        '.language-markdown .token.url-reference.url > .token.string': { color: 'hsl(230, 8%, 24%)' },
        '.language-markdown .token.url > .token.content': { color: 'hsl(221, 87%, 60%)' },
        '.language-markdown .token.url > .token.url': { color: 'hsl(198, 99%, 37%)' },
        '.language-markdown .token.url-reference.url': { color: 'hsl(198, 99%, 37%)' },
        '.language-markdown .token.blockquote.punctuation': { color: 'hsl(230, 4%, 64%)', fontStyle: 'italic' },
        '.language-markdown .token.hr.punctuation': { color: 'hsl(230, 4%, 64%)', fontStyle: 'italic' },
        '.language-markdown .token.code-snippet': { color: 'hsl(119, 34%, 47%)' },
        '.language-markdown .token.bold .token.content': { color: 'hsl(35, 99%, 36%)' },
        '.language-markdown .token.italic .token.content': { color: 'hsl(301, 63%, 40%)' },
        '.language-markdown .token.strike .token.content': { color: 'hsl(5, 74%, 59%)' },
        '.language-markdown .token.strike .token.punctuation': { color: 'hsl(5, 74%, 59%)' },
        '.language-markdown .token.list.punctuation': { color: 'hsl(5, 74%, 59%)' },
        '.language-markdown .token.title.important > .token.punctuation': { color: 'hsl(5, 74%, 59%)' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        namespace: { Opacity: '0.8' },
        'token.tab:not(:empty):before': { color: 'hsla(230, 8%, 24%, 0.2)' },
        'token.cr:before': { color: 'hsla(230, 8%, 24%, 0.2)' },
        'token.lf:before': { color: 'hsla(230, 8%, 24%, 0.2)' },
        'token.space:before': { color: 'hsla(230, 8%, 24%, 0.2)' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item': { marginRight: '0.4em' },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button': {
          background: 'hsl(230, 1%, 90%)',
          color: 'hsl(230, 6%, 44%)',
          padding: '0.1em 0.4em',
          borderRadius: '0.3em',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a': {
          background: 'hsl(230, 1%, 90%)',
          color: 'hsl(230, 6%, 44%)',
          padding: '0.1em 0.4em',
          borderRadius: '0.3em',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span': {
          background: 'hsl(230, 1%, 90%)',
          color: 'hsl(230, 6%, 44%)',
          padding: '0.1em 0.4em',
          borderRadius: '0.3em',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover': {
          background: 'hsl(230, 1%, 78%)',
          color: 'hsl(230, 8%, 24%)',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus': {
          background: 'hsl(230, 1%, 78%)',
          color: 'hsl(230, 8%, 24%)',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover': {
          background: 'hsl(230, 1%, 78%)',
          color: 'hsl(230, 8%, 24%)',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus': {
          background: 'hsl(230, 1%, 78%)',
          color: 'hsl(230, 8%, 24%)',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover': {
          background: 'hsl(230, 1%, 78%)',
          color: 'hsl(230, 8%, 24%)',
        },
        'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus': {
          background: 'hsl(230, 1%, 78%)',
          color: 'hsl(230, 8%, 24%)',
        },
        '.line-highlight.line-highlight': { background: 'hsla(230, 8%, 24%, 0.05)' },
        '.line-highlight.line-highlight:before': {
          background: 'hsl(230, 1%, 90%)',
          color: 'hsl(230, 8%, 24%)',
          padding: '0.1em 0.6em',
          borderRadius: '0.3em',
          boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
        },
        '.line-highlight.line-highlight[data-end]:after': {
          background: 'hsl(230, 1%, 90%)',
          color: 'hsl(230, 8%, 24%)',
          padding: '0.1em 0.6em',
          borderRadius: '0.3em',
          boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
        },
        'pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before': {
          backgroundColor: 'hsla(230, 8%, 24%, 0.05)',
        },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRightColor: 'hsla(230, 8%, 24%, 0.2)' },
        '.command-line .command-line-prompt': { borderRightColor: 'hsla(230, 8%, 24%, 0.2)' },
        '.line-numbers .line-numbers-rows > span:before': { color: 'hsl(230, 1%, 62%)' },
        '.command-line .command-line-prompt > span:before': { color: 'hsl(230, 1%, 62%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-1': { color: 'hsl(5, 74%, 59%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-5': { color: 'hsl(5, 74%, 59%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-9': { color: 'hsl(5, 74%, 59%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-2': { color: 'hsl(119, 34%, 47%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-6': { color: 'hsl(119, 34%, 47%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-10': { color: 'hsl(119, 34%, 47%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-3': { color: 'hsl(221, 87%, 60%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-7': { color: 'hsl(221, 87%, 60%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-11': { color: 'hsl(221, 87%, 60%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-4': { color: 'hsl(301, 63%, 40%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-8': { color: 'hsl(301, 63%, 40%)' },
        '.rainbow-braces .token.token.punctuation.brace-level-12': { color: 'hsl(301, 63%, 40%)' },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix)': {
          backgroundColor: 'hsla(353, 100%, 66%, 0.15)',
        },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix)': {
          backgroundColor: 'hsla(353, 100%, 66%, 0.15)',
        },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection': {
          backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix)': {
          backgroundColor: 'hsla(137, 100%, 55%, 0.15)',
        },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix)': {
          backgroundColor: 'hsla(137, 100%, 55%, 0.15)',
        },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        'pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection': {
          backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
        },
        '.prism-previewer.prism-previewer:before': { borderColor: 'hsl(0, 0, 95%)' },
        '.prism-previewer-gradient.prism-previewer-gradient div': {
          borderColor: 'hsl(0, 0, 95%)',
          borderRadius: '0.3em',
        },
        '.prism-previewer-color.prism-previewer-color:before': { borderRadius: '0.3em' },
        '.prism-previewer-easing.prism-previewer-easing:before': { borderRadius: '0.3em' },
        '.prism-previewer.prism-previewer:after': { borderTopColor: 'hsl(0, 0, 95%)' },
        '.prism-previewer-flipped.prism-previewer-flipped.after': { borderBottomColor: 'hsl(0, 0, 95%)' },
        '.prism-previewer-angle.prism-previewer-angle:before': { background: 'hsl(0, 0%, 100%)' },
        '.prism-previewer-time.prism-previewer-time:before': { background: 'hsl(0, 0%, 100%)' },
        '.prism-previewer-easing.prism-previewer-easing': { background: 'hsl(0, 0%, 100%)' },
        '.prism-previewer-angle.prism-previewer-angle circle': { stroke: 'hsl(230, 8%, 24%)', strokeOpacity: '1' },
        '.prism-previewer-time.prism-previewer-time circle': { stroke: 'hsl(230, 8%, 24%)', strokeOpacity: '1' },
        '.prism-previewer-easing.prism-previewer-easing circle': { stroke: 'hsl(230, 8%, 24%)', fill: 'transparent' },
        '.prism-previewer-easing.prism-previewer-easing path': { stroke: 'hsl(230, 8%, 24%)' },
        '.prism-previewer-easing.prism-previewer-easing line': { stroke: 'hsl(230, 8%, 24%)' },
      }
      a.default = o
    },
    40197: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          wordWrap: 'break-word',
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          fontSize: '15px',
          lineHeight: '1.5',
          color: '#dccf8f',
          textShadow: '0',
        },
        'pre[class*="language-"]': {
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          wordWrap: 'break-word',
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          fontSize: '15px',
          lineHeight: '1.5',
          color: '#DCCF8F',
          textShadow: '0',
          borderRadius: '5px',
          border: '1px solid #000',
          background:
            "#181914 url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAMAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQACQYGBgcGCQcHCQ0IBwgNDwsJCQsPEQ4ODw4OERENDg4ODg0RERQUFhQUERoaHBwaGiYmJiYmKysrKysrKysrKwEJCAgJCgkMCgoMDwwODA8TDg4ODhMVDg4PDg4VGhMRERERExoXGhYWFhoXHR0aGh0dJCQjJCQrKysrKysrKysr/8AAEQgAjACMAwEiAAIRAQMRAf/EAF4AAQEBAAAAAAAAAAAAAAAAAAABBwEBAQAAAAAAAAAAAAAAAAAAAAIQAAEDAwIHAQEAAAAAAAAAAADwAREhYaExkUFRcYGxwdHh8REBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyGFEjHaBS2fDDs2zkhKmBKktb7km+ZwwCnXPkLVmCTMItj6AXFxRS465/BTnkAJvkLkJe+7AKKoi2AtRS2zuAWsCb5GOlBN8gKfmuGHZ8MFqIth3ALmFoFwbwKWyAlTAp17uKqBvgBD8sM4fTjhvAhkzhaRkBMKBrfs7jGPIpzy7gFrAqnC0C0gB0EWwBDW2cBVQwm+QtPpa3wBO3sVvszCnLAhkzgL5/RLf13cLQd8/AGlu0Cb5HTx9KuAEieGJEdcehS3eRTp2ATdt3CpIm+QtZwAhROXFeb7swp/ahaM3kBE/jSIUBc/AWrgBN8uNFAl+b7sAXFxFn2YLUU5Ns7gFX8C4ib+hN8gFWXwK3bZglxEJm+gKdciLPsFV/TClsgJUwKJ5FVA7tvIFrfZhVfGJDcsCKaYgAqv6YRbE+RWOWBtu7+AL3yRalXLyKqAIIfk+zARbDgFyEsncYwJvlgFRW+GEWntIi2P0BooyFxcNr8Ep3+ANLbMO+QyhvbiqdgC0kVvgUUiLYgBS2QtPbiVI1/sgOmG9uO+Y8DW+7jS2zAOnj6O2BndwuIAUtkdRN8gFoK3wwXMQyZwHVbClsuNLd4E3yAUR6FVDBR+BafQGt93LVMxJTv8ABts4CVLhcfYWsCb5kC9/BHdU8CLYFY5bMAd+eX9MGthhpbA1vu4B7+RKkaW2Yq4AQtVBBFsAJU/AuIXBhN8gGWnstefhiZyWvLAEnbYS1uzSFP6Jvn4Baxx70JKkQojLib5AVTey1jjgkKJGO0AKWyOm7N7cSpgSpAdPH0Tfd/gp1z5C1ZgKqN9J2wFxcUUuAFLZAm+QC0Fb4YUVRFsAOvj4KW2dwtYE3yAWk/wS/PLMKfmuGHZ8MAXF/Ja32Yi5haAKWz4Ydm2cSpgU693Atb7km+Zwwh+WGcPpxw3gAkzCLY+iYUDW/Z3Adc/gpzyFrAqnALkJe+7DoItgAtRS2zuKqGE3yAx0oJvkdvYrfZmALURbDuL5/RLf13cAuDeBS2RpbtAm+QFVA3wR+3fUtFHoBDJnC0jIXH0HWsgMY8inPLuOkd9chp4z20ALQLSA8cI9jYAIa2zjzjBd8gRafS1vgiUho/kAKcsCGTOGWvoOpkAtB3z8Hm8x2Ff5ADp4+lXAlIvcmwH/2Q==') repeat left top",
          padding: '12px',
          overflow: 'auto',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        ':not(pre) > code[class*="language-"]': {
          borderRadius: '5px',
          border: '1px solid #000',
          color: '#DCCF8F',
          background:
            "#181914 url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAMAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQACQYGBgcGCQcHCQ0IBwgNDwsJCQsPEQ4ODw4OERENDg4ODg0RERQUFhQUERoaHBwaGiYmJiYmKysrKysrKysrKwEJCAgJCgkMCgoMDwwODA8TDg4ODhMVDg4PDg4VGhMRERERExoXGhYWFhoXHR0aGh0dJCQjJCQrKysrKysrKysr/8AAEQgAjACMAwEiAAIRAQMRAf/EAF4AAQEBAAAAAAAAAAAAAAAAAAABBwEBAQAAAAAAAAAAAAAAAAAAAAIQAAEDAwIHAQEAAAAAAAAAAADwAREhYaExkUFRcYGxwdHh8REBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AyGFEjHaBS2fDDs2zkhKmBKktb7km+ZwwCnXPkLVmCTMItj6AXFxRS465/BTnkAJvkLkJe+7AKKoi2AtRS2zuAWsCb5GOlBN8gKfmuGHZ8MFqIth3ALmFoFwbwKWyAlTAp17uKqBvgBD8sM4fTjhvAhkzhaRkBMKBrfs7jGPIpzy7gFrAqnC0C0gB0EWwBDW2cBVQwm+QtPpa3wBO3sVvszCnLAhkzgL5/RLf13cLQd8/AGlu0Cb5HTx9KuAEieGJEdcehS3eRTp2ATdt3CpIm+QtZwAhROXFeb7swp/ahaM3kBE/jSIUBc/AWrgBN8uNFAl+b7sAXFxFn2YLUU5Ns7gFX8C4ib+hN8gFWXwK3bZglxEJm+gKdciLPsFV/TClsgJUwKJ5FVA7tvIFrfZhVfGJDcsCKaYgAqv6YRbE+RWOWBtu7+AL3yRalXLyKqAIIfk+zARbDgFyEsncYwJvlgFRW+GEWntIi2P0BooyFxcNr8Ep3+ANLbMO+QyhvbiqdgC0kVvgUUiLYgBS2QtPbiVI1/sgOmG9uO+Y8DW+7jS2zAOnj6O2BndwuIAUtkdRN8gFoK3wwXMQyZwHVbClsuNLd4E3yAUR6FVDBR+BafQGt93LVMxJTv8ABts4CVLhcfYWsCb5kC9/BHdU8CLYFY5bMAd+eX9MGthhpbA1vu4B7+RKkaW2Yq4AQtVBBFsAJU/AuIXBhN8gGWnstefhiZyWvLAEnbYS1uzSFP6Jvn4Baxx70JKkQojLib5AVTey1jjgkKJGO0AKWyOm7N7cSpgSpAdPH0Tfd/gp1z5C1ZgKqN9J2wFxcUUuAFLZAm+QC0Fb4YUVRFsAOvj4KW2dwtYE3yAWk/wS/PLMKfmuGHZ8MAXF/Ja32Yi5haAKWz4Ydm2cSpgU693Atb7km+Zwwh+WGcPpxw3gAkzCLY+iYUDW/Z3Adc/gpzyFrAqnALkJe+7DoItgAtRS2zuKqGE3yAx0oJvkdvYrfZmALURbDuL5/RLf13cAuDeBS2RpbtAm+QFVA3wR+3fUtFHoBDJnC0jIXH0HWsgMY8inPLuOkd9chp4z20ALQLSA8cI9jYAIa2zjzjBd8gRafS1vgiUho/kAKcsCGTOGWvoOpkAtB3z8Hm8x2Ff5ADp4+lXAlIvcmwH/2Q==') repeat left top",
          padding: '2px 6px',
        },
        namespace: { Opacity: '.7' },
        comment: { color: '#586e75', fontStyle: 'italic' },
        prolog: { color: '#586e75', fontStyle: 'italic' },
        doctype: { color: '#586e75', fontStyle: 'italic' },
        cdata: { color: '#586e75', fontStyle: 'italic' },
        number: { color: '#b89859' },
        string: { color: '#468966' },
        char: { color: '#468966' },
        builtin: { color: '#468966' },
        inserted: { color: '#468966' },
        'attr-name': { color: '#b89859' },
        operator: { color: '#dccf8f' },
        entity: { color: '#dccf8f', cursor: 'help' },
        url: { color: '#dccf8f' },
        '.language-css .token.string': { color: '#dccf8f' },
        '.style .token.string': { color: '#dccf8f' },
        selector: { color: '#859900' },
        regex: { color: '#859900' },
        atrule: { color: '#cb4b16' },
        keyword: { color: '#cb4b16' },
        'attr-value': { color: '#468966' },
        function: { color: '#b58900' },
        variable: { color: '#b58900' },
        placeholder: { color: '#b58900' },
        property: { color: '#b89859' },
        tag: { color: '#ffb03b' },
        boolean: { color: '#b89859' },
        constant: { color: '#b89859' },
        symbol: { color: '#b89859' },
        important: { color: '#dc322f' },
        statement: { color: '#dc322f' },
        deleted: { color: '#dc322f' },
        punctuation: { color: '#dccf8f' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    47863: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: 'black',
          background: 'none',
          textShadow: '0 1px white',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: 'black',
          background: '#f5f2f0',
          textShadow: '0 1px white',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
        },
        'pre[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#b3d4fc' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#b3d4fc' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: '#b3d4fc' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: '#b3d4fc' },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: '#b3d4fc' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: '#b3d4fc' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: '#b3d4fc' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: '#b3d4fc' },
        ':not(pre) > code[class*="language-"]': {
          background: '#f5f2f0',
          padding: '.1em',
          borderRadius: '.3em',
          whiteSpace: 'normal',
        },
        comment: { color: 'slategray' },
        prolog: { color: 'slategray' },
        doctype: { color: 'slategray' },
        cdata: { color: 'slategray' },
        punctuation: { color: '#999' },
        namespace: { Opacity: '.7' },
        property: { color: '#905' },
        tag: { color: '#905' },
        boolean: { color: '#905' },
        number: { color: '#905' },
        constant: { color: '#905' },
        symbol: { color: '#905' },
        deleted: { color: '#905' },
        selector: { color: '#690' },
        'attr-name': { color: '#690' },
        string: { color: '#690' },
        char: { color: '#690' },
        builtin: { color: '#690' },
        inserted: { color: '#690' },
        operator: { color: '#9a6e3a', background: 'hsla(0, 0%, 100%, .5)' },
        entity: { color: '#9a6e3a', background: 'hsla(0, 0%, 100%, .5)', cursor: 'help' },
        url: { color: '#9a6e3a', background: 'hsla(0, 0%, 100%, .5)' },
        '.language-css .token.string': { color: '#9a6e3a', background: 'hsla(0, 0%, 100%, .5)' },
        '.style .token.string': { color: '#9a6e3a', background: 'hsla(0, 0%, 100%, .5)' },
        atrule: { color: '#07a' },
        'attr-value': { color: '#07a' },
        keyword: { color: '#07a' },
        function: { color: '#DD4A68' },
        'class-name': { color: '#DD4A68' },
        regex: { color: '#e90' },
        important: { color: '#e90', fontWeight: 'bold' },
        variable: { color: '#e90' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    78648: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        "code[class*='language-']": {
          color: '#9efeff',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          fontFamily: "'Operator Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontWeight: '400',
          fontSize: '17px',
          lineHeight: '25px',
          letterSpacing: '0.5px',
          textShadow: '0 1px #222245',
        },
        "pre[class*='language-']": {
          color: '#9efeff',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          fontFamily: "'Operator Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontWeight: '400',
          fontSize: '17px',
          lineHeight: '25px',
          letterSpacing: '0.5px',
          textShadow: '0 1px #222245',
          padding: '2em',
          margin: '0.5em 0',
          overflow: 'auto',
          background: '#1e1e3f',
        },
        "pre[class*='language-']::-moz-selection": { color: 'inherit', background: '#a599e9' },
        "pre[class*='language-'] ::-moz-selection": { color: 'inherit', background: '#a599e9' },
        "code[class*='language-']::-moz-selection": { color: 'inherit', background: '#a599e9' },
        "code[class*='language-'] ::-moz-selection": { color: 'inherit', background: '#a599e9' },
        "pre[class*='language-']::selection": { color: 'inherit', background: '#a599e9' },
        "pre[class*='language-'] ::selection": { color: 'inherit', background: '#a599e9' },
        "code[class*='language-']::selection": { color: 'inherit', background: '#a599e9' },
        "code[class*='language-'] ::selection": { color: 'inherit', background: '#a599e9' },
        ":not(pre) > code[class*='language-']": { background: '#1e1e3f', padding: '0.1em', borderRadius: '0.3em' },
        '': { fontWeight: '400' },
        comment: { color: '#b362ff' },
        prolog: { color: '#b362ff' },
        cdata: { color: '#b362ff' },
        delimiter: { color: '#ff9d00' },
        keyword: { color: '#ff9d00' },
        selector: { color: '#ff9d00' },
        important: { color: '#ff9d00' },
        atrule: { color: '#ff9d00' },
        operator: { color: 'rgb(255, 180, 84)', background: 'none' },
        'attr-name': { color: 'rgb(255, 180, 84)' },
        punctuation: { color: '#ffffff' },
        boolean: { color: 'rgb(255, 98, 140)' },
        tag: { color: 'rgb(255, 157, 0)' },
        'tag.punctuation': { color: 'rgb(255, 157, 0)' },
        doctype: { color: 'rgb(255, 157, 0)' },
        builtin: { color: 'rgb(255, 157, 0)' },
        entity: { color: '#6897bb', background: 'none' },
        symbol: { color: '#6897bb' },
        number: { color: '#ff628c' },
        property: { color: '#ff628c' },
        constant: { color: '#ff628c' },
        variable: { color: '#ff628c' },
        string: { color: '#a5ff90' },
        char: { color: '#a5ff90' },
        'attr-value': { color: '#a5c261' },
        'attr-value.punctuation': { color: '#a5c261' },
        'attr-value.punctuation:first-child': { color: '#a9b7c6' },
        url: { color: '#287bde', textDecoration: 'underline', background: 'none' },
        function: { color: 'rgb(250, 208, 0)' },
        regex: { background: '#364135' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        inserted: { background: '#00ff00' },
        deleted: { background: '#ff000d' },
        'code.language-css .token.property': { color: '#a9b7c6' },
        'code.language-css .token.property + .token.punctuation': { color: '#a9b7c6' },
        'code.language-css .token.id': { color: '#ffc66d' },
        'code.language-css .token.selector > .token.class': { color: '#ffc66d' },
        'code.language-css .token.selector > .token.attribute': { color: '#ffc66d' },
        'code.language-css .token.selector > .token.pseudo-class': { color: '#ffc66d' },
        'code.language-css .token.selector > .token.pseudo-element': { color: '#ffc66d' },
        'class-name': { color: '#fb94ff' },
        '.language-css .token.string': { background: 'none' },
        '.style .token.string': { background: 'none' },
        '.line-highlight.line-highlight': {
          marginTop: '36px',
          background: 'linear-gradient(to right, rgba(179, 98, 255, 0.17), transparent)',
        },
        '.line-highlight.line-highlight:before': { content: "''" },
        '.line-highlight.line-highlight[data-end]:after': { content: "''" },
      }
      a.default = o
    },
    28451: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#839496',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#839496',
          textShadow: '0 1px rgba(0, 0, 0, 0.3)',
          fontFamily: "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          borderRadius: '0.3em',
          background: '#002b36',
        },
        ':not(pre) > code[class*="language-"]': { background: '#002b36', padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#586e75' },
        prolog: { color: '#586e75' },
        doctype: { color: '#586e75' },
        cdata: { color: '#586e75' },
        punctuation: { color: '#93a1a1' },
        '.namespace': { Opacity: '.7' },
        property: { color: '#268bd2' },
        keyword: { color: '#268bd2' },
        tag: { color: '#268bd2' },
        'class-name': { color: '#FFFFB6', textDecoration: 'underline' },
        boolean: { color: '#b58900' },
        constant: { color: '#b58900' },
        symbol: { color: '#dc322f' },
        deleted: { color: '#dc322f' },
        number: { color: '#859900' },
        selector: { color: '#859900' },
        'attr-name': { color: '#859900' },
        string: { color: '#859900' },
        char: { color: '#859900' },
        builtin: { color: '#859900' },
        inserted: { color: '#859900' },
        variable: { color: '#268bd2' },
        operator: { color: '#EDEDED' },
        function: { color: '#268bd2' },
        regex: { color: '#E9C062' },
        important: { color: '#fd971f', fontWeight: 'bold' },
        entity: { color: '#FFFFB6', cursor: 'help' },
        url: { color: '#96CBFE' },
        '.language-css .token.string': { color: '#87C38A' },
        '.style .token.string': { color: '#87C38A' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        atrule: { color: '#F9EE98' },
        'attr-value': { color: '#F9EE98' },
      }
      a.default = o
    },
    17889: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#657b83',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#657b83',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          borderRadius: '0.3em',
          backgroundColor: '#fdf6e3',
        },
        'pre[class*="language-"]::-moz-selection': { background: '#073642' },
        'pre[class*="language-"] ::-moz-selection': { background: '#073642' },
        'code[class*="language-"]::-moz-selection': { background: '#073642' },
        'code[class*="language-"] ::-moz-selection': { background: '#073642' },
        'pre[class*="language-"]::selection': { background: '#073642' },
        'pre[class*="language-"] ::selection': { background: '#073642' },
        'code[class*="language-"]::selection': { background: '#073642' },
        'code[class*="language-"] ::selection': { background: '#073642' },
        ':not(pre) > code[class*="language-"]': { backgroundColor: '#fdf6e3', padding: '.1em', borderRadius: '.3em' },
        comment: { color: '#93a1a1' },
        prolog: { color: '#93a1a1' },
        doctype: { color: '#93a1a1' },
        cdata: { color: '#93a1a1' },
        punctuation: { color: '#586e75' },
        namespace: { Opacity: '.7' },
        property: { color: '#268bd2' },
        tag: { color: '#268bd2' },
        boolean: { color: '#268bd2' },
        number: { color: '#268bd2' },
        constant: { color: '#268bd2' },
        symbol: { color: '#268bd2' },
        deleted: { color: '#268bd2' },
        selector: { color: '#2aa198' },
        'attr-name': { color: '#2aa198' },
        string: { color: '#2aa198' },
        char: { color: '#2aa198' },
        builtin: { color: '#2aa198' },
        url: { color: '#2aa198' },
        inserted: { color: '#2aa198' },
        entity: { color: '#657b83', background: '#eee8d5', cursor: 'help' },
        atrule: { color: '#859900' },
        'attr-value': { color: '#859900' },
        keyword: { color: '#859900' },
        function: { color: '#b58900' },
        'class-name': { color: '#b58900' },
        regex: { color: '#cb4b16' },
        important: { color: '#cb4b16', fontWeight: 'bold' },
        variable: { color: '#cb4b16' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    70243: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#f92aad',
          textShadow: '0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3',
          background: 'none',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#f92aad',
          textShadow: '0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3',
          background: 'none',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          backgroundColor: 'transparent !important',
          backgroundImage: 'linear-gradient(to bottom, #2a2139 75%, #34294f)',
        },
        ':not(pre) > code[class*="language-"]': {
          backgroundColor: 'transparent !important',
          backgroundImage: 'linear-gradient(to bottom, #2a2139 75%, #34294f)',
          padding: '.1em',
          borderRadius: '.3em',
          whiteSpace: 'normal',
        },
        comment: { color: '#8e8e8e' },
        'block-comment': { color: '#8e8e8e' },
        prolog: { color: '#8e8e8e' },
        doctype: { color: '#8e8e8e' },
        cdata: { color: '#8e8e8e' },
        punctuation: { color: '#ccc' },
        tag: { color: '#e2777a' },
        'attr-name': { color: '#e2777a' },
        namespace: { color: '#e2777a' },
        number: { color: '#e2777a' },
        unit: { color: '#e2777a' },
        hexcode: { color: '#e2777a' },
        deleted: { color: '#e2777a' },
        property: { color: '#72f1b8', textShadow: '0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475' },
        selector: { color: '#72f1b8', textShadow: '0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475' },
        'function-name': { color: '#6196cc' },
        boolean: {
          color: '#fdfdfd',
          textShadow: '0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975',
        },
        'selector.id': {
          color: '#fdfdfd',
          textShadow: '0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975',
        },
        function: {
          color: '#fdfdfd',
          textShadow: '0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975',
        },
        'class-name': {
          color: '#fff5f6',
          textShadow: '0 0 2px #000, 0 0 10px #fc1f2c75, 0 0 5px #fc1f2c75, 0 0 25px #fc1f2c75',
        },
        constant: { color: '#f92aad', textShadow: '0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3' },
        symbol: { color: '#f92aad', textShadow: '0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3' },
        important: {
          color: '#f4eee4',
          textShadow: '0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575',
          fontWeight: 'bold',
        },
        atrule: { color: '#f4eee4', textShadow: '0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575' },
        keyword: { color: '#f4eee4', textShadow: '0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575' },
        'selector.class': { color: '#f4eee4', textShadow: '0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575' },
        builtin: { color: '#f4eee4', textShadow: '0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575' },
        string: { color: '#f87c32' },
        char: { color: '#f87c32' },
        'attr-value': { color: '#f87c32' },
        regex: { color: '#f87c32' },
        variable: { color: '#f87c32' },
        operator: { color: '#67cdcc' },
        entity: { color: '#67cdcc', cursor: 'help' },
        url: { color: '#67cdcc' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        inserted: { color: 'green' },
      }
      a.default = o
    },
    38157: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#ccc',
          background: 'none',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#ccc',
          background: '#2d2d2d',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
        },
        ':not(pre) > code[class*="language-"]': {
          background: '#2d2d2d',
          padding: '.1em',
          borderRadius: '.3em',
          whiteSpace: 'normal',
        },
        comment: { color: '#999' },
        'block-comment': { color: '#999' },
        prolog: { color: '#999' },
        doctype: { color: '#999' },
        cdata: { color: '#999' },
        punctuation: { color: '#ccc' },
        tag: { color: '#e2777a' },
        'attr-name': { color: '#e2777a' },
        namespace: { color: '#e2777a' },
        deleted: { color: '#e2777a' },
        'function-name': { color: '#6196cc' },
        boolean: { color: '#f08d49' },
        number: { color: '#f08d49' },
        function: { color: '#f08d49' },
        property: { color: '#f8c555' },
        'class-name': { color: '#f8c555' },
        constant: { color: '#f8c555' },
        symbol: { color: '#f8c555' },
        selector: { color: '#cc99cd' },
        important: { color: '#cc99cd', fontWeight: 'bold' },
        atrule: { color: '#cc99cd' },
        keyword: { color: '#cc99cd' },
        builtin: { color: '#cc99cd' },
        string: { color: '#7ec699' },
        char: { color: '#7ec699' },
        'attr-value': { color: '#7ec699' },
        regex: { color: '#7ec699' },
        variable: { color: '#7ec699' },
        operator: { color: '#67cdcc' },
        entity: { color: '#67cdcc', cursor: 'help' },
        url: { color: '#67cdcc' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        inserted: { color: 'green' },
      }
      a.default = o
    },
    42358: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: 'white',
          background: 'none',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          textShadow: '0 -.1em .2em black',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: 'white',
          background: 'hsl(0, 0%, 8%)',
          fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
          fontSize: '1em',
          textAlign: 'left',
          textShadow: '0 -.1em .2em black',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          borderRadius: '.5em',
          border: '.3em solid hsl(0, 0%, 33%)',
          boxShadow: '1px 1px .5em black inset',
          margin: '.5em 0',
          overflow: 'auto',
          padding: '1em',
        },
        ':not(pre) > code[class*="language-"]': {
          background: 'hsl(0, 0%, 8%)',
          borderRadius: '.3em',
          border: '.13em solid hsl(0, 0%, 33%)',
          boxShadow: '1px 1px .3em -.1em black inset',
          padding: '.15em .2em .05em',
          whiteSpace: 'normal',
        },
        'pre[class*="language-"]::-moz-selection': { background: 'hsla(0, 0%, 93%, 0.15)', textShadow: 'none' },
        'pre[class*="language-"]::selection': { background: 'hsla(0, 0%, 93%, 0.15)', textShadow: 'none' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: 'hsla(0, 0%, 93%, 0.15)' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: 'hsla(0, 0%, 93%, 0.15)' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: 'hsla(0, 0%, 93%, 0.15)' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: 'hsla(0, 0%, 93%, 0.15)' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: 'hsla(0, 0%, 93%, 0.15)' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: 'hsla(0, 0%, 93%, 0.15)' },
        comment: { color: 'hsl(0, 0%, 47%)' },
        prolog: { color: 'hsl(0, 0%, 47%)' },
        doctype: { color: 'hsl(0, 0%, 47%)' },
        cdata: { color: 'hsl(0, 0%, 47%)' },
        punctuation: { Opacity: '.7' },
        namespace: { Opacity: '.7' },
        tag: { color: 'hsl(14, 58%, 55%)' },
        boolean: { color: 'hsl(14, 58%, 55%)' },
        number: { color: 'hsl(14, 58%, 55%)' },
        deleted: { color: 'hsl(14, 58%, 55%)' },
        keyword: { color: 'hsl(53, 89%, 79%)' },
        property: { color: 'hsl(53, 89%, 79%)' },
        selector: { color: 'hsl(53, 89%, 79%)' },
        constant: { color: 'hsl(53, 89%, 79%)' },
        symbol: { color: 'hsl(53, 89%, 79%)' },
        builtin: { color: 'hsl(53, 89%, 79%)' },
        'attr-name': { color: 'hsl(76, 21%, 52%)' },
        'attr-value': { color: 'hsl(76, 21%, 52%)' },
        string: { color: 'hsl(76, 21%, 52%)' },
        char: { color: 'hsl(76, 21%, 52%)' },
        operator: { color: 'hsl(76, 21%, 52%)' },
        entity: { color: 'hsl(76, 21%, 52%)', cursor: 'help' },
        url: { color: 'hsl(76, 21%, 52%)' },
        '.language-css .token.string': { color: 'hsl(76, 21%, 52%)' },
        '.style .token.string': { color: 'hsl(76, 21%, 52%)' },
        variable: { color: 'hsl(76, 21%, 52%)' },
        inserted: { color: 'hsl(76, 21%, 52%)' },
        atrule: { color: 'hsl(218, 22%, 55%)' },
        regex: { color: 'hsl(42, 75%, 65%)' },
        important: { color: 'hsl(42, 75%, 65%)', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        '.language-markup .token.tag': { color: 'hsl(33, 33%, 52%)' },
        '.language-markup .token.attr-name': { color: 'hsl(33, 33%, 52%)' },
        '.language-markup .token.punctuation': { color: 'hsl(33, 33%, 52%)' },
        '': { position: 'relative', zIndex: '1' },
        '.line-highlight.line-highlight': {
          background: 'linear-gradient(to right, hsla(0, 0%, 33%, .1) 70%, hsla(0, 0%, 33%, 0))',
          borderBottom: '1px dashed hsl(0, 0%, 33%)',
          borderTop: '1px dashed hsl(0, 0%, 33%)',
          marginTop: '0.75em',
          zIndex: '0',
        },
        '.line-highlight.line-highlight:before': { backgroundColor: 'hsl(215, 15%, 59%)', color: 'hsl(24, 20%, 95%)' },
        '.line-highlight.line-highlight[data-end]:after': {
          backgroundColor: 'hsl(215, 15%, 59%)',
          color: 'hsl(24, 20%, 95%)',
        },
      }
      a.default = o
    },
    43889: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#393A34',
          fontFamily: '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          fontSize: '.9em',
          lineHeight: '1.2em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]': {
          color: '#393A34',
          fontFamily: '"Consolas", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          fontSize: '.9em',
          lineHeight: '1.2em',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          border: '1px solid #dddddd',
          backgroundColor: 'white',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        'pre[class*="language-"]::-moz-selection': { background: '#C1DEF1' },
        'pre[class*="language-"] ::-moz-selection': { background: '#C1DEF1' },
        'code[class*="language-"]::-moz-selection': { background: '#C1DEF1' },
        'code[class*="language-"] ::-moz-selection': { background: '#C1DEF1' },
        'pre[class*="language-"]::selection': { background: '#C1DEF1' },
        'pre[class*="language-"] ::selection': { background: '#C1DEF1' },
        'code[class*="language-"]::selection': { background: '#C1DEF1' },
        'code[class*="language-"] ::selection': { background: '#C1DEF1' },
        ':not(pre) > code[class*="language-"]': {
          padding: '.2em',
          paddingTop: '1px',
          paddingBottom: '1px',
          background: '#f8f8f8',
          border: '1px solid #dddddd',
        },
        comment: { color: '#008000', fontStyle: 'italic' },
        prolog: { color: '#008000', fontStyle: 'italic' },
        doctype: { color: '#008000', fontStyle: 'italic' },
        cdata: { color: '#008000', fontStyle: 'italic' },
        namespace: { Opacity: '.7' },
        string: { color: '#A31515' },
        punctuation: { color: '#393A34' },
        operator: { color: '#393A34' },
        url: { color: '#36acaa' },
        symbol: { color: '#36acaa' },
        number: { color: '#36acaa' },
        boolean: { color: '#36acaa' },
        variable: { color: '#36acaa' },
        constant: { color: '#36acaa' },
        inserted: { color: '#36acaa' },
        atrule: { color: '#0000ff' },
        keyword: { color: '#0000ff' },
        'attr-value': { color: '#0000ff' },
        '.language-autohotkey .token.selector': { color: '#0000ff' },
        '.language-json .token.boolean': { color: '#0000ff' },
        '.language-json .token.number': { color: '#0000ff' },
        'code[class*="language-css"]': { color: '#0000ff' },
        function: { color: '#393A34' },
        deleted: { color: '#9a050f' },
        '.language-autohotkey .token.tag': { color: '#9a050f' },
        selector: { color: '#800000' },
        '.language-autohotkey .token.keyword': { color: '#00009f' },
        important: { color: '#e90', fontWeight: 'bold' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        'class-name': { color: '#2B91AF' },
        '.language-json .token.property': { color: '#2B91AF' },
        tag: { color: '#800000' },
        'attr-name': { color: '#ff0000' },
        property: { color: '#ff0000' },
        regex: { color: '#ff0000' },
        entity: { color: '#ff0000' },
        'directive.tag.tag': { background: '#ffff00', color: '#393A34' },
        '.line-numbers.line-numbers .line-numbers-rows': { borderRightColor: '#a5a5a5' },
        '.line-numbers .line-numbers-rows > span:before': { color: '#2B91AF' },
        '.line-highlight.line-highlight': {
          background: 'linear-gradient(to right, rgba(193, 222, 241, 0.2) 70%, rgba(221, 222, 241, 0))',
        },
      }
      a.default = o
    },
    55375: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'pre[class*="language-"]': {
          color: '#d4d4d4',
          fontSize: '13px',
          textShadow: 'none',
          fontFamily: 'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          padding: '1em',
          margin: '.5em 0',
          overflow: 'auto',
          background: '#1e1e1e',
        },
        'code[class*="language-"]': {
          color: '#d4d4d4',
          fontSize: '13px',
          textShadow: 'none',
          fontFamily: 'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          lineHeight: '1.5',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
        },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: '#264F78' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: '#264F78' },
        'pre[class*="language-"] *::selection': { textShadow: 'none', background: '#264F78' },
        'code[class*="language-"] *::selection': { textShadow: 'none', background: '#264F78' },
        ':not(pre) > code[class*="language-"]': {
          padding: '.1em .3em',
          borderRadius: '.3em',
          color: '#db4c69',
          background: '#1e1e1e',
        },
        '.namespace': { Opacity: '.7' },
        'doctype.doctype-tag': { color: '#569CD6' },
        'doctype.name': { color: '#9cdcfe' },
        comment: { color: '#6a9955' },
        prolog: { color: '#6a9955' },
        punctuation: { color: '#d4d4d4' },
        '.language-html .language-css .token.punctuation': { color: '#d4d4d4' },
        '.language-html .language-javascript .token.punctuation': { color: '#d4d4d4' },
        property: { color: '#9cdcfe' },
        tag: { color: '#569cd6' },
        boolean: { color: '#569cd6' },
        number: { color: '#b5cea8' },
        constant: { color: '#9cdcfe' },
        symbol: { color: '#b5cea8' },
        inserted: { color: '#b5cea8' },
        unit: { color: '#b5cea8' },
        selector: { color: '#d7ba7d' },
        'attr-name': { color: '#9cdcfe' },
        string: { color: '#ce9178' },
        char: { color: '#ce9178' },
        builtin: { color: '#ce9178' },
        deleted: { color: '#ce9178' },
        '.language-css .token.string.url': { textDecoration: 'underline' },
        operator: { color: '#d4d4d4' },
        entity: { color: '#569cd6' },
        'operator.arrow': { color: '#569CD6' },
        atrule: { color: '#ce9178' },
        'atrule.rule': { color: '#c586c0' },
        'atrule.url': { color: '#9cdcfe' },
        'atrule.url.function': { color: '#dcdcaa' },
        'atrule.url.punctuation': { color: '#d4d4d4' },
        keyword: { color: '#569CD6' },
        'keyword.module': { color: '#c586c0' },
        'keyword.control-flow': { color: '#c586c0' },
        function: { color: '#dcdcaa' },
        'function.maybe-class-name': { color: '#dcdcaa' },
        regex: { color: '#d16969' },
        important: { color: '#569cd6' },
        italic: { fontStyle: 'italic' },
        'class-name': { color: '#4ec9b0' },
        'maybe-class-name': { color: '#4ec9b0' },
        console: { color: '#9cdcfe' },
        parameter: { color: '#9cdcfe' },
        interpolation: { color: '#9cdcfe' },
        'punctuation.interpolation-punctuation': { color: '#569cd6' },
        variable: { color: '#9cdcfe' },
        'imports.maybe-class-name': { color: '#9cdcfe' },
        'exports.maybe-class-name': { color: '#9cdcfe' },
        escape: { color: '#d7ba7d' },
        'tag.punctuation': { color: '#808080' },
        cdata: { color: '#808080' },
        'attr-value': { color: '#ce9178' },
        'attr-value.punctuation': { color: '#ce9178' },
        'attr-value.punctuation.attr-equals': { color: '#d4d4d4' },
        namespace: { color: '#4ec9b0' },
        'pre[class*="language-javascript"]': { color: '#9cdcfe' },
        'code[class*="language-javascript"]': { color: '#9cdcfe' },
        'pre[class*="language-jsx"]': { color: '#9cdcfe' },
        'code[class*="language-jsx"]': { color: '#9cdcfe' },
        'pre[class*="language-typescript"]': { color: '#9cdcfe' },
        'code[class*="language-typescript"]': { color: '#9cdcfe' },
        'pre[class*="language-tsx"]': { color: '#9cdcfe' },
        'code[class*="language-tsx"]': { color: '#9cdcfe' },
        'pre[class*="language-css"]': { color: '#ce9178' },
        'code[class*="language-css"]': { color: '#ce9178' },
        'pre[class*="language-html"]': { color: '#d4d4d4' },
        'code[class*="language-html"]': { color: '#d4d4d4' },
        '.language-regex .token.anchor': { color: '#dcdcaa' },
        '.language-html .token.punctuation': { color: '#808080' },
        'pre[class*="language-"] > code[class*="language-"]': { position: 'relative', zIndex: '1' },
        '.line-highlight.line-highlight': { background: '#f7ebc6', boxShadow: 'inset 5px 0 0 #f7d87c', zIndex: '0' },
      }
      a.default = o
    },
    74771: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          MozTabSize: '2',
          OTabSize: '2',
          tabSize: '2',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          whiteSpace: 'pre-wrap',
          wordWrap: 'normal',
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          fontSize: '14px',
          color: '#76d9e6',
          textShadow: 'none',
        },
        'pre[class*="language-"]': {
          MozTabSize: '2',
          OTabSize: '2',
          tabSize: '2',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          whiteSpace: 'pre-wrap',
          wordWrap: 'normal',
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          fontSize: '14px',
          color: '#76d9e6',
          textShadow: 'none',
          background: '#2a2a2a',
          padding: '15px',
          borderRadius: '4px',
          border: '1px solid #e1e1e8',
          overflow: 'auto',
          position: 'relative',
        },
        'pre > code[class*="language-"]': { fontSize: '1em' },
        ':not(pre) > code[class*="language-"]': {
          background: '#2a2a2a',
          padding: '0.15em 0.2em 0.05em',
          borderRadius: '.3em',
          border: '0.13em solid #7a6652',
          boxShadow: '1px 1px 0.3em -0.1em #000 inset',
        },
        'pre[class*="language-"] code': { whiteSpace: 'pre', display: 'block' },
        namespace: { Opacity: '.7' },
        comment: { color: '#6f705e' },
        prolog: { color: '#6f705e' },
        doctype: { color: '#6f705e' },
        cdata: { color: '#6f705e' },
        operator: { color: '#a77afe' },
        boolean: { color: '#a77afe' },
        number: { color: '#a77afe' },
        'attr-name': { color: '#e6d06c' },
        string: { color: '#e6d06c' },
        entity: { color: '#e6d06c', cursor: 'help' },
        url: { color: '#e6d06c' },
        '.language-css .token.string': { color: '#e6d06c' },
        '.style .token.string': { color: '#e6d06c' },
        selector: { color: '#a6e22d' },
        inserted: { color: '#a6e22d' },
        atrule: { color: '#ef3b7d' },
        'attr-value': { color: '#ef3b7d' },
        keyword: { color: '#ef3b7d' },
        important: { color: '#ef3b7d', fontWeight: 'bold' },
        deleted: { color: '#ef3b7d' },
        regex: { color: '#76d9e6' },
        statement: { color: '#76d9e6', fontWeight: 'bold' },
        placeholder: { color: '#fff' },
        variable: { color: '#fff' },
        bold: { fontWeight: 'bold' },
        punctuation: { color: '#bebec5' },
        italic: { fontStyle: 'italic' },
        'code.language-markup': { color: '#f9f9f9' },
        'code.language-markup .token.tag': { color: '#ef3b7d' },
        'code.language-markup .token.attr-name': { color: '#a6e22d' },
        'code.language-markup .token.attr-value': { color: '#e6d06c' },
        'code.language-markup .token.style': { color: '#76d9e6' },
        'code.language-markup .token.script': { color: '#76d9e6' },
        'code.language-markup .token.script .token.keyword': { color: '#76d9e6' },
        '.line-highlight.line-highlight': { padding: '0', background: 'rgba(255, 255, 255, 0.08)' },
        '.line-highlight.line-highlight:before': {
          padding: '0.2em 0.5em',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          color: 'black',
          height: '1em',
          lineHeight: '1em',
          boxShadow: '0 1px 1px rgba(255, 255, 255, 0.7)',
        },
        '.line-highlight.line-highlight[data-end]:after': {
          padding: '0.2em 0.5em',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          color: 'black',
          height: '1em',
          lineHeight: '1em',
          boxShadow: '0 1px 1px rgba(255, 255, 255, 0.7)',
        },
      }
      a.default = o
    },
    3415: function (E, a) {
      'use strict'
      Object.defineProperty(a, '__esModule', { value: !0 }), (a.default = void 0)
      var o = {
        'code[class*="language-"]': {
          color: '#22da17',
          fontFamily: 'monospace',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          lineHeight: '25px',
          fontSize: '18px',
          margin: '5px 0',
        },
        'pre[class*="language-"]': {
          color: 'white',
          fontFamily: 'monospace',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          MozTabSize: '4',
          OTabSize: '4',
          tabSize: '4',
          WebkitHyphens: 'none',
          MozHyphens: 'none',
          msHyphens: 'none',
          hyphens: 'none',
          lineHeight: '25px',
          fontSize: '18px',
          margin: '0.5em 0',
          background: '#0a143c',
          padding: '1em',
          overflow: 'auto',
        },
        'pre[class*="language-"] *': { fontFamily: 'monospace' },
        ':not(pre) > code[class*="language-"]': {
          color: 'white',
          background: '#0a143c',
          padding: '0.1em',
          borderRadius: '0.3em',
          whiteSpace: 'normal',
        },
        'pre[class*="language-"]::-moz-selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'pre[class*="language-"] ::-moz-selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'code[class*="language-"]::-moz-selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'code[class*="language-"] ::-moz-selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'pre[class*="language-"]::selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'pre[class*="language-"] ::selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'code[class*="language-"]::selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        'code[class*="language-"] ::selection': { textShadow: 'none', background: 'rgba(29, 59, 83, 0.99)' },
        comment: { color: 'rgb(99, 119, 119)', fontStyle: 'italic' },
        prolog: { color: 'rgb(99, 119, 119)', fontStyle: 'italic' },
        cdata: { color: 'rgb(99, 119, 119)', fontStyle: 'italic' },
        punctuation: { color: 'rgb(199, 146, 234)' },
        '.namespace': { color: 'rgb(178, 204, 214)' },
        deleted: { color: 'rgba(239, 83, 80, 0.56)', fontStyle: 'italic' },
        symbol: { color: 'rgb(128, 203, 196)' },
        property: { color: 'rgb(128, 203, 196)' },
        tag: { color: 'rgb(127, 219, 202)' },
        operator: { color: 'rgb(127, 219, 202)' },
        keyword: { color: 'rgb(127, 219, 202)' },
        boolean: { color: 'rgb(255, 88, 116)' },
        number: { color: 'rgb(247, 140, 108)' },
        constant: { color: 'rgb(34 183 199)' },
        function: { color: 'rgb(34 183 199)' },
        builtin: { color: 'rgb(34 183 199)' },
        char: { color: 'rgb(34 183 199)' },
        selector: { color: 'rgb(199, 146, 234)', fontStyle: 'italic' },
        doctype: { color: 'rgb(199, 146, 234)', fontStyle: 'italic' },
        'attr-name': { color: 'rgb(173, 219, 103)', fontStyle: 'italic' },
        inserted: { color: 'rgb(173, 219, 103)', fontStyle: 'italic' },
        string: { color: 'rgb(173, 219, 103)' },
        url: { color: 'rgb(173, 219, 103)' },
        entity: { color: 'rgb(173, 219, 103)' },
        '.language-css .token.string': { color: 'rgb(173, 219, 103)' },
        '.style .token.string': { color: 'rgb(173, 219, 103)' },
        'class-name': { color: 'rgb(255, 203, 139)' },
        atrule: { color: 'rgb(255, 203, 139)' },
        'attr-value': { color: 'rgb(255, 203, 139)' },
        regex: { color: 'rgb(214, 222, 235)' },
        important: { color: 'rgb(214, 222, 235)', fontWeight: 'bold' },
        variable: { color: 'rgb(214, 222, 235)' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
      }
      a.default = o
    },
    92935: function (E) {
      function a(o, c) {
        return c || (c = o.slice(0)), Object.freeze(Object.defineProperties(o, { raw: { value: Object.freeze(c) } }))
      }
      ;(E.exports = a), (E.exports.__esModule = !0), (E.exports.default = E.exports)
    },
    94161: function (E, a) {
      'use strict'
      var o = function (g, p, u, v) {
        function H(P) {
          return P instanceof u
            ? P
            : new u(function (F) {
                F(P)
              })
        }
        return new (u || (u = Promise))(function (P, F) {
          function I(X) {
            try {
              $(v.next(X))
            } catch (ue) {
              F(ue)
            }
          }
          function U(X) {
            try {
              $(v.throw(X))
            } catch (ue) {
              F(ue)
            }
          }
          function $(X) {
            X.done ? P(X.value) : H(X.value).then(I, U)
          }
          $((v = v.apply(g, p || [])).next())
        })
      }
      function c(g) {
        let p = 0,
          u = 0,
          v = g
        do (p += v.offsetTop || 0), (u += v.offsetLeft || 0), (v = v.offsetParent)
        while (v)
        return { top: p, left: u }
      }
      class f {
        constructor(p) {
          this.element = p
        }
        getHorizontalScroll() {
          return this.element.scrollLeft
        }
        getVerticalScroll() {
          return this.element.scrollTop
        }
        getMaxHorizontalScroll() {
          return this.element.scrollWidth - this.element.clientWidth
        }
        getMaxVerticalScroll() {
          return this.element.scrollHeight - this.element.clientHeight
        }
        getHorizontalElementScrollOffset(p, u) {
          return c(p).left - c(u).left
        }
        getVerticalElementScrollOffset(p, u) {
          return c(p).top - c(u).top
        }
        scrollTo(p, u) {
          ;(this.element.scrollLeft = p), (this.element.scrollTop = u)
        }
      }
      class m {
        constructor() {
          this.element = window
        }
        getHorizontalScroll() {
          return window.scrollX || document.documentElement.scrollLeft
        }
        getVerticalScroll() {
          return window.scrollY || document.documentElement.scrollTop
        }
        getMaxHorizontalScroll() {
          return (
            Math.max(
              document.body.scrollWidth,
              document.documentElement.scrollWidth,
              document.body.offsetWidth,
              document.documentElement.offsetWidth,
              document.body.clientWidth,
              document.documentElement.clientWidth,
            ) - window.innerWidth
          )
        }
        getMaxVerticalScroll() {
          return (
            Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.offsetHeight,
              document.body.clientHeight,
              document.documentElement.clientHeight,
            ) - window.innerHeight
          )
        }
        getHorizontalElementScrollOffset(p) {
          return (window.scrollX || document.documentElement.scrollLeft) + p.getBoundingClientRect().left
        }
        getVerticalElementScrollOffset(p) {
          return (window.scrollY || document.documentElement.scrollTop) + p.getBoundingClientRect().top
        }
        scrollTo(p, u) {
          window.scrollTo(p, u)
        }
      }
      const x = {
          elements: [],
          cancelMethods: [],
          add: (g, p) => {
            x.elements.push(g), x.cancelMethods.push(p)
          },
          remove: (g, p) => {
            const u = x.elements.indexOf(g)
            u > -1 && (p && x.cancelMethods[u](), x.elements.splice(u, 1), x.cancelMethods.splice(u, 1))
          },
        },
        w = typeof window != 'undefined',
        k = {
          cancelOnUserAction: !0,
          easing: (g) => --g * g * g + 1,
          elementToScroll: w ? window : null,
          horizontalOffset: 0,
          maxDuration: 3e3,
          minDuration: 250,
          speed: 500,
          verticalOffset: 0,
        }
      function C(g, p = {}) {
        return o(this, void 0, void 0, function* () {
          if (w) {
            if (!window.Promise)
              throw "Browser doesn't support Promises, and animated-scroll-to depends on it, please provide a polyfill."
          } else
            return new Promise((q) => {
              q(!1)
            })
          let u,
            v,
            H,
            P = Object.assign(Object.assign({}, k), p)
          const F = P.elementToScroll === window,
            I = !!P.elementToScroll.nodeName
          if (!F && !I) throw 'Element to scroll needs to be either window or DOM element.'
          const U = F ? document.documentElement : P.elementToScroll
          getComputedStyle(U).getPropertyValue('scroll-behavior') === 'smooth' &&
            console.warn(
              `${U.tagName} has "scroll-behavior: smooth" which can mess up with animated-scroll-to's animations`,
            )
          const X = F ? new m() : new f(P.elementToScroll)
          if (g instanceof Element) {
            if (((H = g), I && (!P.elementToScroll.contains(H) || P.elementToScroll.isSameNode(H))))
              throw 'options.elementToScroll has to be a parent of scrollToElement'
            ;(u = X.getHorizontalElementScrollOffset(H, P.elementToScroll)),
              (v = X.getVerticalElementScrollOffset(H, P.elementToScroll))
          } else if (typeof g == 'number') (u = X.getHorizontalScroll()), (v = g)
          else if (Array.isArray(g) && g.length === 2)
            (u = g[0] === null ? X.getHorizontalScroll() : g[0]), (v = g[1] === null ? X.getVerticalScroll() : g[1])
          else
            throw `Wrong function signature. Check documentation.
Available method signatures are:
  animateScrollTo(y:number, options)
  animateScrollTo([x:number | null, y:number | null], options)
  animateScrollTo(scrollToElement:Element, options)`
          ;(u += P.horizontalOffset), (v += P.verticalOffset)
          const ue = X.getMaxHorizontalScroll(),
            B = X.getHorizontalScroll()
          u > ue && (u = ue)
          const ce = u - B,
            se = X.getMaxVerticalScroll(),
            J = X.getVerticalScroll()
          v > se && (v = se)
          const Ee = v - J,
            Ce = Math.abs(Math.round((ce / 1e3) * P.speed)),
            j = Math.abs(Math.round((Ee / 1e3) * P.speed))
          let V = Ce > j ? Ce : j
          return (
            V < P.minDuration ? (V = P.minDuration) : V > P.maxDuration && (V = P.maxDuration),
            new Promise((q, be) => {
              ce === 0 && Ee === 0 && q(!0), x.remove(X.element, !0)
              let Q
              const te = () => {
                he(), cancelAnimationFrame(Q), q(!1)
              }
              x.add(X.element, te)
              const _ = (ie) => ie.preventDefault(),
                re = P.cancelOnUserAction ? te : _,
                oe = P.cancelOnUserAction ? { passive: !0 } : { passive: !1 },
                ke = ['wheel', 'touchstart', 'keydown', 'mousedown'],
                he = () => {
                  ke.forEach((ie) => {
                    X.element.removeEventListener(ie, re, oe)
                  })
                }
              ke.forEach((ie) => {
                X.element.addEventListener(ie, re, oe)
              })
              const Ae = Date.now(),
                we = () => {
                  var ie = Date.now() - Ae,
                    le = ie / V
                  const fe = Math.round(B + ce * P.easing(le)),
                    Te = Math.round(J + Ee * P.easing(le))
                  ie < V && (fe !== u || Te !== v)
                    ? (X.scrollTo(fe, Te), (Q = requestAnimationFrame(we)))
                    : (X.scrollTo(u, v), cancelAnimationFrame(Q), he(), x.remove(X.element, !1), q(!0))
                }
              Q = requestAnimationFrame(we)
            })
          )
        })
      }
      a.Z = C
    },
    86335: function (E, a, o) {
      'use strict'
      o.d(a, {
        X: function () {
          return c
        },
      })
      function c(m, x) {
        if (Object.is(m, x)) return !0
        if (typeof m != 'object' || m === null || typeof x != 'object' || x === null) return !1
        if (m instanceof Map && x instanceof Map) {
          if (m.size !== x.size) return !1
          for (const [k, C] of m) if (!Object.is(C, x.get(k))) return !1
          return !0
        }
        if (m instanceof Set && x instanceof Set) {
          if (m.size !== x.size) return !1
          for (const k of m) if (!x.has(k)) return !1
          return !0
        }
        const w = Object.keys(m)
        if (w.length !== Object.keys(x).length) return !1
        for (let k = 0; k < w.length; k++)
          if (!Object.prototype.hasOwnProperty.call(x, w[k]) || !Object.is(m[w[k]], x[w[k]])) return !1
        return !0
      }
      var f = (m, x) => (
        console.warn(
          "[DEPRECATED] Default export is deprecated. Instead use `import { shallow } from 'zustand/shallow'`.",
        ),
        c(m, x)
      )
    },
  },
])
