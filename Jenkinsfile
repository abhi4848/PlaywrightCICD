pipeline {
    agent any
    
    parameters {
        choice(
            name: 'NODE_VERSION',
            choices: ['18.18.2', '20.11.1', '22.3.0'],
            description: 'Node.js version to use for testing'
        )
    }
    
    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    tools {
    nodejs 'NodeJS-20'
}

environment {
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = 'false'
}
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Checking out code..."
                    checkout scm
                }
            }
        }
        
        stage('Verify Node.js') {
            steps {
                script {
                    echo "Node.js version: ${params.NODE_VERSION}"
                    bat '''
                        node --version
                        npm --version
                    '''
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing npm dependencies..."
                    bat 'npm install'
                }
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                script {
                    echo "Installing Playwright browsers..."
                    bat 'npx playwright install --with-deps'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    echo "Running Playwright tests..."
                    bat 'npx playwright test'
                }
            }
        }
        
        stage('Merge Reports') {
            steps {
                script {
                    echo "Merging test reports..."
                    bat '''
                        if exist merged-blob-reports rmdir /s /q merged-blob-reports
                        mkdir merged-blob-reports
                        if exist blob-report (
                            xcopy blob-report merged-blob-reports /e /i /y
                        )
                    '''
                    bat 'npx playwright merge-reports --reporter html merged-blob-reports || exit /b 0'
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "Archiving test results..."
                
                // Archive Playwright reports
                archiveArtifacts artifacts: 'playwright-report/**', 
                                 allowEmptyArchive: true,
                                 onlyIfSuccessful: false
                
                archiveArtifacts artifacts: 'blob-report/**',
                                 allowEmptyArchive: true,
                                 onlyIfSuccessful: false
                
                // Publish HTML Report
               archiveArtifacts artifacts: 'playwright-report/**',
                 allowEmptyArchive: true

archiveArtifacts artifacts: 'blob-report/**',
                 allowEmptyArchive: true
                
                // JUnit XML Report (if exists)
                junit testResults: '**/test-results/*.xml',
                      allowEmptyResults: true
            }
        }
        
        success {
            script {
                echo "✓ Tests passed successfully!"
            }
        }
        
        failure {
            script {
                echo "✗ Tests failed. Check the report above."
            }
        }
    }
}
