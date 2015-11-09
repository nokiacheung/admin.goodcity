# This Rakefile assists in creating Cordova app builds. It provides a consistent
# build process on dev machines, CI servers and is cross-platform.
#
# Tasks overview
#   rake app:build (default)
#   rake app:deploy (upload to TestFairy)
#   rake app:release (build and upload to TestFairy)
#
# Defaults:
#   ENV=staging PLATFORM=<based on host machine: darwin -> ios, linux -> android>
#
# Advanced usage
#   Specify ENVIRONMENT params or call special task
#     > rake android production app:build
#     > ENV=production PLATFORM=android rake app:build (equivalant to above)
#   Other tasks
#     > rake clean (removes dist, cordova/www and app files)
#     > rake clobber (also removes cordova/platforms and cordova/plugins)
#     > rake ember:install (multitask that does bower and npm in parallel)
#     > rake ember:build
#     > rake cordova:install
#     > rake cordova:prepare
#     > rake cordova:build
#
# iOS Build Server
#     > rake ios_build_server:notify (tells the iOS server to start a build)
#     > rake ios_build_server:build (checks and starts a build)
#
#     Cronjob entry
# * * * * * source /Users/developer/.bash_profile; rake -f /Users/developer/Workspace/admin.goodcity/Rakefile app:release  >> /tmp/goodcity_admin_ios_build.log 2>&1
#
# Signing Android releases
#   Gradle can sign the releases during the build process.
#   Set environment varibles: GOODCITY_KEYSTORE_PASSWORD and GOODCITY_KEYSTORE_ALIAS
#   You must also ensure the signing key exists at CORDOVA/goodcity.keystore

require "json"
require "fileutils"
require "iron_mq"
require "rake/clean"
ROOT_PATH = File.dirname(__FILE__)
CORDOVA_PATH = "#{ROOT_PATH}/cordova"
CLEAN.include("dist", "cordova/www", "#{CORDOVA_PATH}/platforms/android/build",
  "#{CORDOVA_PATH}/platforms/ios/build")
CLOBBER.include("cordova/platforms", "cordova/plugins")
PLATFORMS = %w(android ios windows).freeze
ENVIRONMENTS = %w(staging production).freeze
APP_DETAILS_PATH = "#{CORDOVA_PATH}/appDetails.json"
TESTFAIRY_PLATFORMS=%w(android ios)
SHARED_REPO = "https://github.com/crossroads/shared.goodcity.git"
TESTFAIRY_PLUGIN_URL = "https://github.com/testfairy/testfairy-cordova-plugin"
TESTFAIRY_PLUGIN_NAME = "com.testfairy.cordova-plugin"
LOCK_FILE="#{CORDOVA_PATH}/.ios_build.lock"
LOCK_FILE_MAX_AGE = 1000 # number of seconds before we remove lock file if failing build
KEYSTORE_FILE = "#{CORDOVA_PATH}/goodcity.keystore"
BUILD_JSON_FILE = "#{CORDOVA_PATH}/build.json"

# Default task
task default: %w(app:build)

# Main namespace
namespace :app do
  desc "Builds the app"
  task build: %w(ember:install cordova:install cordova:prepare cordova:build)
  desc "Uploads the app to TestFairy"
  task deploy: %w(testfairy:upload)
  desc "Equivalent to rake app:build app:deploy"
  task release: %w(app:build testfairy:upload)
end

ENVIRONMENTS.each do |env|
  task env do
    ENV["ENV"] = env
  end
end

PLATFORMS.each do |platform|
  task platform do
    ENV["PLATFORM"] = platform
  end
end

namespace :ember do
  multitask install_parallel: %w(bower_install npm_install)
  desc "Ember install dependencies"
  task :install do
    Dir.chdir(ROOT_PATH) do
      Rake::MultiTask["ember:install_parallel"].invoke
    end
  end
  task :bower_install do
    sh %{ bower install }
  end
  task npm_install: :select_branch do
    sh %{ npm install }
  end
  desc "Ember build with Cordova enabled"
  task :build do
    # Before starting Ember build clean up folders
    Rake::Task["clobber"].invoke
    Dir.chdir(ROOT_PATH) do
      system({"EMBER_CLI_CORDOVA" => "1", "APP_SHA" => app_sha, "APP_SHARED_SHA" => app_shared_sha, "staging" => is_staging}, "ember build --environment=production")
    end
  end
  task :select_branch do
    sh %{ node circle-branch.js }
  end
end

