#!/bin/bash

###JENKINS CONFIG
# Read the user input
JENKINS_TEMPLATE=./armory-jenkins-template.yml
JENKINS_YAML=./kustomize/patch-jenkins.yml

bold=$(tput bold)
normal=$(tput sgr0)

function ask {
    local prompt default reply

    if [ "${2:-}" = "Y" ]; then
        prompt="Y/n"
        default=Y
    elif [ "${2:-}" = "N" ]; then
        prompt="y/N"
        default=N
    else
        prompt="y/n"
        default=
    fi

    while true; do
        echo -n "$1 [$prompt] "
        read reply </dev/tty
        if [ -z "$reply" ]; then
            reply=$default
        fi
        case "$reply" in
            Y*|y*) return 0 ;;
            N*|n*) return 1 ;;
            *) printf "Please respond yes or no. ";;
        esac
    done
}
function query_jenkins {
  # remove any existing YAML file if it exists
  if [ -f "$JENKINS_YAML" ]; then
    /bin/rm -f "$JENKINS_YAML"
  fi
  if [ -f "$JENKINS_TEMPLATE" ]; then
    /bin/cp ${JENKINS_TEMPLATE} ${JENKINS_YAML}
    read -r -p "Enter a name for your Jenkins Master: " JENKINSNAME
    read -r -p "Enter the Jenkins Master hostname: " JENKINSHOSTNAME
    read -r -p "Enter the Jenkins Username: " JENKINSUSERNAME
    read -r -p "Enter Jenkins Authentication token: " JENKINSPASSWORD

    # Should check all supplied responses from user for BASH special characters,
    # otherwise the sed commands below may not perform as expected

    /usr/bin/sed -i '' "s/\${jenkinsname}/$JENKINSNAME/" ./kustomize/patch-jenkins.yml
    /usr/bin/sed -i '' "s/\${jenkinshostname}/$JENKINSHOSTNAME/" ./kustomize/patch-jenkins.yml
    /usr/bin/sed -i '' "s/\${jenkinsusername}/$JENKINSUSERNAME/" ./kustomize/patch-jenkins.yml
    /usr/bin/sed -i '' "s/\${jenkinspassword}/$JENKINSPASSWORD/" ./kustomize/patch-jenkins.yml
  else
    printf "Expected YAML template file ${JENKINS_TEMPLATE} is missing."
  fi

  if [ -f "$JENKINS_YAML" ]; then
    printf "\nJenkins is Configured!${bold}${normal}\n"
  else
    printf "\nCreation of jenkins yaml file failed.\n"
  fi
}

if ask "Do you use Jenkins? " N; then
  query_jenkins
# remove the else clause below if you want to do some other processing after
# a "No" response.
else
  exit
fi

###GITHUB CONFIG
# Read the user input
GITHUB_TEMPLATE=./armory-github-template.yml
GITHUB_YAML=./kustomize/patch-github.yml

bold=$(tput bold)
normal=$(tput sgr0)

function ask {
    local prompt default reply

    if [ "${2:-}" = "Y" ]; then
        prompt="Y/n"
        default=Y
    elif [ "${2:-}" = "N" ]; then
        prompt="y/N"
        default=N
    else
        prompt="y/n"
        default=
    fi

    while true; do
        echo -n "$1 [$prompt] "
        read reply </dev/tty
        if [ -z "$reply" ]; then
            reply=$default
        fi
        case "$reply" in
            Y*|y*) return 0 ;;
            N*|n*) return 1 ;;
            *) printf "Please respond yes or no. ";;
        esac
    done
}
function query_github {
  # remove any existing YAML file if it exists
  if [ -f "$GITHUB_YAML" ]; then
    /bin/rm -f "$GITHUB_YAML"
  fi
  if [ -f "$GITHUB_TEMPLATE" ]; then
    /bin/cp ${GITHUB_TEMPLATE} ${GITHUB_YAML}
    read -r -p "Enter the Github Username: " GITHUBUSERNAME
    read -r -p "Enter Github Authentication token: " GITHUBPASSWORD

    # Should check all supplied responses from user for BASH special characters,
    # otherwise the sed commands below may not perform as expected

    /usr/bin/sed -i '' "s/\${githubusername}/$GITHUBUSERNAME/" ./kustomize/patch-github.yml
    /usr/bin/sed -i '' "s/\${githubpassword}/$GITHUBPASSWORD/" ./kustomize/patch-github.yml
#kubectl create secret generic spin-secrets --from-literal github-token $GITHUBPASSWORD
  else
    printf "Expected YAML template file ${GITHUB_TEMPLATE} is missing."
  fi

  if [ -f "$GITHUB_YAML" ]; then
    printf "\nGithub is Configured!${bold}${normal}\n"
  else
    printf "\nCreation of github yaml file failed.\n"
  fi
}

if ask "Do you use Github? " N; then
  query_github
# remove the else clause below if you want to do some other processing after
# a "No" response.
else
  exit
fi

