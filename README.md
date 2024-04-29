
# CI/CD Pipeline for Node.js Application

This project implements a Continuous Integration/Continuous Deployment (CI/CD) pipeline for a web application using GitHub Actions. The pipeline automates the process of testing, building, and deploying the application, ensuring a streamlined development workflow.



## Pre Requisite
1. AWS Account: Sign up for an AWS account if you don't have one already.
2. AWS CLI: Install and configure the AWS Command Line Interface (CLI) with your AWS credentials.
3. EC2 Instance: Launch an EC2 instance with an Ubuntu AMI supporting Node.js.
4. SSH Access: Access your EC2 instance via SSH using the provided key pair.
5. Docker: Ensure Docker is installed on your system.
6. Jenkins: Install Jenkins on your system for CI/CD.
7. Webhooks and Email Notification: Familiarize yourself with webhooks and email notifications for automation and communication purposes.

## Dockerfile
A Dockerfile is a script-like text file used to automate the creation of Docker images. It defines the environment setup and configuration steps for running an application inside a Docker container.

Why Use a Dockerfile?

Reproducibility: Ensures consistent environments.
Portability: Simplifies deployment across different systems.
Automation: Streamlines the image creation process.
Version Control: Dockerfiles can be version-controlled along with application code.

## Create a Dockerfile for node.js

FROM node:14-alpine: Sets up the base image for the project, using Node.js version 14 on Alpine Linux.

WORKDIR /app: Sets the working directory inside the Docker container to /app.

COPY package.json .: Copies the package.json file to the working directory.

RUN npm install: Installs project dependencies defined in package.json.

RUN npm install react-scripts: Installs react-scripts necessary for building the React application.

COPY . .: Copies all files from the host machine to the working directory in the container.

RUN npm run build: Builds the React application.

EXPOSE 3000: Exposes port 3000 to allow external connections to the application.

CMD ["npm","start"]: Specifies the command to run when the Docker container starts, which is npm start to start the application.

## Docker Compose Configuration
This Docker Compose configuration defines a service named app with the following specifications:

Service: app

Image: ajju121/nodeapp
Specifies the Docker image to use for the app service. In this case, it's pulling the image named ajju121/nodeapp from a container registry.

Ports:
Maps port 3000 on the host machine to port 3000 within the container.
Allows communication with the application running inside the container through port 3000.

Usage
To use this Docker Compose configuration:

## Install Docker Compose:
1. Ensure Docker Compose is installed on your system. If not, follow the official installation guide.
2. Create a docker-compose.yml file:
3. Create a file named docker-compose.yml in your project directory.
4. Copy the Configuration:
5. Copy the provided Docker Compose configuration into your docker-compose.yml file.
5. Run Docker Compose:
Open a terminal, navigate to your project directory containing the docker-compose.yml file, and run the following command:
```bash
  docker compose up
```
This command will start the Docker containers defined in the docker-compose.yml file.
Access the Application:
Once the containers are up and running, you can access the application by navigating to http://localhost:3000 in your web browser.
## Setup Instructions
1. Go to the ubuntu server
```bash
  sudo apt-get update
```
2. Clone the project

```bash
  git clone https://github.com/ajayhp07/Nodejs_project.git
```

3. Go to the project directory

```bash
  cd <project_directory>
```

4. Build Docker Image:

```bash
  docker build -t <image-name> .
```

5. Start the server

```bash
  docker run -p 3000:3000 -d <image-name> 
```
## Accessing the Application

Once the Docker container is running, you can access the application by navigating to http://localhost:3000 in your web browser.

## Jenkins CI/CD
## Setup Instructions
1. Go to the EC2 dashboard.
2. Take the PublicIp of Jenkins
```bash
  http://localhost:8080
```
3. Sign in Jenkins
```bash
  username and password
```
4. Touch to the New item 
5. Create Pipeline.

## Pipeline Overview
The CI/CD pipeline automates the process of building, testing, and deploying the project. It consists of the following stages:

1. Continuous Download: Downloads the latest code from the project's GitHub repository.

2. Build & Test: Builds the Docker image for the application and runs tests.

3. Push to DockerHub: Pushes the built Docker image to DockerHub for storage and distribution.

4. Deploy: Deploys the application by spinning up Docker containers using Docker Compose.

## Pipeline Configuration

The pipeline is configured using a Jenkinsfile (or similar configuration file) and is divided into stages, each with its set of steps. Below is a brief overview of each stage.

## syntax of declarative pipeline
```bash
pipeline {
    agent any // Runs on any available agent
    
    stages {
        stage('Build') { // Stage 1: Build
            steps {
                echo 'Building the project...'
                // Commands to build the project
            }
        }
        stage('Test') { // Stage 2: Test
            steps {
                echo 'Running tests...'
                // Commands to run tests
            }
        }
        stage('Deploy') { // Stage 3: Deploy
            steps {
                echo 'Deploying the application...'
                // Commands to deploy the application
            }
        }
    }
} 
```


