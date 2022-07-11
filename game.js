const canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');
let isDead = false;

canvas.width = 1500;
canvas.height = 700;

let timeInterval = null;
let score = 0;

//creating player, gravity, and other images
const gravity = 1.5;

class Player {
    constructor() {
        this.speed = 10;
        this.position = {
            x : 100,
            y : 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        const imageStandRight = new Image ();
        imageStandRight.src = "./img/keroIdleRight.png";

        const imageGoRight = new Image ();
        imageGoRight.src = "./img/keroGoRight.png";

        const imageStandLeft = new Image ();
        imageStandLeft.src = "./img/keroIdleLeft.png";

        const imageGoLeft = new Image ();
        imageGoLeft.src = "./img/keroGoLeft.png";

        this.images = {
            stand: {
                right: imageStandRight,
                left: imageStandLeft
            },
            run : {
                right: imageGoRight,
                left: imageGoLeft
            }
        }

        this.width = 90;
        this.height = 100;
        this.currentImage = this.images.stand.right;

    }

    draw() {
        c.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= canvas.height) { //this is for gravity condintion that character player will stop in canvas
            this.velocity.y += gravity;
        }
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        
        const image = new Image ();
        image.src = "./img/platform.png";

        this.image = image;
        this.width = 500;
        this.height = 80;
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}

class SmallPlatform {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        
        const image = new Image ();
        image.src = "./img/smallPlatform.png";

        this.image = image;
        this.width = 200;
        this.height = 80;
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

}

class Circle {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        
        const image = new Image ();
        image.src = "./img/circle.png";

        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }

}

class SakuraTree {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        
        const image = new Image ();
        image.src = "./img/sakuraTree.png";

        this.image = image;
        this.width = 800;
        this.height = 760;
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

}

class Card {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        const image = new Image ();
        image.src = "./img/card.png";
        image.style.borderRadius = "20";

        this.image = image;
        this.width = 100;
        this.height = 250;
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

}

let player = new Player();
let platforms = [];
let smallPlatforms = [];
let circles = [];
let sakuraTrees = [];
let card = [];

const keys = {
    right: {
        pressed: false
    },
    left : {
        pressed: false
    }
}

let scrollOffset = 0;

