<!-- .slide: class="is-welcome text-xl" -->

# Kill all mutants with Stryker 

Mutation testing workshop

---

### Agenda

1. Mutation testing
   1. What is it
   1. History
   1. Challenges
   1. Strategies
1. Stryker
1. StrykerJS 
    1. Mutators
    1. Internals
    1. Instrumenting code
    1. (Test runners)
1. Hands-on lab

---

### Who are we

<div style="justify-content: center" class="kc-flex kc-gap4">
<div>

##### Nico Jansen

![Nico](/img/nico.jpg) <!-- .element class="img-round" style="width: 200px" -->

* 💼 Manager & Trainer KC
* 🧙‍♂️ Open sourcerer
* <i class="bi bi-github" style="color: #1a1d21"></i> &nbsp;nicojs
* <i class="bi bi-twitter" style="color: #1d9bf0"></i> &nbsp;_nicojs

<!-- .element class="no-list" -->

</div>
<div>

##### Jan-Jelle Kester

![Jan-Jelle](/img/jan-jelle.jpg) <!-- .element class="img-round" style="width: 200px" -->

* 💼 Software engineering consultant
* 🦸 Research center
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

<!-- .slide: data-background-color="#1a0306"  -->

![](/img/hacktoberfest-2023.webp)

Hackathon @ Info Support, October 13 + 14

<!-- .element class="hacktoberfest" -->

[carriere.infosupport.com/hacktoberfest](https://carriere.infosupport.com/hacktoberfest/) <!-- .element target="_blank" -->

<!-- .element class="hacktoberfest" -->

---

<!-- .slide: data-background-color="#1a0306" -->

<div class="kc-columns">

![](/img/stryker-socks.jpg) <!-- .element class="img-round-vertical" -->

![](/img/thesis-fair.png)

</div>

