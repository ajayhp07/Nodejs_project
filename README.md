## CI/CD Pipeline for Node.js Application

This project implements a Continuous Integration/Continuous Deployment (CI/CD) pipeline for a Node.js web application using GitHub Actions and Jenkins. The pipeline automates the process of testing, building, and deploying the application, ensuring an efficient development workflow.

## Pre Requisites:

AWS Account: Sign up for an AWS account if you don't have one already.
AWS CLI: Install and configure the AWS Command Line Interface (CLI) with your AWS credentials.
EC2 Instance: Launch an EC2 instance with an Ubuntu AMI supporting Node.js.
SSH Access: Access your EC2 instance via SSH using the provided key pair.
Docker: Ensure Docker is installed on your system.
Jenkins: Install Jenkins on your system for CI/CD.
Webhooks and Email Notification: Familiarize yourself with webhooks and email notifications for automation and communication purposes.
Dockerfile:

A Dockerfile automates the creation of Docker images, providing consistency and portability across different environments.

## Dockerfile
Copy code
# Specify base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy application files
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
Docker Compose Configuration:

Docker Compose simplifies multi-container Docker applications by defining services and their configurations.

yaml
Copy code
version: '3'

services:
  app:
    image: ajju121/nodeapp
    ports:
      - "3000:3000"
Usage:

Install Docker Compose: Follow the official installation guide to install Docker Compose on your system.
Create docker-compose.yml: Create a file named docker-compose.yml in your project directory and copy the provided configuration.
Run Docker Compose: Navigate to your project directory containing docker-compose.yml and execute docker compose up in the terminal.
Access Application: Once containers are running, access the application at http://localhost:3000 in your web browser.
Setup Instructions:

## EC2 Setup:
Update packages: sudo apt-get update
Clone project: git clone https://github.com/ajayhp07/Nodejs_project.git
Navigate to project directory: cd <project_directory>
Build Docker Image: docker build -t <image-name> .
Start server: docker run -p 3000:3000 -d <image-name>
Jenkins CI/CD Setup:
Access Jenkins: Go to the EC2 dashboard, take the Public IP of Jenkins, and access it at http://<public_ip>:8080.
Sign in with username and password.
Create a new pipeline.
## Pipeline Overview:

The CI/CD pipeline automates the process of building, testing, and deploying the project. It consists of the following stages:

Continuous Download: Downloads the latest code from the project's GitHub repository.
Build & Test: Builds the Docker image for the application and runs tests.
Push to DockerHub: Pushes the built Docker image to DockerHub for storage and distribution.
Deploy: Deploys the application by spinning up Docker containers using Docker Compose.
Pipeline Configuration:

The pipeline is configured using a Jenkinsfile and is divided into stages, each with its set of steps.

groovy
Copy code
pipeline {
    agent any
    
    stages {
        stage('Continuous Download') {
            steps {
                script {
                    try {
                        git "https://github.com/ajayhp07/Nodejs_project.git"
                    } catch(Exception e) {
                        mail bcc: '', body: 'Please check', cc: '', from: '', replyTo: '', subject: 'Continuous Download failed', to: 'ajjuhp783@gmail.com'
                    }
                }
            }
        }
        
        stage('Build & Test') {
            steps {
                script {
                    try {
                        sh "docker build -t nodeapp ."
                    } catch(Exception e) {
                        mail bcc: '', body: 'Please check', cc: '', from: '', replyTo: '', subject: 'Build & Test Failed', to: 'ajjuhp783@gmail.com'
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    try {
                        withCredentials([usernamePassword(credentialsId:"dockerHub",passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]){
                            sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                            sh "docker tag nodeapp ${env.dockerHubUser}/nodeapp"
                            sh "docker push ${env.dockerHubUser}/nodeapp"
                        }
                    } catch(Exception e) {
                        mail bcc: '', body: 'Please check', cc: '', from: '', replyTo: '', subject: 'Push to DockerHub Failed', to: 'ajjuhp783@gmail.com'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    try {
                       sh "docker compose down && docker compose up -d"
                    } catch(Exception e) {
                        mail bcc: '', body: 'Please check', cc: '', from: '', replyTo: '', subject: 'Deploy Failed', to: 'ajjuhp783@gmail.com'
                    }
                }
            }
        }
    }
}
## Error Handling and Email Notifications:

The pipeline utilizes try-catch blocks to handle errors gracefully. If an error occurs in any stage, an email notification is sent to the designated recipient.

## Webhooks and Triggers:

Configure webhooks in the version control system to trigger the pipeline on relevant events like code commits or pull requests.

Usage:

Ensure Jenkins is set up with the appropriate plugins and configurations. Configure the pipeline script (e.g., Jenkinsfile) with repository URLs and credentials. Set up webhooks in the version control system to trigger the pipeline. Monitor email notifications for any pipeline errors or failures and take necessary actions to resolve them.
