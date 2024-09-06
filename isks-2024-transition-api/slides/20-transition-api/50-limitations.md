## Limitations

<!-- .slide: class="is-module" data-auto-animate -->

---

<!-- .slide: data-auto-animate -->

## Limitations

Browser support!

![](../../img/slides/50-limitations_image.png)

---

## Performance

- It will be slower than no animations
  - You can battle that with `speculationrules` api
    ```html
    <script type="speculationrules">
      {
        "prerender": [
          {
            "where": {
              "href_matches": "/*"
            }
          }
        ]
      }
    </script>
    ```

... which is also experimental 