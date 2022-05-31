# swimlane-tracker

### Backend
Back end consists of node.js utilizing an express framework to host a simple RESTful API endpoint. This endpoint allows the React front end to connect with the MySQL service with HTTP methods. I added tests for all the endpoints here as well.

### Front end
The frontend uses React, and bootstrap-react for ease of styling and familiarity to me. I decided to use a horizontal table layout on desktop views to be more similar to a kanban board, however chose to do it vertically stacked for mobile devices due to more vertical screen space. There is a button to add a new boat, and upon clicking a boat within the table, the user can change a boats swimlane, as well as the boat name, and operator name. Operator name could have been displayed as well on the tables, however I felt it was a bit out of the scope of the project anyway. Unfortunately, I did not have time to add any frontend tests.

### CICD
I chose to use CircleCI for my building, testing, and deploying. This was completely new to me as was using react. Building and testing my commits went well here, however deploying was a bigger challenge then I had thought. I had preferred to use AWS, so I chose to use Elastic Container Registry and Elastic Container Service. Pushing my images onto the ECR and then deploying onto the ECS seemed to be possible. However, the service did not seem to run properly and/or was not accessible. Due time constraints I could not figure this out. I then opted to try to manually deploy it, however I ended up running into issues here too, where the backend would run, but the react front end would hang indefinitely. Building seems to work in a development environment using Webstorm.
