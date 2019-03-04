#!/usr/bin/env bash

ROOT_DIR=$(pwd)

source $ROOT_DIR/.circleci/bin/utils.sh

# authenticate to GCR
auth_to_docker_registry() {
  info "Authenticating to GCR"
  if [ $CIRCLE_BRANCH == 'master' ]; then
    docker login -u _json_key -p "$(echo $GOOGLE_CREDENTIALS_STAGING | base64 --decode)" https://gcr.io
  elif [ $CIRCLE_BRANCH == 'develop' ]; then
    docker login -u _json_key -p "$(echo $GOOGLE_CREDENTIALS_STAGING | base64 --decode)" https://gcr.io
  else
    docker login -u _json_key -p "$(echo $GOOGLE_CREDENTIALS_SANDBOX | base64 --decode)" https://gcr.io
  fi
  success "Authentication successful"
}

#  Updating the image version to the latest
save_image_version() {
  info "Updating the image version to the latest"
  if [ $CIRCLE_BRANCH == 'master' ]; then
    gsutil cp current_version gs://${PRODUCTION_FRONTEND_IMAGE_VERSION_PATH}
  elif [ $CIRCLE_BRANCH == 'develop' ]; then
    gsutil cp current_version gs://${STAGING_FRONTEND_IMAGE_VERSION_PATH}
  else
    gsutil cp current_version gs://${SANDBOX_FRONTEND_IMAGE_VERSION_PATH}
  fi
  success "Image version updated successfully"
}

# build and push image
build_docker_image() {
  info "Building docker image"
  if [ $CIRCLE_BRANCH == 'master' ]; then
    docker build -f ./docker/Dockerfile -t ${PRODUCTION_FRONTEND_IMAGE}:${IMAGE_TAG} .
    success "Docker Image built successfully"
    docker push ${PRODUCTION_FRONTEND_IMAGE}:${IMAGE_TAG}
  elif [ $CIRCLE_BRANCH == 'develop' ]; then
    docker build -f ./docker/Dockerfile -t ${STAGING_FRONTEND_IMAGE}:${IMAGE_TAG} .
    success "Docker Image built successfully"
    docker push ${STAGING_FRONTEND_IMAGE}:${IMAGE_TAG}
  else
    docker build -f ./docker/Dockerfile -t ${SANDBOX_FRONTEND_IMAGE}:${IMAGE_TAG} .
    success "Docker Image built successfully"
    docker push ${SANDBOX_FRONTEND_IMAGE}:${IMAGE_TAG}
  fi
  success "Docker Image successfully pushed to container registry"
}


run_build() {
  export PATH=$PATH:/usr/local/gcloud/google-cloud-sdk/bin
  cd ~/repo
  auth_to_docker_registry
  build_docker_image
  touch current_version
  echo ${IMAGE_TAG} > current_version
  save_image_version
}

run_build
