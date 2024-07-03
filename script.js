const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const banner = document.querySelector('.app__image');
const textTittle = document.querySelector('.app__title');
const TimerText = document.querySelector('#timer');

const musicaInput = document.querySelector('.toggle-checkbox');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;



const startTempBtn = document.getElementById('start-pause');
const PlayStopBtn = document.querySelector('#start-pause span');
const iconBtn = document.querySelector('.app__card-primary-butto-icon');
const playSong = new Audio('/sons/play.wav')
const stopSong = new Audio('/sons/pause.mp3');
const beepSong = new Audio('/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBtn.classList.add('active');

})

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
})

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');
})

function alterarContexto(contexto) {
    MostrarTempo()
    
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)


    switch (contexto) {
        case "foco":
            textTittle.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            textTittle.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case "descanso-longo":
            textTittle.innerHTML = `
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
    }
}



const contagemregressiva = () => {
    
    if (tempoDecorridoEmSegundos <= 0) {
        beepSong.play();
        alert('tempo finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    MostrarTempo();
}

startTempBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        zerar();
        stopSong.play();
        return;
    }
    intervaloId = setInterval(contagemregressiva, 1000);
    PlayStopBtn.textContent = "Pausar";
    iconBtn.setAttribute('src', `/imagens/pause.png`);
    playSong.play();
}

function zerar() {
    clearInterval(intervaloId);
    PlayStopBtn.textContent = "Começar";
    iconBtn.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null
}

function MostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' })
    TimerText.innerHTML = `${tempoFormatado}`;
}

MostrarTempo();

