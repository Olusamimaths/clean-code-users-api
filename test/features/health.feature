Feature: Health Check

    Scenario: Health Check
    When I make a GET request to "/health"
    Then the response status code should be 200
    And the response should contain:
            | status | Ok |
