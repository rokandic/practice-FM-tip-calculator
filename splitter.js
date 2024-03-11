'use strict';

// Initialization - adding event listeners
( function () {
  let percentageButtons = document.getElementsByClassName('percentage');
  for( let btn of percentageButtons )  {
    btn.addEventListener('click',predefinedPercentage);
    btn.addEventListener('click',calculateResult);
  }
  let customInput = document.getElementById('perc-cust');
  customInput.addEventListener('focus',selectCustomPercentage);
  customInput.addEventListener('focus',calculateResult);
  customInput.addEventListener('change',validateCustomPercentage);
  customInput.addEventListener('input',calculateResult);
  customInput.addEventListener('blur',validateCustomPercentage);
 
  let bill = document.getElementById('bill');
  bill.addEventListener('change',validateBill);
  bill.addEventListener('input',calculateResult);

  let noPeople = document.getElementById('no-people');
  noPeople.addEventListener('change',validateNoPeople);
  noPeople.addEventListener('input',calculateResult);

  let resetButton = document.getElementById('reset');
  resetButton.addEventListener('click',resetAll);
}) ();

// Clicking on one of the predefined percentage should reset 'custom' input
function predefinedPercentage(event) {  
  let customInput = document.getElementById('perc-cust');
  customInput.classList.remove('customPercentageChecked');
  customInput.checked = false;
  customInput.value = '';
  let customLabel = document.getElementById('perc-cust-label');
  customLabel.classList.remove('display-block');
}

// Clicking on 'custom' field should reset predefined buttons
function selectCustomPercentage(event) {
  let percentageButtons = document.getElementsByClassName('percentage');
  for( let btn of percentageButtons )  {
    btn.checked = false;
  }

  let customInput = document.getElementById('perc-cust');
  customInput.classList.add('customPercentageChecked');
  customInput.checked = true;
}

// validate number inputs
function validateInputElement(element,labelElement,int) {
  let span = labelElement.firstElementChild;
  let val = int ? parseInt(element.value) : parseFloat(element.value).toFixed(2); 
  element.value = val;

  if(val == 0) {
    span.innerText = "Can't be zero";
    span.classList.remove('invisible');
    return false;
  } 
  else if (isNaN(val)) {
    span.innerHTML = "Not a number";
    span.classList.remove('invisible');
    return false;
  }
  else if (val < 0) {
    span.innerHTML = "Can't be negative";
    span.classList.remove('invisible');
    return false;
  }
  else {    
    span.innerHTML = "";
    span.classList.add('invisible'); 
    return true; 
  }
} 

// validate bill input
function validateBill() {
  let input = document.getElementById('bill');
  let label = document.getElementById('bill-label');

  return validateInputElement(input,label,false);
}

// validate number of people input
function validateNoPeople() {
  let input = document.getElementById('no-people');
  let label = document.getElementById('no-people-label');

  return validateInputElement(input,label,true);
}

// validate custom percentage input
function validateCustomPercentage(event) {
  // When clicking on predefined percentage, we want to avoid showing any error message on 'blur'
  // In such event validation is skipped
  if( (event.type=='blur') && (event.relatedTarget != null) ) 
    if( (event.relatedTarget.nodeName=='LABEL') && (event.relatedTarget.hasAttribute('class') ) ) 
      if (event.relatedTarget.classList.contains('percentage-label')) 
        return false;
 

  let input = document.getElementById('perc-cust'); 
  let label = document.getElementById('perc-cust-label');      
  let val = parseFloat(input.value).toFixed(2);   
  
  if(val < 0) {
    label.innerHTML = "Can't be negative";
    label.classList.add('display-block');
    return false;
  } else if (isNaN(val)) {
    label.innerHTML = "Must be a number";
    label.classList.add('display-block');
    return false;
  }
  else {    
    input.value = val;
    label.classList.remove('display-block');  
    return true;
  }  
}

// calculate the result and display calculated values
function calculateResult(event) {
  let resetButtonElement = document.getElementById('reset');
  resetButtonElement.disabled = true;

  let bill = Number(document.getElementById('bill').value);
  if ( (bill=='') || (bill<=0) || (isNaN(bill)))
    return resetCalculation();
  else
    bill = Number(parseFloat(bill).toFixed(2));
  
  let noPeople = document.getElementById('no-people').value;
  if ( (noPeople=='') || (noPeople<=0) || (isNaN(noPeople)))
    return resetCalculation();
  else
    noPeople = parseInt(noPeople);  

  let percentage = -1;  
  let percentageButtons = document.getElementsByClassName('percentage');
  let customPercentage = document.getElementById('perc-cust');
  if ( customPercentage.checked ) {
    if ( (customPercentage.value=='') || (customPercentage.value<0) || (isNaN(customPercentage.value))) 
      return resetCalculation();
    else 
      percentage = parseFloat(customPercentage.value).toFixed(2);
  } else {    
    for (let btn of percentageButtons ) {
      if (btn.checked)
        percentage = Number(parseFloat(btn.value).toFixed(2));
    }
  }

  if (percentage < 0)
    return resetCalculation();

  // All inputs ok, lets calculate the tip
  let totalTip = bill*(1+percentage/100.0) - bill;
  let tipPerPerson = totalTip/noPeople;
  let totalPerPerson = (bill+totalTip)/noPeople;

  let tipAmountElement = document.getElementById('tip-amount');
  let totalAmountElement = document.getElementById('total-amount');

  tipAmountElement.innerText = '$'+tipPerPerson.toFixed(2);
  totalAmountElement.innerText = '$'+totalPerPerson.toFixed(2);

  // reset button enabled  
  resetButtonElement.disabled = false;

  return true;
}

// reset all inputs and buttons
function resetAll(event) {
  resetCalculation();
 
  let percentageButtons = document.getElementsByClassName('percentage');
  for( let btn of percentageButtons )  {
    btn.checked = false;
  }
  let customInput = document.getElementById('perc-cust');
  customInput.value = '';
 
  let bill = document.getElementById('bill');
  bill.value = '';

  let noPeople = document.getElementById('no-people');
  noPeople.value = '';

  return true;
}

// reset the calculated value and reset button
function resetCalculation() {
  let resetButtonElement = document.getElementById('reset');
  resetButtonElement.disabled = true;

  let tipAmountElement = document.getElementById('tip-amount');
  let totalAmountElement = document.getElementById('total-amount');

  tipAmountElement.innerText = '$0.00';
  totalAmountElement.innerText = '$0.00';  

  return false;
}