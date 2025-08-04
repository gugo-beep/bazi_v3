{
    name: '空亡',
    comment: '空亡',
    preconditions: [],
    rules: [
      { trigger:{ on:['dayPillar'], value:['乙丑','丙寅','丁卯','戊辰','己巳','庚午','辛未','壬申','癸酉'] }, judgment:{ on:['allZhi'], value:['戌','亥'] } },
      { trigger:{ on:['dayPillar'], value:['乙亥','丙子','丁丑','戊寅','己卯','庚辰','辛巳','壬午','癸未'] }, judgment:{ on:['allZhi'], value:['申','酉'] } },
      { trigger:{ on:['dayPillar'], value:['乙酉','丙戌','丁亥','戊子','己丑','庚寅','辛卯','壬辰','癸巳'] }, judgment:{ on:['allZhi'], value:['午','未'] } },
      { trigger:{ on:['dayPillar'], value:['乙未','丙申','丁酉','戊戌','己亥','庚子','辛丑','壬寅','癸卯'] }, judgment:{ on:['allZhi'], value:['辰','巳'] } },
      { trigger:{ on:['dayPillar'], value:['乙巳','丙午','丁未','戊申','己酉','庚戌','辛亥','壬子','癸丑'] }, judgment:{ on:['allZhi'], value:['寅','卯'] } },
      { trigger:{ on:['dayPillar'], value:['乙卯','丙辰','丁巳','戊午','己未','庚申','辛酉','壬戌','癸亥'] }, judgment:{ on:['allZhi'], value:['子','丑'] } }
  ]
},

{
    name: '绞煞',
    comment: '绞煞',
    branches: [
        {
            preconditions: {
                logic: 'or',
                groups: [
                    [
                        { on: ['gender'], value: ['女']},
                        { on: ['dayGan'], value: ['甲', '丙', '戊', '庚', '壬'] }
                    ],
                    [
                        { on: ['gender'], value: ['男']},
                        { on: ['dayGan'], value: ['乙', '丁', '己', '辛', '癸'] }
                    ]
                ]
            },
            rules: [
                { trigger: { on: ['yearZhi'], value: ['子'] }, judgment: { on: ['allZhi'], value: ['卯'] } },
                { trigger: { on: ['yearZhi'], value: ['丑'] }, judgment: { on: ['allZhi'], value: ['辰'] } },
                { trigger: { on: ['yearZhi'], value: ['寅'] }, judgment: { on: ['allZhi'], value: ['巳'] } },
                { trigger: { on: ['yearZhi'], value: ['卯'] }, judgment: { on: ['allZhi'], value: ['午'] } },
                { trigger: { on: ['yearZhi'], value: ['辰'] }, judgment: { on: ['allZhi'], value: ['未'] } },
                { trigger: { on: ['yearZhi'], value: ['巳'] }, judgment: { on: ['allZhi'], value: ['申'] } },
                { trigger: { on: ['yearZhi'], value: ['午'] }, judgment: { on: ['allZhi'], value: ['酉'] } },
                { trigger: { on: ['yearZhi'], value: ['未'] }, judgment: { on: ['allZhi'], value: ['戌'] } },
                { trigger: { on: ['yearZhi'], value: ['申'] }, judgment: { on: ['allZhi'], value: ['亥'] } },
                { trigger: { on: ['yearZhi'], value: ['酉'] }, judgment: { on: ['allZhi'], value: ['子'] } },
                { trigger: { on: ['yearZhi'], value: ['戌'] }, judgment: { on: ['allZhi'], value: ['丑'] } },
                { trigger: { on: ['yearZhi'], value: ['亥'] }, judgment: { on: ['allZhi'], value: ['寅'] } }
            ]
        },
        {
            preconditions: {
                logic: 'or',
                groups: [
                    [
                        { on: ['gender'], value: ['女']},
                        { on: ['dayGan'], value: ['乙', '丁', '己', '辛', '癸'] }
                    ],
                    [
                        { on: ['gender'], value: ['男']},
                        { on: ['dayGan'], value: ['甲', '丙', '戊', '庚', '壬'] }
                    ]
                ]
            },
            rules: [
                { trigger: { on: ['yearZhi'], value: ['子'] }, judgment: { on: ['allZhi'], value: ['酉'] } },
                { trigger: { on: ['yearZhi'], value: ['丑'] }, judgment: { on: ['allZhi'], value: ['戌'] } },
                { trigger: { on: ['yearZhi'], value: ['寅'] }, judgment: { on: ['allZhi'], value: ['亥'] } },
                { trigger: { on: ['yearZhi'], value: ['卯'] }, judgment: { on: ['allZhi'], value: ['子'] } },
                { trigger: { on: ['yearZhi'], value: ['辰'] }, judgment: { on: ['allZhi'], value: ['丑'] } },
                { trigger: { on: ['yearZhi'], value: ['巳'] }, judgment: { on: ['allZhi'], value: ['寅'] } },
                { trigger: { on: ['yearZhi'], value: ['午'] }, judgment: { on: ['allZhi'], value: ['卯'] } },
                { trigger: { on: ['yearZhi'], value: ['未'] }, judgment: { on: ['allZhi'], value: ['辰'] } },
                { trigger: { on: ['yearZhi'], value: ['申'] }, judgment: { on: ['allZhi'], value: ['巳'] } },
                { trigger: { on: ['yearZhi'], value: ['酉'] }, judgment: { on: ['allZhi'], value: ['午'] } },
                { trigger: { on: ['yearZhi'], value: ['戌'] }, judgment: { on: ['allZhi'], value: ['未'] } },
                { trigger: { on: ['yearZhi'], value: ['亥'] }, judgment: { on: ['allZhi'], value: ['申'] } }
            ]
        }
    ]
},

