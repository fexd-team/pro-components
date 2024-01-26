;(self.webpackChunk = self.webpackChunk || []).push([
  [2433],
  {
    87247: function (Y, d, e) {
      'use strict'
      e.r(d),
        e.d(d, {
          default: function () {
            return z
          },
        })
      var c = e(57689),
        t = e.t(c, 2),
        n = e(71803),
        r = e(63827),
        s = e(47163),
        E = e(74277),
        m = e(62558),
        y = e(37851),
        _ = e(97151),
        F = e(32699),
        p = e(74637),
        W = e.n(p),
        U = e(90674),
        P = e.n(U),
        f = { wrapper: 'zwxEQW5sxoeCQwRCZTJE' }
      ;(0, n.cY)({ esbuildWasmPath: 'https://unpkg.com/esbuild-wasm@0.14.54' })
      var L = {
          react: t,
          '@fexd/pro-components': E,
          dayjs: W(),
          antd: y,
          mockjs: P(),
          '@ant-design/icons': s,
          '@fexd/tools': m,
          ahooks: _,
          lodash: F,
        },
        Q = function (ee) {
          var V = L[ee]
          if (V) return V
          throw new Error('DEP: ' + ee + ' not found')
        },
        k = !1
      function z() {
        var $ = (0, n.Ik)()
        return (
          c.useEffect(
            function () {
              k || !$ || (k = !0)
            },
            [$],
          ),
          c.createElement(
            'div',
            { className: f.wrapper },
            c.createElement(n.XQ, {
              id: 'pro-components-playground',
              require: Q,
              style: { minHeight: '70vh' },
              initialFiles: [
                { code: e(74229), filename: 'App.jsx' },
                { code: e(22985), filename: 'data.js' },
              ],
            }),
          )
        )
      }
    },
    89341: function (Y, d, e) {
      'use strict'
      e.r(d),
        e.d(d, {
          default: function () {
            return Q
          },
        })
      var c = e(25359),
        t = e.n(c),
        n = e(49811),
        r = e.n(n),
        s = e(54306),
        E = e.n(s),
        m = e(57689),
        y = e(8398),
        _ = e(89729),
        F = e(60703),
        p = e(77833),
        W = e(29734),
        U = e(27708),
        P = e(66178),
        f = (0, y.rx)(function (k) {
          var z = k.polling,
            $ = k.defaultPolling,
            ee = $ === void 0 ? !0 : $,
            V = (0, W.Z)(ee),
            oe = E()(V, 2),
            q = oe[0],
            ne = oe[1].toggle,
            v = (0, _.Z)(),
            g = v.setTableActions,
            I = (0, F.Z)()
          console.log('polling', q ? z : void 0),
            (0, U.Z)(
              function () {
                I.refresh()
              },
              q ? z : void 0,
            ),
            (0, m.useEffect)(
              function () {
                g({
                  'toggle-polling': function () {
                    return {
                      actionType: 'switch',
                      checked: q,
                      checkedChildren: '\u8F6E\u8BE2',
                      unCheckedChildren: '\u9759\u6B62',
                      onClick: ne,
                    }
                  },
                })
              },
              [q],
            )
        }, 'polling'),
        L = (0, p.KW)(p.Y4.add(f))
      function Q() {
        return m.createElement(L, {
          title: '\u81EA\u5B9A\u4E49\u8F6E\u8BE2\u63D2\u4EF6 + \u81EA\u5B9A\u4E49\u5185\u7F6E\u52A8\u4F5C\u793A\u4F8B',
          defaultPolling: !0,
          polling: 3e3,
          actions: ['toggle-polling'],
          onQuery: (function () {
            var k = r()(
              t()().mark(function z($) {
                return t()().wrap(function (V) {
                  for (;;)
                    switch ((V.prev = V.next)) {
                      case 0:
                        return console.log('onQuery', $), (V.next = 3), (0, P.Z)(1500)
                      case 3:
                        return V.abrupt('return', { success: !0, data: [] })
                      case 4:
                      case 'end':
                        return V.stop()
                    }
                }, z)
              }),
            )
            return function (z) {
              return k.apply(this, arguments)
            }
          })(),
        })
      }
    },
    55461: function (Y, d, e) {
      'use strict'
      e.r(d)
      var c = e(52510),
        t = e.n(c),
        n = e(93525),
        r = e.n(n),
        s = e(25359),
        E = e.n(s),
        m = e(57213),
        y = e.n(m),
        _ = e(49811),
        F = e.n(_),
        p = e(57689),
        W = e(77833),
        U = e(55172),
        P = e(90674),
        f = e.n(P),
        L = e(66178),
        Q = e(97426),
        k = e(39334),
        z = e(94440),
        $ = [
          { label: '\u9009\u98791', value: 1 },
          { label: '\u9009\u98792', value: 2 },
          { label: '\u9009\u98793', value: 3 },
          { label: '\u9009\u98794', value: 4 },
          { label: '\u9009\u98795', value: 5 },
        ],
        ee = V()
      d.default = function () {
        return p.createElement(W.QV, {
          title: '\u8868\u683C',
          iconActions: ['refresh'],
          queryFields: [
            { label: '\u6587\u672C', name: 'text', type: 'text' },
            { label: '\u5355\u9009\u6846', name: 'select', type: 'select', options: $ },
          ],
          onQuery: (function () {
            var q = F()(
              E()().mark(function ne(v) {
                var g, I, M, j
                return E()().wrap(function (K) {
                  for (;;)
                    switch ((K.prev = K.next)) {
                      case 0:
                        return (K.next = 2), (0, L.Z)((0, Q.Z)(300, 1e3))
                      case 2:
                        return (
                          (g = v.page),
                          (I = v.pageSize),
                          (M = ee.filter(function (B) {
                            var o, le
                            return (
                              (!(v != null && v.text) ||
                                (B == null || (o = B.value1) === null || o === void 0
                                  ? void 0
                                  : o.includes(
                                      (le = v == null ? void 0 : v.text) !== null && le !== void 0 ? le : '',
                                    ))) &&
                              (!(v != null && v.select) ||
                                (v == null ? void 0 : v.select) === (B == null ? void 0 : B.value2))
                            )
                          })),
                          (j = M.slice((g - 1) * I, g * I)),
                          K.abrupt('return', {
                            success: !0,
                            data: j.map(function (B) {
                              return y()(y()({}, B), {}, { date: (0, U.Z)('20230503').valueOf() })
                            }),
                            total: M == null ? void 0 : M.length,
                          })
                        )
                      case 6:
                      case 'end':
                        return K.stop()
                    }
                }, ne)
              }),
            )
            return function (ne) {
              return q.apply(this, arguments)
            }
          })(),
          columns: [
            { title: '\u9879\u76EE 1', dataIndex: 'value1', width: 120 },
            { title: '\u9879\u76EE 2', dataIndex: 'value2', width: 120, valueType: 'select', valueEnum: $ },
          ],
        })
      }
      function V() {
        return Array(200)
          .fill('')
          .map(function (q, ne) {
            return y()(
              { id: 'key_'.concat(ne + 1) },
              Object.assign.apply(
                Object,
                [{}].concat(
                  r()(
                    Array(2)
                      .fill('')
                      .map(function (v, g) {
                        return t()(
                          {},
                          'value'.concat(g + 1),
                          (0, k.Z)(function () {
                            var I,
                              M = oe(g + 1),
                              j = {
                                select: (I = (0, z.Z)($)) === null || I === void 0 ? void 0 : I.value,
                                text: P.Random.name(),
                              }
                            return M in j ? j[M] : P.Random.name()
                          }),
                        )
                      }),
                  ),
                ),
              ),
            )
          })
      }
      function oe(q) {
        return q % 2 === 0 ? 'select' : 'text'
      }
    },
    68713: function (Y, d, e) {
      'use strict'
      e.r(d)
      var c = e(25359),
        t = e.n(c),
        n = e(49811),
        r = e.n(n),
        s = e(57689),
        E = e(77833),
        m = e(73015),
        y = e(66178),
        _ = [
          { label: '\u9009\u98791', value: 1 },
          { label: '\u9009\u98792', value: 2 },
          { label: '\u9009\u98793', value: 3 },
          { label: '\u9009\u98794', value: 4 },
          { label: '\u9009\u98795', value: 5 },
        ]
      d.default = function () {
        return s.createElement(E.QV, {
          manualQuery: !0,
          onQuery: (function () {
            var F = r()(
              t()().mark(function p(W) {
                return t()().wrap(function (P) {
                  for (;;)
                    switch ((P.prev = P.next)) {
                      case 0:
                        return m.ZP.info('\u53C2\u6570\uFF1A'.concat(JSON.stringify(W))), (P.next = 3), (0, y.Z)(1e3)
                      case 3:
                      case 'end':
                        return P.stop()
                    }
                }, p)
              }),
            )
            return function (p) {
              return F.apply(this, arguments)
            }
          })(),
          columns: [
            { title: '\u6587\u672C', dataIndex: 'text', valueType: 'text', queryField: !0 },
            { title: '\u5355\u9009\u6846', dataIndex: 'select', valueType: 'select', valueEnum: _, queryField: !0 },
            { title: '\u5BC6\u7801', dataIndex: 'password', valueType: 'password', queryField: !0 },
            { title: '\u91D1\u989D', dataIndex: 'money', valueType: 'money', queryField: !0 },
            { title: '\u6587\u672C\u57DF', dataIndex: 'textarea', valueType: 'textarea', queryField: !0 },
            { title: '\u6570\u5B57', dataIndex: 'digit', valueType: 'digit', queryField: !0, hidden: !0 },
            {
              title: '\u591A\u9009\u6846',
              dataIndex: 'multipleSelect',
              valueType: 'multipleSelect',
              valueEnum: _,
              queryField: !0,
              hidden: !0,
            },
            {
              title: '\u591A\u9009',
              dataIndex: 'checkbox',
              valueType: 'checkbox',
              valueEnum: _,
              queryField: !0,
              hidden: !0,
            },
            { title: '\u5355\u9009', dataIndex: 'radio', valueType: 'radio', valueEnum: _, queryField: !0, hidden: !0 },
            {
              title: '\u5355\u9009\u6309\u94AE',
              dataIndex: 'radioButton',
              valueType: 'radioButton',
              valueEnum: _,
              queryField: !0,
              hidden: !0,
            },
            { title: '\u65E5\u671F', dataIndex: 'date', valueType: 'date', queryField: !0, hidden: !0 },
            {
              title: '\u65E5\u671F\u65F6\u95F4',
              dataIndex: 'dateTime',
              valueType: 'dateTime',
              queryField: !0,
              hidden: !0,
            },
            { title: '\u65E5\u671F\u5468', dataIndex: 'dateWeek', valueType: 'dateWeek', queryField: !0, hidden: !0 },
            { title: '\u65E5\u671F\u6708', dataIndex: 'dateMonth', valueType: 'dateMonth', queryField: !0, hidden: !0 },
            {
              title: '\u65E5\u671F\u5B63\u5EA6',
              dataIndex: 'dateQuarter',
              valueType: 'dateQuarter',
              queryField: !0,
              hidden: !0,
            },
            { title: '\u65E5\u671F\u5E74', dataIndex: 'dateYear', valueType: 'dateYear', queryField: !0, hidden: !0 },
            {
              title: '\u65E5\u671F\u8303\u56F4',
              dataIndex: 'dateRange',
              valueType: 'dateRange',
              queryField: !0,
              hidden: !0,
            },
            {
              title: '\u65E5\u671F\u65F6\u95F4\u8303\u56F4',
              dataIndex: 'dateTimeRange',
              valueType: 'dateTimeRange',
              queryField: !0,
              hidden: !0,
            },
            { title: '\u65F6\u95F4', dataIndex: 'time', valueType: 'time', queryField: !0, hidden: !0 },
            {
              title: '\u65F6\u95F4\u8303\u56F4',
              dataIndex: 'timeRange',
              valueType: 'timeRange',
              queryField: !0,
              hidden: !0,
            },
            { title: '\u5F00\u5173', dataIndex: 'switch', valueType: 'switch', queryField: !0, hidden: !0 },
            { title: '\u8BC4\u5206', dataIndex: 'rate', valueType: 'rate', queryField: !0, hidden: !0 },
            {
              title: '\u7EA7\u8054',
              dataIndex: 'cascader',
              valueType: 'cascader',
              valueEnum: [
                {
                  label: '\u7B2C\u4E00\u5C42',
                  value: 'level1',
                  children: [{ label: '\u7B2C\u4E8C\u5C42', value: 'level2', children: _ }].concat(_),
                },
              ].concat(_),
              queryField: !0,
              hidden: !0,
            },
          ],
        })
      }
    },
    93570: function (Y, d, e) {
      'use strict'
      e.r(d)
      var c = e(57689),
        t = e(77833)
      d.default = function () {
        return c.createElement(t.QV, {
          render: function (r) {
            var s = r.queryField
            return s
          },
          queryFieldColumns: 4,
          queryFieldDefaultLines: 1,
          queryFieldDefaultLength: 2,
          queryFields: [
            { label: '\u6587\u672C1', name: 'text1' },
            { label: '\u6587\u672C2', name: 'text2' },
            { label: '\u6587\u672C3', name: 'text3' },
            { label: '\u6587\u672C4', name: 'text4' },
            { label: '\u6587\u672C5', name: 'text5' },
            { label: '\u6587\u672C6', name: 'text6' },
          ],
        })
      }
    },
    9968: function (Y, d, e) {
      'use strict'
      e.r(d)
      var c = e(57689),
        t = e(77833)
      d.default = function () {
        return c.createElement(t.QV, {
          queryFields: [
            [
              { label: '\u6587\u672C1', name: 'text1' },
              { label: '\u6587\u672C2', name: 'text2' },
            ],
            [{ label: '\u6587\u672C3', name: 'text3' }],
            [
              { label: '\u6587\u672C4', name: 'text4' },
              { label: '\u6587\u672C5', name: 'text5' },
              { label: '\u6587\u672C6', name: 'text6' },
            ],
            [
              { label: '\u6587\u672C7', name: 'text7', colSpan: 16 },
              { label: '\u6587\u672C8', name: 'text8', colSpan: 8 },
            ],
          ],
          render: function (r) {
            var s = r.queryField
            return s
          },
        })
      }
    },
    17798: function (Y, d, e) {
      'use strict'
      e.r(d)
      var c = e(54306),
        t = e.n(c),
        n = e(57689),
        r = e(77833)
      d.default = function () {
        return n.createElement(r.QV, {
          queryFields: [
            { label: '\u6587\u672C1', name: 'text1' },
            { label: '\u6587\u672C2', name: 'text2' },
            { label: '\u6587\u672C3', name: 'text3' },
          ],
          renderQueryFields: function (E) {
            var m = E.renderField,
              y = E.renderFields,
              _ = E.actions,
              F = E.query,
              p = E.reset,
              W = E.fold,
              U = E.showMore,
              P = (0, n.useState)(0),
              f = t()(P, 2),
              L = f[0],
              Q = f[1]
            return n.createElement(
              n.Fragment,
              null,
              n.createElement('div', null, 'count: ', L),
              n.createElement('div', null, 'showMore: ', String(U)),
              m('text2'),
              y([
                [W],
                [
                  'text1',
                  n.createElement(
                    'button',
                    {
                      onClick: function () {
                        return Q(L + 1)
                      },
                    },
                    '+',
                  ),
                  'text2',
                ],
                ['text3', _],
                ['text1', 'text2', 'text3'],
                [
                  { name: 'text2', colSpan: 16 },
                  { name: 'text1', colSpan: 8 },
                ],
                [
                  { colSpan: 16, content: n.createElement('div', null, F) },
                  { colSpan: 8, content: n.createElement('div', null, p) },
                ],
              ]),
            )
          },
          render: function (E) {
            var m = E.queryField
            return m
          },
        })
      }
    },
    29909: function (Y, d, e) {
      'use strict'
      e.r(d)
      var c = e(57689),
        t = e(77833)
      d.default = function () {
        return c.createElement(t.QV, {
          queryFieldOrder: ['text5', 'text3'],
          queryFields: [
            { label: '\u6587\u672C1', name: 'text1' },
            { label: '\u6587\u672C2', name: 'text2' },
            { label: '\u6587\u672C3', name: 'text3' },
            { label: '\u6587\u672C4', name: 'text4' },
            { label: '\u6587\u672C5', name: 'text5' },
            { label: '\u6587\u672C6', name: 'text6' },
          ],
          render: function (r) {
            var s = r.queryField
            return s
          },
        })
      }
    },
    68927: function (Y, d, e) {
      'use strict'
      e.r(d)
      var c = e(25359),
        t = e.n(c),
        n = e(49811),
        r = e.n(n),
        s = e(57689),
        E = e(77833),
        m = e(19263),
        y = e(73015),
        _ = e(49094),
        F = e(47277),
        p = e(66178)
      d.default = function () {
        return s.createElement(E.QV, {
          queryFields: [
            { label: '\u6587\u672C', name: 'text' },
            {
              label: '\u5355\u9009\u6846',
              name: 'select',
              type: 'select',
              dependencies: ['text'],
              hook: function (U) {
                var P = U.form,
                  f = P.getFieldValue('text'),
                  L = !f
                ;(0, m.Z)(
                  function () {
                    f && y.ZP.info('text \u53D1\u751F\u4E86\u53D8\u5316\uFF1A'.concat(f)),
                      P.setFieldsValue({ select: void 0 })
                  },
                  [f],
                  { wait: 500 },
                )
                var Q = {
                  tooltip:
                    !L &&
                    '\u9009\u9879\u4F1A\u6839\u636E\u6587\u672C\u6846\u53D8\u5316\uFF0C\u5F53\u524D\u5185\u5BB9\uFF1A'.concat(
                      f,
                    ),
                  disabled: L,
                  options: f ? [{ label: f, value: f }] : [],
                }
                return (
                  L &&
                    (Q.label = s.createElement(
                      _.Z,
                      null,
                      '\u5355\u9009\u6846',
                      s.createElement(
                        F.Z,
                        { color: 'orange' },
                        '\u6587\u672C\u6846\u9700\u8981\u5148\u5199\u70B9\u513F\u5565',
                      ),
                    )),
                  Q
                )
              },
            },
          ],
          manualQuery: !0,
          onQuery: (function () {
            var W = r()(
              t()().mark(function U(P) {
                return t()().wrap(function (L) {
                  for (;;)
                    switch ((L.prev = L.next)) {
                      case 0:
                        return y.ZP.info('\u53C2\u6570\uFF1A'.concat(JSON.stringify(P))), (L.next = 3), (0, p.Z)(1e3)
                      case 3:
                      case 'end':
                        return L.stop()
                    }
                }, U)
              }),
            )
            return function (U) {
              return W.apply(this, arguments)
            }
          })(),
          render: function (U) {
            var P = U.queryField
            return P
          },
        })
      }
    },
    20566: function (Y, d, e) {
      'use strict'
      e.r(d)
      var c = e(25359),
        t = e.n(c),
        n = e(49811),
        r = e.n(n),
        s = e(57689),
        E = e(77833),
        m = e(73015),
        y = e(66178),
        _ = [
          { label: '\u9009\u98791', value: 1 },
          { label: '\u9009\u98792', value: 2 },
          { label: '\u9009\u98793', value: 3 },
          { label: '\u9009\u98794', value: 4 },
          { label: '\u9009\u98795', value: 5 },
        ]
      d.default = function () {
        return s.createElement(E.QV, {
          queryFields: [
            { label: '\u6587\u672C', tooltip: 'type="text"', name: 'text', type: 'text' },
            { label: '\u5355\u9009\u6846', tooltip: 'type="select"', name: 'select', type: 'select', options: _ },
            { label: '\u5BC6\u7801', tooltip: 'type="password"', name: 'password', type: 'password' },
            { label: '\u91D1\u989D', tooltip: 'type="money"', name: 'money', type: 'money' },
            { label: '\u6587\u672C\u57DF', tooltip: 'type="textarea"', name: 'textarea', type: 'textarea' },
            { label: '\u6570\u5B57', tooltip: 'type="digit"', name: 'digit', type: 'digit' },
            {
              label: '\u591A\u9009\u6846',
              tooltip: 'type="multipleSelect"',
              name: 'multipleSelect',
              type: 'multipleSelect',
              options: _,
            },
            { label: '\u591A\u9009', tooltip: 'type="checkbox"', name: 'checkbox', type: 'checkbox', options: _ },
            { label: '\u5355\u9009', tooltip: 'type="radio"', name: 'radio', type: 'radio', options: _ },
            {
              label: '\u5355\u9009\u6309\u94AE',
              tooltip: 'type="radioButton"',
              name: 'radioButton',
              type: 'radioButton',
              options: _,
            },
            { label: '\u65E5\u671F', tooltip: 'type="date"', name: 'date', type: 'date' },
            { label: '\u65E5\u671F\u65F6\u95F4', tooltip: 'type="dateTime"', name: 'dateTime', type: 'dateTime' },
            { label: '\u65E5\u671F\u5468', tooltip: 'type="dateWeek"', name: 'dateWeek', type: 'dateWeek' },
            { label: '\u65E5\u671F\u6708', tooltip: 'type="dateMonth"', name: 'dateMonth', type: 'dateMonth' },
            {
              label: '\u65E5\u671F\u5B63\u5EA6',
              tooltip: 'type="dateQuarter"',
              name: 'dateQuarter',
              type: 'dateQuarter',
            },
            { label: '\u65E5\u671F\u5E74', tooltip: 'type="dateYear"', name: 'dateYear', type: 'dateYear' },
            { label: '\u65E5\u671F\u8303\u56F4', tooltip: 'type="dateRange"', name: 'dateRange', type: 'dateRange' },
            {
              label: '\u65E5\u671F\u65F6\u95F4\u8303\u56F4',
              tooltip: 'type="dateTimeRange"',
              name: 'dateTimeRange',
              type: 'dateTimeRange',
            },
            { label: '\u65F6\u95F4', tooltip: 'type="time"', name: 'time', type: 'time' },
            { label: '\u65F6\u95F4\u8303\u56F4', tooltip: 'type="timeRange"', name: 'timeRange', type: 'timeRange' },
            { label: '\u5F00\u5173', tooltip: 'type="switch"', name: 'switch', type: 'switch' },
            { label: '\u8BC4\u5206', tooltip: 'type="rate"', name: 'rate', type: 'rate' },
            {
              label: '\u7EA7\u8054',
              tooltip: 'type="cascader"',
              name: 'cascader',
              type: 'cascader',
              options: [
                {
                  label: '\u7B2C\u4E00\u5C42',
                  value: 'level1',
                  children: [{ label: '\u7B2C\u4E8C\u5C42', value: 'level2', children: _ }].concat(_),
                },
              ].concat(_),
            },
          ],
          render: function (p) {
            var W = p.queryField
            return W
          },
          manualQuery: !0,
          onQuery: (function () {
            var F = r()(
              t()().mark(function p(W) {
                return t()().wrap(function (P) {
                  for (;;)
                    switch ((P.prev = P.next)) {
                      case 0:
                        return m.ZP.info('\u53C2\u6570\uFF1A'.concat(JSON.stringify(W))), (P.next = 3), (0, y.Z)(1e3)
                      case 3:
                      case 'end':
                        return P.stop()
                    }
                }, p)
              }),
            )
            return function (p) {
              return F.apply(this, arguments)
            }
          })(),
          queryFieldDefaultLength: 100,
        })
      }
    },
    11139: function (Y, d, e) {
      'use strict'
      e.r(d),
        e.d(d, {
          default: function () {
            return $e
          },
        })
      var c = e(54306),
        t = e.n(c),
        n = e(57689),
        r = e(10792),
        s = e(77833)
      function E(D) {
        var h = D.title,
          S = h === void 0 ? '\u6807\u9898' : h,
          C = D.children
        return C
      }
      var m = E,
        y = e(92737),
        _ = e(64313),
        F = e(19321),
        p = e(39334)
      function W(D) {
        var h = D.onTitleChange,
          S = y.ZP.useForm(),
          C = t()(S, 1),
          N = C[0],
          b = (0, F.Z)(function (H) {
            ;(0, p.Z)(h, void 0, H)
          }, 300),
          G = function (ae, J) {
            var x = ae.title
            b(x)
          }
        return n.createElement(
          m,
          { title: '\u6807\u9898\u914D\u7F6E\u533A' },
          n.createElement(
            y.ZP,
            { form: N, onValuesChange: G },
            n.createElement(_.ZP, { label: '\u6807\u9898', name: 'title' }),
          ),
        )
      }
      var U = W,
        P = e(57213),
        f = e.n(P),
        L = e(25359),
        Q = e.n(L),
        k = e(49811),
        z = e.n(k),
        $ = e(93525),
        ee = e.n($),
        V = e(12342),
        oe = e.n(V),
        q = e(60799),
        ne = e.n(q),
        v = e(52510),
        g = e.n(v),
        I = e(25003),
        M = e(29604),
        j = e(14163),
        te = e(49094),
        K = e(80697),
        B = e(95152),
        o = e(43111),
        le = e(6163),
        w = e(81075),
        me = e(23683),
        ye = ['className', 'style'],
        Pe = function (h) {
          return h == null
            ? void 0
            : h.map(function (S, C) {
                return f()(f()({}, S), {}, { idx: C })
              })
        },
        xe = (0, w.W8)(function (D) {
          return n.createElement('tr', D)
        }),
        Be = (0, w.JN)(function (D) {
          return n.createElement('tbody', D)
        })
      function Le(D) {
        var h = D.form,
          S = D.name,
          C = S === void 0 ? 'data' : S,
          N = D.defaultItem,
          b = N === void 0 ? {} : N,
          G = D.columns,
          H = D.onSort,
          ae = D.onSetting,
          J = function (l) {
            var a = l.oldIndex,
              A = l.newIndex
            if (a !== A) {
              var R = h.getFieldValue(C) || [],
                i = (0, me.q)(R.slice(), a, A).filter(function (T) {
                  return !!T
                })
              h.setFieldsValue(g()({}, C, i)), (0, p.Z)(H, void 0, g()({}, C, i))
            }
          },
          x = (0, w.W6)(function () {
            return n.createElement(K.Z, { style: { cursor: 'grab', color: '#999' } })
          }),
          O = function (l) {
            return n.createElement(
              Be,
              ne()({ useDragHandle: !0, disableAutoscroll: !0, helperClass: 'row-dragging', onSortEnd: J }, l),
            )
          },
          Z = function (l) {
            var a = l.className,
              A = l.style,
              R = oe()(l, ye),
              i = h.getFieldValue(C) || [],
              T = i.findIndex(function (ie) {
                return ie.idx === R['data-row-key']
              })
            return n.createElement(xe, ne()({ index: T }, R))
          }
        return n.createElement(M.Z.List, { name: C }, function (u, l) {
          var a = l.add,
            A = l.remove,
            R = (h == null ? void 0 : h.getFieldValue(C)) || []
          return n.createElement(
            r.iV,
            { size: 'small' },
            n.createElement(j.Z, {
              rowKey: 'idx',
              pagination: !1,
              dataSource: R,
              columns: [
                {
                  title: '\u6392\u5E8F',
                  width: '60px',
                  align: 'center',
                  render: function (T, ie, re) {
                    var de = u[re]
                    return n.createElement(
                      _.ZP,
                      ne()({ style: { marginBottom: 0 } }, de, {
                        renderField: function () {
                          return n.createElement(x, null)
                        },
                      }),
                    )
                  },
                },
              ].concat(
                ee()(
                  G == null
                    ? void 0
                    : G.map(function (i) {
                        return f()(
                          f()({}, i),
                          {},
                          {
                            render: function (ie, re, de) {
                              var ue,
                                _e = u[de]
                              return i != null && i.name
                                ? n.createElement(
                                    _.ZP,
                                    ne()({ style: { marginBottom: 0 } }, i, _e, {
                                      initialValue:
                                        (ue = h.getFieldValue(C)[de]) === null || ue === void 0
                                          ? void 0
                                          : ue[String(i == null ? void 0 : i.name)],
                                      name: [_e.name, String(i == null ? void 0 : i.name)],
                                      props: {
                                        onChange: function () {
                                          var Ee, ge
                                          if (i != null && (Ee = i.props) !== null && Ee !== void 0 && Ee.onChange) {
                                            for (var Ce = arguments.length, pe = new Array(Ce), fe = 0; fe < Ce; fe++)
                                              pe[fe] = arguments[fe]
                                            p.Z.apply(
                                              void 0,
                                              [
                                                i == null || (ge = i.props) === null || ge === void 0
                                                  ? void 0
                                                  : ge.onChange,
                                                void 0,
                                              ].concat(pe, [de]),
                                            )
                                          }
                                        },
                                      },
                                    }),
                                  )
                                : null
                            },
                          },
                        )
                      }),
                ),
                [
                  {
                    title: '\u66F4\u591A',
                    render: function (T, ie, re) {
                      return n.createElement(_.ZP, {
                        style: { marginBottom: 0 },
                        renderField: function () {
                          return n.createElement(
                            te.Z,
                            { size: 0 },
                            n.createElement(I.Z, {
                              icon: n.createElement(B.Z, null),
                              type: 'link',
                              onClick: z()(
                                Q()().mark(function ue() {
                                  return Q()().wrap(function (se) {
                                    for (;;)
                                      switch ((se.prev = se.next)) {
                                        case 0:
                                          return (se.next = 2), (0, p.Z)(ae, void 0, ie, re)
                                        case 2:
                                        case 'end':
                                          return se.stop()
                                      }
                                  }, ue)
                                }),
                              ),
                            }),
                            n.createElement(I.Z, {
                              icon: n.createElement(o.Z, null),
                              danger: !0,
                              type: 'link',
                              onClick: function () {
                                A(re)
                              },
                            }),
                          )
                        },
                      })
                    },
                  },
                ],
              ),
              components: { body: { wrapper: O, row: Z } },
            }),
            n.createElement(
              I.Z,
              {
                type: 'dashed',
                block: !0,
                icon: n.createElement(le.Z, null),
                onClick: z()(
                  Q()().mark(function i() {
                    var T
                    return Q()().wrap(function (re) {
                      for (;;)
                        switch ((re.prev = re.next)) {
                          case 0:
                            return (T = h.getFieldValue(C)), (re.next = 3), h.setFieldsValue(g()({}, C, Pe(T)))
                          case 3:
                            a(f()(f()({}, b), {}, { idx: T == null ? void 0 : T.length }))
                          case 4:
                          case 'end':
                            return re.stop()
                        }
                    }, i)
                  }),
                ),
              },
              '\u6DFB\u52A0\u4E00\u884C\u6570\u636E',
            ),
          )
        })
      }
      var De = Le
      function Ze(D) {
        var h = D.fields,
          S = h === void 0 ? [] : h
        return n.createElement(
          'div',
          { style: { padding: '20px 10px' } },
          S == null
            ? void 0
            : S.map(function (C, N) {
                return n.createElement(
                  te.Z,
                  { key: ''.concat(C.name).concat(N), align: 'center', style: { padding: '5px 0' } },
                  n.createElement('label', { htmlFor: String(C == null ? void 0 : C.name) }, C.label),
                  n.createElement(
                    _.ZP,
                    ne()({ style: { marginBottom: 0, width: '180px' } }, C, {
                      label: '',
                      props: f()({ size: C.type !== 'switch' ? 'small' : void 0 }, C == null ? void 0 : C.props),
                    }),
                  ),
                )
              }),
        )
      }
      var he = Ze,
        je = e(62734),
        Fe = e(90674),
        Te = { type: 'text', align: 'left' },
        We = function (h) {
          var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 20
          return Array.from(new Array(S)).map(function (C, N) {
            var b = { id: N + 1 }
            return (
              h.forEach(function (G) {
                b[G.field] = (0, p.Z)(G.random)
              }),
              b
            )
          })
        }
      function Se(D) {
        var h = D.onColumnsChange,
          S = D.onSelectableChange,
          C = y.ZP.useForm(),
          N = t()(C, 1),
          b = N[0],
          G = (0, F.Z)(function (x) {
            var O =
                x == null
                  ? void 0
                  : x.map(function (l) {
                      return { title: l.title, align: l.align, dataIndex: l.title, type: l.type }
                    }),
              Z =
                x == null
                  ? void 0
                  : x.map(function (l) {
                      var a
                      switch (l.type) {
                        case 'text':
                          a = function () {
                            return Fe.Random.string(16)
                          }
                          break
                        case 'select':
                          a = function () {
                            var R, i
                            return Fe.Random.pick(
                              l != null && (R = l.options) !== null && R !== void 0 && R.length
                                ? l == null || (i = l.options) === null || i === void 0
                                  ? void 0
                                  : i.map(function (T) {
                                      return T.value
                                    })
                                : [1, 2, 3, 4, 5],
                            )
                          }
                          break
                        case 'date':
                          a = function () {
                            return Fe.Random.datetime()
                          }
                        default:
                          break
                      }
                      return { field: l.title, random: a }
                    }),
              u = We(Z, 33)
            ;(0, p.Z)(h, void 0, O, u)
          }, 300),
          H = (0, F.Z)(function (x) {
            ;(0, p.Z)(S, void 0, x)
          }, 300),
          ae = function (O, Z) {
            var u,
              l = Object.keys(O)
            if ((console.log(l, 'changedKeys---'), l != null && l.includes('selectable'))) {
              H(O == null ? void 0 : O.selectable)
              return
            }
            var a =
              (u = b.getFieldValue('data')) === null || u === void 0
                ? void 0
                : u.filter(function (A) {
                    return A.title
                  })
            a != null && a.length && G(a)
          },
          J = (function () {
            var x = z()(
              Q()().mark(function O(Z, u) {
                return Q()().wrap(function (a) {
                  for (;;)
                    switch ((a.prev = a.next)) {
                      case 0:
                        return (
                          (a.next = 2),
                          (0, je.ZP)({
                            width: 1e3,
                            title: '\u66F4\u591A\u914D\u7F6E',
                            content: function () {
                              return n.createElement(y.ZP, null)
                            },
                          }).promise
                        )
                      case 2:
                      case 'end':
                        return a.stop()
                    }
                }, O)
              }),
            )
            return function (Z, u) {
              return x.apply(this, arguments)
            }
          })()
        return (
          (0, n.useEffect)(
            function () {
              b.setFieldsValue({ data: [f()(f()({}, Te), {}, { idx: 0 })], selectable: !1 })
            },
            [b],
          ),
          n.createElement(
            m,
            { title: '\u8868\u683C\u5217\u914D\u7F6E\u533A' },
            n.createElement(
              y.ZP,
              { form: b, onValuesChange: ae },
              n.createElement(
                n.Fragment,
                null,
                n.createElement(De, {
                  name: 'data',
                  form: b,
                  defaultItem: Te,
                  columns: [
                    { title: '\u540D\u79F0', name: 'title' },
                    {
                      title: '\u7C7B\u578B',
                      name: 'type',
                      type: 'select',
                      options: [
                        { label: '\u6587\u672C', value: 'text' },
                        { label: '\u5355\u9009', value: 'select' },
                        { label: '\u65E5\u671F', value: 'date' },
                      ],
                      props: { allowClear: !1 },
                    },
                    {
                      title: '\u5BF9\u9F50',
                      name: 'align',
                      type: 'select',
                      options: [
                        { label: '\u5DE6', value: 'left' },
                        { label: '\u4E2D', value: 'center' },
                        { label: '\u53F3', value: 'right' },
                      ],
                      props: { allowClear: !1 },
                    },
                  ],
                  onSort: ae,
                  onSetting: J,
                }),
                n.createElement(he, {
                  fields: [
                    {
                      label: '\u8868\u683C\u53EF\u591A\u9009\uFF1A',
                      name: 'selectable',
                      type: 'switch',
                      valuePropName: 'checked',
                    },
                  ],
                }),
              ),
            ),
          )
        )
      }
      var Ue = Se,
        Me = { type: 'text', required: !1 }
      function Ke(D) {
        var h = D.onQueryFieldsChange,
          S = D.onQueryFieldColumnsChange,
          C = D.onQueryFieldDefaultLinesChange,
          N = D.onQueryFieldRefreshAfterResetChange,
          b = y.ZP.useForm(),
          G = t()(b, 1),
          H = G[0],
          ae = (0, F.Z)(function () {
            for (var u = arguments.length, l = new Array(u), a = 0; a < u; a++) l[a] = arguments[a]
            p.Z.apply(void 0, [S, void 0].concat(l))
          }, 300),
          J = (0, F.Z)(function () {
            for (var u = arguments.length, l = new Array(u), a = 0; a < u; a++) l[a] = arguments[a]
            p.Z.apply(void 0, [C, void 0].concat(l))
          }, 300),
          x = (0, F.Z)(function () {
            for (var u = arguments.length, l = new Array(u), a = 0; a < u; a++) l[a] = arguments[a]
            p.Z.apply(void 0, [N, void 0].concat(l))
          }, 300),
          O = (0, F.Z)(function (u) {
            var l =
              u == null
                ? void 0
                : u.map(function (a) {
                    var A
                    return {
                      label: a.label,
                      name: a.label,
                      type: a.type,
                      rules:
                        a != null &&
                        a.required &&
                        (a == null || (A = a.required) === null || A === void 0 ? void 0 : A.length) > 0
                          ? [{ required: !0 }]
                          : [],
                    }
                  })
            ;(0, p.Z)(h, void 0, l)
          }, 300),
          Z = function (l, a) {
            var A,
              R = Object.keys(l)
            if (R != null && R.includes('queryFieldColumns')) {
              ae(l == null ? void 0 : l.queryFieldColumns)
              return
            }
            if (R != null && R.includes('queryFieldDefaultLines')) {
              J(l == null ? void 0 : l.queryFieldDefaultLines)
              return
            }
            if (R != null && R.includes('queryFieldRefreshAfterReset')) {
              x(l == null ? void 0 : l.queryFieldRefreshAfterReset)
              return
            }
            var i =
              (A = H.getFieldValue('data')) === null || A === void 0
                ? void 0
                : A.filter(function (T) {
                    return T.label
                  })
            i != null && i.length && O(i)
          }
        return (
          (0, n.useEffect)(
            function () {
              H.setFieldsValue({
                data: [f()(f()({}, Me), {}, { idx: 0 })],
                queryFieldColumns: 4,
                queryFieldDefaultLines: 1,
                queryFieldRefreshAfterReset: !0,
              })
            },
            [H],
          ),
          n.createElement(
            m,
            { title: '\u67E5\u8BE2\u533A' },
            n.createElement(
              y.ZP,
              { form: H, onValuesChange: Z },
              n.createElement(
                n.Fragment,
                null,
                n.createElement(De, {
                  name: 'data',
                  form: H,
                  defaultItem: Me,
                  columns: [
                    { title: '\u540D\u79F0', name: 'label' },
                    {
                      title: '\u7C7B\u578B',
                      name: 'type',
                      type: 'select',
                      options: [
                        { label: '\u6587\u672C', value: 'text' },
                        { label: '\u5355\u9009', value: 'select' },
                        { label: '\u65E5\u671F', value: 'date' },
                        { label: '\u91D1\u989D', value: 'money' },
                        { label: '\u6587\u672C\u57DF', value: 'textarea' },
                        { label: '\u6570\u5B57', value: 'digit' },
                        { label: '\u591A\u9009\u6846', value: 'multipleSelect' },
                        { label: '\u591A\u9009', value: 'checkbox' },
                        { label: '\u5355\u9009', value: 'radio' },
                        { label: '\u5355\u9009\u6309\u94AE', value: 'radioButton' },
                        { label: '\u65E5\u671F', value: 'date' },
                        { label: '\u65E5\u671F\u65F6\u95F4', value: 'dateTime' },
                        { label: '\u65E5\u671F\u5468', value: 'dateWeek' },
                        { label: '\u65E5\u671F\u6708', value: 'dateMonth' },
                        { label: '\u65E5\u671F\u5B63\u5EA6', value: 'dateQuarter' },
                        { label: '\u65E5\u671F\u5E74', value: 'dateYear' },
                        { label: '\u65E5\u671F\u8303\u56F4', value: 'dateRange' },
                        { label: '\u65E5\u671F\u65F6\u95F4\u8303\u56F4', value: 'dateTimeRange' },
                        { label: '\u65F6\u95F4', value: 'time' },
                        { label: '\u65F6\u95F4\u8303\u56F4', value: 'timeRange' },
                        { label: '\u5F00\u5173', value: 'switch' },
                        { label: '\u8BC4\u5206', value: 'rate' },
                        { label: '\u7EA7\u8054', value: 'cascader' },
                      ],
                      props: { allowClear: !1 },
                    },
                    {
                      title: '\u662F\u5426\u5FC5\u586B',
                      name: 'required',
                      type: 'checkbox',
                      options: [{ label: '', value: !0 }],
                    },
                  ],
                  onSort: Z,
                }),
                n.createElement(he, {
                  fields: [
                    { label: '\u4E00\u884C\u663E\u793A\u51E0\u4E2A\uFF1A', name: 'queryFieldColumns', type: 'number' },
                    {
                      label: '\u9ED8\u8BA4\u663E\u793A\u51E0\u884C\uFF1A',
                      name: 'queryFieldDefaultLines',
                      type: 'number',
                    },
                    {
                      label: '\u91CD\u7F6E\u662F\u5426\u67E5\u8BE2\uFF1A',
                      name: 'queryFieldRefreshAfterReset',
                      type: 'switch',
                      valuePropName: 'checked',
                    },
                  ],
                }),
              ),
            ),
          )
        )
      }
      var Qe = Ke,
        be = [
          { builtIn: 'view', content: '\u8BE6\u60C5' },
          { builtIn: 'edit', content: '\u7F16\u8F91' },
          { builtIn: 'table-edit', content: '\u7F16\u8F91' },
          { builtIn: 'delete', content: '\u5220\u9664' },
          { builtIn: '', content: '' },
        ],
        Re = { builtIn: void 0, content: '' }
      function Ve(D) {
        var h = D.onColumnActionsChange,
          S = D.onColumnActionsConfigChange,
          C = y.ZP.useForm(),
          N = t()(C, 1),
          b = N[0],
          G = (0, F.Z)(function (J) {
            var x =
              J == null
                ? void 0
                : J.map(function (O) {
                    return { builtIn: O == null ? void 0 : O.builtIn, content: O == null ? void 0 : O.content }
                  })
            ;(0, p.Z)(h, void 0, x)
          }, 300),
          H = (0, F.Z)(function (J) {
            console.log(J, 'data---'), (0, p.Z)(S, void 0, J)
          }, 300),
          ae = function (x, O) {
            var Z,
              u = Object.keys(x)
            if (
              (u != null && u.includes('fixColumnActions')) ||
              (u != null && u.includes('align')) ||
              (u != null && u.includes('width'))
            ) {
              var l = b == null ? void 0 : b.getFieldsValue(),
                a = l.fixColumnActions,
                A = l.align,
                R = l.width
              H({ fixColumnActions: a, align: A, width: R })
              return
            }
            var i =
              (Z = b.getFieldValue('data')) === null || Z === void 0
                ? void 0
                : Z.filter(function (T) {
                    return (T == null ? void 0 : T.builtIn) || (T == null ? void 0 : T.content)
                  })
            i.length && G(i)
          }
        return (
          (0, n.useEffect)(
            function () {
              b.setFieldsValue({
                data: [f()(f()({}, Re), {}, { idx: 0 })],
                fixColumnActions: 'right',
                align: 'center',
                width: void 0,
              })
            },
            [b],
          ),
          n.createElement(
            m,
            { title: '\u8868\u683C\u884C\u64CD\u4F5C\u914D\u7F6E\u533A' },
            n.createElement(
              y.ZP,
              { form: b, onValuesChange: ae },
              n.createElement(
                n.Fragment,
                null,
                n.createElement(De, {
                  name: 'data',
                  form: b,
                  defaultItem: Re,
                  columns: [
                    {
                      title: '\u52A8\u4F5C\u7C7B\u578B',
                      name: 'builtIn',
                      type: 'select',
                      width: '150px',
                      options: [
                        { label: '\u67E5\u770B\u8BE6\u60C5', value: 'view' },
                        { label: '\u7F16\u8F91\uFF08\u5F39\u7A97\uFF09', value: 'edit' },
                        { label: '\u7F16\u8F91\uFF08\u8868\u683C\u5185\uFF09', value: 'table-edit' },
                        { label: '\u5220\u9664', value: 'delete' },
                        { label: '\u81EA\u5B9A\u4E49', value: '' },
                      ],
                      props: {
                        onChange: function (x) {
                          for (var O = arguments.length, Z = new Array(O > 1 ? O - 1 : 0), u = 1; u < O; u++)
                            Z[u - 1] = arguments[u]
                          var l = Z == null ? void 0 : Z[(Z == null ? void 0 : Z.length) - 1],
                            a =
                              be == null
                                ? void 0
                                : be.find(function (i) {
                                    return i.builtIn === x
                                  }),
                            A = b == null ? void 0 : b.getFieldValue('data'),
                            R =
                              A == null
                                ? void 0
                                : A.map(function (i, T) {
                                    return T === l ? f()(f()({}, a), {}, { idx: T }) : f()(f()({}, i), {}, { idx: T })
                                  })
                          b.setFieldsValue({ data: R }), ae(R)
                        },
                      },
                    },
                    { title: '\u6587\u672C', name: 'content' },
                  ],
                  onSort: ae,
                }),
                n.createElement(he, {
                  fields: [
                    {
                      label: '\u56FA\u5B9A\u53F3\u4FA7\uFF1A',
                      name: 'fixColumnActions',
                      type: 'switch',
                      valuePropName: 'checked',
                    },
                    {
                      label: '\u5BF9\u9F50\u65B9\u5F0F\uFF1A',
                      name: 'align',
                      type: 'select',
                      options: [
                        { label: '\u5DE6', value: 'left' },
                        { label: '\u4E2D', value: 'center' },
                        { label: '\u53F3', value: 'right' },
                      ],
                      props: { allowClear: !1 },
                    },
                    { label: '\u5217\u7684\u5BBD\u5EA6\uFF1A', name: 'width' },
                  ],
                }),
              ),
            ),
          )
        )
      }
      var Ye = Ve,
        Je = e(28855),
        Oe = e(89766),
        ve = e(71575),
        $e = function () {
          var D = (0, n.useState)(),
            h = t()(D, 2),
            S = h[0],
            C = h[1],
            N = (0, n.useState)([]),
            b = t()(N, 2),
            G = b[0],
            H = b[1],
            ae = (0, n.useState)(),
            J = t()(ae, 2),
            x = J[0],
            O = J[1],
            Z = (0, n.useState)(),
            u = t()(Z, 2),
            l = u[0],
            a = u[1],
            A = (0, n.useState)(!0),
            R = t()(A, 2),
            i = R[0],
            T = R[1],
            ie = (0, n.useState)([]),
            re = t()(ie, 2),
            de = re[0],
            ue = re[1],
            _e = (0, n.useState)(),
            se = t()(_e, 2),
            Ee = se[0],
            ge = se[1],
            Ce = (0, n.useState)([]),
            pe = t()(Ce, 2),
            fe = pe[0],
            Xe = pe[1],
            ze = function (X, en) {
              ue(X || []), Xe(en || [])
            },
            Ne = (0, n.useState)([]),
            Ae = t()(Ne, 2),
            Ge = Ae[0],
            He = Ae[1],
            qe = (0, n.useState)({}),
            Ie = t()(qe, 2),
            we = Ie[0],
            ke = Ie[1]
          return n.createElement(
            'div',
            { className: 'p-6 bg-gray-100' },
            n.createElement(
              r.iV,
              { localeKey: 'zh-CN' },
              n.createElement(
                Je.Z,
                { gutter: 24 },
                n.createElement(
                  Oe.Z,
                  { span: 16 },
                  n.createElement(s.QV, {
                    title: S,
                    queryFields: G,
                    queryFieldColumns: x,
                    queryFieldDefaultLines: l,
                    queryFieldRefreshAfterReset: i,
                    columnActions: Ge,
                    columnActionsConfig: we,
                    selectable: Ee,
                    columns: de,
                    dataSource: fe,
                  }),
                ),
                n.createElement(
                  Oe.Z,
                  { span: 8 },
                  n.createElement(
                    ve.Z,
                    { defaultActiveKey: '\u6807\u9898\u914D\u7F6E\u533A' },
                    n.createElement(
                      ve.Z.Panel,
                      { key: '\u6807\u9898\u914D\u7F6E\u533A', header: '\u6807\u9898\u914D\u7F6E\u533A' },
                      n.createElement(U, {
                        onTitleChange: function (X) {
                          return C(X)
                        },
                      }),
                    ),
                    n.createElement(
                      ve.Z.Panel,
                      { key: '\u67E5\u8BE2\u533A', header: '\u67E5\u8BE2\u533A' },
                      n.createElement(Qe, {
                        onQueryFieldsChange: function (X) {
                          return H(X)
                        },
                        onQueryFieldColumnsChange: function (X) {
                          return O(X)
                        },
                        onQueryFieldDefaultLinesChange: function (X) {
                          return a(X)
                        },
                        onQueryFieldRefreshAfterResetChange: function (X) {
                          return T(X)
                        },
                      }),
                    ),
                    n.createElement(
                      ve.Z.Panel,
                      {
                        key: '\u8868\u683C\u884C\u64CD\u4F5C\u914D\u7F6E\u533A',
                        header: '\u8868\u683C\u884C\u64CD\u4F5C\u914D\u7F6E\u533A',
                      },
                      n.createElement(Ye, {
                        onColumnActionsChange: function (X) {
                          return He(X)
                        },
                        onColumnActionsConfigChange: function (X) {
                          return ke(X)
                        },
                      }),
                    ),
                    n.createElement(
                      ve.Z.Panel,
                      { key: '\u8868\u683C\u5217\u914D\u7F6E\u533A', header: '\u8868\u683C\u5217\u914D\u7F6E\u533A' },
                      n.createElement(Ue, {
                        onColumnsChange: ze,
                        onSelectableChange: function (X) {
                          return ge(X)
                        },
                      }),
                    ),
                  ),
                ),
              ),
            ),
          )
        }
    },
    12146: function (Y, d, e) {
      'use strict'
      e.d(d, {
        Dg: function () {
          return z
        },
        y4: function () {
          return oe
        },
        W6: function () {
          return V
        },
        ZP: function () {
          return ne
        },
        mG: function () {
          return ee
        },
      })
      var c = e(76027),
        t = e(37706),
        n = e(57213),
        r = e.n(n),
        s = e(39334),
        E = e(77833),
        m = e(57689),
        y = e(65197),
        _ = e(97727),
        F = e(49168),
        p = e(31896),
        W = e(90014),
        U = e(7111),
        P = e(8604),
        f = e(81731),
        L = e(55533),
        Q = function (g) {
          return g
        }
      function k() {
        var v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Q,
          g = t.ZP,
          I = (0, m.useMemo)(
            function () {
              var M = (0, s.Z)(g, 'clone')
              return (0, s.Z)(v, void 0, M), M
            },
            [g, v],
          )
        return I
      }
      function z(v) {
        return function (g) {
          var I = k(g == null ? void 0 : g.onConfigRequest),
            M = (0, s.Z)(v, void 0, g),
            j = (0, s.Z)(g == null ? void 0 : g.configurable, void 0, M),
            te = (0, f.Z)((0, L.Z)(M, j != null ? j : {}, K), { handleItem: B, filterItem: K })
          ;(0, s.Z)(M == null ? void 0 : M.__setConfig, void 0, te)
          function K(o) {
            return (0, W.Z)(o) ||
              (o != null && o.$$typeof) ||
              (o != null && o.run && o !== null && o !== void 0 && o.runAsync)
              ? !1
              : (0, U.Z)(o) && !(0, m.isValidElement)(o)
          }
          function B(o, le, w) {
            var me = (0, P.Z)(M, w)
            if (me != null && me.__isDefinedApi) return me.override(o)
            if (o != null && o.__isProTableColumns) {
              var ye = (0, f.Z)((0, L.Z)(o == null ? void 0 : o.getRawConfig(), (0, P.Z)(j, w, {}), K), {
                handleItem: B,
                filterItem: K,
              })
              return (
                (o.getConfigs = function () {
                  return E.QV.defineColumns(ye).getConfigs()
                }),
                o
              )
            }
            if (o != null && o.__isProTableFields) {
              var Pe = (0, f.Z)((0, L.Z)(o == null ? void 0 : o.getRawConfig(), (0, P.Z)(j, w, {}), K), {
                handleItem: B,
                filterItem: K,
              })
              return (
                (o.getConfigs = function () {
                  return E.QV.defineFields(Pe).getConfigs()
                }),
                o
              )
            }
            return o
          }
          return (te.request = I), te
        }
      }
      var $ = m.createContext(null)
      function ee(v) {
        var g,
          I = (0, _.Z)(v),
          M = (0, m.useRef)(void 0),
          j = function () {
            return (0, s.Z)(M.current)
          },
          te = (0, m.useMemo)(function () {
            return z(function () {
              var le = (0, F.Z)()
              return (0, p.Z)(le), (0, s.Z)(I.current, void 0, { getConfig: j })
            })
          }, []),
          K = (g = (0, m.useContext)($)) !== null && g !== void 0 ? g : {},
          B = te(K)
        M.current = function () {
          return B
        }
        var o = function (w) {
          return { render: w, config: (0, s.Z)(I.current, void 0, { getConfig: j }) }
        }
        return (B.render = o), B
      }
      function V(v) {
        var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
          I = g.defaultProps,
          M = g.propsAreEqual,
          j = m.memo(
            m.forwardRef(function (te, K) {
              return m.createElement(
                $.Provider,
                { value: te },
                m.createElement(y.Z, null, function () {
                  var B,
                    o = v(te, K),
                    le = o.render,
                    w = o.content
                  return (B = w != null ? w : (0, s.Z)(le)) !== null && B !== void 0 ? B : null
                }),
              )
            }),
            M,
          )
        return (j.displayName = v.name), (j.defaultProps = r()({}, I)), j
      }
      V.useConfigurable = ee
      function oe(v) {
        var g = v.defaultProps,
          I = v.configurable,
          M = v.render,
          j = v.propsAreEqual,
          te,
          K = function () {
            return (0, s.Z)(te)
          },
          B = V(
            function (o) {
              var le =
                  I == null
                    ? void 0
                    : I(o, { createApi: t.ZP.define, defineProTableColumns: E.QV.defineColumns, getFinalConfig: K }),
                w = ee(le)
              return { content: M(r()(r()({}, o), {}, { config: w }), null) }
            },
            { defaultProps: g, propsAreEqual: j },
          )
        return B
      }
      oe.createApi = t.ZP.define
      function q(v, g) {
        return (0, c.Z)(v) ? V(v, g) : oe(v)
      }
      ;(q.createApi = t.ZP.define), (q.useConfigurable = ee)
      var ne = q
    },
    74277: function (Y, d, e) {
      'use strict'
      e.r(d),
        e.d(d, {
          ConfigProvider: function () {
            return m.iV
          },
          CopyButton: function () {
            return n.qi
          },
          EditableProField: function () {
            return n.r1
          },
          FormItem: function () {
            return n.xJ
          },
          ProConfigContext: function () {
            return m.MS
          },
          ProField: function () {
            return n.Ju
          },
          ProForm: function () {
            return n.A9
          },
          ProTable: function () {
            return t.QV
          },
          ReadonlyProField: function () {
            return n.hz
          },
          RemoteCascaderView: function () {
            return n.RC
          },
          RemoteCheckbox: function () {
            return n.os
          },
          RemoteOptionsView: function () {
            return n.md
          },
          RemoteRadio: function () {
            return n.lL
          },
          RemoteSelect: function () {
            return n.gl
          },
          RemoteTransfer: function () {
            return n.BU
          },
          RemoteTreeSelect: function () {
            return n.cQ
          },
          createBC: function () {
            return c.ZP
          },
          createConfigurable: function () {
            return c.Dg
          },
          createForm: function () {
            return n.Np
          },
          createLegacyBC: function () {
            return c.y4
          },
          createNextBC: function () {
            return c.W6
          },
          createProFormRef: function () {
            return n.yz
          },
          createProTable: function () {
            return t.KW
          },
          createProTablePlugin: function () {
            return t.jq
          },
          defineTypes: function () {
            return n.rh
          },
          formatDateValue: function () {
            return n.ij
          },
          normalizeMomentValue: function () {
            return n.I4
          },
          proTableBuiltInPlugins: function () {
            return t.HS
          },
          registerValueType: function () {
            return n.Au
          },
          setProTableDefaultProps: function () {
            return t.SW
          },
          toValidMomentValue: function () {
            return n.Zo
          },
          useConfigurable: function () {
            return c.mG
          },
          useContextSize: function () {
            return m.gz
          },
          useProContext: function () {
            return m.fH
          },
          useProFormLocales: function () {
            return n.PW
          },
          useProFormRef: function () {
            return n.a_
          },
          useProTableActionsPlugin: function () {
            return t.Ls
          },
          useProTableConfigPlugin: function () {
            return t.CA
          },
          useProTableEditFieldPlugin: function () {
            return t.zL
          },
          useProTableModalPlugin: function () {
            return t.FR
          },
          useProTableQueryFieldPlugin: function () {
            return t.Ns
          },
          useProTableRef: function () {
            return t.cz
          },
          useProTableTablePlugin: function () {
            return t.W$
          },
          useProTableValueTypePlugin: function () {
            return t.q1
          },
          useUpdateAfterValueTypeAdd: function () {
            return n.rJ
          },
          valueTypeEventBus: function () {
            return n.Ij
          },
          valueTypes: function () {
            return n.lI
          },
        })
      var c = e(12146),
        t = e(95548),
        n = e(24373),
        r = e(97285),
        s = {}
      for (var E in r)
        [
          'default',
          'createBC',
          'createConfigurable',
          'createLegacyBC',
          'createNextBC',
          'useConfigurable',
          'ProTable',
          'createProTable',
          'createProTablePlugin',
          'proTableBuiltInPlugins',
          'setProTableDefaultProps',
          'useProTableActionsPlugin',
          'useProTableConfigPlugin',
          'useProTableEditFieldPlugin',
          'useProTableModalPlugin',
          'useProTableQueryFieldPlugin',
          'useProTableRef',
          'useProTableTablePlugin',
          'useProTableValueTypePlugin',
          'CopyButton',
          'EditableProField',
          'FormItem',
          'ProField',
          'ProForm',
          'ReadonlyProField',
          'RemoteCascaderView',
          'RemoteCheckbox',
          'RemoteOptionsView',
          'RemoteRadio',
          'RemoteSelect',
          'RemoteTransfer',
          'RemoteTreeSelect',
          'createForm',
          'createProFormRef',
          'defineTypes',
          'formatDateValue',
          'normalizeMomentValue',
          'registerValueType',
          'toValidMomentValue',
          'useProFormLocales',
          'useProFormRef',
          'useUpdateAfterValueTypeAdd',
          'valueTypeEventBus',
          'valueTypes',
        ].indexOf(E) < 0 &&
          (s[E] = function (y) {
            return r[y]
          }.bind(0, E))
      e.d(d, s)
      var m = e(10792)
    },
    24373: function (Y, d, e) {
      'use strict'
      e.d(d, {
        A9: function () {
          return n.ZP
        },
        Au: function () {
          return r.Au
        },
        BU: function () {
          return r.BU
        },
        I4: function () {
          return r.I4
        },
        Ij: function () {
          return r.Ij
        },
        Ju: function () {
          return c.ZP
        },
        Np: function () {
          return s.Z
        },
        PW: function () {
          return E.Z
        },
        RC: function () {
          return r.RC
        },
        Zo: function () {
          return r.Zo
        },
        a_: function () {
          return n.a_
        },
        cQ: function () {
          return r.cQ
        },
        gl: function () {
          return r.gl
        },
        hz: function () {
          return c.hz
        },
        ij: function () {
          return r.ij
        },
        lI: function () {
          return r.ZP
        },
        lL: function () {
          return r.lL
        },
        md: function () {
          return r.md
        },
        os: function () {
          return r.os
        },
        qi: function () {
          return c.qi
        },
        r1: function () {
          return c.r1
        },
        rJ: function () {
          return r.rJ
        },
        rh: function () {
          return r.rh
        },
        xJ: function () {
          return t.Z
        },
        yz: function () {
          return n.yz
        },
      })
      var c = e(64313),
        t = e(82786),
        n = e(92737),
        r = e(38498),
        s = e(99069),
        E = e(38528)
    },
    95548: function (Y, d, e) {
      'use strict'
      e.d(d, {
        CA: function () {
          return E.ZP
        },
        FR: function () {
          return m.Z
        },
        HS: function () {
          return F.Y4
        },
        KW: function () {
          return F.KW
        },
        Ls: function () {
          return s.Z
        },
        Ns: function () {
          return t.Z
        },
        QV: function () {
          return F.QV
        },
        SW: function () {
          return _.hf
        },
        W$: function () {
          return n.ZP
        },
        cz: function () {
          return F.cz
        },
        jq: function () {
          return y.rx
        },
        q1: function () {
          return r.ZP
        },
        zL: function () {
          return c.Z
        },
      })
      var c = e(8375),
        t = e(60703),
        n = e(68587),
        r = e(33102),
        s = e(89729),
        E = e(27450),
        m = e(10927),
        y = e(8398),
        _ = e(98883),
        F = e(77833),
        p = null
    },
    74229: function (Y) {
      Y.exports = `import React from 'react'
import { ConfigProvider, ProTable } from '@fexd/pro-components'
import { delay } from '@fexd/tools'
import { UploadOutlined } from '@ant-design/icons'
import { getMockData } from './data'

const mockData = Array(260).fill('').map(getMockData)

export default () => {
  return (
    <ConfigProvider localeKey="zh-CN">
      <ProTable
        title="\u8868\u683C\u6807\u9898"
        bordered
        iconActions={['refresh', 'table-size', 'fullscreen']}
        actions={['add', { content: '\u5BFC\u51FA', icon: <UploadOutlined /> }]}
        columnActions={['view', 'edit', 'delete']}
        batchActions={['delete', { content: '\u5BFC\u51FA\u9009\u4E2D\u6570\u636E', icon: <UploadOutlined /> }]}
        selectable
        onQuery={async (params, extraParams) => {
          const { page, pageSize } = params
          await delay(1000)

          const data = mockData.slice((page - 1) * pageSize, page * pageSize)

          return {
            success: true,
            data,
            total: mockData?.length,
          }
        }}
        queryFields={[
          { label: '\u6587\u672C\u6846', name: 'text', type: 'text' },
          { label: '\u9009\u62E9\u6846', name: 'select', type: 'select', options: ['\u9009\u9879 1', '\u9009\u9879 2'] },
          { label: '\u65E5\u671F', name: 'date', type: 'date' },
          { label: '\u65E5\u671F\u8303\u56F4', name: 'dateRange', type: 'dateRange' },
          { label: '\u4EF7\u683C', name: 'money', type: 'money', unit: '\uFFE5' },
          { label: '\u591A\u9009\u6846', name: 'multipleSelect', type: 'multipleSelect', options: ['\u9009\u9879 1', '\u9009\u9879 2'] },
          { label: '\u65F6\u95F4', name: 'time', type: 'time' },
          { label: '\u65F6\u95F4\u8303\u56F4', name: 'timeRange', type: 'timeRange' },
        ]}
        columns={[
          { title: '\u540D\u79F0', dataIndex: 'name', editField: true },
          { title: '\u6570\u5B57', dataIndex: 'number', valueType: 'number', editField: true },
          {
            title: '\u767E\u5206\u6BD4',
            dataIndex: 'percent',
            valueType: 'percent',
            editField: true,
            numberLocale: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
          },
          { title: '\u91D1\u989D', dataIndex: 'price', valueType: 'money', unit: '\uFFE5', editField: true },
          { title: '\u65E5\u671F', dataIndex: 'dayjs1_timestamp', valueType: 'date', editField: true },
          { title: '\u8DDD\u4ECA', dataIndex: 'dayjs1_timestamp', valueType: 'fromNow' },
        ]}
        defaultPageSize={5}
      />
    </ConfigProvider>
  )
}
`
    },
    22985: function (Y) {
      Y.exports = `import { Random } from 'mockjs'
import dayjs from 'dayjs'

export const getMockData = () => {
  const dayjsNow = dayjs()
  const dayjs1 = dayjs(Random.date('yyyy-MM-dd HH:mm:ss'))
  const dayjs2 = dayjs(Random.date('yyyy-MM-dd HH:mm:ss'))
  const dayjs3 = dayjs(Random.date('yyyy-MM-dd HH:mm:ss'))

  const getDate = (dayjs, name) => ({
    [name]: dayjs,
    [\`\${name}_timestamp\`]: dayjs.valueOf(),
    [\`\${name}_YYYYMMDD\`]: dayjs.format('YYYYMMDD'),
    [\`\${name}_YYYY-MM-DD\`]: dayjs.format('YYYY-MM-DD'),
  })

  return {
    id: Random.id(),
    name: Random.name(),
    number: Random.float(0, 100000, 0, 3),
    digit: Random.float(0, 100000, 0, 3),
    percent: Random.float(0, 1.5, 0, 5),
    length: Random.float(0, 100000, 0, 3),
    weight: Random.float(0, 100000, 0, 3),
    price: Random.float(0, 100000, 0, 3),
    money: Random.float(0, 100000, 0, 3),
    paragraph: Random.paragraph(),
    cparagraph: Random.cparagraph(),
    sentence: Random.sentence(),
    csentence: Random.csentence(),
    title: Random.title(),
    ctitle: Random.ctitle(),
    ...getDate(dayjsNow, 'dayjsNow'),
    ...getDate(dayjs1, 'dayjs1'),
    ...getDate(dayjs2, 'dayjs2'),
    ...getDate(dayjs3, 'dayjs3'),
  }
}
`
    },
  },
])
