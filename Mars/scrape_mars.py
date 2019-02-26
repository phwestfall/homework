from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
 

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    # executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    executable_path = {'executable_path': 'C:\\Users\\Paul\\Documents\\GitHub\\homework\\Mars\\chromedriver.exe'}
    return Browser("chrome", **executable_path, headless=False)

def scrape():
    browser = init_browser()
    mars_all = {}    
    
## NASA Mars News
    # visit NASA news website through splinter
    url1 = 'https://mars.nasa.gov/news/'
    browser.visit(url1)

    # HTML Object
    html = browser.html

    # parse HTML with beautiful soup
    soup = BeautifulSoup(html, 'html.parser')

    # Retrieve the latest element that contains news title and paragraph
    ####### the news_p code will randomly error as a NoneType or str object not callable 
    news_title = soup.find('div', class_='content_title').find('a').text
    news_p = soup.find('div', class_='article_teaser_body').text
    
    mars_all['news_title'] = news_title
    mars_all['news_p'] = news_p

## JPL Mars Space Images
    browser = init_browser()
    # visit mars space images through splinter module
    image_url_featured = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(image_url_featured)

    # HTML Object
    html = browser.html
    
    # parse HTML with beautiful soup
    soup = BeautifulSoup(html, 'html.parser')
    
    # retrieve image from url using the style tag
    featured_image_url = soup.find('article')['style']
    
    # clean up what is returned from the style tag to later concatenate the websites base url
    featured_image_url = featured_image_url.replace('background-image: url(','')
    featured_image_url = featured_image_url.replace(');','')
    featured_image_url = featured_image_url[1:-1]
    
    # website base url
    base_url = 'http://www.jpl.nasa.gov'
    
    # concatenate base url with feature image url
    featured_image_url = base_url + featured_image_url
    
    # display full link
    mars_all['featured_image_url'] = featured_image_url

## Mars Weather
    browser = init_browser()
    # visit Mars weather twitter through splinter module
    weather_url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(weather_url)
    
    # HTML Object 
    html_weather = browser.html
    
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html_weather, 'html.parser')
    
    # Find all elements that contain tweets
    mars_weather_tweet = soup.find_all('div', class_ = "js-tweet-text-container")
    
    # Get tweets that contain sol to indicate weather tweets
    # use break to stop once the first (most recent) weather tweet was posted
    weather_text = 'sol '
    
    for tweet in mars_weather_tweet:
        if weather_text in tweet.text:
            mars_weather = tweet.text.strip()
            break
    
    mars_all['mars_weather'] = mars_weather

## Mars Facts
    browser = init_browser()
    
    # visit Mars facts url 
    url_facts = 'http://space-facts.com/mars/'
    
    # use pandas to parse the url
    tables = pd.read_html(url_facts)
    
    # find the mars facts table as assign it to mars_df
    mars_df = tables[0]
    
    # Assign the columns `['Description', 'Value']`
    mars_df.columns = ['Description', 'Value']
    
    # set the index to the `Description` column without row indexing
    mars_df.set_index('Description', inplace=True)

    # Save html code to folder Assets
    data = mars_df.to_html()

    # Dictionary entry from MARS FACTS
    mars_all['mars_facts'] = data


## Mars Hemispheres
    browser = init_browser()
    
    # Visit hemispheres website through splinter module 
    hemispheres_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(hemispheres_url)
    
    # HTML Object
    html_hemispheres = browser.html
    
    # Parse HTML with Beautiful Soup
    soup = BeautifulSoup(html_hemispheres, 'html.parser')
    
    # Retreive all items that contain mars hemispheres information
    items = soup.find_all('div', class_='item')
    
    # Create empty list for hemisphere urls 
    hemisphere_image_urls = []
    
    # Store the main_ul 
    hemispheres_main_url = 'https://astrogeology.usgs.gov'
    
    # Loop through the items previously stored
    for item in items: 
        # Store title
        title = item.find('h3').text.replace(' Enhanced','')
            
        # Store link that leads to full image website
        partial_img_url = item.find('a', class_='itemLink product-item')['href']
        
        # Visit the link that contains the full image website 
        browser.visit(hemispheres_main_url + partial_img_url)
        
        # HTML Object of individual hemisphere information website 
        partial = browser.html
        
        # Parse HTML with Beautiful Soup for every individual hemisphere information website 
        soup = BeautifulSoup(partial, 'html.parser')
        
        # Retrieve full image source 
        img_url = hemispheres_main_url + soup.find('img', class_='wide-image')['src']
        
        # Append the retreived information into a list of dictionaries 
        hemisphere_image_urls.append({"title" : title, "img_url" : img_url})
    
    mars_all['hemisphere_image_urls'] = hemisphere_image_urls
    
    return mars_all