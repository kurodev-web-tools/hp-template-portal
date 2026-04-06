param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$CliArgs
)

$ErrorActionPreference = 'Stop'

$npx = Get-Command npx -ErrorAction SilentlyContinue
if (-not $npx) {
    Write-Error "npx が見つかりません。Node.js と npm をインストールしてください。"
    exit 1
}

& $npx.Source --yes --package @playwright/cli playwright-cli @CliArgs
exit $LASTEXITCODE
