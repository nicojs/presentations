export default `
  :host {
    text-align: left;
  }
  
  .container {
    height: 600px;
  }

  pre {
    width: 100%;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.45);
    font-size: 22px;
  }
  pre {
    display: block;
    position: relative;
    width: 90%;
    margin: 20px auto;
    text-align: left;
    font-size: 0.55em;
    font-family: monospace;
    line-height: 1.2em;
    word-wrap: break-word;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  }

  .row {
	display: flex;
  }

  .row > * {
	width: 500px;
  }

  .text-xs {
    font-size: 0.6em;
    line-height: 1.2em;
  }
  .text-xxs {
    font-size: 0.4em;
    line-height: 1.2em;
  }

  button {
	text-decoration: none;
	display: inline-block;
	padding: 8px 25px;
  border: 0;
  }
  button:enabled {
  cursor: pointer;
  }
  button:disabled {
    background: #f1f1f1;
  }
  .next:enabled {
	background-color: #04AA6D;
	color: white;
  }  
  .previous:enabled {
	background-color: #04AA6D;
	color: white;
  }
  
  button:enabled:hover {
    background-color: #059862;
  }

  .round {
	border-radius: 20px;
  }

  .mark {
	  background-color: #FF0;
  }

  .monospace {
	  font-family: 'Consolas';
  }

  .mutantExplanation li, .placementExplanation li {
	  list-style: none;
  }

  ul {
    margin: 0 10px;
    padding: 0;
  }

  .mutantExplanation li:before { content: '👽'; margin-left: -20px; margin-right: 10px; } 
  .placementExplanation li:before { content: '🗳️'; margin-left: -20px; margin-right: 10px; }

  .buttons {
    text-align: center;
  }

  code {
    max-height: 500px;
  }
  `;