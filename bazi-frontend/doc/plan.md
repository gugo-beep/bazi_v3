# 项目计划：八字排盘前端应用 (Phase 1)

## 1. 总体目标

构建一个现代、健壮、数据驱动的八字排盘前端展示应用。此应用将能够独立开发和验证，最终与 `bazi-backend` 服务无缝集成。

## 2. 第一阶段核心目标：构建高保真静态原型

在本阶段，我们的核心任务是**完全脱离后端依赖**，创建一个与最终设计在视觉和数据结构上都高度一致的前端原型。此原型将作为后续动态功能开发和后端集成的坚实基础。

## 3. 执行步骤 (Action Plan)

我们将严格遵循以下三步来完成第一阶段的目标：

*   **步骤 1: 确立数据契约 (The Contract)**
    *   **任务**: 定义权威的、统一的前端数据结构。
    *   **产物**: 创建 `bazi-frontend/src/types/bazi.ts` 文件。
    *   **依据**: 此文件的类型定义后端生成的数据，将其作为我们唯一的"事实标准"，结构参考如下。
        1.
         **天干对象 (Gan)**：
          ```json
          {
            "id": "yg",
            "type": "年干",
            "value": "甲",
            "shishen": "比肩",
            "shensha": ["天乙贵人"]
          }
          ```

        - **地支对象 (Zhi)**：
          ```json
          {
            "id": "yz",
            "type": "年支",
            "value": "子",
            "canggan": [
              { "gan": "癸", "shishen": "正印" }
            ],
            "shensha": ["桃花"]
          }
          ```

        - **柱对象 (Pillar)**：
          这是一个基础接口，不同类型的柱会继承并扩展它。

          - **原局柱 (OriginalPillar)**：
            ```json
            {
              "id": "yp",
              "type": "年柱",
              "value": "甲子",
              "gan": { /* Gan Object */ },
              "zhi": { /* Zhi Object */ },
              "nayin": "海中金",
              "shensha": ["亡神"]
            }
            ```

          - **大运柱 (DaYunPillar)**：
            ```json
            {
              "id": "dy1p",
              "type": "大运",
              "value": "乙丑",
              "gan": { /* Gan Object */ },
              "zhi": { /* Zhi Object */ },
              "nayin": "海中金",
              "shensha": [],
              "start_year": 2020,
              "end_year": 2029,
              "start_age": 10,
              "end_age": 19
            }
            ```

          - **流年柱 (LiuNianPillar)**：
            ```json
            {
              "id": "ln0_0p", // 示例ID为起运前流年
              "type": "流年",
              "value": "庚子",
              "gan": { /* Gan Object */ },
              "zhi": { /* Zhi Object */ },
              "nayin": "壁上土",
              "shensha": [],
              "year": 2011,
              "age": 1
              "xiaoYun": {
                  "id": "xy0_0", // 对应的小运ID
                  "value": "辛巳"
              }
            }
            ```
            * **当流年处于“起运前”阶段**：`xiaoYun` 的值为一个包含小运干支信息的**对象**，例如：`{ "id": "xy0_0", "value": "辛巳" }`。
            * **当流年处于正式大运阶段**：`xiaoYun` 的值为 `null`。

          - **刑冲合害部分**：
            为每一个成功生成的ID组合，根据规则的值（例如 { "type": ["六合"], "result": "土" }），创建一个或多个关系对象，并将其推入 relations 数组。
            ```json
            {
              "type": "六合",
              "elements": ["dy1z", "yz"],
              "result": "土" 
            }
            ```
          - **完整结构缩略（基于jest快照测试）**：
            // Jest Snapshot v1, https://goo.gl/fbAQLP

            exports[`八字服务测试套件 generateBaziProfile 基本功能 应该正确生成女性八字信息 1`] = `
            {
              profile: {
                gregorianDate: "2004-03-03 04:15",
                gender: "女",
                dayMaster: "辛"
              },
              pillars: {
                year: {
                  id: "yp",
                  type: "年柱",
                  value: "甲申",
                  nayin: "泉中水",
                  shensha: [],
                  gan: { /* Gan Object */ },
                  zhi: { /* Zhi Object */ },
                },
                month: {
                  id: "mp",
                  //...遵循originalPillar结构
                },
                day: {
                  ...
                },
                hour: {
                  ...
                }
              },
              dayun: [
                {
                  id: "qyq",
                  type: "起运前",
                  value: null,
                  gan: null,
                  zhi: null,
                  nayin: null,
                  shensha: [],
                  start_year: 2004,
                  end_year: 2012,
                  start_age: 1,
                  "liunian": [
                    {
                      "id": "ln0_0p",
                      "type": "流年",
                      // ... 遵循 LiuNianPillar 结构 ...
                    },
                    // ... 更多流年
                  ]
                },
                {
                  id: "dy1p",
                  type: "大运",
                  value: "乙丑",
                  nayin: "海中金",
                  shensha: [],
                  start_year: 2013,
                  end_year: 2022,
                  start_age: 10,
                  gan: { /* Gan Object */ },
                  zhi: { /* Zhi Object */ },
                  "liunian": [
                    {
                      "id": "ln1_0p",
                      "type": "流年",
                      // ... 遵循 LiuNianPillar 结构 ...
                    },
                    // ... 更多流年
                  ]
                },

                // ... 更多大运                                                                                                          
              ],
              relations: [
                {
                  type: "四冲",
                  elements: [
                    "tg",
                    "yg",
                  ],
                  result: null
                },
                {
                  type: "三会",
                  elements: [
                    "dy7z",
                    "dz",
                    "ln7_1z",
                  ],
                  result: "火"
                }
                ....
              ]
            }
            `;
        ---

