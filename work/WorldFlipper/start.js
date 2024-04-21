/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
const { findImageByData, clickByData, findAndClickByData } = require("./util");
const { homeBtn, clickStartTag, packageName, surrenderBtn } = require("./data");

export function startWF() {
    // 唤醒app
    app.launch(packageName);
    sleep(10000);

    // 请求截图
    // 每次使用该函数都会弹出截图权限请求，建议选择“总是允许”。
    if (!requestScreenCapture(false)) {
        toastLog("低版本尝试请求截图失败");
    }
    // 安卓版本高于Android 9
    if (device.sdkInt>28) {
        //等待截屏权限申请并同意
        threads.start(function () {
            packageName('com.android.systemui').text('立即开始').waitFor();
            text('立即开始').click();
        });
    }
    // 申请截屏权限
    if (!requestScreenCapture()) {
        toastLog("高版本尝试请求截图失败");
        exit();
    }



    // 检测是否进入主界面，如果没有就狂点击屏幕下发的点击开始，直到进入主城
    while (true) {
        toastLog("wait for enter game...")
        let screenshot = images.captureScreen();

        let homePoint = findImageByData(screenshot, homeBtn);
        if (homePoint) {
            clickByData(homeBtn)
            toastLog("enter game success.")
            break;
        }

        // 放弃之前中断的局
        let isSurrender = findAndClickByData(screenshot, surrenderBtn)
        if (isSurrender) {
            toastLog("give up last fight.")
        }
        
        clickByData(clickStartTag);
        sleep(5000);
    }
}