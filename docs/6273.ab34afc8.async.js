'use strict'
var he = Object.defineProperty,
  be = Object.defineProperties
var me = Object.getOwnPropertyDescriptors
var ne = Object.getOwnPropertySymbols
var _e = Object.prototype.hasOwnProperty,
  we = Object.prototype.propertyIsEnumerable
var V = (S, m, b) => (m in S ? he(S, m, { enumerable: !0, configurable: !0, writable: !0, value: b }) : (S[m] = b)),
  ae = (S, m) => {
    for (var b in m || (m = {})) _e.call(m, b) && V(S, b, m[b])
    if (ne) for (var b of ne(m)) we.call(m, b) && V(S, b, m[b])
    return S
  },
  oe = (S, m) => be(S, me(m))
var v = (S, m, b) => (V(S, typeof m != 'symbol' ? m + '' : m, b), b)
var w = (S, m, b) =>
  new Promise((K, L) => {
    var I = (A) => {
        try {
          F(b.next(A))
        } catch (T) {
          L(T)
        }
      },
      R = (A) => {
        try {
          F(b.throw(A))
        } catch (T) {
          L(T)
        }
      },
      F = (A) => (A.done ? K(A.value) : Promise.resolve(A.value).then(I, R))
    F((b = b.apply(S, m)).next())
  })
