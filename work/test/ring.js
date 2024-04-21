/* eslint-disable no-constant-condition */


import * as data from './data.js'
import * as common from './util.js'

var JUST_CLICK_LIST = [data.joinBtn, data.okBtn, data.continueBtn, data.leaveBtn];

// 在主城进入循环找铃铛
export function snapRing() {
    toastLog("snap ring...")
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
        sleep(50);
    }
}






