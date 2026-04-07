# Vue 登录页（Element Plus）- 规格文档

## 页面概述

| 属性 | 值 |
|------|-----|
| 名称 | Vue Login Page |
| 文件 | vue-login.html |
| 风格 | Vue 3 + Element Plus |
| 布局 | 左右分栏（品牌展示 + 登录表单） |
| 响应式 | ≤960px 隐藏左侧品牌区 |

## 功能特性

1. **三种登录方式**：账号密码 / 手机验证码 / 扫码登录
2. **Canvas 验证码**：随机字符 + 干扰线 + 噪点，点击刷新
3. **密码显示/隐藏**：眼睛图标切换
4. **记住密码**：Checkbox 选项
5. **第三方登录**：微信 / 钉钉 / 企业微信（图标展示）
6. **表单验证**：Element Plus rules 校验
7. **Tab 动画**：Vue transition 切换动画

## 页面结构

```
login-container
├── login-brand（左侧品牌区）
│   ├── grid-bg（网格背景）
│   ├── deco-circle × 3（装饰圆环）
│   └── brand-content
│       ├── brand-logo
│       ├── brand-title
│       ├── brand-subtitle
│       └── feature-cards × 3
└── login-form-area（右侧登录区）
    ├── form-header
    ├── login-tabs（3 个 Tab）
    ├── [account] 账号密码表单
    │   ├── username input
    │   ├── password input + toggle
    │   ├── captcha input + canvas
    │   ├── remember + forgot
    │   └── submit button
    ├── [phone] 手机号表单
    │   ├── phone input
    │   ├── smsCode input + send button
    │   ├── terms checkbox
    │   └── submit button
    ├── [qrcode] 扫码面板
    │   └── qr canvas + refresh
    ├── social-login（第三方）
    └── register-hint
```

## 数据结构

```typescript
interface AccountForm {
  username: string;  // 用户名/邮箱，3-50字符
  password: string;  // 密码，6-32字符
  captcha: string;   // 验证码，4位
}

interface PhoneForm {
  phone: string;     // 手机号，/^1[3-9]\d{9}$/
  smsCode: string;   // 短信验证码，6位
}

type LoginType = 'account' | 'phone' | 'qrcode';
```

## API 接口（参考）

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 账号登录 | POST | /api/auth/login | username + password |
| 发送短信 | POST | /api/auth/sms | phone |
| 获取验证码 | GET | /api/captcha/image | 返回 base64 图片 + key |
| 扫码状态 | GET | /api/auth/qrcode/{token} | 轮询扫码状态 |

## 设计规范

| 属性 | 值 |
|------|-----|
| 主色 | #409eff (Element Plus Blue) |
| 深色背景 | #0f172a |
| 正文色 | #1e293b |
| 次要文字 | #64748b |
| 边框色 | #e2e8f0 |
| 圆角 | 10px (输入框/按钮) |
| 输入框高度 | 46px |
| 字体 | Inter, -apple-system |

## 技术实现

- **Vue 3** CDN (vue.global.prod.js)
- **Element Plus** CDN (组件库 + CSS)
- **Material Icons** (图标)
- **Canvas** 验证码 & 二维码绘制
- **CSS Transition** Tab 切换动画
- **响应式** @media ≤960px / ≤480px

## 开发清单

- [x] 账号密码登录
- [x] 手机验证码登录
- [x] 扫码登录（前端模拟）
- [x] Canvas 验证码
- [x] 密码显示切换
- [x] 表单校验
- [x] 第三方登录入口
- [x] 响应式适配
- [ ] 后端 API 对接
- [ ] 真实二维码生成
- [ ] 短信发送对接
