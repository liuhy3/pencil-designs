# 全国网络监控大屏 - 开发规格文档

> 生成时间：2026-03-26 21:30
> 设计风格：科技感数据可视化
> 原型链接：待部署

---

## 📋 页面概述

**页面名称**：全国网络监控大屏
**功能描述**：实时展示全国网络节点状态、流量趋势、告警信息的数据可视化大屏
**设计风格**：科技感深色主题
**核心特性**：中国地图 + 城市辐射动画

---

## 🎨 页面结构

```
全国网络监控大屏 (1920×1080)
├── 头部区域 (header)
│   ├── Logo
│   ├── 标题：全国网络监控大屏
│   ├── 统计数据
│   │   ├── 节点总数
│   │   ├── 在线率
│   │   ├── 总带宽
│   │   └── 告警数
│   └── 当前时间
├── 左侧面板 (320px)
│   ├── 核心节点状态
│   │   ├── 北京核心节点
│   │   ├── 西安核心节点
│   │   ├── 济南核心节点
│   │   └── 天津核心节点
│   └── 网络流量趋势图
├── 中间地图区域
│   └── 中国地图 + 城市辐射动画
│       ├── 北京（核心节点，红色）
│       ├── 西安、济南、天津（二级节点，绿色）
│       └── 辐射连线（带流动动画）
└── 右侧面板 (320px)
    ├── 实时告警列表
    ├── 城市流量排名
    ├── 数据统计卡片
    └── 带宽分布饼图
```

---

## 🔌 API 接口定义

### 1. 获取节点状态列表

```http
GET /api/nodes/status
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "nodes": [
      {
        "id": "node-bj",
        "name": "北京核心节点",
        "status": "online",
        "cpu": 45,
        "memory": 62,
        "bandwidth": 856,
        "latency": 2
      },
      {
        "id": "node-xa",
        "name": "西安核心节点",
        "status": "online",
        "cpu": 38,
        "memory": 55,
        "bandwidth": 624,
        "latency": 8
      },
      {
        "id": "node-jn",
        "name": "济南核心节点",
        "status": "warning",
        "cpu": 78,
        "memory": 85,
        "bandwidth": 512,
        "latency": 5
      },
      {
        "id": "node-tj",
        "name": "天津核心节点",
        "status": "online",
        "cpu": 32,
        "memory": 48,
        "bandwidth": 428,
        "latency": 3
      }
    ]
  }
}
```

---

### 2. 获取统计数据

```http
GET /api/stats/overview
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "totalNodes": 1286,
    "onlineRate": 98.6,
    "totalBandwidth": "2.4TB",
    "alertCount": 12,
    "availability": 99.9
  }
}
```

---

### 3. 获取告警列表

```http
GET /api/alerts?limit=10
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "alerts": [
      {
        "id": "alert-001",
        "level": "critical",
        "title": "济南节点CPU使用率过高",
        "nodeId": "node-jn",
        "timestamp": "2026-03-26T21:25:18Z"
      },
      {
        "id": "alert-002",
        "level": "warning",
        "title": "西安节点内存使用率超过80%",
        "nodeId": "node-xa",
        "timestamp": "2026-03-26T21:18:42Z"
      }
    ]
  }
}
```

---

### 4. 获取城市流量排名

```http
GET /api/traffic/ranking
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "ranking": [
      { "city": "北京", "bandwidth": 856, "change": 12 },
      { "city": "西安", "bandwidth": 624, "change": 8 },
      { "city": "济南", "bandwidth": 512, "change": -3 },
      { "city": "天津", "bandwidth": 428, "change": 5 }
    ]
  }
}
```

---

### 5. 获取网络拓扑数据

```http
GET /api/topology/lines
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "lines": [
      { "from": "北京", "to": "西安", "value": 85 },
      { "from": "北京", "to": "济南", "value": 72 },
      { "from": "北京", "to": "天津", "value": 95 },
      { "from": "北京", "to": "上海", "value": 68 },
      { "from": "北京", "to": "广州", "value": 54 },
      { "from": "西安", "to": "成都", "value": 45 },
      { "from": "济南", "to": "杭州", "value": 38 }
    ]
  }
}
```

---

## 📊 数据结构定义

### NodeStatus 节点状态

```typescript
interface NodeStatus {
  id: string;
  name: string;
  status: 'online' | 'warning' | 'offline';
  cpu: number;       // CPU使用率 0-100
  memory: number;    // 内存使用率 0-100
  bandwidth: number; // 带宽 Gbps
  latency: number;   // 延迟 ms
}
```

### Alert 告警信息

```typescript
interface Alert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  title: string;
  nodeId?: string;
  timestamp: string;
}
```

### TrafficRanking 流量排名

```typescript
interface TrafficRanking {
  city: string;
  bandwidth: number;  // Gbps
  change: number;     // 变化百分比，正数上升，负数下降
}
```

---

## 🎨 设计规范

### 颜色变量

```css
:root {
  /* 背景色 */
  --bg-primary: #0a1628;
  --bg-secondary: #1a2a4a;
  --bg-card: rgba(0, 50, 100, 0.3);
  
  /* 主色 */
  --color-primary: #00d4ff;
  --color-secondary: #0066ff;
  
  /* 状态色 */
  --color-online: #00ff88;
  --color-warning: #ffaa00;
  --color-critical: #ff4444;
  
  /* 边框 */
  --border-color: rgba(0, 180, 255, 0.2);
  --border-highlight: rgba(0, 180, 255, 0.3);
}
```

### 字体规范

| 元素 | 字号 | 字重 | 颜色 |
|------|------|------|------|
| 标题 | 28px | bold | 渐变色 |
| 面板标题 | 16px | bold | #00d4ff |
| 数值 | 32px | bold | #00d4ff |
| 正文 | 14px | normal | #fff |
| 辅助文字 | 12px | normal | rgba(255,255,255,0.6) |

---

## 🔧 技术实现

### ECharts 地图配置

```javascript
// 核心：map + lines + effectScatter
series: [
  { type: 'map', map: 'china' },
  { type: 'lines', effect: { show: true } },
  { type: 'effectScatter', rippleEffect: { scale: 4 } }
]
```

### 数据更新频率

| 数据 | 更新频率 |
|------|----------|
| 节点状态 | 5秒 |
| 统计数据 | 5秒 |
| 告警列表 | 10秒 |
| 流量趋势 | 1分钟 |

---

## ✅ 前端开发清单

### 技术栈
- [ ] ECharts 5.x（地图和图表）
- [ ] CSS Grid 布局
- [ ] WebSocket（实时数据推送）

### 功能实现
- [ ] 中国地图渲染
- [ ] 城市节点标记
- [ ] 辐射线动画
- [ ] 节点状态卡片
- [ ] 告警列表
- [ ] 流量趋势图
- [ ] 实时数据更新
- [ ] 响应式布局

---

## ✅ 后端开发清单

### 接口
- [ ] GET /api/nodes/status
- [ ] GET /api/stats/overview
- [ ] GET /api/alerts
- [ ] GET /api/traffic/ranking
- [ ] GET /api/topology/lines
- [ ] WebSocket /ws/realtime

### 数据采集
- [ ] 节点心跳检测
- [ ] CPU/内存监控
- [ ] 带宽统计
- [ ] 告警推送

---

## 📁 文件清单

| 文件 | 路径 | 说明 |
|------|------|------|
| 设计数据 | design.op | OpenPencil 设计文件 |
| HTML 原型 | index.html | 可交互原型 |
| 规格文档 | spec.md | 本文档 |

---

*生成时间：2026-03-26 21:30*