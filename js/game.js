getRandomInt = (min, max) => Math.round(Math.random() * (max - min)) + min;
function gameInit() {
    uploadImages();
    if (g_canvas.width > g_canvas.height) {
        //pc
        controls.size = g_canvas.width / 20;
        characters.size = g_canvas.width / 16;
        characters.enemiesQuantity = 16;
        controls.device = "pc";
    } else {
        //smartphone
        controls.size = g_canvas.width / 8;
        characters.size = g_canvas.width / 6;
        characters.enemiesQuantity = 6;
        controls.device = "smartphone";
    }
    controls.fontSize = controls.size / 1.7;
    controls.stringHeight = controls.size / 1.3;
    characters.speed = g_canvas.height / FPS / 1.5;
    characters.minspeed = g_canvas.height / 3 / FPS;
    window.onload = gameMenu;
}
function assignGameControls() {
    document.body.onkeydown = (event) => {
        if (event.code == "ArrowUp" || event.code == "KeyW") keys["up"] = true;
        if (event.code == "ArrowLeft" || event.code == "KeyA") keys["left"] = true;
        if (event.code == "ArrowDown" || event.code == "KeyS") keys["down"] = true;
        if (event.code == "ArrowRight" || event.code == "KeyR") keys["right"] = true;
        if (event.code == "Escape") controls.pauseButton.pressed();
    };
    document.body.onkeyup = (event) => {
        if (event.code == "ArrowUp" || event.code == "KeyW") keys["up"] = false;
        if (event.code == "ArrowLeft" || event.code == "KeyA") keys["left"] = false;
        if (event.code == "ArrowDown" || event.code == "KeyS") keys["down"] = false;
        if (event.code == "ArrowRight" || event.code == "KeyR") keys["right"] = false;
    };
    g_canvas.addEventListener("touchstart", (event) => {
        keys["touch"] = true;
        characters.currentCar.setDestination(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    });
    g_canvas.addEventListener("touchmove", (event) =>
        characters.currentCar.setDestination(event.changedTouches[0].clientX, event.changedTouches[0].clientY));
    g_canvas.addEventListener("touchend", (event) => keys["touch"] = false);
}
function gameMenu() {
    assignMenuControls();
    drawBackground();
    drawContent();
    this.selected = 0;
    function highlight(which = this.selected) {
        drawBackground();
        g_ctx.fillStyle = "#222222";
        g_ctx.fillRect(
            0,
            (this.selected - 1) * g_canvas.height / characters.numberOfCars,
            g_canvas.width,
            g_canvas.height / characters.numberOfCars
        );
        drawContent();
    }
    function drawBackground() {
        g_ctx.fillStyle = "#111111";
        g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);
    }
    function drawContent() {
        let phrases = ["Herman Terekhov's girl", "Lexa228 aka Lehych", "Rostiks"];
        for (let i = 0; i < characters.numberOfCars; i++) {
            let imageX, imageY, textX, textY, textSize;
            imageX = g_canvas.width / 20;
            g_ctx.textAlign = "left";
            g_ctx.textBaseline = "top";
            if (controls.device == "pc") {
                imageY = g_canvas.height / characters.numberOfCars * i + g_canvas.height / (characters.numberOfCars * 7);
                textSize = g_canvas.height / 25;
                textX = g_canvas.width * 6 / 20;
                textY = g_canvas.height / characters.numberOfCars * i + g_canvas.height / 10;
            } else {
                imageY = g_canvas.height / characters.numberOfCars * i + g_canvas.height / 10;
                textSize = g_canvas.width / 15;
                textX = g_canvas.width / 20;
                textY = g_canvas.height / characters.numberOfCars * i + g_canvas.height / 20;
            }
            g_ctx.drawImage(
                images["car" + (i + 1)],
                imageX,
                imageY,
                g_canvas.height / characters.numberOfCars / 1.5,
                g_canvas.height / characters.numberOfCars / 1.5 * 0.538
            );
            g_ctx.fillStyle = "#555555";
            g_ctx.fillStyle = "#ffffff";
            g_ctx.font = "Normal " + textSize + "pt Arial";
            g_ctx.fillText(
                phrases[i],
                textX, textY
            );
            g_ctx.textAlign = "center";
            g_ctx.textBaseline = "middle";
        }
    }
    function select(which) {
        if (this.selected == 0) {
            if (which == "next") this.selected = 1;
            if (which == "prev") this.selected = characters.numberOfCars;
        } else {
            if (which == "next")
                if (selected != characters.numberOfCars) this.selected++;
                else this.selected = 1;
            if (which == "prev")
                if (selected != 1) this.selected--;
                else this.selected = characters.numberOfCars;
            if (which == "this") {
                characters.currentCar = new Car(images["car" + this.selected], characters.speed);
                gameStart();
            }
        }
        highlight();
    }
    function assignMenuControls() {
        document.body.onclick = function (event) {
            for (let i = 1; i <= characters.numberOfCars; i++)
                if (event.clientY < (g_canvas.height * i) / characters.numberOfCars &&
                    event.clientY > (g_canvas.height * (i - 1)) / characters.numberOfCars) {
                    characters.currentCar = new Car(images["car" + i], characters.speed);
                }
            gameStart();
        };
        document.body.onkeydown = function (event) {
            if (event.code == "ArrowDown" || event.code == "KeyS") select("next");
            if (event.code == "ArrowUp" || event.code == "KeyW") select("prev");
            if (event.code == "Enter" || event.code == "Space") select("this");
        }
    }
}
function gameStart() {
    assignGameControls();
    characters.enemies = [];
    characters.helper = null;
    controls.counter.init();
    controls.pauseButton.init();
    document.body.onclick = function (event) {
        controls.pauseButton.clicked(event.clientX, event.clientY);
    };
    gameContinue();
}
function gameTick() {
    characters.validateNPCs();
    road.show();
    characters.move();
    if (characters.currentCar.collision(characters.helper)) characters.helper.hide(), controls.counter.inc();
    if (characters.checkCollision()) {
        gameOver();
        return;
    }
    controls.pauseButton.draw();
    controls.counter.draw();
}
function gamePause() {
    clearInterval(g_intervalId);
}
function gameContinue() {
    g_intervalId = setInterval(gameTick, 1000 / FPS);
}
function gameOver() {
    gamePause();
    road.show();
    g_ctx.fillStyle = "#111111";

    if (controls.device == "pc") g_ctx.fillRect(g_canvas.width / 4, g_canvas.height / 4, g_canvas.width / 2, g_canvas.height / 2);
    else g_ctx.fillRect(controls.size, g_canvas.height / 4, g_canvas.width - 2 * controls.size, g_canvas.height / 2);

    g_ctx.fillStyle = "#ffffff";
    let setup, punchline, button;
    if (controls.counter.count == 2) {
        setup = ["Однозначно"];
        punchline = ["ДВА балла"];
        button = "ПЕРЕСДАТЬ";
    }
    if (controls.counter.count == 3) {
        setup = ["ГОЛОВА", "ПУСТАЯ!"];
        punchline = ["*СТАВИТ", "ПОЛУМЕСЯЦ*"];
        button = "ДОНЕСТИ ЗАДАЧИ";
    }
    if (controls.counter.count == 4) {
        setup = ["УДАРНИК,", "ГОВОРИТЕ?"];
        punchline = ["ВСТРЕТИМСЯ", "В СЕНТЯБРЕ"];
        button = "ОТЧИСЛИТЬСЯ";
    }
    if (controls.counter.count == 5) {
        setup = ["А 5 РУБЛЕЙ", "НЕ ХОТИТЕ?"]
        punchline = ["ПРИХОДИТЕ", "ЗАВТРА"];
        button = "ПРИЙТИ ЗАВТРА";
    }
    g_ctx.font = "Normal " + controls.fontSize + "pt Arial";
    placeText(setup, g_canvas.height / 3);
    g_ctx.font = "Bold " + controls.fontSize + "pt Arial";
    placeText(punchline, g_canvas.height / 2);
    g_ctx.fillStyle = "#222222";
    let buttonCenterX = g_canvas.width / 2;
    let buttonY = (g_canvas.height / 3) * 2 - controls.size / 2;
    let buttonW = 4 * controls.size;
    let buttonH = controls.size;
    let buttonX = buttonCenterX - buttonW / 2;
    g_ctx.fillRect(buttonX, buttonY, buttonW, buttonH);
    g_ctx.fillStyle = "#ffffff";
    g_ctx.font = "Normal " + controls.fontSize / 2 + "pt Arial";
    placeText([button], (g_canvas.height / 3) * 2);
    document.body.onclick = function (event) {
        if (event.clientX > buttonX &&
            event.clientX < buttonX + buttonW &&
            event.clientY > buttonY &&
            event.clientY < buttonY + buttonH)
            gameMenu();
    };
    document.body.onkeydown = function (event) {
        if (event.code == "Enter" || event.code == "Space") gameMenu();
    }
    function placeText(text, centerY) {
        if (text.length == 1)
            g_ctx.fillText(text[0], g_canvas.width / 2, centerY);
        else {
            g_ctx.fillText(text[0], g_canvas.width / 2, centerY - controls.stringHeight / 2);
            g_ctx.fillText(text[1], g_canvas.width / 2, centerY + controls.stringHeight / 2);
        }
    }
}
