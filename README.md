# IntlAssignment

 .A call to action button that says "Search for artist"
.When user clicks on this link, page opens in an overlay without page refresh or redirection
.Overlay should have form which asks for artist name and limit(no of tracks to be fetched)
.When user clicks on submit validate that artist name is "jack" and limit is 4
.Use those parameters to construct the url http://itunes.apple.com/search?term=jack&limit=4
.Make AJAX call to the url.
.On successful submission, overlay closes but page is not refreshed or redirected.
.Construct maximum of four tabs in the page (original page on which "search for artist" link was visible)
.Artist name will be visible on these tabs.
.On clicking the tab AJAX call will be made to url http://itunes.apple.com/search?term=artistName&limit=1 where artistName is the name visible on that tab
.JSON returned should be shown to the user as view for that tab (The only difference from normal tab functionality is that data is not statically populated for tabs, instead it is fetched from the above mentioned ajax url)
   Use: {artistName, trackName, artworkUrl30} info to display in a tab for a given artist
