// const { backBtn, backBtn2 } = require("./data");
// const { snapRing } = require("./ring");
// const { findImageByData } = require("./util");


// var back = images.read("/mnt/shared/Pictures/wf/backBtn2.png")
// var img = images.read("/storage/emulated/0/Pictures/Screenshots/test.png")
// var p = images.findImage(img, back) 
// if (p) {
//     toastLog(p)
// } else {
//     toastLog('404')
// }
// back.recycle()

// var r = findImageByData(img, backBtn2) 
// if (r) {
//     toastLog(r)
// } else {
//     toastLog('404')
// }
function run() {
    while(true) {
        toastLog("running...")
        sleep(1000)
    }
}

function main() {
    while (true) {
        toastLog("start")
        thread = threads.start(() =>  run())
        sleep(5000)
        thread.interrupt()
        toastLog("end")
    }
}

main()