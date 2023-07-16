const delay = (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

let restart_delay = 1000;
let count = 0;

function increaseRestartDelayExp() {
  console.log(`Restart delay: ${(restart_delay * 2) / 1000}s,count:${count}`);
  restart_delay = restart_delay * 2;
}

function resetRestartDelay() {
  restart_delay = 1000;
}


function alwaysRejectPromise() {
  
  return new Promise((res, rej) => {
    if(count > 2){
      res();
    }else{
      count++;
      console.log("rejected");
      rej("some error");
    }
  });
}

async function callAfterDelay(cb, ms) {
  await delay(ms);
  try {
    await cb();
    resetRestartDelay();
    console.log("done!");
  } catch (err) {
    increaseRestartDelayExp();
    await callAfterDelay(cb, restart_delay);
  }
}

async function startThings() {
  resetRestartDelay();
  await callAfterDelay(alwaysRejectPromise, restart_delay);
}

console.log("started");
(async () => {
  await startThings();
})();
