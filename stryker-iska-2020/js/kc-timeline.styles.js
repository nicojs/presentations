export const timelineStyles = `<style>
:host {
  font-family: 'Quicksand';
  font-size: 16px;
  text-align: left;
  padding-top: 150px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
flex-direction: column;}

#timeline {
  display: flex; }

input {
  width: 25px;
  height: 25px;
  background-color: #AEB6BF;
  position: relative;
  border-radius: 50%;
  display: block;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  z-index: 2;
  cursor: pointer; }

input.active, input.active:before {
  background-color: #2C3E50; }

input:focus {
  outline: none; }

/* the lines */
input:before, input:last-of-type:after {
  content: '';
  display: block;
  width: 89px;
  height: 5px;
  background: #AEB6BF;
  z-index: 1;
  transform: translate(-72px, 10px); }

input:last-of-type:after {
  transform: translate(25px, 5px); }

/* year and label */
.dot-info {
  position: relative; }

input + .dot-info .caption {
  transform: translate(-50%, -70px) rotate(-45deg);
  display: block;
  max-width: 70px;
  text-indent: -10px;
  position: absolute;
  top: 0;
  left: 0; }

input + .dot-info .year {
  width: 64px;
  display: block;
  transform: translate(-50%, 50px); }

input.current + .dot-info {
  font-family: 'Quicksand-Bold'; }

#description {
  margin-top: 70px; }
</style>`;