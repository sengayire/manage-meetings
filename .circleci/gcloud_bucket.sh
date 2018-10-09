#! /usr/bash

STATUS=$1

upload_deployment_report() {
  echo ">>>>>>>>>>>>>>>>>>>>>>>>>> retrieve csv >>>>>>>>>>>>>>>>>>"
  gsutil cp gs://deployment_report/deployment_report_frontend.csv ./deployment_report_frontend.csv
  echo ">>>>>>>>>>>>>>>>>>>>>>>>>> update csv >>>>>>>>>>>>>>>>>>>>"
  python ~/project/.circleci/update_csv.py $CIRCLE_BRANCH $STATUS
  echo  ">>>>>>>>>>>>>>>>>>>>>>>>>> update bucket >>>>>>>>>>>>>>>>>>>>"
  gsutil cp ./deployment_report_frontend.csv gs://deployment_report/deployment_report_frontend.csv
}

upload_deployment_report
