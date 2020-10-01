#!/usr/bin/env bash

# Parameters:
# $1 - PROJECT_ID from Gitlab's CI variables ($CI_PROJECT_ID)
# $2 - Commit's SHA that has triggered the pipeline ($CI_COMMIT_SHA)
# $3 - name of the branch that was pushed
# $4 - GITLAB_TOKEN used for API calls, this must be present
#      on your project's Gitlab Environment variables

echo "Current branch: $3"

valid_branch=$(curl --header "PRIVATE-TOKEN: $4" "https://gitlab.builder.ai/api/v4/projects/$1/variables/MD5_BRANCH" | jq '.value' | tr -d '"')
valid_checksum=$(curl --header "PRIVATE-TOKEN: $4" "https://gitlab.builder.ai/api/v4/projects/$1/variables/MD5_CHECKSUM" | jq '.value' | tr -d '"')

echo "Valid branch: $valid_branch"
echo "Valid checksum: $valid_checksum"

if [[ "$3" == "$valid_branch" ]]
  then
    echo "Updating checksum for project $1 SHA $2 on branch $valid_branch ..."
  else
    echo "Validating protected code for project $1 SHA $2 ..."
fi

# Trigger validator pipeline
pipeline_response=$(curl -X POST \
     -F token=c7c2c0334a31dd3f96e6d9f19a11b8 \
     -F ref=master \
     -F "variables[PROJECT_ID]=$1" \
     -F "variables[SHA]=$2" \
     https://gitlab.builder.ai/api/v4/projects/7785/trigger/pipeline)

echo "Got pipeline: $pipeline_response"

pipeline_id=$(echo $pipeline_response | jq '.id')

echo "Got pipeline id: $pipeline_id"

# Wait till pipeline is finished
echo "Waiting for pipeline to finish ..."
while status=$(curl --header "PRIVATE-TOKEN: $4" "https://gitlab.builder.ai/api/v4/projects/7785/pipelines/$pipeline_id" | jq '.status'  | tr -d '"')
do
  echo "Pipeline status: ${status}"
  if [ $status == 'success' ]
    then
      echo "Pipeline succeeded"
      break
  fi

  if [ $status == 'failed' ]
    then
      echo "Pipeline failed"
      exit 1
  fi
  sleep 3
done

# Download artifacts from finished pipeline
# Get list of succeeded jobs for the pipeline
jobs=$(curl --header "PRIVATE-TOKEN: $4" "https://gitlab.builder.ai/api/v4/projects/7785/pipelines/$pipeline_id/jobs?scope[]=success" --globoff)

echo "Got succeeded jobs: $jobs"

# Find the job with `"name":"checksum"` and get it's id
job_id=$(echo $jobs | jq '.[] | select(.name="checksum") | .id')

# Download artifacts archive for this job
curl --output artifacts.zip --header "PRIVATE-TOKEN: $4" "https://gitlab.builder.ai/api/v4/projects/7785/jobs/$job_id/artifacts"

# Unzip artifacts, the file we need is inside with name `result`
unzip artifacts.zip

echo "Got pipeline md5:"
cat result
our_checksum=$(cat result)

if [[ "$3" == "$valid_branch" ]]
  then
    echo "Updating checksum to ${our_checksum}"
    response=$(curl --request PUT \
         --header "PRIVATE-TOKEN: $4" \
         -H "Content-Type: application/json" \
         --data '{"key": "MD5_CHECKSUM", "value": "'$our_checksum'", "protected": true, "variable_type": "env_var", "masked": false, "environment_scope": "*"}' \
         "https://gitlab.builder.ai/api/v4/projects/$1/variables/MD5_CHECKSUM")
    echo "Update checksum response: ${response}"
    exit 0
  else
    echo "Validating checksum ${our_checksum}"
    if [[ "$valid_checksum" == "$our_checksum" ]]
      then
        echo "Validation success"
        exit 0
      else
        echo "Validation fail"
        exit 1
    fi
fi