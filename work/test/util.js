import { basePath } from "./data";

function calRegion(dat) {
    let res = [];
    let region = dat.region;

    res[0] = region[0];
    res[1] = region[1];
    res[2] = region[2] - region[0];
    res[3] = region[3] - region[1];

    toastLog(res)
    return res;
}

export function findImageByData(img, dat) {
    for (let i of dat.name) {
        let template = images.read(basePath + i + ".png");
        // toastLog(basePath + i + ".png")
        let reg = calRegion(dat);
        let result = images.findImage(img, template, {
            region: reg,
            threshold: 0.7
        });

        // 及时回收模板图片
        template.recycle()

        if (result) {
            toastLog("find " + i + " index: " + result.x + "," + result.y)
            
            return result;
        }
    }
    return null;
}

export function clickByData(param) {
    if (param.isxy) {
        toastLog("click " +  param.name + " index: " +  param.xy[0] + "," + param.xy[1])
        click(param.xy[0], param.xy[1]);
    }
}

export function findAndClickByData(img, data) {
    let result =  findImageByData(img, data);
    if (result) {
        if (data.isxy) {
            toastLog("click(xy) " +  data.name + " index: " +  data.xy[0] + "," + data.xy[1])
            click(data.xy[0], data.xy[1]);
        } else {
            let x = result.x + data.offest[0]
            let y = result.y + data.offest[1]
            toastLog("click(offset) " +  data.name.toString() + " index: " +  x + "," + y)
            click(x, y);
        }
        return true;
    }
    return false;
}

export function findAndClickByDataList(img, dataList) {
    for (let data of dataList) {
        findAndClickByData(img, data);
    }
}