*   **步骤 2: 创建模拟数据 (The Fuel)**
    *   **任务**: 基于"数据契约"，创建一份内容真实、高保真的本地模拟数据源。
    *   **产物**: 创建 `bazi-frontend/src/app/mock-bazi-data.ts` 文件。
    *   **依据**:
        1.  **结构**: 此文件导出的对象，其类型必须完全符合 `types/bazi.ts` 中的 `BaziProfile` 接口。
        2.  **内容**: 对象中的具体数值（如"甲申"、"泉中水"等）应从后端测试快照 `bazi-backend/src/__snapshots__/baziService.test.js.snap` 中提取，以确保前端渲染的效果与后端真实计算结果一致。

*   **步骤 3: 重构UI界面 (The Engine)**
    *   **任务**: 以"T0级工程师"的标准，从零开始构建一个组件化的、数据驱动的、布局精良的用户界面。
    *   **产物**: 重写 `bazi-frontend/src/app/page.tsx` 文件及相关组件。
    *   **标准**:
        1.  **完全组件化**: 
            - 将UI拆分为逻辑清晰、可复用的组件（如 `PillarDisplay`, `ShenshaDisplay`, `DayunSelector` 等）
            - 采用"组件化+SVG覆盖层"架构，确保页面的高度自适应性和连线的精确定位
            - 为组件实现DOM位置注册机制，使连线组件能够获取各元素的准确位置

        2.  **数据驱动**: 页面所有内容都必须通过 `mockBaziData` 动态渲染，禁止硬编码。

        3.  **交互设计**: 
            - 页面布局分为三个主要区域：顶部(基本信息)、中部(八字数据展示)、底部(大运流年选择器)
            - 中部区域始终显示原局四柱(年月日时)，但大运和流年根据用户选择动态显示
            - 天干地支之间的关系连线使用SVG实现，确保精确绘制和自适应缩放
            - 底部区域实现大运和流年的选择功能，具有以下交互逻辑：
              * 用户选择大运后，显示该大运及其流年选项
              * 起运前特殊处理：无大运，展示小运，点击小运显示对应流年
              * 默认值：自动选择第一个大运(或起运前)及其第一个流年
            - 关系数据(刑冲合害)根据当前选择的大运和流年进行过滤显示，不必全部加载

        4.  **响应式设计**:
            - 使用响应式设计确保应用在不同尺寸的设备上都能正常显示和操作
            - 针对小屏设备优化布局，必要时提供备选显示方式
            - SVG连线能够随着页面尺寸变化自动调整，保持正确的连接关系

        5.  **代码质量**: 
            - 采用React最佳实践，确保代码清晰、可维护
            - 实现组件状态管理，处理组件间的通信和数据流
            - 优化渲染性能，特别是在处理大量关系连线时

## 4. 验证方式

本阶段的交付成果将通过**手动验证**来确认：

1.  开发者在 `bazi-frontend` 目录下运行 `npm run dev`。
2.  在浏览器中打开 `http://localhost:3001`。
3.  **验收标准**: 
    - 页面基本信息、原局四柱正确显示
    - 大运和流年选择器可正常交互
    - 选择不同大运和流年时，主区域内容正确更新
    - 关系连线在不同屏幕尺寸下均能正确显示
    - 在移动设备上依然保持良好的显示效果
    - 整体布局美观、对齐精确