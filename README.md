<img src="https://i.ibb.co/nf4dLkk/unnamed-removebg-preview.png" data-canonical-src="![Appify banner](https://i.ibb.co/nf4dLkk/unnamed-removebg-preview.png)
" width="256" height="256" align="right" />

# APPIFY: A tool to turn your sites into apps.

Appify is a tiny tool for converting your websites into native desktop apps. It's built on the latest version of [electron.js](https://npmjs.com/package/electron), was designed to achieve the best trade-off among user interface and quality.

[![License](<https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg>)]([https://opensource.org/licenses/MPL-2.0](https://opensource.org/license/apache-2-0/))
[![Release](<https://img.shields.io/badge/Release-1.0.0-brightgreen.svg>)]([https://opensource.org/licenses/MPL-2.0](https://github.com/DinoscapeProgramming/Appify/releases/tag/v1.0.0))

:computer: [Our Website for Appify](https://DinoscapeProgramming.github.io/Appify/)

:movie_camera::  [Interactive Tutorial and Installation Guide](https://DinoscapeProgramming.github.io/Appify/tutorial)

:page_facing_up: [Latest Release 1.0.0 (Up to date)](https://github.com/DinoscapeProgramming/Appify/releases/tag/v1.0.0)

## 💬 Where to ask questions
Please use our dedicated channels for questions and discussion. Help is much more valuable if it's shared publicly, so that more people can benefit from it.

| Type                            | Platforms                               |
| ------------------------------- | --------------------------------------- |
| 🚨 **Bug Reports**              | [GitHub Issue Tracker]                  |
| ❔ **FAQ**                       | [Appify/Wiki](https://github.com/DinoscapeProgramming/Appify/wiki/FAQ)                              |
| 🎁 **Feature Requests & Ideas** | [GitHub Issue Tracker]                  |
| 👩‍💻 **Usage Questions**          | [Website]                       |

[github issue tracker]: https://github.com/DinoscapeProgramming/Appify/issues
[website]: https://DinoscapeProgramming.github.io/Appify/tutorial


## 🔗 Links and Resources
| Type                            | Links                               |
| ------------------------------- | --------------------------------------- |
| 💾 **Installation** | [Appify/README.md](https://github.com/DinoscapeProgramming/Appify/tree/dev#install-appify)|
| 👩🏾‍🏫 **Tutorials and Examples**  | [Appify/Wiki](https://github.com/DinoscapeProgramming/Appify/wiki/Notebooks-and-Tutorials) |
| 🚀 **Released Versions**         | [Appify/Wiki](https://github.com/DinoscapeProgramming/Appify/releases/)|
| 🤖 **Self-Hosting Appify** | [Appify/README.md](https://github.com/DinoscapeProgramming/Appify#self-hosting)|
| ✨ **How to contribute**       |[Appify/README.md](#contribution-guidelines)|

## Install Appify
### Manual Installation
- Visit [Our Latest Release Page](https://github.com/DinoscapeProgramming/Appify/releases/tag/v1.0.0)
- Download The Executable to Setup Appify
- Some browsers might actually warn you about downloading an `exe-File`, just click `download anyways`
- Run the File and Go through the Installer
- Windows defender will probably jump in too when you try to open the file, just go to `additional information` and click `open anyways`

### Programmatic Installation
```sh
wget -qO- "https://github.com/DinoscapeProgramming/Appify/releases/download/v1.0.0/Appify.Setup.1.0.0.exe" > "Appify.Setup.1.0.0.exe" && chmod +x "Appify.Setup.1.0.0.exe" && "./Appify.Setup.1.0.0.exe"
```

## Data Requirements
**If you're trying to build a native desktop app, then you need to follow some requirements**
| Type                          | Conditions                    |
| ----------------------------- | ----------------------------- |
| 🛜 **Website**                | Must be a valid [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL?retiredLocale=de) |
| 🪧 **Name**                   | Must follow the following [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) ➡️ _/^(?:(?:@(?:[a-zA-Z0-9-*~ ][a-zA-Z0-9-*._~ ]*)?\/[a-zA-Z0-9-._~ ])|[a-zA-Z0-9-~ ])[a-zA-Z0-9-._~ ]*$/_ |
| 📝 **Description**            | Must only include [ASCII-characters](https://developer.mozilla.org/en-US/docs/Glossary/ASCII?retiredLocale=de) |
| 🖼️ **Icon**                   | Must be an [ICO-file](https://en.wikipedia.org/wiki/ICO_(file_format)) and must be at least _256x256_ in image size |

## Self-Hosting
Make sure that you have [git](https://git-scm.com/) installed and then execute the following `bash script` in your terminal
```sh
git clone https://github.com/DinoscapeProgramming/Appify.git
cd "./Appify"
npm install
npm run build
start "./build/Appify Setup 1.0.0.exe"
```
