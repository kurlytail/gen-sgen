

pipeline {
    agent none

    //triggers {
    //    upstream(upstreamProjects: 'kurlytail/gen-lib/master', threshold: hudson.model.Result.SUCCESS)
    //}

    parameters {
        string(defaultValue: "1.1", description: 'Build version prefix', name: 'BUILD_VERSION_PREFIX')
        string(defaultValue: "", description: 'Build number offset', name: 'BUILDS_OFFSET')
    }

    stages {
        stage('Prepare env') {
            agent {
                label 'master'
            }

            steps {
                script {
                    loadLibrary()
                    env['NPM_VERSION_NUMBER'] = getNpmVersion 'kurlytail/gen-sgen/master', params.BUILD_VERSION_PREFIX, params.BUILDS_OFFSET
                    currentBuild.displayName = env['NPM_VERSION_NUMBER']
                }
            }
        }

        stage ('NPM Build') {
            agent {
                label 'node-build'
            }

            steps {
                sh 'rm -rf *'

                checkout scm

                nodejs(nodeJSInstallationName: 'Node') {
                    sh 'npm install --no-save'
                    sh 'npm version $NPM_VERSION_NUMBER'
                    sh 'npm run lint'
                    sh 'npm run test'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'coverage',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ]
                    junit 'test-report.xml'
                    sh 'npm run build'
                    sh 'npm publish'
                }
            }
        }
    }

    post {
        always {
            slackSend message: "gen-sgen build ${env.NPM_VERSION_NUMBER} - Status ${currentBuild.result} - ${env.BUILD_URL}"
        }
    }
}
