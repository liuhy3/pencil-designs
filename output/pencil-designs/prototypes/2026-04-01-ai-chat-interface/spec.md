# AI 对话界面 - 开发规格文档

> 生成时间：2026-04-01 09:38
> 设计风格：简约现代风格
> 原型链接：https://pencil-designs.pages.dev/ai-chat-interface

---

## 📋 页面概述

**页面名称**：AI 对话界面
**功能描述**：用户与 AI 进行实时对话的聊天界面，支持多轮对话、历史记录管理、快捷操作
**设计风格**：简约现代风格，青绿色主色调
**核心特性**：左侧对话列表 + 右侧聊天区域

---

## 🎨 页面结构

```
AI 对话界面 (响应式布局)
├── 左侧面板 (260px)
│   ├── 头部区域
│   │   ├── Logo + 标题：AI 助手
│   │   └── 新建对话按钮
│   └── 对话列表
│       ├── 对话项（标题 + 时间）
│       ├── 对话项
│       └── ...更多对话历史
├── 右侧聊天区域 (flex: 1)
│   ├── 头部区域
│   │   ├── 当前对话标题
│   │   └── 模型选择器（下拉菜单）
│   ├── 消息区域
│   │   ├── AI 消息气泡（左侧，青绿背景）
│   │   ├── 用户消息气泡（右侧，主色背景）
│   │   └── 更多消息...
│   ├── 快捷操作按钮
│   │   ├── 继续写作
│   │   ├── 重新生成
│   │   └── 复制内容
│   └── 输入区域
│       ├── 文本输入框（自适应高度）
│       ├── 附件上传按钮
│       ├── 清除按钮
│       └── 发送按钮
```

---

## 🔌 API 接口定义

### 1. 获取对话列表

```http
GET /api/conversations
```

**Query Parameters:**
- `page` (optional): 页码，默认 1
- `limit` (optional): 每页数量，默认 20

**Response:**
```json
{
  "code": 0,
  "data": {
    "conversations": [
      {
        "id": "conv-001",
        "title": "帮我写一篇公众号文章",
        "createdAt": "2026-04-01T09:20:00Z",
        "updatedAt": "2026-04-01T09:30:00Z",
        "messageCount": 5
      },
      {
        "id": "conv-002",
        "title": "Python 数据分析教程",
        "createdAt": "2026-03-31T14:00:00Z",
        "updatedAt": "2026-03-31T15:30:00Z",
        "messageCount": 12
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 20
  }
}
```

---

### 2. 创建新对话

```http
POST /api/conversations
```

**Request Body:**
```json
{
  "title": "新对话",
  "model": "gpt-4"
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "conversation": {
      "id": "conv-new",
      "title": "新对话",
      "model": "gpt-4",
      "createdAt": "2026-04-01T09:35:00Z",
      "updatedAt": "2026-04-01T09:35:00Z",
      "messageCount": 0
    }
  }
}
```

---

### 3. 获取对话消息

```http
GET /api/conversations/{conversationId}/messages
```

**Query Parameters:**
- `page` (optional): 页码，默认 1
- `limit` (optional): 每页数量，默认 50

**Response:**
```json
{
  "code": 0,
  "data": {
    "messages": [
      {
        "id": "msg-001",
        "role": "assistant",
        "content": "你好！我是你的 AI 助手...",
        "createdAt": "2026-04-01T09:20:00Z"
      },
      {
        "id": "msg-002",
        "role": "user",
        "content": "帮我写一篇关于 AI Agent 的公众号文章",
        "createdAt": "2026-04-01T09:22:00Z"
      },
      {
        "id": "msg-003",
        "role": "assistant",
        "content": "好的，我来帮你写这篇公众号文章...",
        "createdAt": "2026-04-01T09:23:00Z"
      }
    ],
    "total": 5,
    "page": 1,
    "limit": 50
  }
}
```

---

### 4. 发送消息（同步）

