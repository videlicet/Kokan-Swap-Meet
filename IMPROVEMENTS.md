# Improvements

## Functionality

- Assets:
    - [ ] Change assets after upload.
    - [ ] Use Markup for long descriptions.
    - [ ] Include preview (at least links to third-parties such as Codepen).
    - [ ] Tag-picker for asset types (i.e. for 'code', 'graphics', 'reference', '3D-assets', ...).
    - [ ] Let creators determine request management rules (who can decline/accept swap requests; what happens when the original user is deleted etc.).
    - [ ] Implement pagination on search.
    - [ ] Advanced search (by type, licence, kokan).
    - [ ] Sort search results (by kokans, date, number of owners).
- Users:
    - [ ] Search users.
    - [ ] Collecti user stats.

## Security
- [ ] Make Kokan a GitHub App (fine-grain permissions for Kokans access to user repositories (which repositories)).
- [ ] Fine-grain permissions for collaborators (fork, pull, ...).
- [ ] Create new asset: Sanitize inputs in short/long descriptions.

## Restructuring
- [ ] Store verification codes temporarily in database instead of the server state.
- [ ] The users own profile and the profile of another user shouldn't be on the same route (user/username).

## Hosting
- [ ] Get domain for the App and redirect the frontend and backend to a similar domain (should solve Cloudflare cookie issue).

## General
- [ ] Improve TS typing.
- [ ] Improve consistency (error handling in try/catch-structures, returned responses on the server).