const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let timeInterval = null;
let score = 0;

//creating player and gravity

const gravity = 1.5;

class Player {
    constructor() {
        this.speed = 10;
        this.position = {
            x : 100,
            y : 100
        }
        this.velocity = { //gravity of the player in 2D space; by default, it wil push the player down
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

        this.width = 50;
        this.height = 60;
        this.currentImage = this.images.stand.right;

    }

    draw() {
        c.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height)
    }

    // draw() { //style for player
    //     c.fillStyle = "red";
    //     c.fillRect(this.position.x,this.position.y, this.width, this.height);
    // }

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
        this.width = image.width;
        this.height = image.height;
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
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
        this.width = image.width;
        this.height = image.height;
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }

}

class Circle {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        
        const image = new Image ();
        image.src = "./img/background.png";

        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }

}

class Card {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }
        
        // const image = document.createElement("img");
        // image.setAttribute("class", "star");
        // image.appendChild(canvas);

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
let card = [];

const keys = {
    right: {
        pressed: false
    },
    left : {
        pressed: false
    }
}

let scrollOffset = 0; // setting the win scenario

function restart() {
    player = new Player();
    platforms = 
        [
            new Platform({x: -50, y: 520}),
            new Platform({x: 170, y: 520}),
            new Platform({x: 390, y: 520}),
            new Platform({x: 610, y: 520}),
            new Platform({x: 1000, y: 520}),
            new Platform({x: 1220, y: 520}),
            new Platform({x: 2220, y: 520}),
            new Platform({x: 2700, y: 520}),
            new Platform({x: 2920, y: 520}),
            new Platform({x: 5000, y: 520}),
            new Platform({x: 5220, y: 520}),
            new Platform({x: 5440, y: 520}),
            new Platform({x: 5440, y: 520}),
            new Platform({x: 5660, y: 520}),
            new Platform({x: 8200, y: 520}),
            new Platform({x: 8550, y: 520}),
            new Platform({x: 8900, y: 520}),
            new Platform({x: 10800, y: 520}),
            new Platform({x: 11020, y: 520}),
            new Platform({x: 11240, y: 520}),
            new Platform({x: 11460, y: 520}),
        ];
    smallPlatforms = 
        [
            new SmallPlatform({x: 1500, y: 450}),
            new SmallPlatform({x: 1800, y: 350}),
            new SmallPlatform({x: 2100, y: 250}),
            new SmallPlatform({x: 2400, y: 150}),
            new SmallPlatform({x: 3100, y: 400}),
            new SmallPlatform({x: 3500, y: 300}),
            new SmallPlatform({x: 3900, y: 300}),
            new SmallPlatform({x: 4300, y: 300}),
            new SmallPlatform({x: 4700, y: 200}),
            new SmallPlatform({x: 5200, y: 200}),
            new SmallPlatform({x: 5500, y: 300}),
            new SmallPlatform({x: 5800, y: 200}),
            new SmallPlatform({x: 6200, y: 200}),
            new SmallPlatform({x: 6250, y: 450}),
            new SmallPlatform({x: 6650, y: 450}),
            new SmallPlatform({x: 6850, y: 350}),
            new SmallPlatform({x: 7050, y: 250}),
            new SmallPlatform({x: 7250, y: 150}),
            new SmallPlatform({x: 7300, y: 450}),
            new SmallPlatform({x: 7700, y: 350}),
            new SmallPlatform({x: 8100, y: 300}),
            new SmallPlatform({x: 9100, y: 400}),
            new SmallPlatform({x: 9320, y: 300}),
            new SmallPlatform({x: 9720, y: 300}),
            new SmallPlatform({x: 10020, y: 200}),
            new SmallPlatform({x: 10420, y: 200}),
        ]
    circles = 
        [
            new Circle({x: -40, y: 120}),
            new Circle({x: 320, y: -50}),
            new Circle({x: 1000, y: 140}),
            new Circle({x: 1800, y: -20}),
            new Circle({x: 2100, y: 150}),
            new Circle({x: 2900, y: 50}),
            new Circle({x: 3700, y: 130}),
            new Circle({x: 4000, y: -40}),
            new Circle({x: 4300, y: 220}),
            new Circle({x: 5100, y: -60}),
            new Circle({x: 6000, y: 270}),
            new Circle({x: 6200, y: -50}),
            new Circle({x: 7200, y: 150}),
            new Circle({x: 8300, y: -50}),
        ];
    card = 
        [
            new Card({x: 11200, y: 180})
        ];

    scrollOffset = 0; // setting the win scenario
}

function animate() {
    requestAnimationFrame (animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => {
        circle.draw();
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

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
    } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += player.speed;
            platforms.forEach(platform => {
                platform.position.x -= player.speed;
            })
            smallPlatforms.forEach(smallPlatform => {
                smallPlatform.position.x -= player.speed;
            })
            card.forEach(card => {
                card.position.x -= player.speed;
            })
            circles.forEach(circle => {
                circle.position.x -= player.speed * 0.70;
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
        }
    }

    console.log (scrollOffset);

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
    // if (scrollOffset >= 10750) { //can put here the last platform location
    if (scrollOffset >= 10750) { //can put here the last platform location
        // console.log ("you win");
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
        getScores();
        openModalOver();
    } else {
        closeModalOver();
    }

}
restart();
animate();
startTimer();

//creating movements

//Use below codes in order to identify the keyCode of your keys
/* addEventListener("keydown", (event) => { 
     console.log(event);
}); */

//shortcut for the keycode finder
/*addEventListener("keydown", ({keyCode}) => { 
    console.log(keyCode);
});*/
addEventListener("keydown", ({keyCode}) => { 
    switch (keyCode) {
        case 37:
            console.log('left');
            keys.left.pressed = true;
            player.currentImage = player.images.run.left;
            break;

        case 40:
            console.log('down');
            break;
        
        case 39:
            console.log('right');
            keys.right.pressed = true;
            player.currentImage = player.images.run.right;
            break;

        case 38:
            console.log('up');
            if (player.velocity.y == 0) {
                player.velocity.y -= 20;
            }
            break;
    }
});

addEventListener("keyup", ({keyCode}) => { 
    switch (keyCode) {
        case 37:
            console.log('left');
            keys.left.pressed = false;
            player.currentImage = player.images.stand.left;
            break;

        case 40:
            console.log('down');
            break;
        
        case 39:
            console.log('right');
            keys.right.pressed = false;
            player.currentImage = player.images.stand.right;
            break;

        case 38:
            console.log('up');
            break;
    }
});

function startTimer() {
    if (score === 0) {
        timeInterval = setInterval(function() {
            score++;
        }, 1000);
    }
}

function submitScore() {
    const name = document.querySelector('.enterName');
    let allScores = localStorage.getItem('gameScores');
    let scores = [];

    if (allScores != null && JSON.parse(allScores).length > 0) {
        scores = JSON.parse(allScores);
    }

    scores.push({
        'name': name.value,
        'score': score
    });

    localStorage.setItem('gameScores', JSON.stringify(scores));

    name.value = "";
    timeInterval = null;
    score = 0;
    restart();
}

function resetScores() {
    localStorage.setItem('gameScores', null);
}

const scoresUlList = document.querySelector('.scores-ul');
function getScores() {
    const scores = JSON.parse(localStorage.getItem('gameScores'));
    
    for (x = 0; x < scores.length; x++) {
        let scoreLi = document.createElement('p');
        let textVal = scores[x].name + ': ' + scores[x].score + ' PTS';
        console.log(textVal);
        scoreLi.textContent = textVal;
        scoresUlList.appendChild(scoreLi);
    }
}
