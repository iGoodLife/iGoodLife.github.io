(function () {
  const wishes = [
    "别太辛苦，记得多喝水～",
    "工作学习再忙，也要照顾好自己～",
    "累了就休息一下，慢慢来就好～",
    "今天也要保持好心情呀～",
    "记得抬头看看窗外，放松一下～",
  ];

  function pickWish() {
    return wishes[Math.floor(Math.random() * wishes.length)];
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function rainbowText(text) {
    // 颜色池多一点（你也可以继续加）
    const colors = [
      "#ff4d4f",
      "#ff7875",
      "#ff7a45",
      "#ffa940",
      "#ffc53d",
      "#fadb14",
      "#a0d911",
      "#52c41a",
      "#13c2c2",
      "#36cfc9",
      "#1677ff",
      "#2f54eb",
      "#722ed1",
      "#b37feb",
      "#eb2f96",
      "#ff85c0",
    ];

    const chars = Array.from(text);
    let lastColor = null;

    function pickColor() {
      // 随机挑一个，但尽量避免和上一个一样
      let c = colors[Math.floor(Math.random() * colors.length)];
      if (colors.length > 1) {
        let guard = 0;
        while (c === lastColor && guard < 10) {
          c = colors[Math.floor(Math.random() * colors.length)];
          guard++;
        }
      }
      lastColor = c;
      return c;
    }

    return chars
      .map((ch) => {
        const c = pickColor();
        return `<span class="ip-rainbow" style="color:${c};font-weight:700;">${escapeHtml(
          ch,
        )}</span>`;
      })
      .join("");
  }

  function setText(place) {
    const el = document.getElementById("ip_welcome");
    if (!el) return;

    const wish = pickWish();

    if (place) {
      const placeHtml = `“<span class="ip-place">${rainbowText(place)}</span>”`;
      el.innerHTML = `来自${placeHtml}的小伙伴，你好呀～${escapeHtml(wish)}`;
    } else {
      el.textContent = `远方的小伙伴，你好呀～${wish}`;
    }
  }

  // 省级映射（够用版：你可以慢慢补全）
  const regionMap = {
    Shaanxi: "陕西",
    Shanxi: "山西",
    Beijing: "北京",
    Shanghai: "上海",
    Tianjin: "天津",
    Chongqing: "重庆",
    Guangdong: "广东",
    Zhejiang: "浙江",
    Jiangsu: "江苏",
    Sichuan: "四川",
    Hubei: "湖北",
    Hunan: "湖南",
    Fujian: "福建",
    Shandong: "山东",
    Henan: "河南",
    Hebei: "河北",
    Liaoning: "辽宁",
    Jilin: "吉林",
    Heilongjiang: "黑龙江",
    Anhui: "安徽",
    Jiangxi: "江西",
    Guangxi: "广西",
    Yunnan: "云南",
    Guizhou: "贵州",
    Gansu: "甘肃",
    Qinghai: "青海",
    Hainan: "海南",
    Xinjiang: "新疆",
    Tibet: "西藏",
    Ningxia: "宁夏",
    "Inner Mongolia": "内蒙古",
    "Hong Kong": "香港",
    Macau: "澳门",
    Taiwan: "台湾",
  };

  // 城市映射（按需补；先把你遇到的 Xi'an 放进去）
  const cityMap = {
    "Xi'an": "西安",
    Xian: "西安",
    Nanjing: "南京",
    Suzhou: "苏州",
    Hangzhou: "杭州",
    Guangzhou: "广州",
    Shenzhen: "深圳",
    Chengdu: "成都",
    Wuhan: "武汉",
  };

  function normalizePlace(region, city) {
    const r = regionMap[region] || region || "";
    const c = cityMap[city] || city || "";

    // 处理 "Xi'an" 这种带撇号的情况：如果 map 不全，至少去掉撇号再试一次
    if (!c && city) {
      const city2 = city.replace(/'/g, "");
      if (cityMap[city2]) return r + cityMap[city2];
    }

    if (r && c) return r + c;
    return r || c || "";
  }

  fetch("https://ipapi.co/json/")
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((d) => {
      const region = (d && d.region) || "";
      const city = (d && d.city) || "";
      const place = normalizePlace(region, city);
      setText(place);
    })
    .catch(() => {
      setText("");
    });
})();