```http
POST /api/conversations/{conversationId}/messages
```

**Request Body:**
```json
{
  "content": "继续，写完整篇文章，3000字左右",
  "stream": false
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "userMessage": {
      "id": "msg-004",
      "role": "user",
      "content": "继续，写完整篇文章，3000字左右",
      "createdAt": "2026-04-01T09:25:00Z"
    },
    "assistantMessage": {
      "id": "msg-005",
      "role": "assistant",
      "content": "好的，以下是完整文章...",
      "createdAt": "2026-04-01T09:28:00Z"
    }
  }
}
```

---

### 5. 发送消息（流式）

```http
POST /api/conversations/{conversationId}/messages/stream
```

**Request Body:**
```json
{
  "content": "帮我写一篇公众号文章"
}
```

**Response (SSE):**
```
data: {"id":"msg-005","role":"assistant","content":"你好","delta":true}
data: {"id":"msg-005","role":"assistant","content":"！我是","delta":true}
data: {"id":"msg-005","role":"assistant","content":"你的 AI 助手","delta":true}
data: {"id":"msg-005","role":"assistant","content":"","delta":false,"done":true}
```

---

### 6. 重新生成回复

```http
POST /api/conversations/{conversationId}/regenerate
```

**Request Body:**
```json
{
  "messageId": "msg-003"
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "message": {
      "id": "msg-003-new",
      "role": "assistant",
      "content": "好的，让我重新来写...",
      "createdAt": "2026-04-01T09:30:00Z"
    }
  }
}
```

---

### 7. 获取可用模型列表

```http
GET /api/models
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "models": [
      {
        "id": "gpt-4",
        "name": "GPT-4",
        "description": "最强大的模型，适合复杂任务",
        "maxTokens": 8192
      },
      {
        "id": "gpt-3.5-turbo",
        "name": "GPT-3.5 Turbo",
        "description": "快速响应，适合日常对话",
        "maxTokens": 4096
      },
      {
        "id": "claude-3",
        "name": "Claude 3",
        "description": "擅长长文本和代码",
        "maxTokens": 100000
      }
    ]
  }
}
```

---

### 8. 删除对话

```http
DELETE /api/conversations/{conversationId}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "deleted": true
  }
}
```

---

### 9. 更新对话标题

```http
PUT /api/conversations/{conversationId}
```

**Request Body:**
```json
{
  "title": "AI Agent 效率提升文章"
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "conversation": {
      "id": "conv-001",
      "title": "AI Agent 效率提升文章",
      "updatedAt": "2026-04-01T09:35:00Z"
    }
  }
}
```

---

## 📊 数据结构定义

### Conversation 对话

```typescript
interface Conversation {
  id: string;
  title: string;
  model: string;          // 使用的模型 ID
  createdAt: string;      // ISO 8601 时间戳
  updatedAt: string;      // ISO 8601 时间戳
  messageCount: number;   // 消息数量
}
```

