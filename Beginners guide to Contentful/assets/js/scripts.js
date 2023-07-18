// Connection to contentful space
const client = contentful.createClient({
    space: 'insert_space_ID',
    accessToken: 'insert_API_value'
});

const contentTypeID = 'sampleBlog';

var containerDiv = document.getElementById('container');

// Retrieving all entries from Contentful
client.getEntries({content_type: contentTypeID}).then(function (response) {
    response.items.forEach(function (entry) {

        // Creating each blog item
        var articleItem = document.createElement('article');

        // Adding this element to the parent element
        containerDiv.appendChild(articleItem);

        // Adding a class name to the article element
        articleItem.classList.add('blogItem');

        // Adding titles (headings) for each article element
        var title = document.createElement('h2');
        
        // Creating an anchor tag and wrapping it around the title so the user is easily redirected to the article.html page
        var anchor = document.createElement('a');
        anchor.classList.add('anchors');

        // We want to pass the ID of each article in the URL so that we can use this ID to retrieve it's content in article.js
        anchor.href = 'article.html?id='+entry.sys.id;
        anchor.appendChild(title);
        
        // Now that we have created the anchor tags, we can insert the content from Contentful to the heading and append it inside the unique anchor tags.
        title.innerHTML = entry.fields.title;
        title.classList.add('blogTitle');
        articleItem.appendChild(anchor);

        // Adding a cover image for the blog item
        var image = document.createElement('img');
        image.src = entry.fields.coverImage.fields.file.url;
        image.classList.add('image');
        articleItem.appendChild(image);

        // Adding the content for each blog
        var blogContent = document.createElement('p');
        var content = entry.fields.blogContent;

        // The following 3 lines of code limits the word count of each blog item to 100 words in order to give the user just a preview of the entire article
        var words = content.split(' ');
        var limitedContent = words.slice(0, 100).join(' ');
        blogContent.innerHTML = limitedContent + ' ...';

        blogContent.classList.add('blogContent');
        articleItem.appendChild(blogContent);

        // Add a button to view article
        var button = document.createElement('button');
        
        // Creating an anchor tag and wrapping it around the button
        var btnLink = document.createElement('a');
        btnLink.classList.add('anchors');
        btnLink.href = 'article.html?id='+entry.sys.id;
        btnLink.appendChild(button);
        
        button.innerHTML = "View more";
        // If your element has multiple classes, using JS we can only add one class name at a time as shown below.
        button.classList.add('button');
        button.classList.add('btn-style');
        articleItem.appendChild(btnLink);
    });
});
