// import doodlerImage from './assets/images/doodler-guy.png'

const canvas = document.getElementById("dudel");
const context = canvas.getContext('2d');
const platformSound = document.getElementById("platformSound")
const platformSoundBro = document.getElementById("platformSoundBro")
const platformSoundBrow = document.getElementById("platformSoundBrow")
const highestScoreDisplay = document.getElementById("highestScore");
const thanks = document.getElementById("thanks");
const box = document.getElementById("box");
const slider = document.getElementById("slider");
const input = document.querySelector("input")
const value = document.querySelector(".value")


const platformWidth = 65;
const platformHeight = 20;
const platformStart = canvas.height - 50;

const gravity = 0.33
const drag = 0.3
const bounceVelocity = -12.5;
const fallSpeed = 5;

const platformBroken = [];
const maxBrokenPlatforms = 2; // Ganti angka ini sesuai kebutuhan
let brokenPlatformCount = 0;


let minPlatformSpace = 150;
let maxPlatformSpace = 10;

const maxDoodleSpeed = 10;

let frameId;
let skor = 0
let highestScore = 0;
let touchedPlatform = []
let isGameOver = false;
let isGameStarted = false;

const isSemiPlatform = []
const maxSemiPlatform = 2;
let semiPlatformCount = 0;
const isSemiPlatformEnabled = true; // Ganti nilai ini sesuai kebutuhan
const minScoreForSemiPlatform = 2000;


let platforms = [{
    x: canvas.width / 2 - platformWidth / 2,
    y: platformStart
}]


slider.addEventListener("input", function () {
    doodler.x = (canvas.width - doodler.width) * (slider.value / 100);

    const previousValue = parseInt(this.getAttribute("data-previous-value")) || 50;
    const currentValue = parseInt(this.value);


    if (currentValue > previousValue) {
        doodlerFacingLeft = false;
    } else if (currentValue < previousValue) {
        doodlerFacingLeft = true;
    }

    this.setAttribute("data-previous-value", currentValue);

    doodler.x = (canvas.width - doodler.width) * (sliderValue / 100);
});

function updateDoodlerPosition() {
    doodler.dy += gravity;

    if (doodler.dy > maxDoodleSpeed) {
        doodler.dy = maxDoodleSpeed;
    }

    doodler.y += doodler.dy;
}



function random(min, max) {
    return Math.random() * (max - min) + min;
}

function isBrokenPlatform() {
    return Math.random() * 0.1;
}


function isOverlapping(platform, x, width, height) {
    return (
        x < platform.x + platformWidth &&
        x + width > platform.x &&
        doodler.y < platform.y + platformHeight &&
        doodler.y + doodler.height > platform.y
    );
}

let y = platformStart;
while (y > 0) {
    y -= platformHeight + random(minPlatformSpace, maxPlatformSpace);

    let x;

    let isOverlappingOtherPlatforms = platforms.some(platform =>
        isOverlapping(platform, x, platformWidth)
    );

    let isOverlappingBrokenPlatforms = platformBroken.some(platform =>
        isOverlapping(platform, x, platformWidth)
    );

    let isOverlappingSemiPlatforms = isSemiPlatform.some(platform =>
        isOverlapping(platform, x, platformWidth)
    );

    while (
        isOverlappingOtherPlatforms ||
        isOverlappingBrokenPlatforms ||
        isOverlappingSemiPlatforms
    ) {
        // Jika ada tumpang tindih, coba tempatkan kembali
        x = random(25, canvas.width - 25 - platformWidth);

        isOverlappingOtherPlatforms = platforms.some(platform =>
            isOverlapping(platform, x, platformWidth)
        );

        isOverlappingBrokenPlatforms = platformBroken.some(platform =>
            isOverlapping(platform, x, platformWidth)
        );

        isOverlappingSemiPlatforms = isSemiPlatform.some(platform =>
            isOverlapping(platform, x, platformWidth)
        );
    }

    let platformType = random(0, 1);
    if (platformType < 0.6) {
        platforms.push({ x, y });
    } else if (platformType < 0.9  && brokenPlatformCount < maxBrokenPlatforms) {
        platformBroken.push({ x, y });
    } else {
        isSemiPlatform.push({ x, y, isTouched: false });
    }
    
}








const doodler = {
    width: 60,
    height: 80,
    x: canvas.width / 2 - 20,
    y: platformStart - 80,

    dx: 0,
    dy: 0,
};

let playAgain = {
    x: canvas.width / 2 - 75,
    y: canvas.height / 1.2 - 15,
    width: 150,
    height: 40,
}

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: 5,
}

const doodlerImgRight = new Image();
doodlerImgRight.src = 'assets/images/doodler-guy.png'

const doodlerImgLeft = new Image();
doodlerImgLeft.src = 'assets/images/doodler-guy-Copy-removebg-preview.png'




let playerDir = 0;
let keyDown = false;
let prevDoodleY = doodler.y;
let doodlerFacingLeft = false;

const skorDudel = document.getElementById("skorDoodle")



