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
                sh 'tar -zcvf build-origin.tar.gz build'
            }
        }
        stage('Deploy') {
            agent none
            // steps {
            //     sh 'scp -P 11002 build-origin.tar.gz root@223.112.158.210:/home/nginx/www/web'
            // }
            steps {
                script {
                    def remote = [:]
                    remote.name = '101.35'
                    remote.host = '101.35.190.75'
                    remote.port = 11002
                    remote.user = 'root'
                    remote.password = 'Qiul@2023#'
                    remote.allowAnyHosts = true
                    stage('Remote SSH') {
                        sshCommand remote: remote, command: "cd /home/nginx"
                        sshCommand remote: remote, command: "ls -lrt"
                        sshCommand remote: remote, command: "for i in {1..5}; do echo -n \"Loop \$i \"; date ; sleep 1; done"
                    }
                }
            }
        }
    }
}