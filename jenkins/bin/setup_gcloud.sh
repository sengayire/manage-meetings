#!/usr/bin/env bash

install_gcloud() {
  # install gcloud
  curl https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz > /tmp/google-cloud-sdk.tar.gz
  mkdir -p /usr/local/gcloud
  tar -C /usr/local/gcloud -vxf /tmp/google-cloud-sdk.tar.gz
  /usr/local/gcloud/google-cloud-sdk/install.sh --quiet
  echo PATH=$PATH:/usr/local/gcloud/google-cloud-sdk/bin >> ~/.bashrc

  # store Service Account Key into file
  if [ "$BRANCH_NAME" == master ] || [ "$BRANCH_NAME" == develop ]; then
    export PATH=$PATH:/usr/local/gcloud/google-cloud-sdk/bin
    echo $GOOGLE_CREDENTIALS_STAGING | base64 --decode >> gcloud-service-key.json
    gcloud auth activate-service-account --key-file gcloud-service-key.json
    gcloud --quiet config set project ${GOOGLE_PROJECT_ID_STAGING}
    gcloud --quiet config set compute/zone ${GOOGLE_COMPUTE_ZONE}
  else
    export PATH=$PATH:/usr/local/gcloud/google-cloud-sdk/bin
    echo $GOOGLE_CREDENTIALS_SANDBOX | base64 --decode >> gcloud-service-key.json
    gcloud auth activate-service-account --key-file gcloud-service-key.json
    gcloud --quiet config set project ${GOOGLE_PROJECT_ID_SANDBOX}
    gcloud --quiet config set compute/zone ${GOOGLE_COMPUTE_ZONE}
  fi
}

main() {
  install_gcloud
}

main
