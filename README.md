# Mash Drive

Mash Drive is a mobile web app build with React Native and Expo as our final project on the Northcoders bootcamp. This app connects to a remote Firebase backend and allows users to share pictures of weird food combinations and interact.

# Setup

First of all, you will need to have a project set up on your Firebase account. You can go to Firebase and start one for free, where you will need to configure the usual settings and allow authentication via email, before setting up the necessary "collections" in Firestore, where all the data will be kept. You must create 3 collections with the following properties:

### comments

- post_id (String) e.g. "4R33HjYaMHYMXLVoEzib"
- text_body (String) "They say cats have nine lives. I’ve had 12 already and I don’t know how many more I’ll have."
- uid (string) e.g. "giew33WENF3w"
- username (String) e.g. "Gordon Ramsay"
- votes (Number) e.g. 0

### posts

- post_id (String) e.g. "4R33HjYaMHYMXLVoEzib"
- title (String) "Just a little afternoon pick-me-up"
- description (String) "this is a desc"
- uid (string) e.g. "giew33WENF3w"
- parent_post_id (String or null)
- image_url (String) e.g. "https://your-firebase-url/image-id"
- upvotes (Number) e.g. 0
- downvotes (Number) e.g. 0

### users

- username (String) e.g. "Gordon Ramsay"
- array_of_comment_ids (array)
- avatar_url (String) e.g. "https://your-firebase-url/image-id"
- reputation (Number) e.g. 0

Once you have forked and cloned this repo, you first need to install the necessary packages with:

```
$ npm i
```

And you must first configure and connect your Firebase account. Create a file called firebase.config.js in the route of your project and add the following:

```
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
apiKey: "your_key",
authDomain: "your_domain",
projectId: "your_project_id,
storageBucket: "your_project_bucket",
messagingSenderId: "your_message_id",
appId: "your_app_id",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage();
```

NOTE: You can find your firebaseConfig details in the settings of your firebase project.

Then in order for this app to run, you will need to install the Expo-CLI globally on your machine if you don't already have it:

```
$ npm i -g expo-cli
```

Install Expo:

```
$ expo i
```

You may also require Yarn to run the project:

```
$ npm i -g yarn
```

Lastly, install the required Expo dependencies:

```
$ expo doctor --fix-dependencies
```

And now all should be set up. You can start a development build using

```
$ npm start
```

Which should open localhost:19002 in your browser, where you can either open the project in web mode or install Expo Go on your Android or iOS device directly.
