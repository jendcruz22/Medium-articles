// Get the data ID from the URL
var textInURL = window.location.search;
var parametersInURL = new URLSearchParams(textInURL);
var id = parametersInURL.get('id');


console.log(id);


// Connection to contentful space
var client = contentful.createClient({
  space: 'insert_space_ID',
  accessToken: 'insert_API_value'
});


const contentTypeID = 'sampleBlog';


// Retrieving data for a specific article from contentful
// Note that here we are specifying the unique ID that we have retrieved from the URL in order to get the content for one specific article.
client.getEntry(id).then(function (entry) {


  // Get the blog div
  var articleContainer = document.getElementById('articleContainer');


  // Add the blog title
  var title = document.createElement('h2');
  title.innerHTML = entry.fields.title;
  title.classList.add('articleTitle');
  articleContainer.append(title);


  // Add the blog cover image
  var image = document.createElement('img');
  image.src = entry.fields.image.fields.file.url;
  image.classList.add('articleImage');
  articleContainer.appendChild(image);


  // Add the blog content
  var blogContent = document.createElement('p');
  blogContent.innerHTML = entry.fields.blogContent;
  image.classList.add('blogContent');
  articleContainer.append(blogContent);
});


// Creating the sidebar
var sideNavList = document.getElementById('sideNav');


// Retrieving data from contentful for the sidebar
client.getEntries({content_type: contentTypeID}).then(function (response) {
  response.items.forEach(function (entry) {


    // Adding side nav list items
    var sideNavListItem = document.createElement('li');


    // Creating an anchor tag and wrapping it around each side nav list item
    var anchor = document.createElement('a');
    anchor.classList.add('a');
    anchor.href = 'article.html?id='+entry.sys.id;
    anchor.appendChild(sideNavListItem);


    sideNavListItem.innerHTML = entry.fields.title;
    sideNavListItem.classList.add('sideNavListItem');
    sideNavList.appendChild(anchor);
  });
});
