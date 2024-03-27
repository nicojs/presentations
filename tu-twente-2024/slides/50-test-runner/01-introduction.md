<!-- .element class="is-module" -->

## StrykerJS Test runners

---

### Where in the process?

<kc-mermaid>
<script type="text/template">
graph LR
    A((Start)) --> B(1. Prepare)
    B --> C(2. Code instrumentation)
    C --> D(3. Dry run)
    D --> E{Success?}
    E -->|Yes| F(4. Mutation testing)
    E -->|No| H((end))
    F --> H
    style F fill:#ff0
    style D fill:#ff0
</script>
</kc-mermaid>

