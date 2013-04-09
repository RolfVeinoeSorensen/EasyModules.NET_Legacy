EasyModules.NET
=========
MVC 4 Based CMS

IMPORTANT!
-
  - Do use this as inspiration
  - Do NOT use this as a production CMS. This system is only in alpha version. Follow the progress on website.

Features:

  - Ninject based modularity
  - Metro JS Template
  - Magic

> The design goal for EasyModules.NET
> is to provide a fun and easy to use 
> MVC CMS for both users who just wants a cool blog
> or for users who wants a place to play with MVC.
> The modularity makes this site a great playground
> for developers who wants a cool starter kit.

Visit http://easymodules.net to view this site in action.
You can also download an installer that allows you to easily build and update modules for the system.

Version
-

0.1 Initial project setup

Tech
-----------

EasyModules.NET uses a number of open source projects to work properly:

* [Microsoft MVC 4] - awesome web framework
* [Knockout] - MVVM for JavaScript
* [Entity Framework] - for that nasty data we have to handle
* [jQuery] - duh 

Installation
--------------

```sh
git clone [git-repo-url] EasyModules.NET
cd EasyModules.NET
npm i
mkdir -p public/files/{md,html}
node app
```


License
-

MIT

*Free Software, Fuck Yeah!*

Sources of magic knowledge
===============
Ninject based modularity
I have used and extended on the method described here.
http://www.squarewidget.com/pluggable-architecture-in-asp.net-mvc-4

Metro JS Template
Based on the works of Drew Greenwell
http://drewgreenwell.com/projects/metrojs

Simple Store with MVC and Knockout.js
http://www.asp.net/web-api/overview/creating-web-apis/using-web-api-with-entity-framework/using-web-api-with-entity-framework,-part-1
