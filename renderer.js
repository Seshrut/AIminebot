const { ipcRenderer } = require('electron');

var div = document.getElementById('console');

const btnbutton = document.getElementById('btn');


btnbutton.addEventListener('click', () => {
  let api = document.getElementById('api').value;
  let botname = document.getElementById('name').value;
  let botip = document.getElementById('ip').value;
  let botport = document.getElementById('port').value;
  let botpassword = document.getElementById('password').value;

  let mystring;
  if (botpassword === '') { mystring = `node bot.js ${api} ${botip} ${botport} ${botname}`; }
  else { mystring = `start cmd.exe /k node bot.js ${api} ${botip} ${botport} ${botname} ${botpassword}`; }
  console.log(mystring);
  ipcRenderer.send('args', mystring);
});

ipcRenderer.on('cOut', (evt, msg) => {
  console.log(msg['out']);
  var theDiv = document.getElementById("console");
  var content = document.createTextNode(msg['out']);
  theDiv.appendChild(content);
});