###DOCKER CONFIG
# Read the user input
DOCKER_TEMPLATE=./armory-docker-template.yml
DOCKER_YAML=./kustomize/patch-docker.yml

bold=$(tput bold)
normal=$(tput sgr0)

function ask {
    local prompt default reply

    if [ "${2:-}" = "Y" ]; then
        prompt="Y/n"
        default=Y
    elif [ "${2:-}" = "N" ]; then
        prompt="y/N"
        default=N
    else
        prompt="y/n"
        default=
    fi

    while true; do
        echo -n "$1 [$prompt] "
        read reply </dev/tty
        if [ -z "$reply" ]; then
            reply=$default
        fi
        case "$reply" in
            Y*|y*) return 0 ;;
            N*|n*) return 1 ;;
            *) printf "Please respond yes or no. ";;
        esac
    done
}
function query_docker {
  # remove any existing YAML file if it exists
  if [ -f "$DOCKER_YAML" ]; then
    /bin/rm -f "$DOCKER_YAML"
  fi
  if [ -f "$DOCKER_TEMPLATE" ]; then
    /bin/cp ${DOCKER_TEMPLATE} ${DOCKER_YAML}
    read -r -p "Enter a name for your Docker Configuration: " DOCKERNAME
    read -r -p "Enter the Docker Hostname (index.docker.io) : " DOCKERHOSTNAME
    read -r -p "Enter the Docker Username: " DOCKERUSERNAME
    read -r -p "Enter Docker Password: " DOCKERPASSWORD
    read -r -p "Enter Docker Repository (format org/repo) :" DOCKERREPO

    # Should check all supplied responses from user for BASH special characters,
    # otherwise the sed commands below may not perform as expected

    /usr/bin/sed -i '' "s/\${dockername}/$DOCKERNAME/" patch-docker.yml
    /usr/bin/sed -i '' "s/\${dockerhostname}/$DOCKERHOSTNAME/" ./kustomize/patch-docker.yml
    /usr/bin/sed -i '' "s/\${dockerusername}/$DOCKERUSERNAME/" ./kustomize/patch-docker.yml
    /usr/bin/sed -i '' "s/\${dockerpassword}/$DOCKERPASSWORD/" ./kustomize/patch-docker.yml
    /usr/bin/sed -i '' "s/\${dockerrepo}/$DOCKERREPO/" ./kustomize/patch-docker.yml
  else
    printf "Expected YAML template file ${DOCKER_TEMPLATE} is missing."
  fi

  if [ -f "$DOCKER_YAML" ]; then
    printf "\nDocker is Configured!${bold}${normal}\n"
  else
    printf "\nCreation of docker yaml file failed.\n"
  fi
}

if ask "Do you use Docker? " N; then
  query_docker
# remove the else clause below if you want to do some other processing after
# a "No" response.
else
  exit
fi

###KUBERNETES ACCT CONFIG
# Read the user input
KUBERNETES_TEMPLATE=./armory-kubernetes-acct-template.yml
KUBERNETES_YAML=./kustomize/patch-kubernetes-acct.yml

bold=$(tput bold)
normal=$(tput sgr0)

function ask {
    local prompt default reply

    if [ "${2:-}" = "Y" ]; then
        prompt="Y/n"
        default=Y
    elif [ "${2:-}" = "N" ]; then
        prompt="y/N"
        default=N
    else
        prompt="y/n"
        default=
    fi

    while true; do
        echo -n "$1 [$prompt] "
        read reply </dev/tty
        if [ -z "$reply" ]; then
            reply=$default
        fi
        case "$reply" in
            Y*|y*) return 0 ;;
            N*|n*) return 1 ;;
            *) printf "Please respond yes or no. ";;
        esac
    done
}
function query_kubernetes {
  # remove any existing YAML file if it exists
  if [ -f "$KUBERNETES_YAML" ]; then
    /bin/rm -f "$KUBERNETES_YAML"
  fi
  if [ -f "$KUBERNETES_TEMPLATE" ]; then
    /bin/cp ${KUBERNETES_TEMPLATE} ${KUBERNETES_YAML}
    read -r -p "Enter a name for this kubernetes deployment acct: " KUBERNETESNAME
    read -r -p "Enter kubernetes service account contents: " KUBERNETESCONTENTS

    # Should check all supplied responses from user for BASH special characters,
    # otherwise the sed commands below may not perform as expected

    /usr/bin/sed -i '' "s/\${kubernetesname}/$KUBERNETESNAME/" ./kustomize/patch-kubernetes-acct.yml
    /usr/bin/sed -i '' "s/\${kubernetescontents}/$KUBERNETESCONTENTS/" ./kustomize/patch-kubernetes-acct.yml
  else
    printf "Expected YAML template file ${KUBERNETES_TEMPLATE} is missing."
  fi

  if [ -f "$KUBERNETES_YAML" ]; then
    printf "\nKubernetes is Configured!${bold}${normal}\n"
  else
    printf "\nCreation of kubernetes yaml file failed.\n"
  fi
}

