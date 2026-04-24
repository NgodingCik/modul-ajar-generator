---
description: "This document provides instructions for the SweetAlert2 library."
applyTo: 'sweetalert2' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file
---

# SweetAlert2

**A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes**

**Zero dependencies**

- Current version: [v11.26.24](https://github.com/sweetalert2/sweetalert2/releases)
- Latest update: [yesterday](https://github.com/sweetalert2/sweetalert2/commits/main)
- Downloads last month: [4,125,753](https://npm-stat.com/charts.html?package=sweetalert2)

---

## Navigation

- [Examples](#examples)
- [Recipe Gallery](https://sweetalert2.github.io/recipe-gallery/)
- [Installation](#download)
- [Usage](#usage)
- [Integrations](#frameworks-integrations)
- [Themes](#themes)
- [Configuration Params](#configuration)
- [Declarative Templates](#declarative-templates)
- [Handling Buttons](#handling-buttons)
- [Handling Dismissals](#handling-dismissals)
- [Icons](#icons)
- [Input Types](#input-types)
- [Methods](#methods)
- [Sponsors](#sponsors)
- [NSFW Sponsors](#nsfw-sponsors)

### Available Themes

Default (light), Dark, Auto, Bootstrap 5, Bootstrap 4, Material UI, Minimal, Borderless, Bulma

---

## Showcase

**Normal alert:**

```js
alert("You clicked the button!");
```

**SweetAlert2 success message:**

```js
Swal.fire({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
});
```

---

## Examples

### A basic message

```js
Swal.fire("SweetAlert2 is working!");
```

### A title with a text under

```js
Swal.fire({
  title: "The Internet?",
  text: "That thing is still around?",
  icon: "question"
});
```

### A modal with a title, an error icon, a text, and a footer

```js
Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});
```

### A modal window with a long content inside

```js
Swal.fire({
  imageUrl: "https://placeholder.pics/svg/300x1500",
  imageHeight: 1500,
  imageAlt: "A tall image"
});
```

### A draggable modal window

```js
Swal.fire({
  title: "Drag me!",
  icon: "success",
  draggable: true
});
```

### Custom HTML description and buttons with ARIA labels

```js
Swal.fire({
  title: "<strong>HTML <u>example</u></strong>",
  icon: "info",
  html: `
    You can use <b>bold text</b>,
    <a href="#" autofocus>links</a>,
    and other HTML tags
  `,
  showCloseButton: true,
  showCancelButton: true,
  focusConfirm: false,
  confirmButtonText: `
    <i class="fa fa-thumbs-up"></i> Great!
  `,
  confirmButtonAriaLabel: "Thumbs up, great!",
  cancelButtonText: `
    <i class="fa fa-thumbs-down"></i>
  `,
  cancelButtonAriaLabel: "Thumbs down"
});
```

### A dialog with three buttons

```js
Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) Swal.fire("Saved!", "", "success");
  else if (result.isDenied) Swal.fire("Changes are not saved", "", "info");
});
```

### A custom positioned dialog

```js
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});
```

### Custom animation with [Animate.css](https://animate.style/)

```js
Swal.fire({
  title: "Custom animation with Animate.css",
  showClass: { popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    ` },
  hideClass: { popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    ` }
});
```

### A confirm dialog, with a function attached to the "Confirm"-button

```js
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
});
```

### Passing a parameter for "Cancel" button

```js
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) swalWithBootstrapButtons.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
  else if (result.dismiss === Swal.DismissReason.cancel) swalWithBootstrapButtons.fire({
    title: "Cancelled",
    text: "Your imaginary file is safe :)",
    icon: "error"
  });
});
```

### A message with a custom image

```js
Swal.fire({
  title: "Sweet!",
  text: "Modal with a custom image.",
  imageUrl: "https://unsplash.it/400/200",
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: "Custom image"
});
```

### A message with custom width, padding, background and animated Nyan Cat

```js
Swal.fire({
  title: "Custom width, padding, color, background.",
  width: 600,
  padding: "3em",
  color: "#716add",
  background: "#fff url(/images/trees.png)",
  backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `
});
```

### A message with auto close timer

```js
let timerInterval;
Swal.fire({
  title: "Auto close alert!",
  html: "I will close in <b></b> milliseconds.",
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) console.log("I was closed by the timer");
});
```

### Right-to-left support for Arabic, Persian, Hebrew, and other RTL languages

```js
Swal.fire({
  title: "هل تريد الاستمرار؟",
  icon: "question",
  iconHtml: "؟",
  confirmButtonText: "نعم",
  cancelButtonText: "لا",
  showCancelButton: true,
  showCloseButton: true
});
```

### AJAX request example

```js
Swal.fire({
  title: "Submit your GitHub username",
  input: "text",
  inputAttributes: { autocapitalize: "off" },
  showCancelButton: true,
  confirmButtonText: "Look up",
  showLoaderOnConfirm: true,
  preConfirm: async (login) => {
    try {
      const githubUrl = `
        https://api.github.com/users/${login}
      `;
      const response = await fetch(githubUrl);
      if (!response.ok) return Swal.showValidationMessage(`
          ${JSON.stringify(await response.json())}
        `);
      return response.json();
    } catch (error) {
      Swal.showValidationMessage(`
        Request failed: ${error}
      `);
    }
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
  if (result.isConfirmed) Swal.fire({
    title: `${result.value.login}'s avatar`,
    imageUrl: result.value.avatar_url
  });
});
```

---

## Download & Install

```sh
$ npm install sweetalert2
```

Or grab from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/sweetalert2):

```html
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
```

> sweetalert2 is the **16th** most popular package on jsDelivr, with **2,826,148,607** CDN hits in the last month.

---

## Usage

**1. Import the plugin:**

```js
import Swal from 'sweetalert2'

// or via CommonJS
const Swal = require('sweetalert2')
```

It's also possible to import JS and CSS separately, e.g. if you need to customize styles:

```js
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
```

**2. Call the sweetAlert2-function after the page has loaded:**

```js
Swal.fire({
  title: 'Error!',
  text: 'Do you want to continue',
  icon: 'error',
  confirmButtonText: 'Cool'
})
```

As an old-school alternative, you can initialize the plugin by referencing the necessary files:

```html
<script src="sweetalert2.all.min.js"></script>
```

Or with the stylesheet separately if desired:

```html
<script src="sweetalert2.min.js"></script>
<link rel="stylesheet" href="sweetalert2.min.css">
```

---

## Integrations with Major Frameworks

- [React](https://github.com/sweetalert2/sweetalert2-react-content)
- [Vue](https://github.com/avil13/vue-sweetalert2)
- [Angular](https://github.com/sweetalert2/ngx-sweetalert2)
- [Laravel](https://github.com/sweetalert2/sweetalert2-laravel)

---

## Themes

### dark

Dark theme is included by default. To use it, just set the **theme** parameter to **'dark'**:

```js
Swal.fire({
  title: 'Dark theme',
  theme: 'dark'
})
```

### auto

Auto theme is also included in default SweetAlert2 styles, it automatically adapts to the browser's theme (light or dark). To use it, just set the **theme** parameter to **'auto'**:

```js
Swal.fire({
  title: 'Auto theme',
  theme: 'auto'
})
```

### bootstrap-5

Bootstrap 5 theme is a separate CSS file that automatically adapts to the browser's theme (light or dark). To use it, you need to import the theme's CSS file and set the **theme** parameter to **'bootstrap-5'**:

```js
import 'sweetalert2/themes/bootstrap-5.css'

Swal.fire({
  title: 'Bootstrap 5 theme',
  theme: 'bootstrap-5'
  // theme: 'bootstrap-5-light' // light theme only
  // theme: 'bootstrap-5-dark' // dark theme only
})
```

### bootstrap-4

Bootstrap 4 theme is a separate CSS file that automatically adapts to the browser's theme (light or dark). To use it, you need to import the theme's CSS file and set the **theme** parameter to **'bootstrap-4'**:

```js
import 'sweetalert2/themes/bootstrap-4.css'

Swal.fire({
  title: 'Bootstrap 4 theme',
  theme: 'bootstrap-4'
  // theme: 'bootstrap-4-light' // light theme only
  // theme: 'bootstrap-4-dark' // dark theme only
})
```

### material-ui

Material UI theme is a separate CSS file that automatically adapts to the browser's theme (light or dark). To use it, you need to import the theme's CSS file and set the **theme** parameter to **'material-ui'**:

```js
import 'sweetalert2/themes/material-ui.css'

Swal.fire({
  title: 'Material UI theme',
  theme: 'material-ui'
  // theme: 'material-ui-light' // light theme only
  // theme: 'material-ui-dark' // dark theme only
})
```

### bulma

Bulma theme is a separate CSS file that automatically adapts to the browser's theme (light or dark). To use it, you need to import the theme's CSS file and set the **theme** parameter to **'bulma'**:

```js
import 'sweetalert2/themes/bulma.css'

Swal.fire({
  title: 'Bulma theme',
  theme: 'bulma'
  // theme: 'bulma-light' // light theme only
  // theme: 'bulma-dark' // dark theme only
})
```

---

## Configuration Params

Here are the keys that you can use if you pass an object into sweetAlert2:

### title
*Default: `''`*

The title of the popup, as HTML.

### titleText
*Default: `''`*

The title of the popup, as text. Useful to avoid HTML injection.

### html
*Default: `''`*

A HTML description for the popup. If **text** and **html** parameters are provided at the same time, **html** will be used.

> **[Security]** SweetAlert2 does NOT sanitize this parameter. It is the developer's responsibility to escape any user input when using the **html** option, so XSS attacks would be prevented.

### text
*Default: `''`*

A description for the popup. If **text** and **html** parameters are provided at the same time, **html** will be used.

### icon
*Default: `undefined`*

The icon of the popup. SweetAlert2 comes with 5 built-in icons which will show a corresponding icon animation: **warning**, **error**, **success**, **info**, and **question**. It can either be put in the array under the key "icon" or passed as the third parameter of the function.

### iconColor
*Default: `undefined`*

Use this to change the color of the icon.

### iconHtml
*Default: `undefined`*

The custom HTML content for an icon.

### animation
*Default: `true`*

If set to **false**, the popup animation will be disabled.

### theme
*Default: `'light'`*

Theme of the popup. **'light'**, **'dark'**, **'auto'**, and **'borderless'** for now. This is a new feature, more themes are coming. Feel free to request new themes (or create your own and PR it).

### showClass
*Default:*
```js
{
  popup: 'swal2-show',
  backdrop: 'swal2-backdrop-show',
  icon: 'swal2-icon-show'
}
```

CSS classes for animations when showing a popup (fade in).

### hideClass
*Default:*
```js
{
  popup: 'swal2-hide',
  backdrop: 'swal2-backdrop-hide',
  icon: 'swal2-icon-hide'
}
```

CSS classes for animations when hiding a popup (fade out).

### footer
*Default: `''`*

The footer of the popup. Can be either plain text or HTML.

### backdrop
*Default: `true`*

Whether or not SweetAlert2 should show a full screen click-to-dismiss backdrop. Can be either a **boolean** or a **string** which will be assigned to the CSS **background** property.

### toast
*Default: `false`*

Whether or not an alert should be treated as a toast notification. This option is normally coupled with the **position** parameter and a timer. Toasts are NEVER autofocused.

### target
*Default: `'body'`*

The container element for adding popup into.

### topLayer
*Default: `false`*

Set to `true` to put the popup on top of all other elements (Top Layer).

### input
*Default: `undefined`*

Input field type, can be **text**, **email**, **password**, **number**, **tel**, **range**, **textarea**, **search**, **url**, **select**, **radio**, **checkbox**, **file**, **date**, **datetime-local**, **time**, **week**, **month**.

### width
*Default: `'32em'`*

Popup window width, including paddings (*box-sizing: border-box*). Can be in any CSS unit (**px**, **em/rem**, **%**).

### padding
*Default: `'0 0 1.25em'`*

Popup window padding. Can be in any CSS unit (**px**, **em/rem**, **%**).

### color
*Default: `undefined`*

Color for title, content and footer (CSS **color** property). The default color is **'#545454'**.

### background
*Default: `undefined`*

Popup window background (CSS background property). The default background is **'#fff'**.

### position
*Default: `'center'`*

Popup window position, can be **'top'**, **'top-start'**, **'top-end'**, **'center'**, **'center-start'**, **'center-end'**, **'bottom'**, **'bottom-start'**, or **'bottom-end'**.

### grow
*Default: `false`*

Paired with window position, sets the direction the popup should grow in, can be set to **'row'**, **'column'**, **'fullscreen'**, or **false**.

### customClass
*Default: `undefined`*

A custom CSS class for the popup:

```js
customClass: {
  container: '...',
  popup: '...',
  header: '...',
  title: '...',
  closeButton: '...',
  icon: '...',
  image: '...',
  htmlContainer: '...',
  input: '...',
  inputLabel: '...',
  validationMessage: '...',
  actions: '...',
  confirmButton: '...',
  denyButton: '...',
  cancelButton: '...',
  loader: '...',
  footer: '....',
  timerProgressBar: '....',
}
```

### timer
*Default: `undefined`*

Auto close timer of the popup. Set in ms (milliseconds). See also [Swal.getTimerLeft()](#getTimerLeft), [Swal.stopTimer()](#stopTimer), [Swal.resumeTimer()](#resumeTimer), [Swal.toggleTimer()](#toggleTimer), [Swal.isTimerRunning()](#isTimerRunning) and [Swal.increaseTimer()](#increaseTimer).

### timerProgressBar
*Default: `false`*

If set to true, the timer will have a progress bar at the bottom of a popup. Mostly, this feature is useful with toasts.

### heightAuto
*Default: `true`*

By default, SweetAlert2 sets html's and body's CSS **height** to **auto !important**. If this behavior isn't compatible with your project's layout, set **heightAuto** to **false**.

### allowOutsideClick
*Default: `true`*

If set to **false**, the user can't dismiss the popup by clicking outside it. You can also pass a custom function returning a boolean value, e.g. if you want to disable outside clicks for the loading state of a popup.

### allowEscapeKey
*Default: `true`*

If set to **false**, the user can't dismiss the popup by pressing the `Esc` key. You can also pass a custom function returning a boolean value, e.g. if you want to disable the `Esc` key for the loading state of a popup.

### stopKeydownPropagation
*Default: `true`*

If set to **false**, SweetAlert2 will allow **keydown** events propagation to the document.

### keydownListenerCapture
*Default: `false`*

Useful for those who are using SweetAlert2 along with Bootstrap modals. By default **keydownListenerCapture** is **false** which means when a user hits `Esc`, both SweetAlert2 and Bootstrap modals will be closed. Set **keydownListenerCapture** to **true** to fix that behavior.

### showConfirmButton
*Default: `true`*

If set to **false**, a "Confirm"-button will not be shown.

### showDenyButton
*Default: `false`*

If set to **true**, a "Deny"-button will be shown. It can be useful when you want a popup with 3 buttons.

### showCancelButton
*Default: `false`*

If set to **true**, a "Cancel"-button will be shown, which the user can click on to dismiss the modal.

### confirmButtonText
*Default: `'OK'`*

Use this to change the text on the "Confirm"-button.

### denyButtonText
*Default: `'No'`*

Use this to change the text on the "Deny"-button.

### cancelButtonText
*Default: `'Cancel'`*

Use this to change the text on the "Cancel"-button.

### confirmButtonColor
*Default: `undefined`*

Use this to change the background color of the "Confirm"-button. The default color is **#3085d6**.

### denyButtonColor
*Default: `undefined`*

Use this to change the background color of the "Deny"-button. The default color is **#dd6b55**.

### cancelButtonColor
*Default: `undefined`*

Use this to change the background color of the "Cancel"-button. The default color is **#aaa**.

### confirmButtonAriaLabel
*Default: `''`*

Use this to change the **aria-label** for the "Confirm"-button.

### denyButtonAriaLabel
*Default: `''`*

Use this to change the **aria-label** for the "Deny"-button.

### cancelButtonAriaLabel
*Default: `''`*

Use this to change the **aria-label** for the "Cancel"-button.

### buttonsStyling
*Default: `true`*

Apply default styling to buttons. If you want to use your own classes (e.g. Bootstrap classes) set this parameter to **false**.

### reverseButtons
*Default: `false`*

Set to **true** if you want to invert default buttons positions ("Confirm"-button on the right side).

### focusConfirm
*Default: `true`*

Set to **false** if you want to focus the first element in tab order instead of "Confirm"-button by default.

### returnFocus
*Default: `true`*

Set to **false** if you don't want to return the focus to the element that invoked the modal after the modal is closed.

### focusDeny
*Default: `false`*

Set to **true** if you want to focus the "Deny"-button by default.

### focusCancel
*Default: `false`*

Set to **true** if you want to focus the "Cancel"-button by default.

### showCloseButton
*Default: `false`*

Set to **true** to show close button in top right corner of the popup.

### closeButtonHtml
*Default: `'&times;'`*

Use this to change the content of the close button.

### closeButtonAriaLabel
*Default: `'Close this dialog'`*

Use this to change the **aria-label** for the close button.

### loaderHtml
*Default: `''`*

Use this to change the HTML content of the loader.

### showLoaderOnConfirm
*Default: `false`*

Set to **true** to disable buttons and show the loader instead of the Confirm button. Use it in combination with the [**preConfirm**](#preConfirm) parameter.

### showLoaderOnDeny
*Default: `false`*

Set to **true** to disable buttons and show the loader instead of the Deny button. Use it in combination with the [**preDeny**](#preDeny) parameter.

### scrollbarPadding
*Default: `true`*

Set to **false** to disable body padding adjustment when the page scrollbar gets hidden while the popup is shown.

### preConfirm
*Default: `undefined`*

Function to execute before confirming, may be async (Promise-returning) or sync. Returned (or resolved) value can be:
- **false** to prevent a popup from closing
- anything else to pass that value as the **result.value** of **Swal.fire()**
- **undefined** to keep the default **result.value**

See [usage example](#ajax-request).

### preDeny
*Default: `undefined`*

Function to execute before denying, may be async (Promise-returning) or sync. Returned (or resolved) value can be:
- **false** to prevent a popup from closing
- anything else to pass that value as the **result.value** of **Swal.fire()**
- **undefined** to keep the default **result.value**

### returnInputValueOnDeny
*Default: `false`*

If you want to return the input value as **result.value** when denying the popup, set to **true**. Otherwise, the denying will set **result.value** to **false**.

### imageUrl
*Default: `undefined`*

Add a customized icon for the popup. Should contain a string with the path or URL to the image.

### imageWidth
*Default: `undefined`*

If imageUrl is set, you can specify imageWidth to describe image width. Can be in any CSS unit (**px**, **em/rem**, **%**).

### imageHeight
*Default: `undefined`*

Custom image height. Can be in any CSS unit (**px**, **em/rem**, **%**).

### imageAlt
*Default: `''`*

An alternative text for the custom image icon.

### inputLabel
*Default: `''`*

Input field label.

### inputPlaceholder
*Default: `''`*

Input field placeholder.

### inputValue
*Default: `''`*

Input field initial value. If the input type is **select**, **inputValue** will represent the selected `<option>` tag. If the input type is **checkbox**, **inputValue** will represent the **checked** state. If the input type is **email**, **number**, **tel**, **text**, or **textarea**, a Promise can be accepted as **inputValue**.

### inputOptions
*Default: (empty)*

If **input** parameter is set to **"select"** or **"radio"**, you can provide options. Can be a Map or a plain object, with keys that represent option values and values that represent option text. You can also provide plain object or Map as values that will represent a group of options, being the label of this `<optgroup>` the key. Finally, you can also provide a Promise that resolves with one of those types.

### inputAutoFocus
*Default: `true`*

Automatically focus the input when popup is shown. Set this parameter to **false** to disable auto-focusing.

### inputAutoTrim
*Default: `true`*

Automatically remove whitespaces from both ends of a result string. Set this parameter to **false** to disable auto-trimming.

### inputAttributes
*Default: (empty)*

HTML input attributes (e.g. **min**, **max**, **autocomplete**, **accept**), that are added to the input field. Object keys will represent attributes names, object values will represent attributes values.

### inputValidator
*Default: `undefined`*

Validator for input field, may be async (Promise-returning) or sync. Returned (or resolved) value can be:
- a **falsy** value (**undefined**, **null**, **false**) for indicating *success*
- a string value (error message) for indicating *failure*

See [usage example](#input-select).

### validationMessage
*Default: `undefined`*

A custom validation message for default validators (email, url).

### progressSteps
*Default: `[]`*

Progress steps, useful for queues.

### currentProgressStep
*Default: `undefined`*

Current active progress step.

### progressStepsDistance
*Default: `undefined`*

Distance between progress steps. Can be in any CSS unit (**px**, **em/rem**, **%**).

### didRender
*Default: `undefined`*

Popup lifecycle hook. Synchronously runs after the popup DOM has been updated (i.e. just before the popup is repainted on the screen). **didRender** is called before **willOpen**. Provides popup DOM element as the argument. Typically, this will happen after **Swal.fire()** or **Swal.update()**. If you want to perform changes in the popup's DOM, that survive **Swal.update()**, prefer **didRender** over **willOpen**. In previous versions, this hook was named **onRender**.

### willOpen
*Default: `undefined`*

Popup lifecycle hook. Synchronously runs before the popup is shown on screen. Provides popup DOM element as the argument. In previous versions, this hook was named **onBeforeOpen**.

### didOpen
*Default: `undefined`*

Popup lifecycle hook. Asynchronously runs after the popup has been shown on screen. Provides popup DOM element as the argument. In previous versions, this hook was named **onOpen**.

### willClose
*Default: `undefined`*

Popup lifecycle hook. Synchronously runs when the popup closes by user interaction (and not due to another popup being fired). Provides popup DOM element as the argument. In previous versions, this hook was named **onClose**.

### didClose
*Default: `undefined`*

Popup lifecycle hook. Asynchronously runs after the popup has been disposed by user interaction (and not due to another popup being fired). In previous versions, this hook was named **onAfterClose**.

### didDestroy
*Default: `undefined`*

Popup lifecycle hook. Synchronously runs after popup has been destroyed either by user interaction or by another popup. If you have cleanup operations that you need to reliably execute each time a popup is closed, prefer **didDestroy** over **didClose**. In previous versions, this hook was named **onDestroy**.

---

### Mixin

You can easily reuse configuration by creating your own **Swal** with **Swal.mixin({...options})**:

```js
Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
}).fire({
  icon: "success",
  title: "Signed in successfully"
});
```

### Params Property

Every SweetAlert2 instance has a **params** property containing the frozen (read-only) options that were passed to **Swal.fire({…})**:

```js
const swalInstance = Swal.fire({ title: 'Hello World!', icon: 'info' })

console.log(swalInstance.params.title) // Hello World!
console.log(swalInstance.params.icon)  // info
```

---

## Declarative Templates and Declarative Triggering

There's also the declarative way to define a popup, via the [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) tag. This is handy when you want to define popup on server side (SSR).

### Declarative template example

```html
<template id="my-template">
  <swal-title>
    Save changes to "Untitled 1" before closing?
  </swal-title>
  <swal-icon type="warning" color="red"></swal-icon>
  <swal-button type="confirm">
    Save As
  </swal-button>
  <swal-button type="cancel">
    Cancel
  </swal-button>
  <swal-button type="deny">
    Close without Saving
  </swal-button>
  <swal-param name="allowEscapeKey" value="false" />
  <swal-param
    name="customClass"
    value='{ "popup": "my-popup" }' />
  <swal-function-param
    name="didOpen"
    value="popup => console.log(popup)" />
</template>
```

```js
Swal.fire({ template: "#my-template" });
```

### Supported template elements

```html
<swal-title>…</swal-title>
<swal-html>…</swal-html>
<swal-footer>…</swal-footer>
<swal-param name="…" value="…" />
<swal-function-param name="…" value="…" />
<swal-button type="…" color="…" aria-label="…">…</swal-button>
<swal-image src="…" width="…" height="…" alt="…" />
<swal-icon type="…" color="…">…</swal-icon>
<swal-input type="…" label="…" placeholder="…" value="…" />
<swal-input-option value="…">…</swal-input-option>
```

> **[Security]** The **value** attribute of **swal-function-param** is evaluated using `new Function()`, which behaves like `eval()`. Only use **swal-function-param** with trusted template content.

### Declarative Triggering

You can trigger SweetAlert2 popups declaratively using the **bindClickHandler()** method:

```html
<button data-swal-template="#my-template">
  Trigger modal
</button>

<button data-swal-toast-template="#my-template">
  Trigger toast
</button>
```

```js
Swal.bindClickHandler();
/* Bind a mixin to a click handler */
Swal.mixin({ toast: true }).bindClickHandler("data-swal-toast-template");
```

---

## Handling Buttons (Confirm, Deny, Cancel)

When the user clicks a button, the Promise returned by **Swal.fire()** will be resolved with the **SweetAlertResult** object:

| Key | Description |
|---|---|
| **isConfirmed** | The "Confirm" button was clicked, the **value** will contain the result |
| **isDenied** | The "Deny" button was clicked, the **value** will be **false**. Alternatively, if there's an input in a popup, you can use **returnInputValueOnDeny: true** to return the input's value. |
| **isDismissed** | The "Cancel" button was clicked, the **dismiss** will be `Swal.DismissReason.cancel` |
| **value** | The value from the popup: **true** for simple confirmed dialogs, **false** for denied popups, or any value for popups with inputs |
| **dismiss** | The dismissal reason, see the [Handling Dismissals](#handling-dismissals) section for details |

---

## Handling Dismissals

When an alert is dismissed by the user, the Promise returned by **Swal.fire()** will be resolved with an object `{ isDismissed: true, dismiss: reason }` documenting the reason it was dismissed:

| Reason | Description | Related configuration |
|---|---|---|
| `Swal.DismissReason.backdrop` | The user clicked the backdrop. | [allowOutsideClick](#allowOutsideClick) |
| `Swal.DismissReason.cancel` | The user clicked the cancel button. | [showCancelButton](#showCancelButton) |
| `Swal.DismissReason.close` | The user clicked the close button. | [showCloseButton](#showCloseButton) |
| `Swal.DismissReason.esc` | The user clicked the `Esc` key. | [allowEscapeKey](#allowEscapeKey) |
| `Swal.DismissReason.timer` | The timer ran out, and the alert closed automatically. | [timer](#timer) |

If a popup is dismissed by **Swal.close()** or another popup, the Promise will be resolved with an object `{ isDismissed: true }` (**dismiss** will be **undefined**).

---

## Icons

The 5 built-in icons: **success**, **error**, **warning**, **info**, **question**

---

## Input Types

### text

```js
const inputValue = (await (await fetch("//api.ipify.org?format=json")).json()).ip;
const { value: ipAddress } = await Swal.fire({
  title: "Enter your IP address",
  input: "text",
  inputLabel: "Your IP address",
  inputValue,
  showCancelButton: true,
  inputValidator: (value) => {
    if (!value) return "You need to write something!";
  }
});
if (ipAddress) Swal.fire(`Your IP address is ${ipAddress}`);
```

### email

```js
const { value: email } = await Swal.fire({
  title: "Input email address",
  input: "email",
  inputLabel: "Your email address",
  inputPlaceholder: "Enter your email address"
});
if (email) Swal.fire(`Entered email: ${email}`);
```

### url

```js
const { value: url } = await Swal.fire({
  input: "url",
  inputLabel: "URL address",
  inputPlaceholder: "Enter the URL"
});
if (url) Swal.fire(`Entered URL: ${url}`);
```

### password

```js
const { value: password } = await Swal.fire({
  title: "Enter your password",
  input: "password",
  inputLabel: "Password",
  inputPlaceholder: "Enter your password",
  inputAttributes: {
    maxlength: "10",
    autocapitalize: "off",
    autocorrect: "off"
  }
});
if (password) Swal.fire(`Entered password: ${password}`);
```

### textarea

```js
const { value: text } = await Swal.fire({
  input: "textarea",
  inputLabel: "Message",
  inputPlaceholder: "Type your message here...",
  inputAttributes: { "aria-label": "Type your message here" },
  showCancelButton: true
});
if (text) Swal.fire(text);
```

### select

```js
const { value: fruit } = await Swal.fire({
  title: "Select field validation",
  input: "select",
  inputOptions: {
    Fruits: {
      apples: "Apples",
      bananas: "Bananas",
      grapes: "Grapes",
      oranges: "Oranges"
    },
    Vegetables: {
      potato: "Potato",
      broccoli: "Broccoli",
      carrot: "Carrot"
    },
    icecream: "Ice cream"
  },
  inputPlaceholder: "Select a fruit",
  showCancelButton: true,
  inputValidator: (value) => {
    return new Promise((resolve) => {
      if (value === "oranges") resolve();
      else resolve("You need to select oranges :)");
    });
  }
});
if (fruit) Swal.fire(`You selected: ${fruit}`);
```

### radio

```js
/* inputOptions can be an object or Promise */
const inputOptions = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      "#ff0000": "Red",
      "#00ff00": "Green",
      "#0000ff": "Blue"
    });
  }, 1000);
});
const { value: color } = await Swal.fire({
  title: "Select color",
  input: "radio",
  inputOptions,
  inputValidator: (value) => {
    if (!value) return "You need to choose something!";
  }
});
if (color) Swal.fire({ html: `You selected: ${color}` });
```

### checkbox

```js
const { value: accept } = await Swal.fire({
  title: "Terms and conditions",
  input: "checkbox",
  inputValue: 1,
  inputPlaceholder: `
    I agree with the terms and conditions
  `,
  confirmButtonText: `
    Continue&nbsp;<i class="fa fa-arrow-right"></i>
  `,
  inputValidator: (result) => {
    return !result && "You need to agree with T&C";
  }
});
if (accept) Swal.fire("You agreed with T&C :)");
```

### date

```js
const { value: date } = await Swal.fire({
  title: "select departure date",
  input: "date",
  didOpen: () => {
    const today = (new Date()).toISOString();
    Swal.getInput().min = today.split("T")[0];
  }
});
if (date) Swal.fire("Departure date", date);
```

### file

```js
const { value: file } = await Swal.fire({
  title: "Select image",
  input: "file",
  inputAttributes: {
    "accept": "image/*",
    "aria-label": "Upload your profile picture"
  }
});
if (file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    Swal.fire({
      title: "Your uploaded picture",
      imageUrl: e.target.result,
      imageAlt: "The uploaded picture"
    });
  };
  reader.readAsDataURL(file);
}
```

### range

```js
Swal.fire({
  title: "How old are you?",
  icon: "question",
  input: "range",
  inputLabel: "Your age",
  inputAttributes: {
    min: "8",
    max: "120",
    step: "1"
  },
  inputValue: 25
});
```

### Multiple inputs

Multiple inputs aren't supported, you can achieve them by using **html** and **preConfirm** parameters. Inside the **preConfirm()** function you can return (or, if async, resolve with) the custom result:

```js
const { value: formValues } = await Swal.fire({
  title: "Multiple inputs",
  html: `
    <input id="swal-input1" class="swal2-input">
    <input id="swal-input2" class="swal2-input">
  `,
  focusConfirm: false,
  preConfirm: () => {
    return [document.getElementById("swal-input1").value, document.getElementById("swal-input2").value];
  }
});
if (formValues) Swal.fire(JSON.stringify(formValues));
```

---

## Methods

| Method | Description |
|---|---|
| `Swal.isVisible()` | Determine if popup is shown. |
| `Swal.mixin({ ...options })` | Returns an extended version of **Swal** containing **params** as defaults. Useful for reusing Swal configuration. |
| `Swal.update({...options})` | Updates popup options. |
| `Swal.close()` | Close the currently open SweetAlert2 popup programmatically, the Promise returned by **Swal.fire()** will be resolved with an empty object `{ }` |
| `Swal.getContainer()` | Get the popup container which contains the backdrop and the popup itself. |
| `Swal.getPopup()` | Get the popup. |
| `Swal.getTitle()` | Get the popup title. |
| `Swal.getProgressSteps()` | Get the progress steps. |
| `Swal.getCloseButton()` | Get the close button. |
| `Swal.getIcon()` | Get the icon. |
| `Swal.getIconContent()` | Get the icon content (without border). |
| `Swal.getHtmlContainer()` | Gets the DOM element where the **html**/**text** parameter is rendered to. |
| `Swal.getImage()` | Get the image. |
| `Swal.getActions()` | Get the actions block (buttons container). |
| `Swal.getFooter()` | Get the popup footer. |
| `Swal.getFocusableElements()` | Get all focusable elements in the popup. |
| `Swal.getConfirmButton()` | Get the "Confirm" button. |
| `Swal.getDenyButton()` | Get the "Deny" button. |
| `Swal.getCancelButton()` | Get the "Cancel" button. |
| `Swal.enableButtons()` | Enable "Confirm" and "Cancel" buttons. |
| `Swal.disableButtons()` | Disable "Confirm" and "Cancel" buttons. |
| `Swal.showLoading()` | Shows loader (spinner), this is useful with AJAX requests. By default the loader be shown instead of the "Confirm" button, but if you want another button to be replaced with a loader, just pass it like this: `Swal.showLoading(Swal.getDenyButton())` |
| `Swal.hideLoading()` | Hides loader and shows back the button which was hidden by `.showLoading()` |
| `Swal.isLoading()` | Determine if popup is in the loading state. Related methods: `Swal.showLoading()` and `Swal.hideLoading()` |
| `Swal.getTimerLeft()` | Returns the time left in case when **timer** parameter is set. |
| `Swal.stopTimer()` | Stops the timer in case when **timer** parameter is set. Returns the time left. |
| `Swal.resumeTimer()` | Resume the **timer** previously stopped. Returns the time left. |
| `Swal.toggleTimer()` | Toggle state of the **timer** between stopped and running. Returns the time left. |
| `Swal.isTimerRunning()` | Returns the status of a **timer**: **true** if is running, **false** if it's paused. |
| `Swal.increaseTimer(ms)` | Increase the **timer** by **ms** milliseconds. Returns the time left. |
| `Swal.clickConfirm()` | Click the "Confirm"-button programmatically. |
| `Swal.clickDeny()` | Click the "Deny"-button programmatically. |
| `Swal.clickCancel()` | Click the "Cancel"-button programmatically. |
| `Swal.getInput()` | Get the input DOM node, this method works with **input** parameter. |
| `Swal.disableInput()` | Disable input. A disabled input element is unusable and un-clickable. |
| `Swal.enableInput()` | Enable input. |
| `Swal.showValidationMessage(message)` | Show the validation message DOM node. |
| `Swal.resetValidationMessage()` | Hide the validation message DOM node. |
| `Swal.getValidationMessage()` | Get the validation message DOM node. |
| `Swal.isValidParameter(param)` | Determine if parameter name is valid. |
| `Swal.isUpdatableParameter(param)` | Determine if parameter name is valid for `Swal.update()` method. |
