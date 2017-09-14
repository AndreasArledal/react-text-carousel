# React Text Carousel component

![Demo](react-text-carousel.gif)

React component for swithcing between texts using a typing animation effect. Based on
[react-typist](https://github.com/jstejada/react-typist).

[Demo](http://andreasarledal.github.io/react-text-carousel/).

## Install
`npm install react-text-carousel` or `bower install react-text-carousel`

## Usage
```jsx
const phrases = ["An array", "of strings", "to pass the component"]; // Required
const interval = 3000; // The time to wait before rendering the next string
const typistProps = {} // Props that are passed to the react-typist component
const loopPhrases = true // Set to false to stop at last phrase

<TextCarousel phrases={phrases} interval={interval} typistProps={typistProps} loopPhrases={loopPhrases} />
```

