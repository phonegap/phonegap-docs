---
title: Android Packaging and Provisioning 
url: distribute/packaging-provisioning/android
layout: subpage
tab: Android
write: false
---


## Steps
### Prepare some files for signing
1. Create a release build using the PhoneGap `--release` flag
    `$ phonegap build android --release`

2. The output of the above step should result in a file with an *.apk* extension in your *platforms/android/ant-build/* folder.
 Keep this location in mind for app submission.  

3. Create a keystore to sign your app from the command line using Java's `keytool`. 

<div class="alert--info">**TIP:** A keystore is a database of cryptic keys for certifying your app. The Java tools needed for creating the keystore and signing your app in the next step are included in the Android SDK you previously installed assuming you're using the PhoneGap CLI to build your apps. </div>

**Syntax:** 
    
    keytool -genkey -v -keystore <keystoreName>.keystore -alias <Keystore AliasName> -keyalg <Key algorithm> -keysize <Key size> -validity <Key Validity in Days>
    
**Example:** 
        
    keytool -genkey -v -keystore myapp.keystore -alias myappmobileapps -keyalg RSA -keysize 2048 -validity 10000
          
    keystore password? : xxxxxxx
    What is your first and last name? :  xxxxxx
    What is the name of your organizational unit? :  xxxxxx
    What is the name of your organization? :  xxxxxxx
    What is the name of your City or Locality? :  xxxxxxx
    What is the name of your State or Province? :  xxxxx        
    What is the two-letter country code for this unit? :  xx
     
4. Sign the app

**Syntax:** 
    
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore <keystorename <Unsigned APK file> <Keystore Alias name>    

    
**Example**
    
    $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore myapp.keystore Example-release-unsigned.apk xxxxxmyapp

**RECOMMENDED READING** 
See [this guide](http://developer.android.com/tools/publishing/app-signing.html) to signing your Android application 
from the Android Developer Documentation. 

<div class="alert--info">**TIP:** You could also choose to use the [PhoneGap Build](https://build.phonegap.com) cloud service to package your app.</div>





