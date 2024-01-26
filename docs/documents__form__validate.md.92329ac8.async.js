'use strict'
;(self.webpackChunk = self.webpackChunk || []).push([
  [5929],
  {
    96840: function (r, o, e) {
      e.r(o)
      var d = e(93463),
        s = e(771),
        u = e(21410),
        E = e(98670),
        a = e(16008),
        l = e(87343),
        _ = e(57689)
      function m() {
        var n = (0, l.eL)(),
          t = n.texts
        return _.createElement(
          l.dY,
          null,
          _.createElement(
            _.Fragment,
            null,
            _.createElement(
              'div',
              { className: 'markdown' },
              _.createElement(
                'h1',
                { id: '\u8868\u5355\u6821\u9A8C' },
                _.createElement(
                  'a',
                  { 'aria-hidden': 'true', tabIndex: '-1', href: '#\u8868\u5355\u6821\u9A8C' },
                  _.createElement('span', { className: 'icon icon-link' }),
                ),
                '\u8868\u5355\u6821\u9A8C',
              ),
              _.createElement(
                'ul',
                null,
                _.createElement('li', null, t[0].value, _.createElement('code', null, t[1].value), t[2].value),
                _.createElement(
                  'li',
                  null,
                  t[3].value,
                  _.createElement('code', null, t[4].value),
                  t[5].value,
                  _.createElement('code', null, t[6].value),
                  t[7].value,
                  _.createElement('code', null, t[8].value),
                  t[9].value,
                ),
              ),
              _.createElement(u.Z, { lang: 'jsx' }, t[10].value),
            ),
            _.createElement(l.Dl, { demo: { id: 'documents-form-validate-demo-0' }, previewerProps: {} }),
          ),
        )
      }
      o.default = m
    },
    16008: function (r, o, e) {
      var d = e(60799),
        s = e.n(d),
        u = e(57213),
        E = e.n(u),
        a = e(57689),
        l = e(6953),
        _ = e(25191),
        m = e(66593)
      o.Z = function (n) {
        var t
        return a.createElement(
          _.Z,
          { title: '\u70B9\u51FB\u653E\u5927\u56FE\u7247', mouseEnterDelay: 1, placement: 'topRight' },
          a.createElement(
            m.Z,
            s()({ preview: { mask: !1 }, className: (0, l.Z)('mb-6', n == null ? void 0 : n.className) }, n, {
              style: E()(
                { cursor: 'zoom-in', maxWidth: 1080 },
                (t = n == null ? void 0 : n.style) !== null && t !== void 0 ? t : {},
              ),
            }),
          ),
        )
      }
    },
  },
])
