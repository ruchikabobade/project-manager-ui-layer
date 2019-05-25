node {
    try {
        def app
        stage('Clone repository') {
            checkout scm
        }
        stage('Build') {
            sh 'bash ./build.sh'
        }
        stage('Build Docker image') {
            app = docker.build("ruchikadocker/project-manager-app", "-f ./Dockerfile .")
        }
        stage('Push image') {
            docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                app.push("${env.BUILD_NUMBER}")
                app.push("latest")
            }
        }
    } finally {
        stage('cleanup') {
            echo "doing some cleanup..."
        }
    }
}