#!/usr/bin/env python3
import os
import subprocess
import time
import urllib.request
import urllib.error

def generate_screenshots():
    os.makedirs("screenshots", exist_ok=True)
    
    # Start python http server in background
    server_process = subprocess.Popen(
        ["python3", "-m", "http.server", "8099"],
        cwd="app",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    # Wait for server to start
    time.sleep(2)
    
    chrome_path = "/root/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome"
    shots = [
        ("01-cover.png", "http://localhost:8099/?shot=cover"),
        ("02-editor.png", "http://localhost:8099/?shot=editor"),
        ("03-caption.png", "http://localhost:8099/?shot=caption"),
        ("04-export.png", "http://localhost:8099/?shot=export")
    ]
    
    for filename, url in shots:
        out_path = os.path.join("screenshots", filename)
        cmd = [
            chrome_path,
            "--headless=new",
            "--no-sandbox",
            "--hide-scrollbars",
            "--window-size=1280,720",
            "--virtual-time-budget=5000",
            f"--screenshot={out_path}",
            url
        ]
        print(f"Capturing {filename} from {url}...")
        subprocess.run(cmd, check=True)
        time.sleep(1.5)
        
        if os.path.exists(out_path):
            size = os.path.getsize(out_path)
            print(f"{filename}: {size} bytes ({size/1024:.1f} KiB)")
            assert size <= 262144, f"{filename} exceeds 256KiB limit!"
        else:
            raise RuntimeError(f"Failed to generate {filename}")

    # Terminate server
    server_process.terminate()
    server_process.wait()
    print("All 4 screenshots captured and verified successfully.")

if __name__ == "__main__":
    generate_screenshots()
