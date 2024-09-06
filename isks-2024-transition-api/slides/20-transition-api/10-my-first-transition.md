
<!-- .slide: data-auto-animate -->

## View Transition API

Enable with a simple css directive

```css
@view-transition {
  navigation: auto;
}
```

---

### Demo

<!-- .slide: class="is-lab" -->

---

### But how?

<div class="kc-columns kc-gap2">

```html
<transition-container>
  <image-wrapper>
    <outgoing-image />
    <incoming-image />
  </image-wrapper>
</transition-container>
```

1. Snapshot of the outgoing view
2. Snapshot of the incoming view
3. Overlay the two atop the DOM
4. Removes them when the transition is done

</div>