if ask "Do you use Kubernetes? " N; then
  query_kubernetes
# remove the else clause below if you want to do some other processing after
# a "No" response.
else
  exit
fi

###DINGHY CONFIG
# Read the user input
DINGHY_TEMPLATE=./armory-dinghy-template.yml
DINGHY_YAML=./kustomize/patch-dinghy.yml

bold=$(tput bold)
normal=$(tput sgr0)

function ask {
    local prompt default reply

    if [ "${2:-}" = "Y" ]; then
        prompt="Y/n"
        default=Y
    elif [ "${2:-}" = "N" ]; then
        prompt="y/N"
        default=N
    else
        prompt="y/n"
        default=
    fi

    while true; do
        echo -n "$1 [$prompt] "
        read reply </dev/tty
        if [ -z "$reply" ]; then
            reply=$default
        fi
        case "$reply" in
            Y*|y*) return 0 ;;
            N*|n*) return 1 ;;
            *) printf "Please respond yes or no. ";;
        esac
    done
}
function query_dinghy {
  # remove any existing YAML file if it exists
  if [ -f "$DINGHY_YAML" ]; then
    /bin/rm -f "$DINGHY_YAML"
  fi
  if [ -f "$DINGHY_TEMPLATE" ]; then
    /bin/cp ${DINGHY_TEMPLATE} ${DINGHY_YAML}
    read -r -p "Enter a name for your Dinghy Configuration: " DINGHYNAME
    read -r -p "Enter the GitHub Orginization: " DINGHYORG
    read -r -p "Enter the Dinghy Repository: " DINGHYREPO
    read -r -p "Enter Dinghy Github Token: " DINGHYTOKEN

    # Should check all supplied responses from user for BASH special characters,
    # otherwise the sed commands below may not perform as expected

    /usr/bin/sed -i '' "s/\${dinghyname}/$DINGHYNAME/" ./kustomize/patch-dinghy.yml
    /usr/bin/sed -i '' "s/\${dinghyorg}/$DINGHYORG/" ./kustomize/patch-dinghy.yml
    /usr/bin/sed -i '' "s/\${dinghyrepo}/$DINGHYREPO/" ./kustomize/patch-dinghy.yml
    /usr/bin/sed -i '' "s/\${dinghytoken}/$DINGHYTOKEN/" ./kustomize/patch-dinghy.yml
  else
    printf "Expected YAML template file ${DINGHY_TEMPLATE} is missing."
  fi

  if [ -f "$DINGHY_YAML" ]; then
    printf "\nDinghy is Configured!${bold}${normal}\n"
  else
    printf "\nCreation of dinghy yaml file failed.\n"
  fi
}

if ask "Do you want Pipelines as Code? " N; then
  query_dinghy
# remove the else clause below if you want to do some other processing after
# a "No" response.
else
  exit
fi

###TERRAFORM CONFIG
# Read the user input
TERRAFORM_TEMPLATE=./armory-terraform-template.yml
TERRAFORM_YAML=./kustomize/patch-terraform.yml

bold=$(tput bold)
normal=$(tput sgr0)

function ask {
    local prompt default reply

    if [ "${2:-}" = "Y" ]; then
        prompt="Y/n"
        default=Y
    elif [ "${2:-}" = "N" ]; then
        prompt="y/N"
        default=N
    else
        prompt="y/n"
        default=
    fi

    while true; do
        echo -n "$1 [$prompt] "
        read reply </dev/tty
        if [ -z "$reply" ]; then
            reply=$default
        fi
        case "$reply" in
            Y*|y*) return 0 ;;
            N*|n*) return 1 ;;
            *) printf "Please respond yes or no. ";;
        esac
    done
}
function query_terraform {
  # remove any existing YAML file if it exists
  if [ -f "$TERRAFORM_YAML" ]; then
    /bin/rm -f "$TERRAFORM_YAML"
  fi
  if [ -f "$TERRAFORM_TEMPLATE" ]; then
    /bin/cp ${TERRAFORM_TEMPLATE} ${TERRAFORM_YAML}
    read -r -p "Enter Terraform Authentication token: " TERRAFORMTOKEN

    # Should check all supplied responses from user for BASH special characters,
    # otherwise the sed commands below may not perform as expected

    /usr/bin/sed -i '' "s/\${terraformtoken}/$TERRAFORMTOKEN/" ./kustomize/patch-terraform.yml
  else
    printf "Expected YAML template file ${TERRAFORM_TEMPLATE} is missing."
  fi

  if [ -f "$TERRAFORM_YAML" ]; then
    printf "\nTerraform is Configured! Run ${bold}'kustomize build ./kustomize/ | kubectl -n spinnaker apply -f -${normal}\n"
  else
    printf "\nCreation of terraform yaml file failed.\n"
  fi
}

if ask "Do you use Terraform? " N; then
  query_terraform
# remove the else clause below if you want to do some other processing after
# a "No" response.
else
  exit
fi
