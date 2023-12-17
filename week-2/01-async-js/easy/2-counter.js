function counter(count = 0) {
  setTimeout(() => {
    count++;
    console.log(count);
    counter(count);
  }, 1000);
}
counter();
