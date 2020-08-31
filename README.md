## Screenshots

![screenShots](/screenshots/dashboard.png)

## DATABASE CONFIG

| MYSQL CONFIG | NAME       |
| ------------ | ---------- |
| DATABASE     | employeeDB |
| TABLE        | empolyee   |

<br />

| NAME     | DATATYPE |
| -------- | -------- |
| id       | int      |
| name     | varchar  |
| email    | varchar  |
| mobile   | varchar  |
| location | varchar  |

 <br />

### STEP 1

Run this comment to install node modules for backend.

```
npm i
```

### STEP 2

After installation is compelete start then backend by applying below command.

```
node index.js
```

### STEP 3

Run this comment to install node modules for frontend.

```
cd client
npm i
```

### STEP 4

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br />

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

```
npm start
```

### Router APIS

| ROUTERS                              | METHOD | PURPOSE      |
| ------------------------------------ | ------ | ------------ |
| http://localhost:4001/api/emp/       | get    | getting data |
| http://localhost:4001/api/emp/       | post   | adding data  |
| http://localhost:4001/api/emp/delete | post   | for delet    |
| http://localhost:4001/api/emp/:id    | put    | for update   |
