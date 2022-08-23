const sum = (val) => {
  return (anotherVal) => { 
    console.log(val + anotherVal)
  }
}

sum(2)(2);
