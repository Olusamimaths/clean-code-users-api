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

    Scenario: Getting user by id
        Give I have a user I want to get with id 1
        When I make get request to "/api/users/1"
        Then the user response status code should be 200
        And the user response should contain:
            | id | 1 |
            | firstName | ANY_STRING |
            | lastName | ANY_STRING |
            | email | ANY_STRING |
            | avatar | ANY_STRING |

    Scenario: Retrieving user avatar
        Given I have a user I want to get their avatar with id 1
        When I make get request to "/api/user/1/avatar"
        Then the avatar response status code should be 200
        

    Scenario: Deleting user avatar
        Given I have a user I want to delete with id 1
        When I make delete request to "/api/user/1/avatar"
        Then the avatar deletion response status code should be 200
       