const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, 'src', 'app', 'services');
const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let modified = false;

    if (content.includes('localhost:3000')) {
        if (!content.includes('environments/environment')) {
            content = "import { environment } from '../../environments/environment';\n" + content;
        }

        // Caso 1: hostBase = 'http://localhost:3000/api/usuarios/';
        // Reemplazar por hostBase = environment.apiUrl + '/usuarios/';
        content = content.replace(/'http:\/\/localhost:3000\/api\/([^']+)'/g, "environment.apiUrl + '/$1'");
        content = content.replace(/"http:\/\/localhost:3000\/api\/([^"]+)"/g, 'environment.apiUrl + "/$1"');

        // Caso 2: URL exacta 'http://localhost:3000/api/nutricion'
        content = content.replace(/'http:\/\/localhost:3000\/api'/g, "environment.apiUrl");
        content = content.replace(/"http:\/\/localhost:3000\/api"/g, "environment.apiUrl");

        // Caso 3: Template literals `http://localhost:3000/api/ai/generar-rutina`
        content = content.replace(/`http:\/\/localhost:3000\/api\/([^`]+)`/g, "`\${environment.apiUrl}/$1`");

        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', file);
    }
});
