import React from "react";

export default function BusinessForm(props){
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
      };
    

    return(<>

   <textarea placeholder="About me"></textarea>
    </>)
}