console.log("SCRIPT LOADED SUCCESSFULLY");
const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");
const correctPin = "1802";

let enteredPin = "";

const boxes = [
    document.getElementById("box1"),
    document.getElementById("box2"),
    document.getElementById("box3"),
    document.getElementById("box4")
];

const numberButtons = document.querySelectorAll(".num");
const backspace = document.getElementById("backspace");
const pinCard = document.querySelector(".pin-card");

function updateBoxes() {

    boxes.forEach(box => box.innerHTML = "");

    for (let i = 0; i < enteredPin.length; i++) {
        boxes[i].innerHTML = "❤️";
        boxes[i].classList.add("filled");

        setTimeout(() => {
            boxes[i].classList.remove("filled");
        }, 200);
    }

}

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (enteredPin.length >= 4) return;

        clickSound.currentTime = 0;

clickSound.play().catch(() => {});

        enteredPin += button.innerText;

        updateBoxes();

        if (enteredPin.length === 4) {

            if (enteredPin === correctPin) {

               numberButtons.forEach(btn => {
    btn.disabled = true;
});

backspace.disabled = true;

document.getElementById("flower").disabled = true;

                pinCard.classList.add("unlock");

                // We'll replace this with the Welcome Screen later
               setTimeout(() => {

    bgMusic.play().catch(() => {});

    document.querySelector(".pin-container").style.display="none";

    document.getElementById("welcomeScreen").style.display="flex";

},700);
            }

            else {

                pinCard.classList.add("shake");

                setTimeout(() => {

                    pinCard.classList.remove("shake");

                    enteredPin = "";

                    updateBoxes();

                }, 500);

            }

        }

    });

});

backspace.addEventListener("click", () => {

    enteredPin = enteredPin.slice(0, -1);

    updateBoxes();

});
const continueBtn = document.getElementById("continueBtn");

continueBtn.addEventListener("click", () => {

    document.getElementById("welcomeScreen").style.display = "none";

    document.getElementById("galleryScreen").style.display = "flex";

});
const galleryImage = document.getElementById("galleryImage");
const galleryCaption = document.getElementById("galleryCaption");
const galleryBtn = document.getElementById("galleryBtn");

let currentPhoto = 1;

galleryBtn.addEventListener("click", () => {

    if(currentPhoto === 1){

        galleryImage.style.opacity = "0";
        galleryCaption.style.opacity = "0";

        setTimeout(()=>{

            galleryImage.src = "assets/memory2.jpg";

            galleryCaption.innerHTML =
            "Some moments become memories...<br>but you became my favorite person. ❤️";

            galleryBtn.innerHTML = "Open My Letter ❤️";

            galleryImage.style.opacity = "1";
            galleryCaption.style.opacity = "1";

            currentPhoto = 2;

        },500);

    }

    else{

        document.getElementById("galleryScreen").style.display = "none";

        document.getElementById("letterScreen").style.display = "flex";

        setTimeout(openLetter,300);

    }

});   // <-- This closes addEventListener

function openLetter(){

    document.querySelector(".letter-card").style.transform = "rotate(0deg)";

    startTyping();

}
const letter = `

Happy Birthday, my love. ❤️
I don't even know where to begin because every time I try to think of one special thing you've done for me, a hundred more come rushing into my mind. 😩❤️‍🩹
Thank you for loving me so gently, for being patient with me, for listening to my endless talks, for making me laugh when I needed it the most, for comforting me without making me feel weak, and for always making me feel safe 🥹🫶🏻 You have given me countless reasons to smile. Some were grand, but honestly, it's the little things I'll cherish forever—the way you remember tiny details about me. 💕

You've shown me what genuine care looks like. You've respected me, understood me, supported me, and loved me in ways I never knew I needed. Because of you, I've laughed harder, smiled brighter, and believed in love a little more every single day.🧿❤️‍🩹

I hope this year gives you back every bit of happiness that you've given me. I hope your dreams come true, your heart stays light, and your smile never fades. You deserve all the love, peace, success, and blessings this world has to offer.✨🎀

Thank you for being you. Thank you for choosing me every day. And thank you for making my life brighter just by being in it. 🥹🧿❤️

Happy Birthday Babyyyyy😘❤️🧿 to my favorite person, my safe place, my biggest blessing, and the one who makes my heart feel at home. 💍🏠

I love you more than words could ever express!🥹🧿❤️

`;

let index = 0;

function openLetter(){

    const box = document.getElementById("typedLetter");
    const slider = document.getElementById("sliderContainer");

    // reset everything ONCE
    box.innerHTML = "";
    slider.style.display = "none";
    index = 0;

    document.querySelector(".letter-card").style.transform = "rotate(0deg)";

    // start typing AFTER screen opens
    setTimeout(() => {
        type();
    }, 1200);

}


function type(){

    const box = document.getElementById("typedLetter");

    if(index < letter.length){

        box.innerHTML += letter.charAt(index);
        index++;

        setTimeout(type, 35);

    } else {

        console.log("Typing finished ✔️");

        setTimeout(() => {

            const slider = document.getElementById("sliderContainer");
            if(slider){
                slider.style.display = "block";
            }

            // TEMP AUTO MOVE TO NEXT SCREEN
            setTimeout(() => {

                document.getElementById("letterScreen").style.display = "none";
                document.getElementById("finalScreen").style.display = "flex";

            }, 2000);

        }, 300);
    }
}
function initScratch(canvas){

    const ctx = canvas.getContext("2d");

    function setup(){

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // IMPORTANT: reset compositing first
        ctx.globalCompositeOperation = "source-over";

        // fill grey layer (THIS is what you scratch off)
        ctx.fillStyle = "#b0b0b0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // switch to erase mode AFTER painting
        ctx.globalCompositeOperation = "destination-out";
    }

    setup();
    window.addEventListener("resize", setup);

    let isDrawing = false;

    function getPos(e){
        const rect = canvas.getBoundingClientRect();

        return {
            x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
            y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
        };
    }

    function draw(e){
        if(!isDrawing) return;

        const pos = getPos(e);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener("mousedown", ()=> isDrawing = true);
    canvas.addEventListener("mouseup", ()=> isDrawing = false);
    canvas.addEventListener("mouseleave", ()=> isDrawing = false);

    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", ()=> isDrawing = true);
    canvas.addEventListener("touchend", ()=> isDrawing = false);
    canvas.addEventListener("touchmove", draw);
}
const glowCards = document.querySelectorAll(".glow-card");

glowCards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.add("active");
    });
});
document.querySelectorAll(".glow-card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.add("active");
    });
});

function launchConfetti() {

    for (let i = 0; i < 30; i++) {

        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";
        confetti.style.background = `hsl(${Math.random()*360},100%,60%)`;
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = "-10px";
        confetti.style.opacity = "0.8";
        confetti.style.zIndex = "9999";

        document.body.appendChild(confetti);

        let fall = setInterval(() => {

            confetti.style.top = confetti.offsetTop + 5 + "px";

            if (confetti.offsetTop > window.innerHeight) {
                clearInterval(fall);
                confetti.remove();
            }

        }, 20);
    }
}