function loop() {
    frameId = requestAnimationFrame(loop);
    context.clearRect(0, 0, canvas.width, canvas.height);

    doodler.dy += gravity

    cancelAnimationFrame(frameId);

    if (doodler.y < canvas.height / 2 && doodler.dy < 0) {
        platforms.forEach(function (platform) {
            platform.y += -doodler.dy
        });


        while (platforms[platforms.length - 1].y > 0) {
            platforms.push({
                x: random(0, canvas.width - 0 - platformWidth),
                y: platforms[platforms.length - 1].y - (platformHeight + random(minPlatformSpace, maxPlatformSpace))

            })


            minPlatformSpace += 0.5;
            maxPlatformSpace += 0.5;

            minPlatformSpace = Math.max(minPlatformSpace - 0.1, 50); // Nilai minimum yang diperbolehkan
            maxPlatformSpace = Math.max(maxPlatformSpace - 0.1, 10)
        }
    } else {
        doodler.y += doodler.dy;
    }

    frameId = requestAnimationFrame(loop);

    if (doodler.y < canvas.height / 2 && doodler.dy < 0) {
        platformBroken.forEach(function (platform) {
            platform.y += -doodler.dy
        });

        while (platformBroken[platformBroken.length - 2].y > 0) {
            platformBroken.push({
                x: random(0, canvas.width - 0 - platformWidth),
                y: platformBroken[platformBroken.length - 1].y - (platformHeight + random(minPlatformSpace, maxPlatformSpace))

            })

            minPlatformSpace += 0.1;
            maxPlatformSpace += 0.1;

            maxPlatformSpace = Math.min(maxPlatformSpace, canvas.height / 3)
        }
    }
    
    cancelAnimationFrame(frameId);
    
    if (doodler.y < canvas.height / 2 && doodler.dy < 0) {
        isSemiPlatform.forEach(function (platform) {
            platform.y += -doodler.dy
        });

        while (isSemiPlatform[isSemiPlatform.length - 1].y > 0) {
            isSemiPlatform.push({
                x: random(0, canvas.width - 0 - platformWidth),
                y: isSemiPlatform[isSemiPlatform.length - 1].y - (platformHeight + random(minPlatformSpace, maxPlatformSpace))

            })


            minPlatformSpace += 0.1;
            maxPlatformSpace += 0.1;

            maxPlatformSpace = Math.min(maxPlatformSpace, canvas.height / 4)
        }
    }
    
    
    frameId = requestAnimationFrame(loop);


    if (!isGameStarted) {
        drawStartScreen()
        return;

    }

    if (doodler.y > canvas.height) {
        gameOver();
        return;
    }

    if (isGameOver) {
        doodler.dx = 0
        platforms.forEach(function (platform) {
            platform.dx = 0
            platforms = []
        })
    }


    if (!keyDown) {
        if (playerDir < 0) {
            doodler.dx += drag;

            if (doodler.dx > 0) {
                doodler.dx = 0;
                playerDir = 0;
            }
        } else if (playerDir > 0) {
            doodler.dx -= drag;

            if (doodler.dx < 0) {
                doodler.dx = 0;
                playerDir = 0;
            }
        }
    }

    doodler.x += doodler.dx;

    if (doodler.x + doodler.width < 0) {
        doodler.x = canvas.width;
    } else if (doodler.x > canvas.width) {
        doodler.x = -doodler.width;
    }

    cancelAnimationFrame(frameId);

    platforms.forEach(function (platform) {
        const img = new Image();
        img.src = 'assets/images/platform.png'
        context.drawImage(img, platform.x, platform.y, platformWidth, platformHeight);
        if (
            doodler.dy > 0 &&

            prevDoodleY + doodler.height <= platform.y &&

            doodler.x < platform.x + platformWidth &&
            doodler.x + doodler.width > platform.x &&
            doodler.y < platform.y + platformHeight &&
            doodler.y + doodler.height > platform.y) {
            doodler.y = platform.y - doodler.height;
            doodler.dy = bounceVelocity;


            if (!touchedPlatform.includes(platform)) {
                touchedPlatform.push(platform)
                skor += 107
            }
            platformSound.play();
        }

    });

    platformBroken.forEach(function (platform, index) {
        const imgg = new Image();
        imgg.src = 'assets/images/platform-broken - Copy.png'
        context.drawImage(imgg, platform.x, platform.y, platformWidth, platformHeight);
        if (
            doodler.dy > 0 &&

            prevDoodleY + doodler.height <= platform.y &&

            doodler.x < platform.x + platformWidth &&
            doodler.x + doodler.width > platform.x &&
            doodler.y < platform.y + platformHeight &&
            doodler.y + doodler.height > platform.y) {
            doodler.y = platform.y - doodler.height;

            if (!touchedPlatform.includes(platform)) {
                touchedPlatform.push(platform)
                

                platformBroken.splice(index, 1)

                platformSoundBro.play();
            }
        }

    });

    isSemiPlatform.forEach(function (platform, index) {
        const imggg = new Image();
        imggg.src = 'assets/images/WhatsApp Image 2023-11-19 at 11.22.09.jpeg'
        context.drawImage(imggg, platform.x, platform.y, platformWidth, platformHeight);
        if (
            doodler.dy > 0 &&

            prevDoodleY + doodler.height <= platform.y &&

            doodler.x < platform.x + platformWidth &&
            doodler.x + doodler.width > platform.x &&
            doodler.y < platform.y + platformHeight &&
            doodler.y + doodler.height > platform.y) {
            doodler.y = platform.y - doodler.height;
            doodler.dy = bounceVelocity;

            if (!touchedPlatform.includes(platform)) {
                touchedPlatform.push(platform)
                
                platform.isTouched = true; 
                platformSoundBrow.play();
                
                
                isSemiPlatform.splice(index, 1)
            }

        }

    });

    let doodleImg;
    if (doodlerFacingLeft) {
        doodleImg = doodlerImgLeft;
    } else {
        doodleImg = doodlerImgRight;
    }

    context.drawImage(doodleImg, doodler.x, doodler.y, doodler.width, doodler.height);
    prevDoodleY = doodler.y;

    platforms = platforms.filter(function (platform) {
        return platform.y < canvas.height;
        

    })
    
    if (skor >= 10000 && skor < 10500) {
        context.fillStyle = "black";
        context.font = "23px Arial";
        context.fillText("Selamat! Anda mencapai skor 500!", canvas.width / 2 - 175, canvas.height / 2 - 20);
    } else if (skor >= 10500) {
        isGameOver = true;
        isGameStarted = false;
        canvas.style.display = "none"
        input.style.display = "none"
        box.style.display = "none"
        thanks.style.display = "block"
    }

    frameId = requestAnimationFrame(loop);
}

