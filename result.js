//すべての質問がallQuestions
let allQuestions = [];
//すべての人物データがallPeoples
let allPeoples = [];
//すべての係数がallScores
let allScores = [];
//現在の質問番号をnumber
let number = 1;

function makeQuestion(oneLine) {
    const cells = oneLine.split(",");

    let question = {};
    question["番号"] = cells[0];
    question["問題文"] = cells[1];
    return question;
}

function makePeople(oneLine) {
    const cells = oneLine.split(",");

    let people = {};
    people["人物"] = cells[0];
    people["説明"] = cells[1];
    people["画像"] = cells[2];
    return people;
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


function makeQuestions(items) {
    const allLines = items.split('\n');

    for (let j = 1; j < allLines.length; j = j + 1) {
        question = makeQuestion(allLines[j]);
        allQuestions.push(question);
    }
}

function makePeoples(tales) {
    const allLine = tales.split('\n');

    for (let j = 1; j < allLine.length; j = j + 1) {
        people = makePeople(allLine[j]);
        allPeoples.push(people);
    }
    return allPeoples;
}

function makeScores(scores) {
    const allLine = scores.split('\n');

    for (let j = 1; j < allLine.length; j = j + 1) {
        score = makeScore(allLine[j]);
        allScores.push(score);
    }
    return allScores;
}


async function readItems() {
    const items = await fetch("items.csv");
    makeQuestions(await items.text());
}

async function readTales() {
    const tales = await fetch("tales.csv");
    makePeoples(await tales.text());
}

async function readScores() {
    const scores = await fetch("scores.csv");
    makeScores(await scores.text());
}

var ansData;
var numb;
var order;
var u;
let calculationResult = [];
let result = [];
let verticalScores = [];
let parseIntResultScores = [];
let parseIntResultVertical = [];

async function splitData() {
    ansData = document.cookie;

    var data = ansData.split(';');

    for (let i = 0; i < 10; i++) {
        result.push(data[i].split('=')[1]);
    }

    for (let j = 0; j < 23; j++) {
        let besideScores = [];
        for (let l = 1; l < 11; l++) {
            besideScores.push(allScores[j]['問' + l]);
        }
        verticalScores.push(besideScores);
    }
}

async function parseIntScores() {
    parseIntResultScores = result.map(str => parseInt(str, 10));
}

async function parseIntCoefficient() {
    numb = a => a instanceof (Array) ? a.map(x => numb(x)) : Number(a);
    parseIntResultVertical = numb(verticalScores);
}

//計算開始

async function calculation() {

    calculationResult = [];

    for (let k = 0; k < 23; k++) {
        let a = 0;
        let b = 0;
        for (let m = 0; m < 10; m++) {
            a = parseIntResultVertical[k][m] * parseIntResultScores[m];
            b = a + b;
        }
        calculationResult.push(b);
    }
    let e = [];
    for(let i =0; i < calculationResult.length; i++){
        if(Math.max(...calculationResult)===calculationResult[i]){
            e.push(i);
        }
    }
    u = e[ Math.floor( Math.random() * e.length ) ]
}

async function makeResultText(people){
    document.getElementById('result-name').innerHTML = "診断結果：あなたは" + people["人物"] + "タイプ";
    //document.getElementById('result-image').innerHTML = people["画像"];
    document.getElementById('result-person').innerHTML = people["人物"] + "ってどんな人?";
    document.getElementById('result-tales').innerHTML = people["説明"];
}

let img = document.getElementById('result-image');

async function makeResultImage(){
    img.src = "images/nanbu"+(u+1)+".jpg";
}

window.onload = async function () {
    await readItems();
    await readTales();
    await readScores();
    await splitData();
    await parseIntScores();
    await parseIntCoefficient();
    await calculation();
    await makeResultText(allPeoples[u]);
    await makeResultImage();
}
