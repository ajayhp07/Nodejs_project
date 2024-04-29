pipeline
{
    agent any
    stages
    {
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
}
