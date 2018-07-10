var option = [{
    actionKey: 'S02',//权限key
    type: 'line',//图表类型
    data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],//横坐标
    series: [{//图表样式
        smooth: true,
        symbolSize: 10,
        type: 'line',
        lineStyle: {
          width: '5',
          borderWidth: 10,
        }
      }],
      name: [//图表系列标记名称
          {name: '核心企业平均指数', icon: 'circle'}, 
          { name: '企业指数', icon: 'circle'}
        ]
    },{
        actionKey: 'B02',//权限key
        type: 'pie',//图表类型
        series: [],
        name: [//图表系列标记名称
            {name: '已使用额度', icon: 'circle'}, 
            { name: '剩余额度', icon: 'circle'}
        ]
    },{
        actionKey: 'B03',
        type: 'bar',//图表类型
        series: [],
        name: [//图表系列标记名称
            {name: '已使用额度', icon: 'circle'}, 
            { name: '总额度', icon: 'circle'}
        ]
    },
]
export{
    option
}