
## 关于lunar

### 快速开始
#### HTML页面
lunar兼容UMD (Universal Module Definition)，同时在IE7上也能正常工作，在页面中直接引入 [lunar.js](lunar.js) 文件即可。建议参考下方html文档模板：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>MyTitle</title>
  </head>
  <body>
    <!-- 使用CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lunar-javascript/1.7.2/lunar.min.js"></script>
    <script>
      console.log(Lunar.fromDate(new Date()).toFullString());
      console.log(Solar.fromYmd(2016, 1, 1).toFullString());

      console.log(HolidayUtil.getHoliday(2020, 5, 2) + '');
    </script>
  </body>
</html>

```

#### Node.js (同uni-app)
```
const {Solar, Lunar, HolidayUtil} = require('./lunar')
// const {Solar, Lunar, HolidayUtil} = require('./lunar.js')

console.log(Lunar.fromDate(new Date()).toFullString())
console.log(Solar.fromYmd(2016, 1, 1).toFullString())

console.log(HolidayUtil.getHoliday(2020, 5, 2) + '')
```

#### NPM
```
// https://www.npmjs.com/package/lunar-javascript
npm init
npm install lunar-javascript
const {Solar, Lunar, HolidayUtil} = require('lunar-javascript')
console.log(Lunar.fromDate(new Date()).toFullString())
console.log(Solar.fromYmd(2016, 1, 1).toFullString())
console.log(HolidayUtil.getHoliday(2020, 5, 2) + '')
```

#### NPM typescript
```
// https://www.npmjs.com/package/lunar-typescript
npm init
npm i typescript -D
npm i ts-node -D
npm i lunar-typescript
// demo.ts
import {Solar, Lunar, HolidayUtil} from 'lunar-typescript';
console.log(Lunar.fromDate(new Date()).toFullString())
console.log(Solar.fromYmd(2016, 1, 1).toFullString())
console.log(HolidayUtil.getHoliday(2020, 5, 2) + '')
// 运行
ts-node demo.ts
```

#### java
```
// https://search.maven.org/artifact/cn.6tail/lunar
// maven
cn.6tail
lunar
1.7.3
// gradle
implementation 'cn.6tail:lunar:1.7.3'
import com.nlf.calendar.Lunar;
import com.nlf.calendar.Solar;
import com.nlf.calendar.util.HolidayUtil;
System.out.println(Lunar.fromDate(new Date()).toFullString());
System.out.println(Solar.fromYmd(2016, 1, 1).toFullString());
System.out.println(HolidayUtil.getHoliday(2020, 5, 2));
```
#### c#.net
```
// https://www.nuget.org/packages/lunar-csharp
using Lunar;
using Lunar.Util;
Console.WriteLine(Lunar.Lunar.FromDate(DateTime.Now).FullString);
Console.WriteLine(Solar.FromYmd(2016, 1, 1).FullString);
Console.WriteLine(HolidayUtil.GetHoliday(2020, 5, 2));
```
#### php(composer)
```
// https://packagist.org/packages/6tail/lunar-php
composer require 6tail/lunar-php
php
require 'vendor/autoload.php';
use com\nlf\calendar\Lunar;
use com\nlf\calendar\util\HolidayUtil;
$lunar = Lunar::fromYmd(1986, 4, 21);
echo $lunar-toFullString()."\n";
echo $lunar->getSolar()->toFullString()."\n";
echo HolidayUtil::getHoliday('2020-05-02')."\n";
```

#### php(单文件)
```
<?php
require 'Lunar.php';
use com\nlf\calendar\Lunar;
use com\nlf\calendar\util\HolidayUtil;
$lunar = Lunar::fromYmd(1986, 4, 21);
echo $lunar-toFullString()."\n";
echo $lunar->getSolar()->toFullString()."\n";
echo HolidayUtil::getHoliday('2020-05-02')."\n";
```

#### python
```python
// https://pypi.org/project/lunar\_python/
$ pip install lunar\_python
# -\*- coding: utf-8 -\*-
from lunar\_python import Lunar
from lunar\_python.util import HolidayUtil
lunar = Lunar.fromYmd(1986, 4, 21)
print(lunar.toFullString())
print(lunar.getSolar().toFullString())
print(HolidayUtil.getHoliday('2020-05-02'))
```

#### go
```
go get github.com/6tail/lunar-go
package main
import (
"fmt"
"github.com/6tail/lunar-go/HolidayUtil"
"github.com/6tail/lunar-go/calendar"
)
func main() {
lunar := calendar.NewLunarFromYmd(1986, 4, 21)
fmt.Println(lunar.ToFullString())
fmt.Println(lunar.GetSolar().ToFullString())
holiday := HolidayUtil.GetHoliday("2020-01-01")
fmt.Println(holiday)
}
```

#### flutter
```
// https://pub.dev/packages/lunar
dependencies:
lunar: ^1.7.4
import 'package:lunar/lunar.dart';
void main() {
Lunar lunar = Lunar.fromYmd(1986, 4, 21);
print(lunar.toFullString());
print(lunar.getSolar().toFullString());
Holiday? holiday = HolidayUtil.getHolidayByYmd(2020, 1, 1);
print(holiday);
}
```

#### OC
 可采用调用js的方式
```
NSString \*lunarJsFile = [[NSBundle mainBundle] pathForResource:@"lunar" ofType:@"js"];
NSString \*lunarJsContent = [NSString stringWithContentsOfFile:lunarJsFile
encoding:NSUTF8StringEncoding
error:nil];
self.jsHandle = [[JSContext alloc]init];
[self.jsHandle evaluateScript:lunarJsContent];
JSValue \*lunarFromDate = self.jsHandle[@"Lunar"][@"fromDate"];
JSValue \*lunar = [lunarFromDate callWithArguments:@[NSDate.date]];
JSValue \*fullString = [lunar invokeMethod:@"toFullString" withArguments:nil];
```
> 也可尝试调用LunarSwift

#### Swift
```
pod "LunarSwift"
let lunar = Lunar.fromYmdHms(lunarYear: 1986, lunarMonth: 4, lunarDay: 21)
print(lunar.description)
print(lunar.solar.fullString)
```

#### Tasker
```
// 建议库地址填写最新版的CDN地址
var solar = Solar.fromDate(new Date());
var lunar = solar.getLunar();
flash(lunar.toFullString());
```

### 疑难解答
【问】为什么我的java代码日期转阴历，干支总是错的？
【答】你使用了SimpleDateFormat来将字符串转换为Date类型？
用SimpleDateFormat来将北京时间转换为日期，你以为转出来的是东八区(GMT+8)，实际上SimpleDateFormat是个坑货，夏令时你会得到一个东九区(GMT+9)的日期，这就有1个小时的偏差。
举个栗子：当你使用2021-01-01来转换的时候，想得到2021-01-01 00:00:00的北京时间，实际上，你得到了2020-12-31 23:00:00的北京时间。
解决办法有二（任选其一均可）：
1. 使用当地时区和当地时间。
2. 统一使用GMT+8的时区和时间，代码示例：
SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
// 关键是下边这一行
format.setTimeZone(TimeZone.getTimeZone("GMT+8"));
Date date = format.parse("1986-08-14");
总之，你一定要明确你的日期对象使用的时区，这一点非常重要！

【问】是否支持真太阳时？
【答】暂不支持。
建议你使用平太阳时和真太阳时的转换代码，转换之后再传入lunar。

【问】为什么我用Lunar.fromYmd(2022, 1, 1)不是二〇二一年冬月廿九，而是二〇二二年正月初一？
【答】太多人犯这个错误，自认为Lunar.fromYmd就是阳历转阴历。
建议多看文档，少猜测。Lunar.fromYmd是通过传入阴历年月日来初始化。
正确的阳历转阴历方式为：
Solar.fromYmd(2022, 1, 1).getLunar();

【问】为什么1582年10月少了10天？
【答】我们现在使用的公历是格里历，这个历法的前身是儒略历法。儒略历法是罗马共和国于公元前45年1月1日起执行的，目的是取代旧罗马历法。在儒略历法中，一年被划分为12个月，单数月份31天，双数月份除2月份外30天，2月份平年29天，闰年30天，因此全年天数平年365天，闰年366天，年平均长度为365.25天。
而在天文学中，地球环绕太阳转动一圈的时间才是真正意义上的一天，周期约是365.2422天。因此，使用儒略历法之后，每年多算了11分钟14秒。由于误差不太大，头几年没什么关系，但是，一年又一年，误差累积起来，儒略历法就与实际的太阳年不合拍了。
到了16世纪，这个偏差已经达到了10天。于是在1582年，当时的教皇于1582年2月24日以教皇训令颁布，将1582年10月5日至14日抹掉，于是这10天就消失了，一去不复返。1582年10月4日过完了，第二天已经是10月15日了，于是历法又回到与太阳年同步。这便是今天世界上通用的历法——格里高利历，简称格里历，也就是我们说的公历。

【问】为什么100年是闰年？
【答】我们都以为闰年规则为：四年一闰，百年不闰，四百年再闰。
殊不知这个规则是格里历的规则，也就是1582年开始执行的。
而在这之前，采用的是儒略历，简单粗暴，每4年一闰，所以，100年是闰年。

【问】为什么存在连续两年都有闰月的情况？
【答】古时候的历法感觉比较混乱，查 寿星天文历 可以看到，阴历23年存在2个十二月的情况，阴历24年又闰五月。
为了兼容阴历和阳历的互转，我刻意的将23年第1个十二月，改为了闰十一月（即闰冬月）。
除此之外，查 寿星天文历 可以看到，农历237年没有三月的特殊情况。我想静静。


### 多语言支持
自v1.6.0起，lunar开始支持多语言功能。

由于多语言为实验特性，如遇报错或未正常输出，请退回1.6.0以下的版本或在初始化时先调用一次I18n.init()。由于不同开发语言的机制不同，后续仅维持javascript和typescript版的多语言支持。

由于个人精力有限，原生不完整的支持简体中文(chs)、英文(en)，默认为简体中文，你可以根据自己的需要自定义任何语言。
1. I18n.setLanguage(lang)
> 指定`语言(字符串)`，默认可选chs、en，也可选择自定义的语言。
2. I18n.getLanguage()
> 获取当前语言
3. I18n.setMessages(lang, messages)
> 自定义语言，或更新已有的语言。`lang`为语言名称，`messages`为对应配置表。
4. I18n.getMessage(key)
> 根据`key`动态获取当前语言下的`字符串值`。

请参考[多语言配置表](i18n-messages.html)，如果对应语言的值未配置时，将自动应用简体中文。
> 注意：lunar不会持久化存储您的自定义语言配置，建议自建多语言配置表，启动时调用setMessages初始化。

#### 示例代码
```javascript
// 2023年正月初一
var lunar = Lunar.fromYmd(2023, 1, 1);
// 生肖：兔
console.log(lunar.getYearShengXiao());
// 设置为英语
I18n.setLanguage('en');
// 英语生肖：rabbit
console.log(lunar.getYearShengXiao());
// 自定义语言
I18n.setMessages('韩语', {
'sx.tiger': '호랑이',
'sx.rabbit': '토끼'
});
// 设置为韩语
I18n.setLanguage('韩语');
// 韩语生肖：토끼
console.log(lunar.getYearShengXiao());
// 修改
I18n.setMessages('chs', {
'sx.tiger': '病猫',
'sx.rabbit': '小兔兔'
});
// 设置为简体中文
I18n.setLanguage('chs');
// 简体中文生肖：小兔兔
console.log(lunar.getYearShengXiao());
```
> 输出
兔
Rabbit
토끼
小兔兔

## 阳历Solar

### 实例化
阳历的实例化有以下几种方式：
1. Solar.fromYmd(year, month, day)
> 指定`阳历年(数字)`、`阳历月(数字)`、`阳历日(数字)`生成阳历对象。注意月份为1到12。
2. Solar.fromYmdHms(year, month, day, hour, minute, second)
> 指定`阳历年(数字)`、`阳历月(数字)`、`阳历日(数字)`、`阳历小时(数字)`、`阳历分钟(数字)`、`阳历秒钟(数字)`生成阳历对象。注意月份为1到12。
3. Solar.fromDate(date)
> 指定`日期(Date)`生成阳历对象
4. Solar.fromJulianDay(julianDay)
> 指定`儒略日(小数)`生成阳历对象
5. Solar.fromBaZi(yearGanZhi, monthGanZhi, dayGanZhi, timeGanZhi, sect, baseYear)
> 通过八字`年柱`、`月柱`、`日柱`、`时柱`获取匹配的阳历列表。`sect`为流派，可选1或2，不传则默认为2。`baseYear`为起始年份，支持最小传1，不传则默认为1900。该方法可能返回多条满足条件的记录。

#### 示例代码
```javascript
// 年月日
var d = Solar.fromYmd(2016, 1, 1);
console.log(d);
// 年月日时分秒
d = Solar.fromYmdHms(2016, 1, 1, 20, 35, 0);
console.log(d);
// 日期
d = Solar.fromDate(new Date());
console.log(d.toFullString());
// 儒略日
d = Solar.fromJulianDay(2458960.5);
console.log(d.toFullString());
// 八字反推阳历
var l = Solar.fromBaZi('庚子', '辛巳', '庚午', '丙子');
for (var i=0, j=l.length; i < j; i++) {
d = l[i];
console.log(d.toFullString());
}
```
```python
# 年月日
d = Solar.fromYmd(2016, 1, 1)
print d
# 年月日时分秒
d = Solar.fromYmdHms(2016, 1, 1, 20, 35, 0)
print d
# 日期
d = Solar.fromDate(datetime.now())
print d.toFullString()
# 儒略日
d = Solar.fromDate(datetime.now())
print d.toFullString()
# 八字反推阳历
l = Solar.fromBaZi("庚子", "戊子", "己卯", "庚午")
for solar in l:
print solar.toFullString()
```
> 输出
2016-01-01
2016-01-01
2025-05-19 08:56:03 星期一 金牛座
2020-04-21 00:00:00 闰年 星期二 金牛座

1960-08-05 22:00:00 闰年 星期五 狮子座
2020-07-21 22:00:00 闰年 星期二 巨蟹座

### toString
阳历对象可以使用多种字符串输出方式：
1. .toString()
> 阳历对象的默认字符串输出
2. .toFullString()
> 阳历对象的全量字符串输出，包含尽量多的信息
3. .toYmd()
> 阳历对象的YYYY-MM-DD字符串输出
4. .toYmdHms()
> 阳历对象的YYYY-MM-DD HH:mm:ss字符串输出
#### 示例代码
```javascript
// 实例化
var d = Solar.fromDate(new Date());
// 默认字符串输出
console.log(d);
console.log(d.toString());
// YYYY-MM-DD
console.log(d.toYmd());
// YYYY-MM-DD HH:mm:ss
console.log(d.toYmdHms());
// 全量字符串输出
console.log(d.toFullString());
```
```python
# 实例化
d = Solar.fromDate(datetime.now())
# 默认字符串输出
print d
print d.toString()
# YYYY-MM-DD
print d.toYmd()
# YYYY-MM-DD HH:mm:ss
print d.toYmdHms()
# 全量字符串输出
print d.toFullString()
```
> 输出
2025-05-19
2025-05-19
2025-05-19
2025-05-19 09:00:07
2025-05-19 09:00:07 星期一 金牛座

### 获取年、月、日
1. .getYear()
> 获取阳历年
2. .getMonth()
> 获取阳历月
3. .getDay()
> 获取阳历日
#### 示例代码
```javascript
var d = Solar.fromDate(new Date());
console.log(d.getYear());
console.log(d.getMonth());
console.log(d.getDay());
```
```python
d = Solar.fromDate(datetime.now())
print d.getYear()
print d.getMonth()
print d.getDay()
```
> 输出
2025
5
19

### 获取星期
阳历对象提供两种星期表示方式：
1. .getWeek()
> 获取星期数字，0代表星期日，1代表星期一，6代表星期六
2. .getWeekInChinese()
> 获取星期的中文：日一二三四五六
#### 示例代码

```javascript
var d = Solar.fromDate(new Date());
console.log(d.getWeek());
console.log(d.getWeekInChinese());
```

```python
d = Solar.fromDate(datetime.now())
print d.getWeek()
print d.getWeekInChinese()
```
> 输出
1
一

### 是否闰年
1. .isLeapYear()
> 返回`true`/`false`，`true`代表闰年，`false`代表非闰年。
#### 示例代码
```javascript
var d = Solar.fromDate(new Date());
console.log(d.isLeapYear());
```

```python
d = Solar.fromDate(datetime.now())
print d.isLeapYear()
```
> 输出
false

### 阳历日期推移
1. .next(days) 或 .nextDay(days)
> `days(数字)`为推移的天数，正数为往后推，负数为往前推。返回推移后那天的阳历对象。
2. .next(days, onlyWorkday)
> `days(数字)`为推移的天数，正数为往后推，负数为往前推。`onlyWorkday(布尔)`为true时仅按工作日推移（法定节假日和正常的周六、周日不算，节假日调休的按工作日计算）。返回推移后那天的阳历对象。
3. .nextHour(hours)
> `hours(数字)`为推移的小时数，正数为往后推，负数为往前推。返回推移后的阳历对象。
4. .nextMonth(months)
> `months(数字)`为推移的月数，正数为往后推，负数为往前推。返回推移后的阳历对象。
5. .nextYear(years)
> `years(数字)`为推移的年数，正数为往后推，负数为往前推。返回推移后的阳历对象。
由于某些语言不支持同名方法，工作日推移的方法更改为`.nextWorkday(days)`。
#### 示例代码
```javascript
var d = Solar.fromDate(new Date());
// 往后推两天，即后天
console.log(d.next(2));
// 往前推1天，即昨天
console.log(d.next(-1));
// 往后推2个工作日
console.log(d.next(2, true));
// 往前推1个工作日
console.log(d.next(-1, true));
```
```python
d = Solar.fromDate(datetime.now())
# 往后推两天，即后天
print d.next(2)
# 往前推1天，即昨天
print d.next(-1)
# 往后推2个工作日
print d.nextWorkday(2)
# 往前推1个工作日
print d.nextWorkday(-1)
```
> 输出
2025-05-21
2025-05-18
2025-05-21
2025-05-16

### 阳历日期相减

1. .subtract(solar)
> 参数`solar(阳历对象)`。返回间隔天数。a.subtract(b) = a - b，当`a`晚于`b`时，结果为正整数。
2. .subtractYear(solar)
> 参数`solar(阳历对象)`。返回间隔年数。
3. .subtractMonth(solar)
> 参数`solar(阳历对象)`。返回间隔月数。
4. .subtractHour(solar)
> 参数`solar(阳历对象)`。返回间隔小时数。
5. .subtractMinute(solar)
> 参数`solar(阳历对象)`。返回间隔分钟数。
#### 示例代码
```JavaScript
var a = Solar.fromYmd(1582, 10, 15);
var b = Solar.fromYmd(1582, 10, 4);
console.log(a.subtract(b));
```
```python
a = Solar.fromYmd(1582, 10, 15)
b = Solar.fromYmd(1582, 10, 4)
print a.subtract(b)
```
> 输出
1

### 阳历日期比较
1. .isBefore(solar)
> 参数`solar(阳历对象)`。返回布尔值。a.isBefore(b) 当`a`比`b`早时，返回`true`，否则返回`false`。
2. .isAfter(solar)
> 参数`solar(阳历对象)`。返回布尔值。a.isAfter(b) 当`a`比`b`晚时，返回`true`，否则返回`false`。
#### 示例代码
```JavaScript
var a = Solar.fromYmd(1582, 10, 15);
var b = Solar.fromYmd(1582, 10, 4);
console.log(a.isBefore(b));
```
```python
a = Solar.fromYmd(1582, 10, 15)
b = Solar.fromYmd(1582, 10, 4)
print a.isBefore(b)
```
> 输出
false

### 阳历转阴历
阳历和阴历之间的相互转换，必须得支持才行。
1. .getLunar()
> 返回对应的阴历对象。
### 示例代码
```JavaScript
// 实例化
var solar = Solar.fromDate(new Date());
console.log(solar);
// 转阴历
var lunar = solar.getLunar();
console.log(lunar.toString());
console.log(lunar.toFullString());
```
```python
# 实例化
solar = Solar.fromDate(datetime.now())
print solar
# 转阴历
lunar = solar.getLunar()
print lunar.toString()
print lunar.toFullString()
```
> 输出
2025-05-19
二〇二五年四月廿二
二〇二五年四月廿二 乙巳(蛇)年 辛巳(蛇)月 戊子(鼠)日 未(羊)时 纳音[覆灯火 白蜡金 霹雳火 天上火] 星期一 西方白虎 星宿[毕月乌](吉) 彭祖百忌[戊不受田田主不祥 子不问卜自惹祸殃] 喜神方位[巽](东南) 阳贵神方位[艮](东北) 阴贵神方位[坤](西南) 福神方位[艮](东北) 财神方位[坎](正北) 冲[(壬午)马] 煞[南]

## 阳历周SolarWeek

### 实例化

阳历周的实例化有以下几种方式：
1. SolarWeek.fromYmd(year, month, day, start)
> 指定`阳历年(数字)`、`阳历月(数字)`、`阳历日(数字)`、`星期几作为一周的开始(数字)`生成阳历周对象。注意start值为1234560分别代表星期一至星期天。
2. SolarWeek.fromDate(date, start)
> 指定`日期(Date)`、`星期几作为一周的开始(数字)`生成阳历周对象。注意start值为1234560分别代表星期一至星期天。
注意：一定要记得start参数，因为常见的周计算方式，有把星期一作为一周的起点，也有把星期日作为一周的起点，不同的起点计算周相关信息时会出现很大的出入。
有人会问为什么不设置一个默认值，因为一旦使用默认值，使用者不会引起注意，结果与他期望的不同，他就会觉得这玩意儿一点都不准。我需要使用者明确知道自己使用的是哪种计算方式。
### 示例代码
```
var d = SolarWeek.fromYmd(2016,1,1,1);
console.log(d);
console.log(d.toFullString());
```
> 输出
2016.1.1
2016年1月第1周

### toString
阳历周对象可以使用两种字符串输出方式：
1. .toString()
> 阳历周对象的默认字符串输出，格式为：YYYY.M.I（I为数字，从1开始计，表示本月第几周）
2. .toFullString()
> 阳历周对象的全量字符串输出，包含尽量多的信息
#### 示例代码
```
//实例化
var d = SolarWeek.fromDate(new Date(),1);
//默认字符串输出
console.log(d);
console.log(d.toString());
//全量字符串输出
console.log(d.toFullString());
```
> 输出
2025.5.4
2025.5.4
2025年5月第4周

### 获取年、月、日
1. .getYear()
> 获取阳历年
2. .getMonth()
> 获取阳历月
3. .getDay()
> 获取阳历日
#### 示例代码
```
var d = SolarWeek.fromDate(new Date(),1);
console.log(d.getYear());
console.log(d.getMonth());
console.log(d.getDay());
```
> 输出
2025
5
19

### 一周的起点
获取阳历周对象的星期几作为一周的开始，1234560分别代表星期一至星期天。
事实上你设置的起点是几，返回结果就是几，用不用，就看你心情了。
1. .getStart()
> 获取阳历周对象的星期几作为一周的开始，1234560分别代表星期一至星期天。
#### 示例代码
```
var d = SolarWeek.fromDate(new Date(),1);
console.log(d.getStart());
```
> 输出
1

### 本月第几周
获取当前日期是在当月第几周，返回序号从1开始。
1. .getIndex()
> 返回序号：1、2、3、4等
#### 示例代码
```
//以星期一作为一周的起点
var d = SolarWeek.fromDate(new Date(),1);
console.log(d.getIndex());
//以星期日作为一周的起点
d = SolarWeek.fromDate(new Date(),0);
console.log(d.getIndex());
```
> 输出
4
4

### 本年第几周
获取当前日期是在当年第几周，返回序号从1开始。
1. .getIndexInYear()
> 返回序号：1、2、3、4等
#### 示例代码
```JavaScript
//v1.2.28
// 以星期一作为一周的起点
var d = SolarWeek.fromDate(new Date(), 1);
console.log(d.getIndexInYear());
// 以星期日作为一周的起点
d = SolarWeek.fromDate(new Date(), 0);
console.log(d.getIndexInYear());
```
> 输出
21
21

### 本周每一天
获取阳历周对象中每一天的阳历对象，有可能出现某些天跨月的现象。
1. .getDays()
> 获取阳历周对象中每一天的阳历对象（可能跨月），返回一个数组。
2. .getDaysInMonth()
> 获取阳历周对象中每一天的阳历对象（把跨月的部分丢弃掉），返回一个数组。
#### 示例代码
```
//以星期一作为一周的起点
var d = SolarWeek.fromDate(new Date(),1);
var days = d.getDays();
for(var i=0,j=days.length;i<j;i++){
    console.log(days[i].toFullString());
}
//以星期日作为一周的起点
d = SolarWeek.fromDate(new Date(),0);
days = d.getDays();
for(var i=0,j=days.length;i<j;i++){
    console.log(days[i].toFullString());
}
```
> 输出
2025-05-19 00:00:00 星期一 金牛座
2025-05-20 00:00:00 星期二 金牛座
2025-05-21 00:00:00 星期三 双子座
2025-05-22 00:00:00 星期四 双子座
2025-05-23 00:00:00 星期五 双子座
2025-05-24 00:00:00 星期六 双子座
2025-05-25 00:00:00 星期日 双子座

2025-05-18 00:00:00 星期日 (全国助残日) 金牛座
2025-05-19 00:00:00 星期一 金牛座
2025-05-20 00:00:00 星期二 金牛座
2025-05-21 00:00:00 星期三 双子座
2025-05-22 00:00:00 星期四 双子座
2025-05-23 00:00:00 星期五 双子座
2025-05-24 00:00:00 星期六 双子座

### 第一天
获取阳历周对象中的第一天，有可能出现跨月的现象。
1. .getFirstDay()
> 获取阳历周对象中第一天的阳历对象（可能是上月的）。
2. .getFirstDayInMonth()
> 获取阳历周对象中第一天的阳历对象（只算本月的，如果第一天是上月，则往后顺延）。
#### 示例代码
```
//以星期一作为一周的起点
var d = SolarWeek.fromDate(new Date(),1);
console.log(d.getFirstDay().toFullString());
//以星期日作为一周的起点
d = SolarWeek.fromDate(new Date(),0);
console.log(d.getFirstDay().toFullString());
```
> 输出
2025-05-19 00:00:00 星期一 金牛座

2025-05-18 00:00:00 星期日 (全国助残日) 金牛座

### 周推移
获取加(减)几周后(前)的阳历周对象。
按月单独计算时，如果中间某一周有跨月现象，则那一周会当作2周计。
1. .next(weeks, separateMonth)
> 返回阳历周对象。  
`weeks(数字)`：推移的周数，正数为往后推，负数为往前推。  
`separateMonth(布尔，默认false)`：是否按月单独计算，true按月单独计算，false遇跨月也算一周。
#### 示例代码
```
var d = SolarWeek.fromDate(new Date(),1);
//往后推两周
console.log(d.next(2));
//往前推1周，即上周
console.log(d.next(-1));
```
> 输出
2025.6.2
2025.5.3

## 阳历月SolarMonth

### 实例化
阳历月的实例化有以下几种方式：
1. SolarMonth.fromYm(year, month)
> 指定`阳历年(数字)`、`阳历月(数字)`生成阳历月对象。
2. SolarMonth.fromDate(date)
> 指定`日期(Date)`生成阳历月对象。
#### 示例代码
```
var d = SolarMonth.fromYm(2016,1);
console.log(d);
console.log(d.toFullString());
```
> 输出
2016-1
2016年1月

### toString
阳历月对象可以使用两种字符串输出方式：
1. .toString()
> 阳历月对象的默认字符串输出，格式为：YYYY-M
2. .toFullString()
> 阳历月对象的全量字符串输出，格式为：YYYY年M月
#### 示例代码
```
//实例化
var d = SolarMonth.fromDate(new Date());
//默认字符串输出
console.log(d);
console.log(d.toString());
//全量字符串输出
console.log(d.toFullString());
```
> 输出
2025-5
2025-5
2025年5月

### 获取年、月
1. .getYear()
> 获取阳历年
2. .getMonth()
> 获取阳历月
#### 示例代码
```
var d = SolarMonth.fromDate(new Date());
console.log(d.getYear());
console.log(d.getMonth());
```
> 输出
2025
5

### 本月每一天
获取阳历月对象中每一天的阳历对象。
1. .getDays()
> 返回一个阳历对象的数组。
#### 示例代码
```
var d = SolarMonth.fromDate(new Date());
var days = d.getDays();
for(var i=0,j=days.length;i<j;i++){
    console.log(days[i].toFullString());
}
```
> 输出
2025-05-01 00:00:00 星期四 (劳动节) 金牛座
2025-05-02 00:00:00 星期五 金牛座
2025-05-03 00:00:00 星期六 金牛座
2025-05-04 00:00:00 星期日 (青年节) 金牛座
2025-05-05 00:00:00 星期一 金牛座
2025-05-06 00:00:00 星期二 金牛座
2025-05-07 00:00:00 星期三 金牛座
2025-05-08 00:00:00 星期四 金牛座
2025-05-09 00:00:00 星期五 金牛座
2025-05-10 00:00:00 星期六 金牛座
2025-05-11 00:00:00 星期日 (母亲节) 金牛座
2025-05-12 00:00:00 星期一 金牛座
2025-05-13 00:00:00 星期二 金牛座
2025-05-14 00:00:00 星期三 金牛座
2025-05-15 00:00:00 星期四 金牛座
2025-05-16 00:00:00 星期五 金牛座
2025-05-17 00:00:00 星期六 金牛座
2025-05-18 00:00:00 星期日 (全国助残日) 金牛座
2025-05-19 00:00:00 星期一 金牛座
2025-05-20 00:00:00 星期二 金牛座
2025-05-21 00:00:00 星期三 双子座
2025-05-22 00:00:00 星期四 双子座
2025-05-23 00:00:00 星期五 双子座
2025-05-24 00:00:00 星期六 双子座
2025-05-25 00:00:00 星期日 双子座
2025-05-26 00:00:00 星期一 双子座
2025-05-27 00:00:00 星期二 双子座
2025-05-28 00:00:00 星期三 双子座
2025-05-29 00:00:00 星期四 双子座
2025-05-30 00:00:00 星期五 双子座
2025-05-31 00:00:00 星期六 双子座

### 本月每一周
获取阳历月对象中每一周的阳历对象。
1. .getWeeks(start)
> 返回一个阳历周对象的数组。  
`start`：星期几作为一周的开始，1234560分别代表星期一至星期天
#### 示例代码
```
var d = SolarMonth.fromDate(new Date());
var weeks = d.getWeeks(1);
for(var i=0,j=weeks.length;i<j;i++){
    console.log(weeks[i].toFullString());
}
```
> 输出
2025年5月第1周
2025年5月第2周
2025年5月第3周
2025年5月第4周
2025年5月第5周

### 阳历月的推移
获取加(减)几月后(前)的阳历月对象。
1. .next(months)
> 返回阳历月对象。  
`months(数字)`：推移的月数，正数为往后推，负数为往前推。
#### 示例代码
```
var d = SolarMonth.fromDate(new Date());
//往后推2月
console.log(d.next(2).toFullString());
```
> 输出
2025年7月

## 阳历季度SolarSeason

### 实例化
阳历季度的实例化有以下几种方式：
1. SolarSeason.fromYm(year, month)
> 指定`阳历年(数字)`、`阳历月(数字)`生成阳历季度对象。
2. SolarSeason.fromDate(date)
> 指定`日期(Date)`生成阳历季度对象。
#### 示例代码
```
var d = SolarSeason.fromYm(2016,1);
console.log(d);
console.log(d.toFullString());
```
> 输出
2016.1
2016年1季度

### toString
阳历季度对象可以使用两种字符串输出方式：
1. .toString()
> 阳历季度对象的默认字符串输出，格式为：YYYY-I，I为季度序号：1、2、3、4
2. .toFullString()
> 阳历季度对象的全量字符串输出，格式为：YYYY年I季度，I为季度序号：1、2、3、4
#### 示例代码
```
//实例化
var d = SolarSeason.fromDate(new Date());
//默认字符串输出
console.log(d);
console.log(d.toString());
//全量字符串输出
console.log(d.toFullString());
```
> 输出
2025.2
2025.2
2025年2季度

### 获取年、月
1. .getYear()
> 获取阳历年
2. .getMonth()
> 获取阳历月
#### 示例代码
```
var d = SolarSeason.fromDate(new Date());
console.log(d.getYear());
console.log(d.getMonth());
```
> 输出
2025
5

### 本年第几季度
获取阳历季度在一年中的序号，123月为1季度，456月为2季度。
1. .getIndex()
> 返回序号：1、2、3、4
#### 示例代码
```
var d = SolarSeason.fromDate(new Date());
console.log(d.getIndex());
```
> 输出
2

### 本季度每一月
获取阳历季度对象中的每一月。
1. .getMonths()
> 返回一个阳历月对象的数组。
#### 示例代码
```
var d = SolarSeason.fromDate(new Date());
var months = d.getMonths();
for(var i=0,j=months.length;i<j;i++){
    console.log(months[i].toFullString());
}
```
> 输出
2025年4月
2025年5月
2025年6月

### 季度推移
获取加(减)几月后(前)的阳历季度对象。
1. .next(seasons)
> 返回阳历季度对象。  
`seasons(数字)`：推移的季度数，正数为往后推，负数为往前推。
#### 示例代码
```
var d = SolarSeason.fromDate(new Date());
//往后推2季度
console.log(d.next(2).toFullString());
```
> 输出
2025年4季度

## 阳历半年SolarHalfYear

### 实例化
阳历半年的实例化有以下几种方式：
1. SolarMonth.fromYm(year, month)
> 指定`阳历年(数字)`、`阳历月(数字)`生成阳历半年对象。
2. SolarMonth.fromDate(date)
> 指定`日期(Date)`生成阳历半年对象。
#### 示例代码
```
var d = SolarHalfYear.fromYm(2016,1);
console.log(d);
console.log(d.toFullString());
```
> 输出
2016.1
2016年上半年

### toString
阳历半年对象可以使用两种字符串输出方式：
1. .toString()
> 阳历半年对象的默认字符串输出，格式为：YYYY-I，I为半年序号：1、2
2. .toFullString()
> 阳历半年对象的全量字符串输出，格式为：YYYY年I半年，I值为：上、下
#### 示例代码
```
//实例化
var d = SolarHalfYear.fromDate(new Date());
//默认字符串输出
console.log(d);
console.log(d.toString());
//全量字符串输出
console.log(d.toFullString());
```
> 输出
2025.1
2025.1
2025年上半年

### 获取年、月
1. .getYear()
> 获取阳历年
2. .getMonth()
> 获取阳历月
#### 示例代码
```
var d = SolarHalfYear.fromDate(new Date());
console.log(d.getYear());
console.log(d.getMonth());
```
> 输出
2025
5

### 本年第几半年
获取阳历半年在一年中的序号，123456月为1半年。
1. .getIndex()
> 返回序号：1、2
#### 示例代码
```
var d = SolarHalfYear.fromDate(new Date());
console.log(d.getIndex());
```
> 输出
1

### 本半年每一月
获取阳历半年对象中的每一月。
1. .getMonths()
> 返回一个阳历月对象的数组。
#### 示例代码
```
var d = SolarHalfYear.fromDate(new Date());
var months = d.getMonths();
for(var i=0,j=months.length;i<j;i++){
    console.log(months[i].toFullString());
}
```
> 输出
2025年1月
2025年2月
2025年3月
2025年4月
2025年5月
2025年6月

### 半年推移
获取加(减)几月后(前)的阳历半年对象。
1. .next(halfYears)
> 返回阳历半年对象。  
`halfYears(数字)`：推移的半年数，正数为往后推，负数为往前推。
#### 示例代码
```
var d = SolarHalfYear.fromDate(new Date());
//往后推2半年
console.log(d.next(2).toFullString());
```
> 输出
2026年上半年

## 阳历年SolarYear

### 实例化
阳历年的实例化有以下几种方式：
1. SolarYear.fromYear(year)
> 指定`阳历年(数字)`生成阳历年对象。
2. SolarYear.fromDate(date)
> 指定`日期(Date)`生成阳历年对象。
### 示例代码
```
var d = SolarYear.fromYear(2016);
console.log(d);
console.log(d.toFullString());
```
> 输出
2016
2016年

### toString
阳历年对象可以使用两种字符串输出方式：
1. .toString()
> 阳历年对象的默认字符串输出，格式为：YYYY
2. .toFullString()
> 阳历年对象的全量字符串输出，格式为：YYYY年
#### 示例代码
```
//实例化
var d = SolarYear.fromDate(new Date());
//默认字符串输出
console.log(d);
console.log(d.toString());
//全量字符串输出
console.log(d.toFullString());
```
> 输出
2025
2025
2025年

### 获取年
1. .getYear()
> 获取阳历年
#### 示例代码
```
var d = SolarYear.fromDate(new Date());
console.log(d.getYear());
```
> 输出
2025

### 本年每一月
获取阳历年对象中的每一月。
1. .getMonths()
> 返回一个阳历月对象的数组。
### 示例代码
```
var d = SolarYear.fromDate(new Date());
var months = d.getMonths();
for(var i=0,j=months.length;i<j;i++){
    console.log(months[i].toFullString());
}
```
> 输出
2025年1月
2025年2月
2025年3月
2025年4月
2025年5月
2025年6月
2025年7月
2025年8月
2025年9月
2025年10月
2025年11月
2025年12月

### 阳历年的推移
获取加(减)几月后(前)的阳历年对象。
1. .next(years)
> 返回阳历年对象。  
`years(数字)`：推移的年数，正数为往后推，负数为往前推。
#### 示例代码
```
var d = SolarYear.fromDate(new Date());
//往后推2年
console.log(d.next(2).toFullString());
```
> 输出
2027年

## 阳历工具SolarUtil

### 是否闰年
判断某年是否闰年。
1. SolarUtil.isLeapYear(year)
> 返回布尔值。  
`true`：是闰年。  
`false`：非闰年。
#### 示例代码
```
console.log(SolarUtil.isLeapYear(2016));
```
> 输出
true

### 获取某年天数
闰年366天，平年365天。
1. SolarUtil.getDaysOfYear(year)
> 返回天数  
`year`：阳历年(数字)。
#### 示例代码
```
console.log(SolarUtil.getDaysOfYear(2016));
```
> 输出
366

### 获取阳历某月天数
1. SolarUtil.getDaysOfMonth(year, month)
> 返回天数(数字)。  
`year`：阳历年(数字)。  
`month`：阳历月(数字)。
#### 示例代码
```
console.log(SolarUtil.getDaysOfMonth(2016,2));
```
> 输出
29

### 获取某月周数
1. SolarUtil.getDaysOfMonth(year, month, start)
> 返回周数(数字)。  
`year`：阳历年(数字)。  
`month`：阳历月(数字)。  
`start`：星期几作为一周的开始，1234560分别代表星期一至星期天(数字)。
#### 示例代码
```
console.log(SolarUtil.getWeeksOfMonth(2016,2,1));
```
> 输出
5

### 获取某天位于当年第几天
从1月1日开始累积的当年天数。例如1月2日，位于当年第2天，2月1日，位于当年第32天。
1. SolarUtil.getDaysInYear(year, month, day)
> 返回位于当年第几天  
`year`：阳历年(数字)。  
`month`：阳历月(数字)。  
`day`：阳历日(数字)。
#### 示例代码
```
console.log(SolarUtil.getDaysInYear(2016, 3, 1));
```
> 输出
61

## 阴历Lunar

### 实例化
阴历的实例化有以下几种方式：
1. Lunar.fromYmd(lunarYear, lunarMonth, lunarDay)
> 指定`阴历年(数字)`、`阴历月(数字)`、`阴历日(数字)`生成阴历对象。注意月份为1到12，闰月为负，即闰2月=-2。
2. Lunar.fromYmdHms(lunarYear, lunarMonth, lunarDay, hour, minute, second)
> 指定`阴历年(数字)`、`阴历月(数字)`、`阴历日(数字)`、`阳历小时(数字)`、`阳历分钟(数字)`、`阳历秒钟(数字)`生成阴历对象。注意月份为1到12，闰月为负，即闰2月=-2。
3. Lunar.fromDate(date)
> 指定`阳历日期(Date)`生成阴历对象
#### 示例代码
```JavaScript
var d = Lunar.fromYmd(1986, 4, 21);
console.log(d);
console.log(d.toFullString());
d = Lunar.fromDate(new Date());
console.log(d);
console.log(d.toFullString());
d = Lunar.fromYmdHms(1986, 4, 21, 20, 5, 0);
// 时辰
console.log(d.getTimeZhi()+'时');
```

```python
d = Lunar.fromYmd(1986, 4, 21)
print d
print d.toFullString()
d = Lunar.fromDate(datetime.now())
print d
print d.toFullString()
d = Lunar.fromYmdHms(1986, 4, 21, 20, 5, 0)
# 时辰
print d.getTimeZhi() + '时'
```
> 输出
一九八六年四月廿一
一九八六年四月廿一 丙寅(虎)年 癸巳(蛇)月 癸酉(鸡)日 子(鼠)时 纳音[炉中火 长流水 剑锋金 桑柘木] 星期四 北方玄武 星宿[斗木獬](吉) 彭祖百忌[癸不词讼理弱敌强 酉不会客醉坐颠狂] 喜神方位[巽](东南) 阳贵神方位[巽](东南) 阴贵神方位[震](正东) 福神方位[艮](东北) 财神方位[离](正南) 冲[(丁卯)兔] 煞[东]
二〇二五年四月廿二
二〇二五年四月廿二 乙巳(蛇)年 辛巳(蛇)月 戊子(鼠)日 巳(蛇)时 纳音[覆灯火 白蜡金 霹雳火 沙中土] 星期一 西方白虎 星宿[毕月乌](吉) 彭祖百忌[戊不受田田主不祥 子不问卜自惹祸殃] 喜神方位[巽](东南) 阳贵神方位[艮](东北) 阴贵神方位[坤](西南) 福神方位[艮](东北) 财神方位[坎](正北) 冲[(壬午)马] 煞[南]
戌时

### toString
阴历对象可以使用两种字符串输出方式：
1. .toString()
> 阴历对象的默认字符串输出
2. .toFullString()
> 阴历对象的全量字符串输出，包含尽量多的信息
#### 示例代码
```JavaScript
//实例化
var d = Lunar.fromDate(new Date());
//默认字符串输出
console.log(d);
console.log(d.toString());
//全量字符串输出
console.log(d.toFullString());
```

```python
d = Lunar.fromDate(datetime.now())
print d
print d.toString()
print d.toFullString()
```
> 输出
二〇二五年四月廿二
二〇二五年四月廿二
二〇二五年四月廿二 乙巳(蛇)年 辛巳(蛇)月 戊子(鼠)日 巳(蛇)时 纳音[覆灯火 白蜡金 霹雳火 沙中土] 星期一 西方白虎 星宿[毕月乌](吉) 彭祖百忌[戊不受田田主不祥 子不问卜自惹祸殃] 喜神方位[巽](东南) 阳贵神方位[艮](东北) 阴贵神方位[坤](西南) 福神方位[艮](东北) 财神方位[坎](正北) 冲[(壬午)马] 煞[南]

### 获取年、月、日
#### 获取数字表示
1. .getYear()
> 获取阴历年的数字
2. .getMonth()
> 获取阴历月的数字，值从1到12，但闰月为负数，如闰二月=-2。
3. .getDay()
> 获取阴历日的数字
#### 获取中文表示
1. .getYearInChinese()
> 获取阴历年的中文
2. .getMonthInChinese()
> 获取阴历月的中文
3. .getDayInChinese()
> 获取阴历日的中文
#### 示例代码
```JavaScript
var d = Lunar.fromDate(new Date());
console.log(d.getYear());
console.log(d.getMonth());
console.log(d.getDay());
console.log(d.getYearInChinese());
console.log(d.getMonthInChinese());
console.log(d.getDayInChinese());
```
```python
d = Lunar.fromDate(datetime.now())
print d.getYear()
print d.getMonth()
print d.getDay()
print d.getYearInChinese()
print d.getMonthInChinese()
print d.getDayInChinese()
```
> 输出
2025
4
22
二〇二五
四
廿二

### 获取时辰

时辰为中国传统计时单位。把一昼夜平分为十二段，每段叫做一个时辰，对应12地支，合现在的两小时。
时辰对照表参考[阴历工具-时辰](lunar-util.time.html)
1. .getTimeGan()
> 获取时辰天干
2. .getTimeZhi()
> 获取时辰地支
3. .getTimeInGanZhi()
> 获取时辰干支
4. .getTimeShengXiao()
> 获取时辰生肖
5. .getTime()
> 获取[时辰对象](lunar-time.html)
6. .getTimes()
> 获取当天的所有[时辰对象](lunar-time.html)，由于有早子时和晚子时，会返回13个对象。
#### 示例代码
```JavaScript
var d = Lunar.fromDate(new Date());
console.log(d.getTimeGan());
console.log(d.getTimeZhi());
console.log(d.getTimeInGanZhi());
console.log(d.getTimeShengXiao());
// 获取当天时辰列表
var times = d.getTimes();
for (var i = 0, j = times.length; i < j; i++){
    var time = times[i];
    console.log(time.getMinHm() + ' - ' + time.getMaxHm() + ' : ' + time.getGanZhi());
}
```
```python
d = Lunar.fromDate(datetime.now())
print d.getTimeGan()
print d.getTimeZhi()
print d.getTimeInGanZhi()
print d.getTimeShengXiao()
```
> 输出
己
未
己未
羊


00:00 - 00:59 : 壬子
01:00 - 02:59 : 癸丑
03:00 - 04:59 : 甲寅
05:00 - 06:59 : 乙卯
07:00 - 08:59 : 丙辰
09:00 - 10:59 : 丁巳
11:00 - 12:59 : 戊午
13:00 - 14:59 : 己未
15:00 - 16:59 : 庚申
17:00 - 18:59 : 辛酉
19:00 - 20:59 : 壬戌
21:00 - 22:59 : 癸亥
23:00 - 23:59 : 甲子

### 获取星期
阴历对象也可直接获取星期，同样提供两种星期表示方式：
1. .getWeek()
> 获取星期数字，0代表星期日，1代表星期一，6代表星期六
2. .getWeekInChinese()
> 获取星期的中文：日一二三四五六
中国古代也用“七曜日”来表示星期，详见[七政(七曜)](lunar.zheng.html)。
#### 示例代码
```python
var d = Lunar.fromDate(new Date());
console.log(d.getWeek());
console.log(d.getWeekInChinese());
```
```python
d = Lunar.fromDate(datetime.now())
print d.getWeek()
print d.getWeekInChinese()
```
> 输出
1
一

### 干支

10天干和12地支结合，形成60个干支为一轮回，即60甲子。如辛亥即天干`辛`与地支`亥`的组合。
60甲子的排列顺序为：
| 序号 | 干支 | 序号 | 干支 | 序号 | 干支 | 序号 | 干支 | 序号 | 干支 |
|------|------|------|------|------|------|------|------|------|------|
| 1    | 甲子 | 13   | 丙子 | 25   | 戊子 | 37   | 庚子 | 49   | 壬子 |
| 2    | 乙丑 | 14   | 丁丑 | 26   | 己丑 | 38   | 辛丑 | 50   | 癸丑 |
| 3    | 丙寅 | 15   | 戊寅 | 27   | 庚寅 | 39   | 壬寅 | 51   | 甲寅 |
| 4    | 丁卯 | 16   | 己卯 | 28   | 辛卯 | 40   | 癸卯 | 52   | 乙卯 |
| 5    | 戊辰 | 17   | 庚辰 | 29   | 壬辰 | 41   | 甲辰 | 53   | 丙辰 |
| 6    | 己巳 | 18   | 辛巳 | 30   | 癸巳 | 42   | 乙巳 | 54   | 丁巳 |
| 7    | 庚午 | 19   | 壬午 | 31   | 甲午 | 43   | 丙午 | 55   | 戊午 |
| 8    | 辛未 | 20   | 癸未 | 32   | 乙未 | 44   | 丁未 | 56   | 己未 |
| 9    | 壬申 | 21   | 甲申 | 33   | 丙申 | 45   | 戊申 | 57   | 庚申 |
| 10   | 癸酉 | 22   | 乙酉 | 34   | 丁酉 | 46   | 己酉 | 58   | 辛酉 |
| 11   | 甲戌 | 23   | 丙戌 | 35   | 戊戌 | 47   | 庚戌 | 59   | 壬戌 |
| 12   | 乙亥 | 24   | 丁亥 | 36   | 己亥 | 48   | 辛亥 | 60   | 癸亥 |

年、月、日、时辰都可以使用干支来表示。
1. .getYearInGanZhi()
> 获取干支纪年（新年以正月初一起算）
2. .getYearGan()
> 获取阴历年的天干（新年以正月初一起算）
3. .getYearZhi()
> 获取阴历年的地支（新年以正月初一起算）
4. .getMonthInGanZhi()
> 获取干支纪月（新的一月以节交接当天零点起算）
5. .getMonthGan()
> 获取阴历月的天干（新的一月以节交接当天零点起算）
6. .getMonthZhi()
> 获取阴历月的地支（新的一月以节交接当天零点起算）
7. .getDayInGanZhi()
> 获取干支纪日
8. .getDayGan()
> 获取阴历日的天干
9. .getDayZhi()
> 获取阴历日的地支
10. .getTimeInGanZhi()
> 获取干支纪时
11. .getTimeGan()
> 获取时辰的天干
12. .getTimeZhi()
> 获取时辰的地支
13. .getGan()
> [已过时] 获取年天干，为兼容老版本而保留，等同于getYearGan
14. .getZhi()
> [已过时] 获取年地支，为兼容老版本而保留，等同于getYearZhi
由于国标农历新年是以正月初一起算，而民间很多时候是以立春开始算，算八字则更需要精确到以节交接的时刻，所以提供更多的方法。
1. .getYearInGanZhiByLiChun()
> 获取干支纪年（新年以立春零点起算）
2. .getYearGanByLiChun()
> 获取阴历年的天干（新年以立春零点起算）
3. .getYearZhiByLiChun()
> 获取阴历年的地支（新年以立春零点起算）
4. .getYearInGanZhiExact()
> 获取干支纪年（新年以立春节气交接的时刻起算）
5. .getYearGanExact()
> 获取阴历年的天干（新年以立春节气交接的时刻起算）
6. .getYearZhiExact()
> 获取阴历年的地支（新年以立春节气交接的时刻起算）
例如立春时刻为14:30:02，则可能导致一天中上午属于上一年，下午属于下一年，尤其是计算八字时需要如此精确的划分，否则失之毫厘谬以千里。
月份则相对更统一一些，都是以节交接作为月份分隔的依据，但是计算八字也需要精确到时刻。
1. .getMonthInGanZhiExact()
> 获取干支纪月（新的一月以节交接准确时刻起算）
2. .getMonthGanExact()
> 获取阴历月的天干（新的一月以节交接准确时刻起算）
3. .getMonthZhiExact()
> 获取阴历月的地支（新的一月以节交接准确时刻起算）
由于八字计算涉及到早子时(00:00-00:59)和晚子时(23:00-23:59)，由于晚子时的日干支存在争议，所以日天干和日地支需要按不同的流派来更准确的表示。
1. .getDayInGanZhiExact()
> 获取精确的干支纪日（流派1，晚子时日柱算明天）
2. .getDayGanExact()
> 获取阴历日的精确天干（流派1，晚子时日柱算明天）
3. .getDayZhiExact()
> 获取阴历日的精确地支（流派1，晚子时日柱算明天）
4. .getDayInGanZhiExact2()
> 获取精确的干支纪日（流派2，晚子时日柱算当天）
5. .getDayGanExact2()
> 获取阴历日的精确天干（流派2，晚子时日柱算当天）
6. .getDayZhiExact2()
> 获取阴历日的精确地支（流派2，晚子时日柱算当天）
注：八字计算建议使用[EightChar](lunar.bazi.html)
#### 示例代码
```
var d = Lunar.fromDate(new Date());
console.log('阴历年：'+d.getYear());
console.log('阴历月：'+d.getMonth());
console.log('阴历日：'+d.getDay());
//以正月初一起
console.log('年天干：'+d.getYearGan());
console.log('年地支：'+d.getYearZhi());
console.log('年干支：'+d.getYearInGanZhi());
//以立春当天起
console.log('年天干：'+d.getYearGanByLiChun());
console.log('年地支：'+d.getYearZhiByLiChun());
console.log('年干支：'+d.getYearInGanZhiByLiChun());
//以立春交接时刻起
console.log('年天干：'+d.getYearGanExact());
console.log('年地支：'+d.getYearZhiExact());
console.log('年干支：'+d.getYearInGanZhiExact());
//以节交接当天起
console.log('月天干：'+d.getMonthGan());
console.log('月地支：'+d.getMonthZhi());
console.log('月干支：'+d.getMonthInGanZhi());
//以节交接时刻起
console.log('月天干：'+d.getMonthGanExact());
console.log('月地支：'+d.getMonthZhiExact());
console.log('月干支：'+d.getMonthInGanZhiExact());
console.log('日天干：'+d.getDayGan());
console.log('日地支：'+d.getDayZhi());
console.log('日干支：'+d.getDayInGanZhi());
console.log('时辰天干：'+d.getTimeGan());
console.log('时辰地支：'+d.getTimeZhi());
console.log('时辰干支：'+d.getTimeInGanZhi());
```
> 输出
阴历年：2025
阴历月：4
阴历日：22

以正月初一起
年天干：乙
年地支：巳
年干支：乙巳

以立春当天起
年天干：乙
年地支：巳
年干支：乙巳

以立春交接时刻起
年天干：乙
年地支：巳
年干支：乙巳

以节交接当天起
月天干：辛
月地支：巳
月干支：辛巳

以节交接时刻起
月天干：辛
月地支：巳
月干支：辛巳

日天干：戊
日地支：子
日干支：戊子

时辰天干：丁
时辰地支：巳
时辰干支：丁巳

### 禄
禄神为四柱神煞之一，是民间信仰中的主司官禄之神。
甲禄在寅，乙禄在卯，丙戊禄在巳，丁己禄在午，庚禄在申，辛禄在酉，壬禄在亥，癸禄在子。
禄在年支叫岁禄，禄在月支叫建禄，禄在日支叫专禄（也叫日禄），禄在时支叫归禄。
1. .getDayLu()
> 获取日禄。返回一个字符串，例如：酉命互禄 乙命进禄。
#### 示例代码
```JavaScript
var lunar = Lunar.fromDate(new Date());
console.log(lunar.getDayLu());
```
> 输出
巳命互禄 癸命进禄

### 生肖
十二生肖，又叫属相，是中国与十二地支相配以人出生年份的十二种动物，包括鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪。
十二生肖是十二地支的形象化代表，即子（鼠）、丑（牛）、寅（虎）、卯（兔）、辰（龙）、巳（蛇）、午（马）、未（羊）、申（猴）、酉（鸡）、戌（狗）、亥（猪）。
由于生肖对应地支，所以年、月、日、时辰都对应生肖。
1. .getYearShengXiao()
> 获取年的生肖（以正月初一起）
2. .getMonthShengXiao()
> 获取月的生肖（以节交接当天起）
3. .getDayShengXiao()
> 获取日的生肖
4. .getTimeShengXiao()
> 获取时辰的生肖
5. .getShengxiao()
> [已过时] 获取年的生肖，为兼容老版本而保留，等同于getYearShengXiao
由于年月的干支划分方式有区别，所以生肖也会对应不同。
1. .getYearShengXiaoByLiChun()
> 获取年的生肖（以立春当天起）
2. .getYearShengXiaoExact()
> 获取年的生肖（以立春交接时刻起）
3. .getMonthShengXiaoExact()
> 获取月的生肖（以节交接时刻起）
#### 示例代码
```
var d = Lunar.fromDate(new Date());
console.log('年：'+d.getYearShengXiao());
console.log('月：'+d.getMonthShengXiao());
console.log('日：'+d.getDayShengXiao());
console.log('时：'+d.getTimeShengXiao());
console.log('年：'+d.getYearShengXiaoByLiChun());
console.log('年：'+d.getYearShengXiaoExact());
console.log('月：'+d.getMonthShengXiaoExact());
```
> 输出
年：蛇
月：蛇
日：鼠
时：蛇

年：蛇
年：蛇
月：蛇

### 节气
二十四节气包括十二节（立春、惊蛰、清明、立夏、芒种、小暑、立秋、白露、寒露、立冬、大雪、小寒）和十二气（雨水、春分、谷雨、小满、夏至、大暑、处暑、秋分、霜降、小雪、冬至、大寒）。
> 节气的计算使用了[寿星天文历](http://www.nongli.net/sxwnl)的算法。
节气先后顺序为以冬至开始，以大雪结束，通常冬至位于阳历的上一年。
1. getJie()
> 获取节令名（字符串），当匹配到键为`DA_XUE`的节令时，也返回中文的`大雪`，未匹配时返回空字符串
2. getQi()
> 获取气令名（字符串），当匹配到键为`DONG_ZHI`的气令时，也返回中文的`冬至`，未匹配时返回空字符串
3. getJieQi()
> 获取节气名（字符串），当匹配到键为`DA_XUE`的节令时，也返回中文的`大雪`，当匹配到键为`DONG_ZHI`的气令时，也返回中文的`冬至`，未匹配时返回空字符串
4. getJieQiTable()
> 获取当年的节气表（键值对方式，键为节气名称，值为对应阳历。）
5. getJieQiList()
> 获取当年的节气名称（按时间先后排序），由于js中getJieQiTable无法排序，所以提供该方法，某些语言(如java)中getJieQiTable已经排序，所以不提供该方法。

注意：为了在任何一天都能获取到上一节气、下一节气而不用考虑跨年的问题，在头部追加一个键为`DA_XUE`的节令来表示上个节气周期末的大雪；在最后追加一个键为`DONG_ZHI`的气令来表示阳历年末的冬至；同时，在最后追加一个键为`XIAO_HAN`的节令来表示下一阳历年初的小寒，追加一个键为`DA_HAN`的气令来表示下一阳历年初的大寒，追加一个键为`LI_CHUN`的气令来表示下一阳历年初的立春，追加`YU_SHUI`表示雨水，追加`JING_ZHE`表示惊蛰。所以最终节气表如下：

DA\_XUE, 冬至, 小寒, 大寒, 立春, 雨水, 惊蛰, 春分, 清明, 谷雨, 立夏, 小满, 芒种, 夏至, 小暑, 大暑, 立秋, 处暑, 白露, 秋分, 寒露, 霜降, 立冬, 小雪, 大雪, DONG\_ZHI, XIAO\_HAN, DA\_HAN, LI\_CHUN, YU\_SHUI, JING\_ZHE

其中`冬至`到`大雪`为一个节气周期，`DA_XUE`和`冬至`位于阳历上一年，`小寒`到`DONG_ZHI`位于阳历同一年，`XIAO_HAN`、`DA_HAN`、`LI_CHUN`、`YU_SHUI`、和`JING_ZHE`位于阳历下一年。可参考下方示例打印的节气表辅助理解。

为了更好的封装，单独提供了一个新的JieQi对象，包含节气名称和阳历日期，JieQi对象提供如下方法：
1. getName()
> 获取名称（字符串）
2. getSolar()
> 获取阳历对象
3. isJie()
> 是否节令，返回`true/false`
4. isQi()
> 是否气令，返回`true/false`
同时也为Lunar对象提供了新的方法，更加方便的获取临近的节气：
1. getPrevJieQi(wholeDay)
> 获取上一节气（逆推的第一个节气）。参数`wholeDay`传true/false，true代表按天匹配，false代表按精确时刻匹配。返回`JieQi对象`
2. getNextJieQi(wholeDay)
> 获取下一节气（顺推的第一个节气）。参数`wholeDay`传true/false，true代表按天匹配，false代表按精确时刻匹配。返回`JieQi对象`
3. getCurrentJieQi()
> 获取当前节气，返回`JieQi对象`，当天无节气返回null
4. getPrevJie(wholeDay)
> 获取上一节令（逆推的第一个节令）。参数`wholeDay`传true/false，true代表按天匹配，false代表按精确时刻匹配。返回`JieQi对象`
5. getNextJie(wholeDay)
> 获取下一节令（顺推的第一个节令）。参数`wholeDay`传true/false，true代表按天匹配，false代表按精确时刻匹配。返回`JieQi对象`
6. getCurrentJie()
> 获取当天节令，返回`JieQi对象`，当天无节令返回null
7. getPrevQi(wholeDay)
> 获取上一气令（逆推的第一个气令）。参数`wholeDay`传true/false，true代表按天匹配，false代表按精确时刻匹配。返回`JieQi对象`
8. getNextQi(wholeDay)
> 获取下一气令（顺推的第一个气令）。参数`wholeDay`传true/false，true代表按天匹配，false代表按精确时刻匹配。返回`JieQi对象`
9. getCurrentQi()
> 获取当天气令，返回`JieQi对象`，当天无气令返回null
#### 示例代码
```
//农历2020年3月12日是清明节
var d = Lunar.fromYmd(2020,3,12);
console.log('节：'+d.getJie());
console.log('气：'+d.getQi());
console.log('节气：'+d.getJieQi());
//获取立春交接的准确时间
console.log('立春：'+d.getJieQiTable()['立春'].toYmdHms());
var l = d.getJieQiList();
console.log(l);
var jieQi = d.getJieQiTable();
for (var i=0, j=l.length; i<j; i++){
    var name = l[i];
    console.log(name + ' = ' + jieQi[name].toYmdHms());
}
d = Lunar.fromDate(new Date());
var prev = d.getPrevJieQi();
console.log('上一节气 = ' + prev.getName() + ' ' +prev.getSolar().toYmdHms());
var next = d.getNextJieQi();
console.log('下一节气 = ' + next.getName() + ' ' +next.getSolar().toYmdHms());
```
> 输出
节：清明
气：
节气：清明

立春：2020-02-04 17:03:12

DA_XUE,冬至,小寒,大寒,立春,雨水,惊蛰,春分,清明,谷雨,立夏,小满,芒种,夏至,小暑,大暑,立秋,处暑,白露,秋分,寒露,霜降,立冬,小雪,大雪,DONG_ZHI,XIAO_HAN,DA_HAN,LI_CHUN,YU_SHUI,JING_ZHE

DA_XUE = 2019-12-07 18:18:21
冬至 = 2019-12-22 12:19:19
小寒 = 2020-01-06 05:29:59
大寒 = 2020-01-20 22:54:33
立春 = 2020-02-04 17:03:12
雨水 = 2020-02-19 12:56:53
惊蛰 = 2020-03-05 10:56:45
春分 = 2020-03-20 11:49:30
清明 = 2020-04-04 15:38:02
谷雨 = 2020-04-19 22:45:21
立夏 = 2020-05-05 08:51:16
小满 = 2020-05-20 21:49:10
芒种 = 2020-06-05 12:58:19
夏至 = 2020-06-21 05:43:34
小暑 = 2020-07-06 23:14:20
大暑 = 2020-07-22 16:36:45
立秋 = 2020-08-07 09:06:03
处暑 = 2020-08-22 23:44:48
白露 = 2020-09-07 12:07:55
秋分 = 2020-09-22 21:30:32
寒露 = 2020-10-08 03:55:08
霜降 = 2020-10-23 06:59:26
立冬 = 2020-11-07 07:13:47
小雪 = 2020-11-22 04:39:38
大雪 = 2020-12-07 00:09:22
DONG_ZHI = 2020-12-21 18:02:12
XIAO_HAN = 2021-01-05 11:23:17
DA_HAN = 2021-01-20 04:39:42
LI_CHUN = 2021-02-03 22:58:39
YU_SHUI = 2021-02-18 18:43:49
JING_ZHE = 2021-03-05 16:53:32

上一节气 = 立夏 2025-05-05 13:56:57
下一节气 = 小满 2025-05-21 02:54:23

### 七政（七曜）
七曜，又称七政、七纬、七耀等。
“七曜日”分别代表一周七天的叫法最早出现于两河流域的古巴比伦文明。公元前七百年左右，古巴比伦出现了一个星期分为七天的制度，四星期合为一个月。
在日本、韩国和朝鲜，一星期中的各天并不是按数字顺序，而是有着特定的名字，是以“七曜”来分别命名的。土曜日是星期六，日曜日是星期天，月曜日是星期一，火曜日是星期二，水曜日是星期三，木曜日是星期四，金曜日是星期五。
在中国，起初也是以七曜命名一星期中的各天，将日（太阳）、月（太阴）、金（太白）太白金星是不是很耳熟？、木（岁星）、水（辰星）、火（荧惑）、土（填星、镇星）等称为七曜，到清末才逐渐改为现在“星期”的叫法。
1. .getZheng()
> 获取政，日月金木水火土
#### 示例代码
```JavaScript
var d = Lunar.fromDate(new Date());
console.log(d.getZheng());
```
```python
d = Lunar.fromDate(datetime.now())
print d.getZheng()
```

> 输出
月

### 纳音
天干有天干的五行，地支有地支的五行，天干与地支配合后会变成新的五行，称为“纳音五行”。
六十甲子纳音表五行歌：
甲子、乙丑——海中金，丙寅、丁卯——炉中火。
戊辰、己巳——大林木，庚午、辛未——路旁土。
壬申、癸酉——剑锋金，甲戌、乙亥——山头火。　
丙子、丁丑——涧下水，戊寅、己卯——城头土。
庚辰、辛巳——白蜡金，壬午、癸未——杨柳木。
甲申、乙酉——泉中水，丙戌、丁亥——屋上土。
戊子、己丑——霹雳火，庚寅、辛卯——松柏木。
壬辰、癸巳——长流水，甲午、乙未——砂石金。　
丙申、丁酉——山下火，戊戌、己亥——平地木。　
庚子、辛丑——壁上土，壬寅、癸卯——金箔金。
甲辰、乙巳——灯头火，丙午、丁未——天河水。
戊申、己酉——大驿土，庚戌、辛亥——钗钏金。
壬子、癸丑——桑柘木，甲寅、乙卯——大溪水。
丙辰、丁巳——沙中土，戊午、己未——天上火。　
庚申、辛酉——石榴木，壬戌、癸亥——大海水。
由于年、月、日都可由天干地支表示，所以年月日都对应着纳音五行。
1. .getYearNaYin()
> 获取年纳音，如剑锋金
2. .getMonthNaYin()
> 获取月纳音，如剑锋金
3. .getDayNaYin()
> 获取日纳音，如剑锋金
4. .getTimeNaYin()
> 获取时辰纳音，如剑锋金
#### 示例代码
```
var d = Lunar.fromDate(new Date());
console.log(d.getYearNaYin());
console.log(d.getMonthNaYin());
console.log(d.getDayNaYin());
console.log(d.getTimeNaYin());
```
> 输出
覆灯火
白蜡金
霹雳火
沙中土

### 八字
所谓八字，就是年、月、日、时辰的干支，得到的结果为8个字。
注意：八字的年干支，必须以立春节气交接的时刻来准确划分；月干支也必须以当月节交接的时刻来准确划分。
时辰天干，以日的天干和时辰的地支按下表规则进行计算而得，但是需要注意的是子时跨天。有人说23:00-23:59为晚子时日柱应算作明天，而00:00-00:59为早子时，算作当天，也有人说日柱都按当天算，只是晚子时时柱按明天算。
```json
{
  "data": [
    {
      "时支": "子",
      "日干": {
        "甲": "甲子",
        "乙": "丙子",
        "丙": "戊子",
        "丁": "庚子",
        "戊": "壬子",
        "己": "甲子",
        "庚": "丙子",
        "辛": "戊子",
        "壬": "庚子",
        "癸": "壬子"
      }
    },
    {
      "时支": "丑",
      "日干": {
        "甲": "乙丑",
        "乙": "丁丑",
        "丙": "己丑",
        "丁": "辛丑",
        "戊": "癸丑",
        "己": "乙丑",
        "庚": "丁丑",
        "辛": "己丑",
        "壬": "辛丑",
        "癸": "癸丑"
      }
    },
    {
      "时支": "寅",
      "日干": {
        "甲": "丙寅",
        "乙": "戊寅",
        "丙": "庚寅",
        "丁": "壬寅",
        "戊": "甲寅",
        "己": "丙寅",
        "庚": "戊寅",
        "辛": "庚寅",
        "壬": "壬寅",
        "癸": "甲寅"
      }
    },
    {
      "时支": "卯",
      "日干": {
        "甲": "丁卯",
        "乙": "己卯",
        "丙": "辛卯",
        "丁": "癸卯",
        "戊": "乙卯",
        "己": "丁卯",
        "庚": "己卯",
        "辛": "辛卯",
        "壬": "癸卯",
        "癸": "乙卯"
      }
    },
    {
      "时支": "辰",
      "日干": {
        "甲": "戊辰",
        "乙": "庚辰",
        "丙": "壬辰",
        "丁": "甲辰",
        "戊": "丙辰",
        "己": "戊辰",
        "庚": "庚辰",
        "辛": "壬辰",
        "壬": "甲辰",
        "癸": "丙辰"
      }
    },
    {
      "时支": "巳",
      "日干": {
        "甲": "己巳",
        "乙": "辛巳",
        "丙": "癸巳",
        "丁": "乙巳",
        "戊": "丁巳",
        "己": "己巳",
        "庚": "辛巳",
        "辛": "癸巳",
        "壬": "乙巳",
        "癸": "丁巳"
      }
    },
    {
      "时支": "午",
      "日干": {
        "甲": "庚午",
        "乙": "壬午",
        "丙": "甲午",
        "丁": "丙午",
        "戊": "戊午",
        "己": "庚午",
        "庚": "壬午",
        "辛": "甲午",
        "壬": "丙午",
        "癸": "戊午"
      }
    },
    {
      "时支": "未",
      "日干": {
        "甲": "辛未",
        "乙": "癸未",
        "丙": "乙未",
        "丁": "丁未",
        "戊": "己未",
        "己": "辛未",
        "庚": "癸未",
        "辛": "乙未",
        "壬": "丁未",
        "癸": "己未"
      }
    },
    {
      "时支": "申",
      "日干": {
        "甲": "壬申",
        "乙": "甲申",
        "丙": "丙申",
        "丁": "戊申",
        "戊": "庚申",
        "己": "壬申",
        "庚": "甲申",
        "辛": "丙申",
        "壬": "戊申",
        "癸": "庚申"
      }
    },
    {
      "时支": "酉",
      "日干": {
        "甲": "癸酉",
        "乙": "乙酉",
        "丙": "丁酉",
        "丁": "己酉",
        "戊": "辛酉",
        "己": "癸酉",
        "庚": "乙酉",
        "辛": "丁酉",
        "壬": "己酉",
        "癸": "辛酉"
      }
    },
    {
      "时支": "戌",
      "日干": {
        "甲": "甲戌",
        "乙": "丙戌",
        "丙": "戊戌",
        "丁": "庚戌",
        "戊": "壬戌",
        "己": "甲戌",
        "庚": "丙戌",
        "辛": "戊戌",
        "壬": "庚戌",
        "癸": "壬戌"
      }
    },
    {
      "时支": "亥",
      "日干": {
        "甲": "乙亥",
        "乙": "丁亥",
        "丙": "己亥",
        "丁": "辛亥",
        "戊": "癸亥",
        "己": "乙亥",
        "庚": "丁亥",
        "辛": "己亥",
        "壬": "辛亥",
        "癸": "癸亥"
      }
    }
  ]
}
```

#### 地势
八字中地势，也称长生十二神，包括：
长生、沐浴、冠带、临官、帝旺、衰、病、死、墓、绝、胎、养
长生十二神的排法参考下表：
```json
{
  "十天干生旺死绝表": {
    "甲": {
      "长生": "亥",
      "沐浴": "子",
      "冠带": "丑",
      "临官": "寅",
      "帝旺": "卯",
      "衰": "辰",
      "病": "巳",
      "死": "午",
      "墓": "未",
      "绝": "申",
      "胎": "酉",
      "养": "戌"
    },
    "乙": {
      "长生": "午",
      "沐浴": "巳",
      "冠带": "辰",
      "临官": "卯",
      "帝旺": "寅",
      "衰": "丑",
      "病": "子",
      "死": "亥",
      "墓": "戌",
      "绝": "酉",
      "胎": "申",
      "养": "未"
    },
    "丙": {
      "长生": "寅",
      "沐浴": "卯",
      "冠带": "辰",
      "临官": "巳",
      "帝旺": "午",
      "衰": "未",
      "病": "申",
      "死": "酉",
      "墓": "戌",
      "绝": "亥",
      "胎": "子",
      "养": "丑"
    },
    "丁": {
      "长生": "酉",
      "沐浴": "申",
      "冠带": "未",
      "临官": "午",
      "帝旺": "巳",
      "衰": "辰",
      "病": "卯",
      "死": "寅",
      "墓": "丑",
      "绝": "子",
      "胎": "亥",
      "养": "戌"
    },
    "戊": {
      "长生": "寅",
      "沐浴": "卯",
      "冠带": "辰",
      "临官": "巳",
      "帝旺": "午",
      "衰": "未",
      "病": "申",
      "死": "酉",
      "墓": "戌",
      "绝": "亥",
      "胎": "子",
      "养": "丑"
    },
    "己": {
      "长生": "酉",
      "沐浴": "申",
      "冠带": "未",
      "临官": "午",
      "帝旺": "巳",
      "衰": "辰",
      "病": "卯",
      "死": "寅",
      "墓": "丑",
      "绝": "子",
      "胎": "亥",
      "养": "戌"
    },
    "庚": {
      "长生": "巳",
      "沐浴": "午",
      "冠带": "未",
      "临官": "申",
      "帝旺": "酉",
      "衰": "戌",
      "病": "亥",
      "死": "子",
      "墓": "丑",
      "绝": "寅",
      "胎": "卯",
      "养": "辰"
    },
    "辛": {
      "长生": "子",
      "沐浴": "亥",
      "冠带": "戌",
      "临官": "酉",
      "帝旺": "申",
      "衰": "未",
      "病": "午",
      "死": "巳",
      "墓": "辰",
      "绝": "卯",
      "胎": "寅",
      "养": "丑"
    },
    "壬": {
      "长生": "申",
      "沐浴": "酉",
      "冠带": "戌",
      "临官": "亥",
      "帝旺": "子",
      "衰": "丑",
      "病": "寅",
      "死": "卯",
      "墓": "辰",
      "绝": "巳",
      "胎": "午",
      "养": "未"
    },
    "癸": {
      "长生": "卯",
      "沐浴": "寅",
      "冠带": "丑",
      "临官": "子",
      "帝旺": "亥",
      "衰": "戌",
      "病": "酉",
      "死": "申",
      "墓": "未",
      "绝": "午",
      "胎": "巳",
      "养": "辰"
    }
  }
}
```

固定用日干与四柱地支进行查表可得到长生十二神；也可以根据长生对应的地支对沐浴、冠带等进行推算，阳干对应的地支顺推，阴干逆推。
以下调用方法已过时，仅为兼容老版本保留，请使用getEightChar()获取八字对象。
1. .getBaZi()
> [已过时] 获取八字，返回4个元素的数组，分别对应[年柱, 月柱, 日柱, 时柱]
2. .getBaZiWuXing()
> [已过时] 获取五行，返回4个元素的数组
3. .getBaZiNaYin()
> [已过时] 获取八字[纳音](lunar.nayin.html)，返回4个元素的数组
4. .getBaZiShiShenGan()
> [已过时] 获取八字天干[十神](lunar.shishen.html)，返回4个元素的数组
5. .getBaZiShiShenZhi()
> [已过时] 获取八字地支[十神](lunar.shishen.html)，返回4个元素的数组（这里仅返回本气）
通过以下方法可获取年、月、日、时的地支十神（地支藏干包含本气、中气、杂气，所以返回列表可能包含1到3个元素）：
1. .getBaZiShiShenYearZhi()
> [已过时] 获取八字年柱地支[十神](lunar.shishen.html)列表
2. .getBaZiShiShenMonthZhi()
> [已过时] 获取八字月柱地支[十神](lunar.shishen.html)列表
3. .getBaZiShiShenDayZhi()
> [已过时] 获取八字日柱地支[十神](lunar.shishen.html)列表
4. .getBaZiShiShenTimeZhi()
> [已过时] 获取八字时柱地支[十神](lunar.shishen.html)列表
#### 调用方法
由于八字涉及的信息较多，Lunar已经越来越臃肿，故将八字单独提出，所有八字相关内容请使用EightChar。
1. .getEightChar()
> 获取八字对象EightChar
#### 流派
为了兼容日柱的不同划分方式，这里八字分为2种流派，其中流派1认为晚子时日柱算明天，流派2认为晚子时日柱算当天，两种流派都认为晚子时时柱算明天。当不设置流派时，默认采用流派2。使用EightChar的下属方法可获知或切换流派：
1. .getSect()
> 获取流派，数字1或2
2. .setSect(sect)
> 设置流派，`sect(数字)`为流派，1代表流派1，2代表流派2。调用该方法切换流派后，重新获取与日柱相关的信息将按新的方案计算。
#### 年柱
八字中的年柱以立春交接时刻为准，请使用EightChar的下属方法获得八字年柱相关信息：
1. .getYear()
> 获取年柱，如辛亥
2. .getYearGan()
> 获取年柱天干，如辛
3. .getYearHideGan()
> 获取年柱地支藏干，由于藏干分本气、中气、余气，所以返回结果可能为1到3个元素
4. .getYearZhi()
> 获取年柱地支，如亥
5. .getYearWuXing()
> 获取年柱五行，如金木
6. .getYearNaYin()
> 获取年柱[纳音](lunar.nayin.html)，如杨柳木
7. .getYearShiShenGan()
> 获取年柱天干[十神](lunar.shishen.html)
8. .getYearShiShenZhi()
> 获取年柱地支[十神](lunar.shishen.html)，由于藏干分本气、中气、余气，所以返回结果可能为1到3个元素
9. .getYearDiShi()
> 获取年柱地势(长生十二神)
10. .getYearXun()
> 获取年柱所在[旬](lunar.xun.html)
11. .getYearXunKong()
> 获取年柱[旬空(空亡)](lunar.xun.html)
#### 月柱
八字中的年柱以节交接时刻为准，请使用EightChar的下属方法获得八字月柱相关信息：
1. .getMonth()
> 获取月柱，如辛亥
2. .getMonthGan()
> 获取月柱天干，如辛
3. .getMonthHideGan()
> 获取月柱地支藏干，由于藏干分本气、中气、余气，所以返回结果可能为1到3个元素
4. .getMonthZhi()
> 获取月柱地支，如亥
5. .getMonthWuXing()
> 获取月柱五行，如金木
6. .getMonthNaYin()
> 获取月柱[纳音](lunar.nayin.html)，如杨柳木
7. .getMonthShiShenGan()
> 获取月柱天干[十神](lunar.shishen.html)
8. .getMonthShiShenZhi()
> 获取月柱地支[十神](lunar.shishen.html)，由于藏干分本气、中气、余气，所以返回结果可能为1到3个元素
9. .getMonthDiShi()
> 获取月柱地势(长生十二神)
10. .getMonthXun()
> 获取月柱所在[旬](lunar.xun.html)
11. .getMonthXunKong()
> 获取月柱[旬空(空亡)](lunar.xun.html)
#### 日柱
八字中的日柱区分早晚子时，请注意流派，使用EightChar的下属方法获得八字日柱相关信息：
1. .getDay()
> 获取日柱，如辛亥
2. .getDayGan()
> 获取日柱天干，如辛
3. .getDayHideGan()
> 获取日柱地支藏干，由于藏干分本气、中气、余气，所以返回结果可能为1到3个元素
4. .getDayZhi()
> 获取日柱地支，如亥
5. .getDayWuXing()
> 获取日柱五行，如金木
6. .getDayNaYin()
> 获取日柱[纳音](lunar.nayin.html)，如杨柳木
7. .getDayShiShenGan()
> 获取日柱天干[十神](lunar.shishen.html)，日柱天干十神固定为：日主，也称日元、日干
8. .getDayShiShenZhi()
> 获取日柱地支[十神](lunar.shishen.html)，由于藏干分本气、中气、余气，所以返回结果可能为1到3个元素
9. .getDayDiShi()
> 获取日柱地势(长生十二神)
10. .getDayXun()
> 获取日柱所在[旬](lunar.xun.html)
11. .getDayXunKong()
> 获取日柱[旬空(空亡)](lunar.xun.html)
#### 时柱
请使用EightChar的下属方法获得八字时柱相关信息：
1. .getTime()
> 获取时柱，如辛亥
2. .getTimeGan()
> 获取时柱天干，如辛
3. .getTimeHideGan()
> 获取时柱地支藏干，由于藏干分本气、中气、余气，所以返回结果可能为1到3个元素
4. .getTimeZhi()
> 获取时柱地支，如亥
5. .getTimeWuXing()
> 获取时柱五行，如金木
6. .getTimeNaYin()
> 获取时柱[纳音](lunar.nayin.html)，如杨柳木
7. .getTimeShiShenGan()
> 获取时柱天干[十神](lunar.shishen.html)
8. .getTimeShiShenZhi()
> 获取时柱地支[十神](lunar.shishen.html)，由于藏干分本气、中气、余气，所以返回结果可能为1到3个元素
9. .getTimeDiShi()
> 获取时柱地势(长生十二神)
10. .getTimeXun()
> 获取时柱所在[旬](lunar.xun.html)
11. .getTimeXunKong()
> 获取时柱[旬空(空亡)](lunar.xun.html)
#### 胎元、命宫、身宫
1. .getTaiYuan()
> 获取胎元
2. .getMingGong()
> 获取命宫
3. .getShenGong()
> 获取身宫
#### 起运
起运算法流派很多，各流派之间计算会存在误差，目前支持2个流派：
流派1：阳年(年干为甲、丙、戊、庚、壬为阳)生男、阴年(年干为乙、丁、己、辛、癸为阴)生女从出生时辰开始往后推至下一个节令时辰，阴年(年干为乙、丁、己、辛、癸为阴)生男、阳年(年干为甲、丙、戊、庚、壬为阳)生女从出生时辰开始往前倒推至上一个节令时辰，计算经历的天数和时辰数，按3天为1年，1天为4个月，1个时辰为10天（注意一个时辰，两小时）进行换算，得到出生几年几个月几天后起运。
流派2：阳年(年干为甲、丙、戊、庚、壬为阳)生男、阴年(年干为乙、丁、己、辛、癸为阴)生女从出生时辰开始往后推至下一个节令时辰，阴年(年干为乙、丁、己、辛、癸为阴)生男、阳年(年干为甲、丙、戊、庚、壬为阳)生女从出生时辰开始往前倒推至上一个节令时辰，计算经历的分钟数，按4320分钟为1年，360分钟为1个月，12分钟为1天，1分钟为2小时进行换算，得到出生几年几个月几天几小时后起运。
要得到起运数，需要先获取运：
1. .getYun(gender, sect)
> 获取运。`gender(数字)`为性别，1为男，0为女。`sect(数字)`为流派，1为流派1，2为流派2，不传则默认使用流派1。
然后通过运的方法，获取起运相关信息：
1. .getStartYear()
> 获取起运年数。
2. .getStartMonth()
> 获取起运月数。
3. .getStartDay()
> 获取起运天数。
4. .getStartHour()
> 获取起运小时数。流派1目前不支持小时，返回0。流派2可支持到小时。
5. .getStartSolar()
> 获取起运的阳历日期。返回`Solar`对象。
#### 大运
以月柱为基准，从起运年开始，每隔10年排1大运，即按阳男阴女顺排、阴男阳女逆排的规则，和60甲子顺序依次排布干支，一般排9轮。
大运也是先获取运，再调用运的方法得到大运表：
1. .getDaYun()
> 获取大运排布表。返回一个数组，第1个元素为出生年份，第2个元素为起大运年份，后续均间隔10年，共10个元素。
大运表中每个元素，均包含一些细节信息：
1. .getStartYear()
> 获取大运起始年(包含)。
2. .getEndYear()
> 获取大运结束年(包含)。
3. .getStartAge()
> 获取大运起始年龄(即岁数，包含)。
4. .getEndAge()
> 获取大运结束年龄(即岁数，包含)。
5. .getIndex()
> 获取第几轮大运(数字，0-9，0为出生年份，1为起大运)。
6. .getGanZhi()
> 获取干支。
7. .getLiuNian()
> 获取流年表（数组）。
8. .getXiaoYun()
> 获取小运表（数组）。
9. .getXun()
> 获取所在[旬](lunar.xun.html)。
10. .getXunKong()
> 获取[旬空(空亡)](lunar.xun.html)。
#### 流年
流年实际上就是从出生年开始，按60甲子顺序依次排布每一年的干支，按大运的起始年和结束年分别划分到对应大运区间中。也即每一年的干支排布。
流年表需要从大运信息中获取，流年包含的细节信息如下：
1. .getYear()
> 获取年份。
2. .getAge()
> 获取年龄。
3. .getIndex()
> 获取位于当前大运中的序号(数字，0-9)。
4. .getGanZhi()
> 获取干支。
5. .getLiuYue()
> 获取流月表（数组）。
6. .getXun()
> 获取所在[旬](lunar.xun.html)。
7. .getXunKong()
> 获取[旬空(空亡)](lunar.xun.html)。
#### 小运
以时柱为基准，按阳男阴女顺排、阴男阳女逆排的规则，和60甲子顺序依次排布干支，按大运的起始年和结束年分别划分到对应大运区间中的每一年。
小运表需要从大运信息中获取，小运包含的细节信息如下：
1. .getYear()
> 获取年份。
2. .getAge()
> 获取年龄。
3. .getIndex()
> 获取位于当前大运中的序号(数字，0-9)。
4. .getGanZhi()
> 获取干支。
5. .getXun()
> 获取所在[旬](lunar.xun.html)。
6. .getXunKong()
> 获取[旬空(空亡)](lunar.xun.html)。
#### 流月
流月指流年中每一月的干支排布。
流月表需要从流年信息中获取，小运包含的细节信息如下：
1. .getMonthInChinese()
> 获取中文月份。
2. .getIndex()
> 获取月序号(数字，0-11)。
3. .getGanZhi()
> 获取干支。
4. .getXun()
> 获取所在[旬](lunar.xun.html)。
5. .getXunKong()
> 获取[旬空(空亡)](lunar.xun.html)。
注：如果需要通过八字反推阳历，请参考[阳历实例化](solar.new.html)
#### 示例代码
```javascript
// 今日八字
var lunar = Lunar.fromDate(new Date());
var d = lunar.getEightChar();
console.log(d);
console.log(d.getYearWuXing() + ', ' + d.getMonthWuXing() + ', ' + d.getDayWuXing() + ', ' + d.getTimeWuXing());
console.log(d.getYearNaYin() + ', ' + d.getMonthNaYin() + ', ' + d.getDayNaYin() + ', ' + d.getTimeNaYin());
console.log(d.getYearShiShenGan() + ', ' + d.getMonthShiShenGan() + ', ' + d.getDayShiShenGan() + ', ' + d.getTimeShiShenGan());
// 年支十神
console.log('年支十神 = ' + d.getYearShiShenZhi());
// 月支十神
console.log('月支十神 = ' + d.getMonthShiShenZhi());
// 日支十神
console.log('日支十神 = ' + d.getDayShiShenZhi());
// 时支十神
console.log('时支十神 = ' + d.getTimeShiShenZhi());
// 获取男运
var yun = d.getYun(1);
// 起运
console.log('出生' + yun.getStartYear() + '年' + yun.getStartMonth() + '个月' + yun.getStartDay() + '天后起运');
// 获取大运表
var daYunArr = yun.getDaYun();
for (var i=0, j=daYunArr.length; i<j; i++) {
var daYun = daYunArr[i];
console.log('大运[' + i + '] = ' + daYun.getStartYear() + '年 ' + daYun.getStartAge() + '岁 ' + daYun.getGanZhi());
}
// 第1次大运流年
var LiuNianArr = daYunArr[1].getLiuNian();
for (var i=0, j=LiuNianArr.length; i<j; i++) {
var liuNian = LiuNianArr[i];
console.log('流年[' + i + '] = ' + liuNian.getYear() + '年 ' + liuNian.getAge() + '岁 ' + liuNian.getGanZhi());
}
```
> 输出
乙巳 辛巳 戊子 戊午
木火, 金火, 土水, 土火
覆灯火, 白蜡金, 霹雳火, 天上火
正官, 伤官, 日主, 比肩

年支十神 = 偏印,食神,比肩
月支十神 = 偏印,食神,比肩
日支十神 = 正财
时支十神 = 正印,劫财

出生4年7个月20天后起运
大运[0] = 2025年 1岁
大运[1] = 2030年 6岁 庚辰
大运[2] = 2040年 16岁 己卯
大运[3] = 2050年 26岁 戊寅
大运[4] = 2060年 36岁 丁丑
大运[5] = 2070年 46岁 丙子
大运[6] = 2080年 56岁 乙亥
大运[7] = 2090年 66岁 甲戌
大运[8] = 2100年 76岁 癸酉
大运[9] = 2110年 86岁 壬申

流年[0] = 2030年 6岁 庚戌
流年[1] = 2031年 7岁 辛亥
流年[2] = 2032年 8岁 壬子
流年[3] = 2033年 9岁 癸丑
流年[4] = 2034年 10岁 甲寅
流年[5] = 2035年 11岁 乙卯
流年[6] = 2036年 12岁 丙辰
流年[7] = 2037年 13岁 丁巳
流年[8] = 2038年 14岁 戊午
流年[9] = 2039年 15岁 己未


### 十神
十神为日元与其他五行生克泄旺的名称，日元为我，生我的五行为印星，克我的五行为官杀，我生的五行为伤食，与我五行相同的为比劫，被我克的五行为财星。
与我阴阳相见的为：正印、正官、劫财、伤官、正财。
与我同阴或同阳的为：七杀、偏印、比肩、食神、偏财。
依五行生克，我为日主，十神相生歌诀为：
财生官杀，官杀生印，印星生身，食伤生财。
十神相克歌诀为：
财克印，印克食伤，食伤克官杀，官杀克身，身克财。
天干十神表对照表：
```json
{
    "甲": {
        "甲": "比肩",
        "乙": "劫财",
        "丙": "食神",
        "丁": "伤官",
        "戊": "偏财",
        "己": "正财",
        "庚": "七杀",
        "辛": "正官",
        "壬": "偏印",
        "癸": "正印"
    },
    "乙": {
        "乙": "比肩",
        "甲": "劫财",
        "丁": "食神",
        "丙": "伤官",
        "己": "偏财",
        "戊": "正财",
        "辛": "七杀",
        "庚": "正官",
        "癸": "偏印",
        "壬": "正印"
    },
    "丙": {
        "丙": "比肩",
        "丁": "劫财",
        "戊": "食神",
        "己": "伤官",
        "庚": "偏财",
        "辛": "正财",
        "壬": "七杀",
        "癸": "正官",
        "甲": "偏印",
        "乙": "正印"
    },
    "丁": {
        "丁": "比肩",
        "丙": "劫财",
        "己": "食神",
        "戊": "伤官",
        "辛": "偏财",
        "庚": "正财",
        "癸": "七杀",
        "壬": "正官",
        "乙": "偏印",
        "甲": "正印"
    },
    "戊": {
        "戊": "比肩",
        "己": "劫财",
        "庚": "食神",
        "辛": "伤官",
        "壬": "偏财",
        "癸": "正财",
        "甲": "七杀",
        "乙": "正官",
        "丙": "偏印",
        "丁": "正印"
    },
    "己": {
        "己": "比肩",
        "戊": "劫财",
        "辛": "食神",
        "庚": "伤官",
        "癸": "偏财",
        "壬": "正财",
        "乙": "七杀",
        "甲": "正官",
        "丁": "偏印",
        "丙": "正印"
    },
    "庚": {
        "庚": "比肩",
        "辛": "劫财",
        "壬": "食神",
        "癸": "伤官",
        "甲": "偏财",
        "乙": "正财",
        "丙": "七杀",
        "丁": "正官",
        "戊": "偏印",
        "己": "正印"
    },
    "辛": {
        "辛": "比肩",
        "庚": "劫财",
        "癸": "食神",
        "壬": "伤官",
        "乙": "偏财",
        "甲": "正财",
        "丁": "七杀",
        "丙": "正官",
        "己": "偏印",
        "戊": "正印"
    },
    "壬": {
        "壬": "比肩",
        "癸": "劫财",
        "甲": "食神",
        "乙": "伤官",
        "丙": "偏财",
        "丁": "正财",
        "戊": "七杀",
        "己": "正官",
        "庚": "偏印",
        "辛": "正印"
    },
    "癸": {
        "癸": "比肩",
        "壬": "劫财",
        "乙": "食神",
        "甲": "伤官",
        "丁": "偏财",
        "丙": "正财",
        "己": "七杀",
        "戊": "正官",
        "辛": "偏印",
        "庚": "正印"
    }
}
```

地支藏干表：
```json
{
    "子": ["癸"],
    "丑": ["己", "癸", "辛"],
    "寅": ["甲", "戊", "丙"],
    "卯": ["乙"],
    "辰": ["戊", "乙", "癸"],
    "巳": ["丙", "戊", "庚"],
    "午": ["丁", "己"],
    "未": ["己", "丁", "乙"],
    "申": ["庚", "戊", "壬"],
    "酉": ["辛"],
    "戌": ["戊", "辛", "丁"],
    "亥": ["壬", "甲"]
}
```

获取十神的方法见[八字]。

### 旬、旬空（空亡）
天干从甲开始，每十天干一轮，叫一旬。也就是说，一旬代表10年。我们常听说的六旬老人，也就是60岁的老人。
每旬中的十个干支，都以领头这个干支作为旬的名称，例如：甲子、乙丑，它们所在的旬，都叫甲子旬。
#### 旬空
旬空，也叫空亡。由于十天干和十二地支搭配，每旬总会多出来两个地支。这两个地支就叫旬空。
旬、干支、旬空的对应关系表如下：

```json
{
  "旬空表": [
    {
      "旬名称": "甲子旬",
      "干支": ["甲子", "乙丑", "丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉"],
      "旬空": ["戌", "亥"]
    },
    {
      "旬名称": "甲戌旬",
      "干支": ["甲戌", "乙亥", "丙子", "丁丑", "戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未"],
      "旬空": ["申", "酉"]
    },
    {
      "旬名称": "甲申旬",
      "干支": ["甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳"],
      "旬空": ["午", "未"]
    },
    {
      "旬名称": "甲午旬",
      "干支": ["甲午", "乙未", "丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯"],
      "旬空": ["辰", "巳"]
    },
    {
      "旬名称": "甲辰旬",
      "干支": ["甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑"],
      "旬空": ["寅", "卯"]
    },
    {
      "旬名称": "甲寅旬",
      "干支": ["甲寅", "乙卯", "丙辰", "丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌", "癸亥"],
      "旬空": ["子", "丑"]
    }
  ]
}
```
在Lunar对象中获取旬：
1. .getYearXun()
> 获取年所在旬（以正月初一作为新年的开始）
2. .getYearXunByLiChun()
> 获取年所在旬（以立春当天作为新年的开始）
3. .getYearXunExact()
> 获取年所在旬（以立春交接时刻作为新年的开始）
4. .getMonthXun()
> 获取月所在旬（以节交接当天起算）
5. .getMonthXunExact()
> 获取月所在旬（以节交接时刻起算）
6. .getDayXun()
> 获取日所在旬（以节交接当天起算）
7. .getDayXunExact()
> 获取日所在旬（晚子时算第二天）
8. .getTimeXun()
> 获取时辰所在旬
在Lunar对象中获取旬空(空亡)：
1. .getYearXunKong()
> 获取值年空亡（以正月初一作为新年的开始）
2. .getYearXunKongByLiChun()
> 获取值年空亡（以立春当天作为新年的开始）
3. .getYearXunKongExact()
> 获取值年空亡（以立春交接时刻作为新年的开始）
4. .getMonthXunKong()
> 获取值月空亡（以节交接当天起算）
5. .getMonthXunKongExact()
> 获取值月空亡（以节交接时刻起算）
6. .getDayXunKong()
> 获取值日空亡（以节交接当天起算）
7. .getDayXunKongExact()
> 获取值日空亡（晚子时算第二天）
8. .getTimeXunKong()
> 获取值时空亡
在EightChar八字对象中获取旬：
1. .getYearXun()
> 获取年柱所在旬
2 .getMonthXun()
> 获取月柱所在旬
3. .getDayXun()
> 获取日柱所在旬
4. .getTimeXun()
> 获取时柱所在旬
在EightChar八字对象中获取旬空(空亡)：
1. .getYearXunKong()
> 获取年柱旬空(空亡)
2 .getMonthXunKong()
> 获取月柱旬空(空亡)
3. .getDayXunKong()
> 获取日柱旬空(空亡)
4. .getTimeXunKong()
> 获取时柱旬空(空亡)
> 注：通常在八字中比较关心日柱旬空(空亡)。
在大运、小运、流年、流月中获取旬：
1. .getXun()
> 获取所在旬
在大运、小运、流年、流月中获取旬空(空亡)：
1. .getXunKong()
> 获取旬空(空亡)
#### 示例代码
```JavaScript
var d = Lunar.fromDate(new Date());
console.log('空亡所值：年=' + d.getYearXunKong() + ' 月=' + d.getMonthXunKong() + ' 日=' + d.getDayXunKong());
var eightChar = d.getEightChar();
console.log('日柱空亡：' + eightChar.getDayXunKong());
```

```python
d = Lunar.fromDate(datetime.now())
print "空亡所值：年=" + d.getYearXunKong() + " 月=" + d.getMonthXunKong() + " 日=" + d.getDayXunKong()
eightChar = d.getEightChar()
print "日柱空亡：" + eightChar.getDayXunKong()
```
> 输出
空亡所值：年=寅卯 月=申酉 日=午未

日柱空亡：午未

### 阴历日期的推移
1. .next(days)
> `days(数字)`为推移的天数，正数为往后推，负数为往前推。返回推移后那天的阴历对象。
你也可以使用阳历进行日期推移，然后再转阴历，效果一样，但可能会更耗时。
#### 示例代码
```javascript
var d = Lunar.fromDate(new Date());
// 往后推两天，即后天
console.log(d.next(2));
// 往前推1天，即昨天
console.log(d.next(-1));
```

```python
d = Lunar.fromDate(datetime.now())
# 往后推两天，即后天
print d.next(2)
# 往前推1天，即昨天
print d.next(-1)
```

> 输出
二〇二五年四月廿四
二〇二五年四月廿一

### 阴历转阳历
阴历和阳历之间的相互转换，必须得支持才行。
1. .getSolar()
> 返回对应的阳历对象。
#### 示例代码
```python
// 实例化
var lunar = Lunar.fromYmd(1986, 4, 21);
console.log(lunar);
// 转阳历
var solar = lunar.getSolar();
console.log(solar.toString());
console.log(solar.toFullString());
```
```python
# 实例化
lunar = Lunar.fromYmd(1986, 4, 21)
print lunar
# 转阳历
solar = lunar.getSolar()
print solar.toString()
print solar.toFullString()
```
> 输出
一九八六年四月廿一
1986-05-29
1986-05-29 00:00:00 星期四 双子座

## 阴历月LunarMonth

### 实例化

阴历月自v1.2.0版本加入，它的实例化有以下几种方式：
1. new LunarMonth(lunarYear, lunarMonth, dayCount, firstJulianDay)
> 指定`阴历年(数字)`、`阴历月(数字)`、`当月天数(数字)`、`初一的儒略日(数字)`生成阴历月对象。其中阴历月取值1-12，闰月为负数，如闰2月为-2。当月天数为29或30，小月29天，大月30天。
2. LunarMonth.fromYm(lunarYear, lunarMonth)
> 指定`阴历年(数字)`、`阴历月(数字)`自动计算生成阴历月对象。其中阴历月取值1-12，闰月为负数，如闰2月为-2。
#### 示例代码
```JavaScript
var lunarMonth = LunarMonth.fromYm(2012, -4);
console.log(lunarMonth.toString());、
```
> 输出
2012年闰四月(29)天

### toString

阴历月自v1.2.0版本加入。
1. .toString()
> 阴历月对象的默认字符串输出，格式为：YYYY年M月(D)天
#### 示例代码
```javascript
//实例化
var lunarMonth = LunarMonth.fromYm(3333, 2);
//默认字符串输出
console.log(lunarMonth);
console.log(lunarMonth.toString());

