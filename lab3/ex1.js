const dns = require('dns');
const { promisify } = require('util');

//method 1
dns.resolve4('www.mum.edu', (err, ips) => {

    if (err) throw err;

    console.log(`ip addresses are: ${ips}`);

});

//method 2
promisify(dns.resolve4)('www.mum.edu').then(res => console.log("Promisfy output:", res));
