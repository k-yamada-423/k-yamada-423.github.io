'use strict'

let numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]); // くじの数字をランダムに並び替える
let openedCells = []; // 開かれたマス
let lines = [
 [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横のライン
 [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦のライン
 [0, 4, 8], [2, 4, 6] // 斜めのライン
];
let totalPoints = 0; // 合計ポイント
let roundPoints = 0; //現在のポイント
const pointbord = {
  6:10000,
  7:36,
  8:720,
  9:360,
  10:80,
  11:252,
  12:108,
  13:72,
  14:54,
  15:180,
  16:72,
  17:180,
  18:119,
  19:36,
  20:306,
  21:1080,
  22:144,
  23:1800,
  24:3600
}  //スコアボード
let round = 1 //ラウンド数
const arrow = ["→", "→", "→", "↓", "↓", "↓", "↘", "↗", "ラスト"] //リセットする時に毎回書き直すのが面倒でループ文使える様にわざわざ作った配列

initializeGame() //ゲームスタート

// 配列をシャッフルする関数
function shuffleArray(array) { 
for (let i = array.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [array[i], array[j]] = [array[j], array[i]];
 }
 return array;
}

//ランダムにマスを公開する関数
function initializeGame() {
 const randomIndex = Math.floor(Math.random() * 9); // ランダムなマスのインデックスを決めてるよ
 openedCells.push(randomIndex);
 const cell = document.getElementsByClassName('cell')[randomIndex];
 cell.innerHTML = numbers[randomIndex]; //ランダムなマス開いてる
}

//指定したマスの中に数字を入れる関数
function revealNumber(index) { 
 if (openedCells.includes(index) ) {
   return; // すでに開かれているマスは無視するじゃけんのお
 }
 const cell = document.getElementsByClassName('cell')[index]; 
 cell.innerHTML = numbers[index]; //マスに数字入れてるん
 openedCells.push(index); //開いたマスを記録しとくん
}

//現在取ったポイントとトータルポイントを表示するよ関数
function sumpoint(point) { 
 totalPoints += point;
 document.getElementById('point').textContent = point;
 document.getElementById('totalpoint').textContent = totalPoints;
}

// マスのクリックイベントを設定をした筈だったけど関数にしてた
const cells = document.getElementsByClassName('cell'); 
function cellclick(cell){
  if(!openedCells.includes(cell) && openedCells.length < 4){ //マスをクリックでマス開いて数字見えるよ関数を動かす
   revealNumber(cell);
  } 
}
  
 //ボタンのクリックイベントを設定する筈だったけど関数にした
//選んだラインの数字の合計からポイント決めたりスコアボードに色付けたり色々やるよ関数ぶっちゃけめちゃしんどかったわここ
function pointresult(num){ 
  if(openedCells.length === 4 && roundPoints === 0){
  for (let i=0; i<9; i++){
   revealNumber(i); //ライン決めたら全部マス開くよ
  }
  for (let i = 0; i < 8; i++) {
     for (const line of lines) {
      let lineSum = 0; 
      for (const cellIndex of line) {
         lineSum += numbers[cellIndex]; //各ラインの数字を合計しているでござる
       }
       const buttonId = 'line-button-' + lines.indexOf(line);
       document.getElementById(buttonId).innerHTML= lineSum; //ボタンに適用したラインの数字の合計が見える～～～～
      }
  }
  let button3 = document.getElementById("line-button-" + num); //押したラインを判定するっす
  document.getElementById("s" + button3.innerText).style.backgroundColor = "gold"; //決めたラインに応じてスコアボードを黄金にしてやるううう
  roundPoints = pointbord[button3.innerText]; //このラウンドのポイントを判定じゃい
  console.log(roundPoints);
  sumpoint(roundPoints); //合計ポイント表示する関数が動く！
 }
}

//１日３回まで遊べるから色々リセットする関数最後の山場まじ上手く行かなくて今まで書いてきたコード書き直した
function roundplay(){ 
if(round < 3){
  round++;
  for (let i =0; i < 9; i++){
  cells[i].textContent = "";
  const lines = document.getElementById("line-button-"+i); 
  lines.textContent = arrow[i]; //マスとボタンのリセッツ強引にループ文にしたら犠牲になったボタンがいるらしいかわいそう
  } 
  //ゲーム開始前の状態にする様に初期値を入れ直してる、もっと効率良い方法無かったんかな
  numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]); 
  for (let i = 6; i < 25 ; i++){
  const bord = document.getElementById("s"+ i);
  bord.style.backgroundColor = "chocolate";
  }
  roundPoints = 0;
  document.getElementById('point').textContent = roundPoints
  openedCells = []; // ラウンド終了後に開かれたマスをリセットする
  arrow[8]="結果"
  initializeGame(); //ゲームスタート
} else if(round === 3){
  round++
  alert("あなたの結果は" + totalPoints + "です");
}
}
//カーソルがラインに触れたら対応するマスが光るぜ関数
function pointerin(lines) {
  for(const line of lines){
  document.getElementsByClassName("cell")[line].style.backgroundColor="yellow"
  }
}

//カーソルがラインから離れたら光ってた色が元に戻るぜ関数
function pointerout(lines) {
  for(const line of lines){
    document.getElementsByClassName("cell")[line].style.backgroundColor="darkgreen"
  }
}
