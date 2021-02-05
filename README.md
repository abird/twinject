# Twinject


Twinject is a small library that dynamically injects Tailwind CSS classes into your web page.

[Tailwind CSS](https://tailwindcss.com) is an awesome collection of utility CSS classes that allow you to quickly and accurately get the style you want in your web pages. Although it's possible to include the CDN build in your website, it's not recommended because the default library is 2.7 MB (226 KB gzipped. Instead, you should set up a build environement including a PostCSS plugin that strips out the unused Tailwind classes reducing your css file down to a much smaller size.

With Twinject, you get the entire Tailwind class library in only 22 KB (8.5 gzipped.) As a bonus, you also get every combination of screen sizes and variants (hover, focus, active, etc.) along with every color. Tailwind only supports a subset of the most common combinations. Also, with Twinject, classes with numbers support any value. For example, you can do a `w-68`, where Tailwind has no value between `w-64` and `w-72`.

## Installation

The simplest way to add Twinject is to add the following script tag to your `<head>` or `<body>` section:

```
<script src="https://unpkg.com/abird/dist/twinject.js"></script>
```

If you are using a Node build environment such as with Javascript libraries React or Vue, install Twinject from NPM:

```
npm install twinject
```

then import Twinject into the index page of your app:

```
import 'twinject'
```

## Installing Node modules
If you will be making your own build or running the sample web page, you will first need to install the Node modules with the following:

```
npm install
```

or

```
yarn
```


## Sample Web Page
To run the sample web page, do:

```
npm run start
```
or 
```
yarn start
```
then open your browser to <http://localhost:5000>


## Customization
Doing your own build of Twinject allows you to do any of the follwing:
* reduce the size of the Twinject library by removing Tailwind CSS classes you won't be using
* add or remove colors
* add or remove classes from the Preflight base styles
* adjust screen size breakpoints

You can remove classes by deleting or commenting out sections of `classMap` in the config.js file. Each key in the map is the first part of the class name. For example, the key for `bg-blue-100` is `bg`. You can also add classes, but instructions for doing that will be done at a later time.

Preflight rules are defined in the `preflight` object in config.js

Screen size breakpoints are defined in `screenSizes` in config.js

Colors are defined in the colors.js file. 

Once you have made your changes, rebuild Twinject by running

```
npm run build
```
or 
```
yarn build
```
The build will be in the `dist` folder

## API

To use the Javascript API, do the following to get one or more API functions:

```
import { addClasses, getRule, disableAutoInstall, enableAutoInstall } from 'twinject'
```

### addClasses (class list)
Inject one or more Tailwind classes:
```
addClasses('p-4 bg-indigo-500')
```

### getRule (class)
Get the CSS rule for a Tailwind class.
```
getRule('bg-rose-300')
```
This returns:
```
{
  rule: '.bg-rose-300 {--tw-bg-opacity: 1; background-color: rgba(253, 164, 175, var(--tw-bg-opacity))}',
  declarations: '--tw-bg-opacity: 1; background-color: rgba(253, 164, 175, var(--tw-bg-opacity))'
}
```
`rule` contains the selector and declaration block

`declarations` contains only the declaration block

### disableAutoInstall ()
Turns off auto injection of Tailwind classes. Do this if you want to selectively install classes using the `addClasses` function

### enableAutoInstall ()
Re-enables auto injection of Tailwind classes

## Motivation
The reason I developed this library is because I'm working on a project that dynamically makes changes to a web app and it is not known at build time which Tailwind CSS classes will be used, so I needed a way to generate those on demand. 
