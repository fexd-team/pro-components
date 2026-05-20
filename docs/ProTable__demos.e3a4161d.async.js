(self.webpackChunk=self.webpackChunk||[]).push([[4843],{58967:function(A,f,u){"use strict";u.r(f),u.d(f,{default:function(){return H}});var l=u(52510),a=u.n(l),j=u(57213),t=u.n(j),s=u(60799),S=u.n(s),Z=u(93525),v=u.n(Z),w=u(54306),g=u.n(w),e=u(57689),F=u(73015),O=u(49094),T=u(7733),P=u(70241),o=u(87776),M=u(34358),I=u(92664),V=u(74637),c=u.n(V),L=u(29833),R=u(28416),$=u(97879),eu=u(21292),N=u(68316),Q=N.ZP,U=u(84055),K=u(75188),W=u(4774),G=u(25836);window.dayjs=c();var H=function(){var n,i=Y(),b=(0,e.useState)(!1),d=g()(b,2),y=d[0],D=d[1],h=(0,U.Z)("preview-demo-code",{defaultValue:i}),m=g()(h,2),B=m[0],z=m[1],_=(0,K.Z)(z,{wait:1e3}),x=(0,W.Z)(B,{wait:120}),uu=(0,e.useState)(function(){try{var r=new Function(B)();return r}catch(tu){console.warn("\u4EE3\u7801\u6709\u95EE\u9898",tu);var E=new Function(i)();return E}}),k=g()(uu,2),C=k[0],nu=k[1];return(0,G.Z)(function(){try{var r=new Function(x)();if(!(0,T.Z)(r)){console.log(r),console.warn("\u8FD4\u56DE\u5185\u5BB9\u5E76\u975E\u5BF9\u8C61\uFF0C\u5FFD\u7565");return}nu(r),F.ZP.info("\u914D\u7F6E\u5DF2\u66F4\u65B0")}catch(E){console.warn(E),console.warn("\u8BED\u6CD5\u89E3\u6790\u9519\u8BEF\uFF0C\u5FFD\u7565"),F.ZP.warning("\u8BED\u6CD5\u89E3\u6790\u9519\u8BEF\uFF0C\u8BF7\u7ED3\u5408 F12 \u5DE5\u5177\u6392\u67E5\u9519\u8BEF\u6216\u91CD\u7F6E\u4EE3\u7801")}},[x]),e.createElement("div",null,e.createElement(L.QV,S()({localeKey:"zh_CN"},C,{iconActions:[].concat(v()((n=C==null?void 0:C.iconActions)!==null&&n!==void 0?n:[]),[{builtIn:"settings",onClick:function(){(0,R.Z)({content:e.createElement(Q,{width:"100%",height:"100%",language:"javascript",value:B,onChange:_.run,options:{tabSize:2}}),actions:null,title:e.createElement(O.Z,null,"\u5199\u5B8C\u540E 1s \u751F\u6548\uFF0C\u8BED\u6CD5\u6709\u9519\u8BEF\u7684\u8BDD\u4E0D\u751F\u6548\uFF0C\u5199\u5B8C\u540E\u4F1A\u505A\u672C\u5730\u6301\u4E45\u5316",e.createElement($.Z,{tooltip:{title:"\u5C06\u7F16\u8F91\u5668\u7684\u4EE3\u7801\u8FD8\u539F\u4E3A\u9ED8\u8BA4\u72B6\u6001",placement:"bottom"},confirm:{title:"\u786E\u5B9A\u8981\u91CD\u7F6E\u5417\uFF1F\u4F60\u7684\u81EA\u5B9A\u4E49\u914D\u7F6E\u5C06\u5168\u90E8\u4E22\u5931",placement:"bottom"},onClick:function(){z(i),F.ZP.info("\u914D\u7F6E\u5DF2\u91CD\u7F6E")}},"\u91CD\u7F6E")),width:"80vw",contentWrapperStyle:{maxWidth:1280},bodyStyle:{padding:0,overflow:"hidden"}})},tooltip:{title:"\u70B9\u6211\uFF01\u5B9E\u65F6\u7F16\u8F91\u8868\u683C\u7684\u914D\u7F6E",placement:"topRight",color:"volcano"}}])})))},J=q();Object.assign(window,{message:F.ZP,dayjs:c(),globalTools:I,mockData:J,getMockDataType:p});var X=`const { mockData, message, dayjs, getMockDataType } = window
const { delay, memoize } = window.globalTools

const getOptions = memoize(async () => {
  await delay(1000)

  return [
    { label: 'test', value: 1, tag: 'green' },
    { label: 'test2', value: 2, badge: 'processing' },
  ]
})

const props = {
  title: '\u8868\u683C\u793A\u4F8B\uFF08\u53EF\u5728\u7EBF\u7F16\u8F91\u914D\u7F6E\uFF09',
  bordered: true,
  selectable: true,
  actions: ['add', { content: '\u5BFC\u51FA' }], // \u8868\u683C\u6309\u94AE\u52A8\u4F5C\uFF0C\u76EE\u524D\u5185\u7F6E\u4E86\u65B0\u589E\u52A8\u4F5C
  iconActions: ['refresh', 'table-size', 'fullscreen'], // \u76EE\u524D\u5185\u7F6E\u4E86\u5237\u65B0\u3001\u8868\u683C\u5C3A\u5BF8\u3001\u5168\u5C4F\u52A8\u4F5C
  batchActions: ['delete'], // \u591A\u9009\u52A8\u4F5C\uFF0C\u76EE\u524D\u5185\u7F6E\u4E86\u6279\u91CF\u5220\u9664\u52A8\u4F5C
  columnActions: ['table-edit', 'delete'], // \u8868\u683C\u9879\u52A8\u4F5C\uFF0C\u76EE\u524D\u5185\u7F6E\u4E86\u67E5\u770B\u8BE6\u60C5\u3001\u7F16\u8F91\u3001\u5220\u9664\u52A8\u4F5C
  fixColumnActions: true, // \u662F\u5426\u56FA\u5B9A\u52A8\u4F5C\u680F\u5230\u53F3\u4FA7
  columns: [
    ...Array(20)
      .fill('')
      .map((_, idx) => ({
        title: \`\u6761\u76EE\${idx + 1}\`,
        dataIndex: \`value\${idx}\`,
        tooltip: idx % 2 === 0 ? \`\u6761\u76EE\${idx + 1} \u7684\u63D0\u793A\` : null,
        valueType: getMockDataType(idx),
        valueEnum: getOptions,
        expandView: idx > 10,
        hidden: idx > 10,
        copyable: getMockDataType(idx) === 'text',
        queryField: true,
        editField: true,
      })),
  ],
  // \u67E5\u8BE2\u65B9\u6CD5\uFF0C\u5C06\u5728\u8868\u683C\u8FDB\u884C\u67E5\u8BE2\u884C\u4E3A\u65F6\u89E6\u53D1\uFF0C\u5C06\u83B7\u5F97\u67E5\u8BE2\u533A\u57DF\u7684 form + \u5206\u9875\u76F8\u5173\u6570\u636E\uFF0C\u9700\u8981\u8FD4\u56DE { success, data, total } \u683C\u5F0F\u6570\u636E
  onQuery: async (params, extraParams) => {
    const { page, pageSize } = params
    console.log('onQuery', params, extraParams)
    await delay(1000)

    const data = mockData.slice((page - 1) * pageSize, page * pageSize)

    return {
      success: true,
      data: data.map(item => ({ ...item })),
      total: mockData?.length,
    }
  },
  // \u65B0\u589E\u65B9\u6CD5\uFF0C\u5C06\u5728\u65B0\u589E\u8868\u5355\u586B\u5199\u5B8C\u6BD5\uFF0C\u70B9\u51FB\u786E\u8BA4\u540E\u89E6\u53D1\uFF0C\u83B7\u5F97\u8868\u5355\u6570\u636E
  onAdd: async params => {
    console.log('add', params)

    await delay(1000)

    return {
      success: true,
    }
  },
  // \u8BE6\u60C5\u67E5\u8BE2\u65B9\u6CD5\uFF0C\u5C06\u5728\u7F16\u8F91\u6309\u94AE\u3001\u67E5\u770B\u8BE6\u60C5\u6309\u94AE\u70B9\u51FB\u65F6\u89E6\u53D1\uFF0C\u83B7\u5F97\u70B9\u51FB\u7684 item\uFF0C\u8FD4\u56DE\u7684 data \u5C06\u4F5C\u4E3A\u7F16\u8F91\u8868\u5355\u7684\u521D\u59CB\u6570\u636E
  onView: async item => {
    await delay(500)

    return {
      success: true,
      data: {
        ...item,
      },
    }
  },
  // \u7F16\u8F91\u65B9\u6CD5\uFF0C\u5C06\u5728\u7F16\u8F91\u8868\u5355\u586B\u5199\u5B8C\u6BD5\uFF0C\u70B9\u51FB\u786E\u8BA4\u540E\u89E6\u53D1\uFF0C\u83B7\u5F97\u8868\u5355\u6570\u636E
  onEdit: async (params, item) => {
    console.log('edit', params, item)

    const targetIndex = mockData.findIndex(data => data.id === item.id)
    const target = mockData[targetIndex]

    Object.assign(target, params) // \u6A21\u62DF\u6570\u636E\u53D8\u66F4
    console.log('\u66F4\u65B0\u540E\u7684\u6570\u636E', target, mockData[targetIndex])

    await delay(1000)

    return {
      success: true,
    }
  },
  // \u5220\u9664\u65B9\u6CD5\uFF0C\u5C06\u5728\u5220\u9664/\u6279\u91CF\u5220\u9664\u70B9\u51FB\u65F6\u89E6\u53D1\uFF0C\u83B7\u5F97\u9700\u8981\u5220\u9664\u7684 item\uFF0C\u53EF\u80FD\u4E3A\u591A\u4E2A
  onDelete: async target => {
    if (Array.isArray(target)) {
      message.info('\u5220\u9664\u591A\u4E2A')

      await delay(1000)

      return {
        success: true,
      }
    }

    message.info('\u5220\u9664\u5355\u4E2A')

    await delay(1000)

    return {
      success: true,
    }
  },
}

return props
`;function Y(){return X}function q(){return Array(2e3).fill("").map(function(n,i){return t()({id:"key_".concat(i+1)},Object.assign.apply(Object,[{}].concat(v()(Array(20).fill("").map(function(b,d){return a()({},"value".concat(d),(0,P.Z)(function(){var y=p(d),D={date:c()().add((0,o.Z)(0,10),"day").valueOf(),dateRange:[c()().add((0,o.Z)(0,10),"day").valueOf(),c()().add((0,o.Z)(0,10),"day").valueOf()].sort(function(h,m){return h>m?-1:1}),select:(0,M.Z)([1,2]),multipleSelect:v()(new Set([1,2])),text:(0,o.Z)(0,999999999999999)};if(!((0,o.Z)(0,10)>8))return y in D?D[y]:(0,o.Z)(0,999999999999999)}))})))))})}function p(n){return n%3===0?"date":n%4===0?"dateRange":n%2===0?"multipleSelect":n%5===0?"select":"text"}},74094:function(A,f,u){var l={"./af":23409,"./af.js":23409,"./ar":83589,"./ar-dz":34143,"./ar-dz.js":34143,"./ar-kw":35800,"./ar-kw.js":35800,"./ar-ly":50773,"./ar-ly.js":50773,"./ar-ma":92241,"./ar-ma.js":92241,"./ar-sa":48440,"./ar-sa.js":48440,"./ar-tn":99745,"./ar-tn.js":99745,"./ar.js":83589,"./az":33565,"./az.js":33565,"./be":6944,"./be.js":6944,"./bg":376,"./bg.js":376,"./bm":5148,"./bm.js":5148,"./bn":20538,"./bn-bd":83415,"./bn-bd.js":83415,"./bn.js":20538,"./bo":56098,"./bo.js":56098,"./br":51897,"./br.js":51897,"./bs":34032,"./bs.js":34032,"./ca":33737,"./ca.js":33737,"./cs":59732,"./cs.js":59732,"./cv":9435,"./cv.js":9435,"./cy":61480,"./cy.js":61480,"./da":15457,"./da.js":15457,"./de":31052,"./de-at":44453,"./de-at.js":44453,"./de-ch":56990,"./de-ch.js":56990,"./de.js":31052,"./dv":31079,"./dv.js":31079,"./el":31335,"./el.js":31335,"./en-au":65072,"./en-au.js":65072,"./en-ca":56764,"./en-ca.js":56764,"./en-gb":25014,"./en-gb.js":25014,"./en-ie":77557,"./en-ie.js":77557,"./en-il":91351,"./en-il.js":91351,"./en-in":17473,"./en-in.js":17473,"./en-nz":87597,"./en-nz.js":87597,"./en-sg":20789,"./en-sg.js":20789,"./eo":28655,"./eo.js":28655,"./es":25941,"./es-do":24280,"./es-do.js":24280,"./es-mx":10586,"./es-mx.js":10586,"./es-us":34263,"./es-us.js":34263,"./es.js":25941,"./et":40495,"./et.js":40495,"./eu":14115,"./eu.js":14115,"./fa":99249,"./fa.js":99249,"./fi":92621,"./fi.js":92621,"./fil":76712,"./fil.js":76712,"./fo":25797,"./fo.js":25797,"./fr":91420,"./fr-ca":36634,"./fr-ca.js":36634,"./fr-ch":52990,"./fr-ch.js":52990,"./fr.js":91420,"./fy":97548,"./fy.js":97548,"./ga":9040,"./ga.js":9040,"./gd":47023,"./gd.js":47023,"./gl":7046,"./gl.js":7046,"./gom-deva":86729,"./gom-deva.js":86729,"./gom-latn":89323,"./gom-latn.js":89323,"./gu":67253,"./gu.js":67253,"./he":43780,"./he.js":43780,"./hi":32019,"./hi.js":32019,"./hr":21720,"./hr.js":21720,"./hu":656,"./hu.js":656,"./hy-am":98264,"./hy-am.js":98264,"./id":66875,"./id.js":66875,"./is":24098,"./is.js":24098,"./it":32362,"./it-ch":77121,"./it-ch.js":77121,"./it.js":32362,"./ja":12534,"./ja.js":12534,"./jv":2793,"./jv.js":2793,"./ka":64342,"./ka.js":64342,"./kk":94906,"./kk.js":94906,"./km":69226,"./km.js":69226,"./kn":76715,"./kn.js":76715,"./ko":273,"./ko.js":273,"./ku":50343,"./ku.js":50343,"./ky":21472,"./ky.js":21472,"./lb":97843,"./lb.js":97843,"./lo":34997,"./lo.js":34997,"./lt":24754,"./lt.js":24754,"./lv":33920,"./lv.js":33920,"./me":46267,"./me.js":46267,"./mi":18155,"./mi.js":18155,"./mk":55110,"./mk.js":55110,"./ml":85383,"./ml.js":85383,"./mn":68208,"./mn.js":68208,"./mr":22895,"./mr.js":22895,"./ms":20354,"./ms-my":8897,"./ms-my.js":8897,"./ms.js":20354,"./mt":53071,"./mt.js":53071,"./my":41904,"./my.js":41904,"./nb":95132,"./nb.js":95132,"./ne":93119,"./ne.js":93119,"./nl":5828,"./nl-be":77426,"./nl-be.js":77426,"./nl.js":5828,"./nn":46775,"./nn.js":46775,"./oc-lnc":3883,"./oc-lnc.js":3883,"./pa-in":71229,"./pa-in.js":71229,"./pl":7079,"./pl.js":7079,"./pt":85919,"./pt-br":17041,"./pt-br.js":17041,"./pt.js":85919,"./ro":76762,"./ro.js":76762,"./ru":62510,"./ru.js":62510,"./sd":81436,"./sd.js":81436,"./se":95275,"./se.js":95275,"./si":81088,"./si.js":81088,"./sk":49744,"./sk.js":49744,"./sl":72162,"./sl.js":72162,"./sq":61474,"./sq.js":61474,"./sr":30961,"./sr-cyrl":18827,"./sr-cyrl.js":18827,"./sr.js":30961,"./ss":99207,"./ss.js":99207,"./sv":94961,"./sv.js":94961,"./sw":6263,"./sw.js":6263,"./ta":64267,"./ta.js":64267,"./te":1627,"./te.js":1627,"./tet":27480,"./tet.js":27480,"./tg":48789,"./tg.js":48789,"./th":89385,"./th.js":89385,"./tk":75556,"./tk.js":75556,"./tl-ph":97495,"./tl-ph.js":97495,"./tlh":87314,"./tlh.js":87314,"./tr":57362,"./tr.js":57362,"./tzl":3288,"./tzl.js":3288,"./tzm":18749,"./tzm-latn":30728,"./tzm-latn.js":30728,"./tzm.js":18749,"./ug-cn":95435,"./ug-cn.js":95435,"./uk":51642,"./uk.js":51642,"./ur":94158,"./ur.js":94158,"./uz":26101,"./uz-latn":47980,"./uz-latn.js":47980,"./uz.js":26101,"./vi":32105,"./vi.js":32105,"./x-pseudo":11755,"./x-pseudo.js":11755,"./yo":83371,"./yo.js":83371,"./zh-cn":31376,"./zh-cn.js":31376,"./zh-hk":89955,"./zh-hk.js":89955,"./zh-mo":58173,"./zh-mo.js":58173,"./zh-tw":25288,"./zh-tw.js":25288};function a(t){var s=j(t);return u(s)}function j(t){if(!u.o(l,t)){var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}return l[t]}a.keys=function(){return Object.keys(l)},a.resolve=j,A.exports=a,a.id=74094}}]);
