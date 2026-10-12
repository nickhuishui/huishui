---
title: "Git 与 Obsidian 同步的实用知识"
description: ""
pubDate: "2026-10-12"
---

# Git 与 Obsidian 同步的实用知识

## 先理解三个概念

### 工作区

电脑上实际存在的文件，例如 `D:/markdown_ob/2026/` 和 `D:/markdown_ob/assets/onenote-2026/`。

### Git 跟踪区

Git 已经记录、会参与提交的文件。一个文件是否存在于电脑上，不等于它是否被 Git 跟踪。

### 远程仓库

服务器上的仓库。本次笔记库的 HTTPS 远程地址是：

```text
https://github.com/nickhuishui/markdown_ob.git
```

仓库名是 `markdown_ob`，远程名称通常是 `origin`。

## `.gitignore` 到底做什么

`.gitignore` 主要用于阻止“尚未被 Git 跟踪”的文件进入后续提交。例如：

```gitignore
/2026/
/assets/onenote-2026/
```

这表示：在当前仓库根目录下，忽略 `2026` 目录和 `assets/onenote-2026` 目录。

但有一个关键限制：如果文件以前已经被 Git 跟踪，后来才写入 `.gitignore`，`.gitignore` 不会自动取消跟踪，也不会撤销历史提交。

可用下面的命令检查某个路径是否被忽略：

```bash
git check-ignore -v 2026/9月21日.md
```

可用下面的命令检查路径是否仍被 Git 跟踪：

```bash
git ls-files -- 2026/ assets/onenote-2026/
```

没有输出，通常表示当前版本没有跟踪这些路径；但仍要结合 `git status` 判断是否存在待提交变化。

## 为什么移动文件会被 push

假设原来 Git 跟踪了 `2026/a.md`：

1. 把 `2026/` 移到临时文件夹；
2. Git 发现 `2026/a.md` 在工作区消失；
3. Git 将它判断为“删除”；
4. Obsidian Git 自动提交删除；
5. 自动 push 到远程仓库。

这时即使已经写了 `.gitignore`，也无法阻止这次删除提交，因为被删除的文件原本已经属于 Git 的跟踪范围。

本次实际发生的关键问题就是：移动文件时没有先暂停 Obsidian Git 的自动同步，导致远程出现了删除提交 `ff194db`。

## `.gitignore` 不能做什么

`.gitignore` 不能：

- 删除远程仓库已有的文件；
- 修改已经提交的历史；
- 阻止已跟踪文件被识别为删除；
- 阻止 Obsidian Git 对其他未忽略文件执行自动提交和 push；
- 恢复被提交删除的内容。

如果目标是让一批已跟踪文件以后不再进入 Git，通常需要先停止自动同步，再执行取消跟踪操作，并提交这次变更。取消跟踪不会删除电脑上的文件，但会改变远程仓库内容，因此操作前必须确认范围。

## 已经被跟踪的文件如何解除跟踪

先在仓库根目录确认路径：

```bash
git ls-files -- 2026/ assets/onenote-2026/
```

如果有输出，说明这些文件仍在 Git 的跟踪区。要保留电脑上的文件、只取消 Git 跟踪，可以使用：

```bash
git rm --cached -r -- 2026/ assets/onenote-2026/
git status --short
git commit -m "chore: stop tracking local-only OneNote export"
git push origin main
```

这里的 `--cached` 很重要：它不会删除工作区文件，只会把文件从 Git 的索引中移除。`git push` 后，远程仓库也会删除这些文件的当前版本，但本地文件仍然存在；旧版本仍可能留在 Git 历史中。

如果只想解除单个文件的跟踪：

```bash
git rm --cached -- path/to/file.md
```

执行前必须确认目录范围。不要对整个仓库使用宽泛的 `git rm --cached -r .`，也不要把 `git rm --cached` 和普通 `git rm` 混淆：后者会同时删除工作区文件。

如果这些路径已经不在 `git ls-files` 输出中，只需保留 `.gitignore`，不要重复执行 `git rm --cached`。

## 本次笔记库的安全移动流程

### 移动到临时目录前

1. 暂停 Obsidian Git 的自动备份、自动提交和自动 push；
2. 关闭可能正在写入仓库的 Obsidian 窗口或同步任务；
3. 确认 `git status` 没有不需要提交的变化。

本次实际操作中，曾经执行过类似下面的检查和移动操作：

