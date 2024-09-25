# React-vite-admin

### 介绍 📖

React-vite-admin，基于 React18、React-Router v6、React-Hooks、Redux && Redux-Toolkit、TypeScript、Vite4、Ant-Design 开源的一套后台管理框架。

### 一、在线预览地址

- Link：http://admin.kirk.wang

### 二、Git 仓库地址 (欢迎 Star⭐)

- Gitee：https://gitee.com/kirk958617/react-vite-admin

- GitHub：https://github.com/manongguai/react-vite-admin


* 后端项目地址
- GitHub：https://github.com/manongguai/nestJs-backend


### 三、🔨🔨🔨 项目功能

- 🚀 采用最新技术找开发：React18、React-Router v6、React-Hooks、TypeScript、Vite4.4
- 🚀 采用 Vite4 作为项目开发、打包工具（配置了 Gzip 打包、跨域代理）
- 🚀 整个项目集成了 TypeScript
- 🚀 使用 redux 做状态管理，集成 redux-toolkit、react-redux、redux-persist 开发
- 🚀 使用 TypeScript 对 Axios 二次封装 （错误拦截、常用请求封装、全局请求 Loading、取消重复请求、refreshToken）
- 🚀 支持 Antd 组件大小切换、暗黑 && 灰色 && 色弱模式、i18n 国际化（i18n 部分配置，架子已经搭好）
- 🚀 使用 Route loader、lazyLoad 管理路由权限配置
- 🚀 支持 React-Router v6 路由懒加载配置、菜单手风琴模式、无限级菜单、多标签页、面包屑导航
- 🚀 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（项目规范配置）
- 🚀 使用 husky、lint-staged、commitlint、commitizen、cz-git 规范提交信息（项目规范配置）
- 🚀 常用后台功能模块持续更新...

### 四、安装使用步骤 📑

- **Clone：**

```text
# Gitee
git clone https://gitee.com/kirk958617/react-vite-admin.git
# GitHub
git clone https://github.com/manongguai/react-vite-admin.git
```

- **Install：**

```text
pnpm install

```

- **Run：**

```text
pnpm run dev
```

- **Build：**

```text
# 打包部署环境
pnpm run build

```

```text
# 打包mock测试环境
pnpm run build:test

```

- **Lint：**

```text
# eslint 检测代码
pnpm run lint:eslint

# prettier 格式化代码
pnpm run lint:prettier

# stylelint 格式化代码
pnpm run lint:stylelint

```

### 五、项目截图

#### 1、登录页：

- light 模式
  ![登录页](http://admin.kirk.wang/images/login.png)
- dark 模式
  ![登录页](http://admin.kirk.wang/images/login2.png)

#### 2、首页：

- light 模式
  ![首页](http://admin.kirk.wang/images/home.png)
- dark 模式
  ![icons](http://admin.kirk.wang/images/icons.png)

### 六、文件资源目录 📚

```text
React-vite-admin
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ enums               # 项目枚举
│  ├─ hooks               # 常用 Hooks
│  ├─ language            # 语言国际化
│  ├─ layout              # 框架布局
│  ├─ router              # 路由管理
│  ├─ store               # redux store
│  ├─ styles              # 全局样式
│  ├─ types               # 全局 ts 声明
│  ├─ utils               # 工具库(utils,http)
│  ├─ views               # 项目所有页面
│  ├─ mock                # 模拟接口拦截
│  ├─ App.tsx             # 入口页面
│  ├─ main.tsx            # 入口文件
│  └─ env.d.ts            # vite 声明文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.json           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.json         # prettier 配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.json        # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.json   # git 提交规范配置
├─ index.html             # 入口 html
├─ pmpm-lock.yaml       # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
├─ tsconfig.node.json     # typescript node配置
└─ vite.config.ts         # vite 配置
```

### 七、浏览器支持

- 本地开发推荐使用 Chrome 最新版浏览器 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 生产环境支持现代浏览器，不在支持 IE 浏览器，更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)。

### 八、功能实现 🧩

- 用户登录
- 用户管理
- 角色管理
- 菜单管理
- 文件上传
- 部门管理
- 岗位管理


### 九、捐赠 🍵

如果你正在使用这个项目或者喜欢这个项目的，可以通过以下方式支持我：

- Star、Fork、Watch 一键三连 🚀
- 通过微信、支付宝一次性捐款 ❤

|                                        微信                                        |                                        支付宝                                        |
| :--------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------: |
| <img src="http://admin.kirk.wang/images/weixin.png" alt="Alipay QRcode" width=170> | <img src="http://admin.kirk.wang/images/zhifubao.png" alt="Wechat QRcode" width=170> |
