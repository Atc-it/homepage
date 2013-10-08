var letters_pink = null,
        numbers_pink = null,
        letters_blue = null,
        sMessage = "",
        canvas = null,
        ctx = null,
        LETTER_HEIGHT = 140,
        LETTER_WIDTH = 110,
        iStep = 0,
        iDrawPhase = 0,
        job = null,
        bPink = true;

function drawLetter(iSpriteRow, iSpriteCol, iPos) {
    var xPos = (LETTER_WIDTH * iPos) - iStep;
    if ((xPos > 0 - LETTER_WIDTH) && (xPos < 1200 + LETTER_WIDTH)) {
        ctx.drawImage(letters_pink, iSpriteRow * LETTER_WIDTH, iSpriteCol * LETTER_HEIGHT, LETTER_WIDTH, LETTER_HEIGHT, xPos, 0, LETTER_WIDTH, LETTER_HEIGHT);
    }
}

function drawnumber(iSpriteRow, iSpriteCol, iPos) {
    var xPos = (LETTER_WIDTH * iPos) - iStep;
    if ((xPos > 0 - LETTER_WIDTH) && (xPos < 1200 + LETTER_WIDTH)) {
        ctx.drawImage(numbers_pink, iSpriteRow * LETTER_WIDTH, iSpriteCol * LETTER_HEIGHT, LETTER_WIDTH, LETTER_HEIGHT, xPos, 0, LETTER_WIDTH, LETTER_HEIGHT);
    }
}

function draw() {

    var iCounter = 0,
            iCharCode = 0;

    for (iCounter = 0; iCounter < sMessage.length; iCounter++) {

        iCharCode = sMessage.charCodeAt(iCounter) - 32;


        if (iCharCode > 64 && iCharCode < 91) {
            iSpriteCol = Math.abs(65 - iCharCode) % 5;
            iSpriteRow = Math.floor(Math.abs(65 - iCharCode) / 5);
            drawLetter(iSpriteCol, iSpriteRow, iCounter);
        } else if (iCharCode > 15 && iCharCode < 26) {
            iSpriteCol = Math.abs(16 - iCharCode) % 5;
            iSpriteRow = Math.floor(Math.abs(16 - iCharCode) / 5);
            drawnumber(iSpriteCol, iSpriteRow, iCounter);
        } else {
            iSpriteCol = 1;
            iSpriteRow = 5;
            drawLetter(iSpriteCol, iSpriteRow, iCounter);

        }

    }

    iSpriteCol = 1;
    iSpriteRow = 5;

    for (iCounter; iCounter < sMessage.length + 10; iCounter++) {

        drawLetter(iSpriteCol, iSpriteRow, iCounter);
    }

    iDrawPhase += 1;
    iStopPoint = (27 * sMessage.length);

    if (iDrawPhase < iStopPoint) {
        iStep += 10;
    } else {
        clearInterval(job);
    }
}

function startAnim() {

    clearInterval(job);
    sMessage = message;
    iDrawPhase = 0;
    iStep = 0;

    // Add 5 spaces padding so the text start off right
    sMessage = "     " + sMessage;
    // Start the timer
    job = setInterval(draw, 20);
}

function initClk() {

    // Grab the clock element
    canvas = document.getElementById('led');

    // Canvas supported?
    if (canvas.getContext('2d')) {
        ctx = canvas.getContext('2d');

        numbers_pink = new Image();
        numbers_pink.src = 'numbers-pink.jpg';

        letters_pink = new Image();
        letters_pink.src = 'letters-pink.jpg';
        letters_pink.onload = startAnim;

    } else {
        alert("Canvas not supported!");
    }
}