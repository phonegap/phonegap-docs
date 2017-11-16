require 'html-proofer'

# Set "rake watch" as default task
task :default => :test

desc "build and test website"
task :test do
  HTMLProofer.check_directory("./out", {
    :empty_alt_ignore => true,
    :url_ignore => [
      /http:\/\/192.168.1.20(:\d\d\d\d)?/,
      "https://plus.google.com/communities/111220599704908202107",
      "https://www.microsoft.com/en-us/store/p/phonegap-developer/9wzdncrdfsj0"
    ],
    :http_status_ignore => [0, 403, 999],
    :cache => {
      :timeframe => '1d'
    },
    :timeout => 10,
    :typhoeus => {
      :followlocation => true,
      :ssl_verifypeer => false,
      :headers => { 'User-Agent' => 'html-proofer' }
    }
  }).run
end
