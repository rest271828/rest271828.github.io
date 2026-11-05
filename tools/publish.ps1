# 只发布明确列出的公开文件，不复制申请资料，不强制覆盖 Git 历史。
$ErrorActionPreference = "Stop"
$sourceRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$publicFiles = @(Get-Content -LiteralPath (Join-Path $PSScriptRoot "public-files.json") -Encoding UTF8 -Raw | ConvertFrom-Json)
$sourceFiles = @(".gitignore", "EDITING.md", "tools/public-files.json", "tools/check-site.cjs", "tools/publish.ps1")

node (Join-Path $PSScriptRoot "check-site.cjs")
if ($LASTEXITCODE -ne 0) { throw "内容检查失败，停止发布。" }

$checkout = Join-Path ([IO.Path]::GetTempPath()) ("rest271828-site-" + [guid]::NewGuid().ToString("N"))
git clone "https://github.com/rest271828/rest271828.github.io.git" $checkout
if ($LASTEXITCODE -ne 0) { throw "无法获取线上最新版本。" }

foreach ($file in ($publicFiles + $sourceFiles)) {
    $source = [IO.Path]::GetFullPath((Join-Path $sourceRoot $file))
    $target = [IO.Path]::GetFullPath((Join-Path $checkout $file))
    if (!$source.StartsWith($sourceRoot + [IO.Path]::DirectorySeparatorChar) -or
        !$target.StartsWith($checkout + [IO.Path]::DirectorySeparatorChar)) {
        throw "文件路径越界，停止发布。"
    }
    New-Item -ItemType Directory -Path (Split-Path $target -Parent) -Force | Out-Null
    Copy-Item -LiteralPath $source -Destination $target -Force
}

# 撤下旧的公开 CV 副本和不对应项目的配图；历史提交不在此处重写。
git -C $checkout rm --ignore-unmatch -- "files/cv.pdf" "assets/logos/eie.svg" "media/hope_jr/hopejr.png" "media/lekiwi/kiwi.webp" "media/so100/leader_follower.webp" "media/so101/so101.webp"
if ($LASTEXITCODE -ne 0) { throw "撤下旧资源失败。" }
$tracked = @(git -C $checkout ls-files)
if ($tracked | Where-Object { $_ -match '\.(pdf|docx?|zip)$' }) {
    throw "仓库当前版本仍有未审核文档，请人工检查后发布。"
}
git -C $checkout add -- @publicFiles @sourceFiles
if ($LASTEXITCODE -ne 0) { throw "无法暂存公开文件。" }
git -C $checkout diff --cached --quiet
if ($LASTEXITCODE -eq 0) { Write-Host "没有需要发布的新改动。"; exit 0 }
if ($LASTEXITCODE -ne 1) { throw "无法检查待发布改动。" }
git -C $checkout -c user.name=rest271828 -c user.email=rest271828@users.noreply.github.com commit -m "Update academic portfolio and privacy-safe public CV"
if ($LASTEXITCODE -ne 0) { throw "提交失败。" }
git -C $checkout push origin main
if ($LASTEXITCODE -ne 0) { throw "推送失败；未强制覆盖远端。" }
Write-Host "已推送。GitHub Pages 发布完成后访问 https://rest271828.github.io/"
Write-Host "同步记录位于 $checkout"
