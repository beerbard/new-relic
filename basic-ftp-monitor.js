/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-api-tests
 * for details.
 */
var ftp = require('basic-ftp');

checker()

function checker() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        const secureOptions = {
            // Necessary only if the server requires client certificate authentication.
            // key: fs.readFileSync('client-key.pem'),
            // cert: fs.readFileSync('client-cert.pem'),

            // Necessary only if the server uses a self-signed certificate.
            //  ca: [ fs.readFileSync('server-cert.pem') ],

            // Necessary only if the server's cert isn't for "localhost".
            checkServerIdentity: () => { return null; },
        };
        client.access({
            host: "<FQDN>",
            user: "<username>",
            password: "<password>",
            secure: true,
            secureOptions: secureOptions
        }).then(function() {
            return client.list();
        }).then(function(list) {
            console.log(list)
        }).then(function() {
            client.close()
        })
    } catch(err) {
        console.log(err)
    }
}