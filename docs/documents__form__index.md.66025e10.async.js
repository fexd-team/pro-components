'use strict'
;(self.webpackChunk = self.webpackChunk || []).push([
  [5290],
  {
    41209: function (r, l, _) {
      _.r(l)
      var u = _(93463),
        a = _(771),
        s = _(21410),
        E = _(98670),
        m = _(16008),
        n = _(87343),
        e = _(57689)
      function d() {
        var t = (0, n.eL)(),
          o = t.texts
        return e.createElement(
          n.dY,
          null,
          e.createElement(
            e.Fragment,
            null,
            e.createElement(
              'div',
              { className: 'markdown' },
              e.createElement(
                'h2',
                { id: '\u529F\u80FD\u6F14\u793A' },
                e.createElement(
                  'a',
                  { 'aria-hidden': 'true', tabIndex: '-1', href: '#\u529F\u80FD\u6F14\u793A' },
                  e.createElement('span', { className: 'icon icon-link' }),
                ),
                '\u529F\u80FD\u6F14\u793A',
              ),
              e.createElement(s.Z, { lang: 'jsx' }, o[0].value),
            ),
            e.createElement(n.Dl, {
              demo: { id: 'documents-form-demo-0' },
              previewerProps: { inline: !1, defaultShowCode: !0 },
            }),
          ),
        )
      }
      l.default = d
    },
    16008: function (r, l, _) {
      var u = _(60799),
        a = _.n(u),
        s = _(57213),
        E = _.n(s),
        m = _(57689),
        n = _(6953),
        e = _(25191),
        d = _(66593)
      l.Z = function (t) {
        var o
        return m.createElement(
          e.Z,
          { title: '\u70B9\u51FB\u653E\u5927\u56FE\u7247', mouseEnterDelay: 1, placement: 'topRight' },
          m.createElement(
            d.Z,
            a()({ preview: { mask: !1 }, className: (0, n.Z)('mb-6', t == null ? void 0 : t.className) }, t, {
              style: E()(
                { cursor: 'zoom-in', maxWidth: 1080 },
                (o = t == null ? void 0 : t.style) !== null && o !== void 0 ? o : {},
              ),
            }),
          ),
        )
      }
    },
  },
])