```powershell
git status --short --ignored
git check-ignore -v 2026/9月21日.md
git ls-files -- 2026/ assets/onenote-2026/
Move-Item -LiteralPath 'D:\markdown_ob\2026' -Destination 'D:\Desktop\临时\2026'
Move-Item -LiteralPath 'D:\markdown_ob\assets\onenote-2026' -Destination 'D:\Desktop\临时\assets\onenote-2026'
```

后来又用 `Move-Item` 把两个目录移回 `D:\markdown_ob`。检查结果显示目标目录已被 `.gitignore` 匹配，且 `git ls-files` 对这两个目录没有输出。

### 移动和手机传输期间

1. 把指定目录移动到临时目录；
2. 复制整个 `markdown_ob` 到手机，或按明确的排除清单复制；
3. 不要在文件缺失时打开自动 Git 同步。

### 移回电脑后

1. 把目录移回原位置；
2. 检查图片和 Markdown 是否存在；
3. 检查 `.gitignore` 是否匹配这些目录；
4. 用 `git ls-files` 确认这些目录没有被跟踪；
5. 最后再恢复自动同步。

完整的推荐操作顺序如下：

1. 在 Obsidian Git 设置中暂停自动备份、自动提交和自动 push。
2. 在仓库根目录执行 `git status --short`，确认没有意外修改。
3. 用资源管理器或 PowerShell 将本地专属目录移到临时目录。
4. 检查 `git status --short --ignored`，确认没有产生待提交的删除记录；如果出现 `D`，不要提交，先恢复目录或继续保持同步暂停。
5. 通过数据线复制需要的内容到手机。
6. 将目录移回原位置，检查 Markdown、图片和链接是否存在。
7. 执行 `git check-ignore -v` 和 `git ls-files`，确认目录被忽略且没有重新进入跟踪区。
8. 确认无误后再恢复 Obsidian Git 自动同步。

关键点是：移动期间不能让自动同步运行。否则 Git 会把“暂时移走”误认为永久删除，并自动提交、push 删除记录。

## 大批量文件只保留在电脑和手机、不进入 Git

最安全的原则是：**不要为了复制到手机而把文件从仓库中移走，改用复制；先让 Git 永久忽略这些路径。**

### 情况 A：这些文件从未被 Git 跟踪

例如要让整个 `2026/` 和 `assets/onenote-2026/` 只存在于电脑和手机：

1. 暂停 Obsidian Git 自动提交和自动 push。
2. 在仓库根目录编辑 `.gitignore`：

   ```gitignore
   /2026/
   /assets/onenote-2026/
   ```

3. 检查规则：

   ```bash
   git check-ignore -v 2026/示例.md
   git check-ignore -v assets/onenote-2026/示例.png
   ```

4. 确认跟踪区没有这些路径：

   ```bash
   git ls-files -- 2026/ assets/onenote-2026/
   ```

   没有输出才表示当前版本没有跟踪它们。

5. 只提交 `.gitignore`：

   ```bash
   git add .gitignore
   git commit -m "chore: ignore local-only OneNote files"
   git push origin main
   ```

6. 以后直接复制整个仓库到手机；Git 会忽略这些目录，但复制操作仍会把它们带到手机。

### 情况 B：这些文件已经被 Git 跟踪

先写入 `.gitignore`，再取消跟踪：

```bash
git rm --cached -r -- 2026/ assets/onenote-2026/
git add .gitignore
git commit -m "chore: make OneNote export local-only"
git push origin main
```

其中 `git rm --cached` 只从 Git 索引移除，不删除电脑文件；提交并 push 后，这些文件会从远程当前版本消失，但旧版本仍可能存在于历史中。执行前必须确认你确实希望远程不再保存它们。

### 手机复制时应使用“复制”，不要使用“移动”

推荐先生成临时副本：

```powershell
robocopy 'D:\markdown_ob' 'D:\Desktop\临时\markdown_ob' /E /COPY:DAT /R:2 /W:2 /XD '.git'
```

然后把 `D:\Desktop\临时\markdown_ob` 复制到手机。原仓库中的目录始终存在，Git 不会看到删除；手机仍能得到包括本地专属目录在内的笔记副本。

如果必须移动而不是复制，必须先暂停自动同步，移动期间确认 `git status` 没有 `D`，传输结束后移回并验证，再恢复同步。

### 大批量操作的验证清单

复制前：

```bash
git status --short
git check-ignore -v 2026/示例.md
git ls-files -- 2026/ assets/onenote-2026/
```

恢复同步前：

```bash
git status --short --ignored
git diff --stat
git log -1 --oneline
```

