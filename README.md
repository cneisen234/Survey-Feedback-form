# Feedback Form

A feedback form where users can give their feedback and it gets logged into a database for later review. It includes a place for the users name, how they are feeling, their understanding, and how well they feel supported. The last page is for comments and also has a final "submit" button appear when comments are selected. All form information is required except for comments. The feedback form also includes an admininstrative page at the path of /admin that allows admins to view all submitted feedback, see the date it was submitted, and delete any that were submitted. You can also flag any for review and the review value gets changed from false to true and sent back to the database.

## Languages used

This app was built using the following coding languages and libraries 

-HTML
-CSS
-JavaScript
-React.js
-Node.JS
-Redux
-Material UI
-Sweet Alerts
-Moment.JS
-PG
-SQL
-Google Fonts
-Axios



#### Instructions

1. The introduction page will scroll in from the right side. From here you can push the "start" button to begin the survey

NOTE: All the other pages have the same animation as the start page.

![step1](./images/step1.png)

2. Once the next page loads you can enter your name. This is a required field. Once you enter your name click "submit name" to proceed to the next step 

![step2](./images/step2.png)

3. Here you will be greeted with a banner that says hello to whatever name was entered into the name field on the previous page. You'll be asked how you are feeling. Use the drop down menu to rate 1 to 5 and click "Submit Feedback" to submit your reponse and move onto the next page. This is a required field.

![step3](./images/step3.png)

4. If you pick a response between 4 through 5 you will get the message on the left, if your response is 1 through 3 you will get the response on the right. Here you are asked how well you understand. Click 1 through 5. This is a required field.

![step4](./images/step4.png)

5. Same as before, clicking 4 through 5 will give the response on the left. Clicking 1 through 3 will generate the response on the right. On this page you are asked how supported you feel. Rate 1 through 5. This is a required field.

![step5](./images/step5.png)

6. 4 through 5 will generate the response on the left, 1 through 3 will generate the response on the right. Here you can give feedback. Type your feedback in and click "submit feedback". This is not a required field.

![step6](./images/step6.png)

7. Once you click "submit feedback" a final "click to confirm" button will scroll up from the bottom and rest under the "submit feedback" button. Click "Click to Confirm" to submit your information.

![step7](./images/step7.png)

8. A pop up will appear. This is the summary page. You can review all of your submitted information and either click "ok" to confirm or "cancel" to cancel. Upon clicking okay you submit your information and be brought back to the start page again. Clicking cancel will also bring you back to the start page, but your information won't be saved.

![step8](./images/step8.png)

9. Finally there a secret admin page that can be accessed with the route "/admin". Type that into the address bar above and you'll see a table with all of the submitted survey information. Here you can see ther date the survey was submitted. You can flag any surveys for review. Flagging a survey for review will cause the flag icon to turn from white to black. This information is also sent to the database as a boolean value. You can also delete any surveys with the delete button.

![step9](./images/step9.png)