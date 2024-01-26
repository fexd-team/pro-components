'use strict'
;(self.webpackChunk = self.webpackChunk || []).push([
  [5096],
  {
    55676: function (Ne, G, e) {
      e.r(G),
        e.d(G, {
          default: function () {
            return Ze
          },
        })
      var t = e(57689),
        ee = e(94161),
        n = e(87343),
        h = e(3341),
        T = e.n(h),
        $ = e(12342),
        X = e.n($),
        te = e(76565),
        p = e(97210),
        Y = e(57213),
        D = e.n(Y),
        B = e(43084),
        A = e(54208),
        ne = e(91234),
        ae = e(47315),
        F = ['children', 'token', 'ssrInline', 'cache'],
        S = function (l) {
          var i = l.children,
            a = l.token,
            j = l.ssrInline,
            R = l.cache,
            f = X()(l, F),
            N = (0, B.f)(function (y) {
              return y.themeMode
            }),
            ie = (0, t.useCallback)(
              function (y) {
                var V = (0, A.a)(y)
                return a ? D()(D()({}, V), a) : V
              },
              [a],
            )
          return t.createElement(
            p.V9,
            { speedy: !0, prefix: 'site', cache: R, ssrInline: j },
            t.createElement(
              p.f6,
              {
                prefixCls: 'site',
                themeMode: N,
                theme: ne.m,
                customStylish: ae.R,
                customToken: function () {
                  return D()(D()({}, ie.apply(void 0, arguments)), f)
                },
              },
              i,
            ),
          )
        },
        Z = ['children'],
        I = function (r) {
          var l = r.children,
            i = X()(r, Z)
          return t.createElement(
            p.V9,
            { speedy: !0, prefix: 'site' },
            t.createElement(S, i, t.createElement(te.Z, null, l)),
          )
        },
        c = e(17852),
        Q = e(69470),
        E = e(38736),
        J = e(75158),
        O = e(22725),
        g = e(6298),
        M = e(39649),
        le = e(53983),
        he = e(12655),
        Ee = e(69582),
        De = e(27756),
        ge = e(97805),
        ce = e(74491),
        ye = e(54306),
        z = e.n(ye),
        m = e(47398),
        s = e(80697),
        o = e(74702),
        x = e(71575),
        d = e(56938),
        v = e(87869),
        b = e(78972),
        me = (0, t.memo)(function (r) {
          var l = r.items,
            i = r.activeKey,
            a = r.onChange,
            j = (0, v.Z)('', { value: i, onChange: a }),
            R = z()(j, 2),
            f = R[0],
            N = R[1],
            ie = (0, b.y)(),
            y = ie.styles,
            V = (0, O.F)(),
            Ce = V.mobile,
            _ = (0, n.TH)(),
            H = l.find(function (P) {
              return P.id === f
            }),
            se = (0, t.useMemo)(
              function () {
                return l.map(function (P) {
                  var K
                  return {
                    href: '#'.concat(_.pathname, '#').concat(P.id),
                    title: P.title,
                    key: P.id,
                    children:
                      (K = P.children) === null || K === void 0
                        ? void 0
                        : K.map(function (U) {
                            return {
                              href: '#'.concat(_.pathname, '#').concat(U.id),
                              title: U == null ? void 0 : U.title,
                              key: U.id,
                            }
                          }),
                  }
                })
              },
              [l],
            )
          return (
            ((l == null ? void 0 : l.length) === 0
              ? null
              : Ce
                ? t.createElement(
                    o.ZP,
                    { theme: { token: { fontSize: 12, sizeStep: 3 } } },
                    t.createElement(
                      'div',
                      { className: y.mobileCtn },
                      t.createElement(
                        x.Z,
                        {
                          bordered: !1,
                          ghost: !0,
                          expandIconPosition: 'end',
                          expandIcon: function (K) {
                            var U = K.isActive
                            return U ? t.createElement(m.Z, null) : t.createElement(s.Z, null)
                          },
                          className: y.expand,
                        },
                        t.createElement(
                          x.Z.Panel,
                          { forceRender: !0, key: 'toc', header: H ? H.title : '\u76EE\u5F55' },
                          t.createElement(
                            o.ZP,
                            { theme: { token: { fontSize: 14, sizeStep: 4 } } },
                            t.createElement(d.Z, {
                              onChange: function (K) {
                                N(K.replace('#', ''))
                              },
                              items: se,
                            }),
                          ),
                        ),
                      ),
                    ),
                  )
                : t.createElement(
                    'div',
                    { className: y.container },
                    t.createElement('h4', null, '\u5185\u5BB9\u7AE0\u8282'),
                    t.createElement(d.Z, { items: se }),
                  )) || null
          )
        }),
        pe = me,
        ue = (0, t.memo)(function () {
          var l = (0, c.H)(ce.TL, T())
          return t.createElement(pe, { items: l })
        }),
        Se = ue,
        xe = e(83573),
        W = e(36441),
        He = e(92935),
        L = e.n(He),
        k,
        w,
        de,
        ve = (0, p.kc)(function (r) {
          var l = r.css,
            i = r.responsive,
            a = r.token
          return {
            layout: l(
              k ||
                (k = L()([
                  `
    background-color: `,
                  `;
    background-image: linear-gradient(180deg, `,
                  ` 0%, rgba(255, 255, 255, 0) 10%);
    display: grid;
    grid-template-columns: `,
                  'px 1fr ',
                  `px;
    grid-template-rows: `,
                  `px auto 1fr auto;
    // grid-template-areas:
    //   'head head head'
    //   'sidebar title .'
    //   'sidebar main toc'
    //   'sidebar footer footer';
    min-height: 100vh;

    `,
                  ` {
      display: flex;
      flex-direction: column;
    }
  `,
                ])),
              a.colorBgLayout,
              a.colorBgContainer,
              a.sidebarWidth,
              a.tocWidth + 24,
              a.headerHeight,
              i.mobile,
            ),
            toc: l(
              w ||
                (w = L()([
                  `
    position: sticky;
    top: 100px;
    width: `,
                  `px;
    margin-inline-end: 24px;
    max-height: 80vh;
    overflow: auto;
    margin-top: 48px;

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
              a.tocWidth,
              i.mobile,
              a.headerHeight + 1,
              a.colorTextDescription,
            ),
            content: l(
              de ||
                (de = L()([
                  `
    max-width: `,
                  '',
                  `;
    width: 100%;
    margin: 0 24px;


    `,
                  ` {
      margin: 0;
    }
  }
  `,
                ])),
              a.contentMaxWidth,
              typeof a.contentMaxWidth == 'number' ? 'px' : '',
              i.mobile,
            ),
          }
        }),
        fe = (0, t.memo)(function () {
          var r = (0, n.pC)(),
            l = (0, O.F)(),
            i = l.mobile,
            a = (0, c.H)(function (_) {
              return _.routeMeta.frontmatter
            }, T()),
            j = (0, c.H)(W.Yo),
            R = (0, c.H)(ce.TG),
            f = (0, c.H)(W.UQ),
            N = t.useRef(),
            ie = (0, n.TH)(),
            y = ve(a),
            V = y.styles,
            Ce = y.theme
          return (
            (0, le.Z)(
              'mouseenter',
              function (_) {
                var H = _.target
                if (
                  H.nodeName === 'A' &&
                  H.hasAttribute('aria-hidden') &&
                  !H.hasAttribute('data-raw-href') &&
                  /^#/.test(H.getAttribute('href'))
                ) {
                  var se = H.getAttribute('href')
                  H.setAttribute('href', '#'.concat(ie.pathname).concat(se)), H.setAttribute('data-raw-href', se)
                }
              },
              { target: N, capture: !0 },
            ),
            t.createElement(
              'div',
              {
                className: V.layout,
                ref: N,
                style: {
                  gridTemplateAreas: `
      'head head head'
      '`
                    .concat(
                      a.sidebar === !1 ? 'title' : 'sidebar',
                      ` title .'
      '`,
                    )
                    .concat(a.sidebar === !1 ? 'main' : 'sidebar', ' main ')
                    .concat(
                      a.toc === !1 ? 'main' : 'toc',
                      `'
      '`,
                    )
                    .concat(a.sidebar === !1 ? 'footer' : 'sidebar', " footer footer'"),
                },
              },
              t.createElement(n.ql, null, a.title && t.createElement('title', null, a.title, ' - ', R)),
              t.createElement(De.Z, null),
              (a == null ? void 0 : a.toc) !== !1 && t.createElement(Se, null),
              (a == null ? void 0 : a.sidebar) === !1 || i ? null : t.createElement(ge.Z, null),
              j
                ? t.createElement(
                    g.D,
                    { style: { gridArea: 'title', paddingBlock: i ? 24 : void 0 } },
                    t.createElement(
                      M.Z,
                      null,
                      t.createElement(
                        g.D,
                        { style: { maxWidth: Ce.contentMaxWidth, width: '100%' } },
                        t.createElement(
                          g.D,
                          { style: { paddingBlock: 0, paddingInline: i ? 16 : 48 } },
                          t.createElement(xe.$, f),
                        ),
                      ),
                    ),
                  )
                : null,
              t.createElement(
                g.D,
                {
                  style: {
                    zIndex: 10,
                    gridArea: 'main / main / main / main',
                    margin: i ? 0 : 24,
                    marginBottom: i ? 0 : 48,
                  },
                },
                t.createElement(
                  M.Z,
                  { width: '100%' },
                  t.createElement(
                    g.D,
                    { className: V.content },
                    t.createElement(g.D, { horizontal: !0 }, t.createElement(he.Z, null, r)),
                  ),
                ),
              ),
              t.createElement(Ee.Z, null),
            )
          )
        }),
        q = fe,
        u = e(18490),
        re = e(84529),
        C = e(75912),
        oe = e(12053),
        Be = e(55509),
        Ae = e(57673),
        Ie = e(81751),
        Te = (0, t.memo)(function () {
          var r = (0, n.YB)(),
            l = (0, n.TH)(),
            i = l.hash,
            a = (0, c.H)(function (f) {
              return f.routeMeta.frontmatter
            }, T()),
            j = (0, c.H)(Q.D$),
            R = (0, c.H)(function (f) {
              return f.siteData.loading
            })
          return (
            (0, t.useEffect)(
              function () {
                var f = i.replace('#', '')
                f &&
                  setTimeout(function () {
                    var N = document.getElementById(decodeURIComponent(f))
                    N && (0, ee.Z)(N.offsetTop - 80, { maxDuration: 300 })
                  }, 1)
              },
              [R, i],
            ),
            t.createElement(
              t.Fragment,
              null,
              t.createElement(
                n.ql,
                null,
                t.createElement('html', { lang: r.locale.replace(/-.+$/, '') }),
                a.title && t.createElement('meta', { property: 'og:title', content: a.title }),
                a.description && t.createElement('meta', { name: 'description', content: a.description }),
                a.description && t.createElement('meta', { property: 'og:description', content: a.description }),
                a.keywords && t.createElement('meta', { name: 'keywords', content: a.keywords.join(',') }),
                a.keywords && t.createElement('meta', { property: 'og:keywords', content: a.keywords.join(',') }),
              ),
              j ? t.createElement(J.Z, null) : t.createElement(q, null),
            )
          )
        }),
        Ze = function () {
          var r = (0, c.H)(function (l) {
            return l.routeMeta.frontmatter
          }, T())
          return t.createElement(
            t.StrictMode,
            null,
            t.createElement(I, r, t.createElement(u.A, null), t.createElement(E.Z, null), t.createElement(Te, null)),
          )
        }
    },
    27756: function (Ne, G, e) {
      e.d(G, {
        Z: function () {
          return ye
        },
      })
      var t = e(60799),
        ee = e.n(t),
        n = e(57689),
        h = e(6298),
        T = e(94244),
        $ = e(94839),
        X = e(2622),
        te = e(54306),
        p = e.n(te),
        Y = e(60292),
        D = e(87343),
        B = e(29085),
        A = e(47553),
        ne = e(50957),
        ae = e(87643),
        F,
        S = /(mac|iphone|ipod|ipad)/i.test(
          typeof navigator != 'undefined' ? ((F = navigator) === null || F === void 0 ? void 0 : F.platform) : '',
        ),
        Z = function (m) {
          return ['TEXTAREA', 'INPUT'].includes(m.tagName) || m.contentEditable === 'true'
        },
        I = function () {
          var m = (0, ae.y)(),
            s = m.styles,
            o = (0, n.useState)(!1),
            x = p()(o, 2),
            d = x[0],
            v = x[1],
            b = (0, n.useRef)(null),
            me = (0, n.useRef)(null),
            pe = (0, n.useState)('\u2318'),
            ue = p()(pe, 2),
            Se = ue[0],
            xe = ue[1],
            W = (0, D.OO)(),
            He = W.keywords,
            L = W.setKeywords,
            k = W.result,
            w = W.loading,
            de = (0, n.useState)(!1),
            ve = p()(de, 2),
            fe = ve[0],
            q = ve[1]
          return (
            (0, n.useEffect)(function () {
              S || xe('Ctrl')
              var u = function (C) {
                if (
                  (((S ? C.metaKey : C.ctrlKey) && C.key === 'k') || (C.key === '/' && !Z(C.target))) &&
                  (C.preventDefault(), b.current)
                ) {
                  var oe = b.current.getBoundingClientRect(),
                    Be = oe.top,
                    Ae = oe.bottom,
                    Ie = oe.left,
                    Te = oe.right,
                    Ze = Be >= 0 && Ie >= 0 && Ae <= window.innerHeight && Te <= window.innerWidth
                  Ze
                    ? b.current.focus()
                    : (L(''),
                      q(!0),
                      setTimeout(function () {
                        var r
                        ;(r = me.current) === null || r === void 0 || r.focus()
                      }))
                }
                C.key === 'Escape' && (C.preventDefault(), q(!1))
              }
              return (
                document.addEventListener('keydown', u),
                function () {
                  return document.removeEventListener('keydown', u)
                }
              )
            }, []),
            n.createElement(
              'div',
              { className: s.container },
              n.createElement(Y.Z, { className: s.svg }),
              n.createElement(A.I, {
                onFocus: function () {
                  return v(!0)
                },
                onBlur: function () {
                  setTimeout(function () {
                    v(!1)
                  }, 1)
                },
                onChange: function (re) {
                  return L(re)
                },
                ref: b,
                className: s.input,
              }),
              n.createElement('span', { className: s.shortcut }, Se, ' K'),
              He.trim() &&
                d &&
                (k.length || !w) &&
                !fe &&
                n.createElement(
                  'div',
                  { className: s.popover },
                  n.createElement('section', null, n.createElement(B.Z, { data: k, loading: w })),
                ),
              n.createElement(
                ne.z,
                {
                  visible: fe,
                  onMaskClick: function () {
                    q(!1)
                  },
                  onClose: function () {
                    return L('')
                  },
                },
                n.createElement(
                  'div',
                  { style: { position: 'relative' } },
                  n.createElement(Y.Z, { className: s.svg }),
                  n.createElement(A.I, {
                    className: s.input,
                    onFocus: function () {
                      return v(!0)
                    },
                    onBlur: function () {
                      setTimeout(function () {
                        v(!1)
                      }, 1)
                    },
                    onChange: function (re) {
                      return L(re)
                    },
                    ref: me,
                  }),
                ),
                n.createElement(B.Z, {
                  data: k,
                  loading: w,
                  onItemSelect: function () {
                    q(!1)
                  },
                }),
              ),
            )
          )
        },
        c = I,
        Q = e(16181),
        E = e(64820),
        J = e(71331),
        O = e(22725),
        g = e(17852),
        M = e(39761),
        le = e(25191),
        he = e(20476),
        Ee = function () {
          var m,
            s,
            o = (0, g.H)(function (d) {
              var v
              return (v = d.siteData.themeConfig) === null || v === void 0 ? void 0 : v.npm
            }),
            x = (m = o == null ? void 0 : o.url) !== null && m !== void 0 ? m : o
          return x
            ? n.createElement(
                le.Z,
                { arrow: !1, title: (s = o == null ? void 0 : o.tooltip) !== null && s !== void 0 ? s : 'Npm' },
                n.createElement(
                  'a',
                  { href: x, target: '_blank', rel: 'noreferrer' },
                  n.createElement(he.ZP, { icon: n.createElement(ge, null) }),
                ),
              )
            : null
        },
        De = function () {
          var m = useSiteStore(function (s) {
            var o
            return (o = s.siteData.themeConfig) === null || o === void 0 ? void 0 : o.gitlab
          })
          return m
            ? React.createElement(
                Tooltip,
                { arrow: !1, title: 'Gitlab' },
                React.createElement(
                  'a',
                  { href: m, target: '_blank', rel: 'noreferrer' },
                  React.createElement(Button, { icon: React.createElement(GitlabOutlined, null) }),
                ),
              )
            : null
        }
      function ge(z) {
        return n.createElement(
          'span',
          { className: 'anticon' },
          n.createElement(
            'svg',
            ee()({ xmlns: 'http://www.w3.org/2000/svg', width: '1em', height: '1em', viewBox: '0 0 24 24' }, z),
            n.createElement('path', { d: 'M3 3v18h18V3H3m3 3h12v12h-3V9h-3v9H6V6z', fill: 'currentColor' }),
          ),
        )
      }
      var ce = function () {
          var m = (0, g.H)(function (v) {
              return !!v.routeMeta.frontmatter
            }),
            s = (0, O.F)(),
            o = s.mobile,
            x = (0, M.X)(),
            d = x.styles
          return m
            ? n.createElement(
                'div',
                { className: d.header },
                n.createElement(
                  h.D,
                  {
                    horizontal: !0,
                    distribution: 'space-between',
                    align: 'center',
                    width: 'auto',
                    className: d.content,
                  },
                  o
                    ? n.createElement(
                        n.Fragment,
                        null,
                        n.createElement(h.D, null, n.createElement(Q.Z, null)),
                        n.createElement(h.D, { horizontal: !0, className: d.left }, n.createElement($.Z, null)),
                        n.createElement(h.D, null, n.createElement(J.Z, null)),
                      )
                    : n.createElement(
                        n.Fragment,
                        null,
                        n.createElement(h.D, { horizontal: !0, className: d.left }, n.createElement($.Z, null)),
                        n.createElement(
                          h.D,
                          { style: { marginLeft: 48, alignSelf: 'end' } },
                          n.createElement(X.Z, null),
                        ),
                        n.createElement(
                          'section',
                          { className: d.right },
                          n.createElement('div', null),
                          n.createElement(
                            h.D,
                            { gap: 16, horizontal: !0, align: 'center', className: 'dumi-default-header-right-aside' },
                            n.createElement(c, null),
                            n.createElement(T.Z, null),
                            n.createElement(E.Z, null),
                            n.createElement(Ee, null),
                            n.createElement(J.Z, null),
                          ),
                        ),
                      ),
                ),
              )
            : null
        },
        ye = (0, n.memo)(ce)
    },
    94847: function (Ne, G, e) {
      e.d(G, {
        Z: function () {
          return ae
        },
      })
      var t = e(57689),
        ee = e(74702),
        n = e(20476),
        h = e(87343),
        T = e(6298),
        $ = e(39649),
        X = e(6953),
        te = e(60276),
        p = e(4611),
        Y = function (S) {
          var Z = S.title,
            I = S.description,
            c = S.actions,
            Q = (0, p.y)(),
            E = Q.styles,
            J = Q.cx
          return t.createElement(
            t.Fragment,
            null,
            t.createElement(
              T.D,
              { horizontal: !0, distribution: 'center', className: E.container },
              t.createElement('div', { className: E.canvas }),
              t.createElement(
                $.Z,
                null,
                Z &&
                  t.createElement(
                    'div',
                    { className: E.titleContainer },
                    t.createElement('h1', {
                      className: (0, X.Z)(E.title, 'font-bold'),
                      dangerouslySetInnerHTML: { __html: Z },
                    }),
                    t.createElement('div', { className: J(E.titleShadow), dangerouslySetInnerHTML: { __html: Z } }),
                  ),
                I && t.createElement('p', { className: E.desc, dangerouslySetInnerHTML: { __html: I } }),
                Boolean(c == null ? void 0 : c.length) &&
                  t.createElement(
                    ee.ZP,
                    { theme: { token: { fontSize: 16, controlHeight: 40 } } },
                    t.createElement(
                      T.D,
                      { horizontal: !0, gap: 24, className: E.actions },
                      c.map(function (O, g) {
                        var M = O.text,
                          le = O.link
                        return t.createElement(
                          h.rU,
                          { key: M, to: le },
                          g === 0
                            ? t.createElement(te.Z, null, M)
                            : t.createElement(n.ZP, { size: 'large', shape: 'round', type: 'default' }, M),
                        )
                      }),
                    ),
                  ),
              ),
            ),
          )
        },
        D = Y,
        B = e(17852),
        A = e(69470),
        ne = function () {
          var S = (0, B.H)(A.aH),
            Z = (0, B.H)(A.S2),
            I = (0, B.H)(A.Vd)
          return t.createElement(D, { title: S, actions: I, description: Z })
        },
        ae = ne
    },
    81751: function () {},
    84529: function () {},
    75912: function () {},
    12053: function () {},
    55509: function () {},
    57673: function () {},
  },
])
