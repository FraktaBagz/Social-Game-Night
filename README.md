# Social Game Night - Apples to Oranges
In a world where social distancing is the new norm, meeting up with friends and family has never been more challenging than now. With this app, you will be able to play a fun online game with those close to you! This game is a variant of the popular Apples to Apples game where players choose cards and a judge picks a winner! This game is perfect for children and family nights. You can play online, create custom cards, and even use the online chat to talk and show your moves!

<img src="https://media.giphy.com/media/HeL7G9fWrAwBAd2TEU/giphy.gif">

## Technologies Used
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Material UI](https://img.shields.io/badge/-MaterialUI-%230170FE?style=for-the-badge&logo=Material-UI&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Table of Contents
- [Description](#description)
- [Installation](#start)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

<a name='description'></a>
## Description
This project was a commission for a client in the context of a software engineering bootcamp where the client requested an online game app that would have specific features, including multiplayer support, an online chat, customizable card decks, user authentication, and more.

Firebase Authentication was used to set up a log in page with support for account authentication and anonymous log in. Cloud Firestore, a database management system, was used to log user information and previously saved decks so users could use decks in future games.

Using standard TCP HTTP requests, creating a gameplay environment where users were in a stream of communication with a server without negotiation protocol was not only impossible, but necessary. WebSockets were the solution to this problem. Gameplay, game state, and chat all relied on maintaining an active connection, so Socket.IO was chosen for its low-latency, bi-directional and event-based communication system. Socket.IO uses the WebSocket protocol, which is ideal for real-time communication. In our game, when users interact with the UI in ways that must be coordinated across all other users, React components will update a "game state" object. Any local changes to this object will be sent to the server, which will promptly send those changes to all other clients' "game state" objects, thereby coordinating all clients and enabling smooth turn-based gameplay.

The user interface was built using a combination of Bootstrap and Material UI to deliver an intuitive and seamless experience for all the players. A color theme was used to standardize the appearance of all pages. Bright colors were selected to bring life and energy and the style we aimed for as a team was something playful yet mature.

<img src="https://media.giphy.com/media/7tG8yA1OWdPJmy5QHE/giphy.gif">

<img src="https://media.giphy.com/media/qK7oSFXPWiHeZn1sZi/giphy.gif">

<a name='start'></a>
## Installation
1. Install dependencies: `npm install`
2. Set Firebase configurations in `client/src/firebase` and `server/firebase` as `firebase.js`
3. Start webpack: `npm start`
4. Start server: `npm run server`

<a name='usage'></a>
## Usage
This app represents a negotiation between a product manager and client. It would be useful as a proposal for an interested game developer looking for additional games to add to their website. Apart from the business side, the game can be hosted on a local server and played among friends or deployed in the cloud for online use.

<a name='acknowledgments'></a>
## Acknowledgments
Product Manager: Raymond Yee.
Tech Stack Manager: Kieran Yun.
Database/Authentication Engineer: James Oh, Thinh Ngo Phan.
Game Design: Nathaniel Belen.
UI Lead: Matthew Luu.
UI Engineer: Kimberly Siu, Joel Hench.

Special thank you to each and every team member for the late nights of work and hours of debugging! We couldnt have done it without the hard work and late nights each person put in!

<img src="https://media.giphy.com/media/TsSsvltzQPqvceDu35/giphy.gif">

<a name='contact'></a>
## Contact
Raymond Yee | https://www.linkedin.com/in/raymond-haesik-yee/ | haesik.yee@gmail.com

Kieran Yun | https://www.linkedin.com/in/kieranyun/ | kieran.yun@gmail.com

James Oh | https://www.linkedin.com/in/james-oh-/

Thinh Ngo Phan | https://www.linkedin.com/in/ngophanthinh/ | ngophanthinh@gmail.com

Nathaniel Belen | https://www.linkedin.com/in/nathanielbelen/

Matthew Luu | https://www.linkedin.com/in/mattmluu/

Kimberly Siu | https://www.linkedin.com/in/kimberlysiu/ | kimberlysiu1@gmail.com

Joel Hench | https://www.linkedin.com/in/joel-hench/ | joelhench@gmail.com

