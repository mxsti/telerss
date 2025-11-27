<img src="./logo.png" alt="drawing" width="400"/>

# Overview
TeleRSS is a very simple Telegram Bot where you can subscribe to different RSS Feeds. You get notified by the bot
when a new Article was published to the Feed.

# Hosting
You can use my hosted instance of the Bot. It can be found in Telegram under the username:   

**@mxsti_rss_feed_bot**

You could also host it yourself. You can either build an image with the Dockerfile or use the newest Image 
from the Repository. 

There are two conditions for the Bot to work.
1) You need a Telegram Bot Token. [Here](https://core.telegram.org/bots/tutorial) you can find an easy tutorial.
2) You need a database. The structure of the Database is defined in the Prisma Migrations. You need to provide the Database URL though.

Add these two Values in a .env File (you can find an example in the Repo) and run the image with <code>docker run --env-file .env</code> 


# Usage

| Command          | Functionality                                                    |
|:-----------------|:-----------------------------------------------------------------|
| /sub {RSS URL}   | Subscribes to a RSS Feed and checks if the Bot can grab/parse it |
| /unsub {RSS URL} | Unsubscribes from a RSS Feed                                     |
