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
                // sh 'scp -P 11002 build-origin.tar.gz root@223.112.158.210:/home/nginx/www/web'
            }
            
        }
        stage('Push') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'self server', 
                            transfers: [
                                sshTransfer(
                                cleanRemote: false, 
                                excludes: '', 
                                execCommand: """
                                    set -x  
                                    echo "代码逻辑块..."
                                """, 
                                execTimeout: 0, 
                                flatten: false, 
                                makeEmptyDirs: false, 
                                noDefaultExcludes: false, 
                                patternSeparator: '[, ]+', 
                                remoteDirectory: "/home/nginx/www/web",
                                remoteDirectorySDF: false,
                                removePrefix: "", 
                                sourceFiles: "./build-origin.tar.gz"
                                )
                            ],
                            usePromotionTimestamp: false, 
                            useWorkspaceInPromotion: false, 
                            verbose: true
                        )
                    ]
                )
            }
        }
        // stage('Deploy') {
        //     agent none
        //     // steps {
        //     //     sh 'scp -P 11002 build-origin.tar.gz root@223.112.158.210:/home/nginx/www/web'
        //     // }
        //     steps {
        //         script {
        //             def remote = [:]
        //             remote.name = '101.35'
        //             remote.host = '101.35.190.75'
        //             remote.port = 11002
        //             remote.user = 'root'
        //             remote.password = 'Qiul@2023#'
        //             remote.allowAnyHosts = true
        //             stage('Remote SSH') {
        //                 sshCommand remote: remote, command: "cd /home/nginx"
        //                 sshCommand remote: remote, command: "ls -lrt"
        //                 sshCommand remote: remote, command: "for i in {1..5}; do echo -n \"Loop \$i \"; date ; sleep 1; done"
        //             }
        //         }
        //     }
        // }
    }
}