const fs = require('fs');
fs.copyFile('_redirects', './dist/client/_redirects', () => {});