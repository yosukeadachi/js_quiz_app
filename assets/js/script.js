// サンプルのクイズデータを格納する配列
const quizData = [
    {
        question: "日本の首都は？",  // クイズの質問
        options: ["東京", "大阪", "名古屋", "横浜"],  // 選択肢
        answer: "東京"  // 正解
    },
    {
        question: "日本の一番高い山は？",  // クイズの質問
        options: ["富士山", "北岳", "奥穂高岳", "間ノ岳"],  // 選択肢
        answer: "富士山"  // 正解
    },
    // 参加者はここに新しいクイズデータを追加できます...
];

// 配列をランダムに並べ替える関数
function shuffleArray(array) {
    // 配列の最後の要素から順に処理を行います
    for (let i = array.length - 1; i > 0; i--) {
        // 0からiまでのランダムな整数を生成
        const j = Math.floor(Math.random() * (i + 1));
        // i番目とj番目の要素を交換
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// クイズデータをウェブページに表示する関数
function displayQuizData() {
    // quiz-containerというIDを持つ要素を取得
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';  // クイズコンテナをクリア

    // 各クイズデータに対して処理を行います
    quizData.forEach((quiz, index) => {
        // 選択肢をシャッフル
        shuffleArray(quiz.options);
        // 新しいdiv要素を作成
        const quizElement = document.createElement('div');
        quizElement.className = 'quiz';  // クラス名を設定
        quizElement.innerHTML = `
            <p>${index + 1}. ${quiz.question}</p>
            <ul>
                ${quiz.options.map((option, optionIndex) => `
                    <li onclick="checkAnswer(${index}, ${optionIndex})">${option}</li>
                `).join('')}
            </ul>
        `;
        // クイズコンテナにクイズ要素を追加
        quizContainer.appendChild(quizElement);
    });
}


// 正誤判定を行う関数
function checkAnswer(quizIndex, optionIndex) {
    // 選択された選択肢を取得
    const selectedOption = quizData[quizIndex].options[optionIndex];
    // 正解を取得
    const correctAnswer = quizData[quizIndex].answer;

    // 選択された選択肢が正解かどうかをチェック
    if (selectedOption === correctAnswer) {
        alert('正解！');  // 正解の場合、'正解！'とアラート表示
    } else {
        alert('不正解。正解は ' + correctAnswer + ' です。');  // 不正解の場合、正解を表示
    }
}

// クイズデータを表示するボタンを設定
const displayButton = document.getElementById('display-button');
displayButton.addEventListener('click', displayQuizData);  // クリックイベントを設定
