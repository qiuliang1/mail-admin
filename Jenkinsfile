pipeline {
    agent any
    // parameters {

    // }
    tools {nodejs "nodejs14"}
    options {
        timestamps()
        timeout(5)
    }
    stages {
         stage('Test') {
            steps {
                sh 'node --version'
            }
        }
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