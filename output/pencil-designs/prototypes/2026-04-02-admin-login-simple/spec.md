# 管理系统登录页（简约版）- 规格文档

> 生成日期：2026-04-02
> 文件名：admin-login-simple.html
> 设计系统：自定义简约风格

---

## 1. 页面概述

| 属性 | 值 |
|------|-----|
| 名称 | 管理系统登录页（简约版） |
| 功能 | 管理后台用户登录 |
| 设计风格 | 简洁现代，紫色渐变主题 (#667eea → #764ba2) |
| 适用场景 | 企业管理后台、内部系统 |

---

## 2. 页面结构

```
body (渐变背景)
└── login-container (白色卡片)
    ├── logo (品牌区域)
    │   ├── logo-icon (渐变图标)
    │   ├── h1 (系统名称)
    │   └── p (描述文字)
    │
    ├── form (登录表单)
    │   ├── form-group (用户名)
    │   │   ├── form-label
    │   │   ├── form-input
    │   │   └── error-msg
    │   │
    │   ├── form-group (密码)
    │   │   ├── form-label
    │   │   ├── form-input
    │   │   └── error-msg
    │   │
    │   ├── options (选项栏)
    │   │   ├── remember (记住密码)
    │   │   └── forgot (忘记密码链接)
    │   │
    │   └── login-btn (登录按钮)
    │
    └── footer-text (版权信息)
```

---

## 3. API 接口设计

### 3.1 用户登录

```http
POST /api/auth/login
Content-Type: application/json

Request:
{
  "username": "admin",
  "password": "password123",
  "remember": true
}

Response:
{
  "success": true,
  "data": {
    "userId": "u_001",
    "username": "admin",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresAt": "2026-04-03T20:00:00Z"
  }
}

Error Response:
{
  "success": false,
  "code": "INVALID_CREDENTIALS",
  "message": "用户名或密码错误"
}
```

---

## 4. 数据结构

```typescript
// 登录请求
interface LoginRequest {
  username: string;
  password: string;
  remember?: boolean;
}

// 登录响应
interface LoginResponse {
  success: boolean;
  data?: {
    userId: string;
    username: string;
    role: string;
    token: string;
    expiresAt: string;
  };
  code?: string;
  message?: string;
}
```

---

## 5. 设计规范

### 5.1 颜色变量

```css
/* 主色 */
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 背景 */
--bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 文字 */
--text-primary: #333;
--text-secondary: #666;
--text-muted: #999;

/* 边框 */
--border-color: #ddd;
--border-focus: #667eea;

/* 错误 */
--error-color: #e74c3c;
```

### 5.2 尺寸规范

| 元素 | 尺寸 |
|------|------|
| 卡片宽度 | 400px（最大 90%） |
| 卡片内边距 | 40px |
| 输入框高度 | 44px |
| 按钮高度 | 44px |
| 圆角（卡片） | 16px |
| 圆角（输入框） | 8px |

---

## 6. 功能说明

| 功能 | 说明 |
|------|------|
| 用户名输入 | 必填，支持 autocomplete |
| 密码输入 | 必填，支持 autocomplete |
| 记住密码 | 勾选框，可选 |
| 忘记密码 | 链接入口，跳转找回页面 |
| 表单验证 | 空值检测，错误提示 |
| 登录按钮 | 点击触发登录逻辑 |

---

## 7. 开发清单

### 7.1 前端任务

- [ ] 接入真实登录 API
- [ ] 实现 token 存储（localStorage/sessionStorage）
- [ ] 添加登录成功跳转逻辑
- [ ] 实现忘记密码页面
- [ ] 添加 loading 状态
- [ ] 添加错误边界处理

### 7.2 后端任务

- [ ] 登录接口实现
- [ ] 密码验证（bcrypt）
- [ ] JWT token 生成
- [ ] Session 管理
- [ ] 权限验证中间件

---

## 8. 相关链接

- **预览页面**: https://pencil-designs.pages.dev/admin-login-simple
- **管理面板**: https://pencil-designs.pages.dev/index.html
- **GitHub**: https://github.com/liuhy3/pencil-designs