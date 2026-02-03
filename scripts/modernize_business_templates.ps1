$templatesPath = "d:\hp-portal\public\templates\business"

# Get all index.html files in Business templates subdirectories
$files = Get-ChildItem -Path $templatesPath -Recurse -Filter "index.html"

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)"
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content

    # 1. Inject theme-business class into body
    # Logic: Replace 'class="' with 'class="theme-business ' inside the <body tag line
    # Note: Regex is safer to handle various attributes
    if ($content -notmatch "theme-business") {
        $content = $content -replace '(<body[^>]*class=")', '$1theme-business '
        # If body has no class attribute, add it (edge case, but good to handle)
        if ($content -notmatch '<body[^>]*class="') {
             $content = $content -replace '<body>', '<body class="theme-business">'
        }
    }

    # 2. Inject CSS Link
    # Logic: Add reference before the template's own style.css or assets/css/style.css
    # We want it to be BEFORE the template specific style so specific style wins overrides if needed,
    # BUT our business-base uses !important for layout to enforce modernization.
    # Actually, let's put it BEFORE the template style to respect specific overrides if they are strong specific.
    # Wait, the plan said "Inject CSS Link: Add ... before the template's own style.css".
    
    $cssLink = '    <link rel="stylesheet" href="../../../assets/css/business-base.css">'
    
    if ($content -notmatch "business-base.css") {
        # Try to find the line with the template specific style
        if ($content -match '(.*<link rel="stylesheet" href=".*style\.css">)') {
             $content = $content -replace '(\s*<link rel="stylesheet" href=".*style\.css">)', "`n$cssLink`n`$1"
        }
    }

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "  -> Updated" -ForegroundColor Green
    } else {
        Write-Host "  -> No changes needed" -ForegroundColor Yellow
    }
}
