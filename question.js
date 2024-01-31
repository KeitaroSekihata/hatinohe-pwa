//残ってしまったasn10を消している
function resetCookie(){
    document.cookie = "ans10 = ;max-age = 0";
}

//次へボタンをnextbtnに
const nextbtn = document.getElementById("next");
//戻るボタンをbackbtnに
const backbtn = document.getElementById("back");
//結果を見るボタンをresultbtnに
const resultbtn = document.getElementById("result");
//
const yesbtn = document.getElementById("yes");
const neitherbtn = document.getElementById("neither");
const nobtn = document.getElementById("no");


//すべての質問がallQuestions
let allQuestions = [];
//現在の質問番号をnumber
let number = 1;

//1行のデータから番号と問題文のjsonデータを作っている
function makeQuestion(oneLine) {
    const cells = oneLine.split(",");

    let question = {};
    question["番号"] = cells[0];
    question["問題文"] = cells[1];
    return question;
}

//全質問データをと見込んだ文字列itemsから全質問のjsonデータallQuestionsを作っている
function makeQuestions(items) {
    const allLines = items.split('\n');

    for (let j = 1; j < allLines.length; j = j + 1) {
        question = makeQuestion(allLines[j]);
        allQuestions.push(question);
    }
}

//items.csvを読み込んでいる
async function readItems() {
    const items = await fetch("items.csv");
    makeQuestions(await items.text());
}

//cookieのデータを取得する
function getCookieValue(key) {
    console.log(key);
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        var cookiesArray = cookie.split('=');
        if (cookiesArray[0].trim() == key.trim()) {
            return cookiesArray[1];  // (key[0],value[1])
        }
    }
    return '';
}

//指定した質問番号numberの回答の値をcookieから取得
function readCookie(number) {
    return getCookieValue("ans" + number);
}

//質問文を描画する
async function drawQuestion() {
    //現在の質問番号numberに対応した質問をquestionに入れる(allQuestionsは0からスタートするから1引いている)
    question = allQuestions[number - 1];
    //idがquestion-textの要素に問題文を代入
    document.getElementById('question-text').innerHTML = question["問題文"];
    //最後の質問まで(numberが11より小さい)の場合と結果を見ようページ(numberが11)で場合分けしている
    if (number < 11) {
        document.getElementById('number').innerHTML = "第" + question["番号"] + "問(10問中)";
        console.log("これから回答を復元する");
        //選択肢を復元する
        let choiceValue = getCookieValue("ans" + number);
        //choiceValueがあるのかを調べ、無ければボタンをリセット、あれば再現する
        if (!choiceValue){
            let element = document.getElementById("yes");
            element.checked = false;
            element = document.getElementById("neither");
            element.checked = false;
            element = document.getElementById("no");
            element.checked = false;
        }else{
            await restoreChoices(choiceValue);
        }
    } else {
        document.getElementById('number').innerHTML = " ";
        //次へボタンを結果を見るボタンに変える
        await resultToNext();
        await nextToResult();
    }
    document.getElementById("next").disabled = true;
}

//選択肢を復元している
async function restoreChoices(choice) {
    let choiceValue = getCookieValue("ans" + number);
    if (choice) {
        if (choiceValue === "1") {
            let element = document.getElementById("yes");
            element.checked = true;
            //console.log("はいでした");
        } else if (choiceValue === "0") {
            let element = document.getElementById("neither");
            element.checked = true;
            //console.log("どちらでもないでした");
        } else if (choiceValue === "-1") {
            let element = document.getElementById("no");
            element.checked = true;
            //console.log("いいえでした");
        } else {
            //console.log("どれでもありませんでした");
        }
    }
}

//次へボタンを結果を見るボタンに変更する
async function nextToResult() {
    if (number === 11) {
        let element = document.getElementById("next");
        element.style.display = "none";
        element = document.getElementById("result");
        element.style.display = "block";
        //element.setAttribute('value','結果を見る');
        //「戻る」を押しても「次へ」にならない
    }
}

async function resultToNext() {
        let element = document.getElementById("next");
        element.style.display = "block";
        element = document.getElementById("result");
        element.style.display = "none";

        console.log("ボタンが消えるはず");
        //element.setAttribute('value','結果を見る');
        //「戻る」を押しても「次へ」にならない
}


//選択肢の値を取得する
function takeChoiceValue() {
    let answer = document.getElementsByName("answer");
    let len = answer.length;
    let checkValue;
    for (let j = 0; j < len; j++){
        if (answer.item(j).checked) {
            checkValue = answer.item(j).value;
        }
    }
    return checkValue;
}


window.onload = async function () {
    //ocument.cookie = "ans1 = 999";
    let choice = readCookie(number);
    resetCookie();
    await readItems();
    await drawQuestion();
    await restoreChoices(choice);
    await nextToResult();
    await resultToNext();
};

//次へボタンを押した場合の挙動
nextbtn.addEventListener('click', function (event) {
    event.preventDefault();
    
    let answer = takeChoiceValue();

    var data = "ans" + number + "=" + answer;
    document.cookie = data;

    var ansData = document.cookie;

    if (number < 12) {
        number++;
    }
    drawQuestion(allQuestions[number]);
});

//結果を見るボタンを押したときの挙動
resultbtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (number === 11) {
        //number--;
        window.location.href = 'result.html';
    }
});

//戻るボタンを押したときの挙動
backbtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (number === 1) {
        window.location.href = 'index.html';
    }else if(number === 11){
        console.log("結果を見るページで戻るボタンを押したら");
        resultToNext();
        number--;
    }else{
        number--;
    }
    for (const element of document.getElementsByName('answer')) {
        element.checked = false;
    }
    drawQuestion(allQuestions[number]);
});

yesbtn.addEventListener('change', function (event){
    document.getElementById("next").disabled = false;
});

neitherbtn.addEventListener('change', function (event){
    document.getElementById("next").disabled = false;
});

nobtn.addEventListener('change', function (event){
    document.getElementById("next").disabled = false;
});