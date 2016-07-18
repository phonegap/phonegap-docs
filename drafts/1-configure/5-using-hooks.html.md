---
title: Using Hooks
url: tutorials/configure/using-hooks
layout: subpage
write: false
---

Hooks are scripts (snippets of code) that the CLI executes at certain points in your application build process. They allow you to extend the 
PhoneGap framework to better suit your needs. While you can use hooks to integrate the CLI into a larger framework, typically you’ll be writing 
project level hooks to manipulate files in your project.

## Supported hooks
Hooks are named based on when they should execute. For instance:

    after_build/
    after_compile/
    after_docs/
    after_emulate/
    after_platform_add/
    after_platform_rm/
    after_platform_ls/
    after_plugin_add/
    after_plugin_ls/
    after_plugin_rm/
    after_plugin_search/
    after_plugin_install/   
    after_prepare/
    after_run/
    after_serve/
    before_build/
    before_compile/
    before_docs/
    before_emulate/
    before_platform_add/
    before_platform_rm/
    before_platform_ls/
    before_plugin_add/
    before_plugin_ls/
    before_plugin_rm/
    before_plugin_search/
    before_plugin_install/   
    before_plugin_uninstall/   
    before_prepare/
    before_run/
    before_serve/
    pre_package/ <-- Windows 8 and Windows Phone only.

### Hook script locations
Hook scripts can be defined by adding them as subfolders to the special predefined folder (`/hooks`) in the root project or via configuration files (`config.xml` and `plugin.xml`). The run serially in the following order:
* Application hooks from `/hooks`;
* Application hooks from `config.xml`;
* Plugin hooks from `plugins/.../plugin.xml`.

## Writing Hooks
Hooks can be written using a JavaScript (Node.js) or non-JavaScript interface, however we recommend using Node.js for writing your hooks so they're cross-platform. 

### Script Interface

#### Javascript

If you are writing hooks in Javascript you should use the following module definition:
    ```javascript
    module.exports = function(context) {
        ...
    }
    ```

You can make your scipts async using Q:
    
    ```javascript
    module.exports = function(context) {
    var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    setTimeout(function(){
    	console.log('hook.js>> end');
		deferral.resolve();
    }, 1000);

    return deferral.promise;
    }
    ```

`context` object contains hook type, executed script full path, hook options, command-line arguments passed to Cordova and top-level "cordova" object:
    ```json
    {
        "hook": "before_plugin_install",
        "scriptLocation": "c:\\script\\full\\path\\appBeforePluginInstall.js",
        "cmdLine": "The\\exact\\command\\cordova\\run\\with arguments",
        "opts": {
            "projectRoot":"C:\\path\\to\\the\\project",
            "cordova": {
                "platforms": ["wp8"],
                "plugins": ["com.plugin.withhooks"],
                "version": "0.21.7-dev"
            },
            "plugin": {
                "id": "com.plugin.withhooks",
                "pluginInfo": {
                    ...
                },
                "platform": "wp8",
                "dir": "C:\\path\\to\\the\\project\\plugins\\com.plugin.withhooks"
            }
        },
        "cordova": {...}
    }
    
    ```
`context.opts.plugin` object will only be passed to plugin hooks scripts.

You can also require additional Cordova modules in your script using `context.requireCordovaModule` in the following way:
```javascript
var Q = context.requireCordovaModule('q');
```

__Note__:  new module loader script interface is used for the `.js` files defined via `config.xml` or `plugin.xml` only.
For compatibility reasons hook files specified via `/hooks` folders are run via Node child_process spawn, see 'Non-javascript' section below.

### Non-JavaScript

Non-javascript scripts are run via Node child_process spawn from the project's root directory and have the root directory passes as the first argument. All other options are passed to the script using environment variables:

* CORDOVA_VERSION - The version of the Cordova-CLI.
* CORDOVA_PLATFORMS - Comma separated list of platforms that the command applies to (e.g.: android, ios).
* CORDOVA_PLUGINS - Comma separated list of plugin IDs that the command applies to (e.g.: org.apache.cordova.file, org.apache.cordova.file-transfer)
* CORDOVA_HOOK - Path to the hook that is being executed.
* CORDOVA_CMDLINE - The exact command-line arguments passed to cordova (e.g.: cordova run ios --emulate)

If a script returns a non-zero exit code, then the parent cordova command will be aborted.

<div class="alert--warning"> **Note:** Don't forget to make your hooks executable.</div>



### Examples of Common Hooks
1. Add plugins
2. Replace text based on stage (development vs production) 
3. Copying icons and splash screens

<div class="alert--info">**TIP:** More details on how to implement these common hooks can be found [here](http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/).</div> 

<div class="alert--warning"> **Note:** Keep in mind, hooks will tie your build process to the CLI so they might not be a good fit for every situation.</div>