;(self.webpackChunk = self.webpackChunk || []).push([
  [6273],
  {
    76273: function (S, m, b) {
      b.r(m),
        b.d(m, {
          Adapter: function () {
            return k
          },
          CodeActionAdaptor: function () {
            return ee
          },
          DefinitionAdapter: function () {
            return Q
          },
          DiagnosticsAdapter: function () {
            return $
          },
          FormatAdapter: function () {
            return Z
          },
          FormatHelper: function () {
            return D
          },
          FormatOnTypeAdapter: function () {
            return q
          },
          InlayHintsAdapter: function () {
            return re
          },
          Kind: function () {
            return c
          },
          LibFiles: function () {
            return U
          },
          OccurrencesAdapter: function () {
            return G
          },
          OutlineAdapter: function () {
            return Y
          },
          QuickInfoAdapter: function () {
            return J
          },
          ReferenceAdapter: function () {
            return X
          },
          RenameAdapter: function () {
            return te
          },
          SignatureHelpAdapter: function () {
            return E
          },
          SuggestAdapter: function () {
            return O
          },
          WorkerManager: function () {
            return B
          },
          flattenDiagnosticMessageText: function () {
            return N
          },
          getJavaScriptWorker: function () {
            return ge
          },
          getTypeScriptWorker: function () {
            return de
          },
          setupJavaScript: function () {
            return le
          },
          setupTypeScript: function () {
            return ce
          },
        })
      var K = b(97e3),
        L = b(60877)
      var I = Object.defineProperty,
        R = Object.getOwnPropertyDescriptor,
        F = Object.getOwnPropertyNames,
        A = Object.prototype.hasOwnProperty,
        T = (e, t, s) => (t in e ? I(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (e[t] = s)),
        j = (e, t, s, i) => {
          if ((t && typeof t == 'object') || typeof t == 'function')
            for (let u of F(t))
              !A.call(e, u) && u !== s && I(e, u, { get: () => t[u], enumerable: !(i = R(t, u)) || i.enumerable })
          return e
        },
        ue = (e, t, s) => (j(e, t, 'default'), s && j(s, t, 'default')),
        h = (e, t, s) => (T(e, typeof t != 'symbol' ? t + '' : t, s), s),
        n = {}
      ue(n, K)
      var B = class {
          constructor(e, t) {
            v(this, '_configChangeListener')
            v(this, '_updateExtraLibsToken')
            v(this, '_extraLibsChangeListener')
            v(this, '_worker')
            v(this, '_client')
            ;(this._modeId = e),
              (this._defaults = t),
              (this._worker = null),
              (this._client = null),
              (this._configChangeListener = this._defaults.onDidChange(() => this._stopWorker())),
              (this._updateExtraLibsToken = 0),
              (this._extraLibsChangeListener = this._defaults.onDidExtraLibsChange(() => this._updateExtraLibs()))
          }
          dispose() {
            this._configChangeListener.dispose(), this._extraLibsChangeListener.dispose(), this._stopWorker()
          }
          _stopWorker() {
            this._worker && (this._worker.dispose(), (this._worker = null)), (this._client = null)
          }
          _updateExtraLibs() {
            return w(this, null, function* () {
              if (!this._worker) return
              const e = ++this._updateExtraLibsToken,
                t = yield this._worker.getProxy()
              this._updateExtraLibsToken === e && t.updateExtraLibs(this._defaults.getExtraLibs())
            })
          }
          _getClient() {
            return (
              this._client ||
                (this._client = (() =>
                  w(this, null, function* () {
                    return (
                      (this._worker = n.editor.createWebWorker({
                        moduleId: 'vs/language/typescript/tsWorker',
                        label: this._modeId,
                        keepIdleModels: !0,
                        createData: {
                          compilerOptions: this._defaults.getCompilerOptions(),
                          extraLibs: this._defaults.getExtraLibs(),
                          customWorkerPath: this._defaults.workerOptions.customWorkerPath,
                          inlayHintsOptions: this._defaults.inlayHintsOptions,
                        },
                      })),
                      this._defaults.getEagerModelSync()
                        ? yield this._worker.withSyncedResources(
                            n.editor
                              .getModels()
                              .filter((e) => e.getLanguageId() === this._modeId)
                              .map((e) => e.uri),
                          )
                        : yield this._worker.getProxy()
                    )
                  }))()),
              this._client
            )
          }
          getLanguageServiceWorker(...e) {
            return w(this, null, function* () {
              const t = yield this._getClient()
              return this._worker && (yield this._worker.withSyncedResources(e)), t
            })
          }
        },
        o = {}
      ;(o['lib.d.ts'] = !0),
        (o['lib.dom.d.ts'] = !0),
        (o['lib.dom.iterable.d.ts'] = !0),
        (o['lib.es2015.collection.d.ts'] = !0),
        (o['lib.es2015.core.d.ts'] = !0),
        (o['lib.es2015.d.ts'] = !0),
        (o['lib.es2015.generator.d.ts'] = !0),
        (o['lib.es2015.iterable.d.ts'] = !0),
        (o['lib.es2015.promise.d.ts'] = !0),
        (o['lib.es2015.proxy.d.ts'] = !0),
        (o['lib.es2015.reflect.d.ts'] = !0),
        (o['lib.es2015.symbol.d.ts'] = !0),
        (o['lib.es2015.symbol.wellknown.d.ts'] = !0),
        (o['lib.es2016.array.include.d.ts'] = !0),
        (o['lib.es2016.d.ts'] = !0),
        (o['lib.es2016.full.d.ts'] = !0),
        (o['lib.es2017.d.ts'] = !0),
        (o['lib.es2017.full.d.ts'] = !0),
        (o['lib.es2017.intl.d.ts'] = !0),
        (o['lib.es2017.object.d.ts'] = !0),
        (o['lib.es2017.sharedmemory.d.ts'] = !0),
        (o['lib.es2017.string.d.ts'] = !0),
        (o['lib.es2017.typedarrays.d.ts'] = !0),
        (o['lib.es2018.asyncgenerator.d.ts'] = !0),
        (o['lib.es2018.asynciterable.d.ts'] = !0),
        (o['lib.es2018.d.ts'] = !0),
        (o['lib.es2018.full.d.ts'] = !0),
        (o['lib.es2018.intl.d.ts'] = !0),
        (o['lib.es2018.promise.d.ts'] = !0),
        (o['lib.es2018.regexp.d.ts'] = !0),
        (o['lib.es2019.array.d.ts'] = !0),
        (o['lib.es2019.d.ts'] = !0),
        (o['lib.es2019.full.d.ts'] = !0),
        (o['lib.es2019.object.d.ts'] = !0),
        (o['lib.es2019.string.d.ts'] = !0),
        (o['lib.es2019.symbol.d.ts'] = !0),
        (o['lib.es2020.bigint.d.ts'] = !0),
        (o['lib.es2020.d.ts'] = !0),
        (o['lib.es2020.full.d.ts'] = !0),
        (o['lib.es2020.intl.d.ts'] = !0),
        (o['lib.es2020.promise.d.ts'] = !0),
        (o['lib.es2020.sharedmemory.d.ts'] = !0),
        (o['lib.es2020.string.d.ts'] = !0),
        (o['lib.es2020.symbol.wellknown.d.ts'] = !0),
        (o['lib.es2021.d.ts'] = !0),
        (o['lib.es2021.full.d.ts'] = !0),
        (o['lib.es2021.intl.d.ts'] = !0),
        (o['lib.es2021.promise.d.ts'] = !0),
        (o['lib.es2021.string.d.ts'] = !0),
        (o['lib.es2021.weakref.d.ts'] = !0),
        (o['lib.es5.d.ts'] = !0),
        (o['lib.es6.d.ts'] = !0),
        (o['lib.esnext.d.ts'] = !0),
        (o['lib.esnext.full.d.ts'] = !0),
        (o['lib.esnext.intl.d.ts'] = !0),
        (o['lib.esnext.promise.d.ts'] = !0),
        (o['lib.esnext.string.d.ts'] = !0),
        (o['lib.esnext.weakref.d.ts'] = !0),
        (o['lib.scripthost.d.ts'] = !0),
        (o['lib.webworker.d.ts'] = !0),
        (o['lib.webworker.importscripts.d.ts'] = !0),
        (o['lib.webworker.iterable.d.ts'] = !0)
      function N(e, t, s = 0) {
        if (typeof e == 'string') return e
        if (e === void 0) return ''
        let i = ''
        if (s) {
          i += t
          for (let u = 0; u < s; u++) i += '  '
        }
        if (((i += e.messageText), s++, e.next)) for (const u of e.next) i += N(u, t, s)
        return i
      }
      function x(e) {
        return e ? e.map((t) => t.text).join('') : ''
      }
      var k = class {
          constructor(e) {
            this._worker = e
          }
          _textSpanToRange(e, t) {
            let s = e.getPositionAt(t.start),
              i = e.getPositionAt(t.start + t.length),
              { lineNumber: u, column: a } = s,
              { lineNumber: l, column: g } = i
            return { startLineNumber: u, startColumn: a, endLineNumber: l, endColumn: g }
          }
        },
        U = class {
          constructor(e) {
            v(this, '_libFiles')
            v(this, '_hasFetchedLibFiles')
            v(this, '_fetchLibFilesPromise')
            ;(this._worker = e),
              (this._libFiles = {}),
              (this._hasFetchedLibFiles = !1),
              (this._fetchLibFilesPromise = null)
          }
          isLibFile(e) {
            return e && e.path.indexOf('/lib.') === 0 ? !!o[e.path.slice(1)] : !1
          }
          getOrCreateModel(e) {
            const t = n.Uri.parse(e),
              s = n.editor.getModel(t)
            if (s) return s
            if (this.isLibFile(t) && this._hasFetchedLibFiles)
              return n.editor.createModel(this._libFiles[t.path.slice(1)], 'typescript', t)
            const i = L.typescriptDefaults.getExtraLibs()[e]
            return i ? n.editor.createModel(i.content, 'typescript', t) : null
          }
          _containsLibFile(e) {
            for (let t of e) if (this.isLibFile(t)) return !0
            return !1
          }
          fetchLibFilesIfNecessary(e) {
            return w(this, null, function* () {
              this._containsLibFile(e) && (yield this._fetchLibFiles())
            })
          }
          _fetchLibFiles() {
            return (
              this._fetchLibFilesPromise ||
                (this._fetchLibFilesPromise = this._worker()
                  .then((e) => e.getLibFiles())
                  .then((e) => {
                    ;(this._hasFetchedLibFiles = !0), (this._libFiles = e)
                  })),
              this._fetchLibFilesPromise
            )
          }
        },
        $ = class extends k {
          constructor(t, s, i, u) {
            super(u)
            v(this, '_disposables', [])
            v(this, '_listener', Object.create(null))
            ;(this._libFiles = t), (this._defaults = s), (this._selector = i)
            const a = (r) => {
                if (r.getLanguageId() !== i) return
                const p = () => {
                  const { onlyVisible: C } = this._defaults.getDiagnosticsOptions()
                  C ? r.isAttachedToEditor() && this._doValidate(r) : this._doValidate(r)
                }
                let d
                const f = r.onDidChangeContent(() => {
                    clearTimeout(d), (d = window.setTimeout(p, 500))
                  }),
                  _ = r.onDidChangeAttached(() => {
                    const { onlyVisible: C } = this._defaults.getDiagnosticsOptions()
                    C && (r.isAttachedToEditor() ? p() : n.editor.setModelMarkers(r, this._selector, []))
                  })
                ;(this._listener[r.uri.toString()] = {
                  dispose() {
                    f.dispose(), _.dispose(), clearTimeout(d)
                  },
                }),
                  p()
              },
              l = (r) => {
                n.editor.setModelMarkers(r, this._selector, [])
                const p = r.uri.toString()
                this._listener[p] && (this._listener[p].dispose(), delete this._listener[p])
              }
            this._disposables.push(n.editor.onDidCreateModel((r) => a(r))),
              this._disposables.push(n.editor.onWillDisposeModel(l)),
              this._disposables.push(
                n.editor.onDidChangeModelLanguage((r) => {
                  l(r.model), a(r.model)
                }),
              ),
              this._disposables.push({
                dispose() {
                  for (const r of n.editor.getModels()) l(r)
                },
              })
            const g = () => {
              for (const r of n.editor.getModels()) l(r), a(r)
            }
            this._disposables.push(this._defaults.onDidChange(g)),
              this._disposables.push(this._defaults.onDidExtraLibsChange(g)),
              n.editor.getModels().forEach((r) => a(r))
          }
          dispose() {
            this._disposables.forEach((t) => t && t.dispose()), (this._disposables = [])
          }
          _doValidate(t) {
            return w(this, null, function* () {
              const s = yield this._worker(t.uri)
              if (t.isDisposed()) return
              const i = [],
                {
                  noSyntaxValidation: u,
                  noSemanticValidation: a,
                  noSuggestionDiagnostics: l,
                } = this._defaults.getDiagnosticsOptions()
              u || i.push(s.getSyntacticDiagnostics(t.uri.toString())),
                a || i.push(s.getSemanticDiagnostics(t.uri.toString())),
                l || i.push(s.getSuggestionDiagnostics(t.uri.toString()))
              const g = yield Promise.all(i)
              if (!g || t.isDisposed()) return
              const r = g
                  .reduce((d, f) => f.concat(d), [])
                  .filter(
                    (d) =>
                      (this._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore || []).indexOf(d.code) === -1,
                  ),
                p = r
                  .map((d) => d.relatedInformation || [])
                  .reduce((d, f) => f.concat(d), [])
                  .map((d) => (d.file ? n.Uri.parse(d.file.fileName) : null))
              yield this._libFiles.fetchLibFilesIfNecessary(p),
                !t.isDisposed() &&
                  n.editor.setModelMarkers(
                    t,
                    this._selector,
                    r.map((d) => this._convertDiagnostics(t, d)),
                  )
            })
          }
          _convertDiagnostics(t, s) {
            const i = s.start || 0,
              u = s.length || 1,
              { lineNumber: a, column: l } = t.getPositionAt(i),
              { lineNumber: g, column: r } = t.getPositionAt(i + u),
              p = []
            return (
              s.reportsUnnecessary && p.push(n.MarkerTag.Unnecessary),
              s.reportsDeprecated && p.push(n.MarkerTag.Deprecated),
              {
                severity: this._tsDiagnosticCategoryToMarkerSeverity(s.category),
                startLineNumber: a,
                startColumn: l,
                endLineNumber: g,
                endColumn: r,
                message: N(
                  s.messageText,
                  `
`,
                ),
                code: s.code.toString(),
                tags: p,
                relatedInformation: this._convertRelatedInformation(t, s.relatedInformation),
              }
            )
          }
          _convertRelatedInformation(t, s) {
            if (!s) return []
            const i = []
            return (
              s.forEach((u) => {
                let a = t
                if ((u.file && (a = this._libFiles.getOrCreateModel(u.file.fileName)), !a)) return
                const l = u.start || 0,
                  g = u.length || 1,
                  { lineNumber: r, column: p } = a.getPositionAt(l),
                  { lineNumber: d, column: f } = a.getPositionAt(l + g)
                i.push({
                  resource: a.uri,
                  startLineNumber: r,
                  startColumn: p,
                  endLineNumber: d,
                  endColumn: f,
                  message: N(
                    u.messageText,
                    `
`,
                  ),
                })
              }),
              i
            )
          }
          _tsDiagnosticCategoryToMarkerSeverity(t) {
            switch (t) {
              case 1:
                return n.MarkerSeverity.Error
              case 3:
                return n.MarkerSeverity.Info
              case 0:
                return n.MarkerSeverity.Warning
              case 2:
                return n.MarkerSeverity.Hint
            }
            return n.MarkerSeverity.Info
          }
        },
        O = class extends k {
          get triggerCharacters() {
            return ['.']
          }
          provideCompletionItems(e, t, s, i) {
            return w(this, null, function* () {
              const u = e.getWordUntilPosition(t),
                a = new n.Range(t.lineNumber, u.startColumn, t.lineNumber, u.endColumn),
                l = e.uri,
                g = e.getOffsetAt(t),
                r = yield this._worker(l)
              if (e.isDisposed()) return
              const p = yield r.getCompletionsAtPosition(l.toString(), g)
              return !p || e.isDisposed()
                ? void 0
                : {
                    suggestions: p.entries.map((f) => {
                      let _ = a
                      if (f.replacementSpan) {
                        const M = e.getPositionAt(f.replacementSpan.start),
                          P = e.getPositionAt(f.replacementSpan.start + f.replacementSpan.length)
                        _ = new n.Range(M.lineNumber, M.column, P.lineNumber, P.column)
                      }
                      const C = []
                      return (
                        f.kindModifiers !== void 0 &&
                          f.kindModifiers.indexOf('deprecated') !== -1 &&
                          C.push(n.languages.CompletionItemTag.Deprecated),
                        {
                          uri: l,
                          position: t,
                          offset: g,
                          range: _,
                          label: f.name,
                          insertText: f.name,
                          sortText: f.sortText,
                          kind: O.convertKind(f.kind),
                          tags: C,
                        }
                      )
                    }),
                  }
            })
          }
          resolveCompletionItem(e, t) {
            return w(this, null, function* () {
              const s = e,
                i = s.uri,
                u = s.position,
                a = s.offset,
                g = yield (yield this._worker(i)).getCompletionEntryDetails(i.toString(), a, s.label)
              return g
                ? {
                    uri: i,
                    position: u,
                    label: g.name,
                    kind: O.convertKind(g.kind),
                    detail: x(g.displayParts),
                    documentation: { value: O.createDocumentationString(g) },
                  }
                : s
            })
          }
          static convertKind(e) {
            switch (e) {
              case c.primitiveType:
              case c.keyword:
                return n.languages.CompletionItemKind.Keyword
              case c.variable:
              case c.localVariable:
                return n.languages.CompletionItemKind.Variable
              case c.memberVariable:
              case c.memberGetAccessor:
              case c.memberSetAccessor:
                return n.languages.CompletionItemKind.Field
              case c.function:
              case c.memberFunction:
              case c.constructSignature:
              case c.callSignature:
              case c.indexSignature:
                return n.languages.CompletionItemKind.Function
              case c.enum:
                return n.languages.CompletionItemKind.Enum
              case c.module:
                return n.languages.CompletionItemKind.Module
              case c.class:
                return n.languages.CompletionItemKind.Class
              case c.interface:
                return n.languages.CompletionItemKind.Interface
              case c.warning:
                return n.languages.CompletionItemKind.File
            }
            return n.languages.CompletionItemKind.Property
          }
          static createDocumentationString(e) {
            let t = x(e.documentation)
            if (e.tags)
              for (const s of e.tags)
                t += `

${z(s)}`
            return t
          }
        }
      function z(e) {
        let t = `*@${e.name}*`
        if (e.name === 'param' && e.text) {
          const [s, ...i] = e.text
          ;(t += `\`${s.text}\``), i.length > 0 && (t += ` \u2014 ${i.map((u) => u.text).join(' ')}`)
        } else
          Array.isArray(e.text)
            ? (t += ` \u2014 ${e.text.map((s) => s.text).join(' ')}`)
            : e.text && (t += ` \u2014 ${e.text}`)
        return t
      }
      var E = class extends k {
          constructor() {
            super(...arguments)
            v(this, 'signatureHelpTriggerCharacters', ['(', ','])
          }
          static _toSignatureHelpTriggerReason(t) {
            switch (t.triggerKind) {
              case n.languages.SignatureHelpTriggerKind.TriggerCharacter:
                return t.triggerCharacter
                  ? t.isRetrigger
                    ? { kind: 'retrigger', triggerCharacter: t.triggerCharacter }
                    : { kind: 'characterTyped', triggerCharacter: t.triggerCharacter }
                  : { kind: 'invoked' }
              case n.languages.SignatureHelpTriggerKind.ContentChange:
                return t.isRetrigger ? { kind: 'retrigger' } : { kind: 'invoked' }
              case n.languages.SignatureHelpTriggerKind.Invoke:
              default:
                return { kind: 'invoked' }
            }
          }
          provideSignatureHelp(t, s, i, u) {
            return w(this, null, function* () {
              const a = t.uri,
                l = t.getOffsetAt(s),
                g = yield this._worker(a)
              if (t.isDisposed()) return
              const r = yield g.getSignatureHelpItems(a.toString(), l, {
                triggerReason: E._toSignatureHelpTriggerReason(u),
              })
              if (!r || t.isDisposed()) return
              const p = { activeSignature: r.selectedItemIndex, activeParameter: r.argumentIndex, signatures: [] }
              return (
                r.items.forEach((d) => {
                  const f = { label: '', parameters: [] }
                  ;(f.documentation = { value: x(d.documentation) }),
                    (f.label += x(d.prefixDisplayParts)),
                    d.parameters.forEach((_, C, M) => {
                      const P = x(_.displayParts),
                        fe = { label: P, documentation: { value: x(_.documentation) } }
                      ;(f.label += P),
                        f.parameters.push(fe),
                        C < M.length - 1 && (f.label += x(d.separatorDisplayParts))
                    }),
                    (f.label += x(d.suffixDisplayParts)),
                    p.signatures.push(f)
                }),
                { value: p, dispose() {} }
              )
            })
          }
        },
        J = class extends k {
          provideHover(e, t, s) {
            return w(this, null, function* () {
              const i = e.uri,
                u = e.getOffsetAt(t),
                a = yield this._worker(i)
              if (e.isDisposed()) return
              const l = yield a.getQuickInfoAtPosition(i.toString(), u)
              if (!l || e.isDisposed()) return
              const g = x(l.documentation),
                r = l.tags
                  ? l.tags.map((d) => z(d)).join(`  

`)
                  : '',
                p = x(l.displayParts)
              return {
                range: this._textSpanToRange(e, l.textSpan),
                contents: [
                  { value: '```typescript\n' + p + '\n```\n' },
                  {
                    value:
                      g +
                      (r
                        ? `

` + r
                        : ''),
                  },
                ],
              }
            })
          }
        },
        G = class extends k {
          provideDocumentHighlights(e, t, s) {
            return w(this, null, function* () {
              const i = e.uri,
                u = e.getOffsetAt(t),
                a = yield this._worker(i)
              if (e.isDisposed()) return
              const l = yield a.getOccurrencesAtPosition(i.toString(), u)
              if (!(!l || e.isDisposed()))
                return l.map((g) => ({
                  range: this._textSpanToRange(e, g.textSpan),
                  kind: g.isWriteAccess
                    ? n.languages.DocumentHighlightKind.Write
                    : n.languages.DocumentHighlightKind.Text,
                }))
            })
          }
        },
        Q = class extends k {
          constructor(e, t) {
            super(t), (this._libFiles = e)
          }
          provideDefinition(e, t, s) {
            return w(this, null, function* () {
              const i = e.uri,
                u = e.getOffsetAt(t),
                a = yield this._worker(i)
              if (e.isDisposed()) return
              const l = yield a.getDefinitionAtPosition(i.toString(), u)
              if (
                !l ||
                e.isDisposed() ||
                (yield this._libFiles.fetchLibFilesIfNecessary(l.map((r) => n.Uri.parse(r.fileName))), e.isDisposed())
              )
                return
              const g = []
              for (let r of l) {
                const p = this._libFiles.getOrCreateModel(r.fileName)
                p && g.push({ uri: p.uri, range: this._textSpanToRange(p, r.textSpan) })
              }
              return g
            })
          }
        },
        X = class extends k {
          constructor(e, t) {
            super(t), (this._libFiles = e)
          }
          provideReferences(e, t, s, i) {
            return w(this, null, function* () {
              const u = e.uri,
                a = e.getOffsetAt(t),
                l = yield this._worker(u)
              if (e.isDisposed()) return
              const g = yield l.getReferencesAtPosition(u.toString(), a)
              if (
                !g ||
                e.isDisposed() ||
                (yield this._libFiles.fetchLibFilesIfNecessary(g.map((p) => n.Uri.parse(p.fileName))), e.isDisposed())
              )
                return
              const r = []
              for (let p of g) {
                const d = this._libFiles.getOrCreateModel(p.fileName)
                d && r.push({ uri: d.uri, range: this._textSpanToRange(d, p.textSpan) })
              }
              return r
            })
          }
        },
        Y = class extends k {
          provideDocumentSymbols(e, t) {
            return w(this, null, function* () {
              const s = e.uri,
                i = yield this._worker(s)
              if (e.isDisposed()) return
              const u = yield i.getNavigationBarItems(s.toString())
              if (!u || e.isDisposed()) return
              const a = (g, r, p) => {
                let d = {
                  name: r.text,
                  detail: '',
                  kind: y[r.kind] || n.languages.SymbolKind.Variable,
                  range: this._textSpanToRange(e, r.spans[0]),
                  selectionRange: this._textSpanToRange(e, r.spans[0]),
                  tags: [],
                }
                if ((p && (d.containerName = p), r.childItems && r.childItems.length > 0))
                  for (let f of r.childItems) a(g, f, d.name)
                g.push(d)
              }
              let l = []
              return u.forEach((g) => a(l, g)), l
            })
          }
        },
        c = class {}
      h(c, 'unknown', ''),
        h(c, 'keyword', 'keyword'),
        h(c, 'script', 'script'),
        h(c, 'module', 'module'),
        h(c, 'class', 'class'),
        h(c, 'interface', 'interface'),
        h(c, 'type', 'type'),
        h(c, 'enum', 'enum'),
        h(c, 'variable', 'var'),
        h(c, 'localVariable', 'local var'),
        h(c, 'function', 'function'),
        h(c, 'localFunction', 'local function'),
        h(c, 'memberFunction', 'method'),
        h(c, 'memberGetAccessor', 'getter'),
        h(c, 'memberSetAccessor', 'setter'),
        h(c, 'memberVariable', 'property'),
        h(c, 'constructorImplementation', 'constructor'),
        h(c, 'callSignature', 'call'),
        h(c, 'indexSignature', 'index'),
        h(c, 'constructSignature', 'construct'),
        h(c, 'parameter', 'parameter'),
        h(c, 'typeParameter', 'type parameter'),
        h(c, 'primitiveType', 'primitive type'),
        h(c, 'label', 'label'),
        h(c, 'alias', 'alias'),
        h(c, 'const', 'const'),
        h(c, 'let', 'let'),
        h(c, 'warning', 'warning')
      var y = Object.create(null)
      ;(y[c.module] = n.languages.SymbolKind.Module),
        (y[c.class] = n.languages.SymbolKind.Class),
        (y[c.enum] = n.languages.SymbolKind.Enum),
        (y[c.interface] = n.languages.SymbolKind.Interface),
        (y[c.memberFunction] = n.languages.SymbolKind.Method),
        (y[c.memberVariable] = n.languages.SymbolKind.Property),
        (y[c.memberGetAccessor] = n.languages.SymbolKind.Property),
        (y[c.memberSetAccessor] = n.languages.SymbolKind.Property),
        (y[c.variable] = n.languages.SymbolKind.Variable),
        (y[c.const] = n.languages.SymbolKind.Variable),
        (y[c.localVariable] = n.languages.SymbolKind.Variable),
        (y[c.variable] = n.languages.SymbolKind.Variable),
        (y[c.function] = n.languages.SymbolKind.Function),
        (y[c.localFunction] = n.languages.SymbolKind.Function)
      var D = class extends k {
          static _convertOptions(e) {
            return {
              ConvertTabsToSpaces: e.insertSpaces,
              TabSize: e.tabSize,
              IndentSize: e.tabSize,
              IndentStyle: 2,
              NewLineCharacter: `
`,
              InsertSpaceAfterCommaDelimiter: !0,
              InsertSpaceAfterSemicolonInForStatements: !0,
              InsertSpaceBeforeAndAfterBinaryOperators: !0,
              InsertSpaceAfterKeywordsInControlFlowStatements: !0,
              InsertSpaceAfterFunctionKeywordForAnonymousFunctions: !0,
              InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: !1,
              InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: !1,
              InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: !1,
              PlaceOpenBraceOnNewLineForControlBlocks: !1,
              PlaceOpenBraceOnNewLineForFunctions: !1,
            }
          }
          _convertTextChanges(e, t) {
            return { text: t.newText, range: this._textSpanToRange(e, t.span) }
          }
        },
        Z = class extends D {
          provideDocumentRangeFormattingEdits(e, t, s, i) {
            return w(this, null, function* () {
              const u = e.uri,
                a = e.getOffsetAt({ lineNumber: t.startLineNumber, column: t.startColumn }),
                l = e.getOffsetAt({ lineNumber: t.endLineNumber, column: t.endColumn }),
                g = yield this._worker(u)
              if (e.isDisposed()) return
              const r = yield g.getFormattingEditsForRange(u.toString(), a, l, D._convertOptions(s))
              if (!(!r || e.isDisposed())) return r.map((p) => this._convertTextChanges(e, p))
            })
          }
        },
        q = class extends D {
          get autoFormatTriggerCharacters() {
            return [
              ';',
              '}',
              `
`,
            ]
          }
          provideOnTypeFormattingEdits(e, t, s, i, u) {
            return w(this, null, function* () {
              const a = e.uri,
                l = e.getOffsetAt(t),
                g = yield this._worker(a)
              if (e.isDisposed()) return
              const r = yield g.getFormattingEditsAfterKeystroke(a.toString(), l, s, D._convertOptions(i))
              if (!(!r || e.isDisposed())) return r.map((p) => this._convertTextChanges(e, p))
            })
          }
        },
        ee = class extends D {
          provideCodeActions(e, t, s, i) {
            return w(this, null, function* () {
              const u = e.uri,
                a = e.getOffsetAt({ lineNumber: t.startLineNumber, column: t.startColumn }),
                l = e.getOffsetAt({ lineNumber: t.endLineNumber, column: t.endColumn }),
                g = D._convertOptions(e.getOptions()),
                r = s.markers
                  .filter((_) => _.code)
                  .map((_) => _.code)
                  .map(Number),
                p = yield this._worker(u)
              if (e.isDisposed()) return
              const d = yield p.getCodeFixesAtPosition(u.toString(), a, l, r, g)
              return !d || e.isDisposed()
                ? { actions: [], dispose: () => {} }
                : {
                    actions: d
                      .filter((_) => _.changes.filter((C) => C.isNewFile).length === 0)
                      .map((_) => this._tsCodeFixActionToMonacoCodeAction(e, s, _)),
                    dispose: () => {},
                  }
            })
          }
          _tsCodeFixActionToMonacoCodeAction(e, t, s) {
            const i = []
            for (const a of s.changes)
              for (const l of a.textChanges)
                i.push({
                  resource: e.uri,
                  versionId: void 0,
                  textEdit: { range: this._textSpanToRange(e, l.span), text: l.newText },
                })
            return { title: s.description, edit: { edits: i }, diagnostics: t.markers, kind: 'quickfix' }
          }
        },
        te = class extends k {
          constructor(e, t) {
            super(t), (this._libFiles = e)
          }
          provideRenameEdits(e, t, s, i) {
            return w(this, null, function* () {
              const u = e.uri,
                a = u.toString(),
                l = e.getOffsetAt(t),
                g = yield this._worker(u)
              if (e.isDisposed()) return
              const r = yield g.getRenameInfo(a, l, { allowRenameOfImportPath: !1 })
              if (r.canRename === !1) return { edits: [], rejectReason: r.localizedErrorMessage }
              if (r.fileToRename !== void 0) throw new Error('Renaming files is not supported.')
              const p = yield g.findRenameLocations(a, l, !1, !1, !1)
              if (!p || e.isDisposed()) return
              const d = []
              for (const f of p) {
                const _ = this._libFiles.getOrCreateModel(f.fileName)
                if (_)
                  d.push({
                    resource: _.uri,
                    versionId: void 0,
                    textEdit: { range: this._textSpanToRange(_, f.textSpan), text: s },
                  })
                else throw new Error(`Unknown file ${f.fileName}.`)
              }
              return { edits: d }
            })
          }
        },
        re = class extends k {
          provideInlayHints(e, t, s) {
            return w(this, null, function* () {
              const i = e.uri,
                u = i.toString(),
                a = e.getOffsetAt({ lineNumber: t.startLineNumber, column: t.startColumn }),
                l = e.getOffsetAt({ lineNumber: t.endLineNumber, column: t.endColumn }),
                g = yield this._worker(i)
              return e.isDisposed()
                ? null
                : {
                    hints: (yield g.provideInlayHints(u, a, l)).map((d) =>
                      oe(ae({}, d), {
                        label: d.text,
                        position: e.getPositionAt(d.position),
                        kind: this._convertHintKind(d.kind),
                      }),
                    ),
                    dispose: () => {},
                  }
            })
          }
          _convertHintKind(e) {
            switch (e) {
              case 'Parameter':
                return n.languages.InlayHintKind.Parameter
              case 'Type':
                return n.languages.InlayHintKind.Type
              default:
                return n.languages.InlayHintKind.Type
            }
          }
        },
        H,
        W
      function ce(e) {
        W = se(e, 'typescript')
      }
      function le(e) {
        H = se(e, 'javascript')
      }
      function ge() {
        return new Promise((e, t) => {
          if (!H) return t('JavaScript not registered!')
          e(H)
        })
      }
      function de() {
        return new Promise((e, t) => {
          if (!W) return t('TypeScript not registered!')
          e(W)
        })
      }
      function se(e, t) {
        const s = [],
          i = [],
          u = new B(t, e)
        s.push(u)
        const a = (...r) => u.getLanguageServiceWorker(...r),
          l = new U(a)
        function g() {
          const { modeConfiguration: r } = e
          ie(i),
            r.completionItems && i.push(n.languages.registerCompletionItemProvider(t, new O(a))),
            r.signatureHelp && i.push(n.languages.registerSignatureHelpProvider(t, new E(a))),
            r.hovers && i.push(n.languages.registerHoverProvider(t, new J(a))),
            r.documentHighlights && i.push(n.languages.registerDocumentHighlightProvider(t, new G(a))),
            r.definitions && i.push(n.languages.registerDefinitionProvider(t, new Q(l, a))),
            r.references && i.push(n.languages.registerReferenceProvider(t, new X(l, a))),
            r.documentSymbols && i.push(n.languages.registerDocumentSymbolProvider(t, new Y(a))),
            r.rename && i.push(n.languages.registerRenameProvider(t, new te(l, a))),
            r.documentRangeFormattingEdits &&
              i.push(n.languages.registerDocumentRangeFormattingEditProvider(t, new Z(a))),
            r.onTypeFormattingEdits && i.push(n.languages.registerOnTypeFormattingEditProvider(t, new q(a))),
            r.codeActions && i.push(n.languages.registerCodeActionProvider(t, new ee(a))),
            r.inlayHints && i.push(n.languages.registerInlayHintsProvider(t, new re(a))),
            r.diagnostics && i.push(new $(l, e, t, a))
        }
        return g(), s.push(pe(i)), a
      }
      function pe(e) {
        return { dispose: () => ie(e) }
      }
      function ie(e) {
        for (; e.length; ) e.pop().dispose()
      }
    },
  },
])
