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

let currentQuizIndex = 0;
let correctAnswers = 0;

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
    const quiz = quizData[currentQuizIndex];
    shuffleArray(quiz.options);
    const quizElement = document.createElement('div');
    quizElement.className = 'quiz';
    quizElement.innerHTML = `
        <p>${currentQuizIndex + 1}. ${quiz.question}</p>
        <ul>
            ${quiz.options.map((option, optionIndex) => `
                <li onclick="checkAnswer(${optionIndex})">${option}</li>
            `).join('')}
        </ul>
    `;
    quizContainer.innerHTML = '';  // クイズコンテナをクリア
    quizContainer.appendChild(quizElement);

    // 進捗バーを更新
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = ((currentQuizIndex / quizData.length) * 100) + '%';
}


// 正誤判定を行う関数
function checkAnswer(optionIndex) {
    // 選択された選択肢を取得
    const selectedOption = quizData[currentQuizIndex].options[optionIndex];
    // 正解を取得
    const correctAnswer = quizData[currentQuizIndex].answer;

    // 選択された選択肢が正解かどうかをチェック
    if (selectedOption === correctAnswer) {
        alert('正解！');
        correctAnswers++;
    } else {
        alert('不正解…');
    }
    currentQuizIndex++;
    // スコアを更新
    document.getElementById('score').textContent = `Score: ${correctAnswers}/${quizData.length}`;
    if (currentQuizIndex < quizData.length) {
        displayQuizData();
    } else {
        alert(`成績: ${correctAnswers}/${quizData.length}`);
        document.getElementById('retry-button').style.display = 'block';
    }
}

function retryQuiz() {
    currentQuizIndex = 0;
    correctAnswers = 0;
    document.getElementById('score').textContent = `Score: 0/0`;
    document.getElementById('retry-button').style.display = 'none';
    displayQuizData();
}

document.getElementById('display-button').addEventListener('click', displayQuizData);
document.getElementById('retry-button').addEventListener('click', retryQuiz);

window.onload = function() {
    // ページが読み込まれたときにスコアを初期化
    document.getElementById('score').textContent = `Score: 0/${quizData.length}`;
    // スコア要素を表示
    document.getElementById('score').style.display = 'block';
};