import { useState } from "react";

const feautes = () => {

     const [count, setCount] = useState(5);
     
  const increase = () => {
     setCount(count + 1);
   };
     
  const decline = () => {
     let newCount = count - 1;
     if (newCount < 0) {
       newCount = 0;
     }
     setCount(newCount);
   };

     return {
          increase,
          decline,
          count
     }
}

export default feautes