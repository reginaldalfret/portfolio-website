const { spawn } = require('child_process');
const http = require('http');

function checkHttp(url, timeout = 3000) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, length: data.length, body: data.substring(0, 300) }));
    });
    req.on('error', err => resolve({ error: err.message }));
    req.setTimeout(timeout, () => {
      req.abort();
      resolve({ error: 'timeout' });
    });
  });
}

(async () => {
  console.log('=== TESTING BACKEND LOCAL RUNTIMES ===');

  // Test 1: Buffalo
  console.log('\n1. Testing Go Buffalo binary...');
  const buffaloProc = spawn('E:\\Portfolio-Buffalo\\portfolio-buffalo.exe', [], { cwd: 'E:\\Portfolio-Buffalo' });
  buffaloProc.stdout.on('data', d => console.log('  [Buffalo stdout]:', d.toString().trim()));
  buffaloProc.stderr.on('data', d => console.log('  [Buffalo stderr]:', d.toString().trim()));
  
  await new Promise(r => setTimeout(r, 2000));
  const bufRes = await checkHttp('http://127.0.0.1:8087/');
  console.log('  Buffalo HTTP response:', bufRes.status, bufRes.headers ? bufRes.headers['content-type'] : bufRes.error);
  buffaloProc.kill();

  // Test 2: Spring Boot
  console.log('\n2. Testing Spring Boot JAR...');
  const javaExe = 'C:\\Program Files\\Microsoft\\jdk-21.0.12.101-hotspot\\bin\\java.exe';
  const springProc = spawn(javaExe, ['-jar', 'E:\\Portfolio-SpringBoot\\target\\portfolio-0.0.1-SNAPSHOT.jar', '--server.port=8082'], { cwd: 'E:\\Portfolio-SpringBoot' });
  springProc.stdout.on('data', d => {
    const line = d.toString().trim();
    if (line.includes('Started PortfolioApplication') || line.includes('Tomcat started')) {
      console.log('  [Spring Boot]:', line);
    }
  });

  // Wait up to 10s for Spring Boot to start
  for (let i = 0; i < 10; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const res = await checkHttp('http://127.0.0.1:8082/');
    if (res.status === 200) {
      console.log('  Spring Boot HTTP response: 200 OK! Length:', res.length);
      break;
    }
  }
  springProc.kill();

  console.log('\nBackend local verification finished.');
})();