### Message 消息

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;      // ISO 8601 时间戳
  metadata?: {
    tokens?: number;      // Token 数量
    model?: string;       // 生成该消息的模型
    latency?: number;     // 响应延迟（毫秒）
  };
}
```

### Model 模型

```typescript
interface Model {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  pricing?: {
    input: number;        // 输入价格（每 1K tokens）
    output: number;       // 输出价格（每 1K tokens）
  };
}
```

---

## 🎨 设计规范

### 颜色变量

```css
:root {
  /* 主色 */
  --primary-color: #0d9488;
  --primary-hover: #0a7a6e;
  
  /* 背景色 */
  --bg-dark: #1f2937;        /* 左侧面板背景 */
  --bg-light: #f3f4f6;       /* 主背景 */
  --bg-card: #e8f5f3;        /* AI 消息背景 */
  --bg-user: #0d9488;        /* 用户消息背景 */
  
  /* 文字色 */
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  
  /* 边框色 */
  --border-color: #e5e7eb;
  --border-highlight: #0d9488;
  
  /* 状态色 */
  --color-online: #00ff88;
  --color-warning: #ffaa00;
  --color-error: #ff4444;
}
```

### 字体规范

| 元素 | 字号 | 字重 | 颜色 |
|------|------|------|------|
| 侧边栏标题 | 18px | bold | #fff |
| 聊天标题 | 16px | bold | #111827 |
| 消息内容 | 15px | normal | #111827 / #fff |
| 对话项标题 | 14px | normal | #fff |
| 辅助文字 | 12px | normal | #6b7280 / rgba(255,255,255,0.5) |
| 输入框 | 15px | normal | #111827 |

### 尺寸规范

| 元素 | 尺寸 |
|------|------|
| 侧边栏宽度 | 260px |
| 头像大小 | 40px |
| 消息气泡最大宽度 | 80% |
| 输入框最小高度 | 24px |
| 输入框最大高度 | 120px |
| 圆角半径 | 12px（气泡）/ 8px（按钮）|

---

## 🔧 技术实现

### 消息渲染

```javascript
// 消息气泡组件
function renderMessage(message) {
  const isUser = message.role === 'user';
  return `
    <div class="message ${isUser ? 'user' : 'ai'}">
      <div class="avatar ${isUser ? 'user' : 'ai'}">
        ${isUser ? '👤' : '🤖'}
      </div>
      <div class="message-content">
        ${formatContent(message.content)}
      </div>
    </div>
  `;
}
```

### 流式消息处理

```javascript
// SSE 流式消息处理
async function streamMessage(conversationId, content) {
  const response = await fetch(`/api/conversations/${conversationId}/messages/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    buffer += decoder.decode(value);
    const lines = buffer.split('\n');
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));
        updateMessageContent(data);
      }
    }
  }
}
```

### 输入框自适应高度

```javascript
// 输入框自动调整高度
input.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});
```

---

## 📱 响应式适配

### 移动端（< 768px）

| 调整项 | 说明 |
|--------|------|
| 侧边栏 | 隐藏（可通过按钮展开）|
| 消息气泡宽度 | 90% |
| 输入区域 | 固定在底部 |

### 平板端（768px - 1024px）

| 调整项 | 说明 |
|--------|------|
| 侧边栏宽度 | 200px |
| 消息气泡宽度 | 85% |

---

## ✅ 前端开发清单

### 技术栈
- [ ] React / Vue 框架
- [ ] SSE 流式消息处理
- [ ] Markdown 渲染（消息内容）
- [ ] 无限滚动加载历史消息

### 功能实现
- [ ] 对话列表管理
- [ ] 新建/删除对话
- [ ] 消息发送（同步/流式）
- [ ] 消息重新生成
- [ ] 快捷操作按钮
- [ ] 模型切换
- [ ] 输入框自适应
- [ ] 快捷键支持（Enter 发送）
- [ ] 响应式布局

---

## ✅ 后端开发清单

### 接口
- [ ] GET /api/conversations
- [ ] POST /api/conversations
- [ ] GET /api/conversations/{id}/messages
- [ ] POST /api/conversations/{id}/messages
- [ ] POST /api/conversations/{id}/messages/stream
- [ ] POST /api/conversations/{id}/regenerate
- [ ] DELETE /api/conversations/{id}
- [ ] PUT /api/conversations/{id}
- [ ] GET /api/models

### 数据存储
- [ ] 对话表（conversations）
- [ ] 消息表（messages）
- [ ] 模型配置

### AI 集成
- [ ] OpenAI API 集成
- [ ] Claude API 集成
- [ ] 流式响应处理
- [ ] Token 计费统计

---

## 📁 文件清单

| 文件 | 路径 | 说明 |
|------|------|------|
| HTML 原型 | ai-chat-interface.html | 可交互原型 |
| 规格文档 | spec.md | 本文档 |

---

*生成时间：2026-04-01 09:38*