只有在目标目录显示为 ignored、`git ls-files` 没有输出、`git status` 没有 `D` 或异常 `??` 时，才恢复自动同步。

### 不要采用的做法

- 不要先移动大目录、让 Obsidian Git 自动同步、再期待 `.gitignore` 修复删除提交；
- 不要用 `git add -f` 添加本地专属目录；
- 不要在不确认远程影响的情况下执行 `git rm --cached` 后 push；
- 不要用强制 push 覆盖远程来修复同步问题。

## 如何判断“这次是否会 push”

在恢复自动同步前运行：

```bash
git status --short --ignored
git check-ignore -v 2026/9月21日.md
git ls-files -- 2026/ assets/onenote-2026/
```

理想状态是：

- 目标文件出现在 ignored 列表；
- `git ls-files` 对目标目录没有输出；
- `git status` 没有目标目录的删除、修改或新增记录。

如果看到 `D`，说明 Git 正在记录删除；如果看到 `??`，说明文件尚未被忽略；如果目标路径已经在 `git ls-files` 中出现，说明它仍然被跟踪。

## 手机复制与 Git 同步的关系

用数据线复制文件本身不会自动 push。真正会 push 的是运行在电脑或手机上的 Git/Obsidian Git 同步插件。

如果手机上的 Obsidian Git 插件配置不完整，可能出现：

- Git author name/email 未设置；
- 手机端 Git 库版本或目录后端不兼容；
- 自动同步在文件尚未复制完整时启动；
- 手机端和电脑端同时修改同一文件。

因此“复制到手机”和“Git 同步”应当视为两套独立流程。对于只想保存在电脑和手机、但不想上传远程的内容，使用 `.gitignore` 并确保它们从未被 Git 跟踪，比依赖移动目录更可靠。

## `.git/index` 是什么，为什么有时可以删除

`.git/index` 是 Git 的本地索引，也叫暂存区文件。它记录工作区文件与当前提交之间的状态，供 `git status`、`git add`、`git commit` 等命令使用。它不是提交历史，也不是远程仓库本身。

因此，在工作区文件和提交历史都还在时，索引通常可以重新生成。例如桌面 Git 中可以这样处理：

```bash
Copy-Item .git/index .git/index.backup
Remove-Item .git/index
git reset --mixed HEAD
git status
```

删除索引的代价是：原来暂存区中尚未提交的“已暂存”状态会丢失；正在运行 Git 或同步插件时删除还可能造成更严重的状态冲突。所以它不是常规清理步骤，必须先暂停同步并做好备份。

## 手机出现 `Unsupported dircache version: 3` 的原因

手机截图中的错误来自手机端的 JavaScript Git 实现（常见于 isomorphic-git）：

```text
Unsupported dircache version: 3
```

其中 `dircache` 指的就是 Git 索引/目录缓存。通常原因是：电脑端 Git 生成了手机端库不支持的 `.git/index` 版本，或者手机端保留了一个损坏、半复制完成的索引文件。它不是 Markdown 内容错误，也不是图片导致的。

同一时间出现的：

```text
Git author name and email are not set
```

是另一个独立问题，表示手机端 Git 没有配置提交身份。

### 下次遇到 dircache 错误的处理顺序

1. 先停止手机端和电脑端的自动同步，不要反复点击同步。
2. 确认电脑端仓库没有未提交的重要修改，并保留一份 `.git` 目录备份。
3. 在手机端关闭该仓库标签页或插件任务。
4. 删除或重命名手机仓库里的 `.git/index`，只处理 `index`，不要删除整个 `.git` 目录。
5. 重新打开仓库，让手机 Git 根据当前 `HEAD` 和工作区重建索引；如果插件不支持重建，就删除手机端仓库后从电脑重新复制一份完整仓库。
6. 在手机端 Git 设置中填写 author name 和 email。
7. 先执行一次手动 pull/status，确认没有冲突后，再开启自动同步。

如果手机端仍然报同样错误，最稳妥的办法是升级手机端 Git 插件，或重新复制一个完整且干净的仓库；不要在错误持续时强制 push。

## 重要结论

1. `.gitignore` 是“未来忽略规则”，不是历史清理工具；
2. 自动同步可能在移动文件的瞬间提交删除；
3. 远程仓库记录的是提交历史，不等于当前电脑文件夹的完整镜像；
4. `origin` 是远程别名，HTTPS URL 才是远程仓库地址；
5. 任何取消跟踪、恢复远程文件或重写历史的操作，都应先确认范围，不能直接强制 push。
