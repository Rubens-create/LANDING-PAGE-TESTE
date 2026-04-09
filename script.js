const headlinesList = [
    "Método 100% comprovado de emagrecer em casa!",
    "Finalmente uma técnica infalível para ter um corpo sarado!",
    "Tática comprovada para perder peso sem ir à academia!",
    "Como criar mais músculos com apenas 3 horas semanais de treino!",
    "Única forma comprovada de perder peso após a gravidez!",
    "Manual do emagrecimento: aprenda a perder peso de forma tranquila e saudável!",
    "Aplique essa receita secreta e emagreça mais rápido!",
    "Revelado o segredo para emagrecer sem ficar horas treinando!",
    "Descubra como perder peso de forma fácil sem mudar sua alimentação!",
    "Perca 5kg em 4 semanas com esses 4 passos simples!",
    "Use a mesma técnica que eu usei para perder 8kg em 3 semanas!"
];

function initHeadline() {
    const randomIndex = Math.floor(Math.random() * headlinesList.length);
    const hl = headlinesList[randomIndex];
    document.getElementById('main-headline').innerText = hl;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('main-video').src = CONFIG.videoUrl;
    initHeadline();

    // --- CONTROLE DE VÍDEO & DELAY ---
    const video = document.getElementById('main-video');
    const overlayButton = document.getElementById('play-btn-overlay');
    let delayDisparado = false;
    
    video.muted = true;
    const tryAutoplay = async () => {
        try {
            await video.play();
            overlayButton.classList.add('hidden');
        } catch (err) {
            overlayButton.classList.remove('hidden');
        }
    }
    tryAutoplay();

    overlayButton.addEventListener('click', () => {
        video.muted = false;
        video.play();
        overlayButton.classList.add('hidden');
    });

    // Trigger delay check
    video.addEventListener('timeupdate', () => {
        if (!delayDisparado && video.currentTime >= CONFIG.delayEmSegundos) dispararDelay();
    });

    window.setInterval(() => {
        if(!delayDisparado && video.currentTime >= CONFIG.delayEmSegundos) dispararDelay();
    }, 1000);

    function dispararDelay() {
        delayDisparado = true;
        document.body.classList.remove('locked');
        const estado2 = document.getElementById('estado2');
        estado2.classList.remove('hidden');
        setTimeout(() => { estado2.classList.add('show'); }, 50);

        const pBar = document.getElementById('progress-bar');
        pBar.style.width = '100%';
        setTimeout(() => { pBar.style.opacity = '0'; }, 1000);
    }

    // --- PROGRESS BAR FAKE ANIMAÇÃO ---
    function animarProgressBar() {
        const pb = document.getElementById('progress-bar');
        const startTime = Date.now();
        const delayMs = CONFIG.delayEmSegundos * 1000;

        function step() {
            if(delayDisparado) return;

            const elapsed = Date.now() - startTime;
            
            if (elapsed <= 10000) {
                const p = (elapsed / 10000) * 35;
                pb.style.width = p + '%';
            } else if (elapsed <= delayMs) {
                let ratio = (elapsed - 10000) / (delayMs - 10000);
                ratio = Math.pow(ratio, 0.7); 
                const p = 35 + (ratio * 60);
                pb.style.width = p + '%';
            }

            if (elapsed < delayMs) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }
    animarProgressBar();

    // --- SCROLL MOBILE CTA ---
    const checkoutForm = document.getElementById('subscription-section');
    const fixedCta = document.getElementById('fixed-cta');

    window.addEventListener('scroll', () => {
        if (!delayDisparado || window.innerWidth > 768) {
            if (fixedCta) fixedCta.classList.add('hidden');
            return;
        }
        
        if (checkoutForm && fixedCta) {
            const rect = checkoutForm.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                fixedCta.style.opacity = '0';
                setTimeout(() => fixedCta.classList.add('hidden'), 300);
            } else {
                fixedCta.classList.remove('hidden');
                fixedCta.style.opacity = '1';
                fixedCta.style.transform = 'translate(-50%, 0)';
            }
        }
    });

    // --- SUBMISSÃO DO FORM ---
    document.getElementById('subscription-form').addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('main-content').style.display = 'none';
        document.body.classList.remove('locked');
        
        document.getElementById('estado3').style.display = 'flex';
        window.scrollTo(0,0);
    });

    // Mascaras
    const inputCelular = document.getElementById('celular');
    if (inputCelular) {
        inputCelular.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, "");
            valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
            valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
            e.target.value = valor;
        });
    }
});

function scrollToForm() {
    document.getElementById('subscription-section').scrollIntoView({ behavior: 'smooth' });
}

function togglePolitica(e) {
    e.preventDefault();
    const sec = document.getElementById('politica-section');
    sec.style.display = sec.style.display === 'block' ? 'none' : 'block';
    if(sec.style.display === 'block') sec.scrollIntoView({ behavior: 'smooth' });
}
