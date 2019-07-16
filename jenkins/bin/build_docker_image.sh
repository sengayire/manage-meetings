#!/usr/bin/env bash

source $WORKSPACE/jenkins/bin/utils.sh

# authenticate to GCR
auth_to_docker_registry() {
  info "Authenticating to GCR"
  if [ $BRANCH_NAME == 'master' ]; then
    docker login -u _json_key -p "$(echo $GOOGLE_CREDENTIALS_STAGING | base64 --decode)" https://gcr.io
  elif [ $BRANCH_NAME == 'develop' ]; then
    docker login -u _json_key -p "$(echo $GOOGLE_CREDENTIALS_STAGING | base64 --decode)" https://gcr.io
  else
    docker login -u _json_key -p "$(echo $GOOGLE_CREDENTIALS_SANDBOX | base64 --decode)" https://gcr.io
  fi
  success "Authentication successful"
}

#  Updating the image version to the latest
save_image_version() {
  info "Updating the image version to the latest"
  if [ $BRANCH_NAME == 'master' ]; then
    # update image forntend production image version on GCR
    gsutil cp current_version gs://${PRODUCTION_FRONTEND_IMAGE_VERSION_PATH}
  elif [ $BRANCH_NAME == 'develop' ]; then
    # update image frontend staging image version on GCR
    gsutil cp current_version gs://${STAGING_FRONTEND_IMAGE_VERSION_PATH}
  else
    # update image frontend sandbox image version on GCR
    gsutil cp current_version gs://${SANDBOX_FRONTEND_IMAGE_VERSION_PATH}
  fi
  success "Image version updated successfully"
}

# build and push image
build_docker_image() {
  info "Building docker image"
  if [ $BRANCH_NAME == 'master' ]; then
    # build docker image and tag it with production frontend image name
    docker build -f ./docker/Dockerfile -t ${PRODUCTION_FRONTEND_IMAGE}:${IMAGE_TAG} .
    success "Docker Image built successfully"
    # push image to production frontend image path
    docker push ${PRODUCTION_FRONTEND_IMAGE}:${IMAGE_TAG}
  elif [ $BRANCH_NAME == 'develop' ]; then
    # build docker image and tag it with staging frontend image name
    docker build -f ./docker/Dockerfile -t ${STAGING_FRONTEND_IMAGE}:${IMAGE_TAG} .
    success "Docker Image built successfully"
    # push image to staging frontend image path
    docker push ${STAGING_FRONTEND_IMAGE}:${IMAGE_TAG}
  else
    # build docker image and tag it with sandbox frontend image name
    docker build -f ./docker/Dockerfile -t ${SANDBOX_FRONTEND_IMAGE}:${IMAGE_TAG} .
    success "Docker Image built successfully"
    # push image to sandbox frontend image path
    docker push ${SANDBOX_FRONTEND_IMAGE}:${IMAGE_TAG}
  fi
  success "Docker Image successfully pushed to container registry"
}


run_build() {
  export PATH=$PATH:/usr/local/gcloud/google-cloud-sdk/bin
  cd $WORKSPACE
  auth_to_docker_registry
  build_docker_image
  touch current_version
  echo ${IMAGE_TAG} > current_version
  save_image_version
}

main() {
  run_build
}

main
