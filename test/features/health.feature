@health
Feature: Health Check
    Check the health of the service

    Scenario: Health Check
        When I make a GET request to the "/health" endpoint
        Then the response status code should be 200
        And the response should contain:
            | status | "Ok" |
