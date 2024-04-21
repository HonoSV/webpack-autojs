/* eslint-disable no-constant-condition */


import * as data from './data.js'
import * as common from './util.js'

var JUST_CLICK_LIST = [data.joinBtn, data.okBtn, data.continueBtn, data.leaveBtn, data.cancelBtn];

// 在主城进入循环找铃铛
export function snapRing() {
    toastLog("snap ring...")

    // 获取全局存储中是否允许退出的标志位
    var globalStorage = storages.create(data.GLOBAL);
    var canShutdown = globalStorage.get(data.CAN_SHUTDOWN);

    // 初始化一个上次入局时间
    let lastPreTime = new Date().getTime();
    while (true) {
        let screenshot = images.captureScreen()
        // 如果图中有铃铛就抢铃铛
        if (common.findAndClickByData(screenshot, data.ringPic)) {
            toastLog("find ring...");
            // 抢完铃铛会有弹出参加按钮的动画，稍等一会
            sleep(500);
            // 如果有参加按钮就点参加按钮
            if (common.findAndClickByData(images.captureScreen(), data.joinBtn)) {
                toastLog("joining...");
                // 点完参加以后会loading，等待5s
                sleep(5000);
                // 如果有准备按钮就点准备按钮
                if (common.findAndClickByData(images.captureScreen(), data.prepareBtn)) {
                    toastLog("prepare to fight...");
                    // 更新入局时间为当前时间
                    lastPreTime = new Date().getTime();

                    // 一旦入局，则不允许退出子脚本
                    if (canShutdown) {
                        canShutdown = false;
                        globalStorage.put(data.CAN_SHUTDOWN, canShutdown);
                    }

                    // 后面就不用走了，进入下一次截图检测
                    continue;
                }
            }
        }
            
        // 自动续关会导致一直留在别人房间，要专门写一段退出的逻辑
        if (common.findAndClickByData(screenshot, data.backBtn)) {
            toastLog("back...");
            sleep(900);
            if (common.findAndClickByData(images.captureScreen(), data.backBtn2)) {
                toastLog("back2...");   
            }
            toastLog("no back.")
        }

        // 不管三七二十一都要点的按钮
        common.findAndClickByDataList(screenshot, JUST_CLICK_LIST);

        // 检测当前时间距离上次入局时间，如果大于5分钟则可能被特殊层遮罩了（比如升级满体），这时候需要点击一下屏幕
        let afterLastPre = new Date().getTime - lastPreTime;
        if (afterLastPre > 5 * 60 * 1000) {
            common.clickByData(data.clickStartTag);
        }

        // 检测当前是否在主界面，在则可以进行退出
        if (!canShutdown) {
            let homePoint = common.findImageByData(screenshot, data.homeBtn);
            if (homePoint) {
                canShutdown = true;
                globalStorage.put(data.CAN_SHUTDOWN, canShutdown);
            }
        }

        sleep(50);
    }
}






