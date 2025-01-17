function retry(fn, retryDelay, timeOfTimes) {
  return (...args) => {
    const attempts = (attemptsLeft) =>
      new Promise((resolves, rejects) => {
        try {
          const result = fn(...args);
          console.log(
            "successful after ",
            timeOfTimes - attemptsLeft + 1,
            " attempts iteself"
          );
          resolves(result);
        } catch (e) {
          if (attemptsLeft <= 0) {
            rejects(`this failed even after ${timeOfTimes} attempts`);
          } else {
            console.log("retrying");
            setTimeout(() => {
              return attempts(attemptsLeft - 1);
            }, retryDelay);
          }
        }
      });
    return attempts(timeOfTimes);
  };
}
