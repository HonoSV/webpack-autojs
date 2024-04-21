const { packageName, GLOBAL, CAN_SHUTDOWN } = require("./data");

function kill_app(name) {
    app.openAppSetting(name);
    text(app.getAppName(name)).waitFor();
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        log(app.getAppName(name) + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        log(app.getAppName(name) + "应用不能被正常关闭或不在后台运行");
        back();
    }
}

export function shutdown() {
    // 获取全局存储中是否允许退出的标志位
    var globalStorage = storages.create(GLOBAL);
    var canShutdown = globalStorage.get(CAN_SHUTDOWN);

    // 等待5分钟的退出信号
    if (!canShutdown) {
        for (let i = 0; i <= 60; i++) {
            toastLog("wait for can shutdown flag...");
            sleep(5 * 1000);
            canShutdown = globalStorage.get(CAN_SHUTDOWN);
            if (canShutdown) {
                toastLog("now can shutdown.");
                break;
            }
        }
    }

    // 5分钟后必然退出app
    kill_app(packageName)
}

export function halt() {
    kill_app(packageName)
}