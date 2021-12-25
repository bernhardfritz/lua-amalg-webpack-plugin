var worker = new Worker('a.out.js');
worker.onmessage = function (event) {
  if (event.data.channel === 'stdout') {
    console.log(event.data.line);
  } else {
    console.error(event.data.line);
  }
};
