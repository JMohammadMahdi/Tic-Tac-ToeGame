const keysEle = document.querySelectorAll(".keys");
const returnEle = document.querySelector(".return");

let Rows = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let Turn = "x";

let score1 = 0;
let score2 = 0;
let ties = 0;

// start game
let Stater = null;

let isEndGame = false;

keysEle.forEach(key => {
    key.addEventListener("click", event => {
        const ID = event.target.id;
        CheckValid(ID - 1);
    })
})

function FillKey(key) {
    Rows[key] = Turn;
    // set element
    let element = null;
    if (Turn == "x") {
        element = document.createElement("img");
        element.setAttribute("src", "./icon/Multiply.svg");
        element.setAttribute("id", `${key + 1}`);
        element.setAttribute("alt", "Multiply");
        element.setAttribute("width", "50");
        element.setAttribute("height", "50");
    } else {
        element = document.createElement("span");
        element.setAttribute("class", "circle circle-Inkeys");
        element.setAttribute("id", `${key + 1}`);
    }

    // append
    keysEle[key].appendChild(element);
    GameReview();
}

function CheckValid(key) {
    if (Rows[key] == 0) {
        const xPlayer = document.getElementById("xPlayer");
        const oPlayer = document.getElementById("oPlayer");
        FillKey(key);

        if (Turn == "x") {
            Turn = "o";
            xPlayer.style.display = "none";
            oPlayer.style.display = "block";
        } else if (Turn == "o") {
            Turn = "x";
            xPlayer.style.display = "block";
            oPlayer.style.display = "none";
        }
    } else {
        alert("In Valid Key! Try Again.")
    }
    if (isEndGame) {
        ReturnGame();
        isEndGame = false;
    }
}

function GameReview() {
    let player = "";
    const Line = document.querySelector(".Line");

    // winner
    if (Rows[0] == Rows[1] && Rows[1] == Rows[2]) {
        player = Rows[0];
    } else if (Rows[3] == Rows[4] && Rows[4] == Rows[5]) {
        player = Rows[3];
    } else if (Rows[6] == Rows[7] && Rows[7] == Rows[8]) {
        player = Rows[6];
    } else if (Rows[0] == Rows[3] && Rows[3] == Rows[6]) {
        player = Rows[0];
    } else if (Rows[1] == Rows[4] && Rows[4] == Rows[7]) {
        player = Rows[1];
    } else if (Rows[2] == Rows[5] && Rows[5] == Rows[8]) {
        player = Rows[2];
    } else if (Rows[0] == Rows[4] && Rows[4] == Rows[8]) {
        player = Rows[0];
    } else if (Rows[2] == Rows[4] && Rows[4] == Rows[6]) {
        player = Rows[2];
    } else if (Rows[0] != 0 && Rows[1] != 0 && Rows[2] != 0 &&
        Rows[3] != 0 && Rows[4] != 0 && Rows[5] != 0 &&
        Rows[6] != 0 && Rows[7] != 0 && Rows[8] != 0) {
        ties++;
        Line.style.cssText = "transform: translateX(140px);"

        Stater = "x"; // default
        isEndGame = true;
    }

    if (player == "x" || player == "o") {
        if (player == "x") {
            score1++;
            Line.style.cssText = "transform: translateX(0);"
            Stater = "x";
        } else {
            score2++;
            Line.style.cssText = "transform: translateX(280px);"
            Stater = "o";
        }

        isEndGame = true;
    }

    const player1Ele = document.querySelector(".player-win h2").
        innerText = score1;
    const player2Ele = document.querySelector(".cpu-win h2").
        innerText = score2;
    const TiesEle = document.querySelector(".Ties h2").
        innerText = ties;
}

returnEle.addEventListener("click", ReturnGame)
function ReturnGame() {
    setTimeout(() => {
        for (let index = 0; index < Rows.length; index++) { Rows[index] = 0; };

        const keysArray = Array.from(keysEle);
        keysArray.forEach(element => {
            while (element.firstChild) {
                element.firstChild.remove();
            }
        });

        const xPlayer = document.getElementById("xPlayer");
        const oPlayer = document.getElementById("oPlayer");

        if (Stater == "x") {
            Turn = "x";
            xPlayer.style.display = "block";
            oPlayer.style.display = "none";
        } else if (Stater == "o") {
            Turn = "o";
            xPlayer.style.display = "none";
            oPlayer.style.display = "block";
        }
    }, 500);
}