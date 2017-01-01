#BMTC App
BMTC App provides offline access to route information thereby giving a great User Experience to passengers traveling on local buses across Bangalore, with no install required. It is reliable, fast, engaging and is extremely useful in regions where networks are slow, expensive or poorly available.

This repository is created to open source the code and make it available for further development. It has (almost) no dependencies and one can start by cloning this repository.


##1. Setup
You can setup this project in your local machine by cloing this repository or downloading the zip file.


##2. Installation
* Install Chrome 52 or above (Check for latest Chrome version in browser settings)
* Download [Chrome Web Server](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb). Alternatively, you can use a Web Server of your choice.
* Download [Atom](https://atom.io/) or [Notepad++](https://notepad-plus-plus.org/) or any other Text Editor of your choice
* Download and Install [Chrome Canary](https://www.google.com/chrome/browser/canary.html) - designed for Developers


##3. Getting Started and Running Locally
####Once you've cloned the repository, enter into bmtc-app directory:
```sh
$cd bmtc-app
```

####Run Web Server:
* Choose the folder from where the app needs to be loaded:
<p align="center"><img src="https://lh3.googleusercontent.com/Yeb1EZpqfyp7U8eWuwDkjvHH1c-J-Tj7nhigzX1_uJGQI6Qa_koXX88jcgnfNc-MIh2opaS8miijXnw0Lb9oticXX_qOqMTBI26m0eDUJj1e__XUQLP2goEQo1TE3WifQXC9BAq6ra99949CT1WPsGuVT1OnnJIbiBTRtwHDrsXRlI1dvmHpri_klWX6GZ4ziSAfzAnuv4Lrg2SBFfmbx_lpYWXaWaJzB0gwoL7PYo256TXr4K-hfC_NUewkoJmNGTEK-1QJFhAxkq_DMPlAtu65nIJl-6_6z0SkiN9w0FIGRDvYQRSgoyHQWeSTXi5zZWRaDHYVHnNWZPey5nT6fuJ7YoLUmQzdCwi0DaS4M--bqtEzoE9Lt9Z3KXv5aXhCBN6Y1th1Oy-kqWmpFLvos37gF3o2Zns6uuQH5Bj2bpfPr_UUTkPBWlx98mDUUqt405KgTsrHDBrDoqhUUkolw2utGdqxvlPKpBcNl1wfb9JezSKSw9MrjKdowdO1OUzlrv_0a_ZiID2epszZtlpjjJ4Z8E4KzlzacID4DFMEVp6ShcJLyYN406VP_JJKJD1iWo4lTh4vO--FZpzqqW82Cpl9AWTo7Rx4MA624jQ0JWE1Bxddzw=w810-h1388-no" alt="Web Server" align="center" height="50%" width="50%"></p>
* Check the checkbox "Automatically show index.html" to load index.html page as soon as our app loads:
<p align="center"><img src="https://lh3.googleusercontent.com/sW57aiLfxog7SUlTEyr1CwOVmMAUxzXxRfr_kAqNK65lfSZbuT5ygZRTD-7Z18l2ZL-cSdZ3PStGtzAgGcjus0SZoHFzDk3CGUTKYzavZS_KrvYCCwXhLnG2Wh3MjkmKdfEcN0SC49cB5sm2GBr2mT4-enIzJzmIFzGWTf2aGT6_s7V482i_nl5Uf-F8evIVzL77lNAI7LcT7tkzNn2Md4ZI_T6MAwQeDl9Su1v9amZAer6LjJhqJX7qcsX87Nc7FKfLOEhXYNcN47AGQcfoeKVLjGTvjkpjkIqPJfMB4PLMkMLZidAjXrwG2qWJ45KylQ6VnceXx_-NGOx1ANXAt5OjURZh7ZJVhuFPtRfuwAKvM6VEM52X-H8ZwLxwQjcSz6qBHxyxqKyOoRUreslyyeBjYwVArFi8lzFgeQxPARJe_U4wIH2d2UX6X0RLcWK66no1i7KDz1xKM4H75tKYdfuvrJPjOXd-Sj__xfqqWzCFswoQEy39whRDg9qKTqxhuBNriurGrrUPegm6Sm8aamEFN8AkkHnwUonDIxr1XrAHppLKGTfS2mZSb6M4vvnP6BmcOOgxp3cbSztqIcKCeuCCJXkQYGihbPTyr9lyAQP6Crq3WQ=w812-h1390-no" alt="Web Server" align="center" height="50%" width="50%"></p>
* Our application will be served on one of the ports on Web Server. You can choose any port on Web Server. We're running our app on Port No: 8888:
<p align="center"><img src="https://lh3.googleusercontent.com/FFHpMJZXeOThXl5GLDntp-TkngUkJSAxgTequQ45-S5BP9A27TZb2Oj7Z8fdvwZV98tIkc1sRg1f3kDrRLXjjYPEWkoJ2GHTYzmOFz8fJySHshxFDt3wLX0K_EbVg4wmwtMLAx--NNr4SIJlV0agGczneRoIwHIQ9TWcgDl6qPFHxXtTTaR-6ul3T-KHWU5aeW17g_SbimVZEzdFWwAu7J5BQD-JDkgmyrgaOgo2EgQ7PJVRQLgbki8DOAQTZnPgFt5lOJYL0Cu3rLAKFlbOJpxXgQqfkbzRc4zWJQJMEbtuqA7X3gWZyh8dOrklfS4ItCaeEqLyfBqoq0F4OU5QeaKNO_Rs7NxdR8Gp6-hH5NyjFS0LPkEXFolh5ah9Es_5aBVslNBYbDKcTKRyiWYTE0ywzHcPYRe_4HxH2dm3glOix2kfQUZZalkjghrzJ7Ekcsqw1mW3UtLczrrYKP1ATJsBG-o7-SWuYa9xXtrALCPFG38e9ZS-xRc5eu3cPuo0QPsH6Sp9Ezh8ECZ8BeRL96SCnaBseDlxfINFKoEMwTXjBpgzbjTQbO8kl_VaiUU99d9GDNM81JBBJjlFVWUOB1sAaMCmdrrggSujXWhrn1QjMzLY4g=w808-h1390-no" alt="Web Server" align="center" height="50%" width="50%"></p>

* To run your app, start the Web Server by clicking on the Toggle button. You'll see your app will run at Web Server URL: [http://127.0.0.1:8888](http://127.0.0.1:8888)
<p align="center"><img src="https://lh3.googleusercontent.com/zhT6D2ttdQvehERNI0-Z83S-wObkM9BdycE8Za-ZhYAMr2EUWD7CtbCZDVQzh74fKeCCdr0VmvgswS9QfpexUxRC1uTFwxuRMD-Nby4_mMNCMs_z1IrbREKY6cq07XkHM84uvp3_gIjnsThCbl0cyc-PaXmtPmKEeaBcCXbO60nwW1s6M1D5-uVOMau-BtrJEyMVJfO241QpkI8uvKt5vgg-xLuOCaou6pHHad2973gJ9FqyFPIaQ6IOnB-eNt9seUmgrlyjAAOs4RENE9qjd2t3lWhNVClFaw_AJqQvUpUhsiUeVK9xwKcwzQigzsrRa8HZyh_lhPm93NvrMO96iDnNDeDoz1cE4nlHgfeoeihyfzm308NKpJFxPrbKAJfVczOxusvG6oqCJfNAMv_GN-T10mkrDe-GQ1893qwDo0swHIr4W6ofxZJWK5wqCmsRzeJ_kiBl7SS6W-G-GgJsHYYEbhTU_7nKQcTM6LGgGQbA8HQBlGo1A9lB3wM3AM-mFaQAzRuCFzZBmhFiUVrmcMZkPrsJwZeKkDxPn7jE0S41XupjvUCpNGCrPavJZS2N36L9auDe8NpU4cwZoOdfB12nDU4cfLJtYdAqFRp-Gj3KusbLHw=w808-h1388-no" alt="Web Server" align="center" height="50%" width="50%"></p>

Alternatively, you can run Web Server locally from the terminal for the current directory by installing [node.js](https://nodejs.org/en/) and running:
```sh
$npm install
$npm start
```
Then visit your application in Chrome browser (http://localhost:8080) if you are running Web Server from the terminal.

That's it! Your app is up and running.


##4. What this app does?
* Provide access to route information
* Loads the already searched routes offline
* Fetch nearest Bus Stop based on user's location
* Lists time duration a bus takes to go from source to destination
* Lists all the bus stops on a bus route selected by user, from source to desintation


##5. Development and Contribution
Want to contribute? Great! You can do this by:
* Filing issues
* Contributing Code
* Contributing Feature

Please contact the author for more information on contributing to bmtc-app.


##6. License
MIT Licensed


##7. Author
Anuj Duggal ([LinkedIn](https://in.linkedin.com/in/anujduggal21) | [Twitter](https://twitter.com/AnujDuggal21) | [Facebook](https://www.facebook.com/AnujDuggal88))
