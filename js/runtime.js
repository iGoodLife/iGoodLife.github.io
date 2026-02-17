const enterTime = new Date();

function createtime() {
    var now = new Date();

    var launch = new Date("03/01/2025 00:00:00");
    var days = (now - launch) / 1000 / 60 / 60 / 24;
    /* 从开始到现在的时间间隔 天 */
    var d = Math.floor(days);

    /* 时 */
    var h = (now - launch) / 1000 / 60 / 60 - 24 * d;
    var hFloor = Math.floor(h);
    if (String(hFloor).length == 1) hFloor = "0" + hFloor;

    /* 分 */
    var m = (now - launch) / 1000 / 60 - 1440 * d - 60 * hFloor;
    var mFloor = Math.floor(m);
    if (String(mFloor).length == 1) mFloor = "0" + mFloor;

    /* 秒 */
    var s = (now - launch) / 1000 - 86400 * d - 3600 * hFloor - 60 * mFloor;
    var sRound = Math.round(s);
    if (String(sRound).length == 1) sRound = "0" + sRound;

    /* 计算Bug */
    const bugs = Math.floor((now - enterTime) / 1000 * 37);

    /* 白天or夜晚 显示不同内容 */
    let content = "";

    if (hFloor < 18 && hFloor >= 9) {
    content = `
        <img class="boardsign" src="https://picbed.karon.top/svg/badge_day.svg" 
            alt="☕Kor学堂 快乐摸鱼" title="什么时候能够实现财富自由呀~"><br>
        <div style="font-size:13px;font-weight:bold">
        本站已运行 ${d} 天 ${hFloor} 小时 ${mFloor} 分 ${sRound} 秒 
        <i id="heartbeat" class='fas fa-heartbeat fa-beat' style="color:red;"></i><br>
        自你进入本站以来，宇宙中可能诞生了 ${bugs} 个新 Bug 🐞，相当于一位程序员🧑‍💻加班 ${Math.floor(bugs / 13)} 次的产出量
        </div>
    `;
    } else {
    content = `
        <img class="boardsign" src="https://picbed.karon.top/svg/badge_night.svg" 
            alt="☕Kor学堂 注意休息哦" title="下班了就该开开心心地玩耍~"><br>
        <div style="font-size:13px;font-weight:bold">
        本站已运行 ${d} 天 ${hFloor} 小时 ${mFloor} 分 ${sRound} 秒 
        <i id="heartbeat" class='fas fa-heartbeat fa-beat' style="color:red;"></i><br>
        自你进入本站以来，宇宙中可能诞生了 ${bugs} 个新 Bug 🐞，相当于一位程序员🧑‍💻加班 ${Math.floor(bugs / 13)} 次的产出量
        </div>
    `;
    }


    if (document.getElementById("workboard")) {
        document.getElementById("workboard").innerHTML = content;
    }
}

setInterval(() => {
    createtime();
}, 1000);