> 输出
3333年二月(30)天
3333年二月(30)天

### 获取年、月
阴历月自v1.2.0版本加入。
1. .getYear()
> 获取阴历年(数字)
2. .getMonth()
> 获取阴历月(数字)
#### 示例代码
```JavaScript
var lunarMonth = LunarMonth.fromYm(3333, 3);
console.log(lunarMonth.getYear());
console.log(lunarMonth.getMonth());
```
> 输出
3333
3

### 获取本月天数
阴历月自v1.2.0版本加入，阴历一个月只可能是30天或者29天。获取天数可以判断当月是大月(30天)还是小月(29天)。
1. .getDayCount()
> 获取当月天数
#### 示例代码
```JavaScript
var lunarMonth = LunarMonth.fromYm(2021, 9);
console.log(lunarMonth.getDayCount());
```
> 输出
30

### 是否闰月
阴历月自v1.2.0版本加入。
1. .isLeap()
> 判断当月是否闰月，是返回true，否返回false
#### 示例代码
```JavaScript
var lunarMonth = LunarMonth.fromYm(2020, 4);
console.log(lunarMonth.isLeap());
lunarMonth = LunarMonth.fromYm(2020, -4);
console.log(lunarMonth.isLeap());
```
> 输出
false

true

### 获取当月初一
阴历月自v1.2.0版本加入。
1. .getFirstJulianDay()
> 获取当月初一的儒略日，有了儒略日，就可以很方便的计算出阳历和阴历日期。
#### 示例代码
```JavaScript
var lunarMonth = LunarMonth.fromYm(2021, 9);
var firstJulianDay = lunarMonth.getFirstJulianDay();
// 儒略日转阳历
var solar = Solar.fromJulianDay(firstJulianDay);
// 转阴历
var lunar = solar.getLunar();
console.log(firstJulianDay);
console.log(solar.toYmd());
console.log(lunar.toString());
```
> 输出
2459494
2021-10-06
二〇二一年九月初一

