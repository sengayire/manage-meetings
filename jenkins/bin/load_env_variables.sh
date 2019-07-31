#!/usr/bin/env bash

# get global environment variables for branch and environment

#Environment for frontend

ROOT_DIR=$WORKSPACE

# import utility script
source $ROOT_DIR/jenkins/bin/utils.sh

NODE_ENV=production

# validate to check if core variable are defined
require ANDELA_LOGIN_URL $ANDELA_LOGIN_URL
require ANDELA_API_URL $ANDELA_API_URL
require FIREBASE_API_KEY $FIREBASE_API_KEY
require FIREBASE_DATABASE_NAME $FIREBASE_DATABASE_NAME
require FIREBASE_BUCKET $FIREBASE_BUCKET
require FIREBASE_PROJECT_ID $FIREBASE_PROJECT_ID
require BASE_URL $BASE_URL


#check current branch to get environment specific variables
if [ $GIT_BRANCH == 'master' ]; then
  require MRM_API_URL_PRODUCTION $MRM_API_URL_PRODUCTION
  require MRM_URL_PRODUCTION $MRM_URL_PRODUCTION
  export MRM_API_URL=$MRM_API_URL_PRODUCTION
  export MRM_URL=$MRM_URL_PRODUCTION
elif [ $GIT_BRANCH == 'develop' ]; then
  require MRM_API_URL_STAGING $MRM_API_URL_STAGING
  require MRM_URL_STAGING $MRM_URL_STAGING
  export MRM_API_URL=$MRM_API_URL_STAGING
  export MRM_URL=$MRM_URL_STAGING
else
  require MRM_API_URL_SANDBOX $MRM_API_URL_SANDBOX
  require MRM_URL_SANDBOX $MRM_URL_SANDBOX
  export MRM_API_URL=$MRM_API_URL_SANDBOX
  export MRM_URL=$MRM_URL_SANDBOX
fi


generateEnvFile(){
    cat <<EOF
MRM_API_URL=$MRM_API_URL
MRM_URL=$MRM_URL
ANDELA_API_URL=$ANDELA_API_URL
ANDELA_LOGIN_URL=$ANDELA_LOGIN_URL
FIREBASE_API_KEY=$FIREBASE_API_KEY
FIREBASE_DATABASE_NAME=$FIREBASE_DATABASE_NAME
FIREBASE_BUCKET=$FIREBASE_BUCKET
BASE_URL=$BASE_URL
EOF
}

info "generating enviroment variables for application"
generateEnvFile > $ROOT_DIR/.env
