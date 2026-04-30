# Code Review Rules — todo-api

## General

- Use `const` over `let` when the variable is not reassigned
- No unused variables or imports
- No `console.log` left in production code (use proper error responses instead)

## Express Routes

- Always validate required fields in request body before processing
- Return appropriate HTTP status codes: 200, 201, 204, 400, 404
- Never return 200 for errors

## Functions

- Functions must do one thing only
- Use descriptive names — avoid single letters except for array methods (`t`, `i`, etc.)

## Error Handling

- Always handle the case where a resource is not found (return 404)
- Always handle missing or invalid input (return 400)

## Tests

- Every endpoint must have at least one test for the happy path
- Every endpoint must have at least one test for an error case
