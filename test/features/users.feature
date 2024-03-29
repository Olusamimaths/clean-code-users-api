Feature: Creating a new user

    Scenario: User creation
        When I make post request to "/api/users" with:
            | name | John |
            | job | Developer |
        Then the response status code should be 201
        And the response should contain:
            | name | John |
            | job | Developer |
            | id | ANY_NUMBER |
        