### 阴历月的推移
获取加(减)几月后(前)的阳历月对象。
按月单独计算时，如果中间某一周有跨月现象，则那一周会当作2周计。
1. .next(months)
> 返回阴历月对象。  
`months(数字)`：推移的月数，正数为往后推，负数为往前推。
#### 示例代码
```JavaScript
// v1.2.27
var d = LunarMonth.fromYm(2022, 1);
// 往后推2月
console.log(d.next(2).toString());// v1.2.19
LunarMonth d = LunarMonth.fromYm(2022, 1);
// 往后推2月
System.out.println(d.next(2).toString());
```
> 输出
2022年三月(30)天

## 阴历年LunarYear

### 实例化
阴历年自v1.2.0版本加入，它的实例化有以下几种方式：
1. new LunarYear(lunarYear)
> 指定`阴历年(数字)`生成阴历年对象。
2. LunarYear.fromYear(lunarYear)
> 指定`阴历年(数字)`生成阴历年对象。
#### 示例代码
```JavaScript
var lunarYear = LunarYear.fromYear(2012);
console.log(lunarYear);
console.log(lunarYear.toFullString());
```
> 输出
2012
2012年


### toString
阴历年自v1.2.0版本加入，阴历年对象可以使用两种字符串输出方式：
1. .toString()
> 阴历年对象的默认字符串输出，格式为：YYYY
2. .toFullString()
> 阴历年对象的全量字符串输出，格式为：YYYY年
#### 示例代码
```JavaScript
//实例化
var lunarYear = LunarYear.fromYear(3333);
//默认字符串输出
console.log(lunarYear);
console.log(lunarYear.toString());
//全量字符串输出
console.log(lunarYear.toFullString());
```
> 输出
3333
3333

