import shenshaRules from '../data/shenshaRules.js';

/**
 * 辅助函数：根据ID在baziProfile中查找并返回对应的元素对象（干、支或柱）
 * @param {Object} profile - baziProfile 对象
 * @param {string} id - 要查找的元素ID
 * @returns {Object|null} - 找到的元素对象或null
 */
// 这是【新代码】，请用它替换旧函数
function findElementById(profile, id) {
    if (!id) return null;

    // 检查原局四柱
    const pillars = [profile.yearPillar, profile.monthPillar, profile.dayPillar, profile.hourPillar];
    for (const p of pillars) {
        if (!p) continue;
        if (p.id === id) return p;
        if (p.gan && p.gan.id === id) return p.gan;
        if (p.zhi && p.zhi.id === id) return p.zhi;
    }

    // 检查大运、流年和小运
    for (const d of profile.dayun) {
        if (!d) continue;
        if (d.id === id) return d;
        if (d.gan && d.gan.id === id) return d.gan;
        if (d.zhi && d.zhi.id === id) return d.zhi;

        if (d.liunian) {
            for (const l of d.liunian) {
                if (!l) continue;
                if (l.id === id) return l;
                if (l.gan && l.gan.id === id) return l.gan;
                if (l.zhi && l.zhi.id === id) return l.zhi;

                // --- 新增逻辑：深入检查每个流年下的小运对象 ---
                if (l.xiaoYun) {
                    if (l.xiaoYun.id === id) return l.xiaoYun;
                    if (l.xiaoYun.gan && l.xiaoYun.gan.id === id) return l.xiaoYun.gan;
                    if (l.xiaoYun.zhi && l.xiaoYun.zhi.id === id) return l.xiaoYun.zhi;
                }
                // --- 新增逻辑结束 ---
            }
        }
    }

    return null;
}

/**
 * 辅助函数：检查神煞规则的前提条件是否满足
 * @param {Object} preconditions - 前提条件对象或数组
 * @param {Object} context - 包含flatMap和gender的上下文
 * @returns {boolean} - 是否满足前提
 */
function checkPreconditions(preconditions, context) {
    if (!preconditions) return true;

    const { flatMap, gender } = context;
    const conditions = Array.isArray(preconditions) ? { logic: 'and', conditions: preconditions } : preconditions;

    if (!conditions.conditions || !Array.isArray(conditions.conditions)) {
        return true; 
    }

    const check = (cond) => {
        if (!cond || !cond.on || !cond.value) return false;
        
        const value = cond.on === 'gender' ? gender : flatMap.get(cond.on);
        if (value === undefined) return false;
        
        const valueArray = Array.isArray(cond.value) ? cond.value : [cond.value];
        return valueArray.includes(value);
    };

    if (conditions.logic === 'or') {
        return conditions.conditions.some(check);
    } else {
        return conditions.conditions.every(check);
    }
}

/**
 * 主函数：为命盘计算并标记所有神煞
 * @param {Object} context - 包含baziProfile, flatMap, baziIndex, gender的完整上下文
 */
function calculateShensha(context) {
    const { baziProfile, flatMap, baziIndex } = context;

    for (const shenshaRule of shenshaRules) {
        const { name, branches, preconditions, rules } = shenshaRule;
        let activeRules = null;

        if (branches) {
            for (const branch of branches) {
                if (checkPreconditions(branch.preconditions, context)) {
                    activeRules = branch.rules;
                    break;
                }
            }
        } else if (checkPreconditions(preconditions, context)) {
            activeRules = rules;
        }

        if (!activeRules) continue;

        for (const rule of activeRules) {
            if (!rule || !rule.trigger || !rule.judgment) {
                continue;
            }
            
            const triggerOnArray = Array.isArray(rule.trigger.on) ? rule.trigger.on : [rule.trigger.on];
            
            const triggerValueArray = Array.isArray(rule.trigger.value) ? rule.trigger.value : [rule.trigger.value];
            
            let triggerId = null;
            
            for (const triggerOn of triggerOnArray) {
                if (!triggerOn) continue;
                
                const value = flatMap.get(triggerOn);
                if (triggerValueArray.includes(value)) {
                    const prefix = triggerOn.match(/^(year|month|day|hour)/)?.[0];
                    if (prefix) {
                        const pillar = baziProfile[`${prefix}Pillar`];
                        if (pillar) {
                           if (triggerOn.endsWith('Gan')) triggerId = pillar.gan.id;
                           else if (triggerOn.endsWith('Zhi')) triggerId = pillar.zhi.id;
                           else triggerId = pillar.id;
                           break;
                        }
                    }
                }
            }
            
            if (!triggerId) continue;

            if (!rule.judgment.on) continue;
            
            const judgeOnArray = Array.isArray(rule.judgment.on) ? rule.judgment.on : [rule.judgment.on];
            
            const judgeValueArray = Array.isArray(rule.judgment.value) ? rule.judgment.value : [rule.judgment.value];
            
            const { exclude_trigger } = rule.judgment;
            let targetIds = [];

            for (const on of judgeOnArray) {
                if (!on) continue;
                
                if (on.startsWith('all')) {
                    const type = on.replace('all', '').toLowerCase();
                    judgeValueArray.forEach(v => {
                        if (v && baziIndex[v]) {
                            targetIds.push(...(baziIndex[v] || []));
                        }
                    });
                    if (type !== 'pillar') {
                        targetIds = targetIds.filter(id => id.endsWith(type.charAt(0)) || 
                                                 (id.startsWith('xy') && type.charAt(0) === id.slice(-1)));
                    }
                } else {
                    const prefix = on.match(/^(year|month|day|hour)/)?.[0];
                    if (prefix) {
                        const pillar = baziProfile[`${prefix}Pillar`];
                        if (pillar) {
                            let targetElement = null;
                            if (on.endsWith('Gan')) targetElement = pillar.gan;
                            else if (on.endsWith('Zhi')) targetElement = pillar.zhi;
                            else targetElement = pillar;

                            if (targetElement && judgeValueArray.includes(targetElement.value)) {
                                targetIds.push(targetElement.id);
                            }
                        }
                    }
                }
            }
            
            if (exclude_trigger) {
                targetIds = targetIds.filter(id => id !== triggerId);
            }

            for (const id of targetIds) {
                const element = findElementById(baziProfile, id);
                if (element && !element.shensha.includes(name)) {
                    element.shensha.push(name);
                }
            }
        
        }
    }
}

export { calculateShensha };
