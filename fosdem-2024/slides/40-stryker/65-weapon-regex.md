### Weapon regex

Regular expressions are mutated using the awesome [Weapon rege⚔](https://stryker-mutator.io/weapon-regex/)<!-- .element target="_blank" -->


| Original                      | Mutated  |
| ----------------------------- | -------- |
| `^abc`                        | `abc`    |
| `abc$`                        | `abc`    |
| `[abc]`                       | `[^abc]` |
| `\d`                          | `\D`     |
| `\s`                          | `\S`     |
| `\w`                          | `\W`     |
| `a?` / `a*` / `a+` / `a{1,3}` | `a`      |

<!-- .element class="sm" -->

[![WeaponRegeX_logo.svg](/img/WeaponRegeX_logo.svg)<!-- .element style="width: 200px"  -->](https://stryker-mutator.io/weapon-regex/) <!-- .element target="_blank" -->
