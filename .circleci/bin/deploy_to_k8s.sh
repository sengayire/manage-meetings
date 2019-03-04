#!/usr/bin/env bash

ROOT_DIR=$(pwd)

source $ROOT_DIR/.circleci/bin/utils.sh

checkout_deployment_scripts() {
  info "Cloning deployment script"
  if [ "$CIRCLE_BRANCH" == "master" ]; then
      git clone -b ft-deployments-pipeline-164163187 https://github.com/andela/mrm-deployment-scripts.git ${HOME}/deployments
  elif [ "$CIRCLE_BRANCH" == "develop" ]; then
      git clone -b ft-deployments-pipeline-164163187 https://github.com/andela/mrm-deployment-scripts.git ${HOME}/deployments
  else
      git clone -b k8s-sandbox https://github.com/andela/mrm-deployment-scripts.git ${HOME}/deployments
  fi
  success "Successfully cloned deployment script"
}

terraform_values() {
  info "Generate Environment variables for deployment"
  cd ${HOME}/deployments/
  mkdir -p secrets
  echo $CERTIFICATE | base64 --decode > secrets/ssl_andela_certificate.crt
  echo $KEY | base64 --decode > secrets/ssl_andela_key.key
  cat secrets/ssl_andela_certificate.crt
  cat secrets/ssl_andela_key.key
  . supply_values.sh
  success "Environment variables successfully generated for deployment"
}

run_terraform() {
  info "Deploying to Kubernetes cluster"
  cd ${HOME}/deployments/
  . .circleci/deploy_to_kubernetes.sh
  deploy $(echo $CIRCLE_BRANCH)
  success "Successfully deployed application to cluster"
}

#run main
main() {
  checkout_deployment_scripts
  terraform_values
  run_terraform
}

main #@

