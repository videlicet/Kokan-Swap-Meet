# Improvements

## Functionality

- Assets:
  - [ ] Change assets after upload.
  - [ ] Use Markup for long descriptions.
  - [ ] Include preview (at least links to third-parties such as Codepen).
  - [X] Tag-picker for asset types (i.e. for 'code', 'graphics', 'reference', '3D-assets', ...).
  - [ ] Let creators determine request management rules (who can decline/accept swap requests; what happens when the original user is deleted etc.).
  - [ ] Implement pagination on search.
  - [X] Advanced search (by type X, licence, kokan).
  - [ ] Sort search results (by kokans, date, number of owners).
- Users:
  - [X] Search users.
  - [ ] Collect user stats (ratio of successful swap requests to swap requests, ...).
  - [X] Deleting a user should rebate pending kokan balances to requesters in pending requests if the deleted user is the only owner.
- Transactions:
  - [ ] When a creator deletes their repository on GitHub or removes owners from the collaborators, refund the asset's kokans to the requesters of pending requests.

## Business Logic

- [ ] What's the best way to manage decision making on incoming swap requests? Custom / two-thirds / simple majority?
- [ ] If a creator deletes their asset, should it remain available for co-owners?
- [ ] Enforce OS licenses that include "same license" conditions.

## Security

- [ ] Make Kokan a GitHub App (fine-grain permissions for Kokans access to user repositories (which repositories)).
- [ ] Fine-grain permissions for collaborators (fork, pull, ...).
- [ ] Create new asset: Sanitize inputs in short/long descriptions.
- [ ] Provide refresh token.
- [ ] Double check kokan balance changes.

## UX/UI

- [ ] Abort fetches if necessary.
- [ ] Better differentiation of buttons and other elements with black backgrounds.

## Restructuring

- [ ] Store verification codes temporarily in database instead of the server state.
- [X] The users own profile and the profile of another user shouldn't be on the same route (user/username).

## Hosting

- [ ] Get domain for the App and redirect the frontend and backend to a similar domain (should solve Cloudflare cookie issue).

## Database

- [] Restrictions on documents.

## Testing

- [] Test transaction logics and kokan balances.

## General

- [ ] Improve TS typing.
- [ ] Improve consistency (error handling in try/catch-structures, returned responses on the server).

## Bugs

- [ ] Picking a license on the dropdown in New Asset selects text on the background. This also happens on the query tag selector (https://github.com/radix-ui/primitives/issues/1658). Issue is documented but no reasonable fix available.