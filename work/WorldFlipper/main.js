/* eslint-disable no-constant-condition */
const { GLOBAL, CAN_SHUTDOWN } = require("./data");
const { shutdown, halt } = require("./kill");
const { snapRing } = require("./ring");
const { startWF } = require("./start");

// 初始化全局存储
var globalStorage = storages.create(GLOBAL);
// CAN_SHUTDOWN 存放子脚本是否允许退出的标志位
globalStorage.put(CAN_SHUTDOWN, true);
// 运行线程
var mainThread = null;


function run(func) {
    // 启动游戏
    startWF();
    let startTime = new Date().getTime();

    // 运行子线程脚本
    let thread = threads.start(() => func());

    let checkInterval = 5; // 每5分钟检测一次
    let runDuration = 60; // 脚本运行60分钟该停了

    // 主线程用sleep阻塞，反复检测时间
    while (true) {
        let nowDate = new Date();

        // 5点钟系统清退时间，必须强制下线关游戏
        if (nowDate.getHours() == 5 && nowDate.getMinutes() / checkInterval <= 1) {
            toastLog("POWEROFF...")
            halt();
            break;
        } else if (nowDate.getTime() - startTime > runDuration * 60 * 1000) {
            toastLog("have a rest...")
            shutdown();
            break;
        }

        sleep(checkInterval * 60 * 1000)
    }

    thread.interrupt();
    sleep(checkInterval * 60 * 1000)
}

function main() {
    // todo 获取动作类型
    let type = snapRing;

    // todo 停止运行动作
    if (type == "stop" && mainThread) {
        mainThread.interrupt();
    } else {
        mainThread = threads.start(function() {
            while (true) {
                run(type)
            }
        })
    }
}

main()