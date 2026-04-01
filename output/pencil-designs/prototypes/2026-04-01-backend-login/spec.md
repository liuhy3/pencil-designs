# 后端登录界面 - 开发规格文档

> 生成时间：2026-04-01 10:10
> 设计风格：Ant Design 风格
> 原型链接：https://pencil-designs.pages.dev/backend-login

---

## 📋 页面概述

**页面名称**：后端登录界面 (Admin Portal)
**功能描述**：管理员登录系统入口，支持用户名密码登录、验证码验证、社交登录
**设计风格**：Ant Design 风格，蓝色主色调
**核心特性**：左侧品牌展示 + 右侧登录表单 + 验证码

---

## 🎨 页面结构

```
后端登录界面 (响应式布局，900px x 500px)
├── 左侧品牌区域 (380px)
│   ├── Logo (🔐)
│   ├── 标题：Admin Portal
│   ├── 副标题：安全、可靠的后台管理系统
│   └── 功能特点列表
│       ├── 多重身份验证 (🛡️)
│       ├── 实时数据监控 (📊)
│       ├── 高性能架构 (⚡)
│       └── 端到端加密 (🔒)
│   └── 渐变背景动画
├── 右侧登录表单区域 (flex: 1)
│   ├── 标题：管理员登录
│   ├── 副标题：请输入您的账号信息登录系统
│   ├── 表单字段
│   │   ├── 用户名输入（带图标）
│   │   ├── 密码输入（带切换显示按钮）
│   │   ├── 验证码输入 + 图片验证码
│   ├── 选项
│   │   ├── 记住密码（复选框）
│   │   └── 忘记密码（链接）
│   ├── 登录按钮
│   ├── 分割线 + 其他登录方式
│   │   ├── 企业微信
│   │   ├── 钉钉
│   │   ├── 飞书
│   └── 注册提示：联系管理员
```

---

## 🔌 API 接口定义

### 1. 管理员登录

```http
POST /api/admin/login
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123",
  "captcha": "A8X2",
  "rememberMe": true
}
```

**Response (Success):**
```json
{
  "code": 0,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user-001",
      "username": "admin",
      "name": "管理员",
      "role": "admin",
      "avatar": "https://...",
      "permissions": ["read", "write", "admin"]
    },
    "expiresIn": 7200
  },
  "message": "登录成功"
}
```

**Response (Error):**
```json
{
  "code": 1001,
  "message": "用户名或密码错误",
  "data": null
}
```

**错误码定义：**

| 错误码 | 说明 |
|--------|------|
| 1001 | 用户名或密码错误 |
| 1002 | 验证码错误 |
| 1003 | 用户被禁用 |
| 1004 | 账号未激活 |
| 1005 | 登录次数超限，请稍后再试 |

---

### 2. 获取验证码

```http
GET /api/captcha
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "captchaId": "cap-20260401-001",
    "captchaImage": "base64_encoded_image",
    "expiresIn": 300
  }
}
```

---

### 3. 社交登录

```http
POST /api/admin/social-login
```

**Request Body:**
```json
{
  "platform": "wecom",  // wecom | dingtalk | feishu
  "code": "auth_code_from_platform"
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user-002",
      "username": "wecom_user",
      "name": "企业微信用户",
      "platform": "wecom"
    },
    "bindRequired": false
  }
}
```

---

### 4. 发送找回密码邮件

```http
POST /api/admin/forgot-password
```

**Request Body:**
```json
{
  "email": "admin@example.com"
}
```

**Response:**
```json
{
  "code": 0,
  "message": "重置密码邮件已发送，请查收"
}
```

---

### 5. 检查登录状态

```http
GET /api/admin/check-session
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "loggedIn": true,
    "user": {
      "id": "user-001",
      "username": "admin",
      "name": "管理员",
      "role": "admin"
    }
  }
}
```

---

### 6. 登出

```http
POST /api/admin/logout
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "code": 0,
  "message": "登出成功"
}
```

---

## 📊 数据结构定义

### LoginRequest 登录请求

```typescript
interface LoginRequest {
  username: string;      // 用户名，必填
  password: string;      // 密码，必填
  captcha: string;       // 验证码，必填，4位
  rememberMe?: boolean;  // 记住密码，可选
}
```

### LoginResponse 登录响应

```typescript
interface LoginResponse {
  token: string;         // JWT Token
  user: UserInfo;        // 用户信息
  expiresIn: number;     // Token 有效期（秒）
}

interface UserInfo {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'operator' | 'viewer';
  avatar?: string;
  permissions: string[];
}
```

### CaptchaInfo 验证码信息

```typescript
interface CaptchaInfo {
  captchaId: string;     // 验证码ID，用于校验
  captchaImage: string;  // Base64 图片或 URL
  expiresIn: number;     // 有效期（秒），通常 300
}
```

---

## 🎨 设计规范

### 颜色变量

