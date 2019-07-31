#!/usr/bin/env bash

source $WORKSPACE/jenkins/bin/utils.sh

# get build status and branch
# send notification

STATUS=$1 #job status

# replace all `/` in GIT_BRANCH with %2F
CURRENT_BRANCH=$(echo $GIT_BRANCH | sed 's/\//%2F/g')

get_build_report() {
  GIT_USERNAME="$(git show -s --pretty=%an)"

  if [ "$STAGE_NAME" == 'test' -a  "$STATUS" == 'success' ]; then
    MESSAGE_TEXT="Test Phase Passed! :jenkins: :smiley:"
    COLOR="good"

  elif [ "$STAGE_NAME" == 'test' -a  "$STATUS" == 'fail' ]; then
    MESSAGE_TEXT="Test Phase Failed :jenkins: :scream:"
    COLOR="danger"
    REBUILD_URL="https://jenkins.andela.com/blue/organizations/jenkins/Converge-Frontend/detail/${CURRENT_BRANCH}/${BUILD_NUMBER}/pipeline"
    ACTION_BUTTON="$(echo \
          "{\"type\": \"button\", \"text\": \"Rebuild\", \"url\": \"${REBUILD_URL}\"}", \
      )"

  elif [ "$STAGE_NAME" == 'build-docker-image' -a "$STATUS" == 'success' ]; then
    MESSAGE_TEXT="Build Phase Succeeded  :jenkins: :rocket:"
    COLOR="good"

  elif [ "$STAGE_NAME" == 'build-docker-image' -a  "$STATUS" == 'fail' ]; then
    MESSAGE_TEXT="Deployment Phase Failed  :jenkins: :scream:"
    REBUILD_URL="https://jenkins.andela.com/blue/organizations/jenkins/Converge-Frontend/detail/${CURRENT_BRANCH}/${BUILD_NUMBER}/pipeline"
    ACTION_BUTTON="$(echo \
          "{\"type\": \"button\", \"text\": \"Rebuild\", \"url\": \"${REBUILD_URL}\"}", \
      )"
    COLOR="danger"

  elif [ "$STAGE_NAME" == 'deploy-job' -a "$STATUS" == 'success' ]; then
    MESSAGE_TEXT="Deployment Phase Succeeded :jenkins: :rocket:"
    COLOR="good"

  elif [ "$STAGE_NAME" == 'deploy-job' -a  "$STATUS" == 'fail' ]; then
    MESSAGE_TEXT="Deployment Phase Failed  :jenkins: :scream:"
    REBUILD_URL="https://jenkins.andela.com/blue/organizations/jenkins/Converge-Frontend/detail/${CURRENT_BRANCH}/${BUILD_NUMBER}/pipeline"
    ACTION_BUTTON="$(echo \
          "{\"type\": \"button\", \"text\": \"Rebuild\", \"url\": \"${REBUILD_URL}\"}", \
      )"
    COLOR="danger"

  fi

  # prepare template for slack messaging
  COMMIT_LINK="https://github.com/andela/mrm_front/commit/${GIT_COMMIT}"
  IMAGE_TAG="$(git rev-parse --short HEAD)"
  JENKINS_WORKFLOW_URL="https://jenkins.andela.com/blue/organizations/jenkins/Converge-Frontend/detail/${CURRENT_BRANCH}/${BUILD_NUMBER}/pipeline"
  SLACK_TEXT_TITLE="JENKINS Build #${BUILD_NUMBER}"
  SLACK_DEPLOYMENT_TEXT="Executed Git Commit <$COMMIT_LINK|${IMAGE_TAG}>: ${MESSAGE_TEXT}"

}

send_notification() {
  curl -X POST --data-urlencode \
  "payload={
      \"channel\": \"${BUILD_CHANNEL}\",
      \"username\": \"DeployNotification\",
      \"attachments\": [{
          \"fallback\": \"JENKINS build notification\",
          \"color\": \"${COLOR}\",
          \"author_name\": \"Branch: $BRANCH_NAME by ${GIT_USERNAME}\",
          \"author_link\": \"https://github.com/andela/mrm_front/tree/${BRANCH_NAME}\",
          \"title\": \"${SLACK_TEXT_TITLE}\",
          \"title_link\": \"$JENKINS_WORKFLOW_URL\",
          \"text\": \"${SLACK_DEPLOYMENT_TEXT}\",
          \"actions\": [${ACTION_BUTTON}]
      }]
  }" \
  "${BUILD_CHANNEL_WEBHOOK}"
}

main() {
  get_build_report
  send_notification
}

main
