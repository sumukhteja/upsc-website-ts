# UPSC Master Backend - AWS Serverless

Complete AWS serverless backend with 22 Lambda functions for the UPSC Master platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- AWS CLI configured
- Serverless Framework

### Installation
\`\`\`bash
npm install -g serverless
cd backend
npm install
\`\`\`

### Deploy
\`\`\`bash
# Deploy to development
npm run deploy:dev

# Deploy to production
npm run deploy:prod
\`\`\`

## 📊 Lambda Functions (22 Total)

### 🔐 Authentication (4 functions)
- **authSignUp** - User registration with Cognito
- **authSignIn** - User login and JWT tokens
- **authVerify** - Token verification
- **authRefresh** - Refresh JWT tokens

### 👥 User Management (4 functions)
- **getUsers** - List users with pagination/filtering
- **createUser** - Create new user (admin)
- **updateUser** - Update user details
- **deleteUser** - Delete user account

### 🧠 Quiz Management (4 functions)
- **getQuizzes** - Get quiz questions by subject/difficulty
- **createQuiz** - Create new quiz question
- **updateQuiz** - Update existing question
- **deleteQuiz** - Delete quiz question

### 🗺️ Maps Management (4 functions)
- **getMaps** - Get maps by category/region
- **createMap** - Create new interactive map
- **updateMap** - Update map details
- **deleteMap** - Delete map

### 📁 File Management (3 functions)
- **uploadFile** - Upload files to S3
- **getFiles** - List uploaded files
- **deleteFile** - Delete files from S3

### 📈 Analytics (2 functions)
- **getAnalytics** - Get analytics data
- **createAnalyticsEvent** - Track user events

### 📊 CSV Bulk Upload (2 functions)
- **csvUploadQuiz** - Bulk import quiz questions
- **csvUploadMaps** - Bulk import maps data

## 🏗️ AWS Resources Created

### 🗄️ DynamoDB Tables
- **Users** - User profiles and authentication
- **Quiz** - Quiz questions with GSI on subject/difficulty
- **Maps** - Interactive maps with GSI on category/region
- **Files** - File metadata and S3 references
- **Analytics** - User events and analytics data

### 🔐 Cognito
- **User Pool** - Authentication and user management
- **User Pool Client** - Application integration

### ☁️ S3 Bucket
- **File Storage** - Public and private file uploads
- **CORS Enabled** - Frontend integration ready

### 🌐 API Gateway
- **REST API** - All endpoints with CORS
- **Cognito Authorizer** - Protected endpoints
- **Custom domain ready**

## 🔧 Environment Variables

All environment variables are auto-generated during deployment:
- `USERS_TABLE`, `QUIZ_TABLE`, `MAPS_TABLE`, etc.
- `S3_BUCKET` - File storage bucket
- `COGNITO_USER_POOL_ID`, `COGNITO_CLIENT_ID`
- `REGION` - AWS region (ap-south-1)

## 📋 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - User login
- `POST /api/auth/verify` - Verify token
- `POST /api/auth/refresh` - Refresh token

### Users (Protected)
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Quiz (Public read, Protected write)
- `GET /api/quiz` - Get quiz questions
- `POST /api/quiz` - Create question
- `PUT /api/quiz/{id}` - Update question
- `DELETE /api/quiz/{id}` - Delete question

### Maps (Public read, Protected write)
- `GET /api/maps` - Get maps
- `POST /api/maps` - Create map
- `PUT /api/maps/{id}` - Update map
- `DELETE /api/maps/{id}` - Delete map

### Files (Protected)
- `POST /api/files/upload` - Upload file
- `GET /api/files` - List files
- `DELETE /api/files/{id}` - Delete file

### Analytics
- `GET /api/analytics` - Get analytics (Protected)
- `POST /api/analytics/event` - Track event (Public)

### CSV Upload (Protected)
- `POST /api/csv/quiz` - Bulk import quiz
- `POST /api/csv/maps` - Bulk import maps

## 🔒 Security Features

- **Cognito Authentication** - AWS managed auth
- **JWT Tokens** - Secure API access
- **IAM Roles** - Least privilege access
- **CORS Enabled** - Frontend integration
- **Input Validation** - All endpoints protected
- **Error Handling** - Consistent error responses

## 💰 Cost Optimization

- **Pay-per-request** - DynamoDB billing
- **Lambda cold starts** - Optimized for performance
- **S3 lifecycle** - Automatic file management
- **CloudWatch logs** - Automatic cleanup

## 🚀 Deployment Commands

\`\`\`bash
# Development deployment
npm run deploy:dev

# Production deployment  
npm run deploy:prod

# Remove stack
npm run remove:dev

# View logs
npm run logs -- authSignIn

# Invoke function locally
npm run invoke -- authSignIn --data '{"body":"{\"email\":\"test@example.com\",\"password\":\"password123\"}"}'
\`\`\`

## 📊 Monitoring

- **CloudWatch Logs** - All Lambda functions
- **CloudWatch Metrics** - Performance monitoring
- **X-Ray Tracing** - Request tracing (optional)
- **Custom Analytics** - Built-in analytics system

After deployment, you'll get the API Gateway URL to use in your frontend!
