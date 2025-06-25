
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

#### 胎元、命宫、身宫
1. .getTaiYuan()
> 获取胎元
2. .getMingGong()
> 获取命宫
3. .getShenGong()
> 获取身宫
#### 起运
起运算法流派很多，各流派之间计算会存在误差，目前支持2个流派：
流派1：阳年(年干为甲、丙、戊、庚、壬为阳)生男、阴年(年干为乙、丁、己、辛、癸为阴)生女从出生时辰开始往后推至下一个节令时辰，阴年(年干为乙、丁、己、辛、癸为阴)生男、阳年(年干为甲、丙、戊、庚、壬为阳)生女从出生时辰开始往前倒推至上一个节令时辰，计算经历的天数和时辰数，按3天为1年，1天为4个月，1个时辰为10天进行换算，得到出生几年几个月几天后起运。
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



获取十神的方法见[八字]。

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