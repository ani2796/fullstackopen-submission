```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Assuming that the client makes a "new note" request through the browser

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP code 201: {"message":"note created"}
    deactivate server
```