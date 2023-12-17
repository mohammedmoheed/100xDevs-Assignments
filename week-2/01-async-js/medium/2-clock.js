function printTime() {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  console.log(`${hour} : ${minute} : ${second}`);
}

function printTime12Hour() {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  if (hour < 12) {
    if (hour == 0) {
      hour = 12;
    }
    console.log(`${hour} : ${minute} : ${second} AM`);
  }

  console.log(`${hour} : ${minute} : ${second} PM`);
}
function clock() {
  setInterval(() => {
    printTime();
  }, 1000);
}
function clock12Hour() {
  setInterval(() => {
    printTime12Hour();
  }, 1000);
}
clock12Hour();
