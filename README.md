# website-speed-test-node

## How it all started

I've always had a problem with testing my own project's availability and speed. Since I'm a web developer, http requests will do the job for me.
I needed a simple tool that would make http requests and tell me how long they took. Since I don't know shell, I took a language I know best – JavaScript.

## How it works

The app basically runs a command on the machine (same as if you did `curl` in terminal on your linux or mac device), then formats the output, and returns it to you.

## Functionality

- One-time run (if you want to check the speed just once)
- Scheduled runs (once in X milliseconds – if you want to see if your website is constantly up and running)
- Detailed statistics (if you want to see which parts are taking longer or shorter)

![](functionality1.gif)
![](functionality2.gif)
![](functionality3.gif)
