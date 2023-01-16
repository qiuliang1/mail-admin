pipeline {
    agent {
        docker {
            image 'node:14.21-alpine' 
            args '-p 3000:3000' 
        }
    }
    // parameters {

    // }
    options {
        timestamps()
        timeout(5)
    }
    stages {
        // stage('Git') {
        //     step {

        //     }
        // }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}