```css
:root {
  /* 主色 */
  --primary: #1890ff;
  --primary-hover: #40a9ff;
  --primary-active: #096dd9;
  
  /* 背景 */
  --bg-dark: #001529;        /* 品牌区深色 */
  --bg-light: #f0f2f5;       /* 页面背景 */
  --bg-white: #ffffff;       /* 表单区背景 */
  
  /* 文字 */
  --text-primary: #262626;
  --text-secondary: #8c8c8c;
  --text-muted: #bfbfbf;
  
  /* 边框 */
  --border: #d9d9d9;
  --border-focus: #1890ff;
  
  /* 状态 */
  --error: #ff4d4f;
  --success: #52c41a;
  --warning: #faad14;
  
  /* 渐变 */
  --gradient-brand: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
}
```

### 字体规范

| 元素 | 字号 | 字重 | 颜色 |
|------|------|------|------|
| 品牌标题 | 28px | 600 | #fff |
| 品牌副标题 | 16px | normal | rgba(255,255,255,0.85) |
| 登录标题 | 24px | 600 | #262626 |
| 表单标签 | 14px | 500 | #262626 |
| 输入框 | 14px | normal | #262626 |
| 错误提示 | 12px | normal | #ff4d4f |
| 辅助文字 | 14px | normal | #8c8c8c |

### 尺寸规范

| 元素 | 尺寸 |
|------|------|
| 整体容器 | 900px x 500px |
| 左侧品牌区 | 380px |
| 输入框高度 | 40px |
| 登录按钮高度 | 40px |
| 验证码图片 | 120px x 40px |
| 社交登录按钮 | 48px 圆形 |
| 圆角 | 4px（输入框）/ 8px（容器）/ 50%（社交按钮）|

---

## 🔧 技术实现

### 表单验证

```javascript
function validateForm() {
  const errors = {};
  
  // 用户名验证
  if (!username.trim()) {
    errors.username = '请输入用户名';
  }
  
  // 密码验证
  if (!password.trim()) {
    errors.password = '请输入密码';
  } else if (password.length < 6) {
    errors.password = '密码长度不能少于6位';
  }
  
  // 验证码验证
  if (!captcha.trim()) {
    errors.captcha = '请输入验证码';
  } else if (captcha.length !== 4) {
    errors.captcha = '验证码为4位';
  }
  
  return errors;
}
```

### 验证码刷新

```javascript
async function refreshCaptcha() {
  const response = await fetch('/api/captcha');
  const data = response.json();
  
  captchaId = data.captchaId;
  captchaImg.src = data.captchaImage;
}
```

### 登录请求

```javascript
async function login(formData) {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const data = await response.json();
  
  if (data.code === 0) {
    localStorage.setItem('token', data.data.token);
    if (formData.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }
    redirectTo('/admin/dashboard');
  } else {
    showError(data.message);
    refreshCaptcha();
  }
}
```

### 密码显示切换

```javascript
function togglePasswordVisibility() {
  const input = document.getElementById('password');
  input.type = input.type === 'password' ? 'text' : 'password';
}
```

---

## 📱 响应式适配

### 移动端（< 768px）

| 调整项 | 说明 |
|--------|------|
| 整体布局 | 改为垂直堆叠 |
| 品牌区 | 宽度 100%，高度 200px |
| 功能特点列表 | 隐藏 |
| 表单区 | 宽度 100%，padding 减少 |

---

## 🔒 安全要求

### 前端安全

- [ ] 密码输入框禁用复制粘贴
- [ ] 验证码定期刷新（5分钟过期）
- [ ] 登录失败次数限制（前端提示）
- [ ] Token 不存储在 localStorage（建议使用 sessionStorage）
- [ ] HTTPS 强制传输

### 后端安全

- [ ] 密码加密存储（bcrypt）
- [ ] 登录失败次数限制（IP + 用户名）
- [ ] Token JWT 签名验证
- [ ] 验证码服务防刷
- [ ] 登录日志记录

---

## ✅ 前端开发清单

### 技术栈
- [ ] React / Vue 框架
- [ ] Ant Design 组件库
- [ ] Axios HTTP 请求
- [ ] localStorage / sessionStorage

### 功能实现
- [ ] 表单验证（用户名、密码、验证码）
- [ ] 验证码图片显示 + 刷新
- [ ] 密码显示/隐藏切换
- [ ] 记住密码功能
- [ ] 社交登录入口
- [ ] 登录请求 + Token 存储
- [ ] 登录状态检查
- [ ] 错误提示显示
- [ ] 响应式布局

---

## ✅ 后端开发清单

### 接口
- [ ] POST /api/admin/login
- [ ] GET /api/captcha
- [ ] POST /api/admin/social-login
- [ ] POST /api/admin/forgot-password
- [ ] GET /api/admin/check-session
- [ ] POST /api/admin/logout

### 安全
- [ ] 密码加密
- [ ] JWT Token 生成/验证
- [ ] 验证码生成服务
- [ ] 登录频率限制
- [ ] 社交登录对接（企业微信/钉钉/飞书）

---

## 📁 文件清单

| 文件 | 路径 | 说明 |
|------|------|------|
| HTML 原型 | backend-login.html | 可交互原型 |
| 规格文档 | spec.md | 本文档 |

---

*生成时间：2026-04-01 10:10*