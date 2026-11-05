# 个人主页维护说明

项目位置：本文件所在文件夹。它与 LeRobot 项目相互独立。

## 最常修改的文件

- `site-data.js`：姓名、介绍、教育、日期、研究、项目、技能、奖项和邮箱。英文在 `en`，中文在 `zh`。修改时同步维护两种语言。
- `styles.css`：字体、深灰背景、双栏布局和章节滑动效果。首次打开是深灰和英文，访客可自行切换。首页设计参考 [Academic Pages](https://academicpages.github.io/)。
- `index.html`：资料侧栏和主页章节顺序。侧栏内容在 `site-data.js` 的 `profile` 中维护。
- `assets/Qidong-Sun-CV.pdf`：保留原 Overleaf 排版的一页公开简历。顶部和侧栏直接下载此文件。
- `assets/logos/`：重庆大学圆形校徽和 SUTD 校标；不展示横版重庆大学校名图或院徽。
- 头像暂不显示。收到确认可公开的照片后，将图片放入 `assets/`，更新 `site-data.js` 的 `avatar` 与发布清单。
- `assets/projects/`：允许公开的真实项目截图或演示。图片路径填入项目的 `image`，没有则留空。

保存后刷新本地网页即可查看变化。VS Code 的 Live Server 可以提供保存后自动刷新。
线上版本需要将检查后的修改提交到 GitHub，等待 Pages 发布，不能靠本地保存自动更新。

## 隐私边界

GitHub Pages 的页面、脚本、图片、下载文件和公开仓库历史均可能被任何人访问。
隐藏按钮、注释掉代码或加入 robots.txt 都不能保护已上传的文件。

- 当前仅公开姓名、学校、研究项目、成绩概述、奖项名称、GitHub 和已授权的邮箱，不额外公开手机号。
- 不要把申请文件夹整体复制到这里，不上传护照、身份证、成绩单原件、邀请函、推荐信、签名、二维码或证书编号。
- 不要在代码注释中记录敏感值。不要放入 API Key、Token 或申请系统密码。
- 公开简历只使用审核后的 `assets/Qidong-Sun-CV.pdf`。更新时应先脱敏并检查，再更新 `tools/check-site.cjs` 中记录的 SHA-256；不要直接用申请原件覆盖。
- 删除当前版本的文件不能清除旧 Git 提交、他人下载副本或搜索缓存。历史清理属于另一次需确认的操作。

## 当前资料依据

2026 年 11 月提供的最新 CV。SUTD 访问时间为 2026.09–2026.12；
访问结束后需把“目前访问”改为已完成。Go2 视觉策略蒸馏与部署不写作已完成。
竞赛证书为图片时请人工确认 MCM/ICM 组别后再细化名称。

## 发布

运行 `node tools/check-site.cjs`，通过内容、文件和隐私检查后再发布。
在本文件夹打开 PowerShell，运行 `powershell -ExecutionPolicy Bypass -File tools/publish.ps1` 可按白名单推送。
也可以直接在 PowerShell 中运行 `./tools/publish.ps1`（取决于电脑的脚本执行策略）。
发布只使用 `tools/public-files.json` 中列出的文件，不执行无差别的全目录上传。
旧的 `files/cv.pdf` 不属于新的发布范围；发布脚本会从网站当前分支撤下它。
