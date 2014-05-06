# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
# 
#  http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

class PhoneGapify
  def run(filename)
    content = IO.read(filename)

    # [Apache Cordova](http://cordova.io) => [PhoneGap](http://phonegap.com)
    # cordova.io => phonegap.com
    #
    # [Apache Cordova](http://www.apache.org/dist/cordova/) => [PhoneGap](http://phonegap.com/download)
    # http://www.apache.org/dist/cordova/ => http://phonegap.com/download
    #
    # [Cordova](http://cordova.apache.org/) => [PhoneGap](http://phonegap.com/download)
    # [Cordova](http://cordova.apache.org/#download) => [PhoneGap](http://phonegap.com/download)
    #
    # [Apache Cordova home page](http://cordova.apache.org/) => [PhoneGap](http://phonegap.com)
    # [Cordova](http://phonegap.com/download) => [PhoneGap](http://phonegap.com/download)
    # [Apache Cordova](http://phonegap.com/download) => [PhoneGap](http://phonegap.com/download)

    content.gsub!('[Apache Cordova](http://cordova.io)',                    '[PhoneGap](http://phonegap.com)')
    content.gsub!('cordova.io',                                             'phonegap.com')
    content.gsub!('[Apache Cordova](http://www.apache.org/dist/cordova/)',  '[PhoneGap](http://phonegap.com/download)')
    content.gsub!('http://www.apache.org/dist/cordova/',                    'http://phonegap.com/download')
    content.gsub!('[Cordova](http://cordova.apache.org/)',                  '[PhoneGap](http://phonegap.com/download)')
    content.gsub!('[Cordova](http://cordova.apache.org/#download)',         '[PhoneGap](http://phonegap.com/download)')
    content.gsub!('[Apache Cordova home page](http://cordova.apache.org/)', '[PhoneGap](http://phonegap.com)')
    content.gsub!('Cordova](http://phonegap.com/download)',                 '[PhoneGap](http://phonegap.com/download)')
    content.gsub!('Apache Cordova](http://phonegap.com/download)',          '[PhoneGap](http://phonegap.com/download)')

    # lazy workaround to unintended URL changes
    content.gsub!('plugins.phonegap.com',                                   'plugins.cordova.io')

    File.open(filename, 'w') { |file| file.write content }

    return content
  end
end