function restart() {
    isDead = false;
    
    player = new Player();

    platforms = 
        [
            new Platform({x: 0, y: 620}),
            new Platform({x: 495, y: 620}),
            new Platform({x: 690, y: 620}),
            new Platform({x: 1350, y: 620}),
            new Platform({x: 3100, y: 620}),
            new Platform({x: 3800, y: 620}),
            new Platform({x: 5500, y: 620}),
            new Platform({x: 5995, y: 620}),
            new Platform({x: 6490, y: 620}),
            new Platform({x: 6680, y: 620}),
        ];

    smallPlatforms = 
        [
            new SmallPlatform({x: 1800, y: 500}),
            new SmallPlatform({x: 1950, y: 380}),
            new SmallPlatform({x: 2100, y: 260}),
            new SmallPlatform({x: 2500, y: 260}),
            new SmallPlatform({x: 2900, y: 260}),
            new SmallPlatform({x: 4200, y: 500}),
            new SmallPlatform({x: 4400, y: 550}),
            new SmallPlatform({x: 4600, y: 500}),
            new SmallPlatform({x: 4800, y: 380}),
            new SmallPlatform({x: 4800, y: 260}),
            new SmallPlatform({x: 5100, y: 240}),
            new SmallPlatform({x: 5700, y: 500}),
            new SmallPlatform({x: 6000, y: 620}),
            new SmallPlatform({x: 6050, y: 400}),
            new SmallPlatform({x: 6400, y: 280}),
            new SmallPlatform({x: 6800, y: 240}),
            new SmallPlatform({x: 7200, y: 240}),
            new SmallPlatform({x: 7600, y: 240}),
            new SmallPlatform({x: 7550, y: 500}),
            new SmallPlatform({x: 7600, y: 240}),
            new SmallPlatform({x: 7700, y: 240}),
            new SmallPlatform({x: 7900, y: 240}),
            new SmallPlatform({x: 8300, y: 360}),
            new SmallPlatform({x: 8650, y: 240}),
            new SmallPlatform({x: 9050, y: 480}),
            new SmallPlatform({x: 9450, y: 600}),
            new SmallPlatform({x: 9800, y: 480}),
            new SmallPlatform({x: 10150, y: 360}),
            new SmallPlatform({x: 10220, y: 420}),
            new SmallPlatform({x: 10680, y: 340}),
            new SmallPlatform({x: 11080, y: 460}),
            new SmallPlatform({x: 11220, y: 460}),
        ];

    circles = 
        [
            new Circle({x: -40, y: 250}),
            new Circle({x: 400, y:  -40}),
            new Circle({x: 1000, y:  200}),
            new Circle({x: 1600, y:  400}),
            new Circle({x: 2200, y:  -100}),
            new Circle({x: 2600, y:  200}),
            new Circle({x: 3300, y:  50}),
            new Circle({x: 3800, y:  450}),
            new Circle({x: 4400, y:  -20}),
            new Circle({x: 4900, y:  500}),
            new Circle({x: 5400, y:  310}),
            new Circle({x: 6000, y:  10}),
            new Circle({x: 6400, y:  430}),
            new Circle({x: 6600, y:  -50}),
            new Circle({x: 7050, y:  340}),
            new Circle({x: 7900, y:  140}),
            new Circle({x: 8800, y:  360}),
        ];

    sakuraTrees = 
        [
            new SakuraTree({x: -100, y: -50}),
            new SakuraTree({x: 400, y: -50}),
            new SakuraTree({x: 1200, y: -50}),
            new SakuraTree({x: 2700, y: -50}),
            new SakuraTree({x: 4000, y: -50}),
            new SakuraTree({x: 4800, y: -50}),
            new SakuraTree({x: 5400, y: -50}),
            new SakuraTree({x: 6000, y: -50}),
            new SakuraTree({x: 7000, y: -50}),
            new SakuraTree({x: 8300, y: -50}),
        ];

    card = 
        [
            new Card({x: 11200, y: 200})
        ];

    scrollOffset = 0;
}

