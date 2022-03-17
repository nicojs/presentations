export const timelineTemplate = `
<div id="timeline">
  <template id="dot-template">
    <input type="radio">
    <div class="dot-info">
      <span class="year"></span>
      <span class="caption"></span>
    </div>
  </template>

  <!-- dynamic dots will be inserted here -->
</div>

<p id="description"></p>
`;