#!/bin/bash
# 自动扫描页面并更新 index.html 中的页面列表

PAGES_DIR="/root/.openclaw/workspace/output/pencil-designs"
INDEX_FILE="$PAGES_DIR/index.html"

echo "🔍 扫描 HTML 文件..."

# 获取所有 HTML 文件（排除 index.html）
HTML_FILES=$(ls "$PAGES_DIR"/*.html 2>/dev/null | grep -v "index.html" | xargs -n1 basename | sort)

# 生成 JS 数组
JS_ARRAY="["
first=true
for file in $HTML_FILES; do
  if [ "$first" = true ]; then
    first=false
  else
    JS_ARRAY+=","
  fi
  JS_ARRAY+="'$file'"
done
JS_ARRAY+="]"

echo "📄 找到文件: $JS_ARRAY"

# 更新 index.html 中的 htmlFiles 数组
sed -i "s/const htmlFiles = \[.*\];/const htmlFiles = $JS_ARRAY;/" "$INDEX_FILE"

echo "✅ 已更新页面列表"

# 统计数量
COUNT=$(echo "$HTML_FILES" | wc -w)
echo "📊 总页面数: $COUNT"