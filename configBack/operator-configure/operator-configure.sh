#!/bin/bash

###JENKINS CONFIG
# Read the user input
JENKINS_TEMPLATE=./patch-jenkins-template.yml
JENKINS_YAML=./final-operator/patch-jenkins.yml

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

    /usr/bin/sed -i '' "s/\${jenkinsname}/$JENKINSNAME/" patch-jenkins.yml
    /usr/bin/sed -i '' "s/\${jenkinshostname}/$JENKINSHOSTNAME/" patch-jenkins.yml
    /usr/bin/sed -i '' "s/\${jenkinsusername}/$JENKINSUSERNAME/" patch-jenkins.yml
    /usr/bin/sed -i '' "s/\${jenkinspassword}/$JENKINSPASSWORD/" patch-jenkins.yml
  else
    printf "Expected YAML template file ${JENKINS_TEMPLATE} is missing."
  fi

  if [ -f "$JENKINS_YAML" ]; then
    printf "\nJenkins is Configured! Run ${bold}'kubectl apply -f SpinnakerService.yml${normal}\n"
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
GITHUB_TEMPLATE=./patch-github-template.yml
GITHUB_YAML=./final-operator/patch-github.yml

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

    /usr/bin/sed -i '' "s/\${githubusername}/$GITHUBUSERNAME/" patch-github.yml
    /usr/bin/sed -i '' "s/\${githubpassword}/$GITHUBPASSWORD/" patch-github.yml
#kubectl create secret generic spin-secrets --from-literal github-token $GITHUBPASSWORD
  else
    printf "Expected YAML template file ${GITHUB_TEMPLATE} is missing."
  fi

  if [ -f "$GITHUB_YAML" ]; then
    printf "\nGithub is Configured! Run ${bold}'kubectl apply -f SpinnakerService.yml${normal}\n"
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
###TERRAFORM CONFIG
# Read the user input
TERRAFORM_TEMPLATE=./patch-terraform-template.yml
TERRAFORM_YAML=./final-operator/patch-terraform.yml

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
    read -r -p "Enter Terraform Authentication token: " TERRAFORMPASSWORD

    # Should check all supplied responses from user for BASH special characters,
    # otherwise the sed commands below may not perform as expected

    /usr/bin/sed -i '' "s/\${terraformpassword}/$TERRAFORMPASSWORD/" patch-terraform.yml
  else
    printf "Expected YAML template file ${TERRAFORM_TEMPLATE} is missing."
  fi

  if [ -f "$TERRAFORM_YAML" ]; then
    printf "\nTerraform is Configured! Run ${bold}'kubectl apply -f SpinnakerService.yml${normal}\n"
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
