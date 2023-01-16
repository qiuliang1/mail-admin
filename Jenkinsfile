pipeline {
    agent any
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