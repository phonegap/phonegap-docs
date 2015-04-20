/*!
 * Module dependencies.
 */

var docpad = require('docpad'),
    docpadInstanceConfig = {},
    docpadGenerateConfig = {};

/*
 * Generate the documentation and capture any errors.
 *
 * We must use this instead of `docpad generate` in order to capture errors.
 * Unfortunately, the docpad binary does not output to stderr and exits with
 * a status code of 0 even when an error exists. This is the only method
 * available to capture an error.
 */

docpad.createInstance(docpadInstanceConfig, function(e, docpadInstance) {
    if (e) throw new Error('failed');

    docpadInstance.action('generate', docpadGenerateConfig, function(e, result) {
        if (e) {
            console.error(e);
            process.exit(1);
        }
    });
});