3333年

### 获取年
阴历年自v1.2.0版本加入。
1. .getYear()
> 获取阴历年
#### 示例代码
[未在此 'codes' 块中找到JavaScript或Python示例代码]
var lunarYear = LunarYear.fromYear(3333);
console.log(lunarYear.getYear());### 输出

### 获取阴历月
1. .getMonths()
> 获取阴历年对象中的所有月份（为保障节气的连续性，增加了冗余的月份）。返回一个阴历月对象的数组。
2. .getMonthsInYear()
> 获取当年的月份（正月到腊月，含闰月）。返回一个阴历月对象的数组。
3. .getMonth(lunarMonth)
> 指定当年的`阴历月份(数字)`获取阴历月对象。参数可选1-12，闰月为负数，如闰2月为-2。如果没有匹配的月份，返回null。
#### 示例代码
```JavaScript
var lunarYear = LunarYear.fromYear(2020);
// 获取月份
var months = lunarYear.getMonths();
for(var i=0, j=months.length; i<j; i++){
    console.log(months[i].toString());
}
// 获取当年月份
months = lunarYear.getMonthsInYear();
for(var i=0, j=months.length; i<j; i++){
    console.log(months[i].toString());
}
```
> 输出
2019年冬月(30)天
2019年腊月(30)天
2020年正月(29)天
2020年二月(30)天
2020年三月(30)天
2020年四月(30)天
2020年闰四月(29)天
2020年五月(30)天
2020年六月(29)天
2020年七月(29)天
2020年八月(30)天
2020年九月(29)天
2020年十月(30)天
2020年冬月(29)天
2020年腊月(30)天

2020年正月(29)天
2020年二月(30)天
2020年三月(30)天
2020年四月(30)天
2020年闰四月(29)天
2020年五月(30)天
2020年六月(29)天
2020年七月(29)天
2020年八月(30)天
2020年九月(29)天
2020年十月(30)天
2020年冬月(29)天
2020年腊月(30)天

### 获取闰月

阴历年自v1.2.0版本加入。
1. .getLeapMonth()
> 获取闰月数字，1代表闰1月，0代表无闰月
#### 示例代码
```JavaScript
var lunarYear = LunarYear.fromYear(2020);
console.log(lunarYear.getLeapMonth());
```
> 输出
4

### 获取天数
1. .getDayCount()
> 获取阴历年总天数。
#### 示例代码
```JavaScript
var lunarYear = LunarYear.fromYear(2020);
console.log(lunarYear.getDayCount());
```

> 输出
384

### 获取节气表

阴历年自v1.2.0版本加入。
1. .getJieQiJulianDays()
> 获取阴历年对象中的所有节气（儒略日）。返回一个数组。
#### 示例代码
```JavaScript
var lunarYear = LunarYear.fromYear(2020);
var jieQiJulianDays = lunarYear.getJieQiJulianDays();
for(var i=0, j=jieQiJulianDays.length; i<j; i++){
    var julianDay = jieQiJulianDays[i];
    var solar = Solar.fromJulianDay(julianDay);
    var lunar = solar.getLunar();
    console.log(julianDay + ' = ' + solar.toYmdHms() + ' ' + lunar.getJieQi());
}
```
> 输出
2458825.2627422535 = 2019-12-07 18:18:21 大雪
2458840.0134102306 = 2019-12-22 12:19:19 冬至
2458854.729159119 = 2020-01-06 05:29:59 小寒
2458869.4545491217 = 2020-01-20 22:54:33 大寒
2458884.210559813 = 2020-02-04 17:03:12 立春
2458899.0395020144 = 2020-02-19 12:56:53 雨水
2458913.956071851 = 2020-03-05 10:56:45 惊蛰
2458928.9927045694 = 2020-03-20 11:49:30 春分
2458944.1514137415 = 2020-04-04 15:38:02 清明
2458959.448164668 = 2020-04-19 22:45:21 谷雨
2458974.8689352926 = 2020-05-05 08:51:16 立夏
2458990.409139953 = 2020-05-20 21:49:10 小满
2459006.0404930008 = 2020-06-05 12:58:19 芒种
2459021.7385838227 = 2020-06-21 05:43:34 夏至
2459037.4682900296 = 2020-07-06 23:14:20 小暑
2459053.1921839593 = 2020-07-22 16:36:45 大暑
2459068.879206483 = 2020-08-07 09:06:03 立秋
2459084.4894463546 = 2020-08-22 23:44:48 处暑
2459100.00549232 = 2020-09-07 12:07:55 白露
2459115.396204575 = 2020-09-22 21:30:32 秋分
2459130.663282183 = 2020-10-08 03:55:08 寒露
2459145.791271826 = 2020-10-23 06:59:26 霜降
2459160.8012373983 = 2020-11-07 07:13:47 立冬
2459175.6941909725 = 2020-11-22 04:39:38 小雪
2459190.5065041366 = 2020-12-07 00:09:22 大雪
2459205.2515303507 = 2020-12-21 18:02:12 冬至
2459219.9745042394 = 2021-01-05 11:23:17 小寒
2459234.694239407 = 2021-01-20 04:39:42 大寒
2459249.4573982796 = 2021-02-03 22:58:39 立春
2459264.280423814 = 2021-02-18 18:43:49 雨水
2459279.203847976 = 2021-03-05 16:53:32 惊蛰

