# Twinject


Twinject is a small library that dynamically injects Tailwind CSS classes into your web page.

[Tailwind CSS](https://tailwindcss.com) is an awesome collection of utility CSS classes that allow you to quickly and accurately get the style you want in your web pages. Although it's possible to include the CDN build of Tailwind in your website, it's not recommended because the default library is 2.7 MB (226 KB gzipped.) Instead, you should set up a build environement including a PostCSS plugin that strips out the unused Tailwind classes reducing your CSS file down to a much smaller size.

With Twinject, you get the entire Tailwind class library in only 22 KB (8.5 KB gzipped.) As a bonus, you also get every combination of screen sizes and variants (hover, focus, active, etc.) along with every color, whereas Tailwind only supports a subset of the most common combinations. Also, with Twinject, classes with numbers support any value. For example, you can do a `w-68`, where Tailwind has no values between `w-64` and `w-72`.

## Installation

The simplest way to add Twinject is to add the following script tag to your `<head>` or `<body>` section:

```
<script src="https://unpkg.com/twinject/twinject.js"></script>
```

If you are using a Node build environment such as with Javascript libraries React or Vue, install Twinject from NPM:

```
npm install twinject
```

then import Twinject into the index page of your app:

```
import 'twinject'
```

### Installing Node modules
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
* reduce the size of the Twinject library by removing Tailwind CSS classes or colors you won't be using
* add or remove colors
* add or remove classes from the Preflight base styles
* adjust screen size breakpoints

You can remove classes by deleting or commenting out sections of `classMap` in the config.js file. Each key in the map is the first part of the class name. For example, the key for `bg-blue-100` is `bg`.

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

### Custom Classes
If you want to add your own utility classes or override a Tailwind utility class, use the `customclass.js` file, which includes an example that adds a `bg-stripes` class, which is a custom utility class used in Tailwind's online documentation. 

To add a custom class, export a function that returns a CSS declaration block, which is one or more CSS declarations, such as: `"color: white; text-align: center"`. The function is passed an object with the following values:

* cls: The full classname
* A, B, C, D, E, BC: The classname is split by the dash character (-) into parts and passed as A-E. For example, the class `border-indigo-100` would be passed as `A='border', B='indigo', C='100', BC='indigo-100'`. BC is the 2nd and 3rd parts combined.
* neg: Set to `true` if the class is a negative value such as `-inset-4`


## Variables and Themes
Twinject supports custom properties (sometimes called CSS variables). We call them variables. They are great for setting up themes in your web app. Currently, Twinject supports only color and size variables. Variables defined at the top of the web app can be use throughout the app. If you define color variables and use those variables throughout the app, by changing the color variables, you can change the color theme in the entire app. This is great for supporting dark and light modes.

Variables are defined like this:
```
set-textColor-gray-700
set-cardColor-indigo-300
set-paragraphMargin-8
set-boxPadding-4px
```
The word `set` is followed by the variable name. This name cannot contain a dash (-) or any other special characters. After the name is the value, which can be a color or a size.

To use the variable, add a class where the value is the variable name preceded by a '@' (or '$') as the value. For example:


```
bg-@cardColor
text-@textColor
mt-@paragraphMargin
p-$boxPadding
```

Variables are not supported in all Tailwind classes. These are the supported classes:

#### Color
`bg, border, text, ring, ring-offset, from, via, and to`

#### Size
`border width, m, p, w, h, top, right, bottom, left, leading, max-h, gap, and translate`

## API

To use the Javascript API, use the global variable `tailwind` if you installed Twinject using a `<script>` tag. If you imported Twinject, do the following:

```
import * as twinject from 'twinject'
```

### addClasses (class list)
Inject one or more Tailwind classes:
```
twinject.addClasses('p-4 bg-indigo-500')
```

### getRule (class)
Get the CSS rule for a Tailwind class.
```
twinject.getRule('bg-rose-300')
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

### insertRule (rule)
Insert a CSS rule into the Twinject stylesheet. Can be used to add additional custom CSS rules.

```
twinject.insertRule('h1 { color: white; text-align: center; }')
```

### disableAutoInstall ()
Turns off auto injection of Tailwind classes. Do this if you want to selectively install classes using the `twinject.addClasses` function

### enableAutoInstall ()
Re-enables auto injection of Tailwind classes

## Motivation
The reason I developed this library is because I'm working on a project that dynamically makes changes to a web app and it is not known at build time which Tailwind CSS classes will be used, so I needed a way to generate those on demand. 
