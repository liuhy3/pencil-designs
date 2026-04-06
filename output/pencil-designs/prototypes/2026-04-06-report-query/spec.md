# 数据报表查询页面 - 规格文档

> 创建时间：2026-04-06
> 设计系统：Ant Design 5
> 预览链接：https://pencil-designs.pages.dev/report-query

---

## 页面概述

数据报表查询页面，提供订单数据查询、筛选和导出功能。采用 Ant Design 5 组件库，浅色主题，后台管理风格。

---

## 页面结构

```
├── Header（页面标题 + 描述）
├── StatsRow（统计卡片行）
│   ├── 今日订单（蓝色）
│   ├── 完成率（绿色）
│   ├── 待处理（橙色）
│   └── 本月总额（蓝色）
├── SearchCard（查询表单）
│   ├── 订单号输入框
│   ├── 客户输入框
│   ├── 状态下拉选择
│   ├── 日期范围选择器
│   └── 操作按钮组（查询/重置/导出Excel）
└── TableCard（数据表格）
    ├── 订单号
    ├── 客户
    ├── 产品
    ├── 金额
    ├── 状态（Tag 标签）
    ├── 日期
    └── 操作（详情/导出）
```

---

## API 接口

### 1. 查询报表数据

```
GET /api/report/query
```

**Request Query Parameters:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| orderId | string | 否 | 订单号，模糊匹配 |
| customer | string | 否 | 客户名称，模糊匹配 |
| status | string | 否 | 状态：completed / pending / cancelled |
| startDate | string | 否 | 开始日期，格式 YYYY-MM-DD |
| endDate | string | 否 | 结束日期，格式 YYYY-MM-DD |
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页条数，默认 10 |

**Response:**

```json
{
  "code": 200,
  "data": {
    "list": [
      {
        "id": "ORD001",
        "customer": "张三",
        "product": "AI助手会员",
        "amount": 299,
        "status": "completed",
        "date": "2026-04-06"
      }
    ],
    "total": 1234,
    "page": 1,
    "pageSize": 10
  }
}
```

### 2. 获取统计数据

```
GET /api/report/stats
```

**Response:**

```json
{
  "code": 200,
  "data": {
    "todayOrders": 1234,
    "completionRate": 0.925,
    "pendingCount": 87,
    "monthTotal": 128450
  }
}
```

### 3. 导出 Excel

```
POST /api/report/export
Content-Type: application/json
```

**Request Body:**

```json
{
  "orderId": "ORD001",
  "customer": "张三",
  "status": "completed",
  "startDate": "2026-04-01",
  "endDate": "2026-04-06"
}
```

**Response:** `application/octet-stream`（Excel 文件流）

---

## 数据结构

### OrderItem（订单项）

```typescript
interface OrderItem {
  id: string;          // 订单号，如 ORD001
  customer: string;    // 客户名称
  product: string;     // 产品名称
  amount: number;      // 金额（元）
  status: OrderStatus; // 订单状态
  date: string;        // 日期，YYYY-MM-DD
}

type OrderStatus = 'completed' | 'pending' | 'cancelled';

interface OrderStatusMap {
  completed: { color: 'success'; text: '已完成' };
  pending:   { color: 'warning'; text: '待处理' };
  cancelled: { color: 'error';   text: '已取消' };
}
```

### ReportStats（统计数据）

```typescript
interface ReportStats {
  todayOrders: number;    // 今日订单数
  completionRate: number; // 完成率（0-1）
  pendingCount: number;   // 待处理数量
  monthTotal: number;     // 本月总额（元）
}
```

### QueryParams（查询参数）

```typescript
interface QueryParams {
  orderId?: string;
  customer?: string;
  status?: OrderStatus;
  dateRange?: [string, string]; // [startDate, endDate]
}
```

---

## 设计规范

### 颜色变量

| 用途 | 色值 | 说明 |
|------|------|------|
| 页面背景 | `#f0f2f5` | Ant Design 默认灰背景 |
| 卡片背景 | `#ffffff` | 白色卡片 |
| 主色 | `#1890ff` | Ant Design 蓝色 |
| 成功色 | `#52c41a` | 绿色 |
| 警告色 | `#faad14` | 橙色 |
| 错误色 | `#ff4d4f` | 红色 |
| 主标题 | `#1f1f1f` | 深灰 |
| 次要文字 | `#666666` | 中灰 |

### 字体规范

| 元素 | 字号 | 字重 |
|------|------|------|
| 页面标题 | 24px | 默认 |
| 统计数值 | 28px | 600 (semi-bold) |
| 统计标签 | 14px | 默认 |
| 表格内容 | 14px | 默认 |

### 尺寸规范

| 元素 | 尺寸 |
|------|------|
| 最大内容宽度 | 1200px |
| 卡片内边距 | 24px |
| 卡片圆角 | 8px |
| 卡片阴影 | `0 1px 2px rgba(0,0,0,0.03)` |
| 统计卡片间距 | 16px |
| 页面内边距 | 24px |

---

## 技术实现

### 依赖

- React 18（Ant Design 5 内置）
- Ant Design 5（antd.min.js CDN）
- Day.js（日期处理）

### 关键组件

| 组件 | Ant Design 组件 | 说明 |
|------|----------------|------|
| 搜索表单 | `Form` + `Input` + `Select` + `RangePicker` | inline 布局 |
| 操作按钮 | `Button` + `Space` | 查询/重置/导出 |
| 数据表格 | `Table` | 分页，行 key=id |
| 状态标签 | `Tag` | 颜色映射 |

### 状态标签映射

```javascript
const statusMap = {
  completed: { color: 'success', text: '已完成' },
  pending:   { color: 'warning', text: '待处理' },
  cancelled: { color: 'error',   text: '已取消' }
};
```

---

## 开发清单

### 前端任务

- [ ] 使用 React + Ant Design 5 实现页面组件
- [ ] 对接 `/api/report/query` 查询接口
- [ ] 对接 `/api/report/stats` 统计接口
- [ ] 实现分页功能（前端/后端分页）
- [ ] 实现导出 Excel 功能（`/api/report/export`）
- [ ] 响应式适配（移动端表单垂直排列）
- [ ] 加载状态（loading skeleton）
- [ ] 空数据状态（empty）

### 后端任务

- [ ] 实现报表查询 API（分页 + 筛选）
- [ ] 实现统计汇总 API
- [ ] 实现 Excel 导出（Apache POI / EasyExcel）
- [ ] 添加查询权限控制
- [ ] 添加查询日志审计
