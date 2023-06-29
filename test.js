const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

let currentDate = new Date().toLocaleString("ko-KR", options);
console.log(currentDate); // 2023년 6월 29일 오후 2:39

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
  const clockDisplay = document.getElementById("시간");
  clockDisplay.textContent = currentDate;
}

setInterval(updateClock, 1000);
