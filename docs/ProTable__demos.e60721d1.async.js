"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4843],{52526:function(tu,g,u){u.r(g),u.d(g,{default:function(){return H}});var S=u(52510),h=u.n(S),Z=u(57213),x=u.n(Z),j=u(60799),T=u.n(j),O=u(93525),F=u.n(O),P=u(54306),E=u.n(P),t=u(57689),s=u(73015),w=u(49094),z=u(7733),M=u(70241),a=u(87776),b=u(34358),I=u(79411),V=u(74637),o=u.n(V),$=u(5665),L=u(45907),Q=u(90446),au=u(21292),R=u(68316),W=R.ZP,K=u(84055),N=u(75188),U=u(4774),G=u(25836);window.dayjs=o();var H=function(){var n,l=Y(),D=(0,t.useState)(!1),r=E()(D,2),C=r[0],m=r[1],v=(0,K.Z)("preview-demo-code",{defaultValue:l}),i=E()(v,2),f=i[0],y=i[1],q=(0,N.Z)(y,{wait:1e3}),A=(0,U.Z)(f,{wait:120}),_=(0,t.useState)(function(){try{var e=new Function(f)();return e}catch(nu){console.warn("\u4EE3\u7801\u6709\u95EE\u9898",nu);var d=new Function(l)();return d}}),p=E()(_,2),c=p[0],uu=p[1];return(0,G.Z)(function(){try{var e=new Function(A)();if(!(0,z.Z)(e)){console.log(e),console.warn("\u8FD4\u56DE\u5185\u5BB9\u5E76\u975E\u5BF9\u8C61\uFF0C\u5FFD\u7565");return}uu(e),s.ZP.info("\u914D\u7F6E\u5DF2\u66F4\u65B0")}catch(d){console.warn(d),console.warn("\u8BED\u6CD5\u89E3\u6790\u9519\u8BEF\uFF0C\u5FFD\u7565"),s.ZP.warning("\u8BED\u6CD5\u89E3\u6790\u9519\u8BEF\uFF0C\u8BF7\u7ED3\u5408 F12 \u5DE5\u5177\u6392\u67E5\u9519\u8BEF\u6216\u91CD\u7F6E\u4EE3\u7801")}},[A]),t.createElement("div",null,t.createElement($.QV,T()({localeKey:"zh_CN"},c,{iconActions:[].concat(F()((n=c==null?void 0:c.iconActions)!==null&&n!==void 0?n:[]),[{builtIn:"settings",onClick:function(){(0,L.Z)({content:t.createElement(W,{width:"100%",height:"100%",language:"javascript",value:f,onChange:q.run,options:{tabSize:2}}),actions:null,title:t.createElement(w.Z,null,"\u5199\u5B8C\u540E 1s \u751F\u6548\uFF0C\u8BED\u6CD5\u6709\u9519\u8BEF\u7684\u8BDD\u4E0D\u751F\u6548\uFF0C\u5199\u5B8C\u540E\u4F1A\u505A\u672C\u5730\u6301\u4E45\u5316",t.createElement(Q.Z,{tooltip:{title:"\u5C06\u7F16\u8F91\u5668\u7684\u4EE3\u7801\u8FD8\u539F\u4E3A\u9ED8\u8BA4\u72B6\u6001",placement:"bottom"},confirm:{title:"\u786E\u5B9A\u8981\u91CD\u7F6E\u5417\uFF1F\u4F60\u7684\u81EA\u5B9A\u4E49\u914D\u7F6E\u5C06\u5168\u90E8\u4E22\u5931",placement:"bottom"},onClick:function(){y(l),s.ZP.info("\u914D\u7F6E\u5DF2\u91CD\u7F6E")}},"\u91CD\u7F6E")),width:"80vw",contentWrapperStyle:{maxWidth:1280},bodyStyle:{padding:0,overflow:"hidden"}})},tooltip:{title:"\u70B9\u6211\uFF01\u5B9E\u65F6\u7F16\u8F91\u8868\u683C\u7684\u914D\u7F6E",placement:"topRight",color:"volcano"}}])})))},J=k();Object.assign(window,{message:s.ZP,dayjs:o(),globalTools:I,mockData:J,getMockDataType:B});var X=`const { mockData, message, dayjs, getMockDataType } = window
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
`;function Y(){return X}function k(){return Array(2e3).fill("").map(function(n,l){return x()({id:"key_".concat(l+1)},Object.assign.apply(Object,[{}].concat(F()(Array(20).fill("").map(function(D,r){return h()({},"value".concat(r),(0,M.Z)(function(){var C=B(r),m={date:o()().add((0,a.Z)(0,10),"day").valueOf(),dateRange:[o()().add((0,a.Z)(0,10),"day").valueOf(),o()().add((0,a.Z)(0,10),"day").valueOf()].sort(function(v,i){return v>i?-1:1}),select:(0,b.Z)([1,2]),multipleSelect:F()(new Set([1,2])),text:(0,a.Z)(0,999999999999999)};if(!((0,a.Z)(0,10)>8))return C in m?m[C]:(0,a.Z)(0,999999999999999)}))})))))})}function B(n){return n%3===0?"date":n%4===0?"dateRange":n%2===0?"multipleSelect":n%5===0?"select":"text"}}}]);
