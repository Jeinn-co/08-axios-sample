### Should have prettier plugin
```bash
npm install prettier --save-dev
```
.prettierrc
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```
test prettier
```bash
npx prettier --write ./src
```
test eslint
```bash
npx eslint ./src --ext .js,.jsx,.ts,.tsx --fix
```

### 加 eslint + prettier 檢查。(formating)
1. 手動
    
    ```bash
    # vite:
        "prettier": "prettier --write ./src && eslint ./src --ext .js,.jsx,.ts,.tsx --fix",
        "build": "npm run prettier && vite build",
    # CRA , Next.js
        "prettier": "npx prettier --write ./src && eslint --fix ./src",
    ```
    
2. husky
    
    ```bash
    npm install husky --save-dev
    npx husky-init
    
    # auto add in package.json
    "prepare": "husky install"
    ```
    
    .husky/pre-commit
    
    ```bash
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"
    
    npm run prettier
    ```
    
3. push time for testing
    
    .husky/pre-push
    
    ```bash
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"
    
    npm test

    # chmod +x .husky/pre-push
    ```
    
4.  lint-staged - only check stage 
    
    ```bash
    npm install lint-staged --save-dev
    ```
    
    .lintstagedrc
    
    ```bash
    {
      "./src/**/*.{js,jsx,ts,tsx}": [
        "prettier --write",
        "eslint --fix"
      ]
    }
    ```
    
    .husky/pre-commit
    
    ```bash
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"
    
    npx lint-staged
    ```
    
5.  如果任何命令失敗被中止。
6.  避免使用 git commit --no-verify 來跳過檢查。

