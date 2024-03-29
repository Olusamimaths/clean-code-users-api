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
        When I make get request to get user with id "1"
        Then the get user response status code should be 200
        And the get user response should contain:
            | id | 1 |
            | firstName | ANY_STRING |
            | lastName | ANY_STRING |
            | email | ANY_STRING |
            | avatar | ANY_STRING |

    Scenario: Retrieving user avatar
        When I make get request to get avatar of user with id "1"
        Then the get avatar response status code should be 200
        And the get avatar response should contain:
            | avatar | ANY_BASE64_STRING |
        

    Scenario: Deleting user avatar
        When I make a delete request the avatar of user with id "1"
        Then the avatar deletion response status code should be 200
         And the delete avatar response should contain:
            | deleted | true |
       