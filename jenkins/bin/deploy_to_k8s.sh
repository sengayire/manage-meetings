#!/usr/bin/env bash

source $WORKSPCE/jenkins/bin/utils.sh

checkout_deployment_scripts() {
  if [ "$GIT_BRANCH" == "master" ]; then
    # clone master branch of deployment-scripts repo into deployment directory
    git clone -b master https://github.com/andela/mrm-deployment-scripts.git ${HOME}/deployments
  elif [ "$GIT_BRANCH" == "develop" ]; then
    # clone develop branch of deployment-scripts repo into deployment directory
    git clone -b develop https://github.com/andela/mrm-deployment-scripts.git  ${HOME}/deployments
  else
    # clone master k8s-sandbox of deployment-scripts repo into deployment directory
    git clone -b k8s-sandbox https://github.com/andela/mrm-deployment-scripts.git  ${HOME}/deployments
  fi
}

# Get terraform values
terraform_values() {
  cd ${HOME}/deployments/
  mkdir -p ${HOME}/deployments/secrets
  echo $CERTIFICATE | base64 -d > ${HOME}/deployments/secrets/ssl_andela_certificate.crt
  echo $KEY | base64 -d > ${HOME}/deployments/secrets/ssl_andela_key.key
  sed -i -- 's/base64 --decode/base64 -d/g' ${HOME}/deployments/.circleci/deploy_to_kubernetes.sh
  sed -i -- 's/CIRCLE_BRANCH/GIT_BRANCH/g' ${HOME}/deployments/.circleci/deploy_to_kubernetes.sh
  sed -i -- 's/CIRCLE_BRANCH/GIT_BRANCH/g' ${HOME}/deployments/supply_values.sh
  source supply_values.sh
}

# Run terraform
run_terraform() {
  cd ${HOME}/deployments/
  sed -i -- 's/base64 --decode/base64 -d/g' ${HOME}/deployments/.circleci/deploy_to_kubernetes.sh
  sed -i -- 's/CIRCLE_BRANCH/GIT_BRANCH/g' ${HOME}/deployments/.circleci/deploy_to_kubernetes.sh
  source .circleci/deploy_to_kubernetes.sh
  deploy $(echo $GIT_BRANCH)
}

main() {
  checkout_deployment_scripts
  terraform_values
  run_terraform
}

main #@
