#! /usr/bin/env bash

# get start date and end date
STARTDATE=$(date --date="7 days ago" '+%Y-%m-%d %H:%M')
ENDDATE=$(date '+%Y-%m-%d %H:%M:%S')

run_query() {
  BRANCH=$1
  QUERY="select COALESCE(sum(status = 'failed'),0)\
  as failed, COALESCE(sum(status = 'succeeded'),0)\
  as succeeded from deployment_report_frontend\
  where (branch = '${BRANCH}') and (time between '${STARTDATE}' and '${ENDDATE}')"

  # run SQL query on csv to and send output into a csv file
  querycsv.py -i ~/project/.circleci/deployment_report_frontend.csv -o ~/project/.circleci/result.csv ${QUERY}

  # retrieve query output from csv
  MESSAGE=$(python ~/project/.circleci/csv_parser.py ~/project/.circleci/result.csv $BRANCH)
  rm ~/project/.circleci/result.csv
  echo $MESSAGE
}

get_report() {
  # retrieve csv from bucket
  gsutil cp gs://deployment_report/deployment_report_frontend.csv ~/project/.circleci/deployment_report_frontend.csv

  # generate report for each branch
  DEVELOP_REPORT=$(run_query develop)
  MASTER_REPORT=$(run_query master)

  DEPLOYMENT_REPORT_MESSAGE="Weekly Deployment Report for Converge Frontend \n
${DEVELOP_REPORT}\n
${MASTER_REPORT}\n"

  echo $DEPLOYMENT_REPORT_MESSAGE
#! /usr/bash

get_report() {
  echo ">>>>>>>>>>>>>>>>>>>>>>>>>> retrieve csv >>>>>>>>>>>>>>>>>>"
  gsutil cp gs://deployment_report/deployment_report_test.csv ./deployment_report_test.csv

  # get start date and end date
  STARTDATE="$(date --date="7 days ago" '+%Y-%m-%d %H:%M')"
  ENDDATE=$(date '+%Y-%m-%d %H:%M:%S')

  # query csv file for failed and successful deployment
querycsv.py -i deployment_report_test.csv -o failed.csv "select count(*) time, status from deployment_report_test where time between '${STARTDATE}' and '${ENDDATE}' and status = 'failed'"
querycsv.py -i deployment_report_test.csv -o passed.csv "select count(*) time, status from deployment_report_test where time between '${STARTDATE}' and '${ENDDATE}' and status = 'succeeded'"



  # # get count of failed and successful deployment
  FAILED_COUNT=$(python ~/project/.circleci/csv_parser.py failed.csv)
  SUCCESS_COUNT=$(python ~/project/.circleci/csv_parser.py passed.csv)

  DEPLOYMENT_REPORT_MESSAGE="Hi Team.\n
Here is the deployment report for the week.\n
Between ${STARTDATE} and ${ENDDATE},\n
we had ${SUCCESS_COUNT} successful deployments and ${FAILED_COUNT} Failed deployments.\n
In Converge-Frontend :devops:"
}

# send notification to slack
send_notification() {

  # Sending the Slack notification

  curl -X POST --data-urlencode \
  "payload={
      \"channel\": \"${DEPLOYMENT_SLACK_CHANNEL}\",
      \"username\": \"DeployNotification\",
      \"attachments\": [{
          \"fallback\": \"CircleCI Deployment Notification\",
          \"color\": \"good\",
          \"title\": \"Deployment Report\",
          \"text\": \"${DEPLOYMENT_REPORT_MESSAGE}\",
      }]
  }" \
  "${SLACK_WEB_HOOK}"
}

main() {
  get_report
  send_notification
}

main
