---
name: pontx-frankfurter
description: 使用 pontx-frankfurter CLI 搜索、查看和调用 API。 Frankfurter is a free, open-source currency data API that tracks reference exchange rates published by the European Central Bank. ## Features - No API keys required - No usage limits - Daily updates around 16:00 CET - Support for 31+ currencies - CORS-enabled for browser usage - Historical data available ## Data Source Exchange rates are sourced from the European Central Bank and other financial institutions.
version: 1.0.0
---

# pontx-frankfurter CLI SKILL

Frankfurter API

Frankfurter is a free, open-source currency data API that tracks reference exchange rates published by the European Central Bank.

## Features
- No API keys required
- No usage limits
- Daily updates around 16:00 CET
- Support for 31+ currencies
- CORS-enabled for browser usage
- Historical data available

## Data Source
Exchange rates are sourced from the European Central Bank and other financial institutions.


版本: 1.0.0

## Quick Start

```bash
# 安装 SDK（全局安装以使用 CLI）
npm install -g @pontx/frankfurter

# 搜索 API
pontx-frankfurter search <keyword>
```

## Core Workflows

### 1. API 发现与浏览

```bash
# 搜索 API
pontx-frankfurter search <keyword> [-m, --max <count>] [--remote]

# 列出所有 tags
pontx-frankfurter list tags

# 列出所有 API
pontx-frankfurter list apis [--tag <tag>]

# 列出所有 specs
pontx-frankfurter list
```

**示例**:
```bash
# 搜索包含 "user" 的 API
pontx-frankfurter search user

# 限制返回 3 条结果
pontx-frankfurter search user -m 3
```

### 2. API 详情查看

```bash
# 查看 API 详情（参数、请求体、响应等）
pontx-frankfurter show-api [<tagName>.]<apiName> [--remote]

# 查看 Schema 定义
pontx-frankfurter show-schema <schemaName> [--use-remote]
```

**示例**:
```bash
# 查看 API 详情
pontx-frankfurter show-api user.getUserInfo

# 查看 Schema
pontx-frankfurter show-schema User
```

**API Path 格式**: `tag.apiName`
示例: `pet.getPetById`

### 3. 代码生成

```bash
pontx-frankfurter gen <api-path> [options]

Options:
  --case <case>        代码模板名称 (默认: request)
                       常见值: request (基础请求), reactHooks (React Hooks)
  --params <json>      请求参数，JSON 格式字符串
  --body <json>        请求体参数，JSON 格式
  --use-remote         使用远程元数据
```

**示例**:
```bash
# 生成基础请求代码
pontx-frankfurter gen user.getUserInfo

# 生成 React Hooks 代码
pontx-frankfurter gen user.getUserInfo --case reactHooks

# 带参数生成代码
pontx-frankfurter gen user.getUserInfo --params '{"id": 123}'

# 查看可用模板
pontx-frankfurter list-templates
```

**SDK 集成示例**:
```typescript
// 使用 gen 命令生成的代码
import { request } from './generated/api';

// 调用 API
const result = await request.getUserInfo({ id: 123 });
```

### 4. API 调用（CLI Call）

⚠️ **安全警告**: 实际调用会产生**真实的副作用**（创建、更新、删除数据）。

**推荐安全流程**:
1. 使用 `show-api` 确认 API 参数和行为
2. 使用 `call --dry-run` 预览请求内容
3. 确认无误后执行实际调用

```bash
pontx-frankfurter call <api-path> [args...] [options]

Options:
  -e, --env <env>           环境名称
  -H, --header <header...>  额外的 HTTP 头
  -o, --output <file>       输出到文件
  --debug                   调试模式
  --dry-run                 仅显示请求信息，不发送请求
  --use-remote              使用远程元数据
  -q, --query <jmespath>    使用 JMESPath 查询响应
```

**参数格式**:
- 命名参数: `--param-name value`
- 请求体: `--body '{"key": "value"}'`

**示例**:
```bash
# Step 1: 查看 API 详情
pontx-frankfurter show-api user.getUserInfo

# Step 2: 预览请求（不实际发送）
pontx-frankfurter call user.getUserInfo --id 123 --dry-run

# Step 3: 实际调用
pontx-frankfurter call user.getUserInfo --id 123

# 使用 JMESPath 查询结果
pontx-frankfurter call user.getUserInfo --id 123 -q "data.name"

# 保存结果到文件
pontx-frankfurter call user.getUserInfo --id 123 -o result.json

# 切换环境
pontx-frankfurter call user.getUserInfo --id 123 -e production
```

### 5. Shell 自动补全

```bash
# 安装自动补全（自动检测 shell 类型）
pontx-frankfurter completion install

# 手动指定 shell
pontx-frankfurter completion install --shell zsh

# 生成补全脚本
pontx-frankfurter completion generate

# 卸载补全
pontx-frankfurter completion uninstall
```

### 6. Pontx 统一工具

`pontx` 是跨所有 API 规范的统一管理工具，而 `pontx-frankfurter` 是针对单个 spec 的专用 CLI。

| 特性 | pontx | pontx-frankfurter |
|------|-------|-------------|
| 管理范围 | 多个 API spec | 单个 API spec |
| API 路径格式 | `spec.tag.api` | `tag.api` |
| 代码生成 | 批量生成 SDK | 单个 API 代码片段 |
| 配置文件 | `pontx.config.ts` | 内置 `api-lock.json` |

如果需要管理多个 API 数据源或批量生成 SDK 代码，推荐使用 `pontx`。

## Safety & Best Practices

### API 调用安全
- ✅ **总是先用 `--dry-run`**: 预览请求内容，避免误操作
- ✅ **检查环境**: 使用 `--env` 确认目标环境（dev/prod）
- ✅ **验证参数**: 使用 `show-api` 查看参数要求
- ⚠️ **小心副作用**: DELETE/PUT/POST 操作会修改数据
- ⚠️ **保护凭证**: 使用环境变量存储 token，不要硬编码

### 代码生成
- 使用 `list-templates` 查看可用模板
- 生成的代码可直接在项目中使用
- 不要手动修改生成的代码（会被覆盖）

### 调试技巧
- 使用 `--debug` 查看详细日志
- 使用 `call --dry-run` 排查请求问题

## 命令速查表

| 命令 | 说明 |
|------|------|
| `search <keyword>` | 搜索 API |
| `show-api <path>` | 查看 API 详情 |
| `show-schema <path>` | 查看 Schema 定义 |
| `gen <path>` | 生成 API 调用代码 |
| `call <path>` | 调用 API（⚠️ 有副作用） |
| `list` | 列出 specs |
| `list tags` | 列出所有 tags |
| `list apis` | 列出所有 API |
| `list-templates` | 列出代码模板 |
| `completion install` | 安装 Shell 补全 |

## 相关资源

- NPM: https://www.npmjs.com/package/@pontx/frankfurter
- Hub: https://pontx-hub.vercel.app/en/sdks/frankfurter


- 外部文档: [Official Frankfurter API Documentation](https://frankfurter.dev)

---

*Generated by `pontx-frankfurter skill`*
