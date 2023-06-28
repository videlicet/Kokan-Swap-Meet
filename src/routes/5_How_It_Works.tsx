/* import styles */
import '../styles/5_How_It_Works.css'

function HowItWorks(): JSX.Element {
  return (
    <div id='how-it-works-container'>
      <h2>How It Works</h2>
      <p>
        Kokan allows GitHub users to access other GitHub users&#39; private
        repositories in exchange for tokens, so called Kokans. Kokan assets are
        valued at one to five Kokans. GitHub users can link their repositories
        to Kokan as digital assets. Every Kokan user can make swap requests for
        assets offered at the swap-meet. When an owner accepts a swap request,
        the requester receives a GitHub collaboration invitation for the
        corresponding repository.
      </p>
      <h3>Important</h3>
      <p>
        At this point, co-owned assets come with equal rights in terms of
        accepting and rejecting swap requests (first come, first serve).
        Whenever an asset is requested, every owner of this assets will receive
        a notification and is asked to respond to the request.
      </p>
      <h2>Instructions</h2>
      <p>
        Please make sure you have a GitHub account before starting with Kokan.
      </p>
      <p>
        On opening the app, you will be asked to authenticate with your GitHub
        account or sign up for a new GitHub account. After authenticating, you
        will be asked to sign up for Kokan. You will receive an email upon
        signup to verify your email address.
      </p>
      <p>
        After logging in, you will be redirected to your Dashboard. You can see
        information about your account on the right side of the center view (on
        small screens, this information will be displayed on{' '}
        <em>User Profile</em>). To the left, you will see assets you have linked
        with Kokan.
      </p>
      <p>
        Click on the navigation bar element on the top right (on larger screens,
        it shows your username while you&#39;re logged in) to open a dropdown
        menu. This menu takes you to:
      </p>
      <h3>User</h3>
      <h4>1. User Profile:</h4>
      <p>
        You can change your data on <em>User Profile</em>. For example, you can
        add a custom profile picture (it defaults to your GitHub profile picture
        on signup) or provide a first and last name which will be used as a
        fallback for your profile picture. The <em>User Settings</em> is also
        where you can delete your account.
      </p>
      <h4>2. User Assets (default dashboard view):</h4>
      <p>
        <em>User Assets</em> shows an overview of all assets you have linked to
        Kokan. A green &quot;ON OFFER&quot;-badge on the bottom right of an
        asset indicates that the asset is available at the swap-meet and can be
        requested by other users. You can change the &quot;ON OFFER&quot; status
        on the <em>Assets Details</em> view.
      </p>
      <h4>3. User Requests:</h4>
      <p>
        <em>User Requests</em> is divided into <em>Incoming</em> and{' '}
        <em>Outgoing</em> Requests.
      </p>
      <p>
        Requests are either &quot;pending&quot;, &quot;declined&quot;, or
        &quot;accepted&quot;. They can also be &quot;expired&quot; if requestees
        haven&#39;t reacted to the requests within five days. In general,
        requesters and requestees can only interact with pending requests.
      </p>
      <p>
        <em>Incoming requests</em> shows swap requests you have received for
        your assets. You can interact with pending incoming requests by
        declining or accepting them.
        <br /> Accepting a swap request dispatches a collaboration invitation
        from GitHub that will be sent to the requester. Requesters can make new
        swap requests if their previous request was declined.
        <br /> Declining a request changes its status but does not delete it.
        Both the requestees and requester can still see declined request.
        <br />
      </p>
      <p>
        <em>Outgoing requests</em> shows all outgoing swap requests. You can
        interact with pending outgoing requests by withdrawing them. <br />
        Withdrawing a request deletes it permanently. It will disappear from
        both your and the requestees&#39; dashboard. After withdrawing, you can
        request an asset again if you changed your mind.
      </p>
      <h4>4. Logout:</h4>
      <p>
        Your sessions ends and you will be redirected to the <em>Logout</em>{' '}
        page.
      </p>
      <h3>Assets</h3>
      <p>
        Clicking on &quot;SWAP-MEET&quot; or searching assets with the search
        bar brings you to the <em>Assets</em> view.
      </p>
      <p>
        <em>Assets</em> shows all of the assets currently linked to and offered
        on Kokan. Clicking on an asset will display information about this asset
        in detail. The detailed view also displays interaction buttons on the
        top right (on small screens below the title).{' '}
      </p>
      <p>
        As an owner of an asset, you will see the &quot;REVOKE&quot; button.
        Pressing this button will make the asset disappear from the swap-meet
        (you can still access it on <em>User Assets</em> and offer it again by
        clicking on the badge and pressing the &quot;OFFER&quot; interaction
        button). Furthermore, you can delete the asset permanently by pressing
        the &quot;DELETE&quot; button (this does not affect your GitHub
        repository).
      </p>
      <p>
        If you&#39;re not the owner of the asset you&#39;re seeing, you may
        request a swap if you have sufficient Kokans. This will deduct the
        respective amount of Kokans from your balance and store it as
        &quot;pending&quot; balance. If your request is accepted, your pending
        balance will be set to zero, thereby completing the transaction. If your
        request is declined or expires (5 days after making the request)—or the
        asset is deleted while your request is pending— your Kokans will be
        refunded to you.
      </p>
    </div>
  )
}

export default HowItWorks