## Continuous Download
1. Downloads the latest code from the GitHub repository.
2. Utilizes a try-catch block to handle errors. If the download    fails, an email notification is sent to the designated recipient.
```bash
stage("ContinousDownload")
        {
            steps
            {
                script
                {
                    try{
                        git"https://github.com/ajayhp07/Nodejs_project.git"
                    }
                    catch(Exception e)
                    {
                        mail bcc: '', body: 'please check', cc: '', from: '', replyTo: '', subject: 'ContinousDownload failed', to: 'ajjuhp783@gmail.com'
                        
                    }
                }
            }
        }

```
## Build & Test
1. Builds the Docker image for the application.
2. Runs tests to ensure the integrity of the build.
3. Uses a try-catch block to handle errors. If the build or tests fail, an email notification is sent to the designated recipient.
```bash
 stage("Build & Test")
        {
            steps
            {
                script
                {
                    try{
                        sh"docker build -t nodeapp ."
                    }
                    catch(Exception e)
                    {
                        mail bcc: '', body: 'please check', cc: '', from: '', replyTo: '', subject: 'Build & Test Failed', to: 'ajjuhp783@gmail.com'
                        
                    }
                }
            }
        }

```
## Above stage error occur
1. Permission Denied: You may see errors indicating that the jenkins user does not have permission to execute Docker commands. This could manifest as "permission denied" or "access denied" errors when Jenkins attempts to build Docker images, run Docker containers, or perform other Docker operations.

2. Docker Socket Connection Error: Jenkins might fail to connect to the Docker daemon socket (/var/run/docker.sock). This could result in errors such as "connection refused" or "cannot connect to Docker daemon" when Jenkins tries to interact with Docker.

3. To resolve this issue [it is used to add the user jenkins to the docker group. ]

```bash
  sudo usermod -aG docker jenkins 
```
4. Restart jenkins
```bash
  sudo systemctl restart jenkins
```

## Push to DockerHub
1. Pushes the built Docker image to DockerHub for storage and distribution.
2. Utilizes a try-catch block to handle errors. If the push fails, an email notification is sent to the designated recipient.
```bash
stage("Push to DockerHub")
        {
            steps
            {
                script
                {
                    try
                    {
                        withCredentials([usernamePassword(credentialsId:"dockerHub",passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]){
                            sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                            sh "docker tag nodeapp ${env.dockerHubUser}/nodeapp"
                            sh "docker push ${env.dockerHubUser}/nodeapp"
                        }
                    }
                    catch(Exception e)
                    {
                        mail bcc: '', body: 'please check', cc: '', from: '', replyTo: '', subject: 'Push to DockerHub Failed', to: 'ajjuhp783@gmail.com'
                        
                    }
                }
            }
        }

```
## Deploy
1. Deploys the application by spinning up Docker containers using Docker Compose.
2. Uses a try-catch block to handle errors. If the deployment fails, an email notification is sent to the designated recipient.
```bash
 stage("Deploy")
        {
            steps
            {
                script
                {
                    try
                    {
                       sh "docker compose down && docker compose up -d"
                    }
                    catch(Exception e)
                    {
                        mail bcc: '', body: 'please check', cc: '', from: '', replyTo: '', subject: 'Deploy Failed', to: 'ajjuhp783@gmail.com'
                        
                    }
                }
            }
        }
        
    }

```

## Error Handling and Email Notifications
The pipeline employs try-catch blocks to gracefully handle errors that may occur during execution. If an error occurs in any stage of the pipeline, an email notification is automatically sent to the designated recipient, providing details about the error and prompting further action.

## syntax of error handling

```bash
pipeline {
    agent any
    
    stages {
        stage('Example') {
            steps {
                script {
                    try {
                        // Code block where errors might occur
                        sh 'command_that_might_fail'
                    } catch (Exception e) {
                        // Error handling block
                        echo "An error occurred: ${e.message}"
                        // Additional actions for error handling
                    }
                }
            }
        }
    }
}


```

## Webhooks and Triggers
To automate the execution of the pipeline, webhooks can be configured in the version control system (e.g., GitHub) to trigger the pipeline on specific events such as code commits or pull requests.

# Usage
To use the pipeline:

1. Ensure Jenkins (or similar CI/CD tool) is set up with the appropriate plugins and configurations.
2. Configure the pipeline script (e.g., Jenkinsfile) with the appropriate repository URLs and credentials.
3. Set up webhooks in your version control system to trigger the pipeline on relevant events.
4. Monitor email notifications for any pipeline errors or failures and take necessary actions to resolve them.



