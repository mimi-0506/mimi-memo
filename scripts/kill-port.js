// scripts/kill-port.js
const { exec } = require("child_process");
const os = require("os");

const PORT = 5173;

if (os.platform() === "win32") {
  exec(
    `powershell -Command "Get-NetTCPConnection -LocalPort ${PORT} -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`,
    (err) => {
      if (err) {
        console.error("⚠️ 포트 종료 실패:", err.message);
      } else {
        console.log(`✅ ${PORT}번 포트 종료 완료 (Windows)`);
      }
    }
  );
} else {
  exec(
    `lsof -i tcp:${PORT} | grep LISTEN | awk '{print $2}' | xargs kill -9`,
    (err) => {
      if (err) {
        console.error("⚠️ 포트 종료 실패:", err.message);
      } else {
        console.log(`✅ ${PORT}번 포트 종료 완료 (macOS/Linux)`);
      }
    }
  );
}