{
    name: '地网',
    comment: '地网',
    preconditions: [],
    rules: [
      { trigger:{ on:['yearPillar'], value:['丙子','丁丑','甲寅','乙卯','壬辰','癸巳','丙午','丁未','甲申','乙酉','壬戌','癸亥','庚子','辛丑','戊寅','己卯','丙辰','丁巳','庚午','辛未','戊申','己酉','丙戌','丁亥']}, judgment:{ on:['dayZhi'], value:['辰','巳']}}
  ]
},

{
    name: '十恶大败',
    comment: '十恶大败',
    preconditions: [],
    rules: [
      { trigger:{ on:['dayPillar'], value:['甲辰']}, judgment:{ on:['dayPillar'], value:['甲辰']}},
      { trigger:{ on:['dayPillar'], value:['乙巳']}, judgment:{ on:['dayPillar'], value:['乙巳']}},
      { trigger:{ on:['dayPillar'], value:['丙申']}, judgment:{ on:['dayPillar'], value:['丙申']}},
      { trigger:{ on:['dayPillar'], value:['丁亥']}, judgment:{ on:['dayPillar'], value:['丁亥']}},
      { trigger:{ on:['dayPillar'], value:['戊戌']}, judgment:{ on:['dayPillar'], value:['戊戌']}},
      { trigger:{ on:['dayPillar'], value:['己丑']}, judgment:{ on:['dayPillar'], value:['己丑']}},
      { trigger:{ on:['dayPillar'], value:['庚辰']}, judgment:{ on:['dayPillar'], value:['庚辰']}},
      { trigger:{ on:['dayPillar'], value:['辛巳']}, judgment:{ on:['dayPillar'], value:['辛巳']}},
      { trigger:{ on:['dayPillar'], value:['壬申']}, judgment:{ on:['dayPillar'], value:['壬申']}},
      { trigger:{ on:['dayPillar'], value:['癸亥']}, judgment:{ on:['dayPillar'], value:['癸亥']}}
  ]
},