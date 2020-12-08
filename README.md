# OMS Invoicer.v1

This app is a draft/demo version that presents my way to make living with invoices, orders and payments easier.
I would like to clearly inform you that you should not use this app for your company invoicing etc.
The main reason for that is I just wanted to create a fully functional application on frontend and I did not dive into backend security.
<br/>

OMS will provide solutions for:
<br/>

- managing customers information,
- track progress on current orders for a specific client,
- issue invoice from a draft for already finished orders,
- keep an eye on the payments for the overdue invoices

## Technology

I have made this app with:
<br/>

- React,
- Redux,
- Firebase,
- Netlify, Netlify Cloud Functions,
- testing made in Jest + React Testing Library,
- Styled Components for CSS in JS

### Running this app

To download code into your PC/MAC you have to clone repo by: git clone
<br/>

You have to set up firebase confing with your own firebase database to run it localy, otherwise app won't compile.
<br/>
To do that you have to create ".env" fille in the root of the project and put your firebase config data.

```
// fill X'es with your API keys etc.
REACT_APP_FIREBASE_API_KEY=XXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=XXXXXXXXXXXXX
REACT_APP_FIREBASE_DB_URL=XXXXXXXXXXXXX
REACT_APP_FIREBASE_PROJECT_ID=XXXXXXXXXXXXX
REACT_APP_FIREBASE_STORAGE_BUCKET=XXXXXXXXXXXXX
REACT_APP_FIREBASE_MESSAGING_SENNDER_ID=XXXXXXXXXXXXX
REACT_APP_FIREBASE_APP_ID=XXXXXXXXXXXXX
REACT_APP_FIREBASE_MEASUREMENT_ID=XXXXXXXXXXXXX
```

<br/>
After setting firebase up you can try the app localy on your maschine!
<br/>

For now, you can preview the app by using the command "yarn start" in your command prompt.
This will run the app in dev mode on [http://localhost:3000](http://localhost:3000) in your browser.
<br/>

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
<br/>

In upcoming weeks there live demo will be attached here.

### Testing

I am not a fan of testing every component of the app, so I will just focus on the most critical aspects of the application with my Jest testing.
<br/>

My tests won't check styles.
<br/>

Axios is tested with help of MTSW library instead of deep-level mocking Axios function itself.
<br/>

To run tests you have to type yarn test in your command prompt.

### Footer

Thank you for checking my work.
Please send me your feedback.
<br/>

More information about my person and current projects you can find on [my website](https://mateuszgruzla.pl)
