HOW TO MAKE NEW APPS
1. clone example folder and rename it to your apps name, eg. "tesla"
2. rename ExampleCtrl to TeslaCtrl 
3. open /vitensenteret/www/js/routes.js and copy the index.example element and replace "example" with "tesla" everywhere
4. Do the same in all files. Create custom view names, states, urls, controllers, titles, templates etc...
5. open /vitensenteret/www/js/app.js and add your app to the list of apps, like 'app.tesla',
6. add your app in /templates/tabsController.html
6. delete this (readme) file from your folder