function drawStartScreen() {
    if (!isGameStarted) {
        context.fillStyle = "black";
        context.font = "36px Arial";
        context.fillText("Press 'Play' to Start", canvas.width / 2 - 150, canvas.height / 2);
        doodler.y = canvas.height + 1000;
        platforms = []
    }
}

function startGame() {
    isGameStarted = true;
    frameId = requestAnimationFrame(loop);
    isGameOver = false;

    skor = 0;
    touchedPlatform = [];

    platforms = [{
        x: canvas.width / 2 - platformWidth / 2,
        y: platformStart,
    }];

    doodler.x = canvas.width / 2 - 20;
    doodler.y = platformStart - 100;

    doodler.dy = fallSpeed;

    if (doodler.y > canvas.height) {
        gameOver();
    }

}

function gameOver() {
    isGameOver = true
    cancelAnimationFrame(frameId);

    if (skor > highestScore) {
        highestScore = skor;
        localStorage.setItem("highestScore", highestScore);
    }

    if (isGameOver) {

        context.fillStyle = "red";
        context.font = "45px fantasy";
        context.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 4);

        context.fillStyle = "black";
        context.font = "25px fantasy";
        context.fillText(`Your HighestScore : ${highestScore}`, canvas.width / 2 - 101, canvas.height / 3)

        context.fillStyle = "gray";
        context.font = "25px fantasy";
        context.fillText(`Your Score : ${skor}`, canvas.width / 2 - 83, canvas.height / 2.5)

        context.fillStyle = "#4CAF50";
        context.fillRect(playAgain.x, playAgain.y, playAgain.width, playAgain.height);
        context.fillStyle = "black";
        context.font = "21px fantasy";
        context.fillText("Play Again", canvas.width / 2 - 43, canvas.height / 1.18);

    }
    doodler.dy = fallSpeed;
}

canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top;
    if (
        clickX >= playAgain.x &&
        clickX <= playAgain.x + playAgain.width &&
        clickY >= playAgain.y &&
        clickY <= playAgain.y + playAgain.height
    ) {
        startGame();

    }
});

canvas.addEventListener("click", function (event) {
    if (!isGameStarted) {
        startGame();
    } else if (isGameOver) {
        startGame();

    }
});

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', function (e) {
    if (e.key === "ArrowLeft" || e.key === "a") {
        leftPressed = true
        rightPressed = false
        doodler.dx = -5;
        doodlerFacingLeft = true;

    } else if (e.key === "ArrowRight" || e.key === "d") {
        leftPressed = false
        rightPressed = true
        doodler.dx = 5;
        doodlerFacingLeft = false;
    }
})

document.addEventListener('keyup', function (e) {
    if ((e.key === "ArrowLeft" && leftPressed) || (e.key === "ArrowRight" && rightPressed) ||
        (e.key === "a" && leftPressed) || (e.key === "d" && rightPressed)) {
        leftPressed = false
        rightPressed = false
        doodler.dx = 0;
    }
})


if (localStorage.getItem("highestScore") !== null) {
    highestScore = parseInt(localStorage.getItem("highestScore"));
}

let isCardVisible = false;

function mation() {
    var card = document.getElementById("card");
    var judulCard = document.querySelector(".judul");

    var isCardVisible = window.getComputedStyle(card).getPropertyValue("display") !== "none";
    
    if (isCardVisible) {
        card.style.display = "none";
        canvas.style.display = "block";
    } else {
        judulCard.innerHTML = "Informasi";
        card.style.display = "block"; 
        canvas.style.display = "none";
    }

    isCardVisible = !isCardVisible;

    
}

frameId = requestAnimationFrame(loop);