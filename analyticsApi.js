function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 500,
      });
    }, 200);
  });
}

async function sentLogs(event) {
  let toTackle = false;
  try {
    const res = await getData(event);
    if (res.status === 200) {
      toTackle = true;
    } else {
      toTackle = false;
    }
  } catch (e) {
    toTackle = false;
  }
  return { toTackle, event: [...event] };
}

function sentAnalytics() {
  const logs = [];
  const logsToFlushAtOnce = 3;

  const flush = async (logsToConsider) => {
    if (!logsToConsider.length) return;
    const response = await sentLogs(logsToConsider);
    if (response.toTackle) {
      console.log("Success", logsToConsider);
    } else {
      logs.push(...logsToConsider);
      console.log("Errored", logs);
    }
  };

  setInterval(() => {
    flush(logs.splice(0, 10));
  }, 3000);

  const send = (event) => {
    if (event) logs.push(event);
    while (logs.length >= logsToFlushAtOnce) {
      flush(logs.splice(0, logsToFlushAtOnce));
    }
  };

  return { send };
}

const { send } = sentAnalytics();
send(1);
send(2);
send(3);
send(4);
send(5);
