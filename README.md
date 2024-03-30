
## Description

Users API Application

## Installation

```bash
$ yarn install
```

## Running the app

There is a bash script that runs the app in development mode. Docker and Node.js must be installed on the host machine.

First make the script executable:
```bash
chmod +x start.sh
```

Then run the script:
```bash
./start.sh
```

You can also run the following commands manually:

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash

# Cucumber tests
$ yarn run test:e2e

```