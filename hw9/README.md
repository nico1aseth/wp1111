# Web Programming HW#9

- 網址：https://scorecard-frontend.onrender.com/
- 服務功能：可參照 hw6 的 spec, 可以 Add & Query 使用者特定科目的成績, 也可以 Clear 資料庫

## Deployment 流程

- 將前、後端資料庫分別在 GitHub 上建立一個 repo
- Go to render.com, 建立 New Static Site for the frontend repo
- 前端設定 Build Command: npm run build
- 建立 New Web Service for the backend repo
- 後端設定 Build Command: npm install, Start Command: npm run server
- 前、後端皆 deploy 完成後, 至 frontend/src/api.js 更改 baseURL: `https://scorecard-backend.onrender.com`
- App is running on https://scorecard-frontend.onrender.com/
