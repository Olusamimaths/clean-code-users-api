Feature: Creating a new user

    Scenario: User creation
        When I make post request to "/api/users" with:
            | firstName | "John" |
            | lastName | "Doe" |
            | email | "johndoe@gmail.com" |
        Then the user creation response status code should be 201
        And the user creation response should contain:
            | firstName | John |
            | lastName | Doe |
            | email | johndoe@gmail.com |
            | id | ANY_STRING |
        