function circuitBreaker(originFunc, thresholdFailureAttempts, coolingPeriod) {
  let isOpen = false;
  let failureAttempts = 0;
  let lastFailureAttemptTime = 0;

  /** run the function */
  return (...args) => {
    /** check if circuit is open */
    if (Date.now() - lastFailureAttemptTime > coolingPeriod) {
      isOpen = false;
      failureAttempts = 0;
    } else {
      if (isOpen) {
        throw new Error("Service not available");
      }
    }
    try {
      originFunc(...args);
      failureAttempts = 0;
    } catch (e) {
      failureAttempts++;
      lastFailureAttemptTime = Date.now();
      if (failureAttempts === thresholdFailureAttempts) {
        isOpen = true;
      }
      throw e;
    }
  };
}
