# [111-1] Web Programming Final
## (Group 107) ANY REVIEW
- 我們的專題主題為一個評論網站，可以在網站上進行註冊、登入並發表對課程、餐廳或任何服務的評論以及評價。評論的選項包含標題、內文、幾顆星以及上傳圖片。首頁上方也有search bar讓使用者能更快速地查詢評論。
- 【Demo 影片】https://youtu.be/UwysKKUqM6Q
- 【Deployed link】https://anyreview.onrender.com/
- 【Github】https://github.com/nico1aseth/wp1111/tree/main/final
- 【FB 社團貼文】 https://www.facebook.com/groups/NTURicWebProg/permalink/1829285964085982/

### 【組員】
- B08603053 王鏡溏
- B09505050 魏子傑

### 【使用之第三方套件、框架、程式碼】
- 【前端】
  React.js, ANT Design, Axios, react-router-dom, react-redux, react-toastify, material-ui
- 【後端】
  Node.js, Express, mongoose, cors, bcryptjs, nodemon, jsonwebtoken
- 【資料庫】
  MongoDB

### 【專題製作心得】
- 王鏡溏  
  我覺得要製作出一個完整的全端project不是一件簡單的事情。除了本身需要對技術具備一定程度的掌握度外，與隊友間的溝通、前後端的串接、使用git等能力都是很重要且需要花時間培養＆學習的。同時在製作專題時才發現，原來一個看似簡單的登入功能，是需要花大量時間開發且套用在不同的UI Library寫法也不盡相同。謝謝Ric教授以及助教們開了網服這門課程，讓我對Web有更進一步的認識，也知道自己的興趣在哪＆該往哪項技術繼續研究。
- 魏子傑  
  這次專案中，我使用了MUI套用在前端畫面的呈現，以及整合Sign In/Sign up, search bar等功能至MUI以及ANT Design。我覺得看著開發的功能，最終都能順利運行時，能獲得滿滿的成就感。謝謝Ric開了網服，讓我了解到要做出功能完善的專案並不容易，需要花很多時間構思、實作並部署。
  
### 【在 localhost 安裝與測試之詳細步驟】
- 在 ./final 執行 yarn install:all
- 在 ./final/backend 執行 touch .env
- 打開 ./final/backend/.env，新增 MONGO_URL="<資料庫網址>" 與 JWT_SECRET=12345
- 下載完 packages 後，在 ./final 分別執行 yarn start 與 yarn server
- Server is running on port 4000

### 【功能測試】
- 主頁右上角的 Sign In/Sign Up 功能，若未完整填寫完註冊或登陸的表格即送出表單，右上角會跳出錯誤通知。
- 成功登陸或註冊後，即可點選主頁的 Start Reviewing 進行評論。送出評論後，即可在主頁看到該評論。
- 按下主頁評論的 view，即可看到詳細的 review body。
- 點選左上角的 Search，輸入“完整的”評論 title，會在 /search 跳出該則評論。

### 【每位組員之負責項目】
- 王鏡溏  
  我負責開發後端 JWT authentication 的功能，以及後端回傳給前端資料的邏輯，並使用 bcryptjs 加密使用者的密碼。前端負責 Redux state management。
- 魏子傑  
  我負責前端畫面的呈現，使用了 material ui 與 ant design 開發。前端的功能包含 search bar, sign in/ sign up error handling, 評論畫面等。

### 【重要注意事項】
- 發布評論時，需要上傳照片。此項功能只能在 safari 瀏覽器上執行，chrome 無法執行上傳照片的功能。
