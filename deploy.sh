#!/bin/bash
set -e

# Load credentials from .env
if [ ! -f .env ]; then
  echo "Error: .env file not found. Copy .env.example to .env and fill in your credentials."
  exit 1
fi
source .env

# Build
echo "Building..."
npm run build

# Upload out/ to Hostinger via FTP
echo "Deploying to Hostinger..."
lftp -c "
  set ftp:ssl-allow no;
  open ftp://$FTP_USER:$FTP_PASS@$FTP_HOST;
  mirror --reverse --delete --verbose out/ $FTP_REMOTE_PATH;
  bye
"

echo "Done. Site is live."
