Feature: Health Check
    As a user, I want to check the health of the application, so that I can know if the application is running properly.

    Scenario: Health Check
    When I make a GET request to "/health"
    Then the response status code should be 200
    And the response should contain:
            | status | Ok |
