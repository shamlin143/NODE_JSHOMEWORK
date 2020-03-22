const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
const options = { format: "letter" };

let queryURL = "";
let backgroundHex = "";
let secondaryHex = "";
let textColor = "";
let avatarURL = "";
let gitName = "";
let gitLocation = "";
let gitBlog = "";
let gitBio = "";
let gitRepositories, gitFollowers, gitStars, gitUsersFollowing;

inquirer
   .prompt([
      {
         type: "list",
         message: "What is your favorite color?",
         choices: ["Purple", "Blue", "Green", "Yellow", "Orange", "Red", "Pink"],
         name: "background"
      },
      {
         type: "input",
         message: "What is your GitHub username?",
         name: "username"
      }
   ])
   .then(function(response) {
      let backgroundColor = response.background;
      let gitHubUsername = response.username;
      queryURL = "https://api.github.com/users/" + gitHubUsername;
      
      switch (backgroundColor) {
         case "Purple":
            backgroundHex = "#9933ff";
            secondaryHex = "#92e534";
            textColor = "#000000";
            break;
         case "Blue":
            backgroundHex = "#0099ff";
            secondaryHex = "#e57a34";
            textColor = "#A9A9A9";
            break;
         case "Green":
            backgroundHex = "#00cc66";
            secondaryHex = "#9933ff";
            textColor = "#808080";
            break;
         case "Yellow":
            backgroundHex = "#ffff66";
            secondaryHex = "#344ce5";
            textColor = "#7CFC00";
            break;
         case "Orange":
            backgroundHex = "#ff9933";
            secondaryHex = "#0099ff";
            textColor = "#483D8B";
            break;
        case "pink":
            backgroundHex = "#FF69B4";
            secondaryHex = "#FF00FF";
            textColor = "#FFFAF0";
            break;  
         default:
            backgroundHex = "#ff0066";
            secondaryHex = "#34e596";
            textColor = "#9932CC";
      }

      axios.get(queryURL).then(function(info) {
         let gitHub = info.data;

         avatarURL = gitHub.avatar_url;
         gitName = gitHub.name;
         gitLocation = gitHub.location;
         gitBlog = gitHub.blog;
         gitBio = gitHub.bio;
         gitRepositories = gitHub.public_repos;
         gitFollowers = gitHub.followers;
         gitUsersFollowing = gitHub.following;

         const theHTML = `<!DOCTYPE html>
      <html lang="en">
         <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      
            <link
               href="https://fonts.googleapis.com/css?family=Bitter&display=swap"
               rel="stylesheet"
            />
            <link rel="stylesheet" href="./template.css" />
      
            <style>
               * {
                  font-family: "Bitter", serif;
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
               }
      
               html,
               body {
                  background-color: #cdcdcd;
                  width: 612px;
                  height: 792px;
               }
      
               .secondary-background {
                  position: relative;
                  width: 100%;
                  background-color: ${secondaryHex};
                  height: 325px;
               }
      
               .main-container {
                  position: absolute;
                  top: 45px;
                  left: 50px;
               }
      
               .orange-container {
                  position: relative;
                  margin: 0 auto;
                  width: 500px;
                  height: 325px;
                  background-color: ${backgroundHex};
                  color: ${textColor};
                  border-radius: 5px;
               }
      
               img {
                  position: absolute;
                  top: -10%;
                  margin-left: auto;
                  margin-right: auto;
                  left: 0;
                  right: 0;
                  height: 200px;
                  width: 200px;
                  border: 5px solid yellow;
                  box-shadow: 20px 10px 50px -5px;
                  border-radius: 50%;
               }
      
               .main-info {
                  position: absolute;
                  top: 175px;
                  width: 100%;
                  text-align: center;
               }
      
               .bio {
                  display: block;
                  text-align: center;
                  width: 500px;
                  font-size: 1.25rem;
                  color: white;
                  padding: 25px 50px;
               }
      
               .blocks {
                  display: inline-flexbox;
                  margin-left: auto;
                  margin-right: auto;
                  width: 500px;
               }
      
               .data-grid {
                  background-color: ${backgroundHex};
                  display: inline-block;
                  width: 225px;
                  float: left;
                  color:  ${textColor};
                  margin: 0 12px 25px 12px;
                  padding: 14px 8px;
                  height: 125px;
                  text-align: center;
                  border-radius: 5px;
               }
      
               .data-grid-header {
                  font-size: 1.5rem;
                  line-height: 1.7rem;
                  margin-bottom: 0.5rem;
               }
      
               .data-grid-stat {
                  font-size: 1.25rem;
                  line-height: 1.7rem;
                  margin-bottom: 0.5rem;
               }
            </style>
      
            <title>Github Profile</title>
         </head>
         <body>
            <div class="secondary-background"></div>
            <div class="main-container">
               <div class="orange-container">
                  <img src="${avatarURL}" alt="" />
                  <div class="main-info">
                     <h1>Hi!</h1>
                     <h2>My name is ${gitName}!</h2>
                     <div class="links">
                        <div><i></i>${gitLocation} <i> </i> Github <i> </i><a href="${gitBlog}"> Blog</a></div>
                     </div>
                  </div>
               </div>
               <div class="bio">${gitBio}</div>
               <div class="blocks">
                  <div class="data-grid">
                     <div class="data-grid-header">Public Repositories</div>
                     <div class="data-grid-stat">${gitRepositories}</div>
                  </div>
                  <div class="data-grid">
                     <div class="data-grid-header">Followers</div>
                     <div class="data-grid-stat">${gitFollowers}</div>
                  </div>
                  <div class="data-grid">
                     <div class="data-grid-header">GitHub Stars</div>
                     <div class="data-grid-stat">2</div>
                  </div>
                  <div class="data-grid">
                     <div class="data-grid-header">Following</div>
                     <div class="data-grid-stat">${gitUsersFollowing}</div>
                  </div>
               </div>
               <div>
               <footer> WORKS BUT I HAD HELP FROM MY BROTHER AND TUTOR.STILL NOT COMFORTABLE WITH NODE.JS </footer>
            </div>
               </div>
         </body>
         </html>`;
            
      

         pdf.create(theHTML, options).toFile(
            `./${gitHubUsername}.pdf`,
            function(err, res) {
               if (err) return console.log(err);
               console.log(res);
            }
         );
      });
   });
