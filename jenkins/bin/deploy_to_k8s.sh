#!/usr/bin/env bash

source $WORKSPACE/jenkins/bin/utils.sh

checkout_deployment_scripts() {
  info "Cloning deployment script"
  if [ "$GIT_BRANCH" == "master" ]; then
      git clone -b master https://github.com/andela/mrm-deployment-scripts.git ${WORKSPACE}/deployments
  elif [ "$GIT_BRANCH" == "develop" ]; then
      git clone -b develop https://github.com/andela/mrm-deployment-scripts.git ${WORKSPACE}/deployments
  else
      git clone -b k8s-sandbox https://github.com/andela/mrm-deployment-scripts.git ${WORKSPACE}/deployments
  fi
  success "Successfully cloned deployment script"
}

terraform_values() {
  info "Generate Environment variables for deployment"
  cd ${WORKSPACE}/deployments/
  mkdir -p secrets
  echo $CERTIFICATE | base64 --decode > secrets/ssl_andela_certificate.crt
  echo $KEY | base64 --decode > secrets/ssl_andela_key.key

  sed -i -- 's/CIRCLE_BRANCH/GIT_BRANCH/g' supply_values.sh
  source supply_values.sh
  success "Environment variables successfully generated for deployment"
}

run_terraform() {
  info "Deploying to Kubernetes cluster"
  cd ${WORKSPACE}/deployments/

  sed -i -- 's/CIRCLE_BRANCH/GIT_BRANCH/g' .circleci/deploy_to_kubernetes.sh
  source .circleci/deploy_to_kubernetes.sh
  deploy $(echo $GIT_BRANCH)
  success "Successfully deployed application to cluster"
}

#run main
main() {
  checkout_deployment_scripts
  terraform_values
  run_terraform
}

main #@
