# DEEL BACKEND TASK

## Developer notes

- Here is the [postman collection](https://www.postman.com/lunar-module-geoscientist-51084169/workspace/toolbox/collection/26739489-4370416a-938b-4f6d-8a95-8f00e5e18b71?action=share&creator=26739489). There you could test the endpoints
- To execute run `docker-compose up -d` on the root folder
- To run the tests run `docker-compose exec deel-test-backend_1 npm run test`
- To fill the database run `docker-compose exec deel-test-backend_1 npm run seed`
- Routes can be an entire folder separating concerns and responsibilities
- Use standardJS insteaf of eslint because does not require any configuration. We could put in on the root folder but because is standard we should not have any problem just installing it on any other service
- Used sequelize.transaction for post queries taking into account that SQLite does not support more than one transaction at the same time.
- There's not an specific error for a  profile looking for a contract that does not belong for. Why? Security-wise we will be giving information of the existence of a contract for someone that is not the owner. We could have a generic error for that but I think it's better to not give that information. If we wanted to do that, we will remove the verification from the repository and add it to the service, and add the additional response to the controller.
- Added an specific message when there's no contracts for a profile
- Should we verify that the info for payJobByJobId is the same that unpaidJobsByProfileId, we are not taking into account the status of the contract

## Going Above and Beyond the Requirements (Sorry, didn't have the time), but what I would add

- I would add a loggerr 
- I would add a middleware error handler
- I would add validation to the requests body and params
- I would totally improve the coverate of the unit tests
- If it's a production system I would add monitoring and alerting services (sentry, new relic, etc)
- I would do a little frontend too (here's an example of a quick test that I did for another company https://github.com/felipe-zapata/toolbox-test)

## Concurrency

Before going any deeper on implementing concurrency solutions I would define requirements and current state of the service. Would use a load and performance testing tool like Apache JMeter.

Thinking about concurrency, in this case SQLite implements [serializable isolation](https://www.sqlite.org/isolation.html) and sequelize use the isolation level of the [database](https://sequelize.org/docs/v6/other-topics/transactions/#isolation-levels), locking the tables and rows that are being used while the transaction happens.

To increase the concurrency capabilities we could:
- Use a different isolation level (read commited for example)
- Check if the database is a bottleneck
- Use [optimistic locking](https://sequelize.org/docs/v6/other-topics/optimistic-locking/)