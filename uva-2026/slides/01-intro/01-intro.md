<!-- .slide: class="is-welcome text-xl" -->

# Kill all mutants with Stryker 

Mutation testing guest lecture

---

### Agenda

<div class="kc-columns">
<div>

1. Mutation testing
   1. What is it
   2. History
   3. Challenges
   4. Strategies
2. Current research
   1. Simultaneous testing
   2. Mutation levels

</div>
<div>

3. Stryker
4. StrykerJS 
    1. Mutators
    2. Internals
    3. Instrumenting code

</div>
</div>

---

### Who are we

<div style="justify-content: center" class="kc-flex kc-gap4">
<div>

##### Nico Jansen

![Nico](/img/nico.png) <!-- .element class="img-round" style="height: 200px" -->
* 👪 A ... dad?
* 💼 Manager & Trainer KC
* 🧙‍♂️ Open sourcerer
* <i class="bi bi-github" style="color: #1a1d21"></i> &nbsp;nicojs
* <i class="bi bi-twitter" style="color: #1d9bf0"></i> &nbsp;_nicojs

<!-- .element class="no-list" -->

</div>
<div>

##### Jan-Jelle Kester

![Jan-Jelle](/img/jan-jelle.jpg) <!-- .element class="img-round" style="width: 200px" -->

* 💼 Software engineer & architect
* 🎓 Teacher & research supervisor
* <i class="bi bi-github" style="color: #1a1d21"></i> &nbsp;jjkester
* <i class="bi bi-linkedin" style="color: #1d9bf0"></i> &nbsp;jjkester

<!-- .element class="no-list" -->

</div>
</div>

---

<!-- .slide: data-background-video="/img/infosupport.mp4" data-background-video-loop  data-background-video-muted-->

<div class="overlay">

## Info Support

- <i class="list-style-icon">💼</i> Consultancy
- <i class="list-style-icon">🏢</i> Multiple sectors
- <i class="list-style-icon">👨‍👨‍👧‍👧</i> ~500 colleagues

<!-- .element class="no-list" -->

</div>

---

<!-- .slide: data-background-image="/img/references.png" data-background-size="contain"-->

---

<!-- .slide: data-background-image="/img/focus.png" data-background-color="#003865" data-background-size="contain"-->

---

<!-- .slide: data-background-image="/img/research-center.png" data-background-color="#f8f8f8" data-background-size="contain"-->

---

<!-- .slide: data-background-color="#1a0306" -->

<div class="kc-columns">

![](/img/stryker-socks.jpg) <!-- .element class="img-round-vertical" -->

</div>

---

<!-- .slide: data-background-color="#1c1c40" data-background-image="../../img/slides/01-intro_image.png" data-background-size="contain" -->
