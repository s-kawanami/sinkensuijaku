const tmpNum = 26;                               //トランプの種類
const uraCnt = tmpNum * 2;                      //トランプの数
let ura = new Array(uraCnt);                    //トランプの裏面の配列
let omote = new Array(uraCnt);                  //トランプの表面の配列
const omoteImg = [                              //  トランプの画像の配列
    "images/torannpu-illust1.png",
    "images/torannpu-illust2.png",
    "images/torannpu-illust3.png",
    "images/torannpu-illust4.png",
    "images/torannpu-illust5.png",
    "images/torannpu-illust6.png",
    "images/torannpu-illust7.png",
    "images/torannpu-illust8.png",
    "images/torannpu-illust9.png",
    "images/torannpu-illust10.png",
    "images/torannpu-illust11.png",
    "images/torannpu-illust12.png",
    "images/torannpu-illust13.png",
    "images/torannpu-illust27.png",
    "images/torannpu-illust28.png",
    "images/torannpu-illust29.png",
    "images/torannpu-illust30.png",
    "images/torannpu-illust31.png",
    "images/torannpu-illust32.png",
    "images/torannpu-illust33.png",
    "images/torannpu-illust34.png",
    "images/torannpu-illust35.png",
    "images/torannpu-illust36.png",
    "images/torannpu-illust37.png",
    "images/torannpu-illust38.png",
    "images/torannpu-illust39.png",
];
const uraParent = document.getElementById("ura");  //裏面の画像を入れるところ
const omoteParent = document.querySelector(".omote");  //表面の親要素
const uraImg = "images/uramen.png";             //裏面の画像イラスト
let k = 0;                                      //表面の画像の添え字
let flg = 0;                                    //めくった画像が一枚目なのか二枚目なのか
let set, mae, current;                          //iを運ぶ、前の前引いた画像の添え字、前の画像の添え字
let flg2 = 0;
const button = document.getElementById("button");
const label = document.getElementById("label");
let cnt = 0;
let pare = tmpNum;

//　裏面配置&属性付け
function UraCreate(uraImage) {
    for (let i = 0; i < uraCnt; i++) {
        ura[i] = document.createElement("img");
        ura[i].setAttribute("src", uraImage);
        ura[i].setAttribute("id", "ura" + i);
        ura[i].setAttribute("onclick", "Open_rtn(" + i + ")");
        ura[i] = uraParent.appendChild(ura[i]);      
    }
}
//表面配置&属性付け
function OmoteCreate1(omoteImage) {
    omoteImage.forEach((item, index) => {  
        omote[k] = document.createElement("img");
        omote[k].setAttribute("src", item);
        omote[k].setAttribute("class", "omote" + index);
        omote[k].setAttribute("id", "omote" + k);
        omote[k].setAttribute("style", "order:" + k);
        omote[k] = omoteParent.appendChild(omote[k]);
        k++;
    });
}
//表面全体配置
function OmoteCreate(omoteImg) {
    OmoteCreate1(omoteImg);
    OmoteCreate1(omoteImg);
}

//表面シャッフル
function ShuffleOmote() {
    omote.forEach((item,index) => {
        let random = Math.floor(Math.random() * uraCnt);
        let t = getComputedStyle(omote[index]).order;
        for (let i = 0; i < uraCnt; i++) {
            if (getComputedStyle(omote[i]).order == random) {
                omote[i].style.order = t;
                omote[index].style.order = random;
                
            }
        }
    })
    AddVisible();
    Reverce();
    AddMargin();
    NotMargin();
}
//一番右の余白を消す
function NotMargin() {
    for (let i = 0; i < uraCnt; i++) {

        if ((Number(getComputedStyle(omote[i]).order) + 1)%10 == 0) {
            omote[i].style.margin = "0px";
        }
    }
}
//全てのカードの右に余白をつけなおす
function AddMargin() {
    for (let i = 0; i < uraCnt; i++) {
            omote[i].style.marginRight = "10px";
    }
}
function AddVisible() {
    for (let i = 0; i < uraCnt; i++) {
        ura[i].style.visibility = "visible";
    }
}



let flgc = 0;
let omoteIndex;
let omoteIndex2;
let uraIndex2;
let uraIndex;

//トランプが押された時の処理
function Open_rtn(num) {
    if (flgc >= 2) {
        return;
    }
    flgc++;
    cnt++;
    uraIndex = num;
    omoteIndex = ForwardOmote(num);
    ShowOmote(omoteIndex);
    ClearUra(uraIndex);
    if (flg == 0) {
        flg++;
        omoteIndex2 = omoteIndex;
        uraIndex2 = uraIndex;
    } else if (flg == 1) {
        flg = 0;
        Hantei_rtn(omoteIndex, omoteIndex2, uraIndex, uraIndex2); 
        if (pare == 0) {
            HanteiText();
        }
    }
}
function ForwardOmote(num) {
    for (let i = 0; i < uraCnt; i++) {
        if (getComputedStyle(omote[i]).order == num) {
            omote[i].style.visibility = "visible";
            return i;
        }
    }
}

//大本
function Hantei_rtn(index, index2, index3, index4) {
    let t = setTimeout(() => {
        ClearCard(index, index2)
    }, 500);
    if (!IsExist(index, index2)) {
        t = setTimeout(() => {
            ShowUra(index3, index4)
        }, 500);
    }
}

//判定
function IsExist(index,index2) {
    if (omote[index].className !== omote[index2].className) {
        return 0;
    } else {
        pare--;
        ShowMaisu();
        return 1;
    }
}
function ShowMaisu() {
    label.innerText = "残り" + pare + "組";
}
//表のカード一枚を表示する
function ShowOmote(index) {
    omote[index].style.visibility = "visible";
}

//表のカード二枚を消す
function ClearCard(index,index2) {
    omote[index].style.visibility = "hidden";
    omote[index2].style.visibility = "hidden";
    flgc=0;
}

//裏のかーど二枚を表示する
function ShowUra(index, index2) {
    ura[index].style.visibility = "visible";
    ura[index2].style.visibility = "visible";
}

//裏のカード一枚を消す
function ClearUra(index) {
    ura[index].style.visibility = "hidden";
}




//すべて裏面にする
function Reverce() {
    cnt = 0;
    for (let i = 0; i < uraCnt; i++) {
        omote[i].style.visibility = "hidden";
    }
}

button.addEventListener('click', () => {
    ShuffleOmote();
    pare = tmpNum;
    label.innerText = "残り" + pare + "組";
})

window.addEventListener('load', () => {
    label.innerText = "残り" + tmpNum + "組";
})

function HanteiText() {
    if (cnt == uraCnt) {
        label.innerText = "PERFECT!!!!!!!!!!";
    } else if (cnt <= uraCnt * 1.2) {
        label.innerText = "EXCELLENT!!!!!!!!!";
    } else if (cnt <= uraCnt * 1.5) {
        label.innerText = "MARVELOUS!!!!!!!!";
    } else if (cnt <= uraCnt * 2.0) {
        label.innerText = "WONDERFUL!!!!!!!";
    } else if (cnt <= uraCnt * 2.5) {
        label.innerText = "FABULOUS!!!!!!";
    } else if (cnt <= uraCnt * 3.0) {
        label.innerText = "AMAZING!!!!!";
    } else if (cnt <= uraCnt * 3.5) {
        label.innerText = "GREAT!!!!";
    } else if (cnt <= uraCnt * 4.0) {
        label.innerText = "NICE!!!";
    } else if (cnt <= uraCnt * 4.5) {
        label.innerText = "COOL!!";
    } else if (cnt <= uraCnt * 5.0) {
        label.innerText = "AWESOME!";
    } else if (cnt <= uraCnt * 5.5) {
        label.innerText = "DOPE!";
    } else if (cnt <= uraCnt * 6.0) {
        label.innerText = "AMAZING!!";
    } else if (cnt <= uraCnt * 7.0) {
        label.innerText = "GOOD!!";
    }else {
        label.innerText = "BAD";
    }
}


OmoteCreate(omoteImg);
UraCreate(uraImg);
ShuffleOmote(omote);

