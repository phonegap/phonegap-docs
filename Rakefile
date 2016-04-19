require 'html-proofer'

# Set "rake watch" as default task
task :default => :test

desc "build and test website"
task :test do
  HTMLProofer.check_directory("./out", {
    :empty_alt_ignore => true,
    :alt_ignore => [/\W/],
    :url_ignore => [/http:\/\/192.168.1.20(:\d\d\d\d)?/],
    :cache => {
      :timeframe => '1d'
    },
    :typhoeus => {
      :followlocation => true,
      :ssl_verifypeer => false,
      :headers => { 'User-Agent' => 'html-proofer' }
    }
  }).run
end
