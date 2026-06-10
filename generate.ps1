$ErrorActionPreference = "SilentlyContinue"
$assetsDir = (Get-Location).Path
$files = Get-ChildItem -Path $assetsDir -File -Recurse -Exclude ".git",".github","scripts" | Where-Object { $_.FullName -notmatch '\\.git\\' } | Select-Object @{Name="path";Expression={$_.FullName.Substring($assetsDir.Length + 1).Replace('\','/')}}, @{Name="type";Expression={"blob"}}, @{Name="size";Expression={$_.Length}}
$json = @{ tree = $files } | ConvertTo-Json -Depth 10
$json | Out-File "assets_index.json" -Encoding utf8
Write-Host "JSON generated successfully."
