# Kevin HomeLike
A demo chat application using ReactJS, ExpressJS, SocketIO and MongoDB.

### Getting Started
* Clone the repo
* Run mongoDB
* Setup the port and mongodb uri in `server/config/config.js`
* npm install
* npm run webpack
* node bin/www
*  For testing
	*  Signup up to 3 users.
	*  Create some rooms.


### Features
* **Authentication** - using passport.js
	* Signup user
	* Signin user
	* Signout user


* **Users**
	* User Profile
		* Able to open the user profile by clicking the icon on the selected user in users list.
	* Real-time update to all users list if there's a new signup user.


* **Private Messaging**
	* Notification indicator if receives a new message but the user is in a different PM box.


* **Group Messaging**
	* Able to edit the participants.
	* User does not involve in the group message cannot access the room. Will give a warning message.
	* Real time update to all users for the newly created rooms.
	* Notification indicator if a room has a new message but the user is in a different room.
	* Only rooms that the user is a participant will appear on the list.