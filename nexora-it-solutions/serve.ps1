param(
    [int]$Port = 8080
)

$HostUri = "http://localhost:$Port/"
$RootPath = $PSScriptRoot

$MimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".mjs"  = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".pdf"  = "application/pdf"
    ".ico"  = "image/x-icon"
    ".woff2"= "font/woff2"
    ".woff" = "font/woff"
    ".ttf"  = "font/ttf"
}

$Listener = New-Object System.Net.HttpListener
$Listener.Prefixes.Add($HostUri)

try {
    $Listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  D-TECH COMPUTER SYSTEM - LOCAL DEV SERVER RUNNING" -ForegroundColor White
    Write-Host "  Local URL: $HostUri" -ForegroundColor Green
    Write-Host "  Serving files from: $RootPath" -ForegroundColor Gray
    Write-Host "  Press Ctrl+C in this console to stop the server." -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Cyan

    while ($Listener.IsListening) {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        $UrlPath = $Request.Url.LocalPath
        if ($UrlPath -eq "/" -or [string]::IsNullOrWhiteSpace($UrlPath)) {
            $UrlPath = "/index.html"
        }

        # Clean path and prevent directory traversal
        $CleanPath = $UrlPath.TrimStart("/").Replace("/", "\")
        $FilePath = Join-Path $RootPath $CleanPath

        # Security check: ensure file is inside RootPath
        $ResolvedPath = [System.IO.Path]::GetFullPath($FilePath)
        $RootResolved = [System.IO.Path]::GetFullPath($RootPath)

        if (-not $ResolvedPath.StartsWith($RootResolved)) {
            $Response.StatusCode = 403
            $Buffer = [System.Text.Encoding]::UTF8.GetBytes("403 Forbidden")
            $Response.ContentLength64 = $Buffer.Length
            $Response.OutputStream.Write($Buffer, 0, $Buffer.Length)
            $Response.Close()
            continue
        }

        if (Test-Path $FilePath -PathType Leaf) {
            $Ext = [System.IO.Path]::GetExtension($FilePath).ToLower()
            $ContentType = $MimeTypes[$Ext]
            if (-not $ContentType) {
                $ContentType = "application/octet-stream"
            }

            $Response.ContentType = $ContentType
            $Response.AddHeader("Access-Control-Allow-Origin", "*")
            $Response.AddHeader("Cache-Control", "no-cache")

            $FileBytes = [System.IO.File]::ReadAllBytes($FilePath)
            $Response.ContentLength64 = $FileBytes.Length
            $Response.OutputStream.Write($FileBytes, 0, $FileBytes.Length)
            $Response.StatusCode = 200
        } else {
            $Response.StatusCode = 404
            $Buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $UrlPath")
            $Response.ContentLength64 = $Buffer.Length
            $Response.OutputStream.Write($Buffer, 0, $Buffer.Length)
        }

        $Response.Close()
    }
}
catch {
    Write-Host "Server error or terminated: $_" -ForegroundColor Red
}
finally {
    if ($Listener.IsListening) {
        $Listener.Stop()
    }
    $Listener.Close()
    Write-Host "Server stopped." -ForegroundColor Gray
}
