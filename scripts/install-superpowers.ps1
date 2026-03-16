$ErrorActionPreference = "Stop"

$repoUrl = "https://github.com/obra/superpowers.git"
$repoPath = "C:\Users\taka\.codex\superpowers"
$skillsRoot = "C:\Users\taka\.agents\skills"
$linkPath = Join-Path $skillsRoot "superpowers"

if (Test-Path $repoPath) {
    throw "Already exists: $repoPath"
}

if (Test-Path $linkPath) {
    throw "Already exists: $linkPath"
}

New-Item -ItemType Directory -Force -Path $skillsRoot | Out-Null

git clone $repoUrl $repoPath

New-Item -ItemType Junction -Path $linkPath -Target $repoPath | Out-Null

Write-Host "Installed superpowers."
Write-Host "Restart Codex to pick up new skills."
