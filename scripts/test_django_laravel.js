const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

function checkHttp(url, timeout = 3000) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, length: data.length }));
    });
    req.on('error', err => resolve({ error: err.message }));
    req.setTimeout(timeout, () => {
      req.abort();
      resolve({ error: 'timeout' });
    });
  });
}

(async () => {
  console.log('=== TESTING DJANGO & LARAVEL LOCAL RUNTIMES ===');

  // Test Django
  console.log('\n1. Testing Django manage.py runserver...');
  const pyExe = fs.existsSync('E:\\Portfolio-Django\\.venv\\Scripts\\python.exe') 
    ? 'E:\\Portfolio-Django\\.venv\\Scripts\\python.exe' 
    : 'C:\\Python313\\python.exe';
  
  const djangoProc = spawn(pyExe, ['manage.py', 'runserver', '127.0.0.1:8000'], { cwd: 'E:\\Portfolio-Django' });
  djangoProc.stdout.on('data', d => console.log('  [Django stdout]:', d.toString().trim()));
  djangoProc.stderr.on('data', d => console.log('  [Django stderr]:', d.toString().trim()));

  for (let i = 0; i < 6; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const res = await checkHttp('http://127.0.0.1:8000/');
    if (res.status === 200) {
      console.log('  Django HTTP response: 200 OK! Length:', res.length);
      break;
    }
  }
  djangoProc.kill();

  // Test Laravel
  console.log('\n2. Testing Laravel php artisan serve...');
  const phpExe = 'C:\\Users\\ASUS\\AppData\\Local\\Microsoft\\WinGet\\Packages\\PHP.PHP.8.4_Microsoft.Winget.Source_8wekyb3d8bbwe\\php.exe';
  const laravelProc = spawn(phpExe, ['artisan', 'serve', '--host=127.0.0.1', '--port=8001'], { cwd: 'E:\\Portfolio-Laravel' });
  laravelProc.stdout.on('data', d => console.log('  [Laravel stdout]:', d.toString().trim()));
  laravelProc.stderr.on('data', d => console.log('  [Laravel stderr]:', d.toString().trim()));

  for (let i = 0; i < 6; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const res = await checkHttp('http://127.0.0.1:8001/');
    if (res.status === 200) {
      console.log('  Laravel HTTP response: 200 OK! Length:', res.length);
      break;
    }
  }
  laravelProc.kill();

  console.log('\nDjango & Laravel testing complete.');
})();
