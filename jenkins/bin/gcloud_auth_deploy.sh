#!/usr/bin/env bash

gcloud_auth_deploy() {
  if [ "$GIT_BRANCH" == master ] || [ "$GIT_BRANCH" == develop ]; then
    touch google-service-key.json
    echo $GOOGLE_CREDENTIALS_STAGING | base64 --decode >> google-service-key.json
    gcloud auth activate-service-account --key-file google-service-key.json
    gcloud --quiet config set project ${GOOGLE_PROJECT_ID_STAGING}
    gcloud --quiet config set compute/zone ${GOOGLE_COMPUTE_ZONE}
  else
    touch google-service-key.json
    echo $GOOGLE_CREDENTIALS_SANDBOX | base64 --decode >> google-service-key.json
    gcloud auth activate-service-account --key-file google-service-key.json
    gcloud --quiet config set project ${GOOGLE_PROJECT_ID_SANDBOX}
    gcloud --quiet config set compute/zone ${GOOGLE_COMPUTE_ZONE}
  fi
}

main() {
  gcloud_auth_deploy
}

main
