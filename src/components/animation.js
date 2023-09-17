let img;

const imageElementSelector = () => {
    const img1 = document.querySelector('#image-1');
    const img2 = document.querySelector('#image-2');

    if (img1) {
        img = img1;
    } else {
        img = img2;
    }
}

const tiltEffectSettings = {
    max: 25, // max tilt rotation 
    perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
    scale: 1.1, // transform scale 
    speed: 1000, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
    easing: 'cubic-bezier(.03,.98,.52,.99)' // easing (transition-timing-function) of the enter/exit transition
};

export const imgMouseMove = (e) => {

    imageElementSelector();

    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    const centerX = img.offsetLeft + imgWidth / 2;
    const centerY = img.offsetTop + imgHeight / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = tiltEffectSettings.max * mouseY / (imgHeight / 2);
    const rotateY = -tiltEffectSettings.max * mouseX / (imgWidth / 2);

    img.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                            scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`
};

export const imgMouseLeave = () => {
    imageElementSelector();

    img.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    setTransition();
};

let transitionTimeoutId;

const setTransition = () => {
    imageElementSelector();

    clearTimeout(transitionTimeoutId);

    img.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;

    transitionTimeoutId = setTimeout(() => {
        img.style.transition = '';
    }, tiltEffectSettings.speed);
};

export const imgMouseEnter = () => { setTransition(); };

if (img) {
    img.addEventListener('mousemove', imgMouseMove);
    img.addEventListener('mouseleave', imgMouseLeave);
    img.addEventListener('mouseenter', imgMouseEnter);
}

