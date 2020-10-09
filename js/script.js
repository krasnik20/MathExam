//вынести размеры вовне и обновлять при растягивании
//залипает кнопка
//внести все контролы и штучки для персонажей в соотв объект

var g_canvas = document.getElementById("example");
g_canvas.width = window.innerWidth;
g_canvas.height = window.innerHeight;
var g_ctx = g_canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", () => g_ctx.fillText("Wait, game is loading...", g_canvas.width / 2, g_canvas.height / 2))
var controls = {
    pauseButton: g_pauseButton,
    counter: g_counter,
};
var characters = {
    enemies: enemies,
    currentCar: currentCar,
    helper: helper,
};
var g_counter = {
    init: function () {
        this.reset();
        this.width = controls.size * 3;
        this.height = controls.size;
    },
    inc: function () {
        if (this.count != 5) this.count++;
    },
    reset: function () {
        this.count = 2;
    },
    draw: function () {
        g_ctx.font = "Bold " + g_canvas.width / 50 + "pt Arial";
        g_ctx.fillStyle = "#111111";
        g_ctx.fillRect(g_canvas.width / 2 - this.width / 2, 0, this.width, this.height);
        g_ctx.fillStyle = "#ffffff";
        g_ctx.fillText("Score:" + this.count, g_canvas.width / 2 - this.width / 2 + 5, 40);
    },
};
var currentCar;
var LEFT = 65;
var RIGHT = 68;
var UP = 87;
var DOWN = 83;
var TOUCH = 1;
var ANOTHERLEFT = 37;
var ANOTHERRIGHT = 39;
var ANOTHERUP = 38;
var ANOTHERDOWN = 40;
var STAND = 0;
var FPS = 120;
var g_direction = STAND;
var g_intervalId;
const numberOfEnemies = 6;
const numberOfCars = 3;

var g_pauseButton = {
    y: 0,
    paused: false,
    draw: function () {
        g_ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    },
    clicked: function (x, y) {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
            if (this.paused) {
                this.paused = false;
                this.img = this.imgStop;
                gameContinue();
            } else {
                this.paused = true;
                this.img = this.imgContinue;
                gamePause();
            }
        this.draw();
    },
    init: function () {
        this.width = controls.size;
        this.height = this.width;
        this.x = g_canvas.width - this.width;
        this.imgStop = images["pauseStop"];
        this.imgContinue = images["pauseContinue"];
        this.img = this.imgStop;
    }
};
var enemies = [];
var images = [];
function uploadImages() {
    for (let i = 1; i <= numberOfEnemies; i++) {
        images["enemy" + i] = new Image();
        images["enemy" + i].src = "images/enemycar" + i + ".png";
    }
    for (let i = 1; i <= numberOfCars; i++) {
        images["car" + i] = new Image();
        images["car" + i].src = "images/car" + i + ".png";
    }
    images["helper1"] = new Image();
    images["helper1"].src = "images/helper1.png";
    images["road"] = new Image();
    images["road"].src = "images/road.png";
    images["pauseContinue"] = new Image();
    images["pauseContinue"].src = "images/continue.png";
    images["pauseStop"] = new Image();
    images["pauseStop"].src = "images/pause.png";
}
var helper;
var road = {
    show: function () {
        g_ctx.drawImage(images["road"], 0, 0, g_canvas.width, g_canvas.height);
    },
};
gameInit();
