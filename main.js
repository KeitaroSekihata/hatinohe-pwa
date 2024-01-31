const qtext = document.getElementById("question-text");
const nextbtn = document.getElementById("next");
const backbtn = document.getElementById("back");
const yesHide = document.getElementById("yes");
const neitherHide = document.getElementById("neither");
const noHide = document.getElementById("no");

let allQuestion = [];
let allPeople = [];
let allScore = [];
let i = 0;

function takePoint() {
    let answer = document.getElementByName("answer");
    let len = answer.length;
    let checkValue;
    for (let j = 0; j < len; j++){
        if (answer.item(j).checked) {
            checkValue = answer.item(j).value;
        }
    }
    return checkValue;
}



function questions(item) {
    const allLine = item.split('\n');

    for (let j = 1; j < allLine.length; j = j + 1) {
        question = makeQuestion(allLine[j]);
        allQuestion.push(question);
    }
}

function makeQuestion(oneLine) {
    const cells = oneLine.split(",");

    let question = {};
    question["番号"] = cells[0];
    question["問題文"] = cells[1];
    return question;
}

function peoples(tales) {
    const allLine = tales.split('\n');

    for (let j = 1; j < allLine.length; j = j + 1) {
        people = makePeople(allLine[j]);
        allPeople.push(people);
    }
    return allPeople;
}

function makePeople(oneLine) {
    const cells = oneLine.split(",");

    let people = {};
    people["人物"] = cells[0];
    people["説明"] = cells[1];
    people["画像"] = cells[2];
    return people;
}

function scores(score) {
    const allLine = score.split('\n');

    for (let j = 1; j < allLine.length; j = j + 1) {
        score = makeScore(allLine[j]);
        allScore.push(score);
    }
    return allScore;
}

function makeScore(oneLine) {
    const cells = oneLine.split(",");

    let score = {};
    score["人物"] = cells[0];
    score["問1"] = cells[1];
    score["問2"] = cells[2];
    score["問3"] = cells[3];
    score["問4"] = cells[4];
    score["問5"] = cells[5];
    score["問6"] = cells[6];
    score["問7"] = cells[7];
    score["問8"] = cells[8];
    score["問9"] = cells[9];
    score["問10"] = cells[10];
    return score;
}

function originQuestion(question) {
    console.log(question["問題文"])
    document.getElementById('question-text').innerHTML = question["問題文"];
    if (i < 10) {
        document.getElementById('number').innerHTML = "第" + question["番号"] + "問(10問中)";
    } else {
        document.getElementById('number').innerHTML = " ";
    }
}


async function dataLoad() {
    const questionData = await fetch("item.csv");
    questions(await questionData.text());
    console.log(allQuestion);

    const peopleData = await fetch("tales.csv");
    const allPeople = peoples(await peopleData.text());
    console.log(allPeople);

    const scoreData = await fetch("score.csv");
    const allScore = scores(await scoreData.text());
    console.log(allScore);

    console.log(allQuestion[0]);
    originQuestion(allQuestion[0]);




    backbtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (i > 0) {
            i--;
        }
        for (const element of document.getElementsByName('answer')) {
            element.checked = false;
        }
        originQuestion(allQuestion[i]);
        console.log(i);
    });
    nextbtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (i < 11) {
            i++;
        }
        for (const element of document.getElementsByName('answer')) {
            element.checked = false;
        }

        if (i == 11) {
            window.location.href = 'result.html';
            i--;
        }
        originQuestion(allQuestion[i]);
        console.log(i);
    });

    document.getElementById("yes").addEventListener("click", function () {
        var answer = document.getElementById("yes").value;
        var data = "ans" + i + "=" + answer;
        document.cookie = data;

        var ansData = document.cookie;
        console.log(ansData);
    }, false);

    document.getElementById("neither").addEventListener("click", function () {
        var answer = document.getElementById("neither").value;
        var data = "ans" + i + "=" + answer;
        document.cookie = data;

        var ansData = document.cookie;
        console.log(ansData);
    }, false);

    document.getElementById("no").addEventListener("click", function () {
        var answer = document.getElementById("no").value;
        var data = "ans" + i + "=" + answer;
        document.cookie = data;

        var ansData = document.cookie;
        console.log(ansData);
    }, false);
}


window.onload = (event) => {
    dataLoad();
};

/*計算
const c = [
    [1, 1, 0, 3, 1, 0, 2, 0, 0, 2],
    [1, 0, 0, 2, 0, 1, 0, 1, 0, 3],
    [0, 0, 1, 2, 0, 0, 1, 0, 0, 3]
];

const v = [
    1, 0, -1, 1, 0, -1, 1, 0, -1, 1
];

const result = [];

for (let k = 0; k < 3; k++){
  let a = 0;
  let b = 0;
  for (let m = 0; m < 10; m++){
    a = c[k][m] * v[m]
    b = a + b;
  }
  result.push(b);
}
console.log(result);

const maxNum = Math.max.apply(null, result);
console.log(maxNum);
*/

/*結果の表示は3ページ目で発動させる
function makeResult(people){
    document.getElementById('result-name').innerHTML = "診断結果：あなたは" + people["人物"] + "タイプ";
    document.getElementById('result-image').innerHTML = people["画像"];
    document.getElementById('result-person').innerHTML = people["人物"] + "ってどんな人?";
    document.getElementById('result-tales').innerHTML = people["説明"];
}

makeResult(allPeople[order]);
//orderは計算結果の行
*/

//--------------------------新規プログラム------------------------