namespace :cordova do
  desc "Install cordova package globally"
  task :install do
    sh %{ npm list --depth 1 --global cordova; if [ $? -ne 0 ]; then npm install -g cordova; fi }
  end
  desc "Cordova prepare {platform}"
  task :prepare do
    # Before cordova prepare build ember app that will auto update the dist folder too
    Rake::Task["ember:build"].invoke
    create_build_json_file
    sh %{ ln -s "#{ROOT_PATH}/dist" "#{CORDOVA_PATH}/www" } unless File.exists?("#{CORDOVA_PATH}/www")
    build_details.map{|key, value| log("#{key.upcase}: #{value}")}

    log("Preparing app for #{platform}")
    Dir.chdir(CORDOVA_PATH) do
      system({"ENVIRONMENT" => environment}, "cordova prepare #{platform}")
    end
    if platform == "ios"
      Dir.chdir(CORDOVA_PATH) do
        sh %{ cordova plugin add #{TESTFAIRY_PLUGIN_URL} } if environment == "staging"
        sh %{ cordova plugin remove #{TESTFAIRY_PLUGIN_NAME}; true } if environment == "production"
      end
    end
  end
  desc "Cordova build {platform}"
  task build: :prepare do
    Dir.chdir(CORDOVA_PATH) do
      build = (environment == "staging" && platform == 'android') ? "debug" : "release"
      system({"ENVIRONMENT" => environment}, "cordova compile #{platform} --#{build} --device")
      if platform == "ios"
        sh %{ xcrun -sdk iphoneos PackageApplication -v '#{app_file}' -o '#{ipa_file}' --sign "#{app_signing_identity}"}
      end
    end
    # Copy build artifacts
    if ENV["CI"]
      sh %{ if [ -e "#{app_file}" ]; then cp #{app_file} $CIRCLE_ARTIFACTS/; fi }
      sh %{ if [ -e "#{ipa_file}" ]; then cp #{ipa_file} $CIRCLE_ARTIFACTS/; fi }
    end
  end
  task :bump_version do
    increment_app_version!
    if ENV["CI"]
      Dir.chdir(ROOT_PATH) do
        sh %{ git config --global user.email "none@none" }
        sh %{ git config --global user.name "CircleCi" }
        sh %{ git config --global push.default current }
        sh %{ git add #{APP_DETAILS_PATH} }
        sh %{ git commit -m "Update build version [ci skip]" }
        sh %{ git stash }
        sh %{ git push; true } # try but don't care if this fails
        sh %{ git stash pop }
      end
    end
  end
end

namespace :testfairy do
  task :upload do
    return unless TESTFAIRY_PLATFORMS.include?(platform)
    app = (platform == "ios") ? ipa_file : app_file
    raise(BuildError, "#{app} does not exist!") unless File.exists?(app)
    raise(BuildError, "TESTFAIRY_API_KEY not set.") unless env?("TESTFAIRY_API_KEY")
    if ENV["CI"]
      sh %{ export PATH="$ANDROID_HOME/build-tools/22.0.1:$PATH"; #{testfairy_upload_script} "#{app}" }
    else
      sh %{ #{testfairy_upload_script} "#{app}" }
    end
    log("Uploaded app...")
    build_details.map{|key, value| log("#{key.upcase}: #{value}")}
  end
end

namespace :ios_build_server do
  desc "Sends a message to the iOS build server to begin building an app"
  task notify: :check_env do
    iron_queue.post("build")
  end
  desc "Checks to see if we should begin a build"
  task build: :check_env do
    log("Checking for build messages on #{iron_queue.name}...")
    msg = iron_queue.get
    if msg
      if !lock_expired?
        log("Build starting...")
        Dir.chdir(ROOT_PATH) do
          sh %{ git fetch origin; git reset --hard HEAD; git pull }
        end
        create_lock!
        msg.delete
        Rake::Task["app:release"].invoke
        delete_lock!
      else
        log("Build currently in progress")
      end
    else
      log("No build requested")
    end
  end
  task :check_env do
    %w(GOODCITY_IRON_MQ_OAUTH_KEY GOODCITY_IRON_MQ_PROJECT_KEY
      GOODCITY_IRON_MQ_QUEUE_NAME TESTFAIRY_API_KEY).each do |env|
        raise(BuildError, "#{env} not set.") unless env?(env)
    end
  end
end

def app_sha
  Dir.chdir(ROOT_PATH) do
    `git rev-parse --short HEAD`.chomp
  end
end

def app_shared_sha
  @app_shared_sha ||= begin
    branch = nil
    Dir.chdir(ROOT_PATH) do
      branch = `git rev-parse --abbrev-ref HEAD`.strip
    end
    sha = `git ls-remote --heads #{SHARED_REPO} #{branch}`.strip
    sha = `git ls-remote --heads #{SHARED_REPO} master`.strip if sha.empty?
    sha[0..6]
  end
end

def environment
  environment = ENV["ENV"]
  raise(BuildError, "Unsupported environment: #{environment}") if (environment || "").length > 0 and !ENVIRONMENTS.include?(environment)
  ENV["ENV"] || "staging"
end

def platform
  env_platform = ENV["PLATFORM"]
  raise(BuildError, "Unsupported platform: #{env_platform}") if (env_platform || "").length > 0 and !PLATFORMS.include?(env_platform)
  env_platform || begin
    case Gem::Platform.local.os
    when /mswin|windows|mingw32/i
      "windows"
    when /linux|arch/i
      "android"
    when /darwin/i
      "ios"
    else
      raise(BuildError, "Unsupported build os: #{env_platform}")
    end
  end
end

def env?(env)
  (ENV[env] || "") != ""
end

def app_file
  case platform
  when /ios/
    "#{CORDOVA_PATH}/platforms/ios/build/device/#{app_name}.app"
  when /android/
    build = (environment == "production") ? "release" : "debug"
    "#{CORDOVA_PATH}/platforms/android/build/outputs/apk/android-#{build}.apk"
  when /windows/
    raise(BuildError, "TODO: Need to get Windows app path")
  end
end

def ipa_file
  "#{CORDOVA_PATH}/platforms/ios/build/device/#{app_name}.ipa"
end

def app_name
  app_details[environment]["name"]
end

def app_url
  app_details[environment]["url"]
end

def app_version
  app_details[environment]["version"]
end

def app_signing_identity
  app_details[environment]["signing_detail"]
end

def app_details
  @app_details ||= JSON.parse(File.read(APP_DETAILS_PATH))
end

def increment_app_version!
  version_array = app_version.split(".")
  app_details[environment]["version"] = (version_array[0..1] << version_array.last.to_i + 1).join(".")
  File.open(APP_DETAILS_PATH, "w"){|f| f.puts JSON.pretty_generate(app_details)}
end

def testfairy_upload_script
  "#{CORDOVA_PATH}/deploy/testfairy-#{platform}-upload.sh"
end

def is_staging
  (environment == "staging").to_s
end

def build_details
  _build_details = {app_name: app_name, env: environment, platform: platform, app_version: app_version}
  _build_details[:app_signing_identity] = app_signing_identity if platform == "ios"
  _build_details
end

def iron_mq
  @ironmq ||= IronMQ::Client.new(token: iron_token, project_id: iron_project_id)
end

def iron_queue
  iron_mq.queue(app_url)
end

def iron_token
  ENV['GOODCITY_IRON_MQ_OAUTH_KEY']
end

def iron_project_id
  ENV['GOODCITY_IRON_MQ_PROJECT_KEY']
end

def lock_expired?
  File.exists?(LOCK_FILE) && (Time.now - File.mtime(LOCK_FILE)).to_i > LOCK_FILE_MAX_AGE
end

def create_lock!
  FileUtils.touch(LOCK_FILE)
end

def delete_lock!
  FileUtils.rm(LOCK_FILE) if File.exists?(LOCK_FILE)
end

def log(msg="")
  puts(Time.now.to_s << " " << msg)
end

# Cordova uses build.json to create gradle release-signing.properties file
# Expects CORDOVA_PATH/goodcity.keystore to exist
# Requires ENV vars: GOODCITY_KEYSTORE_PASSWORD and GOODCITY_KEYSTORE_ALIAS
def create_build_json_file
  FileUtils.rm(BUILD_JSON_FILE) if File.exists?(BUILD_JSON_FILE)
  return unless (environment == "production" and platform == "android")
  raise(BuildError, "Keystore file not found: #{KEYSTORE_FILE}") unless File.exists?("#{KEYSTORE_FILE}")
  %w(GOODCITY_KEYSTORE_PASSWORD GOODCITY_KEYSTORE_ALIAS).each do |key|
    raise(BuildError, "#{key} environment variable not set.") unless env?(key)
  end
  build_json_hash = {
    android: {
      release: {
        keystore: "#{KEYSTORE_FILE}",
        storePassword: ENV["GOODCITY_KEYSTORE_PASSWORD"],
        alias: ENV["GOODCITY_KEYSTORE_ALIAS"],
        password: ENV["GOODCITY_KEYSTORE_PASSWORD"]
      }
    }
  }
  File.open(BUILD_JSON_FILE, "w"){|f| f.puts JSON.pretty_generate(build_json_hash)}
end

class BuildError < StandardError; end
