const words = ['parábola', 'festa', 'pessoa', 'corporação', 'animação', 'programar', 'aprender', 'arroz', 'comida', 'roedor', 'lábia', 'manipulação', 'ciência', 'cinema', 'gato', 'academia', 'loira', 'alarme', 'escola', 'faculdade', 'ensinar', 'vender', 'cozinhar']
const renderLetters = document.querySelector('.letters')
const img = document.querySelector('.img')
const input = document.querySelector('#letter')
const kickedP = document.querySelector('#letters-kicked')
const btnKick = document.querySelector('.kick')
const result = document.querySelector('#wl')
const btnPlay = document.querySelector('#btn-play')
let err;
let kickedLetters;
let word;


function initGame() {
    input.disabled = false;
    document.querySelector('.result').style.display = 'none'
    const n = Math.floor(Math.random() * words.length);
    word = words[n];
    renderLetters.innerHTML = Array(word.length).fill('_').join(' ');

    kickedLetters = [];
    kickedP.textContent = '';

    err = 0;
    render()
}

window.load = initGame()

btnPlay.addEventListener('click', initGame)

function render() {
    img.src = `../public/images/forca${err}.png`;
}

render()

function userPlay() {
    const userKicked = input.value.toLowerCase();
    const alphabetRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿÇç]+$/;

    if (alphabetRegex.test(userKicked)) {
        if (kickedLetters.includes(userKicked)) {
            alert('Você já jogou a letra ' + userKicked + ', tente outra...');
            return;
        }

        if (word.includes(userKicked)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === userKicked) {
                    const lettersArray = renderLetters.innerHTML.split(' ');
                    lettersArray[i] = userKicked;
                    renderLetters.innerHTML = lettersArray.join(' ');
                }
            }
        } else {
            err++;
            img.src = `../public/images/forca${err}.png`;
        }

        kickedLetters.push(userKicked);
        kickedP.textContent = kickedLetters.join(', ').toUpperCase();

        if (!renderLetters.innerHTML.includes('_')) {
            endGame('VOCÊ VENCEU!!!', '#19bd04');
        } else if (err === 6) {
            endGame('VOCÊ PERDEU!', 'red');
        }
    } else {
        alert('Por favor, chute apenas letras.');
    }

    input.value = '';
};
btnKick.addEventListener('click', userPlay);

function endGame(message, color) {
    input.disabled = true;
    input.value = '';
    result.innerHTML = message;
    result.style.backgroundColor = color
    document.querySelector('.result').style.display = 'block';
    render()
};