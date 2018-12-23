# Integrated Git Profile
[![GitHub release](https://img.shields.io/github/release/ParkSB/integrated-git-profile.svg)](https://github.com/ParkSB/integrated-git-profile/releases)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE.md) [![Greenkeeper badge](https://badges.greenkeeper.io/ParkSB/integrated-git-profile.svg)](https://greenkeeper.io/)

Integrated Git Profile is a web project for the developers who use both GitHub and GitLab. It shows the profiles of GitHub and GitLab on a page.

## Live at: [Here](https://parksb.github.io/project/integrated-git-profile/)
![preview](https://i.imgur.com/ZQv1zx4.png)

## Getting Started

### Usage
Visit [here](https://parksb.github.io/project/integrated-git-profile/) to use Integrated Git Profile. Also, you can download the [realsed file](https://github.com/ParkSB/integrated-git-profile/releases) and run them on your server.

### Development

**1. Clone the repository**

Fork this repository and clone to your local storage using `git clone`.

**2. Install dependencies**
```bash
npm install
```

**3. Build**
```bash
npm run build
```
This command creates `dist` folder that contain the minified bundle code and the files in `public` folder. 

**4. Run watcher**
```bash
npm run watch
```
If you edit the javascript codes, watcher will build the codes automatically. You don't need to use `npm run build` or run webpack. 

**5. Run local server**
```bash
npm run server
```
The local server will be opened at `http://localhost:9000`.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details