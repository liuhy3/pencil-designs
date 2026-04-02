# APP 注册页面 - 规格文档

> 生成日期：2026-04-02
> 文件名：app-register.html
> 设计系统：Vant 4（移动端）

---

## 1. 页面概述

| 属性 | 值 |
|------|-----|
| 名称 | APP 注册页面 |
| 功能 | 用户注册流程，包含手机验证、密码设置、社交登录 |
| 设计风格 | Vant 移动端风格，绿色主题 (#07c160) |
| 适用场景 | 移动APP、H5页面 |

---

## 2. 页面结构

```
register-container
├── logo-section (品牌区域)
│   ├── logo (图标)
│   ├── app-name (应用名称)
│   └── app-slogan (口号)
│
├── form-section (表单区域)
│   ├── form-card (卡片容器)
│   │   ├── form-title (标题)
│   │   ├── form-group (手机号输入)
│   │   │   ├── form-label
│   │   │   └── form-input
│   │   ├── form-group (验证码输入)
│   │   │   ├── input-with-btn
│   │   │   │   ├── form-input
│   │   │   │   └── code-btn
│   │   ├── form-group (密码设置)
│   │   │   ├── password-wrapper
│   │   │   │   ├── form-input
│   │   │   │   └── password-toggle
│   │   │   ├── password-strength (强度指示)
│   │   │   └── strength-text
│   │   ├── form-group (确认密码)
│   │   ├── agreement (协议勾选)
│   │   ├── register-btn (注册按钮)
│   │   └── login-link (登录入口)
│   │
│   └── social-section (社交登录)
│       ├── divider (分隔线)
│       └── social-buttons
│           ├── social-btn.wechat
│           └── social-btn.apple
│
└── toast (提示组件)
```

---

## 3. API 接口设计

### 3.1 发送验证码

```http
POST /api/auth/send-code
Content-Type: application/json

Request:
{
  "phone": "13800138000"
}

Response:
{
  "success": true,
  "message": "验证码已发送",
  "expiresIn": 300  // 验证码有效期（秒）
}

Error Response:
{
  "success": false,
  "code": "INVALID_PHONE",
  "message": "手机号格式错误"
}
```

### 3.2 用户注册

```http
POST /api/auth/register
Content-Type: application/json

Request:
{
  "phone": "13800138000",
  "code": "123456",
  "password": "Password123!",
  "agree": true
}

Response:
{
  "success": true,
  "data": {
    "userId": "u_abc123",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresAt": "2026-04-03T16:00:00Z"
  }
}

Error Response:
{
  "success": false,
  "code": "CODE_EXPIRED",
  "message": "验证码已过期"
}
```

### 3.3 社交登录授权

```http
POST /api/auth/social-register
Content-Type: application/json

Request:
{
  "platform": "wechat",  // 或 "apple"
  "authCode": "oauth_code_xxx"
}

Response:
{
  "success": true,
  "data": {
    "userId": "u_xyz789",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "isNewUser": true
  }
}
```

---

## 4. 数据结构

### 4.1 TypeScript 类型定义

```typescript
// 注册请求
interface RegisterRequest {
  phone: string;        // 手机号（11位）
  code: string;         // 验证码（4-6位）
  password: string;     // 密码（6-20位）
  confirmPassword?: string;
  agree: boolean;       // 协议同意
}

// 验证码请求
interface SendCodeRequest {
  phone: string;
}

// 社交登录请求
interface SocialRegisterRequest {
  platform: 'wechat' | 'apple';
  authCode: string;
}

// 注册响应
interface RegisterResponse {
  success: boolean;
  data?: {
    userId: string;
    token: string;
    expiresAt: string;
  };
  code?: string;
  message?: string;
}

// 密码强度等级
type PasswordStrength = 'weak' | 'medium' | 'strong';

// 页面状态
interface PageState {
  countdown: number;              // 验证码倒计时
  passwordVisible: boolean;       // 密码可见性
  passwordStrength: PasswordStrength;
  isSubmitting: boolean;
}
```

---

## 5. 设计规范

### 5.1 颜色变量

```css
:root {
  /* 主色 */
  --primary-color: #07c160;       /* 微信绿 */
  --primary-gradient: linear-gradient(135deg, #07c160 0%, #06ad56 100%);
  
  /* 背景 */
  --bg-color: #f7f8fa;
  --bg-gradient: linear-gradient(180deg, #e8f5e9 0%, #f7f8fa 30%);
  
  /* 文字 */
  --text-color: #323233;
  --text-secondary: #969799;
  
  /* 边框 */
  --border-color: #ebedf0;
  
  /* 状态色 */
  --success: #07c160;
  --warning: #ff976a;
  --error: #ee0a24;
}
```

### 5.2 字体规范

| 元素 | 字号 | 字重 | 颜色 |
|------|------|------|------|
| 应用名称 | 24px | 600 | #323233 |
| 表单标题 | 20px | 600 | #323233 |
| 标签 | 14px | 400 | #969799 |
| 输入框 | 16px | 400 | #323233 |
| 按钮 | 16px | 600 | #fff |
| 描述文字 | 12px | 400 | #969799 |

### 5.3 尺寸规范

| 元素 | 尺寸 |
|------|------|
| Logo 图标 | 72×72px |
| 输入框高度 | 48px |
| 按钮高度 | 48px |
| 圆角（卡片） | 16px |
| 圆角（按钮） | 24px |
| 圆角（输入框） | 8px |
| 内边距（卡片） | 24px 20px |

---

## 6. 技术实现

### 6.1 密码强度检测

```javascript
function checkPassword(password) {
  let strength = 0;
  
  // 长度检测
  if (password.length >= 6) strength++;
  
  // 大小写混合
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  
  // 数字
  if (/\d/.test(password)) strength++;
  
  // 特殊符号
  if (/[^a-zA-Z\d]/.test(password)) strength++;
  
  return Math.min(strength, 3);
}
```

### 6.2 验证码倒计时

```javascript
function startCountdown(duration = 60) {
  countdown = duration;
  btn.disabled = true;
  
  const timer = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      clearInterval(timer);
      btn.textContent = '获取验证码';
      btn.disabled = false;
    } else {
      btn.textContent = `${countdown}s`;
    }
  }, 1000);
}
```

### 6.3 表单验证规则

| 字段 | 规则 | 正则 |
|------|------|------|
| 手机号 | 11位，1开头 | `/^1[3-9]\d{9}$/` |
| 验证码 | 4-6位数字 | `/^\d{4,6}$/` |
| 密码 | 6-20位 | 长度检测 |
| 确认密码 | 与密码一致 | `password === confirmPassword` |

---

## 7. 开发清单

### 7.1 前端任务

- [ ] 接入真实验证码 API
- [ ] 接入真实注册 API
- [ ] 实现微信 OAuth 登录
- [ ] 实现 Apple Sign In
- [ ] 添加错误边界处理
- [ ] 添加加载状态动画
- [ ] 实现表单自动保存
- [ ] 添加无障碍支持（ARIA）

### 7.2 后端任务

- [ ] 验证码发送接口（短信服务商集成）
- [ ] 验证码校验逻辑（Redis缓存）
- [ ] 用户注册接口
- [ ] 密码加密存储（bcrypt）
- [ ] 微信 OAuth 回调
- [ ] Apple Sign In 验证
- [ ] 用户协议内容管理

---

## 8. 相关链接

- **预览页面**: https://pencil-designs.pages.dev/app-register
- **管理面板**: https://pencil-designs.pages.dev/index.html
- **GitHub**: https://github.com/liuhy3/pencil-designs
- **Vant 文档**: https://vant-ui.github.io/vant/#/zh-CN