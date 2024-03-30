#!/bin/bash

# Start docker compose
docker compose up --build -d

# Start the application
yarn start:dev
