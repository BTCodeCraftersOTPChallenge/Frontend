BT Code Crafters OTP Challenge Frontend is an app where you generate an OTP and use it
 for different purposes (login for example).
You want to generate a visible OTP, that will remain active for the time shown (default
 is 30 seconds, if you want to change this value you need to change the values in both
 BE and FE). If you login with that OTP, that OTP will no longer work. Also, if the time
 runs out, the OTP will reset both visually and in the BE. So, if you use the OTP correctly,
 you will be able to login.

If you reload the page at any time, the timer will reset (so that is something that needs
 to be fixed). Also, you cannot login without generating an OTP and you cannot generate
 another OTP until the current one expires.

The project has a single page. If you insert a good OTP (in the time allocated), 
 the page will transform into another dummy page (to show the login working).

 Project developed in React.js. Package and Package-lock contain all the 
 components used (and other aspects). (With VisualStudioCode - npm start using Node.js)