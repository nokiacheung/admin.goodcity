# Push webhook to IronMQ to alert our iOS build service
# call with ./notify-ios-build-service admin.goodcity
#        or ./notify-ios-build-service app.goodcity
#
# REQUIRES THE FOLLOWING ENVIRONMENT VARIABLES ARE SET
# export GOODCITY_IRON_MQ_OAUTH_KEY=
# export GOODCITY_IRON_MQ_PROJECT_KEY=
# export GOODCITY_IRON_MQ_QUEUE_NAME=

if [ -z "${TESTFAIRY_API_KEY}" ]; then
	echo "Please add TESTFAIRY_API_KEY to the environment"
	exit 1
fi

if [ -z "${GOODCITY_IRON_MQ_OAUTH_KEY}" ]; then
	echo "Please add GOODCITY_IRON_MQ_OAUTH_KEY to the environment"
	exit 1
fi

if [ -z "${GOODCITY_IRON_MQ_PROJECT_KEY}" ]; then
	echo "Please add GOODCITY_IRON_MQ_PROJECT_KEY to the environment"
	exit 1
fi

if [ -z "${GOODCITY_IRON_MQ_QUEUE_NAME}" ]; then
	echo "Please add GOODCITY_IRON_MQ_QUEUE_NAME to the environment"
	exit 1
fi

PROJECT=$1
if [ -z "${PROJECT}" ]; then
	echo "Please specify a project to add to the build queue. Either admin.goodcity or app.goodcity"
	exit 1
fi

curl -H "Content-Type: application/json" -H "Authorization: OAuth ${GOODCITY_IRON_MQ_OAUTH_KEY}" -d '{"messages":[{"body":"build '${PROJECT}'"}]}' "https://mq-aws-us-east-1.iron.io/1/projects/${GOODCITY_IRON_MQ_PROJECT_KEY}/queues/${GOODCITY_IRON_MQ_QUEUE_NAME}/messages"
echo