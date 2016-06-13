const ipc = require('electron').ipcRenderer;
const table = document.getElementById("my_table");
const addFolderBtn = document.getElementById('add_folder');
addFolderBtn.addEventListener('click', function (event) {
    ipc.send('open-file-dialog');
});
ipc.on('selected-directory', function (event, path) {
// var row = table.insertRow(1);
// var cell1 = row.insertCell(0);
// var cell2 = row.insertCell(1);
// cell1.innerHTML = ${path};
    document.getElementById('my_table').insertRow(1).insertCell(0).innerHTML = `You selected:${path}`;
});