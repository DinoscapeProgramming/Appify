const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const childProcess = require("child_process");
const { rimraf } = require("rimraf");

if (!fs.readdirSync(path.dirname(path.dirname(__dirname))).includes("apps")) {
  fs.mkdirSync(path.join(path.dirname(path.dirname(__dirname)), "apps"));
}

document.getElementById("appForm").addEventListener("submit", (event) => {
  event.preventDefault();
  let appId = crypto.randomBytes(4).toString("hex");
  let reset = (err) => {
    if (err) {
      new Notification("Error", {
        body: err,
        icon: "../assets/error.ico",
      });
    }
    rimraf(
      path.join(path.dirname(path.dirname(__dirname)), "apps/" + appId)
    ).then((success) => {
      if (!success) {
        new Notification("Error", {
          body:
            "Unable to delete folder '" +
            path.join(path.dirname(path.dirname(__dirname)), "apps/" + appId) +
            "'",
          icon: "../assets/error.ico",
        });
      }
      ["website", "name", "description", "icon"].forEach((element) => {
        event.target[element].value = "";
        event.target[element].disabled = false;
      });
      event.target["description"].style.resize = "vertical";
      document.getElementsByClassName("wrap-contact100-form-btn")[0].style.filter =
        "none";
      document.getElementsByClassName(
        "contact100-form-btn"
      )[0].disabled = false;
      document.getElementsByClassName(
        "contact100-form-btn"
      )[0].innerHTML = `<span
      >Create<i
        class="fa fa-long-arrow-right m-l-7"
        aria-hidden="true"
        style="margin-left: 7.5px;"
      ></i>
    </span>`;
    });
  };
  ["website", "name", "description", "icon"].forEach((element) => {
    event.target[element].disabled = true;
  });
  event.target["description"].style.resize = "none";
  document.getElementsByClassName("wrap-contact100-form-btn")[0].style.filter =
    "saturate(0.4)";
  document.getElementsByClassName("contact100-form-btn")[0].disabled = true;
  document.getElementsByClassName("contact100-form-btn")[0].innerHTML = `<span
  >Creating<i
    class="fa fa-spinner fa-spin"
    aria-hidden="true"
    style="margin-left: 7.5px;"
  ></i>
</span>`;
  fs.mkdir(
    path.join(path.dirname(path.dirname(__dirname)), "apps/" + appId),
    (err) => {
      if (err) return reset(err);
      fs.writeFile(
        path.join(
          path.dirname(path.dirname(__dirname)),
          "apps/" + appId + "/package.json"
        ),
        JSON.stringify({
          name: event.target["name"].value.toLowerCase().replaceAll(" ", "-"),
          productName: event.target["name"].value,
          version: "1.0.0",
          description: event.target["description"].value,
          main: "index.js",
          scripts: {
            build: "electron-builder",
          },
          keywords: [],
          author: "",
          license: "ISC",
          devDependencies: {
            ["electron"]: "^28.2.2",
            ["electron-builder"]: "^24.9.1",
          },
          build: {
            appId: event.target["name"].value
              .toLowerCase()
              .replaceAll(" ", "-"),
            productName: event.target["name"].value,
            target: "NSIS",
            directories: {
              output: "build",
            },
            icon: "favicon.ico",
            nsis: {
              installerIcon: "favicon.ico",
              installerHeaderIcon: "favicon.ico",
              deleteAppDataOnUninstall: true,
              allowToChangeInstallationDirectory: true,
              oneClick: false,
            },
          },
        }),
        "utf8",
        (err) => {
          if (err) return reset(err);
          fs.writeFile(
            path.join(
              path.dirname(path.dirname(__dirname)),
              "apps/" + appId + "/index.js"
            ),
            `const { app, BrowserWindow } = require('electron');
          const path = require('path');
          const fs = require('fs');
          
          const createWindow = () => {
            const window = new BrowserWindow({
              show: false,
              title: JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')).productName,
              icon: path.join(__dirname, 'favicon.ico'),
              autoHideMenuBar: true,
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
              }
            });
            window.maximize();
            window.show();
            window.loadURL(fs.readFileSync(path.join(__dirname, 'site.txt'), 'utf8'));
          };
          
          app.whenReady().then(() => {
            createWindow();
            app.on('activate', () => {
              if (BrowserWindow.getAllWindows().length === 0) createWindow();
            });
          });
          
          app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') app.quit();
          });`,
            "utf8",
            (err) => {
              if (err) return reset(err);
              fs.writeFile(
                path.join(
                  path.dirname(path.dirname(__dirname)),
                  "apps/" + appId + "/site.txt"
                ),
                event.target["website"].value,
                "utf8",
                (err) => {
                  if (err) return reset(err);
                  let fileReader = new FileReader();
                  fileReader.addEventListener("load", () => {
                    fs.writeFile(
                      path.join(
                        path.dirname(path.dirname(__dirname)),
                        "apps/" + appId + "/favicon.ico"
                      ),
                      Buffer.from(fileReader.result),
                      (err) => {
                        if (err) return reset(err);
                        childProcess.exec(
                          "npm install && npm run build",
                          {
                            cwd: path.join(
                              path.dirname(path.dirname(__dirname)),
                              "apps/" + appId
                            ),
                          },
                          (err) => {
                            if (err) return reset(err);
                            childProcess.execFile(
                              "./" +
                                JSON.parse(
                                  fs.readFileSync(
                                    path.join(
                                      path.dirname(path.dirname(__dirname)),
                                      "apps/" + appId + "/package.json"
                                    ),
                                    "utf8"
                                  )
                                ).build.directories.output +
                                "/" +
                                event.target["name"].value +
                                " Setup " +
                                JSON.parse(
                                  fs.readFileSync(
                                    path.join(
                                      path.dirname(path.dirname(__dirname)),
                                      "apps/" + appId + "/package.json"
                                    ),
                                    "utf8"
                                  )
                                ).version +
                                ".exe",
                              {
                                cwd: path.join(
                                  path.dirname(path.dirname(__dirname)),
                                  "apps/" + appId
                                ),
                              },
                              (err) => {
                                reset(err);
                              }
                            );
                          }
                        );
                      }
                    );
                  });
                  try {
                    fileReader.readAsArrayBuffer(event.target["icon"].files[0]);
                  } catch (err) {
                    return reset(err);
                  }
                }
              );
            }
          );
        }
      );
    }
  );
});