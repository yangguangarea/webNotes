


let judgeCanCombineHouse = function(locationInfo) {
	let elementLevelArray = [];
	let elementInfoArray = {};
	let weakGuideElementResult = {
		existWeakGuide: false,//是否有可弱引导的元素
		weakGuideHandElementInfo: [],//弱引导手势的元素数据
		everyLevelElementInfo:{}//按等级存储的元素相关数据
	};
	for (let attr in locationInfo) {
		let elementInfo = locationInfo[attr];
		if (elementInfo !== null && elementInfo !== undefined && elementInfo.type !== 2) {
			if(elementInfoArray[elementInfo.level]) {
			} else {
				elementInfoArray[elementInfo.level] = [];
				elementLevelArray.push(Number(elementInfo.level));
			}
			elementInfoArray[elementInfo.level].push({index: Number(elementInfo.locationIndex), level:elementInfo.level});
		}
	}
	elementLevelArray.sort();
	let weakDestElementInfo = [];
	for (const level of elementLevelArray) {
		elementInfoArray[level].sort((a, b) => {
			return a.index - b.index;
		});
		if(elementInfoArray[level].length >= 2){
			//说明存在弱引导手势的房子
			if(weakDestElementInfo.length === 0 || weakDestElementInfo[0].level > level) {
				weakDestElementInfo = elementInfoArray[level];   
			}
		}
	}
	if(weakDestElementInfo.length >= 2) {
		weakGuideElementResult.existWeakGuide = true;
		//筛选距离最近的两个房子
		let minIndex = -1;
		let maxIndex = -1;
		let minDistance = -1;

		let row = 4;
		let column = 3;

		for(let i = 0; i < weakDestElementInfo.length; i++) {
			for(let j = 0; j < weakDestElementInfo.length; j++) {
				// 1-12转化为行列
				if(i !== j) {
					let startPos = {x:Math.floor((weakDestElementInfo[i].index - 1) / column) + 1, 
						y:(weakDestElementInfo[i].index - 1) % column + 1};
					let endPos = {x:Math.floor((weakDestElementInfo[j].index - 1) / column) + 1, 
						y:(weakDestElementInfo[j].index - 1) % column + 1};

					let curDistance = (endPos.x - startPos.x) * (endPos.x - startPos.x) + 
					(endPos.y - startPos.y) * (endPos.y - startPos.y);
					if(minDistance === -1 || curDistance < minDistance) {
						minDistance = curDistance;
						minIndex = i;
						maxIndex = j;
					}
				}
			}
		}
		weakGuideElementResult.weakGuideHandElementInfo = [weakDestElementInfo[minIndex], weakDestElementInfo[maxIndex]];
	}
	weakGuideElementResult.everyLevelElementInfo = elementInfoArray;

	return weakGuideElementResult;
}

let test = function() {
    let locationInfo = {
		"11": {
			"coinSpeed": null,
			"img": null,
			"level": 0,
			"locationIndex": 11,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 1,
			"type": 2
		},
		"1": {
			"coinSpeed": "1663",
			"img": null,
			"level": 9,
			"locationIndex": 1,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"12": {
			"coinSpeed": "7372",
			"img": null,
			"level": 11,
			"locationIndex": 12,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"2": {
			"coinSpeed": "3502",
			"img": null,
			"level": 10,
			"locationIndex": 2,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"3": {
			"coinSpeed": "375",
			"img": null,
			"level": 7,
			"locationIndex": 3,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"4": {
			"coinSpeed": "1663",
			"img": null,
			"level": 9,
			"locationIndex": 4,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"5": {
			"coinSpeed": "15520",
			"img": null,
			"level": 12,
			"locationIndex": 5,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"6": {
			"coinSpeed": "1663",
			"img": null,
			"level": 9,
			"locationIndex": 6,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"7": {
			"coinSpeed": "85",
			"img": null,
			"level": 5,
			"locationIndex": 7,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"8": {
			"coinSpeed": "7372",
			"img": null,
			"level": 11,
			"locationIndex": 8,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"9": {
			"coinSpeed": "85",
			"img": null,
			"level": 5,
			"locationIndex": 9,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		},
		"10": {
			"coinSpeed": "85",
			"img": null,
			"level": 5,
			"locationIndex": 10,
			"name": null,
			"ore": null,
			"oreValue": null,
			"state": 0,
			"type": 1
		}
	};
    let weakGuideHouseResult = judgeCanCombineHouse(locationInfo);
	console.log(JSON.stringify(weakGuideHouseResult));
	console.log(weakGuideHouseResult);
}

test();