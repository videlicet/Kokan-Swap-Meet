# Kokan – Digital Assets Swap-Meet

## General

[![Netlify Status](https://api.netlify.com/api/v1/badges/577146a1-9f0a-477b-81fc-18c0d0b44c79/deploy-status)](https://app.netlify.com/sites/kokan-videlicet/deploys)

The Kokan web-app extends GitHub with a swap-meet for digital assets.

In essence, Kokan allows GitHub users to access other GitHub users' private repositories in exchange for tokens. Whenever an owner accepts a swap request for an asset, the requester receives a GitHub collaboration invitation for the corresponding repository and becomes a co-owner on Kokan.  

```diff
! The App might seem to be stuck loading after authenticating with GitHub.
! This means the server was idling due to prolonged inactivity 
! (Kokan is currently hosted on a free plan with Render).
! It may take up to one minute for the server to be fully available.
```
This is the frontend repository. Click <a href="https://github.com/videlicet/Kokan-Swap-Meet-Server" target="_blank">here</a> to get to the backend repository.

## How it Works

Kokan allows GitHub users to access other GitHub users' private repositories in exchange for tokens, so called Kokans. Kokan assets are valued at one to five Kokans.
GitHub users can link their repositories to Kokan as digital assets. Every Kokan user can make swap requests for assets offered at the swap-meet. When an owner accepts a swap request, the requester receives a GitHub collaboration invitation for the corresponding repository.

### Important

At this point, co-owned assets come with equal rights in terms of accepting and rejecting swap requests (first come, first serve). Whenever an asset is requested, every owner will receive a notification and is asked to respond to the request (see IMPROVEMENTS readme about this feature).

## Instructions

Please make sure you have a GitHub account before starting with Kokan.

On opening the app, you will be asked to authenticate with your GitHub account or sign up for a new GitHub account.
After authenticating, you will be asked to sign up for Kokan. You will receive an email upon signup to verify your email address.

After logging in, you will be redirected to your Dashboard. You can see information about your account on the right side of the center view (on small screens, this information will be displayed on <em>User Profile</em>). To the left, you will see assets you have linked with Kokan.

Click on the navigation bar element on the top right (on larger screens, it shows your username while you're logged in) to open a dropdown menu.
This menu takes you to:

### User

#### 1. User Profile:

You can change your data on <em>User Profile</em>. For example, you can add a custom profile picture (it defaults to your GitHub profile picture on signup) or provide a first and last name which will be used as a fallback for your profile picture.
The <em>User Settings</em> is also where you can delete your account.

#### 2. User Assets (default dashboard view):

<em>User Assets</em> shows an overview of all assets you have linked to Kokan. A green "ON OFFER"-badge on the bottom right of an asset indicates that the asset is available at the swap-meet and can be requested by other users. You can change the "ON OFFER" status on the <em>Assets Details</em> view.

#### 3. User Requests:

<em>User Requests</em> is divided into <em>Incoming</em> and <em>Outgoing</em> Requests.

Requests are either "pending", "declined", or "accepted". They can also be "expired" if requestees haven't reacted to the requests within five days. In general, requesters and requestees can only interact with pending requests.

<em>Incoming requests</em> shows swap requests you have received for your assets. You can interact with pending incoming requests by declining or accepting them.</br>
Accepting a swap request dispatches a collaboration invitation from GitHub that will be sent to the requester. Requesters can make new swap requests if their previous request was declined.</br>
Declining a request changes its status but does not delete it. Both the requestees and requester can still see declined request.</br>

<em>Outgoing requests</em> shows all outgoing swap requests. You can interact with pending outgoing requests by withdrawing them. </br>
Withdrawing a request deletes it permanently. It will disappear from both your and the requestees' dashboard. After withdrawing, you can request an asset again if you changed your mind.

#### 4. Logout:

Your sessions ends and you will be redirected to the <em>Logout</em> page.

### Assets

Clicking on "SWAP-MEET" or searching assets with the search bar brings you to the <em>Assets</em> view.

<em>Assets</em> shows all of the assets currently linked to and offered on Kokan. Clicking on an asset will display information about this asset in detail. The detailed view also displays interaction buttons on the top right (on small screens below the title). 

As an owner of an asset, you will see the "REVOKE" button. Pressing this button will make the asset disappear from the swap-meet (you can still access it on <em>User Assets</em> and offer it again by clicking on the badge and pressing the "OFFER" interaction button). Furthermore, you can delete the asset permanently by pressing the "DELETE" button (this does not affect your GitHub repository).

If you're not the owner of the asset you're seeing, you may request a swap if you have sufficient Kokans. This will deduct the respective amount of Kokans from your balance and store it as "pending" balance. If your request is accepted, your pending balance will be set to zero, thereby completing the transaction. If your request is declined or expires (5 days after making the request)—or the asset is deleted while your request is pending— your Kokans will be refunded to you.      

## Caveats

### GitHub Permissions for Kokan

Kokan is a GitHub OAuth App, not a GitHub App. This affects the available permissions scope when authenticating with GitHub. [Repository permissions of GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps) grant:

> […] full access to public and private repositories including read and write access to code, commit statuses, repository invitations, collaborators, deployment statuses, and repository webhooks. Note: In addition to repository related resources, the repo scope also grants access to manage organization-owned resources including projects, invitations, team memberships and webhooks. This scope also grants the ability to manage projects owned by users.

While this permission scope is neither desirable nor intended, if my research is correct, access tokens for GitHub OAuth Apps do not provide fine-grained permissions at this point (May 2023). GitHub introduced [Fine-Grained-Access Tokens](https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/) (beta) in late 2022, however there seems to be no way to create these tokens through the GitHub API for users who aren’t members of the respective GitHub organization. Also, Kokan is not a GitHub organization.

As opposed to GitHub OAuth Apps, GitHub Apps offer fine-grained permissions. Judging by the [GitHub documentation](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps?apiVersion=2022-11-28#administration), these permissions are equally broad in scope, despite the option to filter which repositories a GitHub App can access.

## Stack

- Frontend: HTML5, CSS3, TypeScript, React (Vite)
- Backend:
  - Server (see [GitHub repository](https://github.com/videlicet/Kokan-Swap-Meet-Server)):
    - Node, Express
  - Database:
    - MongoDB

## Tools/Packages/APIs

- APIs:
  - GitHub API
  - Cloudinary
- Packages:
  - react-router-dom
  - react-hook-forms
  - date-and-time
  - react-spinners
  - history
  - radix-ui (unstyled UI components)

## Acknowledgements

- Kokan Icon: sudheep b, CC Attribution | Color changed

## Miscellaneous

Kokan is Japanese (交換, koukan) for 'barter, exchange', among others.

Kokan was developed May–June 2023 as a final project for the Web & App Development Bootcamp at WBS Coding School (Berlin, Germany).
