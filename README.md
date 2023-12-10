# UI for Chat Application

Feature Requirements:

- A list of all ongoing conversations for the “logged in“ user.
- A conversation pane where a single “active“ conversation will be shown, and messages can be sent.
- Ability to switch between different conversations and send messages to each.
- Message data persisted to API in-memory DB (endpoints should handle this automatically) so a page refresh maintains data.

Technical Requirements:

- Please build your client-side app without the use of libraries, frameworks, or dependencies. Use only HTML, CSS, and Javascript. While you will not be expected to work without libraries and frameworks on the job, our goal is to focus on web fundamentals for this exercise.
- The end product should be an html page that can be used without any build steps (when running it locally, reviewers will have the same dummy API running in the same default port)

Implementation

- CSS Grid for main layout
- Web components to handle actual UI and functionality
- fetch for XHR
- Defaulting to the first user returned from /users as the logged in user
