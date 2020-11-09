


let judgeCanCombineHouse = function(locationInfo) {
    let houseLevelArray = [];
    let houseInfoArray = {};
    let weakGuideHouseResult = {
        existWeakGuide: false,
        weakGuideHandHouseInfo: [],
        everyLevelHouseInfo:{}
    };
    for (let attr in locationInfo) {
        let houseInfo = locationInfo[attr];
        if (houseInfo !== null && houseInfo !== undefined) {
            if(houseInfoArray[houseInfo.level]) {
            } else {
                houseInfoArray[houseInfo.level] = [];
                houseLevelArray.push(houseInfo.level);
            }
            houseInfoArray[houseInfo.level].push({index: houseInfo.locationIndex, level:houseInfo.level});
        }
    }
    

    houseLevelArray.sort();
    
    let weakDestHouseInfo = [];
    for (const level of houseLevelArray) {
        houseInfoArray[level].sort((a, b) => {
            return a.index < b.index;
        });
        if(houseInfoArray[level].length >= 2){
            //说明存在弱引导手势的房子
            if(weakDestHouseInfo.length === 0) {
                weakDestHouseInfo = houseInfoArray[level];
            }
        }
    }

    if(weakDestHouseInfo.length >= 2) {
        weakGuideHouseResult.existWeakGuide = true;
        //筛选距离最近的两个房子
        let minIndex = 0;
        let minDistance = -1;
        for(let i = 0; i < weakDestHouseInfo.length - 1; i++) {
            let curDistance = weakDestHouseInfo[i + 1].index - weakDestHouseInfo[i].index;
            if(minDistance === -1 || curDistance < minDistance) {
                minDistance = curDistance;
                minIndex = i;
            }
        }
        weakGuideHouseResult.weakGuideHandHouseInfo = [weakDestHouseInfo[minIndex], weakDestHouseInfo[minIndex + 1]];
    }
    weakGuideHouseResult.everyLevelHouseInfo = houseInfoArray;

    return weakGuideHouseResult;
}

let test = function() {
    let locationInfo = {
		"11": null,
		"1": {
			"coinSpeed": "10",
			"img": null,
			"level": 2,
			"locationIndex": 1,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"12": {
			"coinSpeed": "10",
			"img": null,
			"level": 2,
			"locationIndex": 12,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"2": null,
		"3": {
			"coinSpeed": "10",
			"img": null,
			"level": 1,
			"locationIndex": 3,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"4": {
			"coinSpeed": "10",
			"img": null,
			"level": 1,
			"locationIndex": 4,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"5": null,
		"6": null,
		"7": null,
		"8": null,
		"9": null,
		"10": {
			"coinSpeed": "10",
			"img": null,
			"level": 2,
			"locationIndex": 10,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
    };
    let weakGuideHouseResult = judgeCanCombineHouse(locationInfo);
    console.log(JSON.stringify(weakGuideHouseResult));
}


test();