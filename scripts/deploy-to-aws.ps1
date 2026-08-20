# Cognitia 2026 Automated AWS Provisioning & Live Deployment Script
$ACCOUNT_ID = "529470779811"
$REGION = "ap-south-1"
$APP_BUCKET = "cognitia-2026-app-$ACCOUNT_ID"
$SUBMISSIONS_BUCKET = "cognitia-2026-submissions-$ACCOUNT_ID"
$DYNAMODB_TABLE = "Cognitia2026Teams"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " STARTING AWS PROVISIONING AND DEPLOYMENT" -ForegroundColor Green
Write-Host " AWS Account: $ACCOUNT_ID" -ForegroundColor Yellow
Write-Host " Target Region: $REGION" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# Step 1: Create AWS S3 Static Website Bucket
Write-Host "[1/6] Provisioning S3 Static Website Bucket: $APP_BUCKET ..." -ForegroundColor Cyan
if ($REGION -eq "us-east-1") {
    aws s3api create-bucket --bucket $APP_BUCKET --region $REGION 2>$null
} else {
    aws s3api create-bucket --bucket $APP_BUCKET --region $REGION --create-bucket-configuration LocationConstraint=$REGION 2>$null
}

# Remove Public Access Block on App Bucket
aws s3api put-public-access-block --bucket $APP_BUCKET --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Enable S3 Static Website Hosting
aws s3api put-bucket-website --bucket $APP_BUCKET --website-configuration '{\"IndexDocument\":{\"Suffix\":\"index.html\"},\"ErrorDocument\":{\"Key\":\"index.html\"}}'

# Apply Public Read Bucket Policy
aws s3api put-bucket-policy --bucket $APP_BUCKET --policy file://scripts/aws-bucket-policy.json
Write-Host "S3 App Website Bucket provisioned and public web hosting configured!" -ForegroundColor Green

# Step 2: Create AWS S3 Submissions and Media Storage Bucket
Write-Host "[2/6] Provisioning S3 Media Uploads Bucket: $SUBMISSIONS_BUCKET ..." -ForegroundColor Cyan
if ($REGION -eq "us-east-1") {
    aws s3api create-bucket --bucket $SUBMISSIONS_BUCKET --region $REGION 2>$null
} else {
    aws s3api create-bucket --bucket $SUBMISSIONS_BUCKET --region $REGION --create-bucket-configuration LocationConstraint=$REGION 2>$null
}

aws s3api put-public-access-block --bucket $SUBMISSIONS_BUCKET --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
aws s3api put-bucket-cors --bucket $SUBMISSIONS_BUCKET --cors-configuration file://scripts/aws-cors-policy.json
Write-Host "S3 Submissions Bucket provisioned with CORS upload rules!" -ForegroundColor Green

# Step 3: Create AWS DynamoDB Table
Write-Host "[3/6] Provisioning AWS DynamoDB Table: $DYNAMODB_TABLE ..." -ForegroundColor Cyan
aws dynamodb create-table `
    --table-name $DYNAMODB_TABLE `
    --attribute-definitions AttributeName=id,AttributeType=S `
    --key-schema AttributeName=id,KeyType=HASH `
    --billing-mode PAY_PER_REQUEST `
    --region $REGION 2>$null

Write-Host "DynamoDB Table ($DYNAMODB_TABLE) ready!" -ForegroundColor Green

# Step 4: Run Vite Production Build
Write-Host "[4/6] Running Vite Production Web Build..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Aborting deployment." -ForegroundColor Red
    exit 1
}
Write-Host "Production web bundle generated cleanly!" -ForegroundColor Green

# Step 5: Sync Static Assets to AWS S3 Bucket
Write-Host "[5/6] Uploading and Deploying Web Assets to AWS S3..." -ForegroundColor Cyan
aws s3 sync dist/ "s3://$APP_BUCKET/" --delete --region $REGION
Write-Host "S3 Sync Completed!" -ForegroundColor Green

# Step 6: Output Public Website URL
$WEBSITE_URL = "http://$APP_BUCKET.s3-website.$REGION.amazonaws.com/"
Write-Host "==========================================================" -ForegroundColor Green
Write-Host " LIVE AWS DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host " Live AWS Public Website URL:" -ForegroundColor Yellow
Write-Host " $WEBSITE_URL" -ForegroundColor Cyan
Write-Host " Admin Portal Path:" -ForegroundColor Yellow
Write-Host " $WEBSITE_URLadmin" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Green
