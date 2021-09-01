# Almondbread

**this document, as well as this project is a work in progress**

*Mandel brot is german for almond bread.*

A mandelbrot set renderer with nifty features. Explore the depths and infinite details of the mandelbrot set to the extent of the limits of javascript floating point numbers 😅


![](doc/1.jpeg)
![](doc/2.jpeg)
![](doc/3.jpeg)
![](doc/4.jpeg)
![](doc/5.jpeg)
![](doc/6.jpeg)

# Features
- Mouse and keyboard controls, including selection zoom, and horizontal/vertical re-scaling
- Multiple color palettes (taken at random from coolors.co) with linear interpolation
- Render configuration is stored on the query string, so that the current view can be shared
- Parallel rendering using web workers for squeezing extra performance
- Download current view as image

## TODO

### Mobile version

The app refuses to run at all on mobile and shows a blocking screen, on purpose, to avoid anunusable experience.

It is a priority to implement usability on touch devices.

### Render stability

The app is somewhat unstable on heavy renders and sometimes crashes the browser tab. This should be fixed, although reloading the page will produce the correct results.

### Arbitrary floating point precision

Experiment with an arbitrary floting point math library

### Color palettes

Color palettes are really not well thought out. Some work should be put into choosing colors that produce good results.
