### Some math


<div class="kc-columns kc-gap2">
<div>

#### Mutant states

- ✅ Killed
- 👽 Survived
- 🙈 No coverage
- ⏳ Timeout <!-- .element class="fragment" --> 
- 🤥 Ignored <!-- .element class="fragment"  --> 

<!-- .element class="no-list" -->

</div>
<div class="fragment">

#### Mutant metrics

- **Detected** = `killed + timeout`
- **Undetected** = \
  `survived + no coverage`
- **Covered** = `detected + survived`
- **Valid** = `detected + undetected`

</div>
</div>


**Mutation score** = `detected / valid * 100` \
**Mutation score based on covered code** = `detected / covered * 100`

<!-- .element class="fragment" -->
