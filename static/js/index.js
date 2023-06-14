let attempt = 0;
let index = 0;
// const answerWord = "apple";

function appStart() {
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

    const 응답 = await fetch("/answer");
    const answerWord = await 응답.json();

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempt}${i}']`
      );

      const input = block.innerText;
      const answer = answerWord[i];

      block.style.color = "white";

      if (input === answer) {
        hit += 1;
        block.style.background = "#6AAA64";
      } else if (answerWord.includes(input)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }
    }

    if (hit === 5) gameOver();
    else nextLine(attempt);
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

appStart();
