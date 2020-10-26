
<div style="display:grid;  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
">
   <img src="https://img.icons8.com/bubbles/96/000000/react.png"/>
   <img src="https://img.icons8.com/officel/96/000000/mysql.png"/>
   <img src="https://img.icons8.com/color/96/000000/nodejs.png"/>
   <img src="https://img.icons8.com/color/96/000000/bootstrap.png"/>
   <img src="https://img.icons8.com/color/96/000000/sass-avatar.png"/>
</div>


<br><br>
 > Yes, it is a full-stack web application :wink: :checkered_flag: :computer:
<br><br>

# Lab-Management #

Lab Management is a web application made for Blekinge Institute of Technology to manage equipment lending and automate a lot of the staff's routine work.

---
<br>

## To be more specific, the web application supports the following features: ##

1. A login/register interface with support for hashed passwords.
2. User/Admin/nonUsers interface with some privileges to the admin. An example of the Admin’s privileges is:
    * Add items.
    * Delete items.
    * Modify items.
    * The ability to see a table of the users registered in the system.
    * Change the user’s roles (privileges).
    * Delete users.
    * Can see all the orders comming from the users.
    * Check up the returned items, refusing and accepting them.
    * Can see a table of the accepted returned items.

3. Show all items in the Lab.
4. Show specific items with detailed information. Additionally, showing the item's status. If the item is available and not on **My Items** page then the user can add it to **My Items** else If the item is out of the Lab then the user has the opportunity to reserve it. If the user already has the item inside **My Items** then he/she will see an icon to redirect him/her to **My Items** nav. Ultimately if the user is not logged in then he/she will be redirected to the login page and therefore they will not see the “My Items” page.
5. The ability to search for items.
6. On **My Items** page, the users have the opportunity to change their minds like removing saved items before borrowing them. They also can borrow a list of the chosen items. After borrowing the items then the Lab amount of those chosen items will be reduced.
7. Show categories and present the items inside every single category.
8. A message will automatically be sent to the users to inform them about the expiration lending date.
9. The user and the admin have the opportunity to see their profile.
10. The web app is completely responsive.
11. There is a page that shows you a table of your reserved items that aren't available in the Lab.

---
<br>

## Here are some essential prerequisites needed to make the application work locally: ##

1. First, you need MySQL installed with root user permissions.
Here is the page where you can download MySQL community server.
[MySQL](https://dev.mysql.com/downloads/)

2. Secondly, You also need Node.js installed. Here is the page where you can download node.js.
[Node.js](https://nodejs.org/en/download/)

### Instructions ###
#### Step 1 ####

    * Navigate to server/sql/lab and run the bash script by writing "./auto.bash" and hitting enter.
    * After hitting the enter button you will need to write your MySQL root password (the password you 
    gave when you you installed MySQL community Server).
    * Consequently, the bash-script will setup the database (lab) for you.


Example:

<p align="center">
    <img width="800px" src="https://github.com/bashikr/Lab-Management-2020/blob/main/examples/lab-management.svg">
</p>

### Used Commands: ###

Execute this command in the terminal:

```./auto.bash```

Log in to MySQL by writing your root password. Now you have logged in to MySQL and therefore can execute the following commands:

```use lab;```

```show tables;```

#### Step 2 ####

    * Go to the root of the server- and client-folders and run the command "npm install".
    * Then enter the /server folder and run the command "yarn dev". 
    * A window will automatically open in the web browser on the URL http://localhost:3000.

Example:

<p align="center">
    <img width="800px" src="https://github.com/bashikr/Lab-Management-2020/blob/main/examples/npm.svg">
</p>

#### Step 3 ####

    * After that, sign up on the web app and log in. You will automatically be registered as a normal user.
    * If you want to use the admin's privileges then you have to change the role of your account to (admin).
    * You can simply do it by doing the following:

Example:

<p align="center">
    <img width="800px" src="https://github.com/bashikr/Lab-Management-2020/blob/main/examples/change-user-role.svg">
</p>


### Used Commands: ###


Execute this command in the terminal:

```mysql -uuser -ppass```

Now you have logged in to MySQL and therefore you can execute the following commands:

1. ```use lab;```

2. ```show tables;```

3. ```select * from users;```

4.
```sql
CALL change_user_role("labmanagement2020@gmail.com", "admin");
```

5. ```select * from users;```

Now, you have changed the privileges of your mail account to (**admin**).


<br>

***

<br>


### Sending emails and notifications. ###

To successfully make the email sending feature work properly, you should do some slight modifications. Take a look at the following code.

```javascript
15.    let transporter = nodemailer.createTransport({
16.        host: "smtp.gmail.com",
17.        port: 587,
18.        secure: false, // true for 465, false for other ports
19.        auth: {
20.        user: "your email", // generated ethereal user
21.        pass: "your password", // generated ethereal password
22.        },
23.    });
```

    * To set up your messaging mail you have to navigate to the directory:
    - server/route/mailSender.js
    * At line 20, replace the phrase (your email) inside the quotation marks with your own email.
    * At line 21, replace the phrase (your password) inside the quotation marks with your email password.

**OBS!**
> You have to use a **@gmail** mail otherwise you will need to change the **host** server at line **16**.

> Additionally, you have to do some modifications to your Gmail account.


1. You have to activate IMAP access by navigating to the following link [IMAP](https://mail.google.com/mail/u/0/#settings/fwdandpop) after logging in to your google account.
   
When you scroll down you will see IMAP access is deactivated. Activate it, please.

2. Furthermore, you need to change the security properties for your google account by clicking on the following link [SECURITY](https://myaccount.google.com/u/3/security?gar=1) after logging in to your google account.

The easiest way to make sending emails possible is by scrolling down on the page and searching for (Less secure app access) and activating it. There are absolutely other security options like (Two Factor Authentication) if you want to add more security to the web application.

**IMPORTANT!**

In case if the message-sending feature didn't work then you have to activate **2-step verification** instead by following the link [2-step verification](https://myaccount.google.com/signinoptions/two-step-verification/enroll-welcome).

- If you choose to recieve a message to activate this feature, then please give only the digits from the recieved message i.e. without adding (G-).

- Now enter this link [Security](https://myaccount.google.com/security). Under (signing in to google ) click on (app passwords) and then select app (mail) select device (Windows Computer) and submit.

Here is a good demonstration of what you have to do:

<p align="center">
  <img src="https://github.com/bashikr/Lab-Management-2020/blob/main/examples/google-security.gif" width="800" />
</p>

As you have seen in the previous demonstration, copy the generated password and replace the phrase (your password) at line 21 with your new email password.

Feel free to use this web app, and you can reach me on bashar.altaleb92@gmail.com for more information.
