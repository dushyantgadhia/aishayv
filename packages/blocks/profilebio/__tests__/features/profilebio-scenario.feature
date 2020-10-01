Feature: profilebio

    Scenario: User navigates to profilebio
        Given I am a User loading profilebio
        When I navigate to the profilebio
        Then profilebio will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors