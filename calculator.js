( function () {
  let customInput = document.getElementById('percCust');
  customInput.addEventListener('focus',customPercentage);

  let percentageButtons = document.getElementsByClassName('percentage');
  for( let btn of percentageButtons )  {
    btn.addEventListener('click',predefinedPercentage);
  }

  let bill = document.getElementById('bill');
  bill.addEventListener('change',validateBill);
}) ();


function predefinedPercentage(event) {
  let customInput = document.getElementById('percCust');
  customInput.classList.remove('customPercentageChecked');
  customInput.checked = true;
}


function customPercentage(event) {
  let percentageButtons = document.getElementsByClassName('percentage');
  for( let btn of percentageButtons )  {
    btn.checked = false;
  }

  let customInput = document.getElementById('percCust');
  customInput.classList.add('customPercentageChecked');
  customInput.checked = true;
}

function validateBill() {
  let valid = true;
  let bill = document.getElementById('bill');
  let span = document.querySelector('#bill-label span');
  let val = parseFloat(bill.value).toFixed(2);  
  bill.value = val;
  if((!val) || (val == 0)) {
    span.classList.remove('invisible');
    valid = false;
  }
  else
    span.classList.add('invisible');  

  return valid;
}