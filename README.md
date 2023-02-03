# Home Assignment

This assignment requires working with 3-rd party APIs, aggregations, and logic in the backend and displaying results in the frontend.

## Requirements
- Docker CE
- Docker Compose (v1 or v2)
- Make

## How to install and run?

### Clone the repository
Clone this repository and go to the project directory 
```shell 
git clone git@github.com:belejdemeter/home-assignment-one.git
cd home-assignment-one
```

### Configure the environment
Copy the **.env.example** file to **.env** and fill in the missing values
```shell
cp server/.env.example server/.env && cp client/.env.example client/.env
```
You need to replace in the `server/.env` the following variables:  
`IR_KEY` with using your Chunk holder service API key,  
`CH_KEY` with the Inference runner service API key.

### Run the app 
Use **make** to build and start the containers.  
```shell
make build
```
The app now should be available at `http://localhost:80`  
The REST API is running at `http://localhost:3001` 

### Other 
For more info use the help command.
```shell
make help
```
