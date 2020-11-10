# Stanley Black and Decker Exam

**A Node.js app using [Express 4](http://expressjs.com/) created according to the specifications in the SBD-Exam.txt file in this project**

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

### 1. Unzip sbd-exam to your desired directory

### 2. Go into the sbc-exam directory and install dependencies
```cd <desired directory path>```
```npm install ```

### 3. Unit Test the application
```npm test```
The test script will run the tests and produce a report of test coverage

### 4. Run the application
```npm start```
You should see the following log message: ```[2020-11-10T21:04:58.355Z]  INFO: sbd-exam/3100 on OCM-L-4331731: Server listening at localhost:1337```

#### Endpoints
```GET /status```: This returns the status of the running application
```GET /reverse-mac```: This takes an array of mac addresses and reverses each address

#### Testing via Postman
1. Setting the Authorization Header
    - In Postman, create a new get request with the following url: ```http://localhost:1337/reverse-mac``` (or the url from the above log message)
    - Select the **Auth** tab and select the Bearer Token type
    - In the a JavaScript runtime or Chrome Developer Tools console, run the ```Date.now()``` command
    - Copy the resulting number and paste it twice in the token field
2. Setting the request body
    - Select the **Body** tab and then select **raw** in the dropdown
    - Select **JSON** in the second dropdown and paste the following JSON:
    ```json
    {
        "macs": [
            "00:A0:C9:14:C8:29",
            "00-A0-C9-14-C8-29",
            "00A0C914C829",
            "00A0C914C82*",
            123
        ]
    }
    ```
3. Send the request
    - The resulting object should look like this:
    ```json
    {
        "reversed-macs": [
            "29:C8:14:C9:A0:00",
            "29-C8-14-C9-A0-00",
            "29C814C9A000"
        ],
        "error": [
            "00A0C914C82*",
            123
        ]
    }
    ```
    - The API takes the mac addresses and reverses them, but keeps them in the same format
    - Any erroneous mac addresses are returned in an array of error addresses
    - Details:
        - mac addresses can be formatted in any of these formats:
        "00:A0:C9:14:C8:29"
        "00-A0-C9-14-C8-29"
        "00A0C914C829"
        - Reversed mac address should retain the format of the original mac address: 
        "00:A0:C9:14:C8:29" -> "29:C8:14:C9:A0:00"
        "00-A0-C9-14-C8-29" -> "29-C8-14-C9-A0-00"
        "00A0C914C829" -> "29C814C9A000"