<img src="./logo.png" alt="drawing" width="400" style="display: block; margin-left: auto; margin-right: auto"/>

# TeleRSS

## Overview

**TeleRSS** is a lightweight Telegram bot that lets you subscribe to any RSS feed.  
Whenever a new article is published, the bot sends you a notification directly in Telegram.

---

## Hosting

You can use the public instance of the bot, available on Telegram under the username:

**@mxsti_rss_feed_bot**

If you prefer to host it yourself, you can either build the Docker image using the provided `Dockerfile` or pull the latest prebuilt image from the repository.

To run your own instance, you need two things:

1. **Telegram Bot Token**  
   You can follow this simple [tutorial](https://core.telegram.org/bots/tutorial) to create one.

2. **Database**  
   The database schema is defined using Prisma migrations.  
   You only need to provide a database connection URL.

Create a `.env` file containing both values (an example is included in the repository) and start the container using:

```bash
docker run --env-file .env <image>
