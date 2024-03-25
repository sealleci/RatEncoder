const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
const Menu = electron.Menu;

function createWindow() {
    Menu.setApplicationMenu(null);

    mainWindow = new BrowserWindow({
        width: 854,
        height: 480,
        transparent: false,
        frame: true,
        resizable: false, //固定大小
        devTools: false,
        icon: './img/re.ico',
        // webPreferences: {
        //     nodeIntegration: true,
        //     contextIsolation: false
        // },
        // enableRemoteModule: true
    })

    const myURL = url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(myURL);
    // mainWindow.webContents.openDevTools({ mode: 'detach' });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

}

const PY_DIST_FOLDER = 'pythonDist';
const PY_FOLDER = 'py';
const PY_MODULE = 'server'; // without .py suffix

const guessPackaged = () => {
    const fullPath = path.join(__dirname, PY_DIST_FOLDER);
    return require('fs').existsSync(fullPath);
}

const getScriptPath = () => {
    if (!guessPackaged()) {
        return path.join(__dirname, PY_FOLDER, PY_MODULE + '.py');
    }
    if (process.platform === 'win32') {
        return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE + '.exe');
    }
    return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE);
}

if (!guessPackaged()) {
    console.log('take script');
    const { PythonShell } = require('python-shell');
    PythonShell.run(
        getScriptPath(), null,
        function(err, results) {
            if (err) {
                throw err;
            }
        }
    );
} else {
    console.log('take exe');
    const { spawn } = require('child_process');
    const ls = spawn(getScriptPath());
    ls.stdout.on('data', (data) => {
        console.log(`output: ${data.toString}`);
    });
    ls.stderr.on('data', (data) => {
        console.log(`error: ${data}`)
    });
    ls.on('close', (code) => {
        console.log(`exit: ${code}`)
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});

//electron-packager . ratEncode --platform=win32 --arch=x64 --icon=img/re.ico --electron-version=12.0.9 --overwrite --download.mirrorOptions=https://registry.npm.taobao.org/ --ignore=node_modules