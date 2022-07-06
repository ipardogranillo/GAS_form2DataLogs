# GAS_form2DataLogs
Google Apps Script project to log data (including possible transformations and metadata) from a Google Form response submission, logging into Google Sheets and Google Chat (optional and only available if using a Google Workspace account to enable webhooks). Rather than a full solution, this repository aims at being a template for further customization for any developer's specific use cases.
## GAS project creation
This repository consists of a compendium of several Google Apps Script (GAS) projects; most of them, embedded within Google Forms or Google Sheets. GAS is a framework that enables you to seamlessly call Google Workspace services (Sheets, Docs, Gmail, etc.) using JavaScript language. In order to make use of each of the contents of this repository, you should accodingly create the GAS project in the Form or Spreadsheet you want to embed it in.
### creating an embedded project
If you haven't, create a Google Form that will gather the respondents' data you wish to process and log. In editor mode, go to the Form options (three vertical dots on the top right corner) and click on *Script editor*. This will open Google Apps Script IDE in your browser window and create an embedded project within the Form. This process make take a couple of minute; if it is taking to long, refresh the page.![image](https://user-images.githubusercontent.com/89820099/177450072-dae902c3-d6e1-4438-8776-97734a27f0ea.png)You can then copy-paste this repository content inside the project's files. However, this can be tedious and error-prone, so  I'd suggest using clasp instead.
### using clasp
A brief introduction on what clasp is and how to install it is available [here](https://codelabs.developers.google.com/codelabs/clasp#0).  
You'll need to use `clasp login` in order to open a window in your browser and login with the account where you created the Spreadsheet, Form or general purpose Apps Script project you'll be working on. If needed, you should give permissions to clasp in your Google account. Then `clasp clone <project_id>` would make a local copy of all files you currently have in your GAS project; you can notice that GAS files have a .gs extension,while local files will have a .js extension. If the project is brand new, only .clasp.json and appscript.json should be added locally. You can obtain the project id from the created Google Apps Script project URL "https://script.google.com/u/0/home/projects/<project_id>/edit". This way you can use your favorite editor locally or GAS browser's IDE. Anyway, you can use `clasp pull` to update the local files from the GAS project, as well as `clasp push` to update the GAS project from your local files. More clasp commands are described in [clasp documentation](https://developers.google.com/apps-script/guides/clasp).  
By using clasp you can easily use your favorite editor/IDE and handle your Google Apps Script projects' deployments.
### editing your code
Within the codes comments several "TODO:" flags indicate where changes should be made in order to fully customize your deployment. As stated before, this repository is meant to be used as a template, rather than a fully fledged solution.
## configuring GAS project and global variables
Once you want to test or deploy your project, after you're done editing your code and have used `clasp push` to update the corresponding GAS project, but you still need to configure the final settings for all to work as expected.
### defining triggers
For the use case this repository is presented, the whole GAS project should be triggered whenever a form response is submitted. To accomplish this, you can use the GAS project browser's UI by clicking on the triggers option in the left side bar of the window an then adding a new trigger by clicking the button on the bottom right corner.![image](https://user-images.githubusercontent.com/89820099/177451173-b57e15be-0c07-4ce0-a7d9-57d1762acdce.png)Said trigger should run the onSubmit function from whichever deploy your wish to (by default, "Head"), and specifying the trigger to run from a Form whenever a form submission is made.  
  
![image](https://user-images.githubusercontent.com/89820099/177451601-01358385-e02a-4050-b204-aee67229f8bb.png)
### setting global variables
.env.js file (.env.gs in Apps Script IDE) is a special one, in the sense that should only be run once, whenever global variables change. Properties' Apps Script service allow for each to project to have its assortment of global variables, which can be particularly useful to maintain code or even several environments (*e.g.* define environmental end-points). In this file you should specify the Google Sheet id you wish to use as a destination (and Google Chat URL if enabled). After setting up your own project's global variables, you can run it from the UI button or using ctrl + R, making sure the function to run is `setEnvVars`![image](https://user-images.githubusercontent.com/89820099/177452674-28cb7157-df96-4142-8fe0-bbd7e467c219.png)
### final steps
#### form
After configuring you're GAS project, first make sure you're also done with the Google Form where this project is embedded in. Make sure it has all the questions you need to gather and process response's data.  
  
![image](https://user-images.githubusercontent.com/89820099/177453826-984bb301-4079-4ab5-89e3-5703e88db119.png)  
#### spreadsheet
Make sure you've also added the headers to your Spreadsheet destination; see comments in spreadsheet and form modules (ss.js and form.js, respectively), and remember to add the spreadsheet id as a global variable (in .env.js).  
  
![image](https://user-images.githubusercontent.com/89820099/177454232-d16f754b-e4c3-49da-8b62-9f54e4bbc529.png)  
#### chat
If you have a Google Workspace account that allows you to enable Google Chat webhooks, you can create a space where to monitor logs triggered by form submissions; see comments in chat's module (chat.js). To do so, create a Google chat space (choose threaded responses if you like), and click on the space's name in the upper left corner; then, select Manage webhooks and add a new webhook. The given webhook's URL should be set as a global variable (in .env.js).  
  
![image](https://user-images.githubusercontent.com/89820099/177456672-0170ab2b-0de5-47e6-9e34-7408ea7e5438.png) 

#### response processing
Aside from the possible Google Chat webhook for monitoring purposes, this is, in a very sincere way, a glorified response collector that —by default— is not very different from Google Forms' standard Spreadsheet destinations. However, you could also add metadata that depends upon processing the response itself and/or previous responses. For example, the original use case that eventually inspired the creation of this repository (again... to be used as a template), was to log the response's data in a given sheet, while generating several other records in another sheet per response, and adding metadata based on previous responses to each new record. If you wish to learn more about my use case or to find out if this template suits yours, feel free to [contact me](https://github.com/ipardogranillo) (email in github profile); suggestions and collaborations are also welcome.
#### testing
If everything's properly set up, you should be able to trigger a succesful execution when submitting a response in the form this project is embedded in. Make sure to check the execution logs accesible from the left side bar in GAS browser's IDE  
  
![image](https://user-images.githubusercontent.com/89820099/177457277-daf12c4d-77cd-41dd-a676-8aa4450f8a2a.png)  
Once you have at least a response in your form, you can simply run the `onSubmit` function from submissions/main.js (extension .gs in GAS's UI) in GAS UI, the same way you should have run `setEnvVars` from .env.js (.gs in GAS's UI); this will trigger the execution using the last form response. Doing so can help to validate certain test cases as well as being less troublesome than submitting a new form response each time.
## Contents
- submissions/
    - chat.js: class to handle Google Chat logging via webhook (available only for Google Wokspace accounts)
    - form.js: class to handle Google Form responses and immediate metadata
    - main.js: triggered `onSubmit` function whenever a form response is submitted, instantiates classes and takes global variables defined in .env.js
    - ss.js: class to handle Google Sheets and more complex transformations, as well as spreadsheet logging
- .env.js: needs to be run only once, whenever needed to set global variables (*v. gr.* spreadsheet id and chat's webhook URL)