### 三元九运
古人把黄帝元年(公元前2697年)定位始元，这一年是甲子年，此后，每过60年为一个甲子周期，称为一元或一大运。
每过3个甲子，即为三元，分为上元、中元、下元。三元共计180年。
每一元，划分为3个小运，每个小运20年。
上元包括一运、二运、三运；中元包括四运、五运、六运；下元包括七运、八运、九运。
这就叫三元九运。
1. .getYuan()
> 获取元。返回一个字符串，例如：上元。
2. .getYun()
> 获取运。返回一个字符串，例如：八元。
#### 示例代码
```JavaScript
// v1.2.18
var lunarYear = LunarYear.fromYear(2020);
console.log(lunarYear.getYuan());
console.log(lunarYear.getYun());
```
> 输出
下元
八运

### 阴历年的推移
获取加(减)几月后(前)的阴历年对象。
1. .next(years)
> 返回阴历年对象。  
`years(数字)`：推移的年数，正数为往后推，负数为往前推。
#### 示例代码
```JavaScript
// v1.2.27
var d = LunarYear.fromYear(2022);
// 往后推2年
console.log(d.next(2).toFullString());
```
> 输出
2024年

## 阴历工具LunarUtil

### 获取阴历某月天数
1. LunarUtil.getDaysOfMonth(year, month)
> 返回天数(数字)。  
`year`：阴历年(数字)。  
`month`：阴历月(数字)，闰月为负数，如闰二月为-2。v1.2.0及以上版本已删除，可换用[LunarMonth](lunar-month.days.html)中的方法。
#### 示例代码
```
console.log(LunarUtil.getDaysOfMonth(2016,1));
```
> 输出
console.log(LunarUtil.getDaysOfMonth(2016,1));

