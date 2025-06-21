

**Add `sass-embedded` to devDependencies**
```bash
npm i --save-dev sass-embedded
```


tsconfig.app.json set for js，jsx compatible
```JSON
    "allowJs": true,
    "checkJs": false,         // 若不希望檢查 JS 中型別錯誤可設 false
  },
  "include": ["src", "**/*.js", "**/*.jsx"],
```


```bash
npm install axios
npm install react-toastify

```

**api server startup**
```bash
json-server --watch db.json // default  port 3000

json-server --watch db.json --port 4000

yarn start:api
```