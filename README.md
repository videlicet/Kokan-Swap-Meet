[work in progress]

# Kokan – Digital Assets Swap-Meet

## General

The Kokan web app extends GitHub with a swap-meet for digital assets.

## Instructions

Please make sure you have a GitHub account before starting with Kokan. 

On opening the app, you will be asked to authenticate with your GitHub account or sign up for a new GitHub account.
After authenticating, you will be asked to sign up for Kokan. You will receive an email upon signgup to verfiy your email address.

After loggin in, you will be redirected to your Dashboard. You can see information about your account on the right side of the center view. To the left, you will see an overview of assets you have linked with Kokan.

Click on the navigation bar element on the top right (it shows your username while you're logged in) to open a dropdown menu.
This menu takes you to:

### 1. User Assets (default dashboard view):
User Assets shows an overview of all assets you have linked to Kokan. A green "on offer"-badge on the bottom right of an asset indicates that the asset is visible in the swap-meet and available for swap requests. 

### 2. User Requests:
User Requests is devided into Incoming and Outgoing Requests.
Incoming shows swap requests you have received for your assets. You can interact with incoming requests by declining or accepting them. </br>Accepting them dispatches a collaboration invitation from GitHub that will be send to the requester.Requesters can make new swap requests if they 
Outgoing shows all outgoing swap requests. You can interact with outgoing requests by withdrawing them. </br> Withdrawing requests deletes them permanently. They will disappear from both your and the requestees dashboard. After withdrawing, you can request an asset again if you changed your mind.

### 3. User Settings:
You can change your data on User Settings. For example, you can add a custom profile picture (it defaults to your GitHub profile picture on signup) or provide a first and last name which will be used as a fallback for your profile picture. 
The User Settings is also where you can delete your account.

### 4. Logout:
Your sessions ends and you will be redirected to the logout page.

## Caveats

### GitHub Permissions for Kokan

Kokan is a GitHub OAuth App, not a GitHub App. This affects the available permissions scope when authenticating with GitHub. [Repository permissions of GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps) grant:

> […] full access to public and private repositories including read and write access to code, commit statuses, repository invitations, collaborators, deployment statuses, and repository webhooks. Note: In addition to repository related resources, the repo scope also grants access to manage organization-owned resources including projects, invitations, team memberships and webhooks. This scope also grants the ability to manage projects owned by users.
> 

While this permission scope is neither desirable nor intended, if my research is correct, access tokens for GitHub OAuth Apps do not provide fine-grained permissions at this point (May 2023). GitHub introduced [Fine-Grained-Acces Tokens](https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/) (beta) in late 2022, however there seems to be no way to create these tokens through the GitHub API for users who aren’t members of the respective GitHub organization. Also, Kokan is not a GitHub organization. 

As opposed to GitHub OAuth Apps, GitHub Apps offer fine-grained permissions. Judging by the [GitHub documentation](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps?apiVersion=2022-11-28#administration), these permissions are equally broad in scope, despite the option to filter which repositories a GitHub App can access.

## Stack

* Frontend: HTML, CSS, React (Vite)
* Backend:
    * Server: 
        * Node, Express
    * Database:
        * MongoDB

## Tools/Packages/APIs

E.g.:

* APIs:
    * Cloudinary
    * GitHub API
* Packages:
    * Radix UI (unstyled UI components)
    * nodemail

## Acknowledgements

* Kokan Icon: sudheep b, CC Attribution | Color changed 

## Miscellaneous
Kokan is Japanese (交換, koukan) for 'barter, exchange', among others.

Kokan was developed as a final project for the Web & App Development Bootcamp at WBS Coding School (Berlin, Germany, May 2023).