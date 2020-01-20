job('job_dsl_example_desde_git') {
    description('This is my awesome Job')
}

job('maven_dsl') {

    description('Maven dsl project')

    scm {
        git('https://github.com/jenkins-docs/simple-java-maven-app', 'master', {node -> node / 'extensions' << '' })
    }

    steps {
        maven {
            mavenInstallation('mvn-jenkins')
            goals('-B -DskipTests clean package')
        }
        maven {
            mavenInstallation('mvn-jenkins')
            goals('test')
        }
        shell('''
            echo ************RUNNING THE JAR************************
            java -jar /var/jenkins_home/workspace/mavn/target/my-app-1.0-SNAPSHOT.jar
        ''')
    }

    publishers {
        archiveArtifacts('target/*.jar')
        archiveJunit('target/surefire-reports/*.xml')
        mailer('alejandro.munoz@saldum.com', true, true)
    }
}
