/*・52枚（4つの絵柄×13枚）のカードを用意する dane
・カードをシャッフルする dane
・カードを表示させる dane
・カードをめくる dane
・1枚目と2枚目の結果を照合する dane
　・一緒であればカードを非表示にする
　・異なれば裏に戻す dane
・3人でターン制で遊べるようにする(1人でも遊べるようにした方がよい)
・3人それぞれにそろった枚数を表示する
・ゲーム終了時に勝った人を表示する
・ゲーム終了時にそろった枚数のカウントをリセットする

*/
let countUnit = 0;

window.onload = function () {
    //コンストラクタ作成
    function Card(suit, num) {
      this.suit = suit;
      this.num = num;
      this.front;
      this.setFront=function(){
          this.front=`${this.suit}${this.num}.png`;
      }
    }
    //カード配列作成
    const cards = [];
    const suits = ['card_club_', 'card_diamond_', 'card_heart_', 'card_spade_'];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 1; j <= 13; j++) {
        let card = new Card(suits[i], j);
        card.setFront();
        cards.push(card);
      }
    }
    //シャッフル
    function shuffle() {
        let i = cards.length;
        while (i) {
          let index = Math.floor(Math.random() * i--);
          var temp = cards[index];
          cards[index] = cards[i];
          cards[i] = temp;
        }
      }
    //テーブル作成
    shuffle();
    document.getElementById('countUnit').innerHTML = countUnit;
    const table = document.getElementById('table');
    for (let i = 0; i < suits.length; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < 13; j++) {
        let td = document.createElement('td');
        let tempCard = cards[i * 13 + j];
        //カードを裏面で配置
        td.classList.add('card','back');
        td.onclick=flip;
        td.num=tempCard.num;
        td.style.backgroundImage=`url(img/${tempCard.front})`;
        // td.textContent = `${tempCard.suit}:${tempCard.num}`;
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    let firstCard=null;
    let flipTimerId=NaN;
    //カードの裏表切り替え
    function flip(e){
        let td=e.target;
        // td.classList.toggle('back');
        if (!td.classList.contains('back') || flipTimerId) {
            return; //表のカードをクリックしても何もしない。
          }
          td.classList.remove('back'); //カードを表にする。
          if (firstCard === null) {
            firstCard = td; //1枚目だったら今めくったカードをfirstCardに設定
          } else {
            //2枚目だったら1枚目と比較して結果を判定する。
            if (firstCard.num === td.num) {
              //２枚が同じだったときの処理
              firstCard = null;
              countUnit++;
              if(countUnit === 26){
                document.getElementById('countUnit').innerHTML = "パーフェクト！！";
              }else{
                document.getElementById('countUnit').innerHTML = countUnit + "セット当てたよ";
              }
            } else {
              flipTimerId = setTimeout(function () {
                firstCard.classList.add('back');
                td.classList.add('back');
                flipTimerId = NaN;
                firstCard = null;
              }, 500);
            }
        }
    }
}