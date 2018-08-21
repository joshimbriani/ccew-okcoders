CSS: FlexBox
============

Recently there's been a really awesome development in the CSS world that promises to make layouts way easier: the flexbox model!

Flexbox is extremely intuitive model that's way easier than traditional CSS.

## Setting the Flexbox Model
To set an element and its descendents as using the flexbox model, add `display: flex` to it's style.

Now all that item's descendents are using the FlexBox rules! 

## Direction

Flexbox is based on direction. To set the flex direction for a containing element, just set a `flex-direction: [row]|[column]` on it.

All other child elements will be aligned accordingly.

## Sizing with FlexBox

By default each flexed item will take up only as much space as it needs as governed by it's contained elements. Adding `flex: 1` or any other number can help you size elements.

These numbers do not represent a fixed value like pixels or even density independent pixels like em, but rather it represents a ratio. If you have two elements in the same flex unit and one has `flex: 1` and the other has `flex: 2`, then the flex 2 will take up twice as much space as the flex 1.

If only one item in a flex group has a flex: number, then it will grow to expand all available space.

## Aligning items

There are two primary ways to align items in flexbox: align-items and justify-content. These attributes governs where exactly each of the elements child items should be positioned.

They both take a similar array of values, most notably center, flex-start, flex-end and space-between.

The difference between the two is which axis they operate on: align-items on the non-dominant axis and justify-content on the dominant one.