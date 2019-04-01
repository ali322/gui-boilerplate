# app name
APP_NAME="gui-boilerplate"

# ssh key
SSH_KEY="~/path/to/ssh_private_key"

# ssh server
SSH_SERVER="root@www.example.com"

# remote path
REMOTE_PATH="/usr/share/download/"


scp -i "$SSH_KEY" "./output/latest.yml" "$SSH_SERVER:$REMOTE_PATH"
scp -i "$SSH_KEY" "./output/$APPNAME-$1.exe" "$SSH_SERVER:$REMOTE_PATH"
scp -i "$SSH_KEY" "./output/$APPNAME-$1.zip" "$SSH_SERVER:$REMOTE_PATH"
scp -i "$SSH_KEY" "./output/latest-mac.yml" "$SSH_SERVER:$REMOTE_PATH"
scp -i "$SSH_KEY" "./output/$APP_NAME-$1.dmg" "$SSH_SERVER:$REMOTE_PATH"
scp -i "$SSH_KEY" "./output/$APP_NAME-$1-mac.zip" "$SSH_SERVER:$REMOTE_PATH"

rm -rf "./output/mac"
rm -rf "./output/win-ia32-unpacked"