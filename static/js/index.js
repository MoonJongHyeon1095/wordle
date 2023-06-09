let attempt = 0;
let index = 0;
const answerWord = "apple";

function appStart() {
  updateClock();

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임종료";
    div.style =
      "display: flex; justify-content: center; align-items: center; position: absolute; top: 40vh; left: 45vw; background-color: white; width: 200px; height: 100px;";
    document.body.appendChild(div);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
  };

  const nextLine = () => {
    if (attempt === 6) return gameOver();
    attempt += 1;
    index = 0;
  };

  const handleEnter = async () => {
    let hit = 0;

    // const 응답 = await fetch("answer");
    // const answerWord = await 응답.json();

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempt}${i}']`
      );

      const input = block.innerText;
      const answerChar = answerWord[i];
      const inputKey = input.toUpperCase();
      const keyBlock = document.querySelector(
        `.keyboard-column[data-key='${inputKey}']`
      );

      block.style.color = "white";

      if (input === answerChar) {
        hit += 1;
        block.style.background = "#6AAA64";
        keyBlock.style.background = "#6AAA64";
        block.classList.add("correct-animation");
        keyBlock.classList.add("correct-animation");
      } else if (answerWord.includes(input)) {
        block.style.background = "#C9B458";
        keyBlock.style.background = "#C9B458";
        block.classList.add("partial-animation");
        keyBlock.classList.add("partial-animation");
      } else {
        block.style.background = "#787C7E";
        keyBlock.style.background = "#787C7E";
        block.classList.add("wrong-animation");
        keyBlock.classList.add("wrong-animation");
      }
    }

    if (hit === 5) {
      gameOver();
    } else {
      nextLine();
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const targetBlock = document.querySelector(
        `.board-column[data-index='${attempt}${index - 1}']`
      );
      targetBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempt}${index}']`
    );

    if (index === 5 && keyCode !== 13) return;

    switch (true) {
      case keyCode === 13:
        handleEnter();
        break;
      case 65 <= keyCode && keyCode <= 90:
        thisBlock.innerText = key;
        index += 1;
        break;
      case keyCode === 8:
        handleBackspace();
        break;
    }
  };

  window.addEventListener("keydown", handleKeydown);
}

function updateClock() {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  let currentDate = new Date().toLocaleString("ko-KR", options);
  const clockDisplay = document.getElementById("date");
  clockDisplay.textContent = currentDate;
}

appStart();
