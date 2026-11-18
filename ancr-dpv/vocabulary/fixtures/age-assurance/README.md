# Age assurance pilot fixtures

A Canadian online service checks a user's age when an account is opened. The check is run by an age verification provider in the United Kingdom. The service gives the user a receipt. Later the user objects to the use of their age result for anything other than opening the account. The service declares the Internet Transparency Code of Practice (ITCoP) v3.7 in its Controller Identification Record.

All names and addresses are examples.

| File | Record | ANCR Extension |
| --- | --- | --- |
| `cir.json` | Controller Identification Record, with the ITCoP declaration in `code_of_conduct` | 7.1.2 |
| `receipt.json` | Notice receipt | 7.3.2 |
| `authorization-state.json` | Authorization State Object after the objection | 7.4.4 |

The same files are read by `test.ts` in this vocabulary and are intended as the age assurance fixture for the conformance test.
