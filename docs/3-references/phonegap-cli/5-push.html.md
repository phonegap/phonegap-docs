---
title: Push Notifications
url: references/phonegap-cli/push
layout: subpage
---

The `push` command is used to send push notifications for the PhoneGap Developer app to consume. Available since version 6.2.0.

## Usage

```bash
phonegap push [options]
```

## Options

Some options are available for specifically setting the device to send to, the type of service to use and the data to send to the application.

```bash
--deviceID <deviceID>   device ID (required)
--service <service>     target service, "gcm", "apns" or "apns-sandbox" (required)
--payload <data>        JSON object to be sent via push service (required)
```

### Examples

```bash
$ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service gcm --payload '{ "data": { "title": "Hello", "message": "World"} }'
$ phonegap push --deviceID APA91bE1MmeTc92igNoi5OkDWUV --service apns --payload '{ "aps": { "alert": "Hello World", "badge": 5 } }'
```