function animate() {
    if(isDead){
        c = null;
        return;
    } else {
        requestAnimationFrame (animate);
        c.fillStyle = "skyblue";
        c.fillRect(0, 0, canvas.width, canvas.height);

        circles.forEach(circle => {
            circle.draw();
        })

        sakuraTrees.forEach(sakuraTree => {
            sakuraTree.draw();
        })

        card.forEach(card => {
            card.draw();
        })

        smallPlatforms.forEach(smallPlatform => {
            smallPlatform.draw();
        })

        platforms.forEach(platform => {
            platform.draw();
        })

        player.update();

        //setting speed for movement
        if (keys.right.pressed && player.position.x < 400) {
            player.velocity.x = player.speed;
        } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
            player.velocity.x = -player.speed;
        } else {
            player.velocity.x = 0;

            if (keys.right.pressed) {
                scrollOffset += player.speed;
                card.forEach(card => {
                    card.position.x -= player.speed;
                })
                platforms.forEach(platform => {
                    platform.position.x -= player.speed;
                })
                smallPlatforms.forEach(smallPlatform => {
                    smallPlatform.position.x -= player.speed;
                })
                circles.forEach(circle => {
                    circle.position.x -= player.speed * 0.70;
                })
                sakuraTrees.forEach(sakuraTree => {
                    sakuraTree.position.x -= player.speed * 0.70;
                })
            } else if (keys.left.pressed && scrollOffset > 0) {
                scrollOffset -= player.speed;
                platforms.forEach(platform => {
                    platform.position.x += player.speed;
                })
                smallPlatforms.forEach(smallPlatform => {
                    smallPlatform.position.x += player.speed;
                })
                card.forEach(card => {
                    card.position.x += player.speed;
                })
                circles.forEach(circle => {
                    circle.position.x += player.speed * 0.70;
                })
                sakuraTrees.forEach(sakuraTree => {
                    sakuraTree.position.x += player.speed * 0.70;
                })
            }
        }

        //platform collision detector
        platforms.forEach(platform => {
            if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
                player.velocity.y = 0
            }

        })

        smallPlatforms.forEach(smallPlatform => {
            if (player.position.y + player.height <= smallPlatform.position.y && player.position.y + player.height + player.velocity.y >= smallPlatform.position.y && player.position.x + player.width >= smallPlatform.position.x && player.position.x <= smallPlatform.position.x + smallPlatform.width) {
                player.velocity.y = 0
            }

        })


        //win condition
        const congrats = document.querySelector(".congrats");
        const overlay = document.querySelector(".overlay");
        const openModal = function () {
            congrats.classList.remove("hidden");
            overlay.classList.remove("hidden");
        };
        const closeModal = function () {
            congrats.classList.add("hidden");
            overlay.classList.add("hidden");
        };
        if (scrollOffset >= 10750) {
        // if (scrollOffset >= 100) {
            isDead = true;
            let audio = new Audio('sound/bgSong.mp3');
            audio.play();
            openModal();
        } else {
            closeModal ();
        }


        // lose condition
        const gameOver = document.querySelector(".gameOver");
        const overlayOver = document.querySelector(".overlayOver");
        const openModalOver = function () {
            gameOver.classList.remove("hidden");
            overlayOver.classList.remove("hidden");
        };
        const closeModalOver = function () {
            gameOver.classList.add("hidden");
            overlayOver.classList.add("hidden");
        };
        if (player.position.y > canvas.height) {
            isDead = true;
            let audio = new Audio('sound/failSound.mp3');
            audio.play();
            // getScores();
            openModalOver();
        } else {
            closeModalOver();
        }
    }
}
restart();
animate();
startTimer();

//setting buttons function
addEventListener("keydown", ({keyCode}) => { 
    switch (keyCode) {
        case 37:
            keys.left.pressed = true;
            player.currentImage = player.images.run.left;
            break;

        case 40:
            break;
        
        case 39:
            keys.right.pressed = true;
            player.currentImage = player.images.run.right;
            break;

        case 38:
            if (player.velocity.y == 0) {
                let audio = new Audio('sound/jumpSound.mp3');
                audio.play();
                player.velocity.y -= 20;
            }
            break;
    }
});

addEventListener("keyup", ({keyCode}) => { 
    switch (keyCode) {
        case 37:
            keys.left.pressed = false;
            player.currentImage = player.images.stand.left;
            break;

        case 40:
            break;
        
        case 39:
            keys.right.pressed = false;
            player.currentImage = player.images.stand.right;
            break;

        case 38:
            break;
    }
});

//setting timer
function startTimer() {
    if (score === 0) {
        timeInterval = setInterval(function() {
            score++;
        }, 1000);
    }
}

// setting leaderboard
function submitScore() {
    const name = document.querySelector(".enterBox");
    let allScores = localStorage.getItem("gameScores");
    let scores = [];

    if (allScores != 'null' && JSON.parse(allScores).length > 0) {
        scores = JSON.parse(allScores);
    }

    scores.push({
        // "name": name.value,
        "name": name.value.toUpperCase(),
        "score": score
    });
    localStorage.setItem("gameScores", JSON.stringify(scores));

    name.value = "";
    timeInterval = null;
    score = 0;
    
    // add calling landing page
    setTimeout(function() {
        window.location.replace('/landing.html');
    }, 1000);
}

function resetScores() {
    localStorage.setItem("gameScores", null);
}

const scoresUlList = document.querySelector(".scores-ul");
function getScores() {
    const scores = JSON.parse(localStorage.getItem("gameScores"));
    
    for (x = 0; x < scores.length; x++) {
        let scoreLi = document.createElement('p');
        let textVal = scores[x].name + ': ' + scores[x].score + ' PTS';
    }
}
