import { Pressable, Text } from "react-native"



const AppBarTab = ({text, style}) => {
  
  let newStyle = style;
  const onPressFunction = () => {
  }
  return (<Pressable onPress={onPressFunction}><Text style={newStyle}>{text}</Text></Pressable>)
}

export default AppBarTab