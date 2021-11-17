const tmpNum = 26;                               //�g�����v�̎��
const uraCnt = tmpNum * 2;                      //�g�����v�̐�
let ura = new Array(uraCnt);                    //�g�����v�̗��ʂ̔z��
let omote = new Array(uraCnt);                  //�g�����v�̕\�ʂ̔z��
const omoteImg = [                              //  �g�����v�̉摜�̔z��
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
const uraParent = document.getElementById("ura");  //���ʂ̉摜������Ƃ���
const omoteParent = document.querySelector(".omote");  //�\�ʂ̐e�v�f
const uraImg = "images/uramen.png";             //���ʂ̉摜�C���X�g
let k = 0;                                      //�\�ʂ̉摜�̓Y����
let flg = 0;                                    //�߂������摜���ꖇ�ڂȂ̂��񖇖ڂȂ̂�
let set, mae, current;                          //i���^�ԁA�O�̑O�������摜�̓Y�����A�O�̉摜�̓Y����
let flg2 = 0;
const button = document.getElementById("button");
const label = document.getElementById("label");
let cnt = 0;
let pare = tmpNum;

//�@���ʔz�u&�����t��
function UraCreate(uraImage) {
    for (let i = 0; i < uraCnt; i++) {
        ura[i] = document.createElement("img");
        ura[i].setAttribute("src", uraImage);
        ura[i].setAttribute("id", "ura" + i);
        ura[i].setAttribute("onclick", "Open_rtn(" + i + ")");
        ura[i] = uraParent.appendChild(ura[i]);      
    }
}
//�\�ʔz�u&�����t��
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
//�\�ʑS�̔z�u
function OmoteCreate(omoteImg) {
    OmoteCreate1(omoteImg);
    OmoteCreate1(omoteImg);
}

//�\�ʃV���b�t��
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
//��ԉE�̗]��������
function NotMargin() {
    for (let i = 0; i < uraCnt; i++) {

        if ((Number(getComputedStyle(omote[i]).order) + 1)%10 == 0) {
            omote[i].style.margin = "0px";
        }
    }
}
//�S�ẴJ�[�h�̉E�ɗ]�������Ȃ���
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

//�g�����v�������ꂽ���̏���
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

//��{
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

//����
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
    label.innerText = "�c��" + pare + "�g";
}
//�\�̃J�[�h�ꖇ��\������
function ShowOmote(index) {
    omote[index].style.visibility = "visible";
}

//�\�̃J�[�h�񖇂�����
function ClearCard(index,index2) {
    omote[index].style.visibility = "hidden";
    omote[index2].style.visibility = "hidden";
    flgc=0;
}

//���̂��[�Ǔ񖇂�\������
function ShowUra(index, index2) {
    ura[index].style.visibility = "visible";
    ura[index2].style.visibility = "visible";
}

//���̃J�[�h�ꖇ������
function ClearUra(index) {
    ura[index].style.visibility = "hidden";
}




//���ׂė��ʂɂ���
function Reverce() {
    cnt = 0;
    for (let i = 0; i < uraCnt; i++) {
        omote[i].style.visibility = "hidden";
    }
}

button.addEventListener('click', () => {
    ShuffleOmote();
    pare = tmpNum;
    label.innerText = "�c��" + pare + "�g";
})

window.addEventListener('load', () => {
    label.innerText = "�c��" + tmpNum + "�g";
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