### 阴历下月是几月
获取指定阴历年月的下一月是几月。
为什么需要这个方法？因为阴历和阳历不同，阴历会有闰月，比如某年闰4月，那么4月之后，会多出一个4月，所以有需要的时候，可以使用这个方法来获取下个月到底是几月。
1. LunarUtil.nextMonth(year, month)
> 返回月份(数字)，闰月为负数。  
`year`：阴历年(数字)。  
`month`：阴历月(数字)，闰月为负数，如闰二月为-2。v1.2.0及以上版本已删除，可换用[LunarMonth](lunar-month.next.html)中的方法。
#### 示例代码
```
console.log(LunarUtil.nextMonth(2016,1));
> 输出

### 阴历某年闰几月
获取指定阴历年的的闰月。
为什么需要这个方法？因为阴历和阳历不同，阴历会有闰月，比如某年闰4月，那么4月之后，会多出一个4月，所以有需要的时候，可以使用这个方法来获取指定年份闰几月。v1.2.0及以上版本已删除，可换用[LunarYear](lunar-year.leap.html)中的方法。
1. LunarUtil.getLeapMonth(year)
> 返回月份(数字)，1代表闰1月，0代表无闰月。  
`year`：阴历年(数字)。
#### 示例代码
```
console.log(LunarUtil.getLeapMonth(2017));
```
> 输出

### 时辰
时辰为中国传统计时单位。把一昼夜平分为十二段，每段叫做一个时辰，对应12地支，合现在的两小时。
时辰对照表：

{
  "子时": "23:00-00:59",
  "丑时": "01:00-02:59",
  "寅时": "03:00-04:59",
  "卯时": "05:00-06:59",
  "辰时": "07:00-08:59",
  "巳时": "09:00-10:59",
  "午时": "11:00-12:59",
  "未时": "13:00-14:59",
  "申时": "15:00-16:59",
  "酉时": "17:00-18:59",
  "戌时": "19:00-20:59",
  "亥时": "21:00-22:59"
},

1. LunarUtil.convertTime(hm)
> 返回时辰(地支)，如子。  
`hm`：HH:mm时刻。
#### 示例代码
```
console.log(LunarUtil.convertTime('23:59')+'时');
```
> 输出

子时