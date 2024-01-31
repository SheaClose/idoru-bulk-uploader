npm run build;
aws s3 cp ./build s3://idoru.sheaclose.com/ --recursive --profile personal;
aws cloudfront create-invalidation --distribution-id E3OM07K7XJ1RLS --profile personal --paths "